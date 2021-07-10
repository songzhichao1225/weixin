//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
import {
  base64src
} from '../../utils/base64src.js'
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 45,
    forbade: false,
    avatar: '',
    name: '',
    goldNum: '',
    flag: false,
    flagTwo: 0,
    applicationList: [{
        img: 'IconWdHd@2x.png',
        name: '我的活动',
        click: 'activities'
      },
      {
        img: 'dui.png',
        name: '我的对手果',
        click: 'mineGold'
      },
      {
        img: 'ji.png',
        name: '我的技术分',
        click: 'mineFen'
      },
      {
        img: 'lokoksd.png',
        name: '我的抵用券',
        click: 'voucher'
      },
      {
        img: 'IconWdQb@2x.png',
        name: '我的钱包',
        click: 'mineMoney'
      },
      // { img: 'xianperios.png', name: '我的偏好', click: 'minePreference' },
      // { img: 'IconWdXzcg@2x.png', name: '新增场馆', click: 'minefriends' },
      {
        img: 'IconWdHy@2x.png',
        name: '我的好友',
        click: 'minefriends'
      },
      // { img: 'IconWdGz@2x.png', name: '我的关注', click: 'mineAbout' },
      {
        img: 'IconWdGyyy@2x.png',
        name: '关于小程序',
        click: 'aboutApp'
      },
      {
        img: 'IconWdSz@2x.png',
        name: '设置',
        click: 'mineAbout'
      },
      // { img: 'caipanha.png', name: '成为裁判', click: 'mineHelp' },
      {
        img: 'IconWdBzzx@2x.png',
        name: '帮助中心',
        click: 'mineHelp'
      },
      {
        img: 'IconWdYjfk@2x.png',
        name: '意见反馈',
        click: 'mineOpinion'
      },
    ],
    mineDetail: [],
    imgURL: '',
    img: '',
    Invitation: '', //邀请码
    baseSixFour: '',
    option: '',
    timeOut: true,
    officialAccount: true, //公众号提示
    closeImg: false,
    userTkContent:[],
    userTk:2
  },

  replacement: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机选择'],
      success: function (res) {
        wx.showNavigationBarLoading()
        let imgArr = null;
        if (res.tapIndex == 0) {
          imgArr = ['camera']
        } else if (res.tapIndex == 1) {
          imgArr = ['album']
        }

        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: imgArr,
          success(res) {
            let tempFilePaths = res.tempFilePaths[0]
            console.log(tempFilePaths)
            util.Request("/api/uploadHeaderImg", tempFilePaths, 'post',
              (resTwo) => {
                util.Request("/api/getUserDetailInfo", {
                    'uuid': wx.getStorageSync('uuid')
                  }, "get",
                  (resThree) => {
                    that.setData({
                      mineDetail: resThree.data.data,
                    })
                  },
                  () => {
                    console.log("失败")
                  },
                  () => {}
                )
              },
              () => {},
              () => {}
            )
          }
        })

      }
    })



  },

  //关闭公众号组件
  closeOfficialAccount: function () {
    this.setData({
      officialAccount: false
    })
  },

  //當時用了組件才會顯示
  bindload: function () {
    this.setData({
      closeImg: true,
    })
  },

  onLoad: function (option) {
    if (option.Invite_code == undefined) {
      app.globalData.Invite_code = '';
    } else {
      app.globalData.Invite_code = option.Invite_code
    }
    this.setData({
      img: util.API,
      option: option
    })
    // if (wx.getStorageSync('token')) {
    //   wx.showLoading({
    //     title: '加载中~',
    //     mask: true
    //   })
    //   util.Request("/api/getCommonCoins", {}, "get",
    //     (res) => {
    //       this.setData({
    //         goldNum: res.data.data.coins,
    //         flag: true
    //       })
    //       wx.setStorageSync('coins', res.data.data.coins)
    //       wx.hideLoading()
    //     },
    //     () => {
    //       console.log("失败")
    //     },
    //     () => {}
    //   )
    //   if (wx.getStorageSync('uuid') != '' || wx.getStorageSync('uuid') != undefined) {
    //     util.Request("/api/getUserDetailInfo", {
    //         'uuid': wx.getStorageSync('uuid')
    //       }, "get",
    //       (res) => {
    //         this.setData({
    //           mineDetail: res.data.data,
    //           imgURL: wx.getStorageSync('imgURL')
    //         })
    //       },
    //       () => {
    //         console.log("失败")
    //       },
    //       () => {}
    //     )
    //   }

    // } else if (wx.getStorageSync('token') && wx.getStorageSync('information') != '信息完善') {
    //   wx.showModal({
    //     content: '完善个人信息',
    //     cancelText: '再看看',
    //     confirmText: '去完善',
    //     confirmColor: '#000',
    //     success(res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: '/pages/personalData/personalData'
    //         })
    //       } else if (res.cancel) {

    //       }
    //     }
    //   })
    // } else {

    // }


    wx.hideLoading()
  },
  onShow: function () {
    this.onLoad(this.data.option)

    util.Request("/api/getHighestLevel", {}, "get",
      (res) => {
        if (res.data.code == 4001) {
          this.setData({
            timeOut: false,
            flag: true
          })
        } else {
          this.setData({
            Invitation: res.data.data.Invitation,
            flag: true,
            timeOut: true
          })
          util.Request("/api/getUserDetailInfo", {
              'uuid': wx.getStorageSync('uuid')
            }, "get",
            (res) => {
              this.setData({
                mineDetail: res.data.data,
                imgURL: wx.getStorageSync('imgURL')
              })
              util.Request("/api/getusertk", {}, "post",
              (res) => {
                this.setData({
                  userTk:res.data.data.type,
                  userTkContent:res.data.data
               })
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
            },
            () => {
              console.log("失败")
            },
            () => {}
          )

        
        }





      },
      () => {
        console.log("失败")
      },
      () => {}
    )
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }

  },
  activities: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/mineActivities/mineActivities'
      })
    }
  },
  gold: function () {
    wx.navigateTo({
      url: '/generalization/mineGolDrankingTwo/mineGolDrankingTwo'
    })
  },
  mineMoney: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/pages/mineWallet/mineWallet'
      })
    }
  },
  mineAbout: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/aboutApp/aboutApp'
      })
    }
  },
  mineGold: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/mineGold/mineGold'
      })
    }
  },

  voucher: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/voucher/voucher'
      })
    }
  },

  mineFen: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/Technical/Technical'
      })
    }
  },

  minefriends: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/mineFriend/mineFriend'
      })
    }
  },

  golDranking: function () {
    wx.navigateTo({
      url: '/generalization/mineGolDranking/mineGolDranking'
    })
  },

  mineOpinion: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/pages/mineOpinion/mineOpinion'
      })
    }
  },

  aboutApp: function () {
    wx.navigateTo({
      url: '/pages/aboutApp/aboutApp'
    })
  },

  personalData: function () {
    wx.navigateTo({
      url: '/pages/personalData/personalData'
    })
  },
  mineHelp: function () {
    if (this.data.timeOut == false) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    } else {
      wx.navigateTo({
        url: '/generalization/assistant/assistant'
      })
    }
  },
  minePreference: function () {
    wx.navigateTo({
      url: '/generalization/minePreference/minePreference'
    })
  },
  //跳转用户详情
  Personal: function (e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uuid
      })
    }
  },
  releaseDynamics: function () {
    wx.navigateTo({
      url: '/generalization/releaseDynamics/releaseDynamics'
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
      success: function (data) {},
      fail: function (err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("用户一开始拒绝了，我们想再次发起授权")
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

  },
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  twoCode() {
    wx.showLoading({
      title: '获取中~',
    })
    util.Request("/api/program_qrcode", {}, "post",
      (res) => {
        base64src('data:image/jpeg;base64,' + res.data.data, res => {
          this.setData({
            baseSixFour: res,
            flagTwo: 1
          })
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },
  information() {
    this.setData({
      flagTwo: 0
    })
  },
  timeOut: function () {
    wx.navigateTo({
      url: '/pages/authorization/authorization'
    })
    this.setData({
      timeOut: true
    })
  },
  invitationalList: function () {
    wx.navigateTo({
      url: '/generalization/invitationalList/invitationalList'
    })
  },
  banner:function(){
    util.Request("/api/closeGiftWindow", {}, "post",
    (res) => {
      this.setData({userTk:2})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )
   
  }
}) 