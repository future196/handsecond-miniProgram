// pages/release/release.js
const api = require("../../config/api.js")
const util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ["二手交易", "物品租赁"],
    image_url: "",
    input: "",
    domain_name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      domain_name:api.Domain_name
    })
  },

  // 类型选择
  typeChange: function(e) {
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },

  // 添加图片
  add_image: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '正在上传图片',
        })
        wx.uploadFile({
          url: api.UploadFile,
          filePath: res.tempFilePaths[0],
          name: "file", //文件命名
          success: function(res) {
            wx.hideLoading()
            that.setData({
              image_url: JSON.parse(res.data).data.url
            });
            wx.showToast({
              title: '图片上传成功',
            })
          },
        })
        // that.setData({
        //   image_url: tempFilePaths
        // })
      }
    })
  },

  // 提交表单
  form_submit: function(e) {
    var pages = getCurrentPages();
    var page = pages[0]
    console.log(page.data)
    let that = this;
    if (e.detail.value.title.length == 0) {
      wx.showToast({
        title: '请填写标题',
        icon: "none"
      })
    } else if (e.detail.value.content.length == 0) {
      wx.showToast({
        title: '请填写详情介绍',
        icon: "none"
      })
    } else if (e.detail.value.price.length == 0) {
      wx.showToast({
        title: '请填写价格',
        icon: "none"
      })
    } else if (e.detail.value.old_price.length == 0) {
      wx.showToast({
        title: '请填写原价',
        icon: "none"
      })
    } else if (that.data.image_url == "") {
      wx.showToast({
        title: '请添加图片',
        icon: "none"
      })
    } else {
      util.request(api.CreateProduce, {
        category_id: Number(that.data.index) + 1,
        users_id: getApp().globalData.userInfo.id,
        title: e.detail.value.title,
        content: e.detail.value.content,
        image: that.data.image_url,
        price: e.detail.value.price,
        old_price: e.detail.value.old_price
      }).then(res => {
        if (res.code == 1) {
          wx.showToast({
            title: '发布成功',
          })
          that.setData({ // 提交成功后清空表单
            input: "",
            image_url: ""
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: "none"
          })
        }
      })
    }
  }
})