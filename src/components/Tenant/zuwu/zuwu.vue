<template>
	<div  class="all">
		<header-item message="租务管理"></header-item>
		<div id="middle">
			<div class="select_list zsc_selectList">
				<div class="select">
					<select v-model="submit_data.h_status" @change="search">
						<option value="">全部状态</option>
						<option :value="item.id" v-for="(item,index) in status_list">{{item.name}}</option>
					</select>
				</div>
				<div class="select">
					<select v-model="submit_data.h_userid" @change="search">
						<option value="">全部签约人</option>
						<option :value="item.h_userid" v-for="(item,index) in yonghu_list">{{item.user_name}}</option>
					</select>
				</div>
				<div class="select">
					<select v-model="submit_data.where_time" @change="search">
						<option value="">到期时间</option>
						<option :value="item.time" v-for="(item,index) in dq_time">{{item.name}}</option>
					</select>
				</div>
			</div>
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.h_id)">
					<div class="img"><img :src="'http://wy.gzziyu.com/'+(item.file?item.file[0].path:'')" /></div>
					<div class="right">
						<p class="zt">
							{{item.h_status == 0?'申请':''}}
							{{item.h_status == 1?'在租':''}}
							{{item.h_status == 2?'拒绝租房':''}}
							{{item.h_status == 3?'退房审核中':''}}
							{{item.h_status == 4?'已退房':''}}
							{{item.h_status == 5?'拒绝退房':''}}
						</p>
						
						<h3>¥{{item.rental}}/月</h3>
						<p class="name">{{item.hous_name}}</p>
						<p class="attr">{{item.type_name}} {{item.floor_in}}楼 {{item.acreage}}m² {{item.pay_type_name}}</p>
						<p class="position">到期时间: {{item.h_dqtime}}</p>
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
		name:'zuwu',
		data(){
			return {
				lists:[],
				ren_list:'',
				status_list:[
					{name:'申请租房',id:0},
					{name:'在租',id:1},
					{name:'拒绝租房',id:2},
					{name:'退房审核中',id:3},
					{name:'已退房',id:4},
					{name:'拒绝退房',id:5},
				],
				submit_data:{
					h_status:'',
					where_time:'',
					h_userid:''

				},
				dq_time:[
					{time:7,name:'近7天'},
					{time:15,name:'近15天'},
					{time:30,name:'近一个月'},
					{time:90,name:'近三个月'},
				],
				yonghu_list:[]
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
			search(){
				console.log(userInfo)
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.submit_data.user_id = userInfo.user_id
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zrentehouse_list',
					method:'post',
					params:this.submit_data
				})
				.then((res)=>{
					this.lists = res.data.data.userList;
					console.log(res)
					// this.yonghu_list = res.data.data.user_list
				})
			},
			get_list(){
				console.log(userInfo)
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zrentehouse_list',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					this.lists = res.data.data.userList;
					console.log(res)
					this.yonghu_list = res.data.data.user_list
				})
			},
			go_detail(id){
				this.$router.push({name:'zuwu_detail',query:{id:id}})
			}
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './zuwu.scss'
</style>