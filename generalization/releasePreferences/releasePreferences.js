
const util = require('../../utils/util.js')

Page({
  data: {
    sportid:'',//运动项目id
    sportName:'',//运动项目名称
    sporttype:'',//运动项目二级id
    sporttypeName:'',//运动项目二级名称
    mode: '请选择', //运动模式名称
    modeNum: 0,
    cf: true,
    array: [{
      id: 1,
      name: '娱乐模式'
    }, {
      id: 2,
      name: '竞技模式'
    }, {
      id: 3,
      name: '我是陪练'
    }, {
      id: 4,
      name: '我找陪练'
    }],
    arrayLan: [{
      id: 1,
      name: '娱乐模式'
    }, {
      id: 2,
      name: '竞技模式'
    }],
    arrayLanTwo: [{
      id: 1,
      name: '娱乐模式'
    }],
    disabled:true,
    sportLeve:'',//发布者等级运动项目
    siteThree:'',//场馆id名称
    siteThreeName:'请选择',//场馆名称
    ageArr: [
      ['不限', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      ['不限', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    ],
    age: '不限',
    sex:'不限',
    sexArr: [{
      id: 0,
      name: '男'
    },
    {
      id: 1,
      name: '女'
    },
    {
      id: 2,
      name: '不限'
    }
  ],
  rankArr: [
    ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ],
  rank:'不限',
  shoulderedArr: [{
    id: 0,
    name: 'AA'
  }, {
    id: 1,
    name: '输方买单'
  }],
  shouldered:'AA',
  TrialNum: '0', //裁判人数,
  TrialArray: [{
    id: 0,
    name: '0人'
  }, {
    id: 1,
    name: '1人'
  }, {
    id: 2,
    name: '2人'
  }, {
    id: 3,
    name: '3人'
  }, {
    id: 4,
    name: '4人'
  }, {
    id: 5,
    name: '5人'
  }, {
    id: 6,
    name: '6人'
  }],
  TrialRaderArr: [{
    id: 400,
    name: '国家级'
  }, {
    id: 300,
    name: '一级'
  }, {
    id: 200,
    name: '二级'
  }, {
    id: 100,
    name: '三级'
  }],
  TrialRader: '请选择', //裁判等级
  refereeFee: '', //裁判费
  comments:'',//活动备注

  },
  onLoad: function (option) {
    
  },

  sportsList: function() {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=3"
    })
    this.setData({  
      mode: '请选择', 
    modeNum: 0,
    siteThree:'',
    siteThreeName:'请选择'})
  },
  pickerTap: function() {
    if(this.data.sportName==''){
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else{
      this.setData({
        disabled:false
      })
    }
  },
  picker: function(e) {

    if (this.data.sportName == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.array[e.detail.value].name == '我是陪练'&&this.data.sportLeve.level<4){
      wx.showToast({
        title: '您的运动等级不够',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        mode: this.data.array[e.detail.value].name,
        modeNum: Number(e.detail.value) + 1,
      })
     
    

     
    }

  },

  venues: function(e) {
    if (this.data.sportid == 0) {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else if (this.data.mode=='请选择'){
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + this.data.sportid + '&sporttype=' + this.data.sporttype + '&falg=3'
      })
    }
  },

  bindPickerAge: function(e) {
    if(e.detail.value[0]==0&&e.detail.value[1]==0){
      this.setData({
        age: 10+ '-' + 70 + '岁'
      })
    }else if((e.detail.value[0])==0){
      this.setData({
        age: 10+ '-' + (e.detail.value[1]+9) + '岁'
      })
    }else if((e.detail.value[1])==0){
      this.setData({
        age: (e.detail.value[0]+9)+ '-' + 70 + '岁'
      })
    }else if ((e.detail.value[0]+9) > (e.detail.value[1]+9) && (e.detail.value[1]+9) != 0) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else  {
      this.setData({
        age: (e.detail.value[0]+9) + '-' + (e.detail.value[1]+9) + '岁'
      })
    }
  },

  bindPickerSex: function(e) {

    this.setData({
      sex: this.data.sexArr[e.detail.value].name
    })
    let ko = this.data.sexArr[e.detail.value].name
    wx.setStorage({
      key: 'sexF',
      data: ko,
    })
  },

  bindPickerRank: function(e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] !== 0) {
      wx.showToast({
        title: '最小级别不能高于最大级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        rank: '不限'
      })
      wx.setStorage({
        key: 'rankF',
        data: '不限',
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        rank: 1 + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankF',
        data: 1 + '-' + e.detail.value[1] + '级',
      })

    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        rank: e.detail.value[0] + '-' + 10 + '级'
      })
      wx.setStorage({
        key: 'rankF',
        data: e.detail.value[0] + '-' + 10 + '级',
      })
    } else {
      this.setData({
        rank: e.detail.value[0] + '-' + e.detail.value[1] + '级'
      }) 
      wx.setStorage({
        key: 'rankF',
        data: e.detail.value[0] + '-' + e.detail.value[1] + '级',
      })
    }
  },

  bindPickerShouldered: function(e) {
    if (this.data.modeNum == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        shouldered: this.data.shoulderedArr[e.detail.value].name
      })
    }

  },

  TrialPicker: function(e) {
    this.setData({
      TrialNum: this.data.TrialArray[e.detail.value].name,
      Trial: e.detail.value
    })
    let TrialNum = e.detail.value
    let arr1 = []
    for (var j = 0; j < TrialNum; j++) {
      let obj = {
        name: '报名'
      }
      arr1.push(obj)
    }
    this.setData({
      umpire: arr1
    })
  },

  TrialRader: function(e) {
    this.setData({
      refereegrade: this.data.TrialRaderArr[e.detail.value].name
    })
    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderArr[e.detail.value].name,
        'sportid': this.data.sportId,
        'number': Number(this.data.TrialNum.slice(0, 1)),
        'duration': parseFloat(this.data.timeLen)
      }, "post",
      (res) => {
        this.setData({
          refereeFee: res.data.data
        })
      },
      () => {
      },
      () => {}
    )
    this.setData({
      TrialRader: this.data.TrialRaderArr[e.detail.value].name
    })
  },

  comment: function(e) {
    this.setData({
      comments: e.detail.value
    })
  },

  comfire:function(){
    let {sportid,sporttype,modeNum,TrialNum,siteThree,siteThreeName,shouldered,sex,age,rank,comments,refereegrade}=this.data
    let data={
      sportid:sportid,
      prefeuuid:'',
      sporttype:sporttype,
      sportmode:modeNum,
      refereenumber:TrialNum.slice(0,1),
      refereegrade:refereegrade,
      siteuuid:siteThree.uid,
      sitename:siteThreeName,
      sitelat:siteThree.lat,
      sitelng:siteThree.lng,
      bearmode:  shouldered == 'AA' ? 1 : 2,
      sex:sex == '男' ? '0' : '' || sex == '不限' ? '2' : '' || sex == '女' ? '1' : '',
      minavg: age == '不限' ? '10' : parseFloat(age.split('-')[0]),
      maxavg: age == '不限' ? '70' : parseFloat(age.split('-')[1]),
      mingrade: rank == '不限' ? '1' : parseFloat(rank.split('-')[0]),
      maxgrade: rank == '不限' ? '10' : parseFloat(rank.split('-')[1]),
      reward:0,
      remarks:comments,
      sitecity:siteThree.city
    }
    if(sportid==''){
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else if(modeNum==0){
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else if(siteThree.uid==undefined){
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else{
      util.Request("/api/SavePlayerReleasePreference", data, "post",
      (res) => {
        if(res.data.code==2000){
          wx.redirectTo({
            url: '/generalization/preferences/preferences'
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
       
       
  
      },
      () => {
      },
      () => {}
    )
    }
  
  },



  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(currPage.data.sportsListThree!==undefined){
      this.setData({
        disabled:false
      })
      this.setData({
        sportid:currPage.data.sportsListThree.id,
        sportName:currPage.data.sportsListThree.name,
        sporttype:currPage.data.sportsListThree.sporttype,
        sporttypeName:currPage.data.sportsListThree.nametwo,
      })
      let idgo=currPage.data.sportsListThree.id
      if(idgo==1||idgo==2||idgo==7){
        this.setData({comments:'球，球拍各参与者均须自备'})
      }else if(idgo==4){
        this.setData({comments:'发布者带篮球'})
      }else if(idgo==5){
        this.setData({comments:'发布者带足球'})
      }else if(idgo==6){
        this.setData({comments:'发布者带排球'})
      }else{
        this.setData({comments:''})
      }
      if (currPage.data.sportsListThree.sporttype == 5) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 7) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 10) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 11) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 13) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 14) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 15) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 16) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 12) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 9) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsListThree.sporttype == 12) {
        this.setData({
          cf: false
        })
      }else if (currPage.data.sportsListThree.sporttype == 20) {
        this.setData({
          cf: 'no'
        })
      }else if (currPage.data.sportsListThree.sporttype == 21) {
        this.setData({
          cf: 'no'
        })
      }else{
        this.setData({
          cf: true
        })
      }
      util.Request("/api/getSportLevel", {
          'sportId': this.data.sportId
        }, "get",
        (res) => {
         this.setData({
           sportLeve:res.data.data
         })

          
          wx.hideLoading()
        },
        () => {
        },
        () => {}
      )
      this.setData({siteThree:currPage.data.siteThree,siteThreeName:currPage.data.siteThree.name})
    }
      
     
    
    
    wx.hideLoading()
  }
  
})
