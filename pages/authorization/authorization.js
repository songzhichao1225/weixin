//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
Page({
  data: {
    phone: '',
    uuid: '',
    binding: '',

  },
  onLoad: function(option) {
    var query = wx.createSelectorQuery()
    query.select('#name').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
    })
    
    if (option != undefined) {
      this.setData({
        uuid: option.uuid
      })
    }
    let that=this
    setTimeout(function() {
      util.request("/api/getbinding", {
        'wechartID': wx.getStorageSync('openid')
      }, "post",
      (res) => {
        that.setData({
          binding: res.data.data
        })
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
   }, 800);

    
  
    


  },
  onGotUserInfo: function(e) {
    //登录
    var openid = wx.getStorageSync('openid')
    var that = this
    var ency = e.detail.encryptedData;
    var iv = e.detail.iv;
    var errMsg = e.detail.errMsg
    if (iv == null || ency == null) {
      wx.showToast({
        title: "授权失败,请重新授权",
        icon: 'none',
      })
      return false
    }
    //把获取手机号需要的参数取到，然后存到头部data里
    that.setData({
      ency: ency,
      iv: iv,
      errMsg: errMsg,
    })


    that.zhuce(); //调用手机号授权事件
  },




  getUserInfo: function(e) {
    let {
      binding
    } = this.data
    let sex = 0
    if (e.detail.userInfo.gender == 1) {
      sex = 0
    } else {
      sex = 1
    }
    util.request("/api/wechatLogin", {
        'openId': wx.getStorageSync('openid'),
        'sex': sex,
        'nickname': e.detail.userInfo.nickName
      }, "post",
      (res) => {
        wx.setStorageSync('token', res.data.data.token); //存储token
        wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
        wx.setStorageSync('sex', res.data.data.sex); //存储用户性别
        wx.setStorageSync('imgURL', res.data.data.imgURL);//存储用户头像
        wx.setStorageSync('telephone', res.data.data.telephone)//存储用户头像
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/homePage/content/content'
          })
        })
      },
      () => {
        console.log("失败")
      },
      () => {
        console.log("接口调用结束的回调函数")
      }
    )
  },



  zhuce: function(e) {
    var that = this;
    var ency = that.data.ency;
    var iv = that.data.iv;
    var errMsg = that.data.errMsg;
    var loginInfo = app.globalData.loginInfo

    //判断登录状态
    wx.checkSession({
      success: function() {
        if (wx.getExtConfig) {
          wx.getExtConfig({
            success: function(res) {
              var rescode = res.extConfig.code
              var sessionKey = wx.getStorageSync("sessionKey")
              var openid = wx.getStorageSync('openid')
              util.request("/api/getwxtel", {
                  'encryptedData': ency,
                  'iv': iv,
                  'sessionKey': sessionKey
                }, "post",
                (res) => {
                  wx.setStorageSync('phone', res.data.data.phoneNumber)
                  util.request("/api/wechatLogin", {
                      'openId': openid,
                      'sex':'',
                      'imgURL':'',
                      'nickname':'',
                    }, "post", 
                    (res) => {
                  
                      wx.setStorageSync('sex', res.data.data.sex); //存储用户性别
                      wx.setStorageSync('telephone', res.data.data.telephone)//存储用户头像
                      util.request("/api/getbindmobile", {
                        'mobile': wx.getStorageSync('phone'),
                        'wechatid': openid }, "post", 
                        (res) => {
                          wx.setStorageSync('token', res.data.data.token); //存储token
                          wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
                        },
                        () => { console.log("失败") },
                        () => {
                        }
                      )
                      setTimeout(function() {
                        wx.switchTab({
                          url: '/pages/homePage/content/content'
                        })
                      })
                    },
                    () => {
                      console.log("失败")
                    },
                    () => {
                      console.log("接口调用结束的回调函数")
                    }
                  )
                },
                () => {
                  console.log("失败")
                },
                () => {
                  console.log("接口调用结束的回调函数")
                }
              )
            }
          })
        }
      },
      fail: function() { //如果失败，就重新登录，并且重新获取手机号
        //登录
        wx.login({
          fail: function(err) {},
          complete: function(msg) {

          },
          success: function(loginInfo) {
            if (wx.getExtConfig) {
              wx.getExtConfig({
                success: function(res) {
                  var rescode = res.extConfig.code
                  util.request("/api/getwxtel", {
                      'encryptedData': e.detail.encryptedData,
                      'iv': e.detail.iv,
                      'sessionKey': sessionKey
                    }, "post",
                    (res) => {
                      console.log(res)
                    },
                    () => {
                      console.log("失败")
                    },
                    () => {
                      console.log("接口调用结束的回调函数")
                    }
                  )

                },

              })
            }
          }
        })
      }
    })
  },


})