// pages/unitCard/unitCard.js
import httpService from '../../http/http.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    data: [],
    hasMainCard: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  // cardId/userId/:userId  参数：type  0 - 个人 / 1 - 单位   获取卡列表
  getData() {
    var that = this;
    let param = {
      type: 1
    }
    httpService.sendRrquest(app.config.host+'/card',{userId: wx.getStorageSync('user_id')}, param,'GET')
      .then(res => {
        if(res.data.status === 0) {
          for (let i=0; i< res.data.data.card.length; i++) {
            if (!res.data.data.card[i].parent_id) {
              this.setData({
                hasMainCard: false
              })
            }
          }
          this.setData({
            data: res.data.data.card
          })
        }
      })
  },

  goDetail(e) {
    wx.navigateTo({
      url: '../../pages/succeCard/succeCrd?title=单位卡&type=2&id=' + e.currentTarget.dataset.id
    });
  },

  regMainCard() {
    wx.navigateTo({
      url: '../../pages/regMasterCard/regMasterCard'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
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