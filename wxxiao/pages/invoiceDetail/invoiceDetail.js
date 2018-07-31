// pages/invoiceDetail/invoiceDetail.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    showMore: false,
    type: 1,
    com_list: []
  },

  showMoreMess: function() {
    this.setData({
      showMore: !this.data.showMore
    })
  },

  changeTab: function(e) {
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },

  nextSubmit:function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
  },

  getDetail: function(id) {
    let url = app.config.host + '/invoice';
    let data = {};
    let params = {
      user_id: wx.getStorageSync('user_id'),
      id: id
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          com_list: res.data.data
        })
        console.log(this.data.com_list);
      }else{
        util.warnMsg(res.data.msg);
      }
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