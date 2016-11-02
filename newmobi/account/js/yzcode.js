var _token=getItem('token');
var _amt=getQueryString('amt');
var countdown=60,timer; 
$(function(){
    getTele();
    $('.money').html("￥"+_amt);
    $('.codebtn').on('tap',function(){
        var tele=$('input[name=tele]').val();
        if(tele.length!=11){
            dialog({msg:'请填写正确的手机号码'});
            return false;
        }
        if($(this).hasClass('non')){
            return false;
        }
        getCode();
        settime($(this));
    });
    $('.bindnow').on('tap',function(){
        pay();
    });
});
function getTele(){
    $.ajax({
        type:'get',
        url:'/user/user/queryUserPayInfo ',
        data:{token:_token},
        dataType:'json',
        success:function(d){
            if(d.code==200){
                $('input[name=tele]').val(d.data.tele);
            }else{
                 dialog({msg:d.msg});
            }
        },
        error:function(e){
            dialog({msg:'系统忙，请重试！'});
        }
    })
}
function getCode(){
    var tele=$('input[name=tele]').val();
    $.ajax({
        type:'get',
        url:'/financy/topupapi/getDynamicNum',
        data:{token:_token,amt:_amt,telephone:tele},
        dataType:'json',
        success:function(d){
            if(d.code==200){
               dialog({msg:'验证码已发送，请内心等待'});
            }else{
                if(d.code==41022){
                    dialog({msg:'您的账号已在其他地方登录，请重新登陆',callBack:function(){
                        window.location.href='/user/login.html';
                    }});
                }else{
                    clearTimeout(timer);
                    resetTime();
                    dialog({msg:d.msg});
                }
                
            }
        },
        error:function(e){
            clearTimeout(timer);
                resetTime();
            dialog({msg:'系统忙，请重试！'});
        }
    })
}
function settime(o) { 
    if (countdown == 0) { 
        o.addClass("codebtn").removeClass('non');    
        o.html("重新获取"); 
        countdown = 60; 
        return;
    } else {

        o.removeClass("codebtn").addClass('non'); 
        o.html(countdown + "s"); 
        countdown--; 

    } 
    timer=setTimeout(function() { 
        settime(o); 
    },1000); 
} 
function resetTime(){
     var o=$('.miao');
    o.addClass("codebtn").removeClass('non');    
    o.html("重新获取"); 
    countdown = 60; 
    return;
}
function pay(){
     var tele=$('input[name=tele]').val(),
        code=$('input[name=code]').val();
    if(code==""){
        dialog({msg:'请输入验证码！'});
        return false;
    }
     $('.loading').show();
    $.ajax({
        type:'get',
        url:'/financy/topupapi/payOrder',
        data:{token:_token,telephone:tele,validCode:code},
        dataType:'json',
        success:function(d){
            if(d.code==200){
                window.location.href="rechargeSuc.html?bank="+d.data.bank+"&money="+d.data.money+"&time="+d.data.time+"&token="+_token;
            }else if(d.code==41022){
                $('.loading').hide();
                dialog({msg:'您的账号已在其他地方登录，请重新登陆',callBack:function(){
                    window.location.href='/user/login.html';
                }});
            }else{
                $('.loading').hide();
                dialog({msg:d.msg});
            }
        },
        error:function(e){
             dialog({msg:'系统忙，请重试！'});
             $('.loading').hide();
        }
    })
}
//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function dialog(option){
            
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
//返回函数
$('.back').on('tap', function(event) {
    event.preventDefault();
    /* Act on the event */
    $('.backDialog').css('display', 'block');
    //点击跳页
    $('.j_question').on('tap',  function(event) {
        event.preventDefault();
        window.location.href='/rule/question.html';
    });
    $('.j_service').on('tap',  function(event) {
        event.preventDefault();
        window.location.href="/activity/service.html"
    });
    //拨打电话
    $('.j_call').on('tap',function(event) {
          event.preventDefault();
          event.stopPropagation();
        window.location.href="tel://4006666801";
    });
    //取消则返回
    $('.backBtn').on('tap', function(event) {
        
            window.location.href="recharge.html";
            event.preventDefault();
       
    });
    //重新充值
    $('.reload').on('tap', function(event) {
        event.preventDefault();
        /* Act on the event */
        window.location.reload();
    });
});

//关闭蒙层
$('.close').on('tap',function(event) {
    event.preventDefault();
    /* Act on the event */
    $('.backDialog').css('display', 'none');
});
function getCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){c = c.substring(1, c.length);}
        if(c.indexOf(nameEQ) == 0){return decodeURIComponent(c.substring(nameEQ.length, c.length));}
    }
    return null;
}
function getItem(key){
    return  window.localStorage?localStorage.getItem(key):getCookie(key);
}