requirejs.config({
    baseUrl:'js',
    paths: {
        "zepto":'zepto.min',
        "Mdialog": './components/multiBtnDlg/multiBtnDlg',
        "secrectKey":'./components/secrectKey/secrectKey'
    },
    shim: {
        'zepto': {
            exports: '$'
        }
    }
});
requirejs(['zepto','Mdialog'],function ($,mdialog) {
    var backurl=getQueryString('backurl');
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    } 

    
    //检测是否进行了实名认证
    function isRealName(){
         $.ajax({
            url: '/user/user/showAuthentication.do',
            type: 'post',
            dataType: 'json',
            success: function(d){
                if(d.data.idStatus==1){
                    $("#j_name").val(d.data.realName);
                    $("#j_id").val(d.data.idCard);
                   
                }else if(d.data.idStatus==2){
                    $("#j_name").val(d.data.realName);
                    $("#j_id").val(d.data.idCard);
                     $('.userInfo').attr('disabled', 'disabled');
                    $('#j_send').css('display', 'none');
                  
                }else{
                     return 0;
                }
              
            }
            
        })
    }
    isRealName();
    //检测输入是否为空
    function checkInput(con){
        for(var i=0,l=con.length;i<l;i++){
            //去掉空格
            var str=$.trim($(con[i]).val());
            if(str.length==0){
                return false
            }
        }
        return true
    }

    // 身份信息输入不为空的时候按钮可用
    $('.userInfo').bind('keyup focus',function(event) {
        var $text = $(".userInfo");
        if(checkInput($text)){
            $('#j_send').removeAttr('disabled').css('background', '#da2f34');
        }else{
            $('#j_send').attr('disabled','disabled').css('background', '#abaaaa');
        }
    });

    //提交实名认证
    $('#j_send').click(function(event) {
        var name=$.trim($("#j_name").val()).replace(/\s/g,"");
        var id  =$.trim($("#j_id").val()).replace(/\s/g,"");

        $.ajax({
            url: '/user/user/certification.do',
            type: 'post',
            dataType: 'json',
            data: {realName: name,idCard:id},
            success: function(d){
                if(d.code==200){
                      var cfg = {
                            closeTag:'.sure-btn',
                            msg:d.msg,
                            isChange:true,
                            btnNum:1,
                            btnCon:['确定'],
                            callback:function(){
                                backurl?window.location='bindBank.html?backurl='+backurl+'&_='+Math.random():window.history.go(-1);
                            },
                            btnClass:['sure-btn']
                        };
                        mdialog.init(cfg);
                        $('#j_send').attr('disabled', 'disabled');
                    
                }else{
                    var cfg = {
                            closeTag:'.sure-btn',
                            msg:d.msg,
                            isChange:true,
                            btnNum:1,
                            btnCon:['确定'],
                            btnClass:['sure-btn']
                        };
                        mdialog.init(cfg);
                }
                
            },
            error: function(data){
               console.log("请求失败");
              }
        })
    });
});