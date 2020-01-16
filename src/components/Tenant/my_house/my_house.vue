<template>
	<div  class="all">
		<header-item message="我的房源"></header-item>
		<div id="middle">
			<ul>
				<li v-for="(item,index) in lists.data" @click="go_detail(item.id)">
					<div class="img">
						
						<img :src="'http://wy.gzziyu.com/'+item.file.path" v-if="item.file"/>
						<img src="static/img/house.png" v-if="!item.file"/>
					</div>
					<div class="right">
						<p class="zt" v-if="item.status == 0">未审核</p>
						<p class="zt" v-if="item.status == 1">审核中</p>
						<p class="zt" v-if="item.status == 2">审核成功</p>
						<p class="zt" v-if="item.status == 3">审核失败</p>
						<p class="zt" v-if="item.status == 4">出租中</p>
						
						<h3>¥{{item.rental}}/月</h3>
						<p class="name">{{item.name}}</p>
						<p class="attr">{{item.house_name}}  {{item.floor_in}}楼  {{item.acreage}}m²  {{item.pay_name}}</p>
						<p class="position"><img src="img/position.png"/>{{item.address}}</p>
					</div>
				</li>
				
			</ul>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'my_house',
		data(){
			return {
				lists:[]
			}
		},
		created(){
			this.get_list()
			// this.get_cart()
		},
		methods:{
			change_sex(index){
				this.info.sex = index
			},
			
			get_list(){
				console.log(userInfo)
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=house_list',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					this.lists = res.data;
					console.log(res)
				})
			},
			go_detail(id){
				this.$router.push({name:'my_house_detail',query:{id:id}})
			}
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './my_house.scss'
</style>