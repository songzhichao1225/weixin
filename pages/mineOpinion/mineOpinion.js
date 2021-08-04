
const util = require('../../utils/util.js')

Page({
  data: {
    number:0,
    textValue:'',
    phone:0,
    email:0,
    imgURLT: [],
    img:''
  },
  onLoad: function () {
  wx.hideLoading()
  this.setData({
    img: util.API
  })
  },
  textarea:function(e){
   this.setData({number:e.detail.value.length,textValue:e.detail.value})
  },
  phone:function(e){
    this.setData({phone:e.detail.value})
  },
  email:function(){
    this.setData({ email: e.detail.value })
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
  btn:function(){
    let { textValue,imgURLT }=this.data
    let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (textValue==''){
      wx.showToast({
        title: '请输入您的意见或建议！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (wx.getStorageSync('telephone') != 0 && TEL_REGEXP.test(wx.getStorageSync('telephone'))){
      util.Request("/api/addFeedBack", { 
        'comment': textValue,
         'mobile': wx.getStorageSync('telephone'),
          'email': '',
          'baseURL':imgURLT.length==0?'':imgURLT[0].split('/')[0]+'/'+imgURLT[0].split('/')[1]+'/'+imgURLT[0].split('/')[2]+'/',
          'filesURL':imgURLT.length==0?'':imgURLT.length>1?imgURLT[0].split('/')[3]+'|'+imgURLT[1].split('/')[3]:imgURLT[0].split('/')[3]
          }, "post", 
        (res) => {
          if(res.data.code===2000){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1,
              })
            },1500)
            
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        },
        () => {  },
        () => {
        }
      )

   }else{
      wx.showToast({
        title: '请填写手机号或输入正确手机号',
        icon: 'none',
        duration: 1500,
        mask: true
      })
   }
  }
})
