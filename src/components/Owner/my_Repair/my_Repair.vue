<template>
	<div  class="all">
		<header-item message="我的维修"></header-item>
		<div id="middle">
			<!-- <div class="go_url">我要申请维修></div> -->
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.s_id)">
					<div class="li_header">
						编号：{{item.s_number}}
						<span v-if="item.s_status == 0">申请维修</span>
						<span v-if="item.s_status == 1">报价</span>
						<span v-if="item.s_status == 2">已报价</span>
						<span v-if="item.s_status == 3">安排维护</span>
						<span v-if="item.s_status == 4">已完成</span>
						<span v-if="item.s_status == 5">租客取消维修</span>
						<span v-if="item.s_status == 6">租客同意维修</span>
						<span v-if="item.s_status == 7">业主同意维修</span>
						<span v-if="item.s_status == 8">业主拒绝维修</span>
					</div>
					<div class="name">{{item.s_xiangmu}}</div>
					<div class="content">{{item.s_wenti}}</div>
					<div class="time">{{item.s_addtime}}</div>
				</li>
			
			</ul>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'MyRepair',
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
					url:"http://wy.gzziyu.com/zmember.php?Action=weixiulist",
					method:'post',
					params:{
						s_userid:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.lists = res.data
				})
			},
			go_detail(id){
				this.$router.push({name:"Repair_detail",query:{id:id}})			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './my_Repair.scss'
</style>