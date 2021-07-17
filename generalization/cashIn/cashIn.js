const util = require('../../utils/util.js')
Page({

  data: {
    goldNum: 0,
    input: '',
    showPayPwdInput: false, //是否展示密码输入层
  },

  onLoad: function () {
    util.Request("/api/getCommonCoins", {}, "get",
      (res) => {
        this.setData({
          goldNum: res.data.data.coins.toFixed(2)
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  input: function (e) {
    this.setData({
      input: e.detail.value
    })
  },
  clickAll: function () {
    this.setData({
      input: this.data.goldNum
    })
  },



  close: function () {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    });
  },

  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });
    if (e.detail.value.length >= 6) {
      util.Request("/api/checkPutMoneyPwdIsTrue", {
          password: e.detail.value
        }, "post",
        (res) => {
          if (res.data.code == 2000) {
            this.hidePayLayer();
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
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

  kop: function () {
    wx.navigateTo({
      url: '/generalization/paymentCode/paymentCode'
    })
  },

  hidePayLayer: function () {
    util.Request("/api/CounterCurrencyExchange", {
        currency: this.data.input
      }, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        this.setData({
          showPayPwdInput: false,
          payFocus: false,
          pwdVal: '',
          input:''
        })
        this.onLoad()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  btnComfir: function () {
    this.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },


})