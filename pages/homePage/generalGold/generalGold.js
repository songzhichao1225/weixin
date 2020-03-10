const util = require('../../../utils/util.js')

Page({
  data: {
    coins:0,
    isSign:0,

  },
  onLoad: function() {
    util.Request("/api/getCommonCoins", {}, "get",
      (res) => {
       this.setData({
         coins:res.data.data.coins
       })
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )
    util.Request("/api/getUserIsSign", {}, "get",
      (res) => {
        this.setData({
          isSign: res.data.data.isSign
        })
        
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )
    



    wx.hideLoading()
  },
// 签到
  Sign:function(){
    util.Request("/api/userSignIn", {}, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        if (res.data.code === 2000) {
          this.setData({
            isSign: 1
          })
        }

      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )
  }

})