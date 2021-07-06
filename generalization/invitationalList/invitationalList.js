const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    enabled:true,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({img: util.API})
    util.Request("/api/getSelectuser", {page:1}, "post",
    (res) => {
      this.setData({list:res.data.data})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )
  },

  refresh:function(){
    util.Request("/api/getSelectuser", {page:1}, "post",
    (res) => {
      this.setData({list:res.data.data,enabled:false})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )
  },
  tolower:function(){
    
    util.Request("/api/getSelectuser", {page:this.data.page+1}, "post",
    (res) => {

      this.setData({list:[this.data.list,...res.data.data],page:page+1})
      wx.hideLoading()
    },
    () => {
      console.log("失败")
    },
    () => {}
  )
  }
  
})