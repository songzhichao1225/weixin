// generalization/payFor/payFor.js
const util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    getElplainInfo: [],
    modeNum: '',
    Referee: '',
    look: 0,
    ko: 0,
    volumeMoney: 0.00,
    volumedetail: '',
    maskingOne: false,
    img: '',
    checkedFlag: false,
    compensates: false,
    depositRule: '',
    realName: false,
    nameBlur: '',
    numBlur: '',
    Moneytotal: 0.00,
    exemption: 0.00,
    organization: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */


  compensates() {
    if (this.data.compensates == false) {
      this.setData({
        compensates: true
      })
    } else {
      this.setData({
        compensates: false
      })
    }
  },

  rulesTxt() {

    util.Request("/api/getDepositRule", {}, "get",
      (res) => {
        this.setData({
          maskingOne: true,
          depositRule: res.data.data.rule
        })

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },

  checkedFlag() {

    util.Request("/api/getUserRealInfo", {}, "get",
      (res) => {
        if (res.data.code != 2000) {
          this.setData({
            realName: true,
            checkedFlag: false
          })
        } else {
          if (this.data.checkedFlag == false) {
            this.setData({
              checkedFlag: true
            })
            this.kokopl()

          } else {
            this.setData({
              checkedFlag: false
            })
            this.kokopl()
          }
        }

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  realNameClose() {
    this.setData({
      realName: false
    })
  },


  kokopl() {

    let obj = {
      sportModes: app.globalData.SportMode,
      siteMoney: app.globalData.SiteMoney,
      number: app.globalData.number,
      PayMoneyType: app.globalData.PaySiteMoneyType,
      isPublisher: app.globalData.isPublisher,
      isCooper: 1,
      sportid: app.globalData.sportid,
      Accompany: app.globalData.Accompany,
      Reward: app.globalData.Reward,
      Referee: app.globalData.refereefee,
      Insurance: this.data.checkedFlag == true ? '1' : '0',
      Tips: app.globalData.Tips
    }
    this.setData({
      organization: app.globalData.organization
    })
    util.Request("/api/getElplainInfo", obj, "get",
      (res) => {
        let k = res.data.data.Total.toString()
        if (k.indexOf('.') == -1) {
          res.data.data.Total = res.data.data.Total + '.00'
        }
        res.data.data.Accompany = res.data.data.Accompany.toFixed(2)
        res.data.data.InsuranceMoney = res.data.data.InsuranceMoney.slice(0, res.data.data.InsuranceMoney.length - 5)
        res.data.data.Compensation = res.data.data.Compensation.slice(0, res.data.data.Compensation.length - 5)
        this.setData({
          getElplainInfo: res.data.data
        })
        this.onShow()

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  nameBlur(e) {
    this.setData({
      nameBlur: e.detail.value
    })
  },

  numBlur(e) {
    this.setData({
      numBlur: e.detail.value
    })
  },

  sunmit() {


    util.Request("/api/realAhtour", {
        realName: this.data.nameBlur,
        idCardNum: this.data.numBlur
      }, "post",
      (res) => {
        if (res.data.code === 2000) {
          this.setData({
            realName: false
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1500
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }


        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },









  onLoad: function (options) {

    this.setData({
      look: options.look,
      ko: options.ko,
      mode: wx.getStorageSync('mode'),
      img: util.API,
      chekedMoney: 0
    })

    if (options.look == 1) {
      this.setData({
        modeNum: app.globalData.SportMode,
        Referee: app.globalData.refereefee
      })
      this.kokopl()
    } else if (options.look == 2) {
      let obj = {
        sportType: app.userReserveVenue.sportType,
        siteMoney: app.userReserveVenue.SiteMoney,
        siteUid: app.userReserveVenue.siteUid,
        sportid: app.userReserveVenue.sportid,
        StartTime: app.userReserveVenue.StartTime,
        PlayTime: app.userReserveVenue.PlayTime,
        venueid: app.userReserveVenue.venueid,
        breakup: app.userReserveVenue.sportType == 22 ? app.userReserveVenue.breakup : ''
      }
      util.Request("/api/getOrders", obj, "get",
        (res) => {
          this.setData({
            getElplainInfo: res.data.data
          })

          wx.hideLoading()
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
    }




  },
  radioChange: function (e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },

  showInputLayer: function () {
    this.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  close: function () {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    });
  },

  kop: function () {
    wx.navigateTo({
      url: '/generalization/paymentCode/paymentCode'
    })
  },

  redEnvelope() {
    wx.navigateTo({
      url: '/generalization/redEnvelope/redEnvelope'
    })
  },


  hidePayLayer: function () {
    var val = this.data.pwdVal;

    if (this.data.look == 1) {
      if (this.data.current == 1) {
        if (this.data.ko != 1) {
          if (app.globalData.PipeMain == 2) {
            let obj = {
              sportid: app.globalData.sportid,
              sportType: app.globalData.sportType,
              SportMode: app.globalData.SportMode,
              siteUid: app.globalData.siteUid,
              StartTime: app.globalData.StartTime,
              PlayTime: app.globalData.PlayTime,
              SiteMoney: app.globalData.SiteMoney,
              PaySiteMoneyType: app.globalData.PaySiteMoneyType,
              teamSex: app.globalData.teamSex,
              LevelMin: app.globalData.LevelMin,
              LevelMax: app.globalData.LevelMax,
              Tips: app.globalData.SportMode == 1 ? app.globalData.Tips : 0 || app.globalData.SportMode == 2 ? app.globalData.Tips : 0,
              comments: app.globalData.comments,
              member: app.globalData.member.length === 0 ? '' : JSON.stringify(app.globalData.member),
              MoneyPerhour: app.globalData.name == '我找陪练' || app.globalData.name == '我是陪练' ? app.globalData.Accompany : app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
              payType: this.data.current == 3 ? 'balance' : 'wechatpay',
              venueid: app.globalData.venueid,
              refereefee: app.globalData.refereefee,
              RefereeNumber: app.globalData.RefereeNumber,
              Refereegrade: app.globalData.Refereegrade,
              Agemin: app.globalData.Agemin,
              Agemax: app.globalData.Agemax,
              SiteSumMoney: app.globalData.SiteSumMoney,
              volumeMoney: this.data.volumeMoney,
              volumedetail: this.data.volumedetail,
              hbmedetail: this.data.hbmedetail,
              hbMoney: this.data.hbMoney,
              Insurance: this.data.checkedFlag == true ? '1' : '0',
              small: '1',
              openID: wx.getStorageSync('openid'),
              PipeMain: app.globalData.PipeMain,
              PipeMainMoney: app.globalData.PipeMainMoney,
              lr: wx.getStorageSync('bookinSix').data[0].lr,
              openPrice: wx.getStorageSync('bookinSix').data[0].openPrice
            }

            util.Request("/api/userAddActivity_ADD", obj, "post", //发布踢馆活动
              (resTwo) => {
                
                wx.hideLoading()
                if (resTwo.data.code == 2000) {
                  var wxPay = resTwo.data.data.sign_data.sign_data
                  wx.requestPayment({
                    'timeStamp': wxPay.timeStamp.toString(),
                    'nonceStr': wxPay.nonceStr,
                    'package': wxPay.package,
                    'signType': 'MD5',
                    'paySign': wxPay.sign,
                    'success': function (res) {
                      wx.navigateTo({
                        url: '/generalization/createSuccess/createSuccess?inviteId=' + resTwo.data.data.uuid + '&Identification=1' + '&typeInfo=0' + '&referee=' + app.globalData.Refereegrade + '&status=1' + '&lr=' + wx.getStorageSync('bookinSix').data[0].lr,
                      })
                      
                    },
                    'fail': function (res) {},

                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                }

              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          } else {
            let obj = {
              sportid: app.globalData.sportid,
              sportType: app.globalData.sportType,
              SportMode: app.globalData.SportMode,
              siteUid: app.globalData.siteUid,
              StartTime: app.globalData.StartTime,
              PlayTime: app.globalData.PlayTime,
              SiteMoney: app.globalData.SiteMoney,
              PaySiteMoneyType: app.globalData.PaySiteMoneyType,
              teamSex: app.globalData.teamSex,
              LevelMin: app.globalData.LevelMin,
              LevelMax: app.globalData.LevelMax,
              Tips: app.globalData.SportMode == 1 ? app.globalData.Tips : 0 || app.globalData.SportMode == 2 ? app.globalData.Tips : 0,
              comments: app.globalData.comments,
              member: app.globalData.member.length === 0 ? '' : JSON.stringify(app.globalData.member),
              MoneyPerhour: app.globalData.name == '我找陪练' || app.globalData.name == '我是陪练' ? app.globalData.Accompany : app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
              payType: this.data.current == 3 ? 'balance' : 'wechatpay',
              venueid: app.globalData.venueid,
              refereefee: app.globalData.refereefee,
              RefereeNumber: app.globalData.RefereeNumber,
              Refereegrade: app.globalData.Refereegrade,
              Agemin: app.globalData.Agemin,
              Agemax: app.globalData.Agemax,
              SiteSumMoney: app.globalData.SiteSumMoney,
              volumeMoney: this.data.volumeMoney,
              volumedetail: this.data.volumedetail,
              hbmedetail: this.data.hbmedetail,
              hbMoney: this.data.hbMoney,
              Insurance: this.data.checkedFlag == true ? '1' : '0',
              small: '1',
              openID: wx.getStorageSync('openid'),
              openPrice: app.globalData.openPrice,
              lr: app.globalData.lr,
              PipeMain:0
            }

            util.Request("/api/userAddActivity_ADD", obj, "post",
              (resTwo) => {
                wx.hideLoading()
                if (resTwo.data.code == 2000) {
                
                  var wxPay = resTwo.data.data.sign_data.sign_data
                  wx.requestPayment({
                    'timeStamp': wxPay.timeStamp.toString(),
                    'nonceStr': wxPay.nonceStr,
                    'package': wxPay.package,
                    'signType': 'MD5',
                    'paySign': wxPay.sign,
                    'success': function (res) {
                      
                      wx.navigateTo({
                        url: '/generalization/createSuccess/createSuccess?inviteId=' + resTwo.data.data.uuid + '&Identification=1' + '&typeInfo=0' + '&referee=' + app.globalData.refereefee + '&status=1' + '&lr=' + app.globalData.lr,
                      })
                    },
                    'fail': function (res) {
                      console.log('没成功')
                    },

                  })
                } else {
                  wx.showToast({
                    title: resTwo.data.msg,
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                }

              },
              () => {
                console.log("失败")
              },
              () => {}
            )

          }



        } else if (this.data.ko == 1) {


          util.Request("/api/userSignUp", {
              inviteId: app.globalData.inviteId,
              team: Number(app.globalData.team),
              SecondSportId: app.globalData.SecondSportId,
              startTime: app.globalData.startTime,
              playTime: app.globalData.playTime,
              FirstSportId: app.globalData.sportid,
              volumeMoney: this.data.volumeMoney,
              volumedetail: this.data.volumedetail,
              hbmedetail: this.data.hbmedetail,
              hbMoney: this.data.hbMoney,
              pos: app.globalData.pos,
              payType: this.data.current == 3 ? 'balance' : 'wechatpay',
              small: 1,
              openID: wx.getStorageSync('openid'),
              Insurance: this.data.checkedFlag == true ? '1' : '0'
            }, "post",
            (res) => {
              wx.hideLoading()
              if (res.data.code == 2000) {
                var wxPay = res.data.data.sign_data.sign_data
                wx.requestPayment({
                  'timeStamp': wxPay.timeStamp.toString(),
                  'nonceStr': wxPay.nonceStr,
                  'package': wxPay.package,
                  'signType': 'MD5',
                  'paySign': wxPay.sign,
                  'success': function (res) {
                    wx.navigateTo({
                      url: '/generalization/createSuccess/createSuccess?inviteId=' + app.globalData.inviteId + '&Identification=2' + '&typeInfo=0' + '&referee=' + app.globalData.refereefee + '&status=1' + '&time=' + app.globalData.CreateTime,
                    })
                  },
                  'fail': function (res) {},
                })
              }else if(res.data.code==4004){
                wx.showToast({
                  title:'请去APP实名认证',
                  icon: 'none',
                  duration: 1500,
                  mask: true 
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true 
                })
              }



            },
            () => {
              console.log("失败")
            },
            () => {}
          )

        }
      } else {
        util.Request("/api/checkPutMoneyPwdIsTrue", {
            password: val
          }, "post",
          (res) => {
            if (res.data.code == 2000) {
              this.setData({
                showPayPwdInput: false,
                payFocus: false,
                pwdVal: ''
              });


              if (this.data.ko != 1) {

                if (app.globalData.PipeMain == 2) {
                  let obj = {
                    sportid: app.globalData.sportid,
                    sportType: app.globalData.sportType,
                    SportMode: app.globalData.SportMode,
                    siteUid: app.globalData.siteUid,
                    StartTime: app.globalData.StartTime,
                    PlayTime: app.globalData.PlayTime,
                    SiteMoney: app.globalData.SiteMoney - this.data.volumeMoney,
                    PaySiteMoneyType: app.globalData.PaySiteMoneyType,
                    teamSex: app.globalData.teamSex,
                    LevelMin: app.globalData.LevelMin,
                    LevelMax: app.globalData.LevelMax,
                    Tips: app.globalData.SportMode == 1 ? app.globalData.Tips : 0 || app.globalData.SportMode == 2 ? app.globalData.Tips : 0,
                    comments: app.globalData.comments,
                    member: app.globalData.member.length === 0 ? '' : JSON.stringify(app.globalData.member),
                    MoneyPerhour: app.globalData.name == '我找陪练' || app.globalData.name == '我是陪练' ? app.globalData.Accompany : app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
                    payType: this.data.current == 3 ? 'balance' : 'wechatpay',
                    venueid: app.globalData.venueid,
                    refereefee: app.globalData.refereefee,
                    RefereeNumber: app.globalData.RefereeNumber,
                    Refereegrade: app.globalData.Refereegrade,
                    Agemin: app.globalData.Agemin,
                    Agemax: app.globalData.Agemax,
                    SiteSumMoney: app.globalData.SiteSumMoney,
                    volumeMoney: this.data.volumeMoney,
                    volumedetail: this.data.volumedetail,
                    hbmedetail: this.data.hbmedetail,
                    hbMoney: this.data.hbMoney,
                    Insurance: this.data.checkedFlag == true ? '1' : '0',
                    PipeMain: app.globalData.PipeMain,
                    PipeMainMoney: app.globalData.PipeMainMoney,
                    lr: wx.getStorageSync('bookinSix').data[0].lr,
                    openPrice: wx.getStorageSync('bookinSix').data[0].openPrice

                  }
                  util.Request("/api/userAddActivity_ADD", obj, "post",
                    (res) => {

                      if (res.data.code == 2000) {
                        wx.removeStorage({
                          key: 'bookinSix'
                        })
                        wx.navigateTo({
                          url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&typeInfo=0' + '&referee=' + app.globalData.refereefee + '&status=1' + '&lt=' + app.globalData.lr,
                        })
                      }else if(res.data.code==4004){
                        wx.showToast({
                          title: '请去APP实名认证',
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })
                      } else {
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })

                      }
                    },
                    () => {
                      console.log("失败")
                    },
                    () => {}
                  )
                } else {
                  let obj = {
                    sportid: app.globalData.sportid,
                    sportType: app.globalData.sportType,
                    SportMode: app.globalData.SportMode,
                    siteUid: app.globalData.siteUid,
                    StartTime: app.globalData.StartTime,
                    PlayTime: app.globalData.PlayTime,
                    SiteMoney: app.globalData.SiteMoney - this.data.volumeMoney,
                    PaySiteMoneyType: app.globalData.PaySiteMoneyType,
                    teamSex: app.globalData.teamSex,
                    LevelMin: app.globalData.LevelMin,
                    LevelMax: app.globalData.LevelMax,
                    Tips: app.globalData.SportMode == 1 ? app.globalData.Tips : 0 || app.globalData.SportMode == 2 ? app.globalData.Tips : 0,
                    comments: app.globalData.comments,
                    member: app.globalData.member.length === 0 ? '' : JSON.stringify(app.globalData.member),
                    MoneyPerhour: app.globalData.name == '我找陪练' || app.globalData.name == '我是陪练' ? app.globalData.Accompany : app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
                    payType: this.data.current == 3 ? 'balance' : 'wechatpay',
                    venueid: app.globalData.venueid,
                    refereefee: app.globalData.refereefee,
                    RefereeNumber: app.globalData.RefereeNumber,
                    Refereegrade: app.globalData.Refereegrade,
                    Agemin: app.globalData.Agemin,
                    Agemax: app.globalData.Agemax,
                    SiteSumMoney: app.globalData.SiteSumMoney,
                    volumeMoney: this.data.volumeMoney,
                    volumedetail: this.data.volumedetail,
                    hbmedetail: this.data.hbmedetail,
                    hbMoney: this.data.hbMoney,
                    Insurance: this.data.checkedFlag == true ? '1' : '0',
                    openPrice: app.globalData.openPrice,
                    lr: app.globalData.lr,
                    PipeMain:0
                  }

                  util.Request("/api/userAddActivity_ADD", obj, "post",
                    (res) => {
                      if (res.data.code == 2000) {
                        wx.removeStorage({
                          key: 'bookin'
                        })
                        wx.removeStorage({
                          key: 'bookinThree'
                        })

                        wx.removeStorage({
                          key: 'bookinFive'
                        })
                        wx.removeStorage({
                          key: 'bookinFour'
                        })

                      
                        wx.navigateTo({
                          url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&typeInfo=0' + '&referee=' + res.data.data.referee + '&status=1' + '&time=' + res.data.data.CreateTime,
                        })
                      }else if(res.data.code==4004){
                        wx.showToast({
                          title: '请去APP实名认证',
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })
                      } else {
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })

                      }
                    },
                    () => {
                      console.log("失败")
                    },
                    () => {}
                  )
                }






              } else if (this.data.ko == 1) {
                util.Request("/api/userSignUp", {
                    inviteId: app.globalData.inviteId,
                    team: Number(app.globalData.team),
                    SecondSportId: app.globalData.SecondSportId,
                    startTime: app.globalData.startTime,
                    playTime: app.globalData.playTime,
                    FirstSportId: app.globalData.sportid,
                    volumeMoney: this.data.volumeMoney,
                    volumedetail: this.data.volumedetail,
                    hbmedetail: this.data.hbmedetail,
                    hbMoney: this.data.hbMoney,
                    pos: app.globalData.pos,
                    payType: this.data.current == 3 ? 'balance' : 'wechatpay',
                    small: 1,
                    openID: wx.getStorageSync('openid'),
                    Insurance: this.data.checkedFlag == true ? '1' : 0
                  }, "post",
                  (res) => {
                    wx.hideLoading()
                    if (res.data.code == 2000) {
                      wx.showToast({
                        title: res.data.mag,
                        icon: 'none',
                        duration: 1500,
                        mask: true
                      })
                      wx.removeStorage({
                        key: 'bookinTwo'
                      })
                      wx.navigateTo({
                        url: '/generalization/createSuccess/createSuccess?inviteId=' + app.globalData.inviteId + '&Identification=2' + '&typeInfo=0' + '&referee=' + app.globalData.refereefee + '&status=1' + '&time=' + app.globalData.CreateTime,
                      })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500,
                        mask: true
                      })

                    }




                  },
                  () => {
                    console.log("失败")
                  },
                  () => {}
                )

              }



            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500,
                mask: true
              })
              this.setData({
                pwdVal: ''
              })

            }
          },
          () => {
            console.log("失败")
          },
          () => {}
        )

      }

    } else if (this.data.look == 2) {

      if (this.data.current == 1) {
        let obj = {
          sportid: app.userReserveVenue.sportid,
          sportType: app.userReserveVenue.sportType,
          siteUid: app.userReserveVenue.siteUid,
          StartTime: app.userReserveVenue.StartTime,
          PlayTime: app.userReserveVenue.PlayTime,
          SiteMoney: app.userReserveVenue.SiteMoney,
          comments: app.userReserveVenue.comments,
          payType: this.data.current == 3 ? 'balance' : 'wechatpay',
          venueid: app.userReserveVenue.venueid,
          breakup: app.userReserveVenue.sportType == 22 || app.userReserveVenue.sportType == 24 ? app.userReserveVenue.breakup : '',
          SiteSumMoney: app.userReserveVenue.SiteSumMoney,
          small: 1,
          volumeMoney: this.data.volumeMoney,
          volumedetail: this.data.volumedetail,
          hbmedetail: this.data.hbmedetail,
          hbMoney: this.data.hbMoney,
          openID: wx.getStorageSync('openid'),
        }
        util.Request("/api/userReserveVenue", obj, "post",
          (res) => {
            wx.hideLoading()
            let wxPay = res.data.data.sign_data.sign_data
            wx.requestPayment({
              'timeStamp': wxPay.timeStamp.toString(),
              'nonceStr': wxPay.nonceStr,
              'package': wxPay.package,
              'signType': 'MD5',
              'paySign': wxPay.sign,
              'success': function (res) {
                wx.removeStorage({
                  key: 'bookinTwo'
                })
                wx.navigateTo({
                  url: '/generalization/createSuccess/createSuccess?inviteId=' + app.globalData.inviteId + '&Identification=1' + '&typeInfo=1' + '&referee=0' + '&status=2',
                })
              },
              'fail': function (res) {
                console.log(res)
              },
            })

          },
          () => {
            console.log("失败")
          },
          () => {}
        )
      } else {
        util.Request("/api/checkPutMoneyPwdIsTrue", {
            password: val
          }, "post",
          (res) => {
            if (res.data.code == 2000) {
              this.setData({
                showPayPwdInput: false,
                payFocus: false,
                pwdVal: ''
              });

              let obj = {
                sportid: app.userReserveVenue.sportid,
                sportType: app.userReserveVenue.sportType,
                siteUid: app.userReserveVenue.siteUid,
                StartTime: app.userReserveVenue.StartTime,
                PlayTime: app.userReserveVenue.PlayTime,
                SiteMoney: app.userReserveVenue.SiteMoney,
                comments: app.userReserveVenue.comments,
                payType: this.data.current == 3 ? 'balance' : 'wechatpay',
                venueid: app.userReserveVenue.venueid,
                volumeMoney: this.data.volumeMoney,
                volumedetail: this.data.volumedetail,
                hbmedetail: this.data.hbmedetail,
                hbMoney: this.data.hbMoney,
                breakup: app.userReserveVenue.sportType == 22 || app.userReserveVenue.sportType == 24 ? app.userReserveVenue.breakup : '',
                SiteSumMoney: app.userReserveVenue.SiteSumMoney
              }
              util.Request("/api/userReserveVenue", obj, "post",
                (res) => {
                  if (res.data.code == 2000) {
                    wx.removeStorage({
                      key: 'bookinTwo'
                    })
                    wx.navigateTo({
                      url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&typeInfo=1' + '&referee=0' + '&status=2',
                    })
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 1500,
                      mask: true
                    })
                  }

                },
                () => {
                  console.log("失败")
                },
                () => {}
              )



            } else {

              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500,
                mask: true
              })
              this.setData({
                pwdVal: ''
              })
            }
          },
          () => {
            console.log("失败")
          },
          () => {}
        )
      }
    }
  },
  /**
   * 获取焦点
   */
  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  //支付
  payTo: function () {
   

    if (this.data.look == 2 || this.data.organization == 0) {

      if (this.data.current == 1) {
        wx.showLoading({
          title: '获取中~',
          mask: true
        });
        this.hidePayLayer()
      } else {
        if (Number(this.data.getElplainInfo.money) < Number(this.data.getElplainInfo.Total)) {
          wx.showToast({
            title: '钱包余额不足',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else {
          this.showInputLayer();
        }
      }
    } else {
      if(this.data.compensates == false ){
        wx.showToast({
          title: '请仔细阅读费用说明并勾选补偿金选项',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }else{
        if (this.data.current == 1) {
          wx.showLoading({
            title: '获取中~',
            mask: true
          });
          this.hidePayLayer()
        } else {
          if (Number(this.data.getElplainInfo.money) < Number(this.data.getElplainInfo.Total)) {
            wx.showToast({
              title: '钱包余额不足',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          } else {
            this.showInputLayer();
          }
        }
      }

     

    }


  },
  deductibles() {
    wx.navigateTo({
      url: '/generalization/deductibles/deductibles?siteMoney=' + this.data.getElplainInfo.field + '&offsetquota=' + this.data.getElplainInfo.offsetquota,
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [e.currentTarget.dataset.src]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.deductibles != undefined && app.deductibles.length != 0) {
      this.setData({
        volumedetail: app.deductibles.volumedetail,
        volumeMoney: app.deductibles.moneyNum.toFixed(2),
        exemption: (app.deductibles.moneyNum + Number(this.data.hbMoney)).toFixed(2),
        Moneytotal: (this.data.getElplainInfo.Total - app.deductibles.moneyNum-this.data.hbMoney) < 0 ? '0.01' : (this.data.getElplainInfo.Total - app.deductibles.moneyNum-this.data.hbMoney).toFixed(2)
      })
    } else {
      this.setData({
        volumedetail: '',
        volumeMoney: 0.00,
        exemption: Number(this.data.hbMoney).toFixed(2),
        Moneytotal: (this.data.getElplainInfo.Total-this.data.hbMoney - 0) < 0 ? '0.01' : (this.data.getElplainInfo.Total-this.data.hbMoney - 0).toFixed(2)
      })
    }
    if (app.envelope != undefined && app.envelope.length != 0) {
      this.setData({
        hbmedetail: app.envelope.uuid,
        hbMoney: app.envelope.money.toFixed(2),
        exemption: (app.envelope.money + Number(this.data.volumeMoney)).toFixed(2),
        Moneytotal: (this.data.getElplainInfo.Total - this.data.volumeMoney - app.envelope.money) <= 0 ? '0.01' : (this.data.getElplainInfo.Total - this.data.volumeMoney - app.envelope.money).toFixed(2)
      })
    } else {
      this.setData({
        hbmedetail: '',
        hbMoney: 0.00,
        exemption: Number(this.data.volumeMoney).toFixed(2),
        Moneytotal: (this.data.getElplainInfo.Total - this.data.volumeMoney -0) <= 0 ? '0.01' : (this.data.getElplainInfo.Total - this.data.volumeMoney - 0).toFixed(2)
      })
    }
    if(app.deductibles.length == 0&&app.envelope.length==0){
      this.setData({Moneytotal:'0.00'})
    }


  },

  closeTwo() {
    this.setData({
      maskingOne: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})