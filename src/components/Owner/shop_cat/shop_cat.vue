<template>
	<div  class="all">
		<header-item message="商城分类"></header-item>
		<div id="middle">
			<ul>
				
				<li v-for="(big_list,index) in lists">
					<div class="title" @click="go_shop(big_list.cat_id)">{{big_list.cat_name}} <span>></span></div>
					<ol>
						<li v-for="(small_list,indexs) in big_list.childList" @click="go_shop(small_list.cat_id)">{{small_list.cat_name}}</li>
						<!-- <li>矿泉水</li>
						<li>可乐</li>
						<li>牛奶</li>
						<li>矿泉水</li>
						<li>可乐</li> -->
					</ol>
				</li>
				
			</ul>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'shop_cat',
		data(){
			return {
				lists:[]
			}
		},
		created(){
			this.get_cat()
		},
		methods:{
			get_cat(){
				this.lists = [];
				this.$axios({
					url:'http://wy.gzziyu.com/ny_flow.php?action=get_category',
					method:'post',
					params:{
						parent_id:0
					}
				})
				.then((res)=>{
					// console.log(res)
					console.log('loieboa')
					res.data.map((item)=>{
						// console.log(item)
						this.$axios({
							url:'http://wy.gzziyu.com/ny_flow.php?action=get_category',
							method:'post',
							params:{
								parent_id:item.cat_id
							}
						})
						.then((ress)=>{
							// console.log(ress)
							item.childList = ress.data
						})
					})

					this.lists = res.data;
					this.$forceUpdate();
				})
			},
			go_shop(id){
				this.$router.push({name:'Shop',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './shop_cat.scss'
</style>