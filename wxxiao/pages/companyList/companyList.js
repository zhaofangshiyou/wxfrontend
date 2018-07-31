// pages/companyList/companyList.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    page_num: 1,
    num: 15,
    com_list: []
  },

  getCompany: function() {
    let url = app.config.host + '/invoice';
    let data = {};
    let params = {
      page_num: this.data.page_num,
      num: this.data.num,
      user_id: wx.getStorageSync('user_id')
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          com_list: res.data.data
        })
      }else{
        warnMsg.warnMsg(res.data.msg);
      }
    })
  },

  addTitle: function() {
    wx.navigateTo({
      url: '../../pages/invoiceTitle/invoiceTitle'
    })
  },

  goDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    if(e.currentTarget.dataset.flag == 1) {
      wx.navigateTo({
        url: '../../pages/invoiceDetail/invoiceDetail?id=' + id
      })
    }else{
      wx.navigateTo({
        url: '../../pages/invoiceTitle/invoiceTitle?id=' + id + '&type=' + type
      })
    }
    
  },

  deleteItem: function(e) {
    let that = this;
    let title = e.currentTarget.dataset.title;
    let id = e.currentTarget.dataset.id;
    var ids = [];
    ids.push(id);
    let str_id = JSON.stringify(ids)
    wx.showModal({
      title: '提示',
      content: '是否删除:' + title,
      success: function (sm) {
        if (sm.confirm) {
            // 用户点击了确定 
            let url = app.config.host + '/invoice/del';
            let data = {};
            let params = {
              id: str_id
            };
            let method = 'DELETE';
            httpService.sendRrquest(url,data,params,method).then(res => {
              if(res.data.status === 0) {
                util.warnMsg('删除成功');
                setTimeout(() => {
                  that.getCompany();
                },1000)
              }else{
                warnMsg.warnMsg(res.data.msg);
              }
            })
          } else if (sm.cancel) {

          }
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
    this.getCompany();
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