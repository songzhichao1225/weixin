const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.Request("/api/getBlackLst", {
        'page': 0
      }, "get",
      (res) => {
        this.setData({
          list: res.data.data.Lst
        })
        wx.hideLoading()
        if (res.data.code != 2000) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      () => {
      },
      () => {}
    )
  
  },
 
  getOut:function(e){
   util.Request("/api/moveBlackLst", { 'uuid': e.currentTarget.dataset.id}, "post", 
   (res) => {
     wx.showToast({
      title: res.data.msg,
      icon: 'none',
      duration: 1500,
      mask: true
    })
    if(res.data.code==2000){
      setTimeout(()=>{
        this.onLoad()
      },2000)
    }
   },
   () => {  },
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