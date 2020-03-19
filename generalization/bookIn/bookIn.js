// generalization/bookIn/bookIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({option:options})
  },
  detal:function(e){
    console.log(this.data.option.falg)
    if(this.data.option.falg==1){
      console.log(666)
      wx.setStorage({
        data:e.detail,
        key:'bookin',
      })
    }else if(this.data.option.falg==2){
      wx.setStorage({
        data:e.detail,
        key:'bookinTwo',
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