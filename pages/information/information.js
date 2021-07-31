const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    img: '',
    imgURL: '',
    imgT: '',
    imgURLT: '',
    mask: false,
    change: 0,
    Img:'',
  },
  onLoad: function() {
    wx.hideLoading()
    this.setData({
      Img:util.API
    })
  },

  positiveUp: function() {

    let that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机选择'],
      success: function (res) {
        let imgArr = null;
        if (res.tapIndex == 0) {
          imgArr = ['camera']
        } else if (res.tapIndex == 1) {
          imgArr = ['album']
        }
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: imgArr,
          success: function (res) {
            let tempFilePaths = res.tempFilePaths[0]
            that.setData({
              img: res.tempFilePaths[0]
            })
            let thso = that
            wx.uploadFile({
              url: ''+this.data.Img+'/api/positiveidcard',
              filePath: tempFilePaths,
              name: 'files',
              header: {
                "Content-Type": "multipart/form-data",
                "token": wx.getStorageSync('token'),
              },
              method: 'post',
              success: function (res) {
                let jsonUrl = JSON.parse(res.data)
                thso.setData({
                  imgURL: jsonUrl.data.baseURL + jsonUrl.data.filesURL
                })
                wx.stopPullDownRefresh(); //停止下拉刷新
                wx.hideNavigationBarLoading() //完成停止加载
              }
            })
          }
        })

      }
    })
  },

  positiveDown: function() {
    let that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机选择'],
      success: function(res) {
        let imgArr = null;
        if (res.tapIndex == 0) {
          imgArr = ['camera']
        } else if (res.tapIndex == 1) {
          imgArr = ['album']
        }
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: imgArr,
          success: function(res) {
            let tempFilePaths = res.tempFilePaths[0]
            that.setData({
              imgT: res.tempFilePaths[0]
            })
            let thso = that
            wx.uploadFile({
              url: ''+this.data.Img+'/api/positiveidcard',
              filePath: tempFilePaths,
              name: 'files',
              header: {
                "Content-Type": "multipart/form-data",
                "token": wx.getStorageSync('token'),
              },
              method: 'post',
              success: function(res) {
                let jsonUrl = JSON.parse(res.data)
                thso.setData({
                  imgURLT: jsonUrl.data.baseURL + jsonUrl.data.filesURL
                })
                wx.stopPullDownRefresh(); //停止下拉刷新
                wx.hideNavigationBarLoading() //完成停止加载
              }
            })
          }
        })

      }
    })

  },
  positive: function() {
    this.setData({
      mask: true,
      change: 0
    })
  },
  cacel: function() {
    this.setData({
      mask: false
    })
  },
  opposite: function() {
    this.setData({
      mask: true,
      change: 1
    })
  },
  submit: function(e) {
    let json = e.detail.value
    let {
      imgURL,
      imgURLT
    } = this.data
    if (json.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (json.cardId == '') {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (imgURL == '' || imgURLT == '') {
      wx.showToast({
        title: '请上传手持身份证正反面',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      wx.showToast({
        title: '提交中',
        icon: 'none',
        duration: 1500,
        mask: true
      })
  
  
      util.Request("/api/promotercardsave", {
          'CardName': json.name,
          'CardNumber': json.cardId,
          'PositiveUrl': imgURL,
          'BackUrl': imgURLT
        }, "post",
        (res) => {
          wx.showToast({
            title: '提交成功,等待审核',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          wx.redirectTo({
            url: '/generalization/verify/verify?name=' + json.name + '&&cardId=' + json.cardId
          })

        },
        () => {
        },
        () => {
        }
      )
    }
  },
})