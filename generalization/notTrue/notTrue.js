const util = require('../../utils/util.js')

Page({
  data: {
    status: '0',
    imgURL: '',
    textDetail:'',
    uuid:'',
  },
  onLoad: function(option) {
    console.log(option)
    this.setData({
      status: option.status,
      uuid:option.uuid
    })
    wx.setNavigationBarTitle({
      title: option.status == 0 ? '不属实' : '属实'
    })
    wx.hideLoading()
  },
  textarea:function(e){
   this.setData({textDetail:e.detail.value})
  },
  //上传图片
  chooseImg: function() {
    let that = this
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
              imgURL: tempFilePaths
            })
            util.Request("/api/ComplainIstrueImgs", tempFilePaths, 'post',
              (res) => {},
              () => {
                console.log(res)
              },
              () => {}
            )
          }
        })
      },
      fail: function(res) {
        wx.hideNavigationBarLoading()
        console.log(res.errMsg)
      }
    })
  },
  canle: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  comfirm:function(){
    return false
    let { status, textDetail, uuid}=this.data
    util.Request("/api/ComplainIsTrue", { 'publicUUID': uuid, 'status': status, 'title': textDetail }, "post",
      (res) => {
        console.log(res)
      },
      () => { console.log("失败") },
      () => {
      }
    )
  },
})