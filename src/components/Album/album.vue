<template>
	<div class="container">
		<el-scrollbar style='height: 100%;'>
			<!-- 头部 -->
			<div class="Album-head">
				<!-- 左侧 -->
				<div class="Album-head-left">
				<!-- 图片 -->
				<div class="Album-head-img">
					<!-- 模糊层 -->
					<div class="vague"></div>
					<!-- 图片 -->
					<img class="Album-head-img-imgs" :src="SingerAlbum.album.picUrl" />
				</div>
				</div>
				
				<!-- 右侧 -->
				<div class="Album-head-rg">
					<!-- 标题 -->
					<div class="Album-head-title">
						<!-- TYPE -->
						<div class="Album-title-type">{{SingerAlbum.album.type}}</div>
						<!-- 专辑nama -->
						<p>{{SingerAlbum.album.name}}</p>
					</div>
					
					<!-- 按钮区域 -->
					<div class="Album-Button">
						<el-button @click='OrSelected' icon="el-icon-caret-right" type="danger" round>播放全部</el-button>
						<el-button icon="el-icon-folder-add" disabled round>收藏(2222)</el-button>
						<el-button icon="el-icon-bottom" disabled round>下载全部</el-button>
					</div>
					
					<!-- 歌手 -->
					<div class="SingetName">
						<span>歌手:</span>
						<span>{{SingerAlbum.album.artists[0].name}}</span>
					</div>
					<!-- 时间 -->
					<div class="Album-time SingetName">
						<span>时间:</span>
						<span style="color: #5A5A5A;">{{SingerAlbum.album.publishTime | formatTime}}</span>
					</div>
				</div>
			</div>
			<!-- 标签页 -->
			<el-tabs v-model="activeName">
			    <el-tab-pane label="歌曲列表" name="歌曲列表">
					<!-- table表格 -->
					  <el-table
					      stripe
					      :data="SingerAlbum.songs"
						  :key="SingerAlbum.id"
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
						  prop="ar[0].name"
						  label="歌手"
						  width="220"
						  >	  
						  </el-table-column>
						  <el-table-column
						  prop="al.name"
						  label="专辑"
						  width="220"
						  >	  
						  </el-table-column>
						  <el-table-column
						  prop="dt"
						  label="时长"
						  width="280"
						  >	  
						  </el-table-column>
						  </el-table>
						  <!-- 分页 -->
				</el-tab-pane>
			    <el-tab-pane label="评论" name="评论">
					<!-- 头部 -->
					<p style="font-size: 19px;font-weight: 700; letter-spacing: 3px;margin: 10px 0px;">精彩评论</p>
				<!-- 列表 -->
				<div>
					<el-row>
						<el-col v-for="(item,index) in HotComment" :key="index" :span="24" style="margin-top: 10px;">
							<div style="width: 100%; height: 100%;padding-bottom: 18px; border-bottom: 1px solid #d4d4d4; display: flex;">
								<!-- 头像 -->
								<div class="comment-logo">
									<img :src="item.user.avatarUrl" />
								</div>
								<!-- 内容区域 -->
								<div class="comment-item">
									<!-- 用户和评论 -->
									<div class="comment-item-top">
										
										<!-- 内容 -->
										<p><!-- 用户名 -->
										<span>{{item.user.nickname}}</span> {{item.content}}</p>
									</div>
									<!-- 现场点评 -->
									<div v-for="(items,index) in item.beReplied" :key="index">
										<p class="ShowComment"><span>{{items.user.nickname}}:</span> {{items.content}}</p>
									</div>
									
									<!-- 时间 -->
									<div class="comment-item-button">
										<!-- time -->
										<div>{{item.timeStr}}  {{item.time |dateFormat}}</div>
										<!-- 图标 -->
										<div style="display: flex;">
											<div class="logo-item">
												<!-- 点赞 -->
												<div class="logo-likes">
													<img src="../../../static/dianzan.png" />
												</div>
												<span>{{item.likedCount}}</span>
											</div>
											
											<!-- 转发 -->
											<div class="logo-item">
												<div class="logo-likes">
													<img src="../../../static/zhuanfa.png" />
												</div>
											</div>
											
											<!-- 发言 -->
											<!-- 转发 -->
											<div class="logo-item">
												<div class="logo-likes">
													<img src="../../../static/fayan.png" />
												</div>
											</div>
										</div>
									</div>
									
								</div>
							</div>
							
						</el-col>
					</el-row>
				</div>
				
				<!-- 头部 -->
				<p v-if="playListCurrentPage == 1" style="font-size: 19px;font-weight: 700; letter-spacing: 3px;margin: 20px 0px;">最新评论</p>
				<!-- 列表 -->
				<div>
					<el-row>
						<el-col v-for="(item,index) in Comment" :key="index" :span="24" style="margin-top: 10px;">
							<div style="width: 100%; height: 100%;padding-bottom: 18px; border-bottom: 1px solid #d4d4d4; display: flex;">
								<!-- 头像 -->
								<div class="comment-logo">
									<img :src="item.user.avatarUrl" />
								</div>
								<!-- 内容区域 -->
								<div class="comment-item">
									<!-- 用户和评论 -->
									<div class="comment-item-top">
										
										<!-- 内容 -->
										<p><!-- 用户名 -->
										<span>{{item.user.nickname}}</span> {{item.content}}</p>
									</div>
									<!-- 现场点评 -->
									<div v-for="(items,index) in item.beReplied" :key="index">
										<p class="ShowComment"><span>{{items.user.nickname}}:</span> {{items.content}}</p>
									</div>
									
									<!-- 时间 -->
									<div class="comment-item-button">
										<!-- time -->
										<div>{{item.timeStr}}  {{item.time |dateFormat}}</div>
										<!-- 图标 -->
										<div style="display: flex;">
											<div class="logo-item">
												<!-- 点赞 -->
												<div class="logo-likes">
													<img src="../../../static/dianzan.png" />
												</div>
												<span>{{item.likedCount}}</span>
											</div>
											
											<!-- 转发 -->
											<div class="logo-item">
												<div class="logo-likes">
													<img src="../../../static/zhuanfa.png" />
												</div>
											</div>
											
											<!-- 发言 -->
											<!-- 转发 -->
											<div class="logo-item">
												<div class="logo-likes">
													<img src="../../../static/fayan.png" />
												</div>
											</div>
										</div>
									</div>
									
								</div>
							</div>
							
						</el-col>
					</el-row>
			
				</div>
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
			    <el-tab-pane label="专辑详情" name="专辑详情">
					<p v-if="playListCurrentPage == 1" style="font-size: 19px;font-weight: 700; letter-spacing: 3px;margin: 20px 0px;">专辑介绍</p>
					<p style="font-size: 18px;color: #8a8a8a;line-height: 30px; letter-spacing:3px;text-indent:2em;" v-for="(item,index) in marvellous" :key="index">{{item}}</p>
				</el-tab-pane>
			  </el-tabs>
			  
			  
			  
			  
			  
			  
		</el-scrollbar>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				// 接受传过来的专辑ID
				ID:this.$route.query.id,
				// 专辑动态信息存储
				AlbumInfomAtion:{},
				// 歌手专辑信息存储
				SingerAlbum:{
					album:{
						name:"",
						picUrl:"",
						type:"",
						publishTime:"",
						artists:[{
							name:'',
						}],
					},
					songs:[],
				},
				// 标签TABS绑定值
				activeName:"歌曲列表",
				// 所以ID组
				listId:[],
				// 第一个ID
				oneId:"",
				// 专辑分页当前页
				CommentCurrentPage:1,
				// 热门评论存储
				HotComment:{
					// beReplied:{
					// 	user:{
					// 		nickname:'',
					// 	},
					// 	content:'',
					// },
					// user:{
					// 	nickname:'',
					// 	avatarUrl:'',
					// },
				},
				// 评论存储
				Comment:{},
			
				// 专辑数据总条数
				playListTotal:0,
				// 专辑当前分页位置
				playListCurrentPage:1,
				// 专辑当前页条数
				playListPageSize:24,
				// 专辑详情内容存储
				marvellous:"",
			}
		},
		created() {
			// this.getAlbumInfomation()
			this.getAlbum()
		},
		methods:{
			// 获取专辑评论
			getComment(){
				this.$http.get('/comment/album',{params:{id:this.ID,limit:50,offset:(this.playListCurrentPage-1)*50}}).then(res =>{
					// console.log(res)
					if(res.data.code == 200){
						this.HotComment = res.data.hotComments
						// console.log(this.HotComment.beReplied.length)
						this.Comment = res.data.comments
						// console.log(this.HotComment)
						// console.log(this.Comment)
						this.playListTotal = res.data.total
					}
				})
			},
			// 获取专辑内容
			async getAlbum(){
				const {data:res} = await this.$http.get('/album?id='+this.ID)
				// console.log(res)
				if(res.code == 200){
					this.SingerAlbum = res
					this.marvellous = res.album.description.split('。')
					// res.album.description = this.marvellous.join()
					// console.log(res.album.description)
					this.SingerAlbum.songs.forEach(item => {
					    const dt = new Date(item.dt)
					    const mm = (dt.getMinutes() + '').padStart(2, '0')
					    const ss = (dt.getSeconds() + '').padStart(2, '0')
					
					    item.dt = mm + ':' + ss
					})
					// 遍历ID存储
					this.SingerAlbum.songs.forEach(item => {
						 // console.log(item.id)
						 this.listId.push(item.id)
						 // console.log(this.listId)
						 this.oneId = this.listId[0]						
						 // console.log(this.listId)
					})				
				}
				this.getComment()
			},
			// 获取专辑动态信息
			async getAlbumInfomation(){
				const {data:res} = await this.$http.get('/album/detail/dynamic?id='+this.ID)
				// console.log(res)
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
			// 评论分页
			playListCurrentChange(val){
			 this.playListCurrentPage = val
				this.getComment()
			},
			
			
			
		},
	}
</script>

<style scoped="scoped">
	.container{
		width: 100%;
		height: 560px;
		/* margin: 0px 0px 0px 20px; */
		}
		.Album-head{
			width: 96%;
			height: 280px;
			/* background-color: #0091EA; */
			margin: 25px 25px;
			display: flex;
			
		}
		.Album-head-left{
			width: 20%;
			min-width: 200px;
			height: 85%;
			overflow: hidden;
			/* background-color: #0091EA; */
		}
		.Album-head-img{
			width: 89%;
			height: 89%;
			background-image: url(../../../static/disc.png);
			background-size: 100% 100%;
			position: relative;
			margin-left: 20px;
		}
		.vague{
			width: 90%;
			height: 90%;
			background-color: #3E3E3E;
			position: absolute;
			z-index: 1;
			opacity: 0.4;
			top: 8PX;
			border-radius: 8PX;
		}
		.Album-head-img-imgs{
			width: 95%;
			height: 95%;
			position: absolute;
			z-index: 2;
			left: -20px;
			top: 3px;
			border-radius: 8px;
		}
		.Album-head-rg{
			margin-left: 30px;
		}
		.Album-title-type{
			height: 10px;
			color: #D50000;
			font-size: 12px;
			padding: 5px 5px;
			border: 1px solid #E13E3E;
			text-align: center;
			line-height: 10px;
			margin-top: 4px;
		}
		.Album-head-title{
			display: flex;
		}
		.Album-head-title p{
			width: 230px;
			font-size: 21px;
			letter-spacing: 3px;
			font-weight: 700;
			margin-left: 10px;
			/* background-color: #0091EA; */
		}
		.Album-Button{
			margin-top: 18px;
			padding-bottom:10px ;
		}
		.SingetName{
			width: 50%;
			height: 30px;
			/* background-color: #0091EA; */
			margin: 12px 0px;
			line-height: 30px;
			font-size: 14px;
			color: #5a5a5a;
		}
		.SingetName span:nth-child(1){
			padding-right: 10px;
		}
		.SingetName span:nth-child(2){
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #dc001a;
		cursor: pointer;
		}
		>>>.el-tabs{
			width: 96%;
			height: 510px;
			margin: 15px 25px;
			
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
		.comment-logo{
			width: 45px;
			height: 45px;
			margin: 0px 10px;
			border-radius: 50%;
			overflow: hidden;
		}
		.comment-logo img{
			width: 100%;
			height: 100%;
		}
		.comment-item{
			width: 93%;
			height: 100%;
			/* background-color: #0091EA; */
			
		}
		.comment-item-top{
			display: flex;
			width: 100%;
			/* height: 30%; */
			/* background-color: #0091EA; */
		}
		.comment-item-top span{
			color: #0091EA;
			font-size: 14px;
			max-width:120px;
			/* background-color: #0091EA; */
			height: 20px;
			padding-right: 10px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.comment-item-top p{
			color: #444444;
			font-size: 14px;
			width:92%;
			/* background-color: #0091EA; */
			word-wrap:break-word;
			/* background-color: #0091EA; */
			padding-right: 10px;
			/* overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis; */
		}
		.comment-item-button{
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-top: 10px;
			font-size: 13px;
			color: #b3b3b3;
		}
		.ShowComment{
			background-color: #ececec;
			font-size: 13px;
			color: #bfbfbf;
			padding: 10px 0px;
			margin-top: 7px;
			border-radius: 8px;
			
		}
		.ShowComment span{
			color: #0091EA;
			font-size: 13px;
			/* display: block; */
			max-width:120px;
			/* background-color: #0091EA; */
			padding-right: 10px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.logo-item{
			padding: 0px 10px;
			height: 15px;
			display: flex;
			/* background-color: #0091EA; */
			border-right: 1px solid #818181;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.logo-likes{
			width: 15px;
			height: 15px;
			/* background-color: #0091EA; */
			display: flex;
			font-size: 12px;
			
		}
		.logo-likes img{
			width: 100%;
			height:100%;
		}
		
</style>

