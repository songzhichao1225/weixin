
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
  wx.hideLoading()
  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '010-895077'
    })
  },     

   
  about:function(){ 
    wx.navigateTo({
      url: '/pages/aboutMine/aboutMine'
    })
  }, 
}) 




  