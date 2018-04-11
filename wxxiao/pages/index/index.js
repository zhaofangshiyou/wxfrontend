//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listArr: [
      {name:'兆方车上付',notice:'一键加油，更省心',iconUrl: '../../images/home_icon_zfpay.png',link: '../../pages/logs/logs'},
      {name:'我的兆方卡',notice:'一键充值，享更高优惠',iconUrl: '../../images/home_icon_zfcar.png',link: '../../pages/carType/carType'},
      {name:'交易查询',notice:'实时交易查询，更便捷',iconUrl: '../../images/home_icon_transaction.png',link: ''},
      {name:'积分商城',notice:'积分兑好礼，优惠享不停',iconUrl: '../../images/home_icon_integral.png',link: ''}
    ]
  },

  onLoad: function () {

  },

  onReady: function () {

  },
  goNext(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.link
    })
  },
 
})
