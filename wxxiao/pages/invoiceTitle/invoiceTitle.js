// pages/invoiceTitle/invoiceTitle.js
import httpService from '../../http/http.js';
import util from '../../utils/util.js'
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
    },
    img_url: app.config.img_url,
    com_list: [],
    personPhon: false,
    isAdd: true
  },
  onLoad: function (options) {
    if(options.id) {
      this.data.isAdd = false;
      if(options.type==1) {
        this.setData({
          showPerson: false,
          specialDisable: false,
        })
      }else{
        this.data.personPhon = true;
        this.setData({
          personDisable: false,
        })
      }
      this.getDetail(options.id);
    }
  },

  getDetail: function(id) {
    let url = app.config.host + '/invoice';
    let data = {};
    let params = {
      user_id: wx.getStorageSync('user_id'),
      id: id
    };
    let method = 'GET';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        this.data.special.special_title = res.data.data[0].title;
        this.data.special.special_tax = res.data.data[0].tax_number;
        this.data.special.special_address = res.data.data[0].address;
        this.data.special.special_phone = res.data.data[0].phone;
        this.data.special.special_bank = res.data.data[0].bank_name;
        this.data.special.special_account = res.data.data[0].bank_account;
        this.setData({
          com_list: res.data.data
        })
      }else{
        util.warnMsg(res.data.msg);
      }
    })
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

  importTitle: function() {
    let that = this;
    wx.chooseInvoiceTitle({
      success(res) {
        let temObject = {
          title:res.title,
          phone: res.telephone,
          tax_number: res.taxNumber,
          address:  res.companyAddress,
          bank_name: res.bankName,
          bank_account: res.bankAccount
        }
        that.data.com_list.length = 0;
        that.data.com_list.push(temObject);
        if(res.type==1) {
          that.setData({
            showPerson: true,
            com_list: that.data.com_list,
            personDisable: false
          })
        }else{
          that.setData({
            showPerson: false,
            com_list: that.data.com_list,
            specialDisable: false
          })
        }
      }
    })
  },

  //个人发票提交
  personSubmit: function(e) {
    if(!this.data.isAdd) {
      this.editInvoice(e.detail.value.person_input,0,e.detail.value.phone);
    }else{
      this.addInvoice(e.detail.value.person_input,0,e.detail.value.phone);
    }
  },

  //新增
  addInvoice: function(title,type,phone,tax_number,address,bank_name,bank_account,user_id) {
    let url = app.config.host + '/invoice/add';
    let data = {};
    let params = {
      title: title,
      type: type,
      phone: phone,
      tax_number: tax_number,
      address: address,
      bank_name: bank_name,
      bank_account: bank_account,
      user_id: wx.getStorageSync('user_id')
    }
    let method = 'POST';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        util.warnMsg('添加成功');
        setTimeout(() => {
          var pages = getCurrentPages();//得到当前所有的页面
          if(pages.length > 1){
              var prePage = pages[pages.length - 2];//-1的话就是当前页
              prePage.setData({
                com_list :[]
              })
              prePage.getCompany();
          }
          wx.navigateBack();
        },1000)
      }else{
        util.warnMsg(res.data.msg);
      }
    })
  },

  //编辑
  editInvoice: function(title,type,phone,tax_number,address,bank_name,bank_account,user_id) {
    let url = app.config.host + '/invoice';
    let data = {
      upd: this.data.com_list[0].id
    };
    let params = {
      title: title,
      type: type,
      phone: phone,
      tax_number: tax_number,
      address: address,
      bank_name: bank_name,
      bank_account: bank_account,
      user_id: wx.getStorageSync('user_id')
    }
    let method = 'PUT';
    httpService.sendRrquest(url,data,params,method).then(res => {
      if(res.data.status === 0) {
        util.warnMsg('修改成功');
        setTimeout(() => {
          var pages = getCurrentPages();//得到当前所有的页面
          if(pages.length > 1){
              var prePage = pages[pages.length - 2];//-1的话就是当前页
              prePage.setData({
                com_list :[]
              })
              prePage.getCompany();
          }
          wx.navigateBack();
        },1000)
      }else{
        util.warnMsg(res.data.msg);
      }
    })
  },

  //增值税专票提交
  specialSubmit: function(e) {
    if(!this.data.isAdd) {
      this.editInvoice(e.detail.value.special_title,1,e.detail.value.special_phone,e.detail.value.special_tax,e.detail.value.special_address,e.detail.value.special_bank,e.detail.value.special_account);
    }else{
      this.addInvoice(e.detail.value.special_title,1,e.detail.value.special_phone,e.detail.value.special_tax,e.detail.value.special_address,e.detail.value.special_bank,e.detail.value.special_account);
    }
  },
  //验证专票表单是否输入完整
  checkSpecial: function() {
    if((this.data.special.special_title.length > 0) && 
    (this.data.special.special_tax.length > 0) &&
    (this.isPoneAvailable(this.data.special.special_phone)) 
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
  personInput: function(e) {

    if(e.currentTarget.dataset.flag==1) {
      if(this.isPoneAvailable(e.detail.value)){
        this.setData({
          personDisable: false,
        })
        this.data.personPhon = true;
      }else{
        this.setData({
          personDisable: true,
        })
        this.data.personPhon = false;
      }  
    }else if(e.currentTarget.dataset.flag==0 && e.detail.value && this.data.personPhon){
      this.setData({
        personDisable: false
      })
    }else{
      this.setData({
        personDisable: true
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