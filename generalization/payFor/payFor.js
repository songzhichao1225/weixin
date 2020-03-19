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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      look:options.look 
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
      util.request("/api/getElplainInfo", obj, "get",
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
    } else if (options.look == 2) {
      let obj = {
        sportType: app.userReserveVenue.sportType,
        siteMoney: app.userReserveVenue.SiteMoney,
        siteUid: app.userReserveVenue.siteUid,
        sportid: app.userReserveVenue.sportid,
        StartTime: app.userReserveVenue.StartTime,
        PlayTime: app.userReserveVenue.PlayTime,
      }
      util.request("/api/getOrders", obj, "get",
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
  hidePayLayer: function () {

    var val = this.data.pwdVal;

   if(this.data.look==1){
    util.Request("/api/checkPutMoneyPwdIsTrue", {
      password: val
    }, "post",
    (res) => {
      console.log(res)
      if (res.data.code == 2000) {
        this.setData({
          showPayPwdInput: false,
          payFocus: false,
          pwdVal: ''
        });

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
          member: JSON.stringify(app.globalData.member),
          MoneyPerhour: app.globalData.SportMode == 3 ? app.globalData.Tips : 0 || app.globalData.SportMode == 4 ? app.globalData.Tips : 0,
          payType: 'balance',
          venueid: app.globalData.venueid.slice(0, app.globalData.venueid.length - 1),
          refereefee: app.globalData.refereefee,
          RefereeNumber: app.globalData.RefereeNumber,
          Refereegrade: app.globalData.Refereegrade,
          Agemin:app.globalData.Agemin,
          Agemax:app.globalData.Agemax
        }
        util.Request("/api/userAddActivity", obj, "post",
          (res) => {
            console.log(res)
            if (res.data.code == 2000) {
              wx.navigateTo({
                url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&referee=' + res.data.data.referee + '&status=1' + '&time=' + res.data.data.CreateTime,
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

   }else if(this.data.look==2){

    util.Request("/api/checkPutMoneyPwdIsTrue", {
      password: val
    }, "post",
    (res) => {
      console.log(res)
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
          payType: 'balance',
          venueid: app.userReserveVenue.venueid.slice(0, app.userReserveVenue.venueid.length - 1),
        }
        util.Request("/api/userReserveVenue", obj, "post",
          (res) => {
            console.log(res)
            if (res.data.code == 2000) {
              wx.navigateTo({
                url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&referee=' + res.data.data.referee + '&status=2' + '&time=' + res.data.data.CreateTime,
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
    console.log(this.data.current)
    if (this.data.current == 3) {
      this.showInputLayer();
    }




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