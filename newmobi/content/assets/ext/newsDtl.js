requirejs.config({
    baseUrl:'../content/assets/ext',
    paths: {
        "zepto":'zepto.min',
        "Mdialog": './multiBtnDlg'
    },
    shim: {
        'zepto': {
            exports: '$'
        }
    }
});
requirejs(['zepto','Mdialog'],function ($, mdialog) {
        var newsArticleId = getQueryString('id');//新闻ID
       (function(){
            getNewsDetail(); 

        })();
     
        //获取url参数
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        } 
       
        //获取资讯详情
        function getNewsDetail(){
            $.ajax({
                url: '/user/news/findNews.do',
                type: 'GET',
                dataType: 'json',
                data: {id: newsArticleId},
                success: function(d){
                    if(d.code==200) {
                       $('.title').text(d.data.title);
                       $('.date').text(d.data.createTime);
                       if(d.data.cover){
                            $('.banner').append('<img src="'+d.data.cover+'" alt="">')
                       }
                       $('.newsAllContent').html(d.data.content);
                       
                    }    
                },
                error: function(d){
                    console.log("失败");
                }
            })
        }
       
});