// pages/search/search.js
import httpService from '../../http/http.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showClassify: false,
    tabIndex: 1,
    typeName: '全部',
    typeValue: 2,
    rechageList: [],
    comsumeList: [],
    page2: 1,
    page: 1,
    limit: 15,
    noData: true,
    noMore: false,
    listHeight: '',
    scrollTop: 0,
    noDataText: '',
    img_url: app.config.img_url
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
     success: function (res) {
      var listHeight = (res.screenHeight - 170)/res.screenHeight*100;
      that.setData({
        listHeight: listHeight
      })
     }
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      tabIndex: options.tabIndex
    })
    if(options.tabIndex == 1) {
      this.getRechageData(this.data.page,this.data.limit,this.data.typeValue);
      this.setData({
        noDataText: '暂无充值记录'
      })
    }else{
      this.getComsumeData(this.data.page2,this.data.limit,this.data.typeValue);
      this.setData({
        noDataText: '暂无消费记录'
      })
    }
  },
  //获取充值流水
  getRechageData: function(page,limit,typeValue) {
    let url = app.config.host+ '/query/flow/charge';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {
      page: this.data.page,
      limit: this.data.limit,
      msg_type: this.data.typeValue
    };
    let method = 'GET';
    this.setData({
      noData: true,
      noMore: false
    })
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        var list = res.data.data.flow;
        if(list=='') {
          if(this.data.rechageList.length == 0) {
            this.setData({
              noData: false
            })
          }else{
            if(this.data.rechageList.length > this.data.limit) {
              this.setData({
                noMore: true
              })
            }
          }
        }else {
          var newArr = this.data.rechageList.concat(list);
          this.setData({
            rechageList: newArr
          }) 
        }
      }
    })
  },
  //充值加载更多
  loadMoreCharge: function() {
    if(!this.data.noMore) {
      ++this.data.page;
      this.getRechageData(this.data.page,this.data.limit,this.data.typeValue);
    }
  },
  //消费加载更多
  loadMoreComsume: function() {
    if(!this.data.noMore) {
      ++this.data.page2;
      this.getComsumeData(this.data.page2,this.data.limit,this.data.typeValue);
    }
  },
  //获取加油流水
  getComsumeData: function(page,limit,typeValue) {
    let url = app.config.host+ '/query/flow/oil';
    let data = {userId: wx.getStorageSync('user_id')};
    let params = {
      page: this.data.page2,
      limit: this.data.limit,
      msg_type: this.data.typeValue
    };
    let method = 'GET';
    this.setData({
      noData: true,
      noMore: false
    })
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        var list = res.data.data.flow;
        if(list=='') {
          if(this.data.comsumeList.length == 0) {
            this.setData({
              noData: false
            })
          }else{
            this.setData({
              noMore: true
            })
          }
        }else {
          var newArr = this.data.comsumeList.concat(list);
            this.setData({
              comsumeList: newArr
            })
        }
      }
    })
  },
  classify: function() {
    this.setData({
      showClassify: !this.data.showClassify
    })
  },
  //切换导航
  changeTab: function(e) {
    this.setData({
      noData: true,
      noMore: false,
      scrollTop: 0,
    })
    if(e.currentTarget.dataset.tabindex == 1) {
      this.setData({
        tabIndex: 1,
        showClassify: false,
        typeValue: 0,
        typeName: '全部',
        noDataText: '暂无充值记录'
      })
      if(this.data.rechageList.length == 0) {
        this.getRechageData(this.data.page,this.data.limit,this.data.typeValue);
      }
    }else{
      this.setData({
        tabIndex: 2,
        showClassify: false,
        typeValue: 2,
        typeName: '全部',
        noDataText: '暂无消费记录'
      })
      if(this.data.comsumeList.length == 0) {
        this.getComsumeData(this.data.page2,this.data.limit,this.data.typeValue);
      }
    }
  },
  //选择卡类型
  changeType: function(e) {
    if(e.currentTarget.dataset.index == 0) {
      this.setData({
        typeValue: 2,
        typeName: '全部',
        showClassify: false,
      })
    }else if(e.currentTarget.dataset.index == 1) {
      this.setData({
        typeValue: 0,
        typeName: '个人',
        showClassify: false,
      })
    }else{
      this.setData({
        typeValue: 1,
        typeName: '单位',
        showClassify: false,
      })
    }
    if(this.data.tabIndex == 1) {
     // this.data.rechageList.length = 0;
      this.data.page = 1;
      this.setData({
        rechageList: []
      })
      this.getRechageData(this.data.page,this.data.limit,this.data.typeValue);
    }else{
      this.data.page2 = 1;
      //this.data.comsumeList.length = 0;
      this.setData({
        comsumeList: []
      })
      this.getComsumeData(this.data.page2,this.data.limit,this.data.typeValue);
    }
  },
  hideClassify: function() {
    this.setData({
      showClassify: false
    })
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