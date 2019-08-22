//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    avatar: '',
    name: '',
    goldNum:'',
    flag:false,
    applicationList: [
      { img: 'IconWdJb@2x.png',name:'我的金币',click:'mineGold'},
      { img: 'IconWdQb@2x.png', name: '我的钱包', click: 'mineMoney'},
      { img: 'IconWdHy@2x.png', name: '我的好友', click: 'minefriends'},
      { img: 'IconWdGyyy@2x.png', name: '关于应用', click: 'mineAbout' },
      { img: 'IconWdBzzx@2x.png', name: '帮助中心', click: 'mineHelp' },
      { img: 'IconWdYjfk@2x.png', name: '意见反馈', click: 'mineOpinion' },
    ],
    mineDetail:'',
    imgURL: ''
  },

  onLoad: function() {
    if (wx.getStorageSync('token')){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      util.Request("/api/getCommonCoins", {}, "get",
        (res) => {
          this.setData({ goldNum: res.data.data.coins, flag:true })
          wx.setStorageSync('coins', res.data.data.coins)
          wx.hideLoading()
        },
        () => { console.log("失败")},
        () => {
        }
      )
      util.Request("/api/getUserDetailInfo", { 'uuid': wx.getStorageSync('uuid') }, "get", 
        (res) => {
          this.setData({ mineDetail: res.data.data, imgURL: wx.getStorageSync('imgURL')})
        },
        () => { console.log("失败") },
        () => {
        }
      )
    } else if (wx.getStorageSync('token') && wx.getStorageSync('information') != '信息完善') {
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
    wx.hideLoading()
  },
  onShow:function(){
    util.Request("/api/getUserDetailInfo", { 'uuid': wx.getStorageSync('uuid') }, "get",
      (res) => {
        this.setData({ mineDetail: res.data.data })
      },
      () => { console.log("失败") },
      () => {
      }
    )
  },
  gold:function(){
    wx.navigateTo({
      url: '/pages/gold/gold?goldNum=' + this.data.goldNum
    })
  }, 
  mineMoney:function(){
    wx.navigateTo({
      url: '/pages/mineWallet/mineWallet'
    })
  }, 
  mineAbout:function(){
    wx.navigateTo({
      url: '/pages/aboutApp/aboutApp'
    })
  },
  mineGold:function(){
    wx.navigateTo({
      url: '/pages/mineGold/mineGold'
    })
  },
  minefriends:function(){
    wx.navigateTo({
      url: '/pages/mineFriend/mineFriend'
    })
  },
  golDranking:function(){
    wx.navigateTo({
      url: '/pages/golDranking/golDranking'
    })
  },
  mineOpinion:function(){
    wx.navigateTo({
      url: '/pages/mineOpinion/mineOpinion'
    })
  },
  personalData:function(){
    wx.navigateTo({
      url: '/pages/personalData/personalData'
    })
  }
})