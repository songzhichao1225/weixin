//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    total: '',
    flag: false,
    forbade: false
  },
  
  details() {
    wx.navigateTo({
      url: '/generalization/walletDetails/walletDetails'
    })
  },

  saveImg(e) {
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success: function (data) {
      },
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
  cashOut: function () {
    wx.navigateTo({
      url: '/generalization/cashOut/cashOut?money=' + this.data.total
    })
  },
  onShow:function(){
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getUserMoneyCount", {}, "get",
      (res) => {
        this.setData({
          total: res.data.data.total,
          flag: true
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  }
})