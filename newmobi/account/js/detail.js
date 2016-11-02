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

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    var _type=getQueryString('type');
    var offset=0,size=10;
    $(function(){
        $("#head-name").text(_type==1?"资金明细":"积分明细");
        $.ajax({
            url: '/user/finance/findMain.do',
            type: 'POST',
            dataType: 'json',
            data: {},
            success:function(d){
                if(d.code==200){
                    $('#j_fm').text(_type==1?d.data.margin:d.data.marginScore);
                    $('#j_yuan').text(_type==1?'元':'积分');
                }
            }
        });
        getScore();
    })
   

    
    function getScore(){
        var more = $('.more');
            if(more.length>0){
                $('.more').remove();
            }
            $.ajax({
                url: '/user/finance/findFlowList.do',
                type: 'get',
                dataType: 'json',
                data:{type:(_type==1?'money':'score'),offset:offset,size:size},
                success: function(d){
                    if(d.code==200){
                       if(!d.data.length&&($('.more').length!=0)){
                            $('.more').text('没有更多');
                            return false;
                       }
                        for(var i=0,l=d.data.length;i<l;i++) {
                           createScoreItem(d.data[i]);
                           offset++;
                        }  
                        
                        if($('.scoreList .scoreItem').length==0){
                            $('.money').css('display', 'none');
                            $('.noCon').removeClass('none');
                        } 
                        if(d.data.length>=10){
                            $('.money').append('<p class="more">点击加载更多</p>');
                        } 
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
            }) ;  
    }

    function createScoreItem(data){
        var time = $('<p class="J_time"></p>'),
            intro = $('<p class="middle J_intro"></p>'),
            flowAmt = $('<p class="middle J_curflowAmt"></p>'),
            box = $('<li class="scoreItem"></li>');
        var curflowAmt="",a = _type==1?data.money : data.score;
        var timeStr = data.createTime;
            time.append(timeStr);
            
            if(data.typeDetail < 0){
                curflowAmt="-"+a;
                flowAmt.css('color', 'green');
            }
            if(data.typeDetail > 0){
                curflowAmt="+"+a;
                flowAmt.css('color', 'red');
            }
            intro.text(data.remark);
            flowAmt.text(curflowAmt);
            box.append(time).append(intro).append(flowAmt);
            $('.scoreList').append(box);
          
    }

    function format(r, a, t){
        var e = function (e, r) {
            return (!r && 10 > e ? "0" : "") + e
        };
        a = a || "Y-M-D h:m:s";
        for (var c = r.getTime ? r : new Date(r), s = a.length, g = a, n = 0; s > n; n++) switch (a.charAt(n)) {
            case "Y":
                g = g.replace(/Y/g, e(c.getFullYear(), t));
                break;
            case "y":
                g = g.replace(/y/g, e(c.getFullYear(), t).substring(2));
                break;
            case "M":
                g = g.replace(/M/g, e(c.getMonth() + 1, t));
                break;
            case "D":
                g = g.replace(/D/g, e(c.getDate(), t));
                break;
            case "h":
                g = g.replace(/h/g, e(c.getHours(), t));
                break;
            case "m":
                g = g.replace(/m/g, e(c.getMinutes(), t));
                break;
            case "s":
                g = g.replace(/s/g, e(c.getSeconds(), t))
        }
        return g
    }
    //点击加载更多
   $('.money').on('click','.more',function(){
    getScore();
   });
});