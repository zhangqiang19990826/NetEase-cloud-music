<template>
	<div class="container">
		<el-scrollbar style='height: 100%;'>
		<!-- 介绍 -->
		<div class="introduce">
			<!-- 图片 -->
			<div class="introduce-img">
				<img :src="SingerDetail.cover" />
			</div>
			<!-- 文字区域 -->
			<div class="introduce-word">
				<!-- 歌手 -->
				<p>{{SingerDetail.name}}</p>
				<!-- 按钮区域 -->
				 <el-button size="small" icon="el-icon-folder-opened" disabled round>添加收藏</el-button>
				  <el-button size="small" icon="el-icon-user" disabled round>歌手主页</el-button>
				<!-- 介绍 -->
				<div class="introduce-col">
					<span>单曲数:{{SingerDetail.musicSize}}</span>
					<span>专辑数:{{SingerDetail.albumSize}}</span>
					<span>MV数:{{SingerDetail.mvSize}}</span>
				</div>
			</div>
		</div>
		
		<!-- 标签页 -->
		<el-tabs v-model="activeName">
		    <el-tab-pane label="专辑" name="专辑">
				<el-row  class="row-bg" justify="end" :gutter="80">
				  <el-col style="cursor: pointer;" :span="6" v-for="(item,index) in SingerAlbum" :key='index' >
				  <!-- 单个 -->
				  <div @click="RouAlbum(item)" class="album-item">
				  	<!-- 封面图片 -->
				  	<div class="album-item-img">
				  		<!-- 透明框 -->
				  		<div class="album-img-transparent"></div>
				  		<img :src="item.blurPicUrl" />
				  	</div>
				  </div>
					<p @click="RouAlbum(item)" style="font-size: 15px;color: #323232;margin: 0px 0px 3px 0px;">{{item.name}}</p>
					<p style="font-size: 13px; color: #757575;">{{item.publishTime | formatTime}}</p>
				  </el-col>
				</el-row>
			</el-tab-pane>
			
			<!-- mv -->
		    <el-tab-pane label="MV" name="MV">
				
				<el-row class="row-bg" justify="end" :gutter="80">
				  <el-col  :span="6" :xs="24" v-for="(item,index) in SingerMv" :key="index" >
					  <div @click='RouterMv(item)' class="Col-span">
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
		    <el-tab-pane label="歌手详情" name="歌手详情">
				<!-- 标题 -->
				<p style="margin: 10px 0px;font-size: 18px;letter-spacing: 5px;font-weight: 700;">{{SingerDetails.artist.name}}简介</p>
				<!-- 内容区域 -->
				<p style="width: 96%; font-size: 15px;color: #616161; text-indent: 43px;letter-spacing: 5px;line-height: 27px;">
					{{SingerDetails.artist.briefDesc}}
				</p>
				<div v-for="(item,index) in Singerdescribe" :key="index">
					<p style="margin: 10px 0px;font-size: 18px;letter-spacing: 5px;font-weight: 700;">
					{{item.ti}}
					</p>
					<p style="width: 96%; font-size: 15px;color: #616161; text-indent: 43px;letter-spacing: 5px;line-height: 27px;">
						{{item.txt}}
					</p>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="相似歌手" name="相似歌手">
				<el-row :gutter="60">
					<el-col :span="6" v-for="(item,index) in SimilarSinger" :key="index"  style="margin-bottom: 40px; cursor: pointer;">
						<div class="SimilarSinger-img" @click='RouSinger(item)'>
							<img :src="item.picUrl" />
						</div>
						<span @click='RouSinger(item)' style="font-size: 18px; color: #424242;margin: 4px 0px;display: block;">{{item.name}}</span>
					</el-col>
				</el-row>
			</el-tab-pane>
		  </el-tabs>
		
		
		</el-scrollbar>
	</div>
</template>

<script>
	export default{
		inject: ['reload'],
		data(){
			return{
				// 接受穿过来的歌手ID
				Id:this.$route.query.id,
				// 歌手介绍存储
				SingerDetail:{},
				// 标签页绑定
				activeName:"专辑",
				// 专辑列表存储
				SingerAlbum:{},
				// MV列表存储
				SingerMv:{},
				// 当前页位置
				MvCurrentPage:1,
				// MV数量
				MvTotal:0,
				//偏移liang
				MvOffset:0,
				// 当前页条数
				MvPageSize:24,
				// 歌手详情存储
				SingerDetails:{
					artist:{
						name:'',
						briefDesc:'',
					},
				},
				// 歌手描述
				Singerdescribe:{},
				// 相似歌手存储
				SimilarSinger:{},
				
				
			}
		},
		created() {
			this.getSingerDetail()
			this.getSingerAlbum()
			this.getSingerDetails()
			this.getSingerDescribe()
			this.getSimilarSinger()
		},
		methods:{
			// Mv点击跳转
			RouterMv(item){
				// console.log(item)
				var newId =Object.keys (item.id) 
				// console.log(newId)
				if(newId.length <=9){
					this.$router.push({path:'/mypage',query:{id:item.id}})
				}else{
					this.$router.push({path:'/myvideo',query:{id:item.id}})
				}
			},
			// 歌手详情
			async getSingerDetail(){
			  const {data:res} = await this.$http.get('/artist/detail?id='+this.Id)
			// console.log(res)
			if(res.code == 200){
				this.SingerDetail = res.data.artist
				this.getSingerMv()
				// console.log(this.SingerDetail)
			}
			},
			// 歌手专辑
			getSingerAlbum(){
				this.$http.get('/artist/album',{params:{id:this.Id,limit:50}}).then(res =>{
				if(res.data.code == 200){
					this.SingerAlbum = res.data.hotAlbums
					// console.log(this.SingerAlbum)
				}
				})
			},
			// 获取MV列表
			getSingerMv(){
				this.$http.get('/search?keywords',{params:{keywords:this.SingerDetail.name,type:1004,limit:24,offset:(this.MvCurrentPage-1)*24}}).then(resd => {
				// console.log(resd)
				if(resd.status == '200'){
					this.SingerMv = resd.data.result.mvs
					this.MvTotal =  resd.data.result.mvCount
					// console.log(this.SingerMv)
					this.SingerMv.forEach(item => {
					    const dt = new Date(item.duration)
					    const mm = (dt.getMinutes() + '').padStart(2, '0')
					    const ss = (dt.getSeconds() + '').padStart(2, '0')
					
					    item.duration = mm + ':' + ss
					})
				}
				})
			},
			// Mv分页点击
			MvCurrentChange(val){
			 this.MvCurrentPage = val
				this.getSingerMv()
			},
			
			// 歌手详情
			async getSingerDetails(){
				const {data:res} = await this.$http.get('/artist/detail?id='+this.Id)
				// console.log(res)
				this.SingerDetails = res.data
				// console.log(this.SingerDetails)
			},
			// 歌手描述
			async getSingerDescribe(){
				const {data:res} = await this.$http.get('/artist/desc?id='+this.Id)
				this.Singerdescribe = res.introduction
				// console.log(this.Singerdescribe)
			},
			// 相似歌手
			async getSimilarSinger(){
				const {data:res} = await this.$http.get('/simi/artist?id='+this.Id)
				this.SimilarSinger = res.artists
				// console.log(this.SimilarSinger)
			},
			// 相似歌手点击跳转
			RouSinger(item){
				// console.log('dd')
				// console.log(item.id)
				this.$router.push({path:'/singer',query:{id:item.id}})
				this.reload()
			},
			// 专辑点击跳转
			RouAlbum(item){
				this.$router.push({path:'/Album',query:{id:item.id}})
			},
		}
	}
</script>

<style scoped="scoped">
	.container{
		width: 100%;
		height: 520px;
		margin: 0px 20px 0px 20px;
	}
	.introduce{
		display: flex;
		width: 100%;
		height:230px ;
		margin: 30px 0px;
	}
	.introduce-img{
		width: 230px;
		height: 230px;
		/* max-width: 180px; */
		border-radius: 8px;
		overflow: hidden;
		margin-right: 30px;
		box-shadow: 2px 2px 4px #515151;
		
	}
	.introduce-img img{
		width: 100%;
		height: 100%;
	}
	.introduce-word{
		width: 60%;
		height: 200px;
		/* background-color: #0B58B0; */
	}
	.introduce-word p:nth-child(1){
		width:100%;
		overflow: hidden;
		white-space: nowrap;
		font-size: 22px;
		font-weight: 800;
		margin-bottom: 20px;
		text-overflow: ellipsis;
	}
	.introduce-col{
		width: 100%;
		height: 105px;
	}
	.introduce-col span{
		line-height: 70px;
		color: #5A5A5A;
		font-size: 13px;
		margin: 0px 20px 0px 0px;
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
		.album-item{
			width: 100%;
			/* background-color: #0091EA; */
			height: 190px;
			margin: 8px 0px;
		}
		.album-item-img{
			width: 180px;
			height: 180px;
			background-size: 100% 100%;
			background-image: url(../../../static/disc.png);
			position: absolute;
			margin-left: 30px;
		}
		.album-img-transparent{
			width: 97%;
			height:100% ;
			background-color: #a3a3a3;
			position: relative;
			border-radius: 5px;
			left: -11px;
			top: -3px;
			margin-top: 10px;
			/* border: 2px solid #1F1F1F; */
			opacity: 0.5;
		}
		.album-item-img img{
			position: relative;
			border-radius: 5px;
			width: 100%;
			height: 100%;
			top: -100%;
			left: -25px;
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
			padding-right: 40px;
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
		.el-row{
			width: 96%;
			
			    display:flex;
			    flex-wrap: wrap;
			
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
		.SimilarSinger-img{
			width: 95%;
			height: 95%;
			border-radius: 8px;
			overflow: hidden;
		}
		.SimilarSinger-img img{
			width: 100%;
			height: 100%;
		}
</style>
