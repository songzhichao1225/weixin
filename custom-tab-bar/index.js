Component({
  data: {
    selected: wx.getStorageSync('selected'),
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        pagePath: "/pages/homePage/content/content",
        text: "首页",
        iconPath: "/assets/icon-footer-sy-nor@2x.png",
        selectedIconPath: "/assets/icon-footer-sy-sel@2x.png"
      },
      {
        pagePath: "/pages/nearby/nearby",
        text: "附近的伙伴",
        iconPath: "/assets/icon-footer-hb-nor@2x.png",
        selectedIconPath: "/assets/icon-footer-hb-sel@2x.png"
      },
      {
        pagePath: "/pages/mine/mine",
        text: "排行榜",
        iconPath: "/assets/pai1.png",
        selectedIconPath: "/assets/paiTwo.png"
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        iconPath: "/assets/icon-footer-wd-nor@2x.png",
        selectedIconPath: "/assets/icon-footer-wd-sel@2x.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      
      wx.setStorageSync('selected', data.index);
      
     
    }
  }
})