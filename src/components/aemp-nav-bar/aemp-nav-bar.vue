<template>
	<view class="navbar">
		<view :class="{ 'navbar--fixed': fixed, 'navbar--shadow': shadow, 'navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="navbar__content">
			<view :style="{ height: statusBarHeight }" class="status-bar" v-if="statusBar"></view>
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="navbar__header navbar__content_view">
				<view @tap="onClickLeft" class="navbar__header-btns navbar__header-btns-left navbar__content_view">
					<aemp-icons v-if="leftIcon.length" :color="color" :type="leftIcon" size="24" class="navbar__content_view" />
					<view class="navbar__content_view"
					 v-if="leftText.length">
						<text class="nav-bar-text" :style="{ color: color }">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="navbar__header-container navbar__content_view" @tap="onClickTitle">
					<view class="navbar__header-container-inner navbar__content_view" v-if="title.length">
						<text class="nav-bar-text" :style="{color: color }">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<view :class="title.length ? 'navbar__header-btns-right' : ''" @tap="onClickRight" class="navbar__header-btns navbar__content_view">
					<aemp-icons class="navbar__content_view" v-if="rightIcon.length" :color="color" :type="rightIcon" size="24" />
					<!-- 优先显示图标 -->
					<view class="navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="nav-bar-right-text">{{ rightText }}</text>
					</view>
					<slot name="right" />
				</view>
			</view>
		</view>
		<view class="navbar__placeholder" v-if="fixed">
			<view :style="{ height: statusBarHeight }" class="status-bar" v-if="statusBar"></view>
			<view class="navbar__placeholder-view" />
		</view>
	</view>
</template>

<script>
	import aempIcons from "../aemp-icons/aemp-icons.vue";

	/**
	 * NavBar 自定义导航栏
	 * @description 导航栏组件，主要用于头部导航
	 * @property {String} title 标题文字
	 * @property {String} leftText 左侧按钮文本
	 * @property {String} rightText 右侧按钮文本
	 * @property {String} leftIcon 左侧按钮图标
	 * @property {String} rightIcon 右侧按钮图标
	 * @property {String} color 图标和文字颜色
	 * @property {String} backgroundColor 导航栏背景颜色
	 * @property {Boolean} fixed = [true|false] 是否固定顶部
	 * @property {Boolean} statusBar = [true|false] 是否包含状态栏
	 * @property {Boolean} shadow = [true|false] 导航栏下是否有阴影
	 * @event {Function} clickLeft 左侧按钮点击时触发
	 * @event {Function} clickRight 右侧按钮点击时触发
	 * @event {Function} clickTitle 中间标题点击时触发
	 */
	export default {
		name: "AempNavBar",
		components: {
			aempIcons
		},
		config: {
			component: true
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			leftText: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			fixed: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			statusBar: {
				type: Boolean,
				default: false
			},
			shadow: {
				type: Boolean,
				default: false
			},
			border: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				statusBarHeight: ""
			}
		},
		mounted(){
			 this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight + 'px';
		},
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
			},
			onClickRight() {
				this.$emit("clickRight");
			},
			onClickTitle() {
				this.$emit("clickTitle");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$nav-height: 80px;
	$font-size-lg:30px;
	$bg-color:#ffffff;
	$border-color:#e5e5e5;

	.status-bar {
		width: 100%;
		height: 20px;
	}

	.nav-bar-text {
		font-size: $font-size-lg;
	}

	.nav-bar-right-text {
		font-size: $font-size-lg;
	}

	.navbar__content {
		position: relative;
		background-color: $bg-color;
		overflow: hidden;
		width: 100%;
	}
	.navbar__icon{
		height:24px;
	}

	.navbar__content_view {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.navbar__header {
		display: flex;
		flex-direction: row;
		height: $nav-height;
		line-height: $nav-height;
		font-size:  $font-size-lg;
	}

	.navbar__header-btns {
		display: flex;
		flex-wrap: nowrap;
		width: 120px;
		padding: 0 6px;
		justify-content: center;
		align-items: center;
	}

	.navbar__header-btns-left {
		display: flex;
		width: 180px;
		justify-content: flex-start;
	}

	.navbar__header-btns-right {
		display: flex;
		width: 150px;
		padding-right: 30px;
		justify-content: flex-end;
	}

	.navbar__header-container {
		flex: 1;
	}

	.navbar__header-container-inner {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: $font-size-lg;
	}


	.navbar__placeholder-view {
		height: $nav-height;
	}

	.navbar--fixed {
		position: fixed;
		z-index: 998;
	}

	.navbar--shadow {
		box-shadow: 0 1px 6px #ccc;
	}

	.navbar--border {
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: $border-color;
	}
</style>
