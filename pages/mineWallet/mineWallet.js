//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    total:'',
    flag:false
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getUserMoneyCount", {  }, "get",
      (res) => {
      
        this.setData({total:res.data.data.total,flag:true})
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )

 
  },
  details(){
    wx.navigateTo({
      url: '/generalization/walletDetails/walletDetails'
    })
  },
})
