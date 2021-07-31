
const util = require('../../utils/util.js')

Page({
  data: {
    preferencesData:[],
    pages:1,
  },
  jod:function(show){
    util.Request("/api/getPlayerReleasePreferenceList", { 'page': this.data.pages }, "post", 
      (res) => {
        if (show == true) {
          let mData = [...this.data.preferencesData, ...res.data.data]
          this.setData({
            preferencesData: mData
          })
        } else {
          this.setData({
            preferencesData:res.data.data,
          })
        }
       
        wx.hideLoading()
      },
      () => {  },
      () => {
      }
    )
  },
  onLoad: function (option) {
    this.jod()
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //显示动画
    this.setData({pages:1})
    this.jod()
  },

  onReachBottom: function () {
    this.setData({
      pages: this.data.pages + 1
    })
    let show = true
    this.jod(show)
  },


  
  delet:function(e){
    let that=this
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除此发布偏好么?',
      confirmColor:'#000',
      success (res) {
        if (res.confirm) {
          util.Request("/api/DelPlayerReleasePreference", { 'prefeuuid':e.currentTarget.dataset.id }, "post", 
          (res) => {
            that.jod()
          },
          () => {  },
          () => {
          }
        )
        } 
      }
    })
  },

  releasePreferences:function(){
    wx.navigateTo({
      url: "/generalization/releasePreferences/releasePreferences"
    })
  },
  checked:function(e){
    let uuid=e.currentTarget.dataset.uuid
    util.Request("/api/getReleasePreferenceFirst", { 'prefeuuid':uuid }, "post", 
    (res) => {
      wx.removeStorage({
        key: 'bookin',
        success (res) {
        }
      })
      wx.removeStorage({
        key: 'siteid',
        success (res) {
        }
      })
      
      let dat=res.data.data
      wx.setStorage({key: 'sportIdF',data: dat.sportid})
      wx.setStorage({key: 'sportTypeF',data: dat.sporttype})
      wx.setStorage({key: 'sportNameF',data: dat.sportname})
      wx.setStorage({key: 'sportypeNameF',data: dat.sporttypename})
      wx.setStorage({key: 'mode',data: dat.sportmode==1?'娱乐模式':dat.sportmode==2?'竞技模式':dat.sportmode==3?'我是陪练':'我找陪练'})
      wx.setStorage({key: 'modeNum',data: dat.sportmode})
      wx.setStorage({key: 'TrialPickerF',data: dat.refereenumber})
      wx.setStorage({key: 'TrialRaderF',data: dat.refereegrade})
      wx.setStorage({key: 'siteid',data:{siteid:dat.siteuuid,name:dat.sitename}})
      wx.setStorage({key: 'sexF',data: dat.sex==0?'男':dat.sex==1?'女':'不限'})
      wx.setStorage({key: 'ageF',data: dat.minavg+'-'+dat.maxavg+'岁'})
      wx.setStorage({key: 'rankF',data: dat.mingrade+'-'+dat.maxgrade+'级'})
      wx.setStorage({key: 'shoulderedF',data: dat.bearmode==1?'AA':'输方买单'})
      wx.setStorage({key: 'commentsF',data: dat.remarks})
      wx.switchTab({
        url: '/pages/publishing/publishing'
      })
    },
    () => {  },
    () => {
    }
  )



  },


  // sportId: wx.getStorageSync('sportIdF'),
  // sportType: wx.getStorageSync('sportTypeF'),
  // sportName: wx.getStorageSync('sportNameF'),
  // sportypeName: wx.getStorageSync('sportypeNameF'),
  mode: wx.getStorageSync('mode'),
  modeNum: wx.getStorageSync('modeNum')
  // sex: wx.getStorageSync('sexF'),
  // age: wx.getStorageSync('ageF'),
  // rank: wx.getStorageSync('rankF')
  
 
})
