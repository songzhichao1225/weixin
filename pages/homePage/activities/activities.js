//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    activitiesData: [],
    flag: false,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    end: true,
    hoog: 0,
    moneyType: 1,
    tipsType: 1,
    deservedType: 1,
    type: 0,
    Publisher: 0, //是否是发布者 0不  1是
  },

  onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (option.hoog != undefined) {
      this.setData({
        hoog: option.hoog
      })
    } else if (option.type != undefined) {
      this.setData({
        type: option.type
      })
    }

    util.Request("/api/getActivityInfo", {
        'uuid': option.uuid
      }, "get",
      (res) => {
        let projectNow = res.data.data
        if (projectNow.SportMode == '1') {
          projectNow.SportMode = '娱乐'
        } else if (projectNow.SportMode == '2') {
          projectNow.SportMode = '竞技 '
        } else if (projectNow.SportMode == '3') {
          projectNow.SportMode = '陪练 '
        } else if (projectNow.SportMode == '4') {
          projectNow.SportMode = '找陪练 '
        }
      this.tagStatus(projectNow)
      this.tagStatusTwo(projectNow)
      this.tagStatusThree(projectNow)
        let object = {
          name: "报名",
          hid: false,
        }
        let needNum = projectNow.needNumber / 2
        for (let i = 0; i = needNum - projectNow.teamA.length; i++) {
          projectNow.teamA.push(object)
        }
        for (let i = 0; i = needNum - projectNow.teamB.length; i++) {
          projectNow.teamB.push(object)
        }
        for (let i = 0; i = projectNow.RefereeNumber - projectNow.teamC.length; i++) {
          projectNow.teamC.push(object)
        }
        if (projectNow.uuid != wx.getStorageSync('uuid')) {
          this.setData({
            Publisher: 0
          })
        } else {
          this.setData({
            Publisher: 1
          })
        }
        this.countdown(projectNow.StartTime)
        let sportName = projectNow.sportName
        this.judgmentBall(sportName, projectNow)
        this.setData({
          activitiesData: projectNow,
          moneyType: projectNow.SiteMoney.toString().indexOf('.'),
          tipsType: projectNow.Tips.toString().indexOf('.'),
          deservedType: projectNow.deserved.toString().indexOf('.'),
          flag: true
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
  judgmentBall: function (sportName, projectNow) {
    if (sportName == '台球') {
      projectNow.ballImg = 'icon_hdxx_tq.png'
      projectNow.ballImgSon = 'icon_dj_tq.png'
    } else if (sportName == '羽毛球') {
      projectNow.ballImg = 'icon_hdxx_ymq.png '
      projectNow.ballImgSon = 'icon_dj_ymq.png'
    } else if (sportName == '乒乓球') {
      projectNow.ballImg = 'icon_hdxx_ppq.png '
      projectNow.ballImgSon = 'icon_dj_ppq.png'
    } else if (sportName == '篮球') {
      projectNow.ballImg = 'icon_hdxx_lq.png '
      projectNow.ballImgSon = 'icon_dj_lq.png'
    } else if (sportName == '足球') {
      projectNow.ballImg = 'icon_hdxx_zq.png '
      projectNow.ballImgSon = 'icon_dj_zq.png'
    } else if (sportName == '排球') {
      projectNow.ballImg = 'icon_hdxx_pq.png '
      projectNow.ballImgSon = 'icon_dj_pq.png'
    } else if (sportName == '网球') {
      projectNow.ballImg = 'icon_hdxx_wq.png '
      projectNow.ballImgSon = 'icon_dj_wq.png'
    } else if (sportName == '高尔夫球') {
      projectNow.ballImg = 'icon_hdxx_gef.png '
      projectNow.ballImgSon = 'icon_dj_gef.png'
    }
  },


 
  //倒计时

  countdown: function (StartTime) {
    let totalSecond = (Date.parse(StartTime) - Date.parse(new Date())) / 1000;
    let interval = setInterval(function () {
      let second = totalSecond;
      // 天数
      let day = Math.floor(second / 3600 / 24);
      let dayStr = day.toString();
      if (dayStr.length == 1) dayStr = dayStr;

      // 小时
      let hr = Math.floor((second - day * 3600 * 24) / 3600);
      let hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = hrStr;
      //分                   
      let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      let minStr = min.toString();
      if (minStr.length == 1) minStr = minStr;


      // 秒
      let sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      let secStr = sec.toString();


      if (secStr.length == 1) secStr = secStr;


      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          end: false
        })
      }
    }.bind(this), 1000);
  },

  //跳转用户详情
  getUserDetailInfo: function (e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uid
      })
    } else {
      wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    }
  },
  onShareAppMessage: function (res) {
    let {
      num
    } = this.data
    let that = this
    return {
      title: '挑战',
      path: '/pages/homePage/content/content?uuid=' + wx.getStorageSync('uuid'),
      success: function (res) {
        that.setData({
          num: num - 1
        })
        util.request("/api/getSmallOpenId", {
            'uuid ': wx.getStorageSync('uuid'),
            'addGoldcoin': 10,
            'Whether': 1
          }, "post",
          (res) => {},
          () => {
            console.log("失败")
          },
          () => {}
        )
      }
    }
  },
  onUnload: function () {
    if (this.data.hoog == 1) {
      wx.reLaunch({
        url: '/pages/homePage/content/content'
      })
    }

  },

  tagStatus:function(projectNow){
    for (let i in projectNow.teamA) {
      if (projectNow.teamA[i].isSignIns != 4) {
        if (projectNow.teamA[i].isSignIns == 1) {
          projectNow.teamA[i].nameStatus = '已签到'
        } else if (projectNow.teamA[i].isSignIns == 2) {
          projectNow.teamA[i].nameStatus = '迟到'
        } else if (projectNow.teamA[i].isSignIns == 3) {
          projectNow.teamA[i].nameStatus = '未签到'
        }
      }
      if (projectNow.teamA[i].isQuit == 2) {
        projectNow.teamA[i].nameStatus = '提前退出'
      }
      if (projectNow.teamA[i].isQuitInGame == 2) {
        projectNow.teamA[i].nameStatus = '中途退出'
      }
      if (projectNow.teamA[i].isConfirmResult != 2 && projectNow.PublicStatus == 4) {
        if (projectNow.teamA[i].isConfirmResult == 1) {
          projectNow.teamA[i].nameStatus = '已填写'
        } else if (projectNow.teamA[i].isConfirmResult == 0) {
          projectNow.teamA[i].nameStatus = '待填写'
        }
      }
      if (projectNow.teamA[i].isCancel != 2 && projectNow.PublicStatus == 6) {
        if (projectNow.teamA[i].isCancel == 1) {
          projectNow.teamA[i].nameStatus = '已评价'
        } else if (projectNow.teamA[i].isCancel == 0) {
          projectNow.teamA[i].nameStatus = '待评价'
        }
      }
    }
  },

  tagStatusTwo:function(projectNow){
    for (let i in projectNow.teamB) {
      if (projectNow.teamB[i].isSignIns != 4) {
        if (projectNow.teamB[i].isSignIns == 1) {
          projectNow.teamB[i].nameStatus = '已签到'
        } else if (projectNow.teamB[i].isSignIns == 2) {
          projectNow.teamB[i].nameStatus = '迟到'
        } else if (projectNow.teamB[i].isSignIns == 3) {
          projectNow.teamB[i].nameStatus = '未签到'
        }
      }
      if (projectNow.teamB[i].isQuit == 2) {
        projectNow.teamB[i].nameStatus = '提前退出'
      }
      if (projectNow.teamB[i].isQuitInGame == 2) {
        projectNow.teamB[i].nameStatus = '中途退出'
      }
      if (projectNow.teamB[i].isConfirmResult != 2 && projectNow.PublicStatus == 4) {
        if (projectNow.teamB[i].isConfirmResult == 1) {
          projectNow.teamB[i].nameStatus = '已填写'
        } else if (projectNow.teamB[i].isConfirmResult == 0) {
          projectNow.teamB[i].nameStatus = '待填写'
        }
      }
      if (projectNow.teamB[i].isCancel != 2 && projectNow.PublicStatus == 6) {
        if (projectNow.teamB[i].isCancel == 1) {
          projectNow.teamB[i].nameStatus = '已评价'
        } else if (projectNow.teamB[i].isCancel == 0) {
          projectNow.teamB[i].nameStatus = '待评价'
        }
      }
    }
  },
  tagStatusThree:function(projectNow){
    for (let i in projectNow.teamC) {
      if (projectNow.teamC[i].isSignIns != 4) {
        if (projectNow.teamC[i].isSignIns == 1) {
          projectNow.teamC[i].nameStatus = '已签到'
        } else if (projectNow.teamC[i].isSignIns == 2) {
          projectNow.teamC[i].nameStatus = '迟到'
        } else if (projectNow.teamC[i].isSignIns == 3) {
          projectNow.teamC[i].nameStatus = '未签到'
        }
      }
      if (projectNow.teamC[i].isQuit == 2) {
        projectNow.teamC[i].nameStatus = '提前退出'
      }
      if (projectNow.teamC[i].isQuitInGame == 2) {
        projectNow.teamC[i].nameStatus = '中途退出'
      }
      if (projectNow.teamC[i].isConfirmResult != 2 && projectNow.PublicStatus == 4) {
        if (projectNow.teamC[i].isConfirmResult == 1) {
          projectNow.teamC[i].nameStatus = '已填写'
        } else if (projectNow.teamC[i].isConfirmResult == 0) {
          projectNow.teamC[i].nameStatus = '待填写'
        }
      }
      if (projectNow.teamC[i].isCancel != 2 && projectNow.PublicStatus == 6) {
        if (projectNow.teamC[i].isCancel == 1) {
          projectNow.teamC[i].nameStatus = '已评价'
        } else if (projectNow.teamC[i].isCancel == 0) {
          projectNow.teamC[i].nameStatus = '待评价'
        }
      }
    }
  },
  //活动投诉
  complaintsCon:function(e){
    console.log(e.currentTarget.dataset.uuid)
    wx.navigateTo({
      url: '/generalization/complaintsCon/complaintsCon?uuid='+e.currentTarget.dataset.uuid,
    })

  },


})