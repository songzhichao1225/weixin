const util = require('../../utils/util.js')

Page({
  data: {
    List: [{
        name: '神准时19'
      },
      {
        name: '态度好10'
      },
      {
        name: '严格遵守比赛结果8'
      },
      {
        name: '很热情9'
      },
      {
        name: '严重迟到5'
      },
      {
        name: '严格遵守比赛规则4'
      },
      {
        name: '未到场 3'
      },
      {
        name: '严格遵守比赛规则2'
      },
    ],
    personalData: [],
    flag: false,
    img: '',
    closeFing: false,
    indexd: '1',
    dynameicList: [],
    dynameicListLeft: [],
    dynameicListRight: [],
    uuid: '',
    page: 1,
    myUUid: '',
    haUuid: wx.getStorageSync('uuid'),
    pageTwo: 1,
    publicLst: [],
    enabled: false,
    enabledTwo: false,
  },
  onLoad: function (option) {
    this.setData({
      img: util.API,
      myUUid: option.uuid
    })
    wx.showLoading({
      title: '加载中~',
      mask: true
    })

    util.Request("/api/getUserDetailInfo", {
        'uuid': option.uuid
      }, "get",
      (res) => {
        this.setData({
          personalData: res.data.data,
          flag: true
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  //添加好友
  addFriend: function (e) {
    util.Request("/api/addFriends", {
        'friendsId': e.currentTarget.dataset.uuid
      }, "post",
      (res) => {
        if (res.data.code == 2000) {
          wx.showToast({
            title: '请求成功，待对方确认',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  //对手果
  counterCoin: function () {
    wx.navigateTo({
      url: '/generalization/assistantTwo/assistantTwo?type=2',
    })
  },
  closeFing: function () {
    this.setData({
      closeFing: true
    })
  },
  closeFingTwo: function () {
    this.setData({
      closeFing: false
    })
  },
  bossTitle: function (e) {

    this.setData({
      indexd: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index == '2') {
      this.list()
    } else if (e.currentTarget.dataset.index == '3') {
      this.ActiveLst()
    }
  },
  list: function (show) {
    util.Request("/api/getPlayerDynamicList", {
        'page': this.data.page,
        playeruuid: this.data.myUUid
      }, "post",
      (res) => {
        let projectDataNow = res.data.data
        if (show == true) {
          var dataSon = [...this.data.dynameicList, ...projectDataNow]
          if (projectDataNow.length == 0) {
            wx.showToast({
              title: '没有更多了~',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          var dataSon = projectDataNow
        }
        for (let i in dataSon) {
          dataSon[i].index = Number(i)
        }
        let dynameicListLeft = []
        let dynameicListRight = []
        for (let i in dataSon) {
          if (dataSon[i].index % 2 == 0) {
            dynameicListLeft.push(dataSon[i])
          } else {
            dynameicListRight.push(dataSon[i])
          }
        }
        this.setData({
          dynameicListLeft: dynameicListLeft,
          dynameicListRight: dynameicListRight,
          dynameicList: dataSon,
          enabled: false
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  thumbsUp: function (e) {

    for (let i in this.data.dynameicList) {
      if (this.data.dynameicList[i].uuid == e.currentTarget.dataset.uuid) {
        if (this.data.dynameicList[i].isown == 1) {
          this.data.dynameicList[i].isown = 0
          this.data.dynameicList[i].fabulou = this.data.dynameicList[i].fabulou - 1
        } else {
          this.data.dynameicList[i].isown = 1
          this.data.dynameicList[i].fabulou = this.data.dynameicList[i].fabulou + 1
        }
      }
    }

    let dynameicListLeft = []
    let dynameicListRight = []
    for (let i in this.data.dynameicList) {
      if (this.data.dynameicList[i].index % 2 == 0) {
        dynameicListLeft.push(this.data.dynameicList[i])
      } else {
        dynameicListRight.push(this.data.dynameicList[i])
      }
    }
    this.setData({
      dynameicListLeft: dynameicListLeft,
      dynameicListRight: dynameicListRight
    })

    util.Request("/api/PlayerDynamicGiveTheThumbsUp", {
        'dynamic_id': e.currentTarget.dataset.uuid
      }, "post",
      (res) => {},
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  dynamicDetails: function (e) {
    wx.navigateTo({
      url: '/generalization/dynamicDetails/dynamicDetails?uuid=' + e.currentTarget.dataset.uuid
    })
  },
  onShow: function () {
    this.list()
  },
  avataBoss: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [e.currentTarget.dataset.src]
    })
  },

  joinDong() {
    wx.navigateTo({
      url: '/generalization/releaseDynamics/releaseDynamics'
    })
  },
  ActiveLst: function (showTwo) {
    util.Request("/api/getPlayerPublicList", {
        'page': this.data.pageTwo,
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        playeruuid: this.data.myUUid
      }, "post",
      (res) => {

        let projectDataNow = res.data.data
        for (let i in projectDataNow) {
          if (projectDataNow[i].SportMode == '1' && projectDataNow[i].reserve == 1) {
            projectDataNow[i].SportMode = '仅预订场馆'
          } else if (projectDataNow[i].SportMode == '1') {
            projectDataNow[i].SportMode = '娱乐模式'
          } else if (projectDataNow[i].SportMode == '2') {
            projectDataNow[i].SportMode = '竞技模式 '
          } else if (projectDataNow[i].SportMode == '3') {
            projectDataNow[i].SportMode = '我是陪练 '
          } else if (projectDataNow[i].SportMode == '4') {
            projectDataNow[i].SportMode = '我找陪练 '
          } else if (projectDataNow[i].PaySiteMoneyType == 1) {
            projectDataNow[i].PaySiteMoneyType = 'AA'
          } else if (projectDataNow[i].PaySiteMoneyType == 0) {
            projectDataNow[i].PaySiteMoneyType = '输方买单'
          }
        }
        if (showTwo == true) {
          var data = [...this.data.publicLst, ...projectDataNow]
          if (projectDataNow.length == 0) {
            wx.showToast({
              title: '没有更多了~',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          var data = projectDataNow
        }

        this.setData({
          publicLst: data,
          enabledTwo: false
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  refresh() {
    this.setData({
      enabled: true,
      page: 1
    })
    this.list()
  },
  //上拉加载
  tolower: function () {
    this.setData({
      page: this.data.page + 1
    })
    let show = true
    this.list(show)
  },

  refreshTwo() {
    this.setData({
      enabledTwo: true,
      pageTwo: 1
    })
    this.ActiveLst()
  },
  //上拉加载
  tolowerTwo: function () {
    this.setData({
      pageTwo: this.data.pageTwo + 1
    })
    let showTwo = true
    this.ActiveLst(showTwo)
  },

  //跳转详情
  activities: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid=' + e.currentTarget.dataset.uuid,
    })
  },


})