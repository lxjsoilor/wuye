<template>
	<div  class="all">
		<header-item message="提交订单"></header-item>
		<div id="middle">
			<div class="item">
				<div class="car" @click="go_address" v-if="!adresState">
					选择收货地址>
				</div>
				<div class="cart_detail" v-if="adresState">
					<p class="name"><span>收货人：{{address.consignee}}</span>电话：{{address.tel}}</p>
					<p class="address">详细地址：{{address.address}}</p>
				</div>
				
			</div>
			
			<div class="item">
				<div class="item_title">订单明细</div>
				<div class="product_list">
					<div class="pro_li" v-for="(item,index) in product">
						<div class="img"><img :src="item.goods_thumb"/></div>
						<div class="right">
							<h1>{{item.goods_name}}</h1>
							<p class="attr">
								<span>数量：x{{item.goods_number}}</span>
								规格：{{item.goods_attr}}
							</p>
							<p class="price">$ {{item.subtotal}}</p>
						</div>
					</div>
				</div>
				<!-- <div class="peisong">配送费 <span>$ 3.00</span></div> -->
				<div @click="handlerReload" class="total">共{{allInfo.total_number}}件商品 合计：$ {{allInfo.goods_price}}</div>
				<div class="remask">
					<span>备注：</span>
					<textarea name="" rows="" cols="" v-model="customer_msg" placeholder="请输入备注信息"></textarea>
				</div>
			</div>
			
			
		</div>
		
		<div class="btn_list">
			<div class="all_total"><span>$ {{allInfo.goods_price}}</span></div>
			<button type="button" class="buy" @click="suss">提交订单</button>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
	export default{
		name:'submit_order',
		data(){
			return {
				product:[],
				count:0,
				allInfo: {},
				adresState: true,
				address:[],
				customer_msg:'',
				sp_list:[],
				sp_id:''
			}
		},
		created(){
			userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
			this.get_pro()
			this.get_address()
			// this.get_sp()	
		},
		methods:{
			handlerReload() {
				window.location.reload();
			},
			// 获取支付方式
			// get_sp(){
   //              var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
   //              this.$axios({
   //                  method: 'post',
   //                  url:'http://wy.gzziyu.com/ny_flow_cart.php?action=get_shipping',
   //                  params:{
   //                      user_id: userInfo.user_id
   //                  }
   //              }).then((res)=>{
   //                  console.log(res);
   //                  this.sp_list = res.data
   //                  this.sp_id = res.data[0].shipping_id

   //              }).catch((err) =>{
   //                  console.log(err);
   //                });
   //          },
			// 提交订单
			suss(){
				// this.$axios({  
				// 	method: 'post',
				// 	url:'/api/wechat/apppay.php?act=tenantPay&order_id=12',
				// 	params:{
				// 		// act: 'tenantPay',
				// 		// order_id: res.data.order_id,
				// 		// shipping_id: this.sp_id
				// 	}
				// }).then(result => {
				// 	console.log(result,110011001)
				// 	plus.payment.getChannels(channels => {
				// 		console.log({channels})
				// 		let params = { 
				// 			appid: result.data.appid,
				// 			noncestr: result.data.nonce_str,
				// 			package: result.data.package,
				// 			partnerid: result.data.mch_id,
				// 			prepayid: result.data.prepayId,
				// 			timestamp: result.data.timestamp,
				// 			sign: result.data.sign,
				// 		};
				// 		console.log(params);
				// 		// plus.payment.request(channels[0], '{"appid":"wx0411fa6a39d61297","noncestr":"MCotF5f6ZRzy5NDg","package":"Sign=WXPay","partnerid":"1230636401","prepayid":"wx12104925033025aab3016ff31286628900","timestamp":1578797365,"sign":"261B0D2A17E78B8D97D1A265660DE593"}', (result) => {
				// 		plus.payment.request(channels[0], JSON.stringify(params), (result) => {
				// 			console.log(result)
				// 		}, err => {
				// 			console.log({err})
				// 		})
				// 	})
				// })
				// return;
             
                this.$axios({
                    method: 'post',
                    url:'http://wy.gzziyu.com/ny_flow_pay.php?action=pre_wxpay2',
                    params:{
                        user_id: userInfo.user_id,
                        postscript: this.customer_msg,
                        // shipping_id: this.sp_id
                    }
                }).then((res)=>{
                    console.log(res);

                    if(res.data){
						// that.$router.push({name:'submit_order_success',query:{order_num:res.data.order_sn,order_price:res.data.order_amount,address:res.data.address,consignee:res.data.consignee,tel:res.data.tel,pay_online:res.data.pay_online}})
						let _this = this;
						this.$axios({
							method: 'post',
							url:'/api/wechat/apppay.php',
							params:{
								act: 'goodsPay',
								order_id: res.data.order_id,
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
			                        _this.$router.push({name:'order_detail',query:{id:res.data.order_id}})
								}, err => {
									console.log({err})
								})
							})
						})
                    }
                    
                }).catch((err) =>{
                    console.log(err);

                  });

            },
            // 去选择地址
			go_address(){
				this.$router.push({name:'Address',query:{status:true}})
			},
			// 获取默认地址
			 get_address() {
			    let that = this
			    this.$axios({
			      url: 'http://wy.gzziyu.com/ny_flow_cart.php?action=get_consignee', //产品
			      method:"post",
			      params:{
			        user_id: userInfo.user_id
			      },
			    })
			    .then( (res)=> {
			        console.log(res)
			        
			        let adresState = this.adresState;

			        if (res.data.address_ok == 0) {
			            this.adresState = false
			        } else {
			            this.address = res.data
			        }
			      })
			  },
			get_pro(){
				this.$axios({
			      url: 'http://wy.gzziyu.com/ny_flow_cart.php?action=get_checkout_info', //产品
			      method:"post",
			      params: {
			        user_id: userInfo.user_id
			      },
			      
			    })
			    .then((res)=>{ 
				        let arr = []
				        let count = 0;
				        console.log(res)

				        for (var key in res.data.goods_list) {
				          arr.push(res.data.goods_list[key])
				        }

				        // that.setData({
				          this.allInfo = res.data.total || {}
				        // })

				        arr = JSON.parse(JSON.stringify(arr))
				        arr.pop()

				        arr.map((item) => {
				          count += parseInt(item.goods_number)
				        })

				        console.log(arr)
				        this.product = arr
				        this.count = count
				       
			    })
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './submit_order.scss'
</style>