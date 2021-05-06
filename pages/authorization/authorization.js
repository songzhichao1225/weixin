//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
Page({
  data: {
    phone: '',
    uuid: '',
    binding: '',
    authorization:0
  },
  onLoad: function (option) {
    var query = wx.createSelectorQuery()
    query.select('#name').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {})
    
    
  },
  phone:function(e){
    this.setData({phone:e.detail.value})
  },
  toCode:function(){
    util.request("/api/toSendCodes", {
      'mobile': this.data.phone,
      'type': 'bindmobile',
    }, "post",
    (res) => {

     
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )

  },


  onGotUserInfo: function (e) {
    //登录
    var sessionKey = wx.getStorageSync('sessionKey')
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
    
    util.request("/api/getUnionID", {
        'sessionKey': sessionKey,
        'encryptedData': e.detail.encryptedData,
        'iv': e.detail.iv
      }, "post",
      (res) => {
        let data=JSON.parse(res.data.data)
        this.setData({
          nickName: data.nickName,
          avatarUrl: data.avatarUrl,
          unionId: data.unionId
        })
        that.zhuce(); //调用手机号授权事件
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )

  },




  zhuce: function (e) {
    //判断登录状态
    let that=this
    wx.checkSession({
      success: function () {
        if (wx.getExtConfig) {
          wx.getExtConfig({
            success: function (res) {
              wx.showLoading({
                title: '登录中~',
                mask: true
              })
              util.request("/api/wechatLogin", {
                  'openId': that.data.unionId,
                  'sex': '男',
                  'imgURL': that.data.avatarUrl,
                  'nickname': that.data.nickName,
                }, "post",
                (res) => {
                  if(res.data.data.telephone!=''&&res.data.data.telephone!=undefined){
                    wx.setStorageSync('token', res.data.data.token); //存储token
                    wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
                    wx.setStorageSync('telephone', res.data.data.telephone); //存储用户电话
                    wx.hideLoading()
                    if(wx.getStorageSync('activitieshoog')=='1'){
                        
                      wx.reLaunch({
                        url: "/pages/homePage/activities/activities?uuid="+wx.getStorageSync('activitiesId')
                      })
                    }else{
                      setTimeout(function (){
                        wx.switchTab({
                          url: '/pages/mine/mine',
                        })
                      })
                    }
                    
                    
                  }else{
                    that.setData({authorization:1})
                    wx.hideLoading()
                  }
                  

                },
                () => {
                  console.log("失败")
                },
                () => {
                }
              )
            }
          })
        }
      },
      fail: function () { //如果失败，就重新登录，并且重新获取手机号
        //登录
        wx.login({
          fail: function (err) {},
          complete: function (msg) {

          },
          success: function (loginInfo) {

            if (wx.getExtConfig) {
              wx.getExtConfig({
                success: function (res) {
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

  getPhoneNumber: function(e) {
    //登录
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


    that.zhuceTwo(); //调用手机号授权事件
  },

  zhuceTwo: function(e) {
    var that = this;
    var ency = that.data.ency;
    var iv = that.data.iv;

    //判断登录状态
    wx.checkSession({
      success: function() {
        if (wx.getExtConfig) {
          wx.getExtConfig({
            success: function(res) {
              var sessionKey = wx.getStorageSync("sessionKey")
              util.request("/api/getwxtel", {
                  'encryptedData': ency, 
                  'iv': iv,
                  'sessionKey': sessionKey
                }, "post",
                (res) => {
                  wx.setStorageSync('phone', res.data.data.phoneNumber)
                  util.request("/api/wechatLogin", {
                    'openId': that.data.unionId,
                    'sex': '男',
                    'imgURL': that.data.avatarUrl,
                    'nickname': that.data.nickName,
                    }, "post", 
                    (res) => {
                  
                      util.request("/api/getbindmobile", {
                        'mobile': wx.getStorageSync('phone'),
                        'wechatid': that.data.unionId }, "post", 
                        (res) => {
                          if(res.data.code==2000){
                            wx.setStorageSync('token', res.data.data.token); //存储token
                            wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
                            wx.setStorageSync('telephone', res.data.data.telephone); //存储用户电话
                            if(wx.getStorageSync('activitieshoog')=='1'){
                              wx.reLaunch({
                                url: "/pages/homePage/activities/activities?uuid="+wx.getStorageSync('activitiesId')
                              })
                            }else{
                              setTimeout(function (){
                                wx.switchTab({
                                  url: '/pages/mine/mine',
                                })
                              })
                            }
                          }else{
                            wx.showToast({
                              title: res.data.msg,
                              icon: 'none',
                            })
                          }
                        },
                        () => { console.log("失败") },
                        () => {
                        }
                      )
                    
                    },
                    () => {
                      console.log("失败")
                    },
                    () => {
                    }
                  )
                },
                () => {
                  console.log("失败")
                },
                () => {
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