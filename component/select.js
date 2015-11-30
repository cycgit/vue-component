var template = `
        <select v-model="s1" v-on:change="change(1)"  v-if="l1">
         <option v-for="s in l1" v-bind:value="s.id">
             {{ s.name }}
         </option>
         <option value="0">未选择</option>
        </select>
    
         <select v-model="s2" v-on:change="change(2)" v-if="s1!=0 && p != 2 && l2">
             <option v-for="s in l2" v-bind:value="s.id" v-if="s.level1 == s1">
             {{ s.name }}
         </option>
         <option value="0">未选择</option>
        </select>
        
         <select v-model="s3" v-on:change="change(3)" v-if="s2!=0 && p !=3 && l3">
                 <option v-for="s in l3" v-bind:value="s.id" v-if="s.level2 == s2">
             {{ s.name }}
         </option>
         <option value="0">未选择</option>
        </select>
         <select v-model="s4" v-on:change="change(4)" v-if="s3!=0 && p !=4 && l4">
                  <option v-for="s in l4" v-bind:value="s.id" v-if="s.level3 == s3">
             {{ s.name }}
         </option>
         <option value="0">未选择</option>
        </select>
    `
require('../css/select.css')

var data1 = {
  "levels": {
    "level1": [
      {
        "name": "朗申测试代理",
        "id": 289,
        "level1": 0,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "南京通广E线牵",
        "id": 294,
        "level1": 0,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "合肥朗申工程技术有限公司",
        "id": 295,
        "level1": 0,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "中能光电滁州有限公司",
        "id": 306,
        "level1": 0,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "詹昌凯测试一级代理",
        "id": 308,
        "level1": 0,
        "level2": 0,
        "level3": 0,
        "level4": 0
      }
    ],
    "level2": [
      {
        "name": "内蒙古",
        "id": 296,
        "level1": 294,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "北京刘晓鹏",
        "id": 297,
        "level1": 294,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "滁州二附小",
        "id": 307,
        "level1": 306,
        "level2": 0,
        "level3": 0,
        "level4": 0
      },
      {
        "name": "詹昌凯测试二级代理",
        "id": 309,
        "level1": 308,
        "level2": 0,
        "level3": 0,
        "level4": 0
      }
    ],
    "level3": [
      {
        "name": "詹昌凯测试三级代理",
        "id": 310,
        "level1": 308,
        "level2": 309,
        "level3": 0,
        "level4": 0
      }
    ],
    "level4": [
      {
        "name": "詹昌凯测试四级代理",
        "id": 311,
        "level1": 308,
        "level2": 309,
        "level3": 310,
        "level4": 0
      }
    ]
  },
  "level": "level0"
}

export default Vue.extend({
     data(){
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
            l4: [],
          }
    },
    template,
    ready(){  
        this.cur = data1.level.substr(-1)
        if(this.cur !=0){
            this[`s${this.cur}`] = this.lid
        }

        this.l1 = data1.levels.level1
        this.l2 = data1.levels.level2
        this.l3 = data1.levels.level3
        this.l4 = data1.levels.level4
            
    },
    methods:{
        change(data){
            var index = 's'+ data
            this.p = data
            this.reset(data)  //置空后面s为0
            this.checkShow(data)
            
            if(this[`s${data}`]!=0){
                this.$broadcast('ischange', this[`s${data}`])
            }else{
                if(data == 1){

                    this.$broadcast('ischange', lid)
                }else{
                    this.$broadcast('ischange', this[`s${data-1}`])
                    
                }
            }
        },
        checkShow(i){
            var s = i + 1
            var l= this[`l${s}`]
            this.p = s
            
            for(var k in l){
              if(l[k][`level${i}`] == this[`s${i}`]){
                    this.p = 0
                    return
              }
                        
            }

            
        },
        reset(index){
          
            while(index<4){
                
                index ++
                this[`s${index}`] = 0
            }
        
        }
        
    }  


})