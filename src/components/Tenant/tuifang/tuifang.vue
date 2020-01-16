<template>
	<div  class="all">
		<header-item message="退房申请"></header-item>
		<div id="middle">
			<div class="select_list zsc_selectList">
				
				<div class="select">
					<select v-model="submit_data.name" @change="search">
						<option value="">全部小区</option>
						<option :value="item.name" v-for="(item,index) in user">{{item.name}}</option>
						
					</select>
				</div>
				<div class="select">
					<select v-model="submit_data.c_status" @change="search">
						<option value="">全部状态</option>
						<option :value="item.id" v-for="(item,index) in status_lsit">{{item.name}}</option>
						
					</select>
				</div>
			</div>
			<ul>
				<li v-for="(item,index) in lists" @click="go_detail(item.c_id)">
					<div class="img"><img :src="'http://wy.gzziyu.com/'+(item.file?item.file[0].path:'')" /></div>
					<div class="right">
						<p class="name" style="margin-top:0.3rem">{{item.name}}</p>
						<p class="attr" style="margin-bottom:0.1rem">退房原因：{{item.c_yuanyin}}</p>
						<p class="zt" style="margin-top:0.1rem">
							{{item.h_status == 0?'申请':''}}
							{{item.h_status == 1?'在租':''}}
							{{item.h_status == 2?'拒绝租房':''}}
							{{item.h_status == 3?'退房审核中':''}}
							{{item.h_status == 4?'同意退房':''}}
							{{item.h_status == 5?'拒绝退房':''}}
						</p>
						<button style="background-color:#e2bc73;color:#fff;border:none">发送管理处</button>
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
		name:'tuifang',
		data(){
			return {
				lists:[],
				user:[],
				submit_data:{
					name:'',
					c_status:''
				},
				status_lsit:[
					{name:'申请',id:0},
					{name:'在租',id:1},
					{name:'拒绝租房',id:2},
					{name:'退房审核中',id:3},
					{name:'同意退房',id:4},
					{name:'拒绝退房',id:5},
				]
				// ren_list:''
			}
		},
		created(){
			this.get_list()
			// this.get_cart()
		},
		methods:{
			// change_sex(index){
			// 	this.info.sex = index
			// },
			search(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				this.submit_data.user_id = userInfo.user_id
				
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zcheckout_list',
					method:'post',
					params:this.submit_data
				})
				.then((res)=>{
					this.lists = res.data.data.userList;
					// this.user = res.data.data.user;
					console.log(res)
				})
			},
			get_list(){
				console.log(userInfo)
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zcheckout_list',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.lists = res.data.data.userList;
					this.user = res.data.data.user;
					
				})
			},
			go_detail(id){
				this.$router.push({name:'tuifang_detail',query:{id:id}})
			}
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './tuifang.scss'
</style>