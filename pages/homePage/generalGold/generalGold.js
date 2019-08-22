const util = require('../../../utils/util.js')

Page({
  data: {
    num: 10,
    dataNum:0,
    peopleNum:0,

  },
  onLoad: function() {
    util.request("/api/getcomm", {
      'uuid': wx.getStorageSync('uuid')
      }, "post",
      (res) => {
        this.setData({ dataNum: res.data.data, peopleNum: res.data.data/50})
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )



    wx.hideLoading()
  },
  onShareAppMessage: function(res) {
    let {
      num
    } = this.data
    let that = this
    return {
      title: '挑战',
      path: '/pages/homePage/content/content?uuid='+wx.getStorageSync('uuid'),
      success: function(res) {
        that.setData({
          num: num - 1
        })
        util.request("/api/getSmallOpenId", {
             'uuid ':wx.getStorageSync('uuid'),
            'addGoldcoin': 10,
            'Whether': 1
          }, "post",
          (res) => {
          },
          () => {
            console.log("失败")
          },
          () => {
          }
        )
      }
    }
  }
})