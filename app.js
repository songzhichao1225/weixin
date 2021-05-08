//app.js
App({

  data:{
 
    globalData:[],
    userReserveVenue:[],
    deductibles:[]
},

  onLaunch: function () {
    // 展示本地存储能力
    var util = require("utils/util.js");
   
   
    wx.login({
      success: res => {
        if (res.code) {
          util.request("/api/getSmallOpenId", {
            'code': res.code
          }, "get",
            (res) => {
              wx.setStorageSync('openid', res.data.data.openid);
              wx.setStorageSync('sessionKey', res.data.data.session_key);
            },
            () => {
              console.log("失败")
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
    Invite_code:''
  }
})