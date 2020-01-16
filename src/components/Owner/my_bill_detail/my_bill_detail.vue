<template>
	<div  class="all">
		<header-item message="我的账单"></header-item>
		<div id="middle">
			
			<div class="form">
				<div class="item">
					<div class="label">{{info.y_project}}：¥{{info.y_price}}</div>
				</div>
				<div class="item">
					<div class="label">{{info.y_mingchen2}}：{{info.y_mcshijian}}</div>
				</div>
			</div>
			<div class="form">
				<div class="item">
					<div class="label">租房名称：{{info.y_mingchen1}}</div>
				</div>
				<div class="item">
					<div class="label">详细地址：{{info.y_danwei}}</div>
				</div>
				<div class="item">
					<div class="label">入住楼层：{{info.y_shuliang}}层</div>
				</div>
				<div class="item">
					<div class="label">房间号：502</div>
				</div>	
			</div>
			<div class="form1">
				
				<div class="content">
					支付状态：已支付
				</div>
				<div class="content">
					支付时间：2018.5.23  23:20:51
				</div>
				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'my_bill_detail',
		data(){
			return {
				info:[]
			}
		},
		created(){
			this.get_house(this.$route.query.id)
		},
		methods:{
			
			get_house(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=zhangdanmingxi',
					method:'post',
					params:{
						y_id:id
					}
				})
				.then((res)=>{
					this.info = res.data
					console.log(res)
					// this.submit_data.b_fangyangid =res.data[0].r_id
				})
			}

		}
			
	}
</script>
<style lang="scss" scoped>
	@import './my_bill_detail.scss'
</style>