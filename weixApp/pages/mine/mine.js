Page({
    data:{},
    onLoad(){
      console.log(1) 
    },
    loginIn:function(e){
       var that = this;
        // wx.showToast({
        //   title: 'bindtap的点击事件',
        //   icon: 'success',
        //   duration: 2000
        //  });
        wx.login({
        success: function () {
          wx.getUserInfo({
            success: function(res){
              // success
              console.log(res);
              that.setData({
                info:res.userInfo,
                img: res.userInfo.avatarUrl,
                name:res.userInfo.nickName
            })
            },
            fail: function(res) {
              // fail
              console.log(res)
            },
            complete: function(res) {
              // complete
              console.log(res)
            }
        })
        }
      })
         
    }
})