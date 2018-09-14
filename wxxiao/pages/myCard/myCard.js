// pages/myCard/myCard.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      {name:'单位卡',notice:'单位办理的加油卡用户请选择',iconUrl: app.config.img_url+'/company_card.png',link: '../../pages/unitCard/unitCard'},
      {name:'个人卡',notice:'个人办理的加油卡用户请选择',iconUrl: app.config.img_url+'/person_card.png',link: '../../pages/succeCard/succeCrd?title=个人卡&type=1'}
    ],
    person_balance: 0,
    company_balance: 0,
    img_url: app.config.img_url
  },
  cardDetail: function(e) {
    wx.navigateTo({
      url: this.data.listArr[e.currentTarget.dataset.index].link
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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