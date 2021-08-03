const util = require('../../utils/util.js')

Page({
  data: {
    listSon: [],
    page: 1,
    statusType: 'all',
    activitiesNum: [],
    type:'join',
    img:'',
  },
  onLoad: function () {
    let page = 1
    let statusType = 'all'
    let type = 'join'
    this.setData({
      statusType: 'all',
      type: 'join',
      img:util.API
    })
    this.activitiesNum(type)
    this.common(page, statusType, type)
  },

  common: function (page, statusType, type) {
    util.Request("/api/xingetMyActiveLst", {
        type: type,
        statusType: statusType,
        page: page
      }, "get",
      (res) => {
        let projectDataNow = res.data.data.publicLst
        for (let i in projectDataNow) {
          if(projectDataNow[i].SportMode == '1'&&projectDataNow[i].reserve==1){
            projectDataNow[i].SportModeTwo = '仅预订场馆'
          }else if (projectDataNow[i].SportMode == '1') {
            projectDataNow[i].SportModeTwo = '娱乐活动'
          } else if (projectDataNow[i].SportMode == '2') {
            projectDataNow[i].SportModeTwo = '竞技活动'
          } else if (projectDataNow[i].SportMode == '3') {
            projectDataNow[i].SportModeTwo = '我是陪练 '
          } else if (projectDataNow[i].SportMode == '4') {
            projectDataNow[i].SportModeTwo = '我找陪练 '
          } else if (projectDataNow[i].PaySiteMoneyType == 1) {
            projectDataNow[i].PaySiteMoneyType = 'AA'
          } else if (projectDataNow[i].PaySiteMoneyType == 0) {
            projectDataNow[i].PaySiteMoneyType = '输方买单'
          }
        }
        if (page != 1) {
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
      },
      () => {}
    )
  },
  navList: function (e) {
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
    },
    () => {}
  )

    this.setData({
      statusType: e.currentTarget.dataset.id
    })
    let page = 1
    let statusType = e.currentTarget.dataset.id
    let type = this.data.type
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    this.common(page, statusType, type)
  },
  cancels: function (e) {
    if(e.currentTarget.dataset.type==1){
      let that=this
      wx.showModal({
        title: '提示',
        content: '你确定取消本次活动发布么?',
        success (res) {
          if (res.confirm) {
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
                } = that.data
                that.common(page, statusType, type)
                that.activitiesNum(type)
              }
            },
            () => {
            },
            () => {}
          )
          } else if (res.cancel) {
          }
        }
      })
    }else if(e.currentTarget.dataset.type==2){
      let that=this
      wx.showModal({
        title: '提示',
        content: '你确定取消本次活动报名么?',
        success (res) {
          if (res.confirm) {
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
                } = that.data
                that.common(page, statusType, type)
                that.activitiesNum(type)
              }
            },
            () => {
            },
            () => {}
          )
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },


  lower: function () {
    this.setData({
      page: this.data.page + 1
    })
    let page = this.data.page
    let statusType = this.data.statusType
    let type = this.data.type
    wx.showLoading({
      title: '加载中~',
      mask: true
    })

    this.common(page, statusType, type)


  },
  all: function () {
    let page = 1
    let statusType = 'all'
    let type = this.data.type
    this.setData({
      statusType: 'all'
    })
    wx.showLoading({
      title: '加载中~',
      mask: true
    })

    this.common(page, statusType, type)
  },
  navYe: function (e) {
    let page = 1
    let type = e.currentTarget.dataset.id
    this.setData({
      type: e.currentTarget.dataset.id,
      statusType:'all'
    })
    let statusType = this.data.statusType
    wx.showLoading({
      title: '加载中~',
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
      },
      () => {}
    )

  },
  signin:function(e){
    util.Request("/api/userArrivalSignin", { 'publicUid':e.currentTarget.dataset.id,'lat':wx.getStorageSync('lat'),'lng':wx.getStorageSync('lng')}, "post", 
    (res) => {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 2000,
        mask: true
      })
      let page = this.data.page
      let statusType = this.data.statusType
      let type = this.data.type
      this.common(page, statusType, type)

    },
    () => {  },
    () => {
    }
  )
  },
  //跳转详情
  activities:function(e){
    
    wx.navigateTo({
      url: '/pages/homePage/activities/activities?uuid='+e.currentTarget.dataset.uuid+'&type=1',
    })
  },
  //跳转待评价
  comment:function(e){
    wx.navigateTo({
      url: '/generalization/appraisals/appraisals?id='+e.currentTarget.dataset.id,
    })
  },
  comResult:function(e){
    wx.navigateTo({
      url: '/generalization/yesResults/yesResults?publicuuid='+e.currentTarget.dataset.id,
    })
  },
  isQuit:function(e){
    let that=this
    wx.showModal({
      title: '温馨提示',
      content:  that.data.listSon.SportMode == '我找陪练' || that.data.listSon.SportMode == '我是陪练' ? '您确定提前退出吗？如不是练习方先提前退出，您提前退出后，将被要求补缴补偿金且无法拿到陪练费。' : '您确定提前退出吗?系统将会按照用户提前退出的先后顺序，要求用户补缴补偿金。',
      success (res) {
        if (res.confirm) {
          util.Request("/api/getmessage", { 'uuid':e.currentTarget.dataset.uuid,type:3}, "post", 
          (res) => {
            if(res.data.code==2000){
              let page = that.data.page
              let statusType = that.data.statusType
              let type = that.data.type
              that.common(page, statusType, type)
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }
          },
          () => { },
          () => {
          }
        )
        } else if (res.cancel) {
        }
      }
    })
   
  },
  SignOut:function(e){
    let that=this

    util.Request("/api/userHalfwayHint", { 'uuid':e.currentTarget.dataset.uuid}, "post", 
    (resTwo) => {
      wx.showModal({
        title: '提示',
        content: resTwo.data.data,
        success (res) {
          if (res.confirm) {
            util.Request("/api/userMidwaySignOut", { 'uuid':e.currentTarget.dataset.uuid}, "post", 
            (res) => {
              if(res.data.code==2000){
                let page = that.data.page
                let statusType = that.data.statusType
                let type = that.data.type
                that.common(page, statusType, type)
              }else{
                wx.showToast({
                  title: res.data.msg,
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
          } else if (res.cancel) {
          }
        }
      })
    },
    () => {  },
    () => {
    }
  )

    
   
  },
  navSub:function(){
    wx.switchTab({
      url: '/pages/publishing/publishing'
    })
  },

  onShow:function(){
    let page = 1
    let statusType = 'all'
    let type = 'join'
    this.setData({
      statusType: 'all',
      type: 'join',
      img:util.API
    })
    this.activitiesNum(type)
    this.common(page, statusType, type)
  }
  

})