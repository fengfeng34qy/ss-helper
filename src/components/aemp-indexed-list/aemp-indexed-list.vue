<template>
	<view class="indexed-list" ref="list" id="list">
		<scroll-view :scroll-into-view="scrollViewId" class="indexed-list__scroll" scroll-y>
			<view v-for="(list, idx) in lists" :key="idx" :id="'indexed-list-' + idx">
				<aemp-indexed-list-item :list="list" :loaded="loaded" :idx="idx" :showSelect="showSelect" @itemClick="onClick"></aemp-indexed-list-item>
			</view>
		</scroll-view>
		<view :class="touchmove ? 'indexed-list__menu--active' : ''" @touchstart="touchStart" @touchmove.stop.prevent="touchMove"
		 @touchend="touchEnd" class="indexed-list__menu">
			<view v-for="(list, key) in lists" :key="key" class="indexed-list__menu-item">
				<text class="indexed-list__menu-text" :class="touchmoveIndex == key ? 'indexed-list__menu-text--active' : ''">{{ list.key }}</text>
			</view>
		</view>
		<view v-if="touchmove" class="indexed-list__alert-wrapper">
			<text class="indexed-list__alert">{{ lists[touchmoveIndex].key }}</text>
		</view>
	</view>
</template>
<script>
	import aempIndexedListItem from '../aemp-indexed-list-item/aemp-indexed-list-item.vue';

	/**
	 * IndexedList 索引列表
	 * @description 用于展示索引列表
	 * @property {Boolean} showSelect = [true|false] 展示模式
	 * 	@value true 展示模式
	 * 	@value false 选择模式
	 * @property {Object} options 索引列表需要的数据对象
	 * @event {Function} click 点击列表事件 ，返回当前选择项的事件对象
	 */
	export default {
		name: 'AempIndexedList',
		components: {
			aempIndexedListItem
		},
		config: {
            component: true
        },
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				lists: [],
				winHeight: 0,
				itemHeight: 0,
				winOffsetY: 0,
				touchmove: false,
				touchmoveIndex: -1,
				scrollViewId: '',
				touchmoveTimeout: '',
				loaded: false
			}
		},
		watch: {
			options: {
				handler: function() {
					this.setList()
				},
				deep: true
			}
		},
		mounted() {
			setTimeout(() => {
				this.setList()
			}, 50)
			setTimeout(() => {
				this.loaded = true
			}, 300);
		},
		methods: {
			setList() {
				let index = 0;
				this.lists = []
				this.options.forEach((value, index) => {
					if (value.data.length === 0) {
						return
					}
					let indexBefore = index
					let items = value.data.map(item => {
						let obj = {}
						obj['key'] = value.letter
						obj['name'] = item
						obj['itemIndex'] = index
						index++
						obj.checked = item.checked ? item.checked : false
						return obj
					})
					this.lists.push({
						title: value.letter,
						key: value.letter,
						items: items,
						itemIndex: indexBefore
					})
				})
			},
			touchStart(e) {
				this.touchmove = true
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = 'indexed-list-' + index
					this.touchmoveIndex = index
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				if (this.touchmoveIndex === index) {
					return false
				}
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = 'indexed-list-' + index
					this.touchmoveIndex = index
				}
			},
			touchEnd() {
				this.touchmove = false
				this.touchmoveIndex = -1
			},
			onClick(e) {
				let {
					idx,
					index
				} = e
				let obj = {}
				for (let key in this.lists[idx].items[index]) {
					obj[key] = this.lists[idx].items[index][key]
				}
				let select = []
				if (this.showSelect) {
					this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked
					this.lists.forEach((value, idx) => {
						value.items.forEach((item, index) => {
							if (item.checked) {
								let obj = {}
								for (let key in this.lists[idx].items[index]) {
									obj[key] = this.lists[idx].items[index][key]
								}
								select.push(obj)
							}
						})
					})
				}
				this.$emit('click', {
					item: obj,
					select: select
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.indexed-list {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
	}

	.indexed-list__scroll {
		flex: 1;
	}

	.indexed-list__menu {
		width: 24px;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
	}

	.indexed-list__menu-item {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.indexed-list__menu-text {
		line-height: 20px;
		font-size: 12px;
		text-align: center;
		color: #aaa;
	}

	.indexed-list__menu--active {
		background-color: rgb(200, 200, 200);
	}

	.indexed-list__menu-text--active {
		color: #007aff;
	}

	.indexed-list__alert-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.indexed-list__alert {
		width: 80px;
		height: 80px;
		border-radius: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 35px;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
