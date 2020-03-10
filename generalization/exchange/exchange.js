const util = require('../../utils/util.js')

Page({
  data: {
    region: ['北京市', '北京市', '朝阳区'],
    num: 1,
    costOne: 0,
    cost: 0,
    address: '',
    name: '',
    phone: '',
    comment: '',
    uuid: '',
  },
  onLoad: function(option) {
    console.log(option)
    this.setData({
      costOne: option.cost,
      cost: option.cost,
      uuid: option.uuid
    })
    wx.hideLoading()
  },
  region: function(e) {
    this.setData({
      region: e.detail.value
    })

  },
  numJ: function() {
    if (this.data.num > 1) {
      let num = this.data.num - 1
      this.setData({
        num: num,
        cost: this.data.costOne * num
      })
    }
  },
  numA: function() {
    let num = this.data.num + 1
    this.setData({
      num: num,
      cost: this.data.costOne * num
    })
  },
  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  comment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  exchange: function() {
    let {
      uuid,
      region,
      address,
      name,
      phone,
      num,
      comment,
      cost
    } = this.data
    util.Request("/api/changeGoods", {
        goodsId: uuid,
        number: num,
      address: region[0] + region[1] + region[2] + address,
      playername:name,
      mobile:phone,
      comment:comment

      }, "post",
      (res) => {
        wx.showToast({
          title: res.data.msg,  
          icon: 'none',
          duration: 1500,
          mask: true
        })
      if(res.data.code===2000){
        wx.navigateBack({
          delta: 1
        })
      }
      },
      () => {
        console.log("失败")
      },
      () => {}
    )

  }

})