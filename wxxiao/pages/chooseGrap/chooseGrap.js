// pages/chooseGrap/chooseGrap.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oil: {
      station: '',
      distance: '',
      address: '',
      station_id: '',
      type: 1
    },
    grapList: [],
    station_list: [],
    chooseIndex: 1,
    grapText: '更多',
    max_show: 7,
    img_url: app.config.img_url,
    conMoney: "",
    oil_index: '1',
    oil_list: []
  },
  chooseGrap: function(e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
    })
  },
  toggleDrap: function() {
    if(this.data.max_show < 8) {
      this.setData({
        max_show: 30,
        grapText: '收起'
      })
    }else{
      this.setData({
        max_show: 7,
        grapText: '更多'
      })
    }
  },
  nextSubmit: function() {
    if(this.data.oil.type == 1) {
      this.data.conMoney = '';
      this.data.oil_index = '';
      this.goNextFunc();
    }else{
      if(this.data.conMoney.length > 0) {
        // this.data.chooseIndex = '';
        this.goNextFunc();
      }else{
        this.warnMsg('请输入充值金额');
        return false;
      }
    }
  },

  goNextFunc: function() {
    let url = app.config.host + '/pay/flow/order';
      let data = {};
      let params = {
        'station_id': this.data.oil.station_id,
        'gun_id': this.data.chooseIndex,
        'write_money': this.data.conMoney,
        'oil_id': this.data.oil_index,
        'user_id': wx.getStorageSync('user_id')
      };
      let method = 'GET';
      httpService.sendRrquest(url,data,params,method).then(res => {
        if(res.data.status === 0) {
          wx.navigateTo({
            url: '../../pages/orderDetail/orderDetail?order_detail='+ JSON.stringify(res.data.data) + '&oil_id=' + this.data.oil_index
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

  otherPay:function() {
    wx.navigateTo({
      url: '../../pages/zhaofangCardPay/zhaofangCardPay'
    })
  },
  changeStation: function() {
    let station_str = JSON.stringify(this.data.station_list);
    wx.navigateTo({
      url: '../../pages/oilStation/oilStation?station_list='+ station_str
    })
  },
  //获取初始化数据
  getInitData: function() {
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
        if(that.data.station_list.length === 0) {
          that.getStation();
        }
      },
      fail: function() {
        if(that.data.station_list.length === 0) {
          that.getStation();
        }
      }
    })
  },

  //获取油站函数
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
        that.data.station_list = res.data.data.stations;
        let temp = [];
        for(let i=1; i< parseInt(res.data.data.stations[0].oil_gum_nums)+1; i++ ) {
          temp.push(i);
        }
        that.setData({
          "oil.station" : res.data.data.stations[0].name,
          "oil.distance": Math.floor(res.data.data.stations[0].distance/1000),
          "oil.type": res.data.data.stations[0].type,
          "grapList": temp,
          "type": res.data.data.stations[0].type,
          "oil.station_id": res.data.data.stations[0].id
        })
      }
    })
  },

  selectOil: function(e) {
    this.setData({
      oil_index: e.currentTarget.dataset.index
    })
  },
  bindKeyInput: function(e) {
    this.data.conMoney = e.detail.value;
  },
  warnMsg: function(text) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask:true
    })
  },
  //获取油枪号
  getOil: function() {
    let url = app.config.host + '/backen/oil';
    let data = {};
    let params = {};
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.setData({
          oil_list: res.data.data
        })
      }else{
        this.warnMsg(res.data.msg);
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
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { 
          wx.showModal({
            title: '微信授权',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: (res) => {
              if (res.cancel) {

              }else if(res.confirm) {
                wx.openSetting({
                  success: (data) => {
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      this.getInitData();
                    }else{
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    this.getOil();
    this.getInitData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.oil_index = '1';
    this.setData({
      conMoney: this.data.conMoney
    })
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