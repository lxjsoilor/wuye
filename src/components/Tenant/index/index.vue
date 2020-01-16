<template>
	<div style="height: 100%;overflow: auto;">
		 <!-- <header-item message="申请维修" backUrl="/"></header-item> -->
		<div id="header">
			<div class="logo"><a href="###"><img src="static/img/logo1.png"/>物业管理</a></div>
		</div>
		<div id="middle">
			<div class="banner">
			 	<mt-swipe :auto="3000">
				  <mt-swipe-item v-for="(item,index) in lunbo"><img :src="item.ad_code"/></mt-swipe-item>
				 
				</mt-swipe> 
				
			</div>
			<div class="tip"><span>通知：</span> <div class="swiper_list">
				<swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
				    <swiper-slide v-for="(item,index) in lists"><router-link :to="'/danye?id='+item.id">{{item.title}}</router-link></swiper-slide>
				</swiper>
			</div></div>
			<div class="link_list">
				<ul>
					<li><router-link to="/my_bill"><img src="static/img/fangzu.png"/>交房租</router-link></li>
					<!-- <li><router-link to="/MyRepair"><img src="static/img/index_weixiu.png"/>申请维修</router-link></li> -->
					<li><router-link to="/submit_suggest"><img src="static/img/index_jianyi.png"/>投诉建议</router-link></li>
					<li><router-link to="/danye?id=59"><img src="static/img/index_lianxi.png"/>联系物业</router-link></li>
					<li><router-link to="/shop"><img src="static/img/index_shop.png"/>在线商城</router-link></li>
					<li><router-link to="/house_list"><img src="static/img/index_zu.png"/>房屋租赁</router-link></li>
				</ul>
			</div>
			
			
		</div>
		<footer-view></footer-view>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name:"index",
		data(){
			return {
				swiperOption: {
		          direction: 'vertical',
		         autoplay:true,
             		loop : true,
		          slidesPerview:'auto'
		         
		        },
		        lists:[],
		        lunbo:[]
			}
		},
		 components: {  
            swiper,  
            swiperSlide  
        },  
		watch: {
	        '$route'(to) {
	            // this.get_list()
	            console.log(to)
	            // if(to.path == '/cart'){
	            // 	this.gengxin()
	            // 	this.changeData()
	            // }
	        }
	    },
		created(){
			this.get_list()
			this.get_lunbo()
		},
		methods:{
			get_list(){
				this.$axios({
					url:'http://wy.gzziyu.com/ziyu.php?Action=article_cat',
					method:'post',
					params:{
						id:16,
						shuzi:100
					}

				})
				.then((res)=>{
					console.log(res)
					this.lists = res.data
					this.swiperOption = {
				          direction: 'vertical',
				         autoplay:true,
		             		loop : true
				         
				        }
				})
			},
			callback(){
				
			},
			get_lunbo(){
				this.$axios({
					url:'http://wy.gzziyu.com/ziyu.php?Action=touch_ad',
					method:'post',
					params:{
						id:16,
						shuzi:100
					}

				})
				.then((res)=>{
					console.log(res)
					this.lunbo = res.data
					
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './index.scss'
</style>