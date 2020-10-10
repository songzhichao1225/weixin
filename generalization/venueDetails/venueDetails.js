const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venue:[],
    falg:0,
    sportId:0,
    sporttype:0,
    siteuid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      falg: options.falg,
      sportId: options.sportid,
      sporttype: options.sporttype,
      siteuid: options.siteuid
    })
    util.Request("/api/getSiteInfo", { 'uid': options.siteuid}, "get", (res) => { 
      this.setData({
        venue:res.data.data
      })
      wx.hideLoading()
    }, 
    () => { 
       
      console.log("失败")
    },
    () => {}
  )



   
  },
  //跳转H5选择场地
  bookIn: function (e) {
    let obj = {
      siteid: e.currentTarget.dataset.uid,
      name: e.currentTarget.dataset.name
    }
    if (this.data.falg == 1) {
      wx.setStorage({
        data: obj,
        key: 'siteid',
      })
    } else if (this.data.falg == 2) {
      wx.setStorage({
        data: obj,
        key: 'siteidTwo',
      })
    }


    wx.navigateTo({
      url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportId + '&sporttype=' + this.data.sporttype + '&siteuid=' + this.data.siteuid + '&token=' + wx.getStorageSync('token') + '&falg=' + this.data.falg,
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