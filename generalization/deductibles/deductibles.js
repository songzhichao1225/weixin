const util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[],
    enabled:false,
    siteMoney:0,
    offsetquota:0,
    moneyAll:0,
    moneyNum:0,
    flag:1,
    forbade:false
  },

  forbade:function(){
    this.setData({forbade:true})
  },
  closeTwo:function(){
    this.setData({forbade:false})
  },


  onLoad: function (options) {
    app.deductibles=[]
    this.setData({siteMoney:options.siteMoney,offsetquota:options.offsetquota})
    util.Request("/api/frame", {}, "post",
    (res) => {
       this.setData({flag:res.data.data})
    },
    () => {
      console.log("失败")
    },
    () => {}
  )


   this.list()
  },

  list(show){
    util.Request("/api/getUsableOffsetRolls", {
      "page":this.data.page
    }, "post",
    (res) => {
 
      if (show == true) {
        var data = [...this.data.list, ...res.data.data]
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '没有更多了~',
            icon: 'none',
            duration: 2000
          })
        }

      } else {
        var data = res.data.data
      }
      for(let i in data){
        data[i].num=0
      }

      this.setData({
        list: data,
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
      page: 1,
      moneyNum:0,
      moneyAll:0
    })
    this.list()

  },
  joinMoney(e){
    let money=e.currentTarget.dataset.money
    let moneysmall=e.currentTarget.dataset.moneysmall 
    let index=e.currentTarget.dataset.index
    let num=e.currentTarget.dataset.num
    let number=e.currentTarget.dataset.number
    if(money>this.data.siteMoney){
      wx.showToast({
        title: '场地费满'+money+'可用',
        icon: 'none',
        duration: 2000
      })
      
    }else if(this.data.moneyAll>=this.data.offsetquota){
      wx.showToast({
        title: '最多可使用场地费抵用券'+this.data.offsetquota+'元',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.moneyAll+moneysmall>this.data.offsetquota){
      wx.showToast({
        title: '最多可使用场地费抵用券'+this.data.offsetquota+'元',
        icon: 'none',
        duration: 2000
      })
    }else if(num>=number){
      wx.showToast({
        title: '抵用券不足',
        icon: 'none',
        duration: 2000
      })
    }else{
      let k="list["+index+"].num"
      this.setData({moneyNum:this.data.moneyAll+moneysmall,moneyAll:this.data.moneyAll+moneysmall,[k]:this.data.list[index].num+1})
    }
  },
  subtracts(e){
    let moneysmall=e.currentTarget.dataset.moneysmall
    let index=e.currentTarget.dataset.index
    if(this.data.list[index].num>0){
      let k="list["+index+"].num"
      this.setData({moneyNum:this.data.moneyNum-moneysmall,moneyAll:this.data.moneyNum-moneysmall,[k]:this.data.list[index].num-1})
    }
  },
  clearOut(e){
    let moneysmall=e.currentTarget.dataset.moneysmall
    let index=e.currentTarget.dataset.index
    if(this.data.list[index].num>0){
      let k="list["+index+"].num"
      this.setData({moneyNum:this.data.moneyNum-moneysmall*this.data.list[index].num,moneyAll:this.data.moneyNum-moneysmall*this.data.list[index].num,[k]:0})
    }
  },
  submit(){
    let list=this.data.list
    let volumedetail=[]
    for(let i in list){
       if(list[i].num>0){
        volumedetail.push(list[i].uuid+'|'+list[i].num)
       }
    }
    let obj={volumedetail:volumedetail.join(','),moneyNum:this.data.moneyNum}
    if(volumedetail.length!=0){
      app.deductibles = obj
    }
    wx.navigateBack({
      delta: 1
    })
   
  },
  

})