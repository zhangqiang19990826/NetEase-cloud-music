<template>
	<div>
		<!-- 详情界面 -->
		<div class="personglist">
			<!-- 左侧图片 -->
			<div class="personglist-left">
				<img :src="playlist.coverImgUrl" />
			</div>
			<!-- 右侧文本 -->
			<div class="personglist-rg">
				<!-- 头部 -->
				<div class="personglist-rg-rg-top">
					<div>歌单</div>
					<p>{{playlist.name}}</p>
				</div>
				<!-- 时间 -->
				<div class="personglist-rg-head">
					<div class="rg-head-img">
						<img :src="playlist.creator.avatarUrl" />
					</div>
					<p>{{playlist.creator.nickname}}</p>
					<p>2021-10-20创建</p>
				</div>
				<!-- 按钮区域 -->
				<div class="personglist-rg-button">
					 <el-button @click='Playall' style="margin-top: -8px; border-radius: 20px; width: 150px;" type="danger" icon="el-icon-caret-right">播放全部</el-button>
				</div>
				<!-- 标签 -->
				<div class="personglist-biaoqian">
					<span>标签：</span><p>{{playlist.tags[0]}}</p>/<p>{{playlist.tags[1]}}</p>
				</div>
				<!-- 歌曲 -->
				<div class="personglistmusic">
					<span>歌曲：</span><p>{{playlist.creator.trackCount}}</p>
					<span>播放：</span><p>158万</p>
				</div>
				<!-- <简介 -->
				<div class="persongjianjie">
					<p>简介:{{playlist.description}}</p>
				</div>
			</div>
		</div>
	
		<!-- 歌曲列表 -->
		
		<el-card class="musicList" >
			<el-scrollbar style="height:280px">
			 <el-table
				highlight-current-row
			    :data="musicList"
			    
			    style="width: 100%">
				<el-table-column
				  type="index"
				  width="100">
				</el-table-column>
			    <el-table-column
			      prop="name"
			      label="音乐标题"
			      width="450">
				  <template slot-scope='scope'>
					  <p @dblclick="playMusicList(scope.row)">
						  {{scope.row.name}}
					  </p>
					  
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="ar[0].name"
			      label="歌手"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="al.name"
			      label="专辑">
			    </el-table-column>
				<el-table-column
				  prop="dt"
				  label="时长">
				</el-table-column>
				
			  </el-table>	
			  </el-scrollbar>
		</el-card>
	</div>
</template>

<script>
	export default{
		data() {
			return{
			playlist:{
				creator:{
					avatarUrl:''
				},
				tags:[],
			},
			queryId : '',
			
			// id合集
			listId:[],
			//前一个组件传递过来的值 放入localStorage保存
			currentId: this.$route.query.id ? this.$route.query.id : window.localStorage.getItem('currentId'),	
			musicList:[],
			}
		},
		created() {
			this.getPersongList()
		},
		methods:{
			// 获取歌单列表
			async getPersongList(){
			const persongId=this.$route.query.id
			const {data:res} = await this.$http.get('/playlist/detail',{params: {id: this.currentId}})
			// console.log(res)
			if(res.code =='200'){
				this.playlist = res.playlist
				let songId = this.playlist.trackIds
				songId.forEach(item=>{
					// console.log(item)
					this.queryId += item.id +','
					// console.log(this.queryId)
					// this.queryId.substr(0,this.queryId.length-1)
					// console.log(this.queryId)
				})
				this.getsonglist()
				
			}
			},
			// 获取歌单歌曲列表
			async getsonglist(){
				const {data:res} = await this.$http.get('/song/detail',{params:{ids: this.queryId.substr(0,this.queryId.length-1)}})
				if(res.code =='200'){
					this.musicList = res.songs
					// console.log(this.musicList)
					// console.log(this.musicList.id)
					//处理时长数据
					this.musicList.forEach(item => {
					    const dt = new Date(item.dt)
					    const mm = (dt.getMinutes() + '').padStart(2, '0')
					    const ss = (dt.getSeconds() + '').padStart(2, '0')
					
					    item.dt = mm + ':' + ss
					})
					this.musicList.forEach(item =>{
						this.listId.push(item.id)
						// console.log(this.listId.length)
					})
				}
			},
			musicSolo(row){
				// console.log(row)
				this.$router.push({path:'/musicSolo?id='+row.id,query:{id:row.id}})
			},
			// 播放全部
			Playall(){
				console.log(this.listId[0])
				console.log(this.listId)
				this.$emit('personglist',this.listId,this.listId[0])
			},
			playMusicList(row){
				this.$emit('personglist',this.listId,row.id)
				// console.log(row.id)
				
			}
		}
	}
</script>

<style scoped="scoped">
	.personglist{
		width: 900px;
		height: 200px;
		margin: 20px 20px;
		display: flex;
	}
	.personglist-left{
		width: 200px;
		height: 200px;
		border-radius: 15px;
		overflow: hidden;
		margin-right: 15px;
	}
	.personglist-left img{
		width: 100%;
		height: 100%;
	}
	.personglist-rg{
		width: 700px;
		height: 100%;
		/* background-color: #282828; */
	}
	.personglist-rg-rg-top{
		width: 100%;
		height: 40px;
		display: flex;
	}
	.personglist-rg-rg-top div{
		width: 35px;
		height: 20px;
		font-size: 13px;
		text-align: center;
		line-height: 20px;
		border: 1px solid #E13E3E;
		color: #E13E3E;
		border-radius: 2px;
		margin-top: 15px;
		margin-right: 10px;
	}
	.personglist-rg-rg-top p{
		font-size: 20px;
		font-weight: 700;
		margin-top: 10px;
	}
	.personglist-rg-head{
		width: 100%;
		height: 40px;
		/* background-color: #E13E3E; */
		display: flex;
	}
	.rg-head-img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}
	.rg-head-img img{
		width: 100%;
		height: 100%;
	}
	.personglist-rg-head p:nth-child(2){
		font-size: 13px;
		color: #0b58b0;
		line-height: 30px;
		margin-right: 10px;
	}
	.personglist-rg-head p:nth-child(3){
		font-size: 13px;
		line-height: 30px;
	}
	.personglist-biaoqian,.personglistmusic,.persongjianjie{
		width: 100%;
		height: 20px;
		/* background-color: #0B58B0; */
		margin-top: 5px;
		line-height: 20px;
		font-size: 14px;
		display: flex;
		/* flex-wrap: wrap; */
		color: #3e3e3e;
		overflow: hidden;
	}
	.personglist-biaoqian p{
		color: #0B58B0;
		margin-right: 3px;
		margin-left: 3px;
	}
	.persongjianjie span{
		display:inline-block;
		width: 35px;
		
	}
	.persongjianjie p{
		overflow: hidden;
		text-overflow: inherit;
		/* margin-left: 10px; */
	}

	
</style>
