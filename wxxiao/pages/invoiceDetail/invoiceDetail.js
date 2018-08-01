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
    com_list: [],
    emailValue: '',
    orderDetail: {},

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
    this.getOrder(options.trade_no);
  },

  //获取订单详情
  getOrder: function(trade_no) {
    let url = app.config.host + '/order/detail';
    let data = {
      tradeNo: trade_no
    };
    let params = {};
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          orderDetail: res.data.data.order
        })
      }else{
        util.warnMsg(res.data.msg);
      }
    })
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
      }else{
        util.warnMsg(res.data.msg);
      }
    })
  },
  checkEmail: function(e) {
    this.data.emailValue = e.detail.value;
    if(this.isEmailAvailable(this.data.emailValue)) {
      return true;
    }else{
      util.warnMsg('请输入正确的邮箱号');
      return false;
    }
  },
  //提交
  nextSubmit: function() {
    if(this.data.type == 1) {
      wx.navigateTo({
        url: '../../pages/erweima/erweima'
      })
    }else{
      //电子邮箱
      console.log(this.isEmailAvailable(this.data.emailValue));
      if(this.isEmailAvailable(this.data.emailValue)) {
         //发送邮件
         console.log('电子发票');
      }else{
        util.warnMsg('请输入正确的邮箱号');
        return;
      }
    }
  },

  //验证邮箱
   //验证手机号
   isEmailAvailable(email) {
    let myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!myreg.test(email)) {
     return false;
    } else {
     return true;
    }
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