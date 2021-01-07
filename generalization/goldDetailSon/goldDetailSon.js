const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({options:options})
   wx.showLoading({
    title: '加载中~',
    mask: true
  })
   if(options.flag==1){
    util.Request("/api/getCommonCoinInfo", {
      'coinsUUID':options.uuid,
    }, "get",
    (res) => {
      let data=res.data.data
        if(data.GetCommonCoins.indexOf('-')!=-1){
          data.color=1
        }else{
          data.color=0
        }
      
      this.setData({list:data})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )

   }else{
    util.Request("/api/getTechCoinInfo", {
      'coinsUUID':options.uuid,
      'sportName':options.sport
    }, "get",
    (res) => {
      let data=res.data.data
        if(data.GetCoins.indexOf('-')!=-1){
          data.color=1
        }else{
          data.color=0
        }
      
      this.setData({list:data})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )

   }

  },
  
})