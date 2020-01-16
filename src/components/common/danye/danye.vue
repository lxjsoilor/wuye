<template>
	<div  class="all">
		<header-item :message="title"></header-item>
		<div id="middle">
			<div class="comtent"><div v-html="content"></div></div>
		</div>
	
		<footer-view></footer-view>
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'my_house_detail',
		data(){
			return {
				info:{},
				id:'',
				title:'单页内容',
				content:''
			}
		},
		created(){
			this.get_info(this.$route.query.id)
			if(this.$route.query.title){
				this.title = this.$route.query.title
			}
			if(this.$route.query.id){
				this.id = this.$route.query.id
			}
		},
		methods:{
			get_info(id){
				this.$axios({
					url:'http://wy.gzziyu.com/ziyu.php?Action=article',
					method:'post',
					params:{
						id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.content = res.data.content
					this.title = res.data.title

				})
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './danye.scss'
</style>