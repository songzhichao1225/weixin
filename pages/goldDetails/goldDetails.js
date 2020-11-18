//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    goldList: []
  },
  onLoad: function (option) {
    wx.showLoading({
      title: '',
      mask: true
    })
    console.log(option)
    util.Request("/api/getUserGoldLst", { 'goldType': 'commonCoins', }, "get", 
      (res) => {
        this.setData({goldList:res.data.data.goldLst})
        wx.hideLoading()
      },
      () => { console.log("失败")},
      () => { 
      }
    )
    wx.hideLoading()       
  }
})
