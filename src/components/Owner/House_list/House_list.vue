<template>
	<div  class="all">
		<header-item message="房源"></header-item>
		<div id="middle">
			<div class="seach">
				<img src="static/img/seach_input.png"/>
				<input type="text" placeholder="输入小区名称或小区位置" @keyup.enter="get_list" v-model="seach_form.keywords" />
			</div>
			<div class="select_list">
				<div class="select">
					<select name=""  v-model="seach_form.acreage" @change="get_list">
						<option value="">住房面积</option>
						<option :value="item.name" v-for="(item,index) in one_lists">{{item.name}}</option>
					</select>
				</div>
				<div class="select">
					<select name="" v-model="seach_form.rental"  @change="get_list">
						<option value="">租金区间</option>
						<option :value="item.name" v-for="(item,index) in two_lists">{{item.name}}</option>
					</select>
				</div>
				<div class="select">
					<select name="" v-model="seach_form.pay_type_id"  @change="get_list">
						<option value="">付款方式</option>
						<option :value="item.ID" v-for="(item,index) in three_lists">{{item.name}}</option>
					</select>
				</div>
			</div>
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.id)">
					<div class="img"><img :src="item.pic"/></div>
					<div class="right">
						<h3>$ {{item.rental}}/月</h3>
						<p class="name">{{item.name}}</p>
						<p class="attr">{{item.house_type}}  {{item.floor_in}}  {{item.acreage}}m²  {{item.pay_type}}</p>
						<p class="position"><img src="static/img/position.png"/>{{item.address}}</p>
					</div>
				</li>
				
			</ul>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'House_list',
		data () {
			return {
				lists:[],
				one_lists:[],
				two_lists:[],
				three_lists:[],
				seach_form:{
					acreage:'',
					rental:'',
					pay_type_id:'',
					keywords:''


				}
			}
		},
		created(){
			this.get_list()
			this.get_tiaojian()
		},
		methods:{
		
			get_list(){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=list',
					method:'post',
					params:this.seach_form
				})
				.then((res)=>{
					this.lists = res.data
					console.log(res)
				})
			},
			go_detail(id){
				this.$router.push({name:'House_detail',query:{id:id}})
			},
			// 搜索条件
			get_tiaojian(){
				let  that = this;
				this.$axios.all([
				    this.$axios.post('http://wy.gzziyu.com/zlisting.php?Action=tiaojian&shuzi=1'),
				    this.$axios.post('http://wy.gzziyu.com/zlisting.php?Action=tiaojian&shuzi=2'),
				    this.$axios.post('http://wy.gzziyu.com/zlisting.php?Action=tiaojian&shuzi=3')
				  ])
				  .then(this.$axios.spread(function (one, two,three) {

				  	
				    console.log('one', one.data);
				    console.log('two', two.data);
				    console.log('three', three.data);
				    let arr1 = [];
				    let arr2 = [];
				    let arr3 = [];
					for (let i in one.data) {
					    arr1.push(one.data[i])
					}
					for (let i in two.data) {
					    arr2.push(two.data[i])
					}
					for (let i in three.data) {
					    arr3.push(three.data[i]); //值

					}
					that.one_lists=arr1;
					that.two_lists=arr2;
					that.three_lists=arr3;
				  }));
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './House_list.scss'
</style>