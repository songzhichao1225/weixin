const util = require('../../utils/util.js')
Page({

  data: {
    timeArry:[['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],['00','30']],
    timeLeght:[['0小时','1小时','2小时','3小时','4小时','5小时','6小时','7小时','8小时','9小时'],['0分钟','5分钟','10分钟','15分钟','20分钟','25分钟','30分钟','35分钟','40分钟','45分钟','50分钟','55分钟']],
    activitiesTime:[],
    startTime:'',
    value:['00','00'],
    timeLeghtTwo:'请选择',
    valueTwo:['0小时','0分钟'],
    uuid:'',
    money:'￥0.00',
    sec:0
  },

  onLoad: function (options) {
    this.setData({startTime:new Date().getHours()==23?'00:00':new Date().getHours()+1+':00',value:[new Date().getHours()+1,new Date().getHours()+1],uuid:options.uuid})
    this.list(options.uuid,new Date().getHours()==23?'00:00':new Date().getHours()+1+':00')

  },

  list:function(uuid,endTimes){
    util.Request("/api/getContinuationTimePriceList", {
      publicuuid: uuid,
      time:endTimes
      }, "post",
      (res) => {
        this.setData({
          activitiesTime: res.data.data
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },



  bindTimeChange:function(e){
   let val=e.detail.value
   let timeArry=this.data.timeArry
   this.setData({
    startTime:timeArry[0][val[0]]+':'+timeArry[1][val[1]],
    money:'￥0.00',
    sec:0,
    timeLeghtTwo:'请选择'
   })

   this.list(this.data.uuid,timeArry[0][val[0]]+':'+timeArry[1][val[1]])
  },
  bindTimeChangeTwo:function(e){
    let val=e.detail.value
    let timeLeght=this.data.timeLeght
    this.setData({
      timeLeghtTwo:timeLeght[0][val[0]]+timeLeght[1][val[1]]
    })
    let sec=parseFloat(timeLeght[0][val[0]])*60+parseFloat(timeLeght[1][val[1]])
    let timeList=this.data.activitiesTime
    for(let i in timeList){
      timeList[i].height=0
    }

    let l=0
    for(let i=0;i<sec/30;i++){
        timeList[i].height='100%'
        l=i
    }
    if((sec/30).toString().indexOf('.')!=-1){
      timeList[l].height=('0.'+(sec/30).toString().split('.')[1])*100+'%'
    }
    for(let i in timeList){
       if(timeList[i].height!=0&&timeList[i].status==2){
         let that=this
         wx.showModal({
          title: '温馨提示',
          showCancel:false,
          content: timeList[i].time+'不可选择,请重新选择时长',
          success (res) {
            if (res.confirm) {
              for(let j in that.data.activitiesTime){
                that.data.activitiesTime[j].height=0
              }
              that.setData({activitiesTime:that.data.activitiesTime})
            }
          }
        })
        this.setData({timeLeghtTwo:'请选择'})
        return false
       }
       
    }
   
    this.setData({activitiesTime:timeList,sec:sec})
    let allMoney=0
    for(let i in timeList){
      if(timeList[i].height!=undefined){
        allMoney+=parseFloat(timeList[i].height)/100*Number(timeList[i].money)
      }
    }
    util.Request("/api/xsdisplay", {
      siteMoney: allMoney.toFixed(2),
      }, "post",
      (res) => {
        this.setData({
          textBookin: res.data.data,
          money:res.data.data.sentence
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  },
  orderForm:function(){
    if(this.data.sec!=0){
      wx.navigateTo({
        url: '/generalization/orderForm/orderForm?uuid='+this.data.uuid+'&startTime='+this.data.startTime+'&sec='+this.data.sec,
      })
    }else{
      wx.showToast({
        title: '请选择时长',
        icon: 'none',
        duration: 2000
      })
    }
  },
  xuRecord:function(){
    wx.navigateTo({
      url: '/generalization/xuRecord/xuRecord?uuid='+this.data.uuid
    })
  },


})