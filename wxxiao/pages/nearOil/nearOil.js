// pages/nearOil/nearOil.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipText: '',
    oil_list:[],
    img_url: app.config.img_url
  },
  getData: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // that.setData({
        //   latitude: res.latitude,
        //   longitude: res.longitude
        // })
        that.getStation(res.latitude,res.longitude);
      },
      cancel: function() {
        if(that.data.oil_list.length === 0) {
          that.getStation();
        }
      },
      fail: function() {
        if(that.data.oil_list.length === 0) {
          that.getStation();
        }
      }
    })
  },
  getStation: function(lat,lon) {
    var that = this;
    let url = app.config.host + '/station';
        let data = {};
        let params = {
          'lat': lat,
          'lon': lon
        };
        let method = 'GET';
        httpService.sendRrquest(url,data,params,method).then(res => {
          if(res.data.status === 0) {
            that.setData({
              oil_list: res.data.data.stations
            })
          }
        })
  },
  goOilStation: function(e) {
    wx.showModal({
      title: '提示',
      content: '是否前往：兆方石油' + e.currentTarget.dataset.name,
      success: function (sm) {
        if (sm.confirm) {
            // 用户点击了确定 
            wx.openLocation({ //出发wx.openLocation API

              latitude: Number(e.currentTarget.dataset.lat), //坐标纬度（从地图获取坐标）
              
              longitude: Number(e.currentTarget.dataset.lon), //坐标经度（从地图获取坐标）
              
              name: e.currentTarget.dataset.name, //打开后显示的地址名称
              
              address: e.currentTarget.dataset.address //打开后显示的地址汉字
              
              }) 
          } else if (sm.cancel) {

          }
        }
      })
  },
  getLocation: function() {
    var that =this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
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