//index.js
//获取应用实例
const app = getApp();
import httpService from '../../http/http.js';

Page({
  data: {
    listArr: [
      {name:'兆方车上付',notice:'一键加油，更省心',iconUrl: '../../images/zf_pay_index.png',link: '../../pages/chooseGrap/chooseGrap'},
      {name:'我的兆方卡',notice:'一键充值，享更高优惠',iconUrl: '../../images/zf_card1@2x.png',link: '../../pages/myCard/myCard'},
      {name:'交易查询',notice:'实时交易查询，更便捷',iconUrl: '../../images/icon_consume@2x.png',link: '../../pages/search/search'},
      {name:'兆方公益',notice:'兆方公益，与爱同行',iconUrl: '../../images/zf_card@2x.png',link: '../../pages/welfare/welfare'}
    ],
    msgList: [
      { url: "url", title: "多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
      { url: "url", title: "悦如公寓三周年生日趴邀你免费吃喝欢唱" },
      { url: "url", title: "你想和一群有志青年一起过生日嘛？" }]
  },

  onLoad: function () {

  },

  onReady: function () {
    var that = this;
    // wx.login({
    //   success: res => {
    //     console.log(res);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     httpService.sendRrquest('https://api.zfsyonline.com/v1/token',{},{code: res.code},'GET')
    //     .then((res) => {
    //       if(res.data.status==0) {
    //         wx.setStorageSync('token', res.data.data.token);
    //         httpService.sendRrquest(app.config.host+'/v1/message',{},{user_id: 1111},'POST')
    //   .then((res) => {
    //     console.log(res);
    //   })
    //       }
    //     })
    //   }
    // })
  },
  
  goNext(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link
    })
  },
})