//index.js
//获取应用实例
const app = getApp();
import httpService from '../../http/http.js';

Page({
  data: {
    listArr: [
      {name:'兆方车上付',notice:'一键加油，更省心',iconUrl: '../../images/home_icon_zfpay.png',link: '../../pages/chooseGrap/chooseGrap'},
      {name:'我的兆方卡',notice:'一键充值，享更高优惠',iconUrl: '../../images/home_icon_zfcar.png',link: '../../pages/myCard/myCard'},
      {name:'交易查询',notice:'实时交易查询，更便捷',iconUrl: '../../images/home_icon_transaction.png',link: '../../pages/search/search'},

    ]
  },

  onLoad: function () {

  },

  onReady: function () {
    var that = this;
    httpService.sendRrquest(app.config.host+'/v1/login/208',{},'GET')
      .then((res) => {
        console.log(res);
      })
  },
  
  goNext(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link
    })
  },
})