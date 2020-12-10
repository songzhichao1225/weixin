//app.js
App({

  data:{
 
    globalData:[],
    userReserveVenue:[]
},

  onLaunch: function () {
    // 展示本地存储能力
    var util = require("utils/util.js");
   
   
    wx.login({
      success: res => {
        console.log()
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
    userInfo: null
  }
})