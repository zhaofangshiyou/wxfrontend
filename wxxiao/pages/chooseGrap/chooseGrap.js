// pages/chooseGrap/chooseGrap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oil: {
      station: '华富加油站',
      distance: 0.1,
      address: ''
    },
    grapList: [
      {value: 1,'name': '1号'},
      {value: 2,'name': '1号'},
      {value: 3,'name': '1号'},
      {value: 4,'name': '1号'},
      {value: 5,'name': '1号'},
      {value: 6,'name': '1号'},
      {value: 7,'name': '1号'},
      {value: 8,'name': '1号'},
      {value: 9,'name': '1号'},
      {value: 10,'name': '1号'},
      {value: 11,'name': '1号'},
      {value: 12,'name': '1号'},
      {value: 13,'name': '1号'},
      {value: 14,'name': '1号'},
    ],
    chooseIndex: 0,
    grapText: '更多',
    max_show: 7
  },
  chooseGrap: function(e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
    })
  },
  toggleDrap: function() {
    if(this.data.max_show < 8) {
      this.setData({
        max_show: 30,
        grapText: '收起'
      })
    }else{
      this.setData({
        max_show: 7,
        grapText: '更多'
      })
    }
  },
  nextSubmit: function() {
    wx.navigateTo({
      url: '../../pages/orderDetail/orderDetail'
    })
  },
  otherPay:function() {
    wx.navigateTo({
      url: '../../pages/zhaofangCardPay/zhaofangCardPay'
    })
  },
  changeStation: function() {
    wx.navigateTo({
      url: '../../pages/oilStation/oilStation'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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