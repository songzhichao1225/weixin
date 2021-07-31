const util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redList: [],
    pull: true,
    selectLink:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.content()
    if(app.envelope.money!=undefined){
      this.setData({
        selectLink:{money:app.envelope.money}
      })
    }
    
  },

  content() {
    util.Request("/api/userhd", {}, "post",
      (res) => {
        let you = res.data.data
        for (let i in you) {
          if(app.envelope!=undefined){
            if(you[i].money==app.envelope.money){
              you[i].checked=1
            
            }else{
              you[i].checked = 0
            }
          }else{
            you[i].checked = 0
          }
         
        }
        this.setData({
          redList: you
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },

  pullDown() {
    this.content()
    this.setData({
      pull: false
    })
  },

  checked(e) {
    let redList = this.data.redList
    
    
    if(redList[e.currentTarget.dataset.index].checked==1){
      redList[e.currentTarget.dataset.index].checked = 0
    }else{
      for (let i in redList) {
        redList[i].checked = 0
      }
      redList[e.currentTarget.dataset.index].checked = 1
    }
    
    this.setData({
      redList: redList,
      selectLink:redList[e.currentTarget.dataset.index].checked==1?redList[e.currentTarget.dataset.index]:[]
    })
    app.envelope=redList[e.currentTarget.dataset.index].checked==1?redList[e.currentTarget.dataset.index]:[]
  },

  comfir(){
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