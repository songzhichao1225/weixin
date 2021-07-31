const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgURLT: [],
    img: '',
    textInput: '',
    textInputTwo: '',
    disBtn: false,
    indexUp: 1,
    video:'',
    thumbTempFilePath:'',
    oneImgs:'',
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
      itemList: ['拍照', '相册'],
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
                      let data = JSON.parse(res.data)
                      if (data.code == 2000) {
                        that.setData({
                          imgURLT: [...that.data.imgURLT, data.data]
                        })
                      } else if (data.code == 4003) {
                        wx.showToast({
                          title: '图片涉嫌违规，请重新上传',
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        })
                      } else {
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

  textInputTwo: function (e) {
    this.setData({
      textInputTwo: e.detail.value
    })
  },
  submit: function () {
    this.setData({
      disBtn: true
    })
    util.Request("/api/PlayerDynamicSave", {
        'title': this.data.textInput,
        'imgurl': this.data.imgURLT.join()
      }, 'post',
      (res) => {
        if (res.data.code === 2000) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500,
            mask: true
          })
         setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
         },1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
          this.setData({
            disBtn: false
          })
        }
      },
      () => {},
      () => {}
    )

  },
  delet: function (e) {
    let src = e.currentTarget.dataset.src
    let imgURLT = this.data.imgURLT
    imgURLT.splice(imgURLT.indexOf(src), 1)
    this.setData({
      imgURLT: imgURLT
    })
  },

  btnUp: function (e) {
    this.setData({
      indexUp: e.currentTarget.dataset.index
    })
  },


  chooseImgTwo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
      
        that.setData({thumbTempFilePath:res.thumbTempFilePath})
        wx.compressVideo({
          src: res.tempFilePath,
          quality: 'medium',
          success: function (result) {
            util.Request("/api/uploadWonderImgs", result.tempFilePath, 'post',
              (resTwo) => {
                let data = JSON.parse(resTwo.data)
                if(data.code==2000){

                  util.Request("/api/uploadWonderImgs", that.data.thumbTempFilePath, 'post',
                  (resTwo) => {
                    let data = JSON.parse(resTwo.data)
                    if(data.code==2000){
                     that.setData({
                      oneImgs:data.data.baseURL+data.data.filesURL
                     })
                    }
                  },
                  () => {},
                  () => {}
                )



                 that.setData({
                   video:data.data.baseURL+data.data.filesURL
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
        that.setData({
          src: res.tempFilePath,
        })
      }
    })
  },


  submitTwo: function () {
    this.setData({
      disBtn: true
    })
    util.Request("/api/PlayerDynamicSave", {
        'title': this.data.textInputTwo,
        'imgurl': this.data.video,
        'oneImgs':this.data.oneImgs
      }, 'post',
      (res) => {
        if (res.data.code === 2000) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500,
            mask: true
          })
         setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
         },1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          })
          this.setData({
            disBtn: false
          })
        }
      },
      () => {},
      () => {}
    )

  },

  deletTwo:function(){
    this.setData({video:'',thumbTempFilePath:''})
  },





})