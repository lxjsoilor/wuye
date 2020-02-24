<template>
	<div  class="all">
		<header-item message="退房详情"></header-item>
		<div id="middle">
			
			<div class="item">
				<div class="item_title">房源信息</div>
				<!--图片 and 介绍-->
				<div class="house_detail">
					<div class="img"><img :src="info.pic"></div>
					<div class="house_name">
						<p class="price">$ {{info.rental}}</p>
						<p class="position">{{info.name}}</p>
						<p class="attr">两房一厅  {{info.floor_in}}楼  60m²  {{info.p_name}}</p>
						<p class="address"><img src="static/img/position.png" alt="" />{{info.address}}</p>
					</div>
				</div>
				<!--图片 and 介绍 end-->
			</div>
			<div class="item">
				<div class="item_title">退房信息</div>
				<div class="bespeak_floor">
					<div class="p">退房原因：{{info.c_yuanyin}}</div>
					<div class="p">退房时间：2018-09-12</div>
					<div class="p">详细说明：</div>
					<div class="p">
						<p>{{info.c_shuoming}}</p>
					</div>
					<div class="p">图片凭证：</div>
					<div class="p"><img src="" class="pic"/></div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">租房信息</div>
				<div class="bespeak_floor">
					<div class="p">小区名称：{{info.name}}</div>
					<div class="p">小区地址：{{info.address}} <img src="static/img/position.png" alt="" /></div>
					<div class="p">入住楼层：{{info.floor_in}}层</div>
					<div class="p">房间号：{{info.h_fanghao}}</div>
					<div class="p">租金：$ {{info.rental}}/月</div>
					<div class="p">押金：$ {{info.h_yajin}}</div>
					<div class="p">支付方式：{{info.pay_type}}</div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">签约信息</div>
				<div class="bespeak_floor">
					<div class="p">租客姓名：{{info.h_name}}</div>
					<div class="p">联系电话：{{info.h_tel}}</div>
					<div class="p">入住时间：{{info.h_rztime}}</div>
					<div class="p">到期时间：{{info.h_dqtime}}</div>
					<div class="p">签约期限：{{info.h_qixian}}</div>
					<div class="p">租房备注：{{info.h_remarks}}</div>
				</div>
			</div>
			<div class="btn_list1" v-if="info.h_status == 3">
				<button type="button" @click="caozuo(5)">不通过</button>
				<button type="button" @click="caozuo(4)">通过</button>
			</div>
		</div>
		
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'tuifang_detail',
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
			caozuo(index){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zcheckout_audit',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						h_id:this.id,
						status:index
					}
				})
				.then((res)=>{
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
					this.$router.push('tuifang')
				})
			},
			get_info(id){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				console.log(id)
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=zcheckout_send',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						h_id:id
					}
				})
				.then((res)=>{
					this.info = res.data;
					console.log(res)
				})
			},
			
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './tuifang_detail.scss'
</style>