<template>
	<div  class="all">
		<header-item message="购物车"></header-item>
		<div id="middle">
			<ul>
				<li v-for="(item,index) in info.goods_list">
					<div class="checkbox" @click="select(index)"><img :src="item.radio?'static/img/cart_checkbox_active.png':'static/img/cart_checkbox.png'" align="middle"/></div>
					<div class="img"><img :src="'http://wy.gzziyu.com'+item.goods_thumb"/></div>
					<div class="pro_info">
						<p class="name">{{item.goods_name}}</p>
						<p class="attr">规格：{{item.goods_attr}}</p>
						<p  class="price">$ {{item.goods_price}}</p>
					</div>
					<div class="num">
						<div class="mui-numbox" >
						  <button type="button" @click="minu(index,item.rec_id)">-</button>
						  <input class="input" type="text" value="1" v-model="item.goods_number" style="float: left;" />
						  <button type="button" @click="add(index,item.rec_id)">+</button>
						</div>
					</div>
				</li>
			
			</ul>
		</div>
		<div class="btn_list">
			<div class="all_checkbox" @click="selectAll"><img :src="allState?'static/img/cart_checkbox_active.png':'static/img/cart_checkbox.png'" />全选</div>
			<div class="all_total">合计：<span>$ {{allMoney}}</span></div>
			<button class="buy" type="button" @click="clearing">去结算</button>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	// sessionStorage.setItem('userInfos', '242')
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
	export default{
		name:'cart',
		data(){
			return {
				number:1,
				info:{},
				allState:false,
				allMoney:0
			}
		},
		created(){
			this.get_list()
		},
		methods:{
			 calcMoney () {
   
			    let data = this.info.goods_list
			    console.log(data)
			    let num = 0;
			    data.map((item, i) => {
			      if (item.radio) {
			        num += Number(item.goods_price) * Number(item.goods_number)
			      }
			    })
			    this.allMoney = num.toFixed(2)
			  },
			get_list(){
				this.$axios({
					url:'http://wy.gzziyu.com/ny_flow_cart.php?action=get_cart_info',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					 for (var index in res.data.goods_list) {
			            res.data.goods_list[index].radio = false
			          }
					this.info = res.data
					this.gengxin()
				})
			},
			minu(index,id){
				let number = this.info.goods_list[index].goods_number;
				this.info.goods_list[index].goods_number = parseInt(number)>1?parseInt(number)-1:parseInt(number);
				this.calcMoney()
				this.$axios({
					url:"http://wy.gzziyu.com/ny_flow_cart.php?action=update_cart",
					method:'post',
					params:{
						user_id: userInfo.user_id,
				        color_id: id,
				        goods_number: this.info.goods_list[index].goods_number
					}
				})
				.then((res)=>{
						console.log(res)
					})
			},
			add(index,id){
				let number = this.info.goods_list[index].goods_number;
				this.info.goods_list[index].goods_number = parseInt(number)+1;
				this.$axios({
					url:"http://wy.gzziyu.com/ny_flow_cart.php?action=update_cart",
					method:'post',
					params:{
						user_id: userInfo.user_id,
				        color_id: id,
				        goods_number: this.info.goods_list[index].goods_number
					}
				})
				.then((res)=>{
						console.log(res)
					})
				this.calcMoney()
			},
			selectAll () {
			    let data = this.info.goods_list
			    if (!this.allState) {
			      data.map((item, i) => {
			        item.radio = true
			      })
			     this.info.goods_list = data;
			     this.allState=true;
			      // this.setData({
			      //   productData: data,
			      //   allState: true
			      // })
			    } else {
			      data.map((item, i) => {
			        item.radio = false
			      })
			      this.info.goods_list = data;
			     this.allState=false;
			      // this.setData({
			      //   productData: data,
			      //   allState: false
			      // })
			    }
			    this.calcMoney()
			},
			select(idx) {
			    // let idx = e.currentTarget.dataset.index
			    let data = this.info.goods_list

			    this.info.goods_list[idx].radio = !this.info.goods_list[idx].radio
			    // this.setData({
			    //   productData: data
			    // })
			    this.calcMoney()
			    for (var i = 0; i < data.length; i++) {
			      if (!data[i].radio) {
			        // this.setData({
			        //   allState: false
			        // })
			        this.allState = false
			        // this.calcMoney()
			        return
			      } else {
			        // this.setData({
			        //   allState: true
			        // })
			        this.allState = true
			        // this.calcMoney()
			      }
    			}

  			},
  			gengxin(){
  				this.$axios({
					url:'http://wy.gzziyu.com/ny_flow_cart.php?action=gengxinzt',
					method:'post',
					params:{
						user_id: userInfo.user_id,
					}
				})
				.then((res)=>{
					console.log(res)
					console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
				})
  			},
  			clearing: function () {
			    const productData = this.info.goods_list
			    console.log(productData)

			    let sendData = JSON.parse(JSON.stringify(productData))

			    
			    sendData.map((item, i) => {
			      item.user_id = userInfo.user_id
			    })

			    sendData = sendData.filter((item, i) => {
			      return item.radio
			    })
			   
			    
			    if (!sendData.length) {
			     this.$messagebox.alert('请选择商品').then(action => {
						 	
						});
			      return

			    }
			    console.log(sendData)
			    console.log(JSON.stringify(sendData))
			    let obj = {
			      user_id: userInfo.user_id,
			      goods_id: sendData.goods_id,
			      goods_name: sendData.goods_name,
			      goods_info: sendData.goods_attr
			    }
			   this.$axios({
			      url:'http://wy.gzziyu.com/ny_flow_cart.php?action=checkout_cart',
			      method: 'POST',
			      params: {
			        name: JSON.stringify(sendData)
			      }
			    })
			   .then((res)=>{
			   	console.log(res)
			   	if(res.data.errcode == 0){
			   		this.$router.push('submit_order')
			   	}
			   })

			  },
		}
	}
</script>
<style lang="scss" scoped>
	@import './cart.scss'
</style>