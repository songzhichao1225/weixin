//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    page:1,
    searchData:[],
    flag:false,
    img:'',
  },
  onLoad: function () {
    wx.hideLoading()
    this.setData({
      img:util.API
    })
  },
  inputBlur:function(e){
    let sData={}
    sData.term=e.detail.value
    sData.lat=wx.getStorageSync("lat")
    sData.lng = wx.getStorageSync("lng")
    sData.page=this.data.page
    wx.showLoading({
      title: '',
      mask: true
    })
    util.request("/api/searchUser", sData, "get",
      (res) => {
        let nData = res.data.data.Lst
        for (let i in nData) {
          if (nData[i].hightName == '高尔夫') {
            nData[i].hightName = 'icon_dj_gef@3x.png';
          } else if (nData[i].hightName == '台球') {
            nData[i].hightName = 'icon_dj_tq@3x.png'
          } else if (nData[i].hightName == '羽毛球') {
            nData[i].hightName = 'icon_dj_ymq@3x.png'
          } else if (nData[i].hightName == '乒乓球') {
            nData[i].hightName = 'icon_dj_ppq@3x.png'
          } else if (nData[i].hightName == '篮球') {
            nData[i].hightName = 'icon_dj_lq@3x.png'
          } else if (nData[i].hightName == '足球') {
            nData[i].hightName = 'icon_dj_zq@3x.png'
          } else if (nData[i].hightName == '排球') {
            nData[i].hightName = 'icon_dj_pq@3x.png'
          } else if (nData[i].hightName == '网球') {
            nData[i].hightName = 'icon_dj_wq@3x.png'
          }
        }
    
        this.setData({ searchData: nData })
        this.setData({ flag: true })
        wx.hideLoading()
        wx.stopPullDownRefresh()//停止下拉刷新
      },
      () => { console.log("失败") },
      () => {
        console.log("接口调用结束的回调函数")
      }
    )
  },

  //跳转用户详情
  getUserDetailInfo: function (e) {
      wx.navigateTo({
        url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uid
      })
  },
})
