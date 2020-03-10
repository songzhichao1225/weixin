const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportsList:[],
    indexSport:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    util.request("/api/getAllSportLst", {}, "get",
      (res) => {
       this.setData({
         sportsList:res.data.data
       })

        wx.hideLoading()
        
      
      },
      () => { console.log("失败") },
      () => {
        console.log("接口调用结束的回调函数")
      }
    )

    

  },
  select:function(e){
   this.setData({
     indexSport: e.currentTarget.dataset.sporttype
   })
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      sportsList: e.currentTarget.dataset
    })
    wx.navigateBack({
      delta: 1
    })


  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})