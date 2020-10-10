
const util = require('../../utils/util.js')

Page({
  data: {
    sportid:0,//运动项目id
    sportName:'',//运动项目名称
    sporttype:'',//运动项目二级id
    sporttypeName:'',//运动项目二级名称
  },
  onLoad: function (option) {
    
  },

  sportsList: function() {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=3"
    })
  },
  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(currPage.data.sportsListThree!==undefined){
      console.log(currPage.data.sportsListThree)
      this.setData({
        sportid:currPage.data.sportsListThree.id,
        sportName:currPage.data.sportsListThree.name,
        sporttype:currPage.data.sportsListThree.sporttype,
        sporttypeName:currPage.data.sportsListThree.nametwo
      })
    }
    wx.hideLoading()
  }
  
})
