 //获取应用实例
 var util = require("../../utils/util.js");
 const app = getApp()


 Page({
   data: {
     arraySex: [{
       name: '全部',
       id: 2
     }, {
       name: '男',
       id: 0
     }, {
       name: '女',
       id: 1
     }],
     arraySport: [{
       name: '羽毛球',
       id: 1
     }, {
       name: '乒乓球',
       id: 2
     }, {
       name: '台球',
       id: 3
     }, {
       name: '篮球',
       id: 4
     }, {
       name: '足球',
       id: 5
     }, {
       name: '排球',
       id: 6
     }, {
       name: '网球',
       id: 7
     }, {
       name: '高尔夫',
       id: 8
     }],
     arrayDistance: [{
       name: "全部",
       id: 0
     }, {
       name: "1km",
       id: 1
     }, {
       name: "2km",
       id: 2
     }, {
       name: "4km",
       id: 4
     }, {
       name: "10km",
       id: 10
     }],
     sex: '',
     Sport: '',
     Distance: '',
     dynameicListLeft: [],
     dynameicListRight: [],
     dynameicList: [],
     img: '',
     page: 1,
     sex: 0,
     Sport: 0,
     Distance: 0,
     show: false,
     enabled: true,
     type: 1,
     pageTwo: 1,
     sexTwo: 0,
     SportTwo: 0,
     DistanceTwo: 0,
     showTwo: false,
     bigShotList: [],
   },



   list(show) {
     util.Request("/api/getNearbyOpponentList", {
         page: this.data.page,
         sex: this.data.arraySex[Number(this.data.sex)].id,
         sportid: this.data.arraySport[Number(this.data.Sport)].id,
         distance: this.data.arrayDistance[Number(this.data.Distance)].id,
         type: this.data.type,
         mylat: wx.getStorageSync('lat'),
         mylng: wx.getStorageSync('lng')
       }, "post",
       (res) => {


         if (show == true) {
           var data = [...this.data.dynameicList, ...res.data.data]
           if (res.data.data.length == 0) {
             wx.showToast({
               title: '没有更多了~',
               icon: 'none',
               duration: 2000
             })
           }

         } else {
           var data = res.data.data
         }


         for (let i in data) {
           data[i].index = Number(i)
         }
         let dynameicListLeft = []
         let dynameicListRight = []
         for (let i in data) {
           if (data[i].index % 2 == 0) {
             dynameicListLeft.push(data[i])
           } else {
             dynameicListRight.push(data[i])
           }
         }
         this.setData({
           dynameicListLeft: dynameicListLeft,
           dynameicListRight: dynameicListRight,
           dynameicList: data,
           enabled: false,
         })

         wx.hideLoading()
       },
       () => {},
       () => {

       }
     )
   },



   onLoad: function () {
     this.setData({
       img: util.API
     })
     this.list()

   },
   bindSex: function (e) {
     this.setData({
       sex: e.detail.value
     })
     this.list()
   },
   bindSport: function (e) {
     this.setData({
       Sport: e.detail.value
     })
     this.list()
   },
   bindDistance: function (e) {
     this.setData({
       Distance: e.detail.value
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
   refresh() {
     this.setData({
       enabled: true,
       page: 1
     })
     this.list()

   },
   //点赞
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
   //动态详情
   dynamicDetails: function (e) {
     wx.navigateTo({
       url: '/generalization/dynamicDetails/dynamicDetails?uuid=' + e.currentTarget.dataset.uuid
     })
   },
   indexOne(e) {
     this.setData({
       type: e.currentTarget.dataset.index
     })
     if (e.currentTarget.dataset.index == 1) {
       this.setData({
         page: 1,
         sex: 0,
         Sport: 0,
         Distance: 0,
       })
       this.list()
     } else {
       this.setData({
         pageTwo: 1,
         sexTwo: 0,
         SportTwo: 0,
         DistanceTwo: 0,
       })
       this.bigShotList()
     }
   },

   bindSexTwo: function (e) {
     this.setData({
       sexTwo: e.detail.value
     })
   },
   bindSportTwo: function (e) {
     this.setData({
       SportTwo: e.detail.value
     })
   },
   bindDistanceTwo: function (e) {
     this.setData({
       DistanceTwo: e.detail.value
     })
   },

   bigShotList(showTwo) {
     util.Request("/api/getNearbyOpponentList", {
         page: this.data.pageTwo,
         sex: this.data.arraySex[Number(this.data.sexTwo)].id,
         sportid: this.data.arraySport[Number(this.data.SportTwo)].id,
         distance: this.data.arrayDistance[Number(this.data.DistanceTwo)].id,
         type: this.data.type,
         mylat: wx.getStorageSync('lat'),
         mylng: wx.getStorageSync('lng')
       }, "post",
       (res) => {


         if (showTwo == true) {
           var data = [...this.data.bigShotList, ...res.data.data]
           if (res.data.data.length == 0) {
             wx.showToast({
               title: '没有更多了~',
               icon: 'none',
               duration: 2000
             })
           }
         } else {
           var data = res.data.data
         }
         this.setData({
           bigShotList: data,
           enabledTwo: false
         })


         wx.hideLoading()
       },
       () => {},
       () => {

       }
     )
   },
   //上拉加载
   tolowerTwo: function () {
     this.setData({
       pageTwo: this.data.pageTwo + 1
     })
     let showTwo = true
     this.bigShotList(showTwo)
   },
   refreshTwo() {
     this.setData({
       enabledTwo: true,
       pageTwo: 1
     })
     this.bigShotList()
   },
   peopleDetails(e) {
     if (wx.getStorageSync('token')) {
       wx.navigateTo({
         url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uuid
       })
     } else {
       wx.navigateTo({
         url: '/pages/authorization/authorization'
       })
     }
   },
   possible(e) {
     if (e.currentTarget.dataset.num == 0) {
       wx.showToast({
         title: '暂时没有可参与活动~',
         icon: 'none',
         duration: 2000
       })
     } else {
       wx.navigateTo({
         url: '/generalization/possible/possible?uuid=' + e.currentTarget.dataset.uuid
       })
     }

   }

 })