<template>
	<div  class="">
		<header-item message="报修申请"></header-item>
		<div id="middle">
			<div class="select">
				<div class="bill_header">
					
					<select v-model="submit_data.name" @change="search">
						<option value="">全部小区</option>
						<option :value="item.name" v-for="(item,index) in user_list">{{item.name}}</option>
					</select>
					<select v-model="submit_data.status"  @change="search">
						<option value="">全部状态</option>
						<option :value="item.id" v-for="(item,index) in status_list">{{item.name}}</option>
					</select>
				</div>
			</div>
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.s_id)">
					<span v-if="item.s_status == 0">申请维修</span>
					<span v-if="item.s_status == 1">报价</span>
					<span v-if="item.s_status == 2">已报价</span>
					<span v-if="item.s_status == 3">安排维护</span>
					<span v-if="item.s_status == 4">已完成</span>
					<span v-if="item.s_status == 5">取消维修</span>
					<span v-if="item.s_status == 6">租客同意维修</span>
					<span v-if="item.s_status == 7">业主同意维修</span>
					<span v-if="item.s_status == 8">业主拒绝维修</span>
					<div class="img"><img :src="'http://wy.gzziyu.com/'+(item.file?item.file[0].path:'')"/></div>
					<div class="right">
						
						<p class="name">{{item.name }}</p>
						<p class="attr">维修问题：{{item.s_wenti}}</p>
						<p class="button">发送管理处</p>
					</div>
				</li>
				
			</ul>			
		</div>
		
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	
	export default{
		name:'Application',
		data(){
			return {
				lists:[],
				user_list:[],
				status_list:[
					{name:'申请',id:0},
					{name:'报价',id:1},
					{name:'已报价',id:2},
					{name:'安排维护',id:3},
					{name:'已完成',id:4},
					{name:'取消维修',id:5},
					{name:'租客同意维修',id:6},
					{name:'业主同意维修',id:7},
					{name:'业主拒绝维修',id:8},
				],
				submit_data:{
					name:'',
					status:''
				}
			}
		},
		created(){
			this.get_list()
		},
		methods:{
			search(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.submit_data.user_id = userInfo.user_id;
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zservice',
					method:'post',
					params:this.submit_data
				})
				.then((res)=>{
					console.log(res.data[0].data)
					this.lists = res.data[0].data
					// this.user_list = res.data[0].user

				})
			},
			get_list(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zservice',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res.data[0].data)
					this.lists = res.data[0].data
					this.user_list = res.data[0].user

				})
			},
			go_detail(id){
				this.$router.push({name:'Application_detail',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './Application.scss'
</style>