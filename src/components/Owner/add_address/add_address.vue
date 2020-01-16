<template>
	<div class="all">
		<header-item message="收货地址"></header-item>
		<div id="middle">
			<div class="form">
				<div class="item">
					<div class="label">姓名：</div>
					<div class="input">
						<input type="text" v-model="data.name" placeholder="请输入租客姓名"/>
					</div>
				</div>
				<div class="item">
					<div class="label">电话：</div>
					<div class="input">
						<input type="text" v-model="data.phone" placeholder="请输入联系电话"/>
					</div>
				</div>
				
				<div class="item">
					<div class="label">地址：</div>
					<div class="input">
						<textarea type="text" v-model="data.details" placeholder="请输入地址" /></textarea>
					</div>
				</div>
				
			</div>
			<div class="btn_list">
				<button type="button" @click='newAd' v-if="data.address_id == 0">添加</button>
				<button type="button" @click='changeAd'  v-if="data.address_id != 0">修改</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'Add_address',
		data(){
			return {
				data:{
					address_id:0,
					name:'',
					phone:'',
					details:''

				}
				
			}
		},
		created(){
			// this.get_pro()
			this.get_address(this.$route.query.id)
			this.data.address_id = this.$route.query.id
		},
		methods:{
			 get_address(id) {
			    this.$axios({
			      url: 'http://wy.gzziyu.com/ziyu.php?Action=act_edit_address&flag=display', //地址
			      method:"post",
			      params:{
			        user_id: userInfo.user_id,
			        id: id,
			      },
			    })
			    .then( (res)=> {
			        console.log(res)
			        this.data.name = res.data.consignee
			        this.data.phone = res.data.tel
			        this.data.details = res.data.address

			      })
			  },
			  changeAd(){
			  	let that = this;

			    let reg = /^1[3|4|5|7|8][0-9]{9}$/

			    if (!reg.test(that.data.phone)) {
			    	this.$messagebox.alert('手机号码错误')
			      	return
			    }
			    if (that.data.name == '') {
			    	this.$messagebox.alert('姓名不能为空')
			    
			      return
			    }
			    if (that.data.details == '') {
			    	this.$messagebox.alert('地址详情不能为空')
			     
			      return
			    }
			   console.log(that.data)
			   this.$axios({
			      url:'http://wy.gzziyu.com/ziyu.php?Action=act_edit_address',
			      method:'post',
			      params: {
			        address_id:this.data.address_id,
			        consignee: that.data.name,
			        address: that.data.details,
			        tel: that.data.phone,
			        user_id: userInfo.user_id,

			      }
			    })
			   .then((res)=>{
			   		console.log(res)
			   		if(res.data.success == 1){
			   			this.$Toast({
			   				 message: '修改地址成功',
							  position: 'middle',
							  duration: 1500
			   			});
			   			setTimeout(() => {
						  this.$router.push('address')
						}, 1500);
					 	
					
			   		}
			   })
			  },
			  newAd: function () {
			    let that = this;

			    let reg = /^1[3|4|5|7|8][0-9]{9}$/

			    if (!reg.test(that.data.phone)) {
			    	this.$messagebox.alert('手机号码错误')
			      	return
			    }
			    if (that.data.name == '') {
			    	this.$messagebox.alert('姓名不能为空')
			    
			      return
			    }
			    if (that.data.details == '') {
			    	this.$messagebox.alert('地址详情不能为空')
			     
			      return
			    }
			   console.log(that.data)
			   this.$axios({
			      url:'http://wy.gzziyu.com/ziyu.php?Action=act_edit_address',
			      method:'post',
			      params: {
			        address_id:0,
			        consignee: that.data.name,
			        address: that.data.details,
			        tel: that.data.phone,
			        user_id: userInfo.user_id,

			      }
			    })
			   .then((res)=>{
			   		console.log(res)
			   		if(res.data.success == 1){
			   			this.$Toast({
			   				 message: '新增地址成功',
							  position: 'middle',
							  duration: 1500
			   			});
			   			setTimeout(() => {
						  this.$router.push('address')
						}, 1500);
					 	
					
			   		}
			   })
			  },

			
		}
	}
</script>
<style lang="scss" scoped>
	@import './add_address.scss'
</style>