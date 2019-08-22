
const util = require('../../utils/util.js')

Page({
  data: {
    number:0,
    textValue:'',
    phone:0,
    email:0
  },
  onLoad: function () {
  wx.hideLoading()
  },
  textarea:function(e){
   this.setData({number:e.detail.cursor,textValue:e.detail.value})
  },
  phone:function(e){
    this.setData({phone:e.detail.value})
  },
  email:function(){
    this.setData({ email: e.detail.value })
  },
  btn:function(){
    let { textValue, phone, email}=this.data
    let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (textValue==''){
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (phone != 0 && TEL_REGEXP.test(phone)){
      util.Request("/api/addFeedBack", { 'comment': textValue, 'mobile': phone, 'email': email  }, "get", 
        (res) => {
          console.log(res)
        },
        () => { console.log("失败") },
        () => {
          console.log("接口调用结束的回调函数")
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
