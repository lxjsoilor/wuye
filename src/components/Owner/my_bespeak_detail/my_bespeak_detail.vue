<template>
	<div class="all">
		<header-item message="预约详情"></header-item>
		<div id="middle">
			<!--图片 and 介绍-->
			<div class="house_detail">
				<div class="img"><img src="static/img/house_detail.png"></div>
				<div class="house_name">
					<p class="price">￥{{info.rental}}</p>
					<p class="position">{{info.name}}</p>
					<p class="attr">{{info.house_type}}  {{info.floor_in}}  {{info.acreage}}m²  {{info.pay_type}}</p>
					<p class="address"><img src="static/img/position.png" alt="" />{{info.address}}</p>
				</div>
			</div>
			<!--图片 and 介绍 end-->
			<div class="bespeak_floor">
				<div class="p">小区名称：{{info.name}}</div>
				<div class="p">小区地址：{{info.address}} <img src="static/img/position.png"/></div>
				<div class="p">预约楼层：{{info.floor_in}}层</div>
			</div>
			<div class="bespeak_floor">
				<div class="p">预约人：{{info.r_name}}</div>
				<div class="p">联系电话：{{info.r_tel}}</div>
				<div class="p">预约时间：{{info.r_time}}</div>
				<div class="p">预约留言：{{info.r_remarks}}</div>
			</div>
			<div class="bespeak_floor">
				<div class="p">业主姓名：{{info.nicheng}}</div>
				<div class="p">联系电话：{{info.mobile_phone}}</div>
			</div>
			<div class="btn_list">
				<button  type="button" @click="show" v-if="info.r_status == 0">取消预约</button>
				<button  type="button" v-if="info.r_status == 3">已取消</button>
			</div>
		</div>
		
		
		<div class="model_zhe" v-if="bool"></div>
		<div class="model" v-if="bool">
			<div class="model_header">取消预约</div>
			<p>	小区名称：{{info.name}}</p>
			<p>	楼层：{{info.floor_in}}楼</p>
			<p>	预约时间：{{info.r_time}}</p>
			<div class="model_btn">
				<button type="button" class="cannel"  @click="hide">取消</button>
				<button type="button" class="yes" @click="cannel">确定</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default {
		name:'my_bespeak_detail',
		data(){
			return {
				id:'',
				bool:false,
				info:{}
			}
		},
		created(){
			this.get_detail(this.$route.query.id)
			this.id = this.$route.query.id
		},
		methods:{
			get_detail(id){
				console.log(id,userInfo.user_id)

				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=yuyuedetail',
					method:'post',
					params:{
						r_id:id,
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			},
			// 取消预约
			cannel(){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=quxiaoyuyue',
					method:'post',
					params:{
						r_id:this.id,
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.$messagebox.alert(res.data.msg).then(action => {
					 	this.$router.push('my_bespeak')
					});
				})
			},
			show(){
				this.bool = true
			},
			hide(){
				this.bool = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './my_bespeak_detail.scss'
</style>