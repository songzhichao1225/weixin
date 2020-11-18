
const util = require('../../utils/util.js')

Page({
  data: {
    timeEnd:'',
    pickerOne:'',
    pickerTwo:'',
    page:1,
    orderList:[],
    money:0
  },
  onLoad: function (option) {
    this.setData({money:option.money})
    let timer=Date.parse(new Date())
    function timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      return Y + M + D ;
    }
    timestampToTime(timer);
    this.setData({ timeEnd: timestampToTime(timer), pickerOne: timestampToTime(timer), pickerTwo: timestampToTime(timer)})
    let start = timestampToTime(timer)
    let end = timestampToTime(timer)
    let {page}=this.data
    this.goLond(page,start,end)
  },

  goLond:function(page,start,end,mooe){
    wx.showLoading({
      title: '',
      mask: true
    })
    util.Request("/api/getPromoterOrder", {'page':page,'start':start,'end':end}, "post",
      (res) => {
        if (mooe==true){
           let listArr=[...this.data.orderList,...res.data.data]
          this.setData({ orderList: listArr})
          wx.hideLoading()
          if (res.data.data.length==0){
            wx.showToast({
              title: '没有更多订单',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        }else{
          this.setData({ orderList: res.data.data })
          wx.hideLoading()
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '没有更多订单',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        }
       
      },
      () => { console.log("失败") },
      () => {
      }
    )
  },
  pickerOne:function(e){
    let { pickerTwo}=this.data
   this.setData({pickerOne:e.detail.value})
    let start = e.detail.value
    let end = pickerTwo
    let page = 1
    this.goLond(page, start, end)
  },
  pickerTwo:function(e){
    let { pickerOne} = this.data
    this.setData({ pickerTwo: e.detail.value })
    let start = pickerOne
    let end = e.detail.value
    let page=1
    this.goLond(page, start, end)
  },
  lower:function(){
    let { pickerTwo, pickerOne, page } = this.data
    let start = pickerOne
    let end = pickerTwo
    let pages = page+1
    this.setData({page:pages})
    let mooe=true
    this.goLond(pages, start, end, mooe)
  },
})
