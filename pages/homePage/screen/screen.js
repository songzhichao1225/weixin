//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    dataIndex: 0,
    siteIndex: 0,
    sexIndex: 2,
    date: '选择日期',
    time: '选择开始时间',
    timeTwo: '选择结束时间',
    rangeArr: ['不限', 1, 2, 3, 4, 5, 6, 7, 9, 10,11,12,13,14,15],
    timeArr:['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
    Grade: '最低等级',
    GradeTwo: '最高等级',
    praise: null,
    Activities: null,
    age: [], //年龄
    ageNum: 0,
    ageTwo:[],//最大年龄
    ageNumTwo:0,
    umpireIndex:0,
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
    let age = ['不限']
    for (let i = 1; i < 90; i++) {
      age.push(i+9)
    }
    this.setData({
      age: age
    })

    wx.hideLoading()

  },
  //选中运动模式
  modeTap: function (e) {
    let dataIndex = e.currentTarget.dataset.num
    if(this.data.dataIndex==dataIndex){
      this.setData({
        dataIndex: 0
      })
    }else{
      this.setData({
        dataIndex: dataIndex
      })
    }
    
  },

   //选中是否有裁判
   umpire: function (e) {
    let umpireIndex = e.currentTarget.dataset.num
    if(this.data.umpireIndex==umpireIndex){
      this.setData({
        umpireIndex: 0
      })
    }else{
      this.setData({
        umpireIndex: umpireIndex
      })
    }
  },
  //选中场地方式
  siteTap: function (e) {
    let siteIndex = e.currentTarget.dataset.num
    if(this.data.siteIndex==siteIndex){
      this.setData({
        siteIndex: 0
      })      
    }else{
      this.setData({
        siteIndex: siteIndex
      })
    }

  },
  //选中性别
  sexTap: function (e) {
    let sexIndex = e.currentTarget.dataset.num
    if(this.data.sexIndex==sexIndex){
      this.setData({
        sexIndex: 2
      })
    }else{
      this.setData({
        sexIndex: sexIndex
      })
    }

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
    this.setData({
      Grade: e.detail.value
    })


  },
  //最高等级
  GradeTwo: function (e) {
    if (this.data.Grade !== '最低等级') {

      this.setData({
        GradeTwo: e.detail.value
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
  //最低年龄
  age: function (e) {
    this.setData({
      ageNum: Number(e.detail.value)+9
    })
    let ageTwo=['不限']
    for(let i=1;i<Number(100-this.data.ageNum);i++){
      ageTwo.push(Number(i)+Number(this.data.ageNum))
    }
    this.setData({
      ageTwo:ageTwo
    })
  },
  //最高年龄
  ageTwo: function (e) {
    this.setData({
      ageNumTwo: Number(e.detail.value)+9
    })
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
      dataIndex: 0,
      siteIndex: 0,
      sexIndex: 2,
      date: '选择日期',
      time: '选择开始时间',
      timeTwo: '选择结束时间',
      Grade: '最低等级',
      GradeTwo: '最高等级',
      praise: null,
      Activities: null,
      umpireIndex:0,
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
      ageNum,
      ageNumTwo,
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
        joinCondition: Activities,
        Agemin:ageNum,
        Agemax:ageNumTwo
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
    wx.setStorageSync('Agemin', ageNum)
    wx.setStorageSync('Agemax', ageNumTwo)
    wx.navigateBack({
      delta: 1
    })
  }

})