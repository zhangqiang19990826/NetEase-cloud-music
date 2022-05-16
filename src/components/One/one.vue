<template>
	<div>
	<el-container>
		<!-- 导航条 -->
	  <el-header>
		  <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
		    <el-menu-item index="chuli">个性推荐</el-menu-item>
		    <el-menu-item index="zhuanshu">专属订制</el-menu-item>
		    <el-menu-item index="gedan">歌单</el-menu-item>
		    <el-menu-item index="paihang">排行榜</el-menu-item>
		    <el-menu-item index="geshou">歌手</el-menu-item>
		    <el-menu-item index="zuixin">最新音乐</el-menu-item>
			  </el-menu>
	  </el-header>
	  <el-main >
		  <el-scrollbar style="height:500px">
		  		<router-view></router-view>
		  </el-scrollbar>
	  </el-main>
	
	 
	</el-container>
		
		
	</div>
</template>

<script>
	export default{
		data() {
			return{
				activeIndex:'chuli',
			}
		},
		created() {
			
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.el-menu{
		min-width: 600px !important;
		border-bottom: none !important;
	}
.el-menu-item{
		margin: 10px 10px;
		height: 50px;
		line-height: 50px;
		text-align: left;
		color: #282828 !important;
		font-size: 17px;
	}
	.el-menu-item.is-active {
	  margin: 10px 10px;
	  height: 50px;
	  line-height: 50px;
	  text-align: left;
	  color: #333333;
	  font-size: 19px;
	  font-weight: 600;
	  border-bottom: 3px solid #ec4141 !important;
	}
	.el-main{
		width: 100%;
		height: 100%;
	}
</style>
