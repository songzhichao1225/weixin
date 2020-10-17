const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    images: [{
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
    ],
    range: 5,
    rangeTwo: 5,
    rangeThree: 5,
    rangeFour: 5,
    imagesTwo: [{
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
    ],
    imgURLT: '',

    imagesThree: [{
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
    ],
    imagesFour: [{
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
      {
        src: '/assets/StarSel2@2x.png',
        flag: true
      },
    ],
    listSonArr: [],
    imageUrl: '',
    userComment: '',
    value: '',
    imgBaseURL: '',
    img:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img:util.API
    })
    util.Request("/api/getNeedCommentUsersLst", {
        'uuid': options.id
      }, "get",
      (res) => {
        this.setData({
          list: res.data.data
        })
        let forArr = []
        for (let i in res.data.data.usersInfo) {
          let userComment = {
            uuid: res.data.data.usersInfo[i].playerUUID,
            score: 5,
            label: ''
          }
          forArr.push(userComment)
          this.setData({
            userComment: forArr
          })
        }

        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  xing: function (e) {
    for (let i = 1; i < e.currentTarget.dataset.index + 1; i++) {
      let imageTwo = 'images[' + i + '].src'
      this.setData({
        [imageTwo]: '/assets/StarSel2@2x.png',
        range: e.currentTarget.dataset.index + 1
      })
    }
    for (let j = 1; j < (this.data.images.length - e.currentTarget.dataset.index); j++) {
      let imagep = 'images[' + (j + e.currentTarget.dataset.index) + '].src'
      this.setData({
        [imagep]: '/assets/StarNor2@2x.png',
        range: e.currentTarget.dataset.index + 1
      })
    }
    let no = 'userComment[' + e.currentTarget.dataset.idx + '].score'
    this.setData({
      [no]: this.data.range
    })


  },

  xingTwo: function (e) {

    for (let i = 1; i < e.currentTarget.dataset.index + 1; i++) {
      let imageTwo = 'imagesTwo[' + i + '].src'
      this.setData({
        [imageTwo]: '/assets/StarSel2@2x.png',
        rangeTwo: e.currentTarget.dataset.index + 1
      })
    }
    for (let j = 1; j < (this.data.imagesTwo.length - e.currentTarget.dataset.index); j++) {
      let imagep = 'imagesTwo[' + (j + e.currentTarget.dataset.index) + '].src'
      this.setData({
        [imagep]: '/assets/StarNor2@2x.png',
        rangeTwo: e.currentTarget.dataset.index + 1
      })
    }



  },
  xingThree: function (e) {


    for (let i = 1; i < e.currentTarget.dataset.index + 1; i++) {
      let imageTwo = 'imagesThree[' + i + '].src'
      this.setData({
        [imageTwo]: '/assets/StarSel2@2x.png',
        rangeThree: e.currentTarget.dataset.index + 1
      })
    }
    for (let j = 1; j < (this.data.imagesThree.length - e.currentTarget.dataset.index); j++) {
      let imagep = 'imagesThree[' + (j + e.currentTarget.dataset.index) + '].src'
      this.setData({
        [imagep]: '/assets/StarNor2@2x.png',
        rangeThree: e.currentTarget.dataset.index + 1
      })
    }
  },

  xingFour: function (e) {


    for (let i = 1; i < e.currentTarget.dataset.index + 1; i++) {
      let imageTwo = 'imagesFour[' + i + '].src'
      this.setData({
        [imageTwo]: '/assets/StarSel2@2x.png',
        rangeFour: e.currentTarget.dataset.index + 1
      })
    }
    for (let j = 1; j < (this.data.imagesFour.length - e.currentTarget.dataset.index); j++) {
      let imagep = 'imagesFour[' + (j + e.currentTarget.dataset.index) + '].src'
      this.setData({
        [imagep]: '/assets/StarNor2@2x.png',
        rangeFour: e.currentTarget.dataset.index + 1
      })
    }
  },
  //上传图片
  chooseImg: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机选择'],
      success: function (res) {
        wx.showNavigationBarLoading()
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
              imgURLT: tempFilePaths
            })
            util.Request("/api/uploadSiteImg", tempFilePaths, 'post',
              (res) => {
                that.setData({
                  imageUrl: JSON.parse(res.data).data.filesURL,
                  imgBaseURL: JSON.parse(res.data).data.baseURL
                })
                wx.hideLoading()
              },
              () => {
                console.log(res)
              },
              () => {}
            )
          }
        })
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res.errMsg)
      }
    })
  },

  firHoom: function (e) {
    if (this.data.list.usersInfo[e.currentTarget.dataset.index].res[e.currentTarget.dataset.ben].background == undefined || this.data.list.usersInfo[e.currentTarget.dataset.index].res[e.currentTarget.dataset.ben].background == '') {
      let yy = 'list.usersInfo[' + e.currentTarget.dataset.index + '].res[' + e.currentTarget.dataset.ben + '].background'
      this.setData({
        [yy]: 'background:#D85D27;color:#fff;border:none;'
      })
    } else if (this.data.list.usersInfo[e.currentTarget.dataset.index].res[e.currentTarget.dataset.ben].background != '') {
      let yy = 'list.usersInfo[' + e.currentTarget.dataset.index + '].res[' + e.currentTarget.dataset.ben + '].background'
      this.setData({
        [yy]: ''
      })
    }
    let arrid = []
    for (let i in this.data.list.usersInfo[e.currentTarget.dataset.index].res) {
      if (this.data.list.usersInfo[e.currentTarget.dataset.index].res[i].background != undefined && this.data.list.usersInfo[e.currentTarget.dataset.index].res[i].background != '') {
        arrid.push(this.data.list.usersInfo[e.currentTarget.dataset.index].res[i].id)
      }
    }
    let good = 'userComment[' + e.currentTarget.dataset.index + '].label'
    this.setData({
      [good]: arrid.join('|')

    })
  },
  textarea: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  submit: function (e) {
    let {
      userComment,
      rangeFour,
      rangeThree,
      rangeTwo,
      value,
      imageUrl,
      imgBaseURL
    } = this.data
    let obj = {
      siteUid: e.currentTarget.dataset.siteid,
      publicUuid: e.currentTarget.dataset.pubid,
      userComment: userComment,
      price: rangeFour,
      service: rangeThree,
      equscore: rangeTwo,
      siteContent: value,
      imgBaseURL: imgBaseURL,
      imgURL: imageUrl
    }
    util.Request("/api/addComment", obj, "post",
      (res) => {
        if (res.data.code == 2000) {
          wx.navigateBack({
            delta: 1
          })
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true
        })
      },
      () => {
        console.log("失败")
      },
      () => {}
    )
  },
  oneKey: function (e) {
    let {
      list
    } = this.data
    let arrID = []
    for (let i in list.usersInfo) {
      console.log(list.usersInfo[i].playerUUID)
      arrID.push(list.usersInfo[i].playerUUID)
    }
    let obj = {
      uuid: arrID.join('|'),
      siteUid: e.currentTarget.dataset.siteid,
      publicUuid: e.currentTarget.dataset.pubid
    }
    util.Request("/api/addAllGoodsComment", obj, "post",
      (res) => {
        if (res.data.code == 2000) {
          wx.navigateBack({
            delta: 1
          })
        }

        wx.showToast({
          title: res.data.msg,
          icon: 'none',
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