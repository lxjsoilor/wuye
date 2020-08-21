<template>
	<div  class="">
		<header-item message="发布房源"></header-item>
		<div id="middle">
			<div class="img_upload">
				<ul>
					<li  v-for="(item,index) in file_url"><img :src="'http://wy.gzziyu.com/'+item"/></li>
				</ul>
				<div class="posi">
					<img src="static/img/add_house.png">
					<p>添加房屋视频/图片</p>
					<input type="file"  id="file" @change="getFile($event)" name="">
				</div>
			</div>
			<div class="form">
				
				<div class="item">
					<div class="label">小区：</div>
					<div class="input">
						<input type="text" v-model="submit_data.name" placeholder="请输入小区名字" />
					</div>
				</div>

				<div class="item">
					<div class="label">地址：</div>
					<div class="input">
						<input type="text"  v-model="submit_data.address" placeholder="请输入详细地址" />
					</div>
				</div>

				<div class="item">
					<div class="label">户型：</div>
					<div class="input">
						<input type="text"   v-model="huxing_text" id="huxing" @focus="show_model">
					</div>
				</div>

				<div class="item">
					<div class="label">面积：</div>
					<div class="input">
						<input type="text" v-model="submit_data.acreage" class="input_all" placeholder="请输入房屋面积" />
						<span>平米</span>
					</div>
				</div>

				<div class="item">
					<div class="label">楼层：</div>
					<div class="input">
						<div class="input_half">
							<span>第</span>
							<input type="text" v-model="submit_data.floor_in" placeholder="输入楼层">
							<span>层</span>
						</div>
						<div class="input_half">
							<span>共</span>
							<input type="text" v-model="submit_data.floor" placeholder="输入总楼层">
							<span>层</span>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="label">费用：</div>
					<div class="input">
						<div class="input_half">
							<span>水费</span>
							<input type="text" v-model="submit_data.water" placeholder="输入水费">
							<span>/吨</span>
						</div>
						<div class="input_half">
							<span>电费</span>
							<input type="text" v-model="submit_data.electric" placeholder="输入电费">
							<span>/度</span>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="label">租金：</div>
					<div class="input">
						<div class="input">
						<input type="text" v-model="submit_data.rental" class="input_all" placeholder="请输入租金" />
						<span>元</span>
					</div>
					</div>
				</div>

				<div class="item">
					<div class="label">付款方式：</div>
					<div class="input">
						<input type="text" v-model="pay_text"  @focus="show_model1" id="dateSelect" placeholder="请选择" />
					</div>
				</div>

				<div class="item_textarea">
					<div class="label">房源介绍：</div>
					<div class="input">
						<textarea v-model="submit_data.com" cols="30" rows="3" placeholder="请输入介绍房源信息"></textarea>
					</div>
				</div>

				<div class="item_textarea">
					<div class="label">配套设施：</div>
					<div class="input">
						<textarea v-model="submit_data.matching" cols="30" rows="3" placeholder="请输入配套设施词语"></textarea>
					</div>
				</div>
				<div class="btn_list">
					<button type="button" @click="submit" v-if="!bool">提交</button>
					<button type="button" @click="edit" v-if="bool">编辑</button>
				</div>
				
				
				
			</div>
			<mt-popup
			  v-model="popupVisible"
			  position="bottom">
			  <mt-picker :slots="slots" textAlign="center" valueKey="com" style="width:7.5rem;" @change="onValuesChange"></mt-picker>
			</mt-popup>
			<mt-popup
			  v-model="popupVisible1"
			  position="bottom">
			  <mt-picker :slots="slots1" textAlign="center" valueKey="name" style="width:7.5rem;" @change="onValuesChange1"></mt-picker>
			</mt-popup>
		</div>
		<!-- <footer-view></footer-view> -->
	</div>
</template>
<script type="text/javascript">
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
	export default{
		name:'house_release',
		data(){
			return {
				cart_list:[],
				popupVisible:false,
				popupVisible1:false,
				slots: [
			        {
			          flex: 1,
			          values: [],
			          className: 'slot1',
			          textAlign: 'center',
			          defaultIndex:3
			        },
			        {
			          flex: 1,
			          values: [],
			          className: 'slot3',
			          textAlign: 'center',
			          defaultIndex:0
			        },
			        {
			          flex: 1,
			          values: [],
			          className: 'slot4',
			          textAlign: 'center',
			          defaultIndex:3
			        }

			     ],
			     slots1: [
			        {
			          flex: 1,
			          values: [],
			          className: 'slot2',
			          textAlign: 'center',
			          defaultIndex:0
			        }
			     ],
			    submit_data:{
			      	user_id :userInfo.user_id,
			      	file_id :"",
			      	address  :"",
			      	name  :"",
			      	house_type_id  :"",
			      	acreage   :"",
			      	floor   :"",
			      	floor_in   :"",
			      	rental   :"",
			      	pay_type_id    :"",
			      	com    :"",
			      	water    :"",
			      	electric    :"",
			      	matching    :"",
			      	hous_id    :"",
			      	houseId:''
			      },
		        huxing:'',
		        pay_text:'',
		        file_id_list:[],
		        file_url:[],
		        huxing_arr:[],
		        huxing_text:"",
		        info:{},
		        bool:false,
		        huxing_1:0,
		        huxing_2:0,
		        huxing_3:0


			}
		},
		created(){
			this.get_cart()
			this.get_pay()
			if(this.$route.query.id){
				this.bool = true;
				this.id = this.$route.query.id;
					console.log(this.$route.query.id)
					this.get_info(this.$route.query.id)
			}
		},
		beforeDestroy() {
			this.$Indicator.close()
		},
		methods:{
			// 户型弹窗
			show_model(){
				this.popupVisible = true;
			},
			// 付款方式弹窗
			show_model1(){
				this.popupVisible1 = true;
			},
			// 改变户型
			onValuesChange(picker, values) {
				console.log(values)
				let  com = values[0].num+'-'+values[1].num+'-'+values[2].num
				this.huxing_arr.map((item)=>{
					
					
					if(com == item.com){
						console.log(com)
						console.log(item.com)
						this.submit_data.house_type_id = item.id
						this.huxing_text = item.name

					}
				})
		     
		    },
		    // 改变付款方式
		    onValuesChange1(picker, values) {
				console.log(values)
				this.pay_text = values[0].name;
				this.submit_data.pay_type_id = values[0].id;

		     
		    },
		   getFile(event) {
				this.$Indicator.open()
	            this.file = event.target.files[0];
	            console.log(this.file);
	            let formData = new FormData();
	            formData.append('file', this.file);
	            let config = {
	              headers: {
	                'Content-Type': 'multipart/form-data'
	              }
	            }
            	var that = this;
             	this.$axios.post('http://wy.gzziyu.com/owner.php?act=upload_file', formData, config).then(function (res) {
									console.log(res)
	             	 that.$Indicator.close()
	             	 if(res.data.error == 0){
	             	 that.file_id_list.push(res.data.data.id)
	             	 that.file_url.push(res.data.data.path)
	             	 that.submit_data.file_id = that.file_id_list.join(',')
	             	 }
	            })
	            .catch((err)=>{
	            	console.log(err)
	            })
          	},
          	// 提交房源
          	submit(){
          		this.$axios({
          			url:' http://wy.gzziyu.com/owner.php?act=house_release',
          			method:'post',
          			params:this.submit_data
          		})
          		.then((res)=>{
          			console.log(res)
          			if(res.data.msg == "发布成功"){
          				 this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
			   			setTimeout(() => {
						  this.$router.push('my_house')
						}, 1500);
          			}
          		})
          	},
          	edit(){
          		this.$axios({
          			url:'http://wy.gzziyu.com/owner.php?act=house_update',
          			method:'post',
          			params:this.submit_data
          		})
          		.then((res)=>{
          			console.log(res)
          			this.$Toast({
			   				 message: res.data.msg,
							  position: 'middle',
							  iconClass: 'icon icon-success',
							  duration: 1500
			   			});
          			if(res.data.msg == "修改成功"){
          				 
			   			setTimeout(() => {
						  this.$router.push('my_house')
						}, 1500);
          			}
          		})
          	},

			change_sex(index){
				this.info.sex = index
			},
			
			get_info(id){
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=house_update',
					method:'get',
					params:{
						user_id:userInfo.user_id,
						houseId:id
					}
				})
				.then((res)=>{
					this.info = res.data.data;
					console.log(res)
					this.submit_data.houseId = this.$route.query.id;
			      	this.submit_data.file_id = this.info[0].file_id,
			      	this.submit_data.address  = this.info[0].address;
			      	this.submit_data.name  = this.info[0].name;
			      	
			      	this.submit_data.acreage   = this.info[0].acreage;
			      	this.submit_data.floor   = this.info[0].floor;
			      	this.submit_data.floor_in   = this.info[0].floor_in;
			      	this.submit_data.rental   = this.info[0].rental;
			      	
			      	this.submit_data.com    = this.info[0].com;
			      	this.submit_data.water    = this.info[0].water;
			      	this.submit_data.electric    = this.info[0].electric;
			      	this.submit_data.matching    = this.info[0].matching;
			      	this.submit_data.hous_id    = this.info[0].hous_id;
			      	console.log('aaaaaaaaa')
			      	// this.info[0].file.map((item)=>{
			      	// 	console.log(item)
			      	// })
			      	
			      	this.info[0].file.map((item)=>{
			      		this.file_url.push(item.path)
			      	})

			      	console.log('支付id')
			      	console.log(this.info[0].pay_type_id)
			      	this.slots1[0].values.map((item,index)=>{
			      		
			      		if(item.id == this.info[0].pay_type_id){
			      			console.log(index)
			      			this.slots1[0].defaultIndex = index;
			      			this.pay_text == item.name;
			      		}
			      	})

			      	// 户型选择
			      	this.huxing_arr.map((item)=>{
			      		// console.log(item)
			      		if(item.id == this.info[0].house_type_id){
			      			
			      			let arr =[]
			      			 arr = item.com.split('-');
			      			this.slots[0].values.map((res,indexs)=>{
			      				// console.log(res)
			      				if(arr[0] == res.num ){
			      					this.slots[0].defaultIndex = indexs
			      					this.huxing_1 = indexs
			      				}
			      			})
			      			this.slots[1].values.map((res,indexs)=>{
			      				// console.log(res)
			      				if(arr[1] == res.num ){
			      					this.slots[1].defaultIndex = indexs
			      					this.huxing_2 = indexs
			      				}
			      			})
			      			this.slots[2].values.map((res,indexs)=>{
			      				// console.log(res)
			      				if(arr[2] == res.num ){
			      					this.slots[2].defaultIndex = indexs
			      					this.huxing_3 = indexs
			      				}
			      			})
			      		}
			      	})

			      	this.submit_data.house_type_id  = this.info[0].house_type_id;
			      	this.submit_data.pay_type_id    = this.info[0].pay_type_id;

				})
			},
			get_cart(){
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=house_type',
					method:'post'
				})
				.then((res)=>{
					console.log(res)
					// if(res.data.error == 0){
						console.log(res.data.data.data)
						console.log(res.data.data.shi)
						console.log(res.data.data.ting)
						console.log(res.data.data.wei)
						this.huxing_arr = res.data.data.data;
						this.slots[0].values = res.data.data.shi;
						this.slots[1].values = res.data.data.ting;
						this.slots[2].values = res.data.data.wei;
						// this.slots[0].values = res.data.data
					// }
				})
			},
			get_pay(){
				this.$axios({
					url:'http://wy.gzziyu.com/owner.php?act=pay_type',
					method:'post'
				})
				.then((res)=>{
					console.log(res)
					this.slots1[0].values = res.data.data
					this.pay_text = res.data.data[0].name
					this.submit_data.pay_type_id = res.data.data[0].id;
				})
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	@import './house_release.scss'
</style>