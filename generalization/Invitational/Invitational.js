const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getInviteFriends: [],
    sportid: '',
    teamSex: '',
    minlevel: '',
    maxlevel: '',
    team: '',
    maxage:70,
    minage:10,
    page: 1,
    current: 0,
    index: 0,
    pageTwo:1,
    pageThree:0,
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sportid: options.sportid,
      teamSex: options.sex,
      minlevel: options.rankMin,
      maxlevel: options.rankMax,
      team: options.team,
      page: 1, 
      maxage:70,
      minage:10,
      img:util.API,
    })

    let obj = {
      city: wx.getStorageSync('cityInfo'),
      area: wx.getStorageSync('area'),
      mylat: wx.getStorageSync('lat'),
      mylng: wx.getStorageSync('lng'),
      type: 'myfriend',
      sportid: options.sportid,
      teamSex: options.sex,
      minlevel: options.rankMin,
      maxlevel: options.rankMax,
      team: options.team,
      maxage:70,
      minage:10,
      page: this.data.page
    }

    this.requ(obj)
  },

  //接口函数
  requ: function (obj) {
    let {sportid}=this.data
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getInviteFriends", obj, "get",
      (res) => {
        let nData = res.data.data.Lst
        for (let i in nData) {
          if (sportid == '8') {
            nData[i].userLevelNum = 'icon_dj_gef.png';
          } else if (sportid == '3') {
            nData[i].userLevelNum = 'icon_dj_tq.png'
          } else if (sportid == '1') {
            nData[i].userLevelNum = 'icon_dj_ymq.png'
          } else if (sportid == '2') {
            nData[i].userLevelNum = 'icon_dj_ppq.png'
          } else if (sportid == '4') {
            nData[i].userLevelNum = 'icon_dj_lq.png'
          } else if (sportid == '5') {
            nData[i].userLevelNum = 'icon_dj_zq.png'
          } else if (sportid == '6') {
            nData[i].userLevelNum = 'icon_dj_pq.png'
          } else if (sportid == '7') {
            nData[i].userLevelNum = 'icon_dj_wq.png'
          }
        }
        this.setData({
          getInviteFriends: res.data.data.Lst
        })

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  //上拉加载
  kol:function(obj){
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    
    util.Request("/api/getInviteFriends", obj, "get",
      (res) => {
        let nData = res.data.data.Lst
        for (let i in nData) {
          if (nData[i].userLevelNum == '8') {
            nData[i].userLevelNum = 'icon_dj_gef.png';
          } else if (nData[i].userLevelNum == '3') {
            nData[i].userLevelNum = 'icon_dj_tq.png'
          } else if (nData[i].userLevelNum == '1') {
            nData[i].userLevelNum = 'icon_dj_ymq.png'
          } else if (nData[i].userLevelNum == '2') {
            nData[i].userLevelNum = 'icon_dj_ppq.png'
          } else if (nData[i].userLevelNum == '4') {
            nData[i].userLevelNum = 'icon_dj_lq.png'
          } else if (nData[i].userLevelNum == '5') {
            nData[i].userLevelNum = 'icon_dj_zq.png'
          } else if (nData[i].userLevelNum == '6') {
            nData[i].userLevelNum = 'icon_dj_pq.png'
          } else if (nData[i].userLevelNum == '7') {
            nData[i].userLevelNum = 'icon_dj_wq.png'
          }
        }
        this.setData({
          getInviteFriends: [...this.data.getInviteFriends, ...res.data.data.Lst]
        })

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },

  ltolower: function () {

    if(this.data.current==0){
      this.setData({
        page: this.data.page + 1
      })
      let obj = {
        city: wx.getStorageSync('cityInfo'),
        area: '',
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        type: 'myfriend',
        sportid: this.data.sportid,
        teamSex: this.data.teamSex,
        minlevel: this.data.minlevel,
        maxlevel: this.data.maxlevel,
        team: this.data.team,
        maxage:this.data.maxage,
        minage:this.data.minage,
        page: this.data.page
      }
      this.kol(obj)
    }else  if(this.data.current==1){
      this.setData({
        pageTwo: this.data.pageTwo + 1
      })
      let obj = {
        city: wx.getStorageSync('cityInfo'),
        area: '',
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        type: 'mynearby',
        sportid: this.data.sportid,
        teamSex: this.data.teamSex,
        minlevel: this.data.minlevel,
        maxlevel: this.data.maxlevel,
        team: this.data.team,
        maxage:this.data.maxage,
        minage:this.data.minage,
        page: this.data.pageTwo
      }
      this.kol(obj)
    }else  if(this.data.current==2){
      this.setData({
        pageThree: this.data.pageThree + 1
      })
      let obj = {
        city: wx.getStorageSync('cityInfo'),
        area: '',
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        type: 'mynearby',
        sportid: this.data.sportid,
        teamSex: this.data.teamSex,
        minlevel: this.data.minlevel,
        maxlevel: this.data.maxlevel,
        team: this.data.team,
        maxage:this.data.maxage,
        minage:this.data.minage,
        page: this.data.pageThree
      }
      this.kol(obj)
    }
   
   



  },
  swiper: function (e) {

    
    if (e.detail.current == 0) {
      let obj = {
        city: wx.getStorageSync('cityInfo'),
        area: '',
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        type: 'myfriend',
        sportid: this.data.sportid,
        teamSex: this.data.teamSex,
        minlevel: this.data.minlevel,
        maxlevel: this.data.maxlevel,
        team: this.data.team,
        maxage:this.data.maxage,
        minage:this.data.minage,
        page: this.data.page
      }
      this.requ(obj)
     
    }else if(e.detail.current==1){
      let obj = {
        city: wx.getStorageSync('cityInfo'),
        area: '',
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        type: 'mynearby',
        sportid: this.data.sportid,
        teamSex: this.data.teamSex,
        minlevel: this.data.minlevel,
        maxlevel: this.data.maxlevel,
        team: this.data.team,
        maxage:this.data.maxage,
        minage:this.data.minage,
        page: this.data.page
      }
      this.requ(obj)
    }else if(e.detail.current==2){
      let obj = {
        city: wx.getStorageSync('cityInfo'),
        area: '',
        mylat: wx.getStorageSync('lat'),
        mylng: wx.getStorageSync('lng'),
        type: 'myfollow',
        sportid: this.data.sportid,
        teamSex: this.data.teamSex,
        minlevel: this.data.minlevel,
        maxlevel: this.data.maxlevel,
        team: this.data.team,
        page: this.data.page
      }
      this.requ(obj)
    }
    this.setData({
      current: e.detail.current
    })
  },

  navSon: function (e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },
  //跳转用户详情
  getUserDetailInfoTwo: function (e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uid
      })
    } 
  },

  getUserDetailInfo:function(e){
  var pages = getCurrentPages(); // 获取页面栈
  var prevPage = pages[pages.length - 2]; // 上一个页面
  prevPage.setData({
    memberUid: e.currentTarget.dataset.uid
  })
  wx.navigateBack({
    delta: 1
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})