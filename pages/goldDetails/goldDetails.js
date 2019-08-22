//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    goldList: []
  },
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    util.Request("/api/getUserGoldLst", { 'goldType': option.goldType,"sportType":'足球' }, "get", 
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
