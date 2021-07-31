const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    code: '',
    mobile: '',
    obtain: '获取',
    flag: true
  },
  onLoad: function() {
    wx.hideLoading()
  },

  //获取验证码

  phoneNum: function(e) {
    this.setData({
      mobile: e.detail.value  
    })
  },
  obtain: function () {
    let { mobile } = this.data
    util.request("/api/toSendCode", {
      'mobile': mobile,
      'type': 'bindmobile'
    }, "post",
      (res) => {
        this.setData({
          obtain: 60
        })
        let that = this
        let timer = setInterval(function () {
          that.setData({
            obtain: that.data.obtain - 1,
            flag: false
          })
          if (that.data.obtain == 0) {
            clearInterval(timer)
            that.setData({
              obtain: '获取',
              flag: true
            })
          }
        }, 1000)
      },
      () => {
      },
      () => { }
    )

  },
  inpurNum: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //绑定
  binDing: function() {
    let { 
      code,
      mobile
    } = this.data
    util.request("/api/bindmobile", {
        'mobile':mobile,
        'code': code,
        'wechatid': wx.getStorageSync('openid')
      }, "post",
      (res) => {
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/homePage/content/content'
          }) 
        })
      },
      () => {
      },
      () => {}
    )
  },
})