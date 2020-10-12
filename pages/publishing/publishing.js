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
    arrayLan: [{
      id: 1,
      name: '娱乐模式'
    }, {
      id: 2,
      name: '竞技模式'
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

    TrialRaderArrTwo: [{
      id: 400,
      name: '国际级'
    }, {
      id: 300,
      name: '国家级'
    }, {
      id: 200,
      name: '中级'
    }, {
      id: 100,
      name: '初级'
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
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ],

    ageArr: [
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],

    ],
    shoulderedArr: [{
      id: 0,
      name: 'AA'
    }, {
      id: 1,
      name: '输方买单'
    }],
    mode: '请选择', //运动模式名称
    modeNum: '', //运动模式Id
    TrialNum: '0人', //裁判人数,
    Trial: 0, //选择裁判id
    TrialRader: '请选择', //裁判等级
    bookin: '', //预定完场地返回参数
    bookinTwo: '', //另一个
    siteid: '', //预定的哪个场馆的id
    siteName: '请选择', //当前场馆名称


    siteidTwo: '', //预定的哪个场馆的id
    siteNameTwo: '请选择', //当前场馆名称


    startTime: '', //开始时间
    startTimerof: '请选择',
    timer: '', //开始时间段
    timeLen: '无', //时长
    placeMoney: '0', //场地费

    startTimeTwo: '请选择', //开始时间
    timerTwo: '', //开始时间段
    timeLenTwo: '无', //时长
    placeMoneyTwo: '0', //场地费

    age: '不限',
    refereeFee: '', //裁判费
    sex: '不限', //性别
    rank: '不限', //级别
    numB: [], //b能参加人数
    numA: [], //a能参加人数
    mineDetail: [], //本人信息
    team: 0,
    indexTeam: 0,
    umpire: [], //裁判人数
    shouldered: 'AA',
    tips: 0, //打赏费
    comments: '', //备注
    venueid: '', //场地号
    venueidTwo: '',
    refereegrade: '', //裁判等级
    commentsTwo: '',
    cf: true,
    sportLeve:'',//发布者等级运动项目
    textKOp:'',
    titleKOp:'',
    closeKOp:false,
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  closeZhe:function(){
    this.setData({
      closeKOp:false
    })
  },
  sexQiu:function(e){
    if(e.currentTarget.dataset.type==1){
      this.setData({
        closeKOp: true,
        titleKOp: '性别要求说明',
        textKOp: '发布者对报名者的性别要求。如有裁判，裁判不受该性别要求限制'
      })
    } else if (e.currentTarget.dataset.type == 2){
      this.setData({
        closeKOp: true,
        titleKOp: '年龄要求说明',
        textKOp: '发布者对报名者的年龄要求。如有裁判，裁判不受该年龄要求限制'
      })
    } else if (e.currentTarget.dataset.type == 3) {
      this.setData({
        closeKOp: true,
        titleKOp: '技术等级说明',
        textKOp: '发布者对报名者该运动项目的技术级别要求。用户在某运动项目的技术级别由技术分决定，用户在竞技模式活动结束后会输赢技术分。如有裁判，裁判不受该要求限制'
      })
    } else if (e.currentTarget.dataset.type == 4 && e.currentTarget.dataset.mode!='陪练费用') {
      this.setData({
        closeKOp: true,
        titleKOp: '打赏费用说明',
        textKOp: '发布者打赏给报名者的费用，报名者均分该费用。提高活动匹配成功率。'
      })
    }
  
  },
  onLoad: function(options) {
   
    if (wx.getStorageSync('mode') !== '') {
      this.setData({
        mode: wx.getStorageSync('mode'),
        modeNum: wx.getStorageSync('modeNum')
      })
    }
    if (wx.getStorageSync('TrialPickerF') == '') {
      wx.setStorage({key: 'TrialPickerF',data:0,})
    }
    if( wx.getStorageSync('TrialRaderF')==''){
     this.setData({refereegrade:'',TrialRader:''})
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
      sportypeNameTwo: wx.getStorageSync('sportypeNameFTwo'),
      sex: wx.getStorageSync('sexF'),
      age: wx.getStorageSync('ageF'),
      rank: wx.getStorageSync('rankF'),
      TrialNum: this.data.TrialArray[wx.getStorageSync('TrialPickerF')].name,
      Trial: wx.getStorageSync('TrialPickerF'),
      refereegrade: wx.getStorageSync('TrialPickerF'),
      TrialRader: wx.getStorageSync('TrialRaderF'),
      shouldered:wx.getStorageSync('shoulderedF'),
      comments:wx.getStorageSync('commentsF')
    })
    if(wx.getStorageSync('shoulderedF')==''){
      this.setData({shouldered:'AA'})
    }
    if (wx.getStorageSync('sexF') == '') {
      wx.setStorage({
        key: 'sexF',
        data: '不限',
      })
    }
    if (wx.getStorageSync('ageF') == '') {
      wx.setStorage({
        key: 'ageF',
        data: '不限',
      })
    }
    if (wx.getStorageSync('rankF') == '') {
      wx.setStorage({
        key: 'rankF',
        data: '不限',
      })
    }

    wx.hideLoading()

  },

  swiper: function(e) {
    this.setData({
      indexSw: e.detail.current
    })
  },
  navTitle: function(e) {
    this.setData({
      indexSw: e.currentTarget.dataset.index
    })
  },
  sportsList: function() {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=1"
    })
  },

  sportsListTwo: function() {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=2"
    })
  },
  pickerTap: function() {
    if(this.data.sportypeName==''){
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else{
      this.setData({disabled:false})
    }
  },

  preferences:function(){
     wx.navigateTo({
      url: "/generalization/preferences/preferences"
    })
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
      if (this.data.array[e.detail.value].name == '我找陪练') {
        this.setData({
          rank: 4 + '-' + 10 + '级'
        })
        wx.setStorage({
          key: 'rankF',
          data: 4 + '-' + 10 + '级',
        })
      }
      wx.setStorage({
        key: 'mode',
        data: this.data.array[e.detail.value].name,
      })

      wx.setStorage({
        key: 'modeNum',
        data: Number(e.detail.value) + 1,
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
        console.log("失败")
      },
      () => {}
    )
    this.setData({
      TrialRader: this.data.TrialRaderArr[e.detail.value].name
    })
  },

  bindPickerAge: function(e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] != 0) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        age: '不限'
      })
      wx.setStorage({
        key: 'ageF',
        data: '不限',
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        age: 1 + '-' + e.detail.value[1] + '岁'
      })
      wx.setStorage({
        key: 'ageF',
        data: 1 + '-' + e.detail.value[1] + '岁',
      })
    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        age: e.detail.value[0] + '-' + 99 + '岁'
      })
      wx.setStorage({
        key: 'ageF',
        data: e.detail.value[0] + '-' + 99 + '岁',
      })
    } else {
      this.setData({
        age: e.detail.value[0] + '-' + e.detail.value[1] + '岁'
      })
      wx.setStorage({
        key: 'ageF',
        data: e.detail.value[0] + '-' + e.detail.value[1] + '岁',
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

  venues: function(e) {
    if (e.currentTarget.dataset == undefined) {
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
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype + '&falg=1'
      })
    }
  },

  venuesTwo: function(e) {
    if (e.currentTarget.dataset == undefined) {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype + '&falg=2'
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
  startDateTime: function(e) {
    if (this.data.siteid == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportId + '&sporttype=' + this.data.sportType + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&falg=1',
      })
    }
  },

  startDateTimeTwo: function(e) {
    if (this.data.siteidTwo == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportIdTwo + '&sporttype=' + this.data.sportTypeTwo + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&falg=2',
      })
    }
  },






  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

     this.onLoad()
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];

    if (wx.getStorageSync('bookin') !== '') {
      let kood = wx.getStorageSync('bookin').data[0].placeDate.slice(5, wx.getStorageSync('bookin').data[0].placeDate.lenght)
      let pmoney = wx.getStorageSync('bookin').data[0].placeMoney.toString()
      if (pmoney.indexOf('.') == -1) {
        this.setData({
          startTime: wx.getStorageSync('bookin').data[0].placeDate,
          startTimerof: kood.replace('-', '月') + '日',
          timer: wx.getStorageSync('bookin').data[0].placeTime,
          timeLen: wx.getStorageSync('bookin').data[0].placeTimeLen,
          placeMoney: wx.getStorageSync('bookin').data[0].placeMoney + '.00',
          venueid: wx.getStorageSync('bookin').data[0].placeNun
        })
      } else {
        this.setData({
          startTime: wx.getStorageSync('bookin').data[0].placeDate,
          startTimerof: kood.replace('-', '月') + '日',
          timer: wx.getStorageSync('bookin').data[0].placeTime,
          timeLen: wx.getStorageSync('bookin').data[0].placeTimeLen,
          placeMoney: wx.getStorageSync('bookin').data[0].placeMoney,
          venueid: wx.getStorageSync('bookin').data[0].placeNun
        })
      }


      util.request("/api/getcaipanf", {
          'name': this.data.refereegrade,
          'sportid': this.data.sportId,
          'number': Number(this.data.TrialNum.slice(0, 1)),
          'duration': parseFloat(wx.getStorageSync('bookin').data[0].placeTimeLen)
        }, "post",
        (res) => {
          let ref = res.data.data.toString()
          if (ref.indexOf('.') == -1) {
            this.setData({
              refereeFee: res.data.data + '.00'
            })
          } else {
            this.setData({
              refereeFee: res.data.data
            })
          }

        },
        () => {
          console.log("失败")
        },
        () => {}
      )

    }

    if (wx.getStorageSync('bookinTwo') !== '') {
      this.setData({
        startTimeTwo: wx.getStorageSync('bookinTwo').data[0].placeDate,
        timerTwo: wx.getStorageSync('bookinTwo').data[0].placeTime,
        timeLenTwo: wx.getStorageSync('bookinTwo').data[0].placeTimeLen,
        placeMoneyTwo: wx.getStorageSync('bookinTwo').data[0].placeMoney,
        venueidTwo: wx.getStorageSync('bookinTwo').data[0].placeNun
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
        sportypeName: currPage.data.sportsList.nametwo,
        startTime: '',
        startTimerof: '请选择',
        timer: '',
        timeLen: '请选择',
        placeMoney: 0,
        venueid: '',
        siteid: 0,
        siteName: '请选择',
        mode: '请选择',
        modeNum: 0
      })
      this.setData({disabled:false})
      wx.setStorage({
        key: 'mode',
        data: '',
      })
      if (currPage.data.sportsList.sporttype == 5) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 7) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 10) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 11) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 13) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 14) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 15) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 16) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 12) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 9) {
        this.setData({
          cf: false
        })
      } else if (currPage.data.sportsList.sporttype == 12) {
        this.setData({
          cf: false
        })
      }else{
        this.setData({
          cf: true
        })
      }
      wx.removeStorage({
        key: 'bookin',
        success(res) {
          console.log(res)
        }
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
              heightLevel: res.data.data.userHightLevel.level,
              name: res.data.data.userHightLevel.nameSon,
              uuid: res.data.data.uuid
            }
            let uuidArr = []
            for (let i in this.data.numA) {
              uuidArr.push(this.data.numA[i].uuid)
              uuidArr.push(this.data.numB[i].uuid)
            }
            if (uuidArr.indexOf(res.data.data.uuid) != -1) {
              wx.showToast({
                title: '不可重复邀请',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            } else {
              this.data.numA[this.data.indexTeam] = obj
              this.setData({
                numA: this.data.numA
              })
            }
          } else if (this.data.team == 2) {

            let projectNow = res.data.data.userHightLevel
            let name = res.data.data.userHightLevel.name
            this.judgmentBall(name, projectNow)
            let obj = {
              imgURL: res.data.data.imgURL,
              heightLevel: res.data.data.userHightLevel.level,
              name: res.data.data.userHightLevel.nameSon,
              uuid: res.data.data.uuid
            }
            let uuidArr = []
            for (let i in this.data.numB) {
              uuidArr.push(this.data.numA[i].uuid)
              uuidArr.push(this.data.numB[i].uuid)
            }
            if (uuidArr.indexOf(res.data.data.uuid) != -1) {
              wx.showToast({
                title: '不可重复邀请',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            } else {
              this.data.numB[this.data.indexTeam] = obj
              this.setData({
                numB: this.data.numB
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
        sportypeNameTwo: currPage.data.sportsListTwo.nametwo,
        startTimeTwo: '',
        timerTwo: '',
        timeLenTwo: '请选择',
        placeMoneyTwo: 0,
        venueidTwo: 0
      })
      wx.removeStorage({
        key: 'bookinTwo',
        success(res) {
          console.log(res)
        }
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
  invitaional: function(e) {
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
        indexTeam: e.currentTarget.dataset.index
      })
      wx.navigateTo({
        url: '/generalization/Invitational/Invitational?sportid=' + this.data.sportId + '&sex=' + sex + '&rankMax=' + rankMax + '&rankMin=' + rankMin + '&team=' + e.currentTarget.dataset.team,
      })



    }



  },



  onKO: function() {
    util.Request("/api/getUserDetailInfo", {
        uuid: wx.getStorageSync('uuid')
      }, "get",
      (res) => {
        let loopdnk = res.data.data
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
        util.Request("/api/getSportLevel", {
            'sportId': this.data.sportId
          }, "get",
          (res) => {
           this.setData({
             sportLeve:res.data.data
           })

            let projectNow = loopdnk.userHightLevel

            let name = res.data.data.name

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
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  //判断球类
  judgmentBall: function(name, projectNow) {
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
  tips: function(e) {
    this.setData({
      tips: e.detail.value
    })
  },
  comment: function(e) {
    this.setData({
      comments: e.detail.value
    })
  },
  //发布活动
  release: function() {
    let {
      sportId,
      sportType,
      modeNum,
      siteid,
      timeLen,
      placeMoney,
      shouldered,
      age,
      sex,
      rank,
      tips,
      comments,
      numA,
      numB,
      venueid,
      refereeFee,
      TrialNum,
      refereegrade,
      startTime,
      timer
    } = this.data
    let numArr = []
    let numBrr = []
    for (let i in numA) {
      if (numA[i].uuid != undefined) {
        let ko = {
          team: 1,
          uuid: numA[i].uuid
        }
        numArr.push(ko)
      }
    }
    for (let i in numB) {
      if (numB[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numB[i].uuid
        }
        numBrr.push(ko)
      }
    }

    if (sportId == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (modeNum == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (siteid == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else if(startTime==''){
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let obj = {
        sportid: sportId,
        sportType: sportType,
        SportMode: modeNum,
        siteUid: siteid,
        StartTime: startTime + ' ' + timer,
        PlayTime: parseFloat(timeLen),
        SiteMoney: placeMoney,
        PaySiteMoneyType: shouldered == 'AA' ? 1 : 2,
        teamSex: sex == '男' ? '0' : '' || sex == '不限' ? '2' : '' || sex == '女' ? '1' : '',
        LevelMax: rank == '不限' ? '0' : parseFloat(rank.split('-')[1]),
        LevelMin: rank == '不限' ? '0' : parseFloat(rank.split('-')[0]),
        Tips: tips,
        comments: comments,
        member: [...numArr, ...numBrr],
        MoneyPerhour: '',
        venueid: venueid,
        refereefee: refereeFee,
        RefereeNumber: Number(TrialNum.slice(0, 1)),
        Refereegrade: refereegrade,
        number: numA.length + numB.length,
        isPublisher: 1,
        Agemin: age == '不限' ? '0' : parseFloat(age.split('-')[0]),
        Agemax: age == '不限' ? '0' : parseFloat(age.split('-')[1]),
      }
      app.globalData = obj
      wx.navigateTo({
        url: '/generalization/payFor/payFor?look=1',
      })

    }




  },
  commentsTwo: function(e) {
    this.setData({
      commentsTwo: e.detail.value
    })
  },
  releaseTwo: function() {
    let {
      sportIdTwo,
      sportTypeTwo,
      siteidTwo,
      timeLenTwo,
      placeMoneyTwo,
      commentsTwo,
      startTimeTwo,
      timerTwo,
      venueidTwo
    } = this.data
    let obj = {
      sportid: sportIdTwo,
      sportType: sportTypeTwo,
      SportMode: '',
      siteUid: siteidTwo,
      StartTime: startTimeTwo + ' ' + timerTwo,
      PlayTime: parseFloat(timeLenTwo),
      SiteMoney: placeMoneyTwo,
      comments: commentsTwo,
      venueid: venueidTwo,
    }
    app.userReserveVenue = obj

    wx.navigateTo({
      url: '/generalization/payFor/payFor?look=2',
    })
  },


})