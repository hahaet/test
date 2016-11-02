 var _token = getItem('token');
var limit={
    "广发银行":"单笔1万，单日1万",
    "浦发银行":"单笔2万，单日2万",
    "兴业银行":"单笔5千，单日5千",
    "招商银行":"单笔5万，单日20万",
    "中国银行":"单笔5万，单日10万",
    "中国农业银行":"单笔5千，单日5千",
    "中国建设银行":"单笔1万，单日1万",
    "中国光大银行":"单笔10万，单日20万",
    "平安银行":"单笔30万，单日30万",
    "中国民生银行":"单笔5千，单日5千",
    "中信银行":"单笔20万，单日20万",
    "华夏银行":"单笔20万，单日20万",
    "中国工商银行":"单笔5万，单日5万",
    "交通银行":"单笔2万，单日2万"
}
$(function(){
   getBindInfp();
   $('.list-item li').on('tap',function(){
        if($(this).hasClass('modify')){
             var _url=$(this).attr('data-url');
            window.location.href=_url+"?backurl=2";
        }
       
   });
   $('input[name=amt]').on('keyup',function(){
        var v=parseInt($(this).val());
        var btn=$('.bindnow');
        if(!v||v<0.001){
            btn.addClass('disabled_btn');
        }else{
            btn.removeClass('disabled_btn');
        }
   });
   $('.bankLimit').on('tap',function(){
        window.location.href='bankList.html';
   });
   $('.back').on('tap',function(){
        window.location.href='../account/banks.html';
   });
   $(".bindnow").on('click',function(){
        if($(this).hasClass('disabled_btn')){
            return false;
        }
        var _name=$('input[name=name]').val(),
            _bank=$('input[name=bank]').val();
        if(_name==''|| _bank==''){
            dialog({msg:'请填写完整信息'});
            return false;
        }
        var a= $('input[name=amt]').val();

        window.location.href='/financy/heepay/payOrder?amt='+a+'&token='+_token;   
        return false;
   });
});

//获得绑定信息
function getBindInfp(){
     $.ajax({
        type:'get',
        url:'/user/user/checkUserName',
        data:{token:_token},
        dataType:'json',
        success:function(d){
            if(d.code==200){
                $('input[name=name]').val(d.data.userName);
                if(d.data.status!=1){
                    $('.realName').addClass('modify');
                }
            }
        },
        error:function(e){
            //系统出错
        },
    })
      $.ajax({
        type:'get',
        url:'/user/user/checkBankCard',
        data:{token:_token},
        dataType:'json',
        success:function(d){
            if(d.code==200){
                $('input[name=bank]').val(d.data.bankName);
                $('.limitAmt').text(limit[d.data.bankName]);
                 if(d.data.status!=1){
                    $('.paybank2').addClass('modify');
                }
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
