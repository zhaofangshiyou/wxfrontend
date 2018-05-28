// pages/welfare/welfare.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfare_amount:'',
    total_vol: '',
    img_url: app.config.img_url
  },
  goBack: function() {
    wx.navigateBack();
  },

  getData: function() {
    let url = app.config.host + '/query/welfareAmount';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {};
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          welfare_amount: Number(res.data.data.user.welfare_amount).toFixed(2),
          total_vol: Number(res.data.data.user.total_vol).toFixed(2)
        })
      }

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
    this.getData();
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