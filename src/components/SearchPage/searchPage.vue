<template>
	<div class="container">
	<el-scrollbar style='height: 100%;'>
		<!-- 头部 -->
		<div class="SearchHead">
			<span>搜索</span>
			<span>{{SearchName}}</span>
		</div>
		
		<!-- tabs 标签页 -->
		<el-tabs v-model="activeName">
		    <el-tab-pane label="单曲" name="单曲">
				<!-- 按钮界面 -->
				<div>
					<el-button @click='OrSelected' icon="el-icon-caret-right" type="danger" round>播放全部</el-button>
					<el-button icon="el-icon-bottom" disabled round>全部下载</el-button>
				</div>
				<!-- table表格 -->
				  <el-table
				      stripe
				      :data="SongRecommend"
					  :key="SongRecommend.id"
					  :cell-style="{padding:8+'px'}"
					  @row-dblclick="dbSelected"
						style="width: 100%">
				      <el-table-column
				        type="index"	
				        width="180">
				      </el-table-column>
					  <el-table-column
					  label="音乐标题"
					  width="330"
					  prop="name"
					  >	 
					  </el-table-column>
					  <el-table-column
					  prop="artists[0].name"
					  label="歌手"
					  width="220"
					  >	  
					  </el-table-column>
					  <el-table-column
					  prop="album.name"
					  label="专辑"
					  width="220"
					  >	  
					  </el-table-column>
					  <el-table-column
					  prop="duration"
					  label="时长"
					  width="280"
					  >	  
					  </el-table-column>
					  </el-table>
					  <!-- 分页 -->
					<div>
						<el-pagination
							background
							:page-size='handPageSize'
							:current-page='CurrentPage'
						    layout="prev, pager, next"
							@current-change="handleCurrentChange"
						    :total="total">
						  </el-pagination>
					</div>
			</el-tab-pane>
			
		    <el-tab-pane label="歌手" name="歌手">
				<div class="SingerList">
					<!-- 单个 --> 
					<div class="SingerList-item" v-for="(item,index) in Singer" :key="index" @click="SingerListRouter(item)">
						<!-- 图片 -->
						<div class="singer-item-img" >
							<img :src="item.picUrl" />
						
						</div>
						<div class="SingerList-item-span">
							<!-- 歌手名 -->
							<span>{{item.name}}</span>
						</div>
									
						<!-- 头像 -->
						<div class="singer-Logo">
							<img src="../../../static/ren.png" />
						</div>
					</div>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="专辑" name="专辑">
				<div>
					<!-- 单个 -->
					<div class="album-item" v-for="(item,index) in Album" :key="index" @click="RouterSlbum(item)">
						<!-- 封面图片 -->
						<div class="album-item-img">
							<!-- 透明框 -->
							<div class="album-img-transparent"></div>
							<img :src="item.blurPicUrl" />
						</div>
						
						<!-- 文字内容 -->
						<div class="album-word">
							<!-- 歌曲名 -->
							<span>{{item.name}}</span>
							<!-- 歌手名 -->
							<span>{{item.artist.name}}<span style="font-size: 11px;">({{item.artist.alia[0]}})</span> </span>
						</div>
					</div>
				</div>
				<!-- 分页 -->
				<div>
					<el-pagination
						background
						
						:page-size='AlbumPageSize'
						:current-page='AlbumCurrentPage'
					    layout="prev, pager, next"
						@current-change="AlbumCurrentChange"
					    :total="AlbumTotal">
					  </el-pagination>
				</div>
			</el-tab-pane>
			
			
		    <el-tab-pane label="视频" name="视频">
				<el-row   class="row-bg" justify="end" :gutter="80">
				  <el-col :span="8" :xs="24" v-for="(item,index) in Mv" :key="index" >
					  <div class="Col-span" @click="RouterMv(item)">
				  <!-- 图片 -->
				  <div class="Mv-img">
					  <img :src="item.cover" />
					  <!-- 播放次数 -->
					  <div class="Mv-PlayCount">
						  <div class="PlayCount-img"></div>
						  <span>{{item.playCount | formatCount}}</span>
					  </div>
					  <!-- 时间 -->
					  <div class="PlayCount-time">
						  <span>{{item.duration}}</span>
					  </div>
				  </div>
				  <!-- 歌名 -->
					  <p class="Mv-word" style="font-size: 15px;margin: 2px 0px;">{{item.name}}</p>
				  
				  <!-- 歌手名 -->
				  
					  <p class="Mv-word" style="font-size: 14px;color: #676767;">{{item.artistName}}</p>
				
				  </div>
				  </el-col>
				</el-row>
				<!-- 分页 -->
				<div>
					<el-pagination
						background
						
						:page-size='MvPageSize'
						:current-page='MvCurrentPage'
					    layout="prev, pager, next"
						@current-change="MvCurrentChange"
					    :total="MvTotal">
					  </el-pagination>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="歌单" name="歌单">
				<el-row>
				  <el-col :span="24" v-for="(item,index) in playList" :key="index">
					  <div class="grid-content bg-purple-dark playList-item" style="display: flex;margin-top: 20px;" @click="RouterPage(item)">
				  
				  <!-- 图片 -->
				  <div class="playList-img">
					  <img :src="item.coverImgUrl" />
				  </div>
				  <!-- 文字 -->
				  
					  <p class="playList-word word-name">{{item.name}}</p>
				
				  <!-- 歌单曲目数量 -->
				  <div class="playList-word Playlist-p" style=";font-size: 13px;color: #676767;">{{item.trackCount}}首</div>
				  <!-- 用户 -->
				  <div class="Playlist-d">
					  <p class="playList-word" style="font-size: 13px;color: #676767;"> <span style="color: #C3C3C3;font-size: 12px;">by</span> {{item.creator.nickname}}</p>
				  </div>
				  <!-- 播放量 -->
				  <div class="playList-logo">
					  <!-- 图标 -->
					  <div class="playList-logo-img"></div>
					  <span class="playList-word" style="font-size: 13px;color: #676767;">{{item.playCount |formatCount}}</span>
				  </div>
				  
				  </div>
				  
				  </el-col>
				</el-row>
				<div>
					<el-pagination
						background
						
						:page-size='playListPageSize'
						:current-page='playListCurrentPage'
					    layout="prev, pager, next"
						@current-change="playListCurrentChange"
					    :total="playListTotal">
					  </el-pagination>
				</div>
			</el-tab-pane>
			
		  </el-tabs>
		
		
		
	</el-scrollbar>
	</div>
</template>

<script>
	export default{
		inject: ['reload'],
		data() {
			return{
				// tabs 选中name的值
				activeName: '单曲',
				SearchName:this.$route.query.name,
				SongRecommend:[],
				// 储存ID
				listId:[],
				// 第一个ID
				oneId:'',
				// 歌手搜索
				Singer:{},
				// 当前分页位置
				CurrentPage:1,
				// 偏移数量
				offset:0,
				// 歌曲总数
				total:0,
				// 当前页条数
				handPageSize:100,
				// 专辑存储
				Album:{},
				// 专辑数据总条数
				AlbumTotal:0,
				// 专辑偏移数量
				AlbumOffset:0,
				// 专辑当前分页位置
				AlbumCurrentPage:1,
				// 专辑当前页条数
				AlbumPageSize:15,
				// MV存储
				Mv:{},
				// 专辑数据总条数
				MvTotal:0,
				// 专辑偏移数量
				MvOffset:0,
				// 专辑当前分页位置
				MvCurrentPage:1,
				// 专辑当前页条数
				MvPageSize:24,
				// MV存储
				playList:{},
				// 专辑数据总条数
				playListTotal:0,
				// 专辑偏移数量
				playListOffset:0,
				// 专辑当前分页位置
				playListCurrentPage:1,
				// 专辑当前页条数
				playListPageSize:24,
				
				}
		},
		created() {
			this.getMusicList()
			this.getSingerList()
			this.getAlbumList()
			this.getMvList()
			this.getplayList()
		},
		methods:{
			
			// 获取歌手列表
			getSingerList(){
				this.$http.get('/search?keywords',{params:{keywords:this.SearchName,type:100,limit:20,offset:(this.playListCurrentPage-1)*20}}).then(resd => {
				if(resd.status == '200'){
					// console.log(resd)
					this.Singer =resd.data.result.artists
					// console.log(this.Singer)
				}
				})
			},
			// 获取歌单列表
			getplayList(){
				this.$http.get('/search?keywords',{params:{keywords:this.SearchName,type:1000,limit:20,offset:(this.playListCurrentPage-1)*20}}).then(resd => {
				if(resd.status == '200'){
					this.playList = resd.data.result.playlists
					this.playListTotal = resd.data.result.playlistCount
					// console.log(this.playList)
					// console.log(resd)
					// console.log(this.Singer)
				}
				})
			},
			// 获取专辑列表
			getAlbumList(){
				this.$http.get('/search?keywords',{params:{keywords:this.SearchName,type:10,limit:15,offset:(this.AlbumCurrentPage-1)*15}}).then(res => {
				// console.log(res)
				if(res.status == '200'){
					this.Album =res.data.result.albums
					this.AlbumTotal = res.data.result.albumCount
					// console.log(this.Album)
				}
				})
			},
			// 获取MV列表
			getMvList(){
				this.$http.get('/search?keywords',{params:{keywords:this.SearchName,type:1004,limit:24,offset:(this.MvCurrentPage-1)*24}}).then(resd => {
				// console.log(resd)
				if(resd.status == '200'){
					this.Mv = resd.data.result.mvs
					this.MvTotal =  resd.data.result.mvCount
					// console.log(this.Mv)
					this.Mv.forEach(item => {
					    const dt = new Date(item.duration)
					    const mm = (dt.getMinutes() + '').padStart(2, '0')
					    const ss = (dt.getSeconds() + '').padStart(2, '0')
					
					    item.duration = mm + ':' + ss
					})
				}
				})
			},
			
			// 获取歌曲列表
			getMusicList(){
				this.$http.get('/search?keywords',{params:{keywords:this.SearchName,type:1,limit:100,offset:(this.CurrentPage-1)*100}}).then((res)=>{
					 // console.log(res)
					 if(res.data.code==200){
						 this.total = res.data.result.songCount
						 this.SongRecommend = res.data.result.songs
						 // console.log(this.SongRecommend)
						 // 时长处理
						 this.SongRecommend.forEach(item => {
						     const dt = new Date(item.duration)
						     const mm = (dt.getMinutes() + '').padStart(2, '0')
						     const ss = (dt.getSeconds() + '').padStart(2, '0')
						 
						     item.duration = mm + ':' + ss
						 })
						 // 遍历ID存储
						 this.SongRecommend.forEach(item => {
							 // console.log(item.id)
							 this.listId.push(item.id)
							 this.oneId = this.listId[0]
							
							 // console.log(this.listId)
						 })
					 }
				})
			},
			// 点击跳转
			dbSelected(row){
				// console.log(row)				
				this.$emit('personglist',this.listId,row.id)
				
			},
			
			// 播放全部
			OrSelected(){
				// console.log(this.oneId)				
				this.$emit('personglist',this.listId,this.oneId)
				
			},
			tableRowClassName ({row, rowIndex}) {
			        //把每一行的索引放进row
			        row.index = rowIndex;
			     },
			// 选中行样式
			// RowStyle({row,rowIndex}){
			// 	console.log(row.id)
			// 	if(this.ids == row.id){
			// 		return{
			// 			"background-color": "#d6d6d6",
			// 			"color":"#ff0000"
			// 		}
			// 	}
			// },
			
			// 分页点击Cyrrent
			handleCurrentChange(val){
			 this.CurrentPage = val
				this.getMusicList()
			},
			// 专辑分页点击
			AlbumCurrentChange(val){
			 this.AlbumCurrentPage = val
				this.getAlbumList()
			},
			// Mv分页点击
			MvCurrentChange(val){
			 this.MvCurrentPage = val
				this.getMvList()
			},
			// 歌单分页点击
			playListCurrentChange(val){
			 this.playListCurrentPage = val
				this.getplayList()
			},
			
			// 歌手点击跳转
			SingerListRouter(row){
				this.$router.push({path:'/singer',query:{id:row.id}});
			},
			// 专辑点击跳转
			RouterSlbum(item){
				console.log(item)
				this.$router.push({path:'/album',query:{id:item.id}});
			},
			// 专辑点击跳转
			RouterMv(item){
				var newId =Object.keys (item.id)
				console.log(newId)
				if(newId <=8){
					this.$router.push({path:'/mypage',query:{id:item.id}})
				}else{
					this.$router.push({path:'/myvideo',query:{id:item.id}})
				}
			},
			// 歌单点击跳转
			RouterPage(item){
				this.$router.push({path:'/persong',query:{id:item.id}})
			},
		}
		
	}
</script>

<style scoped="scoped">
	.container{
		width: 100%;
		height: 560px;
		margin: 0px 20px 0px 20px;
		}
	.SearchHead{
		color: #1F1F1F;
		font-size: 21px;
		font-weight: 700;
		padding-bottom: 20px;
		margin-top: 20px;
	}	
	.container span:nth-child(1){
	padding-right: 10px;
	}
	>>>.el-tabs{
		width: 100%;
		height: 510px;
		
	}
	>>>.el-tabs__item{
		font-size: 16px;
		color: #323232;
		
		
	}
	>>>.el-tabs__item:hover{
		color: #676767;
		
	}
	>>>.el-tabs__item.is-active{
		font-size: 18px;
		color: #1F1F1F;
		font-weight: 700;
	}
	>>>.el-tabs__nav-wrap::after{
		background-color: #FFFFFF;
	}
	>>>.el-tabs__active-bar{
		background-color: #ec4141;
	}	
	.el-table{
		width: 100% !important;
		
		/* background-color: #0B58B0; */
	}
	>>>.el-table-column{
		height: 20px !important;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.scopeDs{
		display: flex;
	}
	.scopeDs img{
		width: 18px;
		height: 15px;
		padding: 10ox 10px;
		margin: 0px 3px;
		margin-top: 5px;
	}
	.SingerList-item{
		width: 100%;
		height: 80px;
		display: flex;
		margin-top: 10px;
		background-color: #efefef;
		cursor: pointer;
		/* justify-content: space-between; */
	}
	.SingerList-item:hover{
		background-color: #f7f7f7;
	}
	.singer-item-img{
		width: 70px;
		height:70px;
		border-radius: 12px;
		overflow: hidden;
		margin-top: 5px;
		margin-left: 10px;
		
	}
	.singer-item-img img{
		width: 100%;
		height: 100%;
	}
	.singer-Logo{
		overflow: hidden;
		width: 24px;
		height: 24px;
		margin-left: 70%;
		margin-top: 30px;
	}
	.singer-Logo img{
	width: 100%;
		height: 100%;
	}
	.SingerList-item span{
		margin-left: 10px;
		font-size: 15px;
		color: #5a5a5a;
		overflow: hidden;
	}
	.SingerList-item-span{
		width: 120px;
		height: 100%;
		line-height: 80px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		
	}
	.album-item{
		width: 100%;
		height: 90px;
		margin: 8px 0px;
		display: flex;
	}
	.album-item:hover{
		background-color: #C3C3C3;
	}
	.album-item-img{
		width: 90px;
		height: 85px;
		background-size: 100% 100%;
		background-image: url(../../../static/disc.png);
		position: absolute;
		margin-left: 20px;
	}
	.album-img-transparent{
		width: 75px;
		height: 75px;
		background-color: #515151;
		position: relative;
		border-radius: 5px;
		left: 2px;
		top: 3px;
		border: 2px solid #1F1F1F;
		opacity: 0.8;
	}
	.album-item-img img{
		position: relative;
		border-radius: 5px;
		width: 78px;
		height: 78px;
		top: -74px;
		left: -5px;
	}
	.album-word{
		width: 500px;
		height: 100%;
		margin-left: 120px;
		line-height: 90px;
		display: flex;
		justify-content: space-between;
		
	}
	.album-word span:nth-child(1){
		font-size: 15px;
		color: #414043;
	}
	.album-word span:nth-child(2){
		font-size: 14px;
		color: #333333;
	}
	.el-row{
		width: 96%;
		
		    display:flex;
		    flex-wrap: wrap;
		
	}
	.Col-span{
		/* background-color: #0B58B0; */
		margin-top: 20px;
	}
	.Mv-img{
		width: 100%;
		border-radius: 10px;
		overflow: hidden;
		max-height: 180px;
		min-width: 180px;
		cursor: pointer;
		position: relative;
		}
	.Mv-img img{
		width: 100%;
		height: 100%;
	}
	.Mv-word{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.Mv-PlayCount{
		position: absolute;
		z-index: 1;
		width: 80px;
		top: 5px;
		left: 75%;
		font-size: 12px;
		height: 30px;
		display: flex;
		font-size: 12px;
		color: #ffffff;
		overflow: hidden;
		white-space: nowrap;
		/* background-color: #0B58B0; */
	}
	.PlayCount-img{
		width: 12px;
		height: 12px;
		background-image: url(../../../static/24gl-play2.png);
		background-size: 100% 100%;
		margin-top: 2px;
	}
	.playList-item:hover{
		background-color: #eeeeee;
	}
	.playList-item{
		justify-content: space-between;
	}
	.PlayCount-time{
		position: absolute;
		z-index: 1;
		top: 82%;
		left: 82%;
		font-size: 12px;
		color: #FFFFFF;
	}
	.playList-img{
		width: 80px;
		/* height: 100px; */
		overflow: hidden;
		border-radius: 10px;
		margin: 0px 10px;
	}
	.playList-img img{
		width: 100%;
		height: 100%;
	}
	.playList-word{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 80px;
	}
	.word-name{
		width: 25%;
		/* background-color: #0B58B0; */
		font-size: 15px;
		color: #323232;
	}
	.Playlist-p{
		width: 8%;
		/* background-color: #1F1F1F; */
	}
	.Playlist-d{
		width: 20%;
		/* background-color: #EC4141; */
	}
	.playList-logo{
		width: 8%;
		display: flex;
		/* background-color: blue; */
	}.playList-logo-img{
		background-image: url(../../../static/24gl-play.png);
		background-size: 100% 100%;
		width: 13px;
		height: 13px;
		margin-top: 34px;
	}
</style>
