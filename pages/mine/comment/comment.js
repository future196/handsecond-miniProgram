// pages/mine/comment/comment.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:"",
    ptitle:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      oid:options.oid,
      ptitle:options.ptitle
    })
  },

  // 点击确认评论
  form_submit:function(e){
    let that = this;
    util.request(api.CreateComment,{
      uid:getApp().globalData.userInfo.id,
      username: getApp().globalData.userInfo.username,
      oid:that.data.oid,
      ptitle: that.data.ptitle,
      content:e.detail.value.content
    }).then(res=>{
      if(res.code == 1){
        var pre_page = getCurrentPages()[getCurrentPages().length - 2]
        pre_page.onLoad();
        wx.showToast({
          title: '评价成功',
        });
        setTimeout(function(){
          wx.navigateBack({})
        },1000)
      }
    })
  }
})