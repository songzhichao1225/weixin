var bmap = require("../../../utils/bmap-wx.min.js");
Page({
  data: {
    sugData: '',
    city:null,
  },
  // 绑定input输入 
  bindKeyInput: function (e) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'ElFBk4MF87qZXoiLbD0zofEmZIS6bHT2'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
     
      
      
      that.setData({
        sugData: data.result
      });
    }
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: this.data.city,
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  onLoad:function(option){
    console.log(option)
    this.setData({city:option.city})
    wx.hideLoading()
  },
  //选择地址返回上级
  selectAddress:function(e){
    let city = e.currentTarget.dataset.name
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      cityData: { city: city}
    })
    wx.navigateBack({
      delta: 1
    })
  }
}) 
