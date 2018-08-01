// pages/erweima/erweima.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStatus(120);
    drawQrcode({
      width: 250,
      height: 250,
      canvasId: 'myQrcode',
      text: 'skfjdkhljklkjk'
    })
  },

     //每隔5秒查询一次
  getStatus:function(timeout) {
    let timer;
    if(timer) {
      clearTimeout(timer);
    }else{
      timer = setTimeout(() => {
        this.getStatus(timeout)
      },10000)
      if(timeout==0) {
        clearTimeout(timer);
      }else{
        console.log('发送请求');
        if(timeout==100){
          console.log('发送请求');
          clearTimeout(timer);
        }
        timeout = timeout - 10;
        console.log(timeout);
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