// pages/erweima/erweima.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 120
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStatus(120);
    this.countDown(10);
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: 'skfjdkhljklkjk'
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
        if(timeout==120){
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