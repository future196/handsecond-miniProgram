// pages/index/index.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_index:0,
    domain_name:"",
    OnlineList:[],
    OutlineList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      domain_name:api.Domain_name
    })
    this.getReleaseOnlineList();
    this.getReleaseOutlineList();
  },

  // 获取发布的在架商品列表
  getReleaseOnlineList:function(){
    util.request(api.GetReleaseList,{ uid:getApp().globalData.userInfo.id,status:"normal" },"GET").then(res=>{
      this.setData({
        OnlineList:res.data
      })
    });
  },

  // 获取发布的下架商品列表
  getReleaseOutlineList: function () {
    util.request(api.GetReleaseList, { uid: getApp().globalData.userInfo.id, status:"hidden" }, "GET").then(res => {
      this.setData({
        OutlineList: res.data
      })
    });
  },

  // tab选择
  nav_select:function(e){
    this.setData({
      nav_index: e.target.dataset.index
    })
  },

  // tab滑动
  nav_swiper: function (e) {
    this.setData({
      nav_index: e.detail.current
    })
  }
})