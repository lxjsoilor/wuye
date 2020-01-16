<template>
	<div  class="all">
		<header-item message="订单详情"></header-item>
		<div id="middle">
			<div class="item">
				<div class="car">
					<div class="price"><img src="static/img/order_1.png" align="center" />{{info.biaoti}}</div>
				</div>
			</div>
			<div class="item">
				<div class="item_title">配送信息</div>
				<div class="form">
					<div class="item2">
						<div class="label">收货人姓名：{{info.order.consignee}}</div>
						
					</div>
					<div class="item2">
						<div class="label">手机号码：{{info.order.tel}}</div>
					</div>
					<div class="item2">
						<div class="label">配送地址：{{info.order.address}}</div>
					</div>
					
				</div>
			</div>
			<div class="item">
				<div class="item_title">订单明细</div>
				<div class="product_list">
					<div class="pro_li" v-for="(item,index) in info.goods_list">
						<div class="img"><img :src="item.goods_img"/></div>
						<div class="right">
							<h1>{{item.goods_name}}</h1>
							<p class="attr">
								<span>数量：x{{item.goods_number}}</span>规格：{{item.goods_attr}}
							</p>
							<p class="price">¥{{item.goods_price}}</p>
						</div>
					</div>
				</div>
				<!-- <div class="peisong">配送费 <span>¥3.00</span></div> -->
				<div class="total">共6件商品 合计：¥{{info.order.order_amount}}</div>
				<div class="remask">
					备注：{{info.order.postscript}}
				</div>
			</div>
			<div class="item">
				<div class="item_title">订单信息</div>
				<div class="form1">
					<div class="label1">订单编号：{{info.order.order_sn}}</div>
					<div class="label1">下单时间：{{info.order.formated_add_time}}</div>
					<!-- <div class="label1">平台确认时间：2018.5.23  23:20:51</div> -->
				</div>
			</div>
			<div class="btn_list">
				<button type="button" @click="cenel(info.order.order_id)" v-if="info.zhuangtai == 1">取消订单</button>
				<button type="button" @click="queren(info.order.order_id)" v-if="info.zhuangtai == 3">确认收货</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'order_detail',
		data(){
			return {
				info:{}
			}
		},
		created(){
			this.get_info(this.$route.query.id)	
		},
		methods:{
			
			get_info(id){
				console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/ziyu.php?Action=order_detail',
					method:'post',
					params:{
						order_id:id
					}
				})
				.then((res)=>{
					this.info = res.data
					console.log(res)
				})
			},
			// 取消发货
			cenel:function (id) {
                  this.$axios({
                        url:'http://wy.gzziyu.com/ny_flow_cart.php?action=cancel_order',
                        method:'post',
                        params:{
                            user_id:userInfo.user_id,
                             order_id:id
                        }
                    }) 
                    .then((res)=>{
                        console.log(res)
                        // alert('取消成功')
                        this.$Toast({
			   				 message: '取消成功',
							  position: 'middle',
							  duration: 1000
			   			});
                        this.get_info(this.$route.query.id)	
                    })
            },
            queren(id){
                  this.$axios({
                        url:'http://wy.gzziyu.com/ziyu.php?Action=querenshouhuo',
                        method:'post',
                        params:{
                            user_id:userInfo.user_id,
                            orderid:id
                        }
                    }) 
                    .then((res)=>{
                        console.log(res)
                         this.$Toast({
			   				 message: '确认收货成功',
							  position: 'middle',
							  duration: 1000
			   			});
                        this.get_list(this.tab_num)	
                    })
            },
			// go_detail(id){
			// 	this.$router.push({name:'Renting_detail',query:{id:id}})
			// }
		}
	}
</script>
<style lang="scss" scoped>
	@import './order_detail.scss'
</style>