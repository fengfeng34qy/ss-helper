<template>
		<view :class="disabled ? 'list-item--disabled' : ''" :hover-class="(!clickable && !link )|| disabled || showSwitch ? '' : 'list-item--hover'"
		 class="list-item" @tap="onClick">
			<view class="list-item__container list--border">
				<view v-if="thumb" class="list-item__icon">
					<image :src="thumb" class="list-item__icon-img" :class="['list--'+thumbSize]" />
				</view>
				<view v-else-if="showExtraIcon" class="list-item__icon">
					<aemp-icons :color="extraIcon.color" :size="extraIcon.size" :type="extraIcon.type" class="icon-wrapper" />
				</view>
				<view class="list-item__content">
					<slot />
					<text v-if="title" class="list-item__content-title">{{ title }}</text>
					<text v-if="note" class="list-item__content-note">{{ note }}</text>
				</view>
				<view class="list-item__extra">
					<text v-if="rightText" class="list-item__extra-text">{{rightText}}</text>
					<aemp-badge v-if="showBadge" :type="badgeType" :text="badgeText" />
					<switch v-if="showSwitch" :disabled="disabled" :checked="switchChecked" @change.stop="onSwitchChange" />
					<slot name="right"></slot>
					<aemp-icons v-if="link" :size="16" class="icon-wrapper" color="#bbb" type="arrowright" />
				</view>
			</view>
		</view>
</template>

<script>
	import aempIcons from '../aemp-icons/aemp-icons.vue'
	import aempBadge from '../aemp-badge/aemp-badge.vue'

	/**
	 * ListItem 列表子组件
	 * @description 列表子组件
	 * @property {String} 	title 							标题
	 * @property {String} 	note 							描述
	 * @property {String} 	thumb 							左侧缩略图，若thumb有值，则不会显示扩展图标
	 * @property {String}  	thumbSize = [lg|base|sm]		略缩图大小
	 * 	@value 	 lg			大图
	 * 	@value 	 base		一般
	 * 	@value 	 sm			小图
	 * @property {String} 	badgeText						数字角标内容
	 * @property {String} 	badgeType 						数字角标类型
	 * @property {String} 	rightText 						右侧文字内容
	 * @property {Boolean} 	disabled = [true|false]			是否禁用
	 * @property {Boolean} 	clickable = [true|false] 		是否开启点击反馈
	 * @property {String} 	link = [navigateTo|redirectTo|reLaunch|switchTab] 是否展示右侧箭头并开启点击反馈
	 *  @value 	navigateTo 	同 this.$api.navigateTo()
	 * 	@value redirectTo 	同 this.$api.redirectTo()
	 * 	@value reLaunch   	同 this.$api.reLaunch()
	 * 	@value switchTab  	同 this.$api.switchTab()
	 * @property {String} 	to  							跳转目标页面
	 * @property {Boolean} 	showBadge = [true|false] 		是否显示数字角标
	 * @property {Boolean} 	showSwitch = [true|false] 		是否显示Switch
	 * @property {Boolean} 	switchChecked = [true|false] 	Switch是否被选中
	 * @property {Boolean} 	showExtraIcon = [true|false] 	左侧是否显示扩展图标
	 * @property {Object} 	extraIcon 						扩展图标参数，格式为 {color: '#4cd964',size: '22',type: 'spinner'}
	 * @event {Function} 	click 							点击 ListItem 触发事件
	 * @event {Function} 	switchChange 					点击切换 Switch 时触发
	 */
	export default {
		name: 'AempListItem',
		components: {
			aempIcons,
			aempBadge
		},
		config: {
            component: true
        },
		props: {
			title: {
				type: String,
				default: ''
			},
			note: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			clickable: {
				type: Boolean,
				default: false
			},
			link: {
				type: Boolean,
				default: false
			},
			to: {
				type: String,
				default: ''
			},
			showBadge: {
				type: Boolean,
				default: false
			},
			showSwitch: {
				type: Boolean,
				default: false
			},
			switchChecked: {
				type: Boolean,
				default: false
			},
			badgeText: {
				type: String,
				default: ''
			},
			badgeType: {
				type: String,
				default: 'success'
			},
			rightText: {
				type: String,
				default: ''
			},
			thumb: {
				type: String,
				default: ''
			},
			thumbSize: {
				type: String,
				default: 'medium'
			},
			showExtraIcon: {
				type: Boolean,
				default: false
			},
			extraIcon: {
				type: Object,
				default () {
					return {
						type: 'contact',
						color: '#000000',
						size: 20
					}
				}
			}
		},
		methods: {
			onClick() {
				if (this.clickable || this.link) {
					if (!this.to) {
						this.$emit('click', {
							data: {}
						})
					}
				}
				if (this.to) {
					this.openPage()
				}
			},
			onSwitchChange(e) {
				this.$emit('switchChange', e.detail)
			},
			openPage() {
				if (['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].indexOf(this.link) !== -1) {
					this.pageApi(this.link)
				} else {
					this.pageApi('navigateTo')
				}
			},
			pageApi(api) {
				this.$api[api]({
					url: this.to,
					complete: (res) => {
						this.$emit('click', {
							data: res
						})
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	$spacing-col-lg: 25px;
	$spacing-row-lg: 18px;
	$font-size-lg:20px;
	$bg-color-hover:#f1f1f1;//点击状态颜色
	$border-color:#e5e5e5;
	$font-size-base:25px;
	$font-size-sm:18px;
	$text-color-grey:#999;//辅助灰色，如加载更多的提示信息
	$img-size-sm:20px;
	$img-size-base:26px;
	$img-size-lg:40px;
	$list-item-pd: $spacing-col-lg $spacing-row-lg;

	.list-item {
		font-size: $font-size-lg;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		padding-left: $spacing-row-lg;
		background-color: #fff;
	}

	.list-item--disabled {
		opacity: 0.3;
	}

	.list-item--hover {
		background-color: $bg-color-hover;
	}

	.list-item__container {
		position: relative;
		display: flex;
		flex-direction: row;
		padding: $list-item-pd;
		padding-left: 0;
		flex: 1;
		position: relative;
		justify-content: space-between;
		align-items: center;
	}

	.list--border {
		position: relative;
		border-top-color: $border-color;
		border-top-style: solid;
		border-top-width: 0.5px;
	}

	.list--border:after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: $border-color;
	}

	.list-item__content {
		display: flex;
		flex: 1;
		overflow: hidden;
		flex-direction: column;
		color: #3b4144;
	}

	.list-item__content-title {
		font-size: $font-size-base;
		color: #3b4144;
		overflow: hidden;
	}

	.list-item__content-note {
		margin-top: 6px;
		color: $text-color-grey;
		font-size: $font-size-sm;
		overflow: hidden;
	}

	.list-item__extra {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.list-item__icon {
		margin-right: 18px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.list-item__icon-img {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.list--lg {
		height: $img-size-lg;
		width: $img-size-lg;
	}

	.list--base {
		height: $img-size-base;
		width: $img-size-base;
	}

	.list--sm {
		height: $img-size-sm;
		width: $img-size-sm;
	}

	.list-item__extra-text {
		color: $text-color-grey;
		font-size: $font-size-sm;
	}
</style>
