const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportsList: [],
    indexSport: 0,
    flag: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flag: options.flag
    })
    util.request("/api/getAllSportLst", {}, "get",
      (res) => {
        let obj = res.data.data.slice(0, 7)
        obj[4].sportType=obj[4].sportType.slice(0,5)
        if (options.flag === '1') {
          obj[3].sportType = obj[3].sportType.slice(0, 3)
          obj[1].sportType = obj[1].sportType.slice(0, 2)
        }

        if(options.flag === '6'){
          obj[0].sportType = obj[0].sportType.slice(0, 2)
          obj[3].sportType = obj[3].sportType.slice(0, 2)
          obj[1].sportType = obj[1].sportType.slice(0, 2)
        }

        if(options.flag === '3'){
          obj[1].sportType = obj[1].sportType.slice(0, 2)
          obj[3].sportType = obj[3].sportType.slice(0, 3)
        }


        if (options.flag == '4' || options.flag == '5') {
          let arrt = []
          for (let i in obj) {
            if (obj[i].id != 4 && obj[i].id != 5 && obj[i].id != 6) {

              if (obj[i].id == 1) {
                obj[i].sportType = obj[i].sportType.slice(0, 1)
              } else if (obj[i].id == 2) {
                obj[i].sportType = obj[i].sportType.slice(0, 1)
              } else if (obj[i].id == 7) {
                obj[i].sportType = obj[i].sportType.slice(0, 1)
              }
              arrt.push(obj[i])
            }
          }
          obj = arrt
        }
        this.setData({
          sportsList: obj
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )



  },
  select: function (e) {
    this.setData({
      indexSport: e.currentTarget.dataset.sporttype
    })
    let data = e.currentTarget.dataset
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (this.data.flag == 1) {
      wx.setStorage({
        data: data.id,
        key: 'sportIdF',
      })
      wx.setStorage({
        data: data.sporttype,
        key: 'sportTypeF',
      })
      wx.setStorage({
        data: data.name,
        key: 'sportNameF',
      })
      wx.setStorage({
        data: data.nametwo,
        key: 'sportypeNameF',
      })

      wx.removeStorage({
        key: 'bookin'
      })
      wx.removeStorage({
        key: 'mode'
      })
      wx.removeStorage({
        key: 'siteid'
      })
      wx.setStorage({
        data: '不限',
        key: 'sexF',
      })
      wx.setStorage({
        data: '不限',
        key: 'ageF',
      })
      wx.setStorage({
        data: '不限',
        key: 'rankF',
      })


      prevPage.setData({
        sportsList: true
      })

      wx.navigateBack({
        delta: 1
      })
    } else if (this.data.flag == 2) {

      wx.setStorage({
        key: 'sportIdFTwo',
        data: data.id,
      })
      wx.setStorage({
        key: 'sportTypeFTwo',
        data: data.sporttype,
      })
      wx.setStorage({
        key: 'sportNameFTwo',
        data: data.name,
      })
      wx.setStorage({
        key: 'sportypeNameFTwo',
        data: data.nametwo,
      })
      wx.removeStorage({
        key: 'bookinTwo'
      })
      wx.removeStorage({
        key: 'siteidTwo'
      })

      wx.navigateBack({
        delta: 1
      })
    } else if (this.data.flag == 3) {
      wx.setStorage({
        key: 'sportIdFThree',
        data: data.id,
      })
      wx.setStorage({
        key: 'sportTypeFThree',
        data: data.sporttype,
      })
      wx.setStorage({
        key: 'sportNameFThree',
        data: data.name,
      })
      wx.setStorage({
        key: 'sportypeNameFThree',
        data: data.nametwo,
      })
      wx.removeStorage({
        key: 'bookinThree'
      })
      wx.removeStorage({
        key: 'siteidThree'
      })

      wx.navigateBack({
        delta: 1
      })
    } else if (this.data.flag == 4) {
      wx.setStorage({
        key: 'sportIdFFour',
        data: data.id,
      })
      wx.setStorage({
        key: 'sportTypeFFour',
        data: data.sporttype,
      })
      wx.setStorage({
        key: 'sportNameFFour',
        data: data.name,
      })
      wx.setStorage({
        key: 'sportypeNameFFour',
        data: data.nametwo,
      })
      wx.removeStorage({
        key: 'bookinFour'
      })
      wx.removeStorage({
        key: 'siteidFour'
      })

      wx.navigateBack({
        delta: 1
      })
    } else if (this.data.flag == 5) {
      wx.setStorage({
        key: 'sportIdFFive',
        data: data.id,
      })
      wx.setStorage({
        key: 'sportTypeFFive',
        data: data.sporttype,
      })
      wx.setStorage({
        key: 'sportNameFFive',
        data: data.name,
      })
      wx.setStorage({
        key: 'sportypeNameFFive',
        data: data.nametwo,
      })
      wx.removeStorage({
        key: 'bookinFive'
      })
      wx.removeStorage({
        key: 'siteidFive'
      })

      wx.navigateBack({
        delta: 1
      })
    }else if (this.data.flag == 6) {
      wx.setStorage({
        key: 'sportIdFSix',
        data: data.id,
      })
      wx.setStorage({
        key: 'sportTypeFSix',
        data: data.sporttype,
      })
      wx.setStorage({
        key: 'sportNameFSix',
        data: data.name,
      })
      wx.setStorage({
        key: 'sportypeNameFSix',
        data: data.nametwo,
      })
      wx.removeStorage({
        key: 'bookinSix'
      })
      wx.removeStorage({
        key: 'siteidSix'
      })

      wx.navigateBack({
        delta: 1
      })
    }



  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})