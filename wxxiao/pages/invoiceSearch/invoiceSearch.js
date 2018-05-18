// pages/invoiceSearch/invoiceSearch.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    noData: true,
    notOpenInvoice: [],
    openInvoice: [],
    page1: 1,
    page2: 1,
    limit: 10,
    is_invoicing: 1,
    noDataText: '暂无可开发票',
    noMore: false
  },
  changeTab: function(e) {
    if(e.currentTarget.dataset.tabindex == 1) {
      this.setData({
        tabIndex: 1,
        showClassify: false,
        noDataText: '暂无可开发票',
        is_invoicing: 1,
        noMore: false
      })
    }else{
      this.setData({
        tabIndex: 2,
        showClassify: false,
        noDataText: '暂无已开发票',
        is_invoicing: 0,
        noMore: false
      })
      if(this.data.openInvoice.length == 0) {
        this.getDataList(this.data.page2,this.data.limit,this.data.is_invoicing);
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //获取发票列表
  getDataList: function(page,limit,is_invoicing) {
    let url = app.config.host+ '/query/flow/consume';
    // let data = {userId: wx.getStorageSync('user_id')};
    let data = {userId: 1};
    let params = {
      page: page,
      limit: limit,
      is_invoicing: is_invoicing
    };
    let method = 'GET';
    this.setData({
      noData: true,
      noMore: false
    })
    httpService.sendRrquest(url,data,params,method).then( res=> {
      if(res.data.status === 0) {
          if(this.data.tabIndex==1) {
            var list = res.data.data.flow;
            if(list=='') {
              if(this.data.notOpenInvoice.length == 0) {
                this.setData({
                  noData: false
                })
              }else{
                this.setData({
                  noMore: true
                })
              }
            }else {
              var newArr = this.data.notOpenInvoice.concat(list);
              this.setData({
                notOpenInvoice: newArr
              }) 
            }
        }else{
            var list2 = res.data.data.flow;
            if(list2=='') {
              if(this.data.openInvoice.length == 0) {
                this.setData({
                  noData: false
                })
              }else{
                this.setData({
                  noMore: true
                })
              }
            }else {
              var newArr2 = this.data.openInvoice.concat(list2);
              this.setData({
                openInvoice: newArr2
              }) 
            }
        }
      }
    })
  },
  loadMoreInvoice() {
    if(this.data.tabIndex == 1) {
      if(!this.data.noMore) {
        ++this.data.page1;
        this.getDataList(this.data.page1,this.data.limit,this.data.is_invoicing);
      }
    }else{
      if(!this.data.noMore) {
        ++this.data.page2;
        this.getDataList(this.data.page2,this.data.limit,this.data.is_invoicing);
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDataList(this.data.page1,this.data.limit,this.data.is_invoicing);
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