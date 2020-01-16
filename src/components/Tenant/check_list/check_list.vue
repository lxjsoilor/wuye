<template>
	<div  class="">
		<header-item message="退房申请"></header-item>
		<div id="middle">
			<div class="select">
				<div class="bill_header">
					<select name="">
						<option value="">地区</option>
					</select>
					<select name="">
						<option value="">小区</option>
					</select>
					<select name="">
						<option value="">全部</option>
					</select>
				</div>
			</div>
			<ul>
				<li>
					<span>待处理</span>
					<div class="img"><img src="img/house.png"/></div>
					<div class="right">
						
						<p class="name">滨江海创小区</p>
						<p class="attr">维修问题：电器维修</p>
						<p class="button">发送管理处</p>
					</div>
				</li>
				<li>
					<span>待处理</span>
					<div class="img"><img src="img/house.png"/></div>
					<div class="right">
						
						<p class="name">滨江海创小区</p>
						<p class="attr">维修问题：电器维修</p>
						<p class="button">发送管理处</p>
					</div>
				</li>
				<li>
					<span>待处理</span>
					<div class="img"><img src="img/house.png"/></div>
					<div class="right">
						
						<p class="name">滨江海创小区</p>
						<p class="attr">维修问题：电器维修</p>
						<p class="button no_click">发送管理处</p>
					</div>
				</li>
				
				<li>
					<span>待处理</span>
					<div class="img"><img src="img/house.png"/></div>
					<div class="right">
						
						<p class="name">滨江海创小区</p>
						<p class="attr">维修问题：电器维修</p>
						<p class="button">发送管理处</p>
					</div>
				</li>
			</ul>			
		</div>
		
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'check_list',
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
	@import './check_list.scss'
</style>