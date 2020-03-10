Component({
  data: {
    selected:0,
    "selectedColor": "#D85D27",
    "color": "#9B9B9B",
    "list": [
      {
        "pagePath": "/pages/homePage/content/content",
        "text": "首页",
        "iconPath": "/assets/icon-footer-sy-nor@2x.png",
        "selectedIconPath": "/assets/icon-footer-sy-sel@2x.png"
      },
      {
        "pagePath": "/pages/nearby/nearby",
        "text": "附近的伙伴",
        "iconPath": "/assets/icon-footer-hb-nor@2x.png",
        "selectedIconPath": "/assets/icon-footer-hb-sel@2x.png"
      },
      {
        "pagePath": "/pages/nearby/nearby",

        "iconPath": "/assets/btTtab.png",
        "selectedIconPath": "/assets/btTtab.png"
      },
      {
        "pagePath": "/pages/golDranking/golDranking",
        "text": "排行榜",
        "iconPath": "/assets/pai1.png",
        "selectedIconPath": "/assets/paiTwo.png"
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "/assets/icon-footer-wd-nor@2x.png",
        "selectedIconPath": "/assets/icon-footer-wd-sel@2x.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    onLoad(){
      wx.setStorage({
        key: "selected",
        data: 0
      })
    
    },
    onShow(){
      console.log(wx.getStorageSync('selected'))
      if (wx.getStorageSync('selected')){
       
        this.setData({
          selected: wx.getStorageSync('selected')
        })
      }
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      wx.setStorage({
        key: "selected",
        data: data.index
      })
      
     
      
     
    }
  }
})