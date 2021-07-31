//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    headerList: [{
        name: '全部',
        num: '0',
        color: true,
      },
      {
        name: '羽毛球',
        num: '1',
        color: false,
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
    nearbyData: '',
    img: '',
  },
  onLoad: function () {
    let type = '0'
    this.nearbyData(type)
    this.setData({
      img: util.API
    })
  },
  select: function (e) {
    let type = e.currentTarget.dataset.num
    let num = e.currentTarget.dataset.num
    let {
      headerList
    } = this.data
    let headerColor = "headerList[" + num + "].color";
    for (let i in headerList) {
      let headerColorT = "headerList[" + i + "].color";
      this.setData({
        [headerColorT]: false
      })
    }
    this.setData({
      [headerColor]: true
    })
    this.nearbyData(type)
  },
  nearbyData: function (type) {
    if (type == '全部') {
      type = '0'
    }
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getMyFriends", {
        "type": type,
        "term": 'myfriend',
        page: 1
      }, "get",
      (res) => {
        let nData = res.data.data.Lst
        for (let i in nData) {
          if (nData[i].hightName == '高尔夫') {
            nData[i].hightName = 'icon_dj_gef.png';
          } else if (nData[i].hightName == '台球') {
            nData[i].hightName = 'icon_dj_tq.png'
          } else if (nData[i].hightName == '羽毛球') {
            nData[i].hightName = 'icon_dj_ymq.png'
          } else if (nData[i].hightName == '乒乓球') {
            nData[i].hightName = 'icon_dj_ppq.png'
          } else if (nData[i].hightName == '篮球') {
            nData[i].hightName = 'icon_dj_lq.png'
          } else if (nData[i].hightName == '足球') {
            nData[i].hightName = 'icon_dj_zq.png'
          } else if (nData[i].hightName == '排球') {
            nData[i].hightName = 'icon_dj_pq.png'
          } else if (nData[i].hightName == '网球') {
            nData[i].hightName = 'icon_dj_wq.png'
          }
        }
        this.setData({
          nearbyData: res.data.data.Lst
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },
  //跳转用户详情
  getUserDetailInfo: function (e) {
    wx.navigateTo({
      url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uid
    })
  },
  inputPhone(e) {
    util.Request("/api/getMyFriends", {
        "type": 0,
        "term": 'myfriend',
        page: 1,
        search: e.detail.value
      }, "get",
      (res) => {
        let nData = res.data.data.Lst
        for (let i in nData) {
          if (nData[i].hightName == '高尔夫') {
            nData[i].hightName = 'icon_dj_gef.png';
          } else if (nData[i].hightName == '台球') {
            nData[i].hightName = 'icon_dj_tq.png'
          } else if (nData[i].hightName == '羽毛球') {
            nData[i].hightName = 'icon_dj_ymq.png'
          } else if (nData[i].hightName == '乒乓球') {
            nData[i].hightName = 'icon_dj_ppq.png'
          } else if (nData[i].hightName == '篮球') {
            nData[i].hightName = 'icon_dj_lq.png'
          } else if (nData[i].hightName == '足球') {
            nData[i].hightName = 'icon_dj_zq.png'
          } else if (nData[i].hightName == '排球') {
            nData[i].hightName = 'icon_dj_pq.png'
          } else if (nData[i].hightName == '网球') {
            nData[i].hightName = 'icon_dj_wq.png'
          }
        }
        this.setData({
          nearbyData: res.data.data.Lst
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },
  delet(e){

    wx.showModal({
      title: '温馨提示',
      content: '您确定删除好友么?',
      success (res) {
        if (res.confirm) {
          util.Request("/api/delUserFriends", {
            "uuid": e.currentTarget.dataset.uuid,
          }, "post",
          (res) => {
            wx.showToast({
              title: '删除成功~',
              icon: 'succces',
              duration: 1500,
              mask: true
            })
            setTimeout(()=>{
              let type=0
              this.nearbyData(type)
            },1500)
            
        
          },
          () => {
          },
          () => {}
        )
        } else if (res.cancel) {
          
        }
      }
    })

  
  }
})