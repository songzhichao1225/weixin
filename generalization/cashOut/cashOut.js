const util = require('../../utils/util.js')
Page({

  data: {
    total: 0,
    input: '',
    showPayPwdInput: false, //是否展示密码输入层
    type:1,
    payFocus:false
  },

  onLoad: function (options) {

    util.Request("/api/checkUserBindWechat", {}, "post",
    (res) => {
      if (res.data.code == 2000) {
        this.setData({type:res.data.data.type})
      }

      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )


    this.setData({
      total: options.money
    })
    wx.hideLoading()
  },
  input: function (e) {
    this.setData({
      input: Number(e.detail.value)
    })
  },
  allMoney: function () {
    this.setData({
      input: Math.trunc(this.data.total)
    })
  },

  bindComfire: function () {
    util.Request("/api/checkIsPutMoneyPwd", {small:1},"post",
    (res) => {
      if (res.data.code == 2000) {
        if(Number(this.data.input)!=0){
          if(Number(this.data.total)>=Number(this.data.input)){
            this.setData({
              showPayPwdInput: true,
              payFocus: true
            })
          }else{
            wx.showToast({
              title: '用户余额不足',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        }else{
          wx.showToast({
            title: '提现金额过低',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
       
      }else if(res.data.code==4002){
        wx.showModal({
          title: '温馨提示',
          confirmText:'去设置',
          content: '您还没有设置提现密码，现在去设置吗？',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/generalization/paymentCode/paymentCode'
              })
            } else if (res.cancel) {
            }
          }
        })
      }

    },
    () => {
      console.log("失败")
    },
    () => {}
  )



  
   
  },

  getFocus: function () {
    this.setData({
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
            this.setData({
              showPayPwdInput: false,
              payFocus: false,
              pwdVal: ''
            });
            this.bindComfireTwo()
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
            this.setData({
              pwdVal: ''
            });
          }

          wx.hideLoading()
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
    }
  },


  bindComfireTwo: function () {
    util.Request("/api/userPutForward", {
        putMoney: this.data.input,
        putType: 'wechat',
        un:wx.getStorageSync('unionid'),
        wechatID: wx.getStorageSync('openid'),
        wechat_type:2
      }, "post",
      (res) => {
        if (res.data.code == 2000) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
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

  kop: function () {
    wx.navigateTo({
      url: '/generalization/paymentCode/paymentCode'
    })
  },

})