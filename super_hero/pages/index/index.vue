<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" circular :duration="1000" class="swiper">
			<swiper-item v-for="item in swipers" :key="item.index" >
				<view class="swiper-item">
					<image :src="`${$address}/${item.index}`" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="hotMovies">
			<view class="hotTitle title">
				<image src="../../static/icos/hot.png"></image>
				<view class="titleTxt">
					热门电影
				</view>
			</view>
			<scroll-view scroll-x="true" class="hot-movie-scroll">
				<view class="hot-wraper">
					<view class="hot-movie-item" v-for="(mv, index) in hotMovies">
						<image :src="`${$address}/${mv.index}`" mode="" class="movie-pic"></image>
						<view class="movie-name">
							{{ mv.name }}
						</view>
						<view class="movie-score">
							<uni-rate
							 max="5"
							 :value="mv.score / 2"
							 size="12"
							 readonly="true"
							 class="score-star"
							/>
							<text class="score-title">{{ mv.score }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="pre-notice">
			<view class="title">
				<image src="../../static/icos/108x108.png" mode=""></image>
				<view class="titleTxt">
					超英预告
				</view>
			</view>
			<view class="pre_wraper">
				<view class="pre-movie-item"  v-for="pre in preMovies">
					<video
					 :src="`${$address}/${pre.index}`"
					 :poster="`${$address}/${pre.cover}`" 
					 controls
					 class="pre-video"
					 ></video>
				</view>
			</view>
	
		</view>
		<view class="guess-u-like">
			<view class="title">
				<image src="../../static/icos/hot.png"></image>
				<view class="titleTxt">
					猜你喜欢
				</view>
			</view>
			<view class="like-item" v-for="(like, index) in uLikes">
				<image :src="`${$address}/${like.index}`" class="u-like-pic"></image>
				<view class="like-desc">
					{{ like.desc }}
					<br/>
					{{ like.time }}
				</view>
				<view class="like-praise" @click="praise(index)">
					<image src="../../static/icos/praise.png" class="like-praise-icon"></image>
					<text class="like-praise-text">点赞</text>
					<view class="plus-one plus-one-hide" :animation="praiseAnimation[index]" >+1</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			const _this = this
			return {
				swipers: [],
				preMovies: [],
				uLikes: [],
				hotMovies: [],
				praiseAnimation: [],
				ani: null,
			}
		},
		onLoad() {
			this.ani = uni.createAnimation()
			const $address = this.$address
			const statics = `${$address}/api/statics?type=`
			const swipers = uni.request({ url:  `${statics}carousel` })
			const poster = uni.request({ url:  `${statics}poster` })
			const pre = uni.request({ url:  `${statics}pre` })
			const like = uni.request({ url:  `${statics}like` })
			Promise.all([swipers, poster, pre, like]).then(([s_res, p_res, pre_res, like_res]) => {
				if (s_res[1].statusCode === 200) {
					this.swipers = s_res[1].data
				}
				if (p_res[1].statusCode === 200) {
					this.hotMovies = p_res[1].data
				}
				if (pre_res[1].statusCode === 200) {
					this.preMovies = pre_res[1].data
				}
				if (like_res[1].statusCode === 200) {
					this.uLikes = like_res[1].data
					this.praiseAnimation = new Array(this.uLikes.length).fill({})
				}
			})
		},
		computed: {
			...mapState(['$address'])
		},
		methods: {
			praise(index) {
				this.praiseAnimation.splice(index, 1, this.ani.opacity(1).translateY(-80).scale(1.5).step({duration: 200}).export())
				setTimeout(() => {
					this.praiseAnimation.splice(index, 1, this.ani.opacity(0).translateY(0).scale(0).step({duration: 0}).export()) 
				}, 200)
			}
		}
	}
</script>

<style lang="less">
	.content {
		.swiper {
			height: 400upx;
			.swiper-item {
				image {
					width: 750upx;
					height: 400upx;
				}
			}
		}
		.title {
			display: flex;
			justify-content: flex-start;
			image {
				width: 30upx;
				height: 30upx;
				margin-top: 8upx;
				margin-right: 12upx;
			}
		}
		.hotMovies {
			margin-top: 20upx;
			padding: 0 20upx;
			.hot-movie-scroll {
				margin-top: 12upx;
				white-space: nowrap;
				.hot-wraper {
					display: flex;
					justify-content: flex-start;
					white-space: nowrap;
					width: 100%;
					.hot-movie-item {
						margin-right: 12upx;
						display: flex;
						flex-direction: column;
						margin-right: 20upx;
						width: 200upx;
						.movie-pic {
							width: 100%;
							height: 270upx;
						}
						.movie-name {
							width: 100%;
							overflow: hidden;
							font-size: 14px;
							text-overflow:ellipsis;
						}
						.movie-score {
							display: flex;
							justify-content: flex-start;
							.score-star {
								margin-top: 8upx;
							}
							.score-title {
								margin-left: 12upx;
								color: #999999;
							}
						}
					}
				}
		
			}
		}
		.pre-notice {
			margin-top: 20upx;
			padding: 0 20upx;
			.pre_wraper {
				display: flex;
				flex-wrap: wrap;
				.pre-movie-item {
					width: 50%;
					display: flex;
					justify-content: flex-start;
					overflow: hidden;
					margin-top: 12upx;
					.pre-video {
						width: 355upx;
						height: 220upx;
					}
				}
			}
		}
		
		.guess-u-like {
			margin-top: 20upx;
			padding: 0 20upx;
			.like-item {
				display: flex;
				margin-bottom: 40upx;
				margin-top: 12upx;
				height: 270upx;
			}
			.u-like-pic {
				width: 200upx;
				flex-shrink: 0;
				height: 100%;
			}
			.like-desc {
				color: #999999;
				margin: 0 12upx;
				padding-right: 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.like-praise {
				width: 150upx;
				border-left: 2px dashed #999999;
				display: flex;
				flex-direction: column;
				justify-content: center;
				color: rgb(254, 186, 50);
				flex-shrink: 0;
				.like-praise-icon {
					width: 40upx;
					height: 40upx;
					align-self: center;
				}
				.like-praise-text {
					align-self: center;
					font-size: 14px;
				}
				.plus-one {
					align-self: center;
				}
				.plus-one-hide{
					opacity: 0;
				}
			}
		}
	}
</style>
