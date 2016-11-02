(function () {
    var MERGE_MODS = {
        "assets/lib/jquery/1.0/main": function () {
            define(function () {
                "use strict";
                return jQuery.event.special.swipe.horizontalDistanceThreshold = 100,
                jQuery
            });
        },
        "assets/js/util/json": function () {
            define(function (require, exports, module) {
                "use strict";
                return {
                    parse: function (txt) {
                        return "string" == typeof txt ? eval("(" + txt + ")") : txt
                    },
                    stringify: function (t) {
                        return JSON.stringify(t)
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
                c = !1,
                f = function () {
                    r(),
                    u()
                },
                r = function () {
                    var n = t.find("div.float"),
                    s = n.children("div.content");
                    n.length || (t.append('<div class="float"><div class="content"></div></div>'), n = t.find("div.float"), s = n.children("div.content")),
                    a.length || (a = i('<div class="overlay-top msgbox msgbox-info hide"><div class="content"><div class="main"></div><div class="action"><a href="javascript:void(0)" class="button ok">确定</a></div></div></div>').appendTo(s)),
                    d.length || (d = i('<div class="overlay-top msgbox msgbox-confirm hide"><div class="content"><div class="main"></div><div class="action clearfix"><div class="left"><a href="javascript:void(0)" class="button button-lesser no">取消</a></div><div class="right"><a href="javascript:void(0)" class="button ok">确定</a></div></div></div></div>').appendTo(s)),
                    o.length || (o = i('<div class="msgbox-toast hide"><div class="content"></div></div>').appendTo(s))
                },
                u = function () {
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
                h = function (i) {
                    var n = a.find("div.action a.ok"),
                    t = "确定",
                    d = "javascript:void(0)";
                    i && i.ok && (t = i.ok.name || t, d = i.ok.url || d),
                    n.text(t).attr("href", d)
                },
                m = function (i) {
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
                b = function (i, n, t) {
                    s = n,
                    e = null,
                    i && (l = a.find("div.main").html(), a.find("div.main").html(i)),
                    h(t),
                    a.removeClass("hide")
                },
                p = function (i, n, t, a) {
                    s = n,
                    e = t,
                    i && (v = d.find("div.main").html(), d.find("div.main").html(i)),
                    m(a),
                    d.removeClass("hide")
                },
                x = 0,
                C = function (i) {
                    i && (o.children("div.content").text(i), o.removeClass("hide"), n.clear(x), x = n.one(function () {
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
                    !c && l && a.find("div.main").html(l),
                    !c && v && d.find("div.main").html(v)
                };
                return f(),
                {
                    alert: function (i, n, t) {
                        return "function" == typeof i && (t = n, n = i, i = null),
                        b(i, n, t),
                        this
                    },
                    confirm: function (i, n, t, a) {
                        return c = !1,
                        "function" == typeof i && (a = t, t = n, n = i, i = null),
                        p(i, n, t, a),
                        this
                    },
                    newConfirm: function (i, n, t, a) {
                        return c = !0,
                        "function" == typeof i && (a = t, t = n, n = i, i = null),
                        p(i, n, t, a),
                        this
                    },
                    toast: function (i) {
                        C(i)
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
                d = '<div class="loading hide"><div class="content"><img src="//res.6006.com/assets/imgs/loading/01.gif"/></div></div>',
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
        "assets/lib/lodash/1.0/main": function () {
            define(function () {
                "use strict";
                return _
            });
        },
        "assets/js/lang/data-store": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                n = require("_"),
                e = require("util/json"),
                i = t("#doc").data(),
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
                    },
                    getPram:function(name){
                          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                        var r = window.location.search.substr(1).match(reg);
                        if (r != null) return unescape(r[2]); return null;
                    }
                }
            });
        },
        "assets/js/biz/page/agreement/done": function () {
            define(function (require) {
                "use strict";
                var t = require("$"),
                n = require("net"),
                i = require("dataStore"),
                e = t("#doc"),
                a = e.find("section.main-agreement"),
                o = i.get("urlSigned"),
                w = require("assets/js/lang/cookie"),
                c = w.getPram('commodity'),
                u = {
                    init: function () {
                        this.wait()
                    },
                    wait: function () {
                        a.find("div.action a.button").on("tap",
                        function (t) {

                            t.preventDefault(),
                            w.setItem(c+'Signed',true,10000);
                            window.history.back();
                        })
                    }
                };
                u.init()
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