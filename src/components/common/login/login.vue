<template>
	<div id="index">
			<div class="logo"><img src="static/img/logo.png"/></div>
			<div class="title">物业管理</div>
			<form >
			    <div class="item">
			    	<div class="label"><img src="static/img/phone.png"/></div>
			    	<div class="input"><input type="text" placeholder="请输入手机号码" v-model="mobile_phone" /></div>
			    </div>
				<div class="item">
			    	<div class="label"><img src="static/img/phone.png"/></div>
			    	<div class="input"><input type="password" placeholder="请输入密码" v-model="password" /></div>
			    </div>
			     <!-- <div class="item">
			    	<div class="label"><img src="static/img/code.png"/></div>
			    	<div class="input"><input type="text" v-model='code' placeholder="请输入验证码"/></div>
			    	<button type="button" class="mui-btn" :disabled="disabled" @click="get_code">{{text}}</button>
			    </div> -->
			    <div class="submit"><button type="button" @click="login">立即登录</button></div>
			    <div class="tip" @click="go_reg">还没有账号，去注册→</div>
			</form>
		</div>
</template>
<script type="text/javascript">
	import store from '@/store/store'
	export default {
		name:'o_reg',
		data () {
			return {
				mobile_phone:'',
				code:'',	
				second: 60,
                disabled:false,
				time: 0,
				password: ''

			}
		},
		computed:{
			text:function () {
				 return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
			}
		},
		methods:{
			go_reg(){
				this.$router.push('o_reg')
			},
			 timer () {
            	console.log(this.time)
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }else{
                	 this.disabled = false;
                }
            },
			get_code(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=dlyanzhengma',
					method:'post',
					 params:{
		                mobile_phone:this.mobile_phone
		            }
				})
				.then((res)=>{
					console.log(res)
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  duration: 1500
			   			});
					if(res.data.success == 1){
						 this.disabled = true;
						this.time = this.second
                    	this.timer()
                    	
					}
					
				})
			},
			login(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=login',
					method:'post',
					 params:{
						mobile_phone:this.mobile_phone,
						password: this.password
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
						
						 var Info = {
                            user_id:res.data.user_id,
                            user_rank:res.data.user_rank
                        };
                        sessionStorage.setItem('userInfos',JSON.stringify(Info));
                        store.commit('userInfos',Info)
                        
			   			this.time = 0
			   			setTimeout(() => {
						  this.$router.push('/');
						  location.reload();
						}, 1500);
					}

				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './login.scss'
</style>