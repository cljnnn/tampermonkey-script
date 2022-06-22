// ==UserScript==
// @name         Steam历史最低价(支持外服)
// @namespace    tea.pm
// @version      2.0.2
// @description  获取Steam的历史最低价，支持各币种。B站相关视频搜索。
// @author       cljnnn
// @license      AGPLv3
// @run-at       document-end
// @match       https://store.steampowered.com/app/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
// @require      https://unpkg.com/vue@next
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n.store-toolbar[data-v-7cf104ae] {\r\n  position: fixed;\r\n  bottom: 0;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  width: 100%;\r\n  max-width: 940px;\r\n  background-color: #2b5370;\r\n  align-content: center;\r\n  text-align: center;\r\n  margin: 0 auto;\r\n  z-index: 999;\r\n  opacity: 1;\n}\n.lowest_notice[data-v-7cf104ae] {\r\n  background-color: greenyellow !important;\n}\n.new_lowest_notice[data-v-7cf104ae] {\r\n  background-color: springgreen !important;\n}\n.app_price[data-v-7cf104ae] {\r\n  color: black;\r\n  background-color: white;\r\n  font-size: large;\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n*[data-v-0bd4ce14] {\r\n  margin: 0;\r\n  padding: 0;\n}\n.app-info[data-v-0bd4ce14] {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  /*background-size: cover;*/\r\n  background-color: rgb(51, 99, 131, 0.8);\r\n  color: white;\r\n  padding: 10px;\r\n  font-size: medium;\r\n  z-index: 999;\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ref--5!./node_modules/vue-loader/dist??ref--3!./src/app.vue?vue&type=template&id=77bf89b1


const _hoisted_1 = { class: "app" }

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Introduction = Object(external_Vue_["resolveComponent"])("Introduction")
  const _component_Store = Object(external_Vue_["resolveComponent"])("Store")

  return (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("div", _hoisted_1, [
    Object(external_Vue_["createVNode"])(_component_Introduction),
    ($data.url.startsWith('https://store.steampowered.com/app/'))
      ? (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createBlock"])(_component_Store, { key: 0 }))
      : Object(external_Vue_["createCommentVNode"])("v-if", true)
  ]))
}
// CONCATENATED MODULE: ./src/app.vue?vue&type=template&id=77bf89b1

// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ref--5!./node_modules/vue-loader/dist??ref--3!./src/components/Store.vue?vue&type=template&id=7cf104ae&scoped=true


const _withScopeId = n => (Object(external_Vue_["pushScopeId"])("data-v-7cf104ae"),n=n(),Object(external_Vue_["popScopeId"])(),n)
const Storevue_type_template_id_7cf104ae_scoped_true_hoisted_1 = { class: "store-toolbar" }
const _hoisted_2 = { key: 0 }
const _hoisted_3 = { key: 0 }
const _hoisted_4 = ["href", "target"]
const _hoisted_5 = { key: 1 }
const _hoisted_6 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])(" 最低价： ")
const _hoisted_7 = ["href"]
const _hoisted_8 = { key: 2 }

function Storevue_type_template_id_7cf104ae_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("div", Storevue_type_template_id_7cf104ae_scoped_true_hoisted_1, [
    ($data.heiheApp)
      ? (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("span", _hoisted_2, [
          Object(external_Vue_["createTextVNode"])(" 《" + Object(external_Vue_["toDisplayString"])($data.heiheApp.name) + "》 ", 1 /* TEXT */),
          ($data.heiheApp.hasOwnProperty('playerCount'))
            ? (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("span", _hoisted_3, " 在线：" + Object(external_Vue_["toDisplayString"])($data.heiheApp.playerCount) + "  ", 1 /* TEXT */))
            : Object(external_Vue_["createCommentVNode"])("v-if", true)
        ]))
      : Object(external_Vue_["createCommentVNode"])("v-if", true),
    (Object(external_Vue_["openBlock"])(true), Object(external_Vue_["createElementBlock"])(external_Vue_["Fragment"], null, Object(external_Vue_["renderList"])($data.usefulLinks, (link) => {
      return (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("a", {
        href: link.href,
        target: link.target,
        key: link.href,
        class: "btnv6_blue_hoverfade btn_medium"
      }, [
        Object(external_Vue_["createElementVNode"])("span", null, Object(external_Vue_["toDisplayString"])(link.name), 1 /* TEXT */)
      ], 8 /* PROPS */, _hoisted_4))
    }), 128 /* KEYED_FRAGMENT */)),
    ($data.price_loaded)
      ? (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("span", _hoisted_5, [
          _hoisted_6,
          Object(external_Vue_["createElementVNode"])("a", {
            href: 'https://steamdb.info/app/'+$data.appid,
            target: "_blank"
          }, [
            Object(external_Vue_["createElementVNode"])("span", {
              class: Object(external_Vue_["normalizeClass"])({lowest_notice: $data.lowest.isLowest, new_lowest_notice: $data.lowest.isNewLowest, app_price: true})
            }, Object(external_Vue_["toDisplayString"])($data.lowest.price) + "@-" + Object(external_Vue_["toDisplayString"])($data.lowest.discount) + "% ", 3 /* TEXT, CLASS */)
          ], 8 /* PROPS */, _hoisted_7),
          Object(external_Vue_["createTextVNode"])(" 在：" + Object(external_Vue_["toDisplayString"])($data.lowest.date), 1 /* TEXT */)
        ]))
      : (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("span", _hoisted_8, Object(external_Vue_["toDisplayString"])($data.price_loading_message), 1 /* TEXT */))
  ]))
}
// CONCATENATED MODULE: ./src/components/Store.vue?vue&type=template&id=7cf104ae&scoped=true

// CONCATENATED MODULE: ./src/utils/steamdb.js
const xhr = option => new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
        ...option,
        onerror: reject,
        onload: resolve,
    });
});

const SteamDB = {
    getAppPrice: async function (appid, currency) {
        let endpoint = `https://steamdb.info/api/ExtensionGetPrice/?appid=${appid}&currency=${encodeURIComponent(currency)}`;
        try {
            let response = await xhr({
                method: "GET",
                url: endpoint,
            });
            response = JSON.parse(response.responseText)
            if (response.success) {
                return response.data;
            }
            return null;
        } catch (e) {
            return null;
        }
    },
    getAppPlayer: function (appid) {
        let endpoint = `https://steamdb.info/api/GetCurrentPlayers/?appid=${appid}`;
    },
    getXiaoHeiHeAppInfo: async function (appid) {
        let endpoint = `https://api.xiaoheihe.cn/game/get_game_detail/?appid=${appid}`;
        try {
            let response = await xhr({
                method: "GET",
                url: endpoint,
            });
            response = JSON.parse(response.responseText)
            if (response.status === "ok" && response.result.hasOwnProperty("name")) {
                return response.result;
            }
            return null;
        } catch (e) {
            return null;
        }
    }
}

/* harmony default export */ var steamdb = (SteamDB);
// CONCATENATED MODULE: ./src/utils/tool.js
const Tool = {
    parseInt: function (str) {
        return parseInt(str.replace(/[^\d]/ig, ""))
    },
    xhr: function (option) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                ...option,
                onerror: reject,
                onload: resolve,
            });
        });
    }
}

/* harmony default export */ var tool = (Tool);
// CONCATENATED MODULE: ./src/utils/steam.js


const Steam = {
    getAppId: function () {
        let appid = window.location.href.match(/[0-9]+/);
        if (appid == null) return;
        return appid[0];
    },
    getAppName: function () {
        let appName = document.querySelector("div.apphub_AppName");
        if (appName == null) return;
        return appName.textContent.replace(/[®-]/g, '');
    },
    getCurrency: function () {
        let currency = document.querySelector("meta[itemprop='priceCurrency']");
        if (currency == null) return "CNY";
        return currency.content;
    },
    getPrice: function () {
        let price = document.querySelector("meta[itemprop='price']");
        if (price == null) return null;
        return tool.parseInt(price.content);
    },
}

/* harmony default export */ var steam = (Steam);
// CONCATENATED MODULE: ./node_modules/vue-loader/dist??ref--3!./src/components/Store.vue?vue&type=script&lang=js





/* harmony default export */ var Storevue_type_script_lang_js = ({
  name: "Store",
  data() {
    return {
      usefulLinks: [],
      appid: "",
      gameName: "",
      gameCNName: "",
      lowest: {date: "", discount: 0, priceStr: "", price: 0, isLowest: false, isNewLowest: false},
      price_loaded: false,
      price_loading_message: "",
      heiheApp: null,
    }
  },

  async mounted() {
    this.appid = steam.getAppId();
    this.heiheApp = await steamdb.getXiaoHeiHeAppInfo(this.appid);
    this.gameCNName = this.gameName = steam.getAppName();
    let searchGameName = this.gameName;
    if (this.heiheApp) {
      this.gameCNName = this.heiheApp.name;
      if (searchGameName !== this.gameCNName) {
        searchGameName = `${this.gameCNName}`
      }
      let playerCountItem = this.heiheApp.user_num.game_data.find(e => e.desc === "昨日峰值在线");
      if (playerCountItem) {
        this.heiheApp.playerCount = playerCountItem.value;
      }
    }
    this.usefulLinks = [
      {name: "评测", href: "#app_reviews_hash", target: ""},
      {name: "价格", href: `https://steamdb.info/app/${this.appid}`, target: "_blank"},
      {name: "B站", href: `https://search.bilibili.com/video?keyword=${searchGameName}`, target: "_blank"},
      {name: "小黑盒", href: `https://xiaoheihe.cn/games/detail/${this.appid}`, target: "_blank"},
      {name: "客户端", href: `steam://store/${this.appid}`, target: ""},
    ];
    let currency = steam.getCurrency();
    this.price_loading_message = "历史最低价获取中。。。";
    let price = await steamdb.getAppPrice(this.appid, currency);
    if (price) {
      this.lowest = price.lowest;
      this.lowest.isLowest = tool.parseInt(price.lowest.price) === steam.getPrice();
      this.lowest.date = new Date(this.lowest.date).toLocaleDateString();
      this.price_loaded = true;
      if (this.lowest.isLowest) {
        if (this.heiheApp && this.heiheApp.price && this.heiheApp.price.new_lowest) {
          this.lowest.isLowest = false;
          this.lowest.isNewLowest = true;
        }
      }
    } else {
      this.price_loading_message = "历史最低价获取失败！";
    }
  }
});

// CONCATENATED MODULE: ./src/components/Store.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(2);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist??ref--3!./src/components/Store.vue?vue&type=style&index=0&id=7cf104ae&scoped=true&lang=css
var Storevue_type_style_index_0_id_7cf104ae_scoped_true_lang_css = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist??ref--3!./src/components/Store.vue?vue&type=style&index=0&id=7cf104ae&scoped=true&lang=css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(Storevue_type_style_index_0_id_7cf104ae_scoped_true_lang_css["a" /* default */], options);



/* harmony default export */ var components_Storevue_type_style_index_0_id_7cf104ae_scoped_true_lang_css = (Storevue_type_style_index_0_id_7cf104ae_scoped_true_lang_css["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/components/Store.vue?vue&type=style&index=0&id=7cf104ae&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(1);
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/Store.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(Storevue_type_script_lang_js, [['render',Storevue_type_template_id_7cf104ae_scoped_true_render],['__scopeId',"data-v-7cf104ae"]])

/* harmony default export */ var Store = (__exports__);
// CONCATENATED MODULE: ./node_modules/vue-loader/dist/templateLoader.js??ref--5!./node_modules/vue-loader/dist??ref--3!./src/components/Introduction.vue?vue&type=template&id=0bd4ce14&scoped=true


const Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId = n => (Object(external_Vue_["pushScopeId"])("data-v-0bd4ce14"),n=n(),Object(external_Vue_["popScopeId"])(),n)
const Introductionvue_type_template_id_0bd4ce14_scoped_true_hoisted_1 = {
  key: 0,
  class: "app-info"
}
const Introductionvue_type_template_id_0bd4ce14_scoped_true_hoisted_2 = /*#__PURE__*/Object(external_Vue_["createStaticVNode"])("<br data-v-0bd4ce14><hr data-v-0bd4ce14> 查看底部，可以发现有如下新内容：<br data-v-0bd4ce14> 1 游戏信息：<br data-v-0bd4ce14>   1.1 游戏名称，如果有中文名称则显示中文。<br data-v-0bd4ce14>   1.2 游戏昨日峰值在线人数。<br data-v-0bd4ce14> 2 工具按钮：<br data-v-0bd4ce14>   2.1 评测：跳转到本页面的游戏评测。<br data-v-0bd4ce14>   2.2 价格：在steamdb上查看本游戏。<br data-v-0bd4ce14>   2.3 B站：在B站搜索该游戏。<br data-v-0bd4ce14>   2.4 小黑盒：在小黑盒上查看该游戏。<br data-v-0bd4ce14>   2.5 客户端：用steam客户端打开本页面（方便购买游戏，不需要再登录）<br data-v-0bd4ce14> 3 历史最低价格信息：最低价格 和 折扣，以及最低价格最近出现的日期。<br data-v-0bd4ce14>   3.1（依赖steamdb，如果无法访问steamdb，此功能将无法工作）<br data-v-0bd4ce14>   3.2 如果游戏的当前价格已经是历史最低价，则会提示为<span style=\"background-color:greenyellow;color:black;\" data-v-0bd4ce14>史低</span>，<span style=\"background-color:springgreen;color:black;\" data-v-0bd4ce14>新史低</span>。<br data-v-0bd4ce14><hr data-v-0bd4ce14>", 33)
const _hoisted_35 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("b", null, "更新说明", -1 /* HOISTED */))
const _hoisted_36 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])("：")
const _hoisted_37 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("br", null, null, -1 /* HOISTED */))
const _hoisted_38 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])("   可以B站搜索游戏中文名了，可以提示新史低了，可以显示昨日在线人数了")
const _hoisted_39 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("br", null, null, -1 /* HOISTED */))
const _hoisted_40 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("hr", null, null, -1 /* HOISTED */))
const _hoisted_41 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])(" 本说明每个版本只会显示一次。")
const _hoisted_42 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("br", null, null, -1 /* HOISTED */))
const _hoisted_43 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])(" 如果已阅读，请刷新页面继续使用！")
const _hoisted_44 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("br", null, null, -1 /* HOISTED */))
const _hoisted_45 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])(" （")
const _hoisted_46 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("img", {
  src: "https://avatars.akamai.steamstatic.com/5ec4b9f204c0b4cb451d5abf8c1f25c8e5cbd944.jpg",
  alt: "author avatar"
}, null, -1 /* HOISTED */))
const _hoisted_47 = /*#__PURE__*/Object(external_Vue_["createTextVNode"])("个人爱好作品，祝大家游戏愉快，天天快乐！）")
const _hoisted_48 = /*#__PURE__*/ Introductionvue_type_template_id_0bd4ce14_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_Vue_["createElementVNode"])("br", null, null, -1 /* HOISTED */))

function Introductionvue_type_template_id_0bd4ce14_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($data.init)
    ? (Object(external_Vue_["openBlock"])(), Object(external_Vue_["createElementBlock"])("div", Introductionvue_type_template_id_0bd4ce14_scoped_true_hoisted_1, [
        Object(external_Vue_["createTextVNode"])(" 欢迎使用 " + Object(external_Vue_["toDisplayString"])($data.appMonkeyName) + "（Version " + Object(external_Vue_["toDisplayString"])($data.version) + "）", 1 /* TEXT */),
        Introductionvue_type_template_id_0bd4ce14_scoped_true_hoisted_2,
        Object(external_Vue_["createTextVNode"])(" Version " + Object(external_Vue_["toDisplayString"])($data.version) + " ", 1 /* TEXT */),
        _hoisted_35,
        _hoisted_36,
        _hoisted_37,
        _hoisted_38,
        _hoisted_39,
        _hoisted_40,
        _hoisted_41,
        _hoisted_42,
        _hoisted_43,
        _hoisted_44,
        _hoisted_45,
        _hoisted_46,
        _hoisted_47,
        _hoisted_48
      ]))
    : Object(external_Vue_["createCommentVNode"])("v-if", true)
}
// CONCATENATED MODULE: ./src/components/Introduction.vue?vue&type=template&id=0bd4ce14&scoped=true

// CONCATENATED MODULE: ./src/config/index.js
const AppName = "steam_monkey"
const AppMonkeyName = "Steam历史最低价(支持外服)"
const AppVersion = "2.0.2"
const AppEnv = "production"
const isDev = AppEnv === 'development'


// CONCATENATED MODULE: ./node_modules/vue-loader/dist??ref--3!./src/components/Introduction.vue?vue&type=script&lang=js



/* harmony default export */ var Introductionvue_type_script_lang_js = ({
  name: "Introduction",
  data() {
    return {
      init: false,
      version: AppVersion,
      appMonkeyName: AppMonkeyName,
    }
  },
  async mounted() {
    let version_introduce = `introduced_${this.version}`;
    if (!(await GM.getValue(version_introduce))) {
      this.init = true;
      GM.setValue(version_introduce, true);
    }

    // this.init = true;
  }
});

// CONCATENATED MODULE: ./src/components/Introduction.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist??ref--3!./src/components/Introduction.vue?vue&type=style&index=0&id=0bd4ce14&scoped=true&lang=css
var Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist??ref--3!./src/components/Introduction.vue?vue&type=style&index=0&id=0bd4ce14&scoped=true&lang=css

            

var Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css_options = {};

Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css_options.insert = "head";
Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css_options.singleton = false;

var Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css_update = injectStylesIntoStyleTag_default()(Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css["a" /* default */], Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css_options);



/* harmony default export */ var components_Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css = (Introductionvue_type_style_index_0_id_0bd4ce14_scoped_true_lang_css["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/components/Introduction.vue?vue&type=style&index=0&id=0bd4ce14&scoped=true&lang=css

// CONCATENATED MODULE: ./src/components/Introduction.vue







const Introduction_exports_ = /*#__PURE__*/exportHelper_default()(Introductionvue_type_script_lang_js, [['render',Introductionvue_type_template_id_0bd4ce14_scoped_true_render],['__scopeId',"data-v-0bd4ce14"]])

/* harmony default export */ var Introduction = (Introduction_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader/dist??ref--3!./src/app.vue?vue&type=script&lang=js




/* harmony default export */ var appvue_type_script_lang_js = ({
  name: 'app',
  components: {
    Store: Store,
    Introduction: Introduction
  },
  data() {
    return {
      url: window.location.href
    }
  },
});

// CONCATENATED MODULE: ./src/app.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/app.vue





const app_exports_ = /*#__PURE__*/exportHelper_default()(appvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var src_app = (app_exports_);
// CONCATENATED MODULE: ./src/main.js
// import { loadStyle } from './utils'
// loadStyle('https://unpkg.com/ant-design-vue@3.0.0-alpha.14/dist/antd.css')



// import Antd from '@/utils/antd'

const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id
document.body.appendChild(root)

if (isDev) {
  const Vue = __webpack_require__(0)
  const app = Vue.createApp(src_app)
  // const Antd = require('ant-design-vue');
  // app.use(Antd)
  app.mount(`#${id}`)
} else {
  const app = Vue.createApp(src_app)
  // const Antd = require('ant-design-vue');
  // app.use(Antd)
  app.mount(`#${id}`)
}

/***/ })
/******/ ]);