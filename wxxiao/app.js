//app.js
import httpService from './http/http.js';
const app = getApp();
App({
  config: {
    //  host: 'https://api.zfsyonline.com/v1', //线上环境
    host: 'https://test.zfsyonline.com/v1', //测试环境
    img_url: 'https://api.zfsyonline.com/images',
    header: ` {
      'Content-Type": "application/x-www-form-urlencoded'
    }`
  },
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        httpService.sendRrquest(this.config.host + '/user',{},{code: res.code},'POST')
        .then((res) => {
          if(res.data.status===0) {
            wx.setStorageSync('user_id', res.data.data.user.id);
            wx.setStorageSync('open_id', res.data.data.user.open_id);
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})