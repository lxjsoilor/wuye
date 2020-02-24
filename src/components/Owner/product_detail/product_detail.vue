<template>
	<div  class="all">
		<header-item message="商城"></header-item>
		<div id="middle">
			<div class="banner">
				<mt-swipe :auto="3000" @change="handleChange">
				  <mt-swipe-item v-for="(item,index) in info.gallery"><img :src="item"/></mt-swipe-item>
				</mt-swipe> 
				<div class="current">{{banner_index}}/{{info.gallery.length}}</div>
			</div>
			<div class="pro_info">
				<p class="price">$ {{info.shop_price}}</p>
				<p class="name">{{info.goods_name}}</p>
			</div>
			<div class="pro_attr">
				<div class="attr" v-for="(item,index) in attr">
					<div class="label">
						{{item.name}}
					</div>
					<div class="attr_list">
						<ul>
							<li v-for="(items,indexs) in item.values" :class="items.checked==1?'checked':''" @click="change_attr(index,indexs)">{{items.label}}</li>
						</ul>
					</div>
				</div>
				
				<div class="attr">
					<div class="label">数量</div>
					<div class="attr_list">
						<div class="mui-numbox" >
						  <button type="button" @click="minu">-</button>
						  <input class="input" type="text" value="1" v-model="number" style="float: left;" />
						  <button type="button" @click="add">+</button>
						</div>
					</div>
				</div>
				
			</div>
			<div class="item">
				<div class="item_title">产品详情</div>
				<div class="detail" v-html="info.goods_desc" ></div>
			</div>
				
		</div>
		
		<div class="btn_list">
			<button class="add_cart" type="button" @click="add_cart">加入购物车</button>
			<button class="buy" type="button" @click="buy">立即购买</button>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'product_detail',
		data(){
			return {
				info:{},
				number:1,
				attr:[]	,
				banner_index:1,
				buy_bool:false
			}
		},
		created(){
			userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
			this.get_detail(this.$route.query.id)
			this.get_cat(this.$route.query.id)
			this.get_bool()
		},
		methods:{
			get_bool(){
				let userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				if(userInfo){
					this.$axios({
						url:'http://wy.gzziyu.com/ziyu.php?Action=zhufang',
						method:'post',
						params:{
							user_id:userInfo.user_id
						}
					})
					.then((res)=>{
						console.log(res)
						if(res.data.count >0){
							this.buy_bool = true;
						}
					})
				}
			},
			handleChange(index) {
			    // console.log(index)
			    this.banner_index = index+1
			  },
			jisuan_price: function () {
		    var attr = this.attr;
		    var shop_price = Number(this.info.shop_price) ? Number(this.info.shop_price):0;
		    var price = 0;

		    for (var item1 in attr) {
		      for (var item2 in attr[item1].values) {
		        
		        if (attr[item1].values[item2].checked == '1') {
		          
		          price = price + Number(attr[item1].values[item2].format_price)
		          console.log('价格:' + attr[item1].values[item2].format_price)
		          console.log(price)

		        }
		      }
		    }
		    // console.log(price, good_price)
		    var allprice = price + shop_price;
		    console.log(allprice)
		    this.info.shop_price = allprice
		    // this.setData({
		    //   this_price: price + good_price
		    // })
		  },
		  buy(){
		  	if(!this.buy_bool){
		  		this.$Toast('您没有在租的房子，无法进行购物')
		  		return false
		  	}
		  	this.add_cart(1)
		  	this.$router.push({name:'Cart'})
		  },
		  add_cart(index){
		  	if(!this.buy_bool){
		  		this.$Toast('您没有在租的房子，无法进行购物')
		  		return false 
		  	}
		  	let list = [];
		  	var attr = this.attr;
		    for(var item1 in attr){
		      for(var item2 in attr[item1].values){
		        if (attr[item1].values[item2].checked == '1'){
		          console.log(attr[item1].name+':'+ attr[item1].values[item2].id)
		          list.push(attr[item1].values[item2].id)
		        }
		      }
		    }
		   
		    list = list.join(',');
		    console.log(list)
		    let obj = {
		      user_id:userInfo.user_id ,
		      goods_id: this.info.goods_id,
		      goods_number: this.number,
		      spec_list: list
		    }
		    console.log(obj)
		  	this.$axios({
		  		url:'http://wy.gzziyu.com/ny_flow_cart.php?action=add_to_cart',
		  		method:'post',
		  		params:obj

		  	})
		  	.then((res)=>{
		  		console.log(res)
		  		if(res.data.errcode == 0){
		  			if(index == 1){

		  			}else{
		  				this.$Toast({
			   				 message: '添加购物车成功',
							  position: 'middle',
							  duration: 1500
			   			});
		  			}
		  		}
		  	})
		  },

		  change_attr(allindex,oneindex){
		    
		    for (var index in this.attr[allindex].values) {
		      this.attr[allindex].values[index].checked = '0';
		    }
		    this.attr[allindex].values[oneindex].checked = '1';
		    


		    this.jisuan_price();
		  },
			get_detail(id){
				// console.log(id,userInfo.user_id)

				this.$axios({
					url:'http://wy.gzziyu.com/ny_flow_goods.php?action=detail',
					method:'post',
					params:{
						goods_id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			},
			get_cat(id){
				this.$axios({
					url:'http://wy.gzziyu.com/ny_flow_goods.php?action=properties',
					method:'post',
					params:{
						goods_id:id
					}
				})
				.then((res)=>{
					console.log(res)
					for(let i in res.data.spe){
						res.data.spe[i].values.map((item,index)=>{
							// console.log(index)
							if(index == 0){
								item.checked = 1
							}else{
								item.checked = 0
							}
							
						})

					}
					
					this.attr = res.data.spe
					this.jisuan_price()
				})
			},
			minu(){
				this.number = this.number>1?--this.number:this.number;
			},
			add(){
				this.number = this.number+=1;
			}
		}
	}
</script>
<style lang="scss">
	@import './product_detail.scss'
</style>