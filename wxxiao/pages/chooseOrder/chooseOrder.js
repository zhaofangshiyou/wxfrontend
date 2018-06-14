// pages/chooseOrder/chooseOrder.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    detail_indx: 0,
    orderList: [],
    gun_id:'',
    station_id: '',
    order_detail: {}
  },
  nextSubmit: function() {
    let url = app.config.host + '/pay/flow/order';
      let data = {};
      let params = {
        'station_id': this.data.station_id,
        'gun_id': this.data.gun_id,
        'write_money': this.data.order_detail.OilMount,
        'oil_id': '',
        'user_id': wx.getStorageSync('user_id'),
        'Fluid': this.data.order_detail.Fluid
      };
      let method = 'GET';
      httpService.sendRrquest(url,data,params,method).then(res => {
        if(res.data.status === 0) {
          wx.navigateTo({
            url: '../../pages/orderDetail/orderDetail?order_detail='+ JSON.stringify(res.data.data) + '&oil_id=""'
          })
        }else if(res.data.status === 2){
          util.warnMsg('油站选择错误');
        }else if(res.data.status === 3) {
          util.warnMsg('油枪选择错误');
        }else if(res.data.status === 5) {
          util.warnMsg('无此记录');
        }
        else if(res.data.status === 4) {
          util.warnMsg('无流水信息');
        }else {
          util.warnMsg('其他错误');
        }
      })
  },
  chooseOrder: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      detail_indx: index
    })
    this.data.order_detail = this.data.orderList[index];
  },

  getOrders: function(station_id,gun_id) {
    var that = this;
    let url = app.config.host + '/pay/flow/orders';
    let data = {};
    let params = {
      station_id: station_id,
      gun_id: gun_id
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        that.data.order_detail = res.data.data.flow[0]
        that.setData({
          orderList: res.data.data.flow,
          gun_id: that.data.gun_id
        })
      }else if(res.data.status === 2){
        util.warnMsg('油站选择错误');
      }else if(res.data.status === 3) {
        util.warnMsg('油枪选择错误');
      }else if(res.data.status === 5) {
        util.warnMsg('无此记录');
      }
      else if(res.data.status === 4) {
        util.warnMsg('无流水信息');
      }else {
        util.warnMsg('其他错误');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrders(options.station_id,options.gun_id);
    this.data.gun_id = options.gun_id;
    this.data.station_id = options.station_id;
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