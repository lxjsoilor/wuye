<template>
	<div  class="all">
		<header-item message="提交建议"></header-item>
		<div id="middle">
			<div class="form">
				<div class="item">
					<div class="label">建议类型：</div>
					<div class="input">
						<select name="" id="" v-model="msg_type">
							<option value="0">建议</option>
							<option value="1">投诉</option>
							<option value="2">询问</option>
							<option value="3">售后</option>
						</select>
					</div>
				</div>
				
				<div class="item">
					<div class="label">建议内容：</div>
					<div class="input">
						<textarea type="text" v-model="msg_title" placeholder="请输入建议内容" /></textarea>
					</div>
				</div>
				<div class="file">
					<div class="label">房产信息上传：</div>
					<div class="input">
						<form ><input type="file" id="file" @change="getFile($event)">
				</form>
						<button>浏览</button>
					</div>
				</div>
				<div class="img" v-show="file_url"><img :src="'http://wy.gzziyu.com/'+file_url"/></div>
			</div>
			<div class="btn_list">
				<button type="button" @click="submit">提交建议</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'submit_suggest',
		data(){
			return {
				msg_title:'',
				msg_type:0,
				file_url: '',
				file_id: ''
			}
		},
		created(){
		},
		beforeDestroy() {
			this.$Indicator.close()
		},
		methods:{
			getFile(event) {
				this.$Indicator.open()
				this.file = event.target.files[0];
				console.log(this.file);
				let formData = new FormData();
				formData.append('file', this.file);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				var that = this;
				this.$axios.post('http://wy.gzziyu.com/owner.php?act=upload_file', formData, config).then(function (res) {
						console.log(res)
						that.$Indicator.close()
						if(res.data.error == 0){
							that.file_id = res.data.data.id;
							that.file_url= res.data.data.path
						}
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			submit(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=wentifankui',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						msg_title:this.msg_title,
						msg_type:this.msg_type,
						message_img:this.file_url
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						this.$Toast({
		   				 message: '提交成功',
						  position: 'middle',
						  duration: 1500
		   				});
		   				setTimeout(() => {
						  this.$router.push('suggest')
						}, 1500);
		   				
					} else {
						this.$Toast(res.data.msg || '系统繁忙，请稍后再试')
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './submit_suggest.scss'
</style>