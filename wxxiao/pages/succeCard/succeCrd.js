// pages/succeCard/succeCrd.js
import httpService from '../../http/http.js';

const app = getApp();
/**
type = 0: 个人开卡成功
type = 1: 个人进入卡详情
type = 6: 个人卡充值成功
type = 2: 单位卡进入卡详情
type = 3: 主卡开卡成功
**/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    type: '',
    cardMess: {},
    img_url: app.config.img_url,
    money: '',
    recharge_type: 1,
    card_id: ''
  },
  finishSubmi: function() {
    wx.reLaunch({
      url: '../../pages/index/index'
    })
  },
  recharge: function() {
    wx.navigateTo({
      url: '../../pages/recharge/recharge?type=' + this.data.recharge_type + '&card_id=' + this.data.card_id
    })
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
    wx.setNavigationBarTitle({
      title: res.title//页面标题为路由参数
    })

    if(res.type == 1 || res.type == 6 || res.type==0) {
      this.data.recharge_type = 1;
      var that = this;
      let param = {
        type: 0
      }
      httpService.sendRrquest(app.config.host+'/card',{userId: wx.getStorageSync('user_id')}, param,'GET')
        .then(res => {
          if(res.data.status === 0) {
            this.getCardInfo(res.data.data.card[0].id)
          }
        })
    } else {
      //单位卡
      this.data.recharge_type = 2;
      this.getCardInfo(res.id)
      this.data.card_id = res.id;
    }
  },

    //获取卡详情信息
    getCardInfo: function(id) {
      var that = this;
      httpService.sendRrquest(app.config.host+'/card',{cardId: id},{},'GET')
        .then(res => {
          if (res.data.status === 0) {
            if (res.data.data.card.unit_card_type == 0) {
              this.setData({
                money: res.data.data.card.person_balance
              })
            } else {
              this.setData({
                money: res.data.data.card.company_balance
              })
            }
            this.setData({
              cardMess: res.data.data.card,
              "cardMess.num": that.joinCard(res.data.data.card.card_prefix, res.data.data.card.id)
            })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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