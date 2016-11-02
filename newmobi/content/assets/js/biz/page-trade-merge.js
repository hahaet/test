(function () {
    var _askPrice,_bidPrice,_lastPrice;
    var MERGE_MODS = {
        "assets/lib/lodash/1.0/main": function () {
            define(function () {
                "use strict";
                return _
            });
        },
        "assets/lib/jquery/1.0/main": function () {
            define(function () {
                "use strict";
                return jQuery
            });
        },
        "assets/js/util/json": function () {
            define(function (require, exports, module) {
                "use strict";
                return {
                    parse: function (txt) {
                        return txt && eval("(" + txt + ")")
                    },
                    stringify: function (t) {
                        return JSON.stringify(t)
                    }
                }
            });
        },
        "assets/js/lang/data-store": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                n = require("_"),
                e = require("util/json"),
                f = require("assets/js/lang/parm"), 
                h = require("assets/js/lang/cookie"),
                k = f.getQueryString('commodity'),
                l= f.getQueryString('tradeType'),
                j= JSON.parse(h.getItem('future')),
                m = (function(){
                    if(!j){window.location='../index.html'};
                    var code={};
                    for(var o=0;o<j.length;o++){
                        code[j[o].instrumentCode]=j[o].instrumentID
                    }
                    return code;
                })(),
                i = {
                        config: {
                            tradeComm:(k?k:'NI'),
                            tradeList:[
                                {commName:'沪白银',commCode:'AG',smallCode:'ag',contCode:m['ag'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:15.0000,chargeUnit:20.0000,closeTime:['14:58','02:28'],priceDigit:0,exchange:'上期所',priceChange:1.000000,chargeOriginal:30.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'沪黄金',commCode:'AU',smallCode:'au',contCode:m['au'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:1000.0000,chargeUnit:38.0000,closeTime:['14:58','02:28'],priceDigit:2,exchange:'上期所',priceChange:0.050000,chargeOriginal:48.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'沪橡胶',commCode:'RU',smallCode:'ru',contCode:m['ru'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:10.0000,chargeUnit:38.0000,closeTime:['14:58','22:58'],priceDigit:0,exchange:'上期所',priceChange:5.000000,chargeOriginal:48.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'沪镍',commCode:'NI',smallCode:'ni',contCode:m['ni'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:1.0000,chargeUnit:38.0000,closeTime:['14:58','00:58'],priceDigit:0,exchange:'上期所',priceChange:10.000000,chargeOriginal:48.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'PP',commCode:'PP',smallCode:'pp',contCode:m['pp'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:5.0000,chargeUnit:38.0000,closeTime:['14:58','00:58'],priceDigit:0,exchange:'上期所',priceChange:1.000000,chargeOriginal:48.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'沪铜',commCode:'CU',smallCode:'cu',contCode:m['cu'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:5.0000,chargeUnit:38.0000,closeTime:['14:58','00:58'],priceDigit:0,exchange:'上期所',priceChange:10.000000,chargeOriginal:48.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'白糖',commCode:'SR',smallCode:'SR',contCode:m['SR'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopProCur:1,stopPlShow:3,priceUnit:10.0000,chargeUnit:20.0000,closeTime:['14:58'],priceDigit:0,exchange:'郑商所',priceChange:1.000000,chargeOriginal:30.0000,commValid: true,signed:false,riskRate:1.10},
                                {commName:'螺纹钢',commCode:'RB',smallCode:'rb',contCode:m['rb'],volumeList:[],volumeCur:0,volumeShow:5,stopPlCur:0,stopPlShow:3,stopProCur:1,priceUnit:10.0000,chargeUnit:0.0000,closeTime:['14:58','00:58'],priceDigit:0,exchange:'上期所',priceChange:1.000000,chargeOriginal:10.0000,commValid: true,signed:false,riskRate:1.00}
                                ],
                            urlList:[
                                {commName:'沪白银',commCode:'AG',contCode:'ag1606',commValid: true,url:""},
                                {commName:'沪黄金',commCode:'AU',contCode:'au1606',commValid: true,url:""},
                                {commName:'沪橡胶',commCode:'RU',contCode:'ru1609',commValid: true,url:""},
                                {commName:'沪镍',commCode:'NI',contCode:'ni1605',commValid: true,url:""},
                                {commName:'沪铜',commCode:'CU',contCode:'CU1605',commValid: true,url:""},
                                {commName:'白糖',commCode:'SR',contCode:'SR605',commValid: true,url:""},
                                {commName:'螺纹钢',commCode:'RB',contCode:'rb1610',commValid: true,url:""},
                                {commCode: "CL",commName: "美原油",commValid: true,contCode: "CL1605",url:'../guoji/index.html?commodity=CL'},
                                {commCode: "HSI",commName: "恒指",commValid: true,contCode: "HSI1604",url:'../guoji/index.html?commodity=HSI'},
                                {commCode: "MHI",commName: "小恒指",commValid: true,contCode: "MHI1604",url:'../guoji/index.html?commodity=MHI'},
                                {commCode: "GC",commName: "美黄金",commValid: true,contCode: "GC1606",url:'../guoji/index.html?commodity=GC'}

                                ],
                            futures:"",
                            contCode:'',
                            scale:0,
                            isLogin:(h.getItem('token')?true:false),
                            isOption:false,
                            eagleDeduction:0,
                            tradeType:(l?l:1),
                            token:h.getItem('token')
                        },
                        urlClose: "/order/futures/sale",
                        urlInvestor: "../trade/investor",
                        urlKline: "//quote.6006.com/kline.jsp",
                        urlLogin: "../user/login.html?f=/trade/index.html?commodity=",
                        urlOpen: "/order/futures/buy",
                        urlQuote: "/futuresquota/getQuotaDataByWeb",
                        urlQuote1: "/trade/quote",
                        urlRegister: "/user/register.html?f=/trade/index.html?commodity=",
                        urlRevoke: "../trade/revoke",
                        urlScheme: "/order/futures/posiList",
                        urlBalance:'/order/futures/balancedList',
                        urlSigned: "../trade/signed.html",
                        urlSline: "/futuresquota/bminute",
                        urlSline1: "/trade/bminute",
                        urlSpsl: "../trade/spsl",
                        urlUserCenter: "/mine"
                    },
                c = t("#content").data(),
                r = {},
                u = /^\{.*\}$/m;
                return t.extend(r, i, c),
                n.each(r,
                function (t, i) {
                    n.isString(t) && u.test(t) && (r[i] = e.parse(t))
                }),
                {
                    get: function (t) {
                        return t && r[t] || r
                    },
                    set: function (t, n) {
                        r[t] = n
                    }
                }
            });
        },
        "assets/js/biz/page/trade/futures":function(){
            define(function (require) {
                "use strict"; 
                var t = require("$"),
                e = require("_"),
                n = require("log"),
                a = require("net"),
                f = require("dataStore"),
                l = require("ui/loading"),
                o = require("ui/msgbox"),
                h = require("assets/js/lang/cookie"),
				dl = require("assets/js/biz/mod/auth"),
                j= JSON.parse(h.getItem('future')),
                J = h.getItem('userInfo'),
                c = t('.summary>div:eq(0) em'),
                w = f.get("config");
                //u = '//www.jnhyxx.com/market/futureCommodity/select';
                // a.post({
                //     url: u,
                //     data: {},
                //     success:function(d){
                        var _data=j;
                         l.show();
                        for(var i=0;i<_data.length;i++){
                            if(_data[i].instrumentCode.toUpperCase()==w.tradeComm){
                                 w.futures=_data[i];
                            }
                        }
                        if(w.tradeType==2){
                            t('#summary>div>div').html('可用积分');
                            t('#summary div.right a').attr('href','javascript:;').addClass('jt-jfmx').html('').css('border','none');
                            t('#summary div.right a').on('tap',function(){
                                o.alert('敬请期待');
                            }); 
                            t('#summary span.rechage').html('获取');
                        }
                         setTimeout(function(){
                            seajs.use("page/trade/quote",function(c){
                                c&&c.init();
                                l.hide();
                                a.get({
                                    url:'/financy/financy/apiFinancyMain',
                                    data:{
                                        token:h.getItem('token')
                                    },
                                    success:function(r){
                                        if(r.data){
                                            t('#summary em:eq(0)').text((w.tradeType=="2"?r.data.score:r.data.usedAmt));
                                        }
                                      
                                       
                                    }
                                })
                            })
                       },10);
                       
                    //}
                //})
            }); 
        },
        "assets/js/biz/page/trade/option":function(){
            define(function (require) {
                "use strict"; 
                var e = require("_"),
                f = require("dataStore"),
                w = f.get("config"),
                h = w.isOption;
                if(!h){
                    seajs.use(["page/trade/buy",'page/trade/sell','page/trade/settlement'],function(b,c,d,f){
                        b&&b.init();
                        c&&c.init();
                        d&&d.init();
                        f&&f.init();
                        w.isOption=true;
                    });
                    
                }
              
            }); 
        },
        "assets/js/biz/page/trade/base": function () {
            define(function (require) {
                "use strict";
                var e = require("_"),
                t = require("dataStore"),
                i = t.get("config"),
                r = i.BASE = {},
                a = i.base = {};
                i.tradeList.forEach(function (t) {
                    r[t.commCode.toUpperCase()] = e.extend({
                        unitPrice: t.priceUnit,
                        scale: t.priceDigit
                    },
                    t)
                }),
                i.tradeComm && e.extend(a, r[i.tradeComm.toUpperCase()])
            });
        },
        "assets/js/lang/log": function () {
            define(function () {
                "use strict";
                var n = !!window.console,
                o = function () {
                    n && console.log.apply(console, arguments)
                };
                return o.warn = function () {
                    n && console.warn.apply(console, arguments)
                },
                o.error = function () {
                    n && console.error.apply(console, arguments)
                },
                o
            });
        },

        "assets/js/lang/parm" : function() {
            define(function () {
                "use strict";
                return {
                    getQueryString: function (name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                        var r = window.location.search.substr(1).match(reg);
                        if (r != null) return unescape(r[2]); return null;
                    }
                }
            });
        },
        "assets/js/util/timer": function () {
            define(function () {
                "use strict";
                var n = 0,
                t = {},
                e = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                function (n) {
                    window.setTimeout(n, 17)
                },
                i = function (n) {
                    return "number" == typeof n
                },
                u = function () {
                    var n = Object.keys(t);
                    if (n.length) {
                        var e = Date.now();
                        n.forEach(function (n) {
                            var i = t[n];
                            if (null != i && e - i.time >= i.wait) {
                                var u = i.times;
                                u > 0 && u--,
                                i.fn.call(i.context),
                                -1 === u || u > 0 ? (i.time = Date.now(), i.times = u) : (i = null, delete t[n])
                            }
                        })
                    }
                },
                r = function (n) {
                    t[n + ""] && delete t[n + ""]
                },
                o = function () {
                    u(),
                    e(o)
                };
                return o(),
                {
                    add: function (e, u, o, a) {
                        return 2 === arguments.length ? i(u) ? 100 > u && (a = u, u = 1e3) : (o = u, u = 1e3) : 3 === arguments.length && (i(o) ? (a = o, o = null) : i(u) || (a = o, o = u, u = 1e3)),
                        n++,
                        t[n + ""] = {
                            id: n,
                            fn: e,
                            wait: u || 300,
                            context: o,
                            times: null != a ? a : -1,
                            time: Date.now()
                        },
                        {
                            id: n,
                            clear: function () {
                                r(this.id)
                            }
                        }
                    },
                    one: function (n, t, e) {
                        return null == t || i(t) || (e = t, t = 1e3),
                        this.add(n, t, e, 1)
                    },
                    ever: function (n, t, e) {
                        return null == t || i(t) || (e = t, t = 1e3),
                        this.add(n, t, e, -1)
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
        "assets/js/ui/msgbox/1.0/main": function () {
            define(function (require) {
                "use strict";
                var i = require("$"),
                n = require("util/timer"),
                t = i("#doc"),
                a = t.find("div.msgbox-info"),
                d = t.find("div.msgbox-confirm"),
                o = t.find("div.msgbox-toast"),
                s = null,
                e = null,
                l = null,
                v = null,
                c = function () {
                    f(),
                    r()
                },
                f = function () {
                    var n = t.find("div.float"),
                    s = n.children("div.content");
                    n.length || (t.append('<div class="float"><div class="content"></div></div>'), n = t.find("div.float"), s = n.children("div.content")),
                    a.length || (a = i('<div class="overlay-top msgbox msgbox-info hide"><div class="content"><div class="main"></div><div class="action"><a href="javascript:void(0)" class="button ok">确定</a></div></div></div>').appendTo(s)),
                    d.length || (d = i('<div class="overlay-top msgbox msgbox-confirm hide"><div class="content"><div class="main"></div><div class="action clearfix"><div class="left"><a href="javascript:void(0)" class="button button-lesser no">取消</a></div><div class="right"><a href="javascript:void(0)" class="button ok">确定</a></div></div></div></div>').appendTo(s)),
                    o.length || (o = i('<div class="msgbox-toast hide"><div class="content"></div></div>').appendTo(s))
                },
                r = function () {
                    var n = function (n) {
                        n.preventDefault();
                        var t = i(this);
                        if (!t.hasClass("button-disabled")) {
                            if (-1 === t.attr("href").indexOf("javascript:void(0)")) return void (window.location.href = t.attr("href"));
                            g(),
                            s && s.call(this)
                        }
                    },
                    t = function (n) {
                        n.preventDefault();
                        var t = i(this);
                        if (!i(this).hasClass("button-disabled")) {
                            if (-1 === t.attr("href").indexOf("javascript:void(0)")) return void (window.location.href = t.attr("href"));
                            g(),
                            e && e.call(this)
                        }
                    };
                    a.find("div.action a.ok").on("tap", n),
                    d.find("div.action a.ok").on("tap", n),
                    d.find("div.action a.no").on("tap", t)
                },
                u = function (i) {
                    var n = a.find("div.action a.ok"),
                    t = "确定",
                    d = "javascript:void(0)";
                    i && i.ok && (t = i.ok.name || t, d = i.ok.url || d),
                    n.text(t).attr("href", d)
                },
                h = function (i) {
                    var n = d.find("div.action a.ok"),
                    t = d.find("div.action a.no"),
                    a = "确定",
                    o = "javascript:void(0)",
                    s = "取消",
                    e = "javascript:void(0)";
                    i && i.ok && (a = i.ok.name || a, o = i.ok.url || o),
                    i && i.no && (s = i.no.name || s, e = i.no.url || e),
                    n.text(a).attr("href", o),
                    t.text(s).attr("href", e)
                },
                m = function (i, n, t) {
                    s = n,
                    e = null,
                    i && (l = a.find("div.main").html(), a.find("div.main").html(i)),
                    u(t),
                    a.removeClass("hide")
                },
                b = function (i, n, t, a) {
                    s = n,
                    e = t,
                    i && (v = d.find("div.main").html(), d.find("div.main").html(i)),
                    h(a),
                    d.removeClass("hide")
                },
                p = 0,
                x = function (i) {
                    i && (o.children("div.content").text(i), o.removeClass("hide"), n.clear(p), p = n.one(function () {
                        o.animate({
                            opacity: 0
                        },
                        500,
                        function () {
                            o.addClass("hide").css({
                                opacity: 1
                            })
                        })
                    },
                    2500).id)
                },
                g = function () {
                    a.addClass("hide"),
                    d.addClass("hide"),
                    o.addClass("hide"),
                    l && a.find("div.main").html(l),
                    v && d.find("div.main").html(v)
                };
                return c(),
                {
                    alert: function (i, n, t) {
                        return "function" == typeof i && (t = n, n = i, i = null),
                        m(i, n, t),
                        this
                    },
                    confirm: function (i, n, t, a) {
                        return "function" == typeof i && (a = t, t = n, n = i, i = null),
                        b(i, n, t, a),
                        this
                    },
                    toast: function (i) {
                        x(i)
                    },
                    disable: function () {
                        return a.find("div.action > a.button").addClass("button-disabled"),
                        d.find("div.action > a.button").addClass("button-disabled"),
                        this
                    },
                    enable: function () {
                        return a.find("div.action > a.button").removeClass("button-disabled"),
                        d.find("div.action > a.button").removeClass("button-disabled"),
                        this
                    }
                }
            });
        },
        "assets/js/ui/loading/1.0/main": function () {
            define(function (require) {
                "use strict";
                var i = require("$"),
                n = i("#doc"),
                d = '<div class="loading hide"><div class="content"><img src="../content/assets/imgs/loading/01.gif"/></div></div>',
                s = 0,
                e = null,
                t = function () {
                    if (!e) {
                        var s = n.find("div.float");
                        s[0] || (s = i('<div class="float"><div class="content"></div></div>').appendTo(n)),
                        e = i(d).appendTo(s.children("div.content"))
                    }
                };
                return t(),
                {
                    show: function (i) {
                        return i === !0 ? s = -1 : s > -1 && s++,
                        e.removeClass("hide"),
                        this
                    },
                    hide: function (i) {
                        return i === !0 ? s = 0 : s > 0 && s--,
                        0 === s && e.addClass("hide"),
                        this
                    }
                }
            });
        },
        "assets/js/biz/mod/ajax-result": function () {
            define(function (require) {
                "use strict";
                var r = require("log"),
                o = require("ui/msgbox"),
                t = require("ui/loading"),
                n = function (r) {
                    return "function" == typeof r
                },
                e = function (r, t) {
                    var e = r.redirectUrl,
                    i = r.errorMsg ,
                    a = r.msgType,
                    c = r.button;
                    if (e && /^>/.test(e)) return void (window.location.href = e.substring(1));
                    if (e && /^\*/.test(e)) switch (e = e.replace("*", "")) {
                        case "refresh":
                            window.location.reload()
                    } else {
                        var f = function () {
                            e ? window.location.href = e : n(t) && t()
                        };
                        i ? c ? c.ok && c.no ? o.confirm(i, f, null, c) : o.alert(i, f, c) : e ? o.alert(i, f) : "toast" === a ? (o.toast(i), f()) : o.alert(i, f) : f()
                    }
                };
                return {
                    done: function (r, o) {
                        e(r, o)
                    },
                    fail: function (o, n) {
                        r.error(n),
                        t.hide(!0),
                        e({
                            errorMsg: "抱歉，系统繁忙，请稍后再试"
                        })
                    }
                }
            });
        },
        "assets/js/lang/net": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                e = require("util/json"),
                n = require("mod/ajax-result"),
                r = function (e) {
                    this.jqXHR = t.ajax(e)
                };
                return r.prototype = {
                    done: function (t) {
                        return this.jqXHR.done(t),
                        this
                    },
                    fail: function (t) {
                        return this.jqXHR.fail(t),
                        this
                    },
                    complete: function (t) {
                        return this.jqXHR.complete(t),
                        this
                    },
                    always: function (t) {
                        return this.jqXHR.always(t),
                        this
                    }
                },
                {
                    post: function (t) {
                        return t.type = "POST",
                        this.ajax(t)
                    },
                    get: function (t) {
                        return t.type = "GET",
                        this.ajax(t)
                    },
                    jsonp: function (t) {
                        return t.type = "GET",
                        t.dataType = "jsonp",
                        this.ajax(t)
                    },
                    ajax: function (t) {
                        return t.type = t.type || "POST",
                        t.cache = t.cache || !1,
                        t.dataType = t.dataType || "json",
                        t.success = t.success || n.done,
                        t.error = t.error || n.fail,
                        t.converters = {
                            "text json": function (t) {
                                return e.parse(t && t.replace(/[\n\r]/g, " "))
                            }
                        },
                        new r(t)
                    }
                }
            });
        },
        "assets/js/util/strings": function () {
            define(function () {
                "use strict";
                return {
                    format: function () {
                        var n = /\$\w+|\$\{\w+\}/g,
                        r = /\$|\{|\}/g,
                        t = function (n) {
                            return n.replace(r, "")
                        };
                        return function (r, u) {
                            return r.replace(n,
                            function (n) {
                                var r = u[t(n)];
                                return null == r ? n : r
                            })
                        }
                    }(),
                    tpl: function (n) {
                        var r = this;
                        return function (t) {
                            return r.format(n, t)
                        }
                    }
                }
            });
        },
        "assets/js/util/dates": function () {
            define(function () {
                "use strict";
                var e = function (e, r) {
                    return (!r && 10 > e ? "0" : "") + e
                };
                return {
                    format: function (r, a, t) {
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
                }
            });
        },
        "assets/js/util/guid": function () {
            define(function () {
                "use strict";
                var r = "0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz6789",
                t = r.length,
                n = 20;
                return {
                    get: function (e) {
                        e && "number" == typeof e || (e = n);
                        for (var u = ""; e-- > 0;) u += r.charAt(Math.random() * t | 0);
                        return u
                    }
                }
            });
        },
        "assets/js/lang/observer": function () {
            define(function () {
                "use strict";
                var t = {}.toString,
                r = Array.prototype.slice,
                e = function (r) {
                    return "[object Function]" === t.call(r)
                },
                o = Array.isArray ||
                function (r) {
                    return "[object Array]" === t.call(r)
                },
                n = function (t) {
                    return "string" == typeof t
                },
                i = function (t, r) {
                    var e;
                    if (o(t)) for (; e = t.shift() ;) r(e);
                    else r(t)
                },
                c = function (t, r, e, o) {
                    if (n(r)) {
                        var i = t[r] || (t[r] = []);
                        i.push({
                            listener: e,
                            context: o
                        })
                    }
                },
                s = function (t, r, e, o) {
                    var i, c;
                    if (n(r) && (i = t[r])) if (e || o) for (var s = 0,
                    u = i.length; u > s;) c = i[s],
                    e && c.listener === e || o && c.context === o ? i.splice(s, 1) : s++;
                    else delete t[r]
                },
                u = function (t, r, e) {
                    var o, i;
                    if (n(r) && (o = t[r])) for (var c = 0,
                    s = o.length; s > c; c++) i = o[c],
                    i.listener.apply(i.context || this._observer_context || this, e)
                },
                f = function (t) {
                    this._observer_context = t
                };
                f.prototype = {
                    attach: function (t, r, o) {
                        var n;
                        return e(r) ? (n = this._observer_group || (this._observer_group = {}), i(t,
                        function (t) {
                            c(n, t, r, o)
                        }), this) : this
                    },
                    detach: function (t, r, e) {
                        var o;
                        return (o = this._observer_group) ? t ? (i(t,
                        function (t) {
                            s(o, t, r, e)
                        }), this) : (delete this._observer_group, this) : this
                    },
                    notify: function (t) {
                        var e, o, n;
                        return (e = this._observer_group) ? (o = r.call(arguments, 1), n = this, i(t,
                        function (t) {
                            u.call(n, e, t, o)
                        }), this) : this
                    }
                },
                f.prototype.on = f.prototype.attach,
                f.prototype.off = f.prototype.detach,
                f.prototype.emit = f.prototype.notify;
                var a = new f(window);
                return a.create = function (t) {
                    return new f(t)
                },
                a.mixTo = function (t) {
                    t = t || {};
                    var r = f.prototype;
                    for (var e in r) t[e] = r[e];
                    return t
                },
                a
            });
        },
        "assets/js/biz/mod/observer": function () {
            define(function (require) {
                "use strict";
                var e = require("lang/observer");
                return e.create()
            });
        },
        "assets/js/lang/class": function () {
            define(function () {
                "use strict";
                var t = function (t, n) {
                    var r, o;
                    for (o in n) r = n[o],
                    void 0 !== r && (t[o] = r);
                    return t
                },
                n = function () { };
                return function (r, o) {
                    o || (o = r, r = null);
                    var i, e = function () {
                        this.init && this.init.apply(this, arguments)
                    },
                    p = {};
                    return r && (n.prototype = i = r.prototype || r, p = new n),
                    e.prototype = t(p, o),
                    e.prototype.constructor = e,
                    e.prototype.superclass = i,
                    e
                }
            });
        },
        "assets/js/ui/menu/1.0/main": function () {
            define(function (require) {
                "use strict";
                var i = require("$"),
                t = require("_"),
                e = require("class"),
                n = '<div class="overlay-top msgbox menu-pop hide"><div class="content"><div class="main"><ul></ul></div></div></div>',
                s = '<div class="overlay-top msgbox menu-slideup hide"><div class="content"><div class="main"><div class="tips text-lesser text-s hide"><p></p></div><ul></ul><div class="action"><a href="javascript:void(0)">取消</a></div></div></div></div>',
                a = '<div class="overlay-top msgbox menu-slidedown hide"><div class="content"><div class="main"><ul></ul></div></div></div>',
                d = i(window),
                l = i("#doc"),
                c = e({
                    init: function (i, t) {
                        this.menu = null,
                        this.data = i,
                        this.tpl = t || n,
                        this.callback = null,
                        this.render(),
                        this.wait()
                    },
                    render: function () {
                        var t = l.find("div.float"),
                        e = t.children("div.content");
                        t[0] || (l.append(i('<div class="float"><div class="content"></div></div>')), t = l.find("div.float"), e = t.children("div.content")),
                        this.menu || (this.menu = i(this.tpl).appendTo(e)),
                        this._html()
                    },
                    wait: function () {
                        var t = this;
                        this.menu.find("ul").on("tap", "li",
                        function (e) {
                            if (e.preventDefault(), t.hide(), t.callback) {
                                var n = i(this);
                                t.callback(n.text(), n.data("value"), n.data())
                            }
                        }),
                        this.menu.on("tap",
                        function (i) {
                            i.preventDefault(),
                            t.hide()
                        })
                    },
                    show: function (i) {
                        this.callback = i,
                        this.menu.removeClass("hide")
                    },
                    hide: function () {
                        this.menu.addClass("hide")
                    },
                    load: function (i) {
                        this.data = i,
                        this._html()
                    },
                    _html: function () {
                        var i = "";
                        this.data && this.data.forEach(function (e) {
                            var n = "",
                            s = e;
                            t.isObject(e) ? (t.each(e,
                            function (i, t) {
                                "name" !== t && (n += " data-" + t + '="' + i + '"')
                            }), s = e.name) : n = ' data-value="' + e + '"',
                            i += "<li" + n + ">" + s + "</li>"
                        }),
                        this.menu.find("ul").html(i)
                    }
                });
                return c.SlideUp = e(c, {
                    init: function (i) {
                        this.superclass.init.call(this, i, s)
                    },
                    render: function () {
                        this.superclass.render.call(this);
                        var i = .84 * d.height() / 100;
                        this.menu.find("ul").css("max-height", i + "rem")
                    },
                    wait: function () {
                        this.superclass.wait.call(this);
                        var i = this;
                        this.menu.find("div.action > a").on("tap",
                        function (t) {
                            t.preventDefault(),
                            i.hide()
                        })
                    },
                    show: function (i) {
                        var t = this.menu;
                        return this.callback = i,
                        t.removeClass("hide"),
                        setTimeout(function () {
                            t.addClass("menu-fade-in"),
                            t.children("div.content").removeClass("slide-out"),
                            t.children("div.content").addClass("slide-in")
                        },
                        16),
                        this
                    },
                    hide: function () {
                        var i = this.menu;
                        return i.children("div.content").removeClass("slide-in"),
                        i.children("div.content").addClass("slide-out"),
                        i.removeClass("menu-fade-in").addClass("menu-fade-out"),
                        setTimeout(function () {
                            i.addClass("hide").removeClass("menu-fade-out")
                        },
                        300),
                        this
                    },
                    setTips: function (i) {
                        var t = this.menu.find("div.tips");
                        return i && t.removeClass("hide").find("p").text(i),
                        this
                    }
                }),
                c.SlideDown = e(c, {
                    init: function (i) {
                        this.superclass.init.call(this, i, a)
                    },
                    render: function () {
                        this.superclass.render.call(this);
                        var i = .84 * d.height() / 100;
                        this.menu.find("ul").css("max-height", i + "rem")
                    },
                    show: function (i) {
                        var t = this.menu;
                        return this.callback = i,
                        t.removeClass("hide"),
                        setTimeout(function () {
                            t.addClass("menu-fade-in"),
                            t.children("div.content").removeClass("slide-out"),
                            t.children("div.content").addClass("slide-in")
                        },
                        16),
                        this
                    },
                    hide: function () {
                        var i = this.menu;
                        return i.children("div.content").removeClass("slide-in"),
                        i.children("div.content").addClass("slide-out"),
                        i.removeClass("menu-fade-in").addClass("menu-fade-out"),
                        setTimeout(function () {
                            i.addClass("hide").removeClass("menu-fade-out")
                        },
                        300),
                        this
                    }
                }),
                c
            });
        },
        "assets/js/biz/page/trade/buy": function () {
            define(function (require) {
                "use strict";
                var e = require("$"),
                t = require("_"),
                i = (require("log"), require("net")),
                s = require("dataStore"),
                o = require("util/strings"),
                n = require("util/dates"),
                a = require("util/guid"),
                r = require("mod/observer"),
                u = require("mod/ajax-result"),
                d = require("ui/menu"),
                p = require("ui/msgbox"),
                l = e("#doc"),
                c = l.find("div.page-trade"),
                q = l.find("div.page-open-interest"),
                f = l.find("div.page-buy-highs"),
                v = f.find("section.main-buy-highs"),
                m = s.get("config"),
                h = m.base,
                g = s.get("urlOpen"),
                C = s.get("urlInvestor"),
                _ = {},
                b = !1,
                J = {},
                J1= [],
                J2= [],
                K = {},
                L = {
                    token:m.token,
                    tradeType: m.tradeType,
                    //identity: a.get(16),
                    source: "下单"
                };
                return {
                    init: function () {
                        this.initDate(),
                        this.initElems(),
                        this.initMenu(),
                        this.updateCloseTime(),
                        this.wait(),
                        this.attach()
                    },
                    initData: function () {
                        t.extend(L, {
                            commodity: h.commCode,
                            contract: h.contCode,
                            isBuy: !0,
                            price: 0,
                            volume: 1,
                            stopProfit: 0,
                            stopLoss: 0,
                            serviceCharge: 0,
                            eagleDeduction: 0,
                            investUserId: ""
                        })
                    },
                    initDate:function(){
                        Date.prototype.Format = function (fmt) { 
                            var o = {
                                "M+": this.getMonth() + 1, //月份 
                                "d+": this.getDate(), //日 
                                "h+": this.getHours(), //小时 
                                "m+": this.getMinutes(), //分 
                                "s+": this.getSeconds(), //秒 
                                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                                "S": this.getMilliseconds() //毫秒 
                            };
                            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                            for (var k in o)
                            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                            return fmt;
                        }
                    },
                    initElems: function () {
                        var e = v.find("ul.mod-list"),
                        t = e.eq(0).children("li"),
                        i = e.eq(1).children("li"),
                        s = e.eq(2).children("li");
                        this.elems = {
                            trade_goods: t.eq(0).find("div.left"),
                            close_time: t.eq(0).find("div.right"),
                            trade_count: t.eq(1).find("div.right"),
                            stop_profit: t.eq(2).find("div.right"),
                            stop_loss: t.eq(3).find("div.right"),
                            trade_dir: v.find("div.action > a.button"),
                            trade_fee: t.eq(5).find("div.right"),
                            trade_deposit: t.eq(4).find("div.right"),
                            pay_sum: i.eq(0).find("div.right"),
                            instant_buy: v.find(".action .price"),
                            trigger_price: s.eq(1),
                            investor: v.find("p.ps span.investor")
                        }
                    },
                    initMenu: function () {
                        this.menu = new d
                    },
                    wait: function () {
                        var t = this,
                        s = this.elems;
                        s.trade_count.on("tap", "span.lot",
                        function (i) {
                            i.preventDefault();
                            var s = e(this);
                            s.hasClass("selected") || (s.siblings("span.lot.selected").removeClass("selected"), s.addClass("selected"), L.volume = s.data("value"), h.volumeCur = s.data("index"), t.updateServiceFee(), t.updateStopProfit(), t.updateStopLoss(), t.updateDeposit(),t.updatePay())
                        }).on("tap", "span.more-lot",
                        function (e) {
                            e.preventDefault(),
                            t.menu.load(t.c2list(h.volumeList, 1, "手")),
                            t.menu.show(function (e, i, s) {
                                h.volumeCur = s.index,
                                t.updateTradeCount();
                                
                            })
                        }),
                        s.stop_loss.on("tap", "span.trigger",
                        function (i) {
                            i.preventDefault();
                            var s = e(this);
                            if (!s.hasClass("selected")) {
                                s.siblings("span.trigger.selected").removeClass("selected"),
                                s.addClass("selected"),
                                h.stopPlCur = s.data("index");
                                var o = h.volumeList[h.volumeCur];
                                K=L.tradeType==1?J1[h.stopPlCur]:J2[h.stopPlCur];
                                L.stopLoss = h.stopLossList[h.stopPlCur] * o,
                                t.updateStopProfit(),
                                t.updateDeposit(),
                                t.updatePay()

                            }
                        }).on("tap", "span.more-trigger",
                        function (e) {
                            e.preventDefault();
                            var i = "1";//h.volumeList[h.volumeCur];
                            t.menu.load(t.c2list(h.stopLossList, i, "元")),
                            t.menu.show(function (e, i, s) {
                                h.stopPlCur = s.index,
                                t.updateStopProfit(),
                                 t.updateStopLoss(),
                                t.updateDeposit(),
                                t.updatePay()
                            })
                        }),
                        s.stop_profit.on("tap", "span.trigger",
                        function (i) {
                            i.preventDefault();
                            var s = e(this);
                            if (!s.hasClass("selected")) {
                                s.siblings("span.trigger.selected").removeClass("selected"),
                                s.addClass("selected"),
                                h.stopProCur = s.data("index");
                                t.updateStopProfit();
                            }
                        }).on("tap", "span.more-trigger",
                        function (e) {
                            e.preventDefault();
                            var i = "1",
                            l=L.tradeType==1?J1[h.stopPlCur]:J2[h.stopPlCur],
                            k = l.maxProfit.split(","),
                            K = [];
                            for(var j=0;j<k.length;j++){
                                K.push(k[j]*J[h.stopPlCur].rate)
                            }
                            t.menu.load(t.c2list(K, i, "元")),
                            t.menu.show(function (e, i, s) {
                                h.stopProCur = s.index,
                                t.updateStopProfit();
                            })
                        }),
                        s.trigger_price.find("input.input").on("tap",
                        function (t) {
                            t.preventDefault(),
                            e(this).focus(),
                            s.trigger_price.find('input[name="buy-condition"]').prop("checked", !0)
                        }),
                        s.trade_fee.on("click", "input",
                        function (e) {
                            e.preventDefault(),
                            t.updateServiceFee()
                        }),
                        f.find("a.go-back").on("tap",
                        function (e) {
                            e.preventDefault(),
                            f.hide(),
                            c.show(),
                            r.notify("pageSwitch", "page-quote")
                        }),
                      
                        v.find("div.action a.button").on("tap",
                        function (o) {
                            o.preventDefault();
                            var n = e(this);
                            if (!n.hasClass("button-disabled")) {
                                var _data={};_data.orderData={};
                                _data.token=L.token;
                                _data.version='0.0.3';
                                _data.orderData.futuresCode=L.contract;
                                _data.orderData.count=L.volume;
                                _data.orderData.rate=K.rate;
                                _data.orderData.traderId=K.id;
                                _data.orderData.tradeType=L.isBuy?0:1;
                                _data.orderData.userBuyPrice=L.price;
                               _data.orderData.userBuyDate=new Date().Format('yyyy-MM-dd hh:mm:ss');
                               _data.orderData.stopProfit=parseInt(L.stopProfit);
                               _data.orderData=JSON.stringify(_data.orderData);
                                var d = s.trigger_price.find("input"); (!d.eq(0).prop("checked") || (L.price = e.trim(d.eq(1).val()), L.price = "" === L.price ? 0 : L.price - 0, t.isValid())) && (n.addClass("button-disabled"), i.post({
                                    url: g,
                                    data: _data,
                                    success: function (e) {
                                        u.done(e,
                                        function () {
                                            L.identity = a.get(16),
                                            e.code==200?(f.hide(), q.show(),t.sdk(e,_data.orderData), r.notify("panelSwitch", "open-interest")):p.alert(e.msg,function(){
                                                if(e.code==44007)window.location='../mine.html';
                                            });
                                        })
                                    },
                                    complete: function () {
                                        n.removeClass("button-disabled");
                                        t.updateCash();
                                    }
                                }))
                            }
                        })
                    },
                     sdk:function(e,d){
                         if(L.tradeType==2){return false}
                        if(window.location.host=="www.jnhyxx.com"){
                            d=JSON.parse(d);
                            var F = navigator.userAgent;
                             if(F.indexOf('ANDROID_AGENT')>-1){
                                var arr=[], 
                                    user=JSON.parse(localStorage.getItem('userInfo')),
                                    pz={'AU':'0','AG':'1','RB':'2','CU':'3','NI':'4',"SR":'5',"PP":'6',"CL":'7',"GC":'8',"HSI":'9',"MHI":'10',"NQ":'11',"DAX":'12'};
                                arr[0]=user.tele;
                                arr[1]=e.data.futuredOrderIdsStr;
                                arr[2]=d.futuresCode;
                                arr[3]=d.tradeType.toString();
                                arr[4]=(d.userBuyPrice*100).toString();
                                arr[5]=pz[m.tradeComm];
                                arr[6]="1";
                                arr[7]=(new Date()).getTime().toString();
                                window.VIA_SDK.on_Cmd_Buy(arr);
                             }
                        }
                    },
                    attach: function () {
                        var e = this;
                        r.attach("pageSwitch",
                        function (t, i, s) {
                            b = "page-buy" === t,
                            b && (e.initData(), L.isBuy = i, e.updateView(i), e.reverseBuy(s))
                        }),
                        r.attach("newQuoteData",
                        function (t) {
                            _ = t,
                            b && e.elems && e.updateCurrPrice()
                        })
                    },
                    updateCash:function(){
                        i.get({
                            url:'/financy/financy/apiFinancyMain',
                            data:{
                                token:L.token
                            },
                            success:function(r){
                               e('#summary em:eq(0)').text((m.tradeType=="2"?r.data.score:r.data.usedAmt));
                               
                            }
                        })
                    },
                    updateView: function (e) {
                        var t = this.elems;
                        t.trade_goods.text(h.commName + " - " + h.contCode + "合约"),
                        t.trade_dir.text(e ? "确定买涨" : "确定买跌"),
                        t.trade_dir.removeClass("button-buy-highs button-buy-lows"),
                        t.trade_dir.addClass(e ? "button-buy-highs" : "button-buy-lows"),
                        this.updateTradeCount(),
                        
                        //this.updateCloseTime(),
                     
                        //this.updateInvestor(),
                        t.instant_buy.prev().prop("checked", !0),
                        t.trigger_price.find("input.input").val(""),
                        this.updateCurrPrice(),
                        1 !== m.tradeType && t.trigger_price.addClass("hide")
                    },
                    updateDeposit: function () {
                        var e = h.volumeList[h.volumeCur],
                        t = h.cashFund[h.stopPlCur]*e,
                        // t = h.stopLossList[h.stopPlCur] * e,
                        // t = Math.abs(t),
                        // t = t*h.riskRate,
                        i = '<span class="text-stress">' + t.toFixed(2).replace(".00","") + "元</span> ";
                        L.deposit = t;
                        this.elems.trade_deposit.html(i)
                    },
                    updateServiceFee: function () {
                        var e, t = this.elems,
                        i = m.eagleDeduction,
                        s = h.volumeList[h.volumeCur],
                        o = h.chargeUnit * s;
                        if (e = '<span class="text-stress">' + o + "元</span><br/>", i > 0) {
                            // var n = 1 === m.tradeType,
                            // a = n && t.trade_fee.find("input").prop("checked"),
                            // r = a ? 'checked="checked"' : "",
                            // u = 0;
                            // u = i >= o ? o : i,
                            // a ? (o -= u, L.eagleDeduction = u) : L.eagleDeduction = 0,
                            e = '<span class="text-stress">' + o + "元</span>";
                            //n && (e += '<br/><label><input type="checkbox" ' + r + "/> 使用瑞币抵扣" + u + "元</label>")
                        }
                        // if (h.chargeOriginal) {
                        //     var d = h.chargeOriginal * s;
                        //     e = '<span class="text-lesser text-del text-s12">(原价' + d + "元)</span>&nbsp;&nbsp;" + e
                        // }
                        L.serviceCharge = o,
                        t.trade_fee.html(e)
                    },
                    updatePay:function(){
                        var a=L.deposit+L.serviceCharge,
                            c = m.futures;
                        this.elems.pay_sum.html('<span class="text-stress">'+a+'元</span>');
                    },
                    updateCurrPrice: function () {
                        var e = _[h.contCode],
                        t = L.isBuy ? e.wt_sale_price : e.wt_buy_price,
                        t = t.toFixed(h.scale);
                        L.price=t;
                        this.elems.instant_buy.html("最新买入价<br/><em class='text-highs'>" + t + "</em>")
                    },
                    updateInvestor: function () {
                        var e = this;
                        1 === m.tradeType && i.get({
                            url: C,
                            success: function (t) {
                                L.investUserId = t.userId,
                                e.elems.investor.text(t.username + "(ID" + t.userId + ")")
                            }
                        })
                    },
                    updateCloseTime: function () {
                         var e, i = n.format(Date.now(), "h:m");
                        // t.each(h.closeTime,
                        // function (t) {
                        //     return t > i ? (e = t, !1) : void 0
                        // }),
                        // e || (e = h.closeTime[0]),
                        // e = n.format(e, "h:m");
                        t.each(h.closeTime,
                            function (t) {
                                var a = parseInt(t.replace(":",""));
                                return parseInt(i.replace(":","")) <  a? (e = t, !1) : void 0
                        })
                        e =e||(e = h.closeTime[0]);
                        this.elems.close_time.html("<em>持仓至" + e + "自动平仓</em>")
                    },
                    sortCount:function (key,desc) {
                      return function(a,b){
                        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
                      }
                    },
                    updateTradeCount: function () {
                        var _this=this;
                        i.get({
                            url:'/financy/financy/getStockTraderList',
                            data:{traderType:m.tradeComm,token:m.token,version:'0.0.2'},
                            success:function(d){
                                J=d.data;
                                var e = "",
                                x = J[0].multiple,
                                t = "";
                                e = '<span class="lot ${selected}" data-value="${lot}" data-index="${index}">${lot}手</span>',
                              
                                h.volumeList=x.indexOf('.')>-1?x.split('.'):x.split(','),
                                h.volumeCur < h.volumeShow ? (h.volumeList.forEach(function (i, s) {
                                    s < h.volumeShow && (t += o.format(e, {
                                        lot: i,
                                        index: s,
                                        selected: s === h.volumeCur ? "selected" : ""
                                    }), s === h.volumeCur && (L.volume = i))
                                }), h.volumeList.length > h.volumeShow && (t += '<span class="more more-lot iconfont icon-xiangxiajiantou"></span>')) : (t += o.format(e, {
                                    lot: h.volumeList[h.volumeCur],
                                    index: h.volumeCur,
                                    selected: "selected"
                                }), L.volume = h.volumeList[h.volumeCur], t += '<span class="more more-lot iconfont icon-xiangxiajiantou"></span>'),
                                _this.elems.trade_count.html(t);
                            },
                            complete:function(){
                                var a=[],b=[],c,d,e=[],f=[];
                                 h.cashFund=[];
                                 J1=[],J2=[];
                                for(var i=0;i<J.length;i++){
                                    if(J[i].fundType==0){
                                        a.push(J[i].maxLoss);
                                        c=J[i].counterFee;
                                        e.push(J[i].cashFund);
                                        J1.push(J[i]);
                                    }else{
                                        b.push(J[i].maxLoss);
                                        d=J[i].counterFee;
                                        f.push(J[i].cashFund);
                                        J2.push(J[i]);
                                    }
                                   
                                }
                                L.tradeType==1?h.stopLossList=a:h.stopLossList=b;
                                L.tradeType==1?h.chargeUnit=c:h.chargeUnit=d;
                                L.tradeType==1?h.cashFund=e:h.cashFund=f;
                                _this.updateStopProfit();
                                _this.updateStopLoss();
                                _this.updateServiceFee();
                                _this.updateDeposit();
                                _this.updatePay();
                            }
                        });
                       
                    },
                    updateStopProfit: function () {
                        var e = h.volumeList[h.volumeCur],
                        _html="",
                        l=L.tradeType==1?J1[h.stopPlCur]:J2[h.stopPlCur],
                        t = l.maxProfit.split(","),
                        f = Math.max.apply(null, t),
                        i = '<span class="trigger ${selected}" data-value="${price}" data-index="${index}">${price}元</span>';

                         this.elems.stop_profit.text(f + "元"),
                         L.stopProfit = f

                        //  h.stopProCur < 3 ? (t.forEach(function (s, n) {
                        //     n < 3&& (_html += o.format(i, {
                        //         price: s ,
                        //         index: n,
                        //         selected: n === h.stopProCur ? "selected" : ""
                        //     }), n === h.stopProCur && (L.stopProfit = s))
                        // }), t.length > 3 && (_html += '<span class="more more-trigger iconfont icon-xiangxiajiantou"></span>')) : (_html += o.format(i, {
                        //     price: t[h.stopProCur] ,
                        //     index: h.stopProCur,
                        //     selected: "selected"
                        // }), L.stopProfit = t[h.stopProCur] , _html += '<span class="more more-trigger iconfont icon-xiangxiajiantou"></span>'),
                        // this.elems.stop_profit.html(_html);
                       
                    },
                    updateStopLoss: function () {
                        var e = "",
                        t = h.volumeList[h.volumeCur],
                        i = '<span class="trigger ${selected}" data-value="${price}" data-index="${index}">${price}元</span>';
                        //var _list =h.stopLossList.sort(function(a,b){return a-b});
                        h.stopPlCur < h.stopPlShow ? (h.stopLossList.forEach(function (s, n) {
                            n < h.stopPlShow && (e += o.format(i, {
                                price: s ,
                                index: n,
                                selected: n === h.stopPlCur ? "selected" : ""
                            }), n === h.stopPlCur && (L.stopLoss = s ))
                        }), h.stopLossList.length > h.stopPlShow && (e += '<span class="more more-trigger iconfont icon-xiangxiajiantou"></span>')) : (e += o.format(i, {
                            price: h.stopLossList[h.stopPlCur] ,
                            index: h.stopPlCur,
                            selected: "selected"
                        }), L.stopLoss = h.stopLossList[h.stopPlCur] , e += '<span class="more more-trigger iconfont icon-xiangxiajiantou"></span>'),
                        this.elems.stop_loss.html(e)
                        K=L.tradeType==1?J1[h.stopPlCur]:J2[h.stopPlCur];
                    },
                    reverseBuy: function (t) {
                        if (null == t) return void (L.source = "下单");
                        L.source = "反向";
                        var i = this.elems,
                        s = i.trade_count,
                        o = i.stop_loss,
                        n = t.opVolume,
                        a = t.stopLoss;
                        s.children("span.lot").each(function () {
                            return e(this).data("value") == n ? (e(this).trigger("tap"), !1) : void 0
                        }),
                        o.children("span.trigger").each(function () {
                            return e(this).data("value") == a ? (e(this).trigger("tap"), !1) : void 0
                        })
                    },
                    c2list: function (e, t, i) {
                        var s = [];
                        return e.forEach(function (e, o) {
                            s.push({
                                name: e * t + i,
                                value: e * t,
                                index: o
                            })
                        }),
                        s
                    },
                    isValid: function () {
                        var e = _[h.contCode];
                        return e ? isNaN(L.price) || 0 === L.price ? (p.alert("请输入自定价格"), !1) : L.price < e.limit_down_price ? (p.alert("自定价格不能小于 " + e.limit_down_price), !1) : L.price > e.limit_up_price ? (p.alert("自定价格不能大于 " + e.limit_up_price), !1) : !0 : !0
                    }
                }
            });
        },
        "assets/js/lang/mod-loader": function () {
            define(function (require, n, i) {
                "use strict";
                var t = require("$"),
                c = require("_"),
                r = t("#doc"),
                f = function (n) {
                    return r.find(n).length
                },
                o = function (n) {
                    c.each(n,
                    function (n) {
                        c.isString(n) ? require.async(n,
                        function (n) {
                            n && n.init && n.init()
                        }) : n && n.init && n.init()
                    })
                };
                i.exports = function (n) {
                    c.isString(n) && (n = [n]),
                    c.isArray(n) ? o(n) : c.each(n,
                    function (n, i) {
                        f(i) && o(c.isArray(n) ? n : [n])
                    })
                }
            });
        },
        "assets/js/biz/page/trade/hash": function () {
            define(function (require) {
                "use strict";
                var t = require("_"),
                n = (require("log"), require("dataStore")),
                a = require("mod/observer"),
                i = n.get("config"),
                e = i.BASE,
                o = !1;
                return {
                    init: function () {
                        this.parse(),
                        this.wait(),
                        this.attach()
                    },
                    parse: function () {
                        var n = window.location.hash,
                        a = n ? n.substring(2) : i.tradeComm;
                        t.extend(i.base, e[a.toUpperCase()])
                    },
                    wait: function () {
                        var t = this,
                        n = function (n) {
                            n.state ? o && (window.location.href = n.state.jumpUrl) : t.notify()
                        };
                        window.addEventListener("popstate", n, !1)
                    },
                    attach: function () {
                        var t = this;
                        a.attach("changePageHash",
                        function (n) {
                            o = !0;
                            var a = {
                                jumpUrl: document.referrer
                            },
                            i = "#!" + n;
                            window.history.replaceState(a, document.title, i),
                            t.notify()
                        }),
                        a.attach("authFail",
                        function (t) {
                            ("no_login" === t || "no_signed" === t || "jump" === t) && (o = !1)
                        })
                    },
                    notify: function () {
                        this.parse(),
                        a.notify("pageHashChanged")
                    }
                }
            });
        },
        "assets/js/util/dom": function () {
            define(function (require) {
                "use strict";
                var e = require("$"),
                t = require("_"),
                n = {
                    create: function (e) {
                        return document.createElementNS("http://www.w3.org/2000/svg", e)
                    },
                    createText: function (e) {
                        return document.createTextNode(e)
                    },
                    append: function (e, t) {
                        return e.appendChild(t),
                        t
                    },
                    insert: function (e, t, n) {
                        return e.insertBefore(t, n),
                        t
                    },
                    remove: function (e) {
                        e.parentNode.removeChild(e)
                    },
                    query: function (e) {
                        return document.querySelector(e)
                    },
                    childs: function (e) {
                        if (e.children) return e.children;
                        for (var t = e.childNodes,
                        n = [], r = 0; r < t.length; r++) 1 === t[r].nodeType && n.push(t[r]);
                        return n
                    },
                    attr: function (e, r, i) {
                        if (t.isString(r) && null == i) return e.getAttribute(r);
                        if (t.isString(r)) {
                            if ("style" === r && t.isObject(i)) {
                                var u = "";
                                t.each(i,
                                function (e, t) {
                                    u += t + ":" + e + ";"
                                }),
                                i = u
                            }
                            i&&e.setAttribute(r, i);
                        } else t.each(r,
                        function (t, r) {
                            n.attr(e, r, t)
                        })
                    },
                    textContent: function (e, t) {
                        if (null == t) return e.firstChild.nodeValue;
                        var r = n.create("tspan");
                        n.append(r, n.createText(t)),
                        n.append(e, r)
                    },
                    getSize: function (t) {
                        var n = e(t);
                        return {
                            width: n.width(),
                            height: n.height()
                        }
                    }
                };
                return n
            });
        },
        "data/holidays/1.0/main": function () {
            define(function (require) {
                "use strict";
                var e = require("_"),
                t = {
                    2016: {}
                };
                return {
                    isHoliday: function (n) {
                        n = n || new Date,
                        n = n instanceof Date ? n : new Date(n);
                        var a = t[n.getFullYear()];
                        if (!a) return !1;
                        var r = a[n.getMonth() + 1];
                        return r ? e.contains(r, n.getDate()) : !1
                    },
                    isWeekend: function (e) {
                        e = e || new Date,
                        e = e instanceof Date ? e : new Date(e);
                        var t = e.getDay();
                        return 0 === t || 6 === t
                    }
                }
            });
        },
        "assets/js/lang/cookie":function(){
             define(function (require) {
                "use strict";
                return  {
                     setCookie:function(name, value, days){
                        if(days){
                            var date = new Date();
                            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                            var expires = "; expires=" + date.toGMTString();
                        }else{
                            var expires = "";
                        }
                        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
                    },
                    getCookie:function(name){
                        var nameEQ = name + "=";
                        var ca = document.cookie.split(';');
                        for(var i = 0; i < ca.length; i++){
                            var c = ca[i];
                            while(c.charAt(0) == ' '){c = c.substring(1, c.length);}
                            if(c.indexOf(nameEQ) == 0){return decodeURIComponent(c.substring(nameEQ.length, c.length));}
                        }
                        return null;
                    },
                    deleteCookie:function(name){
                        this.setCookie(name, "", -1);
                    },
                    setItem:function(key,value){
                        if(window.localStorage){
                            localStorage.setItem(key,value);
                        }else{
                            this.setCookie(key,value,3650);
                        }
                    },
                    getItem:function(key){
                        return  window.localStorage?localStorage.getItem(key):this.getCookie(key);
                    },
                    removeItem:function(key){
                        if(window.localStorage){
                            localStorage.removeItem(key);
                        }else{
                            this.deleteCookie(key);
                        }
                    }
                }
            });
        },
        "data/contract/1.0/main": function () {
            define(function (require) {
                "use strict";
                var e = require("util/dates"),
                r = require("data/holidays"),
                t = [["09:15", "11:30"], ["13:00", "15:15"]],
                i = [[["21:00", "24:00"], ["00:00", "02:30"]], [["09:00", "10:15"], ["10:30", "11:30"], ["13:30", "15:00"]]],
                a = [[["21:00", "23:00"]], [["09:00", "10:15"], ["10:30", "11:30"], ["13:30", "15:00"]]],
                n = [[["21:00", "23:30"]], [["09:00", "10:15"], ["10:30", "11:30"], ["13:30", "15:00"]]],
                o = [[["21:00", "24:00"], ["00:00", "01:00"]], [["09:00", "10:15"], ["10:30", "11:30"], ["13:30", "15:00"]]],
                f = [["09:14", "11:31"], ["12:59", "15:16"]],
                s = [["08:59", "10:16"], ["10:29", "11:31"], ["13:29", "15:01"], ["20:59", "23:59"], ["00:00", "02:31"]],
                u = [["08:59", "10:16"], ["10:29", "11:31"], ["13:29", "15:01"], ["20:59", "23:01"]],
                c = [["08:59", "10:16"], ["10:29", "11:31"], ["13:29", "15:01"], ["20:59", "23:31"]],
                d = [["08:59", "10:16"], ["10:29", "11:31"], ["13:29", "15:01"], ["20:59", "23:59"], ["00:00", "01:01"]],
                 
                l = {
                    IF: t,
                    IC: t,
                    IH: t,
                    TF: t,
                    AU: i,
                    AG: i,
                    RU: a,
                    SR: n,
                    CU: o,
                    NI: o,
                    PP:o,
                    RB:o
                },
                m = {
                    IF: f,
                    IC: f,
                    IH: f,
                    TF: f,
                    AU: s,
                    AG: s,
                    RU: u,
                    SR: c,
                    CU: d,
                    NI: d,
                    PP:d,
                    RB:d
                };
                return {
                    getCommCode: function (e) {
                        return e && e.replace(/\d+/g, "").toUpperCase()
                    },
                    getQueryPeriod: function (e) {
                        return m[e]
                    },
                    getTitlePeriod: function (e, r) {
                        var t = l[e];
                        if (t[0][0] instanceof Array) {
                            var i = t[1],
                            a = t[0],
                            n = i[0][0].replace(":", "") - 0,
                            o = a[0][0].replace(":", "") - 0;
                            t = r >= n && o > r ? i : a
                        }
                        return t
                    },
                    isInPeriod: function (t) {
                        var i = new Date,
                        a = i.getDay(),
                        n = !1;
                        if (0 === a) return n;
                        var o = this.getCommCode(t),
                        f = this.getQueryPeriod(o),
                        s = e.format(i, "h:m");
                        return f.forEach(function (e) {
                            var t = e[0],
                            i = e[1];
                            6 === a ? "00:00" === t && s >= t && i >= s && (n = !0) : 1 === a ? "00:00" !== t && s >= t && i >= s && (n = !r.isHoliday()) : s >= t && i >= s && (n = !r.isHoliday())
                        }),
                        n
                    },
                    getTipsForNextTime: function (t) {
                        var i = l[t],
                        a = new Date,
                        n = e.format(a, "h:m");
                        i[0][0] instanceof Array && (i = i[1].slice().concat(i[0]));
                        for (var o, f, s = i.length,
                        u = 0; s > u; u++) if (o = i[u], "00:00" !== o[0] && o[0] > n) {
                            f = o[0];
                            break
                        }
                        var c = i[0][0],
                        d = i[s - 1][1],
                        m = "今天 ",
                        g = function () {
                            for (var t = 0; t++, a.setDate(a.getDate() + 1), r.isWeekend(a) || r.isHoliday(a) ;);
                            f = c,
                            m = 1 >= t ? "明天 " : e.format(a, "M月D日 ", !0)
                        };
                        return r.isWeekend(a) || r.isHoliday(a) ? g() : d > c && n > d && g(),
                        "已休市，下次交易时间<em>" + m + (f || c) + "</em>"
                    }
                }
            });
        },
        "assets/js/util/numbers": function () {
            define(function () {
                "use strict";
                var r = {
                    u: function (n, u) {
                        u || (u = 0),
                        r.isS(n) && (n = r.f(n));
                        var o;
                        return n > 0 ? 1e5 > n ? r.round(n) : (1e8 > n ? (n /= 1e4, o = "万") : (n /= 1e8, o = "亿"), 0 == u ? r.round(n, 2).toFixed(2) + o : 1 == u ? n >= 100 ? r.round(n) + o : r.round(n, 2).toFixed(2) + o : 2 == u ? n >= 100 ? r.round(n) + o : r.round(n, 1).toFixed(1) + o : r.round(n) + o) : 0 > n ? n > -1e5 ? r.round(n) : (n > -1e8 ? (n /= 1e4, o = "万") : (n /= 1e8, o = "亿"), 0 == u ? r.round(n, 2).toFixed(2) + o : 1 == u ? -100 >= n ? r.round(n) + o : r.round(n, 2).toFixed(2) + o : 2 == u ? -100 >= n ? r.round(n) + o : r.round(n, 1).toFixed(1) + o : r.round(n) + o) : "0"
                    },
                    round: function (r, n) {
                        if (n || (n = 0), 0 >= n) return Math.round(r);
                        for (var u = 1,
                        o = 0; n > o; o++) u *= 10;
                        return Math.round(r * u) / u
                    },
                    isS: function (r) {
                        return "string" == typeof r
                    }
                };
                return {
                    format: function (r) {
                        if ("number" != typeof r) return r + "";
                        for (var n = 0 > r ? "-" : "", u = Math.abs(r) + "", o = u.length, t = "", e = 0; o-- > 0;) e++,
                        t = u.charAt(o) + t,
                        e % 3 === 0 && 0 !== o && (e = 0, t = "," + t);
                        return n + t
                    },
                    money: function (r) {
                        var n = 0 | r,
                        r = r + "",
                        u = r.indexOf(".");
                        return this.format(n) + (-1 === u ? "" : r.substring(u))
                    },
                    shrink: function (n) {
                        return "number" == typeof n ? r.u(n) : n
                    },
                    fill: function (r) {
                        return (10 > r ? "0" : "") + r
                    }
                }
            });
        },
        "assets/js/ui/chart/sline/1.0/main": function () {
            define(function (require) {
                "use strict";
                var t = require("_"),
                i = (require("log"), require("util/dom")),
                e = (require("util/dates"), require("util/numbers")),
                h = "red",
                s = "#e8e8e8",
                r = "#f8f8f8",
                n = "#2f84cc",
                a = "#888",
                o = "#d0402d",
                l = "#17b03e",
                c = 5e-4,
                u = .005,
                m = 2e-4,
                d = .002,
                g = c,
                x = u,
                p = 7,
                v = function (t) {
                    this.svg = t.svg,
                    this.data = t.data || {},
                    this.quoteTime = null,
                    this.period = null,
                    this.close = 0,
                    this.open = 0,
                    this.limitUp = 0,
                    this.limitDown = 0,
                    this.scale = 2,
                    this.code = "",
                    this.moments = null,
                    this.init()
                };
                return v.prototype = {
                    init: function () {
                        this.resize(),
                        this.cacheEl = [],
                        this.gPricesEl = i.childs(this.svg)[1],
                        this.gVolumesEl = i.childs(this.svg)[2],
                        this.gHeartbeat = i.childs(this.svg)[3],
                        this.pathEl = null,
                        this.pathBgEl = null,
                        this.maxPrice = 0,
                        this.minPrice = 0,
                        this.maxVolume = 0,
                        this.minVolume = 0,
                        this.beginPrice = 0,
                        this.endPrice = 0
                    },
                    resize: function () {
                        this.svgWidth = i.getSize(this.svg).width,
                        this.svgHeight = i.getSize(this.svg).height;
                        var t = 20;
                        this.priceChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: 0,
                                end: .9 * this.svgHeight,
                                height: .9 * this.svgHeight
                            }
                        },
                        this.volumeChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: this.priceChartBox.y.end + t,
                                end: this.svgHeight,
                                height: this.svgHeight - this.priceChartBox.y.height - t
                            }
                        }
                    },
                    setHeartbeat: function (t, e, h) {
                        this.heartbeatEl_1 || (this.heartbeatEl_1 = i.childs(this.gHeartbeat)[0], this.heartbeatEl_2 = i.childs(this.gHeartbeat)[1]),
                        2 !== arguments.length ? t ? (i.attr(this.gHeartbeat, "class", ""), i.attr(this.heartbeatEl_1, "class", "heartbeat"), i.attr(this.heartbeatEl_2, "class", "heartbeat")) : (i.attr(this.gHeartbeat, "class", "hide"), i.attr(this.heartbeatEl_1, "class", ""), i.attr(this.heartbeatEl_2, "class", "")) : (h = e, e = t),
                        null != e && null != h && (i.attr(this.heartbeatEl_1, {
                            cx: e,
                            cy: h
                        }), i.attr(this.heartbeatEl_2, {
                            cx: e,
                            cy: h
                        }))
                    },
                    draw: function (t) {
                        var i = function () {
                            t && this._setConfig(t),
                            t && t.data && (this.data = t.data, this._setMaxMin())
                        };
                        this._draw(i)
                    },
                    perDraw: function (t, i) {
                        var e = function () {
                            i && this._setConfig(i),
                            this.data[t.time] = t,
                            this.maxPrice = Math.max(this.maxPrice, t.current),
                            this.minPrice = Math.min(this.minPrice > 0 ? this.minPrice : t.current, t.current),
                            this.maxVolume = Math.max(this.maxVolume, t.volume),
                            this.minVolume = Math.min(this.minVolume > 0 ? this.minVolume : t.volume, t.volume)
                        };
                        this._limit(t,
                        function () {
                            this._draw(e)
                        })
                    },
                    _draw: function (t) {
                        t.call(this),
                        this._clear(),
                        this._drawFramework(),
                        Object.keys(this.data).length ? this._drawChart() : this._drawBasePriceLine()
                    },
                    _clear: function () {
                        t.each(this.cacheEl,
                        function (t) {
                            t && i.remove(t)
                        }),
                        this.cacheEl.length = 0
                    },
                    _drawFramework: function () {
                        var t = this.cacheEl,
                        e = i.childs(this.gPricesEl)[0];
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.end, this.priceChartBox.x.end, this.priceChartBox.y.end, s, "", e)),
                        t.push(this._line(this.gVolumesEl, this.volumeChartBox.x.begin, this.volumeChartBox.y.begin, this.volumeChartBox.x.end, this.volumeChartBox.y.begin, s)),
                        t.push(this._line(this.gVolumesEl, this.volumeChartBox.x.begin, this.volumeChartBox.y.begin + this.volumeChartBox.y.height / 2, this.volumeChartBox.x.end, this.volumeChartBox.y.begin + this.volumeChartBox.y.height / 2)),
                        t.push(this._line(this.gVolumesEl, this.volumeChartBox.x.begin, this.volumeChartBox.y.end - .5, this.volumeChartBox.x.end, this.volumeChartBox.y.end - .5))
                    },
                    _drawBasePriceLine: function () {
                        var t = this.cacheEl;
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin, this.priceChartBox.x.end, this.priceChartBox.y.begin)),
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height)),
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height))
                    },
                    _drawChart: function () {
                        this._drawPeriodLine(),
                        this._drawPriceLine(),
                        this._drawPath(),
                        this._drawBar()
                    },
                    _drawPeriodLine: function () {
                        var e = this,
                        h = this.priceChartBox.x,
                        s = this.priceChartBox.y,
                        r = this.gPricesEl,
                        n = this.cacheEl,
                        a = i.childs(r)[0],
                        o = this.period.length,
                        l = this.moments.length,
                        c = o - 1,
                        u = 0,
                        m = function (t) {
                            var i = t.split(":"),
                            e = i[0] - 0,
                            h = i[1] - 0;
                            return 60 * e + h
                        };
                        t.each(this.period,
                        function (t, i) {
                            var o = t[0],
                            d = t[1];
                            if (n.push(e._text(r, 0 === i ? u + 1 : u - 15, s.end + 14, o)), i === c) u = h.width - 31,
                            n.push(e._text(r, u, s.end + 14, d));
                            else {
                                var g = m(d) - m(o);
                                0 > g && (g += 1440),
                                u += g / l * h.width - .25,
                                n.push(e._line(r, h.begin + u, s.begin, h.begin + u, s.end, "", "", a))
                            }
                        })
                    },
                    _drawPriceLine: function () {
                        var t = this.maxPrice,
                        i = this.minPrice,
                        s = this.close,
                        r = this.open,
                        n = this.limitUp,
                        a = this.limitDown;
                        t += r * g,
                        i -= r * g;
                        var c = (t - i) / r;
                        x > c && (c = (x - c) / 2, t += r * c, i -= r * c),
                        t = t > n && n > 0 ? n : t,
                        i = a > i ? a : i,
                        this.beginPrice = t,
                        this.endPrice = i;
                        var _rangePrice = (t - i)/p;
                        for (var u = this.cacheEl,
                        m = this.pathBgEl,
                        d = this.gPricesEl,
                        v = this.priceChartBox.x,
                        _ = this.priceChartBox.y,
                        b = _.height / p,
                        f = 0; p > f; f++) {
                            var B = v.begin,
                            C = _.begin + f * b + (0 === f ? .5 : 0),
                            P = v.end,
                            D = P - 3,
                            E = C;
                            if(f==2|| f==4){
                                var a = (t-_rangePrice*f).toFixed(this.scale);

                                 u.push(this._text(d, D, C+10, a, "#888", "end", m))
                            }
                           
                            u.push(this._line(d, B, C, P, E, "", "", m))
                        }
                        var y, w, V, T = this.beginPrice - this.endPrice,
                        M = this.beginPrice - s,
                        B = v.begin,
                        C = _.begin + _.height * (M / T),
                        C = 0 > C ? -1e3 : C > _.height ? 1e3 : C;
                        P = v.end,
                        E = C,
                        u.push(this._line(d, B, C, P, E, h, "3,3", m)),
                        s <= this.minPrice ? (w = C + 14, w = w >= _.height - b ? C - 4 : w) : s >= this.maxPrice ? (w = C - 4, w = b >= w ? C + 14 : w) : w = C + (C < _.height / 2 ? 14 : -4),
                        y = v.end - 3,
                        V = "0.00%  "+s.toFixed(this.scale),
                        //u.push(this._text(d, y, w, V, "", "end", m)),
                        y = v.begin + 3,
                        //V = "0.00%",
                        u.push(this._text(d, y, w, V, "", "start", m)),
                        (0 > C || C >= _.begin + b / 2) && (y = v.end - 3, w = _.begin + 14, V = this.beginPrice.toFixed(this.scale), u.push(this._text(d, y, w, V, "#888", "end", m)), y = v.begin + 3, w = _.begin + 14, V = M / s * 100, V = (V >= 0 ? "+" : "") + V.toFixed(2) + "%", u.push(this._text(d, y, w, V, 0 > M ? l : o, "start", m))),
                        (C > _.height || C <= _.height - b / 2) && (M = this.endPrice - s, y = v.end - 3, w = _.end - 5, V = this.endPrice.toFixed(this.scale), u.push(this._text(d, y, w, V, "#888", "end", m)), y = v.begin + 3, w = _.end - 5, V = M / s * 100, V = (V >= 0 ? "+" : "") + V.toFixed(2) + "%", u.push(this._text(d, y, w, V, 0 > M ? l : o, "start", m))),
                        v = this.volumeChartBox.x,
                        _ = this.volumeChartBox.y,
                        d = this.gVolumesEl,
                        y = v.end - 3,
                        w = _.begin + (_.height / 2 - 10),
                        V = e.shrink(this.maxVolume),
                        u.push(this._text(d, y, w, V, "", "end"))
                    },
                    _drawPath: function () {
                        var i, e, h, s, r = this.priceChartBox.x,
                        n = this.priceChartBox.y,
                        a = this.beginPrice,
                        o = this.endPrice,
                        l = this.moments.length - 1,
                        c = r.width - .5 - .5,
                        u = n.height,
                        m = c / (this.moments.length - 2 + 1),
                        d = function (t) {
                            var i = 0 === t ? 0 : t === l ? r.end : 1 + m * t - .5,
                            i = i.toFixed(4) - 0;
                            return r.begin + i
                        },
                        g = function (t) {
                            var i = (a - t) / (a - o) * u,
                            i = 0 === i ? .5 : i;
                            return (n.begin + i).toFixed(4) - 0
                        },
                        x = function (t) {
                            return "M0," + g(t)
                        },
                        p = function (t) {
                            return "L" + d(t) + "," + (n.end - .5) + "L" + r.begin + "," + (n.end - .5) + "Z"
                        },
                        v = this,
                        _ = this.data,
                        b = "",
                        f = "";
                        t.each(this.moments,
                        function (t, r) {
                            if (!v._isTradeTime(t)) return !1;
                            var n = _[t];
                            null == n && (n = e, null == n && (n = {
                                current: v.close,
                                volume: 0,
                                time: t
                            })),
                            i = r,
                            e = n,
                            0 === r && (b += x(n.current)),
                            h = d(r),
                            s = g(n.current),
                            b += "L" + h + "," + s
                        }),
                        b && (f = b + p(i), this._path(b, f), this.setHeartbeat(h, s))
                    },
                    _drawBar: function () {
                        var i, e, h, s, r, n, a = this,
                        c = this.volumeChartBox.x,
                        u = this.volumeChartBox.y,
                        m = a.gVolumesEl,
                        d = this.cacheEl,
                        g = this.maxVolume,
                        x = this.moments.length - 1,
                        p = c.width - .5 - .5,
                        v = u.height - .5 - 1,
                        _ = p / (this.moments.length - 2 + 1),
                        b = function (t) {
                            var i = (1 + _ * t - .5).toFixed(4) - 0;
                            return c.begin + i
                        },
                        f = function (t) {
                            var i = (1 - t / g * .9) * v;
                            return (u.begin + .5 + i).toFixed(4) - 0
                        },
                        B = this.data;
                        t.each(this.moments,
                        function (t, g) {
                            if (!a._isTradeTime(t)) return !1;
                            var p = B[t];
                            if (null != p) {
                                var v = i ? i.volume : 0;
                                e = 0 === g ? .5 : g === x ? c.end - .5 : b(g),
                                h = f(p.volume),
                                s = e,
                                r = u.end - 1,
                                n = p.volume >= v ? o : l,
                                null == i && (n = p.current >= a.close ? o : l),
                                d.push(a._line(m, e, h, s, r, n)),
                                i = p
                            }
                        })
                    },
                    _path: function (t, e) {
                        this.pathEl || (this.pathEl = i.create("path"), this.pathBgEl = i.create("path"), i.attr(this.pathEl, {
                            stroke: n,
                            fill: "none"
                        }), i.attr(this.pathBgEl, {
                            stroke: "none",
                            fill: n,
                            "fill-opacity": "0.2"
                        }), i.append(this.gPricesEl, this.pathBgEl), i.append(this.gPricesEl, this.pathEl)),
                        i.attr(this.pathEl, "d", t),
                        i.attr(this.pathBgEl, "d", e)
                    },
                    _line: function (t, e, h, s, n, a, o, l) {
                        var c = i.create("line");
                        return i.attr(c, {
                            x1: e,
                            y1: h,
                            x2: s,
                            y2: n,
                            stroke: a || r
                        }),
                        o && i.attr(c, "stroke-dasharray", o),
                        l ? i.insert(t, c, l) : i.append(t, c),
                        c
                    },
                    _text: function (t, e, h, s, r, n, o) {
                        var l = i.create("text");
                        return i.attr(l, {
                            x: e,
                            y: h,
                            fill: r || a,
                            style: {
                                "text-anchor": n || "start"
                            }
                        }),
                        i.textContent(l, s),
                        o ? i.insert(t, l, o) : i.append(t, l),
                        l
                    },
                    _limit: function (t, i) {
                        this._last_code === this.code && this._last_time === t.time ? this._last_volume !== t.volume && i.call(this) : i.call(this),
                        this._last_code = this.code,
                        this._last_time = t.time,
                        this._last_volume = t.volume
                    },
                    _setConfig: function (t) {
                        t.quoteTime && (this.quoteTime = t.quoteTime),
                        null != t.close && (this.close = t.close),
                        null != t.open && (this.open = t.open),
                        t.period && (this.period = t.period, this.moments = this._period2moments()),
                        t.code && (this.code = t.code, this._setLimitPrice()),
                        t.limitUp && (this.limitUp = t.limitUp, this.limitDown = t.limitDown),
                        null != t.scale && (this.scale = t.scale, g = this.scale <= 2 ? c : m, x = this.scale <= 2 ? u : d)
                    },
                    _setMaxMin: function () {
                        var i = this,
                        e = this.data,
                        h = this.moments;
                        if (Object.keys(e).length) {
                            var s = -1;
                            this.maxPrice = 0,
                            this.minPrice = 0,
                            this.maxVolume = 0,
                            this.minVolume = 0,
                            this.beginPrice = 0,
                            this.endPrice = 0,
                            t.each(h,
                            function (t, h) {
                                if (i._isTradeTime(t)) {
                                    var r = e[t];
                                    if (null == r) return void s++;
                                    h === s && (r.volume = 0),
                                    i.maxPrice = Math.max(i.maxPrice, r.current),
                                    i.minPrice = Math.min(i.minPrice > 0 ? i.minPrice : r.current, r.current),
                                    i.maxVolume = Math.max(i.maxVolume, r.volume),
                                    i.minVolume = Math.min(i.minVolume > 0 ? i.minVolume : r.volume, r.volume)
                                }
                            })
                        }
                    },
                    _setLimitPrice: function () {
                        var t = .1;
                        /^S|^ST|.*ST/.test(this.code) && (t = .05),
                        this.limitUp = this.close * (1 + t),
                        this.limitDown = this.close * (1 - t)
                    },
                    _period2moments: function () {
                        var i = [];
                        t.each(this.period,
                        function (t) {
                            for (var h = t[0], s = t[1], r = h.split(":"), n = r[0] - 0, a = r[1] - 0, o = s.split(":"), l = o[0] - 0, c = o[1] - 0; l >= n && (60 === a && (n += 1, a = 0), !(n === l && a > c - 1)) ; a++) i.push(n + e.fill(a) - 0 + "")
                        });
                        var h = this.period[this.period.length - 1][1],
                        h = h.replace(":", "");
                        return this.quoteTime === h - 0 && i.push(h),
                        i
                    },
                    _isTradeTime: function (t) {
                        var i = this.moments[0] - 0,
                        e = this.moments[this.moments.length - 1] - 0,
                        h = t - 0,
                        s = this.quoteTime;
                        if (i > e) {
                            if (s >= i && 2400 > s) return h >= i && s >= h;
                            if (h >= i && 2400 > h) return !0
                        }
                        return s >= h
                    }
                },
                v
            });
        },
        "assets/js/biz/page/trade/sline": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                e = (require("_"), require("log")),
                i = require("net"),
                n = require("dataStore"),
                a = require("util/dates"),
                o = require("util/timer"),
                c = require("util/dom"),
                r = require("data/contract"),
                s = require("mod/observer"),
                u = require("ui/sline"),
                l = require("ui/loading"),
                h = n.get("config"),
                d = h.base,
                f = d.contCode,
                m = n.get("urlSline"),
                p = {},
                w = {},
                g = 0,
                v = 0,
                D = !0,
                _ = !0,
                S = !0,
                C = !1;
                return {
                    init: function () {
                        f = d.contCode,
                        this.wait(),
                        this.attach(),
                        this.initChart()
                    },
                    wait: function () {
                        var e, i = this;
                        t(window).on("resize",
                        function () {
                            e && e.clear(),
                            e = o.one(function () {
                                _ && S && D && i.resize()
                            },
                            100)
                        })
                    },
                    attach: function () {
                        var t = this;
                        s.attach("newQuoteData",
                        function (e) {
                            p = e,
                            D && C && t.newQuoteData()
                        }),
                        s.attach("newQuoteBegin",
                        function () {
                            t.sline.setHeartbeat(!0)
                        }),
                        s.attach("newQuoteEnd",
                        function () {
                            t.sline.setHeartbeat(!1)
                        }),
                        s.attach("changeContract",
                        function (e) {
                            C = !1,
                            f = e,
                            w = {},
                            D && t.querySlineData(e)
                        }),
                        s.attach("reloadData",
                        function () {
                            C = !1,
                            D && t.querySlineData(f)
                        }),
                        s.attach("chartSwitch",
                        function (e) {
                            C = !1,
                            D = "tick" === e,
                            w = {},
                            D && t.querySlineData(f)
                        }),
                        s.attach("pageSwitch",
                        function (t) {
                            _ = "page-quote" === t
                        }),
                        s.attach("panelSwitch",
                        function (t) {
                            S = "make" === t
                        })
                    },
                    initChart: function () {
                        this.sline = new u({
                            svg: t("#tick-sline")[0]
                        }),
                        this.resize(),
                        this.querySlineData(f)
                    },
                    querySlineData: function (t) {
                        var f = this,
                        a = this.showLoading();
                      
                        i.ajax({
                            url: '/futurequota/'+d.smallCode+'.fst',
                            dataType:'text',
                            type:'get',
                            data: {token:h.token},
                            success: function (i) {
                                f.hideLoading(a),
                                i ? f.beforeData(i, t) : e.error("查询分时图数据失败")
                            },
                            error: function (t, i) {
                                f.hideLoading(a),
                                e.error("分时接口异常", i)
                            }
                        })
                    },
                    beforeData:function(a,t){
                        var b=a.split('|'),
                        c=[];
                        for(var i=0;i<b.length-1;i++){
                            var o='';
                            var j=b[i].split(',');
                           
                            o=(d.smallCode=="au"?parseFloat(j[1]).toFixed(2):parseInt(j[1]))+","+parseInt(10000*Math.random())+","+this.changeTime(j[2]);
                            c.push(o);  
                        }
                        var kk=c.join(';');
                       this.processData(kk,t)
                    },
                    changeTime:function(t){
                        var a=parseInt(t.substring(8,12));
                      
                        return a;
                    },
                    processData: function (t, e) {
                        if (f === e) {
                            var i = this,
                            n = t ? t.split(";") : [],
                            c = {},
                            s = [];
                            n.forEach(function (t) {
                                s = t.split(","),
                                c[s[2]] = {
                                    current: s[0] - 0,
                                    volume: s[1] - 0,
                                    time: s[2]
                                }
                            }),
                            g = s[2] - 0,
                            v = s[3] ? s[3] - 0 : 0,
                            w[e] = c;
                            var u = function (t) {
                                var n = a.format(t.time, "hm") - 0;
                                i.sline.draw({
                                    data: c,
                                    quoteTime: n,
                                    open: t.open,
                                    close: t.settle_price_yes,
                                    limitUp: t.limit_up_price,
                                    limitDown: t.limit_down_price,
                                    period: r.getTitlePeriod(r.getCommCode(e), n),
                                    scale: d.scale,
                                    code: e
                                }),
                                C = !0
                            },
                            l = function () {
                                var t = p[e];
                                t ? u(t) : o.one(l, 200)
                            };
                            l()
                        }
                    },
                    newQuoteData: function () {
                        var t = w[f];
                        if (null != t) {
                            var e = p[f],
                            i = {
                                current: e.price,
                                volume: 0,
                                time: a.format(e.time, "hm") - 0 + ""
                            };
                            if (i.time - 0 !== g) {
                                if (null == t[i.time] && i.time - 1 !== g) {
                                    var n = t[i.time - 1];
                                    v += n ? n.volume : 0
                                }
                                i.volume = e.volume - v,
                                this.sline.perDraw(i, {
                                    quoteTime: i.time - 0,
                                    open: e.open,
                                    close: e.settle_price_yes,
                                    limitUp: e.limit_up_price,
                                    limitDown: e.limit_down_price,
                                    period: r.getTitlePeriod(r.getCommCode(f), i.time - 0),
                                    scale: d.scale,
                                    code: f
                                })
                            }
                        }
                    },
                    resize: function () {
                        var e = t(document).height(),
                        i = t("#tick-sline"),
                        n = i.offset(),
                        a = e - n.top - 60 -100-20;
                         (i.height(a), c.attr(i[0], "height", a)),
                        this.sline.resize(),
                        this.sline.draw({
                            data: w[f]
                        })
                    },
                    showLoading: function () {
                        return o.one(function () {
                            l.show()
                        },
                        1500)
                    },
                    hideLoading: function (t) {
                        t.clear(),
                        l.hide()
                    }
                }
            });
        },
        "assets/js/biz/mod/position": function () {
            define(function (require) {
                "use strict";
                var e = (require("$"), require("_")),
                s = (require("log"), require("dataStore")),
                t = require("util/dates"),
                c = require("util/strings"),
                a = require("data/contract"),
                w = s.get("config"),
                i = w.BASE,
                o2 = '<ul class="mod-list mod-list-std" data-index="${index}"><li class="clearfix"><span class="left">${commodity} (${contract})</span>${placeholder1}</li><li class="clearfix"><div class="left"><div class="title"><h3 class="${buy_dir_css}">${buy_dir_txt}${volume}手</h3><h3 class="income ${income_css}">${income_txt}</h3></div>${placeholder2}</div><div class="right"><div class="status ${block_css}"><span>${block_txt}</span></div></div></li><li class="action ${errmsg_css}"><span class="text-lesser">${tradeMsg}</span></li></ul>',
                o = '<ul class="mod-list mod-list-std" data-index="${index}"><li class="clearfix"><div class="title"><h3 class="${buy_dir_css}">${buy_dir_txt}<i class="${jt_css}"></i></h3><h3 class="${buy_dir_css}">${volume}手</h3><h3 class="income ${income_css}">${income_txt}</h3></div></li><li class="clearfix"><div class="left">${placeholder2}</div><div class="right"><div class="status ${block_css}"><span>${block_txt}</span></div></div></li><li class="action ${errmsg_css}"><span class="text-lesser">${tradeMsg}</span></li></ul>',

                l = c.format(o, {
                    placeholder1: '<time class="right text-lesser">${time}</time>',
                    placeholder2: '<p class="text-lesser"><span>止盈 ${stopProfit}元</span><span>${price1}</span></p><p class="text-lesser"><span>止损 ${stopLoss}元</span><span>${price2}</span></p><p class="text-lesser">平仓时间： ${time}</p>'
                }),
                p = c.format(o, {
                    placeholder1: '<span style="display:none" class="right text-lesser do-set-spsl">设置止盈止损</span>',
                    placeholder2: '<p class="text-lesser"><span>止盈 ${stopProfit}元</span><span>${price1}</span></p><p class="text-lesser"><span>止损 ${stopLoss}元</span><span>${price2}</span></p>'
                }),
                n = c.format(o, {
                    placeholder1: '<time class="right text-lesser">${time}</time>',
                    placeholder2: '<p class="text-lesser"><span>${price1}</span><span>${price2}</span></p>'
                });
                return {
                    renderSettle: function (e, s, t) {
                        return this._render(e, s, t, l)
                    },
                    renderOpenInterest: function (e, s, t) {
                        return this._render(e, s, t, p)
                    },
                    renderSimple: function (e, s, t) {
                        return this._render(e, s, t, n)
                    },
                    _render: function (s, r, o, l) {
                        r = r || {},
                        o = o || [];
                        var p = this,
                        n = "";
                        return s.forEach(function (s, d) {
                            var m = w.tradeComm,
                            u = s.price,
                            x = s.count,
                            h = s.tradeStatus,
                            v = (s.lossProfit||s.lossProfit==0)?s.lossProfit:(!s.tradeType?((_bidPrice-s.buyPrice)/s.count*w.futures.multiple):((s.buyPrice-_askPrice)/s.count*w.futures.multiple)),
                            _ = i[a.getCommCode(m)].scale,
                            $ = r[m] || {
                                price:  s.buyPrice
                            },
                            b = {
                                index: d,
                                time: s.createDate.toFixed ? t.format((s.status==6?s.saleDate:s.createDate), "y-M-D h:m:s") : (s.status==6?s.saleDate:s.createDate),
                                buy_dir_txt: s.tradeType ? "买跌" : "买涨",
                                buy_dir_css: s.tradeType ? "text-lows" : "text-highs",
                                income_txt: (v > 0 ? "+" : "") + v.toFixed(0),
                                income_css: v >= 0 ? "text-highs" : "text-lows",
                                jt_css:s.tradeType ? "jt-maidie" : "jt-maizhang",
                                errmsg_css: s.tradeMsg ? "" : "hide",
                                status: s.status,
                                price2:s.status==6?'平仓 <em>' +s.salePrice+ "</em>":'现价 <em class="lastPrice">' +(!s.tradeType ?_bidPrice.toFixed(_):_askPrice.toFixed(_))+ "</em>",
                            },
                            k = v;
                            s.commodity=i[a.getCommCode(m)].commName;
                            s.contract=i[a.getCommCode(m)].contCode;
                            switch (b.status) {
                                
                                case 1:
                                    o.push(m),
                                    k=0,
                                    b.volume = s.count,
                                    b.price1 = "买入 0" ,
                                    b.block_css = "normal",
                                    b.block_txt = "买处理中";
                                    break;
                                case 2:
                                    o.push(m),
                                    k=0,
                                    b.volume = s.count,
                                    b.price1 = "买入 0" ,
                                    b.block_css = "normal",
                                    b.block_txt = "申报成功";
                                    break;
                                case 3:
                                    o.push(m),
                                    b.volume = s.count,
                                    b.price1 = "买入 " + s.buyPrice.toFixed(_),
                                    b.block_css = "sold",
                                    b.block_txt = "平仓";
                                break;
                                case 4:
                                    o.push(m),
                                    b.volume = s.count,
                                    b.price1 = "买入 " + s.buyPrice.toFixed(_),
                                    b.block_css = "normal",
                                    b.block_txt =  "卖处理中";
                                    break;
                               case 5:
                                    o.push(m),
                                    b.volume = s.count,
                                    b.price1 = "买入 " + s.buyPrice.toFixed(_),
                                    b.block_css = "normal",
                                    b.block_txt =  "申报成功（卖）";
                                    break;
                                case 6:
                                   o.push(m),
                                    b.volume = s.count,
                                    b.price1 = "买入 " + s.buyPrice,
                                    b.block_css = "normal",
                                    b.block_txt =  "结算成功";
                                    break;
                              
                            }
                            n += c.format(l, e.extend({},
                            s, b))
                        }),
                        n
                    },
                    calcIncome: function (e, s) {
                        switch (s.tradeStatus) {
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                                var t, c = i[a.getCommCode(s.contCode)].unitPrice;
                                return t = s.isBuy ? e.price - s.opPrice : s.opPrice - (s.cpPrice || e.price),
                                c * s.opVolume * t
                        }
                        return 0
                    }
                }
            });
        },
        "assets/js/biz/mod/auth": function () {
            define(function (require) {
                "use strict";
                var n = (require("log"), require("dataStore")),
                w = require("assets/js/lang/cookie"),
                i = require("util/timer"),
                o = require("mod/observer"),
                e = n.get("config"),
                t = e.base,
                r = n.get("urlLogin"),
                g = n.get("urlSigned");
                return {
                    login: function () {
                        return e.isLogin === !1 && (o.notify("authFail", "no_login"), i.one(function () {
                            window.location.href = r + t.commCode
                        },
                        100)),
                        e.isLogin
                    },
                    isLogin: function () {
                        return e.isLogin
                    },
                    signed: function () {
                         t.signed = w.getItem(t.commCode+'Signed')?true:false;
                        return 1 === e.tradeType ? (t.signed === !1 && (o.notify("authFail", "no_signed"), i.one(function () {
                            window.location.href = g + "?commodity=" + t.commCode
                        },
                        100)), t.signed) : !0
                    }
                }
            });
        },
        "assets/js/biz/page/trade/open-interest": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                e = require("_"),
                n = require("log"),
                a = require("net"),
                i = require("dataStore"),
                o = require("data/contract"),
                s = (require("util/dates"), require("util/timer")),
                c = require("util/numbers"),
                d = require("mod/ajax-result"),
                r = require("mod/observer"),
                l = require("mod/position"),
                u = require("mod/auth"),
                f = require("ui/msgbox"),
                h = t("#doc"),
                p = h.find("div.float"),
                v = h.find("div.page-trade"),
                v2 = h.find("div.page-settle"),
                m = h.find("div.page-buy-lows"),
                g = v.find("section.main-trade"),
                F = g.find(".summary"),
                x = h.find("div.page-open-interest"),
                F2= x.find(".summary"),
                S = g.find("ul.mod-tab-sample"),
                w = x.find("div.lists"),
                y = '<div class="action"><a href="javascript:void(0)" class="button button-stress sold-all">全部卖出</a></div>',
                D = '<div class="empty-tips">暂无交易</div>',
                b = i.get("config"),
                C = b.BASE,
                q = [],
                B = null,
                I = {
                    token: b.token,
                    fundType:b.tradeType==1?0:1
                    // tradeType: b.tradeType,
                    // beginTime: ""
                },
                $ = i.get("urlScheme"),
                A = i.get("urlRevoke"),
                E = !0,
                P = !0,
                Q = !0;
                return {
                    init: function () {
                        this.initElems(),
                        this.initData(),
                        this.wait(),
                        this.attach()
                    },
                    initElems: function () {
                        var t = g.find("p.summary").find("em");
                        this.$balance = t.eq(0);
                        this.$incomeSum = h.find('.sumIncome em');
                    },
                    initData: function () {
                        var t = this;
                        if (u.isLogin()) {
                            var e = function () {
                                B ? t.queryData() : s.one(e, 300)
                            };
                            e()
                        }
                    },
                    wait: function () {
                        var e = this,
                        n = !1;
                        x.on("tap", "span.do-set-spsl",
                        function (e) {
                            e.preventDefault(),
                            v.hide(),
                            m.show();
                            var n = t(this).closest("ul.mod-list-std").data("index");
                            r.notify("pageSwitch", "page-sell", "sale-one", q[n])
                        }),
                        x.on("tap", "div.sold",
                        function (e) {
                            e.preventDefault();
                            var a = t(this).closest("ul.mod-list-std").data("index"),
                            i = q[a],
                            o = i.tradeType ? "text-highs" : "text-lows",
                            s = i.tradeType ? "买涨" : "买跌",
                            c = '<div class="text-s14 do-instant do-curr">即时卖出<span class="iconfont text-s22 do-checked"></span></div>';//<div class="text-s14 do-reverse">即时卖出<br>马上<em class="' + o + '">' + s + '</em><span class="iconfont text-s22 do-checked"></span></div>
                            n = !1,
                            //f.confirm(c,
                            //function () {
                            r.notify("doSaleOne", i, n ? "reverse" : "sale-one")
                            //})
                        }),
                         x.on('tap',"a.go-back",function(e){
                            e.preventDefault(),
                            x.hide(),
                            v.show(),
                            r.notify("pageSwitch", "page-quote")
                        });
                        x.on('tap',"a.go-settle",function(e){
                            e.preventDefault(),
                            x.hide(),
                            v2.show(),
                            r.notify("panelSwitch", "settle")
                        });
                        p.on("tap", "div.do-instant",
                        function (e) {
                            e.preventDefault();
                            var a = t(this);
                            a.siblings().removeClass("do-curr"),
                            a.addClass("do-curr"),
                            n = !1
                        }),
                        p.on("tap", "div.do-reverse",
                        function (e) {
                            e.preventDefault();
                            var a = t(this);
                            a.siblings().removeClass("do-curr"),
                            a.addClass("do-curr"),
                            n = !0
                        }),
                        h.find('a.fastsale').on('tap',function(){
                            require('page/trade/option');
                            r.notify("pageSwitch", "page-sell", "sale-all", q),
                            seajs.use('page/trade/sell',function(a){
                                v.hide(),
                                x.show(),
                                a.saleAll()

                             })
                        }),
                        x.on('tap','a.fast-sold-all',function(t){
                            t.preventDefault(),
                            r.notify("pageSwitch", "page-sell", "sale-all", q),
                            seajs.use('page/trade/sell',function(a){
                                a.saleAll();
                            })
                        })
                        x.on("tap", "a.sold-all",
                        function (t) {
                            t.preventDefault(),
                            x.hide(),
                            m.show(),
                            r.notify("pageSwitch", "page-sell", "sale-all", q),
                            e.delSoldAll()
                        }),
                        x.on("tap", "div.revoke",
                        function (e) {
                            e.preventDefault();
                            var n = t(this);
                            f.confirm("您确定要撤单吗",
                            function () {
                                var t = n.closest("ul.mod-list-std").data("index");
                                a.post({
                                    url: A,
                                    data: {
                                        bettingId: q[t].id
                                    }
                                })
                            })
                        })
                    },
                    attach: function () {
                        var t = this;
                        r.attach("panelSwitch",
                        function () {
                            P && t.queryData()
                        }),
                        r.attach("pageSwitch",
                        function () {
                            E && P && t.queryData()
                        }),
                        r.attach("newQuoteData",
                        function (e) {
                            B = e,
                            E && P && (t.newQuoteData(), t.calcIncome())
                        }),
                        r.attach("newQuoteBegin",
                        function () {
                            Q = !0
                        }),
                        r.attach("newQuoteEnd",
                        function () {
                            Q = !1
                        })
                    },
                    queryData: function () {
                        var t = this,
                        e = 1500,
                        i = 0,
                        o = function () {
                            I.futuresType=b.futures.id;
                            a.get({
                                url: $,
                                data: I,
                                success: function (e) {
                                    d.done(e,
                                    function () {
                                        if(e.code==41022){
                                            f.alert('您已在其他设备登录,请确认',function(){
                                                window.location.href="../user/login.html";
                                            });
                                        }
                                        var _data=b.tradeType==1?e.data.futuresCashOrderList:e.data.futuresScoreOrderList;
                                        //_data.isBuy=_data.tradeType?false:true;
                                        (e.code==200)? (E && P && Q && r(), q = _data, t.processData(_data), t.updateBalance(e)) : n.error("获取持仓数据失败")
                                    })
                                },
                                error: function (t, e) {
                                    n.error("获取持仓数据失败", e)
                                }
                            })
                        },
                        c = function () {
                            s.clear(i)
                        },
                        r = function () {
                            c(),
                            i = s.one(o, e).id
                        };
                        o(),
                        this.queryData = function () {
                            c(),
                            o()
                        }
                    },
                    processData: function (t) {
                        if (null != B) {
                            var n = [],
                            a = l.renderOpenInterest(t, B, n);
                            w.html(a ? a : D),
                            r.notify("appendContractQuery", e.union(n)),
                            this.showCount(t),
                            this. showSum(t),
                            this.addSoldAll(t)
                        }
                    },
                    showSum:function(t){
                        var n=t.length;
                         n>0?(F.eq(0).hide(),F.eq(1).show(),F2.show()):(F.eq(1).hide(),F2.hide(),F.eq(0).show())
                    },
                    showCount: function (t) {
                        var e = h.find("span.icon-unread"),
                        n = t.length;
                        e.toggleClass("hide", 0 === n),
                        n > 0 && e.text(100 > n ? n : "···")
                    },
                    addSoldAll: function (t) {
                        // var e = 0;
                        // if (t.length>1) {
                        //     var n = x.find('article').children("div.action");
                        //     0 === n.length ? x.find('article').append(y) : n.show()
                        // } else this.delSoldAll()
                    },
                    delSoldAll: function () {
                        x.find('article').children("div.action").hide()
                    },
                    newQuoteData: function () {
                        w.find("em[data-code]").each(function () {
                            var e = t(this),
                            n = e.data("code"),
                            a = B[n],
                            i = C[o.getCommCode(n)].scale;
                            e.text((a ? a.price : 0).toFixed(i))
                        })
                    },
                    calcIncome: function () {
                        var t = this,
                        e = w.children("ul.mod-list-std"),
                        n = 0;
                        q.forEach(function (a, i) {
                            var s = B[b.base.contCode] || {
                                price: !a.tradeType ? a.buyPrice : a.salePrice
                            },
                            c = 0;
                            // switch (a.tradeStatus) {
                            //     case 8:
                            //     case 9:
                            //     case 10:
                            //     case 11:
                            //     case 12:
                            //     case 13:
                                    var d, r = C[o.getCommCode(b.base.contCode)],_price,
                                    _ = r.scale,
                                    l = r.unitPrice;
                                    d = !a.buyPrice?0:(!a.tradeType ? _bidPrice - a.buyPrice : a.buyPrice - (a.salePrice || _askPrice)),
                                    c += l * a.count * d,
                                    n += c,
                                     _price = !a.tradeType ? _bidPrice:_askPrice,
                                    t.updateIncome(r, e, i, c,_price.toFixed(_))
                            // }
                        }),
                        this.updateIncomeSum(n)
                    },
                    updateIncome: function (t, e, n, a,p) {
                        var i = e.eq(n).find("h3.income");
                        var k = e.eq(n).find("em.lastPrice");
                        if (i[0]) {
                            var o = a >= 0 ? "text-highs" : "text-lows",
                            s = (a > 0 ? "+" : "") + a.toFixed(0);
                            i[0].className = "income " + o,
                            i.text(s),
                            k.text(parseFloat(p).toFixed(t.scale))

                        }
                    },
                    updateIncomeSum: function (t) {
                        if (this.$incomeSum[0]) {
                            var e = t >= 0 ? "text-highs text-l" : "text-lows text-l",
                            n = (t > 0 ? "+" : "") +(t/b.futures.rate).toFixed(2).replace(".00", "");
                            this.$incomeSum.attr('class',e),
                            this.$incomeSum.text(n)
                        }
                    },
                    updateBalance: function (t) {
                        this.$balance.text(c.money(t.balance))
                    }
                }
            });
        },
        "assets/js/ui/chart/tick/1.0/main": function () {
            define(function (require) {
                "use strict";
                var t = require("_"),
                i = (require("log"), require("util/dom")),
                e = "#ccc",
                h = "#f8f8f8",
                s = "#2f84cc",
                a = "#888",
                n = "#fff",
                r = 5e-4,
                c = r,
                g = 2e-4,
                l = 1e-4,
                o = 20,
                d = 30,
                u = 120,
                _ = !0,
                f = function (t) {
                    this.svg = t.svg,
                    this.open = 0,
                    this.price = 0,
                    this.volume = 0,
                    this.time = 0,
                    this.scale = 0,
                    this.code = "",
                    this._setConfig(t),
                    this.init()
                };
                return f.prototype = {
                    init: function () {
                        this.gRangeEl = i.childs(this.svg)[1],
                        this.gTickEl = i.childs(this.svg)[2],
                        this.gHeartbeat = i.childs(this.svg)[3],
                        this.cacheEl = [],
                        this.pathEl = null,
                        this.ranges = [],
                        this.prices = [],
                        this.maxPrice = 0,
                        this.minPrice = 0,
                        this.initPrice = 0,
                        this.isChanged = !1,
                        this.resize(),
                        this._drawFramework()
                    },
                    resize: function () {
                        var t = i.getSize(this.svg),
                        e = 10;
                        this.svgWidth = t.width,
                        this.svgHeight = t.height,
                        this.chartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: 0,
                                end: this.svgHeight,
                                height: this.svgHeight
                            }
                        },
                        this.priceChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: e,
                                end: this.svgHeight - e,
                                height: this.svgHeight - 2 * e
                            }
                        },
                        this.tickChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: e,
                                end: this.svgHeight - e,
                                height: this.svgHeight - 2 * e
                            }
                        }
                    },
                    clear: function () {
                        r = c,
                        this.ranges.length = 0,
                        this.prices.length = 0,
                        this.maxPrice = 0,
                        this.minPrice = 0,
                        this.initPrice = 0,
                        this.isChanged = !1
                    },
                    setHeartbeat: function (t, e, h) {
                        this.heartbeatEl_1 || (this.heartbeatEl_1 = i.childs(this.gHeartbeat)[0], this.heartbeatEl_2 = i.childs(this.gHeartbeat)[1]),
                        2 !== arguments.length ? t ? (i.attr(this.gHeartbeat, "class", ""), i.attr(this.heartbeatEl_1, "class", "heartbeat"), i.attr(this.heartbeatEl_2, "class", "heartbeat")) : (i.attr(this.gHeartbeat, "class", "hide"), i.attr(this.heartbeatEl_1, "class", ""), i.attr(this.heartbeatEl_2, "class", "")) : (h = e, e = t),
                        null != e && null != h && (i.attr(this.heartbeatEl_1, {
                            cx: e,
                            cy: h
                        }), i.attr(this.heartbeatEl_2, {
                            cx: e,
                            cy: h
                        }))
                    },
                    toggle: function () {
                        return _ = !_
                    },
                    _drawFramework: function () {
                        var t = this.chartBox.x,
                        i = this.chartBox.y;
                        this._line(this.svg, 0, i.begin + .5, t.end, i.begin + .5, h),
                        this._line(this.svg, 0, i.end - .5, t.end, i.end - .5, h)
                    },
                    addPrice: function (t) {
                        t && this._setConfig(t),
                        this._hasTrading() && this._scrollPrices()
                    },
                    draw: function (t) {
                        t && this._setConfig(t),
                        this._hasTrading() && this._draw()
                    },
                    _draw: function () {
                        this._drawBefore(),
                        this._drawPriceRange(),
                        this._drawTick()
                    },
                    _drawBefore: function () {
                        this._clear(),
                        this._scrollPrices(),
                        this._setMaxMin(),
                        this._calcRange(this.price)
                    },
                    _clear: function () {
                        t.each(this.cacheEl,
                        function (t) {
                            t && i.remove(t)
                        }),
                        this.cacheEl.length = 0
                    },
                    _drawPriceRange: function () {
                        var i = this,
                        s = this.cacheEl,
                        n = this.gRangeEl,
                        r = this.priceChartBox.x,
                        c = this.priceChartBox.y,
                        g = this.ranges,
                        l = this.scale,
                        o = this.open,
                        d = this._getTextSize(g[0].toFixed(l)),
                        u = c.height / (g.length - 1);
                        t.each(g,
                        function (t, g) {
                            var _ = t === o || t === i.initPrice,
                            f = r.begin,
                            x = c.begin + u * g,
                            x = x.toFixed(4) - 0,
                            p = r.end - d - 2,
                            v = x,
                            b = h;
                            s.push(i._line(n, f, x, p, v, b)),
                            p += 2,
                            x += 4,
                            b = _ ? a : e,
                            t = t.toFixed(l),
                            s.push(i._text(n, p, x, t, b))
                        })
                    },
                    _drawTick: function () {
                        var i = this.cacheEl,
                        e = this.tickChartBox.x,
                        h = this.tickChartBox.y,
                        a = this.ranges,
                        r = a[0],
                        c = a[a.length - 1],
                        g = r - c,
                        l = h.height,
                        o = e.width / u,
                        d = "",
                        _ = 0,
                        f = 0,
                        x = 0,
                        p = 0;
                        t.each(this.prices,
                        function (t, i) {
                            var e = 0 === i ? "M" : "L";
                            _ = o * i,
                            _ = _.toFixed(4) - 0,
                            f = h.begin + (r - t) / g * l,
                            f = f.toFixed(4) - 0,
                            d += e + _ + "," + f,
                            x = _,
                            p = f
                        });
                        var v = this.price.toFixed(this.scale),
                        b = this._getTextSize(v);
                        _ = e.width - b - 2,
                        _ = _.toFixed(4) - 0,
                        this._path(d + "L" + _ + "," + f),
                        this.setHeartbeat(x, p);
                        var m = _,
                        E = f - 7,
                        P = 3,
                        o = b + 1,
                        w = 14;
                        i.push(this._rect(this.gTickEl, m, E, P, o, w, s)),
                        _ += 3,
                        f += 4,
                        i.push(this._text(this.gTickEl, _, f, v, n))
                    },
                    _scrollPrices: function () {
                        var t = this.tickChartBox.x,
                        i = this.prices,
                        e = this.price,
                        h = this._getTextSize(e.toFixed(this.scale)),
                        s = t.width / u;
                        i.push(e),
                        s * i.length > t.width - h - 20 && i.shift()
                    },
                    _calcRange: function (t) {
                        var i = this.ranges,
                        e = i.length;
                        if (0 === e) this._setRange();
                        else {
                            var h = this.scale,
                            s = i[0],
                            a = i[e - 1],
                            n = function () {
                                s *= 1 + r,
                                s = s.toFixed(h) - 0,
                                i.unshift(s),
                                t > s && n()
                            },
                            c = function () {
                                a *= 1 - r,
                                a = a.toFixed(h) - 0,
                                i.push(a),
                                a > t && c()
                            };
                            t > s ? n() : a > t && c(),
                            this._ifOverMinHeight(),
                            this._reduceRange()
                        }
                    },
                    _ifOverMinHeight: function () {
                        var t = this.priceChartBox.y.height,
                        i = this.ranges.length - 1;
                        o > t / i && (r += l, this._setRange(), this._calcRange(this.maxPrice), this._calcRange(this.minPrice))
                    },
                    _reduceRange: function () {
                        this.isChanged && (this.isChanged = !1, r = c, this._setRange(), this._calcRange(this.maxPrice), this._calcRange(this.minPrice))
                    },
                    _setRange: function () {
                        var t = this.priceChartBox.y.height,
                        i = this.ranges,
                        e = this.scale,
                        h = this.initPrice,
                        s = h,
                        a = 1;
                        for (i.length = 0, i.push(h) ; ;) if (a += 2, h *= 1 + r, s *= 1 - r, h = h.toFixed(e) - 0, s = s.toFixed(e) - 0, i.unshift(h), i.push(s), d > t / (a - 1)) {
                            i.shift(),
                            i.pop();
                            break
                        }
                    },
                    _setMaxMin: function () {
                        var i = 0,
                        e = 0;
                        t.each(this.prices,
                        function (t) {
                            i = t > i ? t : i,
                            e = e > t ? t : 0 === e ? t : e
                        }),
                        this.maxPrice > 0 && (this.isChanged = this.maxPrice !== i || this.minPrice !== e, this.isChanged && (this.initPrice = this.prices[0])),
                        this.maxPrice = i,
                        this.minPrice = e
                    },
                    _hasTrading: function () {
                        var t = !1;
                        return _ ? (this._last_code === this.code ? this._last_volume !== this.volume && (t = !0) : t = !0, this._last_code = this.code, this._last_volume = this.volume, t) : !0
                    },
                    _setConfig: function (t) {
                        null != t.open && (this.open = t.open),
                        null != t.price && (this.price = t.price, 0 === this.initPrice && (this.initPrice = t.price)),
                        null != t.volume && (this.volume = t.volume),
                        t.time && (this.time = t.time),
                        null != t.scale && (this.scale = t.scale, r = this.scale > 2 ? g : c),
                        t.code && (this.code = t.code)
                    },
                    _getTextSize: function (t) {
                        var i = t.indexOf("."),
                        e = t.replace(".", "");
                        return 8 * e.length + (-1 === i ? 0 : 2)
                    },
                    _path: function (t) {
                        this.pathEl || (this.pathEl = i.create("path"), i.attr(this.pathEl, {
                            stroke: s,
                            fill: "none"
                        }), i.append(this.gTickEl, this.pathEl)),
                        i.attr(this.pathEl, "d", t)
                    },
                    _line: function (t, e, s, a, n, r, c, g) {
                        var l = i.create("line");
                        return i.attr(l, {
                            x1: e,
                            y1: s,
                            x2: a,
                            y2: n,
                            stroke: r || h
                        }),
                        c && i.attr(l, "stroke-dasharray", c),
                        g ? i.insert(t, l, g) : i.append(t, l),
                        l
                    },
                    _rect: function (t, e, h, s, a, n, r, c, g) {
                        var l = i.create("rect");
                        return i.attr(l, {
                            x: e,
                            y: h,
                            rx: s || 0,
                            ry: s || 0,
                            width: a,
                            height: n,
                            fill: r,
                            stroke: g || r,
                            "stroke-width": c || "0"
                        }),
                        i.append(t, l),
                        l
                    },
                    _text: function (t, e, h, s, n, r, c) {
                        var g = i.create("text");
                        return i.attr(g, {
                            x: e,
                            y: h,
                            fill: n || a,
                            style: {
                                "text-anchor": r || "start"
                            }
                        }),
                        i.textContent(g, s),
                        c ? i.insert(t, g, c) : i.append(t, g),
                        g
                    }
                },
                f
            });
        },
        "assets/js/biz/page/trade/tick": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                i = (require("_"), require("log"), require("net"), require("dataStore")),
                e = (require("util/dates"), require("util/timer")),
                n = require("mod/observer"),
                a = require("ui/tick"),
                c = require("ui/loading"),
                o = require("ui/msgbox"),
                u = t("#doc"),
                r = u.find("div.page-trade"),
                d = r.find("section.main-trade"),
                h = i.get("config"),
                f = h.base,
                s = {},
                l = "",
                g = !1,
                v = !1,
                w = !1;
                return {
                    init: function () {
                        l = f.contCode,
                        this.wait(),
                        this.attach()
                    },
                    wait: function () {
                        var t = this;
                        d.find("div.stock-detail").on("taphold",
                        function (i) {
                            if (i.preventDefault(), t.tick) {
                                var e = t.tick.toggle();
                                o.toast("切换至 " + (e ? "按交易次数" : "每秒") + "更新闪电图")
                            }
                        })
                    },
                    attach: function () {
                        var t = this;
                        n.attach("newQuoteData",
                        function (i) {
                            if (s = i, v) t.newQuoteData();
                            else if (t.tick) {
                                var e = i[l];
                                t.tick.addPrice({
                                    price: e.price,
                                    volume: e.volume,
                                    code: e.code
                                })
                            }
                        }),
                        n.attach("changeContract",
                        function (i) {
                            l = i,
                            t.tick && t.tick.clear(),
                            v && t.newQuoteData()
                        }),
                        n.attach("chartSwitch",
                        function (i) {
                            v = "lightning" === i,
                            v && (g || t.initChart(), t.newQuoteData(!0))
                        }),
                        n.attach("newQuoteBegin",
                        function () {
                            w = !0
                        }),
                        n.attach("newQuoteEnd",
                        function () {
                            w = !1
                        }),
                        n.attach("reloadData",
                        function () {
                            t.tick && t.tick.clear(),
                            v && t.newQuoteData()
                        })
                    },
                    initChart: function () {
                        g = !0,
                        this.tick = new a({
                            svg: t("#lightning")[0]
                        })
                    },
                    newQuoteData: function (t) {
                        var i = s[l];
                        i && (this.tick.setHeartbeat(w), this.tick.draw({
                            open: i.open,
                            price: i.price,
                            volume: i.volume + (!!t - 0),
                            code: i.code,
                            scale: f.scale
                        }))
                    },
                    showLoading: function () {
                        return e.one(function () {
                            c.show()
                        },
                        1500)
                    },
                    hideLoading: function (t) {
                        t.clear(),
                        c.hide()
                    }
                }
            });
        },
        "assets/js/biz/page/trade/quote": function () {
            define(function (require) {
                "use strict";
                var e = require("$"),
                t = require("_"),
                i = require("log"),
                a = require("net"),
                n = require("dataStore"),
                o = require("util/numbers"),
                s = require("util/timer"),
                c = require("data/contract"),
                r = (require("data/holidays"), require("mod/auth")),
                l = require("mod/observer"),
                d = require("ui/menu").SlideDown,
                u = require("ui/loading"),
                m = e("#doc"),
                M = require("util/dates"),
                h = m.find("div.page-trade"),
                f = m.find("div.page-buy-highs"),
                f2 = m.find("div.page-open-interest"),
                f3 = m.find("div.page-settle"),
                p = h.find("header.page-header"),
                _ = h.find("section.main-trade"),
                v = n.get("config"),
                w = v.base,
                g = w.contCode,
                y = [g],
                b = {},
                x = null,
                C = "期货合作交易",
                q = /AU|AG|RU|NI|SR|CU|TF/,
                D = n.get("urlQuote"),
                k = n.get("urlUserCenter"),
                H = require("assets/js/lang/cookie"),
                j= JSON.parse(H.getItem('future')),
                T = 0,
                N = Date.now(),
                E = !0,
                Q = !1,
                F = !1;
                return {
                    init: function () {
                        this.initElems(),
                        this.initData(),
                        this.initMenu(),
                        this.wait(),
                        this.attach(),
                        this.queryQuoteData()
                    },
                    initElems: function () {
                        var e = _.find("article.make"),
                        t = e.find("div.stock-detail"),
                        t2= e.find("div.action"),
                        i = e.find("article.market tr");
                        setTimeout(function(){
                            seajs.use(['page/trade/sline',"page/trade/open-interest"],function(a,b){
                                a.init();
                                b.init();
                            });
                        },10)
                        this.elems = {
                            name_1: t.find("div.symbol > div:eq(0)>span"),
                            name_2: p.find("h3 > span > em"),
                            title: p.find("h3 > span > i"),
                            back:p.find(".left>a"),
                            code: t.find("div.symbol > div:eq(0)>em"),
                            closeTime: t.find("div.symbol > div:eq(1)"),
                            price: t.find("li.price > div:eq(0)"),
                            wt_sale_price: t2.find("a.button-buy-lows em"),
                            wt_sale_volume: t.find("li.sale span:last"),
                            wt_buy_price: t2.find("a.button-buy-highs em"),
                            wt_buy_volume: t.find("li.buy span:last"),
                            open: i.eq(2).find("span:eq(1)"),
                            close: i.eq(2).find("span:eq(3)"),
                            high: i.eq(1).find("span:eq(1)"),
                            low: i.eq(1).find("span:eq(3)"),
                            volume: i.eq(5).find("span:eq(1)"),
                            amount: i.eq(5).find("span:eq(3)"),
                            settle_price: i.eq(4).find("span:eq(1)"),
                            settle_price_yes: i.eq(4).find("span:eq(3)"),
                            open_interest: i.eq(3).find("span:eq(1)"),
                            open_interest_yes: i.eq(3).find("span:eq(3)"),
                            limit_up_price: i.eq(6).find("span:eq(1)"),
                            limit_down_price: i.eq(6).find("span:eq(3)"),
                            limit_price_1: t.find("div.change> span:eq(0)"),
                            limit_price_2: i.eq(0).find("span:eq(1)"),
                            limit_rate_1: t.find("div.change> span:eq(1)"),
                            limit_rate_2: i.eq(0).find("span:eq(3)"),
                            rule: p.find("div.right > a"),
                            quote_trade_tips: t.children("ul").eq(2),
                            quote_change_tips: t.children("ul").eq(1),
                            quote_closed_tips: t.children("div.closed-tips")
                        }
                    },
                    initData: function () {
                        g = w.contCode,
                        y = [g];
                        var e = this.elems;
                        if(v.tradeType==2){
                            m.find('.page-header').addClass('page-header-score')
                            e.back.attr('data-href','../simulation.html') 
                        }
                        e.title.text(v.tradeType==1?'实盘交易':'积分模拟'),
                        e.name_1.text(w.commName),
                        e.name_2.text(w.commName),
                        e.code.text(w.contCode),
                        document.title = w.commName + C
                    },
                    initMenu: function () {
                        var e = [];
                        j.forEach(function (t) {
                            var _url=t.currency=='CNY'?'../trade/index.html?commodity='+t.instrumentCode.toUpperCase():'../guoji/index.html?commodity='+t.instrumentCode;
                            if(t.marketCode!="SRPME"&&t.marketCode!="cainiu"&&t.marketCode!="CFFEX"){
                                 e.push({
                                    name: t.commodityName,
                                    value: t.instrumentID,
                                    code: t.instrumentCode.toUpperCase(),
                                    url:_url
                                })
                            }
                           
                        });
                        if (2 === v.tradeType) {
                            e.push({
                                name: "【去实盘交易】",
                                value: "REAL_TRADE",
                                code: ""
                            });
                            e.push({
                                name: "【去国际模拟】",
                                value: "GUOJI_MONI_TRADE",
                                code: ""
                            });
                        };
                        this.menuContract = new d(e)
                    },
                    wait: function () {
                        var t = this,
                        i = "tab-make tab-open-interest tab-settle",
                        a = "tab-min-market tab-min-tick tab-min-daily tab-min-lightning";
                        _.find("ul.mod-tab-sample span").on("tap",
                        function (t) {
                            if (t.preventDefault(), r.login()) {
                                var a = e(this),
                                n = this.className,
                                o = "tab-" + n;
                                a.closest("div.content").removeClass(i).addClass(o),
                                l.notify("panelSwitch", n)
                            }
                        }),
                        _.find("div.stock-chart > ul.mod-tab-min > li").on("tap",
                        function (i) {
                           
                            i.preventDefault();
                            var n = e(this),
                            o = this.className,
                            s = "tab-min-" + o;
                             
                            if(o=='daily'){
                                seajs.use("page/trade/kline",function(c){
                                   c.init();
                               })
                            }
                            if(o=='live'){
                               window.location.href='/zhibo/live.html?r=trade';
                            }
                            n.closest("div.stock-chart").removeClass(a).addClass(s),
                            l.notify("chartSwitch", o),
                            Q || t.queryQuoteData()
                        }),
                        p.on("tap", "h3 > span",
                        function (e) {
                            e.preventDefault(),
                            t.menuContract.show(function (e, i, a) {
                                if(a.url){
                                    window.location.href=a.url+"&tradeType="+v.tradeType;
                                }else{
                                    var reg=new RegExp("(^|&)commodity=([^&]*)(&|$)", "i");
                                    var r = window.location.search.substr(1).match(reg);
                                    window.location=location.href.replace(r[2],a.code);
                                }
                              
                            })
                        }),
                        _.find("a.button-buy-highs, a.button-buy-lows").on("click",
                        function (t) {
                             require('page/trade/option');
                            if (t.preventDefault(), r.login() && r.signed()) {
                                h.hide(),
                                f.show();
                                var i = e(this).hasClass("button-buy-highs");
                                l.notify("pageSwitch", "page-buy", i, x)
                            }
                        }),
                          _.find("a.button-open-interest, a.button-settle").on("tap",
                        function (t) {
                            require('page/trade/option');
                            if (t.preventDefault(), r.login()) {
                                h.hide();
                                var _t=e(this).hasClass('button-open-interest');
                                _t?f2.show():f3.show();
                                l.notify("panelSwitch", _t?'open-interest':'settle');
                            }
                        }),
                        p.find("div.right > a").on("tap",
                        function (t) {
                            t.preventDefault();
                            var i = e(this);
                            l.notify("authFail", "jump"),
                            s.one(function () {
                                window.location.href = '/activity/'+w.smallCode+'TradeRule.html?mobi=mobi';
                            },
                            300)
                        });
                        var n = !1;
                        p.find("a.go-back").on("tap",
                        function (t) {
                            if (t.preventDefault(), !n) {
                                n = !0;
                                var i = e(this).data("href");
                                /^javascript:/.test(i) ? s.one(function () {
                                    window.history.back()
                                },
                                300) : window.location.href = i
                            }
                        }),
                        //_.on("swiperight",
                        //function (e) {
                        //    e.preventDefault(),
                        //    p.find("a.go-back").trigger("tap")
                        //}),
                        _.find("p.summary a").on("tap",
                        function (e) {
                            e.stopPropagation()
                        }),
                        _.find("p.summary").on("tap",
                        function (e) {
                            e.preventDefault(),
                            window.location.href = k
                        })
                    },
                    attach: function () {
                        var e = this,
                        t = this.elems;
                        l.attach("appendContractQuery",
                        function (t) {
                            var i = [g];
                            t.forEach(function (e) {
                                i[0] !== e && i.push(e)
                            }),
                            y = i,
                            e.queryQuoteDataEx()
                        }),
                        l.attach("pageHashChanged",
                        function () {
                            t.name_1.text(w.commName),
                            t.name_2.text(w.commName),
                            t.code.text(w.contCode),
                            g = w.contCode,
                            y[0] = g,
                            e.queryQuoteData(),
                            l.notify("changeContract", g)
                        }),
                        l.attach("pageSwitch",
                        function (e) {
                            E = "page-quote" === e
                        }),
                        l.attach("panelSwitch",
                        function (e) {
                            E = "make" === e
                        }),
                        l.attach("switchToPanel",
                        function (e) {
                            _.find("ul.mod-tab-sample span." + e).trigger("tap")
                        }),
                        l.attach("switchToPageBuy",
                        function (e, t, i) {
                            var a = i === !0 ? !t.isBuy : t.isBuy,
                            n = a ? "a.button-buy-highs" : "a.button-buy-lows";
                            l.notify("changePageHash", c.getCommCode(e)),
                            i === !0 && (x = t),
                            _.find(n).trigger("tap"),
                            x = null
                        })
                    },
                    queryQuoteData: function () {
                        var e = this,
                        t = 0,
                        n = 0,
                        o = 0,
                        r = !1,
                        d = !1,
                        m = !1,
                        h = function () {
                            var t = e.showLoading();
                            a.get({
                                url: D,
                                data: {
                                    futuresType: y[0]
                                },
                                success: function (i) {
                                    i=z(i);
                                    r && (r = !1, u.hide(!0)),
                                    e.hideLoading(t),
                                    f(i)
                                },
                                error: function () {
                                    e.hideLoading(t),
                                    u.show(!0),
                                    r = !0,
                                    p()
                                }
                            })
                        },
                        z = function (t) {
                            var a={},c=[];
                            a.success=t.code==200?true:false;
                            _askPrice=t.data.askPrice;
                            _bidPrice=t.data.bidPrice;
                            _lastPrice=t.data.lastPrice;
                            c.push(t.data.instrumentID);
                            c.push(t.data.askPrice);
                            c.push(t.data.askVolume);
                            c.push(t.data.bidPrice);
                            c.push(t.data.bidVolume);
                            c.push(t.data.preClosePrice);
                            c.push(t.data.openPrice);
                            c.push(t.data.highestPrice);
                            c.push(t.data.lowestPrice);
                            c.push(t.data.lastPrice);
                            c.push(t.data.settlementPrice);
                            c.push(t.data.volume);
                            c.push(t.data.turnover);
                            c.push(t.data.openInterest);
                            c.push(t.data.preOpenInterest);
                            c.push(t.data.preSettlementPrice);
                            c.push(t.data.upperLimitPrice);
                            c.push(t.data.lowerLimitPrice);
                            c.push(t.data.time);
                            a.data=c.join(',');
                            return a;
                        },
                        f = function (t) {
                            t.success ? (n = s.one(x).id, e.processData(t.data)) : i.error("查询行情数据失败")
                        },
                        p = function () {
                            o = s.one(x).id
                        },
                        _ = function () {
                            s.clear(t),
                            s.clear(n),
                            s.clear(o)
                        },
                        v = function () {
                            Q = c.isInPeriod(g)
                        },
                        w = function () {
                            Q ? d || (d = !0, m = !1, l.notify("newQuoteBegin")) : m || (m = !0, d = !1, l.notify("newQuoteEnd"))
                        },
                        b = function (e) {
                            var t = Date.now();
                            return Q || (F = t - N >= 2500, F && (T = 0, e = !0)),
                            N = t,
                            e
                        },
                        x = function (i) {
                            _(),
                            v(),
                            w(),
                            i = b(i),
                            e.showCloseTips(),
                            e.updateCloseTime(),
                            i || Q ? h() : t = s.one(x).id
                        };
                        x(!0),
                        this.queryQuoteData = function () {
                            d = !1,
                            m = !1,
                            x(!0)
                        },
                        this.queryQuoteDataEx = function () {
                            x(!0)
                        }
                    },
                    showCloseTips: function () {
                        var e = this.elems,
                        t = e.quote_trade_tips,
                        f = e.quote_change_tips,
                        k = e.closeTime,
                        i = e.quote_closed_tips;
                        Q ? (t.removeClass("vhide"),f.removeClass("vhide"),k.removeClass('vhide'),i.addClass("hide")) : (i.html(c.getTipsForNextTime(w.commCode)),f.addClass("vhide"),t.addClass("vhide"),k.addClass('vhide'),i.removeClass("hide"))
                    },
                    updateCloseTime: function () {
                       var e, i = M.format(Date.now(), "h:m");
                           t.each(w.closeTime,
                            function (t) {
                                var a = parseInt(t.replace(":",""));
                                return parseInt(i.replace(":","")) <  a? (e = t, !1) : void 0
                            })
                        e = e || (e = w.closeTime[0]);
                        this.elems.closeTime.html("<span class='text-minor'>本时段持仓时间至 <em class='text-highs'>" + e + "</em></span>")
                    },
                    processData: function (e) {
                        var t = e.split(";");
                        t.forEach(function (e) {
                            if ("" != e) {
                                var t = e.split(",");
                                 t[0]=t[0]==g?t[0]:g;
                                b[t[0]] = {
                                    code: t[0],
                                    price: t[9] - 0,
                                    open: t[6] - 0,
                                    high: t[7] - 0,
                                    low: t[8] - 0,
                                    close: t[5] - 0,
                                    volume: t[11] - 0,
                                    amount: t[12] - 0,
                                    wt_sale_price: t[3] - 0,
                                    wt_sale_volume: t[2] - 0,
                                    wt_buy_price: t[1] - 0,
                                    wt_buy_volume: t[4] - 0,
                                    settle_price: isNaN(t[10])?0:(t[10] - 0),
                                    settle_price_yes: t[15] - 0,
                                    open_interest: t[13] - 0,
                                    open_interest_yes: t[14] - 0,
                                    limit_up_price: t[16] - 0,
                                    limit_down_price: t[17] - 0,
                                    time: t[18] - 0
                                }
                            }
                        });
                        var i = b[g];
                        if (null != i) {
                            var a = i.price - i.settle_price_yes,
                            n = a / i.settle_price_yes * 100;
                            i.limit_price_1 = (a > 0 ? "+" : "") + a.toFixed(w.scale),
                            i.limit_price_2 = i.limit_price_1,
                            i.limit_rate_1 = (n > 0 ? "+" : "") + n.toFixed(2) + "%",
                            i.limit_rate_2 = i.limit_rate_1,
                            i.price === i.limit_up_price && (i.wt_sale_price = "--"),
                            i.price === i.limit_down_price && (i.wt_buy_price = "--"),
                            this.showData(),
                            this.reloadCheck(),
                            this.notify()
                        }
                    },
                    reloadCheck: function () {
                        var e = b[g].time;
                        0 === T && (T = e),
                        Math.abs(e - T) >= 3e4 && (F = !0),
                        T = e
                    },
                    notify: function () {
                        l.notify("newQuoteData", b),
                        F && (F = !1, l.notify("reloadData"))
                    },
                    showData: function () {
                        var e = this,
                        i = this.elems,
                        a = b[g];
                        t.each(a,
                        function (t, n) {
                            var s = i[n];
                            if (s) switch (n) {
                                case "price":
                                    e.processCurPrice(a, s, t);
                                    break;
                                case "limit_price_1":
                                case "limit_price_2":
                                case "limit_rate_1":
                                case "limit_rate_2":
                                    e.processLimit(a, s, t);
                                    break;
                                case "high":
                                case "low":
                                case "open":
                                case "wt_sale_price":
                                case "wt_buy_price":
                                    e.processPrice(a, s, t);
                                    break;
                                case "wt_sale_volume":
                                case "wt_buy_volume":
                                     s.text(t);
                                    s.siblings('div').find('em').css('width',((parseInt(t)/100)>1?0.8:t<10?parseInt(t)/100:0.8*parseInt(t)/100)+'rem');
                                    break;
                                case "open_interest":
                                case "open_interest_yes":
                                case "volume":
                                case "amount":
                                    s.text(o.shrink(t));
                                    break;
                                case "settle_price":
                                    e.processSettle(a, s, t);
                                    break;
                                case "code":
                                    break;
                                default:
                                    s.text(t.toFixed ? t.toFixed(w.scale) : t)
                            }
                        })
                    },
                    processSettle: function (e, t, i) {
                        var a = e.settle_price_yes,
                        n = "text-highs text-lows",
                        o = i >= a ? "text-highs" : "text-lows";
                        t.text((i.toFixed(w.scale)=="0"?"--":i.toFixed(w.scale)))
                    },
                    processPrice: function (e, t, i) {
                        if ("--" === i) return void t.text("--").removeClass("text-highs text-lows");
                        var a = e.settle_price_yes,
                        n = "text-highs text-lows",
                        o = i >= a ? "text-highs" : "text-lows";
                        t.text(i.toFixed(w.scale))
                    },
                    processLimit: function (e, t, i) {
                        var a = e.settle_price_yes,
                        n = e.price,
                        o = "text-highs text-lows",
                        s = n >= a ? "text-highs" : "text-lows";
                        t.text(i).removeClass(o).addClass(s)
                    },
                    processCurPrice: function (e, t, i) {
                        var a = e.settle_price_yes,
                        n = i.toFixed(w.scale),
                        o = n.indexOf("."),
                        s = -1 === o ? "" : n.substring(o),
                        c = 0 | i;
                       !s?t.html( '<em class="text-xxl">' + c+"</em>"):t.html( '<em class="text-xxl">' +c+ s+"</em>") ,
                        t[0].className = i >= a ? "text-highs left" : "text-lows left"
                    },
                    getRealTradeCommCode: function () {
                        return q.test(w.commCode) ? w.commCode : ""
                    },
                    showLoading: function () {
                        return s.one(function () {
                            u.show()
                        },
                        1500)
                    },
                    hideLoading: function (e) {
                        e.clear(),
                        u.hide()
                    }
                }
            });
        },
        "assets/js/ui/chart/kline/1.0/main": function () {
            define(function (require) {
                "use strict";
                var i = require("_"),
                t = (require("log"), require("util/dom")),
                h = require("util/numbers"),
                e = (new Date).getFullYear(),
                s = function (i) {
                    var t, h, s, a, r = "";
                    return "string" == typeof i && /^\d+$/.test(i) ? (h = i.substring(0, 4) - 0, s = i.substring(4, 6) - 0, a = i.substring(6) - 0) : (t = new Date(i), h = t.getFullYear(), s = t.getMonth() + 1, a = t.getDate()),
                    h !== e && (h += "", r = h.substring(h.length - 2) + "/"),
                    r + s + "/" + a
                },
                a = "#e8e8e8",
                r = "#f8f8f8",
                n = "#aaa",
                c = "#dd2200",
                o = "#33aa11",
                l = "#dd2200",
                g = "#c02d33",
                u = "#772029",
                d = "#fec145",
                x = "#0f4a96",
                m = 10,
                _ = .8,
                p = 7,
                v = .1,
                y = 70,
                f = function (i) {
                    this.svg = i.svg,
                    this.data = i.data || [],
                    this.days = i.days || y,
                    this.scale = i.scale || 2,
                    this.init()
                };
                return f.prototype = {
                    init: function () {
                        var i = this.data;
                        this.svgWidth = t.getSize(this.svg).width,
                        this.svgHeight = t.getSize(this.svg).height,
                        this.gPricesEl = t.childs(this.svg)[1],
                        this.gVolumesEl = t.childs(this.svg)[2],
                        this.days = this._getDays(i.length, this.days),
                        this.lowPrice = 0,
                        this.highPrice = 0,
                        this.minPrice = 0,
                        this.maxPrice = 0,
                        this.minVolume = 0,
                        this.maxVolume = 0,
                        this._calcMaxMin(i.slice(i.length - this.days)),
                        this.beginPrice = 0,
                        this.endPrice = 0,
                        this._cacheEl = [];
                        var h = 20;
                        this.priceChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: 0,
                                end: .75 * this.svgHeight,
                                height: .75 * this.svgHeight
                            }
                        },
                        this.volumeChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: this.priceChartBox.y.end + h,
                                end: this.svgHeight,
                                height: this.svgHeight - this.priceChartBox.y.height - h
                            }
                        }
                    },
                    draw: function (i) {
                        if (i) {
                            var t = this.data;
                            i.data && (t = this.data = i.data, this.days = this._getDays(t.length, y), this._calcMA()),
                            i.days && (this.days = this._getDays(t.length, i.days)),
                            (i.data || i.days) && this._calcMaxMin(t.slice(t.length - this.days)),
                            null != i.scale && (this.scale = i.scale)
                        }
                        this._draw()
                    },
                    _draw: function () {
                        this._init || (this._init = !0, this._drawFramework()),
                        this._clear(),
                        this.data.length ? this._drawChart() : this._drawBasePriceLine()
                    },
                    _drawFramework: function () {
                        this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.end, this.priceChartBox.x.end, this.priceChartBox.y.end, a),
                        this._line(this.gVolumesEl, this.volumeChartBox.x.begin, this.volumeChartBox.y.begin, this.volumeChartBox.x.end, this.volumeChartBox.y.begin, a),
                        this._line(this.gVolumesEl, this.volumeChartBox.x.begin, this.volumeChartBox.y.begin + this.volumeChartBox.y.height / 2, this.volumeChartBox.x.end, this.volumeChartBox.y.begin + this.volumeChartBox.y.height / 2),
                        this._line(this.gVolumesEl, this.volumeChartBox.x.begin, this.volumeChartBox.y.end - .5, this.volumeChartBox.x.end, this.volumeChartBox.y.end - .5)
                    },
                    _drawBasePriceLine: function () {
                        var i = this._cacheEl;
                        i.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin, this.priceChartBox.x.end, this.priceChartBox.y.begin)),
                        i.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height)),
                        i.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height))
                    },
                    _drawChart: function () {
                        var i = this.svgWidth / this.days,
                        t = this.svgWidth / m;
                        this.days < t && (i = m),
                        this._drawPriceRange(),
                        this._drawTimeline(i);
                        for (var h, e = this.data.slice(this.data.length - this.days), s = 0; s < this.days; s++) {
                            var a = e[s];
                            h = a.close > a.open ? c : a.close < a.open ? o : l,
                            this._drawKline(a, i, s, h),
                            this._drawVolume(a, i, s, h)
                        }
                        this._drawMA(e, i)
                    },
                    _clear: function () {
                        i.each(this._cacheEl,
                        function (i) {
                            i && t.remove(i)
                        }),
                        this._cacheEl.length = 0
                    },
                    _drawPriceRange: function () {
                        var i = this.maxPrice,
                        t = this.minPrice,
                        e = (i - t) * v;
                        this.beginPrice = i + e,
                        this.endPrice = t - e;
                        for (var s = this._cacheEl,
                        a = this.gPricesEl,
                        r = this.priceChartBox.x,
                        n = this.priceChartBox.y,
                        c = n.height / p,
                        o = 0; p > o; o++) {
                            var l = r.begin,
                            g = n.begin + c * o + (0 === o ? .5 : 0),
                            u = r.end,
                            d = g;
                            s.push(this._line(a, l, g, u, d))
                        }
                        var x, m, e;
                        if (x = r.end - 3, m = n.begin + 14, e = this.maxPrice.toFixed(this.scale), s.push(this._text(a, x, m, e, "", "end")), x = r.end - 3, m = n.end - 4, e = this.minPrice.toFixed(this.scale), s.push(this._text(a, x, m, e, "", "end")), p >= 3) {
                            var o = (p - p % 2) / 2 + 1;
                            m = n.begin + c * o,
                            e = (this.maxPrice + this.minPrice) / 2,
                            e = e.toFixed(this.scale),
                            m = m - c / 2 + 4,
                            x = r.end - 3,
                            s.push(this._text(a, x, m, e, "", "end"))
                        }
                        a = this.gVolumesEl,
                        r = this.volumeChartBox.x,
                        n = this.volumeChartBox.y,
                        x = r.end - 3,
                        m = n.begin + (n.height / 2 - 10),
                        e = h.shrink(this.maxVolume),
                        s.push(this._text(a, x, m, e, "", "end"))
                    },
                    _drawTimeline: function (i) {
                        var t = this.data.slice(this.data.length - this.days),
                        h = this._cacheEl,
                        e = this.priceChartBox.x,
                        a = this.priceChartBox.y,
                        r = 5;
                        this.days < 20 && (r = 2);
                        for (var n = this.days / r | 0,
                        c = 0; r > c; c++) {
                            var o, l, g, u, d, x, m, _;
                            if (o = e.begin + c * n * i + i / 2, l = a.begin, g = o, u = a.end, _ = t[c * n], d = o, x = a.end + 14, m = s(_.time), h.push(this._line(this.gPricesEl, o, l, g, u)), h.push(this._text(this.gPricesEl, d, x, m)), 5 > n) break
                        }
                    },
                    _drawMA: function (i, t) {
                        for (var h, e, s, a = this._cacheEl,
                        r = function (i, t) {
                            return "L" + i + "," + t
                        },
                        n = function (i, t) {
                            return "M" + i + "," + t
                        },
                        c = "", o = "", l = "", m = "", _ = 0; _ < this.days; _++) h = i[_],
                        e = this._c2x_ma(_, t),
                        h.ma5 && (s = this._c2y_ma(h.ma5), c += c ? r(e, s) : n(e, s)),
                        h.ma10 && (s = this._c2y_ma(h.ma10), o += o ? r(e, s) : n(e, s)),
                        h.ma20 && (s = this._c2y_ma(h.ma20), l += l ? r(e, s) : n(e, s)),
                        h.ma30 && (s = this._c2y_ma(h.ma30), m += m ? r(e, s) : n(e, s));
                        c && a.push(this._path(this.gPricesEl, c, g)),
                        o && a.push(this._path(this.gPricesEl, o, u)),
                        l && a.push(this._path(this.gPricesEl, l, d)),
                        m && a.push(this._path(this.gPricesEl, m, x))
                    },
                    _drawKline: function (i, t, h, e) {
                        var s, a, r, n, c, o, l, g, u = this._cacheEl,
                        d = Math.max(i.close, i.open),
                        x = Math.min(i.close, i.open);
                        s = this._c2x_k(h, t),
                        a = this._c2y_k(d),
                        r = t * _,
                        n = this._c2y_k(x) - a,
                        r = r > 1 ? r : 1,
                        n = n > 1 ? n : 1,
                        c = h * t + t / 2,
                        o = this._c2y_k(i.high),
                        l = c,
                        g = this._c2y_k(i.low),
                        u.push(this._rect(this.gPricesEl, s, a, r, n, e)),
                        u.push(this._line(this.gPricesEl, c, o, l, g, e))
                    },
                    _drawVolume: function (i, t, h, e) {
                        var s, a, r, n, c = this._cacheEl,
                        o = this.volumeChartBox.y;
                        s = this._c2x_v(h, t),
                        a = this._c2y_v(i.volume),
                        r = t * _,
                        n = o.end - a,
                        r = r > 1 ? r : 1,
                        n = n > 1 ? n : 1,
                        c.push(this._rect(this.gVolumesEl, s, a, r, n, e))
                    },
                    _path: function (i, h, e) {
                        var s = t.create("path");
                        return t.attr(s, {
                            d: h,
                            stroke: e,
                            fill: "none"
                        }),
                        t.append(i, s),
                        s
                    },
                    _rect: function (i, h, e, s, a, r) {
                        var n = t.create("rect");
                        return t.attr(n, {
                            x: h,
                            y: e,
                            width: s,
                            height: a,
                            fill: r,
                            "stroke-width": "0"
                        }),
                        t.append(i, n),
                        n
                    },
                    _line: function (i, h, e, s, a, n, c, o) {
                        var l = t.create("line");
                        return t.attr(l, {
                            x1: h,
                            y1: e,
                            x2: s,
                            y2: a,
                            stroke: n || r
                        }),
                        c && t.attr(l, "stroke-dasharray", c),
                        o ? t.insert(i, l, o) : t.append(i, l),
                        l
                    },
                    _text: function (i, h, e, s, a, r) {
                        var c = t.create("text");
                        return t.attr(c, {
                            x: h,
                            y: e,
                            fill: a || n,
                            style: {
                                "text-anchor": r || "start"
                            }
                        }),
                        t.textContent(c, s),
                        t.append(i, c),
                        c
                    },
                    _c2x_ma: function (i, t) {
                        var h = this.priceChartBox.x;
                        return h.begin + i * t + t / 2
                    },
                    _c2y_ma: function (i) {
                        return this._c2y_k(i)
                    },
                    _c2x_k: function (i, t) {
                        var h = this.priceChartBox.x;
                        return h.begin + i * t + t * (1 - _) / 2
                    },
                    _c2y_k: function (i) {
                        var t = this.priceChartBox.y,
                        h = this.beginPrice - this.endPrice,
                        e = this.beginPrice - i;
                        return t.begin + t.height * (e / h)
                    },
                    _c2x_v: function (i, t) {
                        var h = this.volumeChartBox.x;
                        return h.begin + i * t + t * (1 - _) / 2
                    },
                    _c2y_v: function (i) {
                        var t = this.volumeChartBox.y,
                        h = this.maxVolume,
                        e = t.height;
                        return t.begin + e * (1 - i / h * .9)
                    },
                    _calcMA: function () {
                        for (var i, t, h, e = this.data,
                        s = e.length,
                        a = function (h, s) {
                            if (i = 0, h - s >= -1) for (t = h - s; h > t;) i += e[h--].close;
                            return i / s
                        },
                        r = s; --r >= 0;) h = e[r],
                        h.ma5 = a(r, 5),
                        h.ma10 = a(r, 10),
                        h.ma20 = a(r, 20),
                        h.ma30 = a(r, 30)
                    },
                    _calcMaxMin: function (t) {
                        var h = this;
                        h.lowPrice = 0,
                        h.highPrice = 0,
                        h.minPrice = 0,
                        h.maxPrice = 0,
                        h.minVolume = 0,
                        h.maxVolume = 0,
                        i.each(t,
                        function (i) {
                            var t = [];
                            i.ma5 && t.push(i.ma5),
                            i.ma10 && t.push(i.ma10),
                            i.ma20 && t.push(i.ma20),
                            i.ma30 && t.push(i.ma30),
                            i.high && t.push(i.high),
                            i.low && t.push(i.low),
                            h.maxPrice && t.push(h.maxPrice),
                            h.minPrice && t.push(h.minPrice),
                            h.maxPrice = Math.max.apply(Math, t),
                            h.minPrice = Math.min.apply(Math, t),
                            h.highPrice = Math.max(h.highPrice, i.high),
                            h.lowPrice = Math.min(h.lowPrice > 0 ? h.lowPrice : i.low, i.low),
                            h.maxVolume = Math.max(h.maxVolume, i.volume),
                            h.minVolume = Math.min(h.minVolume > 0 ? h.minVolume : i.volume, i.volume)
                        })
                    },
                    _getDays: function (i, t) {
                        return 0 === i && (i = t),
                        0 === t && (t = i),
                        Math.min(i, t)
                    }
                },
                f
            });
        },
        "assets/js/biz/page/trade/kline": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                e = (require("_"), require("log")),
                i = require("net"),
                n = require("dataStore"),
                a = require("util/dates"),
                o = require("util/timer"),
                c = require("mod/observer"),
                r = require("ui/kline"),
                l = require("ui/loading"),
                u = n.get("config"),
                h = u.base,
                s = h.contCode,
                d = n.get("urlKline"),
                f = {},
                g = {},
                m = !1,
                w = !1,
                v = !1;
                return {
                    init: function () {
                        s = h.contCode,
                        this.attach()
                    },
                    attach: function () {
                        var t = this;
                        c.attach("newQuoteData",
                        function (e) {
                            f = e,
                            w && v && t.newQuoteData()
                        }),
                        c.attach("changeContract",
                        function (e) {
                            s = e,
                            g = {},
                            v = !1,
                            w && t.queryKlineData(e)
                        }),
                        c.attach("chartSwitch",
                        function (e) {
                            w = "daily" === e,
                            w && (m || t.initChart(), null == g[s] && (v = !1, t.queryKlineData(s)))
                        })
                    },
                    initChart: function () {
                        m = !0,
                        this.kline = new r({
                            svg: t("#stock-kline")[0]
                        }),
                        this.kline.draw()
                    },
                    queryKlineData: function (t) {
                        var n = this,
                        a = this.showLoading();
                        // i.jsonp({
                        //     url: d,
                        //     data: {
                        //         code: t
                        //     },
                        //     success: function (i) {
                        //         n.hideLoading(a),
                        //         i.success ? n.processData(i.data, t) : e.error("查询k线图数据失败")
                        //     },
                        //     error: function (t, i) {
                        //         n.hideLoading(a),
                        //         e.error("k线接口异常！", i)
                        //     }
                        // })
                         i.ajax({
                            url: '/futuresquota/list',
                            dataType:'json',
                            type:'get',
                            data: {type:t,num:'1440'},
                            success: function (i) {
                                n.hideLoading(a),
                                i ? n.beforeData(i, t) : e.error("查询分时图数据失败")
                            },
                            error: function (t, i) {
                                n.hideLoading(a),
                                e.error("分时接口异常", i)
                            }
                        })
                    },
                    beforeData:function(k,t){
                        var arr=[];
                        for(var i=0;i<k.length;i++){
                            var o='';
                            o+=k[i].openPrice+","+k[i].maxPrice+","+k[i].minPrice+","+k[i].closePrice+","+k[i].closePrice+","+k[i].volume+","+0+","+0+","+k[i].time.substring(0,8);
                            arr.push(o);
                        }
                        arr=arr.reverse().splice(-40);
                        this.processData(arr.join(';'), t);
                    },
                    processData: function (t, e) {
                        var i = t ? t.split(";") : [],
                        n = [];

                        i.forEach(function (t, e) {
                            var i = t.split(",");
                            n[e] = {
                                open: i[0] - 0,
                                close: i[3] - 0,
                                high: i[1] - 0,
                                low: i[2] - 0,
                                volume: i[5] - 0,
                                time: i[8]
                            }
                        }),

                        g[e] = n;
                        var o = f[s];
                        o && n.push({
                            open: o.open,
                            close: o.price,
                            high: o.high,
                            low: o.low,
                            volume: o.volume,
                            time: a.format(o.time, "YMD")
                        }),
                        this.kline.draw({
                            data: n,
                            scale: h.scale
                        }),
                        v = !0
                    },
                    newQuoteData: function () {
                        var t = g[s];
                        if (null != t) {
                            var e = f[s],
                            i = {
                                open: e.open,
                                close: e.price,
                                high: e.high,
                                low: e.low,
                                volume: e.volume,
                                time: a.format(e.time, "YMD")
                            },
                            n = t[t.length - 1];
                            n.time === i.time ? t[t.length - 1] = i : t.push(i),
                            this.kline.draw({
                                data: t,
                                scale: h.scale
                            })
                        }
                    },
                    showLoading: function () {
                        return o.one(function () {
                            l.show()
                        },
                        1500)
                    },
                    hideLoading: function (t) {
                        t.clear(),
                        l.hide()
                    }
                }
            });
        },
        "assets/js/biz/page/trade/sell": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                i = (require("_"), require("log"), require("net")),
                e = require("dataStore"),
                a = require("data/contract"),
                o = (require("util/dates"), require("util/strings")),
                s = require("mod/ajax-result"),
                n = require("mod/observer"),
                r = require("mod/position"),
                z = require("ui/msgbox"),
                d = t("#doc"),
                c = d.find("div.page-trade"),
                k = d.find("div.page-open-interest"),
                u = d.find("div.page-buy-lows"),
                f = u.find("section.main-buy-lows"),
                g = e.get("config"),
                p = g.BASE,
                h = {},
                v = "",
                m = [],
                _ = 0,
                b = 0,
                w = 0,
                j = e.get("urlClose"),
                q = e.get("urlSpsl"),
                C = !1,
                y = !0;
                return {
                    init: function () {
                        this.initElems(),
                        this.wait(),
                        this.attach()
                    },
                    initElems: function () {
                        var t = f.find("ul.mod-list"),
                        i = t.eq(0).children("li"),
                        e = t.eq(1).children("li"),
                        a = t.eq(0).children("li");
                        this.elems = {
                            ul1: t.eq(0),
                            ul2: t.eq(1),
                            ul3: t.eq(0),
                            ps: f.find("p.ps"),
                            current: i.eq(0).children("span").eq(0),
                            volume: i.eq(0).children("span").eq(1),
                            income: i.eq(0).children("span").eq(2),
                            profit_jia: e.eq(0).find("span.jiahao"),
                            profit_trigger: e.eq(0).find("input:eq(0)"),
                            profit_jian: e.eq(0).find("span.jianhao"),
                            loss_jia: e.eq(1).find("span.jiahao"),
                            loss_trigger: e.eq(1).find("input:eq(0)"),
                            loss_jian: e.eq(1).find("span.jianhao"),
                            total: a.eq(0).find("span"),
                            total_highs: a.eq(1).find("em"),
                            total_lows: a.eq(2).find("em"),
                            investor: f.find("p.ps span.investor")
                        }
                    },
                    wait: function () {
                        var i = this,
                        e = this.elems;
                        f.find("div.action a.button").on("tap",
                        function (e) {
                            e.preventDefault();
                            var a = t(this);
                            if (!a.hasClass("button-disabled") && i.isValid()) {
                                a.addClass("button-disabled");
                                var o = function () {
                                    u.hide(),
                                    k.show(),
                                    n.notify("switchToPanel", "open-interest")
                                };
                                y ? i.saleOne(m[0], "spsl", o) : i.saleAll(o)
                            }
                        }),
                        e.profit_jia.on("tap",
                        function (t) {
                            t.preventDefault(),
                            e.profit_jia.hasClass("disabled") || isNaN(e.profit_trigger.val()) || (i.changeAmount(e.profit_trigger, 1), i.limitChange(e.profit_trigger, e.profit_jia, e.profit_jian))
                        }),
                        e.profit_jian.on("tap",
                        function (t) {
                            t.preventDefault(),
                            e.profit_jian.hasClass("disabled") || isNaN(e.profit_trigger.val()) || (i.changeAmount(e.profit_trigger, -1), i.limitChange(e.profit_trigger, e.profit_jia, e.profit_jian))
                        }),
                        e.loss_jia.on("tap",
                        function (t) {
                            t.preventDefault(),
                            e.loss_jia.hasClass("disabled") || isNaN(e.loss_trigger.val()) || (i.changeAmount(e.loss_trigger, 1), i.limitChange(e.loss_trigger, e.loss_jia, e.loss_jian))
                        }),
                        e.loss_jian.on("tap",
                        function (t) {
                            t.preventDefault(),
                            e.loss_jian.hasClass("disabled") || isNaN(e.loss_trigger.val()) || (i.changeAmount(e.loss_trigger, -1), i.limitChange(e.loss_trigger, e.loss_jia, e.loss_jian))
                        }),
                        e.profit_trigger.on("tap",
                        function (i) {
                            i.preventDefault(),
                            t(this).focus().select()
                        }).on("blur",
                        function () {
                            i.isValid()
                        }),
                        e.loss_trigger.on("tap",
                        function (i) {
                            i.preventDefault(),
                            t(this).focus().select()
                        }).on("blur",
                        function () {
                            i.isValid()
                        }),
                        u.find("a.go-back").on("tap",
                        function (t) {
                            t.preventDefault(),
                            u.hide(),
                            c.show(),
                            n.notify("pageSwitch", "page-quote")
                        })
                        //,f.on("swiperight",
                        //function (t) {
                        //    t.preventDefault(),
                        //    u.find("a.go-back").trigger("tap")
                        //})
                    },
                    attach: function () {
                        var t = this;
                        n.attach("newQuoteData",
                        function (i) {
                            h = i,
                            C && (t.newQuoteData(), t.calcIncome())
                        }),
                        n.attach("pageSwitch",
                        function (i, e, a) {
                            C = "page-sell" === i,
                            C && (y = "sale-one" === e, m = y ? [a] : a, t.updateView())
                        }),
                        n.attach("doSaleOne",
                        function (i, e) {
                            t.saleOne(i, e,
                            function (t) {
                                t ? n.notify("switchToPageBuy", v, i, !0) : n.notify("switchToPanel", "open-interest")
                            })
                        })
                    },
                    saleOne: function (e, a, o) {
                        var _this=this;
                        e = e || m[0];

                        var n = j,
                        r = {
                            fundType:e.fundType,
                            orderId: e.id,
                            userSalePrice:e.buyPrice,
                            userSaleDate:(new Date()).Format('yyyy-MM-dd hh:mm:ss'),
                            token:g.token
                        },
                        l = "reverse" === a;
                        "spsl" === a && (n = q, r.stopProfit = t.trim(this.elems.profit_trigger.val()), r.stopLoss = "-" + t.trim(this.elems.loss_trigger.val())),
                        r.source = l ? "反向" : "下单",
                        i.post({
                            url: n,
                            data: r,
                            success: function (t) {
                                s.done(t,
                                function () {
                                     z.alert(t.msg,function(){
                                        o && o(l);
                                        _this.sdk(t,r.userSalePrice)
                                     })
                                })
                            },
                            complete: function () {
                                f.find("div.action a.button").removeClass("button-disabled")
                            }
                        })
                    },
                     sdk:function(d,r){
                        if(g.tradeType==2){return false}
                        if(window.location.host=="www.jnhyxx.com"){
                            var F = navigator.userAgent;
                             if(F.indexOf('ANDROID_AGENT')>-1){
                                var arr=[], 
                                    user=JSON.parse(localStorage.getItem('userInfo')),
                                    pz={'AU':'0','AG':'1','RB':'2','CU':'3','NI':'4',"SR":'5',"PP":'6',"CL":'7',"GC":'8',"HSI":'9',"MHI":'10',"NQ":'11',"DAX":'12'};
                                arr[0]=user.tele;
                                arr[1]=d.data.futuresOrder.buyPid.toString();
                                arr[2]=d.data.futuresOrder.id.toString();
                                arr[3]=g.futures.instrumentID;
                                arr[4]="1";
                                arr[5]=pz[g.tradeComm];
                                arr[6]=parseInt(r*100).toString();
                                arr[7]=parseInt(d.data.futuresOrder.lossProfit*100).toString();
                                arr[8]=(new Date()).getTime().toString();
                                window.VIA_SDK.on_Cmd_Sell(arr);
                             }
                        }
                    },
                    saleAll: function (t) {
                        var _this = this,
                        e = this.elems,
                        a = e.ul3.find('input[name="rt-sale-condition"]:checked').val(),
                        s = "1" === a ? _ : "2" === a ? b : w,
                        n = s,
                        r = 0,
                        d = 0,
                        c = "<div>【卖出委托正在提交中】</div>",
                        u = "<div><div>【卖出委托提交完毕】</div><div>共${total}笔，成功${done}笔，失败${fail}笔</div></div>",
                        p = function () {
                            n--;
                            var i = {
                                total: s,
                                done: r,
                                fail: d
                            },
                            e = 0 === n ? u : c,
                            a = o.format(e, i);
                            0 === n ? (f.find("div.action a.button").removeClass("button-disabled"), z.enable().alert(a, t)) : z.disable().alert(a)
                        },
                        h = function (t, e) {
                            i.post({
                                url: j,
                                data: {
                                    fundType:t.fundType,
                                    orderId: t.id,
                                    userSalePrice:t.buyPrice,
                                    userSaleDate:(new Date()).Format('yyyy-MM-dd hh:mm:ss'),
                                    token:g.token
                                },
                                success: function (m) {
                                    (m.code==201||m.code==200) ? r++ : d++,
                                    e(),
                                    p(),
                                    _this.sdk(m,t.buyPrice)
                                }
                            })
                        },
                        v = function (t) {
                            var i = t.shift(),
                            e = function () {
                                v(t)
                            };
                            if (i && (3 === i.status)) switch (a) {
                                case "1":
                                    h(i, e);
                                    break;
                                 case "2":
                                     !i.tradeType?h(i, e):e();
                                    break;
                                case "3":
                                    !i.tradeType ? e() : h(i, e)
                            }
                        },
                        q = function () {
                            z.disable().alert(o.format(c, {
                                total: s,
                                done: r,
                                fail: d
                            }))
                        };
                        q(),
                        v(m.slice())
                    },
                    newQuoteData: function () {
                        if (y) {
                            var t = h[v],
                            i = p[a.getCommCode(v)].scale,
                            e = t.price.toFixed(i);
                            this.elems.current.children("em").text("最新价" + e)
                        }
                    },
                    calcIncome: function () {
                        if (y) {
                            var t = h[v],
                            i = r.calcIncome(t, m[0]),
                            e = i >= 0 ? "text-highs" : "text-lows",
                            a = (i > 0 ? "+" : "") + i.toFixed(0);
                            this.elems.income[0].className = e,
                            this.elems.income.text(a)
                        }
                    },
                    updateView: function () {
                        var t = this.elems;
                        y ? (v = m[0].contCode, t.ul1.show(), t.ul2.show(), t.ul3.hide(), t.ps.show(), this.updateViewForSoldOne(t)) : (t.ul1.hide(), t.ul2.hide(), t.ul3.show(), t.ps.hide(), this.updateViewForSoldAll(t))
                    },
                    updateViewForSoldOne: function (t) {
                        var i = m[0];
                        u.find("header.header-analog-trade h3").text("设置止盈止损"),
                        t.current.html(i.commodity + " (<em></em>)");
                        var e = i.isBuy ? "text-highs" : "text-lows",
                        a = i.isBuy ? "买涨" : "买跌";
                        t.volume[0].className = e,
                        t.volume.text(a + i.opVolume + "手"),
                        this.calcIncome(),
                        this.newQuoteData(),
                        t.profit_trigger.val(i.stopProfit),
                        t.profit_trigger.data("stop-profit", i.stopProfitBegin),
                        t.loss_trigger.val(Math.abs(i.stopLoss)),
                        t.loss_trigger.data("stop-loss", Math.abs(i.stopLossBegin)),
                        this.limitChange(t.profit_trigger, t.profit_jia, t.profit_jian),
                        this.limitChange(t.loss_trigger, t.loss_jia, t.loss_jian)
                    },
                    updateViewForSoldAll: function (t) {
                        _ = 0,
                        b = 0,
                        w = 0,
                        m.forEach(function (t) {
                            (3 === t.status) && (_++, t.tradeType ? w++: b++ )
                        }),
                        u.find("header.header-analog-trade h3").text("卖出委托"),
                        t.total.prev().prop("checked", !0),
                        t.total.text("共" + _ + "笔 > 全部即时卖出"),
                        0 === b || 0 === w ? t.ul3.children("li:gt(0)").hide() : (t.ul3.children("li").show(), t.total_highs.text("买涨共" + b + "笔"), t.total_lows.text("买跌共" + w + "笔"))
                    },
                    changeAmount: function (t, i) {
                        var e = this.getMinPrice(),
                        a = t.val() - 0,
                        o = i > 0 ? Math.floor(a / e) : Math.ceil(a / e),
                        s = (o + i) * e;
                        return t.val(s),
                        s
                    },
                    limitChange: function (t, i, e) {
                        var a = this.getMinPrice(),
                        o = t.data("stop-profit") || t.data("stop-loss"),
                        s = t.val();
                        if (t.hasClass("stop-loss-input")) {
                            i.toggleClass("disabled", s >= o);
                        }
                        e.toggleClass("disabled", a >= s)
                    },
                    getMinPrice: function () {
                        var t = p[a.getCommCode(v)],
                        i = t.priceUnit,
                        e = t.priceChange,
                        o = m[0].opVolume;
                        return i * e * o
                    },
                    isValid: function () {
                        if (!y) return !0;
                        var i = this.elems,
                        e = this.getMinPrice(),
                        a = t.trim(i.profit_trigger.val()),
                        o = i.profit_trigger.data("stop-profit") - 0;
                        return a ? isNaN(a) ? (l.alert("止盈金额请输入数字",
                        //function () {
                        //    i.profit_trigger.select()
                        //}), !1) : a > o ? (l.alert("止盈金额不能大于" + o + "元",
                        function () {
                            i.profit_trigger.val(o)
                        }), !1) : e > a ? (l.alert("止盈金额需大于" + e + "元",
                        function () {
                            i.profit_trigger.val(e)
                        }), !1) : (a = t.trim(i.loss_trigger.val()), o = i.loss_trigger.data("stop-loss") - 0, a ? isNaN(a) ? (l.alert("止损金额请输入数字",
                        function () {
                            i.loss_trigger.select()
                        }), !1) : a > o ? (l.alert("止损金额不能大于" + o + "元",
                        function () {
                            i.loss_trigger.val(o)
                        }), !1) : e > a ? (l.alert("止损金额需大于" + e + "元",
                        function () {
                            i.loss_trigger.val(e)
                        }), !1) : !0 : (i.loss_trigger.val(o), !0)) : (i.profit_trigger.val(o), !0)
                    }
                }
            });
        },
        "assets/js/biz/page/trade/settlement": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                e = require("_"),
                a = require("log"),
                n = require("net"),
                i = require("dataStore"),
                o = require("util/dates"),
                s = require("util/numbers"),
                d = require("mod/ajax-result"),
                c = require("mod/observer"),
                r = require("mod/position"),
                u = t("#doc"),
                l = u.find("div.page-trade"),
                m = l.find("section.main-trade"),
                f = u.find("div.page-settle"),
                F = f.find("article.settle"),
                h = f.find("div.lists"),
                v = '<div class="action"><a href="javascript:void(0)" class="button button-lesser more">查看更多</a></div>',
                p = '<div class="empty-tips">暂无交易</div>',
                b = i.get("config"),
                w = b.futures,
                g = [],
                y = {},
                D = {
                    token:b.token,
                    fundType:(b.tradeType==1?0:1),
                    futuresType:'',
                    pageNo:1,
                    pageSize:10
                },
                S = i.get("urlBalance"),
                q = !1;
                return {
                    init: function () {
                        this.initElems(),
                        this.wait(),
                        this.attach()
                    },
                    initElems: function () {
                        var t = m.find("p.summary").find("em");
                        this.$balance = t.eq(0),
                        this.$incomeSum = t.eq(1)
                    },
                    wait: function () {
                        var e = this;
                        f.on("tap", "div.action a.more",
                        function (a) {
                            a.preventDefault();
                            var n = t(this);
                            n.hasClass("button-disabled") || (n.addClass("button-disabled"), e.queryData())
                        })
                         f.on("tap", "a.go-back",
                        function (a) {
                            a.preventDefault();
                            f.hide(),
                            l.show(),
                            c.notify("pageSwitch", "page-quote")
                        })
                    },
                    attach: function () {
                        var t = this;
                        c.attach("panelSwitch",
                        function (e) {
                            q = "settle" === e,
                            q && (D.beginTime = "", t.queryData(!0))
                        }),
                        c.attach("newQuoteData",
                        function (t) {
                            y = t
                        })
                    },
                    queryData: function (t) {
                        var e = this;
                        D.futuresType=b.futures.id;
                        n.get({
                            url: S,
                            data: D,
                            success: function (n) {
                                d.done(n,
                                function () {
                                    n.code==200 ? (e.processData(n.data, t), e.updateBalance(n), e.addGetMore(n)) : a.error("获取结算数据失败")
                                })
                            },
                            complete: function () {
                                F.find("div.action a.more").removeClass("button-disabled")
                            }
                        })
                    },
                    processData: function (t, a) {
                        a && (g = [], h.html(""));
                        var n = r.renderSettle(t, y, g);
                        h.append(n ? n : a ? p : ""),
                        c.notify("appendContractQuery", e.union(g))
                    },
                    addGetMore: function (t) {
                        var e = t.data.length;
                        D.pageNo = e==10 ? (D.pageNo+1): 1,
                        e >= 10 ? 0 === F.children("div.action").length && F.append(v) : F.children("div.action").remove()
                    },
                    updateBalance: function (t) {
                        this.$balance.text(s.money(t.balance))
                    }
                }
            });
        },
        "assets/js/biz/page/trade/done": function () {
            define(function (require) {
                "use strict";
                var e = require("modLoader");
                //e([require("page/trade/base"),require("page/trade/futures"), require("page/trade/hash"), require("page/trade/sline"), require("page/trade/open-interest"), require("page/trade/tick"), require("page/trade/quote"), require("page/trade/kline"), require("page/trade/buy"), require("page/trade/sell"), require("page/trade/settlement")])
                 e([
                    require("page/trade/base"),
                    require("page/trade/hash"),
                    require("page/trade/futures"),
                    require("page/trade/tick")
                ]);
            });
        }
    };
    seajs.on("request",
    function (data) {
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
