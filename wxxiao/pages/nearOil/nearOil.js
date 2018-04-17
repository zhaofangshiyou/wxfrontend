// pages/nearOil/nearOil.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipText: '',
    oil_list:[
      {name:'华富加油站',address:'安徽省铜陵市铜官区滨江大道中段',img_url: '../../images/img01.png',distance: '1.26m'},
      {name:'广阳加油站',address:'安徽省黄山市太平湖朝阳村',img_url: '../../images/img01.png',distance: '1.26m'},
      {name:'雨坛加油站',address:'安徽省枞阳县雨坛乡雨坛村义小公路西侧',img_url: '../../images/img01.png',distance: '1.26m'},
    ]
  },
  goOilStation: function(e) {
    wx.showModal({
      title: '提示',
      content: '是否前往：兆方石油' + e.currentTarget.dataset.name,
      success: function (sm) {
        if (sm.confirm) {
            // 用户点击了确定 可以调用删除方法了
            wx.openLocation({ //出发wx.openLocation API

              latitude: Number(22.54387), //坐标纬度（从地图获取坐标）
              
              longitude: Number(113.950339), //坐标经度（从地图获取坐标）
              
              name: '深大地铁站', //打开后显示的地址名称
              
              address: '深大地铁站' //打开后显示的地址汉字
              
              }) 
          } else if (sm.cancel) {

          }
        }
      })
  },
  getLocation: function() {
    var that =this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
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
    this.getLocation();
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