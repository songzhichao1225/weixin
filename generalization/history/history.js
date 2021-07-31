
const util = require('../../utils/util.js')

Page({
  data: {
    historyList:[],
    img:''
  },
  onLoad: function (option) {
    this.setData({
      img:util.API
    })
    util.Request("/api/getConsultativeHistory", { 'publicUUID': option.uuid }, "post",
      (res) => {
        this.setData({historyList:res.data.data})
      },
      () => { },
      () => {
      }
    )
    wx.hideLoading()
  },
 
})
