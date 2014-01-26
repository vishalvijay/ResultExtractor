/*!CK:2320337163!*//*1389912124,178185015*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["Z3urS"]);
}




self.__DEV__ = self.__DEV__ || 0;



if (JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]')
    JSON.stringify = function(a) {
        var b = /\u2028/g, c = /\u2029/g;
        return function(d, e, f) {
            var g = a.call(this, d, e, f);
            if (g) {
                if (-1 < g.indexOf('\u2028'))
                    g = g.replace(b, '\\u2028');
                if (-1 < g.indexOf('\u2029'))
                    g = g.replace(c, '\\u2029');
            }
            return g;
        };
    }(JSON.stringify);



if (!String.prototype.startsWith)
    String.prototype.startsWith = function(a) {
        var b = String(this);
        if (this == null)
            throw TypeError();
        var c = arguments.length > 1 ? Number(arguments[1]) : 0;
        if (isNaN(c))
            c = 0;
        var d = Math.min(Math.max(c, 0), b.length);
        return b.indexOf(String(a), c) == d;
    };
if (!String.prototype.endsWith)
    String.prototype.endsWith = function(a) {
        var b = String(this);
        if (this == null)
            throw TypeError();
        var c = b.length, d = String(a), e = arguments.length > 1 ? Number(arguments[1]) : c;
        if (isNaN(e))
            e = 0;
        var f = Math.min(Math.max(e, 0), c), g = f - d.length;
        if (g < 0)
            return false;
        return b.lastIndexOf(d, g) == g;
    };
if (!String.prototype.contains)
    String.prototype.contains = function(a) {
        if (this == null)
            throw TypeError();
        var b = String(this), c = arguments.length > 1 ? Number(arguments[1]) : 0;
        if (isNaN(c))
            c = 0;
        return b.indexOf(String(a), c) != -1;
    };
if (!String.prototype.repeat)
    String.prototype.repeat = function(a) {
        if (this == null)
            throw TypeError();
        var b = String(this), c = a ? Number(a) : 0;
        if (isNaN(c))
            c = 0;
        if (c < 0 || c === Infinity)
            throw RangeError();
        if (c === 0)
            return '';
        var d = '';
        while (c--)
            d += b;
        return d;
    };


__t = function(a) {
    return a[0];
};
__w = function(a) {
    return a;
};

(function(a) {
    if (a.require)
        return;
    var b = Object.prototype.toString, c = {}, d = {}, e = {}, f = 0, g = 1, h = 2, i = Object.prototype.hasOwnProperty;
    function j(s) {
        if (a.ErrorUtils && !a.ErrorUtils.inGuard())
            return ErrorUtils.applyWithGuard(j, this, arguments);
        var t = c[s], u, v, w;
        if (!c[s]) {
            w = 'Requiring unknown module "' + s + '"';
            throw new Error(w);
        }
        if (t.hasError)
            throw new Error('Requiring module "' + s + '" which threw an exception');
        if (t.waiting) {
            w = 'Requiring module "' + s + '" with unresolved dependencies';
            throw new Error(w);
        }
        if (!t.exports) {
            var x = t.exports = {}, y = t.factory;
            if (b.call(y) === '[object Function]') {
                var z = [], aa = t.dependencies, ba = aa.length, ca;
                if (t.special & h)
                    ba = Math.min(ba, y.length);
                try {
                    for (v = 0; v < ba; v++) {
                        u = aa[v];
                        z.push(u === 'module' ? t : (u === 'exports' ? x : j.call(null, u)));
                    }
                    try {
                        ca = y.apply(t.context || a, z);
                    } catch (da) {
                        if (c.ex && c.erx) {
                            var ea = j.call(null, 'ex'), fa = j.call(null, 'erx'), ga = fa(da.message);
                            if (ga[0].indexOf(' from module "%s"') < 0) {
                                ga[0] += ' from module "%s"';
                                ga[ga.length] = s;
                            }
                            da.message = ea.apply(null, ga);
                        }
                        throw da;
                    }
                } catch (da) {
                    t.hasError = true;
                    throw da;
                }
                if (ca)
                    t.exports = ca;
            } else
                t.exports = y;
        }
        if (t.refcount-- === 1)
            delete c[s];
        return t.exports;
    }
    function k(s, t, u, v, w, x) {
        if (t === undefined) {
            t = [];
            u = s;
            s = n();
        } else if (u === undefined) {
            u = t;
            if (b.call(s) === '[object Array]') {
                t = s;
                s = n();
            } else
                t = [];
        }
        var y = {cancel: l.bind(this, s)}, z = c[s];
        if (z) {
            if (x)
                z.refcount += x;
            return y;
        } else if (!t && !u && x) {
            e[s] = (e[s] || 0) + x;
            return y;
        } else {
            z = {id: s};
            z.refcount = (e[s] || 0) + (x || 0);
            delete e[s];
        }
        z.factory = u;
        z.dependencies = t;
        z.context = w;
        z.special = v;
        z.waitingMap = {};
        z.waiting = 0;
        z.hasError = false;
        c[s] = z;
        p(s);
        return y;
    }
    function l(s) {
        if (!c[s])
            return;
        var t = c[s];
        delete c[s];
        for (var u in t.waitingMap)
            if (t.waitingMap[u])
                delete d[u][s];
        for (var v = 0; v < t.dependencies.length; v++) {
            u = t.dependencies[v];
            if (c[u]) {
                if (c[u].refcount-- === 1)
                    l(u);
            } else if (e[u])
                e[u]--;
        }
    }
    function m(s, t, u) {
        return k(s, t, undefined, g, u, 1);
    }
    function n() {
        return '__mod__' + f++;
    }
    function o(s, t) {
        if (!s.waitingMap[t] && s.id !== t) {
            s.waiting++;
            s.waitingMap[t] = 1;
            d[t] || (d[t] = {});
            d[t][s.id] = 1;
        }
    }
    function p(s) {
        var t = [], u = c[s], v, w, x;
        for (w = 0; w < u.dependencies.length; w++) {
            v = u.dependencies[w];
            if (!c[v]) {
                o(u, v);
            } else if (c[v].waiting)
                for (x in c[v].waitingMap)
                    if (c[v].waitingMap[x])
                        o(u, x);
        }
        if (u.waiting === 0 && u.special & g)
            t.push(s);
        if (d[s]) {
            var y = d[s], z;
            d[s] = undefined;
            for (v in y) {
                z = c[v];
                for (x in u.waitingMap)
                    if (u.waitingMap[x])
                        o(z, x);
                if (z.waitingMap[s]) {
                    z.waitingMap[s] = undefined;
                    z.waiting--;
                }
                if (z.waiting === 0 && z.special & g)
                    t.push(v);
            }
        }
        for (w = 0; w < t.length; w++)
            j.call(null, t[w]);
    }
    function q(s, t) {
        c[s] = {id: s};
        c[s].exports = t;
    }
    q('module', 0);
    q('exports', 0);
    q('define', k);
    q('global', a);
    q('require', j);
    q('requireDynamic', j);
    q('requireLazy', m);
    k.amd = {};
    a.define = k;
    a.require = j;
    a.requireDynamic = j;
    a.requireLazy = m;
    j.__debug = {modules: c, deps: d};
    var r = function(s, t, u, v) {
        k(s, t, u, v || h);
    };
    a.__d = function(s, t, u, v) {
        t = ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'].concat(t);
        r(s, t, u, v);
    };
})(this);
__d("lowerDomain", [], function(a, b, c, d, e, f) {
    if (document.domain.toLowerCase().match(/(^|\.)facebook\..*/))
        document.domain = "facebook.com";
});
__d("markJSEnabled", [], function(a, b, c, d, e, f) {
    var g = document.documentElement;
    g.className = g.className.replace('no_js', '');
});
__d("eprintf", [], function(a, b, c, d, e, f) {
    var g = function(h) {
        var i = Array.prototype.slice.call(arguments).map(function(l) {
            return String(l);
        }), j = h.split('%s').length - 1;
        if (j !== i.length - 1)
            return g('eprintf args number mismatch: %s', JSON.stringify(i));
        var k = 1;
        return h.replace(/%s/g, function(l) {
            return String(i[k++]);
        });
    };
    e.exports = g;
});
__d("ex", [], function(a, b, c, d, e, f) {
    var g = function(h) {
        var i = Array.prototype.slice.call(arguments).map(function(k) {
            return String(k);
        }), j = h.split('%s').length - 1;
        if (j !== i.length - 1)
            return g('ex args number mismatch: %s', JSON.stringify(i));
        return g._prefix + JSON.stringify(i) + g._suffix;
    };
    g._prefix = '<![EX[';
    g._suffix = ']]>';
    e.exports = g;
});
__d("erx", ["ex"], function(a, b, c, d, e, f) {
    var g = b('ex'), h = function(i) {
        if (typeof i !== 'string')
            return i;
        var j = i.indexOf(g._prefix), k = i.lastIndexOf(g._suffix);
        if (j < 0 || k < 0)
            return [i];
        var l = j + g._prefix.length, m = k + g._suffix.length;
        if (l >= k)
            return ['erx slice failure: %s', i];
        var n = i.substring(0, j), o = i.substring(m);
        i = i.substring(l, k);
        var p;
        try {
            p = JSON.parse(i);
            p[0] = n + p[0] + o;
        } catch (q) {
            return ['erx parse failure: %s', i];
        }
        return p;
    };
    e.exports = h;
});
__d("copyProperties", [], function(a, b, c, d, e, f) {
    function g(h, i, j, k, l, m, n) {
        h = h || {};
        var o = [i, j, k, l, m], p = 0, q;
        while (o[p]) {
            q = o[p++];
            for (var r in q)
                h[r] = q[r];
            if (q.hasOwnProperty && q.hasOwnProperty('toString') && (typeof q.toString != 'undefined') && (h.toString !== q.toString))
                h.toString = q.toString;
        }
        return h;
    }
    e.exports = g;
});
__d("Env", ["copyProperties"], function(a, b, c, d, e, f) {
    var g = b('copyProperties'), h = {start: Date.now()};
    if (a.Env) {
        g(h, a.Env);
        a.Env = undefined;
    }
    e.exports = h;
});
__d("wrapFunction", [], function(a, b, c, d, e, f) {
    var g = {};
    function h(i, j, k) {
        j = j || 'default';
        return function() {
            var l = j in g ? g[j](i, k) : i;
            return l.apply(this, arguments);
        };
    }
    h.setWrapper = function(i, j) {
        j = j || 'default';
        g[j] = i;
    };
    e.exports = h;
});
__d("ErrorUtils", ["eprintf", "erx", "Env", "wrapFunction"], function(a, b, c, d, e, f) {
    var g = b('eprintf'), h = b('erx'), i = b('Env'), j = b('wrapFunction'), k = '<anonymous guard>', l = '<generated guard>', m = '<window.onerror>', n = /^https?:\/\//i, o = /^Type Mismatch for/, p = ['Unknown script code', 'Function code', 'eval code'], q = new RegExp('(.*?)(\\s)(?:' + p.join('|') + ')$'), r = [], s, t = [], u = 50, v = [], w = false, x = false;
    function y(ka) {
        if (!ka)
            return [];
        var la = ka.split(/\n\n/)[0].replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/g, '').split('\n').map(function(ma) {
            var na, oa, pa;
            ma = ma.trim();
            if (/(:(\d+)(:(\d+))?)$/.test(ma)) {
                oa = RegExp.$2;
                pa = RegExp.$4;
                ma = ma.slice(0, -RegExp.$1.length);
            }
            if (q.test(ma) || /(.*)(@|\s)[^\s]+$/.test(ma)) {
                ma = ma.substring(RegExp.$1.length + 1);
                na = /(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1) ? RegExp.$2 : '';
            }
            var qa = {identifier: na, script: ma, line: oa, column: pa};
            if (s)
                s(qa);
            qa.text = '    at' + (qa.identifier ? ' ' + qa.identifier + ' (' : ' ') + qa.script + (qa.line ? ':' + qa.line : '') + (qa.column ? ':' + qa.column : '') + (qa.identifier ? ')' : '');
            return qa;
        });
        return la;
    }
    function z(ka) {
        if (!ka) {
            return {};
        } else if (ka._originalError)
            return ka;
        var la = y(ka.stackTrace || ka.stack), ma = false;
        if (ka.framesToPop) {
            var na = ka.framesToPop, oa;
            while (na > 0 && la.length > 0) {
                oa = la.shift();
                na--;
                ma = true;
            }
            if (o.test(ka.message) && ka.framesToPop === 2 && oa)
                if (n.test(oa.script))
                    ka.message += ' at ' + oa.script + (oa.line ? ':' + oa.line : '') + (oa.column ? ':' + oa.column : '');
            delete ka.framesToPop;
        }
        var pa = {line: ka.lineNumber || ka.line, column: ka.columnNumber || ka.column, name: ka.name, message: ka.message, type: ka.type, script: ka.fileName || ka.sourceURL || ka.script, stack: la.map(function(ra) {
                return ra.text;
            }).join('\n'), stackFrames: la, guard: ka.guard, guardList: ka.guardList, extra: ka.extra, snapshot: ka.snapshot};
        if (typeof pa.message === 'string') {
            pa.messageWithParams = h(pa.message);
            pa.message = g.apply(a, pa.messageWithParams);
        } else {
            pa.messageObject = pa.message;
            pa.message = String(pa.message);
        }
        if (s)
            s(pa);
        if (ma) {
            delete pa.script;
            delete pa.line;
            delete pa.column;
        }
        if (la[0]) {
            pa.script = pa.script || la[0].script;
            pa.line = pa.line || la[0].line;
            pa.column = pa.column || la[0].column;
        }
        pa._originalError = ka;
        for (var qa in pa)
            (pa[qa] == null && delete pa[qa]);
        return pa;
    }
    function aa(ka, la) {
        if (x)
            return false;
        if (v.length > 0) {
            ka.guard = ka.guard || v[0];
            ka.guardList = v.slice();
        }
        ka = z(ka);
        !la;
        if (t.length > u)
            t.splice(u / 2, 1);
        t.push(ka);
        x = true;
        for (var ma = 0; ma < r.length; ma++)
            try {
                r[ma](ka);
            } catch (na) {
            }
        x = false;
        return true;
    }
    function ba() {
        return w;
    }
    function ca(ka) {
        v.unshift(ka);
        w = true;
    }
    function da() {
        v.shift();
        w = (v.length !== 0);
    }
    function ea(ka, la, ma, na, oa) {
        ca(oa || k);
        var pa, qa = i.nocatch || (/nocatch/).test(location.search);
        if (qa) {
            try {
                pa = ka.apply(la, ma || []);
            } finally {
                da();
            }
            return pa;
        }
        try {
            pa = ka.apply(la, ma || []);
            return pa;
        } catch (ra) {
            var sa = z(ra);
            if (na)
                na(sa);
            if (ka)
                sa.callee = ka.toString().substring(0, 100);
            if (ma)
                sa.args = Array.prototype.slice.call(ma).toString().substring(0, 100);
            sa.guard = v[0];
            sa.guardList = v.slice();
            aa(sa);
        } finally {
            da();
        }
    }
    function fa(ka, la, ma) {
        la = la || ka.name || l;
        function na() {
            return ea(ka, ma || this, arguments, null, la);
        }
        return na;
    }
    j.setWrapper(fa, 'entry');
    function ga(ka, la, ma, na, oa) {
        oa = oa || {};
        oa.message = oa.message || ka;
        oa.script = oa.script || la;
        oa.line = oa.line || ma;
        oa.column = oa.column || na;
        oa.guard = m;
        oa.guardList = [m];
        aa(oa, true);
    }
    window.onerror = ga;
    function ha(ka, la) {
        r.push(ka);
        if (!la)
            t.forEach(ka);
    }
    function ia(ka) {
        s = ka;
    }
    var ja = {ANONYMOUS_GUARD_TAG: k, GENERATED_GUARD_TAG: l, GLOBAL_ERROR_HANDLER_TAG: m, addListener: ha, setSourceResolver: ia, applyWithGuard: ea, guard: fa, history: t, inGuard: ba, normalizeError: z, onerror: ga, reportError: aa};
    e.exports = a.ErrorUtils = ja;
    if (typeof __t === 'function' && __t.setHandler)
        __t.setHandler(aa);
});
__d("CallbackDependencyManager", ["ErrorUtils"], function(a, b, c, d, e, f) {
    var g = b('ErrorUtils');
    function h() {
        "use strict";
        this.$CallbackDependencyManager0 = {};
        this.$CallbackDependencyManager1 = {};
        this.$CallbackDependencyManager2 = 1;
        this.$CallbackDependencyManager3 = {};
    }
    h.prototype.$CallbackDependencyManager4 = function(i, j) {
        "use strict";
        var k = 0, l = {};
        for (var m = 0, n = j.length; m < n; m++)
            l[j[m]] = 1;
        for (var o in l) {
            if (this.$CallbackDependencyManager3[o])
                continue;
            k++;
            if (this.$CallbackDependencyManager0[o] === undefined)
                this.$CallbackDependencyManager0[o] = {};
            this.$CallbackDependencyManager0[o][i] = (this.$CallbackDependencyManager0[o][i] || 0) + 1;
        }
        return k;
    };
    h.prototype.$CallbackDependencyManager5 = function(i) {
        "use strict";
        if (!this.$CallbackDependencyManager0[i])
            return;
        for (var j in this.$CallbackDependencyManager0[i]) {
            this.$CallbackDependencyManager0[i][j]--;
            if (this.$CallbackDependencyManager0[i][j] <= 0)
                delete this.$CallbackDependencyManager0[i][j];
            this.$CallbackDependencyManager1[j].$CallbackDependencyManager6--;
            if (this.$CallbackDependencyManager1[j].$CallbackDependencyManager6 <= 0) {
                var k = this.$CallbackDependencyManager1[j].$CallbackDependencyManager7;
                delete this.$CallbackDependencyManager1[j];
                g.applyWithGuard(k);
            }
        }
    };
    h.prototype.addDependenciesToExistingCallback = function(i, j) {
        "use strict";
        if (!this.$CallbackDependencyManager1[i])
            return null;
        var k = this.$CallbackDependencyManager4(i, j);
        this.$CallbackDependencyManager1[i].$CallbackDependencyManager6 += k;
        return i;
    };
    h.prototype.isPersistentDependencySatisfied = function(i) {
        "use strict";
        return !!this.$CallbackDependencyManager3[i];
    };
    h.prototype.satisfyPersistentDependency = function(i) {
        "use strict";
        this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
    };
    h.prototype.satisfyNonPersistentDependency = function(i) {
        "use strict";
        var j = this.$CallbackDependencyManager3[i] === 1;
        if (!j)
            this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
        if (!j)
            delete this.$CallbackDependencyManager3[i];
    };
    h.prototype.registerCallback = function(i, j) {
        "use strict";
        var k = this.$CallbackDependencyManager2;
        this.$CallbackDependencyManager2++;
        var l = this.$CallbackDependencyManager4(k, j);
        if (l === 0) {
            g.applyWithGuard(i);
            return null;
        }
        this.$CallbackDependencyManager1[k] = {$CallbackDependencyManager7: i, $CallbackDependencyManager6: l};
        return k;
    };
    h.prototype.unsatisfyPersistentDependency = function(i) {
        "use strict";
        delete this.$CallbackDependencyManager3[i];
    };
    e.exports = h;
});
__d("EventSubscription", [], function(a, b, c, d, e, f) {
    'use strict';
    function g(h) {
        this.subscriber = h;
    }
    g.prototype.remove = function() {
        this.subscriber.removeSubscription(this);
    };
    e.exports = g;
});
__d("EmitterSubscription", ["EventSubscription"], function(a, b, c, d, e, f) {
    'use strict';
    var g = b('EventSubscription');
    for (var h in g)
        if (g.hasOwnProperty(h))
            j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j(k, l, m) {
        g.call(this, k);
        this.listener = l;
        this.context = m;
    }
    e.exports = j;
});
__d("invariant", [], function(a, b, c, d, e, f) {
    function g(h) {
        if (!h) {
            var i = new Error('Invariant Violation');
            i.framesToPop = 1;
            throw i;
        }
    }
    e.exports = g;
});
__d("EventSubscriptionVendor", ["invariant"], function(a, b, c, d, e, f) {
    'use strict';
    var g = b('invariant');
    function h() {
        this.$EventSubscriptionVendor0 = {};
        this.$EventSubscriptionVendor1 = null;
    }
    h.prototype.addSubscription = function(i, j) {
        g(j.subscriber === this);
        if (!this.$EventSubscriptionVendor0[i])
            this.$EventSubscriptionVendor0[i] = [];
        var k = this.$EventSubscriptionVendor0[i].length;
        this.$EventSubscriptionVendor0[i].push(j);
        j.eventType = i;
        j.key = k;
        return j;
    };
    h.prototype.removeAllSubscriptions = function(i) {
        if (i === undefined) {
            this.$EventSubscriptionVendor0 = {};
        } else
            delete this.$EventSubscriptionVendor0[i];
    };
    h.prototype.removeSubscription = function(i) {
        var j = i.eventType, k = i.key, l = this.$EventSubscriptionVendor0[j];
        if (l)
            delete l[k];
    };
    h.prototype.getSubscriptionsForType = function(i) {
        return this.$EventSubscriptionVendor0[i];
    };
    e.exports = h;
});
__d("emptyFunction", ["copyProperties"], function(a, b, c, d, e, f) {
    var g = b('copyProperties');
    function h(j) {
        return function() {
            return j;
        };
    }
    function i() {
    }
    g(i, {thatReturns: h, thatReturnsFalse: h(false), thatReturnsTrue: h(true), thatReturnsNull: h(null), thatReturnsThis: function() {
            return this;
        }, thatReturnsArgument: function(j) {
            return j;
        }});
    e.exports = i;
});
__d("EventEmitter", ["EmitterSubscription", "ErrorUtils", "EventSubscriptionVendor", "emptyFunction", "invariant"], function(a, b, c, d, e, f) {
    var g = b('EmitterSubscription'), h = b('ErrorUtils'), i = b('EventSubscriptionVendor'), j = b('emptyFunction'), k = b('invariant');
    function l() {
        "use strict";
        this.$EventEmitter0 = new i();
    }
    l.prototype.addListener = function(m, n, o) {
        "use strict";
        return this.$EventEmitter0.addSubscription(m, new g(this.$EventEmitter0, n, o));
    };
    l.prototype.once = function(m, n, o) {
        "use strict";
        var p = this;
        return this.addListener(m, function() {
            p.removeCurrentListener();
            n.apply(o, arguments);
        });
    };
    l.prototype.removeAllListeners = function(m) {
        "use strict";
        this.$EventEmitter0.removeAllSubscriptions(m);
    };
    l.prototype.removeCurrentListener = function() {
        "use strict";
        k(!!this.$EventEmitter1);
        this.$EventEmitter0.removeSubscription(this.$EventEmitter1);
    };
    l.prototype.listeners = function(m) {
        "use strict";
        var n = this.$EventEmitter0.getSubscriptionsForType(m);
        return n ? n.filter(j.thatReturnsTrue).map(function(o) {
            return o.listener;
        }) : [];
    };
    l.prototype.emit = function(m) {
        "use strict";
        var n = this.$EventEmitter0.getSubscriptionsForType(m);
        if (n) {
            var o = Object.keys(n);
            for (var p = 0; p < o.length; p++) {
                var q = o[p], r = n[q];
                if (r) {
                    this.$EventEmitter1 = r;
                    h.applyWithGuard(r.listener, r.context, Array.prototype.slice.call(arguments, 1), null, 'EventEmitter:' + m);
                }
            }
            this.$EventEmitter1 = null;
        }
    };
    e.exports = l;
});
__d("EventEmitterWithHolding", [], function(a, b, c, d, e, f) {
    'use strict';
    function g(h, i) {
        this.$EventEmitterWithHolding0 = h;
        this.$EventEmitterWithHolding1 = i;
        this.$EventEmitterWithHolding2 = null;
        this.$EventEmitterWithHolding3 = false;
    }
    g.prototype.addListener = function(h, i, j) {
        return this.$EventEmitterWithHolding0.addListener(h, i, j);
    };
    g.prototype.once = function(h, i, j) {
        return this.$EventEmitterWithHolding0.once(h, i, j);
    };
    g.prototype.addRetroactiveListener = function(h, i, j) {
        var k = this.$EventEmitterWithHolding0.addListener(h, i, j);
        this.$EventEmitterWithHolding3 = true;
        this.$EventEmitterWithHolding1.emitToListener(h, i, j);
        this.$EventEmitterWithHolding3 = false;
        return k;
    };
    g.prototype.removeAllListeners = function(h) {
        this.$EventEmitterWithHolding0.removeAllListeners(h);
    };
    g.prototype.removeCurrentListener = function() {
        this.$EventEmitterWithHolding0.removeCurrentListener();
    };
    g.prototype.listeners = function(h) {
        return this.$EventEmitterWithHolding0.listeners(h);
    };
    g.prototype.emit = function(h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
    };
    g.prototype.emitAndHold = function(h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding2 = this.$EventEmitterWithHolding1.holdEvent(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding2 = null;
    };
    g.prototype.releaseCurrentEvent = function() {
        if (this.$EventEmitterWithHolding2 !== null) {
            this.$EventEmitterWithHolding1.releaseEvent(this.$EventEmitterWithHolding2);
        } else if (this.$EventEmitterWithHolding3)
            this.$EventEmitterWithHolding1.releaseCurrentEvent();
    };
    g.prototype.releaseHeldEventType = function(h) {
        this.$EventEmitterWithHolding1.releaseEventType(h);
    };
    e.exports = g;
});
__d("EventHolder", ["invariant"], function(a, b, c, d, e, f) {
    'use strict';
    var g = b('invariant');
    function h() {
        this.$EventHolder0 = {};
        this.$EventHolder1 = null;
    }
    h.prototype.holdEvent = function(i, j, k, l, m, n, o) {
        this.$EventHolder0[i] = this.$EventHolder0[i] || [];
        var p = this.$EventHolder0[i], q = {eventType: i, index: p.length};
        p.push([j, k, l, m, n, o]);
        return q;
    };
    h.prototype.emitToListener = function(i, j, k) {
        var l = this.$EventHolder0[i];
        if (!l)
            return;
        var m = this.$EventHolder1;
        l.forEach(function(n, o) {
            if (!n)
                return;
            this.$EventHolder1 = {eventType: i, index: o};
            j.apply(k, n);
        }.bind(this));
        this.$EventHolder1 = m;
    };
    h.prototype.releaseCurrentEvent = function() {
        g(this.$EventHolder1 !== null);
        this.releaseEvent(this.$EventHolder1);
    };
    h.prototype.releaseEvent = function(i) {
        delete this.$EventHolder0[i.eventType][i.index];
    };
    h.prototype.releaseEventType = function(i) {
        this.$EventHolder0[i] = [];
    };
    e.exports = h;
});
__d("asyncCallback", [], function(a, b, c, d, e, f) {
    function g(h, i) {
        return h;
    }
    e.exports = g;
});
__d("toArray", ["invariant"], function(a, b, c, d, e, f) {
    var g = b('invariant');
    function h(i) {
        var j = i.length;
        g(!Array.isArray(i) && (typeof i === 'object' || typeof i === 'function'));
        g(typeof j === 'number');
        g(j === 0 || (j - 1) in i);
        if (i.hasOwnProperty)
            try {
                return Array.prototype.slice.call(i);
            } catch (k) {
            }
        var l = Array(j);
        for (var m = 0; m < j; m++)
            l[m] = i[m];
        return l;
    }
    e.exports = h;
});
__d("createArrayFrom", ["toArray"], function(a, b, c, d, e, f) {
    var g = b('toArray');
    function h(j) {
        return (!!j && (typeof j == 'object' || typeof j == 'function') && ('length' in j) && !('setInterval' in j) && (typeof j.nodeType != 'number') && (Array.isArray(j) || ('callee' in j) || ('item' in j)));
    }
    function i(j) {
        if (!h(j)) {
            return [j];
        } else if (Array.isArray(j)) {
            return j.slice();
        } else
            return g(j);
    }
    e.exports = i;
});
__d("Arbiter", ["CallbackDependencyManager", "ErrorUtils", "EventEmitter", "EventEmitterWithHolding", "EventHolder", "asyncCallback", "copyProperties", "createArrayFrom", "invariant"], function(a, b, c, d, e, f) {
    'use strict';
    var g = b('CallbackDependencyManager'), h = b('ErrorUtils'), i = b('EventEmitter'), j = b('EventEmitterWithHolding'), k = b('EventHolder'), l = b('asyncCallback'), m = b('copyProperties'), n = b('createArrayFrom'), o = b('invariant');
    function p() {
        var u = new i();
        this.$Arbiter0 = new s();
        this.$Arbiter1 = new j(u, this.$Arbiter0);
        this.$Arbiter2 = new g();
        this.$Arbiter3 = [];
    }
    p.prototype.subscribe = function(u, v, w) {
        u = n(u);
        u.forEach(function(y) {
            o(y && typeof y === 'string');
        });
        o(typeof v === 'function');
        w = w || p.SUBSCRIBE_ALL;
        o(w === p.SUBSCRIBE_NEW || w === p.SUBSCRIBE_ALL);
        var x = u.map(function(y) {
            var z = this.$Arbiter4.bind(this, v, y);
            if (w === p.SUBSCRIBE_NEW)
                return this.$Arbiter1.addListener(y, z);
            this.$Arbiter3.push({});
            var aa = this.$Arbiter1.addRetroactiveListener(y, z);
            this.$Arbiter3.pop();
            return aa;
        }, this);
        return new t(this, x);
    };
    p.prototype.$Arbiter4 = function(u, v, w) {
        var x = this.$Arbiter3[this.$Arbiter3.length - 1];
        if (x[v] === false)
            return;
        var y = h.applyWithGuard(u, null, [v, w]);
        if (y === false)
            this.$Arbiter1.releaseCurrentEvent();
        x[v] = y;
    };
    p.prototype.subscribeOnce = function(u, v, w) {
        var x = this.subscribe(u, function(y, z) {
            x && x.unsubscribe();
            return v(y, z);
        }, w);
        return x;
    };
    p.prototype.unsubscribe = function(u) {
        o(u.isForArbiterInstance(this));
        u.unsubscribe();
    };
    p.prototype.inform = function(u, v, w) {
        var x = Array.isArray(u);
        u = n(u);
        w = w || p.BEHAVIOR_EVENT;
        var y = (w === p.BEHAVIOR_STATE) || (w === p.BEHAVIOR_PERSISTENT);
        this.$Arbiter3.push({});
        for (var z = 0; z < u.length; z++) {
            var aa = u[z];
            o(aa);
            this.$Arbiter0.setHoldingBehavior(aa, w);
            this.$Arbiter1.emitAndHold(aa, v);
            this.$Arbiter5(aa, v, y);
        }
        var ba = this.$Arbiter3.pop();
        return x ? ba : ba[u[0]];
    };
    p.prototype.query = function(u) {
        var v = this.$Arbiter0.getHoldingBehavior(u);
        o(!v || v === p.BEHAVIOR_STATE);
        var w = null;
        this.$Arbiter0.emitToListener(u, function(x) {
            w = x;
        });
        return w;
    };
    p.prototype.registerCallback = function(u, v) {
        if (typeof u === 'function') {
            return this.$Arbiter2.registerCallback(l(u, 'arbiter'), v);
        } else
            return this.$Arbiter2.addDependenciesToExistingCallback(u, v);
    };
    p.prototype.$Arbiter5 = function(u, v, w) {
        if (v === null)
            return;
        if (w) {
            this.$Arbiter2.satisfyPersistentDependency(u);
        } else
            this.$Arbiter2.satisfyNonPersistentDependency(u);
    };
    for (var q in k)
        if (k.hasOwnProperty(q))
            s[q] = k[q];
    var r = k === null ? null : k.prototype;
    s.prototype = Object.create(r);
    s.prototype.constructor = s;
    s.__superConstructor__ = k;
    function s() {
        k.call(this);
        this.$ArbiterEventHolder0 = {};
    }
    s.prototype.setHoldingBehavior = function(u, v) {
        this.$ArbiterEventHolder0[u] = v;
    };
    s.prototype.getHoldingBehavior = function(u) {
        return this.$ArbiterEventHolder0[u];
    };
    s.prototype.holdEvent = function(u, v, w, x, y) {
        var z = this.$ArbiterEventHolder0[u];
        if (z !== p.BEHAVIOR_PERSISTENT)
            this.$ArbiterEventHolder2(u);
        if (z !== p.BEHAVIOR_EVENT)
            return r.holdEvent.call(this, u, v, w, x, y);
    };
    s.prototype.$ArbiterEventHolder2 = function(u) {
        this.emitToListener(u, this.releaseCurrentEvent, this);
    };
    s.prototype.releaseEvent = function(u) {
        if (u)
            r.releaseEvent.call(this, u);
    };
    m(p, {SUBSCRIBE_NEW: 'new', SUBSCRIBE_ALL: 'all', BEHAVIOR_EVENT: 'event', BEHAVIOR_STATE: 'state', BEHAVIOR_PERSISTENT: 'persistent'});
    function t(u, v) {
        this.$ArbiterToken0 = u;
        this.$ArbiterToken1 = v;
    }
    t.prototype.unsubscribe = function() {
        for (var u = 0; u < this.$ArbiterToken1.length; u++)
            this.$ArbiterToken1[u].remove();
        this.$ArbiterToken1.length = 0;
    };
    t.prototype.isForArbiterInstance = function(u) {
        o(this.$ArbiterToken0);
        return this.$ArbiterToken0 === u;
    };
    Object.keys(p.prototype).forEach(function(u) {
        p[u] = function() {
            var v = (this instanceof p) ? this : p;
            return p.prototype[u].apply(v, arguments);
        };
    });
    p.call(p);
    e.exports = p;
});
__d("ArbiterFrame", [], function(a, b, c, d, e, f) {
    var g = {inform: function(h, i, j) {
            var k = parent.frames, l = k.length, m;
            i.crossFrame = true;
            for (var n = 0; n < l; n++) {
                m = k[n];
                try {
                    if (!m || m == window)
                        continue;
                    if (m.require) {
                        m.require('Arbiter').inform(h, i, j);
                    } else if (m.ServerJSAsyncLoader)
                        m.ServerJSAsyncLoader.wakeUp(h, i, j);
                } catch (o) {
                }
            }
        }};
    e.exports = g;
});
__d("Plugin", ["Arbiter", "ArbiterFrame"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('ArbiterFrame'), i = {CONNECT: 'platform/plugins/connect', DISCONNECT: 'platform/plugins/disconnect', ERROR: 'platform/plugins/error', RELOAD: 'platform/plugins/reload', DIALOG: 'platform/plugins/dialog', connect: function(j, k) {
            var l = {identifier: j, href: j, story_fbid: k};
            g.inform(i.CONNECT, l);
            h.inform(i.CONNECT, l);
        }, disconnect: function(j, k) {
            var l = {identifier: j, href: j, story_fbid: k};
            g.inform(i.DISCONNECT, l);
            h.inform(i.DISCONNECT, l);
        }, error: function(j, k) {
            g.inform(i.ERROR, {action: j, content: k});
        }, reload: function(j) {
            g.inform(i.RELOAD, j || '');
            h.inform(i.RELOAD, {});
        }};
    e.exports = i;
});
__d("removeArrayReduce", [], function(a, b, c, d, e, f) {
    Array.prototype.reduce = undefined;
    Array.prototype.reduceRight = undefined;
});
__d("repeatString", ["invariant"], function(a, b, c, d, e, f) {
    var g = b('invariant');
    function h(i, j) {
        if (j === 1)
            return i;
        g(j >= 0);
        var k = '';
        while (j) {
            if (j & 1)
                k += i;
            if ((j >>= 1))
                i += i;
        }
        return k;
    }
    e.exports = h;
});
__d("BitMap", ["copyProperties", "repeatString"], function(a, b, c, d, e, f) {
    var g = b('copyProperties'), h = b('repeatString'), i = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    function j() {
        this._bits = [];
    }
    g(j.prototype, {set: function(m) {
            this._bits[m] = 1;
            return this;
        }, toString: function() {
            var m = [];
            for (var n = 0; n < this._bits.length; n++)
                m.push(this._bits[n] ? 1 : 0);
            return m.length ? l(m.join('')) : '';
        }, toCompressedString: function() {
            if (this._bits.length === 0)
                return '';
            var m = [], n = 1, o = this._bits[0] || 0, p = o.toString(2);
            for (var q = 1; q < this._bits.length; q++) {
                var r = this._bits[q] || 0;
                if (r === o) {
                    n++;
                } else {
                    m.push(k(n));
                    o = r;
                    n = 1;
                }
            }
            if (n)
                m.push(k(n));
            return l(p + m.join(''));
        }});
    function k(m) {
        var n = m.toString(2), o = h('0', n.length - 1);
        return o + n;
    }
    function l(m) {
        var n = (m + '00000').match(/[01]{6}/g), o = '';
        for (var p = 0; p < n.length; p++)
            o += i[parseInt(n[p], 2)];
        return o;
    }
    e.exports = j;
});
__d("ge", [], function(a, b, c, d, e, f) {
    function g(j, k, l) {
        return typeof j != 'string' ? j : !k ? document.getElementById(j) : h(j, k, l);
    }
    function h(j, k, l) {
        var m, n, o;
        if (i(k) == j) {
            return k;
        } else if (k.getElementsByTagName) {
            n = k.getElementsByTagName(l || '*');
            for (o = 0; o < n.length; o++)
                if (i(n[o]) == j)
                    return n[o];
        } else {
            n = k.childNodes;
            for (o = 0; o < n.length; o++) {
                m = h(j, n[o]);
                if (m)
                    return m;
            }
        }
        return null;
    }
    function i(j) {
        var k = j.getAttributeNode && j.getAttributeNode('id');
        return k ? k.value : null;
    }
    e.exports = g;
});
__d("ServerJS", ["BitMap", "ErrorUtils", "copyProperties", "ex", "ge"], function(a, b, c, d, e, f) {
    var g = b('BitMap'), h = b('ErrorUtils'), i = b('copyProperties'), j = b('ex'), k = b('ge'), l = 0, m = new g();
    function n() {
        this._moduleMap = {};
        this._relativeTo = null;
        this._moduleIDsToCleanup = {};
    }
    n.getLoadedModuleHash = function() {
        return m.toCompressedString();
    };
    i(n.prototype, {handle: function(r) {
            if (r.__guard)
                throw new Error('ServerJS.handle called on data that has already been handled');
            r.__guard = true;
            o(r.define || [], this._handleDefine, this);
            o(r.markup || [], this._handleMarkup, this);
            o(r.elements || [], this._handleElement, this);
            o(r.instances || [], this._handleInstance, this);
            var s = o(r.require || [], this._handleRequire, this);
            return {cancel: function() {
                    for (var t = 0; t < s.length; t++)
                        if (s[t])
                            s[t].cancel();
                }};
        }, handlePartial: function(r) {
            (r.instances || []).forEach(p.bind(null, this._moduleMap, 3));
            (r.markup || []).forEach(p.bind(null, this._moduleMap, 2));
            (r.elements || []).forEach(p.bind(null, this._moduleMap, 2));
            return this.handle(r);
        }, setRelativeTo: function(r) {
            this._relativeTo = r;
            return this;
        }, cleanup: function() {
            var r = [];
            for (var s in this._moduleMap)
                r.push(s);
            d.call(null, r, q);
            this._moduleMap = {};
            function t(v) {
                var w = this._moduleIDsToCleanup[v], x = w[0], y = w[1];
                delete this._moduleIDsToCleanup[v];
                var z = y ? 'JS::call("' + x + '", "' + y + '", ...)' : 'JS::requireModule("' + x + '")', aa = z + ' did not fire because it has missing dependencies.';
                throw new Error(aa);
            }
            for (var u in this._moduleIDsToCleanup)
                h.applyWithGuard(t, this, [u], null, 'ServerJS:cleanup' + ' id: ' + u);
        }, _handleDefine: h.guard(function(r, s, t, u) {
            if (u >= 0)
                m.set(u);
            define(r, s, function() {
                this._replaceTransportMarkers(t);
                return t;
            }.bind(this));
        }, 'JS::define'), _handleRequire: function(r, s, t, u) {
            h.applyWithGuard(function() {
                var v = [r].concat(t || []), w = (s ? '__call__' : '__requireModule__') + l++;
                this._moduleIDsToCleanup[w] = [r, s];
                return define(w, v, h.guard(function(x) {
                    delete this._moduleIDsToCleanup[w];
                    u && this._replaceTransportMarkers(u);
                    if (s) {
                        if (!x[s])
                            throw new TypeError(j('Module %s has no method "%s"', r, s));
                        x[s].apply(x, u || []);
                    }
                }, s ? "JS::call('" + r + "', '" + s + "', ...)" : "JS::requireModule('" + r + "')"), 1, this, 1);
            }, this, null, null, s ? 'JS::call' : 'JS::requireModule');
        }, _handleInstance: h.guard(function(r, s, t, u) {
            var v = null;
            if (s)
                v = function(w) {
                    this._replaceTransportMarkers(t);
                    var x = Object.create(w.prototype);
                    w.apply(x, t);
                    return x;
                }.bind(this);
            define(r, s, v, 0, null, u);
        }, 'JS::instance'), _handleMarkup: h.guard(function(r, s, t) {
            define(r, ['HTML'], function(u) {
                return u.replaceJSONWrapper(s).getRootNode();
            }, 0, null, t);
        }, 'JS::markup'), _handleElement: h.guard(function(r, s, t, u) {
            if (s === null && t) {
                define(r, null, null, 0, null, t);
                return;
            }
            var v = [], w = 0;
            if (u) {
                v.push(u);
                w = 1;
                t++;
            }
            define(r, v, function(x) {
                var y = k(s, x);
                if (!y) {
                    var z = 'Could not find element "%s"';
                    throw new Error(j(z, s));
                }
                return y;
            }, w, null, t);
        }, 'JS::element'), _replaceTransportMarkers: function(r, s) {
            var t = (typeof s !== 'undefined') ? r[s] : r, u;
            if (Array.isArray(t)) {
                for (u = 0; u < t.length; u++)
                    this._replaceTransportMarkers(t, u);
            } else if (t && typeof t == 'object')
                if (t.__m) {
                    r[s] = b.call(null, t.__m);
                } else if (t.__e) {
                    r[s] = k(t.__e);
                } else if (t.__rel) {
                    r[s] = this._relativeTo;
                } else
                    for (var v in t)
                        this._replaceTransportMarkers(t, v);
        }});
    function o(r, s, t) {
        return r.map(function(u) {
            s.apply(t, u);
        });
    }
    function p(r, s, t) {
        var u = t[0];
        if (!(u in r))
            t[s] = (t[s] || 0) + 1;
        r[u] = true;
    }
    function q() {
        return {};
    }
    e.exports = n;
});
__d("isEmpty", [], function(a, b, c, d, e, f) {
    function g(h) {
        if (Array.isArray(h)) {
            return h.length === 0;
        } else if (typeof h === 'object') {
            for (var i in h)
                return false;
            return true;
        } else
            return !h;
    }
    e.exports = g;
});
__d("CSSLoader", ["isEmpty"], function(a, b, c, d, e, f) {
    var g = b('isEmpty'), h = 20, i = 5000, j, k, l = {}, m = [], n, o = {};
    function p(t) {
        if (k)
            return;
        k = true;
        var u = document.createElement('link');
        u.onload = function() {
            j = true;
            u.parentNode.removeChild(u);
        };
        u.rel = 'stylesheet';
        u.href = 'data:text/css;base64,';
        t.appendChild(u);
    }
    function q() {
        var t, u = [], v = [];
        if (Date.now() >= n) {
            for (t in o) {
                v.push(o[t].signal);
                u.push(o[t].error);
            }
            o = {};
        } else
            for (t in o) {
                var w = o[t].signal, x = window.getComputedStyle ? getComputedStyle(w, null) : w.currentStyle;
                if (x && parseInt(x.height, 10) > 1) {
                    u.push(o[t].load);
                    v.push(w);
                    delete o[t];
                }
            }
        for (var y = 0; y < v.length; y++)
            v[y].parentNode.removeChild(v[y]);
        if (!g(u)) {
            for (y = 0; y < u.length; y++)
                u[y]();
            n = Date.now() + i;
        }
        return g(o);
    }
    function r(t, u, v, w) {
        var x = document.createElement('meta');
        x.id = 'bootloader_' + t.replace(/[^a-z0-9]/ig, '_');
        u.appendChild(x);
        var y = !g(o);
        n = Date.now() + i;
        o[t] = {signal: x, load: v, error: w};
        if (!y)
            var z = setInterval(function aa() {
                if (q())
                    clearInterval(z);
            }, h, false);
    }
    var s = {loadStyleSheet: function(t, u, v, w, x) {
            if (l[t])
                throw new Error('CSS component ' + t + ' has already been requested.');
            if (document.createStyleSheet) {
                var y;
                for (var z = 0; z < m.length; z++)
                    if (m[z].imports.length < 31) {
                        y = z;
                        break;
                    }
                if (y === undefined) {
                    m.push(document.createStyleSheet());
                    y = m.length - 1;
                }
                m[y].addImport(u);
                l[t] = {styleSheet: m[y], uri: u};
                r(t, v, w, x);
                return;
            }
            var aa = document.createElement('link');
            aa.rel = 'stylesheet';
            aa.type = 'text/css';
            aa.href = u;
            l[t] = {link: aa};
            if (j) {
                aa.onload = function() {
                    aa.onload = aa.onerror = null;
                    w();
                };
                aa.onerror = function() {
                    aa.onload = aa.onerror = null;
                    x();
                };
            } else {
                r(t, v, w, x);
                if (j === undefined)
                    p(v);
            }
            v.appendChild(aa);
        }, registerLoadedStyleSheet: function(t, u) {
            if (l[t])
                throw new Error('CSS component ' + t + ' has been requested and should not be ' + 'loaded more than once.');
            l[t] = {link: u};
        }, unloadStyleSheet: function(t) {
            if (!t in l)
                return;
            var u = l[t], v = u.link;
            if (v) {
                v.onload = v.onerror = null;
                v.parentNode.removeChild(v);
            } else {
                var w = u.styleSheet;
                for (var x = 0; x < w.imports.length; x++)
                    if (w.imports[x].href == u.uri) {
                        w.removeImport(x);
                        break;
                    }
            }
            delete o[t];
            delete l[t];
        }};
    e.exports = s;
});
__d("setTimeoutAcrossTransitions", [], function(a, b, c, d, e, f) {
    function g(h, i) {
        return setTimeout(h, i, false);
    }
    e.exports = g;
});
__d("Bootloader", ["CSSLoader", "CallbackDependencyManager", "Env", "setTimeoutAcrossTransitions", "createArrayFrom", "ErrorUtils"], function(a, b, c, d, e, f) {
    var g = b('CSSLoader'), h = b('CallbackDependencyManager'), i = b('Env'), j = b('setTimeoutAcrossTransitions'), k = b('createArrayFrom'), l = b('ErrorUtils'), m = {}, n = {}, o = {}, p = {}, q = null, r = {}, s = {}, t = {}, u = {}, v = {}, w = false, x = [], y = new h(), z = Date.now();
    l.addListener(function(ja) {
        ja.loadingUrls = Object.keys(s);
    }, true);
    function aa() {
        return document.documentMode || +(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1];
    }
    function ba() {
        if (!i.bootloader_retry_on_timeout || !i.is_not_mobile || aa() || !i.bootloader_timeout || i.bootloader_timeout < 0)
            return false;
        return true;
    }
    function ca(ja, ka, la, ma) {
        var na = document.createElement('script');
        na.src = ja;
        na.async = true;
        var oa = r[ka];
        if (oa && oa.crossOrigin)
            na.crossOrigin = 'anonymous';
        na.onload = la;
        na.onerror = function() {
            t[ja] = true;
            la();
        };
        na.onreadystatechange = function() {
            if (this.readyState in {loaded: 1, complete: 1})
                la();
        };
        ma.appendChild(na);
        return na;
    }
    function da(ja, ka, la, ma) {
        var na = ia.done.bind(null, [la], ka);
        s[ka] = Date.now();
        if (ja == 'js') {
            var oa = ca(ka, la, na, ma);
            if (ba())
                p[ka] = j(function() {
                    delete p[ka];
                    if (q) {
                        if (oa.parentNode && oa.parentNode === q)
                            q.removeChild(oa);
                        u[ka] = Date.now();
                        ca(ka, la, na, q);
                    }
                }, i.bootloader_timeout);
        } else if (ja == 'css')
            g.loadStyleSheet(la, ka, ma, na, function() {
                t[ka] = true;
                na();
            });
    }
    function ea(ja) {
        if (!r[ja])
            return;
        if (r[ja].type == 'css') {
            g.unloadStyleSheet(ja);
            delete m[ja];
            y.unsatisfyPersistentDependency(ja);
        }
    }
    function fa(ja, ka) {
        if (!w) {
            x.push([ja, ka]);
            return;
        }
        ja = k(ja);
        var la = [];
        for (var ma = 0; ma < ja.length; ++ma) {
            if (!ja[ma])
                continue;
            var na = o[ja[ma]];
            if (na) {
                var oa = na.resources;
                for (var pa = 0; pa < oa.length; ++pa)
                    la.push(oa[pa]);
            }
        }
        ia.loadResources(la, ka);
    }
    function ga(ja) {
        ja = k(ja);
        for (var ka = 0; ka < ja.length; ++ka)
            if (ja[ka] !== undefined)
                m[ja[ka]] = true;
    }
    function ha(ja) {
        if (!ja)
            return [];
        var ka = [];
        for (var la = 0; la < ja.length; ++la)
            if (typeof ja[la] == 'string') {
                if (ja[la] in r)
                    ka.push(r[ja[la]]);
            } else
                ka.push(ja[la]);
        return ka;
    }
    var ia = {configurePage: function(ja) {
            var ka = {}, la = ha(ja), ma;
            for (ma = 0; ma < la.length; ma++) {
                ka[la[ma].src] = la[ma];
                ga(la[ma].name);
            }
            var na = document.getElementsByTagName('link');
            for (ma = 0; ma < na.length; ++ma) {
                if (na[ma].rel != 'stylesheet')
                    continue;
                for (var oa in ka)
                    if (na[ma].href.indexOf(oa) !== -1) {
                        var pa = ka[oa].name;
                        if (ka[oa].permanent)
                            n[pa] = true;
                        delete ka[oa];
                        g.registerLoadedStyleSheet(pa, na[ma]);
                        ia.done([pa]);
                        break;
                    }
            }
        }, loadComponents: function(ja, ka) {
            ja = k(ja);
            var la = [], ma = [];
            for (var na = 0; na < ja.length; na++) {
                var oa = o[ja[na]];
                if (oa && !oa.module)
                    continue;
                var pa = 'legacy:' + ja[na];
                if (o[pa]) {
                    ja[na] = pa;
                    la.push(pa);
                } else if (oa && oa.module) {
                    la.push(ja[na]);
                    if (!oa.runWhenReady)
                        ma.push(ja[na]);
                }
            }
            fa(ja, la.length ? d.bind(null, la, ka) : ka);
        }, loadModules: function(ja, ka) {
            var la = [], ma = [];
            for (var na = 0; na < ja.length; na++) {
                var oa = o[ja[na]];
                if (!oa || oa.module)
                    la.push(ja[na]);
            }
            fa(ja, d.bind(null, la, ka));
        }, loadResources: function(ja, ka, la, ma) {
            var na;
            ja = ha(k(ja));
            if (la) {
                var oa = {};
                for (na = 0; na < ja.length; ++na)
                    oa[ja[na].name] = true;
                for (var pa in m)
                    if (!(pa in n) && !(pa in oa) && !(pa in v))
                        ea(pa);
                v = {};
            }
            var qa = [], ra = [];
            for (na = 0; na < ja.length; ++na) {
                var sa = ja[na];
                if (sa.permanent)
                    n[sa.name] = true;
                if (y.isPersistentDependencySatisfied(sa.name))
                    continue;
                if (!sa.nonblocking)
                    ra.push(sa.name);
                if (!m[sa.name]) {
                    ga(sa.name);
                    qa.push(sa);
                    window.CavalryLogger && window.CavalryLogger.getInstance().measureResources(sa, ma);
                }
            }
            var ta;
            if (ka)
                if (typeof ka === 'function') {
                    ta = y.registerCallback(ka, ra);
                } else
                    ta = y.addDependenciesToExistingCallback(ka, ra);
            var ua = ia.getHardpoint(), va = aa() ? ua : document.createDocumentFragment();
            for (na = 0; na < qa.length; ++na)
                da(qa[na].type, qa[na].src, qa[na].name, va);
            if (ua !== va)
                ua.appendChild(va);
            return ta;
        }, requestJSResource: function(ja) {
            var ka = ia.getHardpoint();
            da('js', ja, null, ka);
        }, done: function(ja, ka) {
            if (ka) {
                delete s[ka];
                if (p[ka]) {
                    clearTimeout(p[ka]);
                    delete p[ka];
                }
            }
            ga(ja);
            for (var la = 0; la < ja.length; ++la) {
                var ma = ja[la];
                if (ma)
                    y.satisfyPersistentDependency(ma);
            }
        }, enableBootload: function(ja) {
            for (var ka in ja)
                if (!o[ka])
                    o[ka] = ja[ka];
            if (!w) {
                w = true;
                for (var la = 0; la < x.length; la++)
                    fa.apply(null, x[la]);
                x = [];
            }
        }, getHardpoint: function() {
            if (!q) {
                var ja = document.getElementsByTagName('head');
                q = ja.length && ja[0] || document.body;
            }
            return q;
        }, setResourceMap: function(ja) {
            for (var ka in ja)
                if (!r[ka]) {
                    ja[ka].name = ka;
                    r[ka] = ja[ka];
                }
        }, getResourceURLs: function() {
            var ja = {};
            for (var ka in r) {
                var la = r[ka].src;
                ja[la] = (ka in m) && !(la in t) && !(la in s);
            }
            return ja;
        }, loadEarlyResources: function(ja) {
            ia.setResourceMap(ja);
            var ka = [];
            for (var la in ja) {
                var ma = r[la];
                ka.push(ma);
                if (!ma.permanent)
                    v[ma.name] = ma;
            }
            ia.loadResources(ka);
        }, getLoadingUrls: function() {
            var ja = {}, ka = Date.now();
            for (var la in s)
                ja[la] = ka - s[la];
            return ja;
        }, getErrorUrls: function() {
            return Object.keys(t);
        }, getStartTime: function() {
            return z;
        }, getRetriedUrls: function() {
            return Object.keys(u);
        }};
    e.exports = ia;
});
__d("DTSG", ["Env", "DTSGInitialData"], function(a, b, c, d, e, f) {
    var g = b('Env'), h = b('DTSGInitialData'), i = h.token || null, j = {setToken: function(k) {
            i = k;
        }, getToken: function() {
            return i;
        }};
    e.exports = j;
});
__d("AsyncResponse", ["Bootloader", "DTSG", "Env", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('Bootloader'), h = b('DTSG'), i = b('Env'), j = b('copyProperties');
    function k(l, m) {
        "use strict";
        j(this, {error: 0, errorSummary: null, errorDescription: null, onload: null, replay: false, payload: m || null, request: l || null, silentError: false, transientError: false, is_last: true});
        return this;
    }
    k.prototype.getRequest = function() {
        "use strict";
        return this.request;
    };
    k.prototype.getPayload = function() {
        "use strict";
        return this.payload;
    };
    k.prototype.getError = function() {
        "use strict";
        return this.error;
    };
    k.prototype.getErrorSummary = function() {
        "use strict";
        return this.errorSummary;
    };
    k.prototype.setErrorSummary = function(l) {
        "use strict";
        l = (l === undefined ? null : l);
        this.errorSummary = l;
        return this;
    };
    k.prototype.getErrorDescription = function() {
        "use strict";
        return this.errorDescription;
    };
    k.prototype.getErrorIsWarning = function() {
        "use strict";
        return !!this.errorIsWarning;
    };
    k.prototype.isTransient = function() {
        "use strict";
        return !!this.transientError;
    };
    k.prototype.logError = function(l, m) {
        "use strict";
        var n = a.ErrorSignal;
        if (n) {
            var o = {err_code: this.error, vip: (i.vip || '-')};
            if (m) {
                o.duration = m.duration;
                o.xfb_ip = m.xfb_ip;
            }
            var p = this.request.getURI();
            o.path = p || '-';
            o.aid = this.request.userActionID;
            if (p && p.indexOf('scribe_endpoint.php') != -1)
                l = 'async_error_double';
            n.sendErrorSignal(l, JSON.stringify(o));
        }
    };
    k.prototype.logErrorByGroup = function(l, m) {
        "use strict";
        if (Math.floor(Math.random() * m) === 0)
            if (this.error == 1357010 || this.error < 15000) {
                this.logError('async_error_oops_' + l);
            } else
                this.logError('async_error_logic_' + l);
    };
    k.defaultErrorHandler = function(l) {
        "use strict";
        try {
            if (!l.silentError) {
                k.verboseErrorHandler(l);
            } else
                l.logErrorByGroup('silent', 10);
        } catch (m) {
            alert(l);
        }
    };
    k.verboseErrorHandler = function(l) {
        "use strict";
        g.loadModules(["ExceptionDialog"], function(m) {
            return m.showAsyncError(l);
        });
    };
    k.renewDTSG = function(l) {
        "use strict";
        h.setToken(l);
    };
    e.exports = k;
});
__d("$", ["ex"], function(a, b, c, d, e, f) {
    var g = b('ex');
    function h(j) {
        var k = typeof j === 'string' ? document.getElementById(j) : j;
        if (!k)
            throw new Error(g('Tried to get element with id of "%s" but it is not present on the page.', j));
        return k;
    }
    function i(j) {
        return h(j);
    }
    i.unsafe = h;
    e.exports = i;
});
__d("CSSCore", ["invariant"], function(a, b, c, d, e, f) {
    var g = b('invariant');
    function h(j, k) {
        if (j.classList)
            return !!k && j.classList.contains(k);
        return (' ' + j.className + ' ').indexOf(' ' + k + ' ') > -1;
    }
    var i = {addClass: function(j, k) {
            g(!/\s/.test(k));
            if (k)
                if (j.classList) {
                    j.classList.add(k);
                } else if (!h(j, k))
                    j.className = j.className + ' ' + k;
            return j;
        }, removeClass: function(j, k) {
            g(!/\s/.test(k));
            if (k)
                if (j.classList) {
                    j.classList.remove(k);
                } else if (h(j, k))
                    j.className = j.className.replace(new RegExp('(^|\\s)' + k + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
            return j;
        }, conditionClass: function(j, k, l) {
            return (l ? i.addClass : i.removeClass)(j, k);
        }};
    e.exports = i;
});
__d("CSS", ["$", "CSSCore"], function(a, b, c, d, e, f) {
    var g = b('$').unsafe, h = b('CSSCore'), i = 'hidden_elem', j = {setClass: function(k, l) {
            g(k).className = l || '';
            return k;
        }, hasClass: function(k, l) {
            k = g(k);
            if (k.classList)
                return !!l && k.classList.contains(l);
            return (' ' + k.className + ' ').indexOf(' ' + l + ' ') > -1;
        }, addClass: function(k, l) {
            return h.addClass(g(k), l);
        }, removeClass: function(k, l) {
            return h.removeClass(g(k), l);
        }, conditionClass: function(k, l, m) {
            return h.conditionClass(g(k), l, m);
        }, toggleClass: function(k, l) {
            return j.conditionClass(k, l, !j.hasClass(k, l));
        }, shown: function(k) {
            return !j.hasClass(k, i);
        }, hide: function(k) {
            return j.addClass(k, i);
        }, show: function(k) {
            return j.removeClass(k, i);
        }, toggle: function(k) {
            return j.toggleClass(k, i);
        }, conditionShow: function(k, l) {
            return j.conditionClass(k, i, !l);
        }};
    e.exports = j;
});
__d("event-form-bubbling", [], function(a, b, c, d, e, f) {
    a.Event = a.Event || function() {
    };
    a.Event.__inlineSubmit = function(g, event) {
        var h = (a.Event.__getHandler && a.Event.__getHandler(g, 'submit'));
        return h ? null : a.Event.__bubbleSubmit(g, event);
    };
    a.Event.__bubbleSubmit = function(g, event) {
        if (document.documentElement.attachEvent) {
            var h;
            while (h !== false && (g = g.parentNode))
                h = g.onsubmit ? g.onsubmit(event) : a.Event.__fire && a.Event.__fire(g, 'submit', event);
            return h;
        }
    };
}, 3);
__d("DataStore", [], function(a, b, c, d, e, f) {
    var g = {}, h = 1;
    function i(l) {
        if (typeof l == 'string') {
            return 'str_' + l;
        } else
            return 'elem_' + (l.__FB_TOKEN || (l.__FB_TOKEN = [h++]))[0];
    }
    function j(l) {
        var m = i(l);
        return g[m] || (g[m] = {});
    }
    var k = {set: function(l, m, n) {
            if (!l)
                throw new TypeError('DataStore.set: namespace is required, got ' + (typeof l));
            var o = j(l);
            o[m] = n;
            return l;
        }, get: function(l, m, n) {
            if (!l)
                throw new TypeError('DataStore.get: namespace is required, got ' + (typeof l));
            var o = j(l), p = o[m];
            if (typeof p === 'undefined' && l.getAttribute)
                if (l.hasAttribute && !l.hasAttribute('data-' + m)) {
                    p = undefined;
                } else {
                    var q = l.getAttribute('data-' + m);
                    p = (null === q) ? undefined : q;
                }
            if ((n !== undefined) && (p === undefined))
                p = o[m] = n;
            return p;
        }, remove: function(l, m) {
            if (!l)
                throw new TypeError('DataStore.remove: namespace is required, got ' + (typeof l));
            var n = j(l), o = n[m];
            delete n[m];
            return o;
        }, purge: function(l) {
            delete g[i(l)];
        }};
    e.exports = k;
});
__d("isNode", [], function(a, b, c, d, e, f) {
    function g(h) {
        return !!(h && (typeof Node !== 'undefined' ? h instanceof Node : typeof h === 'object' && typeof h.nodeType === 'number' && typeof h.nodeName === 'string'));
    }
    e.exports = g;
});
__d("isTextNode", ["isNode"], function(a, b, c, d, e, f) {
    var g = b('isNode');
    function h(i) {
        return g(i) && i.nodeType == 3;
    }
    e.exports = h;
});
__d("containsNode", ["isTextNode"], function(a, b, c, d, e, f) {
    var g = b('isTextNode');
    function h(i, j) {
        if (!i || !j) {
            return false;
        } else if (i === j) {
            return true;
        } else if (g(i)) {
            return false;
        } else if (g(j)) {
            return h(i, j.parentNode);
        } else if (i.contains) {
            return i.contains(j);
        } else if (i.compareDocumentPosition) {
            return !!(i.compareDocumentPosition(j) & 16);
        } else
            return false;
    }
    e.exports = h;
});
__d("createObjectFrom", [], function(a, b, c, d, e, f) {
    function g(h, i) {
        var j = {}, k = Array.isArray(i);
        if (typeof i == 'undefined')
            i = true;
        for (var l = h.length; l--; )
            j[h[l]] = k ? i[l] : i;
        return j;
    }
    e.exports = g;
});
__d("getDocumentScrollElement", [], function(a, b, c, d, e, f) {
    "use strict";
    var g = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1;
    function h(i) {
        i = i || document;
        return !g && i.compatMode === 'CSS1Compat' ? i.documentElement : i.body;
    }
    e.exports = h;
});
__d("DOMQuery", ["CSS", "containsNode", "createArrayFrom", "createObjectFrom", "ge", "getDocumentScrollElement", "isNode", "isTextNode"], function(a, b, c, d, e, f) {
    var g = b('CSS'), h = b('containsNode'), i = b('createArrayFrom'), j = b('createObjectFrom'), k = b('ge'), l = b('getDocumentScrollElement'), m = b('isNode'), n = b('isTextNode'), o = null;
    function p(r, s) {
        return r.hasAttribute ? r.hasAttribute(s) : r.getAttribute(s) !== null;
    }
    var q = {find: function(r, s) {
            var t = q.scry(r, s);
            return t[0];
        }, scry: function(r, s) {
            if (!r || !r.getElementsByTagName)
                return [];
            var t = s.split(' '), u = [r];
            for (var v = 0; v < t.length; v++) {
                if (u.length === 0)
                    break;
                if (t[v] === '')
                    continue;
                var w = t[v], x = t[v], y = [], z = false;
                if (w.charAt(0) == '^')
                    if (v === 0) {
                        z = true;
                        w = w.slice(1);
                    } else
                        return [];
                w = w.replace(/\[(?:[^=\]]*=(?:"[^"]*"|'[^']*'))?|[.#]/g, ' $&');
                var aa = w.split(' '), ba = aa[0] || '*', ca = ba == '*', da = aa[1] && aa[1].charAt(0) == '#';
                if (da) {
                    var ea = k(aa[1].slice(1), r, ba);
                    if (ea && (ca || ea.tagName.toLowerCase() == ba))
                        for (var fa = 0; fa < u.length; fa++)
                            if (z && q.contains(ea, u[fa])) {
                                y = [ea];
                                break;
                            } else if (document == u[fa] || q.contains(u[fa], ea)) {
                                y = [ea];
                                break;
                            }
                } else {
                    var ga = [], ha = u.length, ia, ja = !z && x.indexOf('[') < 0 && document.querySelectorAll;
                    for (var ka = 0; ka < ha; ka++) {
                        if (z) {
                            ia = [];
                            var la = u[ka].parentNode;
                            while (q.isElementNode(la)) {
                                if (ca || la.tagName.toLowerCase() == ba)
                                    ia.push(la);
                                la = la.parentNode;
                            }
                        } else if (ja) {
                            ia = u[ka].querySelectorAll(x);
                        } else
                            ia = u[ka].getElementsByTagName(ba);
                        var ma = ia.length;
                        for (var na = 0; na < ma; na++)
                            ga.push(ia[na]);
                    }
                    if (!ja)
                        for (var oa = 1; oa < aa.length; oa++) {
                            var pa = aa[oa], qa = pa.charAt(0) == '.', ra = pa.substring(1);
                            for (ka = 0; ka < ga.length; ka++) {
                                var sa = ga[ka];
                                if (!sa || sa.nodeType !== 1)
                                    continue;
                                if (qa) {
                                    if (!g.hasClass(sa, ra))
                                        delete ga[ka];
                                    continue;
                                } else {
                                    var ta = pa.slice(1, pa.length - 1);
                                    if (ta.indexOf('=') == -1) {
                                        if (!p(sa, ta)) {
                                            delete ga[ka];
                                            continue;
                                        }
                                    } else {
                                        var ua = ta.split('='), va = ua[0], wa = ua[1];
                                        wa = wa.slice(1, wa.length - 1);
                                        if (sa.getAttribute(va) != wa) {
                                            delete ga[ka];
                                            continue;
                                        }
                                    }
                                }
                            }
                        }
                    for (ka = 0; ka < ga.length; ka++)
                        if (ga[ka]) {
                            y.push(ga[ka]);
                            if (z)
                                break;
                        }
                }
                u = y;
            }
            return u;
        }, getText: function(r) {
            if (q.isTextNode(r)) {
                return r.data;
            } else if (q.isElementNode(r)) {
                if (o === null) {
                    var s = document.createElement('div');
                    o = s.textContent != null ? 'textContent' : 'innerText';
                }
                return r[o];
            } else
                return '';
        }, getSelection: function() {
            var r = window.getSelection, s = document.selection;
            if (r) {
                return r() + '';
            } else if (s)
                return s.createRange().text;
            return null;
        }, contains: function(r, s) {
            r = k(r);
            s = k(s);
            typeof r === 'string' || typeof s === 'string';
            return h(r, s);
        }, getRootElement: function() {
            var r = null;
            if (window.Quickling && Quickling.isActive())
                r = k('content');
            return r || document.body;
        }, isNode: function(r) {
            return m(r);
        }, isNodeOfType: function(r, s) {
            var t = i(s).join('|').toUpperCase().split('|'), u = j(t);
            return q.isNode(r) && r.nodeName in u;
        }, isElementNode: function(r) {
            return q.isNode(r) && r.nodeType == 1;
        }, isTextNode: function(r) {
            return n(r);
        }, isInputNode: function(r) {
            return q.isNodeOfType(r, ['input', 'textarea']) || r.contentEditable === 'true';
        }, getDocumentScrollElement: l};
    e.exports = q;
});
__d("DOMEvent", ["invariant"], function(a, b, c, d, e, f) {
    var g = b('invariant');
    function h(i) {
        "use strict";
        this.event = i || window.event;
        g(typeof (this.event.srcElement) != 'unknown');
        this.target = this.event.target || this.event.srcElement;
    }
    h.prototype.preventDefault = function() {
        "use strict";
        var i = this.event;
        if (i.preventDefault) {
            i.preventDefault();
            if (!('defaultPrevented' in i))
                i.defaultPrevented = true;
        } else
            i.returnValue = false;
        return this;
    };
    h.prototype.isDefaultPrevented = function() {
        "use strict";
        var i = this.event;
        return ('defaultPrevented' in i) ? i.defaultPrevented : i.returnValue === false;
    };
    h.prototype.stopPropagation = function() {
        "use strict";
        var i = this.event;
        i.stopPropagation ? i.stopPropagation() : i.cancelBubble = true;
        return this;
    };
    h.prototype.kill = function() {
        "use strict";
        this.stopPropagation().preventDefault();
        return this;
    };
    h.killThenCall = function(i) {
        "use strict";
        return function(j) {
            new h(j).kill();
            return i();
        };
    };
    e.exports = h;
});
__d("Parent", ["CSS"], function(a, b, c, d, e, f) {
    var g = b('CSS'), h = {byTag: function(i, j) {
            j = j.toUpperCase();
            while (i && i.nodeName != j)
                i = i.parentNode;
            return i;
        }, byClass: function(i, j) {
            while (i && !g.hasClass(i, j))
                i = i.parentNode;
            return i;
        }, byAttribute: function(i, j) {
            while (i && (!i.getAttribute || !i.getAttribute(j)))
                i = i.parentNode;
            return i;
        }};
    e.exports = h;
});
__d("UserAgent", [], function(a, b, c, d, e, f) {
    var g = false, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;
    function w() {
        if (g)
            return;
        g = true;
        var y = navigator.userAgent, z = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(y), aa = /(Mac OS X)|(Windows)|(Linux)/.exec(y);
        s = /\b(iPhone|iP[ao]d)/.exec(y);
        t = /\b(iP[ao]d)/.exec(y);
        q = /Android/i.exec(y);
        u = /FBAN\/\w+;/i.exec(y);
        v = /Mobile/i.exec(y);
        r = !!(/Win64/.exec(y));
        if (z) {
            h = z[1] ? parseFloat(z[1]) : (z[5] ? parseFloat(z[5]) : NaN);
            if (h && document && document.documentMode)
                h = document.documentMode;
            var ba = /(?:Trident\/(\d+.\d+))/.exec(y);
            m = ba ? parseFloat(ba[1]) + 4 : h;
            i = z[2] ? parseFloat(z[2]) : NaN;
            j = z[3] ? parseFloat(z[3]) : NaN;
            k = z[4] ? parseFloat(z[4]) : NaN;
            if (k) {
                z = /(?:Chrome\/(\d+\.\d+))/.exec(y);
                l = z && z[1] ? parseFloat(z[1]) : NaN;
            } else
                l = NaN;
        } else
            h = i = j = l = k = NaN;
        if (aa) {
            if (aa[1]) {
                var ca = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(y);
                n = ca ? parseFloat(ca[1].replace('_', '.')) : true;
            } else
                n = false;
            o = !!aa[2];
            p = !!aa[3];
        } else
            n = o = p = false;
    }
    var x = {ie: function() {
            return w() || h;
        }, ieCompatibilityMode: function() {
            return w() || (m > h);
        }, ie64: function() {
            return x.ie() && r;
        }, firefox: function() {
            return w() || i;
        }, opera: function() {
            return w() || j;
        }, webkit: function() {
            return w() || k;
        }, safari: function() {
            return x.webkit();
        }, chrome: function() {
            return w() || l;
        }, windows: function() {
            return w() || o;
        }, osx: function() {
            return w() || n;
        }, linux: function() {
            return w() || p;
        }, iphone: function() {
            return w() || s;
        }, mobile: function() {
            return w() || (s || t || q || v);
        }, nativeApp: function() {
            return w() || u;
        }, android: function() {
            return w() || q;
        }, ipad: function() {
            return w() || t;
        }};
    e.exports = x;
});
__d("DOMEventListener", ["wrapFunction"], function(a, b, c, d, e, f) {
    var g = b('wrapFunction'), h, i;
    if (window.addEventListener) {
        h = function(k, l, m) {
            m.wrapper = g(m, 'entry', 'DOMEventListener.add ' + l);
            k.addEventListener(l, m.wrapper, false);
        };
        i = function(k, l, m) {
            k.removeEventListener(l, m.wrapper, false);
        };
    } else if (window.attachEvent) {
        h = function(k, l, m) {
            m.wrapper = g(m, 'entry', 'DOMEventListener.add ' + l);
            k.attachEvent('on' + l, m.wrapper);
        };
        i = function(k, l, m) {
            k.detachEvent('on' + l, m.wrapper);
        };
    } else
        i = h = function() {
        };
    var j = {add: function(k, l, m) {
            h(k, l, m);
            return {remove: function() {
                    i(k, l, m);
                    k = null;
                }};
        }, remove: i};
    e.exports = j;
});
__d("getObjectValues", [], function(a, b, c, d, e, f) {
    function g(h) {
        var i = [];
        for (var j in h)
            i.push(h[j]);
        return i;
    }
    e.exports = g;
});
__d("Event", ["event-form-bubbling", "Arbiter", "DataStore", "DOMQuery", "DOMEvent", "ErrorUtils", "Parent", "UserAgent", "DOMEventListener", "$", "copyProperties", "invariant", "getObjectValues"], function(a, b, c, d, e, f) {
    b('event-form-bubbling');
    var g = b('Arbiter'), h = b('DataStore'), i = b('DOMQuery'), j = b('DOMEvent'), k = b('ErrorUtils'), l = b('Parent'), m = b('UserAgent'), n = b('DOMEventListener'), o = b('$'), p = b('copyProperties'), q = b('invariant'), r = b('getObjectValues'), s = a.Event, t = 'Event.listeners';
    if (!s.prototype)
        s.prototype = {};
    function u(ea) {
        if (ea.type === 'click' || ea.type === 'mouseover' || ea.type === 'keydown')
            g.inform('Event/stop', {event: ea});
    }
    function v(ea, fa, ga) {
        this.target = ea;
        this.type = fa;
        this.data = ga;
    }
    p(v.prototype, {getData: function() {
            this.data = this.data || {};
            return this.data;
        }, stop: function() {
            return s.stop(this);
        }, prevent: function() {
            return s.prevent(this);
        }, isDefaultPrevented: function() {
            return s.isDefaultPrevented(this);
        }, kill: function() {
            return s.kill(this);
        }, getTarget: function() {
            return new j(this).target || null;
        }});
    function w(ea) {
        if (ea instanceof v)
            return ea;
        if (!ea)
            if (!window.addEventListener && document.createEventObject) {
                ea = window.event ? document.createEventObject(window.event) : {};
            } else
                ea = {};
        if (!ea._inherits_from_prototype)
            for (var fa in s.prototype)
                try {
                    ea[fa] = s.prototype[fa];
                } catch (ga) {
                }
        return ea;
    }
    p(s.prototype, {_inherits_from_prototype: true, getRelatedTarget: function() {
            var ea = this.relatedTarget || (this.fromElement === this.srcElement ? this.toElement : this.fromElement);
            return ea && ea.nodeType ? ea : null;
        }, getModifiers: function() {
            var ea = {control: !!this.ctrlKey, shift: !!this.shiftKey, alt: !!this.altKey, meta: !!this.metaKey};
            ea.access = m.osx() ? ea.control : ea.alt;
            ea.any = ea.control || ea.shift || ea.alt || ea.meta;
            return ea;
        }, isRightClick: function() {
            if (this.which)
                return this.which === 3;
            return this.button && this.button === 2;
        }, isMiddleClick: function() {
            if (this.which)
                return this.which === 2;
            return this.button && this.button === 4;
        }, isDefaultRequested: function() {
            return this.getModifiers().any || this.isMiddleClick() || this.isRightClick();
        }});
    p(s.prototype, v.prototype);
    p(s, {listen: function(ea, fa, ga, ha) {
            if (typeof ea == 'string')
                ea = o(ea);
            if (typeof ha == 'undefined')
                ha = s.Priority.NORMAL;
            if (typeof fa == 'object') {
                var ia = {};
                for (var ja in fa)
                    ia[ja] = s.listen(ea, ja, fa[ja], ha);
                return ia;
            }
            if (fa.match(/^on/i))
                throw new TypeError("Bad event name `" + fa + "': use `click', not `onclick'.");
            if (ea.nodeName == 'LABEL' && fa == 'click') {
                var ka = ea.getElementsByTagName('input');
                ea = ka.length == 1 ? ka[0] : ea;
            } else if (ea === window && fa === 'scroll') {
                var la = i.getDocumentScrollElement();
                if (la !== document.documentElement && la !== document.body)
                    ea = la;
            }
            var ma = h.get(ea, t, {}), na = z[fa];
            if (na) {
                fa = na.base;
                if (na.wrap)
                    ga = na.wrap(ga);
            }
            ba(ea, ma, fa);
            var oa = ma[fa];
            if (!(ha in oa))
                oa[ha] = [];
            var pa = oa[ha].length, qa = new da(ga, ma, fa, ha, pa);
            oa[ha][pa] = qa;
            oa.numHandlers++;
            return qa;
        }, stop: function(ea) {
            var fa = new j(ea).stopPropagation();
            u(fa.event);
            return ea;
        }, prevent: function(ea) {
            new j(ea).preventDefault();
            return ea;
        }, isDefaultPrevented: function(ea) {
            return new j(ea).isDefaultPrevented(ea);
        }, kill: function(ea) {
            var fa = new j(ea).kill();
            u(fa.event);
            return false;
        }, getKeyCode: function(event) {
            event = new j(event).event;
            if (!event)
                return false;
            switch (event.keyCode) {
                case 63232:
                    return 38;
                case 63233:
                    return 40;
                case 63234:
                    return 37;
                case 63235:
                    return 39;
                case 63272:
                case 63273:
                case 63275:
                    return null;
                case 63276:
                    return 33;
                case 63277:
                    return 34;
            }
            if (event.shiftKey)
                switch (event.keyCode) {
                    case 33:
                    case 34:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        return null;
                }
            return event.keyCode;
        }, getPriorities: function() {
            if (!x) {
                var ea = r(s.Priority);
                ea.sort(function(fa, ga) {
                    return fa - ga;
                });
                x = ea;
            }
            return x;
        }, fire: function(ea, fa, ga) {
            var ha = new v(ea, fa, ga), ia;
            do {
                var ja = s.__getHandler(ea, fa);
                if (ja)
                    ia = ja(ha);
                ea = ea.parentNode;
            } while (ea && ia !== false && !ha.cancelBubble);
            return ia !== false;
        }, __fire: function(ea, fa, event) {
            var ga = s.__getHandler(ea, fa);
            if (ga)
                return ga(w(event));
        }, __getHandler: function(ea, fa) {
            var ga = h.get(ea, t);
            if (ga && ga[fa])
                return ga[fa].domHandler;
        }, getPosition: function(ea) {
            ea = new j(ea).event;
            var fa = i.getDocumentScrollElement(), ga = ea.clientX + fa.scrollLeft, ha = ea.clientY + fa.scrollTop;
            return {x: ga, y: ha};
        }});
    var x = null, y = function(ea) {
        return function(fa) {
            if (!i.contains(this, fa.getRelatedTarget()))
                return ea.call(this, fa);
        };
    }, z;
    if (!window.navigator.msPointerEnabled) {
        z = {mouseenter: {base: 'mouseover', wrap: y}, mouseleave: {base: 'mouseout', wrap: y}};
    } else
        z = {mousedown: {base: 'MSPointerDown'}, mousemove: {base: 'MSPointerMove'}, mouseup: {base: 'MSPointerUp'}, mouseover: {base: 'MSPointerOver'}, mouseout: {base: 'MSPointerOut'}, mouseenter: {base: 'MSPointerOver', wrap: y}, mouseleave: {base: 'MSPointerOut', wrap: y}};
    if (m.firefox()) {
        var aa = function(ea, event) {
            event = w(event);
            var fa = event.getTarget();
            while (fa) {
                s.__fire(fa, ea, event);
                fa = fa.parentNode;
            }
        };
        document.documentElement.addEventListener('focus', aa.bind(null, 'focusin'), true);
        document.documentElement.addEventListener('blur', aa.bind(null, 'focusout'), true);
    }
    var ba = function(ea, fa, ga) {
        if (ga in fa)
            return;
        var ha = ca.bind(ea, ga);
        fa[ga] = {numHandlers: 0, domHandlerRemover: n.add(ea, ga, ha), domHandler: ha};
        var ia = 'on' + ga;
        if (ea[ia]) {
            var ja = ea === document.documentElement ? s.Priority._BUBBLE : s.Priority.TRADITIONAL, ka = ea[ia];
            ea[ia] = null;
            s.listen(ea, ga, ka, ja);
        }
        if (ea.nodeName === 'FORM' && ga === 'submit')
            s.listen(ea, ga, s.__bubbleSubmit.bind(null, ea), s.Priority._BUBBLE);
    }, ca = function(ea, event) {
        event = w(event);
        if (!h.get(this, t))
            throw new Error("Bad listenHandler context.");
        var fa = h.get(this, t)[ea];
        if (!fa)
            throw new Error("No registered handlers for `" + ea + "'.");
        if (ea == 'click') {
            var ga = l.byTag(event.getTarget(), 'a');
            if (window.userAction)
                var ha = window.userAction('evt_ext', ga, event, {mode: 'DEDUP'}).uai_fallback('click');
            if (window.clickRefAction)
                window.clickRefAction('click', ga, event);
        }
        var ia = s.getPriorities();
        for (var ja = 0; ja < ia.length; ja++) {
            var ka = ia[ja];
            if (ka in fa) {
                var la = fa[ka];
                for (var ma = 0; ma < la.length; ma++) {
                    if (!la[ma])
                        continue;
                    var na = la[ma].fire(this, event);
                    if (na === false) {
                        return event.kill();
                    } else if (event.cancelBubble)
                        event.stop();
                }
            }
        }
        return event.returnValue;
    };
    s.Priority = {URGENT: -20, TRADITIONAL: -10, NORMAL: 0, _BUBBLE: 1000};
    function da(ea, fa, ga, ha, ia) {
        this._handler = ea;
        this._handlers = fa;
        this._type = ga;
        this._priority = ha;
        this._id = ia;
    }
    p(da.prototype, {remove: function() {
            q(this._handlers);
            var ea = this._handlers[this._type];
            if (ea.numHandlers <= 1) {
                ea.domHandlerRemover.remove();
                delete this._handlers[this._type];
            } else {
                delete ea[this._priority][this._id];
                ea.numHandlers--;
            }
            this._handlers = null;
        }, fire: function(ea, event) {
            return k.applyWithGuard(this._handler, ea, [event], function(fa) {
                fa.event_type = event.type;
                fa.dom_element = ea.name || ea.id;
                fa.category = 'eventhandler';
            });
        }});
    a.$E = s.$E = w;
    e.exports = s;
});
__d("HTTPErrors", ["emptyFunction"], function(a, b, c, d, e, f) {
    var g = b('emptyFunction'), h = {get: g, getAll: g};
    e.exports = h;
});
__d("JSCC", [], function(a, b, c, d, e, f) {
    var g = {};
    function h(j) {
        var k, l = false;
        return function() {
            if (!l) {
                k = j();
                l = true;
            }
            return k;
        };
    }
    var i = {get: function(j) {
            if (!g[j])
                throw new Error('JSCC entry is missing');
            return g[j]();
        }, init: function(j) {
            for (var k in j)
                g[k] = h(j[k]);
            return function l() {
                for (var m in j)
                    delete g[m];
            };
        }};
    e.exports = i;
});
__d("PHPQuerySerializer", ["invariant"], function(a, b, c, d, e, f) {
    var g = b('invariant');
    function h(o) {
        return i(o, null);
    }
    function i(o, p) {
        p = p || '';
        var q = [];
        if (o === null || o === undefined) {
            q.push(j(p));
        } else if (typeof (o) == 'object') {
            g(!(('nodeName' in o) || ('nodeType' in o)));
            for (var r in o)
                if (o.hasOwnProperty(r) && o[r] !== undefined)
                    q.push(i(o[r], p ? (p + '[' + r + ']') : r));
        } else
            q.push(j(p) + '=' + j(o));
        return q.join('&');
    }
    function j(o) {
        return encodeURIComponent(o).replace(/%5D/g, "]").replace(/%5B/g, "[");
    }
    var k = /^(\w+)((?:\[\w*\])+)=?(.*)/;
    function l(o) {
        if (!o)
            return {};
        var p = {};
        o = o.replace(/%5B/ig, '[').replace(/%5D/ig, ']');
        o = o.split('&');
        var q = Object.prototype.hasOwnProperty;
        for (var r = 0, s = o.length; r < s; r++) {
            var t = o[r].match(k);
            if (!t) {
                var u = o[r].split('=');
                p[m(u[0])] = u[1] === undefined ? null : m(u[1]);
            } else {
                var v = t[2].split(/\]\[|\[|\]/).slice(0, -1), w = t[1], x = m(t[3] || '');
                v[0] = w;
                var y = p;
                for (var z = 0; z < v.length - 1; z++)
                    if (v[z]) {
                        if (!q.call(y, v[z])) {
                            var aa = v[z + 1] && !v[z + 1].match(/^\d{1,3}$/) ? {} : [];
                            y[v[z]] = aa;
                            if (y[v[z]] !== aa)
                                return p;
                        }
                        y = y[v[z]];
                    } else {
                        if (v[z + 1] && !v[z + 1].match(/^\d{1,3}$/)) {
                            y.push({});
                        } else
                            y.push([]);
                        y = y[y.length - 1];
                    }
                if (y instanceof Array && v[v.length - 1] === '') {
                    y.push(x);
                } else
                    y[v[v.length - 1]] = x;
            }
        }
        return p;
    }
    function m(o) {
        return decodeURIComponent(o.replace(/\+/g, ' '));
    }
    var n = {serialize: h, encodeComponent: j, deserialize: l, decodeComponent: m};
    e.exports = n;
});
__d("OnloadEvent", [], function(a, b, c, d, e, f) {
    var g = {ONLOAD: 'onload/onload', ONLOAD_CALLBACK: 'onload/onload_callback', ONLOAD_DOMCONTENT: 'onload/dom_content_ready', ONLOAD_DOMCONTENT_CALLBACK: 'onload/domcontent_callback', ONBEFOREUNLOAD: 'onload/beforeunload', ONUNLOAD: 'onload/unload'};
    e.exports = g;
});
__d("Run", ["Arbiter", "OnloadEvent"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('OnloadEvent'), i = 'onunloadhooks', j = 'onafterunloadhooks', k = g.BEHAVIOR_STATE;
    function l(ba) {
        var ca = a.CavalryLogger;
        ca && ca.getInstance().setTimeStamp(ba);
    }
    function m() {
        return !window.loading_page_chrome;
    }
    function n(ba) {
        var ca = a.OnloadHooks;
        if (window.loaded && ca) {
            ca.runHook(ba, 'onlateloadhooks');
        } else
            u('onloadhooks', ba);
    }
    function o(ba) {
        var ca = a.OnloadHooks;
        if (window.afterloaded && ca) {
            setTimeout(function() {
                ca.runHook(ba, 'onlateafterloadhooks');
            }, 0);
        } else
            u('onafterloadhooks', ba);
    }
    function p(ba, ca) {
        if (ca === undefined)
            ca = m();
        ca ? u('onbeforeleavehooks', ba) : u('onbeforeunloadhooks', ba);
    }
    function q(ba, ca) {
        if (!window.onunload)
            window.onunload = function() {
                g.inform(h.ONUNLOAD, true, k);
            };
        u(ba, ca);
    }
    function r(ba) {
        q(i, ba);
    }
    function s(ba) {
        q(j, ba);
    }
    function t(ba) {
        u('onleavehooks', ba);
    }
    function u(ba, ca) {
        window[ba] = (window[ba] || []).concat(ca);
    }
    function v(ba) {
        window[ba] = [];
    }
    function w() {
        g.inform(h.ONLOAD_DOMCONTENT, true, k);
    }
    a._domcontentready = w;
    function x() {
        var ba = document, ca = window;
        if (ba.addEventListener) {
            var da = /AppleWebKit.(\d+)/.exec(navigator.userAgent);
            if (da && da[1] < 525) {
                var ea = setInterval(function() {
                    if (/loaded|complete/.test(ba.readyState)) {
                        w();
                        clearInterval(ea);
                    }
                }, 10);
            } else
                ba.addEventListener("DOMContentLoaded", w, true);
        } else {
            var fa = 'javascript:void(0)';
            if (ca.location.protocol == 'https:')
                fa = '//:';
            ba.write('<script onreadystatechange="if (this.readyState==\'complete\') {' + 'this.parentNode.removeChild(this);_domcontentready();}" ' + 'defer="defer" src="' + fa + '"><\/script\>');
        }
        var ga = ca.onload;
        ca.onload = function() {
            l('t_layout');
            ga && ga();
            g.inform(h.ONLOAD, true, k);
        };
        ca.onbeforeunload = function() {
            var ha = {};
            g.inform(h.ONBEFOREUNLOAD, ha, k);
            if (!ha.warn)
                g.inform('onload/exit', true);
            return ha.warn;
        };
    }
    var y = g.registerCallback(function() {
        l('t_onload');
        g.inform(h.ONLOAD_CALLBACK, true, k);
    }, [h.ONLOAD]), z = g.registerCallback(function() {
        l('t_domcontent');
        var ba = {timeTriggered: Date.now()};
        g.inform(h.ONLOAD_DOMCONTENT_CALLBACK, ba, k);
    }, [h.ONLOAD_DOMCONTENT]);
    x();
    var aa = {onLoad: n, onAfterLoad: o, onLeave: t, onBeforeUnload: p, onUnload: r, onAfterUnload: s, __domContentCallback: z, __onloadCallback: y, __removeHook: v};
    e.exports = aa;
});
__d("URIRFC3986", [], function(a, b, c, d, e, f) {
    var g = new RegExp('^' + '([^:/?#]+:)?' + '(//' + '([^\\\\/?#@]*@)?' + '(' + '\\[[A-Fa-f0-9:.]+\\]|' + '[^\\/?#:]*' + ')' + '(:[0-9]*)?' + ')?' + '([^?#]*)' + '(\\?[^#]*)?' + '(#.*)?'), h = {parse: function(i) {
            if (i.trim() === '')
                return null;
            var j = i.match(g), k = {};
            k.uri = j[0] ? j[0] : null;
            k.scheme = j[1] ? j[1].substr(0, j[1].length - 1) : null;
            k.authority = j[2] ? j[2].substr(2) : null;
            k.userinfo = j[3] ? j[3].substr(0, j[3].length - 1) : null;
            k.host = j[2] ? j[4] : null;
            k.port = j[5] ? (j[5].substr(1) ? parseInt(j[5].substr(1), 10) : null) : null;
            k.path = j[6] ? j[6] : null;
            k.query = j[7] ? j[7].substr(1) : null;
            k.fragment = j[8] ? j[8].substr(1) : null;
            k.isGenericURI = k.authority === null && !!k.scheme;
            return k;
        }};
    e.exports = h;
});
__d("URISchemes", ["createObjectFrom"], function(a, b, c, d, e, f) {
    var g = b('createObjectFrom'), h = g(['fb', 'fbcf', 'fbconnect', 'fb-messenger', 'fbrpc', 'file', 'ftp', 'http', 'https', 'mailto', 'itms', 'itms-apps', 'itms-services', 'market', 'svn+ssh', 'fbstaging', 'tel', 'sms']), i = {isAllowed: function(j) {
            if (!j)
                return true;
            return h.hasOwnProperty(j.toLowerCase());
        }};
    e.exports = i;
});
__d("URIBase", ["PHPQuerySerializer", "URIRFC3986", "URISchemes", "copyProperties", "ex", "invariant"], function(a, b, c, d, e, f) {
    var g = b('PHPQuerySerializer'), h = b('URIRFC3986'), i = b('URISchemes'), j = b('copyProperties'), k = b('ex'), l = b('invariant'), m = new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' + '\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' + '\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'), n = new RegExp('^(?:[^/]*:|' + '[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');
    function o(q, r, s) {
        if (!r)
            return true;
        if (r instanceof p) {
            q.setProtocol(r.getProtocol());
            q.setDomain(r.getDomain());
            q.setPort(r.getPort());
            q.setPath(r.getPath());
            q.setQueryData(g.deserialize(g.serialize(r.getQueryData())));
            q.setFragment(r.getFragment());
            return true;
        }
        r = r.toString();
        var t = h.parse(r) || {};
        if (!s && !i.isAllowed(t.scheme))
            return false;
        q.setProtocol(t.scheme || '');
        if (!s && m.test(t.host))
            return false;
        q.setDomain(t.host || '');
        q.setPort(t.port || '');
        q.setPath(t.path || '');
        if (s) {
            q.setQueryData(g.deserialize(t.query) || {});
        } else
            try {
                q.setQueryData(g.deserialize(t.query) || {});
            } catch (u) {
                return false;
            }
        q.setFragment(t.fragment || '');
        if (t.userinfo !== null)
            if (s) {
                throw new Error(k('URI.parse: invalid URI (userinfo is not allowed in a URI): %s', q.toString()));
            } else
                return false;
        if (!q.getDomain() && q.getPath().indexOf('\\') !== -1)
            if (s) {
                throw new Error(k('URI.parse: invalid URI (no domain but multiple back-slashes): %s', q.toString()));
            } else
                return false;
        if (!q.getProtocol() && n.test(r))
            if (s) {
                throw new Error(k('URI.parse: invalid URI (unsafe protocol-relative URLs): %s', q.toString()));
            } else
                return false;
        return true;
    }
    function p(q) {
        "use strict";
        this.$URIBase0 = '';
        this.$URIBase1 = '';
        this.$URIBase2 = '';
        this.$URIBase3 = '';
        this.$URIBase4 = '';
        this.$URIBase5 = {};
        o(this, q, true);
    }
    p.prototype.setProtocol = function(q) {
        "use strict";
        l(i.isAllowed(q));
        this.$URIBase0 = q;
        return this;
    };
    p.prototype.getProtocol = function(q) {
        "use strict";
        return this.$URIBase0;
    };
    p.prototype.setSecure = function(q) {
        "use strict";
        return this.setProtocol(q ? 'https' : 'http');
    };
    p.prototype.isSecure = function() {
        "use strict";
        return this.getProtocol() === 'https';
    };
    p.prototype.setDomain = function(q) {
        "use strict";
        if (m.test(q))
            throw new Error(k('URI.setDomain: unsafe domain specified: %s for url %s', q, this.toString()));
        this.$URIBase1 = q;
        return this;
    };
    p.prototype.getDomain = function() {
        "use strict";
        return this.$URIBase1;
    };
    p.prototype.setPort = function(q) {
        "use strict";
        this.$URIBase2 = q;
        return this;
    };
    p.prototype.getPort = function() {
        "use strict";
        return this.$URIBase2;
    };
    p.prototype.setPath = function(q) {
        "use strict";
        this.$URIBase3 = q;
        return this;
    };
    p.prototype.getPath = function() {
        "use strict";
        return this.$URIBase3;
    };
    p.prototype.addQueryData = function(q, r) {
        "use strict";
        if (q instanceof Object) {
            j(this.$URIBase5, q);
        } else
            this.$URIBase5[q] = r;
        return this;
    };
    p.prototype.setQueryData = function(q) {
        "use strict";
        this.$URIBase5 = q;
        return this;
    };
    p.prototype.getQueryData = function() {
        "use strict";
        return this.$URIBase5;
    };
    p.prototype.removeQueryData = function(q) {
        "use strict";
        if (!Array.isArray(q))
            q = [q];
        for (var r = 0, s = q.length; r < s; ++r)
            delete this.$URIBase5[q[r]];
        return this;
    };
    p.prototype.setFragment = function(q) {
        "use strict";
        this.$URIBase4 = q;
        return this;
    };
    p.prototype.getFragment = function() {
        "use strict";
        return this.$URIBase4;
    };
    p.prototype.isEmpty = function() {
        "use strict";
        return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment());
    };
    p.prototype.toString = function() {
        "use strict";
        var q = '';
        if (this.$URIBase0)
            q += this.$URIBase0 + '://';
        if (this.$URIBase1)
            q += this.$URIBase1;
        if (this.$URIBase2)
            q += ':' + this.$URIBase2;
        if (this.$URIBase3) {
            q += this.$URIBase3;
        } else if (q)
            q += '/';
        var r = g.serialize(this.$URIBase5);
        if (r)
            q += '?' + r;
        if (this.$URIBase4)
            q += '#' + this.$URIBase4;
        return q;
    };
    p.prototype.getOrigin = function() {
        "use strict";
        return this.$URIBase0 + '://' + this.$URIBase1 + (this.$URIBase2 ? ':' + this.$URIBase2 : '');
    };
    p.isValidURI = function(q) {
        return o(new p(), q, false);
    };
    e.exports = p;
});
__d("goURI", [], function(a, b, c, d, e, f) {
    function g(h, i, j) {
        h = h.toString();
        if (!(/(^https?:\/\/)|(^\/)/).test(h))
            return;
        if (!i && a.PageTransitions && PageTransitions.isInitialized()) {
            PageTransitions.go(h, j);
        } else if (window.location.href == h) {
            window.location.reload();
        } else
            window.location.href = h;
    }
    e.exports = g;
});
__d("URI", ["URIBase", "copyProperties", "goURI"], function(a, b, c, d, e, f) {
    var g = b('URIBase'), h = b('copyProperties'), i = b('goURI');
    for (var j in g)
        if (g.hasOwnProperty(j))
            l[j] = g[j];
    var k = g === null ? null : g.prototype;
    l.prototype = Object.create(k);
    l.prototype.constructor = l;
    l.__superConstructor__ = g;
    function l(m) {
        "use strict";
        if (!(this instanceof l))
            return new l(m || window.location.href);
        g.call(this, m || '');
    }
    l.prototype.setPath = function(m) {
        "use strict";
        this.path = m;
        return k.setPath.call(this, m);
    };
    l.prototype.getPath = function() {
        "use strict";
        var m = k.getPath.call(this);
        if (m)
            return m.replace(/^\/+/, '/');
        return m;
    };
    l.prototype.setProtocol = function(m) {
        "use strict";
        this.protocol = m;
        return k.setProtocol.call(this, m);
    };
    l.prototype.setDomain = function(m) {
        "use strict";
        this.domain = m;
        return k.setDomain.call(this, m);
    };
    l.prototype.setPort = function(m) {
        "use strict";
        this.port = m;
        return k.setPort.call(this, m);
    };
    l.prototype.setFragment = function(m) {
        "use strict";
        this.fragment = m;
        return k.setFragment.call(this, m);
    };
    l.prototype.valueOf = function() {
        "use strict";
        return this.toString();
    };
    l.prototype.isFacebookURI = function() {
        "use strict";
        if (!l.$URI0)
            l.$URI0 = new RegExp('(^|\\.)facebook\\.com$', 'i');
        if (this.isEmpty())
            return false;
        if (!this.getDomain() && !this.getProtocol())
            return true;
        return (['http', 'https'].indexOf(this.getProtocol()) !== -1 && l.$URI0.test(this.getDomain()));
    };
    l.prototype.isLinkshimURI = function() {
        "use strict";
        if (this.isFacebookURI() && (this.getPath() === '/l.php' || this.getPath().indexOf('/si/ajax/l/') === 0 || this.getPath().indexOf('/l/') === 0 || this.getPath().indexOf('l/') === 0))
            return true;
        return false;
    };
    l.prototype.getRegisteredDomain = function() {
        "use strict";
        if (!this.getDomain())
            return '';
        if (!this.isFacebookURI())
            return null;
        var m = this.getDomain().split('.'), n = m.indexOf('facebook');
        return m.slice(n).join('.');
    };
    l.prototype.getUnqualifiedURI = function() {
        "use strict";
        return new l(this).setProtocol(null).setDomain(null).setPort(null);
    };
    l.prototype.getQualifiedURI = function() {
        "use strict";
        return new l(this).$URI1();
    };
    l.prototype.$URI1 = function() {
        "use strict";
        if (!this.getDomain()) {
            var m = l();
            this.setProtocol(m.getProtocol()).setDomain(m.getDomain()).setPort(m.getPort());
        }
        return this;
    };
    l.prototype.isSameOrigin = function(m) {
        "use strict";
        var n = m || window.location.href;
        if (!(n instanceof l))
            n = new l(n.toString());
        if (this.isEmpty() || n.isEmpty())
            return false;
        if (this.getProtocol() && this.getProtocol() != n.getProtocol())
            return false;
        if (this.getDomain() && this.getDomain() != n.getDomain())
            return false;
        if (this.getPort() && this.getPort() != n.getPort())
            return false;
        return true;
    };
    l.prototype.go = function(m) {
        "use strict";
        i(this, m);
    };
    l.prototype.setSubdomain = function(m) {
        "use strict";
        var n = this.$URI1().getDomain().split('.');
        if (n.length <= 2) {
            n.unshift(m);
        } else
            n[0] = m;
        return this.setDomain(n.join('.'));
    };
    l.prototype.getSubdomain = function() {
        "use strict";
        if (!this.getDomain())
            return '';
        var m = this.getDomain().split('.');
        if (m.length <= 2) {
            return '';
        } else
            return m[0];
    };
    h(l, {getRequestURI: function(m, n) {
            m = m === undefined || m;
            var o = a.PageTransitions;
            if (m && o && o.isInitialized()) {
                return o.getCurrentURI(!!n).getQualifiedURI();
            } else
                return new l(window.location.href);
        }, getMostRecentURI: function() {
            var m = a.PageTransitions;
            if (m && m.isInitialized()) {
                return m.getMostRecentURI().getQualifiedURI();
            } else
                return new l(window.location.href);
        }, getNextURI: function() {
            var m = a.PageTransitions;
            if (m && m.isInitialized()) {
                return m.getNextURI().getQualifiedURI();
            } else
                return new l(window.location.href);
        }, expression: /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/, arrayQueryExpression: /^(\w+)((?:\[\w*\])+)=?(.*)/, encodeComponent: function(m) {
            return encodeURIComponent(m).replace(/%5D/g, "]").replace(/%5B/g, "[");
        }, decodeComponent: function(m) {
            return decodeURIComponent(m.replace(/\+/g, ' '));
        }});
    e.exports = l;
});
__d("CurrentUser", ["CurrentUserInitialData"], function(a, b, c, d, e, f) {
    var g = b('CurrentUserInitialData'), h = {getID: function() {
            return g.id;
        }, isLoggedIn: function() {
            var i = h.getID();
            return i && i !== "0";
        }};
    e.exports = h;
});
__d("getSameOriginTransport", ["ex"], function(a, b, c, d, e, f) {
    var g = b('ex');
    function h() {
        try {
            return a.XMLHttpRequest ? new a.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (i) {
            throw new Error(g('getSameOriginTransport: %s', i.message));
        }
    }
    e.exports = h;
});
__d("XHR", ["CurrentUser", "DTSG", "Env", "ServerJS", "URI", "getSameOriginTransport"], function(a, b, c, d, e, f) {
    var g = b('CurrentUser'), h = b('DTSG'), i = b('Env'), j = b('ServerJS'), k = b('URI'), l = b('getSameOriginTransport'), m = 1, n = {create: function() {
            return l();
        }, getAsyncParams: function(o) {
            var p = {__user: g.getID(), __a: 1, __dyn: j.getLoadedModuleHash(), __req: (m++).toString(36)}, q = k().getQueryData();
            for (var r in q)
                if (q.hasOwnProperty(r))
                    if (r.substr(0, 3) === 'mh_')
                        p[r] = q[r];
            if (o == 'POST' && h.getToken()) {
                p.fb_dtsg = h.getToken();
                var s = '';
                for (var t = 0; t < p.fb_dtsg.length; t++)
                    s += p.fb_dtsg.charCodeAt(t);
                p.ttstamp = '2' + s;
            }
            if (o == 'POST' && i.lsd)
                p.lsd = i.lsd;
            if (i.fb_isb)
                p.fb_isb = i.fb_isb;
            if (i.svn_rev)
                p.__rev = i.svn_rev;
            return p;
        }};
    e.exports = n;
});
__d("bind", [], function(a, b, c, d, e, f) {
    function g(h, i) {
        var j = Array.prototype.slice.call(arguments, 2);
        if (typeof i != 'string')
            return Function.prototype.bind.apply(i, [h].concat(j));
        function k() {
            var l = j.concat(Array.prototype.slice.call(arguments));
            if (h[i])
                return h[i].apply(h, l);
        }
        k.toString = function() {
            return 'bound lazily: ' + h[i];
        };
        return k;
    }
    e.exports = g;
});
__d("evalGlobal", [], function(a, b, c, d, e, f) {
    function g(h) {
        if (typeof h != 'string')
            throw new TypeError('JS sent to evalGlobal is not a string. Only strings are permitted.');
        if (!h)
            return;
        var i = document.createElement('script');
        try {
            i.appendChild(document.createTextNode(h));
        } catch (j) {
            i.text = h;
        }
        var k = document.getElementsByTagName('head')[0] || document.documentElement;
        k.appendChild(i);
        k.removeChild(i);
    }
    e.exports = g;
});
__d("executeAfter", [], function(a, b, c, d, e, f) {
    function g(h, i, j) {
        return function() {
            h.apply(j || this, arguments);
            i.apply(j || this, arguments);
        };
    }
    e.exports = g;
});
__d("ix", ["invariant"], function(a, b, c, d, e, f) {
    var g = b('invariant'), h = {};
    function i(j) {
        var k = h[j];
        g(!!k);
        return k;
    }
    i.add = function(j) {
        var k = false;
        for (var l in j)
            if (!(l in h))
                h[l] = j[l];
    };
    e.exports = i;
});
__d("Intl", [], function(a, b, c, d, e, f) {
    var g;
    function h(j) {
        if (typeof j != 'string')
            return false;
        return j.match(new RegExp(h.punct_char_class + '[' + ')"' + "'" + '\u00BB' + '\u0F3B' + '\u0F3D' + '\u2019' + '\u201D' + '\u203A' + '\u3009' + '\u300B' + '\u300D' + '\u300F' + '\u3011' + '\u3015' + '\u3017' + '\u3019' + '\u301B' + '\u301E' + '\u301F' + '\uFD3F' + '\uFF07' + '\uFF09' + '\uFF3D' + '\\s' + ']*$'));
    }
    h.punct_char_class = '[' + '.!?' + '\u3002' + '\uFF01' + '\uFF1F' + '\u0964' + '\u2026' + '\u0EAF' + '\u1801' + '\u0E2F' + '\uFF0E' + ']';
    function i(j) {
        if (g) {
            var k = [], l = [];
            for (var m in g.patterns) {
                var n = g.patterns[m];
                for (var o in g.meta) {
                    var p = new RegExp(o.slice(1, -1), 'g'), q = g.meta[o];
                    m = m.replace(p, q);
                    n = n.replace(p, q);
                }
                k.push(m);
                l.push(n);
            }
            for (var r = 0; r < k.length; r++) {
                var s = new RegExp(k[r].slice(1, -1), 'g');
                if (l[r] == 'javascript') {
                    j.replace(s, function(t) {
                        return t.slice(1).toLowerCase();
                    });
                } else
                    j = j.replace(s, l[r]);
            }
        }
        return j.replace(/\x01/g, '');
    }
    e.exports = {endsInPunct: h, applyPhonologicalRules: i, setPhonologicalRules: function(j) {
            g = j;
        }};
});
__d("substituteTokens", ["invariant", "Intl"], function(a, b, c, d, e, f) {
    var g = b('invariant'), h = b('Intl');
    function i(j, k) {
        if (!k)
            return j;
        g(typeof k === 'object');
        var l = '\\{([^}]+)\\}(' + h.endsInPunct.punct_char_class + '*)', m = new RegExp(l, 'g'), n = [], o = [], p = j.replace(m, function(s, t, u) {
            var v = k[t];
            if (v && typeof v === 'object') {
                n.push(v);
                o.push(t);
                return '\x17' + u;
            }
            return v + (h.endsInPunct(v) ? '' : u);
        }).split('\x17').map(h.applyPhonologicalRules);
        if (p.length === 1)
            return p[0];
        var q = {};
        q['[0]'] = p[0];
        for (var r = 0; r < n.length; r++) {
            q['{' + o[r] + '}'] = n[r];
            q['[' + (r + 1) + ']'] = p[r + 1];
        }
        return q;
    }
    e.exports = i;
});
__d("tx", ["substituteTokens", "getObjectValues"], function(a, b, c, d, e, f) {
    var g = b('substituteTokens'), h = b('getObjectValues');
    function i(j, k) {
        if (typeof _string_table == 'undefined')
            return;
        j = _string_table[j];
        var l = g(j, k);
        return (typeof l === 'string') ? l : h(l);
    }
    i._ = function(j, k) {
        var l = g(j, k);
        return (typeof l === 'string') ? l : h(l);
    };
    e.exports = i;
});
__d("ArbiterMixin", ["Arbiter"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = {_getArbiterInstance: function() {
            return this._arbiter || (this._arbiter = new g());
        }, inform: function(i, j, k) {
            return this._getArbiterInstance().inform(i, j, k);
        }, subscribe: function(i, j, k) {
            return this._getArbiterInstance().subscribe(i, j, k);
        }, subscribeOnce: function(i, j, k) {
            return this._getArbiterInstance().subscribeOnce(i, j, k);
        }, unsubscribe: function(i) {
            this._getArbiterInstance().unsubscribe(i);
        }, registerCallback: function(i, j) {
            return this._getArbiterInstance().registerCallback(i, j);
        }, query: function(i) {
            return this._getArbiterInstance().query(i);
        }};
    e.exports = h;
});
__d("ExecutionEnvironment", [], function(a, b, c, d, e, f) {
    "use strict";
    var g = typeof window !== 'undefined', h = {canUseDOM: g, canUseWorkers: typeof Worker !== 'undefined', isInWorker: !g};
    e.exports = h;
});
__d("getMarkupWrap", ["ExecutionEnvironment", "invariant"], function(a, b, c, d, e, f) {
    var g = b('ExecutionEnvironment'), h = b('invariant'), i = g.canUseDOM ? document.createElement('div') : null, j = {circle: true, g: true, line: true, path: true, polygon: true, polyline: true, rect: true, text: true}, k = [1, '<select multiple="true">', '</select>'], l = [1, '<table>', '</table>'], m = [3, '<table><tbody><tr>', '</tr></tbody></table>'], n = [1, '<svg>', '</svg>'], o = {'*': [1, '?<div>', '</div>'], area: [1, '<map>', '</map>'], col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'], legend: [1, '<fieldset>', '</fieldset>'], param: [1, '<object>', '</object>'], tr: [2, '<table><tbody>', '</tbody></table>'], optgroup: k, option: k, caption: l, colgroup: l, tbody: l, tfoot: l, thead: l, td: m, th: m, circle: n, g: n, line: n, path: n, polygon: n, polyline: n, rect: n, text: n};
    function p(q) {
        h(!!i);
        if (!o.hasOwnProperty(q))
            q = '*';
        if (!j.hasOwnProperty(q)) {
            if (q === '*') {
                i.innerHTML = '<link />';
            } else
                i.innerHTML = '<' + q + '></' + q + '>';
            j[q] = !i.firstChild;
        }
        return j[q] ? o[q] : null;
    }
    e.exports = p;
});
__d("createNodesFromMarkup", ["ExecutionEnvironment", "createArrayFrom", "getMarkupWrap", "invariant"], function(a, b, c, d, e, f) {
    var g = b('ExecutionEnvironment'), h = b('createArrayFrom'), i = b('getMarkupWrap'), j = b('invariant'), k = g.canUseDOM ? document.createElement('div') : null, l = /^\s*<(\w+)/;
    function m(o) {
        var p = o.match(l);
        return p && p[1].toLowerCase();
    }
    function n(o, p) {
        var q = k;
        j(!!k);
        var r = m(o), s = r && i(r);
        if (s) {
            q.innerHTML = s[1] + o + s[2];
            var t = s[0];
            while (t--)
                q = q.lastChild;
        } else
            q.innerHTML = o;
        var u = q.getElementsByTagName('script');
        if (u.length) {
            j(p);
            h(u).forEach(p);
        }
        var v = h(q.childNodes);
        while (q.lastChild)
            q.removeChild(q.lastChild);
        return v;
    }
    e.exports = n;
});
__d("HTML", ["Bootloader", "createNodesFromMarkup", "emptyFunction", "evalGlobal", "invariant"], function(a, b, c, d, e, f) {
    var g = b('Bootloader'), h = b('createNodesFromMarkup'), i = b('emptyFunction'), j = b('evalGlobal'), k = b('invariant'), l = /(<(\w+)[^>]*?)\/>/g, m = {abbr: true, area: true, br: true, col: true, embed: true, hr: true, img: true, input: true, link: true, meta: true, param: true};
    function n(o) {
        "use strict";
        if (o && typeof o.__html === 'string')
            o = o.__html;
        if (!(this instanceof n)) {
            if (o instanceof n)
                return o;
            return new n(o);
        }
        if (o) {
            var p = typeof o;
            k(p === 'string');
        }
        this._markup = o || '';
        this._defer = false;
        this._extraAction = '';
        this._nodes = null;
        this._inlineJS = i;
        this._rootNode = null;
    }
    n.prototype.toString = function() {
        "use strict";
        var o = this._markup;
        if (this._extraAction)
            o += '<script type="text/javascript">' + this._extraAction + '</scr' + 'ipt>';
        return o;
    };
    n.prototype.getContent = function() {
        "use strict";
        return this._markup;
    };
    n.prototype.getNodes = function() {
        "use strict";
        this._fillCache();
        return this._nodes;
    };
    n.prototype.getRootNode = function() {
        "use strict";
        k(!this._rootNode);
        var o = this.getNodes();
        if (o.length === 1) {
            this._rootNode = o[0];
        } else {
            var p = document.createDocumentFragment();
            for (var q = 0; q < o.length; q++)
                p.appendChild(o[q]);
            this._rootNode = p;
        }
        return this._rootNode;
    };
    n.prototype.getAction = function() {
        "use strict";
        this._fillCache();
        var o = function() {
            this._inlineJS();
            j(this._extraAction);
        }.bind(this);
        return this._defer ? function() {
            setTimeout(o, 0);
        } : o;
    };
    n.prototype._fillCache = function() {
        "use strict";
        if (this._nodes !== null)
            return;
        if (!this._markup) {
            this._nodes = [];
            return;
        }
        var o = this._markup.replace(l, function(r, s, t) {
            return m[t.toLowerCase()] ? r : s + '></' + t + '>';
        }), p = null, q = h(o, function(r) {
            p = p || [];
            p.push(r.src ? g.requestJSResource.bind(g, r.src) : j.bind(null, r.innerHTML));
            r.parentNode.removeChild(r);
        });
        if (p)
            this._inlineJS = function() {
                for (var r = 0; r < p.length; r++)
                    p[r]();
            };
        this._nodes = q;
    };
    n.prototype.setAction = function(o) {
        "use strict";
        this._extraAction = o;
        return this;
    };
    n.prototype.setDeferred = function(o) {
        "use strict";
        this._defer = !!o;
        return this;
    };
    n.isHTML = function(o) {
        "use strict";
        return o && (o instanceof n || o.__html !== undefined);
    };
    n.replaceJSONWrapper = function(o) {
        "use strict";
        return o && o.__html !== undefined ? new n(o.__html) : o;
    };
    e.exports = n;
});
__d("isScalar", [], function(a, b, c, d, e, f) {
    function g(h) {
        return (/string|number|boolean/).test(typeof h);
    }
    e.exports = g;
});
__d("DOM", ["DOMQuery", "Event", "HTML", "UserAgent", "$", "copyProperties", "createArrayFrom", "isScalar", "tx"], function(a, b, c, d, e, f) {
    var g = b('DOMQuery'), h = b('Event'), i = b('HTML'), j = b('UserAgent'), k = b('$'), l = b('copyProperties'), m = b('createArrayFrom'), n = b('isScalar'), o = b('tx'), p = 'js_', q = 0, r = {};
    l(r, g);
    l(r, {create: function(v, w, x) {
            var y = document.createElement(v);
            if (w)
                r.setAttributes(y, w);
            if (x != null)
                r.setContent(y, x);
            return y;
        }, setAttributes: function(v, w) {
            if (w.type)
                v.type = w.type;
            for (var x in w) {
                var y = w[x], z = (/^on/i).test(x);
                if (x == 'type') {
                    continue;
                } else if (x == 'style') {
                    if (typeof y == 'string') {
                        v.style.cssText = y;
                    } else
                        l(v.style, y);
                } else if (z) {
                    h.listen(v, x.substr(2), y);
                } else if (x in v) {
                    v[x] = y;
                } else if (v.setAttribute)
                    v.setAttribute(x, y);
            }
        }, prependContent: function(v, w) {
            return t(w, v, function(x) {
                v.firstChild ? v.insertBefore(x, v.firstChild) : v.appendChild(x);
            });
        }, insertAfter: function(v, w) {
            var x = v.parentNode;
            return t(w, x, function(y) {
                v.nextSibling ? x.insertBefore(y, v.nextSibling) : x.appendChild(y);
            });
        }, insertBefore: function(v, w) {
            var x = v.parentNode;
            return t(w, x, function(y) {
                x.insertBefore(y, v);
            });
        }, setContent: function(v, w) {
            while (v.firstChild)
                s(v.firstChild);
            return r.appendContent(v, w);
        }, appendContent: function(v, w) {
            return t(w, v, function(x) {
                v.appendChild(x);
            });
        }, replace: function(v, w) {
            var x = v.parentNode;
            return t(w, x, function(y) {
                x.replaceChild(y, v);
            });
        }, remove: function(v) {
            s(k(v));
        }, empty: function(v) {
            v = k(v);
            while (v.firstChild)
                s(v.firstChild);
        }, getID: function(v) {
            var w = v.id;
            if (!w) {
                w = p + q++;
                v.id = w;
            }
            return w;
        }});
    function s(v) {
        if (v.parentNode)
            v.parentNode.removeChild(v);
    }
    function t(v, w, x) {
        v = i.replaceJSONWrapper(v);
        if (v instanceof i && '' === w.innerHTML && -1 === v.toString().indexOf('<scr' + 'ipt')) {
            var y = j.ie();
            if (!y || (y > 7 && !g.isNodeOfType(w, ['table', 'tbody', 'thead', 'tfoot', 'tr', 'select', 'fieldset']))) {
                var z = y ? '<em style="display:none;">&nbsp;</em>' : '';
                w.innerHTML = z + v;
                y && w.removeChild(w.firstChild);
                return m(w.childNodes);
            }
        } else if (g.isTextNode(w)) {
            w.data = v;
            return [v];
        }
        var aa = document.createDocumentFragment(), ba, ca = [], da = [];
        v = m(v);
        for (var ea = 0; ea < v.length; ea++) {
            ba = i.replaceJSONWrapper(v[ea]);
            if (ba instanceof i) {
                da.push(ba.getAction());
                var fa = ba.getNodes();
                for (var ga = 0; ga < fa.length; ga++) {
                    ca.push(fa[ga]);
                    aa.appendChild(fa[ga]);
                }
            } else if (n(ba)) {
                var ha = document.createTextNode(ba);
                ca.push(ha);
                aa.appendChild(ha);
            } else if (g.isNode(ba)) {
                ca.push(ba);
                aa.appendChild(ba);
            }
        }
        x(aa);
        da.forEach(function(ia) {
            ia();
        });
        return ca;
    }
    function u(v) {
        function w(x) {
            return r.create('div', {}, x).innerHTML;
        }
        return function(x, y) {
            var z = {};
            if (y)
                for (var aa in y)
                    z[aa] = w(y[aa]);
            return i(v(x, z));
        };
    }
    r.tx = u(o);
    r.tx._ = r._tx = u(o._);
    e.exports = r;
});
__d("mixin", [], function(a, b, c, d, e, f) {
    function g(h, i, j, k, l, m, n, o, p, q, r) {
        var s = function() {
        }, t = [h, i, j, k, l, m, n, o, p, q], u = 0, v;
        while (t[u]) {
            v = t[u];
            for (var w in v)
                if (v.hasOwnProperty(w))
                    s.prototype[w] = v[w];
            u += 1;
        }
        return s;
    }
    e.exports = g;
});
__d("JSONPTransport", ["ArbiterMixin", "DOM", "HTML", "URI", "asyncCallback", "mixin"], function(a, b, c, d, e, f) {
    var g = b('ArbiterMixin'), h = b('DOM'), i = b('HTML'), j = b('URI'), k = b('asyncCallback'), l = {}, m = 2, n = 'jsonp', o = 'iframe', p = b("mixin");
    function q(v) {
        delete l[v];
    }
    var r = p(g);
    for (var s in r)
        if (r.hasOwnProperty(s))
            u[s] = r[s];
    var t = r === null ? null : r.prototype;
    u.prototype = Object.create(t);
    u.prototype.constructor = u;
    u.__superConstructor__ = r;
    function u(v, w) {
        "use strict";
        this._type = v;
        this._uri = w;
        l[this.getID()] = this;
    }
    u.prototype.getID = function() {
        "use strict";
        return this._id || (this._id = m++);
    };
    u.prototype.hasFinished = function() {
        "use strict";
        return !(this.getID() in l);
    };
    u.prototype.getRequestURI = function() {
        "use strict";
        return j(this._uri).addQueryData({__a: 1, __adt: this.getID(), __req: 'jsonp_' + this.getID()});
    };
    u.prototype.getTransportFrame = function() {
        "use strict";
        if (this._iframe)
            return this._iframe;
        var v = 'transport_frame_' + this.getID(), w = i('<iframe class="hidden_elem" name="' + v + '" src="javascript:void(0)" />');
        return this._iframe = h.appendContent(document.body, w)[0];
    };
    u.prototype.send = function() {
        "use strict";
        if (this._type === n) {
            setTimeout((function() {
                h.appendContent(document.body, h.create('script', {src: this.getRequestURI().toString(), type: 'text/javascript'}));
            }).bind(this), 0);
        } else
            this.getTransportFrame().src = this.getRequestURI().toString();
    };
    u.prototype.handleResponse = function(v) {
        "use strict";
        this.inform('response', v);
        if (this.hasFinished())
            setTimeout(this._cleanup.bind(this), 0);
    };
    u.prototype.abort = function() {
        "use strict";
        if (this._aborted)
            return;
        this._aborted = true;
        this._cleanup();
        q(this.getID());
        this.inform('abort');
    };
    u.prototype._cleanup = function() {
        "use strict";
        if (this._iframe) {
            h.remove(this._iframe);
            this._iframe = null;
        }
    };
    u.respond = function(v, w, x) {
        "use strict";
        var y = l[v];
        if (y) {
            if (!x)
                q(v);
            if (y._type == o)
                w = JSON.parse(JSON.stringify(w));
            k(y.handleResponse.bind(y), 'json')(w);
        } else {
            var z = a.ErrorSignal;
            if (z && !x)
                z.logJSError('ajax', {error: 'UnexpectedJsonResponse', extra: {id: v, uri: (w.payload && w.payload.uri) || ''}});
        }
    };
    e.exports = u;
});
__d("AsyncRequest", ["Arbiter", "AsyncResponse", "Bootloader", "CSS", "Env", "ErrorUtils", "Event", "HTTPErrors", "JSCC", "Parent", "PHPQuerySerializer", "Run", "ServerJS", "URI", "UserAgent", "XHR", "asyncCallback", "bind", "copyProperties", "emptyFunction", "evalGlobal", "executeAfter", "ge", "getSameOriginTransport", "goURI", "invariant", "isEmpty", "ix", "setTimeoutAcrossTransitions", "tx"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('AsyncResponse'), i = b('Bootloader'), j = b('CSS'), k = b('Env'), l = b('ErrorUtils'), m = b('Event'), n = b('HTTPErrors'), o = b('JSCC'), p = b('Parent'), q = b('PHPQuerySerializer'), r = b('Run'), s = b('ServerJS'), t = b('URI'), u = b('UserAgent'), v = b('XHR'), w = b('asyncCallback'), x = b('bind'), y = b('copyProperties'), z = b('emptyFunction'), aa = b('evalGlobal'), ba = b('executeAfter'), ca = b('ge'), da = b('getSameOriginTransport'), ea = b('goURI'), fa = b('invariant'), ga = b('isEmpty'), ha = b('ix'), ia = b('setTimeoutAcrossTransitions'), ja = b('tx');
    function ka() {
        try {
            return !window.loaded;
        } catch (va) {
            return true;
        }
    }
    function la(va) {
        return ('upload' in va) && ('onprogress' in va.upload);
    }
    function ma(va) {
        return 'withCredentials' in va;
    }
    function na(va) {
        return va.status in {0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1};
    }
    function oa(va) {
        var wa = !va || typeof (va) === 'function';
        return wa;
    }
    var pa = 2, qa = pa;
    g.subscribe('page_transition', function(va, wa) {
        qa = wa.id;
    });
    function ra(va) {
        "use strict";
        y(this, {transport: null, method: 'POST', uri: '', timeout: null, timer: null, initialHandler: z, handler: null, uploadProgressHandler: null, errorHandler: null, transportErrorHandler: null, timeoutHandler: null, interceptHandler: z, finallyHandler: z, abortHandler: z, serverDialogCancelHandler: null, relativeTo: null, statusElement: null, statusClass: '', data: {}, file: null, context: {}, readOnly: false, writeRequiredParams: [], remainingRetries: 0, userActionID: '-'});
        this.option = {asynchronous: true, suppressErrorHandlerWarning: false, suppressEvaluation: false, suppressErrorAlerts: false, retries: 0, jsonp: false, bundle: false, useIframeTransport: false, handleErrorAfterUnload: false};
        this.errorHandler = h.defaultErrorHandler;
        this.transportErrorHandler = x(this, 'errorHandler');
        if (va !== undefined)
            this.setURI(va);
    }
    ra.prototype._dispatchResponse = function(va) {
        "use strict";
        this.clearStatusIndicator();
        if (!this._isRelevant()) {
            this._invokeErrorHandler(1010);
            return;
        }
        if (this.initialHandler(va) === false)
            return;
        clearTimeout(this.timer);
        if (va.jscc_map) {
            var wa = (eval)(va.jscc_map);
            o.init(wa);
        }
        var xa;
        if (this.handler)
            try {
                xa = this._shouldSuppressJS(this.handler(va));
            } catch (ya) {
                va.is_last && this.finallyHandler(va);
                throw ya;
            }
        if (!xa)
            this._handleJSResponse(va);
        va.is_last && this.finallyHandler(va);
    };
    ra.prototype._shouldSuppressJS = function(va) {
        "use strict";
        return va === ra.suppressOnloadToken;
    };
    ra.prototype._handleJSResponse = function(va) {
        "use strict";
        var wa = this.getRelativeTo(), xa = va.domops, ya = va.jsmods, za = new s().setRelativeTo(wa), ab;
        if (ya && ya.require) {
            ab = ya.require;
            delete ya.require;
        }
        if (ya)
            za.handle(ya);
        var bb = function(cb) {
            if (xa && cb)
                cb.invoke(xa, wa);
            if (ab)
                za.handle({require: ab});
            this._handleJSRegisters(va, 'onload');
            if (this.lid)
                g.inform('tti_ajax', {s: this.lid, d: [this._sendTimeStamp || 0, (this._sendTimeStamp && this._responseTime) ? (this._responseTime - this._sendTimeStamp) : 0]}, g.BEHAVIOR_EVENT);
            this._handleJSRegisters(va, 'onafterload');
            za.cleanup();
        }.bind(this);
        if (xa) {
            i.loadModules(["AsyncDOM"], bb);
        } else
            bb(null);
    };
    ra.prototype._handleJSRegisters = function(va, wa) {
        "use strict";
        var xa = va[wa];
        if (xa)
            for (var ya = 0; ya < xa.length; ya++)
                l.applyWithGuard(new Function(xa[ya]), this);
    };
    ra.prototype.invokeResponseHandler = function(va) {
        "use strict";
        if (typeof (va.redirect) !== 'undefined') {
            setTimeout((function() {
                this.setURI(va.redirect).send();
            }).bind(this), 0);
            return;
        }
        if (!this.handler && !this.errorHandler && !this.transportErrorHandler)
            return;
        var wa = va.asyncResponse;
        if (typeof (wa) !== 'undefined') {
            if (!this._isRelevant()) {
                this._invokeErrorHandler(1010);
                return;
            }
            if (wa.inlinejs)
                aa(wa.inlinejs);
            if (wa.lid) {
                this._responseTime = Date.now();
                if (a.CavalryLogger)
                    this.cavalry = a.CavalryLogger.getInstance(wa.lid);
                this.lid = wa.lid;
            }
            if (wa.resource_map)
                i.setResourceMap(wa.resource_map);
            if (wa.bootloadable)
                i.enableBootload(wa.bootloadable);
            ha.add(wa.ixData);
            var xa, ya;
            if (wa.getError() && !wa.getErrorIsWarning()) {
                var za = this.errorHandler.bind(this);
                xa = l.guard(this._dispatchErrorResponse, 'AsyncRequest#_dispatchErrorResponse for ' + this.getURI());
                xa = xa.bind(this, wa, za);
                ya = 'error';
            } else {
                xa = l.guard(this._dispatchResponse, 'AsyncRequest#_dispatchResponse for ' + this.getURI());
                xa = xa.bind(this, wa);
                ya = 'response';
            }
            xa = ba(xa, function() {
                g.inform('AsyncRequest/' + ya, {request: this, response: wa});
            }.bind(this));
            var ab = false;
            if (this.preBootloadHandler)
                ab = this.preBootloadHandler(wa);
            wa.css = wa.css || [];
            wa.js = wa.js || [];
            i.loadResources(wa.css.concat(wa.js), function() {
                setTimeout(xa, 0);
            }, ab, this.getURI());
        } else if (typeof (va.transportError) !== 'undefined') {
            if (this._xFbServer) {
                this._invokeErrorHandler(1008);
            } else
                this._invokeErrorHandler(1012);
        } else
            this._invokeErrorHandler(1007);
    };
    ra.prototype._invokeErrorHandler = function(va) {
        "use strict";
        var wa;
        if (this.responseText === '') {
            wa = 1002;
        } else if (this._requestAborted) {
            wa = 1011;
        } else {
            try {
                wa = va || this.transport.status || 1004;
            } catch (xa) {
                wa = 1005;
            }
            if (false === navigator.onLine)
                wa = 1006;
        }
        var ya, za, ab = true;
        if (wa === 1006) {
            za = "No Network Connection";
            ya = "Your browser appears to be offline. Please check your internet connection and try again.";
        } else if (wa >= 300 && wa <= 399) {
            za = "Redirection";
            ya = "Your access to Facebook was redirected or blocked by a third party at this time, please contact your ISP or reload. ";
            var bb = this.transport.getResponseHeader("Location");
            if (bb)
                ea(bb, true);
            ab = true;
        } else {
            za = "Oops";
            ya = "Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.";
        }
        var cb = new h(this);
        y(cb, {error: wa, errorSummary: za, errorDescription: ya, silentError: ab});
        setTimeout((function() {
            g.inform('AsyncRequest/error', {request: this, response: cb});
        }).bind(this), 0);
        if (ka() && !this.getOption('handleErrorAfterUnload'))
            return;
        if (!this.transportErrorHandler)
            return;
        var db = this.transportErrorHandler.bind(this);
        !this.getOption('suppressErrorAlerts');
        l.applyWithGuard(this._dispatchErrorResponse, this, [cb, db]);
    };
    ra.prototype._dispatchErrorResponse = function(va, wa) {
        "use strict";
        var xa = va.getError();
        this.clearStatusIndicator();
        var ya = this._sendTimeStamp && {duration: Date.now() - this._sendTimeStamp, xfb_ip: this._xFbServer || '-'};
        va.logError('async_error', ya);
        if (!this._isRelevant() || xa === 1010) {
            this.abort();
            return;
        }
        if (xa == 1357008 || xa == 1357007 || xa == 1442002 || xa == 1357001) {
            var za = xa == 1357008 || xa == 1357007;
            this.interceptHandler(va);
            this._displayServerDialog(va, za);
        } else if (this.initialHandler(va) !== false) {
            clearTimeout(this.timer);
            try {
                wa(va);
            } catch (ab) {
                this.finallyHandler(va);
                throw ab;
            }
            this.finallyHandler(va);
        }
    };
    ra.prototype._displayServerDialog = function(va, wa) {
        "use strict";
        var xa = va.getPayload();
        if (xa.__dialog !== undefined) {
            this._displayServerLegacyDialog(va, wa);
            return;
        }
        var ya = xa.__dialogx;
        new s().handle(ya);
        i.loadModules(["ConfirmationDialog"], function(za) {
            za.setupConfirmation(va, this);
        }.bind(this));
    };
    ra.prototype._displayServerLegacyDialog = function(va, wa) {
        "use strict";
        var xa = va.getPayload().__dialog;
        i.loadModules(["Dialog"], function(ya) {
            var za = new ya(xa);
            if (wa)
                za.setHandler(this._displayConfirmationHandler.bind(this, za));
            za.setCancelHandler(function() {
                var ab = this.getServerDialogCancelHandler();
                try {
                    ab && ab(va);
                } catch (bb) {
                    throw bb;
                } finally {
                    this.finallyHandler(va);
                }
            }.bind(this)).setCausalElement(this.relativeTo).show();
        }.bind(this));
    };
    ra.prototype._displayConfirmationHandler = function(va) {
        "use strict";
        this.data.confirmed = 1;
        y(this.data, va.getFormData());
        this.send();
    };
    ra.prototype.setJSONPTransport = function(va) {
        "use strict";
        va.subscribe('response', this._handleJSONPResponse.bind(this));
        va.subscribe('abort', this._handleJSONPAbort.bind(this));
        this.transport = va;
    };
    ra.prototype._handleJSONPResponse = function(va, wa) {
        "use strict";
        this.is_first = (this.is_first === undefined);
        var xa = this._interpretResponse(wa);
        xa.asyncResponse.is_first = this.is_first;
        xa.asyncResponse.is_last = this.transport.hasFinished();
        this.invokeResponseHandler(xa);
        if (this.transport.hasFinished())
            delete this.transport;
    };
    ra.prototype._handleJSONPAbort = function() {
        "use strict";
        this._invokeErrorHandler();
        delete this.transport;
    };
    ra.prototype._handleXHRResponse = function(va) {
        "use strict";
        var wa;
        if (this.getOption('suppressEvaluation')) {
            wa = {asyncResponse: new h(this, va)};
        } else {
            var xa = va.responseText, ya = null;
            try {
                var ab = this._unshieldResponseText(xa);
                try {
                    var bb = (eval)('(' + ab + ')');
                    wa = this._interpretResponse(bb);
                } catch (za) {
                    ya = 'excep';
                    wa = {transportError: 'eval() failed on async to ' + this.getURI()};
                }
            } catch (za) {
                ya = 'empty';
                wa = {transportError: za.message};
            }
            if (ya) {
                var cb = a.ErrorSignal;
                cb && cb.sendErrorSignal('async_xport_resp', [(this._xFbServer ? '1008_' : '1012_') + ya, this._xFbServer || '-', this.getURI(), xa.length, xa.substr(0, 1600)].join(':'));
            }
        }
        this.invokeResponseHandler(wa);
    };
    ra.prototype._unshieldResponseText = function(va) {
        "use strict";
        var wa = "for (;;);", xa = wa.length;
        if (va.length <= xa)
            throw new Error('Response too short on async to ' + this.getURI());
        var ya = 0;
        while (va.charAt(ya) == " " || va.charAt(ya) == "\n")
            ya++;
        ya && va.substring(ya, ya + xa) == wa;
        return va.substring(ya + xa);
    };
    ra.prototype._interpretResponse = function(va) {
        "use strict";
        if (va.redirect)
            return {redirect: va.redirect};
        var wa = new h(this);
        if (va.__ar != 1) {
            wa.payload = va;
        } else
            y(wa, va);
        return {asyncResponse: wa};
    };
    ra.prototype._onStateChange = function() {
        "use strict";
        try {
            if (this.transport.readyState == 4) {
                ra._inflightCount--;
                ra._inflightPurge();
                try {
                    if (typeof (this.transport.getResponseHeader) !== 'undefined' && this.transport.getResponseHeader('X-FB-Debug'))
                        this._xFbServer = this.transport.getResponseHeader('X-FB-Debug');
                } catch (wa) {
                }
                if (this.transport.status >= 200 && this.transport.status < 300) {
                    ra.lastSuccessTime = Date.now();
                    this._handleXHRResponse(this.transport);
                } else if (u.webkit() && (typeof (this.transport.status) == 'undefined')) {
                    this._invokeErrorHandler(1002);
                } else if (k.retry_ajax_on_network_error && na(this.transport) && this.remainingRetries > 0) {
                    this.remainingRetries--;
                    delete this.transport;
                    this.send(true);
                    return;
                } else
                    this._invokeErrorHandler();
                if (this.getOption('asynchronous') !== false)
                    delete this.transport;
            }
        } catch (va) {
            if (ka())
                return;
            delete this.transport;
            if (this.remainingRetries > 0) {
                this.remainingRetries--;
                this.send(true);
            } else {
                !this.getOption('suppressErrorAlerts');
                var xa = a.ErrorSignal;
                xa && xa.sendErrorSignal('async_xport_resp', [1007, this._xFbServer || '-', this.getURI(), va.message].join(':'));
                this._invokeErrorHandler(1007);
            }
        }
    };
    ra.prototype._isMultiplexable = function() {
        "use strict";
        if (this.getOption('jsonp') || this.getOption('useIframeTransport'))
            return false;
        if (!this.uri.isFacebookURI())
            return false;
        if (!this.getOption('asynchronous'))
            return false;
        return true;
    };
    ra.prototype.handleResponse = function(va) {
        "use strict";
        var wa = this._interpretResponse(va);
        this.invokeResponseHandler(wa);
    };
    ra.prototype.setMethod = function(va) {
        "use strict";
        this.method = va.toString().toUpperCase();
        return this;
    };
    ra.prototype.getMethod = function() {
        "use strict";
        return this.method;
    };
    ra.prototype.setData = function(va) {
        "use strict";
        this.data = va;
        return this;
    };
    ra.prototype.setRawData = function(va) {
        "use strict";
        this.rawData = va;
        return this;
    };
    ra.prototype.getData = function() {
        "use strict";
        return this.data;
    };
    ra.prototype.setContextData = function(va, wa, xa) {
        "use strict";
        xa = xa === undefined ? true : xa;
        if (xa)
            this.context['_log_' + va] = wa;
        return this;
    };
    ra.prototype._setUserActionID = function() {
        "use strict";
        this.userActionID = (a.EagleEye && a.EagleEye.getSessionID() || '-') + '/-';
    };
    ra.prototype.setURI = function(va) {
        "use strict";
        var wa = t(va);
        if (this.getOption('useIframeTransport') && !wa.isFacebookURI())
            return this;
        if (!this._allowCrossOrigin && !this.getOption('jsonp') && !this.getOption('useIframeTransport') && !wa.isSameOrigin())
            return this;
        this._setUserActionID();
        if (!va || wa.isEmpty()) {
            var xa = a.ErrorSignal, ya = a.getErrorStack;
            if (xa && ya) {
                var za = {err_code: 1013, vip: '-', duration: 0, xfb_ip: '-', path: window.location.href, aid: this.userActionID};
                xa.sendErrorSignal('async_error', JSON.stringify(za));
                xa.sendErrorSignal('async_xport_stack', [1013, window.location.href, null, ya()].join(':'));
            }
            return this;
        }
        this.uri = wa;
        return this;
    };
    ra.prototype.getURI = function() {
        "use strict";
        return this.uri.toString();
    };
    ra.prototype.setInitialHandler = function(va) {
        "use strict";
        this.initialHandler = va;
        return this;
    };
    ra.prototype.setHandler = function(va) {
        "use strict";
        if (oa(va))
            this.handler = va;
        return this;
    };
    ra.prototype.getHandler = function() {
        "use strict";
        return this.handler || z;
    };
    ra.prototype.setUploadProgressHandler = function(va) {
        "use strict";
        if (oa(va))
            this.uploadProgressHandler = va;
        return this;
    };
    ra.prototype.setErrorHandler = function(va) {
        "use strict";
        if (oa(va))
            this.errorHandler = va;
        return this;
    };
    ra.prototype.setTransportErrorHandler = function(va) {
        "use strict";
        this.transportErrorHandler = va;
        return this;
    };
    ra.prototype.getErrorHandler = function() {
        "use strict";
        return this.errorHandler;
    };
    ra.prototype.getTransportErrorHandler = function() {
        "use strict";
        return this.transportErrorHandler;
    };
    ra.prototype.setTimeoutHandler = function(va, wa) {
        "use strict";
        if (oa(wa)) {
            this.timeout = va;
            this.timeoutHandler = wa;
        }
        return this;
    };
    ra.prototype.resetTimeout = function(va) {
        "use strict";
        if (!(this.timeoutHandler === null))
            if (va === null) {
                this.timeout = null;
                clearTimeout(this.timer);
                this.timer = null;
            } else {
                var wa = !this._allowCrossPageTransition;
                this.timeout = va;
                clearTimeout(this.timer);
                if (wa) {
                    this.timer = setTimeout(this._handleTimeout.bind(this), this.timeout);
                } else
                    this.timer = ia(this._handleTimeout.bind(this), this.timeout);
            }
        return this;
    };
    ra.prototype._handleTimeout = function() {
        "use strict";
        this.abandon();
        this.timeoutHandler(this);
    };
    ra.prototype.setNewSerial = function() {
        "use strict";
        this.id = ++pa;
        return this;
    };
    ra.prototype.setInterceptHandler = function(va) {
        "use strict";
        this.interceptHandler = va;
        return this;
    };
    ra.prototype.setFinallyHandler = function(va) {
        "use strict";
        this.finallyHandler = va;
        return this;
    };
    ra.prototype.setAbortHandler = function(va) {
        "use strict";
        this.abortHandler = va;
        return this;
    };
    ra.prototype.getServerDialogCancelHandler = function() {
        "use strict";
        return this.serverDialogCancelHandler;
    };
    ra.prototype.setServerDialogCancelHandler = function(va) {
        "use strict";
        this.serverDialogCancelHandler = va;
        return this;
    };
    ra.prototype.setPreBootloadHandler = function(va) {
        "use strict";
        this.preBootloadHandler = va;
        return this;
    };
    ra.prototype.setReadOnly = function(va) {
        "use strict";
        if (!(typeof (va) != 'boolean'))
            this.readOnly = va;
        return this;
    };
    ra.prototype.setFBMLForm = function() {
        "use strict";
        this.writeRequiredParams = ["fb_sig"];
        return this;
    };
    ra.prototype.getReadOnly = function() {
        "use strict";
        return this.readOnly;
    };
    ra.prototype.setRelativeTo = function(va) {
        "use strict";
        this.relativeTo = va;
        return this;
    };
    ra.prototype.getRelativeTo = function() {
        "use strict";
        return this.relativeTo;
    };
    ra.prototype.setStatusClass = function(va) {
        "use strict";
        this.statusClass = va;
        return this;
    };
    ra.prototype.setStatusElement = function(va) {
        "use strict";
        this.statusElement = va;
        return this;
    };
    ra.prototype.getStatusElement = function() {
        "use strict";
        return ca(this.statusElement);
    };
    ra.prototype._isRelevant = function() {
        "use strict";
        if (this._allowCrossPageTransition)
            return true;
        if (!this.id)
            return true;
        return this.id > qa;
    };
    ra.prototype.clearStatusIndicator = function() {
        "use strict";
        var va = this.getStatusElement();
        if (va) {
            j.removeClass(va, 'async_saving');
            j.removeClass(va, this.statusClass);
        }
    };
    ra.prototype.addStatusIndicator = function() {
        "use strict";
        var va = this.getStatusElement();
        if (va) {
            j.addClass(va, 'async_saving');
            j.addClass(va, this.statusClass);
        }
    };
    ra.prototype.specifiesWriteRequiredParams = function() {
        "use strict";
        return this.writeRequiredParams.every(function(va) {
            this.data[va] = this.data[va] || k[va] || (ca(va) || {}).value;
            if (this.data[va] !== undefined)
                return true;
            return false;
        }, this);
    };
    ra.prototype.setOption = function(va, wa) {
        "use strict";
        if (typeof (this.option[va]) != 'undefined')
            this.option[va] = wa;
        return this;
    };
    ra.prototype.getOption = function(va) {
        "use strict";
        typeof (this.option[va]) == 'undefined';
        return this.option[va];
    };
    ra.prototype.abort = function() {
        "use strict";
        if (this.transport) {
            var va = this.getTransportErrorHandler();
            this.setOption('suppressErrorAlerts', true);
            this.setTransportErrorHandler(z);
            this._requestAborted = true;
            this.transport.abort();
            this.setTransportErrorHandler(va);
        }
        this.abortHandler();
        ua.unschedule(this);
    };
    ra.prototype.abandon = function() {
        "use strict";
        clearTimeout(this.timer);
        this.setOption('suppressErrorAlerts', true).setHandler(z).setErrorHandler(z).setTransportErrorHandler(z);
        if (this.transport) {
            this._requestAborted = true;
            this.transport.abort();
        }
        ua.unschedule(this);
    };
    ra.prototype.setNectarData = function(va) {
        "use strict";
        if (va) {
            if (this.data.nctr === undefined)
                this.data.nctr = {};
            y(this.data.nctr, va);
        }
        return this;
    };
    ra.prototype.setNectarModuleDataSafe = function(va) {
        "use strict";
        if (this.setNectarModuleData)
            this.setNectarModuleData(va);
        return this;
    };
    ra.prototype.setNectarImpressionIdSafe = function() {
        "use strict";
        if (this.setNectarImpressionId)
            this.setNectarImpressionId();
        return this;
    };
    ra.prototype.setAllowCrossPageTransition = function(va) {
        "use strict";
        this._allowCrossPageTransition = !!va;
        if (this.timer)
            this.resetTimeout(this.timeout);
        return this;
    };
    ra.prototype.setAllowIrrelevantRequests = function(va) {
        "use strict";
        this._allowIrrelevantRequests = va;
        return this;
    };
    ra.prototype.setAllowCrossOrigin = function(va) {
        "use strict";
        this._allowCrossOrigin = va;
        return this;
    };
    ra.prototype.send = function(va) {
        "use strict";
        va = va || false;
        if (!this.uri)
            return false;
        !this.errorHandler && !this.getOption('suppressErrorHandlerWarning');
        if (this.getOption('jsonp') && this.method != 'GET')
            this.setMethod('GET');
        if (this.getOption('useIframeTransport') && this.method != 'GET')
            this.setMethod('GET');
        this.timeoutHandler !== null && (this.getOption('jsonp') || this.getOption('useIframeTransport'));
        if (!this.getReadOnly()) {
            this.specifiesWriteRequiredParams();
            if (this.method != 'POST')
                return false;
        }
        y(this.data, v.getAsyncParams(this.method));
        if (!ga(this.context)) {
            y(this.data, this.context);
            this.data.ajax_log = 1;
        }
        if (k.force_param)
            y(this.data, k.force_param);
        this._setUserActionID();
        if (this.getOption('bundle') && this._isMultiplexable()) {
            ua.schedule(this);
            return true;
        }
        this.setNewSerial();
        if (!this.getOption('asynchronous'))
            this.uri.addQueryData({__s: 1});
        g.inform('AsyncRequest/send', {request: this});
        this.finallyHandler = w(this.finallyHandler, 'final');
        var wa, xa;
        if (this.method == 'GET' || this.rawData) {
            wa = this.uri.addQueryData(this.data).toString();
            xa = this.rawData || '';
        } else {
            wa = this.uri.toString();
            xa = q.serialize(this.data);
        }
        if (this.transport)
            return false;
        if (this.getOption('jsonp') || this.getOption('useIframeTransport')) {
            d(['JSONPTransport'], function(ab) {
                var bb = new ab(this.getOption('jsonp') ? 'jsonp' : 'iframe', this.uri);
                this.setJSONPTransport(bb);
                bb.send();
            }.bind(this));
            return true;
        }
        var ya = da();
        if (!ya)
            return false;
        ya.onreadystatechange = w(this._onStateChange.bind(this), 'xhr');
        if (this.uploadProgressHandler && la(ya))
            ya.upload.onprogress = this.uploadProgressHandler.bind(this);
        if (!va)
            this.remainingRetries = this.getOption('retries');
        if (a.ErrorSignal)
            this._sendTimeStamp = this._sendTimeStamp || Date.now();
        this.transport = ya;
        try {
            this.transport.open(this.method, wa, this.getOption('asynchronous'));
        } catch (za) {
            return false;
        }
        if (!this.uri.isSameOrigin() && !this.getOption('jsonp') && !this.getOption('useIframeTransport')) {
            if (!ma(this.transport))
                return false;
            if (this.uri.isFacebookURI())
                this.transport.withCredentials = true;
        }
        if (this.method == 'POST' && !this.rawData)
            this.transport.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.addStatusIndicator();
        this.transport.send(xa);
        if (this.timeout !== null)
            this.resetTimeout(this.timeout);
        ra._inflightCount++;
        ra._inflightAdd(this);
        return true;
    };
    ra._inflightAdd = function(va) {
        "use strict";
        this._inflight.push(va);
    };
    ra._inflightPurge = function() {
        "use strict";
        ra._inflight = ra._inflight.filter(function(va) {
            return va.transport && va.transport.readyState < 4;
        });
    };
    ra.bootstrap = function(va, wa, xa) {
        "use strict";
        var ya = 'GET', za = true, ab = {};
        if (xa || wa && (wa.rel == 'async-post')) {
            ya = 'POST';
            za = false;
            if (va) {
                va = t(va);
                ab = va.getQueryData();
                va.setQueryData({});
            }
        }
        var bb = p.byClass(wa, 'stat_elem') || wa;
        if (bb && j.hasClass(bb, 'async_saving'))
            return false;
        var cb = new ra(va).setReadOnly(za).setMethod(ya).setData(ab).setNectarModuleDataSafe(wa).setRelativeTo(wa);
        if (wa) {
            cb.setHandler(function(eb) {
                m.fire(wa, 'success', {response: eb});
            });
            cb.setErrorHandler(function(eb) {
                if (m.fire(wa, 'error', {response: eb}) !== false)
                    h.defaultErrorHandler(eb);
            });
        }
        if (bb) {
            cb.setStatusElement(bb);
            var db = bb.getAttribute('data-status-class');
            db && cb.setStatusClass(db);
        }
        cb.send();
        return false;
    };
    ra.post = function(va, wa) {
        "use strict";
        new ra(va).setReadOnly(false).setMethod('POST').setData(wa).send();
        return false;
    };
    ra.getLastID = function() {
        "use strict";
        return pa;
    };
    ra.getInflightCount = function() {
        "use strict";
        return this._inflightCount;
    };
    ra._inflightEnable = function() {
        "use strict";
        if (u.ie())
            r.onUnload(function() {
                ra._inflight.forEach(function(va) {
                    if (va.transport && va.transport.readyState < 4) {
                        va.transport.abort();
                        delete va.transport;
                    }
                });
            });
    };
    y(ra, {suppressOnloadToken: {}, _inflight: [], _inflightCount: 0, _inflightAdd: z, _inflightPurge: z});
    var sa, ta = [];
    function ua() {
        "use strict";
        this._requests = [];
    }
    ua.prototype.add = function(va) {
        "use strict";
        this._requests.push(va);
    };
    ua.prototype.remove = function(va) {
        "use strict";
        var wa = this._requests, xa = this._requestsSent;
        for (var ya = 0, za = wa.length; ya < za; ya++)
            if (wa[ya] === va)
                if (xa) {
                    wa[ya] = null;
                } else
                    wa.splice(ya, 1);
    };
    ua.prototype.send = function() {
        "use strict";
        fa(!this._requestsSent);
        this._requestsSent = true;
        var va = this._requests;
        if (!va.length)
            return;
        var wa;
        if (va.length === 1) {
            wa = va[0];
        } else {
            var xa = va.map(function(ya) {
                return [ya.uri.getPath(), q.serialize(ya.data)];
            });
            wa = new ra('/ajax/proxy.php').setAllowCrossPageTransition(true).setData({data: xa}).setHandler(this._handler.bind(this)).setTransportErrorHandler(this._transportErrorHandler.bind(this));
        }
        wa.setOption('bundle', false).send();
    };
    ua.prototype._handler = function(va) {
        "use strict";
        var wa = va.getPayload().responses;
        if (wa.length !== this._requests.length)
            return;
        for (var xa = 0; xa < this._requests.length; xa++) {
            var ya = this._requests[xa];
            if (ya === null)
                continue;
            var za = ya.uri.getPath();
            ya.id = this.id;
            if (wa[xa][0] !== za) {
                ya.invokeResponseHandler({transportError: 'Wrong response order in bundled request to ' + za});
                continue;
            }
            ya.handleResponse(wa[xa][1]);
        }
        ta.splice(ta.indexOf(this, 1));
    };
    ua.prototype._transportErrorHandler = function(va) {
        "use strict";
        var wa = {transportError: va.errorDescription}, xa = this._requests.map(function(ya) {
            ya.id = this.id;
            ya.invokeResponseHandler(wa);
            return ya.uri.getPath();
        });
    };
    ua.schedule = function(va) {
        "use strict";
        if (!sa) {
            sa = new ua();
            ta.push(sa);
            setTimeout(function() {
                sa.send();
                sa = null;
            }, 0);
        }
        sa.add(va);
        return sa;
    };
    ua.unschedule = function(va) {
        "use strict";
        ta.forEach(function(wa) {
            wa.remove(va);
        });
    };
    a.AsyncRequest = e.exports = ra;
});
__d("QueryString", [], function(a, b, c, d, e, f) {
    function g(k) {
        var l = [];
        Object.keys(k).sort().forEach(function(m) {
            var n = k[m];
            if (typeof n === 'undefined')
                return;
            if (n === null) {
                l.push(m);
                return;
            }
            l.push(encodeURIComponent(m) + '=' + encodeURIComponent(n));
        });
        return l.join('&');
    }
    function h(k, l) {
        var m = {};
        if (k === '')
            return m;
        var n = k.split('&');
        for (var o = 0; o < n.length; o++) {
            var p = n[o].split('=', 2), q = decodeURIComponent(p[0]);
            if (l && m.hasOwnProperty(q))
                throw new URIError('Duplicate key: ' + q);
            m[q] = p.length === 2 ? decodeURIComponent(p[1]) : null;
        }
        return m;
    }
    function i(k, l) {
        return k + (~k.indexOf('?') ? '&' : '?') + (typeof l === 'string' ? l : j.encode(l));
    }
    var j = {encode: g, decode: h, appendToUrl: i};
    e.exports = j;
});
__d("AsyncSignal", ["Env", "ErrorUtils", "QueryString", "URI", "XHR", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('Env'), h = b('ErrorUtils'), i = b('QueryString'), j = b('URI'), k = b('XHR'), l = b('copyProperties');
    function m(n, o) {
        this.data = o || {};
        if (g.tracking_domain && n.charAt(0) == '/')
            n = g.tracking_domain + n;
        this.uri = n;
    }
    m.prototype.setHandler = function(n) {
        this.handler = n;
        return this;
    };
    m.prototype.send = function() {
        var n = this.handler, o = this.data, p = new Image();
        if (n)
            p.onload = p.onerror = function() {
                h.applyWithGuard(n, null, [p.height == 1]);
            };
        o.asyncSignal = (Math.random() * 10000 | 0) + 1;
        var q = new j(this.uri).isFacebookURI();
        if (q) {
            l(o, k.getAsyncParams('POST'));
        } else
            throw new Error("'" + this.uri + "' " + "is an external URL, you should not send async signals to offsite links.");
        p.src = i.appendToUrl(this.uri, o);
        return this;
    };
    e.exports = m;
});
__d("Miny", [], function(a, b, c, d, e, f) {
    var g = 'Miny1', h = {encode: [], decode: {}}, i = 'wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');
    function j(n) {
        for (var o = h.encode.length; o < n; o++) {
            var p = o.toString(32).split('');
            p[p.length - 1] = i[parseInt(p[p.length - 1], 32)];
            p = p.join('');
            h.encode[o] = p;
            h.decode[p] = o;
        }
        return h;
    }
    function k(n) {
        var o = n.match(/\w+|\W+/g), p = {};
        for (var q = 0; q < o.length; q++)
            p[o[q]] = (p[o[q]] || 0) + 1;
        var r = Object.keys(p);
        r.sort(function(u, v) {
            return p[u] < p[v] ? 1 : (p[v] < p[u] ? -1 : 0);
        });
        var s = j(r.length).encode;
        for (q = 0; q < r.length; q++)
            p[r[q]] = s[q];
        var t = [];
        for (q = 0; q < o.length; q++)
            t[q] = p[o[q]];
        for (q = 0; q < r.length; q++)
            r[q] = r[q].replace(/'~'/g, '\\~');
        return [g, r.length].concat(r).concat(t.join('')).join('~');
    }
    function l(n) {
        var o = n.split('~');
        if (o.shift() != g)
            throw new Error('Not a Miny stream');
        var p = parseInt(o.shift(), 10), q = o.pop();
        q = q.match(/[0-9a-v]*[\-w-zA-Z_]/g);
        var r = o, s = j(p).decode, t = [];
        for (var u = 0; u < q.length; u++)
            t[u] = r[s[q[u]]];
        return t.join('');
    }
    var m = {encode: k, decode: l};
    e.exports = m;
});
__d("BanzaiAdapter", ["Arbiter", "CurrentUser", "Env", "Miny", "QueryString", "Run", "UserAgent", "XHR", "getSameOriginTransport", "setTimeoutAcrossTransitions", "BanzaiConfig"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CurrentUser'), i = b('Env'), j = b('Miny'), k = b('QueryString'), l = b('Run'), m = b('UserAgent'), n = b('XHR'), o = b('getSameOriginTransport'), p = b('setTimeoutAcrossTransitions'), q = null, r = new g(), s = b('BanzaiConfig'), t = '/ajax/bz', u = {}, v = u.adapter = {config: s, getUserID: function() {
            return h.getID();
        }, inform: function(w) {
            r.inform(w);
        }, subscribe: function(w, x) {
            r.subscribe(w, x);
        }, cleanup: function() {
            if (q && q.readyState < 4)
                q.abort();
            if (q) {
                delete q.onreadystatechange;
                q = null;
            }
        }, readyToSend: function() {
            var w = m.ie() <= 8 ? true : navigator.onLine;
            return !q && w;
        }, send: function(w, x, y) {
            var z = 'POST';
            q = o();
            q.open(z, t, true);
            q.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            q.onreadystatechange = function() {
                if (q.readyState >= 4) {
                    var da = q.status;
                    v.cleanup();
                    if (da == 200) {
                        if (x)
                            x();
                        v.inform(u.OK);
                    } else {
                        if (y)
                            y(da);
                        v.inform(u.ERROR);
                    }
                }
            };
            p(v.cleanup, u.SEND_TIMEOUT);
            var aa = n.getAsyncParams(z);
            aa.q = JSON.stringify(w);
            aa.ts = Date.now();
            aa.ph = i.push_phase;
            if (u.FBTRACE)
                aa.fbtrace = u.FBTRACE;
            if (u.isEnabled('miny_compression')) {
                var ba = Date.now(), ca = j.encode(aa.q);
                if (ca.length < aa.q.length) {
                    aa.q = ca;
                    aa.miny_encode_ms = Date.now() - ba;
                }
            }
            q.send(k.encode(aa));
        }, setHooks: function(w) {
            l.onAfterUnload(u._unload);
        }, onUnload: function(w) {
            l.onAfterUnload(w);
        }};
    e.exports = u;
});
__d("FBJSON", [], function(a, b, c, d, e, f) {
    e.exports = {parse: JSON.parse, stringify: JSON.stringify};
});
__d("WebStorage", [], function(a, b, c, d, e, f) {
    var g = {}, h = {getLocalStorage: function() {
            return i('localStorage');
        }, getSessionStorage: function() {
            return i('sessionStorage');
        }};
    function i(k) {
        if (!g.hasOwnProperty(k))
            g[k] = j(k);
        return g[k];
    }
    function j(k) {
        try {
            var m = window[k];
            if (m) {
                var n = '__test__' + Date.now();
                m.setItem(n, '');
                m.removeItem(n);
            }
            return m;
        } catch (l) {
        }
    }
    e.exports = h;
});
__d("pageID", [], function(a, b, c, d, e, f) {
    e.exports = Math.floor(2147483648 * Math.random()).toString(36);
});
__d("WebStorageMutex", ["WebStorage", "setTimeoutAcrossTransitions", "pageID"], function(a, b, c, d, e, f) {
    var g = b('WebStorage'), h = b('setTimeoutAcrossTransitions'), i = b('pageID'), j = g.getLocalStorage();
    function k(l) {
        "use strict";
        this.name = l;
    }
    k.testSetPageID = function(l) {
        "use strict";
        i = l;
    };
    k.prototype.$WebStorageMutex0 = function() {
        "use strict";
        if (!j)
            return i;
        var l = j.getItem('mutex_' + this.name);
        l = l ? l.split(':') : null;
        return l && l[1] >= Date.now() ? l[0] : null;
    };
    k.prototype.$WebStorageMutex1 = function(l) {
        "use strict";
        if (!j)
            return;
        var m = Date.now() + (l || 10000);
        j.setItem('mutex_' + this.name, i + ':' + m);
    };
    k.prototype.hasLock = function() {
        "use strict";
        return this.$WebStorageMutex0() == i;
    };
    k.prototype.lock = function(l, m, n) {
        "use strict";
        if (this.$WebStorageMutex2)
            clearTimeout(this.$WebStorageMutex2);
        if (i == (this.$WebStorageMutex0() || i))
            this.$WebStorageMutex1(n);
        this.$WebStorageMutex2 = h(function() {
            this.$WebStorageMutex2 = null;
            var o = this.hasLock() ? l : m;
            if (o)
                o(this);
        }.bind(this), 0);
    };
    k.prototype.unlock = function() {
        "use strict";
        if (this.$WebStorageMutex2)
            clearTimeout(this.$WebStorageMutex2);
        if (j && this.hasLock())
            j.removeItem('mutex_' + this.name);
    };
    e.exports = k;
});
__d("isInIframe", [], function(a, b, c, d, e, f) {
    var g = window != window.top;
    function h() {
        return g;
    }
    e.exports = h;
});
__d("Banzai", ["BanzaiAdapter", "CurrentUser", "ErrorUtils", "FBJSON", "WebStorage", "WebStorageMutex", "emptyFunction", "isInIframe", "pageID", "setTimeoutAcrossTransitions"], function(a, b, c, d, e, f) {
    var g = b('BanzaiAdapter'), h = b('CurrentUser'), i = b('ErrorUtils'), j = b('FBJSON'), k = b('WebStorage'), l = b('WebStorageMutex'), m = b('emptyFunction'), n = b('isInIframe'), o = b('pageID'), p = b('setTimeoutAcrossTransitions'), q = g.adapter, r = n(), s = 'bz:', t = 0, u = 1, v = 2, w, x, y = [], z = null;
    function aa(fa) {
        return fa[2] >= Date.now() - (q.config.EXPIRY || g.EXPIRY);
    }
    function ba(fa) {
        var ga = Date.now() + fa;
        if (!x || ga < x) {
            x = ga;
            clearTimeout(w);
            w = p(ca, fa);
            return true;
        }
    }
    function ca() {
        x = null;
        ba(g.BASIC.delay);
        if (!q.readyToSend())
            return;
        q.inform(g.SEND);
        var fa = [], ga = [], ha = {};
        y = y.filter(function(ia) {
            var ja = ia.__meta;
            if (ja.status >= v || !aa(ia))
                return false;
            if (ja.status >= u)
                return true;
            var ka = ja.pageID + h.getID(), la = ha[ka];
            if (!la) {
                la = {user: ja.userID, page_id: ja.pageID, posts: []};
                ha[ka] = la;
                fa.push(la);
            }
            ja.status = u;
            la.posts.push(ia);
            ga.push(ia);
            return ja.retry;
        });
        if (fa.length <= 0) {
            q.inform(g.OK);
            return;
        }
        fa[0].trigger = z;
        z = null;
        q.send(fa, function() {
            ga.forEach(function(ia) {
                ia.__meta.status = v;
            });
        }, function(ia) {
            var ja = ia >= 400 && ia < 600;
            ga.forEach(function(ka) {
                var la = ka.__meta;
                ka[3] = (ka[3] || 0) + 1;
                la.status = t;
                if (ja && !la.retry)
                    y.push(ka);
            });
        });
    }
    var da, ea = k.getLocalStorage();
    if (ea && !r) {
        da = {store: function fa() {
                if (y.length <= 0)
                    return;
                var ga = y.map(function(ha) {
                    return [ha[0], ha[1], ha[2], ha[3] || 0, ha.__meta];
                });
                y = [];
                ea.setItem(s + o + '.' + Date.now(), j.stringify(ga));
            }, restore: function fa() {
                (new l('banzai')).lock(function(ga) {
                    var ha = [];
                    for (var ia = 0; ia < ea.length; ia++) {
                        var ja = ea.key(ia);
                        if (ja.indexOf(s) === 0)
                            ha.push(ja);
                    }
                    ha.forEach(function(ka) {
                        var la = ea.getItem(ka);
                        ea.removeItem(ka);
                        if (!la)
                            return;
                        var ma = j.parse(la, e.id);
                        ma.forEach(function(na) {
                            var oa = na.__meta = na.pop(), pa = aa(na);
                            if (pa && oa.userID == h.getID()) {
                                oa.status = t;
                                y.push(na);
                            }
                        });
                    });
                    ga.unlock();
                });
            }};
    } else
        da = {store: m, restore: m};
    g.SEND = 'Banzai:SEND';
    g.OK = 'Banzai:OK';
    g.ERROR = 'Banzai:ERROR';
    g.SHUTDOWN = 'Banzai:SHUTDOWN';
    g.SEND_TIMEOUT = 15000;
    g.VITAL_WAIT = 1000;
    g.BASIC_WAIT = 60000;
    g.EXPIRY = 30 * 60000;
    g.VITAL = {delay: q.config.MIN_WAIT || g.VITAL_WAIT};
    g.BASIC = {delay: q.config.MAX_WAIT || g.BASIC_WAIT};
    g.FBTRACE = q.config.fbtrace, g.isEnabled = function(fa) {
        return q.config.gks && q.config.gks[fa];
    };
    g.post = function(fa, ga, ha) {
        var ia = ha && ha.retry === true, ja = ha && ha.delay;
        if (q.config.disabled)
            return;
        var ka = q.config.blacklist;
        if (ka)
            if (ka.indexOf)
                if (typeof ka.indexOf == 'function')
                    if (ka.indexOf(fa) != -1)
                        return;
        if (r && document.domain == 'facebook.com') {
            var la;
            try {
                la = a.top.require('Banzai');
            } catch (ma) {
                la = null;
            }
            if (la) {
                la.post.apply(la, arguments);
                return;
            }
        }
        var na = [fa, ga, Date.now(), 0];
        na.__meta = {retry: ia, pageID: o, userID: h.getID(), status: t};
        y.push(na);
        ja != null ? ja : g.BASIC_WAIT;
        if (ba(ja) || !z)
            z = fa;
    };
    g.subscribe = q.subscribe;
    g._schedule = ba;
    g._store = function(fa) {
        i.applyWithGuard(da.store, da);
    };
    g._restore = function(fa) {
        i.applyWithGuard(da.restore, da);
        ba(q.config.RESTORE_WAIT || g.VITAL_WAIT);
    };
    g._unload = function() {
        q.cleanup();
        q.inform(g.SHUTDOWN);
        i.applyWithGuard(da.store, da);
    };
    g._testState = function() {
        return {postBuffer: y, triggerRoute: z};
    };
    if (g.isEnabled('adapterhooks')) {
        q.setHooks(da);
    } else
        q.onUnload(g._unload);
    g._restore();
    e.exports = g;
});
__d("ScriptPath", ["Banzai", "ErrorUtils", "isInIframe"], function(a, b, c, d, e, f) {
    var g = b("Banzai"), h = b("ErrorUtils"), i = b('isInIframe'), j = 'script_path_change', k = {scriptPath: null, categoryToken: null}, l = {PAGE_LOAD: 'load', PAGE_UNLOAD: 'unload', TRANSITION: 'transition'}, m = null, n = null, o = {}, p = 0, q = false, r = null;
    function s(aa) {
        var ba = ++p;
        o[ba] = aa;
        return ba;
    }
    function t(aa) {
        if (o[aa])
            delete o[aa];
    }
    function u() {
        Object.keys(o).forEach(function(aa) {
            h.applyWithGuard(o[aa], null, [{source: m, dest: n}]);
        });
    }
    function v(aa, ba, ca) {
        if (!q || i())
            return;
        var da = {source_path: aa.scriptPath, source_token: aa.categoryToken, dest_path: ba.scriptPath, dest_token: ba.categoryToken, navigation: r, cause: ca};
        g.post(j, da);
    }
    function w() {
        v(k, n, l.PAGE_LOAD);
    }
    function x(aa, ba) {
        v(aa, ba, l.TRANSITION);
    }
    function y() {
        v(n, k, l.PAGE_UNLOAD);
    }
    g.subscribe(g.SHUTDOWN, y);
    var z = {set: function(aa, ba) {
            var ca = n;
            n = {scriptPath: aa, categoryToken: ba};
            window._script_path = aa;
            u();
            if (q)
                if (ca) {
                    x(ca, n);
                } else
                    w();
        }, setNavigation: function(aa) {
            r = aa;
        }, startLogging: function() {
            q = true;
            if (n)
                w();
        }, stopLogging: function() {
            q = false;
        }, getScriptPath: function() {
            return n ? n.scriptPath : undefined;
        }, getCategoryToken: function() {
            return n ? n.categoryToken : undefined;
        }, subscribe: function(aa) {
            return s(aa);
        }, unsubscribe: function(aa) {
            t(aa);
        }};
    z.CAUSE = l;
    z.BANZAI_LOGGING_ROUTE = j;
    e.exports = z;
});
__d("ErrorSignal", ["AsyncRequest", "AsyncSignal", "Env", "ScriptPath", "emptyFunction"], function(a, b, c, d, e, f) {
    var g = b('AsyncRequest'), h = b('AsyncSignal'), i = b('Env'), j = b('ScriptPath'), k = b('emptyFunction');
    function l(o, p) {
        if (i.error_uri) {
            if (o && o == 'async_error') {
                var q = JSON.parse(p), r = q.err_code, s = q.path;
                if (r in {'1004': 1, '12029': 1, '12031': 1, '12152': 1} && s.indexOf('scribe_endpoint.php') == -1) {
                    new g().setURI('/ajax/chat/scribe_endpoint.php').setData({c: 'async_error', m: p}).setMethod('GET').setReadOnly(true).setOption('suppressEvaluation', true).setOption('suppressErrorAlerts', true).setHandler(k).setErrorHandler(k).send(true);
                    return;
                }
            }
            new h(i.error_uri, {c: o, m: p}).send();
        }
    }
    function m(o, p) {
        var q = a.EagleEye;
        p = p || {};
        p.svn_rev = i.svn_rev;
        p.script_path = j.getScriptPath();
        var r = (q && q.getSessionID() || '-') + '/-';
        l('javascript_error', JSON.stringify({c: o, a: r, m: p}));
    }
    var n = {sendErrorSignal: l, logJSError: m};
    e.exports = n;
    a.ErrorSignal = n;
});
__d("ErrorLogging", ["ErrorSignal", "ErrorUtils", "JSErrorExtra", "JSErrorPlatformColumns"], function(a, b, c, d, e, f) {
    var g = b('ErrorSignal'), h = b('ErrorUtils'), i = b('JSErrorExtra'), j = b('JSErrorPlatformColumns');
    function k(m) {
        var n = m.extra || {}, o = {};
        Object.keys(i).forEach(function(p) {
            if (i[p])
                o[p] = true;
        });
        Object.keys(n).forEach(function(p) {
            if (n[p]) {
                o[p] = true;
            } else if (o[p])
                delete o[p];
        });
        m.extra = Object.keys(o);
    }
    function l(m) {
        m.app_id = j.app_id;
    }
    h.addListener(function(m) {
        k(m);
        l(m);
        g.logJSError(m.category || 'onerror', {error: m.name || m.message, extra: m});
    });
});

__d("CookieCore", [], function(a, b, c, d, e, f) {
    var g = {set: function(h, i, j, k, l) {
            document.cookie = h + "=" + encodeURIComponent(i) + "; " + (j ? "expires=" + (new Date(Date.now() + j)).toGMTString() + "; " : "") + "path=" + (k || '/') + "; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1') + (l ? "; secure" : "");
        }, clear: function(h, i) {
            i = i || '/';
            document.cookie = h + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; " + "path=" + i + "; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
        }, get: function(h) {
            var i = document.cookie.match('(?:^|;\\s*)' + h + '=(.*?)(?:;|$)');
            return (i ? decodeURIComponent(i[1]) : i);
        }};
    e.exports = g;
});
__d("Cookie", ["CookieCore", "Env", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('CookieCore'), h = b('Env'), i = b('copyProperties');
    function j(l, m, n, o, p) {
        if (h.no_cookies && l != 'tpa')
            return;
        g.set(l, m, n, o, p);
    }
    var k = i({}, g);
    k.set = j;
    e.exports = k;
});
__d("PlaceholderListener", ["Arbiter", "CSS", "Parent"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CSS'), i = b('Parent');
    function j(o, p) {
        if (p.getAttribute('data-silentplaceholderlistener'))
            return;
        var q = p.getAttribute('placeholder');
        if (q) {
            var r = i.byClass(p, 'focus_target');
            if ('focus' == o || 'focusin' == o) {
                var s = p.value.replace(/\r\n/g, '\n'), t = q.replace(/\r\n/g, '\n');
                if (s == t && h.hasClass(p, 'DOMControl_placeholder')) {
                    p.value = '';
                    h.removeClass(p, 'DOMControl_placeholder');
                }
                if (r)
                    n.expandInput(r);
            } else {
                if (p.value === '') {
                    h.addClass(p, 'DOMControl_placeholder');
                    p.value = q;
                    r && h.removeClass(r, 'child_is_active');
                    p.style.direction = '';
                }
                r && h.removeClass(r, 'child_is_focused');
            }
        }
    }
    try {
        if (document.activeElement)
            j('focus', document.activeElement);
    } catch (k) {
    }
    function l(event) {
        event = event || window.event;
        j(event.type, event.target || event.srcElement);
    }
    var m = document.documentElement;
    if (m.addEventListener) {
        m.addEventListener('focus', l, true);
        m.addEventListener('blur', l, true);
    } else {
        m.attachEvent('onfocusin', l);
        m.attachEvent('onfocusout', l);
    }
    var n = {expandInput: function(o) {
            h.addClass(o, 'child_is_active');
            h.addClass(o, 'child_is_focused');
            h.addClass(o, 'child_was_focused');
            g.inform('reflow');
        }};
    e.exports = n;
});
__d("DOMControl", ["DataStore", "$"], function(a, b, c, d, e, f) {
    var g = b('DataStore'), h = b('$');
    function i(j) {
        "use strict";
        this.root = h(j);
        this.updating = false;
        g.set(j, 'DOMControl', this);
    }
    i.prototype.getRoot = function() {
        "use strict";
        return this.root;
    };
    i.prototype.beginUpdate = function() {
        "use strict";
        if (this.updating)
            return false;
        this.updating = true;
        return true;
    };
    i.prototype.endUpdate = function() {
        "use strict";
        this.updating = false;
    };
    i.prototype.update = function(j) {
        "use strict";
        if (!this.beginUpdate())
            return this;
        this.onupdate(j);
        this.endUpdate();
    };
    i.prototype.onupdate = function(j) {
        "use strict";
    };
    i.getInstance = function(j) {
        "use strict";
        return g.get(j, 'DOMControl');
    };
    e.exports = i;
});
__d("getActiveElement", [], function(a, b, c, d, e, f) {
    function g() {
        try {
            return document.activeElement || document.body;
        } catch (h) {
            return document.body;
        }
    }
    e.exports = g;
});
__d("cx", [], function(a, b, c, d, e, f) {
    function g(h) {
        throw new Error('cx' + '(...): Unexpected class transformation.');
    }
    e.exports = g;
});
__d("Focus", ["CSS", "DOM", "Event", "Run", "cx", "ge"], function(a, b, c, d, e, f) {
    var g = b('CSS'), h = b('DOM'), i = b('Event'), j = b('Run'), k = b('cx'), l = b('ge'), m = {}, n, o = {set: function(s) {
            try {
                s.tabIndex = s.tabIndex;
                s.focus();
            } catch (t) {
            }
        }, setWithoutOutline: function(s) {
            g.addClass(s, "_5f0v");
            var t = i.listen(s, 'blur', function() {
                g.removeClass(s, "_5f0v");
                t.remove();
            });
            o.set(s);
        }, relocate: function(s, t) {
            function u(v) {
                g.conditionClass(t, "_3oxt", v);
            }
            o.listen(s, u);
            g.addClass(s, "_5f0v");
        }, listen: function(s, t) {
            p();
            var u = h.getID(s);
            m[u] = t;
            j.onLeave(r.bind(null, u));
        }};
    function p() {
        if (n)
            return;
        i.listen(document.documentElement, 'focusout', q);
        i.listen(document.documentElement, 'focusin', q);
        n = true;
    }
    function q(event) {
        var s = event.getTarget();
        if (typeof m[s.id] === 'function') {
            var t = event.type === 'focusin' || event.type === 'focus';
            m[s.id](t);
        }
    }
    function r(s) {
        if (m[s] && !l(s))
            delete m[s];
    }
    e.exports = o;
});
__d("InputSelection", ["DOM", "Focus"], function(a, b, c, d, e, f) {
    var g = b('DOM'), h = b('Focus'), i = {get: function(j) {
            if (!document.selection)
                return {start: j.selectionStart, end: j.selectionEnd};
            var k = document.selection.createRange();
            if (k.parentElement() !== j)
                return {start: 0, end: 0};
            var l = j.value.length;
            if (g.isNodeOfType(j, 'input')) {
                return {start: -k.moveStart('character', -l), end: -k.moveEnd('character', -l)};
            } else {
                var m = k.duplicate();
                m.moveToElementText(j);
                m.setEndPoint('StartToEnd', k);
                var n = l - m.text.length;
                m.setEndPoint('StartToStart', k);
                return {start: l - m.text.length, end: n};
            }
        }, set: function(j, k, l) {
            if (typeof l == 'undefined')
                l = k;
            if (document.selection) {
                if (j.tagName == 'TEXTAREA') {
                    var m = (j.value.slice(0, k).match(/\r/g) || []).length, n = (j.value.slice(k, l).match(/\r/g) || []).length;
                    k -= m;
                    l -= m + n;
                }
                var o = j.createTextRange();
                o.collapse(true);
                o.moveStart('character', k);
                o.moveEnd('character', l - k);
                o.select();
            } else {
                j.selectionStart = k;
                j.selectionEnd = Math.min(l, j.value.length);
                h.set(j);
            }
        }};
    e.exports = i;
});
__d("enforceMaxLength", ["DOM", "Event", "Input", "InputSelection"], function(a, b, c, d, e, f) {
    var g = b('DOM'), h = b('Event'), i = b('Input'), j = b('InputSelection'), k = function(n, o) {
        var p = i.getValue(n), q = p.length, r = q - o;
        if (r > 0) {
            var s, t;
            try {
                s = j.get(n);
                t = s.end;
            } catch (u) {
                s = null;
                t = 0;
            }
            if (t >= r)
                q = t;
            var v = q - r;
            if (v && (p.charCodeAt(v - 1) & 64512) === 55296)
                v--;
            t = Math.min(t, v);
            i.setValue(n, p.slice(0, v) + p.slice(q));
            if (s)
                j.set(n, Math.min(s.start, t), t);
        }
    }, l = function(event) {
        var n = event.getTarget(), o = n.getAttribute && parseInt(n.getAttribute('maxlength'), 10);
        if (o > 0 && g.isNodeOfType(n, ['input', 'textarea']))
            setTimeout(k.bind(null, n, o), 0);
    }, m = 'maxLength' in g.create('input') && 'maxLength' in g.create('textarea');
    if (!m)
        h.listen(document.documentElement, {keydown: l, paste: l});
    e.exports = k;
});
__d("Input", ["CSS", "DOMQuery", "DOMControl", "getActiveElement"], function(a, b, c, d, e, f) {
    var g = b('CSS'), h = b('DOMQuery'), i = b('DOMControl'), j = b('getActiveElement'), k = function(m) {
        var n = m.getAttribute('maxlength');
        if (n && n > 0)
            d(['enforceMaxLength'], function(o) {
                o(m, n);
            });
    }, l = {isEmpty: function(m) {
            return !(/\S/).test(m.value || '') || g.hasClass(m, 'DOMControl_placeholder');
        }, getValue: function(m) {
            return l.isEmpty(m) ? '' : m.value;
        }, setValue: function(m, n) {
            g.removeClass(m, 'DOMControl_placeholder');
            m.value = n || '';
            k(m);
            var o = i.getInstance(m);
            o && o.resetHeight && o.resetHeight();
        }, setPlaceholder: function(m, n) {
            m.setAttribute('aria-label', n);
            m.setAttribute('placeholder', n);
            if (m == j())
                return;
            if (l.isEmpty(m)) {
                g.conditionClass(m, 'DOMControl_placeholder', n);
                m.value = n || '';
            }
        }, reset: function(m) {
            var n = m !== document.activeElement ? (m.getAttribute('placeholder') || '') : '';
            m.value = n;
            g.conditionClass(m, 'DOMControl_placeholder', n);
            m.style.height = '';
        }, setSubmitOnEnter: function(m, n) {
            g.conditionClass(m, 'enter_submit', n);
        }, getSubmitOnEnter: function(m) {
            return g.hasClass(m, 'enter_submit');
        }, setMaxLength: function(m, n) {
            if (n > 0) {
                m.setAttribute('maxlength', n);
                k(m);
            } else
                m.removeAttribute('maxlength');
        }};
    e.exports = l;
});
__d("PlaceholderOnsubmitFormListener", ["Event", "Input"], function(a, b, c, d, e, f) {
    var g = b('Event'), h = b('Input');
    g.listen(document.documentElement, 'submit', function(i) {
        var j = i.getTarget().getElementsByTagName('*');
        for (var k = 0; k < j.length; k++)
            if (j[k].getAttribute('placeholder') && h.isEmpty(j[k]))
                h.setValue(j[k], '');
    });
});
__d("PluginMessage", ["DOMEventListener"], function(a, b, c, d, e, f) {
    var g = b('DOMEventListener'), h = {listen: function() {
            g.add(window, 'message', function(event) {
                if ((/\.facebook\.com$/).test(event.origin) && /^FB_POPUP:/.test(event.data)) {
                    var i = JSON.parse(event.data.substring(9));
                    if ('reload' in i && /^https?:/.test(i.reload))
                        document.location.replace(i.reload);
                }
            });
        }};
    e.exports = h;
});
__d("camelize", [], function(a, b, c, d, e, f) {
    var g = /-(.)/g;
    function h(i) {
        return i.replace(g, function(j, k) {
            return k.toUpperCase();
        });
    }
    e.exports = h;
});
__d("getOpacityStyleName", [], function(a, b, c, d, e, f) {
    var g = false, h = null;
    function i() {
        if (!g) {
            if ('opacity' in document.body.style) {
                h = 'opacity';
            } else {
                var j = document.createElement('div');
                j.style.filter = 'alpha(opacity=100)';
                if (j.style.filter)
                    h = 'filter';
                j = null;
            }
            g = true;
        }
        return h;
    }
    e.exports = i;
});
__d("hyphenate", [], function(a, b, c, d, e, f) {
    var g = /([A-Z])/g;
    function h(i) {
        return i.replace(g, '-$1').toLowerCase();
    }
    e.exports = h;
});
__d("getStyleProperty", ["camelize", "hyphenate"], function(a, b, c, d, e, f) {
    var g = b('camelize'), h = b('hyphenate');
    function i(k) {
        return k == null ? k : String(k);
    }
    function j(k, l) {
        var m;
        if (window.getComputedStyle) {
            m = window.getComputedStyle(k, null);
            if (m)
                return i(m.getPropertyValue(h(l)));
        }
        if (document.defaultView && document.defaultView.getComputedStyle) {
            m = document.defaultView.getComputedStyle(k, null);
            if (m)
                return i(m.getPropertyValue(h(l)));
            if (l === 'display')
                return 'none';
        }
        if (k.currentStyle) {
            if (l === 'float')
                return i(k.currentStyle.cssFloat || k.currentStyle.styleFloat);
            return i(k.currentStyle[g(l)]);
        }
        return i(k.style && k.style[g(l)]);
    }
    e.exports = j;
});
__d("keyMirror", ["invariant"], function(a, b, c, d, e, f) {
    "use strict";
    var g = b('invariant'), h = function(i) {
        var j = {}, k;
        g(i instanceof Object && !Array.isArray(i));
        for (k in i) {
            if (!i.hasOwnProperty(k))
                continue;
            j[k] = k;
        }
        return j;
    };
    e.exports = h;
});
__d("mergeHelpers", ["invariant", "keyMirror"], function(a, b, c, d, e, f) {
    "use strict";
    var g = b('invariant'), h = b('keyMirror'), i = 36, j = function(l) {
        return typeof l !== 'object' || l === null;
    }, k = {MAX_MERGE_DEPTH: i, isTerminal: j, normalizeMergeArg: function(l) {
            return l === undefined || l === null ? {} : l;
        }, checkMergeArrayArgs: function(l, m) {
            g(Array.isArray(l) && Array.isArray(m));
        }, checkMergeObjectArgs: function(l, m) {
            k.checkMergeObjectArg(l);
            k.checkMergeObjectArg(m);
        }, checkMergeObjectArg: function(l) {
            g(!j(l) && !Array.isArray(l));
        }, checkMergeLevel: function(l) {
            g(l < i);
        }, checkArrayStrategy: function(l) {
            g(l === undefined || l in k.ArrayStrategies);
        }, ArrayStrategies: h({Clobber: true, IndexByIndex: true})};
    e.exports = k;
});
__d("mergeInto", ["mergeHelpers"], function(a, b, c, d, e, f) {
    "use strict";
    var g = b('mergeHelpers'), h = g.checkMergeObjectArg;
    function i(j, k) {
        h(j);
        if (k != null) {
            h(k);
            for (var l in k) {
                if (!k.hasOwnProperty(l))
                    continue;
                j[l] = k[l];
            }
        }
    }
    e.exports = i;
});
__d("Style-upstream", ["camelize", "containsNode", "ex", "getOpacityStyleName", "getStyleProperty", "hyphenate", "invariant", "mergeInto"], function(a, b, c, d, e, f) {
    var g = b('camelize'), h = b('containsNode'), i = b('ex'), j = b('getOpacityStyleName'), k = b('getStyleProperty'), l = b('hyphenate'), m = b('invariant'), n = b('mergeInto');
    function o(v, w) {
        var x = u.get(v, w);
        return (x === 'auto' || x === 'scroll');
    }
    var p = new RegExp(('\\s*' + '([^\\s:]+)' + '\\s*:\\s*' + '([^;(\'"]*(?:(?:\\([^)]*\\)|"[^"]*"|\'[^\']*\')[^;(?:\'"]*)*)' + '(?:;|$)'), 'g');
    function q(v) {
        var w = {};
        v.replace(p, function(x, y, z) {
            w[y] = z;
        });
        return w;
    }
    function r(v) {
        var w = '';
        for (var x in v)
            if (v[x])
                w += x + ':' + v[x] + ';';
        return w;
    }
    function s(v) {
        return v !== '' ? 'alpha(opacity=' + v * 100 + ')' : '';
    }
    function t(v, w, x) {
        switch (l(w)) {
            case 'font-weight':
            case 'line-height':
            case 'opacity':
            case 'z-index':
                break;
            case 'width':
            case 'height':
                var y = parseInt(x, 10) < 0;
                m(!y);
            default:
                m(isNaN(x) || !x || x === '0');
                break;
        }
    }
    var u = {set: function(v, w, x) {
            t('Style.set', w, x);
            var y = v.style;
            switch (w) {
                case 'opacity':
                    if (j() === 'filter') {
                        y.filter = s(x);
                    } else
                        y.opacity = x;
                    break;
                case 'float':
                    y.cssFloat = y.styleFloat = x || '';
                    break;
                default:
                    try {
                        y[g(w)] = x;
                    } catch (z) {
                        throw new Error(i('Style.set: "%s" argument is invalid: %s', w, x));
                    }
            }
        }, apply: function(v, w) {
            var x;
            for (x in w)
                t('Style.apply', x, w[x]);
            if ('opacity' in w && j() === 'filter') {
                w.filter = s(w.opacity);
                delete w.opacity;
            }
            var y = q(v.style.cssText);
            for (x in w) {
                var z = w[x];
                delete w[x];
                var aa = l(x);
                for (var ba in y)
                    if (ba === aa || ba.indexOf(aa + '-') === 0)
                        delete y[ba];
                w[aa] = z;
            }
            n(y, w);
            v.style.cssText = r(y);
        }, get: k, getFloat: function(v, w) {
            return parseFloat(u.get(v, w), 10);
        }, getOpacity: function(v) {
            if (j() === 'filter') {
                var w = u.get(v, 'filter');
                if (w) {
                    var x = /(\d+(?:\.\d+)?)/.exec(w);
                    if (x)
                        return parseFloat(x.pop()) / 100;
                }
            }
            return u.getFloat(v, 'opacity') || 1;
        }, isFixed: function(v) {
            while (h(document.body, v)) {
                if (u.get(v, 'position') === 'fixed')
                    return true;
                v = v.parentNode;
            }
            return false;
        }, getScrollParent: function(v) {
            if (!v)
                return null;
            while (v && v !== document.body) {
                if (o(v, 'overflow') || o(v, 'overflowY') || o(v, 'overflowX'))
                    return v;
                v = v.parentNode;
            }
            return window;
        }};
    e.exports = u;
});
__d("merge", ["mergeInto"], function(a, b, c, d, e, f) {
    "use strict";
    var g = b('mergeInto'), h = function(i, j) {
        var k = {};
        g(k, i);
        g(k, j);
        return k;
    };
    e.exports = h;
});
__d("Style", ["Style-upstream", "$", "merge"], function(a, b, c, d, e, f) {
    var g = b('Style-upstream'), h = b('$'), i = b('merge'), j = i(g, {get: function(k, l) {
            typeof k === 'string';
            return g.get(h(k), l);
        }, getFloat: function(k, l) {
            typeof k === 'string';
            return g.getFloat(h(k), l);
        }});
    e.exports = j;
});
__d("getViewportDimensions", [], function(a, b, c, d, e, f) {
    function g() {
        return (document.documentElement && document.documentElement.clientWidth) || (document.body && document.body.clientWidth) || 0;
    }
    function h() {
        return (document.documentElement && document.documentElement.clientHeight) || (document.body && document.body.clientHeight) || 0;
    }
    function i() {
        return {width: window.innerWidth || g(), height: window.innerHeight || h()};
    }
    i.withoutScrollbars = function() {
        return {width: g(), height: h()};
    };
    e.exports = i;
});
__d("DOMDimensions", ["Style", "getDocumentScrollElement", "getViewportDimensions"], function(a, b, c, d, e, f) {
    var g = b('Style'), h = b('getDocumentScrollElement'), i = b('getViewportDimensions'), j = {getElementDimensions: function(k) {
            return {width: k.offsetWidth || 0, height: k.offsetHeight || 0};
        }, getViewportDimensions: i, getViewportWithoutScrollbarDimensions: i.withoutScrollbars, getDocumentDimensions: function(k) {
            var l = h(k), m = l.scrollWidth || 0, n = l.scrollHeight || 0;
            return {width: m, height: n};
        }, measureElementBox: function(k, l, m, n, o) {
            var p;
            switch (l) {
                case 'left':
                case 'right':
                case 'top':
                case 'bottom':
                    p = [l];
                    break;
                case 'width':
                    p = ['left', 'right'];
                    break;
                case 'height':
                    p = ['top', 'bottom'];
                    break;
                default:
                    throw Error('Invalid plane: ' + l);
            }
            var q = function(r, s) {
                var t = 0;
                for (var u = 0; u < p.length; u++)
                    t += parseInt(g.get(k, r + '-' + p[u] + s), 10) || 0;
                return t;
            };
            return (m ? q('padding', '') : 0) + (n ? q('border', '-width') : 0) + (o ? q('margin', '') : 0);
        }};
    e.exports = j;
});
__d("KeyStatus", ["Event"], function(a, b, c, d, e, f) {
    var g = b('Event'), h = null, i = null;
    function j() {
        if (!i)
            i = g.listen(window, 'blur', function() {
                h = null;
                k();
            });
    }
    function k() {
        if (i) {
            i.remove();
            i = null;
        }
    }
    g.listen(document.documentElement, 'keydown', function(m) {
        h = g.getKeyCode(m);
        j();
    }, g.Priority.URGENT);
    g.listen(document.documentElement, 'keyup', function(m) {
        h = null;
        k();
    }, g.Priority.URGENT);
    var l = {isKeyDown: function() {
            return !!h;
        }, getKeyDownCode: function() {
            return h;
        }};
    e.exports = l;
});
__d("BehaviorsMixin", ["copyProperties"], function(a, b, c, d, e, f) {
    var g = b('copyProperties');
    function h(l) {
        this._behavior = l;
        this._enabled = false;
    }
    g(h.prototype, {enable: function() {
            if (!this._enabled) {
                this._enabled = true;
                this._behavior.enable();
            }
        }, disable: function() {
            if (this._enabled) {
                this._enabled = false;
                this._behavior.disable();
            }
        }});
    var i = 1;
    function j(l) {
        if (!l.__BEHAVIOR_ID)
            l.__BEHAVIOR_ID = i++;
        return l.__BEHAVIOR_ID;
    }
    var k = {enableBehavior: function(l) {
            if (!this._behaviors)
                this._behaviors = {};
            var m = j(l);
            if (!this._behaviors[m])
                this._behaviors[m] = new h(new l(this));
            this._behaviors[m].enable();
            return this;
        }, disableBehavior: function(l) {
            if (this._behaviors) {
                var m = j(l);
                if (this._behaviors[m])
                    this._behaviors[m].disable();
            }
            return this;
        }, enableBehaviors: function(l) {
            l.forEach(this.enableBehavior.bind(this));
            return this;
        }, destroyBehaviors: function() {
            if (this._behaviors) {
                for (var l in this._behaviors)
                    this._behaviors[l].disable();
                this._behaviors = {};
            }
        }, hasBehavior: function(l) {
            return this._behaviors && (j(l) in this._behaviors);
        }};
    e.exports = k;
});
__d("BootloadedReact", ["Bootloader"], function(a, b, c, d, e, f) {
    var g = b('Bootloader'), h = function(j) {
        g.loadModules(["React"], j);
    }, i = {isValidComponent: function(j) {
            return !!(j && typeof j.mountComponentIntoNode === 'function' && typeof j.receiveComponent === 'function');
        }, initializeTouchEvents: function(j, k) {
            h(function(l) {
                l.initializeTouchEvents(j);
                k && k();
            });
        }, createClass: function(j, k) {
            h(function(l) {
                var m = l.createClass(j);
                k && k(m);
            });
        }, renderComponent: function(j, k, l) {
            h(function(m) {
                var n = m.renderComponent(j, k);
                l && l(n);
            });
        }, unmountComponentAtNode: function(j, k) {
            h(function(l) {
                l.unmountComponentAtNode(j);
                k && k();
            });
        }};
    e.exports = i;
});
__d("ContextualThing", ["CSS", "DOM", "ge"], function(a, b, c, d, e, f) {
    var g = b('CSS'), h = b('DOM'), i = b('ge'), j = {register: function(k, l) {
            k.setAttribute('data-ownerid', h.getID(l));
        }, containsIncludingLayers: function(k, l) {
            while (l) {
                if (h.contains(k, l))
                    return true;
                l = j.getContext(l);
            }
            return false;
        }, getContext: function(k) {
            var l;
            while (k) {
                if (k.getAttribute && (l = k.getAttribute('data-ownerid')))
                    return i(l);
                k = k.parentNode;
            }
            return null;
        }, parentByClass: function(k, l) {
            var m;
            while (k && !g.hasClass(k, l))
                if (k.getAttribute && (m = k.getAttribute('data-ownerid'))) {
                    k = i(m);
                } else
                    k = k.parentNode;
            return k;
        }};
    e.exports = j;
});
__d("KeyEventController", ["DOM", "Event", "Run", "isEmpty"], function(a, b, c, d, e, f) {
    var g = b('DOM'), h = b('Event'), i = b('Run'), j = b('isEmpty'), k = null, l = ['input', 'select', 'textarea', 'object', 'embed'], m = {button: 1, checkbox: 1, radio: 1, submit: 1}, n = {BACKSPACE: [8], TAB: [9], RETURN: [13], ESCAPE: [27], LEFT: [37, 63234], UP: [38, 63232], RIGHT: [39, 63235], DOWN: [40, 63233], DELETE: [46], COMMA: [188], PERIOD: [190], SLASH: [191], '`': [192], '[': [219], ']': [221], PAGE_UP: [33], PAGE_DOWN: [34]}, o = {8: 1, 9: 1, 13: 1, 27: 1, 37: 1, 63234: 1, 38: 1, 63232: 1, 39: 1, 63235: 1, 40: 1, 63233: 1, 46: 1};
    function p() {
        "use strict";
        this.handlers = {};
        document.onkeyup = this.onkeyevent.bind(this, 'onkeyup');
        document.onkeydown = this.onkeyevent.bind(this, 'onkeydown');
        document.onkeypress = this.onkeyevent.bind(this, 'onkeypress');
    }
    p.prototype.mapKey = function(q) {
        "use strict";
        if (q >= 0 && q <= 9) {
            if (typeof (q) != 'number')
                q = q.charCodeAt(0) - 48;
            return [48 + q, 96 + q];
        }
        var r = n[q.toUpperCase()];
        if (r)
            return r;
        return [q.toUpperCase().charCodeAt(0)];
    };
    p.prototype.onkeyevent = function(q, r) {
        "use strict";
        r = h.$E(r);
        var s = this.handlers[r.keyCode] || this.handlers[r.which], t, u, v;
        if (s)
            for (var w = 0; w < s.length; w++) {
                t = s[w].callback;
                u = s[w].filter;
                try {
                    if (!u || u(r, q)) {
                        v = t(r, q);
                        if (v === false)
                            return h.kill(r);
                    }
                } catch (x) {
                }
            }
        return true;
    };
    p.prototype.resetHandlers = function() {
        "use strict";
        this.handlers = {};
    };
    p.getInstance = function() {
        "use strict";
        return k || (k = new p());
    };
    p.defaultFilter = function(event, q) {
        "use strict";
        event = h.$E(event);
        return p.filterEventTypes(event, q) && p.filterEventTargets(event, q) && p.filterEventModifiers(event, q);
    };
    p.filterEventTypes = function(event, q) {
        "use strict";
        if (q === 'onkeydown')
            return true;
        return false;
    };
    p.filterEventTargets = function(event, q) {
        "use strict";
        var r = event.getTarget(), s = r.contentEditable === 'true';
        return (!(s || g.isNodeOfType(r, l)) || r.type in m || (event.keyCode in o && ((g.isNodeOfType(r, ['input', 'textarea']) && r.value.length === 0) || (s && g.getText(r).length === 0))));
    };
    p.filterEventModifiers = function(event, q) {
        "use strict";
        if (event.ctrlKey || event.altKey || event.metaKey || event.repeat)
            return false;
        return true;
    };
    p.registerKey = function(q, r, s, t) {
        "use strict";
        if (s === undefined)
            s = p.defaultFilter;
        var u = p.getInstance(), v = u.mapKey(q);
        if (j(u.handlers))
            i.onLeave(u.resetHandlers.bind(u));
        var w = {};
        for (var x = 0; x < v.length; x++) {
            q = v[x];
            if (!u.handlers[q] || t)
                u.handlers[q] = [];
            var y = {callback: r, filter: s};
            w[q] = y;
            u.handlers[q].push(y);
        }
        return {remove: function() {
                for (var z in w) {
                    if (u.handlers[z] && u.handlers[z].length) {
                        var aa = u.handlers[z].indexOf(w[z]);
                        aa >= 0 && u.handlers[z].splice(aa, 1);
                    }
                    delete w[z];
                }
            }};
    };
    e.exports = p;
});
__d("removeFromArray", [], function(a, b, c, d, e, f) {
    function g(h, i) {
        var j = h.indexOf(i);
        j != -1 && h.splice(j, 1);
    }
    e.exports = g;
});
__d("Layer", ["KeyStatus", "ArbiterMixin", "BehaviorsMixin", "BootloadedReact", "ContextualThing", "CSS", "DataStore", "DOM", "Event", "HTML", "KeyEventController", "Parent", "Style", "copyProperties", "ge", "mixin", "removeFromArray"], function(a, b, c, d, e, f) {
    b('KeyStatus');
    var g = b('ArbiterMixin'), h = b('BehaviorsMixin'), i = b('BootloadedReact'), j = b('ContextualThing'), k = b('CSS'), l = b('DataStore'), m = b('DOM'), n = b('Event'), o = b('HTML'), p = b('KeyEventController'), q = b('Parent'), r = b('Style'), s = b('copyProperties'), t = b('ge'), u = b('mixin'), v = b('removeFromArray'), w = [], x = u(g, h);
    for (var y in x)
        if (x.hasOwnProperty(y))
            aa[y] = x[y];
    var z = x === null ? null : x.prototype;
    aa.prototype = Object.create(z);
    aa.prototype.constructor = aa;
    aa.__superConstructor__ = x;
    function aa(ba, ca) {
        "use strict";
        this._config = ba || {};
        if (ca) {
            this._configure(this._config, ca);
            var da = this._config.addedBehaviors || [];
            this.enableBehaviors(this._getDefaultBehaviors().concat(da));
        }
    }
    aa.prototype.init = function(ba) {
        "use strict";
        this._configure(this._config, ba);
        var ca = this._config.addedBehaviors || [];
        this.enableBehaviors(this._getDefaultBehaviors().concat(ca));
        this._initialized = true;
        return this;
    };
    aa.prototype._configure = function(ba, ca) {
        "use strict";
        if (ca) {
            var da = m.isNode(ca), ea = typeof ca === 'string' || o.isHTML(ca);
            this.containsReactComponent = i.isValidComponent(ca);
            if (ea) {
                ca = o(ca).getRootNode();
            } else if (this.containsReactComponent) {
                var fa = document.createElement('div');
                i.renderComponent(ca, fa);
                ca = this._reactContainer = fa;
            }
        }
        this._root = this._buildWrapper(ba, ca);
        if (ba.attributes)
            m.setAttributes(this._root, ba.attributes);
        if (ba.classNames)
            ba.classNames.forEach(k.addClass.bind(null, this._root));
        k.addClass(this._root, 'uiLayer');
        if (ba.causalElement)
            this._causalElement = t(ba.causalElement);
        if (ba.permanent)
            this._permanent = ba.permanent;
        l.set(this._root, 'layer', this);
    };
    aa.prototype._getDefaultBehaviors = function() {
        "use strict";
        return [];
    };
    aa.prototype.getCausalElement = function() {
        "use strict";
        return this._causalElement;
    };
    aa.prototype.setCausalElement = function(ba) {
        "use strict";
        this._causalElement = ba;
        return this;
    };
    aa.prototype.getInsertParent = function() {
        "use strict";
        return this._insertParent || document.body;
    };
    aa.prototype.getRoot = function() {
        "use strict";
        return this._root;
    };
    aa.prototype.getContentRoot = function() {
        "use strict";
        return this._root;
    };
    aa.prototype._buildWrapper = function(ba, ca) {
        "use strict";
        return ca;
    };
    aa.prototype.setInsertParent = function(ba) {
        "use strict";
        if (ba) {
            if (this._shown && ba !== this.getInsertParent()) {
                m.appendContent(ba, this.getRoot());
                this.updatePosition();
            }
            this._insertParent = ba;
        }
        return this;
    };
    aa.prototype.show = function() {
        "use strict";
        if (this._shown)
            return this;
        var ba = this.getRoot();
        this.inform('beforeshow');
        r.set(ba, 'visibility', 'hidden');
        r.set(ba, 'overflow', 'hidden');
        k.show(ba);
        m.appendContent(this.getInsertParent(), ba);
        if (this.updatePosition() !== false) {
            this._shown = true;
            this.inform('show');
            aa.inform('show', this);
            if (!this._permanent)
                setTimeout(function() {
                    if (this._shown)
                        w.push(this);
                }.bind(this), 0);
        } else
            k.hide(ba);
        r.set(ba, 'visibility', '');
        r.set(ba, 'overflow', '');
        this.inform('aftershow');
        return this;
    };
    aa.prototype.hide = function() {
        "use strict";
        if (this._hiding || !this._shown || this.inform('beforehide') === false)
            return this;
        this._hiding = true;
        if (this.inform('starthide') !== false)
            this.finishHide();
        return this;
    };
    aa.prototype.conditionShow = function(ba) {
        "use strict";
        return ba ? this.show() : this.hide();
    };
    aa.prototype.finishHide = function() {
        "use strict";
        if (this._shown) {
            if (!this._permanent)
                v(w, this);
            this._hiding = false;
            this._shown = false;
            k.hide(this.getRoot());
            this.inform('hide');
            aa.inform('hide', this);
        }
    };
    aa.prototype.isShown = function() {
        "use strict";
        return this._shown;
    };
    aa.prototype.updatePosition = function() {
        "use strict";
        return true;
    };
    aa.prototype.destroy = function() {
        "use strict";
        if (this.containsReactComponent)
            i.unmountComponentAtNode(this._reactContainer);
        this.finishHide();
        var ba = this.getRoot();
        m.remove(ba);
        this.destroyBehaviors();
        this.inform('destroy');
        aa.inform('destroy', this);
        l.remove(ba, 'layer');
        this._root = this._causalElement = null;
    };
    aa.init = function(ba, ca) {
        "use strict";
        ba.init(ca);
    };
    aa.initAndShow = function(ba, ca) {
        "use strict";
        ba.init(ca).show();
    };
    aa.show = function(ba) {
        "use strict";
        ba.show();
    };
    aa.getTopmostLayer = function() {
        "use strict";
        return w[w.length - 1];
    };
    s(aa, g);
    s(aa.prototype, {_initialized: false, _root: null, _shown: false, _hiding: false, _causalElement: null, _reactContainer: null});
    n.listen(document.documentElement, 'keydown', function(event) {
        if (p.filterEventTargets(event, 'keydown'))
            for (var ba = w.length - 1; ba >= 0; ba--)
                if (w[ba].inform('key', event) === false)
                    return false;
    }, n.Priority.URGENT);
    n.listen(document.documentElement, 'click', function(event) {
        var ba = w.length;
        if (!ba)
            return;
        var ca = event.getTarget();
        if (!m.contains(document.documentElement, ca))
            return;
        if (!ca.offsetWidth)
            return;
        if (q.byClass(ca, 'generic_dialog'))
            return;
        while (ba--) {
            var da = w[ba], ea = da.getContentRoot();
            if (j.containsIncludingLayers(ea, ca))
                return;
            if (da.inform('blur') === false || da.isShown())
                return;
        }
    });
    e.exports = aa;
});
__d("PopupWindow", ["DOMDimensions", "DOMQuery", "Layer", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('DOMDimensions'), h = b('DOMQuery'), i = b('Layer'), j = b('copyProperties'), k = {_opts: {allowShrink: true, strategy: 'vector', timeout: 100, widthElement: null}, init: function(l) {
            j(k._opts, l);
            setInterval(k._resizeCheck, k._opts.timeout);
        }, _resizeCheck: function() {
            var l = g.getViewportDimensions(), m = k._getDocumentSize(), n = i.getTopmostLayer();
            if (n) {
                var o = n.getRoot().firstChild, p = g.getElementDimensions(o);
                p.height += g.measureElementBox(o, 'height', true, true, true);
                p.width += g.measureElementBox(o, 'width', true, true, true);
                m.height = Math.max(m.height, p.height);
                m.width = Math.max(m.width, p.width);
            }
            var q = m.height - l.height, r = m.width - l.width;
            if (r < 0 && !k._opts.widthElement)
                r = 0;
            r = r > 1 ? r : 0;
            if (!k._opts.allowShrink && q < 0)
                q = 0;
            if (q || r)
                try {
                    window.console && window.console.firebug;
                    window.resizeBy(r, q);
                    if (r)
                        window.moveBy(r / -2, 0);
                } catch (s) {
                }
        }, _getDocumentSize: function() {
            var l = g.getDocumentDimensions();
            if (k._opts.strategy === 'offsetHeight')
                l.height = document.body.offsetHeight;
            if (k._opts.widthElement) {
                var m = h.scry(document.body, k._opts.widthElement)[0];
                if (m)
                    l.width = g.getElementDimensions(m).width;
            }
            var n = a.Dialog;
            if (n && n.max_bottom && n.max_bottom > l.height)
                l.height = n.max_bottom;
            return l;
        }, open: function(l, m, n) {
            var o = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft, p = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop, q = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth, r = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22), s = parseInt(o + ((q - n) / 2), 10), t = parseInt(p + ((r - m) / 2.5), 10), u = ('width=' + n + ',height=' + m + ',left=' + s + ',top=' + t);
            return window.open(l, '_blank', u);
        }};
    e.exports = k;
});
__d("PluginConfirm", ["DOMEvent", "DOMEventListener", "PluginMessage", "PopupWindow", "URI", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('DOMEvent'), h = b('DOMEventListener'), i = b('PluginMessage'), j = b('PopupWindow'), k = b('URI'), l = b('copyProperties');
    function m(n) {
        l(this, {plugin: n, confirm_params: {}, return_params: k.getRequestURI().getQueryData()});
        this.addReturnParams({ret: 'sentry'});
        delete this.return_params.hash;
    }
    l(m.prototype, {addConfirmParams: function(n) {
            l(this.confirm_params, n);
        }, addReturnParams: function(n) {
            l(this.return_params, n);
            return this;
        }, start: function() {
            var n = new k('/plugins/error/confirm/' + this.plugin).addQueryData(this.confirm_params).addQueryData({secure: k.getRequestURI().isSecure(), plugin: this.plugin, return_params: JSON.stringify(this.return_params)});
            this.popup = j.open(n.toString(), 320, 486);
            i.listen();
            return this;
        }});
    m.starter = function(n, o, p) {
        var q = new m(n);
        q.addConfirmParams(o || {});
        q.addReturnParams(p || {});
        return q.start.bind(q);
    };
    m.listen = function(n, o, p, q) {
        h.add(n, 'click', function(r) {
            new g(r).kill();
            m.starter(o, p, q)();
        });
    };
    e.exports = m;
});
__d("getElementPosition", ["containsNode"], function(a, b, c, d, e, f) {
    var g = b('containsNode');
    function h(i) {
        var j = document.documentElement;
        if (!('getBoundingClientRect' in i) || !g(j, i))
            return {x: 0, y: 0, height: 0, width: 0};
        var k = i.getBoundingClientRect(), l = Math.round(k.left) - j.clientLeft, m = Math.round(k.right) - j.clientLeft, n = Math.round(k.top) - j.clientTop, o = Math.round(k.bottom) - j.clientTop;
        return {x: l, y: n, height: (o - n), width: (m - l)};
    }
    e.exports = h;
});
__d("trackReferrer", ["Parent"], function(a, b, c, d, e, f) {
    var g = b('Parent');
    function h(i, j) {
        i = g.byAttribute(i, 'data-referrer');
        if (i) {
            var k = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/.exec(j)[1] || '';
            if (!k)
                return;
            var l = k + '|' + i.getAttribute('data-referrer'), m = new Date();
            m.setTime(Date.now() + 1000);
            document.cookie = "x-src=" + encodeURIComponent(l) + "; " + "expires=" + m.toGMTString() + ";path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
        }
        return i;
    }
    e.exports = h;
});
__d("Form", ["AsyncRequest", "AsyncResponse", "CSS", "DataStore", "DOM", "DOMQuery", "DTSG", "Event", "Input", "Parent", "PHPQuerySerializer", "URI", "createArrayFrom", "getElementPosition", "trackReferrer"], function(a, b, c, d, e, f) {
    var g = b('AsyncRequest'), h = b('AsyncResponse'), i = b('CSS'), j = b('DataStore'), k = b('DOM'), l = b('DOMQuery'), m = b('DTSG'), n = b('Event'), o = b('Input'), p = b('Parent'), q = b('PHPQuerySerializer'), r = b('URI'), s = b('createArrayFrom'), t = b('getElementPosition'), u = b('trackReferrer'), v = 'FileList' in window, w = 'FormData' in window;
    function x(z) {
        var aa = {};
        q.serialize(z).split('&').forEach(function(ba) {
            if (ba) {
                var ca = /^([^=]*)(?:=(.*))?$/.exec(ba), da = r.decodeComponent(ca[1]), ea = ca[2] ? r.decodeComponent(ca[2]) : null;
                aa[da] = ea;
            }
        });
        return aa;
    }
    var y = {getInputs: function(z) {
            z = z || document;
            return [].concat(s(l.scry(z, 'input')), s(l.scry(z, 'select')), s(l.scry(z, 'textarea')), s(l.scry(z, 'button')));
        }, getInputsByName: function(z) {
            var aa = {};
            y.getInputs(z).forEach(function(ba) {
                var ca = aa[ba.name];
                aa[ba.name] = typeof ca === 'undefined' ? ba : [ba].concat(ca);
            });
            return aa;
        }, getSelectValue: function(z) {
            return z.options[z.selectedIndex].value;
        }, setSelectValue: function(z, aa) {
            for (var ba = 0; ba < z.options.length; ++ba)
                if (z.options[ba].value == aa) {
                    z.selectedIndex = ba;
                    break;
                }
        }, getRadioValue: function(z) {
            for (var aa = 0; aa < z.length; aa++)
                if (z[aa].checked)
                    return z[aa].value;
            return null;
        }, getElements: function(z) {
            return s(z.tagName == 'FORM' && z.elements != z ? z.elements : y.getInputs(z));
        }, getAttribute: function(z, aa) {
            return (z.getAttributeNode(aa) || {}).value || null;
        }, setDisabled: function(z, aa) {
            y.getElements(z).forEach(function(ba) {
                if (ba.disabled !== undefined) {
                    var ca = j.get(ba, 'origDisabledState');
                    if (aa) {
                        if (ca === undefined)
                            j.set(ba, 'origDisabledState', ba.disabled);
                        ba.disabled = aa;
                    } else if (ca === false)
                        ba.disabled = false;
                }
            });
        }, bootstrap: function(z, aa) {
            var ba = (y.getAttribute(z, 'method') || 'GET').toUpperCase();
            aa = p.byTag(aa, 'button') || aa;
            var ca = p.byClass(aa, 'stat_elem') || z;
            if (i.hasClass(ca, 'async_saving'))
                return;
            if (aa && (aa.form !== z || (aa.nodeName != 'INPUT' && aa.nodeName != 'BUTTON') || aa.type != 'submit')) {
                var da = l.scry(z, '.enter_submit_target')[0];
                da && (aa = da);
            }
            var ea = y.serialize(z, aa);
            y.setDisabled(z, true);
            var fa = y.getAttribute(z, 'ajaxify') || y.getAttribute(z, 'action');
            u(z, fa);
            var ga = new g(fa);
            ga.setData(ea).setNectarModuleDataSafe(z).setReadOnly(ba == 'GET').setMethod(ba).setRelativeTo(z).setStatusElement(ca).setInitialHandler(y.setDisabled.bind(null, z, false)).setHandler(function(ha) {
                n.fire(z, 'success', {response: ha});
            }).setErrorHandler(function(ha) {
                if (n.fire(z, 'error', {response: ha}) !== false)
                    h.defaultErrorHandler(ha);
            }).setFinallyHandler(y.setDisabled.bind(null, z, false)).send();
        }, forEachValue: function(z, aa, ba) {
            y.getElements(z).forEach(function(ca) {
                if (!ca.name || ca.disabled)
                    return;
                if (ca.type === 'submit')
                    return;
                if (ca.type === 'reset' || ca.type === 'button' || ca.type === 'image')
                    return;
                if ((ca.type === 'radio' || ca.type === 'checkbox') && !ca.checked)
                    return;
                if (ca.nodeName === 'SELECT') {
                    for (var da = 0, ea = ca.options.length; da < ea; da++) {
                        var fa = ca.options[da];
                        if (fa.selected)
                            ba('select', ca.name, fa.value);
                    }
                    return;
                }
                if (ca.type === 'file') {
                    if (v) {
                        var ga = ca.files;
                        for (var ha = 0; ha < ga.length; ha++)
                            ba('file', ca.name, ga.item(ha));
                    }
                    return;
                }
                ba(ca.type, ca.name, o.getValue(ca));
            });
            if (aa && aa.name && aa.type === 'submit' && l.contains(z, aa) && l.isNodeOfType(aa, ['input', 'button']))
                ba('submit', aa.name, aa.value);
        }, createFormData: function(z, aa) {
            if (!w)
                return null;
            var ba = new FormData();
            if (z)
                if (l.isNode(z)) {
                    y.forEachValue(z, aa, function(ea, fa, ga) {
                        ba.append(fa, ga);
                    });
                } else {
                    var ca = x(z);
                    for (var da in ca)
                        ba.append(da, ca[da]);
                }
            return ba;
        }, serialize: function(z, aa) {
            var ba = {};
            y.forEachValue(z, aa, function(ca, da, ea) {
                if (ca === 'file')
                    return;
                y._serializeHelper(ba, da, ea);
            });
            return y._serializeFix(ba);
        }, _serializeHelper: function(z, aa, ba) {
            var ca = Object.prototype.hasOwnProperty, da = /([^\]]+)\[([^\]]*)\](.*)/.exec(aa);
            if (da) {
                if (!z[da[1]] || !ca.call(z, da[1])) {
                    var ea;
                    z[da[1]] = ea = {};
                    if (z[da[1]] !== ea)
                        return;
                }
                var fa = 0;
                if (da[2] === '') {
                    while (z[da[1]][fa] !== undefined)
                        fa++;
                } else
                    fa = da[2];
                if (da[3] === '') {
                    z[da[1]][fa] = ba;
                } else
                    y._serializeHelper(z[da[1]], fa.concat(da[3]), ba);
            } else
                z[aa] = ba;
        }, _serializeFix: function(z) {
            for (var aa in z)
                if (z[aa] instanceof Object)
                    z[aa] = y._serializeFix(z[aa]);
            var ba = Object.keys(z);
            if (ba.length === 0 || ba.some(isNaN))
                return z;
            ba.sort(function(ea, fa) {
                return ea - fa;
            });
            var ca = 0, da = ba.every(function(ea) {
                return +ea === ca++;
            });
            if (da)
                return ba.map(function(ea) {
                    return z[ea];
                });
            return z;
        }, post: function(z, aa, ba) {
            var ca = document.createElement('form');
            ca.action = z.toString();
            ca.method = 'POST';
            ca.style.display = 'none';
            if (ba)
                ca.target = ba;
            aa.fb_dtsg = m.getToken();
            y.createHiddenInputs(aa, ca);
            l.getRootElement().appendChild(ca);
            ca.submit();
            return false;
        }, createHiddenInputs: function(z, aa, ba, ca) {
            ba = ba || {};
            var da = x(z);
            for (var ea in da) {
                if (da[ea] === null)
                    continue;
                if (ba[ea] && ca) {
                    ba[ea].value = da[ea];
                } else {
                    var fa = k.create('input', {type: 'hidden', name: ea, value: da[ea]});
                    ba[ea] = fa;
                    aa.appendChild(fa);
                }
            }
            return ba;
        }, getFirstElement: function(z, aa) {
            aa = aa || ['input[type="text"]', 'textarea', 'input[type="password"]', 'input[type="button"]', 'input[type="submit"]'];
            var ba = [];
            for (var ca = 0; ca < aa.length; ca++) {
                ba = l.scry(z, aa[ca]);
                for (var da = 0; da < ba.length; da++) {
                    var ea = ba[da];
                    try {
                        var ga = t(ea);
                        if (ga.y > 0 && ga.x > 0)
                            return ea;
                    } catch (fa) {
                    }
                }
            }
            return null;
        }, focusFirst: function(z) {
            var aa = y.getFirstElement(z);
            if (aa) {
                aa.focus();
                return true;
            }
            return false;
        }};
    e.exports = y;
});
__d("PluginOptin", ["DOMEvent", "DOMEventListener", "PluginMessage", "PopupWindow", "URI", "UserAgent", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('DOMEvent'), h = b('DOMEventListener'), i = b('PluginMessage'), j = b('PopupWindow'), k = b('URI'), l = b('UserAgent'), m = b('copyProperties');
    function n(o, p) {
        m(this, {return_params: k.getRequestURI().getQueryData(), login_params: {}, optin_params: {}, plugin: o, api_key: p});
        this.addReturnParams({ret: 'optin'});
        delete this.return_params.hash;
    }
    m(n.prototype, {addReturnParams: function(o) {
            m(this.return_params, o);
            return this;
        }, addLoginParams: function(o) {
            m(this.login_params, o);
            return this;
        }, addOptinParams: function(o) {
            m(this.optin_params, o);
            return this;
        }, start: function() {
            var o = new k('/dialog/plugin.optin').addQueryData(this.optin_params).addQueryData({app_id: this.api_key || 127760087237610, secure: k.getRequestURI().isSecure(), social_plugin: this.plugin, return_params: JSON.stringify(this.return_params), login_params: JSON.stringify(this.login_params)});
            if (l.mobile()) {
                o.setSubdomain('m');
            } else
                o.addQueryData({display: 'popup'});
            this.popup = j.open(o.toString(), 420, 450);
            i.listen();
            return this;
        }});
    n.starter = function(o, p, q, r) {
        var s = new n(o);
        s.addReturnParams(p || {});
        s.addLoginParams(q || {});
        s.addOptinParams(r || {});
        return s.start.bind(s);
    };
    n.listen = function(o, p, q, r, s) {
        h.add(o, 'click', function(t) {
            new g(t).kill();
            n.starter(p, q, r, s)();
        });
    };
    e.exports = n;
});
__d("csx", [], function(a, b, c, d, e, f) {
    function g(h) {
        throw new Error('csx(...): Unexpected class selector transformation.');
    }
    e.exports = g;
});
__d("PluginConnectButton", ["Arbiter", "CSS", "DOM", "DOMDimensions", "DOMEvent", "DOMEventListener", "Form", "Plugin", "PluginOptin", "Style", "URI", "copyProperties", "csx", "cx", "getElementPosition"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CSS'), i = b('DOM'), j = b('DOMDimensions'), k = b('DOMEvent'), l = b('DOMEventListener'), m = b('Form'), n = b('Plugin'), o = b('PluginOptin'), p = b('Style'), q = b('URI'), r = b('copyProperties'), s = b('csx'), t = b('cx'), u = b('getElementPosition'), v = g.SUBSCRIBE_NEW, w = g.subscribe, x = function(z, aa) {
        return l.add(z, 'click', aa);
    };
    function y(z) {
        this.config = z;
        this.busy = false;
        var aa = i.find(z.form, '.pluginConnectButton');
        this.buttons = aa;
        this.node_connected = i.find(aa, '.pluginConnectButtonConnected');
        this.node_disconnected = i.find(aa, '.pluginConnectButtonDisconnected');
        var ba = function(da) {
            new k(da).kill();
            if (!this.busy) {
                this.submit();
                this.busy = true;
            }
        }.bind(this);
        x(this.node_disconnected, ba);
        x(i.find(aa, '.pluginButtonX button'), ba);
        if (z.clickopensdialog)
            l.add(this.node_connected, 'click', function(da) {
                g.inform(n.DIALOG, da);
            }.bind(this));
        var ca = this.update.bind(this);
        w(n.CONNECT, ca, v);
        w(n.DISCONNECT, ca, v);
        w(n.ERROR, this.error.bind(this), v);
        w('Connect.Unsafe.xd/reposition', this.flip.bind(this));
        if (z.autosubmit)
            this.submit();
    }
    r(y.prototype, {update: function(z, event) {
            this.busy = false;
            var aa = this.config;
            if (event.identifier !== aa.identifier)
                return;
            var ba = z === n.CONNECT ? true : false, ca = "/plugins/" + aa.plugin + "/";
            ca += !ba ? "connect" : "disconnect";
            h[ba ? 'show' : 'hide'](this.node_connected);
            h[ba ? 'hide' : 'show'](this.node_disconnected);
            try {
                if (document.activeElement.nodeName.toLowerCase() === 'button') {
                    var ea = ba ? this.node_connected : this.node_disconnected, fa = i.find(ea, 'button');
                    fa.disabled = false;
                    fa.focus();
                }
            } catch (da) {
            }
            aa.connected = ba;
            aa.form.setAttribute('action', ca);
            aa.form.setAttribute('ajaxify', ca);
        }, error: function(event, z) {
            this.busy = false;
            if (z.action in {connect: 1, disconnect: 1}) {
                i.setContent(this.buttons, z.content);
                i.find(this.buttons, 'a').focus();
            }
        }, submit: function() {
            if (!this.config.canpersonalize)
                return this.login();
            m.bootstrap(this.config.form);
            this.fireStateToggle();
        }, fireStateToggle: function() {
            var z = this.config;
            if (z.connected) {
                n.disconnect(z.identifier);
            } else
                n.connect(z.identifier);
        }, login: function() {
            var z = this.config.plugin;
            new o(z, q.getRequestURI().getQueryData().api_key).addReturnParams({act: 'connect'}).start();
        }, flip: function(z, aa) {
            var ba = i.find(document.body, '.pluginConnectButtonLayoutRoot');
            h.toggleClass(ba, "_4-nd");
            var ca = i.find(document.body, "._4xn8"), da = i.scry(this.config.form, '.pluginConnectButtonConnected .pluginButtonIcon'), ea = p.get(da[0], 'display') !== 'none' ? da[0] : da[1], fa = (aa.type === 'restore') ? 6 : u(ea).x + j.getElementDimensions(ea).width / 2 - 6;
            p.set(ca, 'left', fa + 'px');
        }});
    e.exports = y;
});
__d("PluginConnection", ["Arbiter", "CSS", "Plugin", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CSS'), i = b('Plugin'), j = b('copyProperties'), k = function() {
    };
    j(k.prototype, {init: function(l, m, n, event) {
            event = event || i.CONNECT;
            this.identifier = l;
            this.element = m;
            this.css = n;
            g.subscribe([i.CONNECT, i.DISCONNECT], function(o, p) {
                if (l === p.href)
                    h[o === event ? 'addClass' : 'removeClass'](m, n);
                return true;
            });
            return this;
        }, connected: function() {
            return h.hasClass(this.element, this.css);
        }, connect: function() {
            return g.inform(i.CONNECT, {href: this.identifier}, g.BEHAVIOR_STATE);
        }, disconnect: function() {
            return g.inform(i.DISCONNECT, {href: this.identifier}, g.BEHAVIOR_STATE);
        }, toggle: function() {
            return this.connected() ? this.disconnect() : this.connect();
        }});
    k.init = function(l) {
        for (var m, n = 0; n < l.length; n++) {
            m = new k();
            m.init.apply(m, l[n]);
        }
    };
    e.exports = k;
});
__d("PluginError", ["DOMEvent", "DOMEventListener", "PopupWindow"], function(a, b, c, d, e, f) {
    var g = b('DOMEvent'), h = b('DOMEventListener'), i = b('PopupWindow'), j = {listen: function(k, l) {
            h.add(k, 'click', function(m) {
                i.open(l, 300, 445);
                new g(m).kill();
            });
        }};
    e.exports = j;
});
__d("debounceCore", [], function(a, b, c, d, e, f) {
    function g(h, i, j, k) {
        if (!k)
            k = setTimeout;
        var l;
        function m() {
            var n = Array.prototype.slice.call(arguments, 0);
            m.reset();
            l = k(function() {
                h.apply(j, n);
            }, i);
        }
        m.reset = function() {
            clearTimeout(l);
        };
        return m;
    }
    e.exports = g;
});
__d("debounce", ["debounceCore"], function(a, b, c, d, e, f) {
    var g = b('debounceCore');
    function h(i, j, k, l) {
        if (j == null)
            j = 100;
        var m = function(n, o, p) {
            return setTimeout(n, o, p, !l);
        };
        return g(i, j, k, m);
    }
    e.exports = h;
});
__d("TextInputControl", ["DOMControl", "Event", "Input", "copyProperties", "debounce"], function(a, b, c, d, e, f) {
    var g = b('DOMControl'), h = b('Event'), i = b('Input'), j = b('copyProperties'), k = b('debounce');
    for (var l in g)
        if (g.hasOwnProperty(l))
            n[l] = g[l];
    var m = g === null ? null : g.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = g;
    function n(o) {
        "use strict";
        g.call(this, o);
        var p = this.getRoot(), q = k(this.update.bind(this), 0);
        h.listen(p, {input: q, keydown: q, paste: q});
    }
    n.prototype.setMaxLength = function(o) {
        "use strict";
        i.setMaxLength(this.getRoot(), o);
        return this;
    };
    n.prototype.getValue = function() {
        "use strict";
        return i.getValue(this.getRoot());
    };
    n.prototype.isEmpty = function() {
        "use strict";
        return i.isEmpty(this.getRoot());
    };
    n.prototype.setValue = function(o) {
        "use strict";
        i.setValue(this.getRoot(), o);
        this.update();
        return this;
    };
    n.prototype.clear = function() {
        "use strict";
        return this.setValue('');
    };
    n.prototype.setPlaceholderText = function(o) {
        "use strict";
        i.setPlaceholder(this.getRoot(), o);
        return this;
    };
    e.exports = n;
});
__d("TextMetrics", ["Event", "DOM", "Style", "UserAgent", "debounce"], function(a, b, c, d, e, f) {
    var g = b('Event'), h = b('DOM'), i = b('Style'), j = b('UserAgent'), k = b('debounce'), l;
    function m() {
        if (typeof l === 'undefined') {
            var p = h.create('div', {className: 'webkitZoomTest'}), q = function() {
                h.appendContent(document.body, p);
                l = 100 / p.clientHeight;
                h.remove(p);
            };
            g.listen(window, 'resize', k(q, 100));
            q();
        }
        return l;
    }
    function n(p) {
        var q = p.clientWidth, r = (i.get(p, '-moz-box-sizing') == 'border-box');
        if (r)
            return q;
        var s = i.getFloat(p, 'paddingLeft') + i.getFloat(p, 'paddingRight');
        return q - s;
    }
    function o(p, q) {
        this._node = p;
        this._flexible = !!q;
        var r = 'textarea', s = 'textMetrics';
        if (this._flexible) {
            r = 'div';
            s += ' textMetricsInline';
        }
        this._shadow = h.create(r, {className: s});
        var t = ['fontSize', 'fontStyle', 'fontWeight', 'fontFamily', 'wordWrap'];
        t.forEach(function(v) {
            i.set(this._shadow, v, i.get(p, v));
        }.bind(this));
        var u = i.get(p, 'lineHeight');
        if (j.chrome() || j.webkit())
            u = Math.round(parseInt(u, 10) * m()) + 'px';
        i.set(this._shadow, 'lineHeight', u);
        document.body.appendChild(this._shadow);
    }
    o.prototype.measure = function(p) {
        var q = this._node, r = this._shadow;
        p = (p || q.value) + '...';
        if (!this._flexible) {
            var s = n(q);
            i.set(r, 'width', Math.max(s, 0) + 'px');
        }
        h.setContent(r, p);
        return {width: r.scrollWidth, height: r.scrollHeight};
    };
    o.prototype.destroy = function() {
        h.remove(this._shadow);
    };
    e.exports = o;
});
__d("classWithMixins", ["copyProperties"], function(a, b, c, d, e, f) {
    var g = b('copyProperties');
    function h(i, j) {
        var k = function() {
            i.apply(this, arguments);
        };
        k.prototype = g(Object.create(i.prototype), j.prototype);
        return k;
    }
    e.exports = h;
});
__d("TextAreaControl", ["Arbiter", "ArbiterMixin", "CSS", "DOMControl", "Event", "Style", "TextInputControl", "TextMetrics", "classWithMixins", "mixin"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('ArbiterMixin'), i = b('CSS'), j = b('DOMControl'), k = b('Event'), l = b('Style'), m = b('TextInputControl'), n = b('TextMetrics'), o = b('classWithMixins'), p = b('mixin');
    function q(v, w) {
        return l.getFloat(v, w) || 0;
    }
    var r = o(m, p(h));
    for (var s in r)
        if (r.hasOwnProperty(s))
            u[s] = r[s];
    var t = r === null ? null : r.prototype;
    u.prototype = Object.create(t);
    u.prototype.constructor = u;
    u.__superConstructor__ = r;
    function u(v) {
        "use strict";
        this.autogrow = i.hasClass(v, 'uiTextareaAutogrow');
        r.call(this, v);
        this.width = null;
        k.listen(v, 'focus', this._handleFocus.bind(this));
    }
    u.prototype.setAutogrow = function(v) {
        "use strict";
        this.autogrow = v;
        return this;
    };
    u.prototype.onupdate = function() {
        "use strict";
        t.onupdate.call(this);
        if (this.autogrow) {
            var v = this.getRoot();
            if (!this.metrics)
                this.metrics = new n(v);
            if (typeof this.initialHeight === 'undefined') {
                this.isBorderBox = l.get(v, 'box-sizing') === 'border-box' || l.get(v, '-moz-box-sizing') === 'border-box' || l.get(v, '-webkit-box-sizing') === 'border-box';
                this.borderBoxOffset = q(v, 'padding-top') + q(v, 'padding-bottom') + q(v, 'border-top-width') + q(v, 'border-bottom-width');
                this.initialHeight = v.offsetHeight - this.borderBoxOffset;
            }
            var w = this.metrics.measure(), x = Math.max(this.initialHeight, w.height);
            if (this.isBorderBox)
                x += this.borderBoxOffset;
            if (x !== this.height) {
                this.height = x;
                l.set(v, 'height', x + 'px');
                g.inform('reflow');
                this.inform('resize');
            }
        } else if (this.metrics) {
            this.metrics.destroy();
            this.metrics = null;
        }
    };
    u.prototype.resetHeight = function() {
        "use strict";
        this.height = -1;
        this.update();
    };
    u.prototype._handleFocus = function() {
        "use strict";
        this.width = null;
    };
    u.getInstance = function(v) {
        "use strict";
        return j.getInstance(v) || new u(v);
    };
    e.exports = u;
});
__d("PluginFlyout", ["Arbiter", "CSS", "DOM", "DOMEvent", "DOMEventListener", "Form", "Plugin", "copyProperties", "csx", "cx", "TextAreaControl"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CSS'), i = b('DOM'), j = b('DOMEvent'), k = b('DOMEventListener'), l = b('Form'), m = b('Plugin'), n = b('copyProperties'), o = b('csx'), p = b('cx'), q = b('TextAreaControl'), r = g.SUBSCRIBE_NEW, s = g.subscribe, t = g.inform, u = function(w, x) {
        return k.add(w, 'click', x);
    };
    function v(w, x, y) {
        var z = this, aa = s(m.CONNECT, function(event, ba) {
            g.unsubscribe(aa);
            z.init(w, x, y);
            z.connect(event, ba);
        }, r);
        s(m.DIALOG, function() {
            z.init(w, x, y);
            z.toggle();
        }, r);
    }
    n(v.prototype, {init: function(w, x, y) {
            if (this.initialized)
                return;
            this.initialized = true;
            i.appendContent(w, JSON.parse(y));
            var z = i.find(w, 'form'), aa = i.find(z, "._56zw"), ba = i.find(z, "._56zx"), ca = i.find(z, "._5ymy");
            k.add(ca, 'keyup', function(ga) {
                h.conditionClass(aa, "_42fr", !q.getInstance(ca).getValue());
                aa.disabled = !q.getInstance(ca).getValue();
            });
            var da = (x === 'tiny') ? i.find(document.body, '.pluginPostFlyoutPrompt') : null;
            this.flyout = w;
            this.form = z;
            this.post_button = aa;
            this.prompt = da;
            var ea = this.hide.bind(this), fa = this.show.bind(this);
            u(ba, function(ga) {
                new j(ga).kill();
                ea();
            });
            if (da)
                u(da, function(ga) {
                    new j(ga).kill();
                    fa();
                });
            s(m.CONNECT, this.connect.bind(this), r);
            s(m.DISCONNECT, function() {
                ea();
            }, r);
            s(v.SUCCESS, function() {
                ea();
                if (da)
                    h.hide(da);
            }, r);
            s(m.ERROR, function(event, ga) {
                if (ga.action !== 'comment')
                    return;
                i.setContent(i.find(z, "._56zy"), ga.content);
                h.hide(aa);
            }, r);
            k.add(z, 'submit', function(ga) {
                new j(ga).kill();
                var ha = i.scry(z, 'textarea')[0];
                if (ha && !new q(ha).getValue()) {
                    ha.focus();
                } else
                    l.bootstrap(z);
            });
        }, connect: function(event, w) {
            if (w.crossFrame)
                return;
            if (this.prompt)
                return h.show(this.prompt);
            if (!w.story_fbid)
                this.show();
        }, show: function() {
            this.shown = true;
            h.show(this.flyout);
            h.show(this.post_button);
            this.form.comment.focus();
            t(v.SHOW);
        }, hide: function() {
            this.shown = false;
            h.hide(this.flyout);
            t(v.HIDE);
        }, toggle: function() {
            if (this.shown) {
                this.hide();
            } else
                this.show();
        }});
    n(v, {SUCCESS: 'platform/plugins/flyout/success', SHOW: 'platform/plugins/flyout/show', HIDE: 'platform/plugins/flyout/hide', success: function() {
            t(v.SUCCESS);
        }});
    e.exports = v;
});
__d("sprintf", [], function(a, b, c, d, e, f) {
    function g(h) {
        var i = Array.prototype.slice.call(arguments, 1), j = 0;
        return h.replace(/%s/g, function(k) {
            return i[j++];
        });
    }
    e.exports = g;
});
__d("Log", ["sprintf"], function(a, b, c, d, e, f) {
    var g = b('sprintf'), h = {DEBUG: 3, INFO: 2, WARNING: 1, ERROR: 0};
    function i(k, l) {
        var m = Array.prototype.slice.call(arguments, 2), n = g.apply(null, m), o = window.console;
        if (o && j.level >= l)
            o[k in o ? k : 'log'](n);
    }
    var j = {level: -1, Level: h, debug: i.bind(null, 'debug', h.DEBUG), info: i.bind(null, 'info', h.INFO), warn: i.bind(null, 'warn', h.WARNING), error: i.bind(null, 'error', h.ERROR)};
    e.exports = j;
});
__d("resolveWindow", [], function(a, b, c, d, e, f) {
    function g(h) {
        var i = window, j = h.split('.');
        try {
            for (var l = 0; l < j.length; l++) {
                var m = j[l], n = /^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(m);
                if (n) {
                    i = i.frames[n[1]];
                } else if (m === 'opener' || m === 'parent' || m === 'top') {
                    i = i[m];
                } else
                    return null;
            }
        } catch (k) {
            return null;
        }
        return i;
    }
    e.exports = g;
});
__d("XD", ["Arbiter", "DOM", "DOMDimensions", "Log", "PHPQuerySerializer", "URI", "copyProperties", "isInIframe", "resolveWindow"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('DOM'), i = b('DOMDimensions'), j = b('Log'), k = b('PHPQuerySerializer'), l = b('URI'), m = b('copyProperties'), n = b('isInIframe'), o = b('resolveWindow'), p = 'fb_xdm_frame_' + location.protocol.replace(':', ''), q = {_callbacks: [], _opts: {autoResize: false, allowShrink: true, channelUrl: null, hideOverflow: false, resizeTimeout: 1000, resizeWidth: false, expectResizeAck: false, resizeAckTimeout: 6000}, _lastResizeAckId: 0, _resizeCount: 0, _resizeTimestamp: 0, _shrinker: null, init: function(s) {
            this._opts = m(m({}, this._opts), s);
            if (this._opts.autoResize)
                this._startResizeMonitor();
            g.subscribe('Connect.Unsafe.resize.ack', function(t, u) {
                if (!u.id)
                    u.id = this._resizeCount;
                if (u.id > this._lastResizeAckId)
                    this._lastResizeAckId = u.id;
            }.bind(this));
        }, send: function(s, t) {
            t = t || this._opts.channelUrl;
            if (!t)
                return;
            var u = {}, v = new l(t);
            m(u, s);
            m(u, k.deserialize(v.getFragment()));
            var w = l(u.origin).getOrigin(), x = o(u.relation.replace(/^parent\./, '')), y = 50, z = function() {
                var aa = x.frames[p];
                try {
                    aa.proxyMessage(k.serialize(u), w);
                } catch (ba) {
                    if (--y) {
                        setTimeout(z, 100);
                    } else
                        j.warn('No such frame "' + p + '" to proxyMessage to');
                }
            };
            z();
        }, _computeSize: function() {
            var s = i.getDocumentDimensions(), t = 0;
            if (this._opts.resizeWidth) {
                var u = document.body;
                if (u.clientWidth < u.scrollWidth) {
                    t = s.width;
                } else {
                    var v = u.childNodes;
                    for (var w = 0; w < v.length; w++) {
                        var x = v[w], y = x.offsetLeft + x.offsetWidth;
                        if (y > t)
                            t = y;
                    }
                }
                t = Math.max(t, q.forced_min_width);
            }
            s.width = t;
            if (this._opts.allowShrink) {
                if (!this._shrinker)
                    this._shrinker = h.create('div');
                h.appendContent(document.body, this._shrinker);
                s.height = Math.max(this._shrinker.offsetTop, 0);
            }
            return s;
        }, _startResizeMonitor: function() {
            var s, t = document.documentElement;
            if (this._opts.hideOverflow) {
                t.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            }
            var u = (function() {
                var v = this._computeSize(), w = Date.now(), x = this._lastResizeAckId < this._resizeCount && (w - this._resizeTimestamp) > this._opts.resizeAckTimeout;
                if (!s || (this._opts.expectResizeAck && x) || (this._opts.allowShrink && s.width != v.width) || (!this._opts.allowShrink && s.width < v.width) || (this._opts.allowShrink && s.height != v.height) || (!this._opts.allowShrink && s.height < v.height)) {
                    s = v;
                    this._resizeCount++;
                    this._resizeTimestamp = w;
                    var y = {type: 'resize', height: v.height, ackData: {id: this._resizeCount}};
                    if (v.width && v.width != 0)
                        y.width = v.width;
                    try {
                        if (l(document.referrer).isFacebookURI() && n() && window.name && window.parent.location && window.parent.location.toString && l(window.parent.location).isFacebookURI()) {
                            var aa = window.parent.document.getElementsByTagName('iframe');
                            for (var ba = 0; ba < aa.length; ba = ba + 1)
                                if (aa[ba].name == window.name) {
                                    if (this._opts.resizeWidth)
                                        aa[ba].style.width = y.width + 'px';
                                    aa[ba].style.height = y.height + 'px';
                                }
                        }
                        this.send(y);
                    } catch (z) {
                        this.send(y);
                    }
                }
            }).bind(this);
            u();
            setInterval(u, this._opts.resizeTimeout);
        }}, r = m({}, q);
    e.exports.UnverifiedXD = r;
    e.exports.XD = q;
    a.UnverifiedXD = r;
    a.XD = q;
});
__d("UnverifiedXD", ["XD", "XDUnverifiedChannel"], function(a, b, c, d, e, f) {
    var g = b('XD').UnverifiedXD, h = c('XDUnverifiedChannel').channel;
    g.init({channelUrl: h});
    e.exports = g;
});
__d("Locale", ["Style"], function(a, b, c, d, e, f) {
    var g = b('Style'), h, i = {isRTL: function() {
            if (h === undefined)
                h = ('rtl' === g.get(document.body, 'direction'));
            return h;
        }};
    e.exports = i;
});
__d("PluginResize", ["Log", "UnverifiedXD", "copyProperties", "Locale"], function(a, b, c, d, e, f) {
    var g = b('Log'), h = b('UnverifiedXD'), i = b('copyProperties'), j = b('Locale');
    function k(n) {
        n = n || document.body;
        var o = 0;
        if (j.isRTL() && n.offsetParent) {
            o = n.offsetParent.offsetWidth - n.offsetLeft - n.offsetWidth;
        } else if (!j.isRTL())
            o = n.offsetLeft;
        return n.offsetWidth + o;
    }
    function l(n) {
        n = n || document.body;
        return n.offsetHeight + n.offsetTop;
    }
    function m(n, o, event, p) {
        this.calcWidth = n || k;
        this.calcHeight = o || l;
        this.width = undefined;
        this.height = undefined;
        this.reposition = !!p;
        this.event = event || 'resize';
    }
    i(m.prototype, {resize: function() {
            var n = this.calcWidth(), o = this.calcHeight();
            if (n !== this.width || o !== this.height) {
                g.debug('Resizing Plugin: (%s, %s, %s, %s)', n, o, this.event, this.reposition);
                this.width = n;
                this.height = o;
                h.send({type: this.event, width: n, height: o, reposition: this.reposition});
            }
            return this;
        }, auto: function(n) {
            setInterval(this.resize.bind(this), n || 250);
            return this;
        }});
    m.auto = function(n, event, o) {
        return new m(k.bind(null, n), l.bind(null, n), event).resize().auto(o);
    };
    m.autoHeight = function(n, o, event, p) {
        return new m(function() {
            return n;
        }, l.bind(null, o), event).resize().auto(p);
    };
    e.exports = m;
});
__d("PluginFlyoutDialog", ["Arbiter", "DOMDimensions", "DOMEvent", "DOMEventListener", "DOMQuery", "PluginFlyout", "PluginResize", "copyProperties", "getElementPosition"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('DOMDimensions'), i = b('DOMEvent'), j = b('DOMEventListener'), k = b('DOMQuery'), l = b('PluginFlyout'), m = b('PluginResize'), n = b('copyProperties'), o = b('getElementPosition');
    function p(q, r, s) {
        this.parent = new l(q, r, s);
        this.flyout = q;
        g.subscribe(l.SHOW, this.show.bind(this), g.SUBSCRIBE_NEW);
    }
    n(p.prototype, {show: function() {
            if (this.subscribed)
                return;
            this.subscribed = 1;
            var q = window.ServerJSAsyncLoader;
            q && q.ondemandjs && q.run(q.ondemandjs);
            j.add(this.flyout.parentNode, 'click', (function(u) {
                u = new i(u);
                if (u.target === this.flyout.parentNode) {
                    u.kill();
                    this.parent.hide();
                }
            }).bind(this));
            var r = this.flyout, s = k.find(document.body, '.pluginConnectButtonLayoutRoot');
            function t() {
                return k.scry(document.body, '.uiTypeaheadView').map(function(u) {
                    var v = o(u), w = h.getElementDimensions(u);
                    return {x: v.x + w.width, y: v.y + w.height};
                });
            }
            new m(function() {
                return Math.max(s.offsetWidth, r.offsetWidth, t().map(function(u) {
                    return u.x;
                }));
            }, function() {
                return Math.max(s.offsetHeight, r.offsetHeight + r.offsetTop, t().map(function(u) {
                    return u.y;
                }));
            }, 'resize.iframe', true).resize().auto();
        }});
    e.exports = p;
});
__d("PluginLayout", ["Arbiter", "PluginResize", "PluginFlyout", "Style"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('PluginResize'), i = b('PluginFlyout'), j = b('Style');
    function k(l, m, n) {
        if (m)
            j.set(l, 'width', m + 'px');
        var o = new h(function() {
            return m || l.offsetWidth;
        }, function() {
            return l.offsetHeight;
        }, 'resize.flow').resize().auto();
        g.subscribe([i.HIDE], o.resize.bind(o), g.SUBSCRIBE_NEW);
    }
    e.exports = k;
});
__d("PluginSend", ["Arbiter", "CSS", "DOMDimensions", "DOMQuery", "PluginOptin", "UnverifiedXD", "copyProperties", "getElementPosition"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CSS'), i = b('DOMDimensions'), j = b('DOMQuery'), k = b('PluginOptin'), l = b('UnverifiedXD'), m = b('copyProperties'), n = b('getElementPosition'), o = 'platform/socialplugins/dialog', p = 'platform/socialplugins/send/sent', q = 'platform/socialplugins/send/cancel', r = false, s = false, t = {type: 'presentEdgeCommentDialog', controllerID: '', widget_type: 'send', nodeURL: '', width: 400, height: 300, query: {}}, u = {close: 'dismissEdgeCommentDialog', show: 'showEdgeCommentDialog', hide: 'hideEdgeCommentDialog'}, v = {element: null, href: '', canpersonalize: false, plugin: 'send'}, w, x, y = '';
    function z() {
        new k(v.plugin).addReturnParams({act: "send"}).start();
    }
    function aa(da) {
        if (!v.canpersonalize)
            return z();
        if (typeof da !== 'string')
            if (!r) {
                da = 'open';
            } else if (s) {
                da = 'hide';
            } else
                da = 'show';
        switch (da) {
            case 'open':
                g.inform(o, {controllerID: y, event: da});
                r = s = true;
                var ea = i.getElementDimensions(x), fa = n(x);
                t.anchorGeometry = {x: ea.width, y: ea.height};
                t.anchorPosition = {x: fa.x, y: fa.y};
                var ga = ba();
                t.query.anchorTargetX = ga.x;
                t.query.anchorTargetY = ga.y;
                l.send(t);
                break;
            case 'close':
                g.inform(o, {controllerID: y, event: da});
                r = s = false;
                break;
            case 'show':
                s = true;
                break;
            default:
                s = false;
                break;
        }
        h[s ? 'show' : 'hide'](w);
        h[s ? 'hide' : 'show'](x);
        if (da !== 'open')
            l.send({type: u[da]});
    }
    function ba() {
        var da = j.find(x, '.pluginButtonIcon'), ea = n(da), fa = i.getElementDimensions(da);
        return {y: ea.y + fa.width / 2, x: ea.x + fa.height / 2};
    }
    var ca = {init: function(da) {
            m(v, da);
            y = t.controllerID = v.element.id;
            t.nodeURL = v.href;
            w = j.find(v.element, '.pluginSendActive');
            x = j.find(v.element, '.pluginSendInactive');
            v.element.onclick = aa;
            g.subscribe(q, function(ea, fa) {
                if (fa.controllerID === y)
                    aa('hide');
            }, g.SUBSCRIBE_NEW);
            g.subscribe(p, function(ea, fa) {
                if (fa.controllerID === y)
                    aa('close');
            }, g.SUBSCRIBE_NEW);
            if (da.autosubmit)
                aa('open');
        }};
    a.Arbiter = g;
    e.exports = ca;
});
__d("PluginSendX", ["Arbiter", "CSS", "DOM", "DOMDimensions", "DOMEvent", "DOMEventListener", "Focus", "Plugin", "PluginOptin", "PluginResize", "Style", "copyProperties", "csx", "cx", "getElementPosition"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('CSS'), i = b('DOM'), j = b('DOMDimensions'), k = b('DOMEvent'), l = b('DOMEventListener'), m = b('Focus'), n = b('Plugin'), o = b('PluginOptin'), p = b('PluginResize'), q = b('Style'), r = b('copyProperties'), s = b('csx'), t = b('cx'), u = b('getElementPosition'), v = function(w, x, y, z, aa, ba) {
        if (aa)
            new p(function() {
                return w.offsetWidth;
            }, function() {
                return w.offsetHeight;
            }).resize();
        if (!z) {
            var ca = new o('send').addReturnParams({act: 'send'});
            l.add(x, 'click', ca.start.bind(ca));
            return;
        }
        var da = false, ea = false;
        function fa() {
            ea = !ea;
            h.toggle(x);
            h.toggle(y);
            h.toggle(z);
            var ga = i.find(z, '.textInput');
            if (ea) {
                m.set(ga);
            } else {
                var ha = i.find(x, 'button');
                m.set(ha);
            }
            if (!da) {
                var ia = window.ServerJSAsyncLoader;
                ia && ia.ondemandjs && ia.run(ia.ondemandjs);
                da = true;
            }
            new p(function() {
                return Math.max(w.offsetWidth, z.offsetWidth);
            }, function() {
                return Math.max(w.offsetHeight, z.offsetHeight + z.offsetTop);
            }, 'resize.iframe', true).resize();
        }
        l.add(x, 'click', fa);
        l.add(y, 'click', fa);
        l.add(w.parentNode, 'click', function(ga) {
            ga = new k(ga);
            if (ga.target === w.parentNode) {
                ga.kill();
                fa();
            }
        });
        g.subscribe(v.CLOSE, fa);
        g.subscribe(n.ERROR, function(event, ga) {
            i.setContent(w, ga.content);
            fa();
        });
        g.subscribe('Connect.Unsafe.xd/reposition', function(ga, ha) {
            h.toggleClass(w, "_4-nd");
            var ia = i.find(z, "._4xn8"), ja = i.find(w, '.pluginButtonPressed .pluginButtonIcon'), ka = (ha.type === 'restore') ? 6 : u(ja).x + j.getElementDimensions(ja).width / 2 - 6;
            q.set(ia, 'left', ka + 'px');
        });
        if (ba)
            fa();
    };
    r(v, {SUCCESS: 'platform/plugins/send/success', CLOSE: 'platform/plugins/send/close', success: function() {
            g.inform(this.SUCCESS);
        }});
    e.exports = v;
});
__d("AsyncDOM", ["CSS", "DOM"], function(a, b, c, d, e, f) {
    var g = b('CSS'), h = b('DOM'), i = {invoke: function(j, k) {
            for (var l = 0; l < j.length; ++l) {
                var m = j[l], n = m[0], o = m[1], p = m[2], q = m[3], r = (p && k) || null;
                if (o)
                    r = h.scry(r || document.documentElement, o)[0];
                switch (n) {
                    case 'eval':
                        (new Function(q)).apply(r);
                        break;
                    case 'hide':
                        g.hide(r);
                        break;
                    case 'show':
                        g.show(r);
                        break;
                    case 'setContent':
                        h.setContent(r, q);
                        break;
                    case 'appendContent':
                        h.appendContent(r, q);
                        break;
                    case 'prependContent':
                        h.prependContent(r, q);
                        break;
                    case 'insertAfter':
                        h.insertAfter(r, q);
                        break;
                    case 'insertBefore':
                        h.insertBefore(r, q);
                        break;
                    case 'remove':
                        h.remove(r);
                        break;
                    case 'replace':
                        h.replace(r, q);
                        break;
                    default:
                }
            }
        }};
    e.exports = i;
});
__d("getUnboundedScrollPosition", [], function(a, b, c, d, e, f) {
    "use strict";
    function g(h) {
        if (h === window)
            return {x: window.pageXOffset || document.documentElement.scrollLeft, y: window.pageYOffset || document.documentElement.scrollTop};
        return {x: h.scrollLeft, y: h.scrollTop};
    }
    e.exports = g;
});
__d("Vector", ["DOMDimensions", "Event", "copyProperties", "getElementPosition", "getUnboundedScrollPosition"], function(a, b, c, d, e, f) {
    var g = b('DOMDimensions'), h = b('Event'), i = b('copyProperties'), j = b('getElementPosition'), k = b('getUnboundedScrollPosition');
    function l(m, n, o) {
        "use strict";
        i(this, {x: parseFloat(m), y: parseFloat(n), domain: o || 'pure'});
    }
    l.prototype.toString = function() {
        "use strict";
        return '(' + this.x + ', ' + this.y + ')';
    };
    l.prototype.add = function(m, n) {
        "use strict";
        if (arguments.length == 1) {
            if (m.domain != 'pure')
                m = m.convertTo(this.domain);
            return this.add(m.x, m.y);
        }
        var o = parseFloat(m), p = parseFloat(n);
        return new l(this.x + o, this.y + p, this.domain);
    };
    l.prototype.mul = function(m, n) {
        "use strict";
        if (typeof n == "undefined")
            n = m;
        return new l(this.x * m, this.y * n, this.domain);
    };
    l.prototype.div = function(m, n) {
        "use strict";
        if (typeof n == "undefined")
            n = m;
        return new l(this.x * 1 / m, this.y * 1 / n, this.domain);
    };
    l.prototype.sub = function(m, n) {
        "use strict";
        if (arguments.length == 1) {
            return this.add(m.mul(-1));
        } else
            return this.add(-m, -n);
    };
    l.prototype.distanceTo = function(m) {
        "use strict";
        return this.sub(m).magnitude();
    };
    l.prototype.magnitude = function() {
        "use strict";
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    l.prototype.rotate = function(m) {
        "use strict";
        return new l(this.x * Math.cos(m) - this.y * Math.sin(m), this.x * Math.sin(m) + this.y * Math.cos(m));
    };
    l.prototype.convertTo = function(m) {
        "use strict";
        if (m != 'pure' && m != 'viewport' && m != 'document')
            return new l(0, 0);
        if (m == this.domain)
            return new l(this.x, this.y, this.domain);
        if (m == 'pure')
            return new l(this.x, this.y);
        if (this.domain == 'pure')
            return new l(0, 0);
        var n = l.getScrollPosition('document'), o = this.x, p = this.y;
        if (this.domain == 'document') {
            o -= n.x;
            p -= n.y;
        } else {
            o += n.x;
            p += n.y;
        }
        return new l(o, p, m);
    };
    l.prototype.setElementPosition = function(m) {
        "use strict";
        var n = this.convertTo('document');
        m.style.left = parseInt(n.x) + 'px';
        m.style.top = parseInt(n.y) + 'px';
        return this;
    };
    l.prototype.setElementDimensions = function(m) {
        "use strict";
        return this.setElementWidth(m).setElementHeight(m);
    };
    l.prototype.setElementWidth = function(m) {
        "use strict";
        m.style.width = parseInt(this.x, 10) + 'px';
        return this;
    };
    l.prototype.setElementHeight = function(m) {
        "use strict";
        m.style.height = parseInt(this.y, 10) + 'px';
        return this;
    };
    l.prototype.scrollElementBy = function(m) {
        "use strict";
        if (m == document.body) {
            window.scrollBy(this.x, this.y);
        } else {
            m.scrollLeft += this.x;
            m.scrollTop += this.y;
        }
        return this;
    };
    l.getEventPosition = function(m, n) {
        "use strict";
        n = n || 'document';
        var o = h.getPosition(m), p = new l(o.x, o.y, 'document');
        return p.convertTo(n);
    };
    l.getScrollPosition = function(m) {
        "use strict";
        m = m || 'document';
        var n = k(window);
        return new l(n.x, n.y, 'document').convertTo(m);
    };
    l.getElementPosition = function(m, n) {
        "use strict";
        n = n || 'document';
        var o = j(m);
        return new l(o.x, o.y, 'viewport').convertTo(n);
    };
    l.getElementDimensions = function(m) {
        "use strict";
        var n = g.getElementDimensions(m);
        return new l(n.width, n.height);
    };
    l.getViewportDimensions = function() {
        "use strict";
        var m = g.getViewportDimensions();
        return new l(m.width, m.height, 'viewport');
    };
    l.getViewportWithoutScrollbarDimensions = function() {
        "use strict";
        var m = g.getViewportWithoutScrollbarDimensions();
        return new l(m.width, m.height, 'viewport');
    };
    l.getDocumentDimensions = function(m) {
        "use strict";
        var n = g.getDocumentDimensions(m);
        return new l(n.width, n.height, 'document');
    };
    l.deserialize = function(m) {
        "use strict";
        var n = m.split(',');
        return new l(n[0], n[1]);
    };
    e.exports = l;
});
__d("throttle", ["copyProperties"], function(a, b, c, d, e, f) {
    var g = b('copyProperties');
    function h(j, k, l) {
        return i(j, k, l, false, false);
    }
    g(h, {acrossTransitions: function(j, k, l) {
            return i(j, k, l, true, false);
        }, withBlocking: function(j, k, l) {
            return i(j, k, l, false, true);
        }, withInitialDelay: function(j, k, l, m) {
            return i(j, k, l, false, false, m);
        }});
    function i(j, k, l, m, n, o) {
        if (k == null)
            k = 100;
        var p, q, r, s = function() {
            q = Date.now();
            if (p) {
                j.apply(l, p);
                p = null;
                r = setTimeout(s, k);
            } else
                r = false;
        };
        s = s.bind(null, !m);
        return function t() {
            p = arguments;
            if (!r || (Date.now() - q > k))
                if (n) {
                    s();
                } else
                    r = setTimeout(s, 0);
        };
    }
    e.exports = h;
});
__d("MorePagerFetchOnScroll", ["AsyncRequest", "DOMQuery", "Event", "Style", "Vector", "throttle"], function(a, b, c, d, e, f) {
    var g = b('AsyncRequest'), h = b('DOMQuery'), i = b('Event'), j = b('Style'), k = b('Vector'), l = b('throttle');
    function m(n, o) {
        "use strict";
        this._pager = n;
        this._offset = o || 0;
        this._scrollParent = j.getScrollParent(n);
        this.setPagerInViewHandler(this._defaultPagerInViewHandler.bind(this));
        if (!this.check())
            this._scrollListener = i.listen(this._scrollParent, 'scroll', l(function() {
                this.check();
            }.bind(this), 50));
    }
    m.prototype.check = function() {
        "use strict";
        if (!h.contains(document.body, this._pager)) {
            this.removeScrollListener();
            return true;
        }
        var n = k.getElementPosition(this._pager).y, o = this._scrollParent === window ? k.getViewportDimensions().y : k.getElementDimensions(this._scrollParent).y, p = this._scrollParent === window ? k.getScrollPosition().y + o : k.getElementPosition(this._scrollParent).y + o;
        if (n - this._offset < p) {
            this._inViewHandler();
            this.removeScrollListener();
            return true;
        }
        return false;
    };
    m.prototype.removeScrollListener = function() {
        "use strict";
        this._scrollListener && this._scrollListener.remove();
    };
    m.prototype.setPagerInViewHandler = function(n) {
        "use strict";
        this._inViewHandler = n;
        return this;
    };
    m.prototype._defaultPagerInViewHandler = function() {
        "use strict";
        var n = h.scry(this._pager, 'a')[0];
        if (n)
            g.bootstrap(n.getAttribute('ajaxify') || n.href, n);
    };
    e.exports = m;
});
__d("PluginLikebox", ["AsyncDOM", "AsyncRequest", "CSS", "DOMEvent", "DOMEventListener", "DOMQuery", "MorePagerFetchOnScroll", "copyProperties"], function(a, b, c, d, e, f) {
    var g = b('AsyncDOM'), h = b('AsyncRequest'), i = b('CSS'), j = b('DOMEvent'), k = b('DOMEventListener'), l = b('DOMQuery'), m = b('MorePagerFetchOnScroll'), n = b('copyProperties');
    function o(p, q) {
        this.stream_id = p;
        this.force_wall = q;
        this.load();
        k.add(l.find(document.body, '.pluginLikeboxStream'), 'click', function(r) {
            var s = new j(r), t = s.target.parentNode;
            if (i.hasClass(t, 'text_exposed_link')) {
                s.kill();
                i.addClass(l.find(t, '^.text_exposed_root'), 'text_exposed');
            }
        });
    }
    n(o.prototype, {load: function(p) {
            new h().setMethod('GET').setURI('/plugins/likebox/stream').setData({id: this.stream_id, dom: p ? 'pluginLikeboxMoreStories' : 'pluginLikeboxStream', force_wall: this.force_wall, nobootload: 1, inlinecss: 1, max_timestamp: p}).setReadOnly(true).setErrorHandler(function() {
            }).setHandler(this.handleResponse.bind(this)).send();
        }, handleResponse: function(p) {
            if (p.inlinecss) {
                var q = document.createElement('style');
                q.setAttribute("type", "text/css");
                document.getElementsByTagName('head')[0].appendChild(q);
                if (q.styleSheet) {
                    q.styleSheet.cssText = p.inlinecss;
                } else
                    q.appendChild(document.createTextNode(p.inlinecss));
            }
            g.invoke(p.domops);
            var r = l.scry(document.body, "#pluginLikeboxMoreStories a");
            if (!r.length)
                return;
            r = r[0];
            var s = function() {
                this.load(parseInt(r.getAttribute('data-timestamp'), 10));
                var t = l.find(r.parentNode, '.uiMorePagerLoader');
                i.addClass(t, 'uiMorePagerPrimary');
                i.removeClass(t, 'uiMorePagerLoader');
                i.hide(r);
            }.bind(this);
            k.add(r, 'click', function(t) {
                new j(t).kill();
                s();
            });
            new m(r, 0).setPagerInViewHandler(s);
        }});
    e.exports = o;
});
__d("PluginXDReady", ["Arbiter", "UnverifiedXD"], function(a, b, c, d, e, f) {
    var g = b('Arbiter'), h = b('UnverifiedXD'), i = {handleMessage: function(j) {
            if (!j.method)
                return;
            try {
                g.inform('Connect.Unsafe.' + j.method, JSON.parse(j.params), g.BEHAVIOR_PERSISTENT);
            } catch (k) {
            }
        }};
    a.XdArbiter = i;
    h.send({xd_action: 'plugin_ready', name: window.name});
    e.exports = null;
});
__d("LinkshimAsyncLink", ["$", "AsyncSignal", "DOM", "UserAgent"], function(a, b, c, d, e, f) {
    var g = b('$'), h = b('AsyncSignal'), i = b('DOM'), j = b('UserAgent'), k = {swap: function(l, m) {
            var n = j.ie() <= 8;
            if (n) {
                var o = i.create('wbr', {}, null);
                i.appendContent(l, o);
            }
            l.href = m;
            if (n)
                i.remove(o);
        }, referrer_log: function(l, m, n) {
            var o = g('meta_referrer');
            o.content = "origin";
            k.swap(l, m);
            setTimeout(function() {
                o.content = "default";
                new h(n, {}).send();
            }, 100);
        }};
    e.exports = k;
});
__d("legacy:dom-asynclinkshim", ["LinkshimAsyncLink"], function(a, b, c, d) {
    a.LinkshimAsyncLink = b('LinkshimAsyncLink');
}, 3);