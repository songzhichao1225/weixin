const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 8,
    headerList: [{
        name: '羽毛球',
        num: '1',
        color: true,
      },
      {
        name: '乒乓球',
        num: '2',
        color: false,
      },
      {
        name: '台球',
        num: '3',
        color: false,
      },
      {
        name: '篮球',
        num: '4',
        color: false,
      },
      {
        name: '足球',
        num: '5',
        color: false,
      },
      {
        name: '排球',
        num: '6',
        color: false,
      },
      {
        name: '网球',
        num: '7',
        color: false,
      }
    ],

    rankingType: [{
        name: '好友排名',
        num: '0',
        color: false,
        title: '好友',
        nameE: 'myFriends'
      },
      {
        name: '区排名',
        num: '4',
        color: false,
        title: wx.getStorageSync('area'),
        nameE: 'area'
      },
      {
        name: '市排名',
        num: '3',
        color: false,
        title: wx.getStorageSync('cityInfo'),
        nameE: 'city'
      },
      {
        name: '省排名',
        num: '2',
        color: false,
        title: wx.getStorageSync('province'),
        nameE: 'province'
      },
      {
        name: '全国排名',
        num: '1',
        color: false,
        title: '全国',
        nameE: 'country'
      }
    ],
    title: '通州区',
    drankingList: [],
    typeTitle: '1',
    nameE: 'area',
    name: '羽毛球',
    flag: 1,
    img: '',
  },
  onLoad: function () {
    this.setData({
      img: util.API
    })
    
  },

  tap: function (e) {
    this.setData({
      flag: parseInt(e.currentTarget.dataset.num)
    })
    if (parseInt(e.currentTarget.dataset.num) == 1) {
      this.drankingListTwo()
    } else {
      this.drankingList()
    }
  },

  select: function (e) {
    let type = e.currentTarget.dataset.name
    let num = e.currentTarget.dataset.num
    let {
      headerList
    } = this.data
    let headerColor = "headerList[" + parseInt(num - 1) + "].color";
    for (let i in headerList) {
      let headerColorT = "headerList[" + i + "].color";
      this.setData({
        [headerColorT]: false
      })
    }
    this.setData({
      [headerColor]: true,
      typeTitle: num,
      name: type
    })
    if (this.data.flag == 1) {
      this.drankingListTwo()
    } else {
      this.drankingList()
    }
  },
  selectTwo: function (e) {
    let type = e.currentTarget.dataset.name
    let num = e.currentTarget.dataset.index
    let title = e.currentTarget.dataset.title
    let nameE = e.currentTarget.dataset.namee
    let {
      rankingType
    } = this.data
    let headerColor = "rankingType[" + num + "].color";
    for (let i in rankingType) {
      let headerColorT = "rankingType[" + i + "].color";
      this.setData({
        [headerColorT]: false
      })
    }
    this.setData({
      [headerColor]: true,
      title: title,
      nameE: nameE
    })
    if (this.data.flag == 1) {
      this.drankingListTwo()
    } else {
      this.drankingList()
    }
  },

  drankingListTwo: function () {
    let {
      nameE
    } = this.data
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getRivalCurrencyRanking", {
        'type': nameE
      }, "get",
      (res) => {
       
          this.setData({
            drankingList: res.data.data
          })
        

        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },

  drankingList: function () {
    let {
      typeTitle,
      nameE
    } = this.data
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getRanking", {
        'sportid': typeTitle,
        'type': nameE,
        address: wx.getStorageSync('province') + ',' + wx.getStorageSync('cityInfo') + ',' + wx.getStorageSync('area')
      }, "get",
      (res) => {
        this.setData({
          drankingList: res.data.data
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },
  details: function (e) {
    let uuid = e.currentTarget.dataset.uuid
    wx.navigateTo({
      url: '/pages/personal/personal?uuid=' + uuid
    })
  },
  onShow() {
    this.setData({flag:1})
    this.drankingListTwo()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
 

})