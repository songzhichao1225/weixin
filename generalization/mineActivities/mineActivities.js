const util = require('../../utils/util.js')

Page({
  data: {
  listSon:[],
  },
  onLoad: function(option) {
    util.Request("/api/getMyActiveLst", { type: 'publish', statusType: 'cancel', page:1}, "get",
      (res) => {
       
        let projectDataNow = res.data.data.publicLst

        for (let i in projectDataNow) {
          if (projectDataNow[i].SportMode == '1') {
            projectDataNow[i].SportMode = '娱乐模式'
          } else if (projectDataNow[i].SportMode == '2') {
            projectDataNow[i].SportMode = '竞技模式 '
          } else if (projectDataNow[i].SportMode == '3') {
            projectDataNow[i].SportMode = '我是陪练 '
          } else if (projectDataNow[i].SportMode == '4') {
            projectDataNow[i].SportMode = '我找陪练 '
          } else if (projectDataNow[i].PaySiteMoneyType == 1) {
            projectDataNow[i].PaySiteMoneyType = 'AA'
          } else if (projectDataNow[i].PaySiteMoneyType == 0) {
            projectDataNow[i].PaySiteMoneyType = '输者买单'
          }
        }
        this.setData({
          listSon: projectDataNow
        })
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
    wx.hideLoading()
  },

})