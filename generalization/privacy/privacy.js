// generalization/privacy/privacy.js

const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchOne: '',
    switchTwo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    util.Request("/api/getUserReceives", {}, "get",
      (res) => {
        this.setData({
          switchOne: res.data.data.acceptNearplayerInvite == 1 ? true : false,
          switchTwo: res.data.data.acceptFirendInvite == 1 ? true : false
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  switchOne: function (e) {
    this.setData({
      switchOne: e.detail.value
    })
    util.Request("/api/setUserReceives", {
        'isReceiveNearBy': this.data.switchOne==true?1:0,
        'isReceiveFriends':this.data.switchTwo==true?1:0,
      }, "post",
      (res) => {
       
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  switchTwo: function (e) {
    this.setData({
      switchTwo: e.detail.value
    })
    util.Request("/api/setUserReceives", {
      'isReceiveNearBy': this.data.switchOne==true?1:0,
      'isReceiveFriends':this.data.switchTwo==true?1:0,
    }, "post",
    (res) => {
     
    },
    () => {
      console.log("失败")
    },
    () => {}
  )
  },
  blackList:function(){
    wx.navigateTo({
      url: '/generalization/blacklist/blacklist',
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