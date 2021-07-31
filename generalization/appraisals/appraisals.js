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
    img: '',
    babelList: [],
    huodongId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img: util.API,
      huodongId: options.id
    })
    let forArr = []
    util.Request("/api/getNeedCommentUsersLst", {
        'uuid': options.id
      }, "get",
      (res) => {
        this.setData({
          list: res.data.data
        })
        for (let i in res.data.data.usersInfo) {
          util.request("/api/getLabelInfo", {
              'level': 5,
              'uuid': options.id,
              'userid': res.data.data.usersInfo[i].playerUUID
            }, "get",
            (resTwo) => {

              let userComment = {
                uuid: res.data.data.usersInfo[i].playerUUID,
                score: 5,
                label: ''
              }
              forArr.push(userComment)
              this.setData({
                babelList: [...this.data.babelList, resTwo.data.data]
              })
            },
            () => {
            },
            () => {}
          )
        }
        this.setData({
          userComment: forArr,
        })
        wx.hideLoading()
      },
      () => {
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

    util.request("/api/getLabelInfo", {
        'level': this.data.range,
        'uuid': this.data.huodongId,
        'userid': e.currentTarget.dataset.plaerid
      }, "get",
      (res) => {
        let babelList = this.data.babelList
        babelList.fill(res.data.data, e.currentTarget.dataset.idx, 1)
        this.setData({
          babelList: babelList
        })
      },
      () => {
      },
      () => {}
    )






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
          count: 2 - that.data.imgURLT.length,
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
                  util.Request("/api/feedBackImgs", res.tempFilePath, 'post',
                    (res) => {
                      let ko=JSON.parse(res.data)
                      let  data=ko.data.baseURL+ko.data.filesURL
                      if(ko.code==2000){
                        that.setData({
                          imgURLT: [...that.data.imgURLT, data]
                        })
                      }else if(ko.code==4003){
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

  delet:function(e){
    let src=e.currentTarget.dataset.src
    let imgURLT=this.data.imgURLT
    imgURLT.splice(imgURLT.indexOf(src),1)
    this.setData({imgURLT:imgURLT})
  },

  firHoom: function (e) {
    if (this.data.babelList[e.currentTarget.dataset.index][e.currentTarget.dataset.ben].background == undefined || this.data.babelList[e.currentTarget.dataset.index][e.currentTarget.dataset.ben].background == '') {
      let yy = 'babelList[' + e.currentTarget.dataset.index + '][' + e.currentTarget.dataset.ben + '].background'
      this.setData({
        [yy]: 'background:#D85D27;color:#fff;border:none;'
      })
    } else if (this.data.babelList[e.currentTarget.dataset.index][e.currentTarget.dataset.ben].background != '') {
      let yy = 'babelList[' + e.currentTarget.dataset.index + '][' + e.currentTarget.dataset.ben + '].background'
      this.setData({
        [yy]: ''
      })
    }
    let arrid = []
    for (let i in this.data.babelList[e.currentTarget.dataset.index]) {
      if (this.data.babelList[e.currentTarget.dataset.index][i].background != undefined && this.data.babelList[e.currentTarget.dataset.index][i].background != '') {
        arrid.push(this.data.babelList[e.currentTarget.dataset.index][i].id)
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
      imgURLT,
    } = this.data
    let obj = {
      siteUid: e.currentTarget.dataset.siteid,
      publicUuid: e.currentTarget.dataset.pubid,
      userComment: JSON.stringify(userComment),
      price: rangeFour,
      service: rangeThree,
      equscore: rangeTwo,
      siteContent: value,
      imgBaseURL: imgURLT.length==0?'':imgURLT[0].split('/')[0]+'/'+imgURLT[0].split('/')[1]+'/'+imgURLT[0].split('/')[2]+'/',
      imgURL: imgURLT.length==0?'':imgURLT.length>1?imgURLT[0].split('/')[3]+'|'+imgURLT[1].split('/')[3]:imgURLT[0].split('/')[3]
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
      },
      () => {}
    )
  },
  oneKey: function (e) {
  
    let obj = {
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