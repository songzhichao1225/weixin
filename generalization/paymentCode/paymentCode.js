// generalization/paymentCode/paymentCode.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone: '',
    text: '获取验证码',
    codeNum: '',
    passOne:'',
    passTwo:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('phone'))
    this.setData({
      telephone:wx.getStorageSync('phone')==''?wx.getStorageSync('telephone').slice(0, 3) + '****' + wx.getStorageSync('phone').slice(7, 11) :wx.getStorageSync('phone').slice(0, 3) + '****' + wx.getStorageSync('phone').slice(7, 11),
      
    })
    wx.hideLoading()
  },
  code: function () {
    if (this.data.text != '获取验证码') {
      wx.showToast({
        title: '请勿频繁操作',
        icon: 'none',
        duration: 1500,
        mask: true
      })


    } else {
      util.request("/api/toSendCode", {
          'mobile': wx.getStorageSync('phone')==''?wx.getStorageSync('telephone'):wx.getStorageSync('phone'),
          'type': 'putMoney'
        }, "post",
        (res) => {
          if (res.data.code === 2000) {
            this.setData({
              text: 60
            })
            setInterval(() => {
              if (this.data.text == 0) {
                this.setData({
                  text: '获取验证码'
                })
                clearInterval()
              } else {
                this.setData({
                  text: this.data.text - 1
                })
              }
            }, 1000)
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
  codeNum: function (e) {
    this.setData({
      codeNum: e.detail.value
    })
  },
  passOne:function(e){
    this.setData({
      passOne:e.detail.value
    })
  },
  passTwo:function(e){
    this.setData({
      passTwo:e.detail.value
    })
  },
  submit: function () {
    util.request("/api/checkCodeIsTrue", {
        'mobile': wx.getStorageSync('phone'),
        'code': this.data.codeNum,
        'type': 'putMoney'
      }, "post",
      (res) => {
        if (res.data.code == 2000) {
          util.Request("/api/setPutMoneyPwd", {
              'putMoneyPwd':this.data.passOne,
              'confirmPutMoneyPwd':this.data.passTwo,
            }, "post",
            (res) => {
             
              if(res.data.code==2000){
                wx.showToast({
                  title:res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                setTimeout(()=>{
                  wx.navigateBack({
                    delta: 1
                  })
                },2000)

              }else{
                wx.showToast({
                  title:res.data.msg,
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