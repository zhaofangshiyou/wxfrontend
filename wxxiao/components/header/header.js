// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showBack :{
      type : Boolean,
      value : false
    },
    title :{
      type : String,
      value : '兆方石油'
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    img_url: 'https://www.zfsyonline.com/upload/weChat'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack: function() {
      wx.navigateBack();
    },
  }
})
