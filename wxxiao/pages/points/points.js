// pages/points/points.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: app.config.img_url,
    page: 1,
    num: 10,
    score: 0,
    pointList: [],
    noMoreData: false,
    
  },
  loadMoreCharge: function() {
    if(!this.data.noMoreData) {
      ++this.data.page;
      this.getList(this.data.page,this.data.num);
    }
  },
  getList: function(page,limit) {
    let url = app.config.host + '/query/score';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {
      page: page,
      limit: limit
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then( res => {
      if(res.data.status === 0) {
        this.setData({
          score: parseInt(res.data.data.score)
        });
        let list = res.data.data.score_flow;
        if(list.length === 0) {
          if(this.data.pointList.length > 0) {
            this.setData({
              noMoreData: true
            })
          }else{
            this.setData({
              noData: true
            })
          }
        }else{
          let newArr = this.data.pointList.concat(list);
          this.setData({
            pointList: newArr
          })
        }
      }else{
        util.warnMsg('修改成功');
      }
    })
  },
  goBack: function() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getList(this.data.page,this.data.num);
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