// pages/mine/order/order.js
const api = require("../../../config/api.js")
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_index: 0,
    buyOrderList: [],
    salesOrderList: [],
    domain_name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      domain_name: api.Domain_name
    })
    this.getOrderList()
  },

  // 获取订单列表 
  getOrderList: function() {
    let that = this;
    util.request(api.GetOrderList, {
      uid: getApp().globalData.userInfo.id
    }).then(res => {
      if (res.code == 1) {
        for (var i = 0; i < res.data.buylist.length; i++) {
          res.data.buylist[i].createtime = util.formatTime(res.data.buylist[i].createtime)
        }
        for (var i = 0; i < res.data.saleslist.length; i++) {
          res.data.saleslist[i].createtime = util.formatTime(res.data.saleslist[i].createtime)
        }
        that.setData({
          buyOrderList: res.data.buylist,
          salesOrderList: res.data.saleslist
        })
      }

    })
  },

  // tab选择
  nav_select: function(e) {
    this.setData({
      nav_index: e.target.dataset.index
    })
  },

  // 点击评论
  comment: function(e) {
    wx.navigateTo({
      url: '../comment/comment?oid=' + e.target.dataset.oid + '&ptitle=' + e.target.dataset.ptitle,
    })
  },

  // 去发货
  action: function(e) {
    wx.navigateTo({
      url: '../order_action/order_action?oid=' + e.target.dataset.oid + '&price=' + e.target.dataset.price + '&name=' + e.target.dataset.name + '&status=' + e.target.dataset.status + '&address=' + e.target.dataset.address + '&mobile=' + e.target.dataset.mobile + '&nickname=' + e.target.dataset.nickname,
    })
  },

  // 点击确认收货
  confirm: function(e) {
    let that = this;
    wx.showModal({
      title: '确认收货',
      content: '确认收到货了吗，确认后不可更改',
      success(res) {
        if (res.confirm) {

          util.request(api.OrderAction, {
            oid: e.target.dataset.oid,
            status: "2"
          }).then(res => {
            if (res.code == 1) {
              that.getOrderList()
              wx.showToast({
                title: '已确认收货',
              })
            } else {
              wx.showToast({
                title: '失败',
                icon:'none'
              })
            }
          })
        }
      }
    })
  }
})