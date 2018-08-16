// pages/erweima/erweima.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 120,
    oil_flow_id: '',
    fnTimer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.oil_flow_id =  options.oil_flow_id;
    this.getStatus(120);
    this.countDown(120);
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: options.key
    })
  },

  //验证码倒计时
  countDown(timeout) {
    let timer;
    if(timer) {
      clearTimeout(timer);
    }else{
      timer = setTimeout(() => {
        this.countDown(timeout);
      },1000);
      if(timeout===0) {
        clearTimeout(timer);
        this.setData({
          time: 0 + "s",
        })
        wx.navigateBack();
      }else{
        this.setData({
          time: timeout + "s",
        })
        timeout--;
      }
    }
  },

     //每隔5秒查询一次
  getStatus:function(timeout) {
    let that = this;
    this.data.fnTimer = "";
    if(this.data.fnTimer) {
      clearTimeout(this.data.fnTimer);
    }else{
      this.data.fnTimer = setTimeout(() => {
        this.getStatus(timeout)
      },10000)
      if(timeout==0) {
        clearTimeout(this.data.fnTimer);
      }else{
        let url = app.config.host + '/order';
        let data = {};
        let params = {
          oil_flow_id: that.data.oil_flow_id
        };
        let method = 'GET';
        httpService.sendRrquest(url,data,params,method).then(res => {
          if(res.data.status === 0) {
            if(res.data.data.is_invoicing == 2) {
              clearTimeout(this.data.fnTimer);
              wx.navigateTo({
                url: '../../pages/scanSuccess/scanSuccess?title=扫码成功&note=发票打印中，请耐心等待' 
              })
            }
          }else{
            util.warnMsg(res.data.msg);
          }
        })
        timeout = timeout - 10;
      }
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
    clearTimeout(this.data.fnTimer);
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