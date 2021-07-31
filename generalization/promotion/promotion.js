//logs.js
const util = require('../../utils/util.js')

const F2 = require('@antv/wx-f2')
Page({
  data: {
    indexNum: 0,
    status: '', //提交后的审核状态
    msg: '', //是否申请
    promtion: '',
    income: '',
    clearList:'',
    flag:false,
    opts: {
      onInit: initChart
    }, 
    timer: [{
        name: '本周',
        num: 1
      },
      {
        name: '本月',
        num: 2
      },
      {
        name: '本年',
        num: 3
      },
    ],

    logs: [{
        name: '平台介绍',
        num: 0
      },
      {
        name: '加入流程',
        num: 1
      },
      {
        name: '加入要求',
        num: 2
      },
      {
        name: '提成制度',
        num: 3
      },
    ],
    content: [{
        img: '/assets/icon-shouru.png',
        title: '一次推广 永享提成',
        text: '推广场馆成功后，您将享有平台在该推广场馆所有订单的提成，只要能正常维护运营推广场馆，主要是处理该场馆的投诉活动，“处理投诉正确率“一直在90%以上，您将一直向右提成。'
      },
      {
        img: '/assets/icon-chengben.png',
        title: '无任何成本',
        text: '没有任何费用，就可以轻松成为推广运营专员。',
        style: 'margin-top:100rpx;',
      },
      {
        img: '/assets/icon-baobiao.png',
        title: '收入报表随时看',
        text: '可以随时随地的查看已推广场馆的订单和提成，让您安心、放心。',
        style: 'margin-top:100rpx;'
      }
    ],
  },
  onLoad: function() {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getIdCardinformation", {}, "post", 
      (res) => {
       if(res.data.data.length!=0){
         if (res.data.data.status == 0) {
           wx.showLoading({
             title: '加载中~',
             mask: true
           })
           wx.redirectTo({
             url: '/generalization/verify/verify?name=' + res.data.data.CardName + '&&cardId=' + res.data.data.CardNumber + '&&status=' + res.data.data.status

           })
         } else if (res.data.data.status == 2) {
           wx.showLoading({
             title: '加载中~',
             mask: true
           })
           wx.redirectTo({
             url: '/generalization/verify/verify?name=' + res.data.data.CardName + '&&cardId=' + res.data.data.CardNumber + '&&status=' + res.data.data.status
           })
         } else if (res.data.data.status == 1) {
           util.Request("/api/getPromoterindex", {}, "post",
             (res) => {
               this.setData({
                 promtion: res.data.data
               })
             },
             () => {
             },
             () => {}
           )
           let number = 2
           this.income(number)

           util.request("/api/getNearbyvenues", { 'page': 1, 'limit': 3, 'mylat': wx.getStorageSync('lat'), 'mylng': wx.getStorageSync('lng') }, "post",
             (res) => {
               this.setData({ clearList: res.data.data })
             },
             () => {},
             () => {
             }
           )

         }
         this.setData({ status: res.data.data.status,})
       }
        this.setData({
          msg: res.data.code
        })
        this.setData({ flag: true })
      },
      () => {
      },
      () => {
      }
    )
  },
  navTap: function(e) {
    this.setData({
      indexNum: e.currentTarget.dataset.num
    })
  },
  join: function() {
    wx.navigateTo({
      url: '/pages/information/information'
    })
  },
  income: function(number) { 
    util.Request("/api/getMoneyStatisticalArticle", {
        'type': number
      }, "post", (res) => { 
        wx.setStorageSync('income', res.data.data)
        wx.hideLoading()
      }, 
      () => { 
      },
      () => {}
    )

  },
  timer:function(e){
    let number=e.currentTarget.dataset.num
    this.income(number)
  
  },
  orderToday:function(){
    wx.navigateTo({
      url: '/generalization/orderToday/orderToday?money=' + this.data.promtion.data1
    })
  },
  lookMore:function(){
    wx.navigateTo({
      url: '/generalization/promoted/promoted'
    })
  },
  complaint:function(){
    wx.navigateTo({
      url: '/generalization/complaint/complaint'
    })
  },
  stadium:function(){
    wx.navigateTo({
      url: '/generalization/Stadium/Stadium'
    })
  },
  stadiumDetail:function(e){
    wx.navigateTo({
      url: '/generalization/stadiumDetail/stadiumDetail?siteUid=' + e.currentTarget.dataset.siteuid + '&&name=' + e.currentTarget.dataset.name
    })
  },
})
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  let data = wx.getStorageSync('income')
  let chart = null;
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    time: {
      tickCount: data.length
    }
  });
  chart.tooltip({
    showItemMarker: false,
    onShow(ev) {
      const {
        items
      } = ev;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '¥ ' + items[0].value;
    }
  });
  chart.line().position('time*Money').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
  chart.area().position('time*Money').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
  chart.render();
  return chart;
}



