//index.js
//获取应用实例
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 10000,
    duration: 1000,
    circular:true
  },
  bindViewTap(e) {
    wx.navigateTo({
      url: '../banner/banner?id=' + e.target.dataset.id
    })
  },
  onLoad(){
    var that = this;
    wx.request({
      url: 'https://new.jnhyxx.com/user/news/findNewsList.do?type=0',
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         that.setData({
           banners: res.data.data      
           })
      }
    });
    // 品种大厅
    wx.request({
      url: 'https://new.jnhyxx.com/order/variety/getVariety.do',
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        var colorList = {
                        'HSI':'background:#BD6959',
                        'MHI':'background:#8097C1',
                        'ni':'background:#9777B4',
                        'pp':'background:#7DB181',
                        'au':'background:#7C7931',
                        'ag':'background:#7FCACA',
                        'rb':'background:#D19FC7',
                        'SR':'background:#CACA96',
                        'cu':'background:#949EC3',
                        'CL':'background:#b857b2',
                        'GC':'background:#B59449',
                        'DAX':'background:#A8D2C6',
                        'CN':'background:#CC9D82',
                        'ES':'background:#917795',
                        'NQ':'background:#62a4a8',
                        'SI':'background:#98CB76',
                        'YM':'background:#BD6959',
                        'DAX':'background:#A8D2C6',
                        'CN':'background:#CC9D82',
                        'ES':'background:#917795',
                        'NQ':'background:#62a4a8',
                        'SI':'background:#98CB76',
                        'YM':'background:#BD6959',
                        'gray': 'background:#cecece',
                        'AD': 'background:#c7c577',
                        'CD': 'background:#7fcbd4',
                        'NE': 'background:#bda5ce',
                        'SL': 'background:#d9ad9c',
                        'm':'background:#7abbd3',
                        'p':'background:#d2af64',
                        'y':'background:#b9c25b'
                    };
         that.setData({
           variety: res.data.data,
           colorList: colorList,
           text:'国内期货'  
           })
      }
    });
//行情
    // wx.request({
    //   url: 'https://new.jnhyxx.com/quota/quota/getAllQuotaData.do',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success (res) {
    //     console.log(res.data.data)
    //      that.setData({
    //        quoto: res.data.data    
    //        })
    //   }
    // });
  },
  onShareAppMessage:function(){
    return {
      title:'我是分享标题',
      desc:'我是分享描述',
      path:'/page/index'
    }
  },
  simulation:function(e){
    wx.showToast({
      title: 'bindtap的点击事件',
      icon: 'success',
      duration: 2000
    })
  }
})