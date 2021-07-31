const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headIdx: 1,
    page: 1,
    rollList:[],
    endfirom:true,
    jieshen:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
     this.loadList()
  },
 
  loadList(){
    util.Request("/api/getOffsetRollList", {
      type: this.data.headIdx,
      page: this.data.page
    }, "post",
    (res) => {
      if (res.data.code == 2000) {
        this.setData({rollList:res.data.data,endfirom:false,jieshen:res.data.other})

        wx.hideLoading()
      }
    },
    () => {
    },
    () => {}
  )
  },

  header(e) {
    this.setData({
      headIdx: e.currentTarget.dataset.index
    })
    this.loadList()

  },
  refresh(){
    this.loadList()
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