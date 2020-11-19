<template>
	<view class="swiper__warp">
		<slot />
		<view v-if="mode === 'default'" :style="{'bottom':dots.bottom + 'px'}" class="swiper__dots-box" key='default'>
			<view v-for="(item,index) in info" :style="{
        'width': (index === current? dots.width*2:dots.width ) + 'px','height':dots.width/3 +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border-radius':'0px'}"
			 :key="index" class="swiper__dots-item swiper__dots-bar" />
		</view>
		<view v-if="mode === 'dot'" :style="{'bottom':dots.bottom + 'px'}" class="swiper__dots-box" key='dot'>
			<view v-for="(item,index) in info" :style="{
        'width': dots.width + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
			 :key="index" class="swiper__dots-item" />
		</view>
		<view v-if="mode === 'round'" :style="{'bottom':dots.bottom + 'px'}" class="swiper__dots-box" key='round'>
			<view v-for="(item,index) in info" :class="[index === current&&'swiper__dots-long']" :style="{
		    'width':(index === current? dots.width*3:dots.width ) + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
			 :key="index" class="swiper__dots-item " />
		</view>
		<view v-if="mode === 'nav'" key='nav' :style="{'background-color':dotsStyles.backgroundColor,'bottom':'0'}" class="swiper__dots-box swiper__dots-nav">
			<text :style="{'color':dotsStyles.color}" class="swiper__dots-nav-item">{{ (current+1)+"/"+info.length +' ' +info[current][field] }}</text>
		</view>
		<view v-if="mode === 'indexes'" key='indexes' :style="{'bottom':dots.bottom + 'px'}" class="swiper__dots-box">
			<view v-for="(item,index) in info" :style="{
        'width':dots.width + 'px','height':dots.height +'px' ,'color':index === current?dots.selectedColor:dots.color,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
			 :key="index" class="swiper__dots-item swiper__dots-indexes"><text class="swiper__dots-indexes-text">{{ index+1 }}</text></view>
		</view>
	</view>
</template>

<script>

	/**
	 * SwiperDod 轮播图指示点
	 * @description 自定义轮播图指示点
	 * @property {Number} current 当前指示点索引，必须是通过 `swiper` 的 `change` 事件获取到的 `e.detail.current`
	 * @property {String} mode = [default|round|nav|indexes] 指示点的类型
	 * 	@value defualt 默认指示点
	 * 	@value round 圆形指示点
	 * 	@value nav 条形指示点
	 * 	@value indexes 索引指示点
	 * @property {String} field mode 为 nav 时，显示的内容字段（mode = nav 时必填）
	 * @property {String} info 轮播图的数据，通过数组长度决定指示点个数
	 * @property {Object} dotsStyles 指示点样式
	 * @event {Function} clickItem 组件触发点击事件时触发，e={currentIndex}
	 */

	export default {
		name:"AempSwiperDot",
		config: {
            component: true
        },
		name: 'SwiperDot',
		props: {
			info: {
				type: Array,
				default () {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			},
			dotsStyles: {
				type: Object,
				default () {
					return {}
				}
			},
			// 类型 ：default(默认) indexes long nav
			mode: {
				type: String,
				default: 'default'
			},
			// 只在 nav 模式下生效，变量名称
			field: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				dots: {
					width: 8,
					height: 8,
					bottom: 10,
					color: '#fff',
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					selectedBackgroundColor: '#333',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				}
			}
		},
		watch: {
			dotsStyles(newVal) {
				this.dots = Object.assign(this.dots, this.dotsStyles)
			},
			mode(newVal) {
				if (newVal === 'indexes') {
					this.dots.width = 20
					this.dots.height = 20
				} else {
					this.dots.width = 8
					this.dots.height = 8
				}
			}

		},
		created() {
			if (this.mode === 'indexes') {
				this.dots.width = 20
				this.dots.height = 20
			}
			this.dots = Object.assign(this.dots, this.dotsStyles)
		}
	}
</script>

<style lang="scss" scoped>
	$font-size-sm:12px;
	$font-size-base:14px;
	$bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色
	.swiper__warp {
		display: flex;
		flex: 1;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}

	.swiper__dots-box {
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.swiper__dots-item {
		width: 8px;
		border-radius: 100px;
		margin-left: 6px;
		background-color: $bg-color-mask;
		// transition: width 0.2s linear;  不要取消注释，不然会不能变色
	}

	.swiper__dots-item:first-child {
		margin: 0;
	}

	.swiper__dots-default {
		border-radius: 100px;
	}

	.swiper__dots-long {
		border-radius: 50px;
	}

	.swiper__dots-bar {
		border-radius: 50px;
	}

	.swiper__dots-nav {
		bottom: 0px;
		height: 40px;
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.swiper__dots-nav-item {
		font-size: $font-size-base;
		color: #fff;
		margin: 0 15px;
	}

	.swiper__dots-indexes {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.swiper__dots-indexes-text {
		color: #fff;
		font-size: $font-size-sm;
	}
</style>
