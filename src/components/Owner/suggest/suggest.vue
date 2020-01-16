<template>
	<div  class="all">
		<header-item message="我的建议"></header-item>
		<div id="middle">
			<div class="go_url" @click="go_submit">我要发表建议></div>
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.msg_id)">
					<div class="name">{{item.msg_title}}</div>
					<div class="right">></div>
					<div class="time">{{item.msg_time}}</div>
				</li>
				
			</ul>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'suggest',
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
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=wentifankuilist',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.lists = res.data
				})
			},
			go_submit(){
				this.$router.push('submit_suggest')
			},
			go_detail(id){
				this.$router.push({name:'suggest_detail',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './suggest.scss'
</style>