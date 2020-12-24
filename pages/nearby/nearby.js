 //获取应用实例
 var util = require("../../utils/util.js");
 const app = getApp()


 Page({
   data: {
    arraySex:[{name:'全部',id:2},{name:'男',id:0},{name:'女',id:1}],
    arraySport:[{name:'羽毛球',id:1},{name:'乒乓球',id:2},{name:'台球',id:3},{name:'篮球',id:4},{name:'足球',id:5},{name:'排球',id:6},{name:'网球',id:7},{name:'高尔夫',id:8}],
    arrayDistance: [{name: "全部",id: 0},{name: "1km",id: 1},{name: "2km",id: 2},{name: "4km",id: 4},{name: "10km",id: 10}],
    sex:'',
    Sport:'',
    Distance:'',
  },

   onLoad: function() {
   wx.hideLoading()
   
   },
   bindSex:function(e){
     this.setData({sex:e.detail.value})
   },
   bindSport:function(e){
     this.setData({Sport:e.detail.value})
   },
   bindDistance:function(e){
    this.setData({Distance:e.detail.value})
   }
   
 })