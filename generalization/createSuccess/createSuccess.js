const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    uuid:'',
    type:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uuid:options.inviteId,
      time:options.time,
      type:options.Identification,
      typeInfo:options.typeInfo
    })
    util.Request("/api/getwWord", {
        inviteId: options.inviteId,
        Identification: options.Identification,
        referee: options.referee,
        status: options.status
      }, "post",
      (res) => {
        this.setData({
          text: res.data.data
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  counterCoin: function () {
    wx.navigateTo({
      url: '/generalization/counterCoin/counterCoin',
    })
  },
  details:function(){
    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid='+this.data.uuid+'&hoog=1'+'&type=1',
    })
  },
  detailRules:function(){
    wx.showModal({
      title: '提示',
      showCancel:false,
      content: '活动总时长≥60分钟时，缺勤0-15分钟，扣20%人均场地费、应得出场费；15-30分钟，扣50%；30分钟以上，扣100%',
      success (res) {

      }
    })
    
  },



  
  onUnload: function () {
    wx.reLaunch({
      url: '/pages/homePage/content/content'
    })
  },

 
  

  
})