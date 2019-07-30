// pages/mine/add_gbook/add_gbook.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 添加留言
  form_submit:function(e){
    if(e.detail.value.content.length == 0){
      wx.showToast({
        title: '内容不能为空',
        icon:"none"
      })
    }else{
      util.request(api.CreateGbook,{
        uid:getApp().globalData.userInfo.id,
        username: getApp().globalData.userInfo.username,
        content: e.detail.value.content
      }).then(res=>{
        if(res.code == 1){
          wx.showToast({
            title: '留言成功',
          });
          var pages = getCurrentPages();
          var pre_page = pages[pages.length - 2];
          pre_page.onLoad();
          setTimeout(function(){
            wx.navigateBack({})
          },500)
        }else{
          wx.showToast({
            title: '留言失败',
            icon:"none"
          })
        }
      })
    }
  }
})