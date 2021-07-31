const util = require('../../utils/util.js')
Page({

 
  data: {
    page:1,
    commentaryList:[],
    img:'',
    show:false
  },

 
  onLoad: function (options) {
   
   this.setData({
    img:util.API,
    siteid:options.siteid
  })
 this.jood()
  
  
   
  },

  jood:function(show){
    util.Request("/api/getSiteCommentsLst", { 'siteUid':this.data.siteid,page:this.data.page}, "get",
    (res) => {
      if (show == true) {
            let mData = [...this.data.commentaryList, ...res.data.data.commentLst]
            this.setData({
              commentaryList: mData
            })
          } else {
            this.setData({
              commentaryList: res.data.data.commentLst
            })
          }

      wx.hideLoading()
    },
    () => {  },
    () => {
    }
  )

  },
  previewImageTwo:function(e){
    const current = e.target.dataset.src
    let index = e.target.dataset.index
    let baseURL=this.data.commentaryList[index].imgbaseurl
    let filesURL=this.data.commentaryList[index].images
    let arr=[]
    
    for(let i in filesURL){
      arr.push(this.data.img+'/'+filesURL[i])
    }
    wx.previewImage({
      current,
      urls: arr
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //显示动画
    this.jood()
  },
  //上拉加载
  onReachBottom: function () {
    let show = true
    this.setData({page:this.data.page+1})
    this.jood(show) 
  }
}) 