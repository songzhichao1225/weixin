const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   page:1,
   xuRecord:[],
   enabled:true
  },

  
  onLoad: function (options) {
    this.setData({uuid:options.uuid})
    util.Request("/api/ContinuationRecord", {
      type: 1,
      publicuuid:options.uuid,
      page:this.data.page
      }, "post",
      (res) => {
        this.setData({
          xuRecord: res.data.data,
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },
  list:function(){
    util.Request("/api/ContinuationRecord", {
      type: 1,
      publicuuid:this.data.uuid,
      page:this.data.page
      }, "post",
      (res) => {
        this.setData({
          xuRecord:[...this.data.xuRecord,...res.data.data] ,
         
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },

  tolower: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.list()
  },

  refresh() {
  

    util.Request("/api/ContinuationRecord", {
      type: 1,
      publicuuid:this.data.uuid,
      page:this.data.page
      }, "post",
      (res) => {
        this.setData({
          xuRecord: res.data.data,
          enabled:false
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )

  },
  
})