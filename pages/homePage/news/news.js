const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    systemMessage: [],
    page: 1,
    img:'',
  },

  onLoad: function() {
    this.setData({
      img:util.API
    })
    if (wx.getStorageSync('token')) {
      this.setData({
        page: 1
      })
      wx.showLoading({
        title: '',
        mask: true
      })

      this.newsLoand()
    } else if (wx.getStorageSync('token') &&wx.getStorageSync('information')!='信息完善'){
      wx.showModal({
        content: '完善个人信息',
        cancelText: '再看看',
        confirmText: '去完善',
        confirmColor: '#000',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/personalData/personalData'
            })
          } else if (res.cancel) {

          }
        }
      })
    } else {
      wx.redirectTo({
        url: '/pages/authorization/authorization'
      })
    }

  },
  //下拉加载 
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //显示动画
    this.setData({
      page: 1
    })
    this.newsLoand()
  },
  newsLoand: function(down) {
    let {
      page,
      systemMessage
    } = this.data
    util.Request("/api/getMessagesLst", {
        msgCate: 'systems',
        page: page
      }, "get",
      (res) => {
        if (down != true) {
          this.setData({
            systemMessage: res.data.data.Lst
          })
          wx.hideLoading()
        } else {
          let system = res.data.data.Lst
          this.setData({
            systemMessage: [...systemMessage, ...system]
          })
          wx.hideLoading()

        }

      },
      () => {
        wx.stopPullDownRefresh()
      },
      () => {
        wx.stopPullDownRefresh()
      }
    )
  },

  onReachBottom: function() {
    let {
      page
    } = this.data
    let down = true
    this.setData({
      page: page + 1
    })
    wx.showLoading({
      title: '',
      mask: true
    })
    this.newsLoand(down)
  },
})