<template>
	<div  class="">
		<header-item message="退房详情"></header-item>
		<div id="middle">
			
			<div class="item">
				<div class="item_title">房源信息</div>
				<!--图片 and 介绍-->
				<div class="house_detail">
					<div class="img"><img src="img/house_detail.png"></div>
					<div class="house_name">
						<p class="price">￥12333.00</p>
						<p class="position">滨江海创小区</p>
						<p class="attr">两房一厅  5楼  60m²  押二付一</p>
						<p class="address"><img src="img/position.png" alt="" />广州天河区双铺路152号......</p>
					</div>
				</div>
				<!--图片 and 介绍 end-->
			</div>
			<div class="item">
				<div class="item_title">退房信息</div>
				<div class="bespeak_floor">
					<div class="p">退房原因：个人原因</div>
					<div class="p">退房时间：2018-09-12</div>
					<div class="p">详细说明：</div>
					<div class="p">
						<p>由于个人工作原因，因此申请退房。</p>
					</div>
					<div class="p">图片凭证：</div>
					<div class="p"><img src="img/apply_img.png" class="pic"/></div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">租房信息</div>
				<div class="bespeak_floor">
					<div class="p">小区名称：滨江海创小区</div>
					<div class="p">小区地址：广州天河区双铺路112号5区b栋 <img src="img/position.png" alt="" /></div>
					<div class="p">入住楼层：5层</div>
					<div class="p">房间号：502</div>
					<div class="p">租金：¥2500.00/月</div>
					<div class="p">押金：¥5000</div>
					<div class="p">支付方式：押二付一</div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">签约信息</div>
				<div class="bespeak_floor">
					<div class="p">租客姓名：陈嘉桦</div>
					<div class="p">联系电话：16478957845</div>
					<div class="p">入住时间：2018-12-30</div>
					<div class="p">到期时间：2019-12-30</div>
					<div class="p">签约期限：1年0月</div>
					<div class="p">租房备注：无</div>
				</div>
			</div>
			<div class="btn_list1">
				<button>不通过</button>
				<button>通过</button>
			</div>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'check_details',
		data(){
			return {
			
			}
		},
		created(){
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './check_detail.scss'
</style>