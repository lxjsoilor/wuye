<template>
	<div  class="all">
		<header-item message="我的账单"></header-item>
		<div id="middle">
			<div class="bill_header">
				<select name="" v-model="submit_data.b_year" @change="submit">
					<option :value="item.num" v-for="(item,index) in years">{{item.name}}</option>
				</select>
				<select v-model="submit_data.b_month" @change="submit">
					<option :value="item.num" v-for="(item,index) in mouths">{{item.name}}</option>
				</select>
				<select @change="submit" v-model="submit_data.b_fangyangid" style="margin: 0.17rem 0.1rem; width: 2rem;" >
					<option :value="item.r_id" v-for="(item,index) in house_list">{{item.name}}</option>
				</select>
			</div>
			<div class="car">
				<div class="price">本月待还：¥<span>{{info.total}}</span></div>
				<div class="time">最后交费时间：{{info.b_zjftime}}</div>
			</div>
			<div class="bill_title">本月账单明细如下：</div>
			<ul>
				<li v-for="(item,index) in info.zytenant" @click="go_detail(item.y_types,item.y_linkid)">
					<div class="li_title">{{item.y_project}}</div>
					<div class="li_content">{{item.y_mingchen1}}</div>
					<div class="price">￥{{item.y_price}}<span>></span></div>
				</li>
				
			</ul>
			<div class="total_price">合计：￥{{info.total}}</div>
			<div class="btn_list">
				<!-- <button type="button" v-if="info.b_zstatus == 2 || info.b_zstatus == 3">立即交费</button> -->
				<button type="button" v-show="info.b_id || info.b_zstatus == 2" @click="handlerPay">立即交费</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
	export default{
		name:'my_bill',
		data(){
			return {
				mouths:[
					{name:'1月',num:1},
					{name:'2月',num:2},
					{name:'3月',num:3},
					{name:'4月',num:4},
					{name:'5月',num:5},
					{name:'6月',num:6},
					{name:'7月',num:7},
					{name:'8月',num:8},
					{name:'9月',num:9},
					{name:'10月',num:10},
					{name:'11月',num:11},
					{name:'12月',num:12}

				],

				years:[],
				submit_data:{
					user_id:userInfo.user_id,
					b_month:1,
					b_year:'',
					b_fangyangid:1
				},
				house_list:[],
				info:{},
				house_name:''
			}
		},
		created(){
			userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
			this.submit_data = {
				user_id:userInfo.user_id,
				b_month:1,
				b_year:'',
				b_fangyangid:1
			}
			this.get_house()
			this.get_years()
			this.submit()
		},
		methods:{
			handlerPay() {
				let _this = this;
				this.$axios({
					method: 'post',
					url:'/api/wechat/apppay.php',
					params:{
						act: 'tenantPay',
						order_id: this.info.b_id,
					}
				}).then(result => {
					console.log(result);
					plus.payment.getChannels(channels => {
						console.log({channels})
						let params = { 
							appid: result.data.appid,
							noncestr: result.data.noncestr,
							package: result.data.package,
							partnerid: result.data.partnerid,
							prepayid: result.data.prepayid,
							timestamp: result.data.timestamp,
							sign: result.data.sign
						};
						plus.payment.request(channels[0], JSON.stringify(params), (result) => {
							_this.submit()
						}, err => {
							console.log({err})
						})
					})
				})
			},
			submit(){
				this.house_list.map((item)=>{
					if(this.submit_data.b_fangyangid == item.r_id){
							this.house_name = item.name
					}
				})
				// this.submit_data.b_fangyangid = 11;
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=zukezhangdan',
					method:'post',
					params: this.submit_data

				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			},
			go_detail(type,id){
				console.log(type,id)
				switch(type)
				{
				case '0':
				  this.$router.push({name:'my_bill_detail',query:{id:id}})
				  break;
				case '3':
				 this.$router.push({name:'my_bill_detail',query:{id:id}})
				  break;
				case '4':
				 this.$router.push({name:'my_bill_detail',query:{id:id}})
				  break;
				case '1':
				 this.$router.push({name:'order_detail',query:{id:id}})
				  break;
				 case '2':
				 this.$router.push({name:'Repair_detail',query:{id:id}})
				  break;
				}
								// this.$axios({
				// 	url:'http://wy.gzziyu.com/zmember.php?Action=zhangdanmingxi',
				// })
			},
			get_house(){
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=yuyuelist',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					this.house_list = res.data
					console.log(res)
					// this.submit_data.b_fangyangid =res.data[0].r_id
				})
			},
			get_years(){

				var currentYear = new Date().getFullYear();
		        //默认值  
		        var defaultVal = currentYear;
		        // yearObj.html("");
		        var json = [];
		        for (var i = currentYear - 10; i <= currentYear; i++) {
		            json.push({
		                "num" : i,
		                "name" : i + "年"
		            });
		        }
		        console.log(json)
		        this.years = json;
		        this.submit_data.b_year = currentYear
			},
		}
			
	}
</script>
<style lang="scss" scoped>
	@import './my_bill.scss'
</style>