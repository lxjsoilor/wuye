<template>
	<div  class="all">
		<header-item message="房源详情"></header-item>
		<div id="middle">
			<div class="banner">
				
				 <mt-swipe :auto="3000">
				  <mt-swipe-item v-for="(item,index) in info.file"><img :src="'http://wy.gzziyu.com/'+item.path"/></mt-swipe-item>
				</mt-swipe> 
			</div>
			<div class="house_info">
				¥{{info.rental}}/月
				<span class="time">发布时间：{{info.create_time}}</span>
			</div>
			<div class="name">{{info.hous_name}}</div>
			<div class="attr">
				<ul>
					<li style="width: 20%;">{{info.acreage}}m²</li>
					<li style="width: 30%;">{{info.type_name}}</li>
					<li>{{info.floor_in}}/{{info.floor}}层</li>
					<li>{{info.pay_name}}  </li>
				</ul>
			</div>
			<div class="position"><img src="static/img/position.png"/>{{info.address}}</div>
			
			<div class="common_title">房源介绍</div>
			<div class="house_text">
				{{info.com}}
			</div>
			<div class="common_title">配套设施</div>
			<div class="supporting" style="padding:0.2rem 0.2rem">
				<ul>
					<li>{{info.matching}}</li>
				</ul>
					
			</div>
		</div>
	<div class="btn_list" style="text-align:center;margin-bottom:0.5rem">
		<button style="width:5rem" type="button" @click="go_detail(id)">编辑</button>
	</div>
		
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'my_house_detail',
		data(){
			return {
				info:{},
				id:''
			}
		},
		created(){
			this.get_info(this.$route.query.id)
			this.id = this.$route.query.id
			// this.get_cart()
		},
		methods:{
			
			get_info(id){
				console.log(userInfo)
				console.log(id)
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=house_show',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						h_id:id
					}
				})
				.then((res)=>{
					this.info = res.data.data;
					console.log(res)
				})
			},
			go_detail(id){
				if(this.info.h_status == 1 && this.info.h_status == 0){
					this.$router.push({name:'house_release',query:{id:id}})
				}else{
					this.$Toast({
			   				 message: '该房源状态不可编辑，只有未审核状态才可编辑',
							  position: 'middle',
							  duration: 1500
			   			});
				}
				
			}
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './my_house_detail.scss'
</style>