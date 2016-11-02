var $main = $('.main')
var $bottom = $('.bottom');
var $begin = $bottom.find('#game');

function token(key) {
    return localStorage.getItem(key);
}

$begin.on('click',function(){
    if(token('token') == null){
        window.location.href = '/user/login.html?callback=/match/Match1.html'
    }
    else{
        $.ajax({
            url : '/activity/scoreSimulation/scoreSimulationForSelf',
            data : { token: token('token')},
            dataType : 'json',
            success : function(data){
                if(data.code == 1203){
                    Mask(data.msg,'确定','Match1.html')
                }
                else{
                   window.location.href = '/simulation.html';
                }
            }
        });
    }
});

function Mask(t1,btn,hre,t2){
    var str = btn ? btn : '确定';
    var tiao = hre ? hre : 'javascript:;';
    var text = t2 ? t2 : '';
    var $mask = $('<div class="mask"><div class="conter"><img src="imgs/icon_close.png" class="None"><p>'+t1+'</p><p class="p2">'+text+'</p><a class="btn" href="javascript:;">'+str+'</a></div></div>');
    $main.append($mask);
    $mask.show();
    $('.None').on('click',function(){
        window.location.href = 'Match1.html';
    });
    $('.btn').on('click',function(){
        window.location.href = tiao;
    });
}
