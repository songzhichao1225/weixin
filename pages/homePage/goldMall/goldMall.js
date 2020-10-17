
const util = require('../../../utils/util.js')

Page({
  data: {
    goldMall:[],
    coins:0,
    navSon:[
      { img: "/assets/jbsc_qb.png", name:'全部'},
      { img: "/assets/jbsc_lq.png", name: '篮球' },
      { img: "/assets/jbsc_ymq.png", name: '羽毛球' },
      { img: "/assets/jbsc_wq.png", name: '网球' },
      { img: "/assets/jbsc_ppq.png", name: '乒乓球' },
      { img: "/assets/jbsc_zq.png", name: '足球' },
      { img: "/assets/jbsc_tq.png", name: '台球' },
      { img: "/assets/jbsc_gefq.png", name: '高尔夫球' },
      { img: "/assets/jbsc_pq.png", name: '排球' },
      { img: "/assets/jbsc_qt.png", name: '其他' }],
    falg:false,
    category:'',
    pages:1,
    banerLst:[],
    img:'',
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      category:'全部',
        img:util.API
    })
    this.categoryFn()
    util.request("/api/getGoodsBanner", {}, "get",
      (res) => {
        this.setData({
          banerLst:res.data.data
        })
        console.log(res.data.data)
      },
      () => { console.log("失败") },
      () => {
      }
    )
    util.Request("/api/getCommonCoins", {}, "get",
      (res) => {
       
        console.log(res.data.data)
        this.setData({
          coins:res.data.data.coins
        })
      },
      () => { console.log("失败") },
      () => {
      }
    )
  }, 
  //点击切换类
  clickSe:function(e){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      category: e.currentTarget.dataset.name,
      pages:1
    })
    this.categoryFn()

   

  },
  
  categoryFn: function (show){
    let { category, pages, goldMall}=this.data
      util.request("/api/getGoodsLst", { 'category': category, "page": pages }, "get",
        (res) => {
          this.setData({falg:true})
          wx.hideLoading()
          if (show==true){
            let goldMallData = [...goldMall, ...res.data.data.Lst]
            this.setData({ goldMall: goldMallData})
          }else{
            this.setData({ goldMall: res.data.data.Lst })
          }
          
        },
        () => { console.log("失败") },
        () => {
        }
      )
    },

  scrolltolower:function(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    this.setData({
      pages:this.data.pages+1
    })
    let show=true
    this.categoryFn(show)
  },
  scroll:function(e){
    
    let scrollTop = e.detail.scrollTop
  },
  //跳转商品详情
  details:function(e){
   let uuid=e.currentTarget.dataset.uuid
    let name = e.currentTarget.dataset.name
    let cost = e.currentTarget.dataset.cost
    wx.navigateTo({
      url: '/pages/homePage/mallDetails/mallDetails?uuid=' + uuid+'&name='+name+'&cost='+cost
    })
   

  },
  cost: function (e) {
    wx.navigateTo({
      url: '/generalization/exchange/exchange?cost=' + e.currentTarget.dataset.cost + '&uuid=' + e.currentTarget.dataset.uuid
    })
  }
})
