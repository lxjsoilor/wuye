<template>
	<div>
		<div id="footer">
			<ul>
				<li>
					<router-link to="/">
						<img src="static/img/index.png" />
						<p>首页</p>
					</router-link>
				</li>
				<li>
					<router-link to="/house_list">
						<img src="static/img/seach.png" />
						<p>找房</p>
					</router-link>
				</li>
				<li>
					<router-link to="/shop">
						<img src="static/img/shop_.png" />
						<p>商城</p>
					</router-link>
				</li>
				<li>
					<router-link to="/O_user">
						<img src="static/img/user.png" />
						<p>个人中心</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'',
		data(){
			return {

			}
		},
		watch: {
			'$route' (to, from) {
				console.log(to,form)
			}
		},
		created(){

		},
		methods:{

		}
	}
</script>