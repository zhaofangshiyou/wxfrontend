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
  },

  /**
   * 组件的初始数据
   */
  data: {

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
