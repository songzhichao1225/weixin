//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    activitiesData: [],
    flag:false,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    end:true,
    img:'',
  },

  onLoad: function (option) {
    wx.showLoading({
      title: '',
      mask: true
    })
    this.setData({
      img:util.API
    })
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
        let object={name:"邀请",hid:false}
        let needNum = projectNow.needNumber/2
        for (let i = 0; i = needNum - projectNow.teamA.length; i++) {
            projectNow.teamA.push(object)
          }
        for (let i = 0; i = needNum - projectNow.teamB.length; i++) {
            projectNow.teamB.push(object)
          }
        this.countdown(projectNow.StartTime)
        
        let sportName = projectNow.sportName
        this.judgmentBall(sportName, projectNow)
        this.setData({
          activitiesData: projectNow,
          flag:true
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )
  },
  //判断球类
  judgmentBall: function (sportName, projectNow) {
    if (sportName=='台球') {
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
   
  countdown: function (StartTime){
    let totalSecond = (Date.parse(StartTime) - Date.parse(new Date())) / 1000;
    let interval = setInterval(function () {
      let second = totalSecond;
      // 天数
      let day = Math.floor(second / 3600 / 24);
      let dayStr = day.toString();
      if (dayStr.length == 1) dayStr =  dayStr;

      // 小时
      let hr = Math.floor((second - day * 3600 * 24) / 3600);
      let hrStr = hr.toString();
      if (hrStr.length == 1) hrStr =  hrStr;
      //分                   
      let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      let minStr = min.toString();
      if (minStr.length == 1) minStr =  minStr;


      // 秒
      let sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      let secStr = sec.toString();

  
      if (secStr.length == 1) secStr =  secStr;
    

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
          end:false
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
          (res) => {
          },
          () => {
            console.log("失败")
          },
          () => {
          }
        )
      }
    }
  },
  history:function(e){
    wx.navigateTo({
      url: '/generalization/history/history?uuid=' + e.currentTarget.dataset.uid
    })
  },
  notTrue:function(e){
    wx.navigateTo({
      url: '/generalization/notTrue/notTrue?status=' + e.currentTarget.dataset.status + '&&uuid=' + e.currentTarget.dataset.uuid
    })
  }


})



 


