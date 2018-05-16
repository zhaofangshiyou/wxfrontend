// pages/myCard/myCard.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      {name:'个人卡',notice:'个人办理的加油卡用户请选择',iconUrl: '../../images/person_card.png',link: '../../pages/openCard/openCard'},
      {name:'单位卡',notice:'持有单位分配的加油卡用户请选择',iconUrl: '../../images/company_card.png',link: '../../pages/bindCard/bindCard'},
    ],
    haveCard: true,
    haveMenuCard: true,
    person_balance: 0,
    company_balance: 0
  },
  cardDetail: function(e) {
    if(e.currentTarget.dataset.index == 0) {
      console.log(this.data.haveCard);
      if(!this.data.haveCard) {
        wx.navigateTo({
          url: this.data.listArr[0].link
        })
      }else{
        wx.navigateTo({
          url: '../../pages/succeCard/succeCrd?title=个人卡&type=1&balance='+ this.data.person_balance
        })
      }
    }else{
      console.log(this.data.haveMenuCard);
      if(!this.data.haveMenuCard) {
        wx.navigateTo({
          url: this.data.listArr[1].link
        })
      }else{
        wx.navigateTo({
          url: '../../pages/succeCard/succeCrd?title=单位卡&type=2&balance='+this.data.company_balance
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCardInfo();
  },

  //获取卡信息
  getCardInfo: function() {
    var that = this;
    httpService.sendRrquest(app.config.host+'/card',{userId: wx.getStorageSync('user_id')},{},'GET')
      .then(res => {
        if(res.data.status === 0) {
          if(JSON.stringify(res.data.data.card) == 'null') {
            that.data.haveCard = false;
            this.data.haveMenuCard = false;
          }else{
            this.data.person_balance = res.data.data.card.person_balance;
            if(JSON.stringify(res.data.data.card.parent_id) == 'null') {
              this.data.haveMenuCard = false;
            }else{
              this.data.company_balance = res.data.data.card.company_balance;
            }
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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