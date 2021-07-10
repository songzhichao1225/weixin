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
    type: 0,
    Publisher: 0, //是否是发布者 0不  1是
    AwinBuserInfoOne: [],
    AloseBuserInfoTwo: [],
    AdrawBuserInfoThree: [],
    getwaiverInfoFour: [],
    getRefereeResult: [],
    uuid: '',
    img: '',
    reverseInfo: 0,
    typeInfo: '',
    displayTxt: [],
    Invitation: '',
    plarUUid: '',
    masking: false,
    pageS: 1,
    enabledTwo: false,
    publicLst: [],
    flagClick: false,
    checkedTwoyou: 0,
    rule: '',
    ruleFlag: false
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
        console.log("失败")
      },
      () => {}
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

  webviewMood: function () {
    wx.navigateTo({
      url: '/generalization/webviewMood/webviewMood',
    })
  },

  inTheNews: function () {
    this.setData({
      masking: true
    })
  },
  maskClose: function () {
    this.setData({
      masking: false
    })
  },

  refreshTwo() {
    this.setData({
      enabledTwo: true,
      pageS: 1
    })
    this.ActiveLst()
  },

  //上拉加载
  tolowerTwo: function () {
    this.setData({
      pageS: this.data.pageS + 1
    })
    let showTwo = true
    this.ActiveLst(showTwo)
  },
  ActiveLst: function (showTwo) {
    util.Request("/api/getAcitivitylistBySmallPro", {
        'sid': this.data.uuid,
        'lat': wx.getStorageSync('lat'),
        'lng': wx.getStorageSync('lng'),
        'page': this.data.pageS,

      }, "post",
      (res) => {

        let projectNow = res.data.data.activeLst
        for (let i in projectNow) {
          projectNow[i].MoneyPerhour = projectNow[i].MoneyPerhour.toFixed(2)
          projectNow[i].Tips = projectNow[i].Tips.toFixed(2)
          if (projectNow[i].reserve == 1) {
            projectNow[i].SportModeTwo = '仅预订场馆'
          } else {
            if (projectNow[i].SportMode == 1) {
              projectNow[i].SportModeTwo = '娱乐模式'
            } else if (projectNow[i].SportMode == 2) {
              projectNow[i].SportModeTwo = '竞技模式'
            } else if (projectNow[i].SportMode == 3) {
              projectNow[i].SportModeTwo = '我是陪练'
            } else if (projectNow[i].SportMode == 4) {
              projectNow[i].SportModeTwo = '我找陪练'
            }
          }
        }

        if (showTwo == true) {
          var data = [...this.data.publicLst, ...projectNow]
          if (projectNow.length == 0) {
            wx.showToast({
              title: '没有更多了~',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          var data = projectNow
        }

        this.setData({
          publicLst: data,
          enabledTwo: false
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )


  },

  activities: function (e) {
    this.setData({
      uuid: e.currentTarget.dataset.uuid,
      masking: false,
      hoog: 0,
      pageS: 1
    })
    this.onShow()

  },

  onLoad: function (option) {
    this.setData({
      img: util.API,
      plarUUid: wx.getStorageSync('uuid')
    })
    if (option.Invite_code == undefined) {
      app.globalData.Invite_code = '';
    } else {
      app.globalData.Invite_code = option.Invite_code
    }

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
     
      this.setData({
        uuid: option.uuid
      })
      wx.setStorageSync('activitiesId', option.uuid)
      wx.setStorageSync('activitieshoog', option.hoog)
      wx.setStorageSync('activitiestype', '1')
    }
  },

  onShow() {
    this.koopdf()
    app.deductibles = []
    app.envelope = []
  },

  showModel: function (e) {
    wx.showModal({
      title: '场地号详情',
      showCancel: false,
      content: e.currentTarget.dataset.ven,
      success(res) {
        if (res.confirm) {

        }
      }
    })

  },
  showModelTwo: function (e) {
    this.setData({
      reverseInfo: 1,
      typeInfo: e.currentTarget.dataset.type
    })
  },
  close: function () {
    this.setData({
      reverseInfo: 0,
      typeInfo: ''
    })
  },

  addressGo: function (e) {
    let data = e.currentTarget.dataset
    wx.openLocation({
      latitude: Number(data.lat), //维度
      longitude: Number(data.lng), //经度
      name: '我的位置', //目的地定位名称
      scale: 15, //缩放比例
      address: data.address //导航详细地址
    })
  },

  venueDetails: function (e) {
    wx.navigateTo({
      url: '/generalization/venueDetails/venueDetails?sportid=' + this.data.activitiesData.sportId + '&sporttype=' + this.data.activitiesData.SportType + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&falg=3',
    })
  },

  //接口函数
  koopdf: function () {
    let that = this
    util.Request("/api/getActivityInfo", {
        'uuid': this.data.uuid
      }, "get",
      (res) => {

        let projectNow = res.data.data
        if (projectNow.reserve == 1) {
          projectNow.SportModeTwo = '仅预订场馆'
        } else {
          if (projectNow.SportMode == '1') {
            projectNow.SportModeTwo = '娱乐模式'
          } else if (projectNow.SportMode == '2') {
            projectNow.SportModeTwo = '竞技模式'
          } else if (projectNow.SportMode == '3') {
            projectNow.SportModeTwo = '我是陪练'
          } else if (projectNow.SportMode == '4') {
            projectNow.SportModeTwo = '我找陪练'
          }
        }


        this.setData({
          AwinBuserInfoOne: projectNow.AwinBuserInfo,
          AloseBuserInfoTwo: projectNow.AloseBuserInfo,
          AdrawBuserInfoThree: projectNow.AdrawBuserInfo,
          getwaiverInfoFour: projectNow.getwaiverInfo
        })
        this.tagStatus(projectNow)
        this.tagStatusTwo(projectNow)
        this.tagStatusThree(projectNow)

        if (projectNow.needNumber > 1) {


          if (projectNow.teamA[0].uuid != wx.getStorageSync('uuid')) {
            this.setData({
              Publisher: 0
            })
          } else {
            this.setData({
              Publisher: 1
            })
          }
          let koarr = [...projectNow.teamA, ...projectNow.teamB, ...projectNow.teamC]
          let hoArr = []
          for (let i in koarr) {
            hoArr.push(koarr[i].uuid)
          }
          if (hoArr.indexOf(wx.getStorageSync('uuid')) != -1 && projectNow.isPublisher == 1 && projectNow.organization == 0 || projectNow.organization == 1 && hoArr.indexOf(wx.getStorageSync('uuid')) != -1) {
            this.setData({
              typeTwo: 1
            })
          } else {
            this.setData({
              typeTwo: 0
            })
          }
        }
        projectNow.deserved = projectNow.deserved.toFixed(2)
        projectNow.MoneyPerhour = projectNow.MoneyPerhour.toFixed(2)
        projectNow.Tips = projectNow.Tips.toFixed(2)
        projectNow.SiteMoney = projectNow.SiteMoney.toFixed(2)
        projectNow.PipeMainMoney = projectNow.PipeMainMoney.slice(0, projectNow.PipeMainMoney.length - 1)
        this.countdown(projectNow.JoinEndTime)
        let sportName = projectNow.sportName
        this.judgmentBall(sportName, projectNow)
        this.setData({
          activitiesData: projectNow,
          moneyType: projectNow.SiteMoney.toString().indexOf('.'),
          flag: true,
        })
        if(projectNow.stay==1||projectNow.isPublisher==1){
             this.setData({type:1})
        }

        util.Request("/api/display", {
            'SportType': projectNow.SportType,
            'type': projectNow.organization == 1 ? 2 : projectNow.SportMode == 4 ? 5 : projectNow.reserve == 1 ? 3 : projectNow.SportMode == 3 ? 4 : 1,
            'status': projectNow.isPublisher == 1 ? 1 : 2,
            'referee': projectNow.refereeFee,
            'siteMoney': projectNow.SiteMoney,
            'Tips': projectNow.Tips,
            'lr': projectNow.lr,
            'openPrice': projectNow.openPrice,
            'pPrice': projectNow.MoneyPerhour,
            'tips': projectNow.Tips
          }, "post",
          (res) => {
            this.setData({
              displayTxt: res.data.data
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

        util.Request("/api/alertForOrgActivityNotFullWindow", {
            'uuid': this.data.uuid
          }, "post",
          (res) => {
            if (res.data.data.alert != '') {
              wx.showModal({
                title: '温馨提示',
                content: res.data.data.alert,
                success(res) {
                  if (res.confirm) {
                    util.Request("/api/ifAgreeOrgActivityNotFull", {
                        'uuid': that.data.uuid,
                        'type': 1
                      }, "post",
                      (resTwo) => {
                        wx.showToast({
                          title: resTwo.data.msg,
                          icon: 'success',
                          duration: 1500,
                          mask: true
                        })
                        wx.hideLoading()
                      },
                      () => {
                        console.log("失败")
                      },
                      () => {}
                    )
                  } else if (res.cancel) {
                    util.Request("/api/ifAgreeOrgActivityNotFull", {
                        'uuid': that.data.uuid,
                        'type': 0
                      }, "post",
                      (resTwo) => {
                        wx.showToast({
                          title: resTwo.data.msg,
                          icon: 'success',
                          duration: 1500,
                          mask: true
                        })

                        wx.hideLoading()
                      },
                      () => {
                        console.log("失败")
                      },
                      () => {}
                    )
                  }
                }
              })

            }



            wx.hideLoading()
          },
          () => {
            console.log("失败")
          },
          () => {}
        )

        util.Request("/api/getHighestLevel", {}, "get",
          (res) => {
            this.setData({
              Invitation: res.data.data.Invitation
            })
            wx.hideLoading()
          },
          () => {
            console.log("失败")
          },
          () => {}
        )


        util.Request("/api/getAcitivitylistBySmallPro", {
            'sid': this.data.uuid,
            'lat': wx.getStorageSync('lat'),
            'lng': wx.getStorageSync('lng'),
            'page': this.data.pageS,

          }, "post",
          (res) => {
            if (res.data.data.length != 0) {
              let projectNow = res.data.data.activeLst
              for (let i in projectNow) {
                if (projectNow[i].reserve == 1) {
                  projectNow[i].SportModeTwo = '仅预订场馆'
                } else {
                  if (projectNow[i].SportMode == 1) {
                    projectNow[i].SportModeTwo = '娱乐模式'
                  } else if (projectNow[i].SportMode == 2) {
                    projectNow[i].SportModeTwo = '竞技模式'
                  } else if (projectNow[i].SportMode == 3) {
                    projectNow[i].SportModeTwo = '我是陪练'
                  } else if (projectNow[i].SportMode == 4) {
                    projectNow[i].SportModeTwo = '我找陪练'
                  }
                }
              }
              this.setData({
                publicLst: projectNow,

              })
            } else {
              this.setData({
                publicLst: [],

              })
            }


            wx.hideLoading()
          },
          () => {
            console.log("失败")
          },
          () => {}
        )

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
    let totalSecond = (Date.parse(StartTime.replace(/-/g, "/")) - Date.parse(new Date())) / 1000;
    let interval = setInterval(function () {
      let second = totalSecond;
      // 天数
      let day = Math.floor(second / 3600 / 24);
      let dayStr = day;
      if (dayStr.length == 1) dayStr = dayStr;

      // 小时
      let hr = Math.floor((second - day * 3600 * 24) / 3600);
      let hrStr = hr;
      if (hrStr.length == 1) hrStr = hrStr;
      //分                   
      let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      let minStr = min;
      if (minStr.length == 1) minStr = minStr;


      // 秒
      let sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      let secStr = sec;
      if (secStr.length == 1) secStr = secStr;
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      })


      totalSecond--;
      if (totalSecond < 0 || this.data.activitiesData.reserve === 1 || this.data.activitiesData.PublicStatus === 7) {
        clearInterval(interval);
        this.setData({
          end: false,
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
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
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: '我邀请您参加' + this.data.activitiesData.wxShare + '在' + this.data.activitiesData.siteName + '的' + this.data.activitiesData.sportName + this.data.activitiesData.sportTypeName + '活动',
      path: '/pages/homePage/activities/activities?uuid=' + this.data.uuid + '&hoog=1' + '&type=1' + '&Invite_code=' + this.data.Invitation,
      imageUrl: '../../../assets/fengxiang.jpg',
      success: function () {
        util.Request("/api/userShare", {
            'type': 'activity'
          }, "post",
          (res) => {
            if (res.data.code === 2000) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1500,
                mask: true
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
            console.log("失败")
          },
          () => {}
        )

      }
    }
  },


  tagStatus: function (projectNow) {
    for (let i in projectNow.teamA) {
      if (projectNow.PublicStatus == 2&&projectNow.ifMustSign==1) {
        if (projectNow.teamA[i].isQuit == 2) {
          projectNow.teamA[i].nameStatus = '提前退出'
        }else if (projectNow.teamA[i].isSignIns == 1) {
          projectNow.teamA[i].nameStatus = '已签到'
        } else if (projectNow.teamA[i].isSignIns == 2) {
          projectNow.teamA[i].nameStatus = '迟到'
        } else if (projectNow.teamA[i].isSignIns == 3) {
          projectNow.teamA[i].nameStatus = '未签到'
        } 
      }
      if (projectNow.PublicStatus == 3&&projectNow.ifMustSign==1) {
        if (projectNow.teamA[i].isQuit == 2) {
          projectNow.teamA[i].nameStatus = '提前退出'
        }else if (projectNow.teamA[i].isQuitInGame == 2) {
          projectNow.teamA[i].nameStatus = '中途退出'
        }else if (projectNow.teamA[i].isSignIns == 1) {
          projectNow.teamA[i].nameStatus = '已签到'
        } else if (projectNow.teamA[i].isSignIns== 2) {
          projectNow.teamA[i].nameStatus = '迟到'
        } else if (projectNow.teamA[i].isSignIns == 3) {
          projectNow.teamA[i].nameStatus = '未签到'
        }
      }
      if (projectNow.PublicStatus == 4&&projectNow.ifMustSign==1) {
        if (projectNow.teamA[i].isQuit == 2) {
          projectNow.teamA[i].nameStatus = '提前退出'
        } else if (projectNow.teamA[i].isQuitInGame == 2) {
          projectNow.teamA[i].nameStatus = '中途退出'
        } else if (projectNow.teamA[i].isConfirmResult == 1) {
          projectNow.teamA[i].nameStatus = '已填写'
        } else if (projectNow.teamA[i].isConfirmResult == 0) {
          projectNow.teamA[i].nameStatus = '待填写'
        }else if (projectNow.teamA[i].isSignIns == 1) {
          projectNow.teamA[i].nameStatus = '已签到'
        } else if (projectNow.teamA[i].isSignIns == 2) {
          projectNow.teamA[i].nameStatus = '迟到'
        } else if (projectNow.teamA[i].isSignIns == 3) {
          projectNow.teamA[i].nameStatus = '未签到'
        }
      }

      if (projectNow.teamA[i].isCancel != 2 && projectNow.PublicStatus == 6&&projectNow.ifMustSign==1) {
        if(projectNow.teamA[i].isSignIn == 1){
          if (projectNow.teamA[i].isComment == 1) {
            projectNow.teamA[i].nameStatus = '已评价'
          } else if (projectNow.teamA[i].isComment == 0) {
            projectNow.teamA[i].nameStatus = '待评价'
          }
        }else{
          if (projectNow.teamA[i].isQuit == 2) {
            projectNow.teamA[i].nameStatus = '提前退出'
          }else if (projectNow.teamA[i].isQuitInGame == 2) {
            projectNow.teamA[i].nameStatus = '中途退出'
          } else if (projectNow.teamA[i].isSignIns == 3) {
            projectNow.teamA[i].nameStatus = '未签到'
          }
        }
  
      }
      if (projectNow.PublicStatus == 7&&projectNow.ifMustSign==1) {
        if (projectNow.teamA[i].isSignIn == 1) {
          projectNow.teamA[i].nameStatus = '已签到'
        } else if (projectNow.teamA[i].isSignIns == 2) {
          projectNow.teamA[i].nameStatus = '迟到'
        } else if (projectNow.teamA[i].isSignIns == 3) {
          projectNow.teamA[i].nameStatus = '未签到'
        }
      }

      if (projectNow.PublicStatus == 5&&projectNow.ifMustSign==1) {
          if (projectNow.teamA[i].isQuit == 2) {
            projectNow.teamA[i].nameStatus = '提前退出'
          }else if (projectNow.teamA[i].isQuitInGame == 2) {
            projectNow.teamA[i].nameStatus = '中途退出'
          }else if (projectNow.teamA[i].isComment == 1) {
            projectNow.teamA[i].nameStatus = '已评价'
          } else if (projectNow.teamA[i].isSignIns == 2) {
          projectNow.teamA[i].nameStatus = '迟到'
        } else if (projectNow.teamA[i].isSignIns == 3) {
          projectNow.teamA[i].nameStatus = '未签到'
        }
      }
    }
  },

  tagStatusTwo: function (projectNow) {
    for (let i in projectNow.teamB) {
      if (projectNow.PublicStatus == 2&&projectNow.ifMustSign==1) {
        if (projectNow.teamB[i].isQuit == 2) {
          projectNow.teamB[i].nameStatus = '提前退出'
        }else if (projectNow.teamB[i].isSignIns == 1) {
          projectNow.teamB[i].nameStatus = '已签到'
        } else if (projectNow.teamB[i].isSignIns == 2) {
          projectNow.teamB[i].nameStatus = '迟到'
        } else if (projectNow.teamB[i].isSignIns == 3) {
          projectNow.teamB[i].nameStatus = '未签到'
        }
      }
      if (projectNow.PublicStatus == 3&&projectNow.ifMustSign==1) {
        if (projectNow.teamB[i].isQuit == 2) {
          projectNow.teamB[i].nameStatus = '提前退出'
        }else if (projectNow.teamB[i].isQuitInGame == 2) {
          projectNow.teamB[i].nameStatus = '中途退出'
        }else if (projectNow.teamB[i].isSignIns == 1) {
          projectNow.teamB[i].nameStatus = '已签到'
        } else if (projectNow.teamB[i].isSignIns == 2) {
          projectNow.teamB[i].nameStatus = '迟到'
        } else if (projectNow.teamB[i].isSignIns == 3) {
          projectNow.teamB[i].nameStatus = '未签到'
        }
      }
      if (projectNow.PublicStatus == 4&&projectNow.ifMustSign==1) {
        if (projectNow.teamB[i].isQuit == 2) {
          projectNow.teamB[i].nameStatus = '提前退出'
        } else if (projectNow.teamB[i].isQuitInGame == 2) {
          projectNow.teamB[i].nameStatus = '中途退出'
        } else if (projectNow.teamB[i].isConfirmResult == 1) {
          projectNow.teamB[i].nameStatus = '已填写'
        } else if (projectNow.teamB[i].isConfirmResult == 0) {
          projectNow.teamB[i].nameStatus = '待填写'
        }else if (projectNow.teamB[i].isSignIns == 1) {
          projectNow.teamB[i].nameStatus = '已签到'
        } else if (projectNow.teamB[i].isSignIns == 2) {
          projectNow.teamB[i].nameStatus = '迟到'
        } else if (projectNow.teamB[i].isSignIns == 3) {
          projectNow.teamB[i].nameStatus = '未签到'
        }
      }
      if (projectNow.teamB[i].isCancel != 2 && projectNow.PublicStatus == 6&&projectNow.ifMustSign==1) {
        if(projectNow.teamB[i].isSignIn == 1){
          if (projectNow.teamB[i].isComment == 1) {
            projectNow.teamB[i].nameStatus = '已评价'
          } else if (projectNow.teamB[i].isComment == 0) {
            projectNow.teamB[i].nameStatus = '待评价'
          }
        }else{
          if (projectNow.teamB[i].isQuit == 2) {
            projectNow.teamB[i].nameStatus = '提前退出'
          }else if (projectNow.teamB[i].isQuitInGame == 2) {
            projectNow.teamB[i].nameStatus = '中途退出'
          } else if (projectNow.teamB[i].isSignIns == 3) {
            projectNow.teamB[i].nameStatus = '未签到'
          }
        }
      }
      if (projectNow.PublicStatus == 7&&projectNow.ifMustSign==1) {
        if (projectNow.teamB[i].isSignIns== 1) {
          projectNow.teamB[i].nameStatus = '已签到'
        } else if (projectNow.teamB[i].isSignIns == 2) {
          projectNow.teamB[i].nameStatus = '迟到'
        } else if (projectNow.teamB[i].isSignIns == 3) {
          projectNow.teamB[i].nameStatus = '未签到'
        }
      }

      if (projectNow.PublicStatus == 5&&projectNow.ifMustSign==1) {
        if (projectNow.teamB[i].isQuit == 2) {
          projectNow.teamB[i].nameStatus = '提前退出'
        }else if (projectNow.teamB[i].isQuitInGame == 2) {
          projectNow.teamB[i].nameStatus = '中途退出'
        }else if (projectNow.teamB[i].isComment == 1) {
          projectNow.teamB[i].nameStatus = '已评价'
        } else if (projectNow.teamB[i].isSignIns == 2) {
        projectNow.teamB[i].nameStatus = '迟到'
      } else if (projectNow.teamB[i].isSignIns == 3) {
        projectNow.teamB[i].nameStatus = '未签到'
      }
    }
    }
  },

  tagStatusThree: function (projectNow) {
    for (let i in projectNow.teamC) {
      if (projectNow.PublicStatus == 2&&projectNow.ifMustSign==1) {
        if (projectNow.teamC[i].isQuit == 2) {
          projectNow.teamC[i].nameStatus = '提前退出'
        }else if (projectNow.teamC[i].isSignIns == 1) {
          projectNow.teamC[i].nameStatus = '已签到'
        } else if (projectNow.teamC[i].isSignIns == 2) {
          projectNow.teamC[i].nameStatus = '迟到'
        } else if (projectNow.teamC[i].isSignIns == 3) {
          projectNow.teamC[i].nameStatus = '未签到'
        }

      }
      if (projectNow.PublicStatus == 3&&projectNow.ifMustSign==1) {
        if (projectNow.teamC[i].isQuit == 2) {
          projectNow.teamC[i].nameStatus = '提前退出'
        }else if (projectNow.teamC[i].isQuitInGame == 2) {
          projectNow.teamC[i].nameStatus = '中途退出'
        }else if (projectNow.teamC[i].isSignIns == 1) {
          projectNow.teamC[i].nameStatus = '已签到'
        } else if (projectNow.teamC[i].isSignIns == 2) {
          projectNow.teamC[i].nameStatus = '迟到'
        } else if (projectNow.teamC[i].isSignIns == 3) {
          projectNow.teamC[i].nameStatus = '未签到'
        }
      }
      if (projectNow.PublicStatus == 4&&projectNow.ifMustSign==1) {
        if (projectNow.teamC[i].isQuit == 2) {
          projectNow.teamC[i].nameStatus = '提前退出'
        } else if (projectNow.teamC[i].isQuitInGame == 2) {
          projectNow.teamC[i].nameStatus = '中途退出'
        } else if (projectNow.teamC[i].isConfirmResult == 1) {
          projectNow.teamC[i].nameStatus = '已填写'
        } else if (projectNow.teamC[i].isConfirmResult == 0) {
          projectNow.teamC[i].nameStatus = '待填写'
        }else if (projectNow.teamC[i].isSignIns == 1) {
          projectNow.teamC[i].nameStatus = '已签到'
        } else if (projectNow.teamC[i].isSignIns == 2) {
          projectNow.teamC[i].nameStatus = '迟到'
        } else if (projectNow.teamC[i].isSignIns == 3) {
          projectNow.teamC[i].nameStatus = '未签到'
        }
      }
      if (projectNow.teamC[i].isCancel != 2 && projectNow.PublicStatus == 6&&projectNow.ifMustSign==1) {
        if(projectNow.teamC[i].isSignIn == 1){
          if (projectNow.teamC[i].isComment == 1) {
            projectNow.teamC[i].nameStatus = '已评价'
          } else if (projectNow.teamC[i].isComment == 0) {
            projectNow.teamC[i].nameStatus = '待评价'
          }
        }else{
          if (projectNow.teamC[i].isQuit == 2) {
            projectNow.teamC[i].nameStatus = '提前退出'
          }else if (projectNow.teamC[i].isQuitInGame == 2) {
            projectNow.teamC[i].nameStatus = '中途退出'
          } else if (projectNow.teamC[i].isSignIns == 3) {
            projectNow.teamC[i].nameStatus = '未签到'
          }
        }
      }
      if (projectNow.PublicStatus == 7&&projectNow.ifMustSign==1) {
        if (projectNow.teamC[i].isSignIns == 1) {
          projectNow.teamC[i].nameStatus = '已签到'
        } else if (projectNow.teamC[i].isSignIns == 2) {
          projectNow.teamC[i].nameStatus = '迟到'
        } else if (projectNow.teamC[i].isSignIns == 3) {
          projectNow.teamC[i].nameStatus = '未签到'
        }
      }
      if (projectNow.PublicStatus == 5&&projectNow.ifMustSign==1) {
        if (projectNow.teamC[i].isQuit == 2) {
          projectNow.teamC[i].nameStatus = '提前退出'
        }else if (projectNow.teamC[i].isQuitInGame == 2) {
          projectNow.teamC[i].nameStatus = '中途退出'
        }else if (projectNow.teamC[i].isComment == 1) {
          projectNow.teamC[i].nameStatus = '已评价'
        } else if (projectNow.teamC[i].isSignIns == 2) {
        projectNow.teamC[i].nameStatus = '迟到'
      } else if (projectNow.teamC[i].isSignIns == 3) {
        projectNow.teamC[i].nameStatus = '未签到'
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
      title: '温馨提示',
      content: this.data.activitiesData.SportModeTwo == '我找陪练' || this.data.activitiesData.SportModeTwo == '我是陪练' ? '您确定提前退出吗？如不是练习方先提前退出，您提前退出后，将被要求补缴补偿金且无法拿到陪练费。' : '您确定提前退出吗?系统将会按照用户提前退出的先后顺序，要求用户补缴补偿金。',
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


    util.Request("/api/userHalfwayHint", { 'uuid':e.currentTarget.dataset.uuid}, "post", 
    (resTwo) => {
      wx.showModal({
        title: '提示',
        content: resTwo.data.data,
        success (res) {
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
    () => { console.log("失败") },
    () => {
    }
  )

    

   
  },
  //填写比赛结果F
  comResult: function (e) {
    wx.navigateTo({
      url: '/generalization/yesResults/yesResults?publicuuid=' + e.currentTarget.dataset.id,
    })
  },
  //跳转待评价
  comment: function (e) {
    wx.navigateTo({
      url: '/generalization/appraisals/appraisals?id=' + e.currentTarget.dataset.id,
    })
  },
  //用户报名
  userSignUp: function (e) {

    let that = this
    if (e.currentTarget.dataset.team == 1) {
      var teamText = 'A队'
    } else if (e.currentTarget.dataset.team == 2) {
      if (this.data.activitiesData.SportModeTwo == '我找陪练') {
        var teamText = '陪练方'
      } else if (this.data.activitiesData.SportModeTwo == '我是陪练') {
        var teamText = '练习方'
      } else {
        var teamText = 'B队'
      }

    } else {
      var teamText = 'C队'
    }
    if (this.data.flagClick == true) {
      return false
    }

    this.setData({
      flagClick: true
    })

    let index = e.currentTarget.dataset.index
    if (e.currentTarget.dataset.name == '我找陪练' && this.data.checkedTwoyou != 1) {
      wx.showToast({
        title: '请阅读并同意《补偿金规则》',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      this.setData({
        flagClick: false
      })
    } else {
      if (this.data.typeTwo == 0 && this.data.activitiesData.PublicStatus == 1) {
        
        util.Request("/api/getCondition", {
            'uuid': that.data.activitiesData.uuid,
            'mark': 1,
            'team': e.currentTarget.dataset.team == 3 ? 4 : e.currentTarget.dataset.team
          }, "post",
          (resSix) => {
            if (resSix.data.code == 2000) {
              util.Request("/api/getjudgeTime", {
                'StartTime': that.data.activitiesData.StartTime,
                'PlayTime':that.data.activitiesData.PlayTime,
                'SportId': that.data.activitiesData.SportId,
                'SportMode':that.data.activitiesData.SportMode,
                'venueid':that.data.activitiesData.venueid,
                'siteUid':that.data.activitiesData.siteUid,
                'sportType':that.data.activitiesData.SportType
              }, "post",
              (resTwo) => {
                if(resTwo.data.code==2000){
                  util.Request("/api/usercread", {}, "post",
                  (res) => {
                    if (res.data.data.type == 1) {
                      wx.showModal({
                        title: '温馨提示',
                        showCancel: false,
                        content: res.data.data.commit + '(打开APP支付)',
                      })
                      this.setData({
                        flagClick: false
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '您确定加入' + teamText + '么?',
                        success(res) {
                          if (res.confirm) {
                            let obj = {
                              inviteId: that.data.activitiesData.uuid,
                              team: e.currentTarget.dataset.team == 3 ? 4 : e.currentTarget.dataset.team,
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
                              CreateTime: that.data.activitiesData.CreateTime,
                              pos: index.toString(),
                              organization: that.data.activitiesData.SportMode == 3 ? 0 : that.data.activitiesData.ifMustSign,
                            }
                            that.setData({
                              flagClick: false
                            })
  
                            if (e.currentTarget.dataset.name == '我找陪练') {
                              util.Request("/api/usertrainee", {
                                  'inviteId': that.data.activitiesData.uuid,
                                  'team': e.currentTarget.dataset.team == 3 ? 4 : e.currentTarget.dataset.team,
                                  'SecondSportId': that.data.activitiesData.SportType,
                                  'startTime': that.data.activitiesData.StartTime,
                                  'playTime': that.data.activitiesData.PlayTime,
                                  'FirstSportId': that.data.activitiesData.SportId,
                                  'pos': 0
                                }, "post",
                                (res) => {
                                  if (res.data.code == 2000) {
                                    wx.navigateTo({
                                      url: '/generalization/createSuccess/createSuccess?inviteId=' + that.data.activitiesData.uuid + '&Identification=2' + '&typeInfo=0' + '&referee=0' + '&status=1' + '&time=' + app.globalData.CreateTime,
                                    })
                                  } else {
                                    wx.showToast({
                                      title: res.data.msg,
                                      icon: 'none',
                                      duration: 1500,
                                      mask: true
                                    })
                                  }
                                  this.setData({
                                    flagClick: false
                                  })
  
                                },
                                () => {
                                  console.log("失败")
                                },
                                () => {}
                              )
                            } else {
                              app.globalData = obj
                              wx.navigateTo({
                                url: '/generalization/payFor/payFor?look=1' + '&ko=1',
                              })

                              that.setData({
                                flagClick: false
                              })
                            }
  
                          } else if (res.cancel) {}
                        }
                      })
                      this.setData({
                        flagClick: false
                      })
  
                    }
  
                  },
                  () => {
                    console.log("失败")
                  }, () => {}
                )
  
                }else{
                  wx.showToast({
                    title: resTwo.data.msg,
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                }
               
        
              },
              () => {
                console.log("失败")
              },
              () => {}
            )









             

            


            
            } else {
              wx.showToast({
                title: resSix.data.msg,
                icon: 'none',
                duration: 1500,
                mask: true
              })
              this.setData({
                flagClick: false
              })
            }


          },
          () => {
            console.log("失败")
          },
          () => {}
        )




      }
    }
  },
  insuranceDe() {
    wx.navigateTo({
      url: '/generalization/insuranceDe/insuranceDe',
    })
  },

  addReferees: function () {
    let that = this
    return false
    wx.showModal({
      title: '提示',
      content: '您确定报名裁判么?',
      success(res) {
        if (res.confirm) {
          util.Request("/api/addReferees", {
              'inviteId': that.data.uuid,
              FirstSportId: that.data.activitiesData.SportId
            }, "post",
            (res) => {
              wx.navigateTo({
                url: '/generalization/createSuccess/createSuccess?inviteId=' + that.data.uuid + '&Identification=3' + '&referee=' + that.data.activitiesData.refereeFee + '&status=1' + '&time=' + that.data.activitiesData.CreateTime,
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