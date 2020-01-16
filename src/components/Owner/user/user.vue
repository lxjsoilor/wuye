<template>
  <div class="all">
    <div class="user_top">
      <div class="user_img">
        <img :src="info.images" />
      </div>
      <div class="user_name">{{info.nicheng}}</div>
      <div class="phone">{{info.mobile_phone}}</div>
      <div class="msg" @click="go_message">
        <img src="static/img/msg.png" alt />
        <span>{{info.zkxx}}</span>
      </div>
      <div class="change_id" @click="go_zuke">切换至业主</div>
    </div>
    <div class="tip2">
      <span>通知：</span>
      <div class="swiper_list">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in lists" :key="index">
            <router-link :to="'/danye?id='+item.id">{{item.title}}</router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="url_list">
      <ul>
        <li>
          <router-link to="/Renting">
            <img src="static/img/1.png" />
          </router-link>
          <p>
            <router-link to="/Renting">我的租房</router-link>
          </p>
        </li>
        <li>
          <router-link to="/My_order">
            <img src="static/img/2.png" />
          </router-link>
          <p>
            <router-link to="/My_order">我的订单</router-link>
          </p>
        </li>
        <li>
          <router-link to="/T_reg">
            <img src="static/img/3.png" />
          </router-link>
          <p>
            <router-link to="/T_reg">业主注册</router-link>
          </p>
        </li>
        <li>
          <router-link to="/my_bill">
            <img src="static/img/4.png" />
          </router-link>
          <p>
            <router-link to="/my_bill">我的账单</router-link>
          </p>
        </li>
        <li>
          <router-link to="/MyRepair">
            <img src="static/img/5.png" />
          </router-link>
          <p>
            <router-link to="/MyRepair">我的维修</router-link>
          </p>
        </li>
        <li>
          <router-link to="/suggest">
            <img src="static/img/6.png" />
          </router-link>
          <p>
            <router-link to="/suggest">我的建议</router-link>
          </p>
        </li>
        <li>
          <router-link to="/my_bespeak">
            <img src="static/img/7.png" />
          </router-link>
          <p>
            <router-link to="/my_bespeak">我的预约</router-link>
          </p>
        </li>
        <li>
          <router-link to="/user_info">
            <img src="static/img/8.png" />
          </router-link>
          <p>
            <router-link to="/user_info">个人信息</router-link>
          </p>
        </li>
      </ul>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script type="text/javascript">
import { swiper, swiperSlide } from "vue-awesome-swiper";
var userInfo = JSON.parse(sessionStorage.getItem("userInfos"));
export default {
  name: "user",
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        autoplay: true,
        loop: true,
        slidesPerview: "auto"
      },
      info: {},
      user_rank: "",
      lists: []
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    let that = this;
	this.get_user();
	this.get_list();
    // this.get_message()
    // setInterval(function(){ that.get_message() }, 3000);
  },
  methods: {
    get_list() {
      this.$axios({
        url: "http://wy.gzziyu.com/ziyu.php?Action=article_cat",
        method: "post",
        params: {
          id: 19,
          shuzi: 100
        }
      }).then(res => {
        this.lists = res.data;
        this.swiperOption = {
          direction: "vertical",
          autoplay: true,
          loop: true
        };
      });
    },
    get_user() {
      var userInfo = JSON.parse(sessionStorage.getItem("userInfos"));
      this.$axios({
        url: "http://wy.gzziyu.com/zmember.php?Action=huiyuanxixin",
        method: "post",
        params: {
          user_id: userInfo.user_id
        }
      }).then(res => {
        console.log(res);
        this.info = {};
        this.info = res.data;
        this.user_rank = res.data.user_rank;
        userInfo.user_rank = res.data.user_rank;
        sessionStorage.setItem("userInfos", JSON.stringify(userInfo));
      });
    },
    go_message() {
      this.$router.push({ name: "O_message", query: { id: 1 } });
    },
    // get_message(){
    // 	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
    // 	this.$axios({
    // 		url:'http://wy.gzziyu.com/zmember.php?Action=messagelist',
    // 		method:'post',
    // 		params:{
    // 			user_id:userInfo.user_id,
    // 			shuzi:1
    // 		}
    // 	})
    // 	.then((res)=>{
    // 		// console.log(res)
    // 		this.message_num = res.data.length
    // 	})
    // },
    go_zuke() {
      if (this.user_rank == "99") {
        this.$router.push("T_user");
      } else if (this.user_rank == 97) {
        this.$Toast("您的业主审核进行中");
        this.$router.push("yezhu_status");
      } else if (this.user_rank == 100) {
        // this.$Toast('您的业主审核进行中');
        this.$router.push("yezhu_status");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./user.scss";
</style>