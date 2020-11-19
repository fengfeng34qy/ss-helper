<template>
	<view v-if="visibleSync" :class="{ 'drawer--visible': showDrawer }" class="drawer" @touchmove.stop.prevent="clear">
		<view class="drawer__mask" :class="{ 'drawer__mask--visible': showDrawer && mask }" @tap="close('mask')" />
		<view class="drawer__content drawer--right" v-if="rightMode" :class="{'drawer__content--visible': showDrawer}" :style="{width:drawerWidth+'px'}">
			<slot />
		</view>
		<view class="drawer__content drawer--left" v-else :class="{'drawer__content--visible': showDrawer}" :style="{width:drawerWidth+'px'}">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AempDrawer',
		config: {
            component: true
        },
		props: {
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: {
				type: String,
				default: ''
			},
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: Boolean,
				default: true
			},
			/**
			 * 遮罩是否可点击关闭
			 */
			maskClick:{
				type: Boolean,
				default: true
			},
			/**
			 * 抽屉宽度
			 */
			width: {
				type: Number,
				default: 220
			}
		},
		data() {
			return {
				visibleSync: false,
				showDrawer: false,
				rightMode: false,
				watchTimer: null,
				drawerWidth: 220
			}
		},
		created() {
			this.drawerWidth = this.width
			this.rightMode = this.mode === 'right'
		},
		methods: {
			clear(){},
			close(type) {
				if((type === 'mask' && !this.maskClick) || !this.visibleSync) return
				this._change('showDrawer', 'visibleSync', false)
			},
			open() {
				if(this.visibleSync) return
				this._change('visibleSync', 'showDrawer', true)
			},
			_change(param1, param2, status) {
				this[param1] = status
				if (this.watchTimer) {
					clearTimeout(this.watchTimer)
				}
				this.watchTimer = setTimeout(() => {
					this[param2] = status
					this.$emit('change',status)
				}, status ? 50 : 300)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 抽屉宽度
	$drawer-width: 220px;
	$bg-color:#ffffff;
	$bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色

	.drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 999;
	}

	.drawer__content {
		display: block;
		position: absolute;
		top: 0;
		width: $drawer-width;
		bottom: 0;
		background-color: $bg-color;
		transition: transform 0.3s ease;
	}

	.drawer--left {
		left: 0;
		transform: translateX(-$drawer-width);
		transform: translateX(-100%);
	}

	.drawer--right {
		right: 0;
		transform: translateX($drawer-width);
		transform: translateX(100%);
	}

	.drawer__content--visible {
		transform: translateX(0px);
	}

	.drawer__mask {
		display: block;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: $bg-color-mask;
		transition: opacity 0.3s;
	}

	.drawer__mask--visible {
		display: block;
		opacity: 1;
	}
</style>
