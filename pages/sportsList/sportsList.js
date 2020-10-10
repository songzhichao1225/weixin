const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportsList:[],
    indexSport:0,
    flag:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
      flag:options.flag
     })
    util.request("/api/getAllSportLst", {}, "get",
      (res) => {
        let obj=res.data.data
        if(options.flag==1){
          obj[7].sportType=obj[7].sportType.slice(0,2)
        }
       this.setData({
         sportsList:obj
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
    if(this.data.flag==1){
      prevPage.setData({
        sportsList: e.currentTarget.dataset
      })
      wx.navigateBack({
        delta: 1
      })
    }else if(this.data.flag==2){
      prevPage.setData({
        sportsListTwo: e.currentTarget.dataset
      })
      wx.navigateBack({
        delta: 1
      })
    }else if(this.data.flag==3){
      prevPage.setData({
        sportsListThree: e.currentTarget.dataset
      })
      wx.navigateBack({
        delta: 1
      })
    }
   


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