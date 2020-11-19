<template>
	<view :class="[
      'tag--' + tagType,
      disabled === true || disabled === 'true' ? 'tag--disabled' : '',
      tagInverted === true || tagInverted === 'true' ? tagType + '-tag--inverted' : '',
      circle === true || circle === 'true' ? 'tag--circle' : '',
      mark === true || mark === 'true' ? 'tag--mark' : '',
      'tag--' + size
    ]"
	 @tap="onClick" class="tag" v-if="text">
		<text :class="[tagType === 'default' ? 'tag--default':'tag-text',tagInverted === true || tagInverted === 'true' ? 'tag-text--'+ tagType : '',size === 'small' ? 'tag-text--small':'' ]">{{ text }}</text>
	</view>
</template>

<script>
	/**
	 * Tag 标签
	 * @description 用于展示1个或多个文字标签，可点击切换选中、不选中的状态
	 * @property {String} text 标签内容
	 * @property {String} size = [normal|small] 大小尺寸
	 * 	@value normal 正常
	 * 	@value small 小尺寸
	 * @property {String} type = [default|primary|success｜warning｜error｜royal]  颜色类型
	 * 	@value default 灰色
	 * 	@value primary 蓝色
	 * 	@value success 绿色
	 * 	@value warning 黄色
	 * 	@value error 红色
	 * 	@value royal 紫色
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @property {Boolean} inverted = [true|false] 是否无需背景颜色（空心标签）
	 * @property {Boolean} circle = [true|false] 是否为圆角
	 * @event {Function} click 点击 Tag 触发事件
	 */

	export default {
		name: "AempTag",
		config: {
            component: true
        },
		props: {
			type: {
				// 标签类型default、primary、success、warning、error、royal
				type: String,
				default: "default"
			},
			size: {
				// 标签大小 normal, small
				type: String,
				default: "normal"
			},
			// 标签内容
			text: {
				type: String,
				default: ""
			},
			disabled: {
				// 是否为禁用状态
				type: Boolean,
				default: false
			},
			inverted: {
				// 是否为空心
				type: Boolean,
				default: false
			},
			circle: {
				// 是否为圆角样式
				type: Boolean,
				default: false
			},
			mark: {
				// 是否为标记样式
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				tagType:"default",
				tagInverted: false
			}
		},
		watch: {
			type(val) {
				this.tagType = val;
			},
			inverted(val){
				this.tagInverted = val;
			}
		},
		created(){
			this.tagType = this.type;
			this.tagInverted = this.inverted;
		},
		methods: {
			onClick() {
				if (this.disabled === true || this.disabled === "true") {
					return;
				}
				this.$emit("click");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$tag-pd: 0px 16px;
	$tag-small-pd: 0px 8px;
	$text-color:#333;//基本色
	$border-radius-base: 3px;
	$bg-color-grey:#f8f8f8;
	$bg-color:#ffffff;
	$font-size-sm:12px;
	$font-size-base:14px;
	$text-color-inverse:#fff;//反色
	$color-primary: #007aff;
	$color-success: #4cd964;
	$color-warning: #f0ad4e;
	$color-error: #dd524d;

	.tag {
		display: flex;
		padding: $tag-pd;
		height: 30px;
		line-height: 30px;
		justify-content: center;
		color: $text-color;
		border-radius: $border-radius-base;
		background-color: $bg-color-grey;
		border-width: 1px;
		border-style: solid;
		border-color: $bg-color-grey;
	}

	.tag--circle {
		border-radius: 15px;
	}

	.tag--mark {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.tag--disabled {
		opacity: 0.5;
	}

	.tag--small {
		height: 20px;
		padding: $tag-small-pd;
		line-height: 20px;
		font-size: $font-size-sm;
	}

	.tag--default {
		color: $text-color;
		font-size: $font-size-base;
	}

	.tag-text--small {
		font-size: $font-size-sm !important;
	}

	.tag-text {
		color: $text-color-inverse;
		font-size: $font-size-base;
	}

	.tag-text--primary {
		color: $color-primary !important;
	}

	.tag-text--success {
		color: $color-success !important;
	}

	.tag-text--warning {
		color: $color-warning !important;
	}

	.tag-text--error {
		color: $color-error !important;
	}

	.tag--primary {
		color: $text-color-inverse;
		background-color: $color-primary;
		border-width: 1px;
		border-style: solid;
		border-color: $color-primary;
	}

	.primary-tag--inverted {
		color: $color-primary;
		background-color: $bg-color;
		border-width: 1px;
		border-style: solid;
		border-color: $color-primary;
	}

	.tag--success {
		color: $text-color-inverse;
		background-color: $color-success;
		border-width: 1px;
		border-style: solid;
		border-color: $color-success;
	}

	.success-tag--inverted {
		color: $color-success;
		background-color: $bg-color;
		border-width: 1px;
		border-style: solid;
		border-color: $color-success;
	}

	.tag--warning {
		color: $text-color-inverse;
		background-color: $color-warning;
		border-width: 1px;
		border-style: solid;
		border-color: $color-warning;
	}

	.warning-tag--inverted {
		color: $color-warning;
		background-color: $bg-color;
		border-width: 1px;
		border-style: solid;
		border-color: $color-warning;
	}

	.tag--error {
		color: $text-color-inverse;
		background-color: $color-error;
		border-width: 1px;
		border-style: solid;
		border-color: $color-error;
	}

	.error-tag--inverted {
		color: $color-error;
		background-color: $bg-color;
		border-width: 1px;
		border-style: solid;
		border-color: $color-error;
	}

	.tag--inverted {
		color: $text-color;
		background-color: $bg-color;
		border-width: 1px;
		border-style: solid;
		border-color: $bg-color-grey;
	}
</style>
