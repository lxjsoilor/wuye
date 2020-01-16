<template>
	<div  class="all">
		<header-item message="退房审核中"></header-item>
		<div id="middle">
			<div class="status">
				<img src="static/img/status_2.png" alt="" />
			</div>
			<div class="form">
				<div class="item">
					<div class="label">退房原因：</div>
					<div class="input">
						<p>{{info.c_yuanyin}}</p>
					</div>
				</div>
				<div class="item">
					<div class="label">退房时间：</div>
					<div class="input">
						<p>{{info.c_sqtftime}}</p>
					</div>
				</div>
				<div class="item">
					<div class="label">详细说明：</div>
					
					<div class="p"><span>{{info.c_shuoming}}</span></div>
				</div>
				
				<div class="item">
					<div class="input">图片凭证：</div>
					<div class="input">
						
					</div>
				</div>
				<div class="item">
					<div class="pic_div" v-for="(item,index) in info.zspic"><img :src="item"/></div>
				</div>
				<div class="item">
					<div class="tip"><router-link to="/danye?id=61">退房说明 <img src="static/img/tip.png" alt="" /></router-link></div>
				</div>
			</div>
			<div class="btn_list">
				<button type="button" @click="quxiao(info.c_id)" v-if="info.h_status ==3">取消申请</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'apply_check-out1',
		data(){
			return {
				info:{},
				id:''
				
			}
		},
		created(){
			this.get_detail(this.$route.query.id)
			this.id = this.$route.query.id
		},
		methods:{
			get_detail(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=tuifangdetail',
					method:'post',
					params:{
						c_zhufangid:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			},
			quxiao(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=quxiaotuifang',
					method:'post',
					params:{
						c_id:id,
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
	          			this.$messagebox.alert(res.data.msg).then(action => {
						 	this.$router.push({name:'Renting_detail',query:{id:id}})
						});
	          		}
	          		this.$messagebox.alert(res.data.msg).then(action => {
					 	// this.$router.push('applyCheckOut1')
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './apply_check_out1.scss'
</style>