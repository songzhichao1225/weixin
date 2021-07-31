const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallertList: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getUserMoneyLst", {
        'page': this.data.page
      }, "get",
      (res) => {
        this.setData({
          wallertList: res.data.data
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )

    setTimeout(()=>(
      util.Request("/api/getUserMoneyLst", {
        'page': 2
      }, "get",
      (res) => {
        this.setData({
          wallertList: [...this.data.wallertList,...res.data.data]
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
    ),500)

  },
  lower:function(){
    this.setData({
      page:this.data.page+1
    })
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getUserMoneyLst", {
      'page': this.data.page
    }, "get",
    (res) => {
      this.setData({
        wallertList: [...this.data.wallertList,...res.data.data]
      })
      if(res.data.data.length==0){
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1500,
          mask: true
        })

      }
      wx.hideLoading()
    },
    () => {
    },
    () => {}
  )

  },
  moneyDetail:function(e){
    wx.navigateTo({
      url: '/generalization/balanceDetail/balanceDetail?id='+e.currentTarget.dataset.id,
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