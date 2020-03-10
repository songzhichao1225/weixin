//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    dataIndex: null,
    siteIndex: 0,
    sexIndex: 2,
    date: '选择日期',
    time: '选择开始时间',
    timeTwo: '选择结束时间',
    rangeArr: ['不限',1, 2, 3, 4, 5, 6, 7, 9, 10],
    Grade: '最低等级',
    GradeTwo: '最高等级',
    praise: null,
    Activities: null,
  },
  onLoad: function () {
    if (wx.getStorageSync('dataIndex') != '' || wx.getStorageSync('siteIndex') != '' || wx.getStorageSync('sexIndex') != '' || wx.getStorageSync('date') != '' || wx.getStorageSync('time') != '' || wx.getStorageSync('timeTwo') != '' || wx.getStorageSync('Grade') != '' || wx.getStorageSync('GradeTwo') != '' || wx.getStorageSync('praise') != '' || wx.getStorageSync('Activities') != '') {
      this.setData({
        dataIndex: wx.getStorageSync('dataIndex'),
        siteIndex: wx.getStorageSync('siteIndex'),
        sexIndex: wx.getStorageSync('sexIndex'),
        date: wx.getStorageSync('date'),
        time: wx.getStorageSync('time'),
        timeTwo: wx.getStorageSync('timeTwo'),
        Grade: wx.getStorageSync('Grade'),
        GradeTwo: wx.getStorageSync('GradeTwo'),
        praise: wx.getStorageSync('praise'),
        Activities: wx.getStorageSync('Activities'),
      })
    }

    wx.hideLoading()

  },
  //选中运动模式
  modeTap: function (e) {
    let dataIndex = e.currentTarget.dataset.num
    this.setData({
      dataIndex: dataIndex
    })
  },
  //选中场地方式
  siteTap: function (e) {
    let siteIndex = e.currentTarget.dataset.num
    this.setData({
      siteIndex: siteIndex
    })

  },
  //选中性别
  sexTap: function (e) {
    let sexIndex = e.currentTarget.dataset.num
    this.setData({
      sexIndex: sexIndex
    })

  },
  //选择日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //选择开始时间
  bindTimeChange: function (e) {
    if (this.data.date !== '选择日期') {
      this.setData({
        time: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },
  //选择结束时间
  bindTimeTwoChange: function (e) {
    if (this.data.time !== '选择开始时间') {
      this.setData({
        timeTwo: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },
  //最低等级
  Grade: function (e) {
    console.log(e)
      this.setData({
        Grade:e.detail.value
      })
    

  },
  //最高等级
  GradeTwo: function (e) {
    if (this.data.Grade !== '最低等级') {
     
        this.setData({
          GradeTwo:e.detail.value 
        })
      
    } else {
      wx.showToast({
        title: '请选择最低等级',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },
  //好评
  praise: function (e) {
    this.setData({
      praise: e.currentTarget.dataset.num
    })
  },
  //活动
  activities: function (e) {
    this.setData({
      Activities: e.currentTarget.dataset.num
    })
  },
  //重置
  reset: function () {
    this.setData({
      dataIndex: null,
      siteIndex: 0,
      sexIndex: 2,
      date: '选择日期',
      time: '选择开始时间',
      timeTwo: '选择结束时间',
      Grade: '最低等级',
      GradeTwo: '最高等级',
      praise: null,
      Activities: null,
    })
  },
  //确认
  confirm: function () {
    let {
      dataIndex,
      siteIndex,
      sexIndex,
      date,
      time,
      timeTwo,
      Grade,
      GradeTwo,
      praise,
      Activities,
    } = this.data
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      screenData: {
        sportMode: dataIndex,
        payType: siteIndex,
        sex: sexIndex,
        dateNow: date,
        startTime: time,
        endTime: timeTwo,
        mingrade: Grade,
        maxgrade: GradeTwo,
        praise: praise,
        joinCondition: Activities
      }
    })
    wx.setStorageSync('dataIndex', dataIndex)
    wx.setStorageSync('siteIndex', siteIndex)
    wx.setStorageSync('sexIndex', sexIndex)
    wx.setStorageSync('date', date)
    wx.setStorageSync('time', time)
    wx.setStorageSync('timeTwo', timeTwo)
    wx.setStorageSync('Grade', Grade)
    wx.setStorageSync('GradeTwo', GradeTwo)
    wx.setStorageSync('praise', praise)
    wx.setStorageSync('Activities', Activities)
    wx.navigateBack({
      delta: 1
    })
  }

})