const util = require('../../utils/util.js')
Page({

  data: {
    enabled: false,
    activity: [],
    sportName: '运动项目',
    hidden: false, //项目选项显隐
    hiddenOne: false,
    hiddenTwo: false, //项目选项显隐二级
    sortHid: false, //智能排序
    statusHid: false, //状态
    rangeName: '距离范围',
    sprtSeName: '推荐排序',
    pages: 1,
    sportId: 0,
    range: 0,
    SportMode: '',
    sportType: 0,
    acitvitysort: 0,
    flag: 1,
    img: '',
    projectData: [],
    sort: [{
        name: "距离由近到远",
        num: 0
      },
      {
        name: "时间由近到远",
        num: 1
      },
      {
        name: "级别由高到低",
        num: 2
      },
      {
        name: "级别由低到高",
        num: 3
      },
      {
        name: "好评优选",
        num: 4
      },
    ],
    statusH: [{
        name: "全部",
        num: 0
      },
      {
        name: "1km",
        num: 1
      },
      {
        name: "2km",
        num: 2
      },
      {
        name: "4km",
        num: 4
      },
      {
        name: "10km",
        num: 10
      },
    ],
    forbade: false,
  },

  forbade: function () {
    this.setData({
      forbade: true
    })
  },
  closeTwo: function () {
    this.setData({
      forbade: false
    })
  },

  activites: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid=' + e.currentTarget.dataset.uuid + '&hoog=0'
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.flag == 2 ? '踢馆' : options.flag == 3 ? '找陪练' : options.flag == 4 ? '运动结伴' : options.flag == 6 ? '比赛赛事' : ''
    })
    this.setData({
      flag: options.flag,
      img: util.API
    })
    //获取项目分类
    util.request("/api/getAllSports", {}, "get",
      (res) => {
        let activityNow = res.data.data
        let aa = {
          id: 0,
          name: "全部"
        }
        activityNow.unshift(aa)
        let arrSport = [{
            name: '全部',
            id: 0
          },
          {
            name: '羽毛球',
            id: 1
          },
          {
            name: '乒乓球',
            id: 2
          },
          {
            name: '台球',
            id: 3
          },
          {
            name: '网球',
            id: 7
          },
        ]
        this.setData({
          activity: options.flag == 3 ? arrSport : res.data.data
        })
      },
      () => {},
      () => {

      }
    )
    let that = this
    setTimeout(function () {
      that.goleloand()
    }, 100)
    wx.hideLoading()
  },

  //智能排序下拉
  sortHid: function () {
    if (this.data.hidden == true) {
      this.setData({
        sortHid: false,
        hidden: false,
        hiddenOne: false,
        hiddenTwo: false,
        statusHid: false,
      })
    } else {
      this.setData({
        sortHid: true,
        hidden: true,
        hiddenOne: false,
        hiddenTwo: false,
        statusHid: false
      })
    }

  },

  //项目选择
  itemSelection: function () {
    if (this.data.hidden == true) {
      this.setData({
        sortHid: false,
        hidden: false,
        hiddenOne: false,
        hiddenTwo: false,
        statusHid: false
      })
    } else {
      this.setData({
        hidden: true,
        hiddenOne: true,
        statusHid: false,
      })
    }
  },
  //项目选择二级
  secondary: function (e) {
    let id = e.currentTarget.dataset.num
    this.setData({
      sportId: e.currentTarget.dataset.num,
      pages: 1,
      sportType: '',
      acitvitysort: '',
      status: '',
      sportName: e.currentTarget.dataset.name,
      numId: id
    })
    if (e.currentTarget.dataset.num === 0) {
      this.setData({
        hidden: false
      })
    }
    this.goleloand()

    //获取项目分类下的详细分类
    if (id != 0) {
      util.request("/api/getDatialSport", {
          "id": id
        }, "get",
        (res) => {
          let obj = {
            id: '',
            name: "全部"
          }
          res.data.data.unshift(obj)
          let arr = []
          arr.push(...res.data.data.slice(0, 4))
          arr.push(...res.data.data.slice(5, 6))
          arr.push(...res.data.data.slice(4, 5))
          if (this.data.flag == 2) {
            if (id == 1 || id == 2 || id == 4) {
              this.setData({
                activitySon: res.data.data.slice(1, 3)
              })
            } else if (id == 5) {
              let arr = [{
                  id: 0,
                  name: '全部'
                },
                {
                  id: 13,
                  name: '11人制'
                },
                {
                  id: 25,
                  name: '9人制'
                },
                {
                  id: 14,
                  name: '8人制'
                },
                {
                  id: 15,
                  name: '7人制'
                },
                {
                  id: 23,
                  name: '6人制'
                },
                {
                  id: 16,
                  name: '5人制'
                },
              ]
              this.setData({
                activitySon: arr
              })
            } else {
              this.setData({
                activitySon: res.data.data
              })
            }

          } else if (this.data.flag == 3) {
            if (id == 5) {
              let arr = [{
                  id: 0,
                  name: '全部'
                },
                {
                  id: 13,
                  name: '11人制'
                },
                {
                  id: 25,
                  name: '9人制'
                },
                {
                  id: 14,
                  name: '8人制'
                },
                {
                  id: 15,
                  name: '7人制'
                },
                {
                  id: 23,
                  name: '6人制'
                },
                {
                  id: 16,
                  name: '5人制'
                },
              ]
              this.setData({
                activitySon: arr
              })
            } else if (id == 1 || id == 2 || id == 7) {

              this.setData({
                activitySon: res.data.data.slice(1, 2)
              })
            } else {
              this.setData({
                activitySon: res.data.data
              })
            }
          } else {
            if (id == 5) {
              let arr = [{
                  id: 0,
                  name: '全部'
                },
                {
                  id: 13,
                  name: '11人制'
                },
                {
                  id: 25,
                  name: '9人制'
                },
                {
                  id: 14,
                  name: '8人制'
                },
                {
                  id: 15,
                  name: '7人制'
                },
                {
                  id: 23,
                  name: '6人制'
                },
                {
                  id: 16,
                  name: '5人制'
                },
              ]
              this.setData({
                activitySon: arr
              })
            } else {
              this.setData({
                activitySon: res.data.data
              })
            }

          }


        },
        () => {},
        () => {}
      )
      this.setData({
        hiddenTwo: true
      })
    }
    this.setData({
      sportId: id
    })

  },
  //点击选中二级运动项目
  activityTwoSon: function (e) {
    this.setData({
      sportType: e.currentTarget.dataset.num,
      pages: 1,
      sportName: this.data.sportName + e.currentTarget.dataset.name,
      hidden: false,
      hiddenTwo: false
    })
    this.goleloand()

  },
  //智能排序选中
  sortSe: function (e) {
    this.setData({
      acitvitysort: e.currentTarget.dataset.num,
      pages: 1,
      sprtSeName: e.currentTarget.dataset.name,
      hidden: false,
      sortHid: false,
    })
    this.goleloand()
  },
  //状态下拉0
  statusHid: function () {
    if (this.data.hidden == true) {
      this.setData({
        sortHid: false,
        hidden: false,
        hiddenOne: false,
        hiddenTwo: false
      })
    } else {
      this.setData({
        sortHid: false,
        statusHid: true,
        hidden: true,
        hiddenOne: false,
        hiddenTwo: false
      })
    }
  },
  //状态选中
  statusSe: function (e) {
    this.setData({
      range: e.currentTarget.dataset.num,
      pages: 1,
      rangeName: e.currentTarget.dataset.name,
      hidden: false
    })
    this.goleloand()
  },
  goleloand: function (show) {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.flag == 6) {
      wx.hideLoading()
      return false

    }

    let jsonData = {
      page: this.data.pages,
      city: wx.getStorageSync('cityInfo'),
      sportid: this.data.sportId,
      SportType: this.data.sportType,
      SportMode: this.data.flag == 4 || this.data.flag == 6 ? 0 : this.data.flag,
      payType: '',
      sex: 2,
      range: this.data.range,
      joinCondition: 0,
      acitvitysort: this.data.acitvitysort,
      lat: wx.getStorageSync('lat'),
      lng: wx.getStorageSync('lng'),
      PipeMain: Number(this.data.flag),
      Agemin: '',
      Agemax: '',
      mingrade: '',
      maxgrade: '',
      praise: '',
      istherereferee: 0,
      week: ''
    }
    util.Request("/api/getIndexAcitivitylistPipeMain", jsonData, "post",
      (res) => {
        let projectDataNow = res.data.data.activeLst
        for (let i in projectDataNow) {
          if (projectDataNow[i].SportMode == '1') {
            projectDataNow[i].SportMode = '娱乐模式'
          } else if (projectDataNow[i].SportMode == '2') {
            projectDataNow[i].SportMode = '竞技模式'
          } else if (projectDataNow[i].SportMode == '3') {
            projectDataNow[i].SportMode = '我是陪练'
          } else if (projectDataNow[i].SportMode == '4') {
            projectDataNow[i].SportMode = '我找陪练'
          } else if (projectDataNow[i].PaySiteMoneyType == 1) {
            projectDataNow[i].PaySiteMoneyType = 'AA'
          } else if (projectDataNow[i].PaySiteMoneyType == 0) {
            projectDataNow[i].PaySiteMoneyType = '输方买单'
          }
          if (projectDataNow[i].MoneyPerhour.toString().indexOf('.') == -1) {
            projectDataNow[i].MoneyPerhour = projectDataNow[i].MoneyPerhour + '.00'
          }
          projectDataNow[i].PipeMainMoney = projectDataNow[i].PipeMainMoney.slice(0, projectDataNow[i].PipeMainMoney.length - 1)
        }

        if (show == true) {
          let mData = [...this.data.projectData, ...projectDataNow]
          if (res.data.data.activeLst.length == 0) {
            wx.showToast({
              title: '没有更多了~',
              icon: 'none',
              duration: 2000
            })
          }
          this.setData({
            projectData: mData
          })
        } else {
          this.setData({
            projectData: projectDataNow,
            enabled: false,
          })
        }

        wx.hideLoading()
        wx.stopPullDownRefresh() //停止下拉刷新

      },
      () => {
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      () => {

      }
    )




  },
  //上拉加载
  tolower: function () {
    this.setData({
      pages: this.data.pages + 1
    })
    let show = true
    this.goleloand(show)
  },
  refresh() {
    this.setData({
      enabled: true,
      pages: 1
    })
    this.goleloand()

  },

  releaseSix: function () {
    if (this.data.flag == 2) {
      util.Request("/api/ActivityWhitelist", {}, "post",
        (res) => {
          if (res.data.code === 2000) {
            wx.reLaunch({
              url: '/pages/publishing/publishing?indexSw=5'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        () => {},
        () => {}
      )

    } else if (this.data.flag == 3) {
      wx.reLaunch({
        url: '/pages/publishing/publishing?indexSw=3'
      })
    } else if (this.data.flag == 4) {
      wx.reLaunch({
        url: '/pages/publishing/publishing?indexSw=0'
      })
    }

  },
  saveImg(e) {
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success: function (data) {},
      fail: function (err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {


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