// pages/mine/gbook/gbook.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gbookList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGbookList();
  },

  // 获取留言列表
  getGbookList:function(){
    let that = this;
    util.request(api.GetGbookList,{uid:getApp().globalData.userInfo.id},"GET").then(res=>{
      if(res.code == 1){
        for(var i = 0;i<res.data.length;i++){
          res.data[i].createtime = util.formatTime(res.data[i].createtime )
        }
        that.setData({
          gbookList:res.data
        })
      }
    })
  },

  // 点击写留言
  add:function(){
    wx.navigateTo({
      url: '../add_gbook/add_gbook',
    })
  }
})