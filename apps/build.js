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

	var _table = __webpack_require__(1);

	var _table2 = _interopRequireDefault(_table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var x = new Vue({
		el: '#target',
		data: {
			msg: '我是msg'
		},
		components: {
			app: _table2.default
		}

	});

	var data = [{ name: '小明', age: 11, other: '其他的咯' }, { name: '小蔡', age: 20, other: '不知道' }, { name: 'hehe', age: 11, other: 'sda' }, { name: 'asda', age: 12, other: '2333' }];
	x.$broadcast('inject', data);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _pagination = __webpack_require__(6);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(2);

	var template = '\n\t\t   <table class="table">\n                <thead>\n                <tr>\n                    <th>姓名</th>\n                    <th>年龄</th>\n                    <th>其他</th>\n                </tr>\n                </thead>\n                <tbody v-show="!loading">\n                <tr v-for="sm in show">\n                    <td>{{ sm.name }}</td>\n                    <td>{{ sm.age }}</td>      \n                    <td>{{ sm.other }}</td>\n                </tr>\n                </tbody>\n                <div class="table-info" v-show="loading">在加载</div>\n                <div class="table-info" v-show="noResult">没有纪录</div>\n           </table>\n               \n            <page all="1" cur="1" v-on:page="page"></page> \n\t\t\n\t\t';

	exports.default = Vue.extend({
	    data: function data() {
	        return { cur: 1, loading: false, first: true, source: [] };
	    },

	    template: template,
	    computed: {
	        show: function show() {
	            var index = (this.cur - 1) * 3;
	            return this.source.slice(index, index + 3);
	        },
	        noResult: function noResult() {
	            if (this.first) return false;

	            return this.source.length == 0 ? true : false;
	        }
	    },
	    methods: {
	        page: function page(index) {
	            //改变页码
	            this.cur = index;
	        }
	    },
	    events: {
	        inject: function inject(source) {
	            this.first = false;
	            this.cur = 1;
	            this.source = source;

	            this.$broadcast('init', Math.ceil(source.length / 3)); //通知导航栏
	        }
	    },
	    components: {
	        page: _pagination2.default
	    }

	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	__webpack_require__(7);

	var template = '<div class="page-bar" v-show="show">\n            <ul>\n            <li @click="pre"><a>上一页</a></li>\n            <li  v-for="index in indexs"  v-bind:class="{ \'active\': cur == index}">\n                <a @click="click(index)">{{ index }}</a>\n            </li>\n                <li @click="next"><a>下一页</a></li>\n                <li><a>共<i>{{ all }}</i>页</a></li>\n            </ul>\n    </div>\n';

	exports.default = Vue.extend({
	    props: ['cur', 'all'],
	    data: function data() {
	        var obj = {};
	        obj.cur = this.cur ? this.cur : 1;
	        obj.all = this.all ? this.all : 1;
	        return obj;
	    },

	    template: template,
	    computed: {
	        indexs: function indexs() {
	            var left = 1;
	            var right = this.all;
	            var ar = [];
	            if (this.all >= 11) {
	                if (this.cur > 5 && this.cur < this.all - 4) {
	                    left = this.cur - 5;
	                    right = this.cur + 4;
	                } else {
	                    if (this.cur <= 5) {
	                        left = 1;
	                        right = 10;
	                    } else {
	                        right = this.all;
	                        left = this.all - 9;
	                    }
	                }
	            }
	            while (left <= right) {
	                ar.push(left);
	                left++;
	            }
	            return ar;
	        },
	        show: function show() {
	            return this.all <= 1 ? false : true;
	        }
	    },
	    methods: {
	        click: function click(index) {
	            if (index != this.cur) {
	                this.cur = index;
	                this.$dispatch('page', index);
	            }
	        },
	        next: function next() {
	            if (this.cur != this.all) {
	                this.cur++;
	                this.$dispatch('page', this.cur);
	            }
	        },
	        pre: function pre() {
	            if (this.cur != 1) {
	                this.cur--;
	                this.$dispatch('page', this.cur);
	            }
	        }
	    },
	    events: {
	        init: function init(all) {
	            this.cur = 1;
	            this.all = all;
	        }
	    }

	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);