
const util = require('../../utils/util.js')

Page({
  data: {
    dataList:'',
    pages:1,
    img:''
  },
  onLoad: function () {
    this.setData({
      img:util.API
    })
    let page=1
    let orderId=0
    this.goLoad(orderId,page)
  },
  goLoad: function (orderId,page){
    util.Request("/api/getPromoterComplainthdlist", { page: page }, "post",
      (res) => {
        if(res.data.data.length!=0){
          let mData = [...this.data.dataList, ...res.data.data]
          this.setData({ dataList: mData, pages: page })
          wx.hideLoading()
        }
      },
      () => { },
      () => { }
    )
  },
  lower:function(){
    let {pages}=this.data
    let page=pages+1
    let orderId = 0
    this.goLoad(orderId,page)
  },
  details:function(e){
    wx.navigateTo({
      url: '/generalization/activities/activities?uuid=' + e.currentTarget.dataset.uuid
    })
  },
})
