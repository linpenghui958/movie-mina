Page({
  onLoad: function () {
    wx.request({
      url: "https://api.douban.com/v2/movie/top250",
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})