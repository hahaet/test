var _token=getQueryString('token');
 // 判断android、ios
var u = navigator.userAgent, 
    app = navigator.appVersion,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);      
$(function() {
    getMoney();
    getInfo();
    //点击跳转
    $('.acc_nav li,.acc_list li').on('tap',function(){
        var _url =$(this).attr('data-url');
        var _app=$(this).attr('data-app');
       if(_url){
            if(_url=='bindTel.html'){
                var tel = $('.tele').text();
               window.location.href=_url+"?token="+_token+"&tel="+tel;
            }else{
               window.location.href=_url+"?token="+_token+"&_="+Math.random();
            }
            
        }
        if(_app){
          if(isiOS){
                window.location.href=_app;
          }else{
            _app=='goto://drawMoney'?window.AppJs.openWithDrawActivity():window.AppJs.openCouponListActivity()
          }
       }
    });
    $("#backTolist").on('tap',function(){
         if(isiOS){
              window.location.href='goBack://last';
          }else{
              window.AppJs.finishActivity();
          }
    });
     
});
//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//获取余额
function getMoney(){
     $.ajax({
        type:'get',
        url:'../financy/financy/apiFinancyMain',
        data:{token:_token},
        dataType:'json',
        success:function(d){
            if(d.code==200){
               $(".amt").html("￥"+parseFloat(d.data.usedAmt).toFixed(2));
            }else if(d.code==41022){
               dialog({msg:'您已在其他设备登录，请确认',callBack:function(){
                  if(isAndroid){
                    window.AppJs.login();
                  }else{
                    window.location="goto://gologin"
                  }
               }});
            }else{
              dialog({msg:d.msg});
            }
        },
        error:function(e){
            //系统出错
        },
    })
}

//获取账户信息
function getInfo(){
     $.ajax({
        type:'get',
        url:'../user/user/getAcountDetail',
        data:{token:_token},
        dataType:'json',
        success:function(d){
            if(d.code==200){
              var data=d.data;
              var s={1:'已认证',0:'未认证',2:'已填写'};
              data.userStatus=s[data.userStatus];
              data.bankStatus=s[data.bankStatus];
              for(var o in data){
                $("."+o).html(data[o]);
                if((o=='userStatus' || o=="bankStatus")&&data[o]=="未认证"){
                   $("."+o).addClass('none');
                }
              }
            }else if(d.code==41022){
               dialog({msg:'您已在其他设备登录，请确认'});
            }else{
              dialog({msg:d.msg});
            }
        },
        error:function(e){
            //系统出错
        },
    })
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