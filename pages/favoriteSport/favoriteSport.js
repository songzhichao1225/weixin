const util = require('../../utils/util.js')

Page({
  data: {
    dataIndex:'',
    arrList:[],
    sporIdArr:[],
    listSon: [
     
      {
        name: '羽毛球',
        num: 0,
        flag: false
      },
      {
        name: '乒乓球',
        num: 1,
        flag: false
      },
      {
        name: '台球',
        num: 2,
        flag: false
      },
      {
        name: '篮球',
        num: 3,
        flag: false
      },
      {
        name: '足球',
        num: 4,
        flag: false
      },
      {
        name: '排球',
        num: 5,
        flag: false
      },

      {
        name: '网球',
        num: 6,
        flag: false
      },
     
      {
        name: '高尔夫',
        num: 7,
        flag: false
      },
    ]
  },
  onLoad: function() {
    wx.hideLoading()
  },
  sport:function(e){
    let { listSon}=this.data
    let numIndex = e.currentTarget.dataset.num
    let dataStyle = "listSon[" + numIndex +"].flag";
    if (listSon[e.currentTarget.dataset.num].flag==false){
      this.setData({ [dataStyle]: true })
    } else if (listSon[e.currentTarget.dataset.num].flag == true){
      this.setData({ [dataStyle]: false })
    }
  },
  confirm:function(){
    let { listSon} = this.data 
    let arr=[]
    let sporIdArr=[]
    for (let i in listSon) {
      if (listSon[i].flag==true){
        arr.push(listSon[i].name)
        sporIdArr.push(listSon[i].num+1)
       }
      }
      
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
        arrList: arr,
      sporIdArr: sporIdArr
    })
    wx.navigateBack({
      delta: 1
    })
    
     
  },


})