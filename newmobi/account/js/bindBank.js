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
    var backurl=getQueryString('backurl'),bankId;
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    } 
 

    $('.back-btn').on('tap',  function(event) {
        window.history.back();
    });
    $('body').on('click', '.goRealName', function(event) {
        window.location.href='realName.html?backurl='+backurl;
    });
    isBindBank();
    getBanks();


    //检测是否绑定银行卡
      function isBindBank(){
         $.ajax({
            url: '/user/user/showAuthentication.do',
            type: 'post',
            dataType: 'json',
            success: function(d){
                if(d.data.idStatus!=0){
                    $("#j_name").val(d.data.realName);
                }else{
                     var cfg = {
                            closeTag:'.sure-btn',
                            msg:"您还未进行实名认证<br/>请先进行实名认证",
                            isChange:true,
                            btnNum:2,
                            btnCon:['取消','去认证'],
                            btnClass:['back-btn','goRealName']
                        };
                      mdialog.init(cfg);
                }
   
                if(d.data.cardState==2){
                  
                    $('#j_bindBankName').text(d.data.issuingbankName); 
                    var imgSrc = d.data.icon;
                    $('#bankIcon').attr('src', imgSrc);
                    $('#j_bindBankNo').text(d.data.cardNumber.substr(d.data.cardNumber.length-4));
                    $('#j_bankPhone').val(d.data.cardPhone);
                    $('.noBind').css('display', 'none');  
                    $('.hasBind').css('display', 'block');
                    bankId = d.data.bankId;
  
                }else if(d.data.cardState==1){
                    $("#j_bankName").val(d.data.issuingbankName);
                    $("#j_bankNo").val(d.data.cardNumber);
                    $('#j_bankPhone').val(d.data.cardPhone);
                    bankId = d.data.bankId;
                }
                 
            }
        })
    }
    

    function getBanks(){
        $.post('/user/user/showChannelBankList.do',{},function(d){
            var b='';
            for(var i=0;i<d.data.length;i++){
                var _span=d.data[i].limitSingle?'<span class="fr">单笔'+d.data[i].limitSingle+'，单日'+d.data[i].limitDay+'</span>':'';

                b += '<li data-bankName="'+d.data[i].name+'" data-id="'+d.data[i].id+'"><img src="'+d.data[i].icon+'" alt="">'+d.data[i].name+_span+'</li>';

            } 
            $('.bankList').html(b);
        },'json');
    }
  
     //点击选择银行
    $('#j_bank,.arr').click(function(event) {
        $("#j_bankName").trigger("blur");
        $('.bankList').addClass('bounceInUp');
        $('.bankList').show();
        
    });
    $('.bankList').delegate('li', 'click', function(event) {
        var bankName =$(this)[0].getAttribute('data-bankName');
            bankId = $(this)[0].getAttribute('data-id');        
        $('.bankList').hide();
        $("#j_bankName").trigger("blur").val(bankName);
    });


    //提交需要绑定的银行卡
    $('#j_send').click(function(event) {
        var username=$.trim($("#j_name").val()),
            bankNo  =$.trim($("#j_bankNo").val()),
            bankName =$.trim($("#j_bankName").val()),
            phone = $.trim($("#j_bankPhone").val());
        var err = '';
        if(!bankNo || !bankName || !phone){
            err='请填写完整信息';
        }
        if (phone.length != 11 ) {
            err='银行预留手机号码不正确';
        }
        if(err){
           mdialog.init({ 
                closeTag:'.sure-btn',
                msg:err,
                isChange:true,
                btnNum:1,
                btnCon:['确定'],
                btnClass:['sure-btn']
            });
            return false;
        }
        $.ajax({
            url: '/user/user/bindBankCard.do',
            type: 'post',
            dataType: 'json',
            data: {
                bankId:bankId,
                bankName: bankName,
                cardNumber:bankNo,
                cardPhone: phone
            },
            success: function(d){
                if(d.code==200){
                    var cfg = {
                          closeTag:'.sure-btn',
                          msg:d.msg,
                          isChange:true,
                          btnNum:1,
                          btnCon:['确定'],
                          callback:function(){
                            switch(backurl){
                              case "1":
                                window.location='../mine/withdraw.html?_='+Math.random();
                              break;
                              case "2":
                                window.location='../account/banks.html?_='+Math.random();
                              break;
                              default:
                              window.history.go(-1);
                              break;
                            }
                              
                          },
                          btnClass:['sure-btn']
                      };
                      mdialog.init(cfg);
              
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
          error: function(d){
                
          }

        })
    });
    
  
    $('.j_userTip').on('tap', function(event) {
        event.preventDefault();
        var cfg = {
                  closeTag:'.sure-btn',
                  msg:"为了您的账户资金安全，只能绑定持卡人本人银行卡，获取更多的帮助，请联系客服。",
                  isChange:true,
                  btnNum:1,
                  btnCon:['确定'],
                  btnClass:['sure-btn']
              };
              mdialog.init(cfg);
    });

    $('.unbindBtn').on('tap', function(event) {
        event.preventDefault();
        var cfg = {
                closeTag:'.sure-btn',
                msg:"请联系客服，解绑换卡",
                isChange:true,
                btnNum:1,
                btnCon:['确定'],
                btnClass:['sure-btn']
        };

        mdialog.init(cfg);

    });
    

});