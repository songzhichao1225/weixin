const util = require('../../../utils/util.js')

Page({
  data: {
    goldNum: 0,
    isSign: 0
  },
  onLoad: function () {
    util.Request("/api/getUserIsSign", {}, "get",
      (res) => {
        this.setData({
          isSign: res.data.data.isSign
        })
      },
      () => {},
      () => {

      }
    )
  },
  money: function () {
    if (Number(this.data.goldNum) >= 2000) {
      wx.navigateTo({
        url: '/generalization/cashIn/cashIn'
      })
    } else {
      wx.showToast({
        title: '对手果数量大于2000才可以兑换噢',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },
  redemption: function () {
    if (Number(this.data.goldNum) >= 100) {
      wx.navigateTo({
        url: '/generalization/redemption/redemption'
      })
    } else {
      wx.showToast({
        title: '对手果数量大于100才可以兑换噢',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },
  goldDetails: function () {
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=1'
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中~',
    })
    util.Request("/api/getCommonCoins", {}, "get",
      (res) => {
        this.setData({
          goldNum: res.data.data.coins.toFixed(2)
        })
        wx.hideLoading()
      },
      () => {},
      () => {

      }
    )
  },
  punchIn: function () {
    util.Request("/api/userSignIn", {}, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1500,
          mask: true
        })
        util.Request("/api/getUserIsSign", {}, "get",
        (res) => {
          this.setData({
            isSign: res.data.data.isSign
          })
        },
        () => {},
        () => {
  
        }
      )
      },
      () => {},
      () => {

      }
    )
  },
  publishing:function(){
    wx.reLaunch({
      url: '/pages/publishing/publishing?indexSw=0'
    })
  },
  mineOpinion:function(){
    wx.navigateTo({
      url: '/pages/mineOpinion/mineOpinion'
    })
   
  },
 


})