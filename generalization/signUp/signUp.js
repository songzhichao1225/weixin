const util = require('../../utils/util.js')
Page({

  data: {
    signUpList:[],//偏好列表
    page:1,
  },

  onLoad: function () {
   
   this.jod()
  },
  jod:function(show){
    util.Request("/api/getPlayerPreferenceList", {'page':this.data.page}, "post",
    (res) => {
      if (show == true) {
        let mData = [...this.data.signUpList, ...res.data.data]
        this.setData({
          signUpList: mData
        })
      } else {
        this.setData({
          signUpList:res.data.data,
        })
      }
   wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //显示动画
    this.setData({page:1})
    this.jod()
  },
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    let show = true
    this.jod(show)
  },

  delet:function(e){
    let that=this
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除此发布偏好么?',
      success (res) {
        if (res.confirm) {
          util.Request("/api/DelPlayerPreference", {'prefeuuid':e.currentTarget.dataset.uuid}, "post",
    (res) => {
      that.jod()
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
        }
      }
    })
    return false
   


  
  },
  btn:function(){
    wx.navigateTo({
      url: '/generalization/signUpJoin/signUpJoin'
    })
  },

  searchResults:function(e){
    wx.navigateTo({
      url: '/generalization/searchResults/searchResults?uuid='+e.currentTarget.dataset.uuid+''
    })
  },
  onShow:function(){
    this.setData({page:1})
    this.jod()
  },
  details:function(e){
    console.log(e.currentTarget.dataset.uuid)
    wx.navigateTo({
      url: '/generalization/signUpJoin/signUpJoin?uuid='+e.currentTarget.dataset.uuid+''
    })
   
  }
  
 

})