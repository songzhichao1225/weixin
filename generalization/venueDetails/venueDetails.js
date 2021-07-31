const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venue:[],
    falg:0,
    sportId:0,
    sporttype:0,
    siteuid:0,
    img:'',
    fileArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })


    this.setData({
      falg: options.falg,
      sportId: options.sportid,
      sporttype: options.sporttype,
      siteuid: options.siteuid,
      img:util.API
    })
    util.Request("/api/getSiteInfo", { 'uid': options.siteuid}, "get", (res) => { 
      this.setData({
        venue:res.data.data
      })
      let arrplo=[]
      let venue=res.data.data.filesURL
      for(let i in venue){
        if(venue[i].indexOf('VenueThumnail')!=-1){
          arrplo.push(venue[i].replace('VenueThumnail','Venue'))
        }
      }
      this.setData({fileArr:arrplo})
      wx.hideLoading()
    }, 
    () => {
    },
    () => {}
  )



   
  },
  addressGo: function (e) {
    let data = e.currentTarget.dataset
    wx.openLocation({
      latitude: Number(data.lat), //维度
      longitude: Number(data.lng), //经度
      name: '我的位置', //目的地定位名称
      scale: 15, //缩放比例
      address: data.address //导航详细地址
    })
  },

  telephone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.venue.telephone 
    })
  },
  //跳转H5选择场地
  bookIn: function (e) {
    let obj = {
      siteid: e.currentTarget.dataset.uid,
      name: e.currentTarget.dataset.name
    }
    if(this.data.falg==0){
      wx.setStorage({
        data: obj,
        key: 'siteid',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flag='+this.data.falg+'&flagTwo=3'+'&hood=1',
      })
    }else if(this.data.falg==1){
      wx.setStorage({
        data: obj,
        key: 'siteidTwo',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flag='+this.data.falg+'&flagTwo=3'+'&hood=2',
      })
    }else if(this.data.falg==2){
      wx.setStorage({
        data: obj,
        key: 'siteidThree',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flag=2'+'&flagTwo=3'+'&hood=3',
      })
    }else if(this.data.falg==3){
      wx.setStorage({
        data: obj,
        key: 'siteidFour',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flag=0'+'&flagTwo=3'+'&hood=4',
      })
    }else if(this.data.falg==4){
      wx.setStorage({
        data: obj,
        key: 'siteidFive',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flag=0'+'&flagTwo=3'+'&hood=5',
      })
    }else if(this.data.falg==5){
      wx.setStorage({
        data: obj,
        key: 'siteidSix',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flag=0'+'&flagTwo=3'+'&hood=6',
      })
    }
  },
  previewImage:function(e){
    const current = e.target.dataset.src
    let filesURL=[]
    if(this.data.fileArr.length==0){
       filesURL=this.data.venue.filesURL

    }else{
       filesURL=this.data.fileArr
    }
    
    let arr=[]
    for(let i in filesURL){
      arr.push(this.data.img+'/'+filesURL[i])
    }
    wx.previewImage({
      current,
      urls: arr
    })
  },
  previewImageTwo:function(e){
    const current = e.target.dataset.src
    let index = e.target.dataset.index
    let filesURL=this.data.venue.comments[index].images
    let arr=[]
    for(let i in filesURL){
      arr.push(this.data.img+'/'+filesURL[i])
    }
    wx.previewImage({
      current,
      urls: arr
    })
  },
  commentary:function(e){
    wx.navigateTo({
      url: '/generalization/commentaryList/commentaryList?siteid='+e.currentTarget.dataset.uuid,
    })
    
  },
  
 






























 
})