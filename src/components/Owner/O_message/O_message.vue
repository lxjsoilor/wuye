<template>
	<div class="">
		<header-item message="消息提醒"></header-item>
		<div id="middle">
			<ul>
				<li v-for="(item,index) in lists">
					<div class="li_header">{{item.m_title}}<span>{{item.m_addtime}}</span></div>
					<div class="message_text">{{item.m_content}}</div>
					<span class="button" v-if="item.m_read == 0" @click="yidu(item.m_id)">阅读</span>
					<span class="button button_sit"  v-if="item.m_read == 1">已读</span>
				</li>
				
			</ul>
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default {
		name:'O_message',
		data(){
			return {
				lists:[],
				id:''
			}
		},
		created(){
			this.get_list(this.$route.query.id)
			this.id = this.$route.query.id
		},
		methods:{
			get_list(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=messagelist',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						shuzi:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.lists = res.data
				})
			},
			yidu(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=messagedetail',
					method:'post',
					params:{
						m_id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.$Toast({
			   				 message: '已读',
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
					this.get_list(this.id)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './O_message.scss'
</style>