<template>
	<div  class="all">
		<header-item message="建议详情"></header-item>
		<div id="middle">
			
			<div class="form">
				<div class="item">
					<div class="label">建议类型：</div>
					<div class="input">{{type_text}}</div>
					
				</div>
				<div class="item">
					<div class="label">建议内容：</div>
					<div class="input">{{info.msg_title}}</div>
				</div>
				<div class="item">
					<div class="label">建议时间：</div>
					<div class="input">{{info.msg_time}}</div>
					
				</div>
				
			</div>
			<div class="form1" v-if="info.huifu_neirong">
				<div class="item1">
					<div class="label">平台回复：</div>
				</div>
				<div class="content">
					{{info.huifu_neirong}}
				</div>
				<div class="time">回复时间：{{info.huifu_time}}</div>
			</div>
			
			<div class="btn_list">
				<button type="buton" @click="delect">删除建议</button>
			</div>
			
			
			
			
			
			
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'suggest_detail',
		data(){
			return {
				info:{},
				type_text:'',
				id:''
			}
		},
		created(){
			this.get_info(this.$route.query.id)
			this.id = this.$route.query.id
		},
		methods:{
			get_info(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=wentifankuidetail',
					method:'post',
					params:{
						msg_id:id,
						
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data;
					switch(res.data.msg_type)
					{
					case "0":
					  this.type_text = '留言'
					  break;
					case "1":
					   this.type_text = '投诉'
					  break;
					case "2":
					   this.type_text = '询问'
					  break;
					case "3":
					   this.type_text = '售后'
					  break;
					}
				})
			},
			delect(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=wentifankuidete',
					method:'post',
					params:{
						msg_id:this.id,
						
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						this.$Toast({
		   				 message: '删除成功',
						  position: 'middle',
						  duration: 1500
		   				});
		   				setTimeout(() => {
						  this.$router.push('suggest')
						}, 1500);
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './suggest_detail.scss'
</style>