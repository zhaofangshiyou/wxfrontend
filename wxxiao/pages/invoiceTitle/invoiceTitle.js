// pages/invoiceTitle/invoiceTitle.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPerson: true,
    personDisable: true,
    normalDisable: true,
    addDisable: true,
    specialDisable: true,
    add: {
      add_title: "",
      add_tax: "",
    },
    special: {
      special_title: "",
      special_tax: "",
      special_address: "",
      special_phone: "",
      special_bank: "",
      special_account: ""
    },
    showCompany: {
      normal: false,
      add_normal: false,
      add_special: false
    }
  },
  //切换个人、公司导航
  changeTab: function(e) {
    if(e.currentTarget.dataset.index==1){
      this.setData({
        showPerson: true,
        "showCompany.normal": false,
        "showCompany.add_normal": false,
        "showCompany.add_special": false,
      })
    }else{
      this.setData({
        showPerson: false,
        "showCompany.normal": true,
      })
    }
  },
  //公司发票分类切换
  companyTabChange: function(e) {
    if(e.currentTarget.dataset.tabindex==1) {
      this.setData({
        "showCompany.normal": true,
        "showCompany.add_normal": false,
        "showCompany.add_special": false
      })
    }else if(e.currentTarget.dataset.tabindex==2) {
      this.setData({
        "showCompany.normal": false,
        "showCompany.add_normal": true,
        "showCompany.add_special": false
      })
    }else{
      this.setData({
        "showCompany.normal": false,
        "showCompany.add_normal": false,
        "showCompany.add_special": true
      })
    }
  },
  //个人发票提交
  personSubmit: function(e) {
    wx.navigateBack();
  },
  //普通发票提交
  normalSubmit: function(e) {
    console.log(e);
  },
  //增值税普通发票
  addSubmit: function(e) {
    console.log(e);
  },
  //增值税专票提交
  specialSubmit: function(e) {
    console.log(e);
  },
  //验证专票表单是否输入完整
  checkSpecial: function() {
    if((this.data.special.special_title.length > 0) && 
    (this.data.special.special_tax.length > 0) &&
    (this.data.special.special_address.length > 0) && 
    (this.isPoneAvailable(this.data.special.special_phone)) && 
    (this.data.special.special_bank.length > 0) && 
    (this.data.special.special_account.length > 0)
  ) {
      return true;
    }else {
      return false;
    }
  },
  special_invoice_input: function(e) {
    if(e.currentTarget.dataset.flag==1) {
      this.setData({
        "special.special_title": e.detail.value
      });
      if(this.checkSpecial()) {
        this.setData({
          specialDisable: false
        });
      }else{
        this.setData({
          specialDisable: true
        });
      }
    }else if(e.currentTarget.dataset.flag==2) {
      this.setData({
        "special.special_tax": e.detail.value
      });
      if(this.checkSpecial()) {
        this.setData({
          specialDisable: false
        });
      }else{
        this.setData({
          specialDisable: true
        });
      }
    }else if(e.currentTarget.dataset.flag==3) {
      this.setData({
        "special.special_address": e.detail.value
      });
      if(this.checkSpecial()) {
        this.setData({
          specialDisable: false
        });
      }else{
        this.setData({
          specialDisable: true
        });
      }
    }else if(e.currentTarget.dataset.flag==4) {
      this.setData({
        "special.special_phone": e.detail.value
      });
      if(this.checkSpecial()) {
        this.setData({
          specialDisable: false
        });
      }else{
        this.setData({
          specialDisable: true
        });
      }
    }else if(e.currentTarget.dataset.flag==5) {
      this.setData({
        "special.special_bank": e.detail.value
      });
      if(this.checkSpecial()) {
        this.setData({
          specialDisable: false
        });
      }else{
        this.setData({
          specialDisable: true
        });
      }
    }else {
      this.setData({
        "special.special_account": e.detail.value
      });
      if(this.checkSpecial()) {
        this.setData({
          specialDisable: false
        });
      }else{
        this.setData({
          specialDisable: true
        });
      }
    }
  },
  checkPhone: function(e) {
    if(!this.isPoneAvailable(e.detail.value)){
      wx.showToast({
        title: "请输入正确的手机号码",
        icon: 'none',
        duration: 2000,
        mask:true
    })
    }else{
      return false;
    }
  },
  add_invoice_input: function(e) {
    if(e.currentTarget.dataset.addflag==1) {
        if((this.data.add.add_tax.length > 0) && (e.detail.value.length > 0)) {
          this.setData({
            addDisable: false,
            "add.add_title": e.detail.value
          })
        }else{
          this.setData({
            addDisable: true,
            "add.add_title": e.detail.value
          })
        }
    }else{
      if((this.data.add.add_title.length > 0) && (e.detail.value.length > 0) && this.isTax(e.detail.value)){
        this.setData({
          addDisable: false,
          "add.add_tax": e.detail.value
        })
      }else{
        this.setData({
          addDisable: true,
          "add.add_tax": e.detail.value
        })
      }
    }
  },
  personInput: function(e) {
    if(e.detail.value.length > 0) {
      this.setData({
        personDisable: false
      })
    }else{
      this.setData({
        personDisable: true
      })
    }
  },
  normalInput: function(e) {
    if(e.detail.value.length > 0) {
      this.setData({
        normalDisable: false
      })
    }else{
      this.setData({
        normalDisable: true
      })
    }
  },
  //验证税号
  isTax: function(tax_number) {
    let myreg = /^[0-9a-zA-Z]*$/g;
    if(!myreg.test(tax_number)) {
      return false;
    }else{
      return true;
    }
  },
  //验证手机号
  isPoneAvailable(pone) {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
     return false;
    } else {
     return true;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      img_url: app.config.img_url
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