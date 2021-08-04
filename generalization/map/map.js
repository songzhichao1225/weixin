var QQMapWX = require('../../qqmap-wx-jssdk.js');
const util = require('../../utils/util.js')
var qqmapsdk;
Page({
  data: {
    latitude: '',
    longitude: '',
    venuesLst: [],
    markers: [],
    regionThree: '',
    region: [],
    city: '',
    area:'朝阳区',
    sportId:'',//传过来的运动一级id
    sporttype:'',//传过来的二级id
    suggestion:[],//关键词搜索返回列表
    length:100,
    triggered:true,
    page:1,
    falg:0,
    type:1
  },

  onLoad: function(option) {
    // 实例化API核心类
    wx.showLoading({
      title: '加载中~',
      mask: true
    })
    this.setData({
      falg:option.falg,
      img:util.API,
      type:option.type
    })
    qqmapsdk = new QQMapWX({
      key: 'GMCBZ-TDALO-6ZRWH-S6TPE-66PIZ-M4FIJ'
    });
    this.setData({
      sportId: option.sportid,
      sporttype: option.sporttype,
    })
    let _this = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude
        }) 

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: 39.984060,
            longitude: 116.307520
          },
          success: function(res) {
            let city = res.result.address_component.city
            let area = res.result.address_component.district
            _this.setData({
              city:city
            })
            //页面首次进入获取场馆列表
            let obj = {
              mylat: latitude,
              mylng: longitude,
              city: city,
              area: area,
              sportId: option.sportid,
              sporttype: option.sporttype,
              page: 1,
              type:_this.data.type
            }
            util.Request("/api/getSiteLst", obj, "get",
              (res) => {
                let sitelst = res.data.data.sitelst
                let objArr = []
                for (let i in sitelst) {
                  let obj = {
                    iconPath: "/assets/tupiaochang.png",
                    id: i,
                    latitude: sitelst[i].lat,
                    longitude: sitelst[i].lng,
                    width: 30,
                    height: 30
                  }
                  objArr.push(obj)
                }
                _this.setData({
                  venuesLst: res.data.data.sitelst,
                  markers: objArr,
                  city: city,
                  area: area
                })
                wx.hideLoading()
              },
              () => {
              },
              () => {}
            )

          }
        })



      }
    })




  },
  mark: function(e) {
  },
  now:function(){
    qqmapsdk = new QQMapWX({
      key: 'GMCBZ-TDALO-6ZRWH-S6TPE-66PIZ-M4FIJ'
    });
  
    let _this = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude
        })

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: 39.984060,
            longitude: 116.307520
          },
          success: function(res) {
            let city = res.result.address_component.city
            let area = res.result.address_component.district
            _this.setData({
              city:city
            })
            //页面首次进入获取场馆列表
            let obj = {
              mylat: latitude,
              mylng: longitude,
              city: city,
              area: area,
              sportId: _this.data.sportId,
              sporttype: _this.data.sporttype,
              page: 1,
              type:_this.data.type
            }
            util.Request("/api/getSiteLst", obj, "get",
              (res) => {

                let sitelst = res.data.data.sitelst
                let objArr = []
                for (let i in sitelst) {
                  let obj = {
                    iconPath: "/assets/tupiaochang.png",
                    id: i,
                    latitude: sitelst[i].lat,
                    longitude: sitelst[i].lng,
                    width: 30,
                    height: 30
                  }
                  objArr.push(obj)
                }
                _this.setData({
                  venuesLst: res.data.data.sitelst,
                  markers: objArr,
                  city: city,
                  area: area
                })
                wx.hideLoading()
              },
              () => {
              },
              () => {}
            )

          }
        })

      }
    })

  },
  bindRegionChange: function(e) {
    this.setData({backfill:''})
    let _this=this
    qqmapsdk.geocoder({
      address: e.detail.value[0] + e.detail.value[1] + e.detail.value[2], 
      success: function (res) {
        _this.setData({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          city:e.detail.value[1]
        })
        let obj = {
          mylat: res.result.location.lat,
          mylng: res.result.location.lng,
          city: e.detail.value[1],
          area:  e.detail.value[2],   
          sportId: _this.data.sportId,
          sporttype: _this.data.sporttype,
          page: 1,
          type:_this.data.type
        }
        util.Request("/api/getSiteLst", obj, "get",
          (res) => {
            let sitelst = res.data.data.sitelst
            let objArr = []
            for (let i in sitelst) {
              let obj = {
                iconPath: "/assets/tupiaochang.png",
                id: i,
                latitude: sitelst[i].lat,
                longitude: sitelst[i].lng,
                width: 30,
                height: 30
              }
              objArr.push(obj)
            }
            _this.setData({
              venuesLst: res.data.data.sitelst,
              markers: objArr,
              area:e.detail.value[2]
            })
            wx.hideLoading()
          },
          () => {
          },
          () => {}
        )

      }
    })

    this.setData({
      region: e.detail.value,
    })
  },

  //搜索具体地址
   
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length;i++){
      if(i == id){
        this.setData({
          backfill: this.data.suggestion[i].title
        });
        var addressLst=this.data.suggestion[i]
      }  
    }
    if(addressLst!==''){
      let obj = {
        mylat:addressLst.latitude,
        mylng: addressLst.longitude,
        city: addressLst.city,
        area: addressLst.district,
        sportId: this.data.sportId,
        sporttype: this.data.sporttype,
        page: 1,
        type:this.data.type
      }
      this.setData({
        latitude:addressLst.latitude,
        longitude:addressLst.longitude,
        city:addressLst.city
      })
      util.Request("/api/getSiteLst", obj, "get",
        (res) => {
          let sitelst = res.data.data.sitelst
          let objArr = []
          for (let i in sitelst) {
            let obj = {
              iconPath: "/assets/tupiaochang.png",
              id: i,
              latitude: sitelst[i].lat,
              longitude: sitelst[i].lng,
              width: 30,
              height: 30
            }
            objArr.push(obj)
          }
          this.setData({
            venuesLst: res.data.data.sitelst,
            markers: objArr,
            suggestion:[],
          })
          wx.hideLoading()
        },
        () => {
        },
        () => {}
      )
    }






  },
 
//触发关键词输入提示事件
getsuggest: function(e) {
    var _this = this;
    qqmapsdk.getSuggestion({
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      region:_this.data.city, //设置城市名，限制关键词所示的地域范围
      success: function(res) {//搜索成功后的回调
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function(error) {
      },
      complete: function(res) {
        
      }
    });

  },

  onRefresh:function(){

    let obj = {
      mylat:this.data.latitude,
      mylng: this.data.longitude,
      city: this.data.city,
      area: this.data.area,
      sportId: this.data.sportId,
      sporttype: this.data.sporttype,
      page: 1,
      type:this.data.type
    }
    util.Request("/api/getSiteLst", obj, "get",
      (res) => {
        let sitelst = res.data.data.sitelst
        let objArr = []
        for (let i in sitelst) {
          let obj = {
            iconPath: "/assets/tupiaochang.png",
            id: i,
            latitude: sitelst[i].lat,
            longitude: sitelst[i].lng,
            width: 30,
            height: 30
          }
          objArr.push(obj)
        }
       
        this.setData({
          venuesLst: res.data.data.sitelst,
          markers: objArr,
          triggered: false,
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  
  },
  tolower:function(){
    let obj = {
      mylat:this.data.latitude,
      mylng: this.data.longitude,
      city: this.data.city,
      area: this.data.area,
      sportId: this.data.sportId,
      sporttype: this.data.sporttype,
      page: Number(this.data.page+1),
      type:this.data.type
    }
    util.Request("/api/getSiteLst", obj, "get",
      (res) => {
        let sitelst = res.data.data.sitelst
        let objArr = []
        for (let i in sitelst) {
          let obj = {
            iconPath: "/assets/tupiaochang.png",
            id: i,
            latitude: sitelst[i].lat,
            longitude: sitelst[i].lng,
            width: 30,
            height: 30
          }
          objArr.push(obj)
        }
        this.setData({
          venuesLst: [...this.data.venuesLst,...res.data.data.sitelst],
          markers: objArr,
          triggered: false,
          page:Number(this.data.page+1)
        })
        wx.hideLoading()
      },
      () => {
      },
      () => {}
    )
  
  },

  venueDetails:function(e){

      wx.navigateTo({
        url: '/generalization/venueDetails/venueDetails?sportid=' + this.data.sportId + '&sporttype=' + this.data.sporttype + '&siteuid=' + e.currentTarget.dataset.uid + '&token=' + wx.getStorageSync('token') + '&falg=' + this.data.falg,
      })
    
     
    
    
  },
  //跳转H5选择场地
  bookIn:function(e){
    let obj={
      siteid:e.currentTarget.dataset.uid,
      name:e.currentTarget.dataset.name
    }
    if(this.data.falg==0){
      wx.setStorage({
        data: obj,
        key: 'siteid',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flagTwo=2'+'&hood=1',
      })
    }else if(this.data.falg==1){
      wx.setStorage({
        data: obj,
        key: 'siteidTwo',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flagTwo=2'+'&hood=2',
      })
    }else if(this.data.falg==2){
      wx.setStorage({
        data: obj,
        key: 'siteidThree',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flagTwo=2'+'&hood=3',
      })
    }else if(this.data.falg==3){
      wx.setStorage({
        data: obj,
        key: 'siteidFour',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flagTwo=2'+'&hood=4',
      })
    }else if(this.data.falg==4){
      wx.setStorage({
        data: obj,
        key: 'siteidFive',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flagTwo=2'+'&hood=5',
      })
    }else if(this.data.falg==5){
      wx.setStorage({
        data: obj,
        key: 'siteidSix',
      })
      wx.navigateTo({
        url: '/generalization/bookIn/bookIn?sportid='+this.data.sportId+'&sporttype='+this.data.sporttype+'&siteuid='+e.currentTarget.dataset.uid+'&token='+wx.getStorageSync('token')+'&flagTwo=2'+'&hood=6',
      })
    }else{
      var pages = getCurrentPages(); // 获取页面栈
      var prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.setData({
        siteThree: e.currentTarget.dataset
      })
      wx.navigateBack({
        delta: 1
      })
    }
   
    
    
  }


})