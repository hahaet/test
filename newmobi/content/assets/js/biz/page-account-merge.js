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
        "assets/js/biz/page/account/done": function () {
            define(function (require) {
                "use strict";
                var a = require("modLoader");
                a({
                    "section.main-withdrawal": "page/account/withdrawal",
                    "section.main-withdrawal-historys": "page/account/withdrawal-historys",
                    "section.main-withdrawal-detail": "page/account/withdrawal-detail",
                    "section.recharge-quickpay": "page/account/recharge-quickpay",
                    "section.recharge-quickpay-doit": "page/account/recharge-quickpay-doit",
                    "section.main-recharge-historys": "page/account/recharge-historys",
                    "section.main-recharge-alipay": "page/account/recharge-alipay",
                    "section.main-recharge-alipay-goto": "page/account/recharge-alipay-goto",
                    "section.main-recharge-transfer": "page/account/recharge-transfer",
                    "seciton.main-profile":'page/account/profile'
                })
            });
        },
        "assets/js/util/clipboard/1.0/main": function () {
            define(function () {
                "use strict";
                var e = function (e) {
                    var n;
                    try {
                        n = document.execCommand(e)
                    } catch (t) {
                        n = !1
                    }
                    return n
                },
                n = function (e) {
                    var n;
                    if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) e.focus(),
                    e.setSelectionRange(0, e.value.length),
                    n = e.value;
                    else {
                        e.hasAttribute("contenteditable") && e.focus();
                        var t = window.getSelection(),
                        o = document.createRange();
                        o.selectNodeContents(e),
                        t.removeAllRanges(),
                        t.addRange(o),
                        n = t.toString()
                    }
                    return n
                };
                return {
                    copy: function (t) {
                        n(t);
                        var o = e("copy");
                        return o
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
                            wait: u || 1e3,
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
        "assets/js/biz/page/account/recharge-alipay-goto": function () {
            define(function (require) {
                "use strict";
                var i = require("$"),
                t = require("util/clipboard"),
                n = require("ui/msgbox"),
                o = i("#doc"),
                a = o.find("section.main-recharge-alipay-goto");
                return {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        a.find("span.copy-link").on("tap",
                        function (o) {
                            o.preventDefault();
                            var a = t.copy(i(this).prev()[0]);
                            a && n.toast("复制成功")
                        })
                    }
                }
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
                w = require("assets/js/lang/cookie"),
                i = t("#doc").data(),
                c = t("#content").data(),
                r = {},
                u = /^\{.*\}$/m;
                i.token= w.getItem('token');
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
        "assets/js/biz/page/account/recharge-alipay": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                a = require("dataStore"),
                s = (require("_"), require("net")),
                f = require("dataStore"),
                i = require("ui/msgbox"),
                n = 'recharge_alipay_guide.html',
                e = t("#doc"),
                r = e.find("section.main-recharge-alipay");
                return {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        var a = this;
                        r.find("div.action a.next-step").on("tap",
                        function (c) {
                            c.preventDefault();
                            var e = a.getParams();
                            a.isValid(e) && s.get({
                                url: '/financy/financy/zfbTransfer',
                                data: e,
                                success: function (k) {
                                    k.code == 200?(/*window.location.href = 'https://qr.alipay.com/aex06800h1ubvsjs3940q9c'*/window.location.href='https://qr.alipay.com/aex05857mvwxmlgpyx00497'):(k.code==412?i.alert(k.msg,function(){window.location='../user/login.html'}):i.alert(k.msg))
                                }
                            });
                        })
                    },
                    getParams: function () {
                        return {
                            zfbNumber: t.trim(r.find("input.alipay-account").val()),
                            money: t.trim(r.find("input.amount").val()),
                            token:f.get('token')
                        }
                    },
                    isValid: function (t) {
                        return t.zfbNumber ? t.zfbNumber.length < 5 ? (i.alert("支付宝账号输入错误"), !1) : t.money ? /^\d+$/.test(t.money) ? !0 : (i.alert("充值金额请输入整数"), !1) : (i.alert("请输入金额"), !1) : (i.alert("请输入支付宝账号"), !1)
                    }
                }
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
                    i = r.errorMsg,
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
        "assets/js/biz/page/account/recharge-historys": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                s = (require("_"), require("net")),
                a = require("dataStore"),
                n = require("util/dates"),
                e = require("util/numbers"),
                i = require("util/strings"),
                o = require("mod/ajax-result"),
                r = t("#doc"),
                c = r.find("section.main-recharge-historys"),
                u = a.get("urlQuery"),
                l = "",
                d = '<li><a href="recharge_record_detail?id=${id}" class="clearfix"><span class="left"><span class="text-s16 bank">${type}</span><span class="text-lesser date">${time}</span></span><span class="right"><span class="text-s20 amount">${money}</span><span class="status text-right"><span class="text-stress">${status}</span></span></span></a></li>';
                return {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        var a = this;
                        c.find("div.action a.button").on("tap",
                        function (n) {
                            n.preventDefault();
                            var e = t(this);
                            e.hasClass("button-disabled") || (e.addClass("button-disabled"), l = l || e.data("value"), s.get({
                                url: u,
                                data: {
                                    beginTime: l
                                },
                                success: function (t) {
                                    o.done(t,
                                    function () {
                                        t.success && a.process(t.data, t.pageCount)
                                    })
                                },
                                complete: function () {
                                    e.removeClass("button-disabled")
                                }
                            }))
                        })
                    },
                    process: function (t, s) {
                        var a = "",
                        o = "";
                        t.forEach(function (t) {
                            o = t.time,
                            t.time = n.format(t.time, "y-M-D h:m:s"),
                            t.money = (t.money > 0 ? "+" : "") + e.money(t.money.toFixed(2)),
                            a += i.format(d, t)
                        }),
                        a && (l = n.format(o), c.find("ul.mod-list").append(a)),
                        (!a || t.length < s) && c.find("div.action").remove()
                    }
                }
            });
        },
        "assets/js/biz/page/account/recharge-quickpay-doit": function () {
            define(function (require) {
                "use strict";
                var e = require("$"),
                t = (require("log"), require("net")),
                s = require("dataStore"),
                o = require("util/timer"),
                n = require("mod/ajax-result"),
                i = e("#doc"),
                a = i.find("section.recharge-quickpay-doit"),
                d = s.get("config"),
                m = s.get("urlPay"),
                u = s.get("urlSendCode"),
                c = 0;
                return {
                    init: function () {
                        this.initElems(),
                        this.wait()
                    },
                    initElems: function () {
                        this.elems = {
                            mobile: a.find("input.mobile"),
                            smscode: a.find("input.smscode"),
                            getsmscode: a.find("a.get-smscode"),
                            submit: a.find("div.action > a.button")
                        }
                    },
                    wait: function () {
                        var s = this,
                        o = this.elems;
                        o.mobile.on("keyup",
                        function () {
                            s.check()
                        }),
                        o.smscode.on("keyup",
                        function () {
                            s.check()
                        }),
                        o.getsmscode.on("tap",
                        function (i) {
                            i.preventDefault(),
                            o.getsmscode.hasClass("button-disabled") || (o.getsmscode.addClass("button-disabled"), s.countdown(), d.token = "", d.payNumber = "", t.get({
                                url: u,
                                data: {
                                    mobile: e.trim(o.mobile.val()),
                                    money: d.money,
                                    cardNumber: d.cardNumber
                                },
                                success: function (e) {
                                    n.done(e,
                                    function () {
                                        e.success && (d.token = e.token, d.payNumber = e.payNumber)
                                    })
                                }
                            }))
                        }),
                        o.submit.on("tap",
                        function (s) {
                            s.preventDefault(),
                            o.submit.hasClass("button-disabled") || (o.submit.addClass("button-disabled"), o.mobile.blur(), o.smscode.blur(), t.post({
                                url: m,
                                data: {
                                    mobile: e.trim(o.mobile.val()),
                                    verifyCode: e.trim(o.smscode.val()),
                                    bank: d.bank,
                                    money: d.money,
                                    cardNumber: d.cardNumber,
                                    token: d.token,
                                    payNumber: d.payNumber
                                },
                                complete: function () {
                                    o.submit.removeClass("button-disabled")
                                }
                            }))
                        })
                    },
                    countdown: function () {
                        var e = this.elems;
                        c = 60;
                        var t = function () {
                            0 === c ? (e.getsmscode.text("获取验证码"), e.getsmscode.removeClass("button-disabled")) : (e.getsmscode.text(c + "秒后重发"), c--, o.one(t))
                        };
                        t()
                    },
                    check: function () {
                        var t = this.elems,
                        s = e.trim(t.mobile.val()),
                        o = e.trim(t.smscode.val()),
                        n = /\d{11}/.test(s),
                        i = /\d{6}/.test(o),
                        a = 0 === c;
                        t.getsmscode.toggleClass("button-disabled", !(n && a)),
                        t.submit.toggleClass("button-disabled", !(n && i))
                    }
                }
            });
        },
        "assets/js/biz/page/account/recharge-quickpay": function () {
            define(function (require) {
                "use strict";
                var a = require("$"),
                    net = (require("log"), require("net")),
                t = require("dataStore"),
                e = require("ui/msgbox"),
                n = a("#doc"),
                j = require("util/json"),
                i = n.find("div.page-quickpay"),
                d = n.find("div.page-bank-list"),
                m = require("ui/menu"),
                r = t.get("urlNext");
                return {
                    init: function () {
                        this.initMenu(),
                        this.wait()
                    },
                    initMenu: function () {
                        var a = i.find(".bank-account").parent().parent().data("source");
                        if (a) {
                            a = j.parse(a),
                                n = [];
                            a.data.forEach(function(a, t) {
                                    n[t] = {
                                        name: a.card,
                                        value: a.id
                                    }
                                }),
                                this.menuBank = new m(n)
                        }
                    },
                    wait: function () {
                        var t = this;
                        i.find("div.choose-bank").on("tap",
                        function (a) {
                            a.preventDefault(),
                            i.addClass("hide"),
                            d.removeClass("hide")
                        }),
                        d.find("a.go-back").on("tap",
                        function (a) {
                            a.preventDefault(),
                            i.removeClass("hide"),
                            d.addClass("hide")
                        }),
                        d.find("ul.bank-list").on("tap", "li",
                        function (e) {
                            e.preventDefault(),
                            i.removeClass("hide"),
                            d.addClass("hide"),
                            t.chooseBank(a(this).find("span.name").text(), a(this).data("value"))
                        }),
                        i.find("div.action a.next-step").on("tap",
                        function (e) {
                            if (e.preventDefault(), "javascript:void(0)" !== a(this).attr("href")) return void (window.location.href = a(this).attr("href"));
                            var n = t.getParams(); 
                            var _t = a(this);
                            if (t.isValid(n) && !_t.hasClass("button-disabled")) {
                                _t.addClass("button-disabled");
                                net.post({
                                    url: r,
                                    data: n,
                                    complete: function() {
                                        _t.removeClass("button-disabled");
                                    }
                                });
                            }
                        }),
                        i.find(".bank-account").parent().parent().on("tap",
                        function (n) {
                            n.preventDefault();
                            var b = a(this).find(".bank-account");
                            t.menuBank.show(function (a, n) {
                                if (n === "newcard") {
                                    i.find(".new-bank-name").removeClass("hide"),
                                    i.find(".new-bank-number").removeClass("hide"),
                                    i.addClass("hide"),
                                    d.removeClass("hide"),
                                    i.find(".bank-account").text("使用其他银行卡支付");
                                    i.find(".new-card").val("1"), console.log(i.find(".new-card").val())
                                } else {
                                    i.find(".new-bank-name").addClass("hide"),
                                    i.find(".new-bank-number").addClass("hide"),
                                    i.find(".new-card").val("0"),
                                    b.data("value", n),
                                    b.text(a), console.log(i.find(".new-card").val())
                                }
                            })
                        })
                    },
                    getParams: function () {
                        if (i.find(".new-card").val() === "1") {
                            t = i.find(".bank-number");
                            return {
                                bank: i.find("div.bank-name").text(),
                                cardNumber: a.trim(t.data("value") || t.val()),
                                money: a.trim(i.find("input.amount").val()),
                                idCard: a.trim(i.find("input.id-card").val()),
                                realName: a.trim(i.find("input.real-name").val()),
                            }
                        } else {
                            t = i.find(".bank-account");
                            return {
                                cardCode: a.trim(t.data("value") || t.val()),
                                money: a.trim(i.find("input.amount").val())
                            }
                        }
                    },
                    isValid: function (a) {
                        if (i.find(".new-card").val() === "1") {
                            if (i.find("input.real-name").length > 0 && a.realName === "") {
                                e.alert("请输入持卡人姓名");
                                return false;
                            }

                            if (i.find("input.id-card").length > 0 && a.idCard === "") {
                                e.alert("请输入身份证号");
                                return false;
                            }

                            return -1 !== a.bank.indexOf("请选择") ? (e.alert("请选择支付银行"), !1) : a.cardNumber ? a.money ? !0 : (e.alert("请输入金额"), !1) : (e.alert("请输入卡号"), !1)
                        }
                        else if (i.find(".has-card").val() ==="1") {
                            if (!a.cardCode) {
                                e.alert("请选择绑定的银行卡或选择新的支付银行");
                                return !1;
                            } if (!a.money) {
                                e.alert("请输入金额");
                                return !1;
                            }
                            return true;
                        }
                    },
                    chooseBank: function (a, t) {
                        var e = i.find("div.choose-bank div.bank-name");
                        e.text(a).removeClass("text-lesser"),
                        e.next().removeClass("hide").text(t)
                    }
                }
            });
        },
        "assets/js/biz/page/account/recharge-transfer": function () {
            define(function (require) {
                "use strict"; {
                    var e = require("$"),
                    n = require("ui/msgbox"),
                    t = e("#doc");
                    t.find("section.main-recharge-transfer")
                }
                return {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        t.find("header.page-header a.desc").on("tap",
                        function (e) {
                            e.preventDefault(),
                            n.alert()
                        })
                    }
                }
            });
        },
        "assets/js/biz/page/account/withdrawal-historys": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                s = (require("_"), require("net")),
                a = require("dataStore"),
                n = require("util/dates"),
                e = require("util/numbers"),
                i = require("util/strings"),
                k = require("ui/msgbox"),
                o = require("mod/ajax-result"),
                r = t("#doc"),
                l = r.find("section.main-withdrawal-historys"),
                d = '/user/finance/findIOList.do',
                u = "",
                c = '<li><a href="withdrawDetail.html?id=${id}" class="clearfix"><span class="left"><span class="text-s16 bank">${money}元</span><span class="text-lesser date">${createTime}</span></span><span class="right"><span class="status text-right"><span class="text-stress">${status}</span></span></span></a></li>';
                return {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        var f = this;
                       s.post({
                            url: d,
                            data: {type:'-1',offset:0,size:50},
                            success: function (t) {
                                o.done(t,
                                function () {
                                    t.code==200 ? f.process(t.data):K.alert(d.msg);
                                })
                            }
                        })
                    },
                    process: function (t, s) {
                        var a = "",
                        o = "";

                        t.forEach(function (t) {
                            var s = {0:'审批中',1:'审批通过',2:'转账中',3:'提现成功',4:'提现拒绝',5:'转账失败'};
                            t.status = s[t.status];
                            a += i.format(c, t)
                        }),
                        a &&  l.find("ul.mod-list").append(a)
                    }
                }
            });
        },
         "assets/js/biz/page/account/withdrawal-detail": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                s = (require("_"), require("net")),
                a = require("dataStore"),
                n = require("util/dates"),
                e = require("util/numbers"),
                i = require("util/strings"),
                k = require("ui/msgbox"),
                o = require("mod/ajax-result"),
                r = t("#doc"),
                l = r.find("section.main-withdrawal-detail"),
                d = '/user/finance/findIOInfo.do',
                u = "",
                m = function(name){
                     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                },
                c = '<li class="clearfix"><div class="left"><div class="status text-right"><span class="text-s16">提现金额</span></div></div><div class="right"><span class="text-s16 amount text-stress">${money}元</span></div></li>\
                <li><div class="left"> <div class="status text-right"><span class="text-s16">提现状态</span></div></div><div class="right"><span class="text-s16 amount text-stress">${status}</span></div></li>\
                <li class="clearfix"><div class="left"><div class="status text-right"><span class="text-s16">实际到账</span></div></div><div class="right"><span class="text-s16 amount text-stress">${fact}元</span></div></li>\
                <li class="clearfix"><div class="left"><div class="status text-right"><span class="text-s16">交易手续费</span></div></div><div class="right"><span class="text-s16 amount text-stress">${factTax}元</span></div></li>\
                <li class="clearfix"><div class="left"><div class="status text-right"><span class="text-s16">提现银行</span></div></div><div class="right"><span class="text-s16 amount text-stress">${issuingBankName}</span></div></li>\
                <li><div class="left"> <div class="status text-right"><span class="text-s16">提现时间</span></div></div><div class="right"> <span class="text-s16 amount text-stress">${createTime}</span> </div></li>\
                <li><div class="left"> <div class="status text-right"><span class="text-s16">到账时间</span></div></div><div class="right"><span class="text-s16 amount text-stress">${updateTime}</span></div></li>';
                return {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        var f = this;
                       s.post({
                            url: d,
                            data: {
                                type:'-1',
                                id:m('id') 
                            },
                            success: function (t) {
                                o.done(t,
                                function () {
                                    t.code==200 ? f.process(t.data):K.alert(d.msg);
                                })
                            }
                        })
                    },
                    process: function (t) {
                        t.fact = t.money-t.commission;
                        var s = {0:'审批中',1:'审批通过',2:'转账中',3:'提现成功',4:'提现拒绝',5:'转账失败'};
                        t.status = s[t.status];
                        var a =i.format(c, t)
                        a &&  l.find("ul.mod-list").append(a)
                    }
                }
            });
        },
         "assets/js/biz/page/account/profile": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                s = (require("_"), require("net")),
                a = require("dataStore"),
                n = require("util/dates"),
                e = require("util/numbers"),
                i = require("util/strings"),
                o = require("mod/ajax-result"),
                k = require("ui/msgbox"),
                r = t("#doc"),
                l = r.find("ul.mod-list-sample li"),
                d = '/user/user/showAuthentication.do';
                return {
                    init: function () {
                        this.wait();
                        this.rename()
                    },
                    wait: function () {
                        var _this=this;
                 
                       s.get({
                            url: d,
                            data: {},
                            success: function (t) {
                                o.done(t,
                                function () {
                                    t.code==200 ? _this.process(t.data):k.alert(t.msg,function(){
                                        if(t.code==41022)window.location.href="/user/login.html";
                                    });
                                })
                            }
                        });
                    },
                    process: function (t, s) {
                        var s={1:'已填写',0:'未认证',2:'已认证'};
                          t.userStatus=s[t.idStatus];
                          t.bankStatus=s[t.cardState];
                        l.eq(0).find('span:eq(3)').text(t.userStatus);
                         l.eq(1).find('span:eq(3)').text(t.bankStatus);
                         l.eq(2).find('span:eq(3)').text(localStorage.getItem('ut'));
                    },
                    rename : function(){
                        var AmyNameF = t('#myName');
                        var AmyName = AmyNameF.find('.nameX');
                        var AchangeN = t('#changeN');
                        var Achange2 = t('#chang2');
                        var Aqx = AchangeN.find('.qx');
                        var Aqd = AchangeN.find('.qd');
                        var AnameI = AchangeN.find('.nameI');
                        var Atext = AchangeN.find('.text');
                        var Abtn = AchangeN.find('.btn');

                        var maxH = window.screen.availHeight;
                        AchangeN.css('height',maxH);
                        Achange2.css('height',maxH);

                        t.ajax({
                            url: '/user/user/findIsUpdateNickName.do',
                            data: {},
                            dataType: 'json',
                            type: 'post',
                            success: function (data) {
                                if(data.code == 200){
                                    AmyName.html(data.data.userName);
                                    AmyNameF.on('click',function(){
                                        if(!data.data.bIsSetNickName){
                                            AchangeN.css('display','block');
                                        }
                                        else{
                                            Achange2.css('display','block');
                                            Achange2.animate({'opacity':'1'},200,'linear');
                                            setTimeout(function(){
                                            Achange2.animate({'opacity':'0'},500,'linear',function(){
                                                Achange2.css('display','none');
                                            });
                                            },1000)
                                        }
                                    });
                                    if(data.data.bIsSetNickName){
                                        var Ajiant = t('#jianT');
                                        Ajiant.css('display','none');
                                    }
                                }
                            }
                        });

                        AnameI.on('keyup',function(){
                            var iNow = t(this).val().length;
                            if(iNow >= 3){
                                Aqd.removeClass('qd1');
                            }
                            else{
                                Aqd.addClass('qd1');
                            }
                        });

                        Aqx.on('click',function(){
                            AchangeN.css('display','none');
                        });

                        Aqd.on('click',function(){
                            var str = AnameI.val();

                            if(str.length >= 3){
                                t.ajax({
                                    url:'/user/user/updateNickName.do',
                                    data: {nickName : str},
                                    dataType : 'json',
                                    type : 'post',
                                    success : function(data){
                                        if(data.code == 200){
                                            window.location.reload();
                                        }
                                        else{
                                            //$changeN.css('display','none');
                                            Atext.html('<p class="nomore">'+data.msg+'</p>');
                                            Abtn.html('<div class="goBack">确定</div>');
                                            var AgoBack = AchangeN.find('.goBack');

                                            AgoBack.on('click',function(){
                                                window.location.reload();
                                            });
                                        }

                                    }
                                });
                            }
                        });
                    }
                }
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
        "assets/js/biz/page/account/withdrawal": function () {
            define(function (require) {
                "use strict";
                var a = require("$"),
                n = (require("log"), require("net")),
                t = require("dataStore"),
                i = require("util/json"),
                e = require("ui/msgbox"),
                load = require("ui/loading"),
                r = require("ui/menu"),
                s = t.get("urlSave"),
                d = a("#doc"),
                x = a('.nobind'),
                y = a('.bind'),
                z = y.find('.withdraw-bank'),
                f = d.find('.balance'),
                u = d.find("section.main-withdrawal");
                return {
                    init: function () {
                        load.show();
                        this.checkBack();
                        this.wait();
                        this.initAmt();
                    },
                    checkBack:function(){
                        var l=this;
                         n.get({
                            url: '/user/user/showAuthentication.do',
                            data: {},
                            success: function (m) {
                                m.code==200?(m.data.cardState?l.initMenu(m.data):x.css('display','block')):e.alert(m.msg);
                                setTimeout(function(){
                                    load.hide();
                                },500);
                            }
                        });
                    },
                    initAmt:function(){
                        var l=this;
                         n.get({
                            url: '/user/user/findUserInfo.do',
                            data: {},
                            success: function (m) {
                                if(m.code==200){
                                    f.text(parseFloat(m.data.moneyUsable).toFixed(2));
                                }else{
                                   m.code==41022?e.alert('您已在其他设备登录，请确认',function(){window.location='../user/login.html'}):e.alert(m.msg);
                                };
                            }
                        });
                    },
                    initMenu: function (k) {

                        z.text(k.issuingbankName+"*"+k.cardNumber.substring(k.cardNumber.length-4,k.cardNumber.length)).attr('data-status',k.cardState);
                       
                        y.css('display','block');
                         
                    },
                    wait: function () {
                        var t = this;
                        u.find("a.next-step").on("tap",
                        function (i) {
                            i.preventDefault();
                            var z = a(this);
                            if (!z.hasClass("button-disabled")) {
                                z.addClass("button-disabled");
                                var r = t.getParams();
                                t.isValid(r) ? n.ajax({
                                    url: "/user/finance/draw.do",
                                    data: r,
                                    success:function(m){
                                        m.code==200?e.alert(m.msg,function(){window.location='../mine.html'}):e.alert(m.msg);
                                          z.removeClass("button-disabled");
                                    }
                                }) : z.removeClass("button-disabled")
                            }
                        }),
                        u.find("span.withdraw-bank").parent().on("tap",
                        function (n) {
                            n.preventDefault();
                            var i = a(this).find("span.withdraw-bank");
                            if(i.data('status')!=1) window.location='../account/bindBank.html';
                        })
                    },
                    getParams: function () {
                        return {
                            money: a.trim(u.find("input.amount").val()),
                        }
                    },
                    isValid: function (a) {
                        var m = a.money.match(/^[\+\-]?\d*?\.?\d*?$/);
                        return m&&m[0] ? !0 :(e.alert("请输入正确金额"), !1)
                    }
                }
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