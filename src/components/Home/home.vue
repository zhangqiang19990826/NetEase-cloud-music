<template>
	<div>
		<el-container>
		 <!-- 头部 -->
		  <el-header>
			  <div class="header">
				  <div class="header-one">
				  <div class="header-img">
					  <img src="../../../static/logo1.png" />
				  </div>
				  <p>网易云音乐</p>
				  </div>
				  
				  <!-- 输入框 -->
				  
				    <el-popover
				      placement="bottom"
				      
				      width="350"
				      trigger="click"
				      >
				      
				      	<!-- 头部 -->
				      	<div v-if="InputModel==''">
				      		<span style="color: #9f9f9f;">搜索历史</span>
				      		<span @click="DetaClick" style="color: #9f9f9f;cursor: pointer;" class="el-icon-delete-solid cardDete"></span>
				      	<div class="cardSpan">
				      		<p v-for="(item,index) in cardinput" :key="index">{{item}}</p>
				      	</div>
				      	</div>
				      	<div class="containers">
				      	<el-scrollbar style='height: 400px;'>
							<!-- 热搜榜 -->
				      		<div v-if="InputModel==''">
				      			<p style="color: #1F1F1F;font-size: 18px;">热搜榜</p>
				      			<div style="margin-top: 20px;" >
				      				<!-- 单 -->
				      					<div class="HoutItem" v-for="(item,index) in musicHst" :key="index" @click="RouteSearchPagey(item)">
				      					
										<!-- 索引 -->
				      					<div class="HoutItem-Index" :class="{spanColor : index <3}">{{index+1}}</div>
				      					<!-- 右侧内容 -->
				      					<div class="HoutItem-rg">
				      						<!-- top盒子 -->
				      						<div class="HoutItem-rg-top">
				      							<!-- 歌名 -->
				      							<span>{{item.searchWord}}</span>
				      							<!-- 热度 -->
				      							<span>{{item.score}}</span>
				      						</div>
				      						<!-- button盒子 -->
				      						<div class="HoutItem-rg-btn">
				      							<p>{{item.content}}</p>
				      						</div>
				      					</div>
				      					</div>
				      			</div>   			
				      		</div>
							<!-- 关键字搜索 -->
							<div v-else>
								<p style="color: #8f8f8f;font-size: 18px;">猜你想搜</p>
								<div style="color: #767676; font-size: 17px;margin-top: 5px;margin-bottom: 5px; background-color: #e3e3e3; width: 100%;height: 30px;line-height: 30px;">单曲</div>
								<!-- 单曲遍历 -->
								<div class="KyeWrodItem" v-for="(item,index) in SongRecommend" :key="index" @click="RouteSearchPage(item)">

									<p>{{item.name}}</p>
									<p>{{item.artists[0].name}}</p>
								</div>
								
								<div style="color: #767676; font-size: 17px;margin-top: 5px;margin-bottom: 5px; background-color: #e3e3e3; width: 100%;height: 30px;line-height: 30px;">歌手</div>
								<!-- 歌手遍历 -->
								<div class="KyeWrodItem" v-for="item in Singer" :key="item.id" @click="RouterSinger(item)">
								
									<p>{{item.name}}</p>
									
								</div>
							</div>
				      	</el-scrollbar>
				      	</div>
				    
					  <el-input
					  		class="textarea"
							slot="reference"
					  		@focus="FocusInput"
							v-model="InputModel"
							@input = 'Inputdd'
					  		@blur="BlurInput"
							@keyup.enter.native='RouteSearchPages(InputModel)'
					       placeholder="请输入内容"
					       prefix-icon="el-icon-search"
					  >
					     </el-input>
				    </el-popover>					
					
					<!--右侧登录区域-->
					            <div class="rightContainer" style="display: flex">
					                <img v-if="currentUserInfo === null" src="../../../static/user.png" class="userIcon">
					                <img v-else :src="currentUserInfo.avatarUrl" class="userIcon">
					
					                <span v-if="currentUserInfo === null" style="cursor:pointer;line-height: 70px;color: #9c9c9c;margin-left: 5px;" @click="handleLogin">
					                    未登录
					                </span>
					
					                <span v-else style="color: #FFFFFF;line-height: 70px;">
					                    {{currentUserInfo.nickname}}
					                </span>
					                <el-button type="danger" @click="logout" v-if="currentUserInfo !== null" size="mini"
					                           style="height: 45px;overflow: hidden; margin-top: 20px;margin-left: 5px;">
					                    退出
					                </el-button>
					            </div>
					<p style="font-size: 18px;color: #FFFFFF;line-height: 70px;overflow: hidden;white-space:nowrap;">仿网易云音乐PC端 -- 余白</p>
			  </div>
		  </el-header>
		 <!-- 左侧 -->
		  <el-container>
		    <el-aside width="230px">
				<el-scrollbar style='height: 560px;'>
				<el-menu
				      default-active="2"
				      class="el-menu-vertical-demo"	
				      >
				      <el-menu-item index="2" @click = 'menuClick'>		        
				        <span slot="title">发现音乐</span>
				      </el-menu-item>
						<el-menu-item index="3">
						  <span slot="title">博客</span>
						</el-menu-item>
						<el-menu-item index="4">
						  <span slot="title">视频</span>
						</el-menu-item>
						<el-menu-item index="5">
						  <span slot="title">朋友</span>
						</el-menu-item>
						<el-menu-item index="6">
						  <span slot="title">直播</span>
						</el-menu-item>
						<el-menu-item index="7">
						  <span slot="title">私人FM</span>
						</el-menu-item>
						<p>我的音乐</p>
						<el-menu-item v-for="(item,index) in currentUserPlayList" :index="item.name" :key="index" @click='ItemClick(item)'>
						<!-- <span slot='title'>dd</span> -->
							<span slot="title" style="font-size: 15px;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; width:190px;">{{item.name}}</span>
						</el-menu-item>
				    </el-menu>
					</el-scrollbar>
			</el-aside>
			<!-- 内容 -->
		    <el-container >
		      <el-main style="height:100%">
				  <router-view @personglist='personglist'></router-view>
			  </el-main>
		    </el-container>
			<!-- 底部 -->
		  </el-container>
		  <el-footer>
			  
			  <div class="homeFooter">
				  <!-- 图标区域 -->
				  <div class="footerImg">
					  <!-- 图标 -->
					  <div   v-if="isPlay" class="footer-img">
						  <img :src="musicImg.al.picUrl" />
					  </div>
					  <!-- 文字 -->
					  <div  v-if="isPlay" class="footerImg-word">
						  <p>{{musicImg.name}}</p>
						  <p>{{musicImg.ar[0].name}}</p>
					  </div>
				  </div>
					  
					  <!-- 按钮 时间线区域 -->
					  <div class="footer-item">
						  <!-- 切换按钮 -->
						  <div class="footer-switch">
							
							<!-- 上一首 -->
							<div @click="changeLastMusic()" class="switchButton switch-last"></div>
							<!-- 暂停|播放 -->
							
							<div v-if="isPlays" @click="changePausedMusic()" class="switchButton switch-playTrue"></div>
							<div v-else @click="changePlaydMusic()" class="switchButton switch-play"></div>
							<!-- 下一首 -->
							<div class="switchButton switch-next" @click="changeNextMusic()"></div>
						  </div>
						  <!-- 进度条 -->
						  <div class="footer-time">
							  <span>{{musicDuration|musicTime}}</span>
							  <div class="block">
							      <el-slider v-if="isPlay" @change='sliderChange()' :max="totalDuration" v-model="musicDuration"></el-slider>
								  <el-slider v-else disabled></el-slider>
							    </div>
							<span>{{totalDuration|musicTime}}</span>	
						  </div>
					  </div>
					  
					  
					  <!-- 歌曲列表按钮 -->
					  <div class="footerMusicList" style="width: 300px;">
						  
						  <el-popover
						    placement="top"
						    width="400"
						    trigger="click">
							<p style="font-size: 20px;color: #1F1F1F;font-weight: 800;">当前播放</p>
							<div style="display: flex;margin-top: 5px;">
								<span style="font-size: 12px;color: #918f95;">共{{TableList.length+1}}首</span>
							</div>
							<el-scrollbar style="height:380px">
						   <el-table
						   class="table"
								:row-class-name="tableRowClassName"
						       :data="TableList"
							   :row-style="RowStyle"
						       @row-dblclick="dbSelected"
							  
						       style="width: 100%">
							   <el-table-column
							   type="index"
							   >
								   
							   </el-table-column>
						       <el-table-column
						         prop="name"
						         label="歌曲名"
						         width="180">
						       </el-table-column>
						       <el-table-column
						         prop="ar[0].name"
								 width="120"
						         label="歌手">
						       </el-table-column>
							   <el-table-column
							     prop="dt"
							     label="时长"
							     width="100">
								 </el-table-column>
						     </el-table>
							 </el-scrollbar>
							<button @click="getMusiclist()" class="Msiclitbutton" slot='reference'>
								<div v-if="isPlay" class="MUsicListime"></div>
								 <div v-else class="MUsicListimg"></div>
							</button>
						   
						  </el-popover>
						  
						 
					  </div>
					  <!-- 音乐 -->
						<audio :src="musicUrl" autoplay="autoplay" class="playMusicAudio" ></audio>
			  </div>
			  
			  <!-- 播放按钮 -->
			  
			  
			  
		  </el-footer>
		</el-container>
		
		<!--登录界面的弹出-->
		        <el-dialog
		            :visible.sync="loginDialogVisible"
		                width="30%" @close="handleLoginDialogClosed">
		            <div>
		                <img src="../../../static/109951165806093811.jpg" style="display: block;margin: 0 auto" alt="">
		                <el-form :model="loginInfo" :rules="loginInfoRules" ref="loginInfoRuleForm" style="margin-top: 25px;">
		
		                    <el-form-item prop="phone">
		                        <el-input style="display: block;margin:0 auto;width: 60%" prefix-icon="el-icon-user"
		                                  v-model="loginInfo.phone" placeholder="请输入手机号"></el-input>
		
		                    </el-form-item>
		
		                    <el-form-item prop="password">
		                        <el-input style="display: block;margin:0 auto;width: 60%" show-password
		                                  prefix-icon="el-icon-lock" v-model="loginInfo.password" type="password"
		                                  placeholder="请输入密码"></el-input>
		                    </el-form-item>
		                </el-form>
		                <el-button @click="loginMusic" type="danger"
		                           style="background-color: red;width: 60%;display: block;margin: 0 auto">登录
		                </el-button>
		            </div>
		
		        </el-dialog>
				

	</div>
</template>

<script>
	
	export default{
		inject: ['reload'],
		data() {
			return{
				circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',	
					unikey:'',
					qrimg:true,
					loginImg:'',
					 showRightPlayListDialog: false,
					                //展示登录的对话框
					                loginDialogVisible: false,
					                //登录的信息
					                loginInfo: {
					                    phone: '',
					                    password: ''
					                },
					                //登录的校验规则
					                loginInfoRules: {
					                    phone: [
					                        {required: true, message: ' ', trigger: 'blur'}
					                    ],
					                    password: [
					                        {required: true, message: ' ', trigger: 'blur'}
					                    ]
					                },
					                //当前用户的用户信息
					                currentUserInfo: window.localStorage.getItem('currentUserInfo') === 'null' ? null : JSON.parse(window.localStorage.getItem('currentUserInfo')),
									//播放列表
									playListInfo: window.localStorage.getItem('playList') === null ? [] : window.localStorage.getItem('playList').split(','),
									// 选中歌曲详细
									musicImg:{
										al:{
										name:'',					
										picUrl:'',	
										},
										ar:[{
										
										}],
										
									},
									// 选中歌曲url
									musicUrl:'',
									// 总进度条
									totalDuration:0,
									// 当前音乐ID
									ids:0,
									// 当前实时音乐进度
									musicDuration:0,
									// 播放状态
									isPlay:false,
									// 暂停状态
									isPlays:false,
									// 当前音乐下标
									soloLength:0,
									cacheCurrent:0,
									// 音乐列表状态
									musicList:false,
									// 音乐列表
									TableList:[],
									// 搜索弹出框
									musicCard:false,
									// 本地历史记录数据
									cardinput:window.localStorage.getItem("MusicWord")  === null ? [] : window.localStorage.getItem("MusicWord").split(','),
									// 暂存历史记录
									cardInputs:[],
									musicHst:{},
									// 搜索数据绑定
									InputModel:'',
									// 热搜版状态
									HoutState:true,
									// 搜索单曲推荐数据
									SongRecommend:{},
									// 搜索歌手推荐数据
									Singer:{},
									// 私人歌单
									currentUserPlayList:[],
					
			}
		},
		created() {
			// this.getMusiclist()
			this.getUserPrivatePlayList()
		},
		methods:{
			menuClick(row){
				console.log(row)
				// console.log('ddd')
				this.$router.push('/2')
			},
			ItemClick(row){
				// console.log(row)
				this.$router.push({path:'/persong',query:{id:row.id}})
				this.reload()
			},
			// 历史记录删除
			DetaClick(){
				localStorage.removeItem('MusicWord')
				this.cardinput = null
			},
			// 搜索回车事件
			EnterMusic(){
				// 获取input
				// let cardinput = $('.textarea')
				
				if(this.cardInputs.length>7){
					this.cardInputs.length = 7
					// console.log(this.cardinput)
				}else{
					if(this.InputModel==''){
						return false
					}
					for(var i=0;i<=this.cardInputs.length;i++){
						if(this.InputModel ==this.cardInputs[i]){
							return false
						}
					}
					this.cardInputs = this.cardinput
					this.cardInputs.push(this.InputModel)
					// this.cardInputs[cardInputLe+1].push(this.InputModel)
					// this.cardInputs.splice(0,0,this.InputModel)
					localStorage.setItem("MusicWord",this.cardInputs)
					this.cardinput = localStorage.getItem("MusicWord").split(',')
				}
				
				
				// console.log(this.cardInputs)
				
			},
			//设置audio的各种信息
			setAudioTagsInfo() {
			    let audio = $('.playMusicAudio')[0]
			
			    //监听audio的timeUpdate事件
			    audio.addEventListener("timeupdate", () => {
			        //获取歌曲的总长度 example: 257s
			        this.totalDuration = Number(audio.duration.toFixed(0)) 
					// console.log(this.totalDuration)
			        //获取歌曲时间
			        this.musicDuration = Number(audio.currentTime.toFixed(0)) 
					// console.log(this.musicDuration)
					// console.log(toString(this.musicDuration))
			
			        //当前歌曲播放完毕自动播放下一首
			        if (audio.currentTime >= audio.duration) {
			            this.changeNextMusic()
						
			        }
			    });
			    //更新音乐播放状态
			    this.isPlay = true
			    this.isPlays = true
			},
			// 循环跳转下一首
			 changeNextMusic(){
				 this.isPlay = true
				var i = this.playListInfo.length
				var id = this.ids
				// console.log('分割线')
				// console.log(i)
				// console.log(this.playListInfo[i])
				while (i--) {
				        if (this.playListInfo[i] == this.ids) {
				            // return i;
							this.soloLength = i
							// console.log(this.soloLength)
							break
				        }
				    }
					if(this.soloLength == this.playListInfo.length-1){
						this.soloLength =-1
					}
					// console.log(this.playListInfo.length)
					// console.log(this.soloLength)
					this.ids = this.playListInfo[this.soloLength+1]
					
					this.personglist(this.playListInfo,this.ids)
					
			},
			// 跳转上一首
			 changeLastMusic(){
				 this.isPlay = true
				 this.isPlays = true
				var i = this.playListInfo.length
				var id = this.ids
				// console.log('分割线')
				// console.log(i)
				// console.log(this.playListInfo[i])
				while (i--) {
				        if (this.playListInfo[i] == this.ids) {
				            // return i;
							this.soloLength = i
							// console.log(this.soloLength)
							break
				        }
				    }
					if(this.soloLength == 0){
						this.soloLength =this.playListInfo.length
					}
					this.ids = this.playListInfo[this.soloLength-1]
					
					this.personglist(this.playListInfo,this.ids)
					
			},
			// 音乐暂停
			changePausedMusic(){
				let audio = $('.playMusicAudio')[0]
				audio.pause()
				this.isPlays = false
			},
			// 音乐播放
			changePlaydMusic(){
				if(this.isPlay==false){
					
				}else{
					let audio = $('.playMusicAudio')[0]
					audio.play()
					this.isPlay = true
					this.isPlays = true
				}	
				
			},
			// 进度条拖拽事件
			sliderChange(){
				let audio = $('.playMusicAudio')[0]
				this.cacheCurrent = this.musicDuration
				  audio.currentTime = this.cacheCurrent
					   },
			 //点击未登录按钮
			            handleLogin() {
			                this.loginDialogVisible = true
			            },
						// 打开音乐列表
						openMusicList(){
							this.musicList = true
						},
					tableRowClassName ({row, rowIndex}) {
					        //把每一行的索引放进row
					        row.index = rowIndex;
					     },
						// 音乐列表行点击
						onRowclick(row,event,column){
							// console.log(row)
							// console.log(event)
							// console.log(column)
						},
						dbSelected(row){
							this.ids = row.id
							this.personglist(this.playListInfo,this.ids)
						},
						// 选中行样式
						RowStyle({row,rowIndex}){
							// console.log(rowIndex)
							if(this.ids == row.id){
								return{
									"background-color": "#d6d6d6",
									"color":"#ff0000"
								}
							}
						},
			            //点击登录
			            loginMusic() {
			                this.$refs.loginInfoRuleForm.validate(valid => {
			                    if (!valid) return this.$message.error('请填写正确的信息')
			                    this.$http.get('login/cellphone', {params: this.loginInfo}).then(res => {
			                        if (res.status !== 200) return this.$message.error('登陆失败,请检查登录信息!')
			                        //保存cookie的信息
									window.localStorage.setItem('token', res.data.token)
			                        window.localStorage.setItem('musicCookie', res.data.cookie)
			                        //保存用户信息,退出时删除
			                        window.localStorage.setItem('currentUserInfo', JSON.stringify(res.data.profile))
			                        //放入用户的信息
			                        this.currentUserInfo = res.data.profile
									// console.log(this.currentUserInfo)
			                        this.getUserPrivatePlayList()
			
			                        //隐藏弹窗
			                        this.loginDialogVisible = false
			                    })
			                })
			            },
			            //查询用户私人歌单
			            getUserPrivatePlayList() {
			                this.$http.get('/user/playlist', {params: {uid: this.currentUserInfo.userId}}).then(r => {
			                  
								this.currentUserPlayList = r.data.playlist
								// console.log(this.currentUserPlayList)
								
								this.$http.get('/login/status').then(res =>{
									// console.log(res)
								})
			                })
			            },
						
						
			            //重设登录框的表单信息
			            handleLoginDialogClosed() {
			                this.$refs.loginInfoRuleForm.resetFields();
			            },
			            //退出登录
			            logout() {
			                this.$http.get('logout').then(res => {
			                    //当前用户信息设置为null
			                    this.currentUserInfo = null
			                    //存储用户信息的localstorage设置为null
			                    window.localStorage.setItem('currentUserInfo', null)
			                    //查询出来的用户私人歌单设置为空
			                    this.currentUserPlayList = []
			                })
			            },
						// // 音乐进度发生变化
						// DurationChange(){
						// 	var a = 0
						// 	console.log(+a)
							
						// 	this
							
							
						// },
						// 接收歌单穿过来的参数
						async personglist(list,ids){
							// console.log(list)
							// console.log(ids)
							this.playListInfo = list
							//将当前歌单信息放入localStorage
							window.localStorage.setItem('playList', list)
							// console.log(this.playListInfo)
							const {data:res} =  await this.$http.get('/song/detail?ids='+ids)
							// console.log(res)
							if(res.code =='200'){
								this.musicImg = res.songs[0]
								// console.log(this.musicImg)
							}
							const {data:resr} = await this.$http.get('/song/url?id='+ids)
							// console.log(res)
							this.musicUrl = resr.data[0].url
							this.ids = ids
							this.setAudioTagsInfo()
							// console.log(this.musicUrl)
							// this.$props('ddd',this.ids)
						},
						
						// 歌曲列表
						async getMusiclist(){
							const {data:res} = await this.$http.get('/song/detail?ids=' +this.playListInfo)	
							// console.log(res.songs)
							if(res.code == '200'){
								this.TableList =res.songs
								// console.log(this.TableList)
								this.TableList.forEach(item => {
								    const dt = new Date(item.dt)
								    const mm = (dt.getMinutes() + '').padStart(2, '0')
								    const ss = (dt.getSeconds() + '').padStart(2, '0')
								
								    item.dt = mm + ':' + ss
								})
							}
						},
						// 图标点击跳转歌曲单页
						RootMusicSong(){
							this.$router.push({path:'/musicSolo',query:{id:this.ids}});
						},
						// 音乐输入框获得焦点
						FocusInput(){
							this.getHot()
						},
						// 音乐输入框失去焦点
						BlurInput(){
							// this.musicCard = false
						},
						// 输入框值变化
						 Inputdd(){
							 // 收索歌手
							 this.$http.get('/search?keywords',{params:{keywords:this.InputModel,type:100}}).then((res)=>{
								 if(res.data.code==200){
									 // console.log(res)
									 // res.data.result.artists.length=9
									 this.Singer = res.data.result.artists
									 
									 // console.log(this.Singer)
								 }
							 })
							 // 收索歌曲
							 this.$http.get('/search?keywords',{params:{keywords:this.InputModel,type:1}}).then((res)=>{
							 	 if(res.data.code==200){
									 // console.log(res)
									 if(res.data.result.songs.length > 9){
										 res.data.result.songs.length = 9
									 }
							 		 this.SongRecommend = res.data.result.songs
							 		 
							 	 }
							 })
						},
						
						// 热搜榜接口
						async getHot(){
							const{data:res} = await this.$http.get('/search/hot/detail')
							// console.log(res)
							if(res.code == '200'){
								this.musicHst = res.data
								// console.log(this.musicHst)
							}
						},
						// 搜索歌区点击跳转
						RouteSearchPage(item){
							// console.log(item)
							this.$router.push({path:'/searchPage',query:{id:item.id,name:item.name}})
							this.reload()
						},
						// 歌手区点击跳转
						RouterSinger(item){
							console.log(item)
							this.$router.push({path:'/singer',query:{id:item.id}})
							this.reload()
						},
						// 搜索歌区回车跳转
						RouteSearchPages(name){
							// console.log(item)
							this.$router.push({path:'/searchPage',query:{name:name}})
							this.reload()
							this.EnterMusic()
						},
						// 热搜榜点击跳转
						RouteSearchPagey(item){
							console.log(item)
							this.InputModel = item.searchWord
							this.$router.push({path:'/searchPage',query:{name:item.searchWord}})
							this.reload()
						},
						
			},			
			
		
	} 
</script>

<style scoped="scoped">
	.el-container{
		
		/* background-color: #0B58B0; */
	}
.el-header{
		height: 70px !important;
		background-color: #ec4141;
	}
	.header{
		width:100%;
		display: flex;
	}
	.header-one{
		width: 200px;
		min-width: 180px;
		height: 100%;
		display: flex;
		font-size: 20px;
		color: #FFFFFF;
		letter-spacing: 3px;
	}
	.header-img{
		width: 40px;
		height: 40px;
		background-color: #ffffff;
		border-radius: 50%;
		overflow: hidden;
		margin-top: 15px;
		margin-right: 15px;
	}
	.header-img img{
		width: 70%;
		height: 70%;
		text-align: center;
		background-size: cover;
		margin-top: 5px;
		margin-left: 5px;	
	}
	.header-one p{
		line-height: 70px;
	}
.el-aside{
	/* height: auto; */
  }
.el-header .el-input{
	min-width: 100px;
	width: 160px;
	height: 20px !important;
	margin-top: 15px;
	/* margin-right: 50%; */
}
.textarea>>>.el-input__inner{
  	  font-size: 12px!important;
	  height: 40px !important;
	  background-color: #e13e3e !important;
	  border: none !important;
	  border-radius: 20px !important;
  } 
.home-login{
	width: 120px;
	/* background-color: #0B58B0; */
	font-size: 13px;
	display: flex;
	line-height: 70px;
	letter-spacing: 2px;
	color: #e8e8e8;
}
.home-login p:hover{
	color: #FFFFFF;
	cursor: pointer;
}
.el-avatar{
	margin-top: 20px;
	margin-right: 5px;
}
.el-dialog{
	width: 400px;
}
.el-dialog img{
	margin-left: 25%;
}
.el-menu{
	/* height: 600px !important; */
}
.el-menu p{
	font-size: 13px;
	margin-left: 30px;
	color: #c3c3c3;
}
.el-menu-item{
	border-radius: 10px;
	margin: 10px 10px;
	height: 50px;
	line-height: 50px;
	text-align: left;
	color: #333333;
	font-size: 17px;
}
.el-menu-item:hover{
	background-color:#f6f6f7 ;
}
.el-menu-item.is-active {
  background-color: #f6f6f7 !important;
  border-radius: 10px;
  margin: 10px 10px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  color: #333333;
  font-size: 19px;
  font-weight: 600;
}
>>>.el-main{
	padding: 0px !important;
	margin: 0 !important;
	height: 100% !important;
	overflow: hidden;
}
.router-view{
	
}
.rightContainer{
	max-width: 150px;
	min-width: 150px;
	display: flex;
	overflow: hidden;
	margin-left: 50%;
	/* flex-wrap: wrap; */
	/* background-color: #282828; */
}
.userIcon{
	width: 45px;
	height: 45px;
	border-radius: 50%;
	margin-top: 15px;
	overflow: hidden;
}
.homeFooter{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	}
.footerImg{
	margin-left: 15px;
	width: 300px;
	height: 100%;
	display: flex;
	/* background-color: #1F1F1F; */
}
.footer-img{
	width: 20%;
	height: 100%;
	border-radius: 8px;
	overflow: hidden;
	/* padding-right: 15px; */
	cursor: pointer;
}
.footer-img img{
	width: 100%;
	height: 100%;
}
.footerImg-word{
	margin-left: 15px;
	width: 60%;
	height: 100%;
	font-size: 13px;
	line-height: 30px;
}
.footerImg-word p:nth-child(1){
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.footerImg-word p:nth-child(2){
	/* font-size: 16px; */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
>>>.el-footer{
	padding: 0 !important;
	margin: 0 !important;
	/* height: 83px !important; */
	/* height: 79px !important; */
	/* margin-top: -10px; */
	/* background-color: #dcdcdc; */
	/* height: 51.5px !important; */
	/* background-color: #0B58B0; */
	
}
.footer-item{
	width: 40%;
	min-width: 500px;
	height: 100%;
	/* margin-top: 10px; */
	/* background-color: #0B58B0; */
}
.footer-switch{
	width: 50%;
	height: 50%;
	display: flex;
	margin: 0 auto;
	justify-content: space-around;
}
.switchButton{
	width: 35px;
	height: 35px;
	margin-top: 20px;
	cursor: pointer;
	/* background-color: #0B58B0; */
}
.switch-last{
	background: url(../../../static/top.png);
	background-size: 100% 100%;
}
.switch-last:hover{
	background: url(../../../static/top1.png);
	background-size: 100% 100%;
}
.switch-playTrue{
	background: url(../../../static/bofang2.png);
	background-size: 100% 100%;
}
.switch-play{
	background: url(../../../static/zhanting.png);
	background-size: 100% 100%;
}
.switch-next{
	background: url(../../../static/next.png);
	background-size: 100% 100%;
}
.switch-next:hover{
	background: url(../../../static/next1.png);
	background-size: 100% 100%;
}
.footer-time{
	margin-top: 14px;
	display: flex;
	justify-content: space-between;
	line-height: 36px;
	color: #676767;
}
.footer-time span{
	/* background-color: #0B58B0; */
	width: 50px;
	text-align: center;
	font-size: 12px;
	/* padding:0 10px; */
}
.block{
	/* display: flex; */
	width: 80%;
}
>>>.el-slider__bar{
	background-color: #E13E3E !important; 
}
>>>.el-slider__button{
	width: 10px;
	height: 10px;
	background-color:#E13E3E ;
	border: 1px #E13E3E solid;
}
.footerMusicList{
	/* background-color: #0B58B0; */
}
.MUsicListimg,.MUsicListime{
	width: 100%;
	height: 100%;
	background-image: url(../../../static/liebiao.png);
	background-size: 100% 100%;
	/* margin-top: 35px;
	margin-left: 50px; */
}
.MUsicListime:hover{
	cursor: pointer;
	background-image: url(../../../static/liebiao1.png);
	background-size: 100% 100%;
}
.Msiclitbutton{
	margin-top: 45px;
	margin-left: 80px;
	width: 30px;
	height: 30px;
	cursor: pointer;
	border: none;
	background-color: #FFFFFF;
}
.table{
	font-size: 12px !important;
}
>>>.el-table .cell{
	overflow: hidden !important;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.el-card{
	width: 350px;
	height: 500px;
	position: absolute !important; 
	z-index: 1000;
	top: 62px;
	left: 130px;
}
.cardDete:hover{
	color: #323232 !important;
}
.cardSpan{
	width: 90%;
	height: 50px;
	margin: 0 auto;
	/* background-color: #0B58B0; */
	
	/* background-color: #0B58B0; */
}

.cardSpan p:hover{
color: red;
}
.cardSpan p{
	
	width: 20%;
	color: #676767;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	/* background-color: #0B58B0; */
	height: 50%;
	font-size: 13px;
	cursor: pointer;
	margin: 4px 4px 0px 4px;
	float: left;
	line-height: 15px;
	/* background-color: #0B58B0; */
}
.containers{
	width: 100%;
	margin-top: 15px;
	/* background-color: #0B58B0; */
}
.HoutItem{
	display: flex;
	width: 100%;
	height: 60px;
	cursor: pointer;
	padding-top: 5px;
	/* background-color: #0B58B0; */
}
.HoutItem:hover{
	background-color: #ecc0b8;
}
.HoutItem-Index{
	width: 50px;
	height: 50px;
	color: #676767;
	text-align: center;
	font-size: 15px;
	line-height: 50px;
	
}
.HoutItem-rg{
	width:80%;
	height: 100%;
}
.HoutItem-rg-top{
	width: 100%;
	height: 50%;
}
.HoutItem-rg-top span:nth-child(1){
 font-size: 15px;
	 font-weight: 600;
	 padding-right: 10px;
}
.HoutItem-rg-top span:nth-child(2){
 font-size: 13px;
	 color: #676767;
}
.HoutItem-rg-btn{
	width: 100%;
}
.HoutItem-rg-btn p{
	width: 90%;
	font-size: 13px;
	color: #C3C3C3;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.spanColor{
	color: red;
}
.KyeWrodItem{
	width: 100%;
	height: 30px;
	line-height: 30px;
	display: flex;
	
}
.KyeWrodItem p:nth-child(1){
	width: 70%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 12px;
}
.KyeWrodItem p:nth-child(2){
	width: 30%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 12px;
}
.KyeWrodItem:hover{
	background-color:#e6e6e6 ;
	color: #282828;
}
</style>
