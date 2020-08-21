<template>
	<div>
		<div id="header">
			<a href="javascript:void(0)" @click="go_back"><</a>
			业主注册
		</div>
		<div id="middle">
			<form >
			    <div class="item">
			    	<div class="label">业主姓名：</div>
			    	<div class="input"><input type="text" v-model="submit_order.name" placeholder="请输入业主姓名" /></div>
			    </div>
			    
			   
			     <div class="item">
			    	<div class="label">手机号码：</div>
			    	<div class="input">
			    		<input type="text" v-model="submit_order.mobile" placeholder="请输入手机号码" />
			    	</div>
			    </div>
			     <div class="item">
					<div class="label">性别</div>
					<div class="radio">
						<div class="male" @click="change_sex(2)">                
						    <img :src="submit_order.sex == 2?'static/img/radius_on.png':'static/img/radius.png'">
						    <label for="male">男</label>
						</div>
						<div class="female" @click="change_sex(1)">
						   	<img :src="submit_order.sex == 1?'static/img/radius_on.png':'static/img/radius.png'">
						    <label for="female">女</label>
						</div>
						
					</div>
				</div>
			     <div class="item">
			    	<div class="label">详细地址：</div>
			    	<div class="input">
			    		
			    		<textarea v-model="submit_order.address" rows="" cols=""></textarea>
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
			  	<div class="submit">
			  		<button type="button" @click="submit_form" v-if="!status_bool">注册登记</button>
			  		<button type="button" @click="submit_form1" v-if="status_bool">提交修改</button>
			  	</div>
			     <div class="tip" @click="gouxuan"><img :src="bool?'static/img/checkbox_on.png':'static/img/checkbox.png'"/>我已阅读并同意《用户协议》</div>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default {
		name:'T_reg',
		data(){
			return {
				submit_order:{
					name:'',
					user_id:'',
					mobile:'',
					address:'',
					sex:0,
					file_id:''
				},
				file_url:'',
				bool:false,
				status_bool:false
			}
		},
		created(){
			var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
			if(userInfo){
				this.submit_order.user_id = userInfo.user_id
			}
			if(this.$route.query.status){
				this.get_info()
				this.status_bool = true;
			}
		},
		beforeDestroy() {
			this.$Indicator.close()
		},
		methods:{
			go_back(){
				this.$router.push('/')
			},
			change_sex(index){
				this.submit_order.sex = index
			},
			gouxuan(){
				this.bool = !this.bool;
			},
			get_info(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=owner_update',
					method:'get',
					params:{
						user_id:userInfo.user_id
					}

				})
				.then((res)=>{
					console.log(res)
					this.submit_order.name=res.data.data[0].name;
					this.submit_order.user_id=res.data.data[0].user_id;
					this.submit_order.mobile=res.data.data[0].mobile;
					this.submit_order.address=res.data.data[0].address;
					this.submit_order.sex= res.data.data[0].sex;
					this.submit_order.file_id=res.data.data[0].file_id;
					this.file_url = res.data.data[0].path;

				})
			},
			submit_form(){
				if(this.submit_order.name == ''){
					this.$Toast({
			   				 message: '请填写姓名',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.submit_order.mobile == ''){
					this.$Toast({
			   				 message: '请填写手机号码',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.submit_order.address == ''){
					this.$Toast({
			   				 message: '请填写详细地址',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.submit_order.file_id == ''){
					this.$Toast({
			   				 message: '请上传房产信息',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.bool == ''){
					this.$Toast({
			   				 message: '请阅读并同意用户注册协议',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				console.log(this.submit_order)
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=default',
					method:'post',
					params:this.submit_order
				})
				.then((res)=>{
					console.log(res)
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  duration: 1500
			   			});
					if(res.data.error == 0){
						this.$router.push('o_user')
					}
					

				})
			},
			submit_form1(){
				if(this.submit_order.name == ''){
					this.$Toast({
			   				 message: '请填写姓名',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.submit_order.mobile == ''){
					this.$Toast({
			   				 message: '请填写手机号码',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.submit_order.address == ''){
					this.$Toast({
			   				 message: '请填写详细地址',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.submit_order.file_id == ''){
					this.$Toast({
			   				 message: '请上传房产信息',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				if(this.bool == ''){
					this.$Toast({
			   				 message: '请阅读并同意用户注册协议',
							  position: 'middle',
							  duration: 1500
			   			});
					return
				}
				console.log(this.submit_order)
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=owner_update',
					method:'post',
					params:this.submit_order
				})
				.then((res)=>{
					console.log(res)
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  duration: 1500
			   			});
					if(res.data.error == 0){
						this.$router.push('o_user')
					}
					

				})
			},
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
	             	 that.submit_order.file_id = res.data.data.id;
	             	 that.file_url= res.data.data.path
	             	 }
	            })
	            .catch((err)=>{
	            	console.log(err)
	            })
          	},
		}
	}
</script>
<style lang="scss" scoped>
	@import './T_reg.scss'
</style>