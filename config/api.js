const domain_name = "http://192.168.1.101:8081/"  // 域名地址（服务器地址），更改服务器地址时需修改此地址
module.exports = {
  ChangeProduceStatus: domain_name + "/api/index/change_status", // 改变商品上下架状态
  UploadFile: domain_name + "/api/common/upload", // 上传文件接口
  GetProduceList: domain_name +"/api/index/index", // 获取首页产品列表
  GetProduceDetail: domain_name + "/api/index/details", // 获取产品详情
  CreateOrder: domain_name + "/api/index/buy", // 商品购买
  OrderAction: domain_name + "/api/index/update_buy", // 订单处理
  CreateProduce: domain_name + "/api/index/publish", // 商品发布
  GetReleaseList: domain_name + "/api/index/productlist", // 获取发布的产品列表
  GetOrderList: domain_name + "/api/index/orderlist", // 获取订单列表
  GetCommentList: domain_name + "/api/index/commentlist", // 获取评论列表
  GetGbookList: domain_name + "/api/index/messagelist", // 获取留言列表
  CreateComment: domain_name + "/api/index/docomment", // 创建评价
  CreateGbook: domain_name + "/api/index/domessage", // 创建留言
  SignIn: domain_name + "/api/index/login", // 用户登录
  SignUp: domain_name + "/api/index/register", // 用户注册
  UpdateInfo: domain_name + "/api/index/update_info", // 更新资料
  Domain_name: domain_name  // 域名输出
}