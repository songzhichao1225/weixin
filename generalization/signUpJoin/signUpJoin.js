const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rangeKey:'name',
    title:'',
    send:0,
    multiArray: [[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
    [{name:'全部',id:0},{name:'单打',id:4},{name:'双打',id:5},{name:'双打(3队)',id:20}]],

    multiIndex:[0,0],
    address:'',
    distanceArray:[{name: "全部范围",num: 0},{name: "1km",num: 1},{name: "2km",num: 2},{name: "4km",num: 4},{name: "10km",num: 10}],
    index:0,
    indexTwo:0,
    indexThree:0,
    indexFour:0,
    indexFive:0,
    date:'不限',
    startTime:'不限',
    endTime:'不限',
    recommendedArray:[{name: "距离由近到远",num: 0},{name: "时间由近到远",num: 1},{name: "级别由高到低",num: 2},{name: "级别由低到高",num: 3},{name: "好评优先",num: 4}],
    patternsArray:[{name: "不限",num: 0},{name: "娱乐模式",num: 1},{name: "竞技模式",num: 2},{name: "发布者是陪练",num: 3},{name: "发布者找陪练",num: 4}],
    shoulderedArray:[{name: "不限",num: 0},{name: "AA",num: 1},{name: "输者买单",num: 2}],
    publisherArray:[{name: "不限",num: 2},{name: "男",num: 0},{name: "女",num: 1}],
    showModalStatus: false,
    items: [
      {value: '1', name: '周一'},
      {value: '2', name: '周二'},
      {value: '3', name: '周三'},
      {value: '4', name: '周四'},
      {value: '5', name: '周五'},
      {value: '6', name: '周六'},
      {value: '7', name: '周日'}
    ],
    week:'',
    weekTwo:'不限',
    age:'不限',
    rank: '不限', //级别
    ageArr: [
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    ],
    rankArr: [
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ],
    scoring:0,
    umpire:0,
    activities:0,
    scoringArr:[{name:'不限',id:0},{name:'3分以上',id:1},{name:'3.5分以上',id:2},{name:'4分以上',id:3},{name:'4.5分以上',id:4}],
    umpireArr:[{name:'不限',id:0},{name:'有',id:1},{name:'没有',id:2}],
    activitiesArr:[{name:'可报名运动者',id:1},{name:'可报名裁判',id:1}],
    lat:'',
    lng:''
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.utilST(currentStatu)
  },
  utilST: function(currentStatu){
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(240).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            week:'',
            weekTwo:'不限'
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({address:wx.getStorageSync('address'),lat:wx.getStorageSync('lat'),lng:wx.getStorageSync('lng'),
    city:wx.getStorageSync('cityInfo')
  })
  util.Request("/api/getPreferenceTitlte", {}, "post",
    (res) => {
      this.setData({title:res.data.data})
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
    wx.hideLoading()
  
   
  },
  PickerChange:function(e){
    this.setData({
      multiIndex: e.detail.value
    })
  },
  ColumnChange:function(e){
    if(e.detail.column==0){
    if(e.detail.value==1){
      this.setData({ 
        multiArray:[[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'单打',id:6},{name:'双打',id:7}]]
      })
    }else if(e.detail.value==2){
      this.setData({ 
        multiArray:[[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'中式黑八',id:1},{name:'美式九球',id:2},{name:'斯诺克',id:3}]]
      })
    }else if(e.detail.value==3){
      this.setData({ 
        multiArray:[[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'5V5',id:10},{name:'3V3',id:11},{name:'3V3(3队)',id:21}]]
      })
    }else if(e.detail.value==4){
      this.setData({ 
        multiArray:[[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'11人制',id:13},{name:'8人制',id:14},{name:'7人制',id:15},{name:'5人制',id:16}]]
      })
    }else if(e.detail.value==5){
      this.setData({ 
        multiArray:[[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'6V6',id:12}]]
      })
    }else if(e.detail.value==6){
      this.setData({ 
        multiArray:[[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'单打',id:8},{name:'双打',id:9}]]
      })
    }else{
      this.setData({
        multiArray: [[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7}],
        [{name:'全部',id:0},{name:'单打',id:4},{name:'双打',id:5},{name:'双打(3队)',id:20}]]
      })
    }
  }
    
  },
  
  signUpMap:function(){
    wx.chooseLocation({
      success:(res)=>{
        this.setData({address:res.address,lat:res.latitude,lng:res.longitude})
      },
      complete: (res) => {},
    })
  },

  distance:function(e){
     this.setData({index:e.detail.value})
  },
  Recommended:function(e){
    this.setData({indexTwo:e.detail.value})
  },
  patterns:function(e){
    this.setData({indexThree:e.detail.value})
  },
  shouldered:function(e){
    this.setData({indexFour:e.detail.value})
  },
  publisher:function(e){
    this.setData({indexFive:e.detail.value})
  },
  dateChange:function(e){
    this.setData({date:e.detail.value})
  },
  
  startTimeChange:function(e){
    this.setData({startTime:e.detail.value})
  },
  endTimeChange:function(e){
    this.setData({endTime:e.detail.value})
  },

  checkboxChange:function(e){
    let items=this.data.items
    let arrWeek=[]
    for(let i in e.detail.value){
      arrWeek.push(items[Number(i)].name)
    }
    this.setData({week:e.detail.value.join(),weekTwo:arrWeek.join()})
  },
  cacel:function(){
    this.setData({showModalStatus:false,week:'',weekTwo:'不限'})
  },
  comfire:function(){
    this.setData({showModalStatus:false})
  },

  
  bindPickerAge: function(e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] != 0) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        age: '不限'
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        age: 1 + '-' + e.detail.value[1] + '岁'
      })
    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        age: e.detail.value[0] + '-' + 99 + '岁'
      })
    } else {
      this.setData({
        age: e.detail.value[0] + '-' + e.detail.value[1] + '岁'
      })
    }

  },

  bindPickerRank: function(e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] !== 0) {
      wx.showToast({
        title: '最小级别不能高于最大级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        rank: '不限'
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        rank: 1 + '-' + e.detail.value[1] + '级'
      })

    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        rank: e.detail.value[0] + '-' + 10 + '级'
      })
    } else {
      this.setData({
        rank: e.detail.value[0] + '-' + e.detail.value[1] + '级'
      })
    }
  },
  scoringChange:function(e){
     this.setData({scoring:e.detail.value})
  },

  umpireChange:function(e){
   this.setData({umpire:e.detail.value})
  },
  activitiesChange:function(e){
    this.setData({activities:e.detail.value})
  },

  titleChange:function(e){
    this.setData({title:e.detail.value})
  },
  switch1Change:function(e){
   this.setData({send:e.detail.value==true?1:0})
  },

  comfireBtn:function(){
    let {title,multiArray,multiIndex,lat,lng,address,distanceArray,index,recommendedArray,indexTwo,patternsArray,indexThree,
      shoulderedArray,indexFour,publisherArray,indexFive,startTime,endTime,week,date,age,rank,scoringArr,scoring,activitiesArr,activities,
      umpireArr,umpire,send,city
    }=this.data
    let data={
      prefeuuid:'',
      title:title,
      sportid:multiArray[0][multiIndex[0]].id,
      sporttype:multiArray[1][multiIndex[1]].id,
      lat:lat,
      lng:lng,
      positon:address,
      distance:distanceArray[index].num,
      sort:recommendedArray[indexTwo].num,
      sportmode:patternsArray[indexThree].num,
      bearmode:shoulderedArray[indexFour].num,
      Publishersex:publisherArray[indexFive].num,
      public_start:startTime,
      public_end:endTime,
      week:week,
      public_date:date,
      minAvgAge: age == '不限' ? '0' : parseFloat(age.split('-')[0]),
      maxAvgAge: age == '不限' ? '0' : parseFloat(age.split('-')[1]),
      maxAvgGrade: rank == '不限' ? '0' : parseFloat(rank.split('-')[1]),
      minAvgGrade: rank == '不限' ? '0' : parseFloat(rank.split('-')[0]),
      average:scoringArr[scoring].id,
      activity:activitiesArr[activities].id,
      default:'',
      send:send,
      city:city,
      istherereferee:umpireArr[umpire].id
    }
    util.Request("/api/PreferenceSave", data, "post",
    (res) => {
      wx.navigateBack({
        delta: 1
      })
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
  }

  
  
 

})