var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchPanelShow: false,
    containerShow: true,
    searchResult: {}
  },
  
  onLoad: function () {
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters'
    var comingSoonUrl = app.globalData.doubanBase +  '/v2/movie/coming_soon'
    var top250 = app.globalData.doubanBase + '/v2/movie/top250'
    
    this.getMoiveListData(inTheatersUrl, "inTheaters", "正在热映")
    this.getMoiveListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMoiveListData(top250, "top250", "豆瓣top250")
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: './more-movie/more-movie?category=' + category
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: './movie-detail/movie-detail?id' + movieId
    })
  },

  onCancelTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
   
  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + `/v2/movie/search?q=${text}`;
    this.getMoiveListData(searchUrl, "searchResult", "搜索结果");
  },

  getMoiveListData: function (url, settedKey, categoryTitle) {
    util.douban_limit();
    var that = this;
    wx.request({
      url: url,
      data: {
        start: 0,
        count: 3
      },
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      }
    })
  },

  processDoubanData: function (moviesData, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesData.subjects) {
      var subject = moviesData.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData)
  }
})