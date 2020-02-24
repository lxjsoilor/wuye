<template>
	<div  class="all">
		<header-item message="我的租房"></header-item>
		<div id="middle">
			<div class="item">
				<div class="status" v-if="info.h_status == 0">申请中</div>
				<div class="status" v-if="info.h_status == 1">正在居住</div>
				<div class="status" v-if="info.h_status == 2">拒绝租房</div>
				<div class="status" v-if="info.h_status == 3"><a href="javascript:void(0)"  @click="go_tuifangxiangqing(info.h_id)">查看详情></a>退房审核中</div>
				<div class="status" v-if="info.h_status == 4">已退房<a href="javascript:void(0)"  @click="go_tuifangxiangqing(info.h_id)">查看详情></a></div>
				
			</div>
			<div class="item">
				<div class="item_title">租房信息</div>
				<!--图片 and 介绍-->
				<div class="house_detail">
					<div class="img"><img src="static/img/house_detail.png"></div>
					<div class="house_name">
						<p class="price">$ {{info.rental}}</p>
						<p class="position">{{info.name}}</p>
						<p class="attr">{{info.house_type}}  {{info.floor_in}}楼  {{info.acreage}}m²  {{info.pay_type}}</p>
						<p class="address"><img src="static/img/position.png" alt="" />{{info.address}}</p>
					</div>
				</div>
				<!--图片 and 介绍 end-->
			</div>
			<div class="item">
				<div class="item_title">租房信息</div>
				<div class="bespeak_floor">
					<div class="p">小区名称：{{info.name}}</div>
					<div class="p">小区地址：{{info.address}}<img src="static/img/position.png"/></div>
					<div class="p">预约楼层：{{info.floor_in}}层</div>
					<div class="p">
						房间号：{{info.h_fanghao}}
					</div>
					<div class="p">租金：$ {{info.rental}}/月</div>
					<div class="p">押金：$  {{info.h_yajin}}</div>
					<div class="p">支付方式： {{info.pay_type}}</div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">签约信息<span><router-link to="/danye?id=60">租房说明 <img src="static/img/tip.png"/></router-link></span></div>
				<div class="bespeak_floor">
					<div class="p">租客姓名：{{info.h_name}}</div>
					<div class="p">联系电话：{{info.h_tel}}</div>
					<div class="p">入住时间：{{info.h_rztime}}</div>
					<div class="p">到期时间：{{info.h_dqtime}}</div>
					<div class="p">签约期限：{{info.h_qixian}}</div>
					<div class="p">租房备注：{{info.h_remarks}}</div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">业主信息</div>
				<div class="bespeak_floor">
					<div class="p">业主姓名：{{info.nicheng}}</div>
					<div class="p">联系电话：{{info.mobile_phone}}</div>
				</div>
			</div>
			<div class="btn_list">
				<button type="button" @click="tuifang(info.h_id)" v-if="info.h_status == 1">退房</button>
				<button type="button" @click="weixiu(info.h_id)" v-if="info.h_status == 1">维修</button>

			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'Renting_detail',
		data(){
			return {
				info:{}
			}
		},
		created(){
			this.get_detail(this.$route.query.id)
			this.id = this.$route.query.id
		},
		methods:{

			get_detail(id){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=zhufangdetail',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						r_id:id
					}
				})
				.then((res)=>{
					this.info = res.data
					console.log(res)
				})
			},
			tuifang(id){
				this.$router.push({name:'applyCheckOut',query:{id:id}})
			},
			weixiu(id){
				this.$router.push({name:'apply_Repair',query:{id:id}})
				// this.$router({name:'apply_Repair',query:{id:id}})
			},
			go_tuifangxiangqing(id){
				this.$router.push({name:'applyCheckOut1',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './Renting_detail.scss'
</style>