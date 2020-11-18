//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    goldNum: '',
    flag:false,
    img:'',
  },
  onLoad: function(option) {

    this.setData({
      img:util.API
    })
    wx.showLoading({
      title: '',
      mask: true
    })

    util.request("/api/getGoodsLst", {
        'category': "全部",
        "page": "1"
      }, "get",
      (res) => {
        this.setData({
          goldMall: res.data.data.Lst,
          goldNum: option.goldNum,
          flag:true
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )

  },
  //跳转商品详情
  details: function(e) {
    let uuid = e.currentTarget.dataset.uuid
    let name = e.currentTarget.dataset.name
    let cost = e.currentTarget.dataset.cost
    wx.navigateTo({
      url: '/pages/homePage/mallDetails/mallDetails?uuid=' + uuid + '&name=' + name + '&cost=' + cost
    })
  },
  viewMore: function() {
    wx.navigateTo({
      url: '/pages/homePage/goldMall/goldMall'
    })
  },
  goldDetails:function(){
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=commonCoins'
    })
  },
})