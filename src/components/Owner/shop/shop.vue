<template>
	<div  class="all">
		<header-item message="商城"></header-item>
		<div id="middle">
			<div class="search">
				<div class="input">
					<input type="text" v-model="keywords" @keyup.enter="search" />
					<img src="static/img/seach_input.png" alt="" @click="search" />
				</div>
				<div class="btn" @click="go_cat"><img src="static/img/shop_fenlei.png"/></div>
			</div>
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.goods_id)">
					<img :src="item.goods_thumb"/>
					<p class="name">{{item.goods_name}}</p>
					<p class="price" v-html="item.shop_price"></p>
				</li>
			
			</ul>
			
			<div class="btn_list">
				<router-link to="/shop_cat">产品分类</router-link>
				<a href="javascript:void(0)" @click="call">联系客服</a>
				<router-link to="/cart">我的购物车</router-link>
			</div>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'shop',
		data(){
			return {
				lists:[],
				keywords:"",
				kefu:''
			}
		},
		created(){
			
			if(this.$route.query.id){
				this.get_pro(this.keywords,this.$route.query.id)
			}else{
				this.get_pro(this.keywords)	
			}
			this.get_kefu()
		},
		methods:{
			call() {
			    window.location.href = `tel:${this.kefu}`
			  },
			get_pro(keywords,cat_id){
				let obj = {};
				if(keywords){
					obj.keywords = keywords
				}
				if(cat_id){
					obj.cat_id = cat_id
				}
				this.$axios({
					url:'http://wy.gzziyu.com/ny_flow.php?action=search',
					method:'post',
					params:obj
				})
				.then((res)=>{
					console.log(res)
					this.lists = res.data
				})
			},
			go_cat(){
				this.$router.push('shop_cat')
			},
			go_detail(id){
				this.$router.push({name:'Pro_detail',query:{id:id}})
			},
			search(){
				this.get_pro(this.keywords)
			},
			get_kefu(){
				this.$axios({
					url:'http://wy.gzziyu.com/ziyu.php?Action=siteweb',
					method:'post'
				})
				.then((res)=>{
					console.log(res)
					this.kefu = res.data[7].value;
				})
			}
			


		}
	}
</script>
<style lang="scss" scoped>
	@import './shop.scss'
</style>