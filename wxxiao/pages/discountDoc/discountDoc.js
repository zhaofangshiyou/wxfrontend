// pages/discountDoc/discountDoc.js
import httpService from '../../http/http.js';
const WxParse= require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: ''
  },

  getDiscountDoc: function() {
    var that= this; 
    let url = app.config.host + '/backen/discount/doc';
    let data = {};
    let params = {};
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        let content = res.data.data.discount_doc_list[0].content;
        let title = res.data.data.discount_doc_list[0].title;
        WxParse.wxParse('content', 'html', content,that, 5);
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
    this.getDiscountDoc();
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