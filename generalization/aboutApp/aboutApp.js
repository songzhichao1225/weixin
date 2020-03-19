
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
 privacy:function(){
   wx.navigateTo({
     url: '/generalization/privacy/privacy',
   })
 },

   
  about:function(){ 
    wx.navigateTo({
      url: '/generalization/paymentCode/paymentCode'
    })
  }, 
}) 




  