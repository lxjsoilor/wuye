<template>
	<div class="all">
		<header-item message="我的订单"></header-item>
		<div id="middle">
			
			
			<div class="tab_list">
				<ul>
					<li :class="tab_num==0?'on':''" @click="change_tab(0)">全部</li>
					<li :class="tab_num==2?'on':''" @click="change_tab(2)">待发货</li>
					<li :class="tab_num==3?'on':''" @click="change_tab(3)">待收货</li>
					<li :class="tab_num==4?'on':''" @click="change_tab(4)">已完成</li>
				</ul>
			</div>
			
			<ul class="order_list">
				<li v-for="(item,index) in lists">
					<div class="order_header">订单编号：{{item.order_sn}} <span>{{item.biaoti}}</span></div>
					<div class="product_list" @click="go_detail(item.order_id)">
						<div class="product" v-for="(items,indexs) in item.goods_list">
							<p class="name">{{items.goods_name}}</p>
							<p class="num">x{{items.goods_num}}</p>
							<p class="price">¥{{items.goods_price}}</p>
						</div>
					
						<div class="total_price">共{{item.zgoods_number}}件商品 合计：¥{{item.total_fee}}</div>
					</div>
					<div class="btn">
						<button type="button" @click="cenel(item.order_id)" v-if="item.zhuangtai == 1">取消发货</button>
						<button type="button" @click="queren(item.order_id)" v-if="item.zhuangtai == 3">确认收货</button>

					</div>
				</li>
				
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'MyOrder',
		data(){
			return {
				lists:[],
				tab_num:0
			}
		},
		created(){
			this.get_list(0)	
		},
		methods:{
			change_tab(index){
				this.tab_num = index;
				this.get_list(index)
			},
			get_list(id){
				console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/ziyu.php?Action=order_list',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						 type:id
					}
				})
				.then((res)=>{
					this.lists = res.data
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
                        this.get_list(this.tab_num)	
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
			go_detail(id){
				this.$router.push({name:'order_detail',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './my_order.scss'
</style>