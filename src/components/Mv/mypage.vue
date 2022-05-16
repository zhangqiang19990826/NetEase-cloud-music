<template>
<div class="container">
	<el-scrollbar style='height: 100%;'>
		<div style="display: flex;">
		<!-- MV详情盒子 -->
		<div class="Mymv">
			<h3 style="margin-bottom: 10px;">MV详情</h3>
			
			
			<!-- 视频 -->
			<video width="700" height="380" :src="mvUrl" controls="controls">		
			</video>
			
			<!-- 头像 -->
			<div class="portrait">
				<div class="headPortrait">
					<img :src="SingerData.artist.cover" />
				</div>
				
				<p>{{SingerData.artist.name}}</p>
			</div>
			<!-- 歌曲名 -->
			<div class="MV-MusicName">
				<span>{{MvData.name}}</span>
				<div v-if="buttonState" @click="ButtonState" class="MV-MusicName-img"><img src="../../../static/xiajiantou.png"/></div>
				<div v-else @click="ButtonState" class="MV-MusicName-img"><img src="../../../static/shangjiantou.png"/></div>
				</div>
			<!-- 发布时间 -->
			<div class="Mvtime">
				<p><span>发布:</span><span>{{MvData.publishTime}}</span> </p>
				<p style="margin-left: 20px;"><span>播放:</span><span>{{MvData.playCount | formatCount}}</span> </p>
			</div>
			
			<!-- 介绍 -->
			<div v-if="wordState" class="Mv-introduce">
				<p>{{MvData.desc}}</p>
				
			</div>
			
			<!-- 评论 -->
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
				
		</div>		
		
		
		
		
		
		
		
		
		
		
		
		
		<!-- 推荐Mv盒子 -->
		<div class="recommendMv">
			<h3 style="margin-bottom: 10px;">相关推荐</h3>
			
			<!-- 便利 -->
			<div class="recommendItem" v-for="(item,index) in recommendList" :key="index" @click="RoutePage(item)">
				<!-- 图片 -->
				<div class="recommendImg">
					<img :src="item.coverUrl" />
				</div>
				<!-- 文字 -->
				<div class="recommendWord">
					<!-- 歌名 -->
					<div class="recommendWord_p">
						<p>{{item.title}}</p>
					</div>
					<!-- 歌手 -->
					<p style="font-size: 14px; color: #999999;">{{item.creator[0].userName}}</p>
				</div>
			</div>
		</div>
		
		
		
		</div>
	</el-scrollbar>
</div>
</template>

<script>
	export default{
		inject: ['reload'],
		data() {
			return{
				// MVid
				ID:this.$route.query.id,
				// Mb地址
				mvUrl:'',
				// Mv数据
				MvData:{},
				// 歌手ID
				singrt:0,
				// 储存歌手信息
				SingerData:{
					artist:{
						cover:'',
					}
				},
				// 按钮状态
				buttonState:true,
				// 文本状态
				wordState:false,
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
				// 相关推荐存储
				recommendList:{},
			}
		},
		created() {
			this.getMvUrl()
			this.getMvData()
			this.getComment()
			this.MSimiv()
		},
		methods:{
			// 获取Mv地址
			async getMvUrl(){
			const {data:res} = await this.$http.get('/mv/url?id='+this.ID)
			// console.log(res)	
				this.mvUrl = res.data.url
				// console.log(this.mvUrl)	
			},
			// 获取MV数据
			async getMvData(){
				const {data:res} = await this.$http.get('/mv/detail?mvid='+this.ID)
				console.log(res)
				if(res.code== 200){
					this.MvData = res.data
					this.singrt = res.data.artists[0].id
					
					// 获取歌手详情
					this.$http.get('/artist/detail?id='+this.singrt).then(resd =>{
						// console.log(resd)
						this.SingerData = resd.data.data
						// console.log(this.SingerData)
					})
				}
			},
			// 按钮状态变化
			ButtonState(){
				this.buttonState = !this.buttonState
				// console.log(this.buttonState)
				this.wordState = !this.wordState
				// console.log(this.wordState)
			},
			// 获取专辑评论
			getComment(){
				this.$http.get('/comment/mv',{params:{id:this.ID,limit:50,offset:(this.playListCurrentPage-1)*50}}).then(res =>{
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
			// 评论分页
			playListCurrentChange(val){
			 this.playListCurrentPage = val
				this.getComment()
			},
			// 相关推荐
			async MSimiv(){
				const {data:res} = await this.$http.get('/related/allvideo?id='+this.ID)
				// console.log(res)
				if(res.code == '200'){
					this.recommendList = res.data
				}
			},
			// 相关推荐跳转
			RoutePage(item){
				// console.log(item)
				var newId =Object.keys (item.vid)
				if(newId <=8){
					this.$router.push({path:'/mypage',query:{id:item.vid}})
				}else{
					this.$router.push({path:'/myvideo',query:{id:item.vid}})
				}
		this.reload()
			},
			
		}
	}
</script>

<style scoped="scoped">
	.container{
		width: 1250px;
		height: 562px;
		/* // background-color: #0091EA; */
		margin: 0px 20px 0px 20px;
		margin: 0 auto;
		/* // background-color: #F1B0B7; */
	}
	.Mymv{
		width: 55%;
		 /* // background-color: #0091EA; */
		height: 50px;
		margin-top:20px;
		padding-right: 3%;
	}
	 h3{
		color: #373737;
	}
	
	.portrait{
		display: flex;
		margin-top: 15px;
	}
	.headPortrait{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
	}
	.headPortrait img{
		width: 100%;
		height: 100%;
	}
	.portrait p{
		color: #8b8b8b;
		font-size: 14px;
		width: 150px;
		line-height: 60px;
		overflow:hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 15px;
	}
	.MV-MusicName{
		display: flex;
		color: #353535;
		font-size: 25px;
		font-weight: 600;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.MV-MusicName-img{
		width: 20px;
		height: 25px;
		/* // overflow: hidden; */
		cursor: pointer;
		margin-left: 9px;
		margin-top: 5px;
	}
	.MV-MusicName-img img{
		width: 100%;
		height: 100%;
	}
	.Mvtime{
		display: flex;
		color: #cabcca;
		font-size: 13px;
	}
	.Mvtime p{
		overflow: hidden;
		text-overflow:ellipsis ;
		white-space: nowrap;
	}
	.Mvtime p span{
		padding-right:5px ;
	}
	.Mv-introduce{
		width: 100%;
		margin: 10px 0px;
		font-size: 14px;
		color: #424242;
		height: 60px;
		
		
	}
	.Mv-introduce p{
		width: 100%;
		height: 60px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
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
	.recommendMv{
		width: 35%;
		/* // background-color: #000000; */
		margin-top:20px;
		padding-left: 30px;
	}
	.recommendItem{
		width: 100%;
		display: flex;
		margin-top: 15px;
		/* background-color: #000000; */
	}
	.recommendImg{
		width: 40%;
		height: 120px;
		border-radius: 15px;
		overflow: hidden;
	}
	.recommendImg img{
		width: 100%;
		height: 100%;
	}
	.recommendWord{
		width: 48%;
		margin-left: 15px;
	}
	.recommendWord_p{
	width: 100%;
	margin: 10px 0px;
	font-size: 17px;
	color: #1e1e1e;
	height: 60px;
	}
	.recommendWord_p p{
	width: 100%;
	height: 50px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	}
</style>
