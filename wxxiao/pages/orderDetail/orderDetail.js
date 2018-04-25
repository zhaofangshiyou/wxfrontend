// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBoard: false,
    passwordArr: [],
    payWay: 1
  },
  forgetPass: function() {
    wx.navigateTo({
      url: '../../pages/modifyPass/modifyPass'
    })
  },
  changePay: function() {
    if(this.data.payWay==1) {
      this.data.payWay = 2;
      this.setData({
        payWay: this.data.payWay
      })
    }else{
      this.data.payWay = 1;
      this.setData({
        payWay: this.data.payWay
      })
    }
  },
  paySubmit: function() {
    this.setData({
      showBoard: true
    })
  },
  hideBoard: function() {
    this.data.passwordArr.length=0;
    this.setData({
      showBoard: false,
      passwordArr: this.data.passwordArr
    })
  },
  inputPass: function(e) {
    if(e.currentTarget.dataset.number == 'deleteAll'){
      this.data.passwordArr.length = 0;
      this.setData({
        passwordArr: this.data.passwordArr
      })
    }else if(e.currentTarget.dataset.number == 'delete'){
      this.data.passwordArr.pop();
      this.setData({
        passwordArr: this.data.passwordArr
      })
    }else{
      if(this.data.passwordArr.length < 6) {
        this.data.passwordArr.push(e.currentTarget.dataset.number);
        if(this.data.passwordArr.length==6) {
          wx.navigateTo({
            url: '../../pages/payOrder/payOrder'
          })
        }
        this.setData({
          passwordArr: this.data.passwordArr
        })
      }else{
        return false;
      }
    }
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