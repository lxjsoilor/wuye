<template>
	<div  class="all">
		<header-item message="预约看房"></header-item>
		<div id="middle">
			<!--图片 and 介绍-->
			<div class="house_detail">
				<div class="img"><img src="static/img/house_detail.png"></div>
				<div class="house_name">
					<p class="price">￥{{info.rental}}</p>
					<p class="position">{{info.name}}</p>
					<p class="attr">{{info.house_type}}  {{info.floor_in}}  {{info.acreage}}m²  {{info.pay_type}}</p>
					<p class="address"><img src="static/img/position.png" alt="" />{{info.address}}</p>
				</div>
			</div>
			<!--图片 and 介绍 end-->
			<div class="bespeak_floor">
				<div class="p">小区名称：{{info.name}}</div>
				<div class="p">小区地址：{{info.address}}<img src="static/img/position.png"/></div>
				<div class="p">预约楼层：
					<span @click="mini">-</span>
					<input type="text"  v-model="submit_form.r_louceng" />
					<span @click="add">+</span>
				</div>
			</div>
			<div class="form">
				<div class="item">
					<div class="label">预约人：</div>
					<div class="input">
						<input type="text" v-model="submit_form.r_name" placeholder="请输入预约人姓名" />
					</div>
				</div>
				<div class="item">
					<div class="label">联系电话：</div>
					<div class="input">
						<input type="text" v-model="submit_form.r_tel" placeholder="请输入联系电话" />
					</div>
				</div>
				<div class="item">
					<div class="label">预约时间：</div>
					<div class="input">
						<img src="static/img/time.png">
						<input type="text" v-model="submit_form.r_time" @click="openPicker" />
					</div>
				</div>
				<div class="item">
					<div class="label">预约留言：</div>
					<div class="input">
						<textarea type="text"  v-model="submit_form.r_remarks" placeholder="请输入留言（可不填）" /></textarea>
					</div>
				</div>
			</div>
		</div>
		<div class="btn_list">
			<button type="button" @click="show_model">立即预约</button>
		</div>
		<div class="model_zhe" v-if="show"></div>
		<div class="model" v-if="show">
			<div class="model_header">确认预约</div>
			<p>	小区名称：{{info.name}}</p>
			<p>	楼层：{{submit_form.r_louceng}}楼</p>
			<p>	预约时间：{{submit_form.r_time}}</p>
			<div class="model_btn">
				<button type="button" class="cannel" @click="hide_model">取消</button>
				<button type="button" class="yes" @click="yuyue">确定</button>
			</div>
		</div>
		<mt-datetime-picker
		    ref="picker"
		    type="datetime"
		    yearFormat="{value}"
		    monthFormat="{value}月"
		    dateFormat="{value}日"
		    hourFormat="{value}时"
		    minuteFormat="{value}分"
		    :start-date="danqiandata"
		    v-model="submit_form.r_time"
		      @confirm="handleChange">
		  </mt-datetime-picker>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'bespeak',
		data(){
			return {
				show:false,
				info:{},
				pickerValue:null,
				submit_form:{
					r_fangyangid:'',
					r_userid:'',
					r_louceng:1,
					r_name:'',
					r_tel:'',
					r_time:null
				},
				danqiandata:''
			}
		},
		created(){
			this.danqiandata = new Date()
			this.get_detail(this.$route.query.id)
			if(userInfo){
				this.submit_form.r_userid = userInfo.user_id
			}else{
				this.$router.push('login')
			}
		},
		methods:{
			openPicker () {
			     this.$refs.picker.open()
			},
			handleChange(value) {
		        this.submit_form.r_time = this.formatDate(value);
		        console.log(this.submit_form.r_time); // 20170101
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
			add(){
				this.submit_form.r_louceng = parseInt(this.submit_form.r_louceng)+1;
			},
			mini(){
				if(this.submit_form.r_louceng>1){
					this.submit_form.r_louceng = parseInt(this.submit_form.r_louceng)-1;
				}
			},
			yuyue(){
				console.log(this.submit_form)
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=yuyuelisting',
					method:'post',
					params:this.submit_form
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						// this.$messagebox('提示', res.data.msg);
						this.$messagebox.alert(res.data.msg).then(action => {
						 	this.$router.push('my_bespeak')
						});
						
					}else{
						this.$messagebox('提示', res.data.msg);
					}

					
				})
			},
			show_model(){
				this.show = true;
			},
			hide_model(){
				this.show = false;
			},
			get_detail(id){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=listingdetail',
					method:'post',
					params:{
						id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.submit_form.r_fangyangid = res.data.id
					this.submit_form.r_louceng = res.data.floor_in
					this.info = res.data
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './bespeak.scss'
</style>