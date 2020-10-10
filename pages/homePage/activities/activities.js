//logs.js
const util = require('../../../utils/util.js')
var app = getApp();
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
    AwinBuserInfoOne: [],
    AloseBuserInfoTwo: [],
    AdrawBuserInfoThree: [],
    getwaiverInfoFour: [],
    getRefereeResult: [],
    uuid: '',
  },

  onLoad: function (option) {

    if (option != undefined) {
      if (option.hoog != undefined) {
        this.setData({
          hoog: option.hoog
        })
      } else if (option.hoog == undefined) {
        this.setData({
          hoog: 0
        })
      }
      if (option.type != undefined) {
        this.setData({
          type: option.type
        })
      }
      this.setData({
        uuid: option.uuid
      })
    }




    this.koopdf()




  },

  //接口函数
  koopdf: function () {
    util.Request("/api/getActivityInfo", {
        'uuid': this.data.uuid
      }, "get",
      (res) => {
        let projectNow = res.data.data
        if (projectNow.SportMode == '1') {
          projectNow.SportMode = '娱乐'
        } else if (projectNow.SportMode == '2') {
          projectNow.SportMode = '竞技'
        } else if (projectNow.SportMode == '3') {
          projectNow.SportMode = '陪练'
        } else if (projectNow.SportMode == '4') {
          projectNow.SportMode = '找陪练'
        }
        console.log(projectNow)
        this.setData({
          AwinBuserInfoOne: projectNow.AwinBuserInfo.slice(0, 4),
          AloseBuserInfoTwo: projectNow.AloseBuserInfo.slice(0, 4),
          AdrawBuserInfoThree: projectNow.AdrawBuserInfo.slice(0, 4),
          getwaiverInfoFour: projectNow.getwaiverInfo.slice(0, 4)
        })
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
        if (projectNow.teamA[0].uuid != wx.getStorageSync('uuid')) {
          this.setData({
            Publisher: 0
          })
        } else {
          this.setData({
            Publisher: 1
          })
        }
        let koarr = [...projectNow.teamA, ...projectNow.teamB]
        let hoArr = []
        for (let i in koarr) {
          hoArr.push(koarr[i].uuid)
        }
        if (hoArr.indexOf(wx.getStorageSync('uuid')) == -1) {
          this.setData({
            typeTwo: 0
          })
        } else {
          this.setData({
            typeTwo: 1
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

    util.Request("/api/getRefereeResult", {
        'publicuuid': this.data.uuid
      }, "post",
      (res) => {
        this.setData({
          getRefereeResult: res.data.data
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
      if (e.currentTarget.dataset.uid == wx.getStorageSync('uuid')) {
        let p = ''
        if (this.data.Publisher == 1) {
          p = '发布'
        } else {
          p = '报名'
        }
        let that = this
        wx.showModal({
          title: '提示',
          content: '你确定取消本次活动'+p+'么?',
          success(res) {
            if (res.confirm) {
              util.Request("/api/userCancelActivity", {
                  'publishcId': that.data.activitiesData.uuid
                }, "post",
                (res) => {
                  that.koopdf()
                },
                () => {
                  console.log("失败")
                },
                () => {}
              )
            } else if (res.cancel) {}
          }
        })




      } else {
        wx.navigateTo({
          url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.uid
        })
      }

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

  tagStatus: function (projectNow) {
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

  tagStatusTwo: function (projectNow) {
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
  tagStatusThree: function (projectNow) {
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
  complaintsCon: function (e) {
    wx.navigateTo({
      url: '/generalization/complaintsCon/complaintsCon?uuid=' + e.currentTarget.dataset.uuid,
    })

  },
  //活动到场情况及规则
  attendance: function (e) {
    wx.navigateTo({
      url: '/generalization/attendance/attendance?uuid=' + e.currentTarget.dataset.uuid,
    })
  },
  //取消发布/取消报名
  cancels: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '你确定取消本次活动发布么?',
        success(res) {
          if (res.confirm) {
            util.Request("/api/userCancelActivity", {
                'publishcId': e.currentTarget.dataset.uuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                that.koopdf()
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          } else if (res.cancel) {}
        }
      })
    } else if (e.currentTarget.dataset.type == 2) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '你确定取消本次活动报名么?',
        success(res) {
          if (res.confirm) {
            util.Request("/api/userCancelActivity", {
                'publishcId': e.currentTarget.dataset.uuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                that.koopdf()
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          } else if (res.cancel) {

          }
        }
      })
    }


  },
  //场馆签到
  signin: function (e) {
    util.Request("/api/userArrivalSignin", {
        'publicUid': e.currentTarget.dataset.id,
        'lat': wx.getStorageSync('lat'),
        'lng': wx.getStorageSync('lng')
      }, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        this.koopdf()

      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  //提前退出
  isQuit: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定提前退出本次活动么?',
      success(res) {
        if (res.confirm) {
          util.Request("/api/getmessage", {
              'uuid': e.currentTarget.dataset.uuid,
              type: 3
            }, "post",
            (res) => {
              that.koopdf()
            },
            () => {
              console.log("失败")
            },
            () => {}
          )
        } else if (res.cancel) {}
      }
    })

  },
  //中途退赛
  SignOut: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定退出本次活动么?',
      success(res) {
        if (res.confirm) {
          util.Request("/api/userMidwaySignOut", {
              'uuid': e.currentTarget.dataset.uuid
            }, "post",
            (res) => {
              that.koopdf()
            },
            () => {
              console.log("失败")
            },
            () => {}
          )
        } else if (res.cancel) {}
      }
    })

  },
  //填写比赛结果F
  comResult: function (e) {
    wx.navigateTo({
      url: '/generalization/yesResults/yesResults?publicuuid=' + e.currentTarget.dataset.id,
    })
  },
  //跳转待评价
  comment: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/generalization/appraisals/appraisals?id=' + e.currentTarget.dataset.id,
    })
  },
  //用户报名
  userSignUp: function (e) {
    let that = this
    if (e.currentTarget.dataset.team == 1) {
      var teamText = 'A'
    } else {
      var teamText = 'B'
    }

    if (this.data.typeTwo == 0) {
      wx.showModal({
        title: '提示',
        content: '您确定加入' + teamText + '队么?',
        success(res) {
          if (res.confirm) {
            let obj = {
              inviteId: that.data.activitiesData.uuid,
              team: e.currentTarget.dataset.team,
              SecondSportId: that.data.activitiesData.SportType,
              sportid: that.data.activitiesData.SportId,
              startTime: that.data.activitiesData.StartTime,
              playTime: that.data.activitiesData.PlayTime,
              SportMode: that.data.activitiesData.SportMode,
              SiteMoney: that.data.activitiesData.SiteMoney,
              number: that.data.activitiesData.needNumber,
              PaySiteMoneyType: that.data.activitiesData.PaySiteMoneyType,
              isPublisher: 0,
              isCooper: 1,
              Accompany: that.data.activitiesData.MoneyPerhour,
              Reward: that.data.activitiesData.Tips,
              refereefee: that.data.activitiesData.refereeFee,
              CreateTime:that.data.activitiesData.CreateTime
            }

            app.globalData = obj
            wx.navigateTo({
              url: '/generalization/payFor/payFor?look=1' + '&ko=1',
            })
          } else if (res.cancel) {}
        }
      })

    }
  },
  onShow: function () {
    this.koopdf()
  },
  addReferees:function(){
    let that=this
    wx.showModal({
      title: '提示',
      content: '您确定报名裁判么?',
      success(res) {
        if (res.confirm) {
          util.Request("/api/addReferees", {
              'inviteId':that.data.uuid,
              FirstSportId:that.data.activitiesData.SportId
            }, "post",
            (res) => {
               wx.navigateTo({
                url: '/generalization/createSuccess/createSuccess?inviteId=' +that.data.uuid + '&Identification=3' + '&referee=' + that.data.activitiesData.refereeFee + '&status=1' + '&time=' +that.data.activitiesData.CreateTime,
              })
            },
            () => {
              console.log("失败")
            },
            () => {}
          )
        } else if (res.cancel) {}
      }
    })

  },






})