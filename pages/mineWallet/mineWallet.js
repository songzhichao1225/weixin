//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    total:'',
    flag:false,
    forbade:false
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    util.Request("/api/getUserMoneyCount", {  }, "get",
      (res) => {
      
        this.setData({total:res.data.data.total,flag:true})
        wx.hideLoading()
      },
      () => { console.log("失败") },
      () => {
      }
    )

 
  },
  details(){
    wx.navigateTo({
      url: '/generalization/walletDetails/walletDetails'
    })
  },
  forbade(){
    this.setData({forbade:true})
  },
  closeTwo(){
    this.setData({forbade:false})
  },
  saveImg(e) {
    console.log()
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success: function (data) {
        console.log(data);
      },fail: function (err) {
        console.log(err);
        if (err.errMsg ==="saveImageToPhotosAlbum:fail auth deny") {console.log("用户一开始拒绝了，我们想再次发起授权")
          console.log(
            '打开设置窗口'
          )

          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)

              if (settingdata.authSetting[
                  'scope.writePhotosAlbum'
                ]) {

                console.log(
                  '获取权限成功，给出再次点击图片保存到相册的提示。'
                )

              } else {

                console.log(
                  '获取权限失败，给出不给权限就无法正常使用的提示'
                )

              }

            }

          })

        }

      }

    })
   
  }
})
