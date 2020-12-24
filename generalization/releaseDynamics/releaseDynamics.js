const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgURLT: [],
    img: '',
    textInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img: util.API
    })
    wx.hideLoading()
  },

  chooseImg: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['相册', '拍照'],
      success: function (res) {
        wx.showNavigationBarLoading()
        let imgArr = null;
        if (res.tapIndex == 0) {
          imgArr = ['camera']
        } else if (res.tapIndex == 1) {
          imgArr = ['album']
        }
        wx.chooseImage({
          count: 9 - that.data.imgURLT.length,
          sizeType: ['original', 'compressed'],
          sourceType: imgArr,
          success: function (res) {
            let tempFilePaths = res.tempFilePaths
            let ko = tempFilePaths
            for (let i in ko) {
              wx.compressImage({
                src: ko[i],
                quality: 20,
                success: function (res) {
                  util.Request("/api/PersonalprofileImg", res.tempFilePath, 'post',
                    (res) => {
                      let  data=JSON.parse(res.data)
                      if(data.code==2000){
                        that.setData({
                          imgURLT: [...that.data.imgURLT, data.data]
                        })
                      }else if(data.code==4003){
                        wx.showToast({
                          title: '图片涉嫌违规，请重新上传',
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })
                      }else{
                        wx.showToast({
                          title: '上传失败',
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })
                      }
                     
                    },
                    () => {},
                    () => {}
                  )
                }
              })
            }


          }
        })
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
      }
    })
  },
  textInput: function (e) {
    this.setData({
      textInput: e.detail.value
    })
  },
  submit: function () {
    util.Request("/api/PlayerDynamicSave", {
        'title': this.data.textInput,
        'imgurl': this.data.imgURLT.join()
      }, 'post',
      (res) => {
        if(res.data.code===2000){
          wx.navigateBack({
            delta: 2
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      () => {},
      () => {}
    )

  },
  delet:function(e){
    let src=e.currentTarget.dataset.src
    let imgURLT=this.data.imgURLT
    imgURLT.splice(imgURLT.indexOf(src),1)
    this.setData({imgURLT:imgURLT})
  },






})