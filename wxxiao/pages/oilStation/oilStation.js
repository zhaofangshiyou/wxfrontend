// pages/oilStation/oilStation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oilArr: [
      {name:'华富加油站',address:'安徽省铜陵市铜官区滨江大道中段'},
      {name:'雨坛加油站',address:'安徽省枞阳县雨坛乡雨坛村义小公路西侧'},
      {name:'广阳加油站',address:'安徽省黄山市太平湖朝阳村'}
    ]
  },
  back:function(event) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    let list = [
      {value: 1,'name': '1号'},
      {value: 2,'name': '2号'},
      {value: 3,'name': '3号'},
      {value: 4,'name': '4号'},
      {value: 5,'name': '5号'},
      {value: 6,'name': '6号'}
    ]
    prevPage.setData({
　　　　"oil.station": event.currentTarget.dataset.name,
        "oil.address": event.currentTarget.dataset.address,
        "grapList": list
　　});
    wx.navigateBack({//返回
      delta:1
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      img_url: app.config.img_url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})