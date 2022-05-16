<template>
  <div id="app">
  <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>


export default {
	 name: 'App',
		  provide (){
		     return {
		       reload:this.reload
		     }
		  },
		  data(){
		    return {
		       isRouterAlive:true
		    }
		  },
		  methods:{
		    reload (){
		       this.isRouterAlive = false
		       this.$nextTick(function(){
		          this.isRouterAlive = true
		       })
		    }
		  },
		  components:{
		  }
}
</script>

<style lang="less">
	html,body,#app{
		// background-color: #DD0055;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
*{
	margin: 0;
	padding: 0;
	/* background-color: #0B58B0; */
}
.el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
</style>
