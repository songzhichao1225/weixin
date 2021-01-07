
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    userTechcoins:'',
    flag:false,
    coins: wx.getStorageSync('coins'),
    list: [1,2,4,8,16,32,64,128,256,512]
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getTechCoins", { }, "get", 
      (res) => {
        this.setData({ userTechcoins:res.data.data,flag:true})
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )
      

    
  },
  mall:function(){
    wx.navigateTo({
      url: '/pages/homePage/goldMall/goldMall'
    })
  },
 
  goldDetails:function(){
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=commonCoins'
    })
  },
  golDranking: function () {
    wx.navigateTo({
      url: '/pages/golDranking/golDranking'
    })
  },
  generaGold: function () {
    wx.navigateTo({
      url: '/pages/homePage/generalGold/generalGold'
    })
  },
  techCoins:function(){
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=techCoins'
    })
  },
})
