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
    var bmap = require("utils/bmap-wx.min.js");

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
      let BMap = new bmap.BMapWX({
        ak:'ElFBk4MF87qZXoiLbD0zofEmZIS6bHT2'
      });
      let fail = function (data) {
        wx.setStorageSync('lat','39.90')
        wx.setStorageSync('lng','116.38')
        wx.setStorageSync('province','北京市')
        wx.setStorageSync("cityInfo", '北京市')
        wx.setStorageSync('area', '东城区')
      }
      let success = function (data) {
      
        let wxMarkerData = data.wxMarkerData;
        wx.setStorageSync('province',data.originalData.result.addressComponent.province)
        wx.setStorageSync("cityInfo", data.originalData.result.addressComponent.city)
        wx.setStorageSync('area', data.originalData.result.addressComponent.district)
        wx.setStorageSync('address', wxMarkerData[0].address)
        wx.setStorageSync('lat', data.originalData.result.location.lat)
        wx.setStorageSync('lng',data.originalData.result.location.lng)
      }
  
      BMap.regeocoding({
        fail: fail,
        success: success
      });
              
              wx.setStorageSync('openid', res.data.data.openid);
              wx.setStorageSync('sessionKey', res.data.data.session_key);
              wx.setStorageSync('unionid', res.data.data.unionid);
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
    Invite_code:'',
    
  }
})