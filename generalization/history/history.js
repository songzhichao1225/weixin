
const util = require('../../utils/util.js')

Page({
  data: {
    historyList:[]
  },
  onLoad: function (option) {

    util.Request("/api/getConsultativeHistory", { 'publicUUID': option.uuid }, "post",
      (res) => {
        this.setData({historyList:res.data.data})
      },
      () => { console.log("失败") },
      () => {
      }
    )
    wx.hideLoading()
  },
 
})
