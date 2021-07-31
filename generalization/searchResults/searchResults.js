const util = require('../../utils/util.js')
Page({


  data: {
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
    rangeName: '距离范围',
    sprtSeName: '推荐排序',
    activity:[],
    activitySon:[],
    

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
    selectCity: null, //选择后返回的城市
    flag: false, //是否加载完毕
    sportId: 0, //运动ID、
    status: 0, // 活动状态
    sportMode: 0, //运动模式
    payType: 0, //场地费支付类型
    sportType: 0, //二级运动ID .0  
    sex: 2, //性别
    acitvitysort: 0, //排序
    pages: 1, //页码
    projectData: [], //项目数据列表
    addressN: '', //选择地址后返回数据
    isSign: 0, //用户是是否签到
    goldNum: '', //签到后金币数量
    flagIs: '', //是否签到成功
    download: false,
    shost: false, //是否完善信息
    numId: 0,//项目筛选id
    range: 0,//距离范围默认0
    rangeName: '距离范围',
    sprtSeName: '推荐排序',
    startTime: '',
    endTime: '',
    joinCondition: '',
    mingrade: 0,
    maxgrade: 0,
    praise: 0,
    Agemin:1,//最小年龄
    Agemax:99,//最大年龄
    img:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  itemSelectionH: function () {
    this.setData({
      hidden: false,
      hiddenOne: false,
      hiddenTwo: false,
      sortHid: false
    })
  },

  activites: function (e) {

    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid=' + e.currentTarget.dataset.uuid
    })
  },

  screen:function(){
    wx.navigateTo({
      url: '/generalization/screen/screen'
    })
  },
  onLoad: function (options) {
    this.setData({
      img:util.API
    })
  
   util.Request("/api/getPreferenceFirst", {'prefeuuid':options.uuid}, "post",
   (res) => {
    wx.setNavigationBarTitle({
      title: res.data.data.title+'搜索结果'
    })
    let ko=res.data.data

    let obj={
      sportMode: ko.sportmode,
      payType: ko.bearmode,
      sex: ko.Publishersex,
      dateNow: ko.public_date,
      startTime: ko.public_start,
      endTime: ko.public_end,
      mingrade: ko.minAvgGrade,
      maxgrade: ko.maxAvgGrade,
      praise: ko.average,
      joinCondition: ko.activity,
      Agemin:ko.minAvgAge,
      Agemax:ko.maxAvgAge,
      caiTap:ko.istherereferee,
    }
    wx.setStorage({
      data: obj,
      key: 'screenDataTwo',
    })
    
    this.setData({
      acitvitysort:ko.sort,
      sportType:ko.sporttype,
      sex:ko.Publishersex,
      payType:ko.bearmode,
      sportMode:ko.sportmode,
      sportId:ko.sportid,
      longitude:ko.lng,
      latitude:ko.lat,
      range:ko.distance,
      startTime:ko.public_start,
      endTime:ko.public_end,
      joinCondition:ko.activity,
      mingrade:ko.minAvgGrade,
      maxgrade:ko.maxAvgGrade,
      Agemin:ko.minAvgAge,
      Agemax:ko.maxAvgAge,
      praise:ko.average,
      istherereferee:ko.istherereferee
    })
     this.goleloand()
   },
   () => {
   },
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
   wx.hideLoading()
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
      sportType: 0,
      acitvitysort: 0,
      status: '',
      sportName: e.currentTarget.dataset.name,
      numId: id
    })
    this.goleloand()
    if (e.currentTarget.dataset.num === 0) {
      this.setData({ hidden: false })
    }

    //获取项目分类下的详细分类
    if (id != 0) {
      util.request("/api/getDatialSport", {
        "id": id
      }, "get",
        (res) => {
          this.setData({
            activitySon: res.data.data
          })
        },
        () => { },
        () => { }
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
      hidden:false
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
      sprtSeName: e.currentTarget.dataset.name,
      hidden:false
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
      hidden:false
    })
    this.goleloand()
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
      istherereferee
    } = this.data //获取活动列表的参数
    let jsonData = {}
    jsonData.sex = sex
    jsonData.acitvitysort = acitvitysort
    jsonData.SportType = sportType
    jsonData.payType = payType
    jsonData.SportMode = sportMode
    jsonData.sportid = sportId
    jsonData.city = selectCity
    jsonData.lng = longitude
    jsonData.lat = latitude
    jsonData.area = address
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
    jsonData.istherereferee = istherereferee,
      util.Request("/api/getIndexAcitivitylist", jsonData, "get",
        (res) => {
          if(res.data.code===2000){
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

          }

          if (show == true) {
            let mData = [...this.data.projectData, ...projectDataNow]
            this.setData({
              projectData: mData
              
            })
          } else {
            this.setData({
              projectData: projectDataNow
              
            })
          }

          wx.hideLoading()
          this.setData({
            flag: true
          })
          wx.stopPullDownRefresh() //停止下拉刷新
        }else{
          this.setData({
            projectData: []
          })
        }

        },
        () => {
          wx.stopPullDownRefresh() //停止下拉刷新
        },
        () => {

        }
      )

  },
  onShow:function(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(currPage.data.screenDataTwo!=undefined){
      
      let ko=currPage.data.screenDataTwo
      this.setData({
        sex:ko.sex,
        payType:ko.payType,
        sportMode:ko.sportMode==null?'':ko.sportMode,
        startTime:ko.startTime=='选择开始时间'?'':ko.startTime,
        endTime:ko.startTime=='选择结束时间'?'':ko.endTime,
        joinCondition:ko.joinCondition,
        mingrade:ko.mingrade=='最低等级'?'':ko.mingrade,
        maxgrade:ko.maxgrade=='最高等级'?'':ko.maxgrade,
        Agemin:ko.Agemin,
        Agemax:ko.Agemax,
        istherereferee:ko.caiTap
      })
      this.goleloand()
    }
  }
  
})