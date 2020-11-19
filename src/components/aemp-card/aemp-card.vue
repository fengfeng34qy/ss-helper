<template>
	<view class="card border" :class="{ 'card--full': isFull === true || isFull === 'true', 'card--shadow': isShadow === true || isShadow === 'true'}">
		<!-- 基础 -->
		<view v-if="mode === 'basic' && title" class="card__header border-bottom" @tap="onClick">
			<view v-if="thumbnail" class="card__header-extra-img-view">
				<image :src="thumbnail" class="card__header-extra-img" />
			</view>
			<text class="card__header-title-text">{{ title }}</text>
			<text v-if="extra" class="card__header-extra-text">{{ extra }}</text>
		</view>
		<!-- 标题 -->
		<view v-if="mode === 'title'" class="card__title border-bottom" @tap="onClick">
			<view class="card__title-box">
				<view class="card__title-header">
					<image class="card__title-header-image" :src="thumbnail" mode="scaleToFill" />
				</view>
				<view class="card__title-content">
					<text class="card__title-content-title ellipsis">{{ title }}</text>
					<text class="card__title-content-extra ellipsis">{{ subTitle }}</text>
				</view>
			</view>
			<view v-if="extra">
				<text class="card__header-extra-text">{{ extra }}</text>
			</view>
		</view>
		<!-- 图文 -->
		<view v-if="mode === 'style'" class="card__thumbnailimage" @tap="onClick">
			<view class="card__thumbnailimage-box">
				<image class="card__thumbnailimage-image" :src="thumbnail" mode="aspectFill" />
			</view>
			<view v-if="title" class="card__thumbnailimage-title"><text class="card__thumbnailimage-title-text">{{ title }}</text></view>
		</view>
		<!-- 内容 -->
		<view class="card__content card__content--pd" @tap="onClick">
			<view v-if="mode === 'style' && extra" class=""><text class="card__content-extra">{{ extra }}</text></view>
			<slot />
		</view>
		<!-- 底部 -->
		<view v-if="isFooter" class="card__footer border-top">
			<slot name="footer"> 
			</slot>
		</view>
	</view>
</template>

<script>
	/**
	 * Card 卡片
	 * @description 卡片视图组件
	 * @property {String} title 标题文字
	 * @property {String} subTitle 副标题（仅仅mode=title下生效）
	 * @property {String} extra 标题额外信息
	 * @property {String} note 标题左侧缩略图
	 * @property {String} thumbnail 底部信息
	 * @property {String} mode = [basic|style|title] 卡片模式
	 * 	@value basic 基础卡片
	 * 	@value style 图文卡片
	 * 	@value title 标题卡片
	 * @property {Boolean} isFull = [true | false] 卡片内容是否通栏，为 true 时将去除padding值
	 * @property {Boolean} isShadow = [true | false] 卡片内容是否开启阴影
	 * @event {Function} click 点击 Card 触发事件
	 */
	export default {
		name: 'AempCard',
		config: {
			component: true
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			subTitle:{
				type: String,
				default: ''
			},
			extra: {
				type: String,
				default: ''
			},
			isFooter: {
				type: Boolean,
				default: false
			},
			thumbnail: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'basic'
			},
			isFull: {
				// 内容区域是否通栏
				type: Boolean,
				default: false
			},
			isShadow: {
				// 是否开启阴影
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
/* 边框颜色 */
	$border-color:#c8c7cc;
	$spacing-col-lg: 24px;
	$spacing-row-lg: 30px;
	$bg-color:#ffffff;
	$spacing-col-base: 16px;
	$font-size-base:28px;
	$font-size-sm:24px;
	$img-size-sm:40px;
	$font-size-lg:32px;
	$bg-color-grey:#f8f8f8;
	$text-color:#333;//基本色
	$text-color-grey:#999;//辅助灰色，如加载更多的提示信息
	$bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色
	.card {
		display: flex;
		flex: 1;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		margin: $spacing-col-lg $spacing-row-lg;
		background-color: $bg-color;
		position: relative;
		flex-direction: column;
		border-radius: 5px;
		overflow: hidden;
	}

	.border {
		position: relative;
		border-color: $border-color;
		border-style: solid;
		border-width: 0.5px;
		z-index: 1;
	}

	.border:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border: 1px solid $border-color;
		border-radius: 10px;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}

	.border-bottom {
		position: relative;
		border-bottom: 0.5px solid;
		border-bottom-color: $border-color;
		z-index: 1;
	}

	.border-bottom:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border-bottom: 1px solid $border-color;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}

	.border-top {
		position: relative;
		border-top-color: $border-color;
		border-top-style: solid;
		border-top-width: 0.5px;
		z-index: 1;
	}
	.border-top:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border-top: 1px solid $border-color;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}

	.card__thumbnailimage {
		position: relative;
		flex-direction: column;
		justify-content: center;
		height: 250px;
		overflow: hidden;
	}

	.card__thumbnailimage-box {
		display: flex;
		flex: 1;
		flex-direction: row;
		overflow: hidden;
	}

	.card__thumbnailimage-image {
		flex: 1;
	}

	.card__thumbnailimage-title {
		display: flex;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		flex-direction: row;
		padding: $spacing-col-base $spacing-col-lg;
		background-color: $bg-color-mask;
	}

	.card__thumbnailimage-title-text {
		flex: 1;
		font-size: $font-size-base;
		color: #fff;
	}

	.card__title {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px;

	}
	.card__title-box {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.card__title-header {
		width: 80px;
		height: 80px;
		overflow: hidden;
		border-radius: 5px;
	}

	.card__title-header-image {
		width: 80px;
		height: 80px;
	}

	.card__title-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		padding-left: 10px;
		height: 80px;
		overflow: hidden;
	}

	.card__title-content-title {
		font-size: $font-size-base;
	}

	.card__title-content-extra {
		font-size: $font-size-sm;
		line-height: 27px;
		color: $text-color-grey;
	}

	.card__header {
		display: flex;
		position: relative;
		flex-direction: row;
		padding: $spacing-col-lg;
		align-items: center;
	}

	.card__header-title {
		display: flex;
		flex-direction: row;
		margin-right: $spacing-col-base;
		justify-content: flex-start;
		align-items: center;
	}

	.card__header-title-text {
		font-size: $font-size-lg;
		flex: 1;
		color: #333;
	}

	.card__header-extra-img {
		height: $img-size-sm;
		width: $img-size-sm;
		margin-right: $spacing-col-base;
	}

	.card__header-extra-text {
		flex: 1;
		margin-left: $spacing-col-base;
		font-size: $font-size-sm;
		text-align: right;
		color: $text-color-grey;
	}

	.card__content {
		color: $text-color;
	}

	.card__content--pd {
		padding: $spacing-col-lg;
	}

	.card__content-extra {
		font-size: $font-size-base;
		padding-bottom: 10px;
		color: $text-color-grey;
	}

	.card__footer {
		justify-content: space-between;
		padding: $spacing-col-lg;
	}

	.card--shadow {
		position: relative;
		box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
	}

	.card--full {
		margin: 0;
		border-radius: 0;
	}

	.card--full:after {
		border-radius: 0;
	}

	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		lines:1
	}
</style>
