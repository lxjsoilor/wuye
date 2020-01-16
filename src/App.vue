<template>
  <div id="app" v-wechat-title="title">
    <router-view  v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
   provide(){
      return{
        reload:this.reload
      }
    },
  data(){
    return {
        title:'',
         isRouterAlive:true
    }
  },
  created(){
    this.get_title()
  },
  methods:{
    get_title(){
        this.$axios({
            url:'http://wy.gzziyu.com/ziyu.php?Action=siteweb',
            method:'post'
        })
        .then((res)=>{
            console.log(res)
            this.title = res.data[20].value
        })
    },
    reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
    },
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
 width:100%;
 height:100%;
}


// @import '../static/css/mui.min.css';
.all{
    width:100%;
    height:100%;
}

body ,ul,html{
   margin:0;
   padding:0;
}
a{
    text-decoration: none;
    color: #666666;
    
}
p{
    margin: 0;
}
li{
    list-style: none;
}
input,textarea,button,select{
    outline: none;
}
body,html{
    width:100%;
    height:100%;
    // background: #fff;
}
#middle{
       width: 100%;
       // height:100%;
       padding: 1rem  0 0.98rem 0 ;
}
#header{
    
    width: 100%;
    background: #fff;
    height: 0.95rem;
    box-shadow: 0 2px 2px 2px #f2f2f2;
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.95rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-sizing:border-box;
    a{
        position: absolute;
        left: 0.2rem;
        float: left;
        line-height: 0.95rem;
        font-size: 0.51rem;
        color: #000;
        
    }
    .logo{
        height: 0.35rem;
        a{
            font-size: 0.36rem;
        }
        
        img{
            width: 1.6rem;
            height: 0.35rem;
            margin-right: 0.1rem;
        }
    }
}
#footer{
    width: 100%;
    height: 0.98rem;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    ul{
        width: 100%;
        li{
            float: left;
            width: 25%;
            img{
                height: 0.36rem;
                display: block;
                margin: 0.22rem auto 0;
            }
            p{
                font-size: .22rem;
                color: #9c9c9c;
                text-align: center;
            }
        }
    }
}

</style>
