import {
  __commonJS
} from "./chunk-BUSYA2B4.js";

// node_modules/baffle/dist/baffle.min.js
var require_baffle_min = __commonJS({
  "node_modules/baffle/dist/baffle.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.baffle = e() : t.baffle = e();
    }(exports, function() {
      return function(t) {
        function e(r) {
          if (n[r]) return n[r].exports;
          var i = n[r] = { exports: {}, id: r, loaded: false };
          return t[r].call(i.exports, i, i.exports, e), i.loaded = true, i.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0);
      }([function(t, e, n) {
        "use strict";
        function r(t2) {
          return t2 && t2.__esModule ? t2 : { "default": t2 };
        }
        var i = n(2), o = r(i);
        t.exports = o["default"];
      }, function(t, e) {
        "use strict";
        function n(t2, e2) {
          for (var n2 in e2) e2.hasOwnProperty(n2) && (t2[n2] = e2[n2]);
          return t2;
        }
        function r(t2, e2) {
          return t2.split("").map(e2).join("");
        }
        function i(t2) {
          return t2[Math.floor(Math.random() * t2.length)];
        }
        function o(t2, e2) {
          for (var n2 = 0, r2 = t2.length; n2 < r2; n2++) e2(t2[n2], n2);
        }
        function u(t2) {
          return t2.map(function(t3, e2) {
            return !!t3 && e2;
          }).filter(function(t3) {
            return t3 !== false;
          });
        }
        function s(t2) {
          return "string" == typeof t2 ? [].slice.call(document.querySelectorAll(t2)) : [NodeList, HTMLCollection].some(function(e2) {
            return t2 instanceof e2;
          }) ? [].slice.call(t2) : t2.nodeType ? [t2] : t2;
        }
        Object.defineProperty(e, "__esModule", { value: true }), e.extend = n, e.mapString = r, e.sample = i, e.each = o, e.getTruthyIndices = u, e.getElements = s;
      }, function(t, e, n) {
        "use strict";
        function r(t2) {
          return t2 && t2.__esModule ? t2 : { "default": t2 };
        }
        function i(t2, e2) {
          if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), u = n(3), s = r(u), c = { characters: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?", exclude: [" "], speed: 50 }, a = function() {
          function t2(e2, n2) {
            i(this, t2), this.options = (0, o.extend)(Object.create(c), n2), this.elements = (0, o.getElements)(e2).map(s["default"]), this.running = false;
          }
          return t2.prototype.once = function() {
            var t3 = this;
            return (0, o.each)(this.elements, function(e2) {
              return e2.write(t3.options.characters, t3.options.exclude);
            }), this.running = true, this;
          }, t2.prototype.start = function() {
            var t3 = this;
            return clearInterval(this.interval), (0, o.each)(this.elements, function(t4) {
              return t4.init();
            }), this.interval = setInterval(function() {
              return t3.once();
            }, this.options.speed), this.running = true, this;
          }, t2.prototype.stop = function() {
            return clearInterval(this.interval), this.running = false, this;
          }, t2.prototype.set = function(t3) {
            return (0, o.extend)(this.options, t3), this.running && this.start(), this;
          }, t2.prototype.text = function(t3) {
            var e2 = this;
            return (0, o.each)(this.elements, function(n2) {
              n2.text(t3(n2.value)), e2.running || n2.write();
            }), this;
          }, t2.prototype.reveal = function() {
            var t3 = this, e2 = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], n2 = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], r2 = e2 / this.options.speed || 1, i2 = function() {
              clearInterval(t3.interval), t3.running = true, t3.interval = setInterval(function() {
                var e3 = t3.elements.filter(function(t4) {
                  return !t4.bitmap.every(function(t5) {
                    return !t5;
                  });
                });
                (0, o.each)(e3, function(e4) {
                  var n3 = Math.ceil(e4.value.length / r2);
                  e4.decay(n3).write(t3.options.characters, t3.options.exclude);
                }), e3.length || (t3.stop(), (0, o.each)(t3.elements, function(t4) {
                  return t4.init();
                }));
              }, t3.options.speed);
            };
            return setTimeout(i2, n2), this;
          }, t2;
        }();
        e["default"] = function(t2, e2) {
          return new a(t2, e2);
        };
      }, function(t, e, n) {
        "use strict";
        function r(t2, e2) {
          if (!t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !e2 || "object" != typeof e2 && "function" != typeof e2 ? t2 : e2;
        }
        function i(t2, e2) {
          if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function, not " + typeof e2);
          t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }), e2 && (Object.setPrototypeOf ? Object.setPrototypeOf(t2, e2) : t2.__proto__ = e2);
        }
        function o(t2, e2) {
          if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", { value: true });
        var u = n(1), s = function() {
          function t2(e2) {
            o(this, t2), this.value = e2, this.init();
          }
          return t2.prototype.init = function() {
            return this.bitmap = this.value.split("").map(function() {
              return 1;
            }), this;
          }, t2.prototype.render = function() {
            var t3 = this, e2 = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0], n2 = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
            return e2.length ? (0, u.mapString)(this.value, function(r2, i2) {
              return n2.indexOf(r2) > -1 ? r2 : t3.bitmap[i2] ? (0, u.sample)(e2) : r2;
            }) : this.value;
          }, t2.prototype.decay = function() {
            for (var t3 = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0]; t3--; ) {
              var e2 = (0, u.getTruthyIndices)(this.bitmap);
              this.bitmap[(0, u.sample)(e2)] = 0;
            }
            return this;
          }, t2.prototype.text = function() {
            var t3 = arguments.length <= 0 || void 0 === arguments[0] ? this.value : arguments[0];
            return this.value = t3, this.init(), this;
          }, t2;
        }(), c = function(t2) {
          function e2(n2) {
            o(this, e2);
            var i2 = r(this, t2.call(this, n2.textContent));
            return i2.element = n2, i2;
          }
          return i(e2, t2), e2.prototype.write = function(t3, e3) {
            return this.element.textContent = this.render(t3, e3), this;
          }, e2;
        }(s);
        e["default"] = function(t2) {
          return new c(t2);
        };
      }]);
    });
  }
});
export default require_baffle_min();
/*! Bundled license information:

baffle/dist/baffle.min.js:
  (*!
   * baffle 0.3.6 - A tiny javascript library for obfuscating and revealing text in DOM elements.
   * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/baffle
   * License: MIT
   *)
*/
//# sourceMappingURL=baffle.js.map
