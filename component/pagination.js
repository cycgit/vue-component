require('../css/pagination.css')

var template =  `<div class="page-bar" v-show="show">
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

export default Vue.extend({
	props: ['cur', 'all'],
	data(){
        var obj = {}
        obj.cur = this.cur ? this.cur : 1
        obj.all = this.all ? this.all : 1
        return obj
    },
    template,
    computed: {
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
    methods: {
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
        init(all){
            this.cur = 1
            this.all = all
        }
    }


})