const util = require('../../utils/util.js')
Page({

  data: {
    index:1,
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

  onLoad: function (options) {
    this.jod()
  },
  oneleft:function(e){
    this.setData({index:e.currentTarget.dataset.index})
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
  
  


})