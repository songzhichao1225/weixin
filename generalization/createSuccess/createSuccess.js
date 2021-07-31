const util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    uuid:'',
    type:'1',
    forbade:false,
    status:'1',
    ok:'',
    textTwo:[],
    rule:'',
    ruleFlag:false,
    typeHood:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    console.log(this.data.uuid)
  },
  onLoad: function (options) {
    console.log(options.inviteId)
    this.setData({
      uuid:options.inviteId,
      time:options.time,
      type:options.Identification,
      typeInfo:options.typeInfo,
      status:options.status,
      ok:options.ok,
      lr:options.lr,
    })
    wx.removeStorage({
      key: 'bookinThree',
    })
    wx.removeStorage({
      key: 'bookinFour',
    })
    wx.removeStorage({
      key: 'bookinSix'
    })
    wx.removeStorage({
      key: 'bookin'
    })
    wx.removeStorage({
      key: 'bookinFive'
    })
 

    app.envelope=[]
    app.deductibles=[]
    util.Request("/api/getwWord", {
        inviteId: options.inviteId,
        Identification: options.Identification,
        referee: options.referee,
        status: options.status,
        lr:options.lr
      }, "post",
      (res) => {
        this.setData({
          text: res.data.data,
          textTwo:res.data.other
        })
        wx.hideLoading()
      },
      () => {
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
      url: '/pages/homePage/activities/activities?uuid='+this.data.uuid+'&hoog=0'+'&type=1',
    })
  },

  ruleFlag:function(){
    this.setData({ruleFlag:false})
  },
  detailRules: function () {
    util.Request("/api/getDepositRule", {type:app.globalData.teamText=='练习方'||app.globalData.teamText=='陪练方'?3:1}, "get",
      (res) => {
        this.setData({rule:res.data.data.rule,ruleFlag:true})
      },
      () => {
      },
      () => {}
    )
  },


  


  onShareAppMessage: function (res) {
    return {
      title: '我邀请您来订' + this.data.textTwo.sportName + '场地，平均节省30%以上',
      path: '/pages/homePage/activities/activities?uuid=' + this.data.uuid + '&hoog=1' + '&type=1' + '&Invite_code=' + wx.getStorageSync('invitation'),
      imageUrl: '../../assets/fengxiang.jpg',
      success: function () {
        util.Request("/api/userShare", {
            'type': 'activity'
          }, "post",
          (res) => {
            if (res.data.code === 2000) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1500,
                mask: true
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }

          },
          () => {
          },
          () => {}
        )

      }
    }

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
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success: function (data) {
      },fail: function (err) {
        if (err.errMsg ==="saveImageToPhotosAlbum:fail auth deny") {
         

          wx.openSetting({
            success(settingdata) {

              if (settingdata.authSetting[
                  'scope.writePhotosAlbum'
                ]) {


              } else {

                

              }

            }

          })

        }

      }

    })
   
  }

 
  

  
})