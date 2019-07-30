// pages/index/index.js
const api = require("../../config/api.js")
const util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_index:0,
    domain_name:api.Domain_name,
    secondHandProduceLis:[],
    leaseProduceList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSecondHandProduceList(1); // type:1为二手交易
    this.getLeaseProduceList(2); //，type:2为物品租赁
  },

  onShow:function(){
    this.onLoad()
  },

  // 获取首页二手交易列表
  getSecondHandProduceList:function(type){
    let that = this;
    util.request(api.GetProduceList, { cid:type},"GET").then(res=>{
      if(res.code == 1){
        that.setData({
          secondHandProduceList:res.data.product
        })
      }
    })
  },
  // 获取首页物品租赁列表
  getLeaseProduceList: function (type) {
    let that = this;
    util.request(api.GetProduceList, {cid:type}, "GET").then(res => {
      if (res.code == 1) {
        that.setData({
          leaseProduceList: res.data.product
        })
      }
    })
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