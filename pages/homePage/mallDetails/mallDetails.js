
const util = require('../../../utils/util.js')

Page({
  data: {
    cost:'',
    name:'',
    imgUrl:[],
    uuid:'',
    img:'',
  },
  onLoad: function (option) {
    this.setData({ cost: option.cost, name: option.name, uuid: option.uuid,img:util.API})
    util.request("/api/getGoodsInfo", { 'uid': option.uuid }, "get", 
      (res) => {
        this.setData({ imgUrl:res.data.data.imgurl})
      },
      () => { console.log("失败") },
      () => {
        console.log("接口调用结束的回调函数")
      }
    )
 


   wx.hideLoading()
  },
  exchange:function(e){
    wx.navigateTo({
      url: '/generalization/exchange/exchange?cost=' + e.currentTarget.dataset.cost+'&uuid='+this.data.uuid
    })
  }
})