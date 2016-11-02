Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
};
/**
 * 获得当前时间的UTC时间戳
 * @return {int} unix timestamp
 */
Date.prototype.getTimeUTC = function () {
    return this.getTime() + this.getTimezoneOffset() * 60 * 1000;
};


/*-----------------------------------------*/
var dates = [];
var setting = false;
var G_RES = 'https://res.6006.com';
$('#content').on('click', 'a.text-img-lnk', function( evt ){
  evt.stopPropagation();
  evt.preventDefault();

  showpic( this );
});

$('div.hbar h3').on('click', function(ev){
  ev.stopPropagation();
  ev.preventDefault();

  $(window).scrollTop(0);
});

var g = 1;

var checkmsg = function (msg,insertType) {
    var arr = msg.split("#");
//        console.log(msg);
    var type = arr[0];
    var im = arr[1];
    var sj = arr[2];
    var nr = arr[3];
    //
    var html = "";
    if(type==1){
        html = genHtml1(arr);
        if(insertType=="append"){
            $("#content").append(html);
        }else{
            $("#content").prepend(html);
        }
    }else if(type==0){
        html = genHtml0(arr);
        if(insertType=="append"){
            $("#content").append(html);
        }else{
            $("#content").prepend(html);
        }
    }else if (type == "2") {
        $("#content_" + im).html(sj);
    }else if (type == "3") {
        if (sj.length > 0) {
            $("#actual_" + im).html(sj);
        }
        if (nr.length > 0) {
            $("#yingxiang_" + im).html(nr);
        }
        if (a4.length > 0) {
            $("#value_" + im).html(a4);
        }
    }else if (type == "6") {
        window.location.reload();
    }else if (type == "7") {
        $("#" + im).text("修正：" + sj + "（前值）");
    }

};

//生成html
 var genHtml0 = function(arr){
     var t = arr[2].replace(/-/g, '/')
     var calenderbox = genDateSpan(t);
     var type = arr[0];
     var important = arr[1];
     var time = new Date(t).format("hh:mm:ss");//MM-dd
     var content = arr[3];
     var url = arr[4];
     var pic = arr[6];
     var newstimespan = arr[11];

    if(pic){
        pic = (G_RES +"/jin10/")+pic.replace("_lite","");
        content = content+
            '<div class="text-img">' +
              '<a data-href="'+pic+'" class="text-img-lnk"><img class="thumb" src="'+pic+'" /></a>' +
            '</div>';
    }

    if (!url) {
        url = '/index/'+newstimespan;
    }
    var im = "";
    if(important==0){
        im = "important";
    }

   if ( /app\.jin10\.com|v\.jin10\.com|news\.jin10\.com/.test(content) ) {
     return '';
   }

     return template0.replace("{calenderbox}", calenderbox)
            .replace("{newstimespan}", newstimespan)
            .replace("{important}", im)
            .replace("{url}", url)
            .replace("{time}", time)
             .replace("{d}", new Date(t).format("yyyy-MM-dd"))
             .replace('{text}', content);
};

var genHtml1 = function(arr){
    var t1 = arr[1].replace(/-/g, '/')
    var t2 = arr[8].replace(/-/g, '/')
    var type = arr[0];
    var time = t1;
    var text = arr[2];
    var prefix = arr[3];
    var predicted = arr[4];
    var actual = arr[5];
    var star = arr[6];
    var effect = arr[7];
    var datetime = t2;
    var cuontry = arr[9];
    var nil = arr[10];
    var newsid = arr[11];
    var newstimespan = arr[12];
    var HTML = '';
    var calenderbox = genDateSpan(datetime);
    var url = '/index/'+newstimespan;

    if(star<3){
        var arrays = getChangeClassText(effect+"2");
    }else{
        var arrays = getChangeClassText(effect);
    }
    var effect_text = arrays[1];
    if(arrays[1]!="影响较小"){
        effect_text += " 金银";
    }
    //
    return template1.replace("{newstimespan}",newstimespan)
            .replace("{time}", new Date(datetime).format("hh:mm:ss"))//MM-dd
            .replace("{calenderbox}", calenderbox)
            .replace("{important}", star>=3?"important":"")
            .replace("{text}", text)
            .replace("{country}", cuontry)
            .replace("{prefix}", prefix)
            .replace("{predicted}", predicted)
            .replace("{actual}", actual)
            .replace("{star}", star)
            .replace("{effect_class}",arrays[0])
            .replace("{effect_text_class}",arrays[0])
            .replace("{effect}",effect_text)
            .replace("{url}",url)
            .replace("{d}", new Date(datetime).format("yyyy-MM-dd"))
            .replace("{actual_id}",newstimespan);
};



var template0 = '<li class="flash {important} newsline-{d}" id="{newstimespan}">'+
                        '<a><div class="timeline">'+
                        '   <div class="dotbg">'+
                        '       <div class="dot"></div>'+
                        '   </div>'+
                        '   <div class="time">{time}</div>'+
                        '</div>'+
                        '<div class="live-c onlytxt">'+
                        '<div class="txt">{text}</div>'+
                        '</div></a>'+
                    '</li>';

var template1 = '<li class="flash newsline-{d}" id="{newstimespan}">' +
                //'{calenderbox}'+
                '<a><div class="timeline">' +
                '   <div class="dotbg">' +
                '       <div class="dot"></div>' +
                '   </div> ' +
                '   <div class="time">{time}</div>' +
                '</div> ' +
                '<div class="live-c ">' +
                    '<div class="txt">{text}' +
                        '<div class="live-ele {important}" >' +
                        '   <img class="flag" src="' + G_RES +'/jin10/flag/{country}.png">' +
                        '   <table class="pindex">' +
                        '       <tbody>' +
                        '       <tr>' +
                        '           <td>前值:{prefix}</td>' +
                        '           <td>预期：{predicted}</td>' +
                        '           <td>实际：<span id="actual_{actual_id}" class="fact {effect_text_class}">{actual}</span></td>' +
                        '       </tr>' +
                        '       <tr>' +
                        '           <td colspan="2">' +
                        '               <div class="live-ele-l">' +
                        '                   <img src="' + G_RES +'/assets/ext/news/{star}.png" width="20" height="34"   />' +
                        '               </div>' +
                        '           </td>' +
                        '           <td><div class="live-ele-r {effect_class}">{effect}</div></td>' +
                        '       </tr>' +
                        '       </tbody>' +
                        '   </table>' +
                        '</div>' +
                    '</div>'+
                '</div></a>' +
                '</li>';

var calenderMark = false;
var calenderNowId = "";

    var genDateSpan = function (time) {
        time = time.replace(/-/g, '/');
        var d = new Date(time).format("yyyy-MM-dd");
        if ($.inArray(d, dates) == -1) {
            var fixClass = ""
            if (dates.length==0) {
                fixClass = "";//myfix
                calenderNowId = d;
            }
              //'+fixClass+'
            dates.push(d);
//            console.log("dates", dates, d);
//            console.log($.inArray(d, dates));
             var html = '<div id="calender_' + d + '"  class="calenderbox">' +
                    '<span>' + new Date(time).format("dd") + '</span>' +
                    '<p>' + new Date(time).format("MM") + '月</p></div>';

            if(setting==false){
                setting=true;
//                console.log(html.replace('calender_','clone_calender_'));
                //$("#timebox").append(html.replace('calender_','clone_calender_'));
            }
            // if($("#timebox").html()==html){
            //     $(html).addClass("repeat");
            // }
            return html;
        }
        return "";
    };
var getChangeClassText = function (text) {
    var classn = "";

    if (text == "利多") {
        classn = "liduo";
        if (g == 2) {
            classn = "likong";
            text = "利空"
        }
    } else if (text == "利空") {
        classn = "likong";
        if (g == 2) {
            classn = "liduo";
            text = "利多"
        }
    } else if (text == "无影响") {
        text = "影响较小";
        classn = "wuyingxiang";
    } else if (text == "利多2") {
        text = "利多";
        classn = "liduo2";
        if (g == 2) {
            classn = "likong2";
            text = "利空"
        }
    } else if (text == "利空2") {
        text = "利空";
        classn = "likong2";
        if (g == 2) {
            classn = "liduo2";
            text = "利多"
        }
    } else if (text == "无影响2") {
        text = "影响较小";
        classn = "wuyingxiang2";
    }

    var rege = new RegExp("影响");
    if (rege.test(text)) {
        text = "影响较小";
    }

    return [classn, text];
};

//滚动加载部分
var itmeOut = null;
var loadmore = false;
var isOver = false;
var scroll_to = 0;
var lastId = 0;
var minId = 0;

function getCommentLastId() {

    var $li = $(".flash").last();

    if ($li) {
        lastId = $li.attr("id").replace("content_");

        if (minId == lastId) {
            return false;
        }
    }
    return lastId;
}

var getMore = function(){

    loadmore = true;

    $(".loading").removeClass("hide");

    $.getJSON("/user/news/findNewsByUrl.do", {url: 'http://m.jin10.com/flash?maxId='+lastId}, function (d) {

        $(".loading").addClass("hide");

        loadmore = false;
        var datas=JSON.parse(d.data);
        if (datas) {

            $(datas).each(function(i,data){
                checkmsg(data,"append");
            });

            var lastId = getCommentLastId();

            if (lastId === false) {
                isOver = true;
            }
            else {
                minId = lastId;
            }
        }
        else {
             isOver = true;
        }
    });
};

function showpic( lnk ) {

  var p = $(document);

  var $el = p.find('div.img-layer'),
      $img = $el.children('img');

  resetData();

  $img.attr('src', $(lnk).data('href'));
  $img.css({transform:'scale(1) translate(0,0)'});
  $el.removeClass('hide2');
}

function min(array) {  //获取小于0的最大数以及其下标
    var arr2 = new Array();
    var arr3 = new Array();
    for (var i = 0; i < array.length; i++) {
        if(array[i]<=0){
            arr2.push(array[i]);
        }
    }
    var obj = arr2[0];
    var oindex;
    var len=arr2.length;
    if(len>1){
        for (var j = 0; j <len; j++) {
            if (arr2[j] > obj) {
                obj = arr2[j];
                oindex=j;
            }
        }
    }else{
        oindex=0;
    }
    return [obj,oindex];
}


var calenderboxTimeout = null;
var calenders = [];
var changeCalender = function(date){
    $("#calender_" + calenderNowId).removeAttr('style');

    $(".calenderbox").removeClass('myfix');
    $("#calender_"+date).addClass('myfix');
    calenderNowId = date;
    var i = $.inArray(calenderNowId,dates);
    var d1 = dates[i-1];
    var d2 = dates[i+1];

    if (d1) {
        $(".newsline-" + d1).last().append($("#calender_" + d1));
    }
    if (d2) {
        $(".newsline-" + d2).first().append($("#calender_" + d2))
    }
};

function rectCross(x,y,mx,my,t,r,b,l){
    return (y>my?y:my)>t&&(x>mx?mx:x)<r&&(y>my?my:y)<b&&(x>mx?x:mx)>l
};

var calenderIsClose = function(k){
    var h = 40;
    var nowCalender = $(".timebanner")[0].getBoundingClientRect();
    var newCalender = $("#calender_"+dates[k])[0].getBoundingClientRect();

    var res = rectCross(nowCalender.left,nowCalender.top,nowCalender.left+h,nowCalender.top+h,newCalender.top,newCalender.left+h,newCalender.top+h,newCalender.left);
    return res;
};

// 进入页面，默认加载30条资讯
$(function(){

    setTimeout(getMore, 100);

    var $win = $(window),
        $doc = $(document);

    $win.on('scroll', function(){
        var Ac = $(".livecon .calenderbox");
        var Ctop;
        var arr = [];
        var arr2 = [];

        setTimeout(function(){
            Ac.each(function(i) {
                Ctop = Ac[i].getBoundingClientRect().top;
                arr[i] = Ctop;
                arr2[i] = $(this).attr("id");
            });
            //$("#timebox").html("");
            var k = min(arr)[1];
            var id = arr2[k];
            //
            var newHTML=Ac.eq(k).removeClass('v').prop("outerHTML");
            //$(".calenderbox").removeClass("v");
            //$("#timebox").append(newHTML.replace('calender_','clone_calender_'));
            $("#"+id).addClass("v");
        },30);

        if (loadmore || isOver) {
          return;
        }

        if (itmeOut) {
            clearTimeout(itmeOut);
        }

        itmeOut = setTimeout(function () {

          var st = $win.scrollTop();
          var p = st / $doc.height();

          if ( st > scroll_to ) {
            scroll_to = st;
          }
          else {
            return;
          }

          if (p > 0.7 && p < 1) {
            getMore();
          }
        }, 100);

    });
});

// TODO 自动加载最新资讯
setTimeout(autoLoad, rndTime());

function autoLoad() {

  $(".loading").removeClass("hide");

  $.getJSON("/user/news/findNewsByUrl.do", {url: 'http://m.jin10.com/flash?maxId=0'}, function (d) {

        $(".loading").addClass("hide");
        var datas=JSON.parse(d.data);
        if (datas) {
            var lastId = $('#content > li:first').attr('id');

            var news = [];

            for (var i= 0,l=datas.length; i < l; i++) {
              var arr = datas[i].split('#');
              var id = arr[arr.length - 1];
              if (id.length < 10) {
                id = arr[arr.length-2];
              }
              // if (id === lastId) {
              //   break;
              // }
              news.unshift(datas[i]);
            }

            news.forEach(function(str){
                checkmsg(str);
            });
        }

        setTimeout(autoLoad, rndTime());
    });
}
function rndTime() {
  return Math.round(10 + Math.random() * 10) * 1000;
}

// 图片拖动和缩放
var xCache = 0,
    yCache = 0,
    scaleCache = 1;
function resetData(){
    xCache = 0,
    yCache = 0,
    scaleCache = 1;
}
(function(){
  var el = $('div.img-layer > img');
  var mc = new Hammer( el[0] );

  mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  mc.get('pinch').set({ enable: true });

  var x = 0,
      y = 0,
      scale = 1;

  el.on('touchstart', function(ev){
    ev.stopPropagation();
    ev.preventDefault();
  });
  mc.on('tap', function(ev){
    el.removeAttr('src');
    el.parent().addClass('hide2');
  });

  mc.on('panstart', function(ev) {
    x = xCache;
    y = yCache;
  });
  mc.on('panmove', function(ev){
    var _x, _y;
    xCache = _x = x + ev.deltaX;
    yCache = _y = y + ev.deltaY;
    el.css({
      transform: 'translate('+_x+'px,'+_y+'px) scale('+scaleCache+')'
    });
  });

  mc.on('pinchstart', function(ev){
    scale = scaleCache;
  });
  mc.on('pinchmove', function(ev){
    var v = scale * ev.scale;
    scaleCache = v = v < 1 ? 1 : v;
    el.css({
      transform: 'translate('+xCache+'px,'+yCache+'px) scale(' + v +')'
    });
  });
})();