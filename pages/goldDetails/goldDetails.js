//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    goldList: [],
    sport: [{
      name: '羽毛球',
      num: 1
    }, {
      name: '乒乓球',
      num: 2
    }, {
      name: '台球',
      num: 3
    }, {
      name: '篮球',
      num: 4
    }, {
      name: '足球',
      num: 5
    }, {
      name: '排球',
      num: 6
    }, {
      name: '网球',
      num: 7
    }],
    flag: '',
    indexed: 0,
    show: false,
    enabled: true,
    page: 1,
    goldType:''


  },
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    if(option.goldType==1){
      this.setData({
        flag: 'commonCoins'
      })
      setTimeout(()=>{
        util.Request("/api/getUserGoldLst", {
          'goldType': this.data.flag,
          page: 2
        }, "get",
        (res) => {
          let data = res.data.data.goldLst
          
          this.setData({
            goldList: [...this.data.goldList,...data],
            page:2
          })
          wx.hideLoading()
        },
        () => {
        },
        () => {}
      )
      },300)
    }else{
      this.setData({
        flag: 'techCoins'
      })
    }
    this.setData({goldType:option.goldType})
    this.list()
  },

  list(show) {
    if (this.data.flag == 'techCoins') {
      util.Request("/api/getUserGoldLst", {
          'goldType': this.data.flag,
          sportType: this.data.sport[this.data.indexed].name,
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
        },
        () => {}
      )
    } else {
      util.Request("/api/getUserGoldLst", {
          'goldType': this.data.flag,
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
        },
        () => {}
      )

      



    }

  },
  sonList(e) {
    this.setData({
      indexed: e.currentTarget.dataset.index - 1
    })
    this.list()
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
      url: '/generalization/goldDetailSon/goldDetailSon?uuid=' + e.currentTarget.dataset.uuid + '&flag=' + this.data.goldType+'&sport='+this.data.sport[this.data.indexed].name,
    })

  },
})