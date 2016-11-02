 var _token = getQueryString('token'),
    _type = getQueryString('type'),
    info={};
 var u = navigator.userAgent, 
    app = navigator.appVersion,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);  
$(function(){
    var bind = $('.bindnow');
    bind.on('tap',function(){
        var _this = $(this);
        info.realName = $('input[name=name]').val();
        info.idCard=$('input[name=idCard]').val();
        info.bankName=$('input[name=bank]').val();
        info.bankNum=$('input[name=banknum]').val().replace(/\s/g,"");
        if(_this.hasClass('disabled_btn')){
            return false;
        }
        bindName();
    });
    $('.back').on('tap',function(){
        
        if(_type){
             if(isiOS){
              window.location.href='goBack://last';
              }else{
                  window.AppJs.finishActivity();
              }
        }else{
            window.location.href='bindAccount.html?token='+_token;
            return false;
        }
    });
    $('input[name=idCard]').on('focus',function(){
          $('.err1').html('请填写本人真实信息，核实后将不可更改').removeClass('errorTip');
    });
     $('input[name=banknum]').on('focus',function(){
          $('.err2').html('请绑定本人银行卡').removeClass('errorTip');
    });
});
//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//选择银行
function changeBank(o){
    var _this = $(o),
        _tip = $(".limitAmt"),
        _option=$('.banklist option').not(function(){ return !this.selected }) ,
        _limit=_option.attr('data-limit'),
        _input = $('input[name=bank]'),
        v = _this.val();

    _input.val(v);
    _tip.html("("+_limit+")").show();
} 
//输入银行卡号
function trip4(o){
    if(o.value.replace(/\s/g,'').length==20){
        o.value=o.value.replace(/\s/g,'').substring(0,19);
    }
    o.value=o.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
    var bind =$('.bindnow');
    o.value.length>0?bind.removeClass('disabled_btn'):bind.addClass('disabled_btn');
}

//绑定实名信息
function bindName(){
     $('.loading').show();
    $.ajax({
        type:'get',
        url:'../user/user/authUser',
        async:false,
        data:{realName:info.realName,idCard:info.idCard,token:_token},
        dataType:'json',
        success:function(d){
           
            if(d.code==200){
                 
                bindBank(true);
            }else{
                bindBank(false);
                $('.err1').html(d.msg).addClass('errorTip');
            }
        },
        error:function(e){
            //系统出错
        },
    });
}
//绑定银行卡
function bindBank(bindNameFlag){
     $.ajax({
        type:'post',
        url:'../user/user/updatebank',
        async:false,
        data:{bankName:info.bankName,bankNum:info.bankNum,token:_token},
        dataType:'json',
        success:function(d){
            if(d.code==200&&bindNameFlag){
                openSign();
                //window.location.href='accCenter.html?token='+_token;
            }else{
                 $('.loading').hide();
                $('.err2').html(d.msg).addClass('errorTip');
            }
        },
        error:function(e){
            //系统出错
        }
    })
}
function openSign(){
     $.ajax({
        type:'post',
        url:'../user/account/openCainiuAcc',
        data:{token:_token},
        dataType:'json',
        success:function(d){
             $('.loading').hide();
            if(d.code==200){
               window.location.href='accCenter.html?token='+_token;
            }else{
                dialog({msg:d.msg});
            }
        },
        error:function(e){
            //系统出错
        }
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