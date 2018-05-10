// pages/invoiceSearch/invoiceSearch.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    notOpenInvoice: [],
    openInvoice: [],
    page1: 1,
    page2: 1,
    limit: 10,
    is_invoicing: 1
  },
  changeTab: function(e) {
    if(e.currentTarget.dataset.tabindex == 1) {
      this.setData({
        tabIndex: 1,
        showClassify: false
      })
    }else{
      this.setData({
        tabIndex: 2,
        showClassify: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //获取发票列表
  getDataList: function(page,limit,is_invoicing) {
    let url = app.config.host+ '/query/consume/oil';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {
      page: page,
      limit: limit,
      msg_type: is_invoicing
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then( res=> {
      if(res.data.status === 0) {
        if(is_invoicing==1) {
          console.log('未开发票')
        }else{
          console.log('已开发票')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDataList(this.data.page1,this.data.page2,this.data.is_invoicing);
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