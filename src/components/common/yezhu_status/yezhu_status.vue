<template>
	<div  class="all">
		<header-item :message="title"></header-item>
		<div id="middle">
			<div class="comtent">
				{{info.user_rank == 97?'业主资质审核中':''}}
				{{info.user_rank == 100?'业主资质审核失败':''}}
				<p v-if="info.user_rank == 100">审核备注：{{info.user_rank == 100?this.com:''}}</p>
			</div>
			<button type="button" @click="go_reg" v-if="info.user_rank == 100">重新提交资料</button>
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
				title:'业主审核',
				content:'',
				com:''
			}
		},
		created(){
			this.get_user()
			
		},
		methods:{
			get_com(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=owner_update',
					method:'get',
					params:{
						user_id:userInfo.user_id
					}

				})
				.then((res)=>{
					console.log(res.data.data[0])
					this.com = res.data.data[0].com;
					// this.info = res.data
				})
			},
			get_user(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=huiyuanxixin',
					method:'post',
					params:{
						user_id:userInfo.user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
					if(this.info.user_rank == 100){
						this.get_com()
					}
				})
			},
			go_reg(){
				this.$router.push({name:'T_reg',query:{status:true}})
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './yezhu_status.scss'
</style>