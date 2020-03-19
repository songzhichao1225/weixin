const util = require('../../utils/util.js')

var app = getApp();
Page({

  
  data: {
    indexSw: 0,
    sportId: '', //一级分类id
    sportType: '', //二级分类id
    sportName: '请选择', //一级分类名称
    sportypeName: '', //二级分类名称

    sportIdTwo: '', //一级分类id
    sportTypeTwo: '', //二级分类id
    sportNameTwo: '请选择', //一级分类名称
    sportypeNameTwo: '', //二级分类名称
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
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ],
    shoulderedArr:[{id:0,name:'AA'},{id:1,name:'谁输谁买单'}],
    mode: '请选择', //运动模式名称
    modeNum: '', //运动模式Id
    TrialNum: '0人', //裁判人数,
    Trial: 0, //选择裁判id
    TrialRader: '请选择', //裁判等级
    bookin: '', //预定完场地返回参数
    bookinTwo:'',//另一个
    siteid: '', //预定的哪个场馆的id
    siteName: '请选择', //当前场馆名称

    
    siteidTwo: '', //预定的哪个场馆的id
    siteNameTwo: '请选择', //当前场馆名称


    startTime: '请选择', //开始时间
    timer: '', //开始时间段
    timeLen: '无', //时长
    placeMoney: '0', //场地费

    startTimeTwo: '请选择', //开始时间
    timerTwo: '', //开始时间段
    timeLenTwo: '无', //时长
    placeMoneyTwo: '0', //场地费


    refereeFee: '', //裁判费
    sex: '不限', //性别
    rank: '1级-1级', //级别
    numB: [], //b能参加人数
    numA: [], //a能参加人数
    mineDetail: [], //本人信息
    team: 0,
    indexTeam:0,
    umpire:[],//裁判人数
    shouldered:'AA',
    tips:0,//打赏费
    comments:'',//备注
    venueid:'',//场地号
    venueidTwo:'',
    refereegrade:'',//裁判等级
    commentsTwo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('mode') !== '') {
      this.setData({
        mode: wx.getStorageSync('mode'),
        modeNum:wx.getStorageSync('modeNum')
      })
    }
    this.onKO()
    this.setData({
      sportId: wx.getStorageSync('sportIdF'),
      sportType: wx.getStorageSync('sportTypeF'),
      sportName: wx.getStorageSync('sportNameF'),
      sportypeName: wx.getStorageSync('sportypeNameF'),
      sportIdTwo: wx.getStorageSync('sportIdFTwo'),
      sportTypeTwo: wx.getStorageSync('sportTypeFTwo'),
      sportNameTwo: wx.getStorageSync('sportNameFTwo'),
      sportypeNameTwo: wx.getStorageSync('sportypeNameFTwo')
    })
    wx.hideLoading()

  },

  swiper: function (e) {
    this.setData({
      indexSw: e.detail.current
    })
  },
  navTitle: function (e) {
    this.setData({
      indexSw: e.currentTarget.dataset.index
    })
  },
  sportsList: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=1"
    })
  },

  sportsListTwo: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=2"
    })
  },

  picker: function (e) {
    this.setData({
      mode: this.data.array[e.detail.value].name,
      modeNum: Number(e.detail.value) + 1,
    })
    wx.setStorage({
      key: 'mode',
      data: this.data.array[e.detail.value].name,
    })

    wx.setStorage({
      key: 'modeNum',
      data: Number(e.detail.value) + 1,
    })
  },

  TrialPicker: function (e) {
    this.setData({
      TrialNum: this.data.TrialArray[e.detail.value].name,
      Trial: e.detail.value
    })
    let TrialNum=e.detail.value
    let arr1=[]
    for (var j = 0; j < TrialNum; j++) {
      let obj = {}
      arr1.push(obj)
    }
    this.setData({
      umpire:arr1
    })
  },
  TrialRader: function (e) {
   this.setData({
    refereegrade:this.data.TrialRaderArr[e.detail.value].name
   })
    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderArr[e.detail.value].name,
        'sportid': this.data.sportId,
        'number': Number(this.data.TrialNum.slice(0, 1)),
        'duration': parseFloat(this.data.timeLen)
      }, "post",
      (res) => {
        console.log(res)
        this.setData({
          refereeFee: res.data.data
        })
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
    this.setData({
      TrialRader: this.data.TrialRaderArr[e.detail.value].name
    })
  },
  bindPickerShouldered:function(e){
    if(this.data.modeNum==''){
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else{
      this.setData({
        shouldered:this.data.shoulderedArr[e.detail.value].name
      })
    }
    
  },

  venues: function (e) {
    if (e.currentTarget.dataset == undefined) {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype+'&falg=1'
      })
    }
  },

  venuesTwo: function (e) {
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset == undefined) {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype+'&falg=2'
      })
    }
  },

  bindPickerSex: function (e) {
    this.setData({
      sex: this.data.sexArr[e.detail.value].name
    })
  },


  bindPickerRank: function (e) {

    this.setData({
      rank: this.data.rankArr[0][e.detail.value[0]] + '级-' + this.data.rankArr[1][e.detail.value[1]] + '级'
    })
  },
  startDateTime:function(e){
   if(this.data.siteid==''){
    wx.showToast({
      title: '请选择运动场馆',
      icon: 'none',
      duration: 1500,
      mask: true
    })
   }else{
     wx.navigateTo({
      url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sportType+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&falg=1',
    })
   }
  },

  startDateTimeTwo:function(e){
    if(this.data.siteidTwo==''){
     wx.showToast({
       title: '请选择运动场馆',
       icon: 'none',
       duration: 1500,
       mask: true
     })
    }else{
      wx.navigateTo({
       url: '/generalization/bookIn/bookIn?sportid='+this.data.sportIdTwo+'&sporttype='+this.data.sportTypeTwo+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&falg=2',
     })
    }
   },






  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];

    if (wx.getStorageSync('bookin') !== '') {
      this.setData({
        startTime: wx.getStorageSync('bookin').data[0].placeDate,
        timer: wx.getStorageSync('bookin').data[0].placeTime,
        timeLen: wx.getStorageSync('bookin').data[0].placeTimeLen,
        placeMoney: wx.getStorageSync('bookin').data[0].placeMoney,
        venueid:wx.getStorageSync('bookin').data[0].placeNun
      })
    }

    if (wx.getStorageSync('bookinTwo') !== '') {
      this.setData({
        startTimeTwo: wx.getStorageSync('bookinTwo').data[0].placeDate,
        timerTwo: wx.getStorageSync('bookinTwo').data[0].placeTime,
        timeLenTwo: wx.getStorageSync('bookinTwo').data[0].placeTimeLen,
        placeMoneyTwo: wx.getStorageSync('bookinTwo').data[0].placeMoney,
        venueidTwo:wx.getStorageSync('bookinTwo').data[0].placeNun
      })
    }

    if (wx.getStorageSync('siteid') !== '') {
      this.setData({
        siteid: wx.getStorageSync('siteid').siteid,
        siteName: wx.getStorageSync('siteid').name,
      })
    }

    if (wx.getStorageSync('siteidTwo') !== '') {
      this.setData({
        siteidTwo: wx.getStorageSync('siteidTwo').siteid,
        siteNameTwo: wx.getStorageSync('siteidTwo').name,
      })
    }


    if (currPage.data.sportsList != undefined) {
      this.setData({
        sportId: currPage.data.sportsList.id,
        sportType: currPage.data.sportsList.sporttype,
        sportName: currPage.data.sportsList.name,
        sportypeName: currPage.data.sportsList.nametwo
      })
      wx.setStorage({
        key: 'sportIdF',
        data: currPage.data.sportsList.id,
      })
      wx.setStorage({
        key: 'sportTypeF',
        data: currPage.data.sportsList.sporttype,
      })
      wx.setStorage({
        key: 'sportNameF',
        data: currPage.data.sportsList.name,
      })
      wx.setStorage({
        key: 'sportypeNameF',
        data: currPage.data.sportsList.nametwo,
      })


      this.onKO()

    } 
    if (currPage.data.memberUid != undefined) {
      
      util.request("/api/getUserDetailInfo", {
          'uuid': currPage.data.memberUid
        }, "get",
        (res) => {
          if (this.data.team == 1) {

            let projectNow = res.data.data.userHightLevel
            let name = res.data.data.userHightLevel.name
            this.judgmentBall(name, projectNow)
            let obj = {
              imgURL: res.data.data.imgURL,
              heightLevel:  res.data.data.userHightLevel.level,
              name: res.data.data.userHightLevel.nameSon,
              uuid:res.data.data.uuid
            }
            let uuidArr=[]
            for(let i in this.data.numA){
              uuidArr.push(this.data.numA[i].uuid)
              uuidArr.push(this.data.numB[i].uuid)
          }
          if(uuidArr.indexOf(res.data.data.uuid)!=-1){
            wx.showToast({
              title: '不可重复邀请',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }else{
            this.data.numA[this.data.indexTeam]=obj
            this.setData({
              numA:this.data.numA
            })
          }
          }else if (this.data.team == 2) {

            let projectNow = res.data.data.userHightLevel
            let name = res.data.data.userHightLevel.name
            this.judgmentBall(name, projectNow)
            let obj = {
              imgURL: res.data.data.imgURL,
              heightLevel:  res.data.data.userHightLevel.level,
              name: res.data.data.userHightLevel.nameSon,
              uuid:res.data.data.uuid
            }  
             let uuidArr=[]
            for(let i in this.data.numB){
              uuidArr.push(this.data.numA[i].uuid)
              uuidArr.push(this.data.numB[i].uuid)
          }
          if(uuidArr.indexOf(res.data.data.uuid)!=-1){
            wx.showToast({
              title: '不可重复邀请',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }else{
            this.data.numB[this.data.indexTeam]=obj
            this.setData({
              numB:this.data.numB
            })
          }
           
          }
        },
        () => {
          console.log("失败")
        },
        () => {}
      )

    }

    
    if (currPage.data.sportsListTwo != undefined) {
      this.setData({
        sportIdTwo: currPage.data.sportsListTwo.id,
        sportTypeTwo: currPage.data.sportsListTwo.sporttype,
        sportNameTwo: currPage.data.sportsListTwo.name,
        sportypeNameTwo: currPage.data.sportsListTwo.nametwo
      })
      wx.setStorage({
        key: 'sportIdFTwo',
        data: currPage.data.sportsListTwo.id,
      })
      wx.setStorage({
        key: 'sportTypeFTwo',
        data: currPage.data.sportsListTwo.sporttype,
      })
      wx.setStorage({
        key: 'sportNameFTwo',
        data: currPage.data.sportsListTwo.name,
      })
      wx.setStorage({
        key: 'sportypeNameFTwo',
        data: currPage.data.sportsListTwo.nametwo,
      })


      this.onKO()

    } 

  },


  //邀请好友
  invitaional: function (e) {
    if (this.data.sportId == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else if (this.data.sex == '') {
      wx.showToast({
        title: '请选择成员性别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.rank == '') {
      wx.showToast({
        title: '请选择成员级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let sex = this.data.sex == '男' ? '0' : '1' || this.data.sex == '不限' ? '2' : ''
      let rankMax = parseFloat(this.data.rank.split('-')[0]) > parseFloat(this.data.rank.split('-')[1]) ? parseFloat(this.data.rank.split('-')[0]) : parseFloat(this.data.rank.split('-')[1])
      let rankMin = parseFloat(this.data.rank.split('-')[0]) < parseFloat(this.data.rank.split('-')[1]) ? parseFloat(this.data.rank.split('-')[0]) : parseFloat(this.data.rank.split('-')[1])
      this.setData({
        team: e.currentTarget.dataset.team,
        indexTeam:e.currentTarget.dataset.index
      })
      wx.navigateTo({
        url: '/generalization/Invitational/Invitational?sportid=' + this.data.sportId + '&sex=' + sex + '&rankMax=' + rankMax + '&rankMin=' + rankMin + '&team=' + e.currentTarget.dataset.team,
      })



    }



  },



  onKO: function () {
    util.Request("/api/getUserDetailInfo", {
        uuid: wx.getStorageSync('uuid')
      }, "get",
      (res) => {
        let numAB = 0
        switch (wx.getStorageSync('sportypeNameF')) {
          case '单打':
            numAB = 1
            break;
          case '双打':
            numAB = 2
            break;
          case '中式黑八':
            numAB = 1
            break;
          case '美式九球':
            numAB = 1
            break;
          case '斯诺克':
            numAB = 1
            break;
          case '5v5':
            numAB = 5
            break;
          case '3v3':
            numAB = 3
            break;
          case '11人制':
            numAB = 11
            break;
          case '8人制':
            numAB = 8
            break;
          case '7人制':
            numAB = 7
            break;
          case '5人制':
            numAB = 5
            break;
          case '6v6':
            numAB = 6
            break;
          case '单打':
            numAB = 1
            break;
          case '双打':
            numAB = 2
            break;
          case '比杆赛':
            numAB = 1
            break;
          case '比洞赛':
            numAB = 1
            break;
          default:
            numAB = 0
        }
        var arr2 = new Array();
        var arr1 = []
        let projectNow = res.data.data.userHightLevel
        let name = res.data.data.userHightLevel.name
        this.judgmentBall(name, projectNow)
        let obj = {
          imgURL: wx.getStorageSync('imgURL'),
          heightLevel: projectNow.level,
          name: projectNow.nameSon
        }
        for (var i = 0; i < numAB; i++) {
          let obj = {}
          arr2.push(obj);
          arr1.push(obj)
        }
        arr2.unshift(obj)
        this.setData({
          numB: arr1,
          numA: arr2.slice(0, arr2.length - 1)
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  //判断球类
  judgmentBall: function (name, projectNow) {
    if (name == '台球') {
      projectNow.nameSon = 'icon_dj_tq.png'
    } else if (name == '羽毛球') {
      projectNow.nameSon = 'icon_dj_ymq.png'
    } else if (name == '乒乓球') {
      projectNow.nameSon = 'icon_dj_ppq.png'
    } else if (name == '篮球') {
      projectNow.nameSon = 'icon_dj_lq.png'
    } else if (name == '足球') {
      projectNow.nameSon = 'icon_dj_zq.png'
    } else if (name == '排球') {
      projectNow.nameSon = 'icon_dj_pq.png'
    } else if (name == '网球') {
      projectNow.nameSon = 'icon_dj_wq.png'
    } else if (name == '高尔夫球') {
      projectNow.nameSon = 'icon_dj_gef.png'
    }
  },
  //打赏费
  tips:function(e){
    this.setData({
      tips:e.detail.value
    })
  },
  comment:function(e){
    this.setData({
      comments:e.detail.value
    })
  },
  //发布活动
  release:function(){
    let { sportId,sportType,modeNum,siteid,timeLen,placeMoney,shouldered,sex,rank,tips,comments,numA,numB,venueid,refereeFee,TrialNum,refereegrade,startTime,timer}=this.data
    let numArr=[]
     let numBrr=[]
     for(let i in numA){
      if(numA[i].uuid!=undefined){
       let ko={
         team:1,
         uuid:numA[i].uuid
       }
       numArr.push(ko)
      }
     }
     for(let i in numB){
      if(numB[i].uuid!=undefined){
       let ko={
         team:2,
         uuid:numB[i].uuid
       }
       numBrr.push(ko)
      }
     }

     if(sportId==''){
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
     }else if(modeNum==''){
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
     }else if(siteid==''){
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
     }else{
      let obj={
        sportid:sportId,
        sportType:sportType,
        SportMode:modeNum,
        siteUid:siteid,
        StartTime:startTime+' '+timer,
        PlayTime:parseFloat(timeLen),
        SiteMoney:placeMoney,
        PaySiteMoneyType:shouldered=='AA'?1:2,
        teamSex:sex == '男' ? '0' : '1' || sex == '不限' ? '2' : '',
        LevelMax:parseFloat(rank.split('-')[0]) > parseFloat(rank.split('-')[1]) ? parseFloat(rank.split('-')[0]) : parseFloat(rank.split('-')[1]),
        LevelMin:parseFloat(rank.split('-')[0]) < parseFloat(rank.split('-')[1]) ? parseFloat(rank.split('-')[0]) : parseFloat(rank.split('-')[1]),
        Tips:tips,
        comments:comments,
        member:[...numArr,...numBrr],
        MoneyPerhour:'',
        venueid:venueid,
        refereefee:refereeFee,
        RefereeNumber:Number(TrialNum.slice(0, 1)),
        Refereegrade:refereegrade,
        number:numA.length+numB.length,
        isPublisher:1,
        Agemin:0,
        Agemax:0
      }
  
      app.globalData=obj
       wx.navigateTo({
         url: '/generalization/payFor/payFor?look=1',
       })
  
     }

    


  },
  commentsTwo:function(e){
    this.setData({
      commentsTwo:e.detail.value
    })
  },
  releaseTwo:function(){
   let {sportIdTwo,sportTypeTwo,siteidTwo,timeLenTwo,placeMoneyTwo,commentsTwo,startTimeTwo,timerTwo,venueidTwo}=this.data
     let obj={
      sportid:sportIdTwo,
      sportType:sportTypeTwo,
      SportMode:'',
      siteUid:siteidTwo,
      StartTime:startTimeTwo+' '+timerTwo,
      PlayTime:parseFloat(timeLenTwo),
      SiteMoney:placeMoneyTwo,
      comments:commentsTwo,
      venueid:venueidTwo,
     }
     app.userReserveVenue=obj
     wx.navigateTo({
      url: '/generalization/payFor/payFor?look=2',
    })
  },


})