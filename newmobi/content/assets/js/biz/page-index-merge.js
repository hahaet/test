(function () {
    var MERGE_MODS = {
        "assets/lib/jquery/1.0/main": function () {
            define(function () {
                "use strict";
                return jQuery
            });
        },
        "assets/lib/lodash/1.0/main": function () {
            define(function () {
                "use strict";
                return _
            });
        },
        "assets/js/util/timer": function () {
            define(function () {
                "use strict";
                var n = 0,
                    t = {}, e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (n) {
                            window.setTimeout(n, 17)
                        }, i = function (n) {
                        return "number" == typeof n
                    }, u = function () {
                        var n = Object.keys(t);
                        if (n.length) {
                            var e = Date.now();
                            n.forEach(function (n) {
                                var i = t[n];
                                if (null != i && e - i.time >= i.wait) {
                                    var u = i.times;
                                    u > 0 && u--, i.fn.call(i.context), -1 === u || u > 0 ? (i.time = Date.now(), i.times = u) : (i = null, delete t[n])
                                }
                            })
                        }
                    }, r = function (n) {
                        t[n + ""] && delete t[n + ""]
                    }, o = function () {
                        u(), e(o)
                    };
                return o(), {
                    add: function (e, u, o, a) {
                        return 2 === arguments.length ? i(u) ? 100 > u && (a = u, u = 1e3) : (o = u, u = 1e3) : 3 === arguments.length && (i(o) ? (a = o, o = null) : i(u) || (a = o, o = u, u = 1e3)), n++, t[n + ""] = {
                            id: n,
                            fn: e,
                            wait: u || 1e3,
                            context: o,
                            times: null != a ? a : -1,
                            time: Date.now()
                        }, {
                            id: n,
                            clear: function () {
                                r(this.id)
                            }
                        }
                    },
                    one: function (n, t, e) {
                        return null == t || i(t) || (e = t, t = 1e3), this.add(n, t, e, 1)
                    },
                    ever: function (n, t, e) {
                        return null == t || i(t) || (e = t, t = 1e3), this.add(n, t, e, -1)
                    },
                    async: function (n) {
                        return this.add(n, 25, null, 1)
                    },
                    clear: function (n) {
                        null != n && i(n) && r(n)
                    }
                }
            });
        },
        "assets/js/biz/page/home/carousel": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                    n = (require("_"), require("util/timer")),
                    e = t("#doc"),
                    list = {
                        'ru': '06:00-凌晨05：00',
                        'au': '09:00-次日02:30',
                        'ag': '09:00-次日02:30',
                        'ni': '09:00-凌晨01:00',
                        'pp': '09:00-下午15:00',
                        'cu': '09:00-凌晨01:00',
                        'rb': '09:00-晚间23:00',
                        'SR': '09:00-晚间23:30',
                        'CL': '06:00-凌晨05:00',
                        'HSI': '09:15-晚间23:45',
                        'MHI': '09:15-晚间23:45',
                        'GC': '06:00-凌晨05:00'
                    },
                    colorList = {
                        'HSI': 'color:#BD6959',
                        'MHI': 'color:#8097C1',
                        'ni': 'color:#9777B4',
                        'pp': 'color:#7DB181',
                        'au': 'color:#7C7931',
                        'ag': 'color:#7FCACA',
                        'rb': 'color:#D19FC7',
                        'SR': 'color:#CACA96',
                        'cu': 'color:#949EC3',
                        'CL': 'color:#7E8B9D',
                        'GC': 'color:#B59449',
                        'gray': 'color:#cecece'
                    },
                    i = e.find("section.main-home"),
                    r = i.find("div.mod-carousel"),

                    a = r.children("ul");
                return {
                    init: function () {
                        this.loadImage(1)
                        this.loadStatus();
                    },
                    wait: function () {
                        var t = this;

                        var e = a.children("li"),
                            i = e.length - 1,
                            r = 0,
                            s = 0;
                        if (!(e.length <= 1)) {
                            var c = function (t) {
                                return t > i ? 0 : t
                            }, f = function (t) {
                                return 0 > t ? i : t
                            }, o = function () {
                                n.clear(s), s = n.one(function () {
                                    a.trigger("swipeleft")
                                }, 3e3).id
                            };
                            a.on("swipeleft", function () {
                                o();
                                var n = e.eq(r),
                                    i = e.eq(r = c(r + 1));
                                n.animate({
                                    left: "-100%"
                                }), i.css({
                                    left: "100%"
                                }), i.animate({
                                    left: 0
                                }, function () {
                                    e.eq(c(r + 1)).css({
                                        left: "100%"
                                    })
                                }), t.setCurrDot(r), t.setImageUrl(i.find("img"))
                            }), a.on("swiperight", function () {
                                o();
                                var n = e.eq(r),
                                    i = e.eq(r = f(r - 1));
                                n.animate({
                                    left: "100%"
                                }), i.css({
                                    left: "-100%"
                                }), i.animate({
                                    left: 0
                                }, function () {
                                    e.eq(f(r - 1)).css({
                                        left: "-100%"
                                    })
                                }), t.setCurrDot(r), t.setImageUrl(i.find("img"))
                            }), o()
                        }
                    },
                    loadStatus: function () {
                        $.get({
                            url: '/market/futureCommodity/select',
                            data: {},
                            beforeSend:function(){
                                j.show();
                            },
                            success: function (e) {

                                function makehotlist(currency) {
                                    var lis = "";
                                    lis += '<li class="tradeList" tradeId="' + e.data[i].instrumentCode + '"><a href="' + _url + '"><span class="img"><i class="icon-' + e.data[i].instrumentCode + '" style="' + (e.data[i].marketStatus ? colorList[e.data[i].instrumentCode] : colorList['gray']) + '"></i></span><div class="list-info"><p><span class="list-name block">' + e.data[i].commodityName + '</span> <em class="chicangTxt">持仓中</em><span class="list-img "><i class="right-icon"><span class="icon-sun icon-star"></span><span class="icon-moon icon-star"></span><i class="list-txt">T+0</i></i></span></p><p><span class="gray mt02">' + e.data[i].advertisement + '</span><span class="gray list-time">' + list[e.data[i].instrumentCode] + '</span> </p> <div class="right-arrow"></div></div> </a> </li>';

                                    if (currency == 'CNY') {
                                        $('#hot-internal-list').append(lis);
                                    } else {
                                        $('#hot-comm-list').append(lis);
                                    }
                                }

                                if (e.code == 200) {
                                    var numW = 0;
                                    var numN = 0;
                                    for (var i = 0; i < e.data.length; i++) {
                                        if (e.data[i].marketCode != "SRPME" && e.data[i].marketCode != "cainiu" && e.data[i].marketCode != "CFFEX") {

                                            var _url = e.data[i].currency == 'CNY' ? 'trade/index.html?commodity=' + e.data[i].instrumentCode.toUpperCase() : 'guoji/index.html?commodity=' + e.data[i].instrumentCode;
                                            makehotlist(e.data[i].currency);
                                        }
                                        if (e.data[i].currency != 'CNY') {
                                            numW++;
                                        } else {
                                            numN++;
                                        }
                                        if (numW == 0) {
                                            $("#gupji").hide();
                                        } else {
                                            $("#gupji").show();
                                        }
                                        if (numN == 0) {
                                            $("#gupnei").hide();
                                        } else {
                                            $("#gupnei").show();
                                        }
                                    }
                                    k.setItem('future', JSON.stringify(e.data));
                                }
                            },
                            complete:function(){
                                $.get({
                                    url: '/order/posiOrderCount',
                                    data: {
                                        token:  localStorage.getItem('token'),
                                        version:"0.0.1"
                                    },
                                    /*beforeSend:function(){
                                        $(".shadeWrap").show().find(".main").text("数据加载中，请稍后...");
                                    }*/
                                    success: function (e) {
                                        if(k.getItem('token')){
                                            $("#login").hide();
                                            if(!e.data)return;
                                            var num =0;
                                            for(var i=0;i<e.data.length;i++) {
                                                num += e.data[i].score;
                                                if (num > 0) {
                                                    $(".chicang").show();
                                                } else {
                                                    $(".chicang").hide();
                                                }
                                                if (e.data[i].cash == 1) {
                                                    var str = e.data[i].instrumentCode;
                                                    for(var j=0;j<e.data.length;j++){

                                                        if($(".tradeList").eq(j).attr("tradeid") == str){
                                                            $(".tradeList").eq(j).find("em").show();
                                                        }
                                                    }

                                                }
                                            }
                                        }else{
                                            $("#login").show();
                                        }
                                    }
                                });

                            }
                        })
                    },
                    loadImage: function (n) {
                        var _this = this,
                            i = '',
                            _img = "",
                            bot = "";
                        $.get({
                            url: '/user/newsNotice/newsImgList',
                            data: {
                                type: 2,
                            },
                            success: function (e) {
                                if (e.code == 200) {
                                    var _list = e.data.news_notice_img_list;
                                    for (var i = 0; i < _list.length; i++) {
                                        _img += '<li><a href="' + _list[i].url + '"> <img src="' + _list[i].middleBanner + '"></a></li>';
                                        bot += '<span class="dot"></span>';
                                    }

                                    a.append(_img);
                                    r.children("div").append(bot);
                                    r.find("span.dot:eq(0)").addClass("curr");
                                    _this.wait();
                                }
                            }
                        });
                        $.get({
                            url: '/financy/financy/apiFinancyMain',
                            data: {
                                token: localStorage.getItem('token')
                            },
                            success: function (r) {
                                var u = JSON.parse(k.getItem('userInfo'));
                                u.amt = r.data ? r.data.usedAmt : "0";
                                u.score = r.data ? r.data.score : "0";
                                k.setItem('userInfo', JSON.stringify(u));

                            }
                        })

                    },
                    setImageUrl: function (t) {
                        t.attr("src") || t.attr("src", t.data("src"))
                    },
                    setCurrDot: function (t) {
                        var n = r.find("span.dot").eq(t);
                        n.siblings(".curr").removeClass("curr"), n.addClass("curr")
                    }
                }
            });
        }
     } 
       
    seajs.on("request", function (data) {
        var uri = data.uri;
        uri = uri.replace(/\.js[?#].*/, "");
        uri = uri.replace(__baseDir, "");
        var fn = MERGE_MODS[uri];
        if (fn) {
            data.requested = true;
            fn();
            data.onRequest();
        }
    });    
}());
