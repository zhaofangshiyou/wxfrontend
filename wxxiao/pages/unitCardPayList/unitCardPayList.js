// pages/unitCardPayList/unitCardPayList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let unitList = JSON.parse(options.unitCard);
    unitList.forEach((item, index) => {
      unitList[index].card_no = this.joinCard(item.card_prefix, item.id);
    });
    this.setData({
      list: unitList,
      card_id: options.card_id
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

  backPay(e) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];

    prevPage.setData({
　　　'card_id': e.currentTarget.dataset.id,
      'company': e.currentTarget.dataset.company
　　});
    wx.navigateBack({//返回
      delta:1
    })
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