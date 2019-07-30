// pages/index/address/address.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },

  // 提交地址信息更新
  update: function(e) {
    let that = this;
    console.log(e)
    if (e.detail.value.nickname.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
    } else if (e.detail.value.mobile.length == 0) {
      wx.showToast({
        title: '电话不能为空',
        icon: "none"
      })
    } else if (e.detail.value.address.length == 0) {
      wx.showToast({
        title: '地址不能为空',
        icon: "none"
      })
    } else {
      util.request(api.UpdateInfo, {
        id: getApp().globalData.userInfo.id,
        nickname: e.detail.value.nickname,
        mobile: e.detail.value.mobile,
        address: e.detail.value.address
      }).then(res => {
        if (res.code == 1) {
          
          getApp().globalData.userInfo.nickname = e.detail.value.nickname;
          getApp().globalData.userInfo.mobile = e.detail.value.mobile;
          getApp().globalData.userInfo.address = e.detail.value.address;
          var pages = getCurrentPages();
          var pre_page = pages[pages.length - 2]; //上一页
          console.log(pre_page.data.userInfo)
          pre_page.setData({
            "userInfo.nickname": e.detail.value.nickname,
            "userInfo.mobile": e.detail.value.mobile,
            "userInfo.address": e.detail.value.address,
          })
          wx.showToast({
            title: '保存成功',
          });
          setTimeout(function() {
            wx.navigateBack({})
          }, 1000)
        }else{
          wx.showToast({
            title: '提交失败',
            icon: "none"
          })
        }
      });
    }

  }
})