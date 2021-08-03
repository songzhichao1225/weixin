//app.js
App({

  data:{
    globalData:[],
    userReserveVenue:[],
    deductibles:[],
    envelope:[],
    timeOut:0
},

  onLaunch: function () {
    var util = require("utils/util.js");

    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否更新？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })

   


   
      
  
  
   
   
    wx.login({
      success: res => {
        
        if (res.code) {
          util.request("/api/getSmallOpenId", {
            'code': res.code
          }, "get",
            (res) => {
              wx.setStorageSync('openid', res.data.data.openid);
              wx.setStorageSync('sessionKey', res.data.data.session_key);
              wx.setStorageSync('unionid', res.data.data.unionid);

            


            },
            () => {
            },
            () => {
            }
          )
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    selected:0,
    Invite_code:'',
  },
})