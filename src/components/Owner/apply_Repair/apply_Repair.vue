<template>
	<div  class="">
		<header-item message="申请维修"></header-item>
			<div id="middle">
			<div class="status">
				<img src="static/img/weixiu_1.png" alt="" />
			</div>
			<div class="item">
				<div class="item_title">维修信息</div>
				<div class="form">
					<div class="item2">
						<div class="label">维修项目：</div>
						<div class="input">
							<input type="text" v-model="s_xiangmu" placeholder="请输入维修项目" />
						</div>
					</div>
					<div class="item2">
						<div class="label">问题说明：</div>
						<div class="input">
							<textarea type="text" v-model="s_wenti" placeholder="请输入问题说明" /></textarea>
						</div>
					</div>
					<div class="item2">
						<div class="label">上传照片/视频：</div>
						
					</div>
					<div class="item2">
						<div class="pic_div" v-for="(item,index) in file_url"><img :src="item"></div>
						<form ><input type="file" id="file" name="" @change="getFile($event)">
						<div class="pic_div">+</div></form>
					</div>
					
				</div>
			</div>
			
			
			<div class="item">
				<div class="item_title">房屋信息</div>
				<div class="form">
					<div class="item1">
						<div class="label">租客姓名：</div>
						<div class="input"> 
							<input type="text" v-model="info.h_name" placeholder="请输入租客姓名" readonly="readonly" />
						</div>
					</div>
					<div class="item1">
						<div class="label">联系电话：</div>
						<div class="input">
							<input type="text"  v-model="info.h_tel" placeholder="请输入联系电话"  readonly="readonly"  />
						</div>
					</div>
					<div class="item1">
						<div class="label">小区名称：</div>
						<div class="input">
							<input type="text"  v-model="info.name"  placeholder="请输入小区名称" readonly="readonly"  />
						</div>
					</div>
					<div class="item1">
						<div class="label">楼层：</div>
						<div class="input">
							<input type="text"  v-model="info.h_louceng" placeholder="请输入楼层" readonly="readonly"  />
						</div>
					</div>
					<div class="item1">
						<div class="label">房间号：</div>
						<div class="input">
							<input type="text"  v-model="info.h_fanghao" placeholder="请输入房间号" readonly="readonly"  />
						</div>
					</div>
					<div class="item1">
						<div class="label">地址：</div>
						<div class="input">
							<textarea type="text"  v-model="info.address" placeholder="请输入租房备注（可不填）" readonly="readonly"  /></textarea>
						</div>
					</div>
					
				</div>
			</div>
			
			<div class="btn_list">
				<button type="button" @click="submit">提交申请</button>
			</div>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'apply_Repair',
		data(){
			return {
				id:'',
				s_xiangmu:'',
				s_wenti:'',
				p_pic:'',
				info:{},
				file_url:[],
			}
		},
		created(){
			this.id = this.$route.query.id
			this.get_detail( this.$route.query.id)
		},
		methods:{
			submit(){
				this.$axios({
					url:'http://wy.gzziyu.com/zmember.php?Action=shenqingweixiu',
					method:'post',
					params:{
						s_userid:userInfo.user_id,
						s_fangyangid:this.id,
						s_xiangmu:this.s_xiangmu,
						s_wenti:this.s_wenti,
						p_pic:this.p_pic
					}
				})
				.then((res)=>{
					console.log(res)
					this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
					if(res.data.success == 1){
						 
			   			setTimeout(() => {
						  this.$router.push('MyRepair')
						}, 1500);
					}
				})
			},
			get_detail(id){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				this.$axios({
					url:'http://wy.gzziyu.com/zlisting.php?Action=zhufangdetail',
					method:'post',
					params:{
						user_id:userInfo.user_id,
						r_id:id
					}
				})
				.then((res)=>{
					this.info = res.data
					console.log(res)
				})
			},
			getFile(event) {
				this.$Indicator.open('上传中...')
	            this.file = event.target.files[0];
	            console.log(this.file);
	            let formData = new FormData();
	            formData.append('pic', this.file);
	            let config = {
	              headers: {
	                'Content-Type': 'multipart/form-data'
	              }
	            }
            	var that = this;
             	this.$axios.post('http://wy.gzziyu.com/zmember.php?Action=shangquanpic', formData, config).then(function (res) {
	             	 console.log(res)
	             	 if(res.data.success == 1){
	             	 that.file_url.push(res.data.pic)
	             	 that.p_pic = that.file_url.join(',')
	             	 that.$Indicator.close()
	             	 }
	            })
            },
		}
	}
</script>
<style lang="scss" scoped>
	@import './apply_Repair.scss'
</style>