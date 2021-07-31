
const util = require('../../utils/util.js')

Page({
  data: {
    dataIndex:0,
    stadiumList:'',//待处理投诉
    nav: [{ name: '待处理投诉', index: 0 }, { name: '处理中投诉', index: 1 }, { name: '正常', index: 2 }]
  },
  onLoad: function () {
    let num=0
   this.goLond(num)
  },
  goLond:function(num){
    util.Request("/api/getPromoterComplaintcglist", { 'isHandle': num }, "post",
      (res) => {
        this.setData({ stadiumList: res.data.data })
        wx.hideLoading()
      },
      () => {  },
      () => {
      }
    )
  },
  navSon:function(e){
    let index=e.currentTarget.dataset.num
    this.setData({dataIndex:index})
    this.goLond(index)
  },
  stadiumDetail: function (e) {
    wx.navigateTo({
      url: '/generalization/stadiumDetail/stadiumDetail?siteUid=' + e.currentTarget.dataset.siteuid + '&&name=' + e.currentTarget.dataset.name
    })
  },
})
