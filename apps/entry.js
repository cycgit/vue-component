import table from '../component/table'



var x = new Vue({
	el: '#target',
	data:{
		msg: '我是msg'
	},
	components: {
		app: table
	}

})


var data = [
{name: '小明', age: 11, other: '其他的咯'},
{name: '小蔡', age: 20, other: '不知道'},
{name: 'hehe', age: 11, other: 'sda'},
{name: 'asda', age: 12, other: '2333'}

]
x.$broadcast('inject', data)