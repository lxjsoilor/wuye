<template>
	<div  class="all">
		<header-item message="我的预约"></header-item>
		<div id="middle">
			
			<ul>
				<li @click="go_detial(item.r_id)" v-for="(item,index) in lists">
					<span v-if="item.r_status == 0" >申请看房</span>
					<span v-if="item.r_status == 1">同意看房</span>
					<span v-if="item.r_status == 2" class="red">拒绝看房</span>
					<span v-if="item.r_status == 3" class="red">取消预约</span>
					<div class="img"><img :src="item.pic"/></div>
					<div class="right">
						<h3>¥{{item.rental}}/月</h3>
						<p class="name">{{item.name}}</p>
						<p class="attr">{{item.house_type}}  {{item.floor_in}}楼  {{item.com}}m²  {{item.pay_type}}</p>
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
		name:'yuyuelist',
		data(){
			return {
				lists:[],
				user_id:''
			}
		},
		created(){
			this.get_list()
			if(userInfo){
				this.user_id = userInfo.user_id
			}
			this.user_id = userInfo.user_id
		},
		methods:{
			get_list(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				console.log(this.user_id)
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=yuyuelist',
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
			go_detial(id){
				this.$router.push({name:'MybespeakDetail',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './my_bespeak.scss'
</style>