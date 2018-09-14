//index.js
//获取应用实例
const app = getApp();
import httpService from '../../http/http.js';

Page({
  data: {
    listArr: [
      {name:'兆方车上付',notice:'一键加油，更省心',iconUrl: app.config.img_url+'/zf_pay_index.png',link: '../../pages/chooseGrap/chooseGrap'},
      {name:'我的兆方卡',notice:'开卡，支付更便捷',iconUrl: app.config.img_url+'/zf_card1@2x.png',link: '../../pages/myCard/myCard'},
      {name:'我要充值',notice:'一键充值，享更高优惠',iconUrl: app.config.img_url+'/add_copy.png',link: '../../pages/recharge/recharge'},
      {name:'兆方公益',notice:'兆方公益，与爱同行',iconUrl: app.config.img_url+'/zf_card1.png',link: '../../pages/welfare/welfare'}
    ],
    msgList: [ 
      { url: "url", title: "所有汽油均已添加法国道达尔添加剂" },
      { url: "url", title: "您每加一升油，兆方将捐赠1分钱公益金" },
      ],
      img_url: app.config.img_url
  },

  onLoad: function () {
    
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
        let modelmes = res.model;  
        if (modelmes.search('iPhone X') != -1) {  
          //that.globalData.isIphoneX = true;  
        }  
    
      }  
    })  
  },
  
  goNext(event) {
      if(event.currentTarget.dataset.index != 3) {
        var that = this;
        let param = {
          type: 0
        }
        httpService.sendRrquest(app.config.host+'/card',{userId: wx.getStorageSync('user_id')}, param,'GET')
          .then(res => {
            if(res.data.status === 0) {
              if(res.data.data.card.length == 0) {
                wx.navigateTo({
                  url: '../../pages/openCard/openCard'
                }) 
              }else{
                wx.navigateTo({
                  url: event.currentTarget.dataset.link
                })
              }
            }
          })
      }else{
        wx.navigateTo({
          url: event.currentTarget.dataset.link
        })
      }
  },
})