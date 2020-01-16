<template>
	<div  class="all">
		<header-item message="财务管理"></header-item>
		<div id="middle">
			<div class="bill_header">
				<select name="" v-model="submit_data.b_year" @change="get_list">
					<option :value="item.num" v-for="(item,index) in years">{{item.name}}</option>
				</select>
				<select v-model="submit_data.b_month" @change="get_list">
					<option :value="item.num" v-for="(item,index) in mouths">{{item.name}}</option>
				</select>
				<!-- <select @change="submit" style="margin: 0.17rem 0.1rem; width: 2rem;" >
					<option :value="item.r_id" v-for="(item,index) in house_list">{{item.name}}</option>
				</select> -->
			</div>
			<div class="tab_list">
				<div class="tab" :class="tab_num == 1?'tab_active':''" @click="change_tab(1)">
					<div class="border">
						<p class="name">收入</p>
						<div class="price">{{shouru.b_yshouru}}<span>({{shouru.bishu}}笔)</span></div>
					</div>
				</div>
				<div class="tab" :class="tab_num == 2?'tab_active':''"  @click="change_tab(2)">
					<p class="name">支出</p>
					<div class="price">{{zhichu.b_yshouru}}<span>({{zhichu.bishu}}笔)</span></div>
				</div>
			</div>
			<div class="div_tab div_active">
				<ul class="one">
					<li v-for="(item,index) in info2" v-if="info2.length>0">
						<div class="order_header">{{item.b_xiaoqu}} <span>租客：{{item.h_name}}</span></div>
						<div class="product_list">
							<div class="p" v-for="(items,indexs) in item.neirong">
								<span>{{items.o_project}}</span>
								<b>{{items.o_amount}}</b>
								<p>租金计算日：{{items.o_addtime}}</p>
							</div>
						
							
						</div>
						<div class="total_price"><span>{{item.h_rztime}}</span>合计：{{item.heji}}</div>
					</li>
					<li v-for="(item,index) in info1" v-if="info1.length>0">
						<div class="order_header">{{item.b_xiaoqu}} <span>租客：{{item.h_name}}</span></div>
						<div class="product_list">
							<div class="p">
								<span>租金</span>
								<b>{{item.h_zujin}}</b>
								<p>租金计算日：{{item.h_rztime}}</p>
							</div>
						
							
						</div>
						<div class="total_price"><span>{{item.h_rztime}}</span>合计：{{item.heji}}</div>
					</li>
					
					
					
				</ul>
			</div>
			<!-- <div class="div_tab ">
				<ul class="two">
					<li>
						<div class="order_header">珠江新城B栋3楼308 <span>租客：王依依</span></div>
						<div class="product_list">
							<p>
								<span>管理费</span>
								<b>220.00</b>
							</p>
							<p>
								<span>维修费</span>
								<b>50.00</b>
							</p>
							<p>
								<span>大楼清洁费</span>
								<b>230.00</b>
							</p>
							
						</div>
						<div class="total_price"><span>2018-10-12  20:20</span>合计：300.00</div>
					</li>
					
					
					<li>
						<div class="order_header">珠江新城B栋3楼308 <span>租客：王依依</span></div>
						<div class="product_list">
							<p>
								<span>管理费</span>
								<b>220.00</b>
							</p>
							<p>
								<span>维修费</span>
								<b>50.00</b>
							</p>
							<p>
								<span>大楼清洁费</span>
								<b>230.00</b>
							</p>
							
						</div>
						<div class="total_price"><span>2018-10-12  20:20</span>合计：300.00</div>
					</li>
					<li>
						<div class="order_header">珠江新城B栋3楼308 <span>租客：王依依</span></div>
						<div class="product_list">
							<p>
								<span>管理费</span>
								<b>220.00</b>
							</p>
							<p>
								<span>维修费</span>
								<b>50.00</b>
							</p>
							<p>
								<span>大楼清洁费</span>
								<b>230.00</b>
							</p>
							
						</div>
						<div class="total_price"><span>2018-10-12  20:20</span>合计：300.00</div>
					</li>
				</ul>
			</div> -->
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'T_bill',
		data(){
			return {
				info1:[],
				info2:[],
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
				submit_data:{
					b_year:'',
					b_month:1,
					user_id:userInfo.user_id,
					status:1,
				},
				years:[],
				shouru:{},
				zhichu:{},
				tab_num:1

			}
		},
		created(){
			this.get_list(1)
			this.get_years()
			this.get_huizong()
		},
		methods:{
			change_tab(index){
				this.tab_num = index
				this.info1 = []
				this.info2 = []
				this.get_list(index)

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
		        // console.log(json)
		        this.years = json;
		        this.submit_data.b_year = currentYear
			},
			get_huizong(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=yezhusrzc',
					method:'post',
					params:{
						b_year:this.submit_data.b_year,
						b_month:this.submit_data.b_month,
						user_id:userInfo.user_id,
						status:1,
					}
				})
				.then((res)=>{
					// this.huizong = res.data
					console.log(res)
					this.shouru = res.data
				})
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=yezhusrzc',
					method:'post',
					params:{
						b_year:this.submit_data.b_year,
						b_month:this.submit_data.b_month,
						user_id:userInfo.user_id,
						status:2,
					}
				})
				.then((res)=>{
					this.zhichu = res.data
					console.log(res)
				})

			},
			get_list(index){
				// console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=yezhuzhangdan',
					method:'post',
					params:{
						b_year:this.submit_data.b_year,
						b_month:this.submit_data.b_month,
						user_id:userInfo.user_id,
						status:index,
					}
				})
				.then((res)=>{
					// this.lists = res.data[0].neirong;
					if(index == 1){
						this.info1 = res.data
					}else if(index == 2){
						this.info2 = res.data
					}
					
					console.log(res)
				})
			},
			go_detail(id){
				this.$router.push({name:'my_house_detail',query:{id:id}})
			}
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './T_bill.scss'
</style>