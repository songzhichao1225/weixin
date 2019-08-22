
const util = require('../../../utils/util.js')

Page({
  data: {
    cost:'',
    name:'',
    imgUrl:[],
  },
  onLoad: function (option) {
   console.log(option)
   this.setData({cost:option.cost,name:option.name})
    util.request("/api/getGoodsInfo", { 'uid': option.uuid }, "get", 
      (res) => {
        console.log(res)
        this.setData({ imgUrl:res.data.data.imgurl})
      },
      () => { console.log("失败") },
      () => {
        console.log("接口调用结束的回调函数")
      }
    )
 


   wx.hideLoading()
  }
})
