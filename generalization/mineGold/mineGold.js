
const util = require('../../utils/util.js')

Page({
  data: {
    goldMall:[],
    img:''
  },
  onLoad: function () {
    this.setData({
      img:util.API
    })
    util.Request("/api/getGoodsLst", { category:'全部',page:1}, "get",
      (res) => {
       this.setData({
         goldMall: res.data.data.Lst
       })
      },
      () => { console.log("失败") },
      () => {
      }
    )
      

    wx.hideLoading()
  },
  golDranking:function(){

    wx.navigateTo({
      url: '/generalization/duiGolDranking/duiGolDranking?flag=1'
    })
  },
  goldMall:function(){
    wx.navigateTo({
      url: '/pages/homePage/goldMall/goldMall'
    })
    
  },
  goldDetail:function(){
    wx.navigateTo({
      url: '/pages/goldDetails/goldDetails?goldType=1'
    })

  },
   //跳转商品详情
  details: function (e) {
    let uuid = e.currentTarget.dataset.uuid
    let name = e.currentTarget.dataset.name
    let cost = e.currentTarget.dataset.cost
    wx.navigateTo({
      url: '/pages/homePage/mallDetails/mallDetails?uuid=' + uuid + '&name=' + name + '&cost=' + cost
    })


  },
  //跳转任务列表
  generalGold:function(){
    wx.navigateTo({
      url: '/pages/homePage/generalGold/generalGold'
    })

  },
  cost:function(e){
    wx.navigateTo({
      url: '/generalization/exchange/exchange?cost=' + e.currentTarget.dataset.cost + '&uuid=' + e.currentTarget.dataset.uuid
    })
  }
 
  
 
})
