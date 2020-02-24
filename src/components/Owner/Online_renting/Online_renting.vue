<template>
	<div  class="all">
		<header-item message="在线租房"></header-item>
		<div id="middle">
			<!--图片 and 介绍-->
			<div class="house_detail">
				<div class="img"><img src="static/img/house_detail.png"></div>
				<div class="house_name">
					<p class="price">$ {{info.rental}}</p>
					<p class="position">{{info.name}}</p>
					<p class="attr">{{info.house_type}}  {{info.floor_in}}  {{info.acreage}}m²  {{info.pay_type}}</p>
					<p class="address"><img src="static/img/position.png" alt="" />{{info.address}}</p>
				</div>
			</div>
			<!--图片 and 介绍 end-->
			<div class="bespeak_floor">
				<div class="p">小区名称：{{info.name}}</div>
				<div class="p">小区地址：{{info.address}} <img src="static/img/position.png"/></div>
				<div class="p">入住楼层：
					<span @click="mini">-</span>
					<input type="text"  v-model="submit_form.h_louceng" />
					<span @click="add">+</span>
				</div>
				<div class="p">房间号：
					<input type="text" value="" v-model="submit_form.h_fanghao"  class="text"/>
				</div>
				<div class="p">租金：$ {{info.rental}}/月</div>
				<div class="p">押金：$ {{info.yajin}}</div>
				<div class="p">支付方式：{{info.pay_type}}</div>
			</div>
			<div class="form">
				<div class="item">
					<div class="label">租客姓名：</div>
					<div class="input">
						<input type="text" v-model="submit_form.h_name" placeholder="请输入租客姓名" />
					</div>
				</div>
				<div class="item">
					<div class="label">联系电话：</div>
					<div class="input">
						<input type="text"  v-model="submit_form.h_tel" placeholder="请输入联系电话" />
					</div>
				</div>
				<div class="item">
					<div class="label">入住时间：</div>
					<div class="input">
						<img src="static/img/time.png">
						<input type="text" v-model="submit_form.h_rztime" @click="openPicker" />
					</div>
				</div>
				<div class="item">
					<div class="label">到期时间：</div>
					<div class="input">
						<img src="static/img/time.png">
						<input type="text" v-model="submit_form.h_dqtime" @click="openPicker1" />
					</div>
				</div>
				<div class="item">
					<div class="label">签约期限：</div>
					<div class="input">
						<input type="text" class="num" value="0" v-model="year" /><span>年</span><input type="text" class="num" value="0" v-model="months"/><span>月</span>
					</div>
				</div>
				<div class="item">
					<div class="label">租房备注：</div>
					<div class="input">
						<textarea type="text" v-model="submit_form.h_remarks" placeholder="请输入租房备注（可不填）" /></textarea>
					</div>
				</div>
				<div class="item">
					<div class="info">租房说明 <img src="static/img/tip.png"/></div>
				</div>
			</div>
			
		</div>
		<div class="btn_list">
			<div class="price">$ {{info.feiyong}}</div>
			<button type="button" @click="show_model">确认租房</button>
		</div>
		
		<div class="model_zhe" v-if="show"></div>
		<div class="model"  v-if="show">
			<div class="model_header">确认租房</div>
			<p>	小区名称：{{info.name}}</p>
			<p>	楼层：{{submit_form.h_louceng}}楼</p>
			<p>	支付金额：$ {{info.feiyong}}</p>
			<div class="model_btn">
				<button type="button" class="cannel" @click="show = !show">取消</button>
				<button type="button" class="yes" @click="zufang">确定</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
		<mt-datetime-picker
		    ref="picker1"
		    type="date"
		    yearFormat="{value}"
		    monthFormat="{value}"
		    dateFormat="{value}"
		    hourFormat="{value}"
		    minuteFormat="{value}"
		     :start-date="danqiandata"
		    v-model="submit_form.h_rztime"
		      @confirm="handleChange">
		  </mt-datetime-picker>
		  <mt-datetime-picker
		    ref="picker2"
		    type="date"
		    yearFormat="{value}"
		    monthFormat="{value}"
		    dateFormat="{value}"
		    hourFormat="{value}"
		    minuteFormat="{value}"
		     :start-date="danqiandata"
		    v-model="submit_form.h_dqtime"
		      @confirm="handleChange1">
		  </mt-datetime-picker>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default {
		name:'Online_renting',
		data(){
			return {
				show:false,
				submit_form:{
					h_fangyangid:'',
					h_userid:'',
					h_louceng:1,
					h_fanghao:'',
					h_name:'',
					h_tel:'',
					h_rztime:'',
					h_dqtime:'',
					h_remarks:''
				},
				info:{},
				time_value1:'',
				time_value2:'',
				year:'',
				months:'',
				danqiandata:''
			}
		},
		created(){
			this.get_detail(this.$route.query.id)
			this.submit_form.h_fangyangid = this.$route.query.id
			this.danqiandata = new Date()
			var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
			if(userInfo){
				this.submit_form.h_userid = userInfo.user_id
			}else{
				this.$router.push('login')
			}
		},
		methods:{
			jisuanshijiancha(){
				let val = this.time_value2 - this.time_value1;
				if(val<0 && this.time_value2 != ''){
					  this.$Toast({
		   				 message: '到期时间不能比入住时间小',
						  position: 'middle',
						  duration: 1500
		   			});
					return false
				}
				// console.log(Math.floor(hours / (24 * 30 * 12)))
				var hours = val/1000/60/60;
				var year = Math.floor(hours / (24 * 30 * 12));
				hours = hours % (24 * 30 * 12);
				var months = Math.floor(hours / (24 * 30 ));
				this.year = year;
				this.months = months;
				console.log(year+ '年'+ months+'月');
			},
			openPicker1 () {
			     this.$refs.picker2.open()
			},
			handleChange1(value) {
				this.time_value2 = value;
		        this.submit_form.h_dqtime = this.formatDate(value);
		        this.jisuanshijiancha()
		        
		    },
			openPicker () {
			     this.$refs.picker1.open()
			},
			handleChange(value) {

				this.time_value1 = value;
		        this.submit_form.h_rztime = this.formatDate(value);
		        // console.log(this.submit_form.h_rztime); // 20170101
		        this.jisuanshijiancha()
		        
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
		        return year +'-' + this.formatTen(month) +'-' + this.formatTen(day);
		    },
			show_model(){
				this.show = true;
			},
			add(){
				this.submit_form.h_louceng = parseInt(this.submit_form.h_louceng)+1;
			},
			mini(){
				if(this.submit_form.h_louceng>1){
					this.submit_form.h_louceng = parseInt(this.submit_form.h_louceng)-1;
				}
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
					// this.submit_form.r_fangyangid = res.data.id
					// this.submit_form.r_louceng = res.data.floor_in
					this.info = res.data;

				})
			},
			zufang(){
				
				this.submit_form.h_yajin = this.info.yajin;
				this.submit_form.h_feiyong = this.info.feiyong;
				this.submit_form. h_qixian = this.year+'年'+this.months+'月';
				console.log(this.submit_form)
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=zhufanglisting',
					method:'post',
					params:this.submit_form
				})
				.then((res)=>{
					console.log(res)
					// this.submit_form.r_fangyangid = res.data.id
					// this.submit_form.r_louceng = res.data.floor_in
					// this.info = res.data;
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
					if(res.data.success == 1){
						// this.$messagebox('提示', res.data.msg);
						setTimeout(() => {
						  this.$router.push('Renting')
						}, 1500);
						// this.$messagebox.alert(res.data.msg).then(action => {
						//  	this.$router.push('Renting')
						// });
						
					}

				})
			}

		}
	}
</script>
<style lang="scss" scoped>
	@import './Online_renting.scss'
</style>