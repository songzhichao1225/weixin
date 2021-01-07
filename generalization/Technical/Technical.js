const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    userTechcoins: '',
    flag: false,
    coins: wx.getStorageSync('coins'),
    list: [2.5, 5.0, 10.0, 20.0, 40.0, 80.0, 160.0, 320.0, 640.0, 1280.0,2560.0,5120.0,10240.0,20480.0,40960.0],
    listTwo:[20,40,80,160,320,640,1280,2560,5120,10240,20480,40960,81920,163840,327680]
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getTechCoins", {}, "get",
      (res) => {
        this.setData({ userTechcoins: res.data.data, flag: true })
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )



  },
  mall: function () {
    wx.navigateTo({
      url: '/pages/homePage/goldMall/goldMall'
    })
  },

  goldDetails: function () {
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=commonCoins'
    })
  },
  golDranking: function () {
    wx.navigateTo({
      url: '/generalization/duiGolDranking/duiGolDranking?flag=2'
    })
  },
  generaGold: function () {
    wx.navigateTo({
      url: '/pages/homePage/generalGold/generalGold'
    })
  },
  techCoins: function () {
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=2'
    })
  },
 
})