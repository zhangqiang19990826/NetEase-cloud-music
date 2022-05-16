<template>
	<div class="containers">
		<el-scrollbar style="height:570px">
			<!-- 背景 -->
		<div class="containersimg">
			<img :src="getmusicDetails.al.picUrl" />
		</div>
		<!-- 内容 -->
		<div class="musicSolo">
			<!-- 转盘 -->
			<div class="musicSolo-ztai">
				<div class="musicSolo-ztai-img">
				<img style="border-radius:50%" :src="getmusicDetails.al.picUrl" />
				<img src="../../../static/needle.png" />
				</div>
			</div>
			
			<!-- 右侧 -->
			<div class="musicSolo-rg">
				<!-- 头部 -->
				<div class="musicSolo-head">
					<p>{{getmusicDetails.al.name}}</p>
					<p>{{getmusicDetails.ar[0].name}} - {{getmusicDetails.al.name}}</p>
				</div>
				
				<!-- 歌词 -->
				<div class="musicSolo-lyric">
					<div class="lyric-box">
						<div :class="{active : lyricIndex === index}" class="lyric-box-item" v-for="(item,index) in MusicLyric" :key='index'>{{item.lyric}}</div>
						
						
						
					</div>
				</div>
			</div>
			
			
			
		</div>
			</el-scrollbar>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				getmusicDetails:{
					al:{
						picUrl:''
					},
					ar:[{
					
					}],
				},
				getMusics:{},
				MusicLyric:{},
				lyricIndex:3,
			}
		},
		created() {
			this.getmusicDetail()
			this.getMusic()
			this.getMusicLyric()
		},
		methods:{
			getid(){
				
			},
			// 获取音乐详情
			async getmusicDetail(){
				// console.log(this.musicId)
				let musicId = this.$route.query.id
				// console.log(this.musicId)
				const {data:res} = await this.$http.get('/song/detail?ids='+musicId)
				if(res.code == '200'){
					this.getmusicDetails = res.songs[0]
					// console.log(this.getmusicDetails)
				}
			},
			// 获取音乐url
			async getMusic(){
					let musicId = this.$route.query.id
				const {data:res} = await this.$http.get('/song/url?id='+musicId)
				// console.log(res)
				this.getMusics = res.data[0]
				// console.log(this.getMusics)
			},
			// 获取歌词
			async getMusicLyric(){
				let musicId = this.$route.query.id
				const {data:res} = await this.$http.get('/lyric?id='+musicId)
				if(res.code == 200){
					// 歌词
					 let lyric = res.lrc.lyric
					// 正则取出
					let re = /\[([^\]]+)\]([^\[]+)/g;
					// console.log(lyric.match(re))
					var result = []
					lyric.replace(re,($0,$1,$3)=>{
						result.push({'time':this.formatTimeToSec($1),'lyric':$3})
					})
					console.log(result)
					this.MusicLyric = result
				}
			},
			formatTimeToSec(value){
				let arr = value.split(':');
				return Number(arr[0]*60) + Number(arr[1]).toFixed(3);
				// console.log(arr)
			}
		}
	}
</script>

<style scoped="scoped">
	.containers{
		width: 100%;
	}
	.containersimg{
		width: 100%;
	}
	.containersimg img{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1000;
		background-size: cover;
		left: 0;
		top: 0;
		background-position: center 0;
		 filter: blur(15px);
		 transform: scale(1.2);
	}
	.musicSolo{
		width: 100%;
		height: 100%;
		margin: 50px 20px;
		display: flex;
	}
	.musicSolo-head{
		width: 100%;
		height: 80px;
		/* background-color: #282828; */
		text-align: center;
		line-height: 40px;
	}
	.musicSolo-head p:nth-child(1){
		width: 300px;
		overflow: hidden;
		text-align: center;
		margin: 0 auto;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28px;
		color: #323232;
	}
	.musicSolo-head p:nth-child(2){
		font-size: 15px;
		color: #1f1f1f;
	}
	.musicSolo-ztai{
		min-width: 470px;
		height: 470px;
		/* background-color: #0B58B0; */
		
		overflow: hidden;
		/* background-color: #0B58B0; */
		/* position: relative; */
	}
	.musicSolo-rg{
		width: 500px;
		
	}
	.musicSolo-ztai-img{
		margin: 0 auto;
		margin-top: 80px;
		width: 70%;
		height: 70%;
		background: url(../../../static/disc.png);
		background-size: cover;
		position: relative;
	}
	.musicSolo-ztai-img img:nth-child(1){
		width: 67%;
		height: 67%;
		border-radius: 50%;
		position: absolute;
		top: 55px;
		left: 55px;
		/* -webkit-user-select:none;
		    -moz-user-select:none;
		    -ms-user-select:none;
		    user-select:none; */
		/* -moz-user-select: none; */
		animation: 20s linear move infinite;
		/* animation-play-state: paused; */
		animation-play-state: running;
	}
	.musicSolo-ztai-img img:nth-child(2){
		position: absolute;
		width: 140px;
		top: -60px;
		left: 165px;
	}
	@keyframes move{
		from{transform:rotate(0deg) ;}
		to{transform: rotate(360deg);}
	}
	.musicSolo-lyric{
		
		width: 90%;
		height: 287px;
		/* background-color: #0B58B0; */
		margin: 0 auto;
		overflow: hidden;
		font-size: 16px;
		line-height: 41px;
		text-align: center;
		color: #414043;
		margin-top: 30px;
	}
	.lyric-box{
		width: 100%;
	}
	.lyric-box-item{
		height: 41px;
	}
	.lyric-box-item.active{
		color: #FFFFFF;
	}
</style>
