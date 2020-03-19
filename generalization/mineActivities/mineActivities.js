const util = require('../../utils/util.js')

Page({
  data: {
    listSon: [],
    page: 0,
    statusType: '',
    activitiesNum: [],
  },
  onLoad: function (option) {
    let page = 0
    let statusType = 'matching'
    let type = 'publish'
    this.setData({
      statusType: 'matching',
      type: 'publish'
    })
    this.activitiesNum(type)
    this.common(page, statusType, type)
  },

  common: function (page, statusType, type) {
    util.Request("/api/getMyActiveLst", {
        type: type,
        statusType: statusType,
        page: page
      }, "get",
      (res) => {
        let projectDataNow = res.data.data.publicLst
        for (let i in projectDataNow) {
          if (projectDataNow[i].SportMode == '1') {
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
        if (page != 0) {
          if (projectDataNow.length === 0) {
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
          this.setData({
            listSon: [...this.data.listSon, ...projectDataNow]
          })
        } else {

          this.setData({
            listSon: projectDataNow
          })
        }

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  navList: function (e) {
    this.setData({
      statusType: e.currentTarget.dataset.id
    })
    let page = 0
    let statusType = e.currentTarget.dataset.id
    let type = this.data.type
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.common(page, statusType, type)
  },
  cancels: function (e) {
    console.log(e.currentTarget.dataset.uuid)
    util.Request("/api/userCancelActivity", {
        'publishcId': e.currentTarget.dataset.uuid
      }, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        if (res.data.code == 2000) {
          let {
            page,
            statusType,
            type
          } = this.data
          this.common(page, statusType, type)
          this.activitiesNum(type)
        }
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },


  lower: function () {
    this.setData({
      page: this.data.page + 1
    })
    let page = this.data.page
    let statusType = this.data.statusType
    let type = this.data.type
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    this.common(page, statusType, type)


  },
  all: function () {
    let page = 0
    let statusType = 'all'
    let type = 'publish'
    this.setData({
      type: 'publish',
      statusType: 'all'
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    this.common(page, statusType, type)
  },
  navYe: function (e) {
    let page = 0
    let type = e.currentTarget.dataset.id
    this.setData({
      type: e.currentTarget.dataset.id
    })
    let statusType = 'matching'
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.activitiesNum(type)
    this.common(page, statusType, type)
  },
  activitiesNum: function (type) {
    util.Request("/api/getActiveCount", {
        'type': type
      }, "get",
      (res) => {
        this.setData({
          activitiesNum: res.data.data
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },
  isQuit:function(){
    
  },

})