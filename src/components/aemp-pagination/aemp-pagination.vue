<template>
	<view class="pagination">
		<view class="pagination__btn" :class="currentIndex === 1 ? 'pagination--disabled' : 'pagination--enabled'"
		 :hover-class="currentIndex === 1 ? '' : 'pagination--hover'" :hover-start-time="20" :hover-stay-time="70"
		 @tap="clickLeft">
			<aemp-icons v-if="showIcon===true || showIcon === 'true'" color="#000" size="20" type="arrowleft" />
			<view v-else><text class="pagination__child-btn">{{ prevText }}</text></view>
		</view>
		<view class="pagination__num">
			<view class="pagination__num-current">
				<text class="pagination__num-current-text" style="color:#007aff">{{ currentIndex }}</text><text class="pagination__num-current-text">/{{ maxPage || 0 }}</text>
			</view>
		</view>
		<view class="pagination__btn" :class="currentIndex === maxPage ? 'pagination--disabled' : 'pagination--enabled'"
		 :hover-class="currentIndex === maxPage ? '' : 'pagination--hover'" :hover-start-time="20" :hover-stay-time="70"
		 @tap="clickRight">
			<aemp-icons v-if="showIcon===true || showIcon === 'true'" color="#000" size="20" type="arrowright" />
			<view v-else><text class="pagination__child-btn">{{ nextText }}</text></view>
		</view>
	</view>
</template>

<script>
	import aempIcons from '../aemp-icons/aemp-icons.vue'

	/**
	 * Pagination 分页器
	 * @description 分页器组件，用于展示页码、请求数据等
	 * @property {String} prevText 左侧按钮文字
	 * @property {String} nextText 右侧按钮文字
	 * @property {Number} current 当前页
	 * @property {Number} total 数据总量
	 * @property {Number} pageSize 每页数据量
	 * @property {Number} showIcon = [true|false] 是否以 icon 形式展示按钮
	 * @event {Function} change 点击页码按钮时触发 ,e={type,current} current为当前页，type值为：next/prev，表示点击的是上一页还是下一个
	 */

	export default {
		name: 'AempPagination',
		config: {
			component: true
		},
		components: {
			aempIcons
		},
		props: {
			prevText: {
				type: String,
				default: '上一页'
			},
			nextText: {
				type: String,
				default: '下一页'
			},
			current: {
				type: Number,
				default: 1
			},
			total: { // 数据总量
				type: Number,
				default: 0
			},
			pageSize: { // 每页数据量
				type: Number,
				default: 10
			},
			showIcon: { // 是否以 icon 形式展示按钮
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				currentIndex: 1
			}
		},
		computed: {
			maxPage() {
				let maxPage = 1
				let total = Number(this.total)
				let pageSize = Number(this.pageSize)
				if (total && pageSize) {
					maxPage = Math.ceil(total / pageSize)
				}
				return maxPage
			}
		},
		watch: {
			current(val) {
				this.currentIndex = +val
			}
		},
		created() {
			this.currentIndex = +this.current
		},
		methods: {
			clickLeft() {
				if (Number(this.currentIndex) === 1) {
					return
				}
				this.currentIndex -= 1
				this.change('prev')
			},
			clickRight() {
				if (Number(this.currentIndex) === this.maxPage) {
					return
				}
				this.currentIndex += 1
				this.change('next')
			},
			change(e) {
				this.$emit('change', {
					type: e,
					current: this.currentIndex
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font-size-base:25px;
	$bg-color-grey:#f8f8f8;
	$border-color:#e5e5e5;
	$text-color:#333;//基本色
	$bg-color-hover:#f1f1f1;//点击状态颜色
	.pagination {
		display: flex;
		position: relative;
		overflow: hidden;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.pagination__btn {
		display: flex;
		width: 100px;
		height: 50px;
		line-height: 50px;
		font-size: $font-size-base;
		position: relative;
		background-color: $bg-color-grey;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-width: 1px;
		border-style: solid;
		border-color: $border-color;
	}

	.pagination__child-btn {
		display: flex;
		font-size: $font-size-base;
		position: relative;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.pagination__num {
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 50px;
		line-height: 50px;
		font-size: $font-size-base;
		color: $text-color;
	}

	.pagination__num-current {
		display: flex;
		flex-direction: row;
	}

	.pagination__num-current-text {
		font-size: 25px;
	}

	.pagination--enabled {
		color: #333333;
		opacity: 1;
	}

	.pagination--disabled {
		opacity: 0.3;
	}

	.pagination--hover {
		color: rgba(0, 0, 0, .6);
		background-color: $bg-color-hover;
	}
</style>
