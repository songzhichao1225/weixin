const util = require('../../utils/util.js')
Page({

  data: {
    goldNum: 0,
    input: '',
    inputTwo:0.00,
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
      },
      () => {}
    )
  },
  input: function (e) {
    this.setData({
      input: e.detail.value,
      inputTwo:Number(e.detail.value)/50
    })
  },
  clickAll: function () {
    this.setData({
      input: Math.floor(this.data.goldNum),
      inputTwo:Math.floor(Number(this.data.goldNum)/50)
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
      },
      () => {}
    )
  },

  btnComfir: function () {
    if(this.data.input==''||this.data.input==0){
      wx.showToast({
        title: '请正确输入对手果数量',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        showPayPwdInput: true,
        payFocus: true
      })
    }
    
  },


})