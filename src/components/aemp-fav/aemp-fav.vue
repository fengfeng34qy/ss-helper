<template>
	<view :class="[circle === true || circle === 'true' ? 'fav--circle' : '']" :style="[{ backgroundColor: isChecked ? bgColorChecked : bgColor }]"
	 @tap="onClick" class="fav">
		<view class="fav-star" v-if="!isChecked && (star === true || star === 'true')">
			<aemp-icons :color="fgColor" :style="{color: isChecked ? fgColorChecked : fgColor}" size="14" type="star-filled" />
		</view>
		<text :style="{color: isChecked ? fgColorChecked : fgColor}" class="fav-text">{{ isChecked ? contentText.contentFav : contentText.contentDefault }}</text>
	</view>
</template>

<script>
	import aempIcons from "../aemp-icons/aemp-icons.vue";

	/**
	 * Fav 收藏按钮
	 * @description 用于收藏功能，可点击切换选中、不选中的状态
	 * @property {Boolean} star = [true|false] 按钮是否带星星
	 * @property {String} bgColor 未收藏时的背景色
	 * @property {String} bgColorChecked 已收藏时的背景色
	 * @property {String} fgColor 未收藏时的文字颜色
	 * @property {String} fgColorChecked 已收藏时的文字颜色
	 * @property {Boolean} circle = [true|false] 是否为圆角
	 * @property {Boolean} checked = [true|false] 是否为已收藏
	 * @property {Object} contentText = [true|false] 收藏按钮文字
	 * @event {Function} click 点击 fav按钮触发事件
	 */
	export default {
		name: "AempFav",
		config: {
            component: true
        },
		components: {
			aempIcons
		},
		props: {
			star: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: "#eeeeee"
			},
			fgColor: {
				type: String,
				default: "#666666"
			},
			bgColorChecked: {
				type: String,
				default: "#007aff"
			},
			fgColorChecked: {
				type: String,
				default: "#FFFFFF"
			},
			circle: {
				type: Boolean,
				default: false
			},
			checked: {
				type: Boolean,
				default: false
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentDefault: "收藏",
						contentFav: "已收藏"
					};
				}
			}
		},
		data(){
			return {
				isChecked:false
			}
		},
		watch: {
			checked(newValue,oldValue) {
				this.isChecked = newValue;
			}
		},
		methods: {
			onClick() {
				this.$emit("click");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$font-size-base:14px;
	$fav-height: 40px;

	.fav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: $fav-height;
		line-height: $fav-height;
		text-align: center;
		border-radius: 3px;

	}

	.fav--circle {
		border-radius: 30px;
	}

	.fav-star {
		display: flex;
		height: $fav-height;
		line-height: 24px;
		margin-right: 3px;
		align-items: center;
		justify-content: center;
	}

	.fav-text {
		display: flex;
		height: $fav-height;
		line-height: $fav-height;
		align-items: center;
		justify-content: center;
		font-size: $font-size-base;
	}
</style>
