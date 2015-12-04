"use strict"

var pre = 'http://7xks1c.com2.z0.glb.qiniucdn.com/'

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
        ready(){
            get('/service/class', function(data){
                    if(data.code == 0){
                        this.getGrade(data.msg)
                    }

            }.bind(this));

        },
        methods: {
            getGrade(data){
                var n = new Date()
                var fix = n.getFullYear() + 1

                if(n.getMonth()<7){
                    fix --;
                }

                var ar = []
                var flag = {}
                for(var key in data) {
                    if(!flag[data[key].grade]){
                        flag[data[key].grade] = 1
                        ar.push(returnGrade(data[key].grade))
                    }
                }
                this.grade = ar
                this.gid = ar[0].value
                this.classs = data
                this.cid = data[0].id



                function returnGrade (grade){
                    //格式化年级
                    var obj = {}
                    obj.value = grade
                    obj.text = (fix - grade) + '年级('+ grade+ ')'
                    return obj

                }
            },
            cg(){
                for(var k in this.classs){
                    if(this.classs[k].grade == this.gid){
                        this.cid = this.classs[k].id
                        return
                    }
                }
            }

        }



})




var b = new Vue({
    el: '.right-send',
    data:{
        flag: 1,
        url: '',
        pics:[

        ],
        uptoken: '',
        time: 0
    },
    methods:{
        addUrl(){
            if(this.pics.length >=9){
                showMessage('通知图片最多9张')
                return
            }
            this.url = this.url.trim()
            var flag = this.flag++;
            if(this.url != ''){
                var obj = {}
                    obj.id = flag
                    obj.loading = true
                    obj.success = true
                    obj.isH = true
                    this.pics.push(obj)
                    urlTrans(obj.id, this.url)
                    this.url = ""
            }else{
                showMessage('请输入网络图片路径')
            }
        },
        addFile(){
            if(this.pics.length >=9){
                showMessage('通知图片最多9张')
                return
            }
            this.$els.form.reset()
            this.$els.file.dispatchEvent(new Event('click'))
        },
        del(pic){
          this.pics.$remove(pic)
        },
        changeStatus(img){
            for(var key in this.pics){
                if(this.pics[key].id == img.id){
                    this.pics[key].loading = false
                    this.pics[key].success = true
                    if(img.width > img.height){
                        this.pics[key].isH = false
                    }
                    this.pics[key].url = img.src
                    return
                }
            }
        },
        fail(id){
            for(var key in this.pics){
                if(this.pics[key].id == id){
                    this.pics[key].loading = false
                    this.pics[key].success = false
                    return
                }
            }
        },
        fileadd(){
            //添加文件
            var file = this.$els.file.files[0]
            if(file.size > 2300000){
                showMessage('上传图片不超过2M')
                return
            }
            var n = new Date().getTime()

            if(n - this.time > 3000000){
                get('/qiniu/uptoken',function(data){
                    this.uptoken = data.uptoken
                    this.time = n

                    var id = this.flag++;
                    var obj = {}
                    obj.id = id
                    obj.loading = true
                    obj.success = true
                    obj.isH = true
                    this.pics.push(obj)
                    this.url = ""

                    fajax(id ,file, this.uptoken, function(data, id){
                        urlTrans(id ,pre + data.key)
                    })

                }.bind(this))

                return
            }


            var id = this.flag++;
            var obj = {}
            obj.id = id
            obj.loading = true
            obj.success = true
            obj.isH = true
            this.pics.push(obj)
            this.url = ""

            fajax(id ,file, this.uptoken, function(data, id){
                urlTrans(id ,pre + data.key)
            })
        }

    }


})





function urlTrans(id, url){
    var img = new Image()
        img.id = id
        img.src = url
        img.onload = function(){
             b.changeStatus(this)
        }

        img.onerror = function(){
            b.fail(this.id)
        }


}


var c_btn = document.querySelector('.close')
var d_btn = document.querySelector('.pull-notice')
var s_btn = document.getElementById('send')

d_btn.onclick = function(){
    var style =  document.querySelector('.send-notice').style.display
    if(style == ""){
        document.querySelector('.send-notice').style.display = 'none'
    }else{
        document.querySelector('.send-notice').style.display = ''

    }
}

c_btn.onclick = function(){
    document.querySelector('.send-notice').style.display = 'none'
}

s_btn.onclick = function(){
    var obj = {}
        obj.type = a.type
        obj.grade = a.gid
        obj.class = a.cid
            for(var key in a.classs){
                if(a.classs[key].id == a.cid){
                    obj.class = a.classs[key].class
                }
            }


        var title = a.title.trim()
        var content = a.content.trim()
        if(title == ""){
            showMessage('请输入通知标题')
            return
        }
        if(title.length > 17){
            showMessage('标题长度小于17')
            return
        }

        if(content == ""){
            showMessage('请输入通知内容')
            return
        }



        obj.title = a.title
        obj.content = a.content
        obj.onlyTeacher = a.only? '1' : '0'


        var ar = []
        for(var key in b.pics){
            if(b.pics[key].success && !b.pics[key].loading){
                ar.push(b.pics[key].url)
            }
        }
        obj.images = JSON.stringify(ar)


        post('/notice', obj, function(data){
            if(data.code == 0){
                showMessage('发送成功')
                a.title = ""
                a.content = ""
                b.pics = []
                a.only = false

                var url = '/notice/'+ c.source[c.type]
                get(url, {size:10, page:1}, function(data){
                    this.$broadcast('init', data)
                    this.$refs.table.type = this.source[this.type]
                }.bind(c))

            }else{
                showMessage('发送失败,请刷新')
            }

        })


}

Vue.filter('time', function (value) {
    var d = new Date(value);
    var str = '';
    str += d.getFullYear() + '-' +(d.getMonth()+1) + '-' + d.getDate() + ' '
    str += d.getHours() + ':'+ ('0'+d.getMinutes()).substr(-2)+':'+ ('0'+d.getSeconds()).substr(-2)
    return str;
})

Vue.filter('status', function(value){
    if(value == 'success'){
        return '成功'
    }
    if(value == 'sending'){
        return '发送中'
    }

    if(value == 'failed'){
        return '失败'
    }

})
var n = new Date()
var fix =  n.getFullYear() + 1
if(n.getMonth()<7){
    fix --;
}

Vue.filter('render', function(value){

    if(this.type == 'class'){
        return value.class.class
    }

    if(this.type == 'grade'){
        return (fix - value.grade) + '年级('+ value.grade+ ')'
    }

    if(this.type == 'school'){
        return '全校'
    }

    return ''
});

var template1 = `
		   <table class="table">
                <thead>
                <tr>
                    <th>序号</th>
                    <th style="width: 180px;">通知标题</th>
                    <th style="width: 180px">创建时间</th>
                    <th>发送者</th>
                    <th>发送状态</th>
                    <th>接收方</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="s in source">
                    <td>{{ (currentPage-1)*10 + $index + 1 }}</td>
                    <td>{{ s.title }}</td>
                    <td>{{ s.createTime | time  }}</td>
                    <td>{{ s.teacher.name }}</td>
                    <td>{{ s.status | status }}</td>
                    <td>{{ s | render}}</td>
                    <td> <a href="/notice/{{s.id}}?type={{ type }}" class="msg-look">查看</a> <span class="msg-look" @click="del(s)">删除</span> </td>

                </tr>
                </tbody>

                <!--<div class="table-info" v-show="loading">在加载</div>-->
                <!--<div class="table-info" v-show="noResult">没有纪录</div>-->
           </table>
		`
var template2 = `
                <div class="page-bar">
            <ul>
            <li @click="pre"><a>上一页</a></li>
            <li  v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
                <a @click="click(index)">{{ index }}</a>
            </li>
                <li @click="next"><a>下一页</a></li>
                <li><a>共<i>{{ all }}</i>页</a></li>
            </ul>
    </div>

                `

var table = Vue.extend({
    data(){
        return {
            source: [],
            currentPage: [],
            type:'',
            all: ''
        }
    },
    template: template1,
    methods:{
          del(s){
              _showAlert('确定删除该通知?', function(){

                  this.source.$remove(s)
                  this.$dispatch('delnotice', s.id)

              }.bind(this))

          }
    },
    events:{
        init(data){
            this.source = data.notices
            this.currentPage = data.currentPage
            this.all = data.count
        },
        ch(data){
            this.source = data.notices
            this.currentPage = data.currentPage
            this.all = data.count
        }
    }

})

var page = Vue.extend({
    data(){
        return{
            cur : 1,
            all : 1
        }
    },
    template: template2,
    computed:{
        indexs(){
            var left = 1
            var right = this.all
            var ar = []
            if(this.all>= 11){
                if(this.cur > 5 && this.cur < this.all-4){
                    left = this.cur - 5
                    right = this.cur + 4
                }else{
                    if(this.cur<=5){
                        left = 1
                        right = 10
                    }else{
                        right = this.all
                        left = this.all -9
                    }
                }
            }
            while (left <= right){
                ar.push(left)
                left ++
            }
            return ar
        },
        show(){
            return this.all <= 1 ? false : true
        }
    },
    methods:{
        click(index){
            if(index!= this.cur){
                this.cur = index
                this.$dispatch('page', index)
            }
        },
        next(){
            if(this.cur != this.all){
                this.cur ++
                this.$dispatch('page', this.cur)
            }
        },
        pre(){
            if(this.cur != 1){
                this.cur --
                this.$dispatch('page', this.cur)
            }
        }
    },
    events:{
        init(data){
            this.cur = 1
            this.all = Math.ceil(data.count/10)
        }
    }

})
var c = new Vue({
    el: '.notice-list',
    data:{
        type: '0',
        source: ['','class', 'grade', 'school']
    },
    methods:{
        tc(index){
            this.type = index
        }
    },
    ready(){
        this.type = "1"
    },
    watch:{
        type(){
            //切换tab
            var url = '/notice/'+ this.source[this.type]
            get(url, {size:10, page:1}, function(data){
                this.$broadcast('init', data)
                this.$refs.table.type = this.source[this.type]
            }.bind(this))
        }
    },
    events:{
        page(index){
            var url = '/notice/'+ this.source[this.type]
            get(url, {size:10, page:index}, function(data){
                this.$broadcast('ch', data)
                this.$refs.table.type = this.source[this.type]
            }.bind(this))
        },
        delnotice(index){
            var url = '/notice/'+ index+ '?type='+this.source[this.type]
            ajdelete(url, function(){
                showMessage('删除成功')
                var pageindex = this.$refs.pagi.cur
                var all = Math.ceil((this.$refs.table.all -1)/10)

                this.$refs.pagi.all = all
                if(pageindex>all){
                    pageindex--
                    this.$refs.pagi.cur = pageindex
                }

                this.$refs.pagi.$dispatch('page', pageindex)
            }.bind(this))
        }

    },
    components:{
        mytable: table,
        mypage: page
    }


})


