const util = require('../../utils/util.js')

const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listSon: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.type == 1) {
      util.Request("/api/getConsultativeHistory", {
          'publicUUID': options.uuid
        }, "post",
        (res) => {
          this.setData({
            listSon: res.data.data
          })
          wx.hideLoading()
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
    }else if (options.type == 2) {
      util.Request("/api/getRefereeConsultativeHistory", {
          'publicUUID': options.uuid,
          're_com_id':options.reid
        }, "post",
        (res) => {
          this.setData({
            listSon: res.data.data
          })
          wx.hideLoading()
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
    }else if (options.type == 3) {
      util.Request("/api/getSparrConsultativeHistory", {
          'publicUUID': options.uuid,
        }, "post",
        (res) => {
          this.setData({
            listSon: res.data.data
          })
          wx.hideLoading()
        },
        () => {
          console.log("失败")
        },
        () => {}
      )
    }

  },
  audioPlay: function (e) {
    innerAudioContext.src = e.currentTarget.dataset.src
    innerAudioContext.play()
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