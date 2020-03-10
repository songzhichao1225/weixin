//logs.js
const util = require('../../../utils/util.js')
const cityList = require('../../../utils/cityList.js')
Page({
  data: {
    logs: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: false // 是否开启标题吸顶
    },
    city:[],
    myCity:''
  },
  onLoad: function () {
    let cityListSon = cityList.cityList().cityList
    for (let i in cityListSon) {
      for (let j in cityListSon[i].item) {
        let initial = cityListSon[i].item[j].key.slice(0, 1)
        switch (initial){
          case "f": cityListSon[i].item[j].key="F";
          break;
          case "g": cityListSon[i].item[j].key = "G";
            break;
          case "h": cityListSon[i].item[j].key = "H";
            break;
          case "j": cityListSon[i].item[j].key = "J";
            break;
          case "k": cityListSon[i].item[j].key = "K";
            break;
          case "l": cityListSon[i].item[j].key = "L";
            break;
          case "m": cityListSon[i].item[j].key = "M";
            break;
          case "n": cityListSon[i].item[j].key = "N";
            break;
          case "p": cityListSon[i].item[j].key = "P";
            break;
          case "q": cityListSon[i].item[j].key = "Q";
            break;
          case "r": cityListSon[i].item[j].key = "R";
            break;
          case "s": cityListSon[i].item[j].key = "S";
            break;
          case "t": cityListSon[i].item[j].key = "T";
            break;
          case "w": cityListSon[i].item[j].key = "W";
            break;
          case "x": cityListSon[i].item[j].key = "X";
            break;
          case "y": cityListSon[i].item[j].key = "Y";
            break;
          case "z": cityListSon[i].item[j].key = "Z";
            break;
        }
      }
    }
    wx.showLoading({
      title: '加载中',
    })
    // 模拟服务器请求异步加载数据
    setTimeout(() => {
      this.setData({
        city: cityListSon,
        myCity: wx.getStorageSync("cityInfo")
      })
      wx.hideLoading()
    }, 1000)
   
    
  },
  binddetail:function(e){
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      mydata: { city: e.detail.name, lat: e.detail.latitude, lng: e.detail.longitude } 
    })
    wx.navigateBack({
      delta: 1
    })
    
  }

})
