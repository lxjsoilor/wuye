<template>
	<div  class="all">
		<header-item message="房源详情"></header-item>
			<div id="middle">
				<!---->
			<div class="banner">
				
				 <mt-swipe :auto="3000">
				  <mt-swipe-item v-for="(item,index) in info.gallery"><img :src="item"/></mt-swipe-item>
				</mt-swipe> 
			</div>
			<div class="house_info">
				¥{{info.rental}}/月
				<span class="time">发布时间：{{info.create_time}}</span>
			</div>
			<div class="name">{{info.name}}</div>
			<div class="attr">
				<ul>
					<li>{{info.acreage}}m²</li>
					<li>{{info.house_type}}</li>
					<li>{{info.floor_in}}/{{info.floor}}层</li>
					<li>{{info.pay_type}}  </li>
				</ul>
			</div>
			<div class="position"><img src="static/img/position.png"/>{{info.address}}</div>
			
			<div class="common_title">房源介绍</div>
			<div class="house_text">
				{{info.com}}
			</div>
			<div class="common_title">配套设施</div>
			<div class="supporting ">
				<ul>
					<li>{{info.matching}}</li>
					
				</ul>
			</div>
			<!-- <div class="common_title">交通</div>
			<div class="traffic">
				{{info.com}}
				<div class="map">
					<img src="static/img/map.png"/>
				</div>
			</div> -->
			<div class="common_title">图片展示</div>
			<div class="house_img">
				<img :src="item"  v-for="(item,index) in info.gallery" />
			</div>
		</div>
		<div class="btn_list">
			<button type="button" @click="call">联系房东</button>
			<button type="button" @click="go_yuyue(info.id)">预约看房</button>
			<button type="button" @click="go_zufang(info.id)">在线租房</button>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'house_detail',
		data(){
			return {
				info:{}
			}
		},
		created(){
			this.get_detail(this.$route.query.id)
		},
		methods:{
			call() {
			    window.location.href = `tel:${this.info.moblie}`
			  },
			go_yuyue(id){
				this.$router.push({name:'Bespeak',query:{id:id}})
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
					this.info = res.data
				})
			},
			go_zufang(id){
				this.$router.push({name:'Online_renting',query:{id:id}})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './house_detail.scss'
</style>