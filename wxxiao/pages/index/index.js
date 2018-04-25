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
      { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
      { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
      { url: "url", title: "公告：你想和一群有志青年一起过生日嘛？" }]
  },

  onLoad: function () {

  },

  onReady: function () {
    var that = this;
    // httpService.sendRrquest(app.config.host+'/v1/login',{user: 1},{name: '11111'},'DELETE')
    //   .then((res) => {
    //     console.log(res);
    //   })
  },
  
  goNext(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link
    })
  },
})