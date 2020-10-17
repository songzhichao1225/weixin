
const util = require('../../utils/util.js')

Page({
  data: {
    dataIndex:0,
    dataList:'',
    detail:'',
    img:'',
    nav: [{ name: '场馆活动', index: 0 }, { name:'场馆信息', index: 1 }]
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: option.name,
    })
    this.setData({
      img:util.API
    })
    util.Request("/api/getPromoterComplainthdlist", { 'siteUid': option.siteUid, 'isHandle': 0, 'page':1}, "post", 
      (res) => {
        this.setData({ dataList:res.data.data})
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )

    util.request("/api/getSiteInfo", { 'uid': option.siteUid }, "get", 
      (res) => {
        this.setData({detail:res.data.data})
      },
      () => { console.log("失败") },
      () => {
      }
    )

  },
  navSon: function (e) {
    let index = e.currentTarget.dataset.num
    this.setData({ dataIndex: index })
  }
})
