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

	"use strict";

	var pre = 'http://7xks1c.com2.z0.glb.qiniucdn.com/';

	var a = new Vue({
	    el: '.left-send',
	    data: {
	        gid: '',
	        cid: '',
	        grade: [],
	        classs: [],
	        type: '1',
	        title: '',
	        content: '',
	        only: false
	    },
	    ready: function ready() {
	        get('/service/class', (function (data) {
	            if (data.code == 0) {
	                this.getGrade(data.msg);
	            }
	        }).bind(this));
	    },

	    methods: {
	        getGrade: function getGrade(data) {
	            var n = new Date();
	            var fix = n.getFullYear() + 1;

	            if (n.getMonth() < 7) {
	                fix--;
	            }

	            var ar = [];
	            var flag = {};
	            for (var key in data) {
	                if (!flag[data[key].grade]) {
	                    flag[data[key].grade] = 1;
	                    ar.push(returnGrade(data[key].grade));
	                }
	            }
	            this.grade = ar;
	            this.gid = ar[0].value;
	            this.classs = data;
	            this.cid = data[0].id;

	            function returnGrade(grade) {
	                //格式化年级
	                var obj = {};
	                obj.value = grade;
	                obj.text = fix - grade + '年级(' + grade + ')';
	                return obj;
	            }
	        },
	        cg: function cg() {
	            for (var k in this.classs) {
	                if (this.classs[k].grade == this.gid) {
	                    this.cid = this.classs[k].id;
	                    return;
	                }
	            }
	        }
	    }

	});

	var b = new Vue({
	    el: '.right-send',
	    data: {
	        flag: 1,
	        url: '',
	        pics: [],
	        uptoken: '',
	        time: 0
	    },
	    methods: {
	        addUrl: function addUrl() {
	            if (this.pics.length >= 9) {
	                showMessage('通知图片最多9张');
	                return;
	            }
	            this.url = this.url.trim();
	            var flag = this.flag++;
	            if (this.url != '') {
	                var obj = {};
	                obj.id = flag;
	                obj.loading = true;
	                obj.success = true;
	                obj.isH = true;
	                this.pics.push(obj);
	                urlTrans(obj.id, this.url);
	                this.url = "";
	            } else {
	                showMessage('请输入网络图片路径');
	            }
	        },
	        addFile: function addFile() {
	            if (this.pics.length >= 9) {
	                showMessage('通知图片最多9张');
	                return;
	            }
	            this.$els.form.reset();
	            this.$els.file.dispatchEvent(new Event('click'));
	        },
	        del: function del(pic) {
	            this.pics.$remove(pic);
	        },
	        changeStatus: function changeStatus(img) {
	            for (var key in this.pics) {
	                if (this.pics[key].id == img.id) {
	                    this.pics[key].loading = false;
	                    this.pics[key].success = true;
	                    if (img.width > img.height) {
	                        this.pics[key].isH = false;
	                    }
	                    this.pics[key].url = img.src;
	                    return;
	                }
	            }
	        },
	        fail: function fail(id) {
	            for (var key in this.pics) {
	                if (this.pics[key].id == id) {
	                    this.pics[key].loading = false;
	                    this.pics[key].success = false;
	                    return;
	                }
	            }
	        },
	        fileadd: function fileadd() {
	            //添加文件
	            var file = this.$els.file.files[0];
	            if (file.size > 2300000) {
	                showMessage('上传图片不超过2M');
	                return;
	            }
	            var n = new Date().getTime();

	            if (n - this.time > 3000000) {
	                get('/qiniu/uptoken', (function (data) {
	                    this.uptoken = data.uptoken;
	                    this.time = n;

	                    var id = this.flag++;
	                    var obj = {};
	                    obj.id = id;
	                    obj.loading = true;
	                    obj.success = true;
	                    obj.isH = true;
	                    this.pics.push(obj);
	                    this.url = "";

	                    fajax(id, file, this.uptoken, function (data, id) {
	                        urlTrans(id, pre + data.key);
	                    });
	                }).bind(this));

	                return;
	            }

	            var id = this.flag++;
	            var obj = {};
	            obj.id = id;
	            obj.loading = true;
	            obj.success = true;
	            obj.isH = true;
	            this.pics.push(obj);
	            this.url = "";

	            fajax(id, file, this.uptoken, function (data, id) {
	                urlTrans(id, pre + data.key);
	            });
	        }
	    }

	});

	function urlTrans(id, url) {
	    var img = new Image();
	    img.id = id;
	    img.src = url;
	    img.onload = function () {
	        b.changeStatus(this);
	    };

	    img.onerror = function () {
	        b.fail(this.id);
	    };
	}

	var c_btn = document.querySelector('.close');
	var d_btn = document.querySelector('.pull-notice');
	var s_btn = document.getElementById('send');

	d_btn.onclick = function () {
	    document.querySelector('.send-notice').style.display = '';
	};

	c_btn.onclick = function () {
	    document.querySelector('.send-notice').style.display = 'none';
	};

	s_btn.onclick = function () {
	    var obj = {};
	    obj.type = a.type;
	    obj.grade = a.gid;
	    obj.class = a.cid;
	    for (var key in a.classs) {
	        if (a.classs[key].id == a.cid) {
	            obj.class = a.classs[key].class;
	        }
	    }

	    var title = a.title.trim();
	    var content = a.content.trim();
	    if (title == "") {
	        showMessage('请输入通知标题');
	        return;
	    }
	    if (title.length > 17) {
	        showMessage('标题长度小于17');
	        return;
	    }

	    if (content == "") {
	        showMessage('请输入通知内容');
	        return;
	    }

	    obj.title = a.title;
	    obj.content = a.content;
	    obj.onlyTeacher = a.only ? '1' : '0';

	    var ar = [];
	    for (var key in b.pics) {
	        if (b.pics[key].success && !b.pics[key].loading) {
	            ar.push(b.pics[key].url);
	        }
	    }
	    obj.images = JSON.stringify(ar);

	    post('/notice', obj, function (data) {
	        if (data.code == 0) {
	            showMessage('发送成功');
	            a.title = "";
	            a.content = "";
	            b.pics = [];
	            a.only = false;
	        } else {
	            showMessage('发送失败,请刷新');
	        }
	    });
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _pagination = __webpack_require__(2);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(7);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	__webpack_require__(3);

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
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);