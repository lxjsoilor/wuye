<template>
	<div id="header">
		<div class="logo"><a href="javascript:void(0)" @click="go_back"><img src="img/logo1.png"/>物业管理</a></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'header',
		data(){
			return {

			}
		},
		methods:{
			go_back(){
				this.$router.push('/')
			}
		}
	}
</script>
