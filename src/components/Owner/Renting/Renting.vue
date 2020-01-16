<template>
	<div  class="all">
		<header-item message="我的租房"></header-item>
	<div id="middle">
			
			
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.h_id)">
					<div class="img"><img :src="item.pic"/></div>
					<div class="right">
						<h3>¥{{item.rental}}/月</h3>
						<p class="name">{{item.name}}</p>
						<p class="attr green" v-if="item.h_status == 0">正在申请</p>
						<p class="attr green" v-if="item.h_status == 1">正在居住</p>
						<p class="attr red" v-if="item.h_status == 2">拒绝租房</p>
						<p class="attr red" v-if="item.h_status == 3">退房审核中 </p>
						<p class="attr red" v-if="item.h_status == 4">已退房 </p>
						<p class="position"><img src="static/img/position.png"/>{{item.address}}</p>
					</div>
				</li>
				
			</ul>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'Renting',
		data(){
			return {
				lists:[]
			}
		},
		created(){
			this.get_list()
		},
		methods:{
			get_list(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=zhufanglist',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					this.lists = res.data
					console.log(res)
				})
			},
			go_detail(id){
				this.$router.push({name:'Renting_detail',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './Renting.scss'
</style>