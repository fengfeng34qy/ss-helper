<template>
	<view v-if="show" class="noticebar" :style="{ backgroundColor: backgroundColor }" @tap="onClick">
		<aemp-icons v-if="showClose === true || showClose === 'true'" class="noticebar-close" type="closeempty" :color="color"
		 size="12" @tap="close" />
		<aemp-icons v-if="showIcon === true || showIcon === 'true'" class="noticebar-icon" type="sound" :color="color"
		 size="14" />
		<view ref="textBox" class="noticebar__content-wrapper" :class="{'noticebar__content-wrapper--scrollable':scrollable, 'noticebar__content-wrapper--single':!scrollable && (single || moreText)}">
			<view :id="elIdBox" class="noticebar__content" :class="{'noticebar__content--scrollable':scrollable, 'noticebar__content--single':!scrollable && (single || moreText)}">
				<text :id="elId" ref="animationEle" class="noticebar__content-text" :class="{'noticebar__content-text--scrollable':scrollable,'noticebar__content-text--single':!scrollable && (single || moreText)}"
				 :style="{color:color, width:wrapWidth+'px', 'animationDuration': animationDuration, '-webkit-animationDuration': animationDuration ,animationPlayState: webviewHide?'paused':animationPlayState,'-webkit-animationPlayState':webviewHide?'paused':animationPlayState, animationDelay: animationDelay, '-webkit-animationDelay':animationDelay}">{{text}}</text>
			</view>
		</view>
		<view v-if="showGetMore === true || showGetMore === 'true'" class="noticebar__more" @tap="clickMore">
			<text v-if="moreText" :style="{ color: moreColor }" class="noticebar__more-text">{{ moreText }}</text>
			<aemp-icons type="arrowright" :color="moreColor" size="14" />
		</view>
	</view>
</template>

<script>
	import aempIcons from '../aemp-icons/aemp-icons.vue'

	/**
	 * NoticeBar 自定义导航栏
	 * @description 通告栏组件
	 * @property {Number} speed 文字滚动的速度，默认100px/秒
	 * @property {String} text 显示文字
	 * @property {String} backgroundColor 背景颜色
	 * @property {String} color 文字颜色
	 * @property {String} moreColor 查看更多文字的颜色
	 * @property {String} moreText 设置“查看更多”的文本
	 * @property {Boolean} single = [true|false] 是否单行
	 * @property {Boolean} scrollable = [true|false] 是否滚动，为true时，NoticeBar为单行
	 * @property {Boolean} showIcon = [true|false] 是否显示左侧喇叭图标
	 * @property {Boolean} showClose = [true|false] 是否显示左侧关闭按钮
	 * @property {Boolean} showGetMore = [true|false] 是否显示右侧查看更多图标，为true时，NoticeBar为单行
	 * @event {Function} click 点击 NoticeBar 触发事件
	 * @event {Function} close 关闭 NoticeBar 触发事件
	 * @event {Function} getmore 点击”查看更多“时触发事件
	 */

	export default {
		name: 'AempNoticeBar',
		config: {
			component: true
		},
		components: {
			aempIcons
		},
		props: {
			text: {
				type: String,
				default: ''
			},
			moreText: {
				type: String,
				default: ''
			},
			backgroundColor: {
				type: String,
				default: '#fffbe8'
			},
			speed: {
				// 默认1s滚动100px
				type: Number,
				default: 100
			},
			color: {
				type: String,
				default: '#de8c17'
			},
			moreColor: {
				type: String,
				default: '#999999'
			},
			single: {
				// 是否单行
				type: Boolean,
				default: false
			},
			scrollable: {
				// 是否滚动，添加后控制单行效果取消
				type: Boolean,
				default: false
			},
			showIcon: {
				// 是否显示左侧icon
				type: Boolean,
				default: false
			},
			showGetMore: {
				// 是否显示右侧查看更多
				type: Boolean, 
				default: false
			},
			showClose: {
				// 是否显示左侧关闭按钮
				type: Boolean,
				default: false
			}
		},
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			const elIdBox = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				textWidth: 0,
				boxWidth: 0,
				wrapWidth: '',
				webviewHide: false,
				elId: elId,
				elIdBox: elIdBox,
				show: true,
				animationDuration: 'none',
				animationPlayState: 'paused',
				animationDelay: '0s'
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initSize()
			})
		},
		methods: {
			initSize() {
				if (this.scrollable) {
					const scope = this.$mp ? this.$mp.scope : this;
					let query = [],
						boxWidth = 0,
						textWidth = 0;
					let textQuery = new Promise((resolve, reject) => {
						this.$api.createSelectorQuery()
							.in(scope)
							.select(`#${this.elId}`)
							.boundingClientRect()
							.exec(ret => {
								this.textWidth = ret[0].width
								resolve()
							})
					})
					let boxQuery = new Promise((resolve, reject) => {
						this.$api.createSelectorQuery()
							.in(scope)
							.select(`#${this.elIdBox}`)
							.boundingClientRect()
							.exec(ret => {
								this.boxWidth = ret[0].width
								resolve()
							})
					})
					query.push(textQuery)
					query.push(boxQuery)
					Promise.all(query).then(() => {
						this.animationDuration = `${this.textWidth / this.speed}s`
						this.animationDelay = `-${this.boxWidth / this.speed}s`
						setTimeout(() => {
							this.animationPlayState = 'running'
						}, 1000)
					})
				}
			},
			loopAnimation() {
			},
			clickMore() {
				this.$emit('getmore')
			},
			close() {
				this.show = false;
				this.$emit('close')
			},
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>

	.noticebar {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		padding: 6px 12px;
		margin-bottom: 10px;
	}

	.noticebar-close {
		margin-right: 5px;
	}

	.noticebar-icon {
		margin-right: 5px;
	}

	.noticebar__content-wrapper {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}

	.noticebar__content-wrapper--single {
		line-height: 60px;
	}

	.noticebar__content-wrapper--single,
	.noticebar__content-wrapper--scrollable {
		flex-direction: row;
	}

	.noticebar__content-wrapper--scrollable {
		position: relative;
		height: 60px;
	}

	.noticebar__content--scrollable {
		flex: 1;
		display: block;
		overflow: hidden;
	}

	.noticebar__content--single {
		display: flex;
		flex: none;
		width: 100%;
		justify-content: center;
	}

	.noticebar__content-text {
		font-size: 20px;
		line-height: 60px;
		word-break: break-all;
	}

	.noticebar__content-text--single {
		display: block;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.noticebar__content-text--scrollable {
		position: absolute;
		display: block;
		height: 60px;
		line-height: 60px;
		white-space: nowrap;
		padding-left: 100%;
		animation: notice 10s 0s linear infinite both;
		animation-play-state: paused;
	}

	.noticebar__more {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		padding-left: 5px;
	}

	.noticebar__more-text {
		font-size: 20px;
	}

	@keyframes notice {
		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>
