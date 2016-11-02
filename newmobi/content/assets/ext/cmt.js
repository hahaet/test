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
        var token = localStorage.getItem('token');
        var u = navigator.userAgent, 
            isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
            isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);                //ios终端
        var newNews={};
        var replyType=getQueryString('replyType');//直接新增
        var cmtId=getQueryString('cmtId');
        var replyId=getQueryString('replyId');
        var people=getQueryString2('people')||"说点什么吧";
        (function() {
            if(people=="undefined"){
                people="说点什么吧";
            }
            $('#sendCon').focus().attr('placeholder', people);
        })(); 
        //获取url参数
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        } 
        //获取url参数（汉字）
        function getQueryString2(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
       } 

      
         //监听输入框
         $('#sendCon').on('keyup input', function(event) {
            //event.preventDefault();
            var val=$('#sendCon').val();
           if(val.length>0){
                $('.send').removeAttr('disabled');
                $('.send').css({
                    background: '#fa4200',
                    color: '#FFF'
                });
           }else{
                $('.send').attr('disabled','disabled');
                $('.send').css('background', '#c9c9c9');
           }
        });
     
        //获取焦点时
        $('#sendCon').focus(function(){
            // this.scrollIntoView();
            $('.cmtFixed').css('background', '#FFF');
            $('#sendCon').css('background', '#FFF');
        })

        $('.send').on('click', function(event) {
            replyAndCmt();
        });
        //回复
        function replyAndCmt(){
           newNews.cmtId=cmtId;
            newNews.replyId=replyId;
            newNews.newsId=newsArticleId;
            newNews.token=token;
            if(replyType==1){
                newNews.cmtContent=utf16toEntities($('#sendCon').val());
                newNews.replyContent="";
            }else{
                newNews.replyContent=utf16toEntities($('#sendCon').val());
                newNews.cmtContent="";
            }
            $.ajax({
                url: '/user/newsArticle/addNewsArticleCmt',
                type: 'GET',
                dataType: 'json',
                data: newNews,
                success: function(d){
                    if(d.code==200){
                        window.location.href="newsDtl.html?id="+newsArticleId+"&#cmtList";
                    }else if(d.code==412||d.code==41022){
                        var cfg = {
                            closeTag:'.sure-btn',
                            msg:'您还没有登录，请登录',
                            isChange:true,
                            btnNum:2,
                            btnCon:['取消','登录'],
                            btnClass:['close','jumpLogin']
                        };
                        mdialog.init(cfg);
                    }else{
                         var cfg = {
                                msg:d.msg,
                                closeTag:'.sure-btn',
                            };   
                            mdialog.init(cfg);
                    }
                },
                error: function(d){
                    console.log("失败");
                }
            })
        }

        //取消操作
        $('.cancel').click(function(event) {
            window.location.href="newsDtl.html?id="+newsArticleId;
        });
        function goLogin(){
           window.location='../user/login.html';
        }
        $('.btn-container').on('click','.jumpLogin',function(){
            goLogin();
        });

         //表情转码
        function utf16toEntities(str) { 
            var patt=/[\ud800-\udbff][\udc00-\udfff]/g; 
            // 检测utf16字符正则 
            str = str.replace(patt, function(char){ 
                var H, L, code; 
                if (char.length===2) { 
                    H = char.charCodeAt(0); 
                    // 取出高位 
                    L = char.charCodeAt(1); 
                    // 取出低位 
                    code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; 
                    // 转换算法 
                    return "&#" + code + ";"; 
                } else { 
                    return char; 
                } 
            }); 
            return str; 
        }

        //表情解码
        function entitiestoUtf16(str){
            // 检测出形如&#12345;形式的字符串
            var strObj=utf16toEntities(str);
            var patt = /&#\d+;/g;
            var H,L,code;
            var arr = strObj.match(patt)||[];
            for (var i=0;i<arr.length;i++){
                code = arr[i];
                code=code.replace('&#','').replace(';','');
                // 高位
                H = Math.floor((code-0x10000) / 0x400)+0xD800;
                // 低位
                L = (code - 0x10000) % 0x400 + 0xDC00; 
                code = "&#"+code+";";
                var s = String.fromCharCode(H,L);
                strObj.replace(code,s);
            } 
            return strObj;
        } 


});