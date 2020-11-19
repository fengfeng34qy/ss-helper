<template>
	<view class="numbox">
		<view @tap="_calcValue('minus')" class="numbox__minus">
			<text class="numbox--text" :class="{ 'numbox--disabled': inputValue <= min || disabled }">-</text>
		</view>
		<input :disabled="disabled" @blur="_onBlur" class="numbox__value" type="number" v-model="inputValue" />
		<view @tap="_calcValue('plus')" class="numbox__plus">
			<text class="numbox--text" :class="{ 'numbox--disabled': inputValue >= max || disabled }">+</text>
		</view>
	</view>
</template>
<script>

	/**
	 * NumberBox 数字输入框
	 * @description 带加减按钮的数字输入框
	 * @property {Number} value 输入框当前值
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 每次点击改变的间隔大小
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
	 */

	export default {
		name: "AempNumberBox",
		config: {
			component: true
		},
		props: {
			value: {
				type: Number,
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: 0
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					this.$emit("change", Number(newVal));
				}
			}
		},
		created() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						return;
					}
					if (value > (this.max * scale)) {
						value = this.max * scale
					}
				} else if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}

				this.inputValue = String(value / scale);
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + "").split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				this.inputValue = value;
			}
		}
	};
</script>
<style lang="scss" scoped>
	$box-height: 70px;
	$box-line-height: 26px;
	$box-width: 70px;
	$bg-color:#ffffff;
	$font-size-lg:16px;
	$border-color:#e5e5e5;
	$text-color:#333;//基本色
	$bg-color-grey:#f8f8f8;
	$border-radius-base: 3px;
	$bg-color-grey:#f8f8f8;
	$text-color-disable:#c0c0c0;

	.numbox {
		display: flex;
		flex-direction: row;
		height: $box-height;
		line-height: $box-height;
		width: 200px;
	}

	.numbox__value {
		background-color: $bg-color;
		width: 60px;
		height: $box-height;
		text-align: center;
		font-size: $font-size-lg;
		border-width: 1px;
		min-height:0px;
		border-style: solid;
		border-color: $border-color;
		border-left-width: 0;
		border-right-width: 0;
	}

	.numbox__minus {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: $box-width;
		height: $box-height;
		font-size: 20px;
		color: $text-color;
		background-color: $bg-color-grey;
		border-width: 1px;
		border-style: solid;
		border-color: $border-color;
		border-top-left-radius: $border-radius-base;
		border-bottom-left-radius: $border-radius-base;
		border-right-width: 0;
	}

	.numbox__plus {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: $box-width;
		height: $box-height;
		border-width: 1px;
		border-style: solid;
		border-color: $border-color;
		border-top-right-radius: $border-radius-base;
		border-bottom-right-radius: $border-radius-base;
		background-color: $bg-color-grey;
		border-left-width: 0;
	}

	.numbox--text {
		font-size: 40px;
		color: $text-color;
	}

	.numbox--disabled {
		color: $text-color-disable;
	}
</style>
