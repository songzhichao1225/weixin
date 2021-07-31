//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
var bmap = require("../../utils/bmap-wx.min.js");
Page({
  data: {
    phone: '',
    uuid: '',
    binding: '',
    authorization: 0,
    wxImage: '',
    avatarImg: '',
    ak: "ElFBk4MF87qZXoiLbD0zofEmZIS6bHT2", //申请到的ak
  },



  onLoad: function (option) {
    let that=this
    let BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    let fail = function (data) {}
    let success = function (data) {
      let wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        district: data.originalData.result.addressComponent.district,
        province: data.originalData.result.addressComponent.province,
        city: data.originalData.result.addressComponent.city,
        
      })
    }

    BMap.regeocoding({
      fail: fail,
      success: success
    });




    var query = wx.createSelectorQuery()
    query.select('#name').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {})
    if (wx.getStorageSync('TrialPickerF') == '') {
      wx.setStorage({
        key: 'TrialPickerF',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialPickerFThree') == '') {
      wx.setStorage({
        key: 'TrialPickerFThree',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialPickerFFour') == '') {
      wx.setStorage({
        key: 'TrialPickerFFour',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialPickerFFive') == '') {
      wx.setStorage({
        key: 'TrialPickerFFive',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialPickerFSix') == '') {
      wx.setStorage({
        key: 'TrialPickerFSix',
        data: 0,
      })
    }


  },



  close: function () {
    wx.reLaunch({
      url: "/pages/homePage/content/content"
    })
  },



  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  toCode: function () {
    util.request("/api/toSendCodes", {
        'mobile': this.data.phone,
        'type': 'bindmobile',
      }, "post",
      (res) => {


      },
      () => {
      },
      () => {}
    )
  },

  getUserProfile: function () {
    if (wx.getStorageSync('token')) {
      util.request("/api/wechatLogin", {
          'uid': wx.getStorageSync('unionid'),
          'sex': '男',
          'imgURL': '',
          'nickname': '',
          'openId': '',
          'loginType': 3
        }, "post",
        (res) => {
          if (res.data.data.telephone != '' && res.data.data.telephone != undefined) {
            wx.setStorageSync('token', res.data.data.token); //存储token
            wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
            wx.setStorageSync('telephone', res.data.data.telephone); //存储用户电话
            wx.setStorageSync('imgURL', res.data.data.imgURL); //存储用户电话
            wx.setStorageSync('invitation', res.data.data.Invitation); //存储邀请码

            wx.hideLoading()
            if (wx.getStorageSync('activitieshoog') == '1') {
              wx.reLaunch({
                url: "/pages/homePage/activities/activities?uuid=" + wx.getStorageSync('activitiesId')
              })
            } else {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              })
            }
          } else {
            this.setData({
              authorization: 1
            })
            wx.hideLoading()
          }

        },
        () => {
        },
        () => {}
      )

    } else {
     
      wx.getUserProfile({
        desc: '用于小程序展示头像昵称', 
        success: (res) => {
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          })
          //判断登录状态
          let that = this
          wx.checkSession({
            success: function () {
              if (wx.getExtConfig) {
                wx.getExtConfig({
                  success: function (resTwo) {
                    wx.showLoading({
                      title: '登录中~',
                      mask: true
                    })
                    util.request("/api/wechatLogin", {
                        'uid': wx.getStorageSync('unionid'),
                        'sex': '男',
                        'imgURL': res.userInfo.avatarUrl,
                        'nickname': res.userInfo.nickName,
                        'openId': '',
                        'loginType': 3
                      }, "post",
                      (res) => {
                        if (res.data.data.telephone != '' && res.data.data.telephone != undefined) {
                          wx.setStorageSync('token', res.data.data.token); //存储token
                          wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
                          wx.setStorageSync('telephone', res.data.data.telephone); //存储用户电话
                          wx.setStorageSync('imgURL', res.data.data.imgURL); //存储用户电话
                          wx.setStorageSync('invitation', res.data.data.Invitation); //存储邀请码
                          wx.hideLoading()
                          if (wx.getStorageSync('activitieshoog') == '1') {
                            wx.reLaunch({
                              url: "/pages/homePage/activities/activities?uuid=" + wx.getStorageSync('activitiesId')
                            })
                          } else {
                            setTimeout(function () {
                              wx.navigateBack({
                                delta: 1
                              })
                            })
                          }
                        } else {
                          wx.downloadFile({
                            url: res.data.data.imgURL,
                            success(resTwo) {
                              if (resTwo.statusCode === 200) {
                                util.imgRequest("/api/uploadHeaderImgWX", resTwo.tempFilePath, {
                                    uuid: res.data.data.uuid
                                  }, "post",
                                  (resThree) => {
                                    that.setData({
                                      avatarImg: resThree.data
                                    })
                                  },
                                  () => {
                                  },
                                  () => {}
                                )
                              }
                            }
                          })
                          that.setData({
                            authorization: 1
                          })
                          wx.hideLoading()
                        }

                      },
                      () => {
                      },
                      () => {}
                    )
                  }
                })
              }
            }

          })


        }
      })

    }




  },






  getPhoneNumber: function (e) {
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






  zhuceTwo: function (e) {
    var that = this;
    var ency = that.data.ency;
    var iv = that.data.iv;

    //判断登录状态
    wx.checkSession({
      success: function () {
        if (wx.getExtConfig) {
          wx.getExtConfig({
            success: function (res) {
              var sessionKey = wx.getStorageSync("sessionKey")
              util.request("/api/getwxtel", {
                  'encryptedData': ency,
                  'iv': iv,
                  'sessionKey': sessionKey
                }, "post",
                (res) => {
                  wx.setStorageSync('phone', res.data.data.phoneNumber)

                  util.request("/api/wechatLogin", {
                      'uid': wx.getStorageSync('unionid'),
                      'sex': '男',
                      'imgURL': that.data.avatarUrl,
                      'nickname': that.data.nickName,
                      'openId': '',
                      'loginType': 3
                    }, "post",
                    (res) => {
                      util.request("/api/getbindmobile", {
                          'mobile': wx.getStorageSync('phone'),
                          'wechatid': wx.getStorageSync('unionid'),
                          'Invitation': app.globalData.Invite_code,
                          'imgURL': res.data.data.imgURL,
                          'nickname': res.data.data.nickname,
                          'residence': that.data.province + ',' + that.data.city+ ',' + that.data.district,
                          'loginType': 3
                        }, "post",
                        (res) => {
                          if (res.data.code == 2000) {
                            wx.setStorageSync('token', res.data.data.token); //存储token
                            wx.setStorageSync('uuid', res.data.data.uuid); //存储用户uuid
                            wx.setStorageSync('telephone', res.data.data.tel); //存储用户电话
                            wx.setStorageSync('imgURL', res.data.data.imgURL); //存储用户电话
                            wx.setStorageSync('invitation', res.data.data.Invitation); //存储邀请码
                            if (wx.getStorageSync('activitieshoog') == '1') {
                              wx.reLaunch({
                                url: "/pages/homePage/activities/activities?uuid=" + wx.getStorageSync('activitiesId')
                              })
                            } else {
                              setTimeout(function () {
                                wx.navigateBack({
                                  delta: 1
                                })
                              })
                            }
                          } else {
                            wx.showToast({
                              title: res.data.msg,
                              icon: 'none',
                            })
                          }
                        },
                        () => {
                        },
                        () => {}
                      )


                    },
                    () => {
                    },
                    () => {}
                  )
                },
                () => {
                },
                () => {}
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
                    (res) => {},
                    () => {
                    },
                    () => {}
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