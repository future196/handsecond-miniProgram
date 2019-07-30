const formatTime = date => {
  var date = new Date(date*1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



/**
 * 封装微信的request
 */
function request(url, data = {}, method = "POST", header = "application/json") {
  wx.showLoading({
    title: '加载中...',
  });
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': header,
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
            resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}


/** 
 * 当前文件下需要暴露出去的接口
 * **/
module.exports = {
  formatTime: formatTime,
  request:request
}