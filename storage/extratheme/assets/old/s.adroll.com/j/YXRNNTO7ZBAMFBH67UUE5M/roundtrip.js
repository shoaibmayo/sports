try {

    __adroll.load_adroll_tpc(__adroll.render_advertisable_cell);
} catch (e) {}

try {
    function __adroll__() {
        this.pxlstart = (new Date).getTime();
        this.version = "2.0";
        this.exp = 8760;
        this.eexp = 720;
        this.pv = 1E11 * Math.random();
        this.__adc = "__ar_v4";
        this._loaded = this._broken = !1;
        this._url = 2E3;
        this._kwl = 300;
        this._r = {};
        this._logs = [];
        this.cm_urls = [];
        this.consent_networks = {
            facebook: "f",
            linkedin: "linkedin"
        };
        this.pixelstart = this.session_time = 0;
        this._init_idb();
        this._init_floc_trial();
        for (var a = Array(4), b = 0; b < a.length; b++) a[b] = (Math.round(1E11 * Math.random()).toString(16) + Array(9).join("0")).substr(0,
            8);
        this._set_global("adroll_sid", a.join(""));
        this.set_webworker_vars();
        this._has_global("adroll_adv_id") && (this.init_pixchk(), this.trigger_gtm_consent_event(), this.load_pixel_assistant(), ["adroll_adv_id", "adroll_pix_id"].forEach(function(a) {
            window.hasOwnProperty(a) && ("string" === typeof window[a] || window[a] instanceof String) && (window[a] = window[a].replace(/[^A-Z0-9_]/g, ""))
        }));
        window.adroll = window.adroll || {};
        window.adroll.identify_email = this.identify_email.bind(this);
        a = "ABCDEFG".split("");
        this._has_global("adroll_adv_id") &&
            0 <= a.indexOf(window.adroll_adv_id.substr(0, 1)) && this._pixel_timing(!0, !0, null)
    };
    __adroll__.prototype._sync_page_category = function() {
        var a = this;
        if (a.is_under_experiment("pxlcat")) {
            var b = a._global("__adroll_upl_category");
            if (a._is_defined(b) && -1 === window.navigator.userAgent.indexOf("Mobile") && "generated" !== a._get_fpc_source()) {
                var c = window.localStorage.getItem("adroll_pxlcat") || 0,
                    d = (new Date).getTime();
                c > d - 864E5 || window.setTimeout(function() {
                    try {
                        var c = window.document.documentElement || window.document.getElementsByTagName("html")[0],
                            g = a._lzstring().compressToEncodedURIComponent(a.encode_utf8(a._redact_pci(c.innerHTML.replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>)/g,
                                ""))));
                        if (!(1E5 < g.length)) {
                            var f = a._srv("/pxl/cat/" + a._global("adroll_adv_id"));
                            a._xhr({
                                body: a.jsonStringify({
                                    x: b,
                                    h: g
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                method: "POST",
                                url: f,
                                withCredentials: !0
                            });
                            window.localStorage.setItem("adroll_pxlcat", d)
                        }
                    } catch (k) {
                        a.log(k)
                    }
                }, 100)
            }
        }
    };
    __adroll__.prototype.call_consent_check = function() {
        function a() {
            var a = ["_s=" + b.get_adroll_sid(), "_b=2"];
            "#_ar_gdpr=" === (window.location.hash || "").substr(0, 10) && a.push("dbg=" + unescape((window.location.hash || "").substr(10)));
            window.adroll_fpconsent && a.push("_afc=1");
            a = b._srv("/consent/check/" + b._global("adroll_adv_id") + "?" + a.join("&"));
            b.add_script_element(a)
        }
        var b = this;
        this._is_defined(window.adroll_fpconsent) ? a() : window.setTimeout(a, 100)
    };
    __adroll__.prototype.call_consent_write = function(a) {
        window.adroll_fpconsent && (a += "&_afc=1");
        this.add_script_element(this._srv("/consent/write?" + a))
    };
    __adroll__.prototype._consent_cookie = function(a) {
        return a ? (this.set("__adroll_consent", a, 8760), a) : this.get("__adroll_consent")
    };
    __adroll__.prototype.load_consent_banner = function() {
        window.document.getElementById("__adroll_consent_banner_el") || this.add_script_element("s.adroll.com/j/consent_tcfv2.js", {
            id: "__adroll_consent_banner_el"
        })
    };
    __adroll__.prototype.get_consent_params = function() {
        return this.get("__adroll_consent_params")
    };
    __adroll__.prototype.set_consent_params = function(a) {
        this.set("__adroll_consent_params", a)
    };
    __adroll__.prototype.clear_consent_params = function() {
        this.del("__adroll_consent_params")
    };
    __adroll__.prototype.handle_null_consent = function(a) {
        a || (a = this.get_consent_params()) && this.call_consent_write(a)
    };
    __adroll__.prototype.save_first_party_consent = function(a) {
        var b = (a || {}).euconsent;
        if ((a = (a || {}).arconsent) || b) this._consent_cookie(a), window.localStorage.setItem("__adroll_consent_data", this.jsonStringify({
            arconsent: a,
            euconsent: b
        }))
    };
    __adroll__.prototype.get_first_party_consent = function() {
        if (this._has_global("__adroll_consent_data")) return this._global("__adroll_consent_data");
        var a = null;
        try {
            if (window.localStorage) {
                var b = window.localStorage.getItem("__adroll_consent_data");
                b && (a = this.jsonParse(b))
            }
        } catch (c) {}
        if (b = this._consent_cookie()) a = a || {}, a.arconsent = b;
        this._set_global("__adroll_consent_data", a);
        return a
    };
    __adroll__.prototype.trigger_gtm_consent_event = function(a) {
        function b(a, b, c) {
            b = isNaN(Number(b)) ? "c:" + b : "tcf:" + b;
            !0 !== c && !1 !== c && (c = "unknown");
            a[c][b] = 1
        }

        function c(a) {
            return "," + n.object_keys(a).join(",") + ","
        }
        if (!window.dataLayer || "function" === typeof window.dataLayer.push)
            if (window.dataLayer = window.dataLayer || [], a) {
                var d = this._global("__adroll_consent"),
                    e = this._global("__adroll_consent_data") || {},
                    g = e.eucookie || {},
                    f = g.max_vendor_id || e.max_vendor_id || 0,
                    k = e.networks || [],
                    h = g.purposes_allowed || 0,
                    p = {
                        "true": {},
                        "false": {},
                        unknown: {}
                    },
                    l = {
                        "true": {},
                        "false": {},
                        unknown: {}
                    },
                    m = {
                        "true": {},
                        "false": {}
                    },
                    n = this,
                    q;
                if ("boolean" === typeof d) {
                    for (q = 0; q < k.length; q++) b(p, k[q], d);
                    for (q = 1; q < f; q++) b(p, q, d), b(l, q, d);
                    for (q = 1; 25 > q; q++) m[d][q] = 1
                } else {
                    for (q in d) d.hasOwnProperty(q) && b(p, q, d[q]);
                    for (q = 1; q <= f; q++) b(l, q, (g.vendor_consent || {})[q]);
                    for (q = 0; 24 > q; q++) m[!!(h & 1 << q)][q + 1] = 1
                }
                window.dataLayer.push({
                    event: a,
                    nextrollVendorsConsent: c(p["true"]),
                    nextrollVendorsConsentUnknown: c(p.unknown),
                    nextrollVendorsConsentDenied: c(p["false"]),
                    nextrollVendorsRawConsent: c(l["true"]),
                    nextrollVendorsRawConsentUnknown: c(l.unknown),
                    nextrollVendorsRawConsentDenied: c(l["false"]),
                    nextrollPurposesConsent: c(m["true"]),
                    nextrollPurposesConsentUnknown: null,
                    nextrollPurposesConsentDenied: c(m["false"]),
                    nextrollgdpr: this._global("__adroll_consent_is_gdpr"),
                    nextrolliab: e.euconsent
                })
            } else window.dataLayer.push({
                event: "nextroll-ready"
            })
    };
    __adroll__.prototype.set_consent = function(a, b, c, d, e, g) {
        if (0 === arguments.length) {
            if (!this._has_global("__adroll_consent")) return;
            a = this._global("__adroll_consent");
            c = this._global("__adroll_consent_is_gdpr");
            g = this._global("__adroll_consent_data")
        }
        var f = "nextroll-consent";
        this._has_global("__adroll_consent") && (f = "nextroll-consent-modified");
        this._set_global("__adroll_consent", a);
        this._set_global("__adroll_consent_is_gdpr", c);
        this._set_global("__adroll_consent_data", g || {});
        d && this._set_global("__adroll_consent_user_country",
            d);
        e && this._set_global("__adroll_consent_adv_country", e);
        if (g) {
            var k = g.gppconsent || this.gpp_from_tcfstr(g.euconsent);
            k && (k = this.gpp_decode_string(k), this._set_global("__adroll_consent_gpp", k))
        }
        var k = ["5L5IV3X4ZNCUZFMLN5KKOD", "VMYZUWPHFRH37EAOEU2EQS", "3QOM4TKN4RD7TO3HCPYRKV"],
            h = this._global("adroll_adv_id");
        "CA" === d && 0 <= k.indexOf(h) && (c = !0);
        c && ("adroll" === (g || {}).banner || b) && this.load_consent_banner();
        this._install_cmp && this._install_cmp();
        null === a ? this.handle_null_consent(b) : (this.save_first_party_consent(g),
            b || this.clear_consent_params(), this._trigger_consent_event && this._trigger_consent_event(), !1 !== a && !1 !== (a || {}).a && (this._sync_fpid(), this._run_cookieless_steps(), this._log_floc_cohort(), this.trigger_gtm_consent_event(f), this._log_multiple_ids(), this._sync_page_category(), this.call_next_tpc()))
    };
    __adroll__.prototype._load_precheck_js = function() {
        this.add_script_element("https://s.adroll.com/j/pre/" + window.adroll_adv_id + "/" + window.adroll_pix_id + "/fpconsent.js")
    };
    __adroll__.prototype.cookieEnabled = function() {
        if (this._broken) return !1;
        this.set("_te_", "1");
        return "1" === this.get("_te_") ? (this.del("_te_"), !0) : !1
    };
    __adroll__.prototype.get = function(a) {
        var b = window.document.cookie;
        if (null === b) return this._broken = !0, null;
        var c;
        0 > b.indexOf(a + "=") ? b = null : (a = b.indexOf(a + "=") + a.length + 1, c = b.indexOf(";", a), -1 === c && (c = b.length), b = b.substring(a, c), b = "" === b ? null : window.unescape(b));
        return b
    };
    __adroll__.prototype.set = function(a, b, c) {
        var d;
        c && "number" === typeof c ? (d = new Date, d.setTime(d.getTime() + 36E5 * c), c = d.toGMTString(), c = "; expires=" + c) : c = "";
        d = "; domain=" + window.location.hostname;
        b = window.escape(b);
        window.document.cookie = a + "=" + b + c + "; path=/" + d + "; samesite=lax"
    };
    __adroll__.prototype.del = function(a) {
        this.set(a, "", -8760)
    };
    __adroll__.prototype.check_cookie = function(a, b) {
        for (var c = a.split("|"), d = c.length - 1; 0 <= d; d--)
            if (c[d]) {
                var e = c[d].split(":");
                b === e[0] && (e[2] = "" + (parseInt(e[2]) + 1), c[d] = e.join(":"))
            }
        return c.join("|")
    };
    __adroll__.prototype.handle = function(a) {
        var b = this.get(this.__adc) || ""; - 1 !== b.indexOf(a) ? this.set(this.__adc, this.check_cookie(b, a), this.exp) : (a = [b, [a, this.get_date(this.eexp), "1"].join(":")].join("|"), this.set(this.__adc, a, this.exp))
    };
    __adroll__.prototype.expire_old = function() {
        for (var a = this.get_date(!1), b = this.get(this.__adc), b = b ? b.split("|") : [""], c = [], d = b.length - 1; 0 <= d; d--) b[d] && "" !== b[d] && b[d].split(":")[1] > a && c.push(b[d]);
        this.set(this.__adc, c.join("|"), this.exp)
    };
    __adroll__.prototype.get_date = function(a) {
        var b = new Date;
        a && b.setTime(b.getTime() + 36E5 * a);
        a = "" + b.getUTCFullYear();
        var c = b.getUTCMonth(),
            c = 10 <= c ? c : "0" + c,
            b = b.getUTCDate();
        return [a, c, 10 <= b ? b : "0" + b].join("")
    };
    __adroll__.prototype.set_pixel_cookie = function(a, b) {
        this.handle(a);
        this.handle(b);
        this.pixel_loaded()
    };
    __adroll__.prototype.consent_allowed = function(a) {
        var b = this._global("__adroll_consent");
        return "object" === typeof b ? b[a] : b
    };
    __adroll__.prototype.listenToEvent = function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, this.wrapException(c), !1) : a.attachEvent("on" + b, this.wrapException(c))
    };
    __adroll__.prototype.listenToEventOnce = function(a, b, c, d) {
        d = "listener_" + ("object" === typeof a && null !== a ? a.forms && 0 < a.forms.length && (a.forms[0].id || a.forms[0].className) || a.id || a.constructor.name || Object.keys(a).join("_").toString() : String(a)) + "_" + b + "_" + d;
        var e = this._ensure_global("adroll_f_obs", {});
        e[d] || (e[d] = c, this._set_global("adroll_f_obs", e), a.addEventListener ? a.addEventListener(b, this.wrapException(c), !1) : a.attachEvent("on" + b, this.wrapException(c)))
    };
    __adroll__.prototype._head = function() {
        return (window.document.getElementsByTagName("head") || [null])[0] || (window.document.getElementsByTagName("body") || [null])[0] || window.document.getElementsByTagName("script")[0].parentNode
    };
    __adroll__.prototype._body = function() {
        return window.document.body || (window.document.getElementsByTagName("body") || [null])[0]
    };
    __adroll__.prototype.runCookieMatch = function() {
        var a = this.cm_urls.length;
        if (!(0 >= a))
            for (var b = 0; b <= a; b++) this.popAndSend()
    };
    __adroll__.prototype.matchesSelector = function(a, b) {
        var c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
        return c && c.call(a, b)
    };
    __adroll__.prototype.popAndSend = function() {
        if (!(0 >= this.cm_urls.length)) {
            var a = this.cm_urls.shift(),
                b = new Image;
            b.src = a;
            b.setAttribute("alt", "")
        }
    };
    __adroll__.prototype.add_param_to_url = function(a, b) {
        var c = a.indexOf("?"),
            d = "",
            e = ""; - 1 !== c ? (d = a.slice(0, c + 1), e = "&" + a.slice(c + 1)) : (c = a.indexOf("#", -1 === c ? 0 : c), -1 === c ? d = a + "?" : (d = a.slice(0, c) + "?", e = a.slice(c)));
        return d + b + e
    };
    __adroll__.prototype._init_idb = function() {
        function a() {
            return b._adroll_idb.transaction("adroll", "readwrite").objectStore("adroll")
        }
        var b = this,
            c = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (c && !this._adroll_idb) {
            this._adroll_idb = !0;
            var d = c.open("adroll", 1);
            d.onupgradeneeded = function() {
                b._adroll_idb = d.result;
                b._adroll_idb.createObjectStore("adroll", {
                    keyPath: "id"
                });
                b._adroll_idb.getStore = a
            };
            d.onsuccess = function() {
                b._adroll_idb = d.result;
                b._adroll_idb.getStore =
                    a
            };
            d.onblocked = function() {
                b._adroll_idb = null
            }
        }
    };
    __adroll__.prototype._get_idb_row = function(a, b, c) {
        var d = this;
        if (this._adroll_idb)
            if (!0 === this._adroll_idb) 5 > c ? window.setTimeout(this._get_idb_row.call(this, a, b, (c || 1) + 1), 100) : b && b.call(d, null);
            else {
                var e = b,
                    g = window.setTimeout(function() {
                        e && e.call(d, null)
                    }, 1E3);
                this._adroll_idb.getStore().get(a).onsuccess = function() {
                    e = null;
                    window.clearTimeout(g);
                    b && b.call(d, this.result)
                }
            }
        else b.call(this, null)
    };
    __adroll__.prototype._set_idb_row = function(a, b, c) {
        if ("object" !== typeof b) throw Error("Row must be object");
        this._adroll_idb && (!0 === this._adroll_idb ? 5 > c && window.setTimeout(this._set_idb_row.call(this, a, b, (c || 1) + 1), 100) : (b.id = a, this._adroll_idb.getStore().put(b)))
    };
    __adroll__.prototype.closest = function(a, b) {
        if (a.closest) return a.closest(b);
        if (!b) return null;
        for (var c = a; null !== c; c = c.parentNode) {
            var d = c.matches || c.webkitMatchesSelector || c.mozMatchesSelector || c.msMatchesSelector || c.oMatchesSelector;
            if (d && d.call(c, b)) return c
        }
        return null
    };
    __adroll__.prototype.dyno = function(a, b) {
        function c() {
            if (this.readyState === this.HEADERS_RECEIVED && "recordUser" !== a) {
                var c = d.parseDynoResponseHeader(this.getAllResponseHeaders());
                d._queueAndCallback("dyno", [a, b, c])
            }
        }
        if (a) {
            var d = this,
                e = {},
                g;
            for (g in b) b.hasOwnProperty(g) && (e[g] = "object" === typeof b[g] ? this.jsonStringify(b[g]) : b[g]);
            e = this.get_segment_path(this._global("adroll_adv_id"), this._global("adroll_pix_id"), e);
            g = this._srv("/segment" + e);
            this._xhr({
                url: g,
                onreadystatechange: c,
                withCredentials: !0
            });
            this.is_ipv6() && this.imgRequest(this._srv("/seg4" + e, !0))
        }
    };
    __adroll__.prototype.registerDynoCallback = function(a, b) {
        this._registerCallback("dyno", a, b)
    };
    __adroll__.prototype.parseDynoResponseHeader = function(a) {
        var b = {};
        if (!a) return b;
        a = a.split("\n");
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c],
                g = e.indexOf(":");
            if (0 < g) {
                var f = e.substring(0, g).trim().toLowerCase();
                this.startsWith(f, "x-") && (b[f] = e.substring(g + 1).trim())
            }
        }
        b && (b.hasOwnProperty("x-segment-eid") && (window.adroll_seg_eid = b["x-segment-eid"]), b.hasOwnProperty("x-rule-type") && (window.adroll_rule_type = b["x-rule-type"]), b.hasOwnProperty("x-attribution-url") && this.imgRequest(decodeURIComponent(b["x-attribution-url"]).replace(/&amp;/g,
            "&")));
        return b
    };
    __adroll__.prototype.is_under_experiment = function(a) {
        return window.adroll_exp_list && 0 <= window.adroll_exp_list.indexOf(a)
    };
    __adroll__.prototype.is_experiment_js_loaded = function() {
        return !!window.adroll_exp_list
    };
    __adroll__.prototype.is_test_advertisable = function() {
        return "ADV_EID" === this._global("adroll_adv_id")
    };
    __adroll__.prototype.if_under_experiment_js = function(a, b, c, d) {
        var e = this;
        this.on_experiment_loaded(function() {
            e.is_under_experiment(a) ? "function" === typeof b && b.call(e) : "function" === typeof c && c.call(e)
        }, d)
    };
    __adroll__.prototype.on_experiment_loaded = function(a, b) {
        function c() {
            if (e.is_experiment_js_loaded() || e.is_test_advertisable()) d = !0;
            d ? a.call(e) : window.setTimeout(c, 10)
        }
        var d = !1,
            e = this;
        window.setTimeout(function() {
            d = !0
        }, b || 500);
        c()
    };
    __adroll__.prototype.external_data_to_qs = function(a, b) {
        var c = [];
        if (this._is_v1_to_v2_shim()) {
            b = a;
            var d = this.get_external_data();
            if (null !== d) {
                a = a || {};
                for (var e in d) d.hasOwnProperty(e) && "undefined" !== d[e] && (a[e] = d[e])
            }
        }
        if (!a) return null;
        for (var g in a) a.hasOwnProperty(g) && this._is_defined(a[g]) && null !== a[g] && c.push(this.normalize_var(window.escape("" + g) + "=" + window.escape("" + a[g]), !1));
        c = c.join("&");
        b && (c = window.escape(c));
        return "adroll_external_data=" + c
    };
    __adroll__.prototype.get_page_properties = function() {
        if (this._has_global("adroll_page_properties")) {
            var a = this._global("adroll_page_properties"),
                b = {},
                c;
            for (c in a) a.hasOwnProperty(c) && "undefined" !== a[c] && (b[c.toLowerCase()] = a[c]);
            return b
        }
        return null
    };
    __adroll__.prototype.replace_external_data = function(a) {
        var b = this.get_external_data(),
            c = this.get_conversion_value(),
            d = null,
            e;
        if (b)
            for (e in b) b.hasOwnProperty(e) && (d = new RegExp("\\[" + e + "\\]", "gi"), a = a.replace(d, b[e]), d = new RegExp("\\[" + e + "_ESC\\]", "gi"), a = a.replace(d, window.escape(b[e])));
        if (c)
            for (e in c) c.hasOwnProperty(e) && (d = new RegExp("\\[" + e + "\\]", "gi"), a = a.replace(d, c[e]), d = new RegExp("\\[" + e + "_ESC\\]", "gi"), a = a.replace(d, window.escape(c[e])));
        return a
    };
    __adroll__.prototype.get_external_data = function() {
        if (this._has_global("adroll_custom_data")) {
            var a = this._global("adroll_custom_data"),
                b = {},
                c;
            for (c in a) a.hasOwnProperty(c) && "undefined" !== a[c] && (b[c.toLowerCase()] = a[c]);
            return b
        }
        return null
    };
    __adroll__.prototype.parse_conversion_attrs = function(a) {
        if (!a) return null;
        for (var b = {}, c = ["conv_value", "conversion_value"], d = ["adroll_currency", "currency"], e = 0; e < c.length; e++)
            if (a.hasOwnProperty(c[e])) {
                b.conv_value = a[c[e]];
                break
            }
        for (c = 0; c < d.length; c++)
            if (a.hasOwnProperty(d[c])) {
                b.currency = a[d[c]];
                break
            }
        return 1 <= Object.keys(b).length ? b : null
    };
    __adroll__.prototype.get_conversion_value = function(a) {
        var b = this._ensure_global("adroll_currency", null),
            c = this._ensure_global("adroll_conversion_value", null),
            d = this._ensure_global("adroll_conversion_value_in_dollars", null);
        return (a = this.parse_conversion_attrs(a)) ? a : c ? {
            conv_value: "" + c,
            currency: b
        } : d ? {
            conv_value: "" + parseInt(100 * d),
            currency: "USC"
        } : null
    };
    __adroll__.prototype.fibonacci = function() {
        return [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049, 12586269025, 20365011074, 32951280099, 53316291173, 86267571272, 139583862445, 225851433717, 365435296162, 591286729879, 956722026041, 1548008755920,
            2504730781961, 4052739537881, 6557470319842, 0x9a661ca20bb, 0xf9d297a859d, 27777890035288, 44945570212853, 72723460248141, 0x6b04f4c2fe42, 0xad2934c6d08f, 308061521170129, 498454011879264, 806515533049393, 0x4a2dce62b0d91, 0x780626e057bc2, 0xc233f54308953, 5527939700884757, 8944394323791464
        ]
    };
    __adroll__.prototype.tofib = function(a) {
        var b = this.fibonacci();
        if (1 > a) throw Error("Must be num >= 1");
        for (var c = 1; b[c] <= a;) c += 1;
        --c;
        for (var d = "1"; 0 < c;) b[c] > a ? d = "0" + d : (d = "1" + d, a -= b[c]), --c;
        return d
    };
    __adroll__.prototype.fromfib = function(a) {
        for (var b = this.fibonacci(), c = 1, d = 0, e, g, f = a.split(""); 0 < f.length;) {
            e = f.shift();
            if ("1" === e) {
                if ("1" === g) return d;
                d += b[c];
                c += 1
            } else if ("0" === e) c += 1;
            else throw Error("Invalid char in bstr " + a);
            g = e
        }
    };
    __adroll__.prototype._run_cookieless_steps = function() {
        if (!this.is_under_experiment("nofledge") && navigator.joinAdInterestGroup) try {
            if (!window.document.getElementById("adroll_slg")) {
                var a = this._srv("https://x.adroll.com/pxl/iframe_content.html?advertisable=" + this._global("adroll_adv_id")),
                    b = window.document.createElement("iframe");
                b.id = "adroll_slg";
                b.src = a;
                b.frameBorder = "0";
                b.marginWidth = "0";
                b.marginHeight = "0";
                b.style = "position:absolute; width:0; height:0; border:0; padding:0; margin:0 0 0 -1000px;";
                b.setAttribute("allow", "join-ad-interest-group");
                this._body().appendChild(b)
            }
        } catch (c) {
            this.log(c)
        }
    };
    __adroll__.prototype._form_attach = function() {
        function a(a) {
            try {
                if (!a) return null;
                if (a && a.contentDocument) return a.contentDocument;
                if (a && a.contentWindow) return a.contentWindow.document
            } catch (b) {}
            return null
        }
        var b = this._form_els_allowed();
        if (b) {
            var c = [],
                d;
            for (d in b) b.hasOwnProperty(d) && "submit" === b[d].type && c.push(d);
            this._adroll_submit_sels = c.join(",");
            b = window.document.querySelectorAll("input,select,textarea");
            for (c = 0; c < b.length; c++) this._form_data(b[c]);
            b = this._body();
            this.listenToEventOnce(b, "blur",
                this._form_change.bind(this), "_form_change");
            this.listenToEventOnce(b, "change", this._form_change.bind(this), "_form_change");
            this.listenToEventOnce(b, "focusout", this._form_change.bind(this), "_form_change");
            this.listenToEventOnce(b, "click", this._form_click.bind(this), "_form_click");
            this.listenToEventOnce(b, "submit", this._form_save.bind(this), "_form_save");
            b = b.getElementsByTagName("iframe");
            for (c = 0; c < b.length; c++)(d = a(b[c])) && d.querySelector("form") && (this.listenToEventOnce(d, "blur", this._form_change.bind(this),
                "_form_change"), this.listenToEventOnce(d, "change", this._form_change.bind(this), "_form_change"), this.listenToEventOnce(d, "focusout", this._form_change.bind(this), "_form_change"), this.listenToEventOnce(d, "click", this._form_click.bind(this), "_form_click"), this.listenToEventOnce(d, "submit", this._form_save.bind(this), "_form_save"))
        }
    };
    __adroll__.prototype._form_els_allowed = function() {
        return 0 === this.object_keys(this._ensure_global("adroll_form_fields", {})).length ? null : this._global("adroll_form_fields")
    };
    __adroll__.prototype._form_el_allowed = function(a) {
        if (!a || !a.type || !this._form_els_allowed()) return a._adroll_el_ok = !1;
        if (this._is_defined(a._adroll_el_ok)) return a._adroll_el_ok;
        var b = a.type.toLowerCase(),
            c = (a.name || "").toLowerCase(),
            d = this._form_els_allowed(),
            e = ((a.form ? this._desc_el(a.form) : "") + " " + this._desc_el(a)).trim();
        if ("password" === b || "file" === b || c.match(/cc_number|credit_card|card_number|cv[cv]_code/)) return a._adroll_el_ok = !1;
        if (this._is_defined(d.length)) {
            if (0 <= d.indexOf(e)) return a._adroll_el_ok = [!0];
            for (e = 0; e < d.length; e++)
                if (this.closest(a, d[e])) return a._adroll_el_ok = [!0]
        } else {
            if (d[e]) return d[e + ":is(*)"] ? a._adroll_el_ok = [d[e], d[e + ":is(*)"]] : a._adroll_el_ok = [d[e]];
            a._adroll_el_ok = !1;
            for (e in d) d.hasOwnProperty(e) && !e.match(/:noconsent/) && (b = this.closest(a, e.replace(/\s*(:not\(:is\(.*?\)\)|:is\(.*?\))/, ""))) && b === a && (a._adroll_el_ok ? a._adroll_el_ok.push(d[e]) : a._adroll_el_ok = [d[e]])
        }
        return a._adroll_el_ok
    };
    __adroll__.prototype._desc_el = function(a) {
        if (!a) return "";
        var b = a.tagName.toLowerCase();
        return b = a.id ? b + "#" + a.id : a.getAttribute("name") ? b + '[name="' + a.getAttribute("name") + '"]' : a.className ? b + "." + a.className.replace(/ /g, ".") : b + ":not(:is([id],[class],[name]))"
    };
    __adroll__.prototype._find_el = function(a, b) {
        var c;
        b = b || window.document;
        try {
            c = b.querySelector(a)
        } catch (e) {
            c = null
        }
        if (c) return c;
        try {
            c = this.matchesSelector(b, a) && b
        } catch (e) {
            c = null
        }
        if (c) return c;
        var d = a.match(/(\s*):is\(([^\)]*)\)/);
        d && (c = d[1] ? b.querySelector(d[2]) : this.matchesSelector(b, d[2]) && b);
        return c || null
    };
    __adroll__.prototype._form_data = function(a) {
        var b = "form" === a.tagName.toLowerCase(),
            c = this._desc_el(b ? a : a.form);
        this._is_defined(this._adroll_form_data) || (this._adroll_form_data = {});
        this._is_defined(this._adroll_form_data[c]) || (this._adroll_form_data[c] = {
            data: {},
            kind: {},
            contact: {}
        });
        if (!b) {
            var b = this._form_el_allowed(a),
                d = this._desc_el(a);
            if (!b) return delete this._adroll_form_data[c].contact[d], null;
            for (var e = 0; e < b.length; e++) {
                var g = b[e];
                if (":contact" === g.type) ":is(*)" === g.sel.substr(-6) ? this._adroll_form_data[c].contact[d] =
                    g.sel : this._find_el(g.sel, a) ? this._adroll_form_data[c].contact[d] = g.sel : delete this._adroll_form_data[c].contact[d];
                else {
                    var f = a.value,
                        k = g.auth || 0;
                    this._is_defined(a.options) && this._is_defined(a.selectedIndex) ? f = (a.options[a.selectedIndex] || {}).value : "button" === a.tagName.toLowerCase() && (f = f || a.textContent);
                    f ? (this._adroll_form_data[c].data[d] = {
                        val: f,
                        auth: k
                    }, g.type && (this._adroll_form_data[c].kind[g.type] = {
                        val: f,
                        auth: k
                    })) : (delete this._adroll_form_data[c].data[d], g.type && delete this._adroll_form_data[c].kind[g.type])
                }
            }
        }
        a = {
            contact: this._adroll_form_data[c].contact,
            data: {},
            kind: this._adroll_form_data[c].kind
        };
        a.data[c] = this._adroll_form_data[c].data;
        return 0 === this.object_keys(a.data[c]).length ? null : a
    };
    __adroll__.prototype._form_change = function(a) {
        a = a.target;
        this._form_el_allowed(a) && this._form_data(a)
    };
    __adroll__.prototype._form_click = function(a) {
        a = a.target;
        this.closest(a, this._adroll_submit_sels) && (a = this.closest(a, "form")) && this._form_save({
            target: a
        })
    };
    __adroll__.prototype._form_save = function(a) {
        var b = this._form_data(a.target);
        b && b.contact && (a = this.object_keys(b.contact), 0 < a.length ? b.contact = a : delete b.contact);
        a = this._redact_pci(this.jsonStringify(b));
        b && !a.match(/^{"data":{"contact":\[[^\]]*\],"[^"]+":{}},"kind":{}}$/) && (b.kind.email && b.kind.email.auth && this.identify_email(b.kind.email.val), b = this._ensure_global("adroll_adv_id", ""), b = this._srv("/form/" + b + "?pv=" + encodeURIComponent(this.pv)), this._xhr({
            body: a,
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            url: b,
            withCredentials: !0
        }))
    };
    __adroll__.prototype._redact_pci = function(a) {
        a = a.split(/([\d\-\.\ ]+)/);
        for (var b = 0; b < a.length; b++) this.is_luhn(a[b]) && (a[b] = " <PCI_REDACTED> ");
        return a.join("")
    };
    __adroll__.prototype._xhr = function(a) {
        a = a || {};
        var b = new XMLHttpRequest;
        b.open(a.method || "GET", a.url, !1 !== a.async);
        for (var c in a.headers || {}) a.headers.hasOwnProperty(c) && b.setRequestHeader(c, a.headers[c]);
        a.onreadystatechange && (b.onreadystatechange = a.onreadystatechange);
        a.withCredentials && (b.withCredentials = a.withCredentials);
        b.send(a.body || null)
    };
    __adroll__.prototype._form_tp_change = function(a) {
        a = a.target;
        this._form_el_tp_allowed(a) && this._form_tp_data(a)
    };
    __adroll__.prototype._get_form_tp_obj = function() {
        return this._adroll_tp_forms.map(this._get_tpform_sel)
    };
    __adroll__.prototype._form_tp_click = function(a) {
        a = a.target;
        var b = this.closest(a, "form"),
            c = b.querySelector("[type=submit]");
        a === c && b && this._form_tp_save({
            target: b
        })
    };
    __adroll__.prototype._set_tp_auth = function(a, b) {
        function c(a, b) {
            for (var g in a)
                if (a.hasOwnProperty(g)) {
                    var f = a[g];
                    "object" === typeof f && null !== f ? c(f, b) : "auth" === g && (a[g] = b)
                }
        }
        return c(a, b)
    };
    __adroll__.prototype._form_tp_is_legitimate_interest = function(a, b) {
        var c = !1;
        if (b.context) {
            var d = a.querySelector(b.context);
            d && "undefined" !== typeof d.value && (c = (c = (c = JSON.parse(d.value)) && c.legalConsentOptions ? JSON.parse(c.legalConsentOptions) : null) && !0 === c.isLegitimateInterest || !1)
        }
        return c
    };
    __adroll__.prototype._form_tp_save = function(a) {
        a = a.target;
        var b = this._form_tp_data(a);
        if (b && b.contact) {
            var c = this.object_keys(b.contact);
            0 < c.length ? b.contact = c : delete b.contact
        }
        for (var c = this._get_form_tp_obj(), d = 0; d < c.length; d++) {
            var e = c[d];
            if ((this.matchesSelector(a, e.form) || this.matchesSelector(a, e.iframeForm)) && null !== b) {
                var g = this._form_tp_provider_allowed()[e.name].has_marketing_consent_comm,
                    f = this._form_tp_is_legitimate_interest(a, e),
                    k = (((b || {}).kind || {}).gdpr_consent || {}).val;
                !0 === g || "true" ===
                    g || f || k ? this._set_tp_auth(b, 1) : delete b.contact;
                g = this._redact_pci(this.jsonStringify(b));
                if (!b || g.match(/^{"data":{"contact":\[[^\]]*\],"[^"]+":{}},"kind":{}}$/)) break;
                b.kind.email && b.kind.email.auth && this.identify_email(b.kind.email.val);
                e = e.name;
                f = this._ensure_global("adroll_adv_id", "");
                e = this._srv("/form/" + f + "?pv=" + encodeURIComponent(this.pv) + "&fp=" + encodeURIComponent(e));
                this._xhr({
                    body: g,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    url: e,
                    withCredentials: !0
                })
            }
        }
    };
    __adroll__.prototype._form_tp_provider_allowed = function() {
        return 0 === this.object_keys(this._ensure_global("adroll_third_party_forms", {})).length ? null : this._global("adroll_third_party_forms")
    };
    __adroll__.prototype._get_tpform_sel = function(a) {
        var b = {
            HUBSPOT: {
                name: "HUBSPOT",
                form: "form[id^=hsForm]",
                iframe: ".hs-form-iframe",
                iframeForm: "form[id^=hsForm]",
                context: 'input[name="hs_context"]',
                _field_sel: function(a) {
                    return '.hs-input[name^="' + a + '"]'
                },
                fields: {
                    firstname: "first_name",
                    lastname: "last_name",
                    email: "email",
                    company: "organization",
                    jobtitle: "title",
                    phone: "phone_number",
                    address: "address_1",
                    city: "city",
                    state: "state",
                    country: "country",
                    zip: "zip_code",
                    "LEGAL_CONSENT.subscription": "gdpr_consent"
                }
            },
            MAILCHIMP: {
                name: "MAILCHIMP",
                form: 'form[id^="mc-embedded-subscribe-form"], form[id^="mailchimp-signup-subscribe-block-"]',
                iframe: "div.mc-modal iframe",
                iframeForm: "form",
                _field_sel: function(a) {
                    return '[name^="' + a + '"]'
                },
                fields: {
                    FNAME: "first_name",
                    LNAME: "last_name",
                    EMAIL: "email",
                    PHONE: "phone_number",
                    "ADDRESS[addr1]": "address_1",
                    "ADDRESS[addr2]": "address_2",
                    "ADDRESS[city]": "city",
                    "ADDRESS[state]": "state",
                    "ADDRESS[zip]": "zip_code",
                    "ADDRESS[country]": "country",
                    gdpr: "gdpr_consent"
                }
            },
            MARKETO: {
                name: "MARKETO",
                form: "form[id^=mktoForm_]",
                iframe: null,
                iframeForm: null,
                _field_sel: function(a) {
                    return '[name="' + a + '"]'
                },
                fields: {
                    FirstName: "first_name",
                    LastName: "last_name",
                    Email: "email",
                    Company: "organization",
                    Title: "title",
                    Phone: "phone_number",
                    Address: "address_1",
                    City: "city",
                    State: "state",
                    Country: "country",
                    PostalCode: "zip_code"
                }
            }
        };
        return b.hasOwnProperty(a) ? b[a] : {
            form: "",
            _field_sel: function() {},
            fields: {}
        }
    };
    __adroll__.prototype._form_tp_data = function(a, b) {
        var c = "form" === a.tagName.toLowerCase(),
            d = this._desc_tp_el(c ? a : a.form);
        this._adroll_form_tp_data || (this._adroll_form_tp_data = {});
        this._adroll_form_tp_data[d] || (this._adroll_form_tp_data[d] = {
            data: {},
            kind: {},
            contact: {}
        });
        if (!c) {
            var e = this._form_el_tp_allowed(a, b),
                c = this._desc_tp_el(a);
            if (e) {
                e = a.value;
                this._is_defined(a.options) && this._is_defined(a.selectedIndex) ? e = (a.options[a.selectedIndex] || {}).value : "button" === a.tagName.toLowerCase() ? e = e || a.textContent :
                    "input" === a.tagName.toLowerCase() && "checkbox" === a.type.toLowerCase() && (e = a.checked ? !0 : !1);
                for (var g = null, f = ["email"], k = this._get_form_tp_obj(), h = 0; h < k.length; h++) {
                    var p = k[h];
                    if ((g = this.closest(a, p.form) || this.closest(a, p.iframeForm)) && (this.matchesSelector(g, p.form) || this.matchesSelector(g, p.iframeForm))) {
                        g = p.fields[a.name];
                        if (!g)
                            for (var l = this.object_keys(p.fields), m = 0; m < l.length; m++) {
                                var n = l[m],
                                    q = a.name;
                                if (0 === n.indexOf(q.slice(0, 24)) || 0 === n.indexOf(q.slice(0, 4))) {
                                    g = p.fields[l[m]];
                                    break
                                }
                            }
                        e && g ? (this._adroll_form_tp_data[d].data[c] = {
                            val: e,
                            auth: null
                        }, this._adroll_form_tp_data[d].kind[g] = {
                            val: e,
                            auth: null
                        }, -1 !== f.indexOf(g) && (this._adroll_form_tp_data[d].contact[c] = c)) : (-1 !== f.indexOf(g) && delete this._adroll_form_tp_data[d].contact[c], delete this._adroll_form_tp_data[d].data[c], delete this._adroll_form_tp_data[d].kind[g])
                    }
                }
            }
        }
        c = {
            contact: this._adroll_form_tp_data[d].contact,
            data: {},
            kind: this._adroll_form_tp_data[d].kind
        };
        c.data[d] = this._adroll_form_tp_data[d].data;
        return 0 === this.object_keys(c.data[d]).length ? null : c
    };
    __adroll__.prototype._form_tp_attach = function(a) {
        function b() {
            10 > a && window.setTimeout(function() {
                e._form_tp_attach(a + 1)
            }, 500)
        }

        function c() {
            var a = [],
                b = !1,
                c = !1,
                d = !1,
                g = !1;
            window.document.querySelector(e._get_tpform_sel("HUBSPOT").form) && (b = !0);
            window.document.querySelector(e._get_tpform_sel("HUBSPOT").iframe) && (c = !0);
            (b || c) && a.push("HUBSPOT");
            window.document.querySelector(e._get_tpform_sel("MAILCHIMP").iframe) && (g = !0);
            window.document.querySelector(e._get_tpform_sel("MAILCHIMP").form) && (d = !0);
            (d || g) &&
            a.push("MAILCHIMP");
            window.document.querySelector(e._get_tpform_sel("MARKETO").form) && a.push("MARKETO");
            return a
        }

        function d(a) {
            try {
                if (!a) return null;
                if (a && a.contentDocument) return a.contentDocument;
                if (a && a.contentWindow) return a.contentWindow.document
            } catch (b) {}
            return null
        }
        var e = this;
        "undefined" === typeof a && (a = 0);
        var g = this._form_tp_provider_allowed();
        if (g) {
            var f = c();
            if (0 === f.length) b();
            else {
                for (var k = [], h = [], p, l, m, n, q = 0; q < f.length; q++) {
                    l = null;
                    var t = f[q];
                    if (g && g.hasOwnProperty(t))
                        if (p = this._get_tpform_sel(t),
                            null !== p.iframe && null !== p.form && (l = window.document.querySelector(p.iframe), (m = d(l)) && (n = m.body ? m.body.querySelector(p.iframeForm) : null)), null === p.form || n || (n = window.document.querySelector(p.form)), null === n) {
                            b();
                            continue
                        } else
                            for (k.push(t), p = this.object_keys(p.fields).map(p._field_sel), p = n.querySelectorAll(p), m = 0; m < p.length; m++) h.push(this._desc_tp_el(p[m])), this._form_tp_data(p[m], t);
                    l && null !== l && null !== n && (this.listenToEventOnce(l.contentWindow.document.body, "blur", this._form_tp_change.bind(this),
                        "_form_tp_change"), this.listenToEventOnce(l.contentWindow.document.body, "change", this._form_tp_change.bind(this), "_form_tp_change"), this.listenToEventOnce(l.contentWindow.document.body, "focusout", this._form_tp_change.bind(this), "_form_tp_change"), this.listenToEventOnce(l.contentWindow.document.body, "click", this._form_tp_click.bind(this), "_form_tp_click"))
                }
                this._adroll_tp_forms = k;
                this._adroll_tp_fields = h.join(",");
                g = this._body();
                this.listenToEventOnce(g, "blur", this._form_tp_change.bind(this), "_form_tp_change");
                this.listenToEventOnce(g, "change", this._form_tp_change.bind(this), "_form_tp_change");
                this.listenToEventOnce(g, "focusout", this._form_tp_change.bind(this), "_form_tp_change");
                this.listenToEventOnce(g, "click", this._form_tp_click.bind(this), "_form_tp_click")
            }
        } else b()
    };
    __adroll__.prototype._form_el_tp_allowed = function(a, b) {
        if (!a || !a.type || !this._form_tp_provider_allowed()) return a._adroll_el_provider = b, a._adroll_el_ok = !1;
        var c = a.type.toLowerCase(),
            d = (a.name || "").toLowerCase(),
            e = this._desc_tp_el(a);
        return "password" === c || "file" === c || d.match(/cc_number|credit_card|card_number|cv[cv]_code/) ? (a._adroll_el_provider = b, a._adroll_el_ok = !1) : this._is_defined(this._adroll_tp_fields) && 0 <= this._adroll_tp_fields.indexOf(e) ? (a._adroll_el_provider = b, a._adroll_el_ok = !0) : (a._adroll_el_provider =
            b, a._adroll_el_ok = !1)
    };
    __adroll__.prototype._desc_tp_el = function(a) {
        if (!a) return "";
        var b = a.tagName.toLowerCase();
        return b = a.id ? b + "#" + a.id : a.getAttribute("name") ? b + '[name="' + a.getAttribute("name") + '"]' : a.className ? b + "." + a.className.replace(/ /g, ".") : this.matchesSelector(a, 'form[action*="list-manage.com/subscribe/form-post"]') ? b + ":mc-popup-form-pa" : b + ":not(:is([id],[class],[name]))"
    };
    __adroll__.prototype._has_global = function(a) {
        return this._is_defined(this._global(a))
    };
    __adroll__.prototype._global = function(a) {
        return window[a]
    };
    __adroll__.prototype._set_global = function(a, b) {
        window[a] = b
    };
    __adroll__.prototype._unset_global = function(a) {
        delete window[a]
    };
    __adroll__.prototype._ensure_global = function(a, b) {
        this._has_global(a) || this._set_global(a, b);
        return this._global(a)
    };
    __adroll__.prototype.GppTypes = function() {
        function a(a) {
            this.size = a;
            this.data = null
        }

        function b(a, b) {
            this.size = a;
            this.data = b || 0
        }

        function c(a) {
            this.data = a || 0
        }

        function d(a) {
            this.size = 36;
            this.data = new Date(a || 0)
        }

        function e(a) {
            this.data = !0 === a
        }

        function g(a, b) {
            this.size = a;
            this.data = b || ""
        }

        function f(a, b) {
            this.size = a;
            this.data = b || []
        }

        function k(a, b) {
            this.size = a;
            this.data = b || Array(a)
        }

        function h(a) {
            this.data = a || []
        }

        function p(a) {
            this.data = a
        }

        function l(a, b) {
            this.type = null;
            this.data = b || []
        }

        function m(a, b, c) {
            this.maxval =
                a || 0;
            this.type = b || !1;
            this.data = c || []
        }

        function n(a, b, c, d) {
            this.MaxVendorId = a || null;
            this.DefaultConsent = b || null;
            this.EncodingType = c || null;
            this.VendorIds = d || []
        }

        function q() {
            this.PurposeId = new b(6);
            this.RestrictionType = new b(2);
            this.PubRestrictionEntry = new m
        }

        function t(a) {
            this.PubRestrictions = a || [];
            this.NumPubRestrictions = new b(12, this.PubRestrictions.length)
        }

        function u(a, b) {
            this.name = a;
            this._fields = [];
            for (var c in b) b.hasOwnProperty(c) && (this._fields.push(c), this[c] = b[c])
        }
        var r = this;
        a.prototype.set =
            function(a) {
                this.data = a
            };
        a.prototype.valueOf = function() {
            return this.data instanceof Array ? this.data.concat() : this.data instanceof Date ? this.data : this.data instanceof Object ? r.extendObj({}, this.data) : "string" === typeof this.data ? "" + this.data : this.data
        };
        b.prototype = Object.create(a.prototype);
        b.prototype.toString = function() {
            return this.data || 0 === this.data ? r.inttobits(this.data, this.size) : ""
        };
        b.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = parseInt(a.substr(0, this.size), 2);
            this.set(b);
            return a.substr(this.size)
        };
        c.prototype = Object.create(a.prototype);
        c.prototype.toString = function() {
            return r.tofib(this.data)
        };
        c.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b, c = "";
            for (b = 0; b < a.length; b++)
                if (c += a[b], 0 < b && "1" === a[b] && "1" === a[b - 1]) return this.set(r.fromfib(c)), a.substr(b + 1);
            return ""
        };
        d.prototype = Object.create(a.prototype);
        d.prototype.toString = function() {
            return this.data ? r.inttobits(Math.round(this.data.getTime() / 100), this.size) : ""
        };
        d.prototype.fromString = function(a) {
            if (!a ||
                !a.length) return a;
            var b = a.substr(0, this.size),
                c = new Date;
            c.setTime(100 * parseInt(b, 2));
            this.set(c);
            return a.substr(this.size)
        };
        e.prototype = Object.create(a.prototype);
        e.prototype.toString = function() {
            return this.data ? "1" : "0"
        };
        e.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            this.set("1" === a[0]);
            return a.substr(1)
        };
        g.prototype = Object.create(a.prototype);
        g.prototype.toString = function() {
            if (!this.data) return "";
            for (var a = "", b, c = 0; c < this.data.length; c++) b = Number(this.data.charCodeAt(c) - 65), a +=
                r.inttobits(b, 6);
            return a
        };
        g.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            for (var b = a.substr(0, 6 * this.size), c = "", d, e = 0; e < b.length; e += 6) d = parseInt(b.substr(e, 6), 2), c += String.fromCharCode(d + 65);
            this.set(c);
            return a.substr(b.length)
        };
        f.prototype = Object.create(a.prototype);
        f.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b;
            this.data = [];
            for (b = 0; b < this.size; b++) "1" === a[b] && this.data.push(b + 1);
            return a.substr(this.size)
        };
        f.prototype.toString = function() {
            var a, b, c = r.repeatstr("0",
                this.size).split("");
            for (a = 0; a < this.data.length; a++) b = parseInt(this.data[a]), 0 < b && (c[b - 1] = "1");
            return c.join("")
        };
        k.prototype = Object.create(a.prototype);
        k.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b;
            this.size = parseInt(a.substr(0, 16), 2);
            a = a.substr(16);
            this.data = [];
            for (b = 0; b < this.size; b++) this.data[b] = "1" === a[b];
            return a.substr(this.size)
        };
        k.prototype.toString = function() {
            var a = "",
                b;
            for (b = 0; b < this.data.length; b++) a += this.data[b] ? "1" : "0";
            return r.inttobits(this.data.length, 16) + a
        };
        h.prototype = Object.create(a.prototype);
        h.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = 12,
                c = parseInt(a.substr(0, b), 2),
                d, e, g;
            this.data = [];
            for (g = 0; g < c; g++)
                if (d = "1" === a[b], b += 1, d)
                    for (d = parseInt(a.substr(b, 16), 2), b += 16, e = parseInt(a.substr(b, 16), 2), b += 16; d <= e; d++) this.data.push(d);
                else this.data.push(parseInt(a.substr(b, 16), 2)), b += 16;
            return a.substr(b)
        };
        h.prototype.toString = function() {
            for (var a = 0, b, c = "", d = 0, a = 0; a < this.data.length; a++)
                if (d += 1, this.data[a] + 1 === this.data[a + 1]) {
                    for (b = 1; this.data[a +
                            b] === this.data[a] + b; b++);
                    b = a + b - 1;
                    c += "1" + r.inttobits(this.data[a], 16) + r.inttobits(this.data[b], 16);
                    a = b
                } else c += "0" + r.inttobits(this.data[a], 16);
            return r.inttobits(d, 12) + c
        };
        p.prototype = Object.create(a.prototype);
        p.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b, d, e = parseInt(a.substr(0, 12), 2),
                g, h = 0;
            a = a.substr(12);
            this.data = [];
            for (d = 0; d < e; d++)
                if (b = "1" === a[0], a = a.substr(1), g = new c, a = g.fromString(a), b) {
                    h += g.valueOf();
                    g = new c;
                    a = g.fromString(a);
                    g = g.valueOf();
                    for (b = 0; b < g; b++) this.data.push(h +
                        b);
                    h += g
                } else h += g.valueOf(), this.data.push(h);
            return a
        };
        p.prototype.toString = function() {
            var a, b, d = "",
                e = 0,
                g;
            for (a = b = 0; a < this.data.length; a++) {
                e += 1;
                g = new c;
                g.set(this.data[a] - b);
                if (this.data[a] + 1 === this.data[a + 1]) {
                    d += "1" + g.toString();
                    for (b = 1; this.data[a + b] === this.data[a] + b; b++);
                    --b;
                    g = new c;
                    g.set(b);
                    d += g.toString();
                    a += b
                } else d += "0" + g.toString();
                b = this.data[a]
            }
            return r.inttobits(e, 12) + d
        };
        l.prototype.set = function(a, b) {
            this.type = a;
            this.data = b
        };
        l.prototype.toString = function() {
            var a;
            if (this.type) return a =
                new p(this.data), "1" + a.toString();
            a = new k(this.data.length);
            a.set(this.data);
            return "0" + a.toString()
        };
        l.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = "1" === a[0],
                c;
            a = a.substr(1);
            c = b ? new p : new k;
            a = c.fromString(a);
            this.set(b, c.valueOf());
            return a
        };
        m.prototype.set = function(a, b, c) {
            this.maxval = a;
            this.type = b;
            this.data = c
        };
        m.prototype.toString = function() {
            var a = (new b(12, this.maxval)).toString(),
                a = this.type ? new h : new f(this.data.length);
            a.set(this.data);
            a = a.toString();
            return r.inttobits(this.maxval,
                16) + (this.type ? "1" : "0") + a
        };
        m.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b;
            this.maxval = parseInt(a.substr(0, 16), 2);
            (this.type = "1" === a[16]) ? (b = new h, a = b.fromString(a.substr(17))) : (a = a.substr(16), b = new f(this.maxval), a = b.fromString(a));
            this.data = b.valueOf();
            return a
        };
        m.prototype.valueOf = function() {
            return this.data
        };
        n.prototype.set = function(a, b, c, d) {
            this.MaxVendorId = a;
            this.DefaultConsent = b;
            this.EncodingType = c;
            this.VendorIds = d
        };
        n.prototype.toString = function() {
            var a = r.inttobits(this.MaxVendorId,
                16) + (this.EncodingType ? "1" : "0");
            if (this.EncodingType) {
                var b = new h;
                b.set(this.VendorIds);
                a += (this.DefaultConsent ? "1" : "0") + b.toString()
            } else b = new f(this.MaxVendorId), b.set(this.VendorIds), a += b.toString();
            return a
        };
        n.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            var b = parseInt(a.substr(0, 16), 2),
                c = "1" === a.substr(16, 1);
            if (c) {
                var d = "1" === a.substr(17, 1),
                    e = new h;
                a = e.fromString(a.substr(18));
                this.set(b, d, c, e.valueOf())
            } else d = new f(b), a = d.fromString(a.substr(17)), this.set(b, !1, c, d.valueOf());
            return a
        };
        q.prototype.toString = function() {
            return this.PurposeId.toString() + this.RestrictionType.toString() + this.PubRestrictionEntry.toString()
        };
        q.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            a = this.PurposeId.fromString(a);
            a = this.RestrictionType.fromString(a);
            return a = this.PubRestrictionEntry.fromString(a)
        };
        q.prototype.valueOf = function() {
            return {
                PurposeId: this.PurposeId.valueOf(),
                RestrictionType: this.RestrictionType.valueOf(),
                PubRestrictionEntry: this.PubRestrictionEntry.valueOf()
            }
        };
        t.prototype.fromString =
            function(a) {
                if (!a || !a.length) return a;
                a = this.NumPubRestrictions.fromString(a);
                this.PubRestrictions = [];
                for (var b = 0; b < this.NumPubRestrictions.valueOf(); b++) {
                    var c = new q;
                    a = c.fromString(a);
                    this.PubRestrictions.push(c)
                }
                return a
            };
        t.prototype.toString = function() {
            for (var a = this.NumPubRestrictions.toString(), b = 0; b < this.NumPubRestrictions.valueOf(); b++) a += this.PubRestrictions[b].toString();
            return a
        };
        t.prototype.valueOf = function() {
            for (var a = [], b = 0; b < this.NumPubRestrictions.valueOf(); b++) a.push(this.PubRestrictions[b].valueOf());
            return a
        };
        u.prototype.toString = function() {
            for (var a = "", b = 0; b < this._fields.length; b++) a += this[this._fields[b]].toString();
            return a
        };
        u.prototype.fromString = function(a) {
            if (!a || !a.length) return a;
            for (var b = 0; b < this._fields.length; b++) a = this[this._fields[b]].fromString(a);
            return a
        };
        u.prototype.valueOf = function() {
            for (var a = {}, b = 0; b < this._fields.length; b++) a[this._fields[b]] = this[this._fields[b]].valueOf();
            this.str && (a.str = this.str);
            return a
        };
        return {
            Section: u,
            Int: b,
            Fibonacci: c,
            DateTime: d,
            Boolean: e,
            String: g,
            Bitfield: f,
            BitfieldVariable: k,
            RangeInt: h,
            RangeFibonacci: p,
            OptimizedRange: l,
            OptimizedIntRange: m,
            TcfV1Consent: n,
            TcfV2PubRestriction: q,
            TcfV2PublisherRestrictions: t
        }
    };
    __adroll__.prototype.GppStruct = function() {
        var a = this.GppTypes(),
            b = new a.Section("SECTION_GPP_HEADER", {
                Type: new a.Int(6, 3),
                Version: new a.Int(6, 1),
                Sections: new a.RangeFibonacci
            }),
            c = new a.Section("tcfeuv1", {
                Version: new a.Int(6, 1),
                Created: new a.DateTime,
                LastUpdated: new a.DateTime,
                CmpId: new a.Int(12),
                CmpVersion: new a.Int(12),
                ConsentScreen: new a.Int(6),
                ConsentLanguage: new a.String(2),
                VendorListVersion: new a.Int(12),
                PurposesAllowed: new a.Int(24),
                TcfV1Consent: new a.TcfV1Consent
            }),
            a = new a.Section("tcfeuv2", {
                Version: new a.Int(6, 2),
                Created: new a.DateTime,
                LastUpdated: new a.DateTime,
                CmpId: new a.Int(12),
                CmpVersion: new a.Int(12),
                ConsentScreen: new a.Int(6),
                ConsentLanguage: new a.String(2),
                VendorListVersion: new a.Int(12),
                TcfPolicyVersion: new a.Int(6),
                IsServiceSpecific: new a.Boolean,
                UseNonStandardStacks: new a.Boolean,
                SpecialFeatureOptIns: new a.Bitfield(12),
                PurposeConsent: new a.Bitfield(24),
                PurposesLITransparency: new a.Bitfield(24),
                PurposeOneTreatment: new a.Boolean,
                PublisherCC: new a.String(2),
                VendorConsent: new a.OptimizedIntRange,
                VendorLegitimateInterest: new a.OptimizedIntRange,
                PublisherRestrictions: new a.TcfV2PublisherRestrictions
            });
        return {
            SECTION_DELIMITER: "~",
            ids: {
                tcfeuv1: 1,
                tcfeuv2: 2,
                SECTION_GPP_HEADER: 3,
                SECTION_GPP_SIGNAL: 4,
                tcfcav1: 5,
                uspv1: 6,
                usnat: 7,
                usca: 8,
                usva: 9,
                usco: 10,
                usut: 11,
                usct: 12
            },
            sections: [null, c, a, b]
        }
    };
    __adroll__.prototype.gpp_decode_string = function(a) {
        var b = {
                str: a,
                sections: {}
            },
            c = this.GppStruct();
        a = a.split(c.SECTION_DELIMITER);
        var d, e = [],
            g = this.b64tobits(a.shift());
        d = c.sections[c.ids.SECTION_GPP_HEADER];
        d.fromString(g);
        b.header = d.valueOf();
        for (e = [].concat(b.header.Sections); 0 < a.length;) {
            d = a.shift();
            var g = this.b64tobits(d),
                f = e.shift();
            if (f = c.sections[f]) f.fromString(g), f.str = d, b.sections[f.name] = f.valueOf()
        }
        return b
    };
    __adroll__.prototype.gpp_encode_string = function(a) {
        for (var b = [], c = this.GppStruct(), d = [], e = 0; e < a.length; e++) d.push(a[e].Version.valueOf()), b.push(this.bitstob64(a[e].toString(), !0));
        a = c.sections[c.ids.SECTION_GPP_HEADER];
        a.Sections.set(d);
        b.unshift(this.bitstob64(a.toString(), !0));
        return b.join(c.SECTION_DELIMITER)
    };
    __adroll__.prototype.gpp_from_tcfstr = function(a) {
        if (!a) return null;
        var b = {
            B: "DBABYA",
            C: "DBABMA"
        }[a.charAt(0)];
        return b ? b + "~" + a : null
    };
    __adroll__.prototype.set_first_party_cookie = function(a) {
        if (a = this.get_first_party_cookie() || a) return this._cookie_source = "got", this.set("__adroll_fpc", a, 8766), this.__adroll_fpc = a;
        var b = this.md5((new Date).getTime() + Math.round(1E11 * Math.random()) + window.navigator.userAgent.toLowerCase() + window.document.referrer) + "-" + (new Date).getTime();
        this._cookie_source = "generated";
        this.set("__adroll_fpc", b, 8766);
        this.__adroll_fpc = a;
        return b
    };
    __adroll__.prototype._get_fpc_source = function() {
        return this._cookie_source
    };
    __adroll__.prototype.get_first_party_cookie = function() {
        try {
            var a = this.get("__adroll_fpc") || this.__adroll_fpc;
            if (a) {
                var b = a.replace("-s2-", "-").replace(/-$/, "");
                if ("-" === b.charAt(32) && b.substr(33).match(/\D/) && Date.parse) {
                    var c = new Date(b.substr(33));
                    if (c && !isNaN(c.getTime())) return b.substr(0, 33) + c.getTime()
                }
                return b
            }
        } catch (d) {}
        return null
    };
    __adroll__.prototype._get_fpid_ls = function() {
        return window.localStorage.getItem("__adroll_fpc")
    };
    __adroll__.prototype._set_fpid_ls = function(a) {
        window.localStorage.setItem("__adroll_fpc", a)
    };
    __adroll__.prototype._get_fpid_idb = function(a) {
        var b = this;
        this._get_idb_row("__adroll_fpc", function(c) {
            a && a.call(b, (c || {}).val)
        })
    };
    __adroll__.prototype._set_fpid_idb = function(a) {
        this._set_idb_row("__adroll_fpc", {
            val: a
        })
    };
    __adroll__.prototype._sync_fpid = function() {
        var a = this;
        if (this.is_under_experiment("fpidexp")) {
            var b = this.get_first_party_cookie(),
                c = this._get_fpid_ls();
            this._get_fpid_idb(function(d) {
                a._log_pex_event("fpidexp", "load", "", "", {
                    fpc: b || "",
                    lsid: c || "",
                    idbid: d || ""
                });
                (d = b || c || d) ? a.set_first_party_cookie(d): d = a.set_first_party_cookie();
                a._set_fpid_ls(d);
                a._set_fpid_idb(d)
            })
        }
        this.set_first_party_cookie()
    };
    __adroll__.prototype.jsonStringify = function(a) {
        this.jsonStringifyFunc || this.initJsonStringify();
        return this.jsonStringifyFunc(a)
    };
    __adroll__.prototype.jsonParse = function(a) {
        var b = this._global("JSON");
        return "function" === typeof b.parse ? b.parse(a) : eval("(" + a + ")")
    };
    __adroll__.prototype.initJsonStringify = function() {
        var a = this._global("JSON");
        this.jsonStringifyFunc = a && a.stringify && "function" === typeof a.stringify ? a.stringify : function() {
            function a(b) {
                return e[b] || "\\u" + (b.charCodeAt(0) + 65536).toString(16).substr(1)
            }
            var c = Object.prototype.toString,
                d = Array.isArray || function(a) {
                    return "[object Array]" === c.call(a)
                },
                e = {
                    '"': '\\"',
                    "\\": "\\\\",
                    "\b": "\\b",
                    "\f": "\\f",
                    "\n": "\\n",
                    "\r": "\\r",
                    "\t": "\\t"
                },
                g = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function k(e) {
                if (null === e) return "null";
                if ("number" === typeof e) return isFinite(e) ? e.toString() : "null";
                if ("boolean" === typeof e) return e.toString();
                if ("object" === typeof e) {
                    if ("function" === typeof e.toJSON) return k(e.toJSON());
                    if (d(e)) {
                        for (var p = "[", l = 0; l < e.length; l++) p += (l ? ", " : "") + k(e[l]);
                        return p + "]"
                    }
                    if ("[object Object]" === c.call(e)) {
                        p = [];
                        for (l in e) e.hasOwnProperty(l) && p.push(k(l) + ": " + k(e[l]));
                        return "{" + p.join(", ") + "}"
                    }
                }
                return '"' + e.toString().replace(g, a) + '"'
            }
        }()
    };
    __adroll__.prototype._lzstring = function() {
        function a(a, b) {
            if (!c[a]) {
                c[a] = {};
                for (var d = 0; d < a.length; d++) c[a][a.charAt(d)] = d
            }
            return c[a][b]
        }
        var b = String.fromCharCode,
            c = {},
            d = {
                compressToBase64: function(a) {
                    if (null === a) return "";
                    a = d._compress(a, 6, function(a) {
                        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)
                    });
                    switch (a.length % 4) {
                        case 3:
                            return a + "=";
                        case 2:
                            return a + "==";
                        case 1:
                            return a + "===";
                        default:
                            return a
                    }
                },
                decompressFromBase64: function(b) {
                    return null === b ? "" : "" === b ? null :
                        d._decompress(b.length, 32, function(c) {
                            return a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", b.charAt(c))
                        })
                },
                compressToUTF16: function(a) {
                    return null === a ? "" : d._compress(a, 15, function(a) {
                        return b(a + 32)
                    }) + " "
                },
                decompressFromUTF16: function(a) {
                    return null === a ? "" : "" === a ? null : d._decompress(a.length, 16384, function(b) {
                        return a.charCodeAt(b) - 32
                    })
                },
                compressToUint8Array: function(a) {
                    a = d.compress(a);
                    for (var b = new Uint8Array(2 * a.length), c = 0, k = a.length; c < k; c++) {
                        var h = a.charCodeAt(c);
                        b[2 * c] =
                            h >>> 8;
                        b[2 * c + 1] = h % 256
                    }
                    return b
                },
                decompressFromUint8Array: function(a) {
                    if (null === a || "undefined" === typeof a) return d.decompress(a);
                    for (var c = Array(a.length / 2), f = 0, k = c.length; f < k; f++) c[f] = 256 * a[2 * f] + a[2 * f + 1];
                    var h = [];
                    c.forEach(function(a) {
                        h.push(b(a))
                    });
                    return d.decompress(h.join(""))
                },
                compressToEncodedURIComponent: function(a) {
                    return null === a ? "" : d._compress(a, 6, function(a) {
                        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(a)
                    })
                },
                decompressFromEncodedURIComponent: function(b) {
                    if (null ===
                        b) return "";
                    if ("" === b) return null;
                    b = b.replace(/ /g, "+");
                    return d._decompress(b.length, 32, function(c) {
                        return a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", b.charAt(c))
                    })
                },
                compress: function(a) {
                    return d._compress(a, 16, function(a) {
                        return b(a)
                    })
                },
                _compressBits: function(a, b, c) {
                    var d;
                    for (d = 0; d < b; d++) c.val = c.val << 1 | a & 1, c.position === c.bitsPerChar - 1 ? (c.position = 0, c.data.push(c.getCharFromInt(c.val)), c.val = 0) : c.position++, a >>= 1;
                    return a
                },
                _compressChunk: function(a, b, c, k) {
                    Object.prototype.hasOwnProperty.call(c,
                        a) ? (256 > a.charCodeAt(0) ? (d._compressBits(0, k.numBits, k), d._compressBits(a.charCodeAt(0), 8, k)) : (d._compressBits(1, k.numBits, k), d._compressBits(a.charCodeAt(0), 16, k)), k.enlargeIn--, 0 === k.enlargeIn && (k.enlargeIn = Math.pow(2, k.numBits), k.numBits++), delete c[a]) : d._compressBits(b[a], k.numBits, k);
                    k.enlargeIn--;
                    0 === k.enlargeIn && (k.enlargeIn = Math.pow(2, k.numBits), k.numBits++)
                },
                _compress: function(a, b, c) {
                    if (null === a) return "";
                    var k, h = {},
                        p = {},
                        l = "",
                        m = "",
                        n = "",
                        q = {
                            data: [],
                            val: 0,
                            position: 0,
                            bitsPerChar: b,
                            getCharFromInt: c,
                            dictSize: 3,
                            numBits: 2,
                            enlargeIn: 2
                        };
                    for (k = 0; k < a.length; k += 1) l = a.charAt(k), Object.prototype.hasOwnProperty.call(h, l) || (h[l] = q.dictSize++, p[l] = !0), m = n + l, Object.prototype.hasOwnProperty.call(h, m) ? n = m : (d._compressChunk(n, h, p, q), h[m] = q.dictSize++, n = String(l));
                    "" !== n && d._compressChunk(n, h, p, q);
                    for (d._compressBits(2, q.numBits, q);;)
                        if (q.val <<= 1, q.position === b - 1) {
                            q.data.push(c(q.val));
                            break
                        } else q.position++;
                    return q.data.join("")
                },
                decompress: function(a) {
                    return null === a ? "" : "" === a ? null : d._decompress(a.length,
                        32768,
                        function(b) {
                            return a.charCodeAt(b)
                        })
                },
                _decompressBits: function(a, b) {
                    for (var c = 1, d = 0, h; c !== a;) h = b.val & b.position, b.position >>= 1, 0 === b.position && (b.position = b.resetValue, b.val = b.getNextValue(b.index++)), d |= (0 < h ? 1 : 0) * c, c <<= 1;
                    return d
                },
                _decompress: function(a, c, f) {
                    var k = [0, 1, 2],
                        h = "",
                        p = [];
                    f = {
                        val: f(0),
                        position: c,
                        index: 1,
                        resetValue: c,
                        getNextValue: f,
                        dictSize: 4,
                        numBits: 3,
                        enlargeIn: 4
                    };
                    h = d._decompressBits(Math.pow(2, 2), f);
                    switch (h) {
                        case 0:
                            h = d._decompressBits(Math.pow(2, 8), f);
                            h = b(h);
                            break;
                        case 1:
                            h = d._decompressBits(Math.pow(2,
                                16), f);
                            h = b(h);
                            break;
                        default:
                            return ""
                    }
                    c = k[3] = h;
                    for (p.push(h);;) {
                        if (f.index > a) return "";
                        h = d._decompressBits(Math.pow(2, f.numBits), f);
                        switch (h) {
                            case 0:
                                h = d._decompressBits(Math.pow(2, 8), f);
                                k[f.dictSize++] = b(h);
                                h = f.dictSize - 1;
                                f.enlargeIn--;
                                break;
                            case 1:
                                h = d._decompressBits(Math.pow(2, 16), f);
                                k[f.dictSize++] = b(h);
                                h = f.dictSize - 1;
                                f.enlargeIn--;
                                break;
                            case 2:
                                return p.join("")
                        }
                        0 === f.enlargeIn && (f.enlargeIn = Math.pow(2, f.numBits), f.numBits++);
                        if (k[h]) h = k[h];
                        else if (h === f.dictSize) h = c + c.charAt(0);
                        else return null;
                        p.push(h);
                        k[f.dictSize++] = c + h.charAt(0);
                        f.enlargeIn--;
                        c = h;
                        0 === f.enlargeIn && (f.enlargeIn = Math.pow(2, f.numBits), f.numBits++)
                    }
                }
            };
        return d
    };
    __adroll__.prototype.encode_utf8 = function(a) {
        return encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function(a, c) {
            return String.fromCharCode("0x" + c)
        })
    };
    __adroll__.prototype.decode_utf8 = function(a) {
        return decodeURIComponent(a.split("").map(function(a) {
            return "%" + ("00" + a.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))
    };
    __adroll__.prototype.macro_values = function() {
        var a = this._ensure_global("adroll_cpm_macro", null),
            b = this._ensure_global("adroll_url_macro", null),
            c = this._ensure_global("adroll_c_macro", null),
            d = this._ensure_global("adroll_subnetwork", null),
            e = this._ensure_global("adroll_ad_payload", null),
            g = this._ensure_global("adroll_win_notif", null),
            f = this._ensure_global("adroll_rtb_dict", null),
            k = this._ensure_global("adroll_debug_string", null),
            h = this._ensure_global("adroll_ad_container_version", null),
            p = this._ensure_global("adroll_pixalate_click_url",
                null),
            l = {
                r: /^\$\{.*\}$/i,
                g: /^%%.*%%$/i,
                b: /^\[.*\]$/i,
                x: /^\$\{.*\}$/i,
                t: /INSERTCLICKTRACKER/
            }[this._global("adroll_ext_network")],
            l = this._is_defined(l) ? l : /CANNOT_MATCH_THIS/,
            m = {};
        a && !l.test(a) && (m.adroll_cpm_macro = a);
        k && !l.test(k) && (m.adroll_debug_string = k);
        h && !l.test(h) && (m.adroll_ad_container_version = h);
        b && !l.test(b) && (m.adroll_url_macro = b);
        c && !l.test(c) && (m.adroll_c_macro = c);
        d && !l.test(d) && (m.adroll_subnetwork = d);
        e && !l.test(e) && (m.adroll_ad_payload = e);
        g && !/^[|$]/.test(g) && (m.adroll_win_notif = g);
        p && !l.test(p) && (m.adroll_pixalate_click_url = p);
        if (f && ("string" !== typeof f || !/^[|$]/.test(f))) {
            if ("string" === typeof f) try {
                0 === f.indexOf("b64:") && (f = atob(f.substr(4))), f = this.jsonParse(f)
            } catch (n) {
                this.log("failed to parse: " + n), f = {}
            }
            "object" === typeof f && (m.adroll_rtb_dict = f)
        }
        return m
    };
    __adroll__.prototype.format_macros = function(a, b, c, d) {
        return this.macro_url_params(this.macro_values(), a, b, c, d)
    };
    __adroll__.prototype.macro_url_params = function(a, b, c, d, e) {
        e = this._is_defined(e) ? e : !1;
        var g = d ? window.escape : function(a) {
                return a
            },
            f = a.adroll_cpm_macro,
            k = a.adroll_url_macro,
            h = c ? a.adroll_c_macro : null,
            p = [],
            l = this.is_lenient_click(b);
        h && 0 === h.indexOf("http") ? (l = g, "g" === this._global("adroll_ext_network") && (l = d ? function(a) {
            return a
        } : window.unescape), p.push(["clickurl", l(h)])) : l && e && p.push(["clickurl", ""]);
        this._global("adroll_ad_destination_url") && !e && (p.push(["desturl", g(this._global("adroll_ad_destination_url"))]),
            this._global("adroll_ad_destination_url_signature") && p.push(["s", this._global("adroll_ad_destination_url_signature")]));
        this._global("adroll_ext_network") && p.push(["adroll_network", this._global("adroll_ext_network")]);
        f && p.push(["cpm", f]);
        a.adroll_subnetwork && p.push(["adroll_subnetwork", a.adroll_subnetwork]);
        a.adroll_ad_payload && p.push(["adroll_ad_payload", a.adroll_ad_payload]);
        a.adroll_debug_string && p.push(["debug_string", g(a.adroll_debug_string)]);
        a.adroll_ad_container_version && p.push(["adroll_ad_container_version",
            g(a.adroll_ad_container_version)
        ]);
        a.adroll_pixalate_click_url && p.push(["adroll_pixalate_click_url", g(a.adroll_pixalate_click_url)]);
        k && (a = this.parseUri(window.unescape(k)), p.push(["site_url", g("http://" + a.host)]), c && (p.push(["adroll_width", g(this._global("adroll_width"))]), p.push(["adroll_height", g(this._global("adroll_height"))])));
        this._global("adroll_insertion_id") && p.push(["adroll_insertion_id", this._global("adroll_insertion_id")]);
        this.log("Macros found " + this.serialize(p));
        return b ? this.buildurl(b,
            p) : this.serialize(p)
    };
    __adroll__.prototype.serialize = function(a) {
        if (a.length) {
            for (var b = [], c = a.length - 1; 0 <= c; c--) b.push(a[c].join("="));
            return b.join("&")
        }
        return ""
    };
    __adroll__.prototype.includes = function(a, b) {
        return -1 !== a.indexOf(b)
    };
    __adroll__.prototype.startswith = function(a, b) {
        return 0 === a.indexOf(b)
    };
    __adroll__.prototype.endswith = function(a, b) {
        return -1 !== a.indexOf(b, a.length - b.length)
    };
    __adroll__.prototype.buildurl = function(a, b) {
        var c = this.serialize(b),
            d = a.indexOf("?");
        return c ? d === a.length - 1 ? a + c : -1 !== d ? "&" === a[a.length - 1] ? a + c : a + "&" + c : a + "?" + c : a
    };
    __adroll__.prototype.md5 = function() {
        function a(a, b) {
            var c = (a & 65535) + (b & 65535);
            return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
        }

        function b(b, c, d, e, g, f) {
            c = a(a(c, b), a(e, f));
            return a(c << g | c >>> 32 - g, d)
        }

        function c(a, c, d, e, g, f, q) {
            return b(c & d | ~c & e, a, c, g, f, q)
        }

        function d(a, c, d, e, g, f, q) {
            return b(c & e | d & ~e, a, c, g, f, q)
        }

        function e(a, c, d, e, g, f, q) {
            return b(d ^ (c | ~e), a, c, g, f, q)
        }

        function g(g, h) {
            var f = g[0],
                l = g[1],
                m = g[2],
                n = g[3],
                f = c(f, l, m, n, h[0], 7, -680876936),
                n = c(n, f, l, m, h[1], 12, -389564586),
                m = c(m, n, f, l, h[2], 17, 606105819),
                l = c(l,
                    m, n, f, h[3], 22, -1044525330),
                f = c(f, l, m, n, h[4], 7, -176418897),
                n = c(n, f, l, m, h[5], 12, 1200080426),
                m = c(m, n, f, l, h[6], 17, -1473231341),
                l = c(l, m, n, f, h[7], 22, -45705983),
                f = c(f, l, m, n, h[8], 7, 1770035416),
                n = c(n, f, l, m, h[9], 12, -1958414417),
                m = c(m, n, f, l, h[10], 17, -42063),
                l = c(l, m, n, f, h[11], 22, -1990404162),
                f = c(f, l, m, n, h[12], 7, 1804603682),
                n = c(n, f, l, m, h[13], 12, -40341101),
                m = c(m, n, f, l, h[14], 17, -1502002290),
                l = c(l, m, n, f, h[15], 22, 1236535329),
                f = d(f, l, m, n, h[1], 5, -165796510),
                n = d(n, f, l, m, h[6], 9, -1069501632),
                m = d(m, n, f, l, h[11], 14, 643717713),
                l = d(l, m, n, f, h[0], 20, -373897302),
                f = d(f, l, m, n, h[5], 5, -701558691),
                n = d(n, f, l, m, h[10], 9, 38016083),
                m = d(m, n, f, l, h[15], 14, -660478335),
                l = d(l, m, n, f, h[4], 20, -405537848),
                f = d(f, l, m, n, h[9], 5, 568446438),
                n = d(n, f, l, m, h[14], 9, -1019803690),
                m = d(m, n, f, l, h[3], 14, -187363961),
                l = d(l, m, n, f, h[8], 20, 1163531501),
                f = d(f, l, m, n, h[13], 5, -1444681467),
                n = d(n, f, l, m, h[2], 9, -51403784),
                m = d(m, n, f, l, h[7], 14, 1735328473),
                l = d(l, m, n, f, h[12], 20, -1926607734),
                f = b(l ^ m ^ n, f, l, h[5], 4, -378558),
                n = b(f ^ l ^ m, n, f, h[8], 11, -2022574463),
                m = b(n ^ f ^ l, m, n, h[11], 16,
                    1839030562),
                l = b(m ^ n ^ f, l, m, h[14], 23, -35309556),
                f = b(l ^ m ^ n, f, l, h[1], 4, -1530992060),
                n = b(f ^ l ^ m, n, f, h[4], 11, 1272893353),
                m = b(n ^ f ^ l, m, n, h[7], 16, -155497632),
                l = b(m ^ n ^ f, l, m, h[10], 23, -1094730640),
                f = b(l ^ m ^ n, f, l, h[13], 4, 681279174),
                n = b(f ^ l ^ m, n, f, h[0], 11, -358537222),
                m = b(n ^ f ^ l, m, n, h[3], 16, -722521979),
                l = b(m ^ n ^ f, l, m, h[6], 23, 76029189),
                f = b(l ^ m ^ n, f, l, h[9], 4, -640364487),
                n = b(f ^ l ^ m, n, f, h[12], 11, -421815835),
                m = b(n ^ f ^ l, m, n, h[15], 16, 530742520),
                l = b(m ^ n ^ f, l, m, h[2], 23, -995338651),
                f = e(f, l, m, n, h[0], 6, -198630844),
                n = e(n, f, l, m, h[7],
                    10, 1126891415),
                m = e(m, n, f, l, h[14], 15, -1416354905),
                l = e(l, m, n, f, h[5], 21, -57434055),
                f = e(f, l, m, n, h[12], 6, 1700485571),
                n = e(n, f, l, m, h[3], 10, -1894986606),
                m = e(m, n, f, l, h[10], 15, -1051523),
                l = e(l, m, n, f, h[1], 21, -2054922799),
                f = e(f, l, m, n, h[8], 6, 1873313359),
                n = e(n, f, l, m, h[15], 10, -30611744),
                m = e(m, n, f, l, h[6], 15, -1560198380),
                l = e(l, m, n, f, h[13], 21, 1309151649),
                f = e(f, l, m, n, h[4], 6, -145523070),
                n = e(n, f, l, m, h[11], 10, -1120210379),
                m = e(m, n, f, l, h[2], 15, 718787259),
                l = e(l, m, n, f, h[9], 21, -343485551);
            g[0] = a(f, g[0]);
            g[1] = a(l, g[1]);
            g[2] =
                a(m, g[2]);
            g[3] = a(n, g[3])
        }
        var f = "0123456789abcdef".split("");
        return function(a) {
            var b = a;
            /[\x80-\xFF]/.test(b) && (b = unescape(encodeURI(b)));
            var c = b.length;
            a = [1732584193, -271733879, -1732584194, 271733878];
            var d;
            for (d = 64; d <= b.length; d += 64) {
                for (var e = b.substring(d - 64, d), n = [], q = void 0, q = 0; 64 > q; q += 4) n[q >> 2] = e.charCodeAt(q) + (e.charCodeAt(q + 1) << 8) + (e.charCodeAt(q + 2) << 16) + (e.charCodeAt(q + 3) << 24);
                g(a, n)
            }
            b = b.substring(d - 64);
            e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (d = 0; d < b.length; d++) e[d >> 2] |= b.charCodeAt(d) << (d %
                4 << 3);
            e[d >> 2] |= 128 << (d % 4 << 3);
            if (55 < d)
                for (g(a, e), d = 0; 16 > d; d++) e[d] = 0;
            e[14] = 8 * c;
            g(a, e);
            for (b = 0; b < a.length; b++) {
                c = a;
                d = b;
                e = a[b];
                n = "";
                for (q = 0; 4 > q; q++) n += f[e >> 8 * q + 4 & 15] + f[e >> 8 * q & 15];
                c[d] = n
            }
            return a.join("")
        }
    }();
    __adroll__.prototype._log_multiple_ids = function() {
        var a = this;
        this.if_under_experiment_js("multidexp", function() {
            a._log_pex_event("multid", "load", "", "", "")
        }, function() {})
    };
    __adroll__.prototype._init_floc_trial = function() {
        var a = window.document.createElement("meta");
        a.httpEquiv = "origin-trial";
        a.content = "A41wt2Lsq30A9Ox/WehogvJckPI4aY9RoSxhb8FMtVnqaUle1AtI6Yf7Wk+7+Wm0AfDDOkMX+Wn6wnDpBWYgWwYAAAB8eyJvcmlnaW4iOiJodHRwczovL2Fkcm9sbC5jb206NDQzIiwiZmVhdHVyZSI6IkludGVyZXN0Q29ob3J0QVBJIiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==";
        this._head().appendChild(a)
    };
    __adroll__.prototype._log_floc_cohort = function() {
        var a = this._global("adroll_seg_eid") || "";
        if ("function" === typeof window.document.interestCohort) {
            var b = this;
            window.document.interestCohort().then(function(c) {
                if (c) {
                    var d = c.id;
                    c = c.version;
                    d && c && b._log_pex_event("floc", d, c, {
                        seg: a
                    }, null)
                }
            })["catch"](function(a) {
                b.log("floc-error:" + a)
            })
        }
    };
    __adroll__.prototype._log_pex_event = function(a, b, c, d, e) {
        a = encodeURIComponent(a);
        b = encodeURIComponent(b);
        c = encodeURIComponent(c);
        var g = this._ensure_global("adroll_adv_id", ""),
            f = this._ensure_global("adroll_pix_id", "");
        e = e ? "&ex=" + encodeURIComponent(this.jsonStringify(e)) : "";
        var k = "";
        "object" === typeof d && (k = "&" + this.object_to_querystring(d));
        d = this._srv("/pex/" + g + "/" + f + "?ev=" + a + "&es=" + b + "&esv=" + c + "&pv=" + this.pv + k + e);
        "function" === typeof navigator.sendBeacon ? navigator.sendBeacon(d) : this.imgRequest(d)
    };
    __adroll__.prototype._pixel_timing = function(a, b, c) {
        function d() {
            k.session_time += (new Date).getTime() - (c || 0)
        }

        function e(a, b) {
            var d = b;
            18E5 < k.session_time && (d = "newsession", k.preconsent_sent = !1, k.prepixel_sent = !1);
            b = d;
            if (!("preconsent" === b && k.preconsent_sent || "prepixel" === b && k.prepixel_sent)) {
                d = b;
                k.preconsent_sent = k.preconsent_sent || "preconsent" === d;
                k.prepixel_sent = k.prepixel_sent || "prepixel" === d;
                "newsession" === b && (a = 0, c = h = (new Date).getTime(), k.pixelstart = h, k.session_time = 0);
                d = ["f=" + a];
                "undefined" !==
                typeof b && d.push("ft=" + b);
                var e = k._global("adct");
                e && "undefined" !== e && d.push("adct=" + window.escape(e));
                d = encodeURIComponent(d.join("&"));
                d = k._srv("/onp/" + k._global("adroll_adv_id") + "/" + k._global("adroll_pix_id") + "?ev=" + d);
                "function" === typeof navigator.sendBeacon ? navigator.sendBeacon(d) : k.imgRequest(d)
            }
        }

        function g(a, b) {
            window.setTimeout(function() {
                !b || !0 !== window.__adroll_consent && !0 !== (window.__adroll_consent || {}).a || (d(), e(k.session_time, "preconsent"), "object" === typeof window.performance && e(k.pixelstart -
                    window.performance.timing.domInteractive, "prepixel"))
            }, 500 * Math.random())
        }

        function f(a) {
            if ("visible" === window.document.visibilityState || a.type in p) k._pixel_timing(!1, !1, h);
            else if ("hidden" === window.document.visibilityState || a.type in l) !0 === window.__adroll_consent || !0 === (window.__adroll_consent || {}).a ? (d(), e(k.session_time)) : d()
        }
        var k = this,
            h = (new Date).getTime(),
            p = ["focus", "focusin", "pageshow"],
            l = ["blur", "focusout", "pagehide"];
        0 === k.pixelstart && (k.pixelstart = h);
        "function" === typeof window.__tcfapi &&
            !0 === b && (b = !1, window.__tcfapi("addEventListener", 2, g));
        !0 !== window.__adroll_consent && !0 !== (window.__adroll_consent || {}).a ? window.setTimeout(function() {
            k._pixel_timing(!0, b, h)
        }, 500) : !0 === a && ("hidden" in window.document ? window.document.addEventListener("visibilitychange", f) : "mozHidden" in window.document ? window.document.addEventListener("mozvisibilitychange", f) : "webkitHidden" in window.document ? window.document.addEventListener("webkitvisibilitychange", f) : "msHidden" in window.document ? window.document.addEventListener("msvisibilitychange",
            f) : "onfocusin" in window.document ? (window.document.addEventListener("focusin", f), window.document.addEventListener("focusout", f)) : (window.document.addEventListener("pageshow", f), window.document.addEventListener("pagehide", f), window.document.addEventListener("focus", f), window.document.addEventListener("blur", f)))
    };
    __adroll__.prototype._gurl = function() {
        var a = window.location;
        return this.normalize_url(a.pathname + a.search)
    };
    __adroll__.prototype.get_dummy_product_for_facebook = function(a) {
        return {
            product_id: "adroll_dummy_product",
            product_group: a,
            product_action: null,
            product_category: null
        }
    };
    __adroll__.prototype.facebook_dummy_product_enabled = function() {
        return !0
    };
    __adroll__.prototype.extract_pid = function(a, b, c, d, e) {
        if (this._is_v1_to_v2_shim() && !d && !e) return this._v1_to_v2_shim_extract_pid(a, b, c);
        a || (a = {});
        var g = null,
            f = this._gurl(),
            g = null;
        if ("2.0" !== this.get_version()) return null;
        var g = "productView" === b ? "" : b,
            k = null;
        c && (k = c.products);
        k && 0 !== k.length || (k = this.extract_product_from_rollcrawl_opts(a, f));
        (!k || 0 === k.length) && c && c.hasOwnProperty("product_id") && c.product_id && (k = [this.copyObj(c, ["products"])]);
        a = [];
        if (k)
            for (f = 0; f < k.length; f++) {
                var h = k[f].product_id;
                null !== h && "" !== h && "undefined" !== h && a.push(k[f])
            }
        if (a && 0 !== a.length) g = {
            product_action: g,
            product_list: a
        };
        else if (this.facebook_dummy_product_enabled() && "facebook" === d) g = this.get_dummy_product_for_facebook(null);
        else return this._callUserEventEndpoint(b, c), null;
        e && e(g);
        return g
    };
    __adroll__.prototype.extract_product_from_rollcrawl_opts = function(a, b) {
        function c(a) {
            return a ? (a = new RegExp(a, "gi"), !!a.exec(b)) : null
        }
        var d = null,
            e = null,
            g = null;
        if (a.regexp_group && !("string" === a.regexp_group && a.regexp_group instanceof String) && "html" === a.regexp_group.scheme) {
            if (c(a.blacklist_regexp) || !0 !== c(a.regexp)) return "";
            d = this.get_product_id_from_dom(a.regexp_group)
        } else if (!d) {
            if (c(a.blacklist_regexp)) return "";
            d = this.get_product_id_from_url(b, a.regexp, a.regexp_group)
        }
        e || !a.product_group_group ||
            "string" === a.product_group_group && a.product_group_group instanceof String || "html" !== a.product_group_group.scheme ? e || a.product_group_regexp && (e = this.get_product_id_from_url(b, a.product_group_regexp, a.product_group_group)) : e = this.get_product_id_from_dom(a.product_group_group);
        if (d) {
            var f = {},
                g = [];
            f.product_id = d;
            f.product_group = e;
            g.push(f)
        }
        return g
    };
    __adroll__.prototype.get_pid = function(a) {
        if (this._is_v1_to_v2_shim()) return this._v1_to_v2_shim_get_pid(a);
        var b = function(b, d) {
            this.is_product_event(b) && this.extract_pid(a, b, d, "adroll", function(a) {
                if (a) {
                    var g = a.product_action,
                        f = a.product_list;
                    if (f && 0 !== f.length) {
                        a = this.copyObj(d) || {};
                        var k = [];
                        g && k.push(["adroll_product_action", this.normalize_var((g + "").toLowerCase(), !0)]);
                        f && (k.push(["adroll_products", window.encodeURIComponent(this.jsonStringify(f))]), a.products || (a.products = f));
                        k.push(["adroll_version",
                            this.get_version()
                        ]);
                        (g = this.external_data_to_qs(d, !0)) && k.push([g]);
                        g = this._srv(this.buildurl("/p/" + this._global("adroll_adv_id") + "/", k));
                        k = window.document.createElement("img");
                        k.src = g;
                        k.height = k.width = 1;
                        k.border = 0;
                        k.setAttribute("alt", "");
                        this._head().appendChild(k);
                        this._callUserEventEndpoint(b, a)
                    }
                }
            }.bind(this))
        }.bind(this);
        this.registerTrackCallback(b, "productEventCallback")
    };
    __adroll__.prototype.get_product_id_from_dom = function(a) {
        var b = null,
            c;
        a.path && (window.jQuery ? (c = window.jQuery(a.path), c.length && (c = c.eq(0), b = "text" === a.attribute ? c.text() : c.attr(a.attribute))) : window.Prototype && window.$$ ? (c = window.$$(a.path), c.length && (c = c[0], b = "text" === a.attribute ? c.innerText && !window.opera ? c.innerText : c.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g, " ") : c.readAttribute(a.attribute))) : window.YUI ? (c = window.YUI().use("node"), c.one && (c = c.one(a.path), b = null, c && (b = "text" ===
            a.attribute ? c.get("text") : c.getAttribute(a.attribute)))) : window.MooTools && window.$$ && (c = window.$$(a.path), c.length && (c = c[0], b = "text" === a.attribute ? c.get("text") : c.getProperty(a.attribute))));
        if (b && (b = b.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), a.regular_expression && a.regular_expression_replace))
            if (c = new RegExp(a.regular_expression, "gi"), b = c.exec(b), null !== b) {
                a = a.regular_expression_replace;
                for (c = 0; c < b.length; c++) a = a.replace(new RegExp("\\\\" + c, "gi"), b[c] || "");
                b = a
            } else b = "";
        return b
    };
    __adroll__.prototype.get_product_id_from_url = function(a, b, c) {
        var d = null;
        try {
            d = parseInt(c)
        } catch (e) {}
        return null !== d && !isNaN(d) && b && (a = (new RegExp(b, "gi")).exec(a), null !== a && d in a) ? a[d] : null
    };
    __adroll__.prototype.store_adroll_loaded_record = function(a, b) {
        window.adroll_loaded = (window.adroll_loaded || []).concat({
            version: this.version,
            ts: (new Date).getTime(),
            adroll_adv_id: a,
            adroll_pix_id: b
        })
    };
    __adroll__.prototype.get_segment_url = function(a, b, c) {
        return this._srv("/segment" + this.get_segment_path(a, b, c))
    };
    __adroll__.prototype.get_segment_path = function(a, b, c) {
        this.expire_old();
        var d = this.get_keywords(),
            e = [];
        try {
            e.push("adroll_s_ref=" + window.escape(window.document.referrer))
        } catch (r) {}
        try {
            e.push("keyw=" + window.escape(d))
        } catch (r) {}
        c = this._v1_to_v2_shim_use_globals(c, e);
        try {
            var g = c.segment_name || c.adroll_segments;
            this.is_null_or_blank(g) || e.push("name=" + window.escape(g.toLowerCase()))
        } catch (r) {}
        try {
            var f = this.get_conversion_value(c);
            f.conv_value && e.push("conv_value=" + f.conv_value);
            f.currency && e.push("adroll_currency=" +
                f.currency)
        } catch (r) {}
        try {
            var k = c.adroll_email;
            if (!this.is_null_or_blank(k)) {
                var k = k.replace(/^\s+|\s+$/g, ""),
                    h = k.toLowerCase(),
                    g = d = null;
                this.is_already_hashed(h) ? e.push("hashed_email=" + h) : this.is_email_valid(k) ? (g = this.md5(h), e.push("hashed_email=" + g), d = h.split("@")[1]) : (e.push("data_error=email"), e.push("data_error_message=invalid_format"));
                if (d) {
                    e.push("email_domain=" + d);
                    var p = {
                        hashed_email: g,
                        sha256_email: this.sha256(h)
                    };
                    p.email_domain = d;
                    var l = this._reg_lpq("epq", p);
                    e.push(l)
                }
            }
        } catch (r) {}
        try {
            if (this._has_user_identifier()) {
                var m =
                    this._global("adroll_user_identifier"),
                    m = m.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                e.push("user_identifier=" + window.encodeURIComponent(m))
            }
        } catch (r) {}
        try {
            var n = this._global("adct"),
                q = this.extract_query_param("adct", window.location.search.substr(1));
            q && "undefined" !== q && n !== q && (this._set_global("adct", q), e.push("adct=" + window.escape(q)))
        } catch (r) {}
        try {
            if (((window.performance || {}).timing || {}).domLoading) {
                var t = this.pxlstart - window.performance.timing.domLoading;
                !isNaN(t) && 0 < t && e.push("p0=" + t)
            }
        } catch (r) {}
        try {
            var u =
                this.external_data_to_qs(c, !0);
            u && e.push(u)
        } catch (r) {}!this.is_under_experiment("nofledge") && navigator.joinAdInterestGroup && e.push("xa4=1");
        e.push("adroll_version=" + this.get_version());
        this._v1_to_v2_shim_unset_globals();
        return this.get_base_url("", a, b, null, "", e)
    };
    __adroll__.prototype.loadGlobalFunctions = function() {
        var a = this._global("adroll");
        if (a && "object" === typeof a) {
            var b = this;
            a.setProperties = function() {
                return b.setProperties.apply(b, arguments)
            };
            a.identify = function() {
                return b.identify.apply(b, arguments)
            };
            a.track = function() {
                return b.track.apply(b, arguments)
            };
            for (var c, d, e = 0; e < a.length; e++) c = a[e][0], d = a[e][1], "setProperties" === c ? this.setProperties.apply(this, d) : "identify" === c ? this.identify.apply(this, d) : "track" === c && this.track.apply(this, d)
        }
    };
    __adroll__.prototype.get_base_url = function(a, b, c, d, e, g) {
        var f = a.split("?");
        a = f[0] + "/" + b + "/" + c + (d ? "/" + d : "") + (e ? "/" + e : "");
        var k = "?";
        f[1] && (a += "?" + f[1], k = "&");
        var f = k + "no-cookies=1",
            h = "";
        this.cookieEnabled() ? (h = window.escape(this.get_eids()), a += k + "cookie=" + h) : a += f;
        g && (a += "&" + g.join("&"));
        a = this.add_tpc_to_url(a);
        if (a.length > this._url) {
            try {
                this.del(this.__adc)
            } catch (p) {}
            if (a.length - h.length > this._url) return a;
            this.log("Url was too big, shrinking it");
            return this.get_url(b, c, d, e, g)
        }
        this.log("Generated url: " +
            a);
        return a
    };
    __adroll__.prototype.add_script_element = function(a, b) {
        var c = window.document.createElement("script"),
            d = this._secure() ? "https://" : "http://";
        a.match(/^(\w+:)*\/\//) && (d = "");
        for (var e in b) b.hasOwnProperty(e) && "src" !== e && c.setAttribute(e, b[e]);
        c.type = "text/javascript";
        c.src = d + a;
        this._head().appendChild(c);
        return c
    };
    __adroll__.prototype.get_url = function(a, b, c, d, e) {
        var g = c ? this._srv("/c") : this._srv("/r");
        return this.get_base_url(g, a, b, c, d, e)
    };
    __adroll__.prototype.get_eids = function() {
        try {
            for (var a = this.get(this.__adc), b = a ? a.split("|") : "", a = [], c = b.length - 1; 0 <= c; c--)
                if (b[c] && "" !== b[c]) {
                    var d = b[c].split(":");
                    a.push([d[0], d[2]].join(":"))
                }
            return a.join("|")
        } catch (e) {
            return this.del(this.__adc), ""
        }
    };
    __adroll__.prototype.add_pixel_load_callback = function(a) {
        this._loaded && a.call(this);
        this._load_cbs = (this._load_cbs || []).concat(a)
    };
    __adroll__.prototype.pixel_loaded = function() {
        this._loaded = !0;
        for (var a = this._load_cbs || []; 0 < a.length;) {
            var b = a.shift();
            try {
                b.call(this)
            } catch (c) {
                this.log("pixel_loaded callback error: " + c)
            }
        }
    };
    __adroll__.prototype.sha256 = function(a) {
        function b(a, b) {
            return a >>> b | a << 32 - b
        }
        var c = window.unescape(window.encodeURIComponent(a)),
            d = Math.pow(2, 32),
            e, g = "",
            f = [],
            k = 8 * c.length,
            h = [],
            p = [];
        e = 0;
        for (var l = {}, m = 2; 64 > e; m++)
            if (!l[m]) {
                for (a = 0; 313 > a; a += m) l[a] = m;
                h[e] = Math.pow(m, .5) * d | 0;
                p[e++] = Math.pow(m, 1 / 3) * d | 0
            }
        for (c += "\u0080"; 0 !== c.length % 64 - 56;) c += "\x00";
        for (a = 0; a < c.length; a++) {
            e = c.charCodeAt(a);
            if (e >> 8) return null;
            f[a >> 2] |= e << (3 - a) % 4 * 8
        }
        f[f.length] = k / d | 0;
        f[f.length] = k;
        for (e = 0; e < f.length;) {
            c = f.slice(e, e += 16);
            d =
                h;
            h = h.slice(0, 8);
            for (a = 0; 64 > a; a++) {
                var l = c[a - 15],
                    m = c[a - 2],
                    k = h[0],
                    n = h[4],
                    l = h[7] + (b(n, 6) ^ b(n, 11) ^ b(n, 25)) + (n & h[5] ^ ~n & h[6]) + p[a] + (c[a] = 16 > a ? c[a] : c[a - 16] + (b(l, 7) ^ b(l, 18) ^ l >>> 3) + c[a - 7] + (b(m, 17) ^ b(m, 19) ^ m >>> 10) | 0),
                    k = (b(k, 2) ^ b(k, 13) ^ b(k, 22)) + (k & h[1] ^ k & h[2] ^ h[1] & h[2]),
                    h = [l + k | 0].concat(h);
                h[4] = h[4] + l | 0
            }
            for (a = 0; 8 > a; a++) h[a] = h[a] + d[a] | 0
        }
        for (a = 0; 8 > a; a++)
            for (e = 3; e + 1; e--) f = h[a] >> 8 * e & 255, g += (16 > f ? 0 : "") + f.toString(16);
        return g
    };
    __adroll__.prototype._container_is_secure = function(a) {
        return this._is_defined(a) ? a : this._secure()
    };
    __adroll__.prototype.ad_servers_url = function(a, b) {
        return (this._container_is_secure(b) ? "https://" : "http://") + "d.adroll.com" + a
    };
    __adroll__.prototype.ad_request_url = function(a, b, c, d, e) {
        var g = this._global("adroll_a_id"),
            f = this._global("adroll_s_id"),
            k = this._global("adroll_insertion_id");
        a = this.ad_servers_url("/r/" + f + "/" + g + "/" + k + "." + a, e);
        return this.format_macros(a, b, c, d)
    };
    __adroll__.prototype.click_url = function(a, b) {
        var c = this.ad_servers_url(a ? "/click/lenient/" : "/click/", !1);
        return this.format_macros(c, !0, !0, b)
    };
    __adroll__.prototype.engage_url = function() {
        var a = this.ad_servers_url("/event/");
        return this.format_macros(a, !1, !0, !1)
    };
    __adroll__.prototype.cdn_url = function(a, b) {
        return (this._container_is_secure(b) ? "https://s.adroll.com" : "http://a.adroll.com") + a
    };
    __adroll__.prototype.ad_file_url = function(a, b) {
        var c = this._global("adroll_ad_filename");
        a = a ? c.split(".")[0] + a : c;
        c = "/a/" + c.substring(0, 3) + "/" + c.substring(3, 6) + "/" + a;
        return this.cdn_url(c, b)
    };
    __adroll__.prototype.roll_crawl_url = function() {
        return "https://d.adroll.com/p"
    };
    __adroll__.prototype.is_lenient_click = function(a) {
        return (a = a ? this.parseUri(a) : null) && this.includes(a.path, "lenient")
    };
    __adroll__.prototype.record_user = function(a) {
        a = a || {};
        try {
            this._unset_global("adroll_page_properties")
        } catch (b) {}
        Object.keys(a).length && this._set_global("adroll_page_properties", a);
        this.dyno("recordUser", a)
    };
    __adroll__.prototype.record_adroll_email = function(a) {
        this._record_adroll_email(a, "/id")
    };
    __adroll__.prototype.record_adroll_private_email = function(a) {
        this._record_adroll_email(a, "/idp")
    };
    __adroll__.prototype._record_adroll_email = function(a, b) {
        if (this._has_email()) {
            var c = this._global("_adroll_email"),
                c = c.replace(/^\s+|\s+$/g, ""),
                d, e, g = c.toLowerCase(),
                f = this.is_email_valid(c);
            this.is_already_hashed(g) ? d = g : f && (d = this.md5(g), e = this.sha256(g));
            c = b || "/id";
            d = {
                hashed_email: d,
                sha256_email: e
            };
            f && (g = g.split("@")[1], d.email_domain = g);
            a && (d.idsource = a);
            g = [
                [this._global("adroll_adv_id")]
            ];
            this._has_global("adroll_inc_ids") && (g = g.concat(this._global("adroll_inc_ids")));
            d = this._reg_lpq("?epq", d);
            for (e = 0; e < g.length; e++) this.imgRequest(this._srv(c + "/" + g[e][0] + "/" + d))
        }
    };
    __adroll__.prototype._send_plain_text_identifiers = function(a, b, c) {
        if ((a || b) && c) {
            c = {
                idsource: c
            };
            var d = (!1 === window.adroll_sendrolling_cross_device ? "/idp/" : "/id/") + this._global("adroll_adv_id") + "/";
            if (a) {
                a = a.replace(/^\s+|\s+$/g, "").toLowerCase();
                var e = a.split("@")[1];
                c.email = a;
                c.hashed_email = this.md5(a);
                c.sha256_email = this.sha256(a);
                c.email_domain = e
            }
            b && (c.user_identifier = b);
            d += this._reg_lpq("?epq", c);
            this.imgRequest(this._srv(d))
        }
    };
    __adroll__.prototype._has_email = function() {
        return this._has_global("_adroll_email")
    };
    __adroll__.prototype._has_user_identifier = function() {
        return this._has_global("adroll_user_identifier") && "example_user_id" !== this._global("adroll_user_identifier")
    };
    __adroll__.prototype.is_already_hashed = function(a) {
        return /^[a-f0-9]{32}$/.test(a)
    };
    __adroll__.prototype.is_email_valid = function(a) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(a)
    };
    __adroll__.prototype.identify = function(a, b) {
        (a.email || a.userId) && this._send_plain_text_identifiers(a.email, a.userId, b || "adroll-identify");
        a.email && this._set_global("_adroll_email", a.email);
        var c = this.copyObj(a, ["email", "userId"]);
        c && (c = this._srv("/uat/" + this._global("adroll_adv_id") + "/" + this._global("adroll_pix_id") + "/?user_attributes=" + window.encodeURIComponent(this.jsonStringify(c))), b && (c += "&idsource=" + b), this.imgRequest(c));
        this._queueAndCallback("identify", [a, b])
    };
    __adroll__.prototype.setProperties = function(a) {
        if (this._has_global("adroll_page_properties")) {
            var b = this._global("adroll_page_properties");
            this._unset_global("adroll_page_properties");
            this.extendObj(b, a);
            this._set_global("adroll_page_properties", b)
        } else this._set_global("adroll_page_properties", a)
    };
    __adroll__.prototype.appendPageProperties = function(a) {
        this._has_global("adroll_page_properties") && (a = this.extendObj(this._global("adroll_page_properties"), a));
        return a
    };
    __adroll__.prototype._callUserEventEndpoint = function(a, b) {
        var c = "";
        !this.is_under_experiment("nofledge") && navigator.joinAdInterestGroup && (c = "&xa4=1");
        var c = this._srv("/uev/" + this._global("adroll_adv_id") + "/" + this._global("adroll_pix_id") + "/?event_name=" + window.encodeURIComponent(a) + c + "&adroll_version=" + this.get_version()),
            d = this.copyObj(b);
        if (d) {
            c += "&event_attributes=" + window.encodeURIComponent(this.jsonStringify(d));
            try {
                var e = this.get_conversion_value(d);
                e.conv_value && (c += "&conv_value=" + window.encodeURIComponent(e.conv_value));
                e.currency && (c += "&adroll_currency=" + window.encodeURIComponent(e.currency))
            } catch (g) {}
        }
        this.imgRequest(c)
    };
    __adroll__.prototype.identify_email = function(a) {
        var b = this;
        this.add_pixel_load_callback(function() {
            function c() {
                if (window.__adroll_idem0) window.__adroll_idem0(a, "adroll-identify-email");
                else if (0 < d) {
                    --d;
                    for (var e = window.document.querySelectorAll("script"), g = 0; g < e.length; g++)
                        if (e[g].src.match(/sendrolling/)) {
                            window.setTimeout(c, 500);
                            return
                        }
                    window._adroll_email = a;
                    b.record_adroll_private_email("adroll-identify-email")
                }
            }
            var d = 3;
            c()
        })
    };
    __adroll__.prototype.track = function(a, b) {
        this._track_pxl_assistant(a, b);
        a && this._ensure_global("__adroll_consent", null) && (b = b ? this.appendPageProperties(b) : this.get_page_properties(), "pageView" === a ? this.dyno("fbDynoCallback", b) : (this.is_product_event(a) ? this.get_pid(this._global("adroll_rollcrawl_opts")) : this._callUserEventEndpoint(a, b), this._queueAndCallback("track", [a, b])))
    };
    __adroll__.prototype._registerCallback = function(a, b, c) {
        this.callbacks = this.callbacks || {};
        this.callbackNames = this.callbackNames || [];
        this.callbacks[a] = this.callbacks[a] || [];
        if (!("function" !== typeof b || -1 < this.callbackNames.indexOf(c)) && (this.callbackNames.push(c), this.callbacks[a].push(b), this.callbackQueues && this.callbackQueues[a] && this.callbackQueues[a].length))
            for (c = 0; c < this.callbackQueues[a].length; c++) b.apply(null, this.callbackQueues[a][c])
    };
    __adroll__.prototype._queueAndCallback = function(a, b) {
        this.callbackQueues = this.callbackQueues || {};
        this.callbackQueues[a] = this.callbackQueues[a] || [];
        this.callbackQueues[a].push(b);
        if (this.callbacks && this.callbacks[a] && this.callbacks[a].length)
            for (var c = 0; c < this.callbacks[a].length; c++) this.callbacks[a][c].apply(null, b)
    };
    __adroll__.prototype.registerIdentifyCallback = function(a, b) {
        this._registerCallback("identify", a, b)
    };
    __adroll__.prototype.registerTrackCallback = function(a, b) {
        this._registerCallback("track", a, b)
    };
    __adroll__.prototype._track_pxl_assistant = function(a, b) {
        this._has_global("__adroll_pxl_assistant_track") || this._set_global("__adroll_pxl_assistant_track", []);
        this._global("__adroll_pxl_assistant_track").push({
            eventName: a,
            eventAttrs: b
        });
        if (this._nrpa_event_handler) try {
            this._nrpa_event_handler({
                track: this._global("__adroll_pxl_assistant_track")
            })
        } catch (c) {}
    };
    __adroll__.prototype._is_defined = function(a) {
        return "undefined" === a || "null" === a ? !1 : "undefined" !== typeof a
    };
    __adroll__.prototype.is_null_or_blank = function(a) {
        return null === a || !this._is_defined(a) || "" === a.trim()
    };
    __adroll__.prototype.normalize_var = function(a, b) {
        if (!a) return "";
        a = a.toString().substr(0, this._kwl).replace(/,/gi, ".");
        b && (a = window.escape(a));
        return a
    };
    __adroll__.prototype.get_version = function() {
        return this._has_global("adroll_version") ? this._global("adroll_version") : "2.0"
    };
    __adroll__.prototype.is_product_event = function(a) {
        return -1 !== this.product_events.indexOf(a)
    };
    __adroll__.prototype.get_keywords = function() {
        try {
            var a = window.document.referrer || "";
            if (!a) return "";
            var b = this.parseUri(a);
            return -1 !== b.host.indexOf("www.google.") ? b.queryKey.q.substring(0, this._kwl) : -1 !== b.host.indexOf("bing.com") ? b.queryKey.q.substring(0, this._kwl) : ""
        } catch (c) {
            return ""
        }
    };
    __adroll__.prototype.parseUri = function(a) {
        a = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(a);
        for (var b = {
                queryKey: {}
            }, c = 14, d = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" "); c--;) b[d[c]] = a[c] || "";
        b[d[12]].replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(a, c, d) {
            c && (b.queryKey[c] = d)
        });
        return b
    };
    __adroll__.prototype._secure = function() {
        return !0
    };
    __adroll__.prototype._protocol = function() {
        return window.document.location.protocol
    };
    __adroll__.prototype._native = function() {
        try {
            return "http" !== this._protocol().slice(0, 4)
        } catch (a) {
            return !0
        }
    };
    __adroll__.prototype.has_param_in_url = function(a, b) {
        var c = a.split("?");
        return 1 < c.length && -1 !== ("&" + c[1]).indexOf("&" + b + "=")
    };
    __adroll__.prototype._srv = function(a, b) {
        a = this._is_defined(a) ? a : "";
        var c = "d.adroll.com";
        b && (c = "ipv4.d.adroll.com");
        var d = a,
            e = !0;
        "https://" !== a.substr(0, 8) && (e = !1, d = "https://" + c + a);
        d = this.add_tpc_to_url(d);
        this.has_param_in_url(d, "arrfrr") || (c = this._get_arrfrr(), d = this.add_param_to_url(d, "arrfrr=" + encodeURIComponent(c)));
        this.has_param_in_url(d, "pv") || (d = this.add_param_to_url(d, "pv=" + this.pv));
        window.navigator.joinAdInterestGroup && (d = this.add_param_to_url(d, "flg=1"));
        return this.add_consent_to_url(this.add_fpc_to_url(d,
            e))
    };
    __adroll__.prototype._get_arrfrr = function(a) {
        a || (a = window.location.href);
        var b = a.split("#");
        a = b.shift();
        var b = b.length ? "#" + b.join("#") : null,
            c = a.split("?"),
            d = this;
        if (1 < c.length) {
            var e = c[1].replace(/([^&=]+)=([^&]+)/g, function(a, b, c) {
                return b.match(/cc_number|credit_card|card_number|cv[cv]_code/) || d.is_luhn(unescape(c)) ? b + "=NR_REDACT" : b + "=" + c
            });
            c[1] !== e && (a = c[0] + "?" + e)
        }
        b && (a += b);
        return a
    };
    __adroll__.prototype.is_luhn = function(a) {
        if ("string" !== typeof a) return !1;
        a = a.replace(/\D/g, "");
        if (13 > a.length || 19 < a.length) return !1;
        for (var b = 0, c = !1, d, e = a.length - 1; 0 <= e; e--) d = parseInt(a.charAt(e), 10), c && (d *= 2, 9 < d && (d -= 9)), b += d, c = !c;
        return 0 === b % 10
    };
    __adroll__.prototype._cdn = function(a) {
        a = this._is_defined(a) ? a : "";
        return "https://s.adroll.com" + a
    };
    __adroll__.prototype.log = function(a) {
        this._logs.push(a)
    };
    __adroll__.prototype.read_log = function(a) {
        return this._logs.join(a ? "\n" : "<br>\n")
    };
    __adroll__.prototype.normalize_url = function(a) {
        return a.toLowerCase()
    };
    __adroll__.prototype.imgRequest = function(a) {
        var b = new window.Image;
        b.src = this.add_tpc_to_url(a);
        b.setAttribute("width", "1");
        b.setAttribute("height", "1");
        b.setAttribute("border", "0");
        b.setAttribute("alt", "");
        return this._head().appendChild(b)
    };
    __adroll__.prototype.repeatstr = function(a, b) {
        if (a.repeat) return a.repeat(b);
        if (1 > b) return "";
        if (b % 2) return this.repeatstr(a, b - 1) + a;
        var c = this.repeatstr(a, b / 2);
        return c + c
    };
    __adroll__.prototype.inttobits = function(a, b) {
        var c = a.toString(2);
        return c.length > b ? c.substr(c.length - b, b) : this.repeatstr("0", b - c.length) + c
    };
    __adroll__.prototype.b64tobits = function(a) {
        var b = "",
            c;
        a = a.replace(/-/g, "+").replace(/_/g, "/");
        for (var d = 0; d < a.length; d++) c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[d]).toString(2), b = b + this.repeatstr("0", 6 - c.length) + c;
        return b
    };
    __adroll__.prototype.b64toint = function(a) {
        return parseInt(this.b64tobits(a), 2)
    };
    __adroll__.prototype.bitstob64 = function(a, b) {
        for (var c = "", d, e = 0; e < a.length; e += 6) d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(parseInt(a.substr(e, 6), 2)), c += d;
        b && (c = c.replace(/\+/g, "-").replace(/\//g, "_"));
        return c
    };
    __adroll__.prototype.bitstob64 = function(a, b) {
        var c = "",
            d;
        a += "00000000".substr(0, 8 - a.length % 8);
        for (var e = 0; e < a.length; e += 6) d = a.substr(e, 6), 6 > d.length && (d = (d + "000000").substr(0, 6)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(parseInt(d, 2)), c += d;
        b && (c = c.replace(/\+/g, "-").replace(/\//g, "_"));
        return c
    };
    __adroll__.prototype.copyObj = function(a, b) {
        if (!a) return null;
        var c = {},
            d = 0,
            e;
        for (e in a) !a.hasOwnProperty(e) || b && -1 !== b.indexOf(e) || (d++, c[e] = a[e]);
        return d ? c : null
    };
    __adroll__.prototype.extendObj = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        if (Object.assign) return Object.assign.apply(this, [].concat(a, c));
        for (var d = 0; d < c.length; d++) {
            b = c[d];
            for (var e in b) b.hasOwnProperty(e) && (a[e] = b[e])
        }
        return a
    };
    __adroll__.prototype.startsWith = function(a, b) {
        return a.substring(0, b.length) === b
    };
    __adroll__.prototype.convert_to_map = function(a) {
        if (null === a) return null;
        var b = {},
            c;
        for (c in a) a.hasOwnProperty(c) && "undefined" !== a[c] && (b[c.toLowerCase()] = a[c]);
        return b
    };
    __adroll__.prototype.object_keys = function(a) {
        if (window.Object && window.Object.keys) return Object.keys(a);
        if ("object" === typeof a) return [];
        var b = [],
            c;
        for (c in a) a.hasOwnProperty(c) && b.push(c);
        return b
    };
    __adroll__.prototype.wrapException = function(a) {
        return function(b) {
            try {
                return a(b)
            } catch (c) {}
        }
    };
    __adroll__.prototype.add_tpc_to_url = function(a) {
        var b = this._global("adroll_tpc");
        if (!a || !b) return a;
        var c = a.substr(a.indexOf("://") + 3).split("/")[0];
        return a.match(/[?&]adroll_tpc=/) && "d.adroll.com" !== c ? a : this.add_param_to_url(a, "adroll_tpc=" + encodeURIComponent(b))
    };
    __adroll__.prototype.add_fpc_to_url = function(a, b) {
        var c = this.get_first_party_cookie();
        if (!a || !c) return a;
        var d = this.parseUri(a);
        return !b && (d.queryKey.adroll_fpc || "d.adroll.com" !== d.host && "ipv4.d.adroll.com" !== d.host && "d.adroll.com" !== d.host + ":" + d.port && "ipv4.d.adroll.com" !== d.host + ":" + d.port) ? a : this.add_param_to_url(a, "adroll_fpc=" + encodeURIComponent(c))
    };
    __adroll__.prototype.add_consent_to_url = function(a) {
        if (!a) return a;
        if (this.has_param_in_url(a, "_arc")) return a;
        var b = this.get_first_party_consent();
        if (!b || !b.arconsent) return a;
        var c = a.match(/^\w+:\/\/([^\/]+)/);
        return c && "d.adroll.com" !== c[1] && "ipv4.d.adroll.com" !== c[1] ? a : this.add_param_to_url(a, "_arc=" + encodeURIComponent(b.arconsent))
    };
    __adroll__.prototype.getSafariVersion = function() {
        var a = /^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i.exec(navigator.userAgent);
        return a ? a[1] : null
    };
    __adroll__.prototype.set_tpc = function(a, b) {
        var c = this.tpc_callback();
        a && b && this._set_global("adroll_tpc", encodeURIComponent(a) + "=" + encodeURIComponent(b));
        c && c.call(this)
    };
    __adroll__.prototype.tpc_callback = function(a) {
        var b = window.adroll_tpc_callback,
            c = this;
        if (!a) return window.adroll_tpc_callback = a, b;
        window.adroll_tpc_callback = function() {
            if (b) try {
                b.call(c)
            } catch (d) {
                c.log("tpc callback failed: " + d)
            }
            try {
                a.call(c)
            } catch (d) {
                c.log("tpc callback failed: " + d)
            }
        };
        return null
    };
    __adroll__.prototype.call_next_tpc = function() {
        var a = this.tpc_callback();
        window.adroll_lex33_called ? a && a.call(this) : (window.adroll_lex33_called = 1, this._call_33across(a))
    };
    __adroll__.prototype.extract_query_param = function(a, b) {
        for (var c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].split("=");
            if (decodeURIComponent(e[0]) === a) return decodeURIComponent(e[1])
        }
        return null
    };
    __adroll__.prototype.get_adroll_sid = function() {
        var a = this.get_consent_params();
        return a && (a = this.extract_query_param("_s", a)) ? a : this._global("adroll_sid")
    };
    __adroll__.prototype.load_adroll_tpc = function(a) {
        this.tpc_callback(a);
        if (this._consent_checked) return this.set_consent();
        this._consent_checked = !0;
        this.call_consent_check()
    };
    __adroll__.prototype.get_tpc_decode_timeout = function() {
        return 1500
    };
    __adroll__.prototype.init_pixchk = function() {
        this.if_under_experiment_js("pixchk", function() {
            window.addEventListener("message", this.pixchk_handler, !1)
        }, function() {}, 1E3)
    };
    __adroll__.prototype.pixchk_handler = function(a) {
        if (a.origin.match(/^https?:\/\/[^\/:]*\.adroll\.com\b/)) try {
            var b = JSON.parse(a.data);
            "pixchk" === b.cmd && a.source.postMessage(JSON.stringify({
                cmd: "pixrpl",
                adv_id: window.adroll_adv_id,
                pix_id: window.adroll_pix_id,
                token: b.token
            }), "*")
        } catch (c) {}
    };
    __adroll__.prototype.load_pixel_assistant = function() {
        if (!window.document.getElementById("adroll_nrpa_sdk")) {
            var a = (window.location.hash || "").match("nrpa=([A-Z0-7]+)8([A-F0-9]+Z)"),
                b = Math.floor((new Date).getTime() / 1E3) - 3600;
            (window.sessionStorage.getItem("adroll_nrpa_sdk") || a && a[1] === window.adroll_adv_id && !(parseInt(a[2], 16) < b)) && this.add_script_element("https://s.adroll.com/j/nrpa.js", {
                id: "adroll_nrpa_sdk"
            })
        }
    };
    __adroll__.prototype.set_webworker_vars = function() {
        var a = this._global("adroll_tpc");
        a && window.sessionStorage.setItem("adroll_tpc", a);
        window.sessionStorage.setItem("adroll_flgs", window.navigator.joinAdInterestGroup ? "1" : "0")
    };
    __adroll__.prototype.set_suspended = function() {
        this._set_global("__adroll_data_suspended", !0)
    };
    __adroll__.prototype.is_suspended = function() {
        return this._has_global("__adroll_data_suspended")
    };
    __adroll__.prototype.object_to_querystring = function(a) {
        var b = null;
        if ("object" === typeof a && ("function" === typeof window.URLSearchParams && (b = (new window.URLSearchParams(a)).toString(), "[object URLSearchParams]" === b && (b = null)), null === b)) {
            var b = "",
                c;
            for (c in a) a.hasOwnProperty(c) && (b = b + "&" + encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            b = b.substr(1)
        }
        return b
    };
    __adroll__.prototype._get_lex_timeout = function() {
        return 1E3
    };
    __adroll__.prototype.is_ipv6 = function() {
        return (this._global("__adroll_consent_data") || {}).isipv6
    };
    __adroll__.prototype._call_33across = function(a) {
        function b() {
            a && a.call(c)
        }
        var c = this;
        if (!0 === this._ensure_global("__adroll_consent_is_gdpr", null)) b();
        else {
            var d = (this._global("__adroll_consent_data") || {}).ipgeo || {},
                e = (d.country_code || "").toLowerCase(),
                d = (d.region_name || "").toLowerCase();
            if ("us" !== e || "california" === d) b();
            else if (e = navigator.userAgent.toLowerCase(), -1 === e.indexOf("safari/")) b();
            else {
                if (-1 !== e.indexOf(" edg/")) {
                    if ((e = e.match(/ edg\/([\d\.]+)/)) && 79 > parseFloat(e[1])) {
                        b();
                        return
                    }
                } else {
                    if (-1 !==
                        e.indexOf(" chrome/")) {
                        b();
                        return
                    }
                    if ((e = e.match(/ version\/([\d\.]+)/)) && 11 > parseFloat(e[1])) {
                        b();
                        return
                    }
                }
                this.if_under_experiment_js("block33a", function() {
                    b()
                }, function() {
                    var d = c._ensure_global("adroll_adv_id", ""),
                        e = c._ensure_global("adroll_pix_id", ""),
                        d = c._srv("/lex/" + d + "/" + e + "?id=${PUBTOK}&pv=" + c.pv),
                        d = "https://lex.33across.com/ps/v1/pubtoken/?pid=115&event=rtg&us_privacy=&rnd=<RANDOM>&ru=<URL>".replace("<RANDOM>", c.pv).replace("<URL>", encodeURIComponent(d));
                    window.adroll_lex_cb = a;
                    window.adroll_lex_to =
                        window.setTimeout(function() {
                            window.adroll_lex_to = null;
                            window.adroll_lex_cb = null;
                            b()
                        }, c._get_lex_timeout());
                    c.add_script_element(d)
                })
            }
        }
    };
    __adroll__.prototype.set_lex_id = function(a) {
        window.adroll_lex_to && (window.clearTimeout(window.adroll_lex_to), window.adroll_lex_to = null);
        this.set_tpc("lx3", a);
        a = window.adroll_lex_cb;
        window.adroll_lex_cb = null;
        a && a.call(this)
    };
    __adroll__.prototype._reg_lpq = function(a, b) {
        var c, d, e = [],
            g = {},
            f = btoa(this.object_to_querystring(b));
        if (!f) return "";
        for (c = 65; 91 > c; c++) e.push(String.fromCharCode(c));
        f = f.split("");
        e.push("-", "_", "\t");
        f = f.reverse();
        e.splice(13, 0, "+", "/", "=");
        for (c = 0; c < e.length - 3; c++) d = e.concat(e)[c + e.length / 2], g[e[c]] = d, g[e[c].toLowerCase()] = d.toLowerCase();
        return (e = f.map(function(a) {
            return g[a] || a
        }).join("").trim()) ? a + "=" + e : ""
    };
    __adroll__.prototype._is_v1_to_v2_shim = function() {
        return !0 === window.__adroll_v1_to_v2_shim
    };
    __adroll__.prototype._v1_to_v2_shim_use_globals = function(a, b) {
        try {
            this._is_v1_to_v2_shim() && (this._has_global("adroll_segments") && (a.adroll_segments = this._global("adroll_segments")), this._has_global("adroll_email") && (a.adroll_email = this._global("adroll_email")), this._has_global("adroll_shop_id") && "undefined" === typeof a.adroll_shop_id && (a.adroll_shop_id = this._global("adroll_shop_id")), this._has_global("adroll_p") && b.push("adroll_p=" + window.escape(this._global("adroll_p"))), this._has_global("adroll_u") &&
                b.push("adroll_u=" + window.escape(this._global("adroll_u"))), this._has_global("adroll_m") && this._has_global("adroll_m_type") && (b.push("adroll_m=" + window.escape(this._global("adroll_m"))), b.push("adroll_m_type=" + window.escape(this._global("adroll_m_type")))))
        } catch (c) {}
        return a
    };
    __adroll__.prototype._v1_to_v2_shim_unset_globals = function() {
        try {
            this._is_v1_to_v2_shim() && (this._unset_global("adroll_conversion_value"), this._unset_global("adroll_conversion_value_in_dollars"), this._unset_global("adroll_currency"), this._unset_global("adroll_email"), this._unset_global("adroll_segments"), this._unset_global("adroll_user_identifier"))
        } catch (a) {}
    };
    __adroll__.prototype._v1_to_v2_shim_extract_pid = function(a, b, c) {
        function d(a) {
            return a ? (a = new RegExp(a, "gi"), !!a.exec(h)) : null
        }
        a || (a = {});
        var e = null,
            g = null,
            f = null,
            k = null,
            h = this._gurl(),
            p = this.get_external_data();
        p && (g = p.product_id, e = p.product_group, f = p.product_action, k = p.adroll_product_category_id);
        if (!g && a.regexp_group && !("string" === a.regexp_group && a.regexp_group instanceof String) && "html" === a.regexp_group.scheme) {
            if (d(a.blacklist_regexp) || !0 !== d(a.regexp)) return "";
            g = this.get_product_id_from_dom(a.regexp_group)
        } else if (!g) {
            if (d(a.blacklist_regexp)) return "";
            g = this.get_product_id_from_url(h, a.regexp, a.regexp_group)
        }
        e || !a.product_group_group || "string" === a.product_group_group && a.product_group_group instanceof String || "html" !== a.product_group_group.scheme ? e || a.product_group_regexp && (e = this.get_product_id_from_url(h, a.product_group_regexp, a.product_group_group)) : e = this.get_product_id_from_dom(a.product_group_group);
        if (g) a = {
            product_id: g,
            product_group: e,
            product_action: f,
            product_category: k
        };
        else if (this.facebook_dummy_product_enabled() && "facebook" === b) a = this.get_dummy_product_for_facebook(e);
        else return null;
        c && c(a);
        return a
    };
    __adroll__.prototype._v1_to_v2_shim_get_pid = function(a) {
        this.extract_pid(a, "adroll", function(a) {
            if (a) {
                var c = a.product_id,
                    d = a.product_group,
                    e = a.product_action,
                    g = a.product_category;
                a = [];
                var f;
                if (c instanceof Array)
                    for (f = 0; f < c.length; f++) a.push(["adroll_product_id", this.normalize_var((c[f] + "").toLowerCase(), !0)]);
                else a.push(["adroll_product_id", this.normalize_var((c + "").toLowerCase(), !0)]);
                if (g instanceof Array)
                    for (f = 0; f < g.length; f++) a.push(["adroll_product_category_id", this.normalize_var((g[f] + "").toLowerCase(), !0)]);
                else g && a.push(["adroll_product_category_id", this.normalize_var((g + "").toLowerCase(), !0)]);
                d && a.push(["adroll_product_group", this.normalize_var((d + "").toLowerCase(), !0)]);
                e && a.push(["adroll_product_action", this.normalize_var((e + "").toLowerCase(), !0)]);
                (c = this.external_data_to_qs(!0)) && a.push([c]);
                c = this._srv(this.buildurl("/p/" + this._global("adroll_adv_id") + "/", a));
                d = window.document.createElement("img");
                d.src = c;
                d.height = d.width = 1;
                d.border = 0;
                d.setAttribute("alt", "");
                this._head().appendChild(d)
            }
        }.bind(this))
    };
    window.__adroll = window.__adroll || new __adroll__;


    window.adroll_sendrolling_cross_device = false;
    window.adroll_form_fields = {};
    window.adroll_third_party_forms = {};
    window.adroll_third_party_detected = {
        "YXRNNTO7ZBAMFBH67UUE5M": {
            "advertisable_eid": "YXRNNTO7ZBAMFBH67UUE5M",
            "has_hubspot": false,
            "has_mailchimp": false,
            "has_marketo": false
        }
    };
    window.adroll_snippet_errors = [];

    __adroll__.prototype.render_advertisable_cell = function() {
        if (typeof __adroll._form_attach != 'undefined') {
            __adroll._form_attach();
        }
        if (typeof __adroll._form_tp_attach != 'undefined') {
            __adroll._form_tp_attach();
        }
        __adroll.segment_map = JSON.parse("{\"OLJBMQYIKZGBZKNC3N4BIL\":{\"child\":\"OLJBMQYIKZGBZKNC3N4BIL\",\"type\":\"p\"},\"VTMDHPBUS5EUZNIUDQWDR4\":{\"child\":\"VTMDHPBUS5EUZNIUDQWDR4\",\"type\":\"s\"}}");
        __adroll.product_events = ["productView", "addToCart", "cartView", "purchase", "productListView"];
        var scheme = (("https:" == document.location.protocol) ? "https" : "http");
        var adnxs_domain = 'secure.adnxs.com';
        var aol_domain = 'secure.leadback.advertising.com';

        if (scheme == 'http') {
            adnxs_domain = 'ib.adnxs.com';
            aol_domain = 'leadback.advertising.com';
        }
        var el = document.createElement("div");
        el.style["width"] = "1px";
        el.style["height"] = "1px";
        el.style["display"] = "inline";
        el.style["position"] = "absolute";

        if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {}

        __adroll__._fbq_calls = [];

        function adrollFbqAsync(arguments) {
            __adroll__._fbq_calls.push(arguments);
        }

        function retryAdrollFbqApply(t) {
            setTimeout(function() {
                adrollFbqApply(t * 2);
            }, t * 100);
        }

        function adrollFbqApply(t) {
            var calls = __adroll__._fbq_calls;
            // Sanity check: retry until at least a FB call is queued.
            if (calls.length === 0) {
                retryAdrollFbqApply(t);
                return;
            }
            if (typeof fbq != 'undefined') {
                __adroll__._fbq_calls = [];
                for (var i = 0; i < calls.length; i++) {
                    fbq.apply(null, calls[i]);
                }
                return;
            }
            retryAdrollFbqApply(t);
        }

        retryAdrollFbqApply(1);

        try {
            try {

                (function() {
                    var rtb = document.createElement("div");
                    rtb.style["width"] = "1px";
                    rtb.style["height"] = "1px";
                    rtb.style["display"] = "inline";
                    rtb.style["position"] = "absolute";
                    rtb.innerHTML = ["/cm/b/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/g/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/index/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/l/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/n/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/o/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/outbrain/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/pubmatic/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/r/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/taboola/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/triplelift/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M", "/cm/x/out?advertisable=YXRNNTO7ZBAMFBH67UUE5M"].reduce(function(acc, cmURL) {
                        return acc + '<img height="1" width="1" style="border-style:none;" alt="" src="' + __adroll._srv(cmURL) + '"/>';
                    }, '');
                    __adroll._head().appendChild(rtb);
                })();

            } catch (e) {
                window.adroll_snippet_errors['maya_snippet'] = e;
            }
        } catch (e) {}

        __adroll.loadGlobalFunctions();

        __adroll._head().appendChild(el);
        if (typeof __adroll.set_pixel_cookie != 'undefined') {
            __adroll.set_pixel_cookie(adroll_adv_id, adroll_pix_id);
        }
    };
} catch (e) {}

try {

    __adroll.load_adroll_tpc(__adroll.render_advertisable_cell);
} catch (e) {}