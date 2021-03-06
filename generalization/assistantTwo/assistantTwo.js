//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    type:''
  },
  onLoad: function (option) {
    if(option.type==2){
      wx.setNavigationBarTitle({
        title: '关于对手果'
        }) 
    }else if(option.type==3){
      wx.setNavigationBarTitle({
        title: '关于技术分'
        }) 
    }else if(option.type==4){
      wx.setNavigationBarTitle({
        title: '关于人气指数'
        }) 
    }else if(option.type==5){
      wx.setNavigationBarTitle({
        title: '关于运动模式'
        }) 
    }else if(option.type==6){
      wx.setNavigationBarTitle({
        title: '关于偏好'
        }) 
    }else if(option.type==7){
      wx.setNavigationBarTitle({
        title: '关于裁判'
        }) 
    }else if(option.type==8){
      wx.setNavigationBarTitle({
        title: '关于截止报名时间'
        }) 
    }else if(option.type==9){
      wx.setNavigationBarTitle({
        title: '关于续时'
        }) 
    }else if(option.type==10){
      wx.setNavigationBarTitle({
        title: '关于球队'
        }) 
    }
    
    this.setData({type:option.type})
    console.log(option)
  }
})
