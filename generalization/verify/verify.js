
const util = require('../../utils/util.js')

Page({
  data: {
    name:'',
    cardId:'',
    status:'',
  },
  onLoad: function (option) {
    let name = '**' + option.name.substring(2,option.name.length)
    let cardId = option.cardId.substring(0, 3) + '***********' + option.cardId.substring(14, option.cardId.length)
     this.setData({name:name,cardId:cardId,status:option.status})
     wx.hideLoading()
  },
  join: function () {
    wx.redirectTo({
      url: '/pages/information/information'
    })
  },
})
