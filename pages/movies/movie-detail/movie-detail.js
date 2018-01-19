var app = getApp();
var util = require('../../../utils/util');
import {Movie} from './class/Movie';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId;
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    var moive = new Movie(url)
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },

  viewMoviePostImg: function (event) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }

})