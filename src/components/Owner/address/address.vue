<template>
	<div  class="all">
		<header-item message="收货地址"></header-item>
		<div id="middle">
			
			<ul>
				<li :class="moren_id == item.address_id?'on':'	'" v-for="(item,index) in lists" @click="setAd(item.address_id)">
					<p class="name"><span>{{item.consignee}}</span>{{item.tel}}</p>
					<p class="address">{{item.address}}</p>
					<a href="javascript:void(0)" class="edit" @click="edit(item.address_id)"><img src="static/img/edit.png"/></a>
					<a href="javascript:void(0)" class="delect"><img src="static/img/delect.png"/></a>
				</li>
				<li v-if="lists.length<=0"><p class="tip">暂无收货地址</p></li>
			</ul>
			
			<div class="btn_list">
				<button type="button" @click="add_address">新增收货地址</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
	export default{
		name:'Address',
		data(){
			return {
				lists:[],
				moren_id:''
			}
		},
		created(){
			userInfo = JSON.parse(sessionStorage.getItem('userInfos')) || {};
			// this.get_pro()
			this.get_address()
			this.get_moren()
		},
		methods:{
			dele(id){
				this.$axios({
			      url: 'http://wy.gzziyu.com/ziyu.php?Action=drop_consignee', //地址
			      method:"post",
			      params:{
			        address_id:id

			      },
			    })
			    .then( (res)=> {
			        console.log(res)
			        if(res.data.success == 1){

			        }
			        // this.moren_id = res.data
			        // let adresState = this.adresState;

			      })
			},
			get_moren(){

				this.$axios({
			      url: 'http://wy.gzziyu.com/ziyu.php?Action=address_id', //地址
			      method:"post",
			      params:{
			        user_id: userInfo.user_id
			      },
			    })
			    .then( (res)=> {
			        console.log(res)
			        	this.moren_id = res.data
			        // let adresState = this.adresState;

			      })
			},
			 get_address() {
			    this.$axios({
			      url: 'http://wy.gzziyu.com/ziyu.php?Action=address_list', //地址
			      method:"post",
			      params:{
			        user_id: userInfo.user_id
			      },
			    })
			    .then( (res)=> {
			        console.log(res)
			       
			        	this.lists = res.data
			       
			        // let adresState = this.adresState;

			      })
			  },
			  add_address(){
			  	this.$router.push('add_address')
			  },
			  setAd(id) {
		    	this.$axios({
		    		url:'http://wy.gzziyu.com/ziyu.php?Action=morendizhi',
		    		method:'post',
		    		params:{
		    			address_id: id,
        				user_id: userInfo.user_id,
		    		}
		    	})
		    	.then((res)=>{
		    		console.log(res)	
		    		if(res.data.success == 1){
		    			
					 	this.get_moren()
			   			
		    		}
		    	})
		  	  },
		  	  edit(id){
		  	  	this.$router.push({name:'Add_address',query:{id:id}})
		  	  }
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './address.scss'
</style>