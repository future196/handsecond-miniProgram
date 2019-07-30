// pages/register/register.js
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


  // 点击去登录事件
  login: function (e) {
    wx.navigateBack()
  },

  // 点击提交注册事件
  form_submit: function (e) {
    // console.log(e.detail.value.account)
    if (e.detail.value.account.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
      })
    }
    else if (e.detail.value.username.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
      })
    }
    else if (e.detail.value.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      })
    }
    else if (e.detail.value.repassword.length == 0) {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none',
      })
    }
    else if (e.detail.value.repassword != e.detail.value.password) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
      })
    }
    else {
      util.request(api.SignUp, { 
        username: e.detail.value.account,
        password: e.detail.value.password,
        nickname: e.detail.value.username,
        mobile: e.detail.value.account,
        }).then(res=>{
          if(res.code == 1){
            wx.showToast({
              title: '注册成功',
            });
            
            setTimeout(function(){
              wx.navigateBack({})
            },500)
            
          }else{
            wx.showToast({
              title: '注册失败',
              icon:"none"
            })
          }
      })

    }
  }
})