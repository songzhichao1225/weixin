const util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publicuuid: '',
    current: 0,
    listSon: [],
    type: 1,
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      publicuuid: options.uuid,
      img:util.API
    })
   
    let type = 1
    this.apiRequest(type)
  },
  apiRequest: function (type) {
    wx.showLoading({
      title: '',
      mask: true
    })
    util.Request("/api/getMyComplaintList", {
        'type': type,
        publicuuid: this.data.publicuuid
      }, "post",
      (res) => {
        this.setData({
          listSon: res.data.data,
          flag: 1
        })

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )



  },


  current: function (e) {
    this.setData({
      current: e.detail.current
    })
    let type = e.detail.current + 1
    this.setData({
      type: type
    })
    this.apiRequest(type)
  },
  audioPlay: function (e) {
    innerAudioContext.src = e.currentTarget.dataset.src
    innerAudioContext.play()
  },
  me: function () {
    this.setData({
      current: 0,
      type: 1
    })
  },
  hey: function () {
    this.setData({
      current: 1,
      type: 2
    })
  },
  Recanted: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定要撤销投诉么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/CancellationOfcomplaints", {
                'publicUUID': this.data.publicuuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)

              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          } 
        }
      })
    } else if (e.currentTarget.dataset.type == 2) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定要撤销投诉么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/RefereeCancellationOfcomplaint", {
                'publicUUID': this.data.publicuuid,
                re_com_id: e.currentTarget.dataset.uuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          } 
        }
      })
    } else if (e.currentTarget.dataset.type == 3) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定要撤销投诉么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/SparrCancellationOfcomplaints", {
                'publicUUID': this.data.publicuuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
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
  },
  agree: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定同意该投诉中推广专员的处理结果么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/ComplainAgree", {
                'publicUUID': this.data.publicuuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          }
        }
      })
    }else if (e.currentTarget.dataset.type == 2) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定同意该投诉中推广专员的处理结果么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/RefereeComplainAgree", {
                'publicUUID': this.data.publicuuid,
                 're_com_id':e.currentTarget.dataset.uuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          }
        }
      })
    }else  if (e.currentTarget.dataset.type == 3) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定同意该投诉中推广专员的处理结果么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/SparrComplainAgree", {
                'publicUUID': this.data.publicuuid,
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
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
  },
  agreeNot: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定不同意该投诉中推广专员的处理结果么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/PlatformIntervention", {
                'publicUUID': this.data.publicuuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          }
        }
      })
    }else if (e.currentTarget.dataset.type == 2) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定不同意该投诉中推广专员的处理结果么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/RefereePlatformIntervention", {
                'publicUUID': this.data.publicuuid,
                 're_com_id':e.currentTarget.dataset.uuid
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
              },
              () => {
                console.log("失败")
              },
              () => {}
            )
          }
        }
      })
    }else  if (e.currentTarget.dataset.type == 3) {
      wx.showModal({
        title: '温馨提示',
        content: '您确定同意该投诉中推广专员的处理结果么？',
        success(res) {
          if (res.confirm) {
            util.Request("/api/SparrPlatformIntervention", {
                'publicUUID': this.data.publicuuid,
              }, "post",
              (res) => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                let type = this.data.type
                this.apiRequest(type)
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
  },
  //协商历史
  history:function(e){
    wx.navigateTo({
      url: '/generalization/xieHistory/xieHistory?uuid='+this.data.publicuuid+'&type='+e.currentTarget.dataset.type+'&reid='+e.currentTarget.dataset.uuid,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})