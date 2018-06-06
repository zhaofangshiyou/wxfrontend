// pages/succeCard/succeCrd.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    type: '',
    card_num: '',
    haveCard: true,
    haveMenuCard: true,
    balance: 0,
    img_url: app.config.img_url
  },
  finishSubmi: function() {
    wx.reLaunch({
      url: '../../pages/index/index'
    })
  },
  recharge: function() {
    wx.navigateTo({
      url: '../../pages/recharge/recharge'
    })
  },

    //获取卡信息
    getCardInfo: function() {
      var that = this;
      httpService.sendRrquest(app.config.host+'/card',{userId: wx.getStorageSync('user_id')},{},'GET')
        .then(res => {
          if(res.data.status === 0) {
            if(this.data.type == 1 || this.data.type == 6 || this.data.type == 0) {
              var temp_number = this.joinCard(res.data.data.card.card_prefix,res.data.data.card.id.toString());
              that.setData({
                card_num: temp_number,
                balance: res.data.data.card.person_balance
              })
              console.log(res.data.data.card.person_balance);
            }else if(this.data.type == 2) {
              that.setData({
                card_num: '1001 8888',
                balance: parseInt(res.data.data.card.company_balance)
              })
            }
          }
        })
    },
  
    //拼接卡号
    joinCard: function(prex,id) {
      let str_id = id.toString();
      let id_len = str_id.length;
      let str_0 = '';
      for(let i=0; i< 8-id_len; i++) {
        str_0 = str_0 + '0';
      }
      let new_num = prex +'  ' + str_0 + str_id;
      return new_num;
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    var that = this;
    that.setData({
      // balance: parseInt(res.balance),
      title: res.title,
      type: res.type
      // card_num: res.card_number
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCardInfo();
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