<template>
	<view v-if="showPopup" class="popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'custom' : '']" class="popup__mask" @tap="close(true)" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'custom' : '']" class="popup__wrapper" @tap="close(true)">
			<view class="popup__wrapper-box" @tap.stop="clear">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AempPopup',
		config: {
			component: true
		},
		props: {
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
			type: {
				type: String,
				default: 'center'
			},
			// 是否开启自定义
			custom: {
				type: Boolean,
				default: false
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			},
			// 是否显示弹框
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				ani: '',
				showPopup: false
			}
		},
		watch: {
			show(newValue) {
				if (newValue) {
					this.open()
				} else {
					this.close()
				}
			}
		},
		methods: {
			clear() {},
			open() {
				this.$emit('change', {
					show: true
				})
				this.showPopup = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.ani =  this.type
					}, 30)
				})
			},
			close(type) {
				if (!this.maskClick && type) return
				this.$emit('change', {
					show: false
				})
				this.ani = ''
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = false
					}, 300)
				})
			}
		}
	}
</script>
<style scoped>
	@charset "UTF-8";
	.popup {
		position: fixed;
		top: 0;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		overflow: hidden
	}

	.popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background: rgba(0, 0, 0, .4);
		opacity: 0
	}

	.popup__mask.ani {
		transition: all .3s
	}

	.popup__mask.bottom,
	.popup__mask.center,
	.popup__mask.top {
		opacity: 1
	}

	.popup__wrapper {
		position: absolute;
		z-index: 999;
		box-sizing: border-box
	}

	.popup__wrapper.ani {
		transition: all .3s
	}

	.popup__wrapper.top {
		top: 0;
		left: 0;
		width: 100%;
		transform: translateY(-100%)
	}

	.popup__wrapper.bottom {
		bottom: 0;
		left: 0;
		width: 100%;
		transform: translateY(100%)
	}

	.popup__wrapper.center {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: scale(1.2);
		opacity: 0
	}

	.popup__wrapper-box {
		position: relative;
		box-sizing: border-box
	}

	.popup__wrapper.custom .popup__wrapper-box {
		padding: 30px;
		background: #fff
	}

	.popup__wrapper.custom.center .popup__wrapper-box {
		position: relative;
		max-width: 80%;
		max-height: 80%;
		overflow-y: scroll
	}

	.popup__wrapper.custom.bottom .popup__wrapper-box,
	.popup__wrapper.custom.top .popup__wrapper-box {
		width: 100%;
		max-height: 500px;
		overflow-y: scroll
	}

	.popup__wrapper.bottom,
	.popup__wrapper.top {
		transform: translateY(0)
	}

	.popup__wrapper.center {
		transform: scale(1);
		opacity: 1
	}
	
</style>