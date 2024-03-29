
const util = require('../../utils/util.js')

Page({
  data: {
    List:[
      { name:'神准时19'},
      { name: '态度好10' },
      { name: '严格遵守比赛结果8' },
      { name: '很热情9' },
      { name: '严重迟到5' },
      { name: '严格遵守比赛规则4' },
      { name: '未到场 3' },
      { name: '严格遵守比赛规则2' },
    ],
    personalData:[],
    flag:false,
    download:false,
    img:'',
  },
  onLoad: function (option) {

    this.setData({
      img:util.API
    })
    wx.showLoading({
      title: '加载中~',
      mask: true
    })

    util.Request("/api/getUserDetailInfo", { 'uuid': option.uuid }, "get", 
      (res) => {
        this.setData({
           personalData:res.data.data,
           flag:true
        })
        wx.hideLoading()
      },
      () => {},
      () => {
      }
    )
  },
  //添加好友
  addFriend:function(e){
    util.Request("/api/addFriends", { 'friendsId': e.currentTarget.dataset.uuid }, "post", 
      (res) => {
        if(res.data.code==2000){
          wx.showToast({
            title: '请求成功，待对方确认',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      () => {  },
      () => {
      }
    )
  },
  //对手果
  counterCoin:function(){
    wx.navigateTo({
      url: '/generalization/counterCoin/counterCoin'
    })
  },
  download: function () {
    this.setData({ download: true })
  },
  closeDowload: function () {
    this.setData({ download: false })
  },
})
