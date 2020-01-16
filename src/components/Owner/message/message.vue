<template>
	<div  class="all">
		<header-item message="我的建议"></header-item>
		<div id="middle">
			<ul>
				<li>
					<div class="li_header">预约看房提醒<span>2018-10-12  20:20</span></div>
					<div class="message_text">      你好，珠江小区，A栋12层1502预约2018年10月1日 14：30 看房。业主：陈朱江   13688888888</div>
				</li>
				
				<li>
					<div class="li_header">报修消息通知<span>2018-10-12  20:20</span></div>
					<div class="message_text">      你好，珠江小区，A栋12层1502预约2018年10月1日 14：30 看房。业主：陈朱江   13688888888</div>
				</li>
				
				<li>
					<div class="li_header">退房消息<span>2018-10-12  20:20</span></div>
					<div class="message_text">      你好，珠江小区，A栋12层1502预约2018年10月1日 14：30 看房。业主：陈朱江   13688888888</div>
				</li>
				
				<li>
					<div class="li_header">管理处消息<span>2018-10-12  20:20</span></div>
					<div class="message_text">      你好，珠江小区，A栋12层1502预约2018年10月1日 14：30 看房。业主：陈朱江   13688888888</div>
				</li>
				
			</ul>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'message',
		data(){
			return {
				lists:[]
			}
		},
		created(){
			this.get_list()
		},
		methods:{
		}
	}
</script>
<style lang="scss" scoped>
	@import './message.scss'
</style>