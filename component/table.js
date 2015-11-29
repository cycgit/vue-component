import page from './pagination'

require('../css/table.css')	

var template = `
		   <table class="table">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>其他</th>
                </tr>
                </thead>
                <tbody v-show="!loading">
                <tr v-for="sm in show">
                    <td>{{ sm.name }}</td>
                    <td>{{ sm.age }}</td>      
                    <td>{{ sm.other }}</td>
                </tr>
                </tbody>
                <div class="table-info" v-show="loading">在加载</div>
                <div class="table-info" v-show="noResult">没有纪录</div>
           </table>
               
            <page all="1" cur="1" v-on:page="page"></page> 
		
		`




export default Vue.extend({
	data(){
        return {cur: 1, loading: false, first:true, source:[] }
    },
	template,
	computed:{
        show(){
            var index = (this.cur - 1)*3 
            return this.source.slice(index, index+3)
        },
        noResult(){
         	if(this.first)
         		return false

            return this.source.length == 0? true : false
     
        }
        
    },
    methods: {
       page(index){
        //改变页码
          this.cur = index
            
       }
    },
	events:{
    	inject(source){
    		this.first = false
    		 this.cur = 1
		     this.source = source

		     this.$broadcast('init', Math.ceil(source.length/3)) //通知导航栏
    	}

    },
    components:{
    	page
    }

})


