
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
      phoneNumber: '18567837551'
    })
  },     

   
  about:function(){ 
    wx.navigateTo({
      url: '/generalization/aboutMine/aboutMine'
    })
  }, 
}) 




  