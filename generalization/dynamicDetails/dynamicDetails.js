const util = require('../../utils/util.js')
Page({

  data: {
    details: [],
    img: '',
    imgYph: [],
    uuid: '',
    pages: 1,
    textVal: '',
    current: 1,
    timeOut: true
  },


  timeOut: function () {
    wx.navigateTo({
      url: '/pages/authorization/authorization'
    })
  },

  onLoad: function (options) {
    this.setData({
      img: util.API,
      uuid: options.uuid
    })
    this.ko()
    let show = false
    this.noko(show)
  },
  noko: function (show) {
    util.Request("/api/getPlayerDynamicReviewList", {
        'dynamic_id': this.data.uuid,
        'page': this.data.pages
      }, "post",
      (res) => {
        if (show == true) {
          this.setData({
            detailsTwo: [...this.data.detailsTwo, ...res.data.data]
          })
        } else {
          this.setData({
            detailsTwo: res.data.data
          })
        }
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },

  counting: function (e) {
    this.setData({
      current: e.detail.current + 1
    })
  },

  ko: function () {
    util.Request("/api/getPlayerDynamicDetails", {
        'dynamic_id': this.data.uuid
      }, "post",
      (res) => {
        if (res.data.code == 4001) {
          this.setData({
            timeOut: false
          })
        } else {
          this.setData({
            details: res.data.data,
            timeOut: true
          })
          let imgYph = res.data.data.dynamic.ImgURL
          for (let i in imgYph) {
            imgYph[i] = this.data.img + '/' + imgYph[i]
          }
          this.setData({
            imgYph: imgYph
          })
        }

        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  },

  previewImage: function (e) {
    wx.previewImage({
      current: this.data.imgYph[e.currentTarget.dataset.index],
      urls: this.data.imgYph
    })
  },
  ThumbsUp: function (e) {
    util.Request("/api/PlayerDynamicGiveTheThumbsUp", {
        'dynamic_id': e.currentTarget.dataset.uuid
      }, "post",
      (res) => {
        this.ko()
      },
      () => {
      },
      () => {}
    )
  },
  textInput: function (e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  confirm: function (e) {
    util.Request("/api/PlayerDynamicReviewSave", {
        'dynamic_id': this.data.details.dynamic.uuid,
        'comment': e.detail.value
      }, "post",
      (res) => {
        this.ko()
        this.noko()
        this.setData({
          textVal: ''
        })
      },
      () => {

      },
      () => {}
    )
  },
  theThumbsUp: function (e) {
    let uuid = e.currentTarget.dataset.uuid
    for (let i in this.data.detailsTwo) {
      if (this.data.detailsTwo[i].uuid == uuid) {
        if (this.data.detailsTwo[i].isfabulou == 1) {
          this.data.detailsTwo[i].isfabulou = 0
          this.data.detailsTwo[i].fabulou = this.data.detailsTwo[i].fabulou != 0 ? this.data.detailsTwo[i].fabulou - 1 : this.data.detailsTwo[i].fabulou
        } else {
          this.data.detailsTwo[i].isfabulou = 1
          this.data.detailsTwo[i].fabulou = this.data.detailsTwo[i].fabulou + 1
        }
        this.setData({
          detailsTwo: this.data.detailsTwo
        })
      }
    }


    util.Request("/api/PlayerDynamicReviewGiveTheThumbsUp", {
        'dy_re_id': e.currentTarget.dataset.uuid
      }, "post",
      (res) => {},
      () => {
      },
      () => {}
    )
  },

  onReachBottom: function () {
    this.setData({
      pages: this.data.pages + 1
    })
    let show = true
    this.noko(show)
  },
  getIndividuals: function (e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/personal?uuid=' + e.currentTarget.dataset.id
      })
    }
  },
  deleteComments: function (e) {
    if (e.currentTarget.dataset.isown == 1) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '删除该评论',
        success(res) {
          if (res.confirm) {
            util.Request("/api/DelPlayerDynamicReview", {
                'dy_re_id': e.currentTarget.dataset.id
              }, "post",
              (res) => {
                that.noko()
              },
              () => {
              },
              () => {}
            )
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  listDian: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否删除该动态',
      success(res) {
        if (res.confirm) {
          util.Request("/api/DelPlayerDynamic", {
              'dynamic_id': e.currentTarget.dataset.id
            }, "post",
            (res) => {
              wx.navigateBack({
                delta: 1
              })
            },
            () => {
            },
            () => {}
          )
        } else if (res.cancel) {}
      }
    })

  },
  onShow: function () {
    this.ko()
    this.setData({pages:1})
    let show = false
    this.noko(show)
  }



})