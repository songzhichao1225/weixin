//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    attendance:[]
  },
  onLoad: function () {
    util.Request("/api/helpCenterList", {}, "post", 
   (res) => {
     this.setData({
      attendance:res.data.data
     })
     wx.hideLoading()
   },
   () => { console.log("失败") },
   () => {
   }
 )
  },
  details(e){
    wx.navigateTo({
      url: '/generalization/assistantTwo/assistantTwo?type='+e.currentTarget.dataset.type,
    })
  }
  
})
