function convertToStarsArray (stars) {
  var num = stars.toString().substring(0,1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i < num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function douban_limit() {
  var timestamp = Date.parse(new Date());
  var requestDoubanTime = wx.getStorageSync('requestDoubanTime');
  var requestDoubanNum = wx.getStorageSync('requestDoubanNum');
  if (requestDoubanTime && timestamp - requestDoubanNum < 6000) {
    wx.setStorageSync('requestDoubanNum', requestDoubanNum += 1);
    if (requestDoubanNum < 35) {
      return;
    } else {
      wx.showToast({
        title: '豆瓣api请求频率超35/m，小心',
        icon: 'loading',
        duration: 5000
      })
    }
  } else {
    wx.setStorageSync('requestDoubanTime', timestamp);
    wx.setStorageSync('requestDoubanNum', 1);
  }
}
/**
 * 
 * @param {请求地址} url 
 * @param {回调函数} callBack 
 */
function http(url, callBack) {
  var that = this;
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      callBack(res.data);
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  douban_limit: douban_limit,
  http: http
}