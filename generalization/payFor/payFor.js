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
    look:0,
    ko:0,
    volumeMoney:0,
    volumedetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      look:options.look,
      ko:options.ko,
      mode: wx.getStorageSync('mode')
    })
    
    if (options.look == 1) {
      this.setData({
        modeNum: app.globalData.SportMode,
        Referee: app.globalData.refereefee
      })
      

      let obj = {
        sportModes: app.globalData.SportMode,
        siteMoney: app.globalData.SiteMoney,
        number: app.globalData.number,
        PayMoneyType: app.globalData.PaySiteMoneyType,
        isPublisher: app.globalData.isPublisher,
        isCooper: 1,
        sportid: app.globalData.sportid,
        Accompany: app.globalData.SportMode == '3' ? app.globalData.Tips : 0 || app.globalData.SportMode == '4' ? app.globalData.Tips : 0,
        Reward: app.globalData.SportMode == '1' ? app.globalData.Tips : 0 || app.globalData.SportMode == '2' ? app.globalData.Tips : 0,
        Referee: app.globalData.refereefee
      }
      util.Request("/api/getElplainInfo", obj, "get",
        (res) => {
          let k = res.data.data.Total.toString()
          if (k.indexOf('.')==-1){
            res.data.data.Total = res.data.data.Total+'.00'
          }
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
    } else if (options.look == 2) {
      let obj = {
        sportType: app.userReserveVenue.sportType,
        siteMoney: app.userReserveVenue.SiteMoney,
        siteUid: app.userReserveVenue.siteUid,
        sportid: app.userReserveVenue.sportid,
        StartTime: app.userReserveVenue.StartTime,
        PlayTime: app.userReserveVenue.PlayTime,
        venueid:app.userReserveVenue.venueid,
        breakup:app.userReserveVenue.sportType==22?app.userReserveVenue.breakup:''
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
  close:function(){
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    });
  },

  kop:function(){
    wx.navigateTo({
      url: '/generalization/paymentCode/paymentCode'
    })
  },


  hidePayLayer: function () {

    var val = this.data.pwdVal;

   if(this.data.look==1){

    if(this.data.current==1){
      if(this.data.ko!=1){
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
          member:app.globalData.member.length===0?'':JSON.stringify(app.globalData.member),
          MoneyPerhour: app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
          payType: this.data.current==3?'balance':'wechatpay',
          venueid: app.globalData.venueid,
          refereefee: app.globalData.refereefee,
          RefereeNumber: app.globalData.RefereeNumber,
          Refereegrade: app.globalData.Refereegrade,
          Agemin:app.globalData.Agemin,
          Agemax:app.globalData.Agemax,
          SiteSumMoney:app.globalData.SiteSumMoney,
          volumeMoney:this.data.volumeMoney,
          volumedetail:this.data.volumedetail
        }
        
        util.Request("/api/userAddActivity", obj, "post",
        (res) => {
         
            let wxPay=res.data.data.sign_data.sign_data
            wx.requestPayment({
              'timeStamp': wxPay.timeStamp.toString(),
              'nonceStr': wxPay.nonceStr,
              'package': wxPay.package,
              'signType': 'MD5',
              'paySign': wxPay.sign,
              'success':function(res) { console.log(res)},
              'fail':function(res) { console.log(res)},
           })
         
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
      }else if(this.data.ko==1){
        util.Request("/api/userSignUp", {
          inviteId: app.globalData.inviteId,
          team: Number(app.globalData.team),
          SecondSportId: app.globalData.SecondSportId,
          startTime:app.globalData.startTime,
          playTime:app.globalData.playTime,
          FirstSportId:app.globalData.sportid,
          volumeMoney:this.data.volumeMoney,
          volumedetail:this.data.volumedetail,
          pos:app.globalData.pos,
          payType: this.data.current==3?'balance':'wechatpay',
          small:1,
          openID:wx.getStorageSync('openid')
        }, "post",
        (res) => {
             var wxPay=res.data.data.sign_data.sign_data
             wx.requestPayment({
              'timeStamp': wxPay.timeStamp.toString(),
              'nonceStr': wxPay.nonceStr,
              'package': wxPay.package,
              'signType': 'MD5',
              'paySign': wxPay.sign,
              'success':function(res) { 
                wx.navigateTo({
                  url: '/generalization/createSuccess/createSuccess?inviteId=' + app.globalData.inviteId + '&Identification=2'+'&typeInfo=0'+ '&referee=' + app.globalData.refereefee + '&status=1' + '&time=' +app.globalData.CreateTime,
                })
              },
              'fail':function(res) { console.log(res)},
            

            })
          



          
          
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
  
      }
    }else{
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
  
          
          if(this.data.ko!=1){
            let obj = {
              sportid: app.globalData.sportid,
              sportType: app.globalData.sportType,
              SportMode: app.globalData.SportMode,
              siteUid: app.globalData.siteUid,
              StartTime: app.globalData.StartTime,
              PlayTime: app.globalData.PlayTime,
              SiteMoney: app.globalData.SiteMoney-this.data.volumeMoney,
              PaySiteMoneyType: app.globalData.PaySiteMoneyType,
              teamSex: app.globalData.teamSex,
              LevelMin: app.globalData.LevelMin,
              LevelMax: app.globalData.LevelMax,
              Tips: app.globalData.SportMode == 1 ? app.globalData.Tips : 0 || app.globalData.SportMode == 2 ? app.globalData.Tips : 0,
              comments: app.globalData.comments,
              member:app.globalData.member.length===0?'':JSON.stringify(app.globalData.member),
              MoneyPerhour: app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
              payType: this.data.current==3?'balance':'wechatpay',
              venueid: app.globalData.venueid,
              refereefee: app.globalData.refereefee,
              RefereeNumber: app.globalData.RefereeNumber,
              Refereegrade: app.globalData.Refereegrade,
              Agemin:app.globalData.Agemin,
              Agemax:app.globalData.Agemax,
              SiteSumMoney:app.globalData.SiteSumMoney,
              volumeMoney:this.data.volumeMoney,
              volumedetail:this.data.volumedetail
            }
            
            util.Request("/api/userAddActivity", obj, "post",
            (res) => {
              
              if (res.data.code == 2000) {
                wx.removeStorage({ key: 'bookin' })
                wx.navigateTo({
                  url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1'+'&typeInfo=0'  + '&referee=' + res.data.data.referee + '&status=1' + '&time=' + res.data.data.CreateTime,
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
          }else if(this.data.ko==1){
            util.Request("/api/userSignUp", {
              inviteId: app.globalData.inviteId,
              team: Number(app.globalData.team),
              SecondSportId: app.globalData.SecondSportId,
              startTime:app.globalData.startTime,
              playTime:app.globalData.playTime,
              FirstSportId:app.globalData.sportid,
              volumeMoney:this.data.volumeMoney,
              volumedetail:this.data.volumedetail,
              pos:app.globalData.pos,
              payType: this.data.current==3?'balance':'wechatpay',
              small:1,
              openID:wx.getStorageSync('openid')
            }, "post",
            (res) => {
              
                if(res.data.code==2000){
                  wx.showToast({
                    title: res.data.mag,
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                  wx.removeStorage({ key: 'bookinTwo' })
                  wx.navigateTo({
                    url: '/generalization/createSuccess/createSuccess?inviteId=' + app.globalData.inviteId + '&Identification=2'+'&typeInfo=0'+ '&referee=' + app.globalData.refereefee + '&status=1' + '&time=' +app.globalData.CreateTime,
                  })
                }else{
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
  
  
        }
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  
    }
   
   }else if(this.data.look==2){

    if(this.data.current==1){
      let obj = {
        sportid: app.userReserveVenue.sportid,
        sportType: app.userReserveVenue.sportType,
        siteUid: app.userReserveVenue.siteUid,
        StartTime: app.userReserveVenue.StartTime,
        PlayTime: app.userReserveVenue.PlayTime,
        SiteMoney: app.userReserveVenue.SiteMoney,
        comments: app.userReserveVenue.comments,
        payType: this.data.current==3?'balance':'wechatpay',
        venueid: app.userReserveVenue.venueid,
        breakup:app.userReserveVenue.sportType==22?app.userReserveVenue.breakup:'',
        SiteSumMoney:app.userReserveVenue.SiteSumMoney
      }
      util.Request("/api/userReserveVenue", obj, "post",
        (res) => {
          
            let wxPay=res.data.data.sign_data.sign_data
            wx.requestPayment({
              'timeStamp': wxPay.timeStamp.toString(),
              'nonceStr': wxPay.nonceStr,
              'package': wxPay.package,
              'signType': 'MD5',
              'paySign': wxPay.sign,
              'success':function(res) { console.log(res)},
              'fail':function(res) { console.log(res)},
           })
         
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
    }else{
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
            payType: this.data.current==3?'balance':'wechatpay',
            venueid: app.userReserveVenue.venueid,
            breakup:app.userReserveVenue.sportType==22?app.userReserveVenue.breakup:'',
            SiteSumMoney:app.userReserveVenue.SiteSumMoney
          }
          util.Request("/api/userReserveVenue", obj, "post",
            (res) => {
             
              if (res.data.code == 2000) {
                wx.navigateTo({
                  url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1'+'&typeInfo=1' + '&referee=' + res.data.data.referee + '&status=2' + '&time=' + res.data.data.CreateTime,
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
    if(this.data.current==1){
     this.hidePayLayer()
    }else{
      this.showInputLayer();
    }
    
      
    
  },
  deductibles(){
    wx.navigateTo({
      url: '/generalization/deductibles/deductibles?siteMoney='+this.data.getElplainInfo.siteMoney+'&offsetquota='+this.data.getElplainInfo.offsetquota,
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
    if(app.deductibles!=undefined&&app.deductibles.length!=0){
      this.setData({volumedetail:app.deductibles.volumedetail,volumeMoney:app.deductibles.moneyNum.toFixed(2)})
    }else{
      this.setData({volumedetail:'',volumeMoney:0})
    }
    app.deductibles=[]
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