<template>
  <div class="conton">
    <div id="header">
      <a href="javascript:void(0)" @click="go_back"><</a>
      租客注册
    </div>
    <div id="middle">
      <form>
        <div class="item">
          <div class="label">租客姓名：</div>
          <div class="input">
            <input type="text" v-model="nicheng" placeholder="请输入租客姓名" />
          </div>
        </div>
        <!-- <div class="item">
          <div class="label">租客姓名：</div>
          <div class="input">
            <div class="radius" :class="sex==1?'radius_on':''" @click="change_radius(1)">男</div>
            <div class="radius" :class="sex==2?'radius_on':''" @click="change_radius(2)">女</div>
          </div>
        </div> -->
        <div class="item">
          <div class="label">手机号码：</div>
          <div class="input">
            <input type="text" maxlength="11" v-model="mobile_phone" placeholder="请输入手机号码" />
          </div>
        </div>
		<div class="item">
          <div class="label">密码：</div>
          <div class="input">
            <input type="password" v-model="password" placeholder="请输入密码" />
          </div>
        </div>
		<div class="item">
          <div class="label">确认密码：</div>
          <div class="input">
            <input type="password" v-model="qrpassword" placeholder="请输入确认密码" />
          </div>
        </div>
        <!-- <div class="item">
          <div class="label">验证码：</div>
          <div class="input_code">
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <button
              class="code_button"
              type="button"
              :disabled="disabled"
              @click="get_code"
            >{{text}}</button>
          </div>
        </div> -->
        <div class="submit">
          <button type="button" @click="reg">立即注册</button>
        </div>
        <div class="tip" @click="gouxuan">
          <img :src="bool?'static/img/checkbox_on.png':'static/img/checkbox.png'" />我已阅读并同意《用户协议》
        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
import store from "@/store/store";
export default {
  name: "o_reg",
  data() {
    return {
      sex: 1,
      nicheng: "",
      mobile_phone: "",
      code: "",
      xieyi: true,
      code_bool: true,
      second: 60,
      disabled: false,
      time: 0,
	  bool: false,
	  qrpassword: '',
	  password: ''
    };
  },
  computed: {
    text: function() {
      return this.time > 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  },
  methods: {
    go_back() {
      this.$router.push("/");
    },
    timer() {
      console.log(this.time);
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.disabled = false;
      }
    },
    change_radius(index) {
      this.sex = index;
    },

    get_code() {
      this.$axios({
        url: "http://wy.gzziyu.com/zmember.php?Action=zcyanzhengma",
        method: "post",
        params: {
          mobile_phone: this.mobile_phone
        }
      }).then(res => {
        console.log(res);
        // alert(res.data.msg)
        this.$Toast({
          message: res.data.msg,
          position: "middle",
          iconClass: "icon icon-success",
          duration: 1000
        });
        if (res.data.success == 1) {
          this.time = this.second;
          this.disabled = true;
          this.timer();
        }
      });
    },
    reg() {
      if (!this.bool) {
        this.$Toast({
          message: "请先阅读并同意用户协议",
          position: "middle",
          iconClass: "icon icon-success",
          duration: 1000
        });

        return false;
      }

      this.$axios({
        url: "http://wy.gzziyu.com/zmember.php?Action=register",
        method: "post",
        params: {
		  mobile_phone: this.mobile_phone,
		  password: this.password,
		  qrpassword: this.qrpassword,
          nicheng: this.nicheng
        }
      }).then(res => {
        console.log(res);
        this.$Toast({
          message: res.data.msg,
          position: "middle",
          iconClass: "icon icon-success",
          duration: 1000
        });
        if (res.data.success == 1) {
          var Info = {
            user_id: res.data.user_id,
            user_rank: res.data.user_rank
          };
          sessionStorage.setItem("userInfos", JSON.stringify(Info));
          store.commit("userInfos", Info);

          setTimeout(() => {
            this.$router.push("O_user");
          }, 1000);
        }
      });
    },
    gouxuan() {
      this.bool = !this.bool;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./o_reg.scss";
</style>