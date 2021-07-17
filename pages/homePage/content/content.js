//index.js
//获取应用实例
const app = getApp()
var bmap = require("../../../utils/bmap-wx.min.js");
var util = require("../../../utils/util.js");
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 5,
    forbade: false,
    activity: [], //获取项目分类
    activitySon: [], //获取项目详细分类
    mydata: {}, //选中城市返回 
    sportName: '运动项目',
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
    bannerArr: [], //banner图
    hidden: false, //项目选项显隐
    hiddenOne: false,
    hiddenTwo: false, //项目选项显隐二级
    sortHid: false, //智能排序
    statusHid: false, //状态
    ak: "ElFBk4MF87qZXoiLbD0zofEmZIS6bHT2", //申请到的ak
    markers: [],
    longitude: '', //经度
    latitude: '', //纬度
    address: '', //地址
    cityInfo: {}, //城市信息
    selectCity: '北京市', //选择后返回的城市
    flag: false, //是否加载完毕
    sportId: 0, //运动ID、
    status: 0, // 活动状态
    sportMode: 0, //运动模式
    payType: 0, //场地费支付类型
    sportType: 0, //二级运动ID .0  
    sex: 2, //性别
    acitvitysort: 0, //排序
    pages: 1, //页码
    projectData: '', //项目数据列表
    addressN: '', //选择地址后返回数据
    isSign: 0, //用户是是否签到
    goldNum: '', //签到后金币数量
    flagIs: '', //是否签到成功
    download: false,
    shost: false, //是否完善信息
    numId: 0, //项目筛选id
    range: 0, //距离范围默认0
    rangeName: '距离范围',
    sprtSeName: '推荐排序',
    startTime: '',
    endTime: '',
    joinCondition: 1,
    mingrade: 0,
    maxgrade: 0,
    praise: 0,
    Agemin: 1, //最小年龄
    Agemax: 99, //最大年龄
    img: '',
    getSetting: 0,
    officialAccount: false, //公众号提示
    closeImg: true,
    enabled: true,
    maskActivity: [],
    maskActivityTwo: [],
    certificate:0
  },

  closeTorigin:function(){
    this.setData({certificate:0})
  },

  contentTgp:function(){
    util.Request("/api/AddOffsetRoll", {uuid:wx.getStorageSync('uuid')}, "post",
    (res) => {
      if(res.data.code==2000){
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1500,
          mask: true
        })
        this.setData({
          certificate: 0
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
      }
      

    },
    () => {},
    () => {

    }
  )
  },

  catchTouchMove: function () {
    return false
  },

  //當時用了組件才會顯示
  bindload: function () {
    this.setData({
      closeImg: false,
    })
  },

  bookOnly: function () {
    wx.reLaunch({
      url: '/pages/publishing/publishing?indexSw=1'
    })
  },

  organizing: function () {
    wx.reLaunch({
      url: '/pages/publishing/publishing?indexSw=2'
    })
  },

  contentSon: function () {
    wx.navigateTo({
      url: '/generalization/contentTxt/contentTxt?flag=2',
    })
  },

  partner: function () {
    wx.navigateTo({
      url: '/generalization/contentTxt/contentTxt?flag=3',
    })
  },
  company: function () {
    wx.navigateTo({
      url: '/generalization/contentTxt/contentTxt?flag=4',
    })
  },
  competition: function () {
    wx.navigateTo({
      url: '/generalization/contentTxt/contentTxt?flag=6',
    })
  },

  closeMask: function () {
    this.setData({
      maskActivity: []
    })
  },
  closeMaskTwo: function () {
    this.setData({
      maskActivityTwo: []
    })
  },

  goOn: function (e) {
    util.Request("/api/ifAgreeOrgActivityNotFull", {
        uuid: e.currentTarget.dataset.uuid,
        type: e.currentTarget.dataset.index
      }, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1500,
          mask: true
        })
        this.setData({
          maskActivity: []
        })
        wx.hideLoading()
      },
      () => {},
      () => {

      }
    )
  },

  map: function () {
    var that = this;
    /*获取定位地理位置*/
    //新建bmap
    let BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    let fail = function (data) {}
    let success = function (data) {
      let wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        address: data.originalData.result.addressComponent.district,
        cityInfo: data.originalData.result.addressComponent,
        selectCity: data.originalData.result.addressComponent.city
      })
      wx.setStorageSync('province', data.originalData.result.addressComponent.province)
      wx.setStorageSync("cityInfo", data.originalData.result.addressComponent.city)
      wx.setStorageSync('area', data.originalData.result.addressComponent.district)
      wx.setStorageSync('address', wxMarkerData[0].address)
    }
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: res => {
        wx.setStorageSync('lat', res.latitude + 0.00540)
        wx.setStorageSync('lng', res.longitude + 0.005900)
        that.goleloand()
      },
      fail: e => {
        wx.getSetting({
          success: res => {
            console.log(res)
            if (typeof (res.authSetting['scope.userLocation']) != 'undefined' && !res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '提示',
                content: '您拒绝了定位权限，将无法使用活动签到功能',
                success: res => {
                  if (res.confirm) {
                    wx.openSetting({
                      success: res => {
                        if (res.authSetting['scope.userLocation']) {
                          wx.getLocation({
                            type: 'gcj02',
                            isHighAccuracy: true,
                            success: res => {
                              wx.setStorageSync('lat', res.latitude + 0.00540)
                              wx.setStorageSync('lng', res.longitude + 0.005900)
                              that.goleloand()
                            }
                          });
                        } else {
                          wx.showToast({
                            title: '您拒绝了定位权限，将无法使用活动签到功能',
                            icon: 'none'
                          });
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
    BMap.regeocoding({
      fail: fail,
      success: success
    });


  },
  openSetting() {
    wx.openSetting()
  },

  onLoad: function () {
    this.goleloand()
    if (wx.getStorageSync('token')) {

      util.Request("/api/alertForOrgActivityNotFullWindow", {}, "post",
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
          }

        

          this.setData({
            maskActivity: projectDataNow == undefined ? [] : projectDataNow
          })

        },
        () => {},
        () => {

        }
      )

    }








    this.map()
    this.setData({
      img: util.API
    })

    //  获取banner图
    util.request("/api/getIndexBanner", {}, "get",
      (res) => {
        this.setData({
          bannerArr: res.data.data
        })
        wx.hideLoading()
      },
      () => {},
      () => {

      }
    )





    //获取项目分类
    util.request("/api/getAllSports", {}, "get",
      (res) => {
        let activityNow = res.data.data
        let aa = {
          id: 0,
          name: "全部"
        }
        activityNow.unshift(aa)
        this.setData({
          activity: res.data.data
        })

      },
      () => {},
      () => {

      }
    )

  },
  refresh() {
    this.setData({
      enabled: true,
      pages: 1
    })
    this.goleloand()

  },

  tolower: function () {
    this.setData({
      pages: this.data.pages + 1
    })
    let show = true
    this.goleloand(show)
  },

  //初始化获取活动列表函数
  goleloand: function (show) {
    let {
      acitvitysort,
      sportType,
      sex,
      payType,
      sportMode,
      status,
      sportId,
      selectCity,
      longitude,
      latitude,
      address,
      pages,
      range,
      startTime,
      endTime,
      joinCondition,
      mingrade,
      maxgrade,
      praise,
      Agemin,
      Agemax,
    } = this.data //获取活动列表的参数
    let jsonData = {}
    jsonData.sex = sex
    jsonData.acitvitysort = acitvitysort
    jsonData.SportType = sportType
    jsonData.payType = payType
    jsonData.SportMode = sportMode
    jsonData.sportid = sportId
    jsonData.city = wx.getStorageSync('cityInfo') == '' ? '北京市' : wx.getStorageSync('cityInfo')
    jsonData.lng = wx.getStorageSync('lng') == '' ? '116.38' : wx.getStorageSync('lng')
    jsonData.lat = wx.getStorageSync('lat') == '' ? '39.90' : wx.getStorageSync('lat')
    jsonData.area = wx.getStorageSync('area') == '' ? '东城区' : wx.getStorageSync('area')





    jsonData.page = pages
    jsonData.range = range
    jsonData.startTime = startTime,
      jsonData.endTime = endTime,
      jsonData.joinCondition = joinCondition,
      jsonData.mingrade = mingrade,
      jsonData.maxgrade = maxgrade,
      jsonData.praise = praise,
      jsonData.Agemin = Agemin,
      jsonData.Agemax = Agemax,
      jsonData.istherereferee = 0
    jsonData.PipeMain = 0
    util.request("/api/getIndexAcitivitylistPipeMain", jsonData, "get",
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
        }

        if (show == true) {
          let mData = [...this.data.projectData, ...projectDataNow]
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
        this.setData({
          flag: true
        })
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      () => {
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      () => {

      }
    )

  },


  //页面返回 带参
  onShow: function () {

    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
   
    if( currPage.data.mydata.city!=undefined){
      this.setData({
        mydata: currPage.data.mydata,
        selectCity:currPage.data.mydata.city
      })
      wx.setStorageSync('cityInfo', currPage.data.mydata.city)
      wx.setStorageSync('lat', currPage.data.mydata.lat)
      wx.setStorageSync('lng', currPage.data.mydata.lng)
      wx.setStorageSync('area', '')
      setTimeout(() => {
        this.goleloand()
      }, 1000)
    }

   




    if (currPage.data.screenData != undefined) {
      this.setData({
        payType: currPage.data.screenData.payType,
        sex: currPage.data.screenData.sex,
        sportMode: currPage.data.screenData.sportMode === null ? 0 : currPage.data.screenData.sportMode,
        startTime: currPage.data.screenData.dateNow + currPage.data.screenData.startTime === '选择日期选择开始时间' ? 0 : currPage.data.screenData.dateNow + currPage.data.screenData.startTime,
        endTime: currPage.data.screenData.dateNow + currPage.data.screenData.endTime === '选择日期选择结束时间' ? 0 : currPage.data.screenData.dateNow + currPage.data.screenData.endTime,
        joinCondition: currPage.data.screenData.joinCondition === null ? 0 : currPage.data.screenData.joinCondition,
        mingrade: currPage.data.screenData.mingrade === '最低等级' ? 0 : currPage.data.screenData.mingrade,
        maxgrade: currPage.data.screenData.maxgrade === '最高等级' ? 0 : currPage.data.screenData.maxgrade,
        praise: currPage.data.screenData.praise === null ? 0 : currPage.data.screenData.praise
      })
      this.goleloand()
    }


    util.Request("/api/Statistics", {}, "get",
      (res) => {
        let projectDataNow = res.data.data
        this.setData({
          maskActivityTwo: projectDataNow == undefined ? [] : projectDataNow
        })
        util.Request("/api/frame", {}, "post",
        (res) => {
          this.setData({certificate:res.data.other})
          wx.hideLoading()
        },
        () => {},
        () => {

        }
      )

      },
      () => {},
      () => {

      }
    )




    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 //这里写相应页面的序号
      })
    }



  },


  //场馆签到
  signin: function (e) {
    util.Request("/api/userArrivalSignin", {
        'publicUid': e.currentTarget.dataset.id,
        'lat': wx.getStorageSync('lat'),
        'lng': wx.getStorageSync('lng')
      }, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        this.setData({
          maskActivityTwo: []
        })
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  //填写比赛结果F
  comResult: function (e) {
    wx.navigateTo({
      url: '/generalization/yesResults/yesResults?publicuuid=' + e.currentTarget.dataset.id,
    })
  },

  onKey: function (e) {
    let obj = {
      publicUuid: e.currentTarget.dataset.id
    }
    util.Request("/api/addAllGoodsComment", obj, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        this.setData({
          maskActivityTwo: []
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )


  },

  //跳转待评价
  comment: function (e) {
    wx.navigateTo({
      url: '/generalization/appraisals/appraisals?id=' + e.currentTarget.dataset.id,
    })
  },




  //跳转选择地址
  inputS: function () {
    let {
      selectCity,
      cityInfo
    } = this.data

    if (selectCity != null) {
      wx.navigateTo({
        url: '/pages/homePage/area/area?city=' + selectCity
      })
    } else {
      wx.showToast({
        title: '请选择城市',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },
  //跳转消息
  news: function () {
    wx.navigateTo({
      url: '/pages/homePage/news/news'
    })

  },
  //点击签到
  isSign: function (e) {
    if (wx.getStorageSync('token')) {
      if (e.currentTarget.dataset.status == 0) {
        util.Request("/api/userSignIn", {}, "post",
          (res) => {
            this.setData({
              isSign: 1,
              flagIs: true
            })
          },
          () => {
            console.log("失败")
          },
          () => {}
        )
        util.Request("/api/getCommonCoins", {}, "get",
          (res) => {
            this.setData({
              goldNum: res.data.data.coins
            })
          },
          () => {
            console.log("失败")
          },
          () => {

          }
        )
      } else {
        wx.showToast({
          title: '您今天已签到,谢谢',
          icon: 'none',
          duration: 1500,
          mask: true
        })
      }

    }
  },
  //关闭签到弹窗
  close: function () {
    this.setData({
      flagIs: false
    })
  },

  //跳转城市列表
  cityList: function () {
    wx.navigateTo({
      url: '/pages/homePage/cityList/cityList'
    })
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
  itemSelectionH: function () {
    this.setData({
      hidden: false,
      hiddenOne: false,
      hiddenTwo: false,
      sortHid: false
    })
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
    this.goleloand()
    if (e.currentTarget.dataset.num === 0) {
      this.setData({
        hidden: false
      })
    }

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
          if (id == 5) {
            this.setData({
              activitySon: arr
            })
          } else {
            this.setData({
              activitySon: res.data.data
            })
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
      sportName: this.data.sportName + e.currentTarget.dataset.name
    })

    this.goleloand()
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
  //智能排序选中
  sortSe: function (e) {
    this.setData({
      acitvitysort: e.currentTarget.dataset.num,
      pages: 1,
      sprtSeName: e.currentTarget.dataset.name
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
      rangeName: e.currentTarget.dataset.name
    })
    this.goleloand()
  },
  //跳转筛选页面
  screen: function () {
    wx.navigateTo({
      url: '/pages/homePage/screen/screen'
    })
  },
  //上拉加载
  onReachBottom: function () {

    this.setData({
      pages: this.data.pages + 1
    })
    let show = true
    this.goleloand(show)
  },
  //下拉刷新 
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //显示动画
    this.setData({
      pages: 1
    })
    this.goleloand()
  },
  //跳转兑换商城
  goldMall: function () {
    wx.navigateTo({
      url: '/pages/homePage/goldMall/goldMall'
    })
  },

  //跳转报名偏好
  signUp: function () {
    wx.navigateTo({
      url: '/generalization/signUp/signUp'
    })
  },
  activites: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid=' + e.currentTarget.dataset.uuid + '&hoog=0'
    })
  },
  download: function () {
    this.setData({
      download: true
    })
  },
  closeDowload: function () {
    this.setData({
      download: false
    })
  },
  generaGold: function () {

    wx.navigateTo({
      url: '/pages/homePage/generalGold/generalGold'
    })

  },
  generalization: function () {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/generalization/promotion/promotion'
      })
    }
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
        console.log(data);
      },
      fail: function (err) {
        console.log(err);
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

  }

})