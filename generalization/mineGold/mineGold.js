
const util = require('../../utils/util.js')

Page({
  data: {
    goldMall:[],
    img:'',
    goldList:[],
    page:1,
    coins:0,
    goldType: '1',
  },
  onLoad: function () {
    this.setData({
      img:util.API
    })
    util.Request("/api/getCommonCoins", {}, "get",
      (res) => {
       this.setData({
         coins:res.data.data.coins.toFixed(2)
       })
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )
    this.list()
    wx.hideLoading()
  },
  golDranking:function(){

    wx.navigateTo({
      url: '/generalization/mineGolDrankingTwo/mineGolDrankingTwo'
    })
  },
  
 

 
 
  list(show){
    util.Request("/api/getUserGoldLst", {
      'goldType': 'commonCoins',
      sportType: '',
      page: this.data.page
    }, "get",
    (res) => {
      let data = res.data.data.goldLst
      if (show == true) {
        if (data.length == 0) {
          wx.showToast({
            title: '没有更多了~',
            icon: 'none',
            duration: 2000
          })
        }
        data = [...this.data.goldList, ...data]

      } else {
        data = data
      }
      for (let i in data) {
        if (data[i].GetCoins.indexOf('-') != -1) {
          data[i].color = 0
        } else {
          data[i].color = 1
        }
      }
      this.setData({
        goldList: data,
        enabled: false
      })
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )

  },
  //上拉加载
  tolower: function () {
    this.setData({
      page: this.data.page + 1
    })
    let show = true
    this.list(show)
  },
  refresh() {
    this.setData({
      enabled: true,
      page: 1
    })
    this.list()
  },
 
  goldDetailSon(e) {
    wx.navigateTo({
      url: '/generalization/goldDetailSon/goldDetailSon?uuid=' + e.currentTarget.dataset.uuid + '&flag=' + this.data.goldType+'&sport=羽毛球',
    })
  },
 
})
