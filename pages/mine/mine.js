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
      { img: 'IconWdHd@2x.png', name: '我的活动', click: 'activities' },
      { img: 'dui.png',name:'我的对手币',click:'mineGold'},
      { img: 'ji.png', name: '我的技术分', click: 'mineFen' },
      { img: 'IconWdQb@2x.png', name: '我的钱包', click: 'mineMoney'},
      { img: 'IconWdXzcg@2x.png', name: '新增场馆', click: 'minefriends' },
      { img: 'IconWdHy@2x.png', name: '我的好友', click: 'minefriends'},
      // { img: 'IconWdGz@2x.png', name: '我的关注', click: 'mineAbout' },
      { img: 'IconWdGyyy@2x.png', name: '关于小程序', click: 'aboutApp' },
      { img: 'IconWdSz@2x.png', name: '设置', click: 'mineAbout' },
      { img: 'caipanha.png', name: '成为裁判', click: 'mineHelp' },
      { img: 'IconWdBzzx@2x.png', name: '帮助中心', click: 'mineHelp' },
      { img: 'IconWdYjfk@2x.png', name: '意见反馈', click: 'mineOpinion' },
    ],
    mineDetail:'',
    imgURL: '',
    img:''
  },

  onLoad: function() {
    this.setData({
      img:util.API
    })
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
      util.request("/api/getUserDetailInfo", { 'uuid': wx.getStorageSync('uuid') }, "get", 
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
    util.request("/api/getUserDetailInfo", { 'uuid': wx.getStorageSync('uuid') }, "get",
      (res) => {
        this.setData({ mineDetail: res.data.data })
      },
      () => { console.log("失败") },
      () => {
      }
    )
  },
  activities:function(){
    wx.navigateTo({
      url: '/generalization/mineActivities/mineActivities'
    })
  },
  gold:function(){
    wx.navigateTo({
      url: '/generalization/mineGolDrankingTwo/mineGolDrankingTwo'
    })
  }, 
  mineMoney:function(){
    wx.navigateTo({
      url: '/pages/mineWallet/mineWallet'
    })
  }, 
  mineAbout:function(){
    wx.navigateTo({
      url: '/generalization/aboutApp/aboutApp'
    })
  },
  mineGold:function(){
    wx.navigateTo({
      url: '/generalization/mineGold/mineGold'
    })
  },
  mineFen: function () {
    wx.navigateTo({
      url: '/generalization/Technical/Technical'
    })
  },

  minefriends:function(){
    wx.navigateTo({
      url: '/generalization/mineFriend/mineFriend'
    })
  },
  golDranking:function(){
    wx.navigateTo({
      url: '/generalization/mineGolDranking/mineGolDranking'
    })
  },
  mineOpinion:function(){
    wx.navigateTo({
      url: '/pages/mineOpinion/mineOpinion'
    })
  },
  aboutApp:function(){
    wx.navigateTo({
      url: '/pages/aboutApp/aboutApp'
    })
  },
  personalData:function(){
    wx.navigateTo({
      url: '/pages/personalData/personalData'
    })
  },
  mineHelp:function(){
    wx.navigateTo({
      url: '/generalization/assistant/assistant'
    })
  }
})