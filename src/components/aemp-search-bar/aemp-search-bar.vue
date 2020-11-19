<template>
	<view class="searchbar">
		<view :style="{borderRadius:radius+'px',backgroundColor: bgColor}" class="searchbar__box" @tap="searchClick">
			<view class="searchbar__box-icon-search">
				<aemp-icons color="#999999" size="16" type="search" />
			</view>
			<input v-if="show" :focus="showSync" :placeholder="placeholder" :maxlength="maxlength" @confirm="confirm" class="searchbar__box-search-input"
			 confirm-type="search" type="text" v-model="searchVal" />
			<text v-else class="searchbar__text-placeholder">{{ placeholder }}</text>
			<view v-if="show && (clearButton==='always'||clearButton==='auto'&&searchVal!=='')" class="searchbar__box-icon-clear" @tap="clear">
				<aemp-icons color="#999999" size="24" type="clear" />
			</view>
		</view>
		<text @tap="cancel" class="searchbar__cancel" v-if="cancelButton ==='always' || show && cancelButton ==='auto'">{{cancelText}}</text>
	</view>
</template>

<script>
	import aempIcons from "../aemp-icons/aemp-icons.vue";

	/**
	 * SearchBar 搜索栏
	 * @property {Number} radius 搜索栏圆角
	 * @property {Number} maxlength 输入最大长度
	 * @property {String} placeholder 搜索栏Placeholder
	 * @property {String} clearButton = [always|auto|none] 是否显示清除按钮
	 * 	@value always 一直显示
	 * 	@value auto 输入框不为空时显示
	 * 	@value none 一直不显示
	 * @property {String} cancelButton = [always|auto|none] 是否显示取消按钮
	 * 	@value always 一直显示
	 * 	@value auto 输入框不为空时显示
	 * 	@value none 一直不显示
	 * @property {String} cancelText 取消按钮的文字
	 * @property {String} bgColor 输入框背景颜色
	 * @event {Function} confirm SearchBar 的输入框 confirm 事件，返回参数为SearchBar的value，e={value:Number}
	 * @event {Function} input SearchBar 的 value 改变时触发事件，返回参数为SearchBar的value，e={value:Number}
	 * @event {Function} cancel 点击取消按钮时触发事件，返回参数为SearchBar的value，e={value:Number}
	 */

	export default {
		name: "AempSearchBar",
		components: {
			aempIcons
		},
		config: {
            component: true
        },
		props: {
			placeholder: {
				type: String,
				default: "请输入搜索内容"
			},
			radius: {
				type: [Number, String],
				default: 5
			},
			clearButton: {
				type: String,
				default: "auto"
			},
			cancelButton: {
				type: String,
				default: "auto"
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			bgColor: {
				type: String,
				default: "#F8F8F8"
			},
			maxlength: {
				type: [Number, String],
				default: 100
			}
		},
		data() {
			return {
				show: false,
				showSync: false,
				searchVal: ""
			}
		},
		watch: {
			searchVal() {
				this.$emit("input", {
					value: this.searchVal
				})
			}
		},
		methods: {
			searchClick() {
				if (this.show) {
					return
				}
				this.searchVal = ""
				this.show = true;
				this.$nextTick(() => {
					this.showSync = true;
				})
			},
			clear() {
				this.searchVal = ""
			},
			cancel() {
				this.$emit("cancel", {
					value: this.searchVal
				});
				this.searchVal = ""
				this.show = false
				this.showSync = false
				this.$api.hideKeyboard()
			},
			confirm() {
				this.$api.hideKeyboard();
				this.$emit("confirm", {
					value: this.searchVal
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$searchbar-height: 70px;
	$spacing-col-base: 8px;
	$bg-color:#ffffff;
	$border-color:#e5e5e5;
	$text-color-placeholder: #808080;
	$font-size-base:20px;
	$text-color:#333;//基本色

	.searchbar {
		display: flex;
		flex-direction: row;
		position: relative;
		padding: $spacing-col-base;
		background-color: $bg-color;
	}

	.searchbar__box {
		display: flex;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		flex: 1;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		height: $searchbar-height;
		padding: 5px 8px 5px 0px;
		border-width: 0.5px;
		border-style: solid;
		border-color: $border-color;
	}

	.searchbar__box-icon-search {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: $text-color-placeholder;
	}

	.searchbar__box-search-input {
		flex: 1;
		font-size: $font-size-base;
		color: $text-color;
	}

	.searchbar__box-icon-clear {
		align-items: center;
		padding-left: 5px;
	}

	.searchbar__text-placeholder {
		font-size: $font-size-base;
		color: $text-color-placeholder;
		margin-left: 5px;
	}

	.searchbar__cancel {
		padding-left: 10px;
		line-height: $searchbar-height;
		font-size: 18px;
		color: $text-color;
	}
</style>
