//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    nickName: '',
    sex: '', //性别
    shost: false,
    date: '',
    personalData: '',
    permanent: '',
    arrListSon: [],
    flag: false,
    imgURL: '',
    imgURLT: '',
    tall: '',
    weight: '',
    sporId: '',
    comment: '',
    img:'',
  },
  onLoad: function() {
    this.setData({
      img:util.API
    })

    wx.showLoading({
      title: '加载中~',
      mask: true
    })

    util.request("/api/getUserDetailInfo", {
        'uuid': wx.getStorageSync('uuid')
      }, "get",

      (res) => {
        if (res.data.data.sex == 1) {
          this.setData({
            sex: '女'
          })
        } else if (res.data.data.sex == 0) {
          this.setData({
            sex: '男'
          })
        }
        let koArr = []
        let sporidOn = []
        for (let i in res.data.data.userTechcoins) {
          sporidOn.push(res.data.data.userTechcoins[i].SportID)
        }

        if (res.data.data.faveriteSport != '') {
          var runArr = res.data.data.faveriteSport.split(',')
        }


        this.setData({
          personalData: res.data.data,
          date: res.data.data.birthday,
          permanent: res.data.data.address,
          arrListSon: runArr,
          flag: true,
          imgURL: res.data.data.imgURL,
          nickName: res.data.data.nickname,
          tall: res.data.data.tall,
          weight: res.data.data.weight,
          sporId: '',
          comment: res.data.data.comment
        })
        wx.hideLoading()
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )
  },
  //上传图片
  chooseImg: function() {
    var that = this
    wx.showActionSheet({
      itemList: ['拍照', '从手机选择'],
      success: function(res) {
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
          success: function(res) {
            let tempFilePaths = res.tempFilePaths[0]
            that.setData({
              imgURLT: tempFilePaths
            })
            util.Request("/api/uploadHeaderImg", tempFilePaths, 'post',
              (res) => {

              },
              () => {
              },
              () => {}
            )
          }
        })
      },
      fail: function(res) {
        wx.hideNavigationBarLoading()
      }
    })
  },
  name: function(e) {
    this.setData({
      nickName: e.detail.value
    })
  },
  //选择性别
  sexMan: function(e) {
    this.setData({
      sex: e.currentTarget.dataset.name,
      shost: false
    })
  },
  sexFemale: function(e) {
    this.setData({
      sex: e.currentTarget.dataset.name,
      shost: false
    })
  },
  sexModify: function() {
    let {
      sex,
      personalData
    } = this.data
    if (personalData.sex != 2) {
      this.setData({
        shost: true
      })
    }
  },
  tall: function(e) {

    this.setData({
      tall: e.detail.value
    })

  },
  weight: function(e) {
    this.setData({
      weight: e.detail.value
    })

  },
  //选择出生年月
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindcityChange: function(e) {
    let permanent = ''
    for (let i in e.detail.value) {
      permanent += e.detail.value[i]
    }
    this.setData({
      permanent: permanent
    })
  },
  //选择喜欢的运动
  selectSport: function() {
    wx.navigateTo({
      url: '/pages/favoriteSport/favoriteSport'
    })
  },
  comment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    let {
      arrListSon,
      sporId
    } = this.data
    if (currPage.data.arrList != undefined) {
      if (currPage.data.arrList.length != 0) {
        let sporIdStr = []
        for (let i in currPage.data.sporIdArr) {
          sporIdStr.push(currPage.data.sporIdArr[i])
        }
        this.setData({
          arrListSon: currPage.data.arrList,
          sporId: sporIdStr.join(',')
        })
      }
    }
  },
  confirm: function() {
    let {
      imgURL,
      nickName,
      sex,
      date,
      permanent,
      tall,
      weight,
      sporId,
      comment,
      personalData
    } = this.data
    let infoNew = {}
    if (sex == '男') {
      infoNew.sex = 0
    } else if (sex == '女') {
      infoNew.sex = 1
    } else {
      infoNew.sex = 0
    }
    infoNew.nickname = nickName
    infoNew.birthday = date
    infoNew.address = permanent
    infoNew.imgURL = imgURL
    infoNew.sport_id = sporId
    infoNew.tall = tall
    infoNew.weight = weight
    infoNew.comment = comment

    util.Request("/api/PerfectInfo", infoNew, "post",
      (res) => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        wx.switchTab({
          url: '/pages/homePage/content/content'
        })
      },
      () => {
        console.log("失败")
      },
      () => {
      }
    )

  },
})