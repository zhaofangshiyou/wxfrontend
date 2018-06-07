// pages/my/my.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    img_url: app.config.img_url,
    isAuth: true
  },
  goNext: function(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  },
//../../pages/recharge/recharge
  goRecharge: function() {
    var that = this;
    httpService.sendRrquest(app.config.host+'/card',{userId: wx.getStorageSync('user_id')},{},'GET')
      .then(res => {
        if(res.data.status === 0) {
          if(JSON.stringify(res.data.data.card) == 'null') {
            wx.navigateTo({
              url: '../../pages/openCard/openCard'
            }) 
          }else{
            wx.navigateTo({
              url: '../../pages/recharge/recharge'
            }) 
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'] != undefined && res.authSetting['scope.userInfo'] != true) { 
          wx.showModal({
            title: '微信授权',
            content: '需要获取您的昵称，头像等信息',
            success: (res) => {
              if (res.cancel) {

              }else if(res.confirm) {
                wx.openSetting({
                  success: (data) => {
                    if (data.authSetting["scope.userInfo"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      this.data.isAuth = false;
                      wx.getUserInfo({
                        success: res => {
                          that.setData({
                            userInfo: res.userInfo
                          })
                        },
                        fail: res => {
                          
                        }
                      })
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

    if(this.data.isAuth) {
      console.log(this.data.isAuth);
      wx.getUserInfo({
        success: res => {
          that.setData({
            userInfo: res.userInfo
          })
        },
        fail: res => {
  
        }
      })
    }
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