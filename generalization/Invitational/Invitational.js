
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getInviteFriends:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let obj={
        city:wx.getStorageSync('cityInfo'),
        area:'',
        mylat:wx.getStorageSync('lat'),
        mylng:wx.getStorageSync('lng'),
        type:'mynearby',
        sportid:options.sportid,
        teamSex:options.sex,
        minlevel:options.rankMin,
        maxlevel:options.rankMax,
        team:options.team,
        page:0

    }
    util.Request("/api/getInviteFriends",obj, "get",
    (res) => {
      console.log(res)
       let nData=res.data.data.Lst
      for (let i in nData) {
        if (nData[i].userLevelNum == '8') {
          nData[i].userLevelNum = 'icon_dj_gef.png';
        } else if (nData[i].userLevelNum == '3') {
          nData[i].userLevelNum = 'icon_dj_tq.png'
        } else if (nData[i].userLevelNum == '1') {
          nData[i].userLevelNum = 'icon_dj_ymq.png'
        } else if (nData[i].userLevelNum == '2') {
          nData[i].userLevelNum = 'icon_dj_ppq.png'
        } else if (nData[i].userLevelNum == '4') {
          nData[i].userLevelNum = 'icon_dj_lq.png'
        } else if (nData[i].userLevelNum == '5') {
          nData[i].userLevelNum = 'icon_dj_zq.png'
        } else if (nData[i].userLevelNum == '6') {
          nData[i].userLevelNum = 'icon_dj_pq.png'
        } else if (nData[i].userLevelNum == '7') {
          nData[i].userLevelNum = 'icon_dj_wq.png'
        }
      }
      this.setData({
        getInviteFriends:res.data.data.Lst
      })
    },
    () => { console.log("失败") },
    () => {
    }
  )

  wx.hideLoading()
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