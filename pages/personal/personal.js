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
    dynameicList:[],
    dynameicListLeft: [],
    dynameicListRight:[],
    uuid:'',
    page:1,
    myUUid:'',
  },
  onLoad: function (option) {
    this.setData({
      img: util.API,
      myUUid:option.uuid
    })
    wx.showLoading({
      title: '',
      mask: true
    })

    util.request("/api/getUserDetailInfo", {
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
      () => {
      }
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
      () => {
      }
    )
  },
  //对手币
  counterCoin: function () {
    wx.navigateTo({
      url: '/pages/counterCoin/counterCoin'
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
    }
  },
  list:function(){
    util.Request("/api/getPlayerDynamicList", {
      'page': this.data.page,
      playeruuid: this.data.myUUid
    }, "post",
    (res) => {
      let data=res.data.data
      for(let i in data){
        data[i].index=Number(i)
      }
      let dynameicListLeft=[]
      let dynameicListRight=[]
      for(let i in data){
          if(data[i].index%2==0){
            dynameicListLeft.push(data[i])
          }else{
            dynameicListRight.push(data[i])
          }
      }
      this.setData({dynameicListLeft:dynameicListLeft,dynameicListRight:dynameicListRight,dynameicList:data})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
  },
  thumbsUp:function(e){
    
    for(let i in this.data.dynameicList){
     if( this.data.dynameicList[i].uuid==e.currentTarget.dataset.uuid){
         if(this.data.dynameicList[i].isown==1){
          this.data.dynameicList[i].isown=0
          this.data.dynameicList[i].fabulou=this.data.dynameicList[i].fabulou-1
         }else{
          this.data.dynameicList[i].isown=1
          this.data.dynameicList[i].fabulou=this.data.dynameicList[i].fabulou+1
         }
     }
    }

    let dynameicListLeft=[]
    let dynameicListRight=[]
    for(let i in this.data.dynameicList){
        if(this.data.dynameicList[i].index%2==0){
          dynameicListLeft.push(this.data.dynameicList[i])
        }else{
          dynameicListRight.push(this.data.dynameicList[i])
        }
    }
    this.setData({dynameicListLeft:dynameicListLeft,dynameicListRight:dynameicListRight})

    util.Request("/api/PlayerDynamicGiveTheThumbsUp", {
      'dynamic_id': e.currentTarget.dataset.uuid
    }, "post",
    (res) => {
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
  },
  dynamicDetails:function(e){
    wx.navigateTo({
      url: '/generalization/dynamicDetails/dynamicDetails?uuid='+e.currentTarget.dataset.uuid
    })
  },
  onShow:function(){
    this.list()
  },
  avataBoss:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [e.currentTarget.dataset.src]
    })
  },

 

})