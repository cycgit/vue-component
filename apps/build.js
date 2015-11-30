/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _select = __webpack_require__(1);

	var _select2 = _interopRequireDefault(_select);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var lid = 311;

	//决定表单 显示与否 外因：前一个没选。 内因自己为空

	var a = new Vue({
	    el: '#target',
	    components: {
	        selects: _select2.default
	    }

	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var template = "\n        <select v-model=\"s1\" v-on:change=\"change(1)\"  v-if=\"l1\">\n         <option v-for=\"s in l1\" v-bind:value=\"s.id\">\n             {{ s.name }}\n         </option>\n         <option value=\"0\">未选择</option>\n        </select>\n    \n         <select v-model=\"s2\" v-on:change=\"change(2)\" v-if=\"s1!=0 && p != 2 && l2\">\n             <option v-for=\"s in l2\" v-bind:value=\"s.id\" v-if=\"s.level1 == s1\">\n             {{ s.name }}\n         </option>\n         <option value=\"0\">未选择</option>\n        </select>\n        \n         <select v-model=\"s3\" v-on:change=\"change(3)\" v-if=\"s2!=0 && p !=3 && l3\">\n                 <option v-for=\"s in l3\" v-bind:value=\"s.id\" v-if=\"s.level2 == s2\">\n             {{ s.name }}\n         </option>\n         <option value=\"0\">未选择</option>\n        </select>\n         <select v-model=\"s4\" v-on:change=\"change(4)\" v-if=\"s3!=0 && p !=4 && l4\">\n                  <option v-for=\"s in l4\" v-bind:value=\"s.id\" v-if=\"s.level3 == s3\">\n             {{ s.name }}\n         </option>\n         <option value=\"0\">未选择</option>\n        </select>\n    ";
	__webpack_require__(2);

	var data1 = {
	  "levels": {
	    "level1": [{
	      "name": "朗申测试代理",
	      "id": 289,
	      "level1": 0,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "南京通广E线牵",
	      "id": 294,
	      "level1": 0,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "合肥朗申工程技术有限公司",
	      "id": 295,
	      "level1": 0,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "中能光电滁州有限公司",
	      "id": 306,
	      "level1": 0,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "詹昌凯测试一级代理",
	      "id": 308,
	      "level1": 0,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }],
	    "level2": [{
	      "name": "内蒙古",
	      "id": 296,
	      "level1": 294,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "北京刘晓鹏",
	      "id": 297,
	      "level1": 294,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "滁州二附小",
	      "id": 307,
	      "level1": 306,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }, {
	      "name": "詹昌凯测试二级代理",
	      "id": 309,
	      "level1": 308,
	      "level2": 0,
	      "level3": 0,
	      "level4": 0
	    }],
	    "level3": [{
	      "name": "詹昌凯测试三级代理",
	      "id": 310,
	      "level1": 308,
	      "level2": 309,
	      "level3": 0,
	      "level4": 0
	    }],
	    "level4": [{
	      "name": "詹昌凯测试四级代理",
	      "id": 311,
	      "level1": 308,
	      "level2": 309,
	      "level3": 310,
	      "level4": 0
	    }]
	  },
	  "level": "level0"
	};

	exports.default = Vue.extend({
	  data: function data() {
	    return {
	      cur: 0,
	      p: 0,
	      s1: 0,
	      s2: 0,
	      s3: 0,
	      s4: 0,
	      l1: [],
	      l2: [],
	      l3: [],
	      l4: []
	    };
	  },

	  template: template,
	  ready: function ready() {
	    this.cur = data1.level.substr(-1);
	    if (this.cur != 0) {
	      this["s" + this.cur] = this.lid;
	    }

	    this.l1 = data1.levels.level1;
	    this.l2 = data1.levels.level2;
	    this.l3 = data1.levels.level3;
	    this.l4 = data1.levels.level4;
	  },

	  methods: {
	    change: function change(data) {
	      var index = 's' + data;
	      this.p = data;
	      this.reset(data); //置空后面s为0
	      this.checkShow(data);

	      if (this["s" + data] != 0) {
	        this.$broadcast('ischange', this["s" + data]);
	      } else {
	        if (data == 1) {

	          this.$broadcast('ischange', lid);
	        } else {
	          this.$broadcast('ischange', this["s" + (data - 1)]);
	        }
	      }
	    },
	    checkShow: function checkShow(i) {
	      var s = i + 1;
	      var l = this["l" + s];
	      this.p = s;

	      for (var k in l) {
	        if (l[k]["level" + i] == this["s" + i]) {
	          this.p = 0;
	          return;
	        }
	      }
	    },
	    reset: function reset(index) {

	      while (index < 4) {

	        index++;
	        this["s" + index] = 0;
	      }
	    }
	  }

	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);