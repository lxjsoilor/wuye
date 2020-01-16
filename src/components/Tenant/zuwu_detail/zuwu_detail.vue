<template>
	<div  class="all">
		<header-item message="租务详情"></header-item>
		<div id="middle">
			<div class="banner">
				
				 <mt-swipe :auto="3000">
				  <mt-swipe-item v-for="(item,index) in info.file"><img :src="'http://wy.gzziyu.com/'+item.path"/></mt-swipe-item>
				</mt-swipe> 
			</div>
			<div class="house_info">
				¥{{info.rental}}/月
				<span class="time">发布时间：{{info.h_addtime}}</span>
			</div>
			<div class="name">{{info.hous_name}}</div>
			<div class="attr">
				<ul>
					<li>{{info.acreage}}m²</li>
					<li>{{info.type_name}}</li>
					<li>{{info.floor_in}}/{{info.floor}}层</li>
					<li>{{info.pay_name}}  </li>
				</ul>
			</div>
			<div class="position"><img src="static/img/position.png"/>{{info.address}}</div>
			<div class="tccolor"></div>

			<div class="house_text zsc_ht">
				<span class="zt">
					{{info.h_status == 0?'申请':''}}
					{{info.h_status == 1?'在租':''}}
					{{info.h_status == 2?'拒绝租房':''}}
					{{info.h_status == 3?'退房审核中':''}}
					{{info.h_status == 4?'已退房':''}}
					{{info.h_status == 5?'拒绝退房':''}}
				</span>
				租客：{{info.user_name}}<br>性别：<block>{{info.sex==0?'保密':''}}{{info.sex==1?'男':''}}{{info.sex==2?'女':''}}</block><br>联系电话：{{info.h_tel}}<br/>到期时间：{{info.h_dqtime}}
			</div>
			<div class="btn_list">
				<button  type="button" class="ban" v-if="info.h_status == 0" @click="zufang(1)">同意租房</button>
				<button  type="button" class="ban" v-if="info.h_status == 0" @click="zufang(2)">拒绝租房</button>
			</div>
		</div>


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
				info:{},
				id:''
			}
		},
		created(){
			this.id = this.$route.query.id
			this.get_info(this.$route.query.id)
		},
		methods:{
			
			// 租房
			zufang(index){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zrentehouse_audit',
					method:'post',
					params:{
						h_id:this.id,
						user_id:userInfo.user_id,
						s_status:index
					}
				})
				.then((res)=>{
					console.log(res)
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
					this.get_info(this.id)
					// if(res.data.success == 1){
						 
			  //  			setTimeout(() => {
					// 	  this.get_detail(this.id)
					// 	}, 1500);
					// }
				})
			},
			get_info(id){
				console.log(userInfo)
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zrentehouse_show',
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
			
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './zuwu_detail.scss'
</style>