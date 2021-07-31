const util = require('../../utils/util.js')

var app = getApp();
Page({
  data: {
    checkedTwoyou: 0,
    masking: false,
    contentSon: 0,
    indexSw: 0,
    sportId: '', //一级分类id
    sportType: '', //二级分类id
    sportName: '请选择', //一级分类名称
    sportypeName: '', //二级分类名称
    sportIdFour: '', //一级分类id
    sportTypeFour: '', //二级分类id
    sportNameFour: '请选择', //一级分类名称
    sportypeNameFour: '', //二级分类名称

    sportIdFive: '', //一级分类idreleaseTwo
    sportTypeFive: '', //二级分类id
    sportNameFive: '请选择', //一级分类名称
    sportypeNameFive: '', //二级分类名称

    sportIdSix: '', //一级分类id
    sportTypeSix: '', //二级分类id
    sportNameSix: '请选择', //一级分类名称
    sportypeNameSix: '', //二级分类名称

    sportypeNameThree: '',
    siteNameThree: '请选择',
    checked: false,
    sportIdTwo: '', //一级分类id
    sportTypeTwo: '', //二级分类id
    sportNameTwo: '请选择', //一级分类名称
    sportypeNameTwo: '', //二级分类名称
    uuidArr: [],
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

    arrayLanThree: [{
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
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    ],

    ageArr: [
      ['不限', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
      ['不限', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
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
    TrialNumSix: '0人', //裁判人数,
    TrialSix: 0, //选择裁判id
    TrialRader: '三级', //裁判等级
    TrialRaderThree: '三级',
    TrialRaderSix: '三级', //裁判等级
    bookin: '', //预定完场地返回参数
    bookinTwo: '', //另一个
    siteid: '', //预定的哪个场馆的id
    siteName: '请选择', //当前场馆名称
    modeThree: '请选择', //运动模式名称
    modeNumThree: '', //运动模式Id

    modeFour: '我是陪练', //运动模式名称
    modeNumFour: '3', //运动模式Id

    modeFive: '我找陪练', //运动模式名称
    modeNumFive: '4', //运动模式Id

    modeSix: '竞技模式', //运动模式名称
    modeNumSix: '2', //运动模式Id

    siteidTwo: '', //预定的哪个场馆的id
    siteNameTwo: '请选择', //当前场馆名称

    siteidFour: '',
    siteNameFour: '请选择', //当前场馆名称
    siteNameFive: '请选择', //当前场馆名称
    siteNameSix: '请选择', //当前场馆名称
    startTime: '', //开始时间
    startTimerof: '请选择',
    startTimerofFour: '请选择',
    timer: '', //开始时间段
    timeLen: '无', //时长
    placeMoney: '0', //场地费,
    sumMoney: '0', //真实场地费
    placeMoneyThree: '0',
    startTimeTwo: '请选择', //开始时间
    timerTwo: '', //开始时间段
    timeLenTwo: '无', //时长
    placeMoneyTwo: '0', //场地费

    age: '不限',
    ageThree: '不限',
    ageFour: '不限',
    ageFive: '不限',
    ageSix: '不限',
    refereeFee: 0.00, //裁判费
    refereeFeeThree: '0.00',
    refereeFeeSix: '0.00',
    sex: '不限', //性别
    sexThree: '不限', //性别
    sexSix: '不限', //性别
    sexFour: '不限', //性别
    sexFive: '不限', //性别
    rank: '不限', //级别
    rankThree: '不限', //级别
    rankFour: '不限', //级别
    rankFive: '不限', //级别
    rankSix: '不限', //级别
    numB: [], //b能参加人数
    numA: [], //a能参加人数
    numC: [], //a能参加人数

    numBThree: [], //b能参加人数
    numAThree: [], //a能参加人数
    numCThree: [], //a能参加人数


    numBFour: [], //b能参加人数
    numAFour: [], //a能参加人数
    numCFour: [], //a能参加人数

    numBFive: [], //b能参加人数
    numAFive: [], //a能参加人数
    numCFive: [], //a能参加人数

    mineDetail: [], //本人信息
    team: 0,
    indexTeam: 0,
    umpire: [], //裁判人数
    umpireSix: [], //裁判人数
    umpireThree: [],
    shouldered: 'AA',
    shoulderedThree: 'AA',
    shoulderedFour: '练习方买单',
    shoulderedFive: '练习方买单',
    shoulderedSix: '输方买单',
    tips: '', //打赏费
    tipsThree: '', //打赏费
    tipsFour: '', //陪练费
    tipsFive: '', //陪练费
    comments: '', //备注
    venueid: '', //场地号
    venueidTwo: '',
    breakup: '',
    breakupTwo: [],
    refereegrade: '', //裁判等级
    commentsTwo: '',
    commentsFour: '',
    commentsFive: '',
    cf: true,
    cfTwo: true,
    sportLeve: '', //发布者等级运动项目
    textKOp: '',
    titleKOp: '',
    closeKOp: false,
    disabled: true,
    disabledThree: true,
    img: '',
    SiteSumMoney: '0',
    bannerTop: '', //banner图
    displayTxt: [],
    displayTxtTwo: [],
    displayTxtThree: [],
    displayTxtFive: [],
    displayTxtSix: [],
    timeOut: true,
    tipsSix: '(选填)',
    switch1Checked: false,
    cbotContentCloas: false,
    rule: '',
    ruleFlag: false,
    certificate: 0
  },

 

  contentTgp: function () {
    util.Request("/api/AddOffsetRoll", {
        uuid: wx.getStorageSync('uuid')
      }, "post",
      (res) => {
        if (res.data.code == 2000) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1500,
            mask: true
          })
          this.setData({
            certificate: 0
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }


      },
      () => {},
      () => {

      }
    )
  },


  checkedTwoyou: function () {
    if (this.data.checkedTwoyou == 0) {
      this.setData({
        checkedTwoyou: 1
      })
    } else {
      this.setData({
        checkedTwoyou: 0
      })
    }
  },
  ruleFlag: function () {
    this.setData({
      ruleFlag: false
    })
  },
  rules: function () {
    util.Request("/api/getDepositRule", {
        type: 3
      }, "get",
      (res) => {
        this.setData({
          rule: res.data.data.rule,
          ruleFlag: true
        })
      },
      () => {
      },
      () => {}
    )
  },
  cbotContentCloasOne: function () {
    this.setData({
      cbotContentCloas: true
    })
  },

  cbotContentCloas: function () {
    this.setData({
      cbotContentCloas: false
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  closeZhe: function () {
    this.setData({
      closeKOp: false
    })
  },
  sexQiu: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        closeKOp: true,
        titleKOp: '性别要求说明',
        textKOp: '发布者对报名者的性别要求。如有裁判，裁判不受该性别要求限制'
      })
    } else if (e.currentTarget.dataset.type == 2) {
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
    } else if (e.currentTarget.dataset.type == 4) {
      if (this.data.indexSw == 2) {
        this.setData({
          closeKOp: true,
          titleKOp: '组织费用说明',
          textKOp: '奖励给组织者的费用，该费用也可包含球类耗材的费用，如羽毛球、网球、乒乓球等，由报名者均摊'
        })
      } else if (this.data.indexSw == 0) {
        this.setData({
          closeKOp: true,
          titleKOp: '出场费用说明',
          textKOp: '报名者支付给发布者的费用，报名者均摊该费用。人气高、技术好的发布者可以酌情填写该费用。'
        })
      } else if (this.data.indexSw == 4 || this.data.indexSw == 3) {
        this.setData({
          closeKOp: true,
          titleKOp: '陪练费用说明',
          textKOp: '1) 练习方支付给陪练方的费用；2）陪练费用=陪练单价*时长+场地费/2'
        })
      }
    }
  },
  onLoad: function (options) {
    if (options.indexSw != undefined) {
      this.setData({
        indexSw: options.indexSw
      })
    }
    util.request("/api/getIndexBannerRelease", {
        'type': options.indexSw == 1 ? 1 : options.indexSw == 2 ? 6 : options.indexSw == 4 ? 3 : options.indexSw == 5 ? 4 : options.indexSw == 0 ? 5 : 5,
      }, "get",
      (res) => {
        this.setData({
          bannerTop: [res.data.data]
        })

      },
      () => {
      },
      () => {}
    )

    this.setData({
      img: util.API,
    })
    if (wx.getStorageSync('mode') !== '') {
      this.setData({
        mode: wx.getStorageSync('mode'),
        modeNum: wx.getStorageSync('modeNum')
      })
    }
    if (wx.getStorageSync('modeThree') !== '') {
      this.setData({
        mode: wx.getStorageSync('modeThree'),
        modeNum: wx.getStorageSync('modeNumThree')
      })
    }
    if (wx.getStorageSync('TrialPickerF') == '') {
      wx.setStorage({
        key: 'TrialPickerF',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialPickerFThree') == '') {
      wx.setStorage({
        key: 'TrialPickerFThree',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialPickerFSix') == '') {
      wx.setStorage({
        key: 'TrialPickerFSix',
        data: 0,
      })
    }


    if (wx.getStorageSync('TrialRaderF') == '') {
      this.setData({
        refereegrade: '',
        TrialRader: '三级'
      })
    }
    if (wx.getStorageSync('TrialRaderFThree') == '') {
      this.setData({
        refereegradeThree: '',
        TrialRaderThree: '三级'
      })
    }

    if (wx.getStorageSync('TrialRaderFSix') == '') {
      this.setData({
        TrialRaderSix: '三级'
      })
    }
    if (wx.getStorageSync('shoulderedF') == '') {
      wx.setStorage({
        key: 'shoulderedF',
        data: 'AA',
      })
    }

    if (wx.getStorageSync('shoulderedFThree') == '') {
      wx.setStorage({
        key: 'shoulderedFThree',
        data: 'AA',
      })
    }

    if (wx.getStorageSync('sexF') == '') {
      wx.setStorage({
        key: 'sexF',
        data: '不限',
      })
    }
    if (wx.getStorageSync('sexFThree') == '') {
      wx.setStorage({
        key: 'sexFThree',
        data: '不限',
      })
    }

    if (wx.getStorageSync('sexFFour') == '') {
      wx.setStorage({
        key: 'sexFFour',
        data: '不限',
      })
    }
    if (wx.getStorageSync('sexFFive') == '') {
      wx.setStorage({
        key: 'sexFFive',
        data: '不限',
      })
    }
    if (wx.getStorageSync('sexFSix') == '') {
      wx.setStorage({
        key: 'sexFSix',
        data: '不限',
      })
    }
    if (wx.getStorageSync('ageF') == '') {
      wx.setStorage({
        key: 'ageF',
        data: '不限',
      })
    }
    if (wx.getStorageSync('ageFThree') == '') {
      wx.setStorage({
        key: 'ageFThree',
        data: '不限',
      })
    }
    if (wx.getStorageSync('ageFFour') == '') {
      wx.setStorage({
        key: 'ageFFour',
        data: '不限',
      })
    }
    if (wx.getStorageSync('ageFFive') == '') {
      wx.setStorage({
        key: 'ageFFive',
        data: '不限',
      })
    }
    if (wx.getStorageSync('ageFSix') == '') {
      wx.setStorage({
        key: 'ageFSix',
        data: '不限',
      })
    }
    if (wx.getStorageSync('rankF') == '') {
      wx.setStorage({
        key: 'rankF',
        data: '不限',
      })
    }

    if (wx.getStorageSync('rankFThree') == '') {
      wx.setStorage({
        key: 'rankFThree',
        data: '不限',
      })
    }
    if (wx.getStorageSync('rankFFour') == '') {
      wx.setStorage({
        key: 'rankFFour',
        data: '不限',
      })
    }
    if (wx.getStorageSync('rankFFive') == '') {
      wx.setStorage({
        key: 'rankFFive',
        data: '不限',
      })
    }
    if (wx.getStorageSync('rankFSix') == '') {
      wx.setStorage({
        key: 'rankFSix',
        data: '不限',
      })
    }
    this.setData({
      sportId: wx.getStorageSync('sportIdF'),
      sportType: wx.getStorageSync('sportTypeF'),
      sportName: wx.getStorageSync('sportNameF'),
      sportypeName: wx.getStorageSync('sportypeNameF'),
      sportIdThree: wx.getStorageSync('sportIdFThree'),
      sportTypeThree: wx.getStorageSync('sportTypeFThree'),
      sportNameThree: wx.getStorageSync('sportNameFThree'),
      sportypeNameThree: wx.getStorageSync('sportypeNameFThree'),
      sportIdTwo: wx.getStorageSync('sportIdFTwo'),
      sportTypeTwo: wx.getStorageSync('sportTypeFTwo'),
      sportNameTwo: wx.getStorageSync('sportNameFTwo'),
      sportypeNameTwo: wx.getStorageSync('sportypeNameFTwo'),
      sportIdFour: wx.getStorageSync('sportIdFFour'),
      sportTypeFour: wx.getStorageSync('sportTypeFFour'),
      sportNameFour: wx.getStorageSync('sportNameFFour'),
      sportypeNameFour: wx.getStorageSync('sportypeNameFFour'),
      sportIdFive: wx.getStorageSync('sportIdFFive'),
      sportTypeFive: wx.getStorageSync('sportTypeFFive'),
      sportNameFive: wx.getStorageSync('sportNameFFive'),
      sportypeNameFive: wx.getStorageSync('sportypeNameFFive'),
      sportIdSix: wx.getStorageSync('sportIdFSix'),
      sportTypeSix: wx.getStorageSync('sportTypeFSix'),
      sportNameSix: wx.getStorageSync('sportNameFSix'),
      sportypeNameSix: wx.getStorageSync('sportypeNameFSix'),
      sex: wx.getStorageSync('sexF'),
      sexThree: wx.getStorageSync('sexFThree'),
      sexFour: wx.getStorageSync('sexFFour'),
      sexFive: wx.getStorageSync('sexFFive'),
      sexSix: wx.getStorageSync('sexFSix'),
      age: wx.getStorageSync('ageF'),
      ageThree: wx.getStorageSync('ageFThree'),
      ageFour: wx.getStorageSync('ageFFour'),
      ageFive: wx.getStorageSync('ageFFive'),
      ageSix: wx.getStorageSync('ageFSix'),
      rank: wx.getStorageSync('rankF'),
      rankThree: wx.getStorageSync('rankFThree'),
      rankFour: wx.getStorageSync('rankFFour'),
      rankFive: wx.getStorageSync('rankFFive'),
      rankSix: wx.getStorageSync('rankFSIx'),
      TrialNum: this.data.TrialArray[wx.getStorageSync('TrialPickerF')].name == undefined ? '' : this.data.TrialArray[wx.getStorageSync('TrialPickerF')].name,
      Trial: wx.getStorageSync('TrialPickerF'),
      refereegrade: wx.getStorageSync('TrialRaderF'),
      TrialRader: wx.getStorageSync('TrialRaderF') == '' ? '三级' : wx.getStorageSync('TrialRaderF'),
      umpire: wx.getStorageSync('umpire'),
      umpireSix: wx.getStorageSync('umpireSix'),
      umpireThree: wx.getStorageSync('umpireThree'),
      TrialNumThree: this.data.TrialArray[wx.getStorageSync('TrialPickerFThree')].name == undefined ? '' : this.data.TrialArray[wx.getStorageSync('TrialPickerFThree')].name,
      TrialThree: wx.getStorageSync('TrialPickerFThree'),
      refereegradeThree: wx.getStorageSync('TrialRaderFThree'),
      TrialRaderThree: wx.getStorageSync('TrialRaderFThree') == '' ? '三级' : wx.getStorageSync('TrialRaderFThree'),
      TrialNumSix: this.data.TrialArray[wx.getStorageSync('TrialPickerFSix')].name == undefined ? '' : this.data.TrialArray[wx.getStorageSync('TrialPickerFSix')].name,
      TrialSix: wx.getStorageSync('TrialPickerFSix'),
      refereegradeSix: wx.getStorageSync('TrialRaderFSix'),
      TrialRaderSix: wx.getStorageSync('TrialRaderFSix') == '' ? '三级' : wx.getStorageSync('TrialRaderFSix'),


      shouldered: wx.getStorageSync('shoulderedF')==''?'AA':wx.getStorageSync('shoulderedF'),
      shoulderedThree: wx.getStorageSync('shoulderedFThree'),
      comments: wx.getStorageSync('commentsF'),
      commentsFour: wx.getStorageSync('commentsFFour'),
      commentsFive: wx.getStorageSync('commentsFFive')
    })
    if (wx.getStorageSync('sportTypeF') == 23) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 1) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 2) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 3) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 4) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 6) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 5) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 7) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 8) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 10) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 11) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 13) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 14) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 15) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 16) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 12) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 9) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 12) {
      this.setData({
        cfTwo: false
      })
    } else if (wx.getStorageSync('sportTypeF') == 20) {
      this.setData({
        cfTwo: 'no'
      })
    } else if (wx.getStorageSync('sportTypeF') == 21) {
      this.setData({
        cfTwo: 'no'
      })
    } else {
      this.setData({
        cfTwo: true
      })
    }
    if (wx.getStorageSync('sportTypeFThree') == 23) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 1) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 2) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 3) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 4) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 6) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 5) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 7) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 8) {
      this.setData({
        cf: false
      })
    }else if (wx.getStorageSync('sportTypeFThree') == 10) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 11) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 13) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 14) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 15) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 16) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 12) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 9) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 12) {
      this.setData({
        cf: false
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 20) {
      this.setData({
        cf: 'no'
      })
    } else if (wx.getStorageSync('sportTypeFThree') == 21) {
      this.setData({
        cf: 'no'
      })
    } else {
      this.setData({
        cf: true
      })
    }


    let idgo = wx.getStorageSync('sportIdF')
    if (idgo == 1 || idgo == 2 || idgo == 7) {
      this.setData({
        comments: '球，球拍各参与者均须自备'
      })
    } else if (idgo == 4) {
      this.setData({
        comments: '发布者带篮球'
      })
    } else if (idgo == 5) {
      this.setData({
        comments: '发布者带足球'
      })
    } else if (idgo == 6) {
      this.setData({
        comments: '发布者带排球'
      })
    } else {
      this.setData({
        comments: wx.getStorageSync('commentsF')
      })
    }

    let idgoTwo = wx.getStorageSync('sportIdFTwo')
    if (idgoTwo == 1 || idgoTwo == 2 || idgoTwo == 7) {
      this.setData({
        commentsTwo: '球，球拍各参与者均须自备'
      })
    } else if (idgoTwo == 4) {
      this.setData({
        commentsTwo: '发布者带篮球'
      })
    } else if (idgoTwo == 5) {
      this.setData({
        commentsTwo: '发布者带足球'
      })
    } else if (idgoTwo == 6) {
      this.setData({
        commentsTwo: '发布者带排球'
      })
    } else {
      this.setData({
        commentsTwo: wx.getStorageSync('commentsFTwo')
      })
    }

    let idgoFour = wx.getStorageSync('sportIdFFour')
    if (idgoFour == 1 || idgoFour == 2 || idgoFour == 7) {
      this.setData({
        commentsFour: '球，球拍各参与者均须自备'
      })
    } else if (idgoFour == 4) {
      this.setData({
        commentsFour: '发布者带篮球'
      })
    } else if (idgoFour == 5) {
      this.setData({
        commentsFour: '发布者带足球'
      })
    } else if (idgoFour == 6) {
      this.setData({
        commentsFour: '发布者带排球'
      })
    } else {
      this.setData({
        commentsFour: wx.getStorageSync('commentsFFour')
      })
    }

    let idgoFive = wx.getStorageSync('sportIdFFive')
    if (idgoFive == 1 || idgoFive == 2 || idgoFive == 7) {
      this.setData({
        commentsFive: '球，球拍各参与者均须自备'
      })
    } else if (idgoFour == 4) {
      this.setData({
        commentsFive: '发布者带篮球'
      })
    } else if (idgoFive == 5) {
      this.setData({
        commentsFive: '发布者带足球'
      })
    } else if (idgoFive == 6) {
      this.setData({
        commentsFive: '发布者带排球'
      })
    } else {
      this.setData({
        commentsFive: wx.getStorageSync('commentsFFive')
      })
    }

    wx.removeStorage({
      key: 'bookin'
    })

    wx.removeStorage({
      key: 'bookinTwo'
    })

    wx.removeStorage({
      key: 'bookinThree'
    })

    wx.removeStorage({
      key: 'bookinFour'
    })

    wx.removeStorage({
      key: 'bookinFive'
    })

    wx.removeStorage({
      key: 'bookinSix'
    })


    wx.hideLoading()

  },


  swiper: function (e) {
    if (e.detail.current == 5) {
      util.Request("/api/ActivityWhitelist", {}, "post",
        (res) => {
          if (res.data.code == 2000) {
            this.setData({
              indexSw: 5
            })
            util.request("/api/getIndexBannerRelease", {
                'type': 4,
              }, "get",
              (res) => {
                this.setData({
                  bannerTop: [res.data.data]
                })
              },
              () => {
              },
              () => {}
            )
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        },
        () => {
        },
        () => {}
      )
    } else {
      this.setData({
        indexSw: e.detail.current
      })
      let j = e.detail.current == 2 ? 6 : e.detail.current == 3 ? 2 : e.detail.current == 4 ? 3 : e.detail.current == 5 ? 4 : e.detail.current == 0 ? 5 : e.detail.current == 1 ? 1 : ''
      util.request("/api/getIndexBannerRelease", {
          'type': j,
        }, "get",
        (res) => {
          this.setData({
            bannerTop: [res.data.data]
          })
        },
        () => {
        },
        () => {}
      )
    }
  },
  navTitle: function (e) {

    if (e.currentTarget.dataset.index == 5) {
      util.Request("/api/ActivityWhitelist", {}, "post",
        (res) => {
          if (res.data.code == 2000) {
            this.setData({
              indexSw: 5
            })
            util.request("/api/getIndexBannerRelease", {
                'type': 4,
              }, "get",
              (res) => {
                this.setData({
                  bannerTop: [res.data.data]
                })
              },
              () => {
              },
              () => {}
            )
            this.onKO()
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        },
        () => {
        },
        () => {}
      )
    } else {
      this.setData({
        indexSw: e.currentTarget.dataset.index
      })
      let j = e.currentTarget.dataset.index == 2 ? 6 : e.currentTarget.dataset.index == 3 ? 2 : e.currentTarget.dataset.index == 4 ? 3 : e.currentTarget.dataset.index == 5 ? 4 : e.currentTarget.dataset.index == 0 ? 5 : e.currentTarget.dataset.index == 1 ? 1 : ''
      util.request("/api/getIndexBannerRelease", {
          'type': j,
        }, "get",
        (res) => {
          this.setData({
            bannerTop: [res.data.data]
          })
        },
        () => {
        },
        () => {}
      )
      this.onShow()
    }
  },
  sportsList: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=1"
    })
    this.setData({
      uuidArr: [],
      umpire: []
    })
    this.onKO()
  },

  sportsListSix: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=6"
    })
    this.onKO()
  },

  sportsListFive: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=5"
    })


  },

  sportsListTwo: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=2"
    })
  },

  sportsListThree: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=3"
    })

  },

  sportsListFour: function () {
    wx.navigateTo({
      url: "/pages/sportsList/sportsList?flag=4"
    })

  },



  pickerTap: function () {
    if (this.data.sportypeName == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        disabled: false
      })
    }
  },
  pickerTapThree: function () {
    if (this.data.sportypeNameThree == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        disabledThree: false
      })
    }
  },



  preferences: function () {
    wx.navigateTo({
      url: "/generalization/preferences/preferences"
    })
  },

  picker: function (e) {
    wx.removeStorage({
      key: 'TrialPickerF'
    })
    wx.removeStorage({
      key: 'TrialRader'
    })
    wx.removeStorage({
      key: 'TrialRaderF'
    })
    wx.removeStorage({
      key: 'refereeFee'
    })
    wx.removeStorage({
      key: 'refereegrade'
    })

    this.setData({
      shouldered: 'AA'
    })

    if (this.data.sportName == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.array[e.detail.value].name == '我是陪练' && this.data.sportLeve.level < 4) {
      wx.showToast({
        title: '您的运动等级不够',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      if(wx.getStorageSync('bookin')!=''&&e.detail.value==0){
        util.Request("/api/display", {
          SportType: this.data.sportType,
          type: Number(this.data.indexSw) + 1,
          status: 1,
          referee:0,
          siteMoney: wx.getStorageSync('bookin').data[0].placeMoney + '.00',
          lr: wx.getStorageSync('bookin').data[0].lr,
          openPrice: wx.getStorageSync('bookin').data[0].openPrice
        }, "post",
        (res) => {
          this.setData({
            displayTxt: res.data.data
          })
        },
        () => {
        },
        () => {}
      )
      }
      


      this.setData({
        mode: this.data.array[e.detail.value].name,
        modeNum: Number(e.detail.value) + 1,
        shouldered: this.data.array[e.detail.value].name == '娱乐模式' ? 'AA' : 'AA'
      })

      if (this.data.array[e.detail.value].name != '竞技模式') {
        this.setData({
          TrialNum: '0人',
          umpire: []
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




  pickerThree: function (e) {
    wx.removeStorage({
      key: 'TrialPickerFThree'
    })
    wx.removeStorage({
      key: 'TrialRaderThree'
    })
    wx.removeStorage({
      key: 'TrialRaderFThree'
    })
    wx.removeStorage({
      key: 'refereeFeeThree'
    })
    wx.removeStorage({
      key: 'refereegradeThree'
    })

    if (this.data.sportNameThree == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        modeThree: this.data.arrayLanThree[e.detail.value].name,
        modeNumThree: Number(e.detail.value) + 1,
        shoulderedThree: 'AA'
      })

      if (this.data.arrayLanThree[e.detail.value].name != '竞技模式') {
        this.setData({
          TrialNumThree: '0人',
          umpireThree: []
        })
      }

      wx.setStorage({
        key: 'modeThree',
        data: this.data.arrayLanThree[e.detail.value].name,
      })

      wx.setStorage({
        key: 'modeNumThree',
        data: Number(e.detail.value) + 1,
      })
    }

  },







  TrialPicker: function (e) {
    this.setData({
      TrialNum: this.data.TrialArray[e.detail.value].name,
      Trial: e.detail.value,
      shouldered: 'AA'
    })
    wx.setStorage({
      key: 'TrialPickerF',
      data: e.detail.value,
    }) 
    wx.setStorage({
      key: 'shoulderedF',
      data: 'AA',
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
    wx.setStorageSync('umpire', arr1)
    util.request("/api/getcaipanf", {
        'name': this.data.TrialRader,
        'sportid': this.data.sportId,
        'number': Number(this.data.TrialArray[e.detail.value].name.slice(0, 1)),
        'duration': parseFloat(this.data.timeLen) == null ? 0 : parseFloat(this.data.timeLen)
      }, "post",
      (res) => {
        this.setData({
          refereeFee: res.data.data.toFixed(2)
        })
        if (wx.getStorageSync('bookin') != '') {
          util.Request("/api/display", {
              SportType: this.data.sportType,
              type: Number(this.data.indexSw) + 1,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookin').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookin').data[0].lr,
              openPrice: wx.getStorageSync('bookin').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxt: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        }




        wx.setStorage({
          key: 'refereeFee',
          data: res.data.data.toFixed(2),
        })
        this.onShow()
      },
      () => {
      },
      () => {}
    )

  },

  TrialPickerSix: function (e) {
    this.setData({
      TrialNumSix: this.data.TrialArray[e.detail.value].name,
      TrialSix: e.detail.value,
    })
    wx.setStorage({
      key: 'TrialPickerFSix',
      data: e.detail.value,
    })

    let TrialNumSix = e.detail.value
    let arr1 = []
    for (var j = 0; j < TrialNumSix; j++) {
      let obj = {
        name: '报名'
      }
      arr1.push(obj)
    }
    this.setData({
      umpireSix: arr1
    })
    wx.setStorageSync('umpireSix', arr1)

    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderSix,
        'sportid': this.data.sportIdSix,
        'number': Number(this.data.TrialArray[e.detail.value].name.slice(0, 1)),
        'duration': parseFloat(this.data.timeLenSix) == null ? 0 : parseFloat(this.data.timeLenSix)
      }, "post",
      (res) => {
        this.setData({
          refereeFeeSix: res.data.data.toFixed(2)
        })

        if (wx.getStorageSync('bookinSix') != '') {
          util.Request("/api/display", {
              SportType: this.data.sportTypeSix,
              type: 1,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookinSix').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookinSix').data[0].lr,
              openPrice: wx.getStorageSync('bookinSix').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxtSix: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        }


        wx.setStorage({
          key: 'refereeFeeSix',
          data: res.data.data.toFixed(2),
        })
        this.onShow()
      },
      () => {
      },
      () => {}
    )
  },

  TrialPickerThree: function (e) {
    this.setData({
      TrialNumThree: this.data.TrialArray[e.detail.value].name,
      TrialThree: e.detail.value
    })
    wx.setStorage({
      key: 'TrialPickerFThree',
      data: e.detail.value,
    })

    let TrialNumThree = e.detail.value
    let arr1 = []
    for (var j = 0; j < TrialNumThree; j++) {
      let obj = {
        name: '报名'
      }
      arr1.push(obj)
    }
    this.setData({
      umpireThree: arr1
    })
    wx.setStorageSync('umpireThree', arr1)
    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderThree,
        'sportid': this.data.sportIdThree,
        'number': Number(this.data.TrialArray[e.detail.value].name.slice(0, 1)),
        'duration': parseFloat(this.data.timeLenThree) == null ? 0 : parseFloat(this.data.timeLenThree)
      }, "post",
      (res) => {
        this.setData({
          refereeFeeThree: res.data.data.toFixed(2)
        })
        if (wx.getStorageSync('bookinThree') != '') {
          util.Request("/api/display", {
              SportType: this.data.sportTypeThree,
              type: 2,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookinThree').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookinThree').data[0].lr,
              openPrice: wx.getStorageSync('bookinThree').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxtThree: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        }
        wx.setStorage({
          key: 'refereeFeeThree',
          data: res.data.data.toFixed(2),
        })
        this.onShow()
      },
      () => {
      },
      () => {}
    )
  },




  TrialRader: function (e) {
    this.setData({
      refereegrade: this.data.TrialRaderArr[e.detail.value].name
    })
    wx.setStorage({
      key: 'TrialRaderF',
      data: this.data.TrialRaderArr[e.detail.value].name,
    })

    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderArr[e.detail.value].name,
        'sportid': this.data.sportId,
        'number': Number(this.data.TrialNum.slice(0, 1)),
        'duration': parseFloat(this.data.timeLen)
      }, "post",
      (res) => {
        this.setData({
          refereeFee: res.data.data.toFixed(2)
        })

        if (wx.getStorageSync('bookin') != '') {
          util.Request("/api/display", {
              SportType: this.data.sportType,
              type: Number(this.data.indexSw) + 1,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookin').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookin').data[0].lr,
              openPrice: wx.getStorageSync('bookin').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxt: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        }







        wx.setStorage({
          key: 'refereeFee',
          data: res.data.data.toFixed(2),
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

  TrialRaderThree: function (e) {
    this.setData({
      refereegrade: this.data.TrialRaderArr[e.detail.value].name
    })
    wx.setStorage({
      key: 'TrialRaderFThree',
      data: this.data.TrialRaderArr[e.detail.value].name,
    })

    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderArr[e.detail.value].name,
        'sportid': this.data.sportIdThree,
        'number': Number(this.data.TrialNumThree.slice(0, 1)),
        'duration': parseFloat(this.data.timeLenThree)
      }, "post",
      (res) => {
        this.setData({
          refereeFeeThree: res.data.data.toFixed(2)
        })

        if (wx.getStorageSync('bookinThree') != '') {
          util.Request("/api/display", {
              SportType: this.data.sportTypeThree,
              type: 2,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookinThree').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookinThree').data[0].lr,
              orgPrice: this.data.tipsThree == '' ? 0 : this.data.tipsThree,
              openPrice: wx.getStorageSync('bookinThree').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxtThree: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        }


        wx.setStorage({
          key: 'refereeFeeThree',
          data: res.data.data.toFixed(2),
        })

      },
      () => {
      },
      () => {}
    )
    this.setData({
      TrialRaderThree: this.data.TrialRaderArr[e.detail.value].name
    })
  },

  TrialRaderSix: function (e) {
    this.setData({
      refereegradeSix: this.data.TrialRaderArr[e.detail.value].name
    })
    wx.setStorage({
      key: 'TrialRaderFSix',
      data: this.data.TrialRaderArr[e.detail.value].name,
    })

    util.request("/api/getcaipanf", {
        'name': this.data.TrialRaderArr[e.detail.value].name,
        'sportid': this.data.sportIdSix,
        'number': Number(this.data.TrialNumSix.slice(0, 1)),
        'duration': parseFloat(this.data.timeLenSix)
      }, "post",
      (res) => {
        this.setData({
          refereeFeeSix: res.data.data.toFixed(2)
        })
        if (wx.getStorageSync('bookinSix') != '') {
          util.Request("/api/display", {
              SportType: this.data.sportTypeSix,
              type: 1,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookinSix').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookinSix').data[0].lr,
              openPrice: wx.getStorageSync('bookinSix').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxtSix: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        }



        wx.setStorage({
          key: 'refereeFeeSix',
          data: res.data.data.toFixed(2),
        })

      },
      () => {
      },
      () => {}
    )
    this.setData({
      TrialRaderSix: this.data.TrialRaderArr[e.detail.value].name
    })
  },



  bindPickerAge: function (e) {
    if ((e.detail.value[0] + 9) > (e.detail.value[1] + 9)) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) == 9) {
      this.setData({
        age: '不限'
      })
      wx.setStorage({
        key: 'ageF',
        data: '不限',
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) !== 70) {
      this.setData({
        age: 10 + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageF',
        data: 10 + '-' + (e.detail.value[1] + 9) + '岁',
      })
    } else if (e.detail.value[0] !== 9 && e.detail.value[1] == 70) {
      this.setData({
        age: (e.detail.value[0] + 9) + '-' + 70 + '岁'
      })
      wx.setStorage({
        key: 'ageF',
        data: (e.detail.value[0] + 9) + '-' + 70 + '岁',
      })
    } else {
      this.setData({
        age: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageF',
        data: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁',
      })
    }

  },


  bindPickerAgeThree: function (e) {
    if ((e.detail.value[0] + 9) > (e.detail.value[1] + 9)) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) == 9) {
      this.setData({
        ageThree: '不限'
      })
      wx.setStorage({
        key: 'ageFThree',
        data: '不限',
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) !== 70) {
      this.setData({
        ageThree: 10 + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFThree',
        data: 10 + '-' + (e.detail.value[1] + 9) + '岁',
      })
    } else if (e.detail.value[0] !== 9 && e.detail.value[1] == 70) {
      this.setData({
        ageThree: (e.detail.value[0] + 9) + '-' + 70 + '岁'
      })
      wx.setStorage({
        key: 'ageFThree',
        data: (e.detail.value[0] + 9) + '-' + 70 + '岁',
      })
    } else {
      this.setData({
        ageThree: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFThree',
        data: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁',
      })
    }

  },


  bindPickerAgeFour: function (e) {
    if ((e.detail.value[0] + 9) > (e.detail.value[1] + 9)) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) == 9) {
      this.setData({
        ageFour: '不限'
      })
      wx.setStorage({
        key: 'ageFFour',
        data: '不限',
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) !== 70) {
      this.setData({
        ageFour: 10 + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFFour',
        data: 10 + '-' + (e.detail.value[1] + 9) + '岁',
      })
    } else if (e.detail.value[0] !== 9 && e.detail.value[1] == 70) {
      this.setData({
        ageFour: (e.detail.value[0] + 9) + '-' + 70 + '岁'
      })
      wx.setStorage({
        key: 'ageFFour',
        data: (e.detail.value[0] + 9) + '-' + 70 + '岁',
      })
    } else {
      this.setData({
        ageFour: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFFour',
        data: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁',
      })
    }
  },


  bindPickerAgeFive: function (e) {
    if ((e.detail.value[0] + 9) > (e.detail.value[1] + 9)) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) == 9) {
      this.setData({
        ageFive: '不限'
      })
      wx.setStorage({
        key: 'ageFFive',
        data: '不限',
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) !== 70) {
      this.setData({
        ageFive: 10 + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFFive',
        data: 10 + '-' + (e.detail.value[1] + 9) + '岁',
      })
    } else if (e.detail.value[0] !== 9 && e.detail.value[1] == 70) {
      this.setData({
        ageFive: (e.detail.value[0] + 9) + '-' + 70 + '岁'
      })
      wx.setStorage({
        key: 'ageFFive',
        data: (e.detail.value[0] + 9) + '-' + 70 + '岁',
      })
    } else {
      this.setData({
        ageFive: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFFvie',
        data: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁',
      })
    }
  },

  bindPickerAgeSix: function (e) {
    if ((e.detail.value[0] + 9) > (e.detail.value[1] + 9)) {
      wx.showToast({
        title: '最小年龄不能高于最大年龄',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) == 9) {
      this.setData({
        ageSix: '不限'
      })
      wx.setStorage({
        key: 'ageFSix',
        data: '不限',
      })
    } else if ((e.detail.value[0] + 9) == 9 && (e.detail.value[1] + 9) !== 70) {
      this.setData({
        ageSix: 10 + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFSix',
        data: 10 + '-' + (e.detail.value[1] + 9) + '岁',
      })
    } else if (e.detail.value[0] !== 9 && e.detail.value[1] == 70) {
      this.setData({
        ageSix: (e.detail.value[0] + 9) + '-' + 70 + '岁'
      })
      wx.setStorage({
        key: 'ageFSix',
        data: (e.detail.value[0] + 9) + '-' + 70 + '岁',
      })
    } else {
      this.setData({
        ageSix: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁'
      })
      wx.setStorage({
        key: 'ageFSix',
        data: (e.detail.value[0] + 9) + '-' + (e.detail.value[1] + 9) + '岁',
      })
    }

  },


  bindPickerShouldered: function (e) {
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
      wx.setStorageSync('shoulderedF', this.data.shoulderedArr[e.detail.value].name)
    }

  },
  bindPickerShoulderedThree: function (e) {
    if (this.data.modeNumThree == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        shoulderedThree: this.data.shoulderedArr[e.detail.value].name
      })
      wx.setStorageSync('shoulderedFThree', this.data.shoulderedArr[e.detail.value].name)
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

    } else if (this.data.mode == '请选择') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype + '&falg=0'
      })
    }
  },

  venuesTwo: function (e) {
    if (e.currentTarget.dataset.sportId == '') {
      wx.showToast({
        title: '请选择运动项目',
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

  venuesThree: function (e) {
    if (e.currentTarget.dataset == undefined) {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else if (this.data.modeThree == '请选择') {
      wx.showToast({
        title: '请选择运动模式',
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

  venuesFour: function (e) {
    if (e.currentTarget.dataset.sportid == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype + '&falg=3'
      })
    }
  },
  venuesFive: function (e) {
    if (e.currentTarget.dataset.sportid == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })

    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype + '&falg=4'
      })
    }
  },

  venuesSix: function (e) {
    if (e.currentTarget.dataset.sportid == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: "/generalization/map/map?sportid=" + e.currentTarget.dataset.sportid + '&sporttype=' + e.currentTarget.dataset.sporttype + '&falg=5'
      })
    }
  },


  bindPickerSex: function (e) {
    this.setData({
      sex: this.data.sexArr[e.detail.value].name
    })
    let ko = this.data.sexArr[e.detail.value].name
    wx.setStorage({
      key: 'sexF',
      data: ko,
    })
  },

  bindPickerSexThree: function (e) {
    this.setData({
      sexThree: this.data.sexArr[e.detail.value].name
    })
    let ko = this.data.sexArr[e.detail.value].name
    wx.setStorage({
      key: 'sexFThree',
      data: ko,
    })
  },

  bindPickerSexFour: function (e) {
    this.setData({
      sexFour: this.data.sexArr[e.detail.value].name
    })
    let ko = this.data.sexArr[e.detail.value].name
    wx.setStorage({
      key: 'sexFFour',
      data: ko,
    })
  },

  bindPickerSexFive: function (e) {
    this.setData({
      sexFive: this.data.sexArr[e.detail.value].name
    })
    let ko = this.data.sexArr[e.detail.value].name
    wx.setStorage({
      key: 'sexFFive',
      data: ko,
    })
  },


  bindPickerSexSix: function (e) {
    this.setData({
      sexSix: this.data.sexArr[e.detail.value].name
    })
    let ko = this.data.sexArr[e.detail.value].name
    wx.setStorage({
      key: 'sexFSix',
      data: ko,
    })
  },


  bindPickerRank: function (e) {
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
        rank: e.detail.value[0] + '-' + 15 + '级'
      })
      wx.setStorage({
        key: 'rankF',
        data: e.detail.value[0] + '-' + 15 + '级',
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


  bindPickerRankThree: function (e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] !== 0) {
      wx.showToast({
        title: '最小级别不能高于最大级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        rankThree: '不限'
      })
      wx.setStorage({
        key: 'rankFThree',
        data: '不限',
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        rankThree: 1 + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFThree',
        data: 1 + '-' + e.detail.value[1] + '级',
      })

    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        rankThree: e.detail.value[0] + '-' + 15 + '级'
      })
      wx.setStorage({
        key: 'rankFThree',
        data: e.detail.value[0] + '-' + 15 + '级',
      })
    } else {
      this.setData({
        rankThree: e.detail.value[0] + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFThree',
        data: e.detail.value[0] + '-' + e.detail.value[1] + '级',
      })
    }
  },




  bindPickerRankFour: function (e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] !== 0) {
      wx.showToast({
        title: '最小级别不能高于最大级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        rankFour: '不限'
      })
      wx.setStorage({
        key: 'rankFFour',
        data: '不限',
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        rankFour: 1 + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFFour',
        data: 1 + '-' + e.detail.value[1] + '级',
      })

    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        rankFour: e.detail.value[0] + '-' + 15 + '级'
      })
      wx.setStorage({
        key: 'rankFFour',
        data: e.detail.value[0] + '-' + 15 + '级',
      })
    } else {
      this.setData({
        rankFour: e.detail.value[0] + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFFour',
        data: e.detail.value[0] + '-' + e.detail.value[1] + '级',
      })
    }
  },


  bindPickerRankFive: function (e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] !== 0) {
      wx.showToast({
        title: '最小级别不能高于最大级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        rankFive: '不限'
      })
      wx.setStorage({
        key: 'rankFFive',
        data: '不限',
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        rankFive: 1 + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFFive',
        data: 1 + '-' + e.detail.value[1] + '级',
      })

    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        rankFive: e.detail.value[0] + '-' + 15 + '级'
      })
      wx.setStorage({
        key: 'rankFFive',
        data: e.detail.value[0] + '-' + 15 + '级',
      })
    } else {
      this.setData({
        rankFive: e.detail.value[0] + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFFive',
        data: e.detail.value[0] + '-' + e.detail.value[1] + '级',
      })
    }
  },


  bindPickerRankSix: function (e) {
    if (e.detail.value[0] > e.detail.value[1] && e.detail.value[1] !== 0) {
      wx.showToast({
        title: '最小级别不能高于最大级别',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.setData({
        rankSix: '不限'
      })
      wx.setStorage({
        key: 'rankFSix',
        data: '不限',
      })
    } else if (e.detail.value[0] == 0 && e.detail.value[1] !== 0) {
      this.setData({
        rankSix: 1 + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFSix',
        data: 1 + '-' + e.detail.value[1] + '级',
      })

    } else if (e.detail.value[0] !== 0 && e.detail.value[1] == 0) {
      this.setData({
        rankSix: e.detail.value[0] + '-' + 15 + '级'
      })
      wx.setStorage({
        key: 'rankFSix',
        data: e.detail.value[0] + '-' + 15 + '级',
      })
    } else {
      this.setData({
        rankSix: e.detail.value[0] + '-' + e.detail.value[1] + '级'
      })
      wx.setStorage({
        key: 'rankFSix',
        data: e.detail.value[0] + '-' + e.detail.value[1] + '级',
      })
    }
  },



  startDateTime: function (e) {
    if (this.data.siteid == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportId + '&sporttype=' + this.data.sportType + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&flagTwo=1' + '&hood=1',
      })
    }
  },

  startDateTimeTwo: function (e) {
    if (this.data.siteidTwo == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportIdTwo + '&sporttype=' + this.data.sportTypeTwo + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&flagTwo=1' + '&hood=2',
      })
    }
  },

  startDateTimeThree: function (e) {
    if (this.data.siteidThree == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportIdThree + '&sporttype=' + this.data.sportTypeThree + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&flagTwo=2' + '&hood=3',
      })
    }
  },

  startDateTimeFour: function (e) {
    if (this.data.siteidFour == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportIdFour + '&sporttype=' + this.data.sportTypeFour + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&flagTwo=2' + '&hood=4',
      })
    }
  },

  startDateTimeFive: function (e) {
    if (this.data.siteidFive == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportIdFive + '&sporttype=' + this.data.sportTypeFive + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&flagTwo=2' + '&hood=5',
      })
    }
  },
  startDateTimeSix: function (e) {
    if (this.data.siteidSix == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid=' + this.data.sportIdSix + '&sporttype=' + this.data.sportTypeSix + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&flagTwo=2' + '&hood=6',
      })
    }
  },


  //我是陪练
  releaseFour: function () {
    let {
      sportIdFour,
      sportTypeFour,
      modeNumFour,
      siteidFour,
      timeLenFour,
      placeMoneyFour,
      ageFour,
      sexFour,
      rankFour,
      tipsFour,
      commentsFour,
      numAFour,
      numBFour,
      numCFour,
      venueidFour,
      startTimeFour,
      timerFour,
      siteNameFour,
      sumMoneyFour
    } = this.data
    let numArr = []
    let numBrr = []
    let numCrr = []
    for (let i in numAFour) {
      if (numAFour[i].uuid != undefined) {
        let ko = {
          team: 1,
          uuid: numAFour[i].uuid
        }
        numArr.push(ko)
      }
    }
    for (let i in numBFour) {
      if (numBFour[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numBFour[i].uuid
        }
        numBrr.push(ko)
      }
    }
    for (let i in numCFour) {
      if (numCFour[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numCFour[i].uuid
        }
        numCrr.push(ko)
      }
    }

    if (sportIdFour == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (modeNumFour == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (siteidFour == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (startTimeFour == '') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.checkedTwoyou != 1) {
      wx.showToast({
        title: '请阅读并同意《补偿金规则》',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let obj = {
        sportid: sportIdFour,
        sportType: sportTypeFour,
        SportMode: modeNumFour,
        siteUid: siteidFour,
        StartTime: startTimeFour + ' ' + timerFour,
        PlayTime: parseFloat(timeLenFour),
        SiteMoney: placeMoneyFour,
        PaySiteMoneyType: 3,
        teamSex: sexFour == '男' ? '0' : '' || sexFour == '不限' ? '2' : '' || sexFour == '女' ? '1' : '',
        LevelMax: rankFour == '不限' ? '15' : parseFloat(rankFour.split('-')[1]),
        LevelMin: rankFour == '不限' ? '1' : parseFloat(rankFour.split('-')[0]),
        comments: commentsFour,
        member: [...numArr, ...numBrr, ...numCrr],
        MoneyPerhour: tipsFour == '' ? 0 : tipsFour,
        venueid: venueidFour,
        Agemin: ageFour == '不限' ? '10' : parseFloat(ageFour.split('-')[0]),
        Agemax: ageFour == '不限' ? '70' : parseFloat(ageFour.split('-')[1]),
        SiteSumMoney: sumMoneyFour,
        openPrice: wx.getStorageSync('bookinFour').data[0].openPrice,
      }
      app.globalData.teamText = '陪练方'
      util.Request("/api/userAddtrainee", obj, "post",
        (res) => {
          if (res.data.code == 2000) {

            wx.navigateTo({
              url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&typeInfo=2' + '&referee=' + res.data.data.referee + '&status=1' + '&time=' + res.data.data.CreateTime + '&ok=0' + '&lr=' + wx.getStorageSync('bookinFour').data[0].lr,
            })

          } else {
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


  //我找陪练
  releaseFive: function () {
    let {
      sportIdFive,
      sportTypeFive,
      modeNumFive,
      siteidFive,
      timeLenFive,
      placeMoneyFive,
      shoulderedFive,
      ageFive,
      sexFive,
      rankFive,
      tipsFive,
      commentsFive,
      numAFive,
      numBFive,
      numCFive,
      venueidFive,
      startTimeFive,
      timerFive,
      siteNameFive,
      sumMoneyFive
    } = this.data
    let numArr = []
    let numBrr = []
    let numCrr = []
    for (let i in numAFive) {
      if (numAFive[i].uuid != undefined) {
        let ko = {
          team: 1,
          uuid: numAFive[i].uuid
        }
        numArr.push(ko)
      }
    }
    for (let i in numBFive) {
      if (numBFive[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numBFive[i].uuid
        }
        numBrr.push(ko)
      }
    }
    for (let i in numCFive) {
      if (numCFive[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numCFive[i].uuid
        }
        numCrr.push(ko)
      }
    }

    if (sportIdFive == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (modeNumFive == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (siteidFive == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (startTimeFive == '') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let obj = {
        sportid: sportIdFive,
        sportType: sportTypeFive,
        SportMode: modeNumFive,
        siteUid: siteidFive,
        StartTime: startTimeFive + ' ' + timerFive,
        PlayTime: parseFloat(timeLenFive),
        SiteMoney: placeMoneyFive,
        PaySiteMoneyType: 4,
        teamSex: sexFive == '男' ? '0' : '' || sexFive == '不限' ? '2' : '' || sexFive == '女' ? '1' : '',
        LevelMax: rankFive == '不限' ? '15' : parseFloat(rankFive.split('-')[1]),
        LevelMin: rankFive == '不限' ? '1' : parseFloat(rankFive.split('-')[0]),
        Tips: 0,
        Reward: 0,
        Accompany: tipsFive == '' ? 0 : tipsFive,
        comments: commentsFive,
        member: [...numArr, ...numBrr, ...numCrr],
        MoneyPerhour: '',
        venueid: venueidFive,
        refereefee: 0,
        RefereeNumber: 0,
        Refereegrade: 0,
        number: numAFive.length + numBFive.length + numCFive.length,
        isPublisher: 1,
        Agemin: ageFive == '不限' ? '10' : parseFloat(ageFive.split('-')[0]),
        Agemax: ageFive == '不限' ? '70' : parseFloat(ageFive.split('-')[1]),
        SiteSumMoney: sumMoneyFive,
        name: '我找陪练',
        teamText: '练习方',
        openPrice: wx.getStorageSync('bookinFive').data[0].openPrice,
        lr: wx.getStorageSync('bookinFive').data[0].lr,
        organization: 0
      }
      app.globalData = obj
      app.deductibles = []
      app.envelope = []
      wx.navigateTo({
        url: '/generalization/payFor/payFor?look=1',
      })
    }

  },





  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    app.envelope = []
    app.deductibles = []


    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];


    util.Request("/api/frame", {}, "post",
      (res) => {
        this.setData({
          certificate: res.data.other
        })
        wx.hideLoading()
      },
      () => {},
      () => {

      }
    )

    ///////运动伙伴
    if (wx.getStorageSync('bookin') != '' && this.data.indexSw == 0) {
      let kood = wx.getStorageSync('bookin').data[0].placeDate.slice(5, wx.getStorageSync('bookin').data[0].placeDate.lenght)

      this.setData({
        startTime: wx.getStorageSync('bookin').data[0].placeDate,
        startTimerof: kood.replace('-', '月') + '日',
        timer: wx.getStorageSync('bookin').data[0].placeTime,
        timeLen: wx.getStorageSync('bookin').data[0].placeTimeLen,
        placeMoney: wx.getStorageSync('bookin').data[0].placeMoney,
        venueid: wx.getStorageSync('bookin').data[0].placeNun,
        sumMoney: wx.getStorageSync('bookin').data[0].placeMoneyTwo,
      })


      util.request("/api/getcaipanf", {
          'name': this.data.TrialRader,
          'sportid': this.data.sportId,
          'number': Number(this.data.TrialNum.slice(0, 1)),
          'duration': parseFloat(wx.getStorageSync('bookin').data[0].placeTimeLen)
        }, "post",
        (res) => {
          this.setData({
            refereeFee: res.data.data.toFixed(2)
          })
          util.Request("/api/display", {
              SportType: this.data.sportType,
              type: Number(this.data.indexSw) + 1,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookin').data[0].placeMoney,
              lr: wx.getStorageSync('bookin').data[0].lr,
              openPrice: wx.getStorageSync('bookin').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxt: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
          wx.setStorageSync('refereeFee', res.data.data.toFixed(2))

        },
        () => {
        },
        () => {}
      )

    } else {
      this.setData({
        startTime: '', //开始时间
        startTimerof: '请选择',
        timer: '', //开始时间段
        timeLen: '无', //时长
        placeMoney: '0', //场地费
        displayTxt: [],
      })
    }



    ///////组织活动
    if (wx.getStorageSync('bookinThree') != '' && this.data.indexSw == 2) {
      let kood = wx.getStorageSync('bookinThree').data[0].placeDate.slice(5, wx.getStorageSync('bookinThree').data[0].placeDate.lenght)



      this.setData({
        startTimeThree: wx.getStorageSync('bookinThree').data[0].placeDate,
        startTimerofThree: kood.replace('-', '月') + '日',
        timerThree: wx.getStorageSync('bookinThree').data[0].placeTime,
        timeLenThree: wx.getStorageSync('bookinThree').data[0].placeTimeLen,
        placeMoneyThree: wx.getStorageSync('bookinThree').data[0].placeMoney,
        venueidThree: wx.getStorageSync('bookinThree').data[0].placeNun,
        sumMoneyThree: wx.getStorageSync('bookinThree').data[0].placeMoneyTwo + '.00',
      })


      util.request("/api/getcaipanf", {
          'name': this.data.TrialRaderThree,
          'sportid': this.data.sportIdThree,
          'number': Number(this.data.TrialNumThree.slice(0, 1)),
          'duration': parseFloat(wx.getStorageSync('bookinThree').data[0].placeTimeLen)
        }, "post",
        (res) => {
          this.setData({
            refereeFeeThree: res.data.data.toFixed(2)
          })
          util.Request("/api/display", {
              SportType: this.data.sportTypeThree,
              type: 2,
              status: 1,
              referee: res.data.data,
              siteMoney: wx.getStorageSync('bookinThree').data[0].placeMoney,
              orgPrice: this.data.tipsThree == '' ? 0 : this.data.tipsThree,
              lr: wx.getStorageSync('bookinThree').data[0].lr,
              openPrice: wx.getStorageSync('bookinThree').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxtThree: res.data.data
              })

            },
            () => {
            },
            () => {}
          )
          wx.setStorageSync('refereeFeeThree', res.data.data.toFixed(2))

        },
        () => {
        },
        () => {}
      )

    } else {
      this.setData({
        startTimeThree: '', //开始时间
        startTimerofThree: '请选择',
        timerThree: '', //开始时间段
        timeLenThree: '无', //时长
        placeMoneyThree: '0', //场地费
        displayTxtThree: [],
      })
    }










    ////////////仅预订场馆
    if (wx.getStorageSync('bookinTwo') !== '' && this.data.indexSw == 1) {
      setTimeout(() => {
        let to = []
        let hop = wx.getStorageSync('bookinTwo').data[0].breakup.split(',')
        for (let i in hop) {
          let lp = {}
          lp.name = hop[i].split('-')[0]
          lp.num = hop[i].split('-')[1]
          lp.money = hop[i].split('-')[2]
          to.push(lp)
        }
        util.Request("/api/display", {
            SportType: this.data.sportTypeTwo,
            type: 3,
            status: 1,
            referee: 0,
            siteMoney: wx.getStorageSync('bookinTwo').data[0].placeMoney + '.00',
            lr: wx.getStorageSync('bookinTwo').data[0].lr,
            openPrice: wx.getStorageSync('bookinTwo').data[0].openPrice
          }, "post",
          (res) => {
            this.setData({
              displayTxtTwo: res.data.data
            })
          },
          () => {
          },
          () => {}
        )

        this.setData({
          startTimeTwo: wx.getStorageSync('bookinTwo').data[0].placeDate,
          timerTwo: wx.getStorageSync('bookinTwo').data[0].placeTime,
          timeLenTwo: wx.getStorageSync('bookinTwo').data[0].realData == '' ? wx.getStorageSync('bookinTwo').data[0].placeTimeLen : wx.getStorageSync('bookinTwo').data[0].realData,
          placeMoneyTwo: wx.getStorageSync('bookinTwo').data[0].placeMoney,
          venueidTwo: wx.getStorageSync('bookinTwo').data[0].placeNun,
          breakup: wx.getStorageSync('bookinTwo').data[0].breakup,
          breakupTwo: to,
          SiteSumMoney: wx.getStorageSync('bookinTwo').data[0].placeMoneyTwo
        })
      }, 500)
    } else {
      this.setData({
        startTimeTwo: '请选择',
        timerTwo: '',
        timeLenTwo: '请选择',
        placeMoneyTwo: '0',
        venueidTwo: '',
        breakup: '',
        breakupTwo: [],
        SiteSumMoney: '',
        displayTxtTwo: [],
      })
    }




    ///////我是陪练
    if (wx.getStorageSync('bookinFour') != '' && wx.getStorageSync('bookinFour').data[0].placeDate != undefined && this.data.indexSw == 3) {

      util.request("/api/getAccmoney", {
          'grade': '4',
          'CityName': wx.getStorageSync('cityInfo'),
          'SportId': this.data.sportIdFour,
          'PlayTime': parseFloat(wx.getStorageSync('bookinFour').data[0].placeTimeLen),
          'SiteMoney': wx.getStorageSync('bookinFour').data[0].placeMoney
        }, "post",
        (res) => {
          this.setData({
            tipsFour: res.data.data
          })
        },
        () => {
        },
        () => {}
      )




      let kood = wx.getStorageSync('bookinFour').data[0].placeDate.slice(5, wx.getStorageSync('bookinFour').data[0].placeDate.lenght)
      let pmoney = wx.getStorageSync('bookinFour').data[0].placeMoney.toString()
      if (pmoney.indexOf('.') == -1) {
        setTimeout(() => {
          this.setData({
            startTimeFour: wx.getStorageSync('bookinFour').data[0].placeDate,
            startTimerofFour: kood.replace('-', '月') + '日',
            timerFour: wx.getStorageSync('bookinFour').data[0].placeTime,
            timeLenFour: wx.getStorageSync('bookinFour').data[0].placeTimeLen,
            placeMoneyFour: wx.getStorageSync('bookinFour').data[0].placeMoney + '.00',
            venueidFour: wx.getStorageSync('bookinFour').data[0].placeNun,
            sumMoneyFour: wx.getStorageSync('bookinFour').data[0].placeMoneyTwo + '.00',
          })
        }, 500)

      } else {
        setTimeout(() => {
          this.setData({
            startTimeFour: wx.getStorageSync('bookinFour').data[0].placeDate,
            startTimerofFour: kood.replace('-', '月') + '日',
            timerFour: wx.getStorageSync('bookinFour').data[0].placeTime,
            timeLenFour: wx.getStorageSync('bookinFour').data[0].placeTimeLen,
            placeMoneyFour: wx.getStorageSync('bookinFour').data[0].placeMoney,
            venueidFour: wx.getStorageSync('bookinFour').data[0].placeNun,
            sumMoneyFour: wx.getStorageSync('bookinFour').data[0].placeMoneyTwo + '.00',
          })
        }, 500)
      }


    } else {
      this.setData({
        startTimeFour: '', //开始时间
        startTimerofFour: '请选择',
        timerFour: '', //开始时间段
        timeLenFour: '无', //时长
        placeMoneyFour: '0', //场地费
      })
    }



    ///////我找陪练
    if (wx.getStorageSync('bookinFive') != '' && wx.getStorageSync('bookinFive').data[0].placeDate != undefined && this.data.indexSw == 4) {
      util.request("/api/getAccmoney", {
          'grade': '4',
          'CityName': wx.getStorageSync('cityInfo'),
          'SportId': this.data.sportIdFive,
          'PlayTime': parseFloat(wx.getStorageSync('bookinFive').data[0].placeTimeLen),
          'SiteMoney': wx.getStorageSync('bookinFive').data[0].placeMoney
        }, "post",
        (res) => {
          this.setData({
            tipsFive: res.data.data
          })
          util.Request("/api/display", {
              SportType: this.data.sportTypeFive,
              type: 4,
              status: 1,
              referee: '0',
              siteMoney: wx.getStorageSync('bookinFive').data[0].placeMoney + '.00',
              lr: wx.getStorageSync('bookinFive').data[0].lr,
              openPrice: wx.getStorageSync('bookinFive').data[0].openPrice,
              pPrice: res.data.data
            }, "post",
            (res) => {
              this.setData({
                displayTxtFive: res.data.data
              })
            },
            () => {
            },
            () => {}
          )
        },
        () => {
        },
        () => {}
      )



      let kood = wx.getStorageSync('bookinFive').data[0].placeDate.slice(5, wx.getStorageSync('bookinFive').data[0].placeDate.lenght)
      let pmoney = wx.getStorageSync('bookinFive').data[0].placeMoney.toString()
      if (pmoney.indexOf('.') == -1) {
        setTimeout(() => {
          this.setData({
            startTimeFive: wx.getStorageSync('bookinFive').data[0].placeDate,
            startTimerofFive: kood.replace('-', '月') + '日',
            timerFive: wx.getStorageSync('bookinFive').data[0].placeTime,
            timeLenFive: wx.getStorageSync('bookinFive').data[0].placeTimeLen,
            placeMoneyFive: wx.getStorageSync('bookinFive').data[0].placeMoney + '.00',
            venueidFive: wx.getStorageSync('bookinFive').data[0].placeNun,
            sumMoneyFive: wx.getStorageSync('bookinFive').data[0].placeMoneyTwo + '.00',
          })
        }, 500)


      } else {


        setTimeout(() => {
          this.setData({
            startTimeFive: wx.getStorageSync('bookinFive').data[0].placeDate,
            startTimerofFive: kood.replace('-', '月') + '日',
            timerFive: wx.getStorageSync('bookinFive').data[0].placeTime,
            timeLenFive: wx.getStorageSync('bookinFive').data[0].placeTimeLen,
            placeMoneyFive: wx.getStorageSync('bookinFive').data[0].placeMoney,
            venueidFive: wx.getStorageSync('bookinFive').data[0].placeNun,
            sumMoneyFive: wx.getStorageSync('bookinFive').data[0].placeMoneyTwo + '.00',
          })
        }, 500)
      }


    } else {
      this.setData({
        startTimeFive: '', //开始时间
        startTimerofFive: '请选择',
        timerFive: '', //开始时间段
        timeLenFive: '无', //时长
        placeMoneyFive: '0', //场地费
        displayTxtFive: [],
      })
    }


    ///////我是馆主
    if (wx.getStorageSync('bookinSix') != '' && wx.getStorageSync('bookinSix').data[0].placeDate != undefined && this.data.indexSw == 5) {


      let kood = wx.getStorageSync('bookinSix').data[0].placeDate.slice(5, wx.getStorageSync('bookinSix').data[0].placeDate.lenght)
      let pmoney = wx.getStorageSync('bookinSix').data[0].placeMoney.toString()
      if (pmoney.indexOf('.') == -1) {
        setTimeout(() => {
          this.setData({
            startTimeSix: wx.getStorageSync('bookinSix').data[0].placeDate,
            startTimerofSix: kood.replace('-', '月') + '日',
            timerSix: wx.getStorageSync('bookinSix').data[0].placeTime,
            timeLenSix: wx.getStorageSync('bookinSix').data[0].placeTimeLen,
            placeMoneySix: wx.getStorageSync('bookinSix').data[0].placeMoney + '.00',
            venueidSix: wx.getStorageSync('bookinSix').data[0].placeNun,
            sumMoneySix: wx.getStorageSync('bookinSix').data[0].placeMoneyTwo + '.00',
            refereeFeeSix: wx.getStorageSync('refereeFeeSix')
          })
        }, 500)

        util.Request("/api/display", {
            SportType: this.data.sportTypeSix,
            type: 1,
            status: 1,
            referee: wx.getStorageSync('refereeFeeSix'),
            siteMoney: wx.getStorageSync('bookinSix').data[0].placeMoney + '.00',
            lr: wx.getStorageSync('bookinSix').data[0].lr,
            openPrice: wx.getStorageSync('bookinSix').data[0].openPrice
          }, "post",
          (res) => {
            this.setData({
              displayTxtSix: res.data.data
            })
          },
          () => {
          },
          () => {}
        )
      } else {

        util.Request("/api/display", {
            SportType: this.data.sportType,
            type: 1,
            status: 1,
            referee: wx.getStorageSync('refereeFeeSix'),
            siteMoney: wx.getStorageSync('bookinSix').data[0].placeMoney + '.00',
            lr: wx.getStorageSync('bookinSix').data[0].lr,
            openPrice: wx.getStorageSync('bookinSix').data[0].openPrice
          }, "post",
          (res) => {
            this.setData({
              displayTxtSix: res.data.data
            })
          },
          () => {
          },
          () => {}
        )
        setTimeout(() => {
          this.setData({
            startTimeSix: wx.getStorageSync('bookinSix').data[0].placeDate,
            startTimerofSix: kood.replace('-', '月') + '日',
            timerSix: wx.getStorageSync('bookinSix').data[0].placeTime,
            timeLenSix: wx.getStorageSync('bookinSix').data[0].placeTimeLen,
            placeMoneySix: wx.getStorageSync('bookinSix').data[0].placeMoney,
            venueidSix: wx.getStorageSync('bookinSix').data[0].placeNun,
            sumMoneySix: wx.getStorageSync('bookinSix').data[0].placeMoneyTwo + '.00',
            refereeFeeSix: wx.getStorageSync('refereeFeeSix')
          })
        }, 500)
      }


      util.request("/api/getcaipanf", {
          'name': this.data.TrialRaderSix,
          'sportid': this.data.sportIdSix,
          'number': Number(this.data.TrialNumSix.slice(0, 1)),
          'duration': parseFloat(wx.getStorageSync('bookinSix').data[0].placeTimeLen)
        }, "post",
        (res) => {
          this.setData({
            refereeFeeSix: res.data.data.toFixed(2)
          })
          util.Request("/api/display", {
              SportType: this.data.sportTypeSix,
              type: 1,
              status: 1,
              referee: res.data.data.toFixed(2),
              siteMoney: wx.getStorageSync('bookinSix').data[0].placeMoney,
              lr: wx.getStorageSync('bookinSix').data[0].lr,
              openPrice: wx.getStorageSync('bookinSix').data[0].openPrice
            }, "post",
            (res) => {
              this.setData({
                displayTxtSix: res.data.data
              })

            },
            () => {
            },
            () => {}
          )
          wx.setStorageSync('refereeFeeSix', res.data.data.toFixed(2))

        },
        () => {
        },
        () => {}
      )

    } else {
      this.setData({
        startTimeSix: '', //开始时间
        startTimerofSix: '请选择',
        timerSix: '', //开始时间段
        timeLenSix: '无', //时长
        placeMoneySix: '0', //场地费
        displayTxtSix: [],
      })
    }




    if (wx.getStorageSync('siteid') !== '' && wx.getStorageSync('siteid') !== undefined) {
      this.setData({
        siteid: wx.getStorageSync('siteid').siteid,
        siteName: wx.getStorageSync('siteid').name,
      })
    } else {
      this.setData({
        siteid: '',
        siteName: '请选择',
      })
    }

    if (wx.getStorageSync('siteidTwo') !== '') {
      this.setData({
        siteidTwo: wx.getStorageSync('siteidTwo').siteid,
        siteNameTwo: wx.getStorageSync('siteidTwo').name,
      })
    } else {
      this.setData({
        siteidTwo: '',
        siteNameTwo: '请选择',
      })
    }

    if (wx.getStorageSync('siteidThree') !== '' && wx.getStorageSync('siteid') !== undefined) {
      this.setData({
        siteidThree: wx.getStorageSync('siteidThree').siteid,
        siteNameThree: wx.getStorageSync('siteidThree').name,
      })
    } else {
      this.setData({
        siteidThree: '',
        siteNameThree: '请选择',
      })
    }

    if (wx.getStorageSync('siteidFour') !== '') {
      this.setData({
        siteidFour: wx.getStorageSync('siteidFour').siteid,
        siteNameFour: wx.getStorageSync('siteidFour').name,
      })
    } else {
      this.setData({
        siteidFour: '',
        siteNameFour: '请选择',
      })
    }


    if (wx.getStorageSync('siteidFive') !== '') {
      this.setData({
        siteidFive: wx.getStorageSync('siteidFive').siteid,
        siteNameFive: wx.getStorageSync('siteidFive').name,
      })
    } else {
      this.setData({
        siteidFive: '',
        siteNameFive: '请选择',
      })
    }

    if (wx.getStorageSync('siteidSix') !== '') {
      this.setData({
        siteidSix: wx.getStorageSync('siteidSix').siteid,
        siteNameSix: wx.getStorageSync('siteidSix').name,
      })
    } else {
      this.setData({
        siteidSix: '',
        siteNameSix: '请选择',
      })
    }

    if (wx.getStorageSync('mode') !== '') {
      this.setData({
        mode: wx.getStorageSync('mode'),
        modeNum: wx.getStorageSync('modeNum')
      })
    } else {
      this.setData({
        mode: '请选择',
        modeNum: 0
      })
    }

    if (wx.getStorageSync('modeThree') !== '') {
      this.setData({
        modeThree: wx.getStorageSync('modeThree'),
        modeNumThree: wx.getStorageSync('modeNumThree')
      })
    } else {
      this.setData({
        modeThree: '请选择',
        modeNumThree: 0
      })
    }
    if (wx.getStorageSync('TrialPickerF') == '') {
      wx.setStorage({
        key: 'TrialPickerF',
        data: 0,
      })
    }

    if (wx.getStorageSync('TrialPickerFThree') == '') {
      wx.setStorage({
        key: 'TrialPickerFThree',
        data: 0,
      })
    }
    if (wx.getStorageSync('TrialRaderF') == '') {
      this.setData({
        refereegrade: '',
        TrialRader: '请选择'
      })
    }



    if (currPage.data.memberUid != undefined) {
      util.Request("/api/getUserDetailInfo", {
          'uuid': currPage.data.memberUid
        }, "get",
        (res) => {
          let imgURL = res.data.data.imgURL
          let uuid = res.data.data.uuid
          util.Request("/api/getSportLevel", {
              'sportId': this.data.sportId,
              'usersid': currPage.data.memberUid
            }, "get",
            (res) => {
              let projectNow = res.data.data
              let name = res.data.data.name
              this.judgmentBall(name, projectNow)
              let obj = {
                imgURL: imgURL,
                heightLevel: 'Lv' + res.data.data.level,
                name: res.data.data.nameSon,
                uuid: currPage.data.memberUid
              }

              if (this.data.team == 1) {
                if (this.data.uuidArr.indexOf(uuid) != -1) {
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
                for (let i in this.data.numA) {
                  if (this.data.numA[i].uuid != undefined) {
                    this.setData({
                      uuidArr: [...this.data.uuidArr, this.data.numA[i].uuid]
                    })
                  }
                }
                currPage.data.memberUid = undefined

              } else if (this.data.team == 2) {
                if (this.data.uuidArr.indexOf(uuid) != -1) {
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
                for (let i in this.data.numB) {
                  if (this.data.numB[i].uuid != undefined) {
                    this.setData({
                      uuidArr: [...this.data.uuidArr, this.data.numB[i].uuid]
                    })
                  }
                }
                currPage.data.memberUid = undefined
              } else if (this.data.team == 3) {
                if (this.data.uuidArr.indexOf(uuid) != -1) {
                  wx.showToast({
                    title: '不可重复邀请',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                } else {
                  this.data.numC[this.data.indexTeam] = obj
                  this.setData({
                    numC: this.data.numC
                  })
                }
                for (let i in this.data.numC) {
                  if (this.data.numC[i].uuid != undefined) {
                    this.setData({
                      uuidArr: [...this.data.uuidArr, this.data.numC[i].uuid]
                    })
                  }
                }
              }
              currPage.data.memberUid = undefined
            },
            () => {
            },
            () => {}
          )



        },
        () => {
        },
        () => {}
      )

    }


    let cfTwo = ''
    switch (wx.getStorageSync('sportTypeF')) {
      case 23:
        cfTwo = false
        break;
      case 1:
        cfTwo = false
        break;
      case 2:
        cfTwo = false
        break;
      case 3:
        cfTwo = false
        break;
      case 5:
        cfTwo = false
        break;
      case 6:
        cfTwo = false
        break;
      case 4:
        cfTwo = false
        break;
      case 7:
        cfTwo = false
        break;
        case 8:
          cfTwo = false
          break;
      case 10:
        cfTwo = false
        break;
      case 11:
        cfTwo = false
        break;
      case 13:
        cfTwo = false
        break;
      case 14:
        cfTwo = false
        break;
      case 15:
        cfTwo = false
        break;
      case 16:
        cfTwo = false
        break;
      case 12:
        cfTwo = false
        break;
      case 9:
        cfTwo = false
        break;
      case 20:
        cfTwo = 'no'
        break;
      case 21:
        cfTwo = 'no'
        break;
      default:
        cfTwo = true
    }
    this.setData({
      cfTwo: cfTwo
    })

    let cf = ''
    switch (wx.getStorageSync('sportTypeFThree')) {
      case 23:
        cf = false
        break;
      case 1:
        cf = false
        break;
      case 2:
        cf = false
        break;
      case 3:
        cf = false
        break;
      case 5:
        cf = false
        break;
      case 6:
        cf = false
        break;
      case 4:
        cf = false
        break;
      case 7:
        cf = false
        break;
        case 8:
        cf = false
        break;
      case 10:
        cf = false
        break;
      case 11:
        cf = false
        break;
      case 13:
        cf = false
        break;
      case 14:
        cf = false
        break;
      case 15:
        cf = false
        break;
      case 16:
        cf = false
        break;
      case 12:
        cf = false
        break;
      case 9:
        cf = false
        break;
      case 20:
        cf = 'no'
        break;
      case 21:
        cf = 'no'
        break;
      default:
        cf = true
    }
    this.setData({
      cf: cf
    })



    let idgo = wx.getStorageSync('sportIdF')
    if (idgo == 1 || idgo == 2 || idgo == 7) {
      this.setData({
        comments: '球，球拍各参与者均须自备'
      })
    } else if (idgo == 4) {
      this.setData({
        comments: '发布者带篮球'
      })
    } else if (idgo == 5) {
      this.setData({
        comments: '发布者带足球'
      })
    } else if (idgo == 6) {
      this.setData({
        comments: '发布者带排球'
      })
    } else {
      this.setData({
        comments: wx.getStorageSync('commentsF')
      })
    }



    let idgoTwo = wx.getStorageSync('sportIdFTwo')
    if (idgoTwo == 1 || idgoTwo == 2 || idgoTwo == 7) {
      this.setData({
        commentsTwo: '球，球拍各参与者均须自备'
      })
    } else if (idgoTwo == 4) {
      this.setData({
        commentsTwo: '发布者带篮球'
      })
    } else if (idgoTwo == 5) {
      this.setData({
        commentsTwo: '发布者带足球'
      })
    } else if (idgoTwo == 6) {
      this.setData({
        commentsTwo: '发布者带排球'
      })
    } else {
      this.setData({
        commentsTwo: wx.getStorageSync('commentsFTwo')
      })
    }


    let idgoThree = wx.getStorageSync('sportIdFThree')
    if (idgoThree == 1 || idgoThree == 2 || idgoThree == 7) {
      this.setData({
        commentsThree: '球，球拍各参与者均须自备'
      })
    } else if (idgoThree == 4) {
      this.setData({
        commentsThree: '发布者带篮球'
      })
    } else if (idgoThree == 5) {
      this.setData({
        commentsThree: '发布者带足球'
      })
    } else if (idgoThree == 6) {
      this.setData({
        commentsThree: '发布者带排球'
      })
    } else {
      this.setData({
        commentsThree: wx.getStorageSync('commentsFThree')
      })
    }

    let idgoFour = wx.getStorageSync('sportIdFFour')
    if (idgoFour == 1 || idgoFour == 2 || idgoFour == 7) {
      this.setData({
        commentsFour: '球，球拍各参与者均须自备'
      })
    } else if (idgoFour == 4) {
      this.setData({
        commentsFour: '发布者带篮球'
      })
    } else if (idgoFour == 5) {
      this.setData({
        commentsFour: '发布者带足球'
      })
    } else if (idgoFour == 6) {
      this.setData({
        commentsFour: '发布者带排球'
      })
    } else {
      this.setData({
        commentsFour: wx.getStorageSync('commentsFFour')
      })
    }

    let idgoFive = wx.getStorageSync('sportIdFFive')
    if (idgoFive == 1 || idgoFive == 2 || idgoFive == 7) {
      this.setData({
        commentsFive: '球，球拍各参与者均须自备'
      })
    } else if (idgoFive == 4) {
      this.setData({
        commentsFive: '发布者带篮球'
      })
    } else if (idgoFive == 5) {
      this.setData({
        commentsFive: '发布者带足球'
      })
    } else if (idgoFive == 6) {
      this.setData({
        commentsFive: '发布者带排球'
      })
    } else {
      this.setData({
        commentsFive: wx.getStorageSync('commentsFFive')
      })
    }

    let idgoSix = wx.getStorageSync('sportIdFSix')
    if (idgoSix == 1 || idgoSix == 2 || idgoSix == 7) {
      this.setData({
        commentsSix: '球，球拍各参与者均须自备'
      })
    } else if (idgoSix == 4) {
      this.setData({
        commentsSix: '发布者带篮球'
      })
    } else if (idgoSix == 5) {
      this.setData({
        commentsSix: '发布者带足球'
      })
    } else if (idgoSix == 6) {
      this.setData({
        commentsSix: '发布者带排球'
      })
    } else {
      this.setData({
        commentsSix: wx.getStorageSync('commentsFSix')
      })
    }

    this.onKO()

    if (currPage.data.sportsList != undefined) {
      currPage.data.sportsList = undefined
    }
    this.setData({
      sportId: wx.getStorageSync('sportIdF'),
      sportType: wx.getStorageSync('sportTypeF'),
      sportName: wx.getStorageSync('sportNameF'),
      sportypeName: wx.getStorageSync('sportypeNameF'),
      sportIdThree: wx.getStorageSync('sportIdFThree'),
      sportTypeThree: wx.getStorageSync('sportTypeFThree'),
      sportNameThree: wx.getStorageSync('sportNameFThree'),
      sportypeNameThree: wx.getStorageSync('sportypeNameFThree'),
      sportIdTwo: wx.getStorageSync('sportIdFTwo'),
      sportTypeTwo: wx.getStorageSync('sportTypeFTwo'),
      sportNameTwo: wx.getStorageSync('sportNameFTwo'),
      sportypeNameTwo: wx.getStorageSync('sportypeNameFTwo'),
      sportIdFour: wx.getStorageSync('sportIdFFour'),
      sportTypeFour: wx.getStorageSync('sportTypeFFour'),
      sportNameFour: wx.getStorageSync('sportNameFFour'),
      sportypeNameFour: wx.getStorageSync('sportypeNameFFour'),
      sportIdFive: wx.getStorageSync('sportIdFFive'),
      sportTypeFive: wx.getStorageSync('sportTypeFFive'),
      sportNameFive: wx.getStorageSync('sportNameFFive'),
      sportypeNameFive: wx.getStorageSync('sportypeNameFFive'),
      sportIdSix: wx.getStorageSync('sportIdFSix'),
      sportTypeSix: wx.getStorageSync('sportTypeFSix'),
      sportNameSix: wx.getStorageSync('sportNameFSix'),
      sportypeNameSix: wx.getStorageSync('sportypeNameFSix'),
      sex: wx.getStorageSync('sexF'),
      sexThree: wx.getStorageSync('sexFThree'),
      sexFour: wx.getStorageSync('sexFFour'),
      sexFive: wx.getStorageSync('sexFFive'),
      sexSix: wx.getStorageSync('sexFSix'),
      age: wx.getStorageSync('ageF'),
      rank: wx.getStorageSync('rankF'),
      ageThree: wx.getStorageSync('ageFThree'),
      ageFour: wx.getStorageSync('ageFFour'),
      ageFive: wx.getStorageSync('ageFFive'),
      ageSix: wx.getStorageSync('ageFSix'),
      rankThree: wx.getStorageSync('rankFThree'),
      rankFour: wx.getStorageSync('rankFFour'),
      rankFive: wx.getStorageSync('rankFFive'),
      rankSix: wx.getStorageSync('rankFSix'),
      TrialNum: this.data.TrialArray[wx.getStorageSync('TrialPickerF') == '' ? 0 : wx.getStorageSync('TrialPickerF')].name,
      Trial: wx.getStorageSync('TrialPickerF'),
      refereegrade: wx.getStorageSync('TrialPickerF'),

      TrialNumThree: this.data.TrialArray[wx.getStorageSync('TrialPickerFThree') == '' ? 0 : wx.getStorageSync('TrialPickerFThree')].name,
      TrialThree: wx.getStorageSync('TrialPickerFThree'),
      refereegradeThree: wx.getStorageSync('TrialPickerFThree'),
      TrialNumSix: this.data.TrialArray[wx.getStorageSync('TrialPickerFSix')].name,
      TrialSix: wx.getStorageSync('TrialPickerFSix'),
      refereegradeSix: wx.getStorageSync('TrialPickerFSix'),

      TrialRader: wx.getStorageSync('TrialRaderF') == '' ? '三级' : wx.getStorageSync('TrialRaderF'),
      TrialRaderThree: wx.getStorageSync('TrialRaderFThree') == '' ? '三级' : wx.getStorageSync('TrialRaderFThree'),
      TrialRaderSix: wx.getStorageSync('TrialRaderFSix') == '' ? '三级' : wx.getStorageSync('TrialRaderFSix'),
      shouldered: wx.getStorageSync('shoulderedF') == '' ? 'AA' : wx.getStorageSync('shoulderedF'),
      shoulderedThree: wx.getStorageSync('modeThree') == '娱乐模式' ? 'AA' : wx.getStorageSync('shoulderedFThree'),
    })


    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 //这里写相应页面的序号
      })
    }



  },

  switch1Change: function (e) {
    this.setData({
      switch1Checked: e.detail.value
    })
  },

  //组织活动
  Organization() {
    let {
      sportIdThree,
      sportTypeThree,
      modeNumThree,
      siteidThree,
      timeLenThree,
      placeMoneyThree,
      shoulderedThree,
      ageThree,
      sexThree,
      rankThree,
      tipsThree,
      commentsThree,
      numAThree,
      numBThree,
      numCThree,
      venueidThree,
      refereeFeeThree,
      TrialNumThree,
      TrialRaderThree,
      startTimeThree,
      timerThree,
      sumMoneyThree
    } = this.data
    let numArr = []
    let numBrr = []
    let numCrr = []
    for (let i in numAThree) {
      if (numAThree[i].uuid != undefined) {
        let ko = {
          team: 1,
          uuid: numAThree[i].uuid
        }
        numArr.push(ko)
      }
    }
    for (let i in numBThree) {
      if (numBThree[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numBThree[i].uuid
        }
        numBrr.push(ko)
      }
    }
    for (let i in numCThree) {
      if (numCThree[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numCThree[i].uuid
        }
        numCrr.push(ko)
      }
    }

    if (sportIdThree == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (modeNumThree == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (siteidThree == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (startTimeThree == '') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let obj = {
        sportid: sportIdThree,
        sportType: sportTypeThree,
        SportMode: modeNumThree,
        siteUid: siteidThree,
        StartTime: startTimeThree + ' ' + timerThree,
        PlayTime: parseFloat(timeLenThree),
        SiteMoney: placeMoneyThree,
        PaySiteMoneyType: shoulderedThree == 'AA' ? 1 : 2,
        teamSex: sexThree == '男' ? '0' : '' || sexThree == '不限' ? '2' : '' || sexThree == '女' ? '1' : '',
        LevelMax: rankThree == '不限' ? '15' : parseFloat(rankThree.split('-')[1]),
        LevelMin: rankThree == '不限' ? '1' : parseFloat(rankThree.split('-')[0]),
        organization: tipsThree,
        Tips: 0,
        Reward: 0,
        Accompany: this.data.modeThree != '娱乐模式' && this.data.modeThree != '竞技模式' ? tipsThree : 0,
        comments: commentsThree,
        member: [...numArr, ...numBrr, ...numCrr],
        MoneyPerhour: '',
        venueid: venueidThree,
        refereefee: refereeFeeThree,
        RefereeNumber: Number(TrialNumThree.slice(0, 1)),
        Refereegrade: TrialRaderThree == '请选择' ? '' : TrialRaderThree,
        number: numAThree.length + numBThree.length + numCThree.length,
        isPublisher: 1,
        Agemin: ageThree == '不限' ? '10' : parseFloat(ageThree.split('-')[0]),
        Agemax: ageThree == '不限' ? '70' : parseFloat(ageThree.split('-')[1]),
        SiteSumMoney: sumMoneyThree,
        payType: 'balance',
        lr: wx.getStorageSync('bookinThree').data[0].lr,
        openPrice: wx.getStorageSync('bookinThree').data[0].openPrice,
        ifMustSign: this.data.switch1Checked == false ? 0 : 1
      }


      util.Request("/api/userAddorganization", obj, "post",
        (res) => {
          if (res.data.code == 2000) {

            wx.navigateTo({
              url: '/generalization/createSuccess/createSuccess?inviteId=' + res.data.data.uuid + '&Identification=1' + '&typeInfo=2' + '&referee=' + res.data.data.referee + '&status=1' + '&time=' + res.data.data.CreateTime + '&ok=1' + '&lr=' + wx.getStorageSync('bookinThree').data[0].lr,
            })


            wx.hideLoading()

          } else {
            wx.hideLoading()
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })


          }
        },
        () => {
        },
        () => {}
      )



    }




  },

  tipsSix: function (e) {
    this.setData({
      tipsSix: e.detail.value
    })
  },


  //邀请好友
  invitaional: function (e) {
    return false
    if (this.data.modeNum == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.siteid == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.startTime == '') {
      wx.showToast({
        title: '请选择开始时间',
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

      let rankMax = 0
      let rankMin = 0
      let ageMax = 0
      let ageMin = 0
      if (this.data.rank == '不限') {
        rankMax = 10
        rankMin = 1
      } else {
        rankMax = parseFloat(this.data.rank.split('-')[0]) > parseFloat(this.data.rank.split('-')[1]) ? parseFloat(this.data.rank.split('-')[0]) : parseFloat(this.data.rank.split('-')[1])
        rankMin = parseFloat(this.data.rank.split('-')[0]) < parseFloat(this.data.rank.split('-')[1]) ? parseFloat(this.data.rank.split('-')[0]) : parseFloat(this.data.rank.split('-')[1])
      }

      if (this.data.age == '不限') {
        ageMax = 70
        ageMin = 10
      } else {
        ageMax = parseFloat(this.data.age.split('-')[0]) > parseFloat(this.data.age.split('-')[1]) ? parseFloat(this.data.age.split('-')[0]) : parseFloat(this.data.age.split('-')[1])
        ageMin = parseFloat(this.data.age.split('-')[0]) < parseFloat(this.data.age.split('-')[1]) ? parseFloat(this.data.age.split('-')[0]) : parseFloat(this.data.age.split('-')[1])
      }
      this.setData({
        team: e.currentTarget.dataset.team,
        indexTeam: e.currentTarget.dataset.index
      })

      let sex = wx.getStorageSync('sexF') == '男' ? '0' : '1' || wx.getStorageSync('sexF') == '不限' ? '2' : ''
      wx.navigateTo({
        url: '/generalization/Invitational/Invitational?sportid=' + this.data.sportId + '&sex=' + sex + '&rankMax=' + rankMax + '&rankMin=' + rankMin + '&team=' + e.currentTarget.dataset.team + '&ageMax=' + ageMax + '&ageMin=' + ageMin,
      })
    }
  },



  onKO: function () {
    util.Request("/api/usercread", {}, "post",
      (res) => {
        if (res.data.code == 4001) {
          this.setData({
            timeOut: false
          })
        } else {
          this.setData({
            timeOut: true
          })
          if (res.data.data.type == 1) {
            wx.showModal({
              title: '温馨提示',
              showCancel: false,
              content: res.data.data.commit + '(打开APP支付)',
              success(res) {
                wx.reLaunch({
                  url: '/pages/homePage/content/content'
                })
              }
            })
          } else {
            util.Request("/api/getUserDetailInfo", {
                uuid: wx.getStorageSync('uuid')
              }, "get",
              (res) => {
                if (res.data.code === 2000) {
                  if (this.data.indexSw == '0') {
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
                      case '美式9球':
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
                      case '6人制':
                        numAB = 6
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
                      case '双打(3队)':
                        numAB = 2
                        break;
                      case '3v3(3队)':
                        numAB = 3
                        break;
                      default:
                        numAB = 0
                    }
                    var arr2 = new Array();
                    var arr1 = []
                    var arr3 = []
                    util.Request("/api/getSportLevel", {
                        'sportId': this.data.sportId
                      }, "get",
                      (res) => {
                        this.setData({
                          sportLeve: res.data.data
                        })
                        let projectNow = res.data.data
                        let name = res.data.data.name
                        this.judgmentBall(name, projectNow)
                        let obj = {
                          imgURL: wx.getStorageSync('imgURL'),
                          heightLevel: 'Lv' + projectNow.level,
                          name: projectNow.nameSon
                        }
                        for (var i = 0; i < numAB; i++) {
                          let obj = {}
                          arr2.push(obj);
                          arr1.push(obj)
                          arr3.push(obj)
                          if (wx.getStorageSync('sportypeNameF') != '双打(3队)' && wx.getStorageSync('sportypeNameF') != '3v3(3队)') {
                            arr3 = []
                          }
                        }
                        arr2.unshift(obj)
                        this.setData({
                          numB: arr1,
                          numBThree: arr1,
                          numA: arr2.slice(0, arr2.length - 1),
                          numC: arr3
                        })



                        wx.hideLoading()
                      },
                      () => {
                      },
                      () => {}
                    )
                  } else if (this.data.indexSw == '2') {
                    let numAB = 0
                    switch (wx.getStorageSync('sportypeNameFThree')) {
                      case '单打':
                        numAB = 1
                        break;
                      case '双打':
                        numAB = 2
                        break;
                      case '中式黑八':
                        numAB = 1
                        break;
                      case '美式9球':
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
                      case '6人制':
                        numAB = 6
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
                      case '双打(3队)':
                        numAB = 2
                        break;
                      case '3v3(3队)':
                        numAB = 3
                        break;
                      default:
                        numAB = 0
                    }
                    var arr2 = new Array();
                    var arr1 = []
                    var arr3 = []

                    for (var i = 0; i < numAB; i++) {
                      let obj = {}
                      arr2.push(obj);
                      arr1.push(obj)
                      arr3.push(obj)
                      if (wx.getStorageSync('sportypeNameFThree') != '双打(3队)' && wx.getStorageSync('sportypeNameFThree') != '3v3(3队)') {
                        arr3 = []
                      }
                    }
                    this.setData({
                      numBThree: arr1,
                      numAThree: arr2,
                      numCThree: arr3
                    })
                  } else if (this.data.indexSw == '3') {
                    let numAB = 0
                    switch (wx.getStorageSync('sportypeNameFFour')) {
                      case '单打':
                        numAB = 1
                        break;
                      case '双打':
                        numAB = 2
                        break;
                      case '中式黑八':
                        numAB = 1
                        break;
                      case '美式9球':
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
                      case '6人制':
                        numAB = 6
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
                      case '双打(3队)':
                        numAB = 2
                        break;
                      case '3v3(3队)':
                        numAB = 3
                        break;
                      default:
                        numAB = 0
                    }
                    var arr2 = new Array();
                    var arr1 = []
                    var arr3 = []
                    util.Request("/api/getSportLevel", {
                        'sportId': this.data.sportIdFour
                      }, "get",
                      (res) => {
                        this.setData({
                          sportLeveFour: res.data.data
                        })
                        let projectNow = res.data.data
                        let name = res.data.data.name
                        this.judgmentBall(name, projectNow)
                        let obj = {
                          imgURL: wx.getStorageSync('imgURL'),
                          heightLevel: 'Lv' + projectNow.level,
                          name: projectNow.nameSon
                        }
                        for (var i = 0; i < numAB; i++) {
                          let obj = {}
                          arr2.push(obj);
                          arr1.push(obj)
                          arr3.push(obj)
                          if (wx.getStorageSync('sportypeNameFFour') != '双打(3队)' && wx.getStorageSync('sportypeNameFFour') != '3v3(3队)') {
                            arr3 = []
                          }
                        }
                        arr2.unshift(obj)
                        this.setData({
                          numBFour: arr1,
                          numAFour: arr2.slice(0, arr2.length - 1),
                          numCFour: arr3
                        })



                        wx.hideLoading()
                      },
                      () => {
                      },
                      () => {}
                    )
                  } else if (this.data.indexSw == '4') {
                    let numAB = 0
                    switch (wx.getStorageSync('sportypeNameFFive')) {
                      case '单打':
                        numAB = 1
                        break;
                      case '双打':
                        numAB = 2
                        break;
                      case '中式黑八':
                        numAB = 1
                        break;
                      case '美式9球':
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
                      case '6人制':
                        numAB = 6
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
                      case '双打(3队)':
                        numAB = 2
                        break;
                      case '3v3(3队)':
                        numAB = 3
                        break;
                      default:
                        numAB = 0
                    }
                    var arr2 = new Array();
                    var arr1 = []
                    var arr3 = []
                    util.Request("/api/getSportLevel", {
                        'sportId': this.data.sportIdFive
                      }, "get",
                      (res) => {
                        this.setData({
                          sportLeveFive: res.data.data
                        })
                        let projectNow = res.data.data
                        let name = res.data.data.name
                        this.judgmentBall(name, projectNow)
                        let obj = {
                          imgURL: wx.getStorageSync('imgURL'),
                          heightLevel: 'Lv' + projectNow.level,
                          name: projectNow.nameSon
                        }
                        for (var i = 0; i < numAB; i++) {
                          let obj = {}
                          arr2.push(obj);
                          arr1.push(obj)
                          arr3.push(obj)
                          if (wx.getStorageSync('sportypeNameFFive') != '双打(3队)' && wx.getStorageSync('sportypeNameFFive') != '3v3(3队)') {
                            arr3 = []
                          }
                        }
                        arr2.unshift(obj)
                        this.setData({
                          numBFive: arr1,
                          numAFive: arr2.slice(0, arr2.length - 1),
                          numCFive: arr3
                        })



                        wx.hideLoading()
                      },
                      () => {
                      },
                      () => {}
                    )
                  } else if (this.data.indexSw == '5') {
                    let numAB = 0
                    switch (wx.getStorageSync('sportypeNameFSix')) {
                      case '单打':
                        numAB = 1
                        break;
                      case '双打':
                        numAB = 2
                        break;
                      case '中式黑八':
                        numAB = 1
                        break;
                      case '美式9球':
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
                      case '6人制':
                        numAB = 6
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
                      case '双打(3队)':
                        numAB = 2
                        break;
                      case '3v3(3队)':
                        numAB = 3
                        break;
                      default:
                        numAB = 0
                    }
                    var arr2 = new Array();
                    var arr1 = []
                    var arr3 = []
                    util.Request("/api/getSportLevel", {
                        'sportId': this.data.sportIdSix
                      }, "get",
                      (res) => {
                        this.setData({
                          sportLeveSix: res.data.data
                        })
                        let projectNow = res.data.data
                        let name = res.data.data.name
                        this.judgmentBall(name, projectNow)
                        let obj = {
                          imgURL: wx.getStorageSync('imgURL'),
                          heightLevel: 'Lv' + projectNow.level,
                          name: projectNow.nameSon
                        }
                        for (var i = 0; i < numAB; i++) {
                          let obj = {}
                          arr2.push(obj);
                          arr1.push(obj)
                          arr3.push(obj)
                          if (wx.getStorageSync('sportypeNameFSix') != '双打(3队)' && wx.getStorageSync('sportypeNameFSix') != '3v3(3队)') {
                            arr3 = []
                          }
                        }
                        arr2.unshift(obj)
                        this.setData({
                          numBSix: arr1,
                          numASix: arr2.slice(0, arr2.length - 1),
                          numCSix: arr3
                        })



                        wx.hideLoading()
                      },
                      () => {
                      },
                      () => {}
                    )
                  }
                }



              },
              () => {
              },
              () => {}
            )

          }
        }




      },
      () => {
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
  tips: function (e) {
    this.setData({
      tips: e.detail.value
    })
  },

  //组织费
  tipsThree: function (e) {
    this.setData({
      tipsThree: e.detail.value
    })
    if (wx.getStorageSync('bookinThree') != '') {
      util.Request("/api/display", {
          SportType: this.data.sportTypeThree,
          type: 2,
          status: 1,
          referee: wx.getStorageSync('refereeFeeThree'),
          siteMoney: wx.getStorageSync('bookinThree').data[0].placeMoney + '.00',
          orgPrice: e.detail.value == '' ? 0 : e.detail.value,
          lr: wx.getStorageSync('bookinThree').data[0].lr,
          openPrice: wx.getStorageSync('bookinThree').data[0].openPrice
        }, "post",
        (res) => {
          this.setData({
            displayTxtThree: res.data.data
          })
        },
        () => {
        },
        () => {}
      )
    }


  },

  //陪练费
  tipsFour: function (e) {
    this.setData({
      tipsFour: e.detail.value
    })
  },

  //陪练费
  tipsFive: function (e) {
    this.setData({
      tipsFive: e.detail.value
    })

    util.Request("/api/display", {
        SportType: this.data.sportTypeFive,
        type: 4,
        status: 1,
        referee: '0',
        siteMoney: wx.getStorageSync('bookinFive').data[0].placeMoney + '.00',
        lr: wx.getStorageSync('bookinFive').data[0].lr,
        openPrice: wx.getStorageSync('bookinFive').data[0].openPrice,
        pPrice: e.detail.value
      }, "post",
      (res) => {
        this.setData({
          displayTxtFive: res.data.data
        })
      },
      () => {
      },
      () => {}
    )

  },
  comment: function (e) {
    this.setData({
      comments: e.detail.value
    })
  },

  commentThree: function (e) {
    this.setData({
      commentsThree: e.detail.value
    })
  },

  commentFour: function (e) {
    this.setData({
      commentsFour: e.detail.value
    })
  },

  commentFive: function (e) {
    this.setData({
      commentsFive: e.detail.value
    })
  },

  commentSix: function (e) {
    this.setData({
      commentsSix: e.detail.value
    })
  },

  //发布活动
  release: function () {
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
      numC,
      venueid,
      refereeFee,
      TrialNum,
      refereegrade,
      TrialRader,
      startTime,
      timer,
      checked,
      siteName,
      sumMoney
    } = this.data
    let numArr = []
    let numBrr = []
    let numCrr = []
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
    for (let i in numC) {
      if (numC[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numC[i].uuid
        }
        numCrr.push(ko)
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
    } else if (startTime == '') {
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
        LevelMax: rank == '不限' ? '15' : parseFloat(rank.split('-')[1]),
        LevelMin: rank == '不限' ? '1' : parseFloat(rank.split('-')[0]),
        Tips: tips,
        Reward: 0,
        Accompany: this.data.mode != '娱乐模式' && this.data.mode != '竞技模式' ? tips : 0,
        comments: comments,
        member: [...numArr, ...numBrr, ...numCrr],
        MoneyPerhour: '',
        venueid: venueid,
        refereefee: refereeFee,
        RefereeNumber: Number(TrialNum.slice(0, 1)),
        Refereegrade: TrialRader == '请选择' ? '' : TrialRader,
        number: numA.length + numB.length + numC.length,
        isPublisher: 1,
        Agemin: age == '不限' ? '10' : parseFloat(age.split('-')[0]),
        Agemax: age == '不限' ? '70' : parseFloat(age.split('-')[1]),
        SiteSumMoney: sumMoney,
        openPrice: wx.getStorageSync('bookin').data[0].openPrice,
        lr: wx.getStorageSync('bookin').data[0].lr,
        organization: 1
      }


      app.globalData = obj

      app.deductibles = []
      app.envelope = []
      // let ydata = {
      //   sportid: sportId,
      //   sporttype: sportType,
      //   sportmode: modeNum,
      //   refereenumber: Number(TrialNum.slice(0, 1)),
      //   refereegrade: refereegrade,
      //   siteuuid: siteid,
      //   sitename: siteName,
      //   sitelat: wx.getStorageSync('lat'),
      //   sitelng: wx.getStorageSync('lng'),
      //   bearmode: shouldered == 'AA' ? 1 : 2,
      //   sex: sex == '男' ? '0' : '' || sex == '不限' ? '2' : '' || sex == '女' ? '1' : '',
      //   minavg: age == '不限' ? '10' : parseFloat(age.split('-')[0]),
      //   maxavg: age == '不限' ? '70' : parseFloat(age.split('-')[1]),
      //   maxgrade: rank == '不限' ? '10' : parseFloat(rank.split('-')[1]),
      //   mingrade: rank == '不限' ? '1' : parseFloat(rank.split('-')[0]),
      //   reward: tips,
      //   remarks: comments,
      //   sitecity: wx.getStorageSync('cityInfo')

      // }
      // if (checked == true) {
      //   util.Request("/api/SavePlayerReleasePreference", ydata, "post",
      //     (res) => {

      //     },
      //     () => {
      //     },
      //     () => {}
      //   )
      // }
      wx.navigateTo({
        url: '/generalization/payFor/payFor?look=1',
      })




    }




  },



  //我是馆主
  releaseSix: function () {
    let {
      sportIdSix,
      sportTypeSix,
      modeNumSix,
      siteidSix,
      timeLenSix,
      placeMoneySix,
      shoulderedSix,
      ageSix,
      sexSix,
      rankSix,
      tipsSix,
      commentsSix,
      numASix,
      numBSix,
      numCSix,
      venueidSix,
      refereeFeeSix,
      TrialNumSix,
      TrialRaderSix,
      startTimeSix,
      timerSix,
      sumMoneySix
    } = this.data
    let numArr = []
    let numBrr = []
    let numCrr = []
    for (let i in numASix) {
      if (numASix[i].uuid != undefined) {
        let ko = {
          team: 1,
          uuid: numASix[i].uuid
        }
        numArr.push(ko)
      }
    }
    for (let i in numBSix) {
      if (numBSix[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numBSix[i].uuid
        }
        numBrr.push(ko)
      }
    }
    for (let i in numCSix) {
      if (numCSix[i].uuid != undefined) {
        let ko = {
          team: 2,
          uuid: numCSix[i].uuid
        }
        numCrr.push(ko)
      }
    }

    if (sportIdSix == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (modeNumSix == '') {
      wx.showToast({
        title: '请选择运动模式',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (siteidSix == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (startTimeSix == '') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let obj = {
        sportid: sportIdSix,
        sportType: sportTypeSix,
        SportMode: modeNumSix,
        siteUid: siteidSix,
        StartTime: startTimeSix + ' ' + timerSix,
        PlayTime: parseFloat(timeLenSix),
        SiteMoney: placeMoneySix,
        PaySiteMoneyType: shoulderedSix == 'AA' ? 1 : 2,
        teamSex: sexSix == '男' ? '0' : '' || sexSix == '不限' ? '2' : '' || sexSix == '女' ? '1' : '',
        LevelMax: rankSix == '不限' ? '15' : parseFloat(rankSix.split('-')[1]),
        LevelMin: rankSix == '不限' ? '1' : parseFloat(rankSix.split('-')[0]),
        Tips: 0,
        Reward: 0,
        Accompany: 0,
        comments: commentsSix,
        member: [...numArr, ...numBrr, ...numCrr],
        MoneyPerhour: '',
        venueid: venueidSix,
        refereefee: refereeFeeSix,
        RefereeNumber: Number(TrialNumSix.slice(0, 1)),
        Refereegrade: TrialRaderSix == '请选择' ? '' : TrialRaderSix,
        number: numASix.length + numBSix.length,
        isPublisher: 1,
        Agemin: ageSix == '不限' ? '10' : parseFloat(ageSix.split('-')[0]),
        Agemax: ageSix == '不限' ? '70' : parseFloat(ageSix.split('-')[1]),
        SiteSumMoney: sumMoneySix,
        PipeMain: 2,
        PipeMainMoney: tipsSix == '(选填)' ? 0 : tipsSix,
        openPrice: wx.getStorageSync('bookinSix').data[0].openPrice,
        organization: 1
      }



      app.globalData = obj
      app.deductibles = []
      app.envelope
      wx.navigateTo({
        url: '/generalization/payFor/payFor?look=1',
      })
    }
  },



  commentsTwo: function (e) {
    this.setData({
      commentsTwo: e.detail.value
    })
  },
  releaseTwo: function () {
    let {
      sportIdTwo,
      sportTypeTwo,
      siteidTwo,
      timeLenTwo,
      placeMoneyTwo,
      commentsTwo,
      startTimeTwo,
      timerTwo,
      venueidTwo,
      breakup,
      SiteSumMoney
    } = this.data
    if (sportIdTwo == '') {
      wx.showToast({
        title: '请选择运动项目',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (siteidTwo == '') {
      wx.showToast({
        title: '请选择运动场馆',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (startTimeTwo == '') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
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
        breakup: breakup,
        SiteSumMoney: SiteSumMoney,
        openPrice: wx.getStorageSync('bookinTwo').data[0].openPrice,
        lr: wx.getStorageSync('bookinTwo').data[0].lr

      }
      app.userReserveVenue = obj

      app.deductibles = []
      app.envelope = []

      wx.navigateTo({
        url: '/generalization/payFor/payFor?look=2',
      })
    }

  },
  checkboxChange: function (e) {
    this.setData({
      checked: !this.data.checked
    })
  },
  modeShowst: function () {
    this.setData({
      masking: true
    })

  },
  close: function () {
    this.setData({
      masking: false
    })
  },

  saveImg(e) {
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success: function (data) {},
      fail: function (err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
         

          wx.openSetting({
            success(settingdata) {

              if (settingdata.authSetting[
                  'scope.writePhotosAlbum'
                ]) {


              } else {


              }

            }

          })

        }

      }

    })
  },
  timeOut: function () {
    wx.navigateTo({
      url: '/pages/authorization/authorization'
    })
  }

})