<template>
	<div  class="all">
		<header-item message="个人信息"></header-item>
		<div id="middle">
			<div class="user_img">
				<div class="label">头像</div>
				<div class="img">
					<form >
						<div class="pic_div" v-if="info.images == ''">+ </div>
						<input type="file" id="file" name="" @change="getFile($event)">
						<img :src="info.images" v-if="info.images != ''"/>
					</form>
				</div>
			</div>
			<div class="item">
				<div class="label">姓名</div>
				<div class="input"><input type="text" v-model="info.nicheng" value="张晓雪" /></div>
			</div>
			<div class="item">
				<div class="label">性别</div>
				<div class="radio">
					<div class="female" @click="change_sex(1)">
					   	<img :src="info.sex == 1?'static/img/radius_on.png':'static/img/radius.png'">
					    <label for="female">女</label>
					</div>
					<div class="male" @click="change_sex(2)">                
					    <img :src="info.sex == 2?'static/img/radius_on.png':'static/img/radius.png'">
					    <label for="male">男</label>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="label">手机号码</div>
				<div class="input"><input type="text" v-model="info.mobile_phone"/></div>
			</div>
			<div class="btn_list">
				<button type="button" @click="set_info">保存</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	console.log({userInfo})
	export default{
		name:'user_info',
		data(){
			return {
				file:{},
				info:{
					images: "",
					message: "0",
					mobile_phone: "",
					nicheng: '',
					sex: "0"
				}
			}
		},
		created(){
			userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
			this.get_info()
		},
		methods:{
			change_sex(index){
				this.info.sex = index
			},
			set_info(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=gengxinhuiyuan',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						nicheng:this.info.nicheng,
						sex:this.info.sex,
						images:this.info.images,
					}
				})
				.then((res)=>{
					// this.info = res.data;
					console.log(res)
					this.$Toast({
			   				 message: '修改信息成功',
							  position: 'middle',
							  duration: 1500
			   			});
					this.get_info()
				})
			},
			get_info(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=huiyuanxixin',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					this.info = res.data;
					console.log(res)
				})
			},
			getFile(event) {
	            this.file = event.target.files[0];
	            console.log(this.file);

	            let formData = new FormData();

	            formData.append('pic', this.file);
	            let config = {

	              headers: {

	                'Content-Type': 'multipart/form-data'

	              }

	            }
            	var that = this;
             	this.$axios.post('http://wy.gzziyu.com/zmember.php?Action=shangquanpic', formData, config).then(function (res) {

	             	 console.log(res)
	             	 if(res.data.success == 1){
	             	 that.info.images = res.data.pic ;
	             	 
	             	 }

	            })

          },
		}
	}
</script>
<style lang="scss" scoped>
	@import './user_info.scss'
</style>