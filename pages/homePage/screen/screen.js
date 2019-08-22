//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    dataIndex: null,
    siteIndex: 0,
    sexIndex: 2,
  },
  onLoad: function() {
    
    if (wx.getStorageSync('dataIndex') != '' || wx.getStorageSync('siteIndex') != '' || wx.getStorageSync('sexIndex')!=''){
      this.setData({
        dataIndex: wx.getStorageSync('dataIndex'),
        siteIndex: wx.getStorageSync('siteIndex'),
        sexIndex: wx.getStorageSync('sexIndex')
      })
    }
      
     
   
  },
  //选中运动模式
  modeTap: function(e) {
    let dataIndex = e.currentTarget.dataset.num
    this.setData({
      dataIndex: dataIndex
    })
  },
  //选中场地方式
  siteTap: function(e) {
    let siteIndex = e.currentTarget.dataset.num
    this.setData({
      siteIndex: siteIndex
    })
    
  },
  //选中性别
  sexTap: function(e) {
    let sexIndex = e.currentTarget.dataset.num
    this.setData({
      sexIndex: sexIndex
    })
    
  },
  confirm: function() {
    let {
      dataIndex,
      siteIndex,
      sexIndex
    } = this.data
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      screenData: {
        sportMode: dataIndex,
        payType: siteIndex,
        sex: sexIndex
      }
    })
    wx.setStorageSync('dataIndex', dataIndex)
    wx.setStorageSync('siteIndex', siteIndex)
    wx.setStorageSync('sexIndex', sexIndex)
    wx.navigateBack({
      delta: 1
    })
  }

})