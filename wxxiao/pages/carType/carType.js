// pages/catType/carType.js
var carList = require('../../common/sortCar.js')
var lineHeight = 0;
var endWords = "";
var isNum;
Page({

  data: {
    "hidden": true,
    brand:"", 
    subBrand: "",
    subArr: []
   },
   subType: function(event) {
     this.data.brand = event.currentTarget.dataset.brand;
     this.setData({
      showSub: true,
      subArr: event.currentTarget.dataset.sub
     })
   },
   hideSub: function() {
    this.setData({
      showSub: false
    })
   },
   chooseSub: function(event) {
    this.data.subBrand = event.currentTarget.dataset.subbrand;
    this.setData({
      showSub: false
    })
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1]  // 获取当前页面
　　var prevPage = pages[pages.length - 2]    //获取上一个页面
    prevPage.setData({
      carTypeBrand: this.data.brand+'/'+this.data.subBrand ,
      showCar: true
  　　})
    wx.navigateBack({
  　　　　delta:  1     // 表示返回到上一个页面（如果值为2表示回退到上上一个页面）
  　　});
    
   },
   onLoad: function (options) {
    // 生命周期函数--监听页面加载
   },
   //将汽车类型按照字母排序
   sortCart() {
    var carArr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    var sortCar = {};
    for(let i=0;i<carList.length; i++) {
      if(sortCar[carList[i].L]){
        sortCar[carList[i].L].push(carList[i]);
      }else{
        sortCar[carList[i].L] = [];
        sortCar[carList[i].L].push(carList[i]);
      }    
    }
  },
   onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    var that = this;
    wx.getSystemInfo({
     success: function (res) {
      lineHeight = (res.windowHeight-150) / 22;
      that.setData({
       carList: carList,
       winHeight: res.windowHeight,
       lineHeight: lineHeight
      })
     }
    })
   },
   onShow: function () {
    // 生命周期函数--监听页面显示
   },
   onHide: function () {
    // 生命周期函数--监听页面隐藏
   },
   onUnload: function () {
    // 生命周期函数--监听页面卸载
   },
   //触发全部开始选择
   chStart: function () {
    this.setData({
     trans: ".3",
     hidden: false
    })
   },
   //触发结束选择
   chEnd: function () {
    this.setData({
     trans: "0",
     hidden: true,
     scrollTopId: this.endWords
    })
   },
   //获取文字信息
   getWords: function (e) {
    var id = e.target.id;
    this.endWords = id;
    isNum = id;
    this.setData({
     showwords: this.endWords
    })
   },
   //设置文字信息
   setWords: function (e) {
    var id = e.target.id;
    this.setData({
     scrollTopId: id
    })
   },
   // 滑动选择城市
   chMove: function (e) {
    var y = e.touches[0].clientY;
    var offsettop = e.currentTarget.offsetTop;
    var height = 0;
    var that = this;
    ;
    var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    // 获取y轴最大值
    wx.getSystemInfo({
     success: function (res) {
      height = res.windowHeight - 10;
     }
    });
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop && y < height) {
     var num = parseInt((y - offsettop) / lineHeight);
     endWords = cityarr[num];
     // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
     that.endWords = endWords;
    };
    //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
    //DOTO 这里暂时还有问题，还是比较卡，待优化
    if (isNum != num) {
     isNum = num;
     that.setData({
      showwords: that.endWords
     })
    }
   }
})