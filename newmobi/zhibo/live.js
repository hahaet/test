var off = !0,websocket;
var live = {
    teacherId:null,
    page:0,
    teacherPage:0,
    getChat:function(p) {
        var o = this,
            w = $("#comment"),
            g = $("#container"),
            pre = g.find('.preloader');
        $.ajax({
            type:'get',
            url:'/user/live/queryPagingBy.do',
            data:{ 
                page:p||0,
                pageSize:10,
            },
            dataType:'json',
            success:function(r){
                if(r.data.data.length>0){
                    var c = r.data.data,h = "";
                    for(var i=0;i<c.length;i++){
                        var d = c[i];
                        if(d.normalSpeak&&(!d.deleted || d.owner)){
                            m = (d.chatType == 0 || d.chatType == 1) ? 'admin':d.owner?'mine':'',
                            n = d.owner ? '':'<span class="name '+m+'">'+d.name+'('+o.format1(d.createTime)+')'+'</span>',
                            f = d.owner ? 'right' : 'left',
                            l = (d.chatType == 0 || d.chatType == 1) ? 'arrow-admin':d.owner?'arrow-mine':'arrow-write';
                            h +=' <div class="'+ f +'" >' + n + '<div class="cont ' + m + '">' + '<div class="arrow ' + l +'"></div><p>' + (d.text?d.msg:'<img src="'+d.msg+'"/>') + '</p></div></div>';
                        }
                    }
                    !p?$("#comment").append(h):$(h).insertBefore("#comment div:eq(0)");
                    !p?g[0].scrollTop = g[0].scrollHeight:g.scrollTop(30);
                    pre.removeClass('visible');
                    off=true;
                }
                if(r.data.data.length==0){
                    pre.text('没有更多了...')
                }else{
                   pre.removeClass('visible');
                }
                    
            }
       })
    },
    getTeacherMsg:function(p){
        var o = this,
            w = $("#teacherComment"),
            g = $("#teacherContainer"),
            pre = g.find('.preloader');
        $.ajax({
            type:'get',
            url:'/user/live/findTeacherMsg.do',
            data:{ 
                page:p||0,
                pageSize:10,
                teacherId:o.teacherId,
            },
            dataType:'json',
            success:function(r){
                if(r.data.data.length>0){
                    var c = r.data.data,h = "";
                    for(var i=0;i<c.length;i++){
                        var d = c[i],
                            n = '<span class="name admin">'+d.name+'('+o.format1(d.createTime)+')'+'</span>',
                            f = 'left',
                            l =  'arrow-admin';
                            h +=' <div class="'+ f +'" >' + n + '<div class="cont admin">' + '<div class="arrow ' + l +'"></div><p>' + (d.text?d.msg:'<img src="'+d.msg+'"/>') + '</p></div></div>';
                    }
                    !p?w.html(h):$(h).insertBefore("#teacherComment div:eq(0)");
                    !p?g[0].scrollTop = g[0].scrollHeight:g.scrollTop(30);
                    pre.removeClass('visible');
                    off=true;
                }
                if(r.data.data.length==0){
                    pre.text('没有更多了...');
                }else{
                    pre.removeClass('visible');
                }
                    
            }
       })
    },
    create:function(d){
        var com = $("#comment"),
            con = $("#container")[0],
            m = (d.accountType == 0 || d.accountType == 1) ? 'admin':d.owner?'mine':'',
            n = d.owner ? '':'<span class="name '+m+'">'+((d.accountType == 0 || d.accountType == 1)?d.name+'('+this.format1(d.time)+')':d.name)+'</span>',
            f = d.owner ? 'right' : 'left',
            l = (d.accountType == 0 || d.accountType == 1) ? 'arrow-admin':d.owner?'arrow-mine':'arrow-write';
            h =' <div class="'+ f +'" >' + n + '<div class="cont ' + m + '">' + '<div class="arrow ' + l +'"></div><p>' +(d.isText?d.msg:'<img src="'+d.msg+'"/>')  + '</p></div></div>';
        com.append(h);
        var k = con.scrollTop,
            j = con.scrollHeight;
            if(j-k<440){
                con.scrollTop = con.scrollHeight ;
            };
        this.tip();
    },
    getMessage:function(){
        var o = this;
        $.get('/user/live/getLiveMessage.do',{},function(d){
            if(d.code==503){
                o.login = false;
            }
            if(d.code==200){
                o.login = true;
                if(d.data.teacher){
                    o.teacherId = d.data.teacher.teacherAccountId;
                    $('.teacher-tx img').attr('src',d.data.teacher.pictureUrl);
                    var teacher = '<div class="name clearfix">\
                    <img src="'+d.data.teacher.pictureUrl+'">\
                    <h4>'+d.data.teacher.name+'</h4>\
                    <a class="teacher_close" href="javascript:;"><img src="img/popup_icon_close.png"/></a></div>\
                    <div class="clearfix"><span>擅长</span>\
                    <p>'+d.data.teacher.goodAt+'</p></div>\
                    <div class="clearfix"><span>简历</span>\
                    <p>'+d.data.teacher.introduction+'</p></div>';
                    $('.teacher-details-inner').html(teacher);
                }else{
                    if(d.data.notice){
                        var str = d.data.notice.content;
                        var re = /\^/g;
                        var re2 = /\\/g;
                        var str2 = str.replace(re,'<br>');
                        var str3 = str2.replace(re2,'&nbsp&nbsp');
                        
                        var n = '<p class="p1">'+d.data.notice.title+'</p> <p class="p2">'+str3+'</p>';
                        
                        
                        $('#Mask div').html(n);
                    }
                    $('.teacher-tx img').hide();
                    $('#Mask').show();
                    $('.footer').html('<input type="text" class="area" disabled="disabled" value="非直播时间段，无法发言!"  style="background:#f3f3f3; text-indent: 5px; color:#b2b2b2; -webkit-appearance: none;"><a href="javascript:;" class="send">发送</a>')
                }
                if(d.data.program.length>0){
                    var l = '';
                    for(var i=0;i<d.data.program.length;i++){
                        var p = d.data.program[i];
                        l+='<li><div class="tx"><img src="'+p.pictureUrl+'"></div>\
                        <span class="tname">'+p.teacherName+'</span>\
                        <span>'+p.cycleStr+'</span>\
                        <span class="times">'+p.liveTime+'</span>></li>'
                    }
                    $('.pro-list').html(l);
                    
                }
            }
        },'json');
    },
   format1:function(s){
        var n = new Date().getDay(),
            d = new Date(s).getDay(),
            mon = new Date(s).getMonth()+1,
            h = new Date(s).getHours(),
            m = new Date(s).getMinutes();
            m = m<10?'0'+m:m;
            t = n - d > 0 ? mon+'月'+ d +'日'+'  '+ h+":"+m:h+":"+m
        return t;
   },
   
    
    history:function(){
        var o = this;
        $("#container").on('scroll',function(){
            if(!off){
                return false;
            }
            if(this.scrollTop<20){
                off = false;
                $(this).find('.preloader').addClass('visible');
                o.page++;
                setTimeout(function(){
                    o.getChat(o.page);
                },500);
            }
        });
        $("#teacherContainer").on('scroll',function(){
            if(!off){
                return false;
            }
            if(this.scrollTop<20){
                off = false;
                $(this).find('.preloader').addClass('visible');
                o.teacherPage++;
                setTimeout(function(){
                    o.getTeacherMsg(o.teacherPage);
                },500);
            }
        });
        
    },
    tip:function(){
        var tip = "<div class='tip'>有新消息</div>";
        $('body').append(tip);
        setTimeout(function(){
            $('.tip').remove();
        },1000);
    },
    goLogin:function(){
        this.dialog({
            msg:'请先登录',
            btnValue:'去登录',
            callBack:function(){
                window.location.href='/user/login.html?callBack=/zhibo/live.html?r=login';
            },
            btn:{
                txt:'取消',
                 callBack:function(){
                     $('.zp-dialog').remove();
                }
            }
        });
     },
    render:function(){
        var _this = this;
        $.get('/quota/quota/getAllIpPortByCode.do?type=chatH5',{},function(d){
            if(d.code==200){
                var ip=d.data[0].ip,ws='ws://'+d.data[0].ip+":"+d.data[0].port+'/sms/getChatting.do';
                if ('WebSocket' in window) {
                    websocket = new WebSocket(ws);
                } else if ('MozWebSocket' in window) {
                    websocket = new MozWebSocket(ws);
                } else {
                    websocket = new SockJS(ws);
                }
                websocket.onopen = function (evnt) {
                    console.log("会话链接成功!");
                    var _token = _this.token();
                    var k = JSON.stringify( $.extend({id: _this.teacherId, msg:''},_token));
                     websocket.send(k);
                    $('a.send').on('click',function(e){
                        e.preventDefault();
                        if(!_token.token1){
                           _this.goLogin();
                           return false;
                        }
                        var c = $.trim($('input.area').val());
                        if(c == ''){
                            return false;
                        }
                        if(c.length > 200){
                            _this.dialog({msg:'发言不能超过200文字！'})
                            return false;
                        }
                        var m= $.extend({id: _this.teacherId, msg:c},_token)
                        m = JSON.stringify(m);
                        websocket.send(m);
                        $('input.area').val('')
                    });
                };
                websocket.onmessage = function (evnt) {
                    var d = JSON.parse(evnt.data);
                    if(d.expire){
                         _this.goLogin();
                        return false;
                    }
                    if(d.isOrder){
                        $('.order>div').text(d.name+":"+d.msg);
                        $('.order').addClass('order-curr');
                    }else{
                        if(d.slience){
                            _this.dialog({
                                msg:'由于您之前发布了违禁内容，违反了<span style="color:red">《平台发布内容管理条例》</span>，遭到禁言7天的处罚',
                                btnValue:'查看条例',
                                callBack:function(){
                                   window.location.href='liveRules.html'; 
                                },
                                btn:{
                                    txt:'确定',
                                    callBack:function(){
                                       $('.zp-dialog').remove();
                                    }
                                }
                            });
                            return false;
                        }
                        _this.create(d); 
                    }
                   
                };
                websocket.onerror = function (evnt) {
                    console.log("与服务器断开了链接!")
                };
                websocket.onclose = function (evnt) {
                    console.log("与服务器断开了链接!")
                }  
            }
       });
    },
    wait:function(){
        var o = this, 
            b = $("a.back"),
            d = $('.page-header .right a'),
            u = $('.ullist li'),
            c = $('.container'),
            e = $('.pro-title'),
            l = $('.pro-list'),
            tx = $('.teacher-tx'),
            teacher = $('.teacher-details'),
            teacher_close = $('.teacher_close'),
            order_close = $('.order-close'),
            order = $('.order'),
            r = o.getQueryString('r');
        
        if(r == 'trade'){
            d.hide();
        }
        b.on('click',function(){
            r=='login'?window.location.href='/index.html':window.history.back();
        });
        u.on('click',function(){
            var t = $(this);
            if(t.hasClass('teacherMsg')){
                o.teacherPage=0;
                o.getTeacherMsg();
            }
            t.addClass('active').siblings().removeClass('active');
            c.hide();
            c.eq(t.index()).show();
        });
        e.on('click',function(){
            l.toggleClass('pro-list-show');
            return false;
        });
        tx.on('click',function(){
            teacher.show();
        });
        $('body').on('click','.teacher_close',function(){
            teacher.hide();
        });
        order_close.on('click',function(){
            order.removeClass('order-curr');
        });
        $('body').on('click',function(){
            if(l.hasClass('pro-list-show')){
                l.removeClass('pro-list-show');
            }
            
        });
    },
    init:function(){
        this.getMessage(),
        this.wait(),
        this.getChat(),
        this.render(),
        this.history();
    },
    token:function(){
        var _this=this;
        var t = {
            token1:_this.getCookie('token1'),
            token2:_this.getCookie('token2')
        }
        return t;
    },
    getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }, 
    getCookie:function(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++){
            var c = ca[i];
            while(c.charAt(0) == ' '){c = c.substring(1, c.length);}
            if(c.indexOf(nameEQ) == 0){return decodeURIComponent(c.substring(nameEQ.length, c.length));}
        }
        return null;
    },
    dialog:function(option){
        var $dialog = $('<div class="zp-dialog"></div>'),
        $inner = $('<div class="zp-dialog-inner"></div>'),
        $content = $('<div class="zp-content"></div>'),
        $btn=$('<div class="zp-btnbox"></div>'),
        btn='';
        $dialog.append($inner);
        $inner.append($content);
        if(option.btn){
            btn+='<a href="javascript:;" class="zp-btn">'+option.btn.txt+'</a>';
            
        }
        btn+='<a href="javascript:;" class="truebtn">'+(option.btnValue||"确定")+'</a>';
        var con = $('<p>'+option.msg+'</p>').appendTo($content);
        $btn.append(btn);
        $inner.append($btn);
        $('body').append($dialog);
        $('.truebtn').on('click',function(){
            if(option.callBack)option.callBack();
            $dialog.remove();
        });
        if(option.btn){
            $('.zp-btn').on('click',function(){
                option.btn.callBack();
            });
        }
    }
}