// pages/mine/order_action/order_action.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    array:["待发货","已发货"],
    index:0,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userInfo:getApp().globalData.userInfo,
      info:options
    })
  },

  // 保存发货
  save:function(){
    let that = this;
    util.request(api.OrderAction,{
      oid:that.data.info.oid,
      status:that.data.index
    }).then(res=>{
      if(res.code == 1){
        var pre_page = getCurrentPages()[getCurrentPages().length -2]
        pre_page.onLoad();
        wx.showToast({
          title: '保存成功',
        });
        setTimeout(function(){
          wx.navigateBack({})
        },1000)
      }
    })
  },


  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    });
  }
})