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
        <span>{{info.yzxx}}</span>
      </div>
      <div class="change_id" @click="go_zuke">切换至租客</div>
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
          <router-link to="/house_release">
            <img src="static/img/9.png" />
          </router-link>
          <p>
            <router-link to="/house_release">发布房源</router-link>
          </p>
        </li>
        <li>
          <router-link to="/my_house">
            <img src="static/img/10.png" />
          </router-link>
          <p>
            <router-link to="/my_house">我的房源</router-link>
          </p>
        </li>
        <li>
          <router-link to="/zuwu">
            <img src="static/img/11.png" />
          </router-link>
          <p>
            <router-link to="/zuwu">租务管理</router-link>
          </p>
        </li>
        <li>
          <router-link to="/T_bill">
            <img src="static/img/12.png" />
          </router-link>
          <p>
            <router-link to="/T_bill">财务管理</router-link>
          </p>
        </li>
        <li>
          <router-link to="/bespeak_house">
            <img src="static/img/7.png" />
          </router-link>
          <p>
            <router-link to="/bespeak_house">预约看房</router-link>
          </p>
        </li>
        <li>
          <router-link to="/tuifang">
            <img src="static/img/13.png" />
          </router-link>
          <p>
            <router-link to="/tuifang">退房列表</router-link>
          </p>
        </li>
        <li>
          <router-link to="/Application">
            <img src="static/img/5.png" />
          </router-link>
          <p>
            <router-link to="/Application">维修列表</router-link>
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
  name: "T_user",
  data() {
    return {
	  swiperOption: {
        direction: "vertical",
        autoplay: true,
        loop: true,
        slidesPerview: "auto"
      },
      message_num: 0,
	  info: {},
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
          id: 18,
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
        this.info = res.data;
      });
    },
    go_message() {
      this.$router.push({ name: "O_message", query: { id: 2 } });
    },

    go_zuke() {
      this.$router.push("O_user");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./T_user.scss";
</style>