
const util = require('../../utils/util.js')

Page({
  data: {
    clearList:'',
    pages:1,
  },
  onLoad: function () {
    let page=1
    this.goleloand(page)
  },
  goleloand:function(page,type){
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.request("/api/getNearbyvenues", { 'page': page, 'limit': 10, 'mylat': wx.getStorageSync('lat'), 'mylng': wx.getStorageSync('lng') }, "post",
      (res) => {
        if (type = 2&&res.data.data.length){
          let mData = [...this.data.clearList, ...res.data.data]
          this.setData({ clearList: mData, pages: page})
        }else{
          this.setData({ clearList: res.data.data, pages: page })
        }
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //显示动画
    let page=1
    this.goleloand(page)
  },
  onReachBottom:function(){
    let {pages}=this.data
    let page=pages+1
    let type=2
    this.goleloand(page,type)
  },
  stadiumDetail: function (e) {
    wx.navigateTo({
      url: '/generalization/stadiumDetail/stadiumDetail?siteUid=' + e.currentTarget.dataset.siteuid + '&&name=' + e.currentTarget.dataset.name
    }) 
  },
})
