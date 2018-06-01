// pages/oilStation/oilStation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oilArr: [],
    img_url: app.config.img_url
  },
  back:function(event) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    let list = [];
    for(let i=1; i< parseInt(event.currentTarget.dataset.gunnumber)+1; i++ ) {
      list.push(i);
    }

    prevPage.setData({
　　　　"oil.station": event.currentTarget.dataset.name,
        "oil.address": event.currentTarget.dataset.address,
        "oil.distance": event.currentTarget.dataset.distance/1000,
        "oil.station_id": event.currentTarget.dataset.id,
        "oil.type":  event.currentTarget.dataset.type,
        "grapList": list,
        "userInfo.oilStation": event.currentTarget.dataset.name,
        "userInfo.station_id": event.currentTarget.dataset.id
　　});
    wx.navigateBack({//返回
      delta:1
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let station_list = JSON.parse(options.station_list);
    var that = this;
    that.setData({
      oilArr: station_list
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