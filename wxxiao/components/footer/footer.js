// components/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showHome :{
      type : Boolean,
      value : false
    },
    showMy: {
      type : Boolean,
      value : false
    },
    showOil: {
      type : Boolean,
      value : false
    }
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
    goPage: function(e) {
      if(e.currentTarget.dataset.type==1){
        if(!this.data.showHome) {
          wx.redirectTo({
            url: '../../pages/index/index'
          })
        }else{
          return false;
        }
        
      }else if(e.currentTarget.dataset.type==2) {
        wx.redirectTo({
          url: '../../pages/index/index'
        })
      }else{
        if(!this.data.showMy) {
          wx.redirectTo({
            url: '../../pages/my/my'
          })
        }else{
          return false;
        }  
      }
    }
  }
})
