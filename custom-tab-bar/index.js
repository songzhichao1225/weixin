Component({
  data: {
    selected: '啥也不是',
    "selectedColor": "#D85D27",
    "color": "#9B9B9B",
    "list": [{
        "pagePath": "/pages/homePage/content/content",
        "text": "首页",
        "iconPath": "/assets/icon-footer-sy-nor@2x.png",
        "style":"width:27px;height:24px;",
        "selectedIconPath": "/assets/icon-footer-sy-sel@2x.png"
      },
      {
        "pagePath": "/pages/nearby/nearby",
        "text": "附近对手",
        "iconPath": "/assets/icon-footer-hb-nor@2x.png",
        "style":"width:27px;height:24px;",
        "selectedIconPath": "/assets/icon-footer-hb-sel@2x.png"
      },
      {
        "pagePath": "/pages/publishing/publishing",
        "style":"width:40px;height:35px;",
        "iconPath": "/assets/btTtab.png",
        "selectedIconPath": "/assets/btTtab.png"
      },
      {
        "pagePath": "/pages/golDranking/golDranking",
        "text": "排行榜",
        "style":"width:27px;height:24px;",
        "iconPath": "/assets/pai1.png",
        "selectedIconPath": "/assets/paiTwo.png"
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "style":"width:27px;height:24px;",
        "iconPath": "/assets/icon-footer-wd-nor@2x.png",
        "selectedIconPath": "/assets/icon-footer-wd-sel@2x.png"
      }
    ]
  },
  attached() {
   
  },
  methods: {

    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      

    }
  }
})