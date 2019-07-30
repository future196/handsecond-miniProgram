const api = require("../../config/api.js")
const util = require("../../utils/util.js")

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


  form_submit: function (e) {
    if (e.detail.value.account.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
      })
    } else if (e.detail.value.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      })
    } else {
      util.request(api.SignIn,{
        username: e.detail.value.account,
        password: e.detail.value.password
      }).then(res=>{
        if(res.code == 1){
          wx.showToast({
            title: '登录成功',
          });
          getApp().globalData.user_id = res.data.id
          getApp().globalData.userInfo = res.data
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },500)
        }
      })
      

    }
  }
})