const util = require('../../utils/util.js')
var app = getApp();
Page({


  data: {
    orderMent: [],
    type: 1,
    Moneytotal: 0.00,
    exemption: 0.00,
    organization: 0,
    showPayPwdInput: false,
    pwdVal: '',
    payFocus: true, //文本框焦点
  },

  onLoad: function (options) {
    this.setData({
      publicuuid: options.uuid,
      startTime: options.startTime,
      sec: options.sec
    })
    app.deductibles = []
    app.envelope = []
    util.Request("/api/getOrderPayment", {
        publicuuid: options.uuid,
        time: options.startTime,
        playtime: options.sec
      }, "post",
      (res) => {
        this.setData({
          orderMent: res.data.data
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )

  },
  payFun: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },

  redEnvelope() {
    wx.navigateTo({
      url: '/generalization/redEnvelope/redEnvelope'
    })
  },

  deductibles() {
    wx.navigateTo({
      url: '/generalization/deductibles/deductibles?siteMoney=' + this.data.orderMent.sitemoney + '&offsetquota=' + this.data.orderMent.offsetquota,
    })
  },

  onShow: function () {
    if (app.deductibles != undefined && app.deductibles.length != 0) {
      this.setData({
        volumedetail: app.deductibles.volumedetail,
        volumeMoney: app.deductibles.moneyNum.toFixed(2),
        exemption: (app.deductibles.moneyNum + Number(this.data.hbMoney)).toFixed(2),
        Moneytotal: (this.data.orderMent.sitemoney - app.deductibles.moneyNum - this.data.hbMoney) < 0 ? '0.01' : (this.data.orderMent.sitemoney - app.deductibles.moneyNum - this.data.hbMoney).toFixed(2)
      })
    } else {
      this.setData({
        volumedetail: '',
        volumeMoney: 0.00,
        exemption: Number(this.data.hbMoney).toFixed(2),
        Moneytotal: (this.data.orderMent.sitemoney - this.data.hbMoney - 0) < 0 ? '0.01' : (this.data.orderMent.sitemoney - this.data.hbMoney - 0).toFixed(2)
      })
    }
    if (app.envelope != undefined && app.envelope.length != 0) {
      this.setData({
        hbmedetail: app.envelope.uuid,
        hbMoney: app.envelope.money.toFixed(2),
        exemption: (app.envelope.money + Number(this.data.volumeMoney)).toFixed(2),
        Moneytotal: (this.data.orderMent.sitemoney - this.data.volumeMoney - app.envelope.money) <= 0 ? '0.01' : (this.data.orderMent.sitemoney - this.data.volumeMoney - app.envelope.money).toFixed(2)
      })
    } else {
      this.setData({
        hbmedetail: '',
        hbMoney: 0.00,
        exemption: Number(this.data.volumeMoney).toFixed(2),
        Moneytotal: (this.data.orderMent.sitemoney - this.data.volumeMoney - 0) <= 0 ? '0.01' : (this.data.orderMent.sitemoney - this.data.volumeMoney - 0).toFixed(2)
      })
    }
    if (app.deductibles.length == 0 && app.envelope.length == 0) {
      this.setData({
        Moneytotal: '0.00'
      })
    }
  },

  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  close: function () {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    });
  },



  btnComfir: function () {
    wx.showLoading({
      title: '获取中~',
      mask: true
    });
    if (this.data.type == 1) {
      util.Request("/api/RenewalSettlement", {
          type: 'wechatpay',
          publicuuid: this.data.publicuuid,
          time: this.data.startTime,
          playtime: this.data.sec,
          volumeMoney: this.data.volumeMoney,
          volumedetail: this.data.volumedetail,
          hbmedetail: this.data.hbmedetail,
          hbMoney: this.data.hbMoney,
          small: 1,
          openID: wx.getStorageSync('openid'),
        }, "post",
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
              app.deductibles = []
              app.envelope = []
              wx.showToast({
                title: '续时成功',
                icon: 'success',
                duration: 1500,
                mask: true
              })
              setTimeout(function(){
                wx.navigateBack({
                  delta: 2,
                })
              },1500)
            },
            'fail': function (res) {
            },
          })

          wx.hideLoading()
        },
        () => {
        },
        () => {}
      )

    } else if (this.data.type == 2) {
      wx.hideLoading()
      if (Number(this.data.orderMent.playermoney) > Number(this.data.orderMent.sitemoney)) {
        util.Request("/api/checkIsPutMoneyPwd", {small:1}, "post",
          (res) => {
            if (res.data.code == 2000) {
              this.setData({
                showPayPwdInput: true,
                payFocus: true
              });
            } else if (res.data.code == 4002) {
              wx.showModal({
                title: '温馨提示',
                confirmText: '去设置',
                content: '您还没有设置提现密码，现在去设置吗？',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/generalization/paymentCode/paymentCode'
                    })
                  } else if (res.cancel) {}
                }
              })
            }

          },
          () => {
          },
          () => {}
        )

      } else {
        wx.showToast({
          title: '钱包余额不足',
          icon: 'none',
          duration: 1500,
          mask: true
        })
      }



    }

  },

  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });

    if (e.detail.value.length >= 6) {
      util.Request("/api/checkPutMoneyPwdIsTrue", {
          password: e.detail.value,
        }, "post",
        (res) => {
          if (res.data.code == 2000) {
            this.setData({
              showPayPwdInput: false,
              payFocus: false,
              pwdVal: ''
            });
            util.Request("/api/RenewalSettlement", {
                type: 'balance',
                publicuuid: this.data.publicuuid,
                time: this.data.startTime,
                playtime: this.data.sec,
                volumeMoney: this.data.volumeMoney,
                volumedetail: this.data.volumedetail,
                hbmedetail: this.data.hbmedetail,
                hbMoney: this.data.hbMoney,
              }, "post",
              (res) => {
                if (res.data.code == 2000) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1500,
                    mask: true
                  })
                  app.deductibles = []
                  app.envelope = []
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 2,
                    })
                  },1500)
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                }

                wx.hideLoading()
              },
              () => {
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
        },
        () => {}
      )
    }
  },


})