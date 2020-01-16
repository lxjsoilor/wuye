<template>
	<div  class="">
		<header-item message="报修申请"></header-item>
		<div id="middle">
			<!--<div class="status">
				<img src="img/weixiu_2.png" alt="" />
			</div>-->
			<div class="item">
				<div class="item_title">维修信息</div>
				<div class="form">
					<div class="item2">
						<div class="label">维修项目：{{info.s_xiangmu}}</div>
						
					</div>
					<div class="item2">
						<div class="label">问题说明：{{info.s_wenti}}</div>
					</div>
					<div class="item2">
						<div class="label">照片：</div>
						
					</div>
					<div class="item2">
						<div class="pic_div" v-for="(item,index) in img_list"><img :src="'http://wy.gzziyu.com/'+item" /></div>
					</div>
					
				</div>
			</div>
			
			
			
			
			<div class="item">
				<div class="item_title">房屋信息</div>
				<div class="form">
					<div class="item1">
						<div class="label">租客姓名：{{info.h_name}}</div>
						
					</div>
					<!--<div class="item1">
						<div class="label">联系电话：</div>
					</div>-->
					<div class="item1">
						<div class="label">联系电话：{{info.h_tel}}</div>
						
					</div>
					<div class="item1">
						<div class="label">小区名称：{{info.name}}</div>
						
					</div>
					<div class="item1">
						<div class="label">楼层：{{info.floor_in}}层</div>
						
					</div>
					<div class="item1">
						<div class="label">房间号：{{info.hous_id}}</div>
						
					</div>
					<div class="item1">
						<div class="label">地址：{{info.address}}</div>
						
					</div>
					
				</div>
			</div>
			
			<div class="item_title">
				<div class="span">申请时间：{{info.s_addtime}}</div>
				
			</div>


			<div class="btn_list1" v-if="info.s_status == 0">
				<button type="button" @click="caozuo(8)">不同意维修</button>
				<button type="button" @click="caozuo(7)">同意维修</button>
			</div>
		</div>
		
		
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'Application_detail',
		data(){
			return {
				info:{},
				id:'',
				img_list:[]
			}
		},
		created(){
			this.get_info(this.$route.query.id)
			this.id = this.$route.query.id
		},
		methods:{
			get_info(id){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zservice_show',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						s_id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data.data[0];
					console.log(this.info.img)
					this.img_list = this.info.img.split(',')
				})
			},
			caozuo(index){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zservice_audit',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						s_id:this.id,
						s_status:index
					}
				})
				.then((res)=>{
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
					this.$router.push('Application')
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import './Application_detail.scss'
</style>