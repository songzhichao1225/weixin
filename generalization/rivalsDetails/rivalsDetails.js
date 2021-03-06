const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:0,
    publicuuid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      publicuuid:options.publicuuid
    })
   wx.hideLoading()
  },
  result:function(e){
     this.setData({
       result:e.currentTarget.dataset.id
     })
  },
  comfirm:function(){
    util.Request("/api/userConfirmGameRes", { 'publicuuid':this.data.publicuuid,gameRes:this.data.result}, "post",
    (res) => {
      if(res.data.code==2000){
        wx.navigateBack({
          delta:1
        })
      }
    },
    () => { console.log("失败") },
    () => {
    }
  )
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