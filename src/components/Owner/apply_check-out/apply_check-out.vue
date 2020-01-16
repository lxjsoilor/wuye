<template>
	<div  class="all">
		<header-item message="申请退房"></header-item>
		<div id="middle">
			<div class="status">
				<img src="static/img/status_1.png" alt="" />
			</div>
			<div class="form">
				<div class="item">
					<div class="label">退房原因：</div>
					<div class="input">
						<select name=""v-model="submit_form.c_yuanyin">
							<option value="">请选择</option>
							<option :value="item.ID" v-for="(item,index) in lists">{{item.name}}</option>
						</select>
					</div>
				</div>
				<div class="item">
					<div class="label">退房时间：</div>
					<div class="input">
						<img src="static/img/time.png">
						<input type="text"  v-model="submit_form.c_sqtftime" @click="openPicker"  placeholder="请输入退房时间" />
					</div>
				</div>
				<div class="item">
					<div class="label">详细说明：</div>
					<div class="input">
						<textarea type="text" v-model="submit_form.c_shuoming" placeholder="请输入留言（可不填）" /></textarea>
					</div>
				</div>
				<div class="item" style="">
					<div class="input">上传凭证：</div>
					<div class="input"></div>
				</div>
				<div class="item">
					<div class="pic_div" v-for="(item,index) in file_url"><img :src="item"></div>
					<form ><input type="file" id="file" name="" @change="getFile($event)">
					<div class="pic_div">+</div></form>
					
				</div>
				<div class="item">
					<div class="tip"><router-link to="/danye?id=61">退房说明 <img src="static/img/tip.png" alt="" /></router-link></div>
				</div>
			</div>
			<div class="btn_list">
				<button type="button" @click="tijiao">提交申请</button>
			</div>
		</div>
		<mt-datetime-picker
		    ref="picker"
		    type="datetime"
		    yearFormat="{value}"
		    monthFormat="{value}"
		    dateFormat="{value}"
		    hourFormat="{value}"
		    minuteFormat="{value}"
		    :start-date="danqiandata"
		    v-model="submit_form.c_sqtftime"
		      @confirm="handleChange">
		  </mt-datetime-picker>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'apply_check-out',
		data(){
			return {
				info:{},
				file:'',
				file_url:[],
				lists:{},
				id:'',
				submit_form:{
					user_id:'',
					r_id:'',
					c_yuanyin:'',
					c_shuoming:'',
					c_sqtftime:'',
					p_pic:'',
					danqiandata:''
				}
			}
		},
		created(){
			// this.get_list(this.$router.query.id)
			// console.log(this.$route.query.id)
			this.danqiandata = new Date()
			this.submit_form.r_id = this.$route.query.id;
			this.get_tuifang()
			this.id = this.$router.query.id
		},
		methods:{
			openPicker () {
			     this.$refs.picker.open()
			},
			handleChange(value) {
		        this.submit_form.c_sqtftime = this.formatDate(value);
		        console.log(this.submit_form.c_sqtftime); // 20170101
		    },
		    formatTen(num) {
		        return num > 9 ? (num + "") : ("0" + num);
		    },
		    formatDate(date) {
		        var year = date.getFullYear();
		        var month = date.getMonth() + 1;
		        var day = date.getDate();
		        var hour = date.getHours();
		        var minute = date.getMinutes();
		        var second = date.getSeconds();
		        return year +'-' + this.formatTen(month) +'-' + this.formatTen(day) +' ' +this.formatTen(hour) +':' + this.formatTen(minute) +':' + this.formatTen(second);
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
	             	 that.file_url.push(res.data.pic)
	             	 that.submit_form.p_pic = that.file_url.join(',')
	             	 }

	            })

          },
          tijiao(){
          	this.submit_form.user_id = userInfo.user_id;
          	var that = this;
          	// this.submit_form.p_pic = this.file_url;
          	this.$axios({
          		url:'http://wy.gzziyu.com/zlisting.php?Action=quxiaozhufang',
          		method:'post',
          		params:this.submit_form
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
					
					
		   			setTimeout(() => {
					  this.$router.push({name:'applyCheckOut1',query:{id:id}})
					}, 1500);
				}
          		
          	})
          },
			// get_detail(id){
			// 	console.log(userInfo)
			// 	this.$axios({
			// 		url:'http://wy.gzziyu.com/zlisting.php?Action=zhufangdetail',
			// 		method:'post',
			// 		params:{
			// 			user_id:userInfo.user_id,
			// 			r_id:id
			// 		}
			// 	})
			// 	.then((res)=>{
			// 		this.info = res.data
			// 		console.log(res)
			// 	})
			// },
			get_tuifang(){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=tiaojian',
					method:'post',
					params:{
						shuzi:23
					}
				})
				.then((res)=>{
					// this.info = res.data
					console.log(res)
					
					 let arr1 = [];
					for (let i in res.data) {
					    arr1.push(res.data[i])
					}
					console.log(arr1)
					this.lists = arr1
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './apply_check-out.scss'
</style>