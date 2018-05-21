//index.js
//获取应用实例
const app = getApp();
import httpService from '../../http/http.js';

Page({
  data: {
    listArr: [
      {name:'兆方车上付',notice:'一键加油，更省心',iconUrl: app.config.img_url+'/zf_pay_index.png',link: '../../pages/chooseGrap/chooseGrap'},
      {name:'我的兆方卡',notice:'一键充值，享更高优惠',iconUrl: app.config.img_url+'/zf_card1@2x.png',link: '../../pages/myCard/myCard'},
      {name:'交易查询',notice:'实时交易查询，更便捷',iconUrl: app.config.img_url+'/icon_consume@2x.png',link: '../../pages/search/search?tabIndex=1'},
      {name:'兆方公益',notice:'兆方公益，与爱同行',iconUrl: app.config.img_url+'/zf_card@2x.png',link: '../../pages/welfare/welfare'}
    ],
    msgList: [ 
      { url: "url", title: "所有汽油均已添加法国道达尔添加剂" },
      { url: "url", title: "您每加一升油，兆方将捐赠1分钱公益金" },
      ]
  },

  onLoad: function () {
    var that = this;
    that.setData({
      img_url: app.config.img_url
    })
  },

  onReady: function () {
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
    let  that = this;  
    wx.getSystemInfo({  
      success:  res=>{  
        console.log('手机信息res'+res.model);
        let modelmes = res.model;  
        if (modelmes.search('iPhone X') != -1) {  
          //that.globalData.isIphoneX = true;  
        }  
    
      }  
    })  
  },
  
  goNext(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link
    })
  },
})