// pages/index/order/order.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:getApp().globalData.userInfo
    })
  },

  // 填写或编辑收货信息
  edit:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },

  // 点击立即支付
  pay:function(){
    if(this.data.userInfo.address == null){
      wx.showToast({
        title: '请先填写收货地址信息',
        icon:"none"
      })
    }else{
      this.createOrder();
    }
  },

  // 创建订单
  createOrder:function(){
    let that = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];//上一页
    util.request(api.CreateOrder, {
      uid: getApp().globalData.userInfo.id,
      username: getApp().globalData.userInfo.username,
      touid: pre_page.data.detail.users_id,
      ptitle: pre_page.data.detail.title,
      pid: pre_page.data.detail.id,
      price: pre_page.data.detail.price
    }, "POST").then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '下单成功',
        });
        setTimeout(function () {
          wx.navigateBack({});
          wx.navigateTo({
            url: '../../mine/order/order',
          })
        }, 1000)
      } else {
        wx.showToast({
          title: '下单失败',
          icon: "none"
        })
      }
    })
  }
})