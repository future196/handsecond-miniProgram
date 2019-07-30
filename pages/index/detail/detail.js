// pages/index/detail/detail.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    domain_name:api.Domain_name,
    commentList:[],
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProduceDetail(options.id);
    this.getCommentList(options.id);
    this.setData({
      userInfo:getApp().globalData.userInfo
    })
  },

  // 获取产品详情
  getProduceDetail:function(id){
    let that = this;
    util.request(api.GetProduceDetail,{id:id},"GET").then(res=>{
      that.setData({
        detail:res.data
      })
    })
  },

  // 获取产品的评价
  getCommentList:function(id){
    let that = this;
    util.request(api.GetCommentList, { id: id }, "GET").then(res => {
      for (var i = 0; i < res.data.length;i++){
        try{
          res.data[i].createtime = util.formatTime(res.data[i].createtime)
        }catch(res){}
      }
      that.setData({
        commentList: res.data
      })
    })
  },

  // 点击购买/租赁
  action:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },

  // 改变上下架状态
  change:function(e){
    let that = this;
    if(e.target.dataset.status == "normal"){
      wx.showModal({
        title: '下架商品',
        content: '确认下架此商品吗',
        success(res){
          util.request(api.ChangeProduceStatus,{
            id:that.data.detail.id,
            status:"hidden"
          }).then(res=>{
            if(res.code == 1){
              that.onLoad({ id: that.data.detail.id });
              var pre_page = getCurrentPages()[getCurrentPages().length - 2]
              pre_page.onLoad();
              wx.showToast({
                title: '下架成功',
              })
            }
          })
        }
      })
    } else if (e.target.dataset.status == "hidden"){
      wx.showModal({
        title: '上架商品',
        content: '确认上架此商品吗',
        success(res) {
          util.request(api.ChangeProduceStatus, {
            id: that.data.detail.id,
            status: "normal"
          }).then(res => {
            if (res.code == 1) {
              that.onLoad({ id: that.data.detail.id });
              var pre_page = getCurrentPages()[getCurrentPages().length - 2]
              pre_page.onLoad();
              wx.showToast({
                title: '上架成功',
              })
            }
          })
        }
      })
    }
  }
})