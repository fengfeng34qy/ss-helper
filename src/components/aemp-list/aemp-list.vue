<template>
	<view class="list">
		<view class="list--border-top"></view>
			<slot />
		<view class="list--border-bottom"></view>
	</view>
</template>

<script>
	/**
	 * List 列表
	 * @description 列表组件
	 */
	export default {
		name: 'AempList',
		config: {
            component: true
        }
	}
</script>
<style lang="scss" scoped>
	$border-color:#e5e5e5;
	$bg-color:#ffffff;
	.list {
		display: flex;
		background-color: $bg-color;
		position: relative;
		flex-direction: column;
	}

	.list--border-top {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: $border-color;
		z-index: 1;
	}

	.list--border-bottom {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		height: 1px;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: $border-color;
	}
</style>
