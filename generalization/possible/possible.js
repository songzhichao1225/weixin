const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    pageTwo:1,
    publicLst:[],
    enabledTwo:false,
  },

  onLoad: function (options) {
    this.setData({
       img: util.API,
       uuid:options.uuid
     })
     this.ActiveLst()
  },

  ActiveLst:function(showTwo){
    util.Request("/api/getPlayerPublicList", {
      'playeruuid': this.data.uuid,
      "mylat":wx.getStorageSync('lat'),
      "mylng":wx.getStorageSync('lng'),
      "page":this.data.pageTwo
    }, "post",
    (res) => {

      let projectDataNow = res.data.data
      for (let i in projectDataNow) {
        if(projectDataNow[i].SportMode == '1'&&projectDataNow[i].reserve==1){
          projectDataNow[i].SportMode = '仅预订场馆'
        }else if (projectDataNow[i].SportMode == '1') {
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
          projectDataNow[i].PaySiteMoneyType = '输者买单'
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

      this.setData({publicLst:data,enabledTwo:false})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {
    }
  )
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
  activities:function(e){
    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid='+e.currentTarget.dataset.uuid,
    })
  },
 
  
})