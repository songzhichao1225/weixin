const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldNum: 0,
    goldNumMoney: 0,
    date: '',
    moneyAll: 0,
    moneyTwo: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中~',
    })
    util.Request("/api/getCommonCoins", {}, "get",
      (res) => {
        let p = new Date()
        this.setData({
          goldNum: res.data.data.coins.toFixed(2),
          goldNumMoney: Math.trunc(res.data.data.coins / 10),
          date: p.getFullYear() + 2 + '-' + Number(p.getMonth() + 1) + '-' + p.getDate()
        })

        util.Request("/api/ExchangeOfOffsetRoll", {}, "post",
          (res) => {

            for (let i in res.data.data) {
              res.data.data[i].num = 0
            }
            this.setData({
              list: res.data.data
            })
            wx.hideLoading()

          },
          () => {
            console.log("失败")
          },
          () => {}
        )

      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },
  joinMoney(e) {
    let moneysmall = e.currentTarget.dataset.moneysmall
    let index = e.currentTarget.dataset.index
    if (Number(this.data.moneyAll) + Number(moneysmall) > Number(this.data.goldNumMoney)) {
      wx.showToast({
        title: '对手果不足',
        icon: 'none',
        duration: 2000
      })
    } else {
      let k = "list[" + index + "].num"
      this.setData({
        moneyAll: (Number(this.data.moneyAll) + Number(moneysmall)).toFixed(2),
        moneyTwo: (Number(this.data.moneyTwo) + Number(moneysmall)* 10).toFixed(2),
        [k]: this.data.list[index].num + 1
      })
    }
  },

  subtracts(e) {
    let moneysmall = e.currentTarget.dataset.moneysmall
    let index = e.currentTarget.dataset.index
    if (this.data.list[index].num > 0) {
      let k = "list[" + index + "].num"
      this.setData({
        moneyAll: (this.data.moneyAll - moneysmall).toFixed(2),
        moneyTwo: (Number(this.data.moneyTwo) - Number(moneysmall) * 10).toFixed(2),
        [k]: this.data.list[index].num - 1
      })
    }
  },
  bindComfir: function () {
    let list = this.data.list
    let arrT = []
    for (let i in list) {
      if (list[i].num != 0) {
        arrT.push(list[i].reduce.toFixed(1) + '-' + list[i].num)
      }
    }
    util.Request("/api/CounterCurrencyExchangeVoucher", {volume:arrT.join()}, "post",
    (res) => {
       if(res.data.code==2000){
        wx.navigateBack({
          delta: 1
        })
       }

     wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      })
      wx.hideLoading()
      
    },
    () => {
      console.log("失败")
    },
    () => {}
  )

  },
  clearOut(e){
    let moneysmall=e.currentTarget.dataset.moneysmall
    let index=e.currentTarget.dataset.index
    if(this.data.list[index].num>0){
      let k="list["+index+"].num"
      this.setData({moneyAll:(this.data.moneyAll-moneysmall*this.data.list[index].num).toFixed(2),moneyTwo:(Number(this.data.moneyTwo)-Number(moneysmall)*10*this.data.list[index].num).toFixed(2),[k]:0})
    }
  },

})