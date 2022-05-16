import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home/home.vue'
import One from '../components/One/one.vue'
import chuli from '../components/One/chuli.vue'
import zhuanshu from '../components/One/zhuanshu.vue'
import gedan from '../components/One/gedan.vue'
import paihang from '../components/One/paihang.vue'
import geshou from '../components/One/geshou.vue'
import zuixin from '../components/One/zuixin.vue'
import persong from '../components/persong/persong.vue'
import musicSolo from '../components/persong/musicSolo.vue'
import searchPage from '../components/SearchPage/searchPage.vue'
import singer from '../components/Singer/singer.vue'
import album from '../components/Album/album.vue'

import mypage from '../components/Mv/mypage.vue'
import myvideo from '../components/Mv/Myvideo.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
		{path:'/',redirect:'/home'},	
		{path:'/home',component:Home,redirect:'/2',
		children:[
			{path:'/2',component:One,redirect:'/chuli',
			children:[
				{path:'/chuli',component:chuli},
				{path:'/zhuanshu',component:zhuanshu},
				{path:'/gedan',component:gedan},
				{path:'/paihang',component:paihang},
				{path:'/geshou',component:geshou},
				{path:'/zuixin',component:zuixin},
			]
			},
			{name:'persong', path:'/persong',component:persong},
			{path:'/musicSolo',component:musicSolo},			
			{path:'/album',component:album},
			{path:'/searchPage',component:searchPage},
			{path:'/singer',component:singer},
			{path:'/mypage',component:mypage},
			{path:'/myvideo',component:myvideo},
			
		]
		},
		
	]
})

export default router
