
const util = require('../../utils/util.js')

Page({
  data: {
    headerList: [
      {
        name: '羽毛球',
        num: '1',
        color: true,
      },
    {
      name: '乒乓球',
      num: '2',
      color: false,
    },
    {
      name: '台球',
      num: '3',
      color: false,
    },
    {
      name: '篮球',
      num: '4',
      color: false,
    },
    {
      name: '足球',
      num: '5',
      color: false,
    },
    {
      name: '排球',
      num: '6',
      color: false,
    },
    {
      name: '网球',
      num: '7',
      color: false,
    },
    {
      name: '高尔夫',
      num: '8',
      color: false,
    }
    ],

    rankingType: [{
      name: '好友排名',
      num: '0',
      color: true,
      title:'好友',
      nameE:'myFriends'
    },
    {
      name: '区排名',
      num: '4',
      color: false,
      title:wx.getStorageSync('area'),
      nameE:'area'
    },
    {
      name: '市排名',
      num: '3',
      color: false,
      title: wx.getStorageSync('cityInfo'),
      nameE:'city'
    },
    {
      name: '省排名',
      num: '2',
      color: false,
      title: '省',
      nameE:'province'
    },
    {
      name: '全国排名',
      num: '1',
      color: false,
      title: '全国',
      nameE:'country'
    }
   
    
    
    ],
    title:'好友',
    drankingList:[],
    typeTitle:'1',
    nameE:'myFriends',
    name:'羽毛球',
    flag:1,
    img:'',
  },
  onLoad: function () {
    this.drankingList()
    this.setData({
      img:util.API
    })
 
  },

  tap:function(e){
    this.setData({flag:parseInt(e.currentTarget.dataset.num)})
  },
  select: function (e) {
    let type = e.currentTarget.dataset.name
    let num = e.currentTarget.dataset.num
    let { headerList } = this.data
    let headerColor = "headerList[" + parseInt(num-1) + "].color";
    for (let i in headerList) {
      let headerColorT = "headerList[" + i + "].color";
      this.setData({ [headerColorT]: false })
    }
    this.setData({ [headerColor]: true, typeTitle: num,name:type })
    this.drankingList()
  },
  selectTwo:function(e){
    let type = e.currentTarget.dataset.name
    let num = e.currentTarget.dataset.index
    let title = e.currentTarget.dataset.title
    let nameE = e.currentTarget.dataset.namee
    let { rankingType } = this.data
    let headerColor = "rankingType[" + num + "].color";
    for (let i in rankingType) {
      let headerColorT = "rankingType[" + i + "].color";
      this.setData({ [headerColorT]: false })
    }
    this.setData({ [headerColor]: true, title: title, nameE:nameE })
    this.drankingList()
  },

  drankingList: function (){
    let { typeTitle, nameE}=this.data
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getRanking", { 'sportid': typeTitle, 'type': nameE }, "get",
      (res) => {
        this.setData({ drankingList:res.data.data})
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )
  },
  details:function(e){
   let uuid=e.currentTarget.dataset.uuid
    wx.navigateTo({
      url: '/pages/personal/personal?uuid=' + uuid
    })
  }

})
