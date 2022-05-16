<template>
	<div>
		<el-container></el-container>
	<!-- 轮播图 -->
	<div class="lunboimg">
		<template>
		  <el-carousel :interval="6000" type="card" height="220px">
		    <el-carousel-item v-for="(item,index) in homepage" :key='index'>
				<div class="carousel-img">
					<img :src="item.pic" />
					<div>{{item.typeTitle}}</div>
				</div>
		    </el-carousel-item>
		  </el-carousel>
		</template>
	</div>
	<!-- 推荐歌单 -->
	<div class="chuli-persong">
		<!-- 头部 -->
		<div class="persong-head"><p>推荐歌单</p><span>></span></div>
		<!-- 内容 -->
		<div class="persong-main">
			<div class="persong-main-item" v-for="(item,index) in personaLized" :key='index'  @click="persong(item.id)">
				<div class="bofang">
					<img src="../../../static/bofang.png" />
				</div>
				<div class="persong-main-img">
					<img :src="item.picUrl" />					
				</div>
				<p>{{item.name}}</p>
			</div>
		</div>
	</div>
	
	<!-- 最新音乐 -->
	<div class="chuli-music">
		<!-- 头部 -->
		<div class="music-head"><p>最新音乐</p><span>></span></div>
		<!-- 内容 -->
		<div class="music-box">
			<div class="music-box-item" v-for="(item,index) in newMusic" :key='index'>
				<!-- 左侧 -->
				<div class="music-item-left">
					<div class="music-bofang">
						<img src="../../../static/bofang.png" />
					</div>
					<div class="music-img">
						<img :src="item.picUrl" >
					</div>
				</div>
				<!-- 右侧 -->
				<div class="music-item-rg">
					<p>{{item.name}}</p>
					<p>{{item.song.artists[0].name}}</p>
				</div>
			</div>		
		</div>
	</div>
	
	<!-- 推荐Mv -->
	<div class="chuliMv">
		<!-- 头部 -->
		<div class="chuliMv-head"><p>最新音乐</p><span>></span></div>
		<el-row  class="chuliMv-box">
			<el-col :span='6' class="chuliMv-item" v-for="(item,index) in newMv" :key='index'>
				<div class="chuliMv-img">
					<img :src="item.picUrl" />
				</div>
				<div class="chuliMv-text">
					<p>{{item.name}}</p>
					<p>{{item.artistName}}</p>
				</div>
			</el-col>
		</el-row>
	</div>
	
	
	
	</div>
</template>

<script>
	export default{
		data() {
			return{
				homepage:[],
				personaLized:[],
				newMusic:[],
				newMv:[],
			}
		},
		created() {
			this.gitdj()
			this.personalized()
			this.getnewsong()
			this.getnewMv()
		},
		methods:{
			async gitdj(){
				const {data:res}= await this.$http.get('/homepage/block/page')
				// console.log(res)
				if(res.code == '200'){
					this.homepage = res.data.blocks[0].extInfo.banners
				}
			},
			// 推荐歌单
			async personalized(){
				const {data:res} = await this.$http.get('/personalized?limit=10')
				if(res.code == '200'){
					this.personaLized = res.result
					// console.log(this.personaLized)
				}
			},
			// 歌单详情跳转
			persong(id){
				// console.log(id)
				this.$router.push({path:'/persong?id='+id,query:{id:id}})
			},
			
			// 推荐新音乐
			async getnewsong(){
				const {data:res} = await this.$http.get('/personalized/newsong?limit=12')
				// console.log(res)
				if(res.code == '200'){
					this.newMusic = res.result
					// console.log(this.newMusic)
				}
			},
			// 推荐MV
			async getnewMv(){
				const {data:res} = await this.$http.get('/personalized/mv')
				if(res.code == '200'){
					this.newMv = res.result
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.lunboimg{
		/* min-width: 1000px; */
	}
	.carousel-img{
		/* min-width: 633px; */
		/* width: 633px; */
		width: 100%;
		position: relative;
		height: 100%;
		/* background-color: #282828; */
		overflow: hidden;
		border-radius: 20px;
	}
	.carousel-img div{
		width: 110px;
		height: 30px;
		font-size: 15px;
		line-height: 30px;
		left:80%;
		text-align: center;
		position: absolute;
		background-color: #ec4141;
		color: #FFFFFF;
		top: 87%;
	}
	.carousel-img img{
		width: 100%;
		height: 100%;
		background-size: cover;
		position: absolute;
		border-radius: 20px;
	}
	::v-deep .el-carousel__button {

	  width: 8px;
	  height: 8px;
	  border-radius: 50%;
	  background-color: #C3C3C3;
	}
	::v-deep .el-carousel__indicators--outside button{
	          
	            background: #E13E3E;
	           
	        }
	.chuli-persong{
		width: 100%;
		height: 100%;
		/* background-color: #282828; */
	}
	.persong-head, .music-head , .chuliMv-head{
		display: flex;
		height: 30px;
		line-height: 30px;
		margin-bottom: 8px;
		cursor: pointer;
	}
	.persong-head p {
		font-size: 20px;
		font-weight: 600;
		color: #282828;
	}
	.persong-head span{
		font-size: 25px;
		color: #676767;
	}
	.music-head p {
		font-size: 20px;
		font-weight: 600;
		color: #282828;
	}
	.music-head span{
		font-size: 25px;
		color: #676767;
	}
	
	.chuliMv-head p {
		font-size: 20px;
		font-weight: 600;
		color: #282828;
	}
	.chuliMv-head span{
		font-size: 25px;
		color: #676767;
	}
	
	.persong-main{
		display: flex;
		flex-wrap: wrap;
	}
	.persong-main-item{
		width: 20%;
		/* min-width: 220px; */
		height: 50%;
		margin-bottom: 20px;
		/* margin: 20px 20px; */
		overflow: hidden;
		position: relative;
		cursor: pointer;
	}
	.bofang{
		left: 40%;
		width: 15%;
		z-index: 100;
		height: 15%;
		position: absolute;
		background-color: #FFFFFF;
		border-radius: 50%;
		visibility: hidden;
		top: 30%;
	}
	.persong-main-item:hover .bofang{
		visibility: visible;
	}
	.bofang img {
		width: 100%;
		height: 100%;
		margin-left: 3px;
	}
	.persong-main-img{
		width:90%;
		height: 80%;
		border-radius: 15px;
		overflow: hidden;
		/* margin-top: -40px; */
		position: relative;
	}
	.persong-main-img img{
		width: 100%;
		height: 100%;
		background-size: cover;
	}
	
	.persong-main-item p{
		width: 100%;
		line-height: 100%;
		height: 44px;
		font-size: 14px;
		overflow: hidden;
		flex-wrap: wrap;
		text-overflow: ellipsis;
	}
	.chuli-music{
		width: 100%;
		height:100% ;
		/* background-color: #282828; */
		/* margin-top: 10px; */
	}
	.music-box{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
	}
	.music-box-item{
		width: 30%;
		height: 25%;
		display: flex;
		overflow: hidden;
		/* background-color: #282828; */
	}
	.music-item-left{
		width: 20%;
		height: 100%;
		position: relative;
		
	}
	.music-bofang{
		width: 50%;
		height: 40%;
		background-color: #FFFFFF;
		border-radius: 50%;
		position: absolute;
		top: 25%;
		left: 20%;
	}
	.music-bofang img{
		width: 100%;
		margin-left: 8%;
		height: 100%;
	}
	.music-img{
		width: 100%;
		height: 90%;
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
	}
	.music-img img {
		width: 100%;
		height: 100%;
	}
	.music-item-rg{
		width: 75%;
		height: 90%;
	}
	.music-item-rg:hover{
		background-color: #eeeeee;
	}
	.music-item-rg p:nth-child(1){
		margin-top: 3px;
		margin-left: 5px;
		overflow: hidden;
		white-space:nowrap;
		text-overflow:ellipsis ;
	}
	.music-item-rg p:nth-child(2){
		margin-left: 5px;
		margin-top: 16px;
		white-space:nowrap;
		overflow: hidden;
		text-overflow:ellipsis ;
		font-size: 14px;
		color: #676767;
	}
	.chuliMv{
		margin-top: 40px;
		width: 100%;
		height: 100%;
		/* background-color: #282828; */
	}
	.chuliMv-box{
		height: 250px !important;
	}
	.chuliMv-item{
		height: 100%;
		/* background-color: #282828; */
	}
	.chuliMv-img{
		width: 95%;
		height: 70%;
		border-radius: 20px;
		overflow: hidden;
	}
	.chuliMv-img img{
		width: 100%;
		height: 100%;
	}
	.chuliMv-text p:nth-child(1){
		width: 85%;
		font-size: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
		margin: 3px 5px;
	}
	.chuliMv-text p:nth-child(2){
		font-size: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
		margin: 3px 5px;
		color: #333333;
	}
	
</style>
