 //获取应用实例
 var util = require("../../utils/util.js");
 const app = getApp()


 Page({
   data: {
     hidden: false, //项目选项显隐
     hiddenOne: false,
     sortHid: false, //智能排序
     statusHid: false, //状态
     activity: [{
       name: '全部',
       num: 2
     }, {
       name: '男',
       num: 0
     }, {
       name: '女',
       num: 1
     }],
     sort: [{
         name: '全部',
         selectD: 'all',
         num: 0
       },
       {
         name: '台球',
         selectD: '台球',
         num: 1
       },
       {
         name: '羽毛球',
         selectD: '羽毛球',
         num: 2
       },
       {
         name: '乒乓球',
         selectD: '乒乓球',
         num: 3
       },
       {
         name: '篮球',
         selectD: '篮球',
         num: 4
       },
       {
         name: '足球',
         selectD: '足球',
         num: 5
       },
       {
         name: '排球',
         selectD: '排球',
         num: 6
       },
       {
         name: '网球',
         selectD: '网球',
         num: 7
       },
       {
         name: '高尔夫球',
         selectD: '高尔夫球',
         num: 8
       },
     ],
     statusH: [{
         name: '全部',
         selectD: '0',
         num: 0
       },
       {
         name: '1级',
         selectD: '1级',
         num: 1
       },
       {
         name: '2级',
         selectD: '2级',
         num: 2
       },
       {
         name: '3级',
         selectD: '3级',
         num: 3
       },
       {
         name: '4级',
         selectD: '4级',
         num: 4
       },
       {
         name: '5级',
         selectD: '5级',
         num: 5
       },
       {
         name: '6级',
         selectD: '6级',
         num: 6
       },
       {
         name: '7级',
         selectD: '7级',
         num: 7
       },
       {
         name: '8级',
         selectD: '8级',
         num: 8
       },
       {
         name: '9级',
         selectD: '9级',
         num: 9
       },
       {
         name: '10级',
         selectD: '10级',
         num: 10
       },
     ],
     sportName: 'all',
     level: 0,
     sex: 2,
     sexT:'性别',
     sportT:'运动项目',
     levelT:'等级',
     nearbyData: [],
     page: 1,
     flag: false,
   },

   onLoad: function() {

     wx.showLoading({
       title: '加载中',
       mask: true
     })
     this.nearbyData()
   },
  
   nearbyData: function(show) {
     let parameter = {}
     parameter.mylat = wx.getStorageSync("lat")
     parameter.mylng = wx.getStorageSync("lng")
     parameter.sex = this.data.sex
     parameter.page = this.data.page
     parameter.level = this.data.level
     parameter.sportName = this.data.sportName
     util.request("/api/getMyNearbyLst", parameter, "get",
       (res) => {
         let nData = res.data.data.Lst
         for (let i in nData) {
           if (nData[i].hightName == '高尔夫') {
             nData[i].hightName = 'icon_dj_gef.png';
           } else if (nData[i].hightName == '台球') {
             nData[i].hightName = 'icon_dj_tq.png'
           } else if (nData[i].hightName == '羽毛球') {
             nData[i].hightName = 'icon_dj_ymq.png'
           } else if (nData[i].hightName == '乒乓球') {
             nData[i].hightName = 'icon_dj_ppq.png'
           } else if (nData[i].hightName == '篮球') {
             nData[i].hightName = 'icon_dj_lq.png'
           } else if (nData[i].hightName == '足球') {
             nData[i].hightName = 'icon_dj_zq.png'
           } else if (nData[i].hightName == '排球') {
             nData[i].hightName = 'icon_dj_pq.png'
           } else if (nData[i].hightName == '网球') {
             nData[i].hightName = 'icon_dj_wq.png'
           }
         }

         if (show == true) {
           let mData = [...this.data.nearbyData, ...nData]
           this.setData({
             nearbyData: mData
           })
         } else {
           this.setData({
             nearbyData: nData
           })
         }
         this.setData({
           flag: true
         })
         wx.hideLoading()
         wx.stopPullDownRefresh() //停止下拉刷新
       },
       () => {
         console.log("失败")
       },
       () => {
       }
     )
   },
   //下拉加载
   onPullDownRefresh() {
     wx.showNavigationBarLoading() //显示动画
     this.setData({
       sportName: 'all',
       level: 0,
       sex: 2,
       page: 1
     })
     this.nearbyData()
   },
   //加好友
   joinFriends:function(e){
    util.Request("/api/addFriends", {friendsId:e.currentTarget.dataset.uuid}, "post",
    (res) => {
      if(res.data.code===2000){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'fail',
          duration: 2000
        })
      }
      
      

     
     
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )





   },
   //上拉加载
   lower: function() {

     this.setData({
       page: this.data.page + 1
     })
     wx.showLoading({
       title: '加载中',
       mask: true
     })
     let show = true
     this.nearbyData(show)

   },

   itemSelection: function() {
     if (this.data.hidden == true) {
       this.setData({
         sortHid: false,
         hidden: false,
         hiddenOne: false,
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
   itemSelectionH: function() {
     this.setData({
       hidden: false,
       hiddenOne: false,
       sortHid: false
     })
   },
   sortHid: function() {
     if (this.data.hidden == true) {
       this.setData({
         sortHid: false,
         hidden: false,
         hiddenOne: false,
         statusHid: false,
       })
     } else {
       this.setData({
         sortHid: true,
         hidden: true,
         hiddenOne: false,
         statusHid: false
       })
     }
   },
   statusHid: function() {
     if (this.data.hidden == true) {
       this.setData({
         sortHid: false,
         hidden: false,
         hiddenOne: false
       })
     } else {
       this.setData({
         sortHid: false,
         statusHid: true,
         hidden: true,
         hiddenOne: false
       })
     }
   },
   secondary: function(e) {

     this.setData({
       sex: e.currentTarget.dataset.num,
       sexT: e.currentTarget.dataset.name,
       page: 1
     })
     this.nearbyData()
   },
   sortSe: function(e) {

     this.setData({
       sportName: e.currentTarget.dataset.num,
       sportT: e.currentTarget.dataset.name,
       page: 1
     })
     this.nearbyData()
   },
   statusSe: function(e) {
     this.setData({
       level: e.currentTarget.dataset.num,
       levelT: e.currentTarget.dataset.name,
       page: 1
     })
     this.nearbyData()
   },
   inputBlur: function(e) {
   },
   //跳转搜索伙伴
   inputTap: function() {
     wx.navigateTo({
       url: '/pages/searchPartner/searchPartner'
     })
   },
   //跳转用户详情
   getUserDetailInfo: function(e) {

     if (wx.getStorageSync('token')) {
       wx.navigateTo({
         url: '/generalization/personal/personal?uuid=' + e.currentTarget.dataset.uid
       })
     } else {
       wx.navigateTo({
         url: '/pages/authorization/authorization'
       })
     }


   },

 })