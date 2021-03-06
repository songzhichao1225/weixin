const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    uuid:'',
    type:'1',
    forbade:false
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
  forbade() {
    this.setData({
      forbade: true
    })
  },
  closeTwo() {
    this.setData({
      forbade: false
    })
  },
  saveImg(e) {
    console.log()
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success: function (data) {
        console.log(data);
      },fail: function (err) {
        console.log(err);
        if (err.errMsg ==="saveImageToPhotosAlbum:fail auth deny") {console.log("用户一开始拒绝了，我们想再次发起授权")
          console.log(
            '打开设置窗口'
          )

          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)

              if (settingdata.authSetting[
                  'scope.writePhotosAlbum'
                ]) {

                console.log(
                  '获取权限成功，给出再次点击图片保存到相册的提示。'
                )

              } else {

                console.log(
                  '获取权限失败，给出不给权限就无法正常使用的提示'
                )

              }

            }

          })

        }

      }

    })
   
  }

 
  

  
})