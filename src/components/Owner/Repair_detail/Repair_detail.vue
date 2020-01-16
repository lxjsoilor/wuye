<template>
	<div  class="">
		<header-item message="维修详情"></header-item>
		<div id="middle">
			<div class="status">
				<img src="static/img/weixiu_1.png" alt="" v-if="info.s_status == 0" />
				<img src="static/img/weixiu_1.png" alt="" v-if="info.s_status == 1" />
				<img src="static/img/weixiu_2.png" alt="" v-if="info.s_status == 2" />
				<img src="static/img/weixiu_3.png" alt="" v-if="info.s_status == 3" />
				<img src="static/img/weixiu_4.png" alt="" v-if="info.s_status == 4" />
				<img src="static/img/weixiu_3.png" alt="" v-if="info.s_status == 6" />
			</div>
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
						<div class="label">照片/视频：</div>
						
					</div>
					<div class="item2">
						<div class="pic_div" v-for="(item,index) in info.zspic"><img :src="item"/></div>
					</div>
					
				</div>
			</div>
			
			
			<div class="item" v-for="(item,index) in info.weixiuxq">
				<div class="item_title">报价{{index+1}}</div>
				<div class="form">
					<div class="item3">
						<div class="label">项目：{{item.q_project}}</div>
					</div>
					<div class="item3">
						<div class="label">支付者：{{item.q_payer==0?'租客':'业主'}}</div>
					</div>
					<div class="item3">
						<div class="label">金额：{{item.q_amount}}</div>
					</div>
					<div class="item3">
						<div class="label">报价说明：{{item.q_description}}</div>
					</div>
					
				</div>
			</div>
			<div class="item">
				<div class="item_title">安排维修</div>
				<div class="form">
					<div class="item3">
						<div class="label">维修师傅：{{info.s_sname}}</div>
						
					</div>
					<div class="item3"><div class="label">联系电话：{{info.s_stel}}</div></div>
					<div class="item3">
						<div class="label">安排维修时间：{{info.s_wxtime}}</div>
						
					</div>
					<div class="item3"><div class="label">备注：{{info.s_remarks}}</div></div>
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
					<!-- <div class="item1">
						<div class="label">小区名称：{{info.name}}</div>
						
					</div> -->
					<div class="item1">
						<div class="label">楼层：{{info.h_louceng}}层</div>
						
					</div>
					<div class="item1">
						<div class="label">房间号：{{info.h_fanghao}}</div>
						
					</div>
					<div class="item1">
						<div class="label">地址：{{info.address}}</div>
						
					</div>
					
				</div>
			</div>
			
			
			
			<div class="item_title">
				<div class="span">申请时间：{{info.s_addtime}}</div>
				<div class="span" v-if="info.s_baojiatime">报价时间：{{info.s_baojiatime}}</div>
				
			</div>
			
			<div class="btn_list">
				<button type="button" @click="quxiao(info.s_id,5)" v-if="info.s_status <= 2 ">取消维修</button>
				<button type="button" @click="quxiao(info.s_id,6)" v-if="info.s_status == 2 ">同意维修</button>
				<button type="button" v-if="info.s_status == 5">已经取消</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'Repair_detail',
		data(){
			return {
				info:{},
				zuke_info:{},
				id:''
			}
		},
		created(){
			this.get_detail(this.$route.query.id)
			this.id = this.$route.query.id
			// this.get_info()
		},
		methods:{
			get_detail(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=weixiudetail',
					method:'post',
					params:{
						s_id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			},
			// get_info(id){
			// 	console.log(userInfo)
			// 	this.$axios({
			// 		url:'http://wy.gzziyu.com/zlisting.php?Action=zhufangdetail',
			// 		method:'post',
			// 		params:{
			// 			user_id:userInfo.user_id,
			// 			r_id:id
			// 		}
			// 	})
			// 	.then((res)=>{
			// 		this.zuke_info = res.data
			// 		console.log(res)
			// 	})
			// },
			quxiao(id,index){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=quxiaoweixiu',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						s_id:id,
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
					if(res.data.success == 1){
						 
			   			setTimeout(() => {
						  this.get_detail(this.id)
						}, 1500);
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './Repair_detail.scss'
</style>