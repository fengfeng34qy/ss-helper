<template>
	<view>
		<view v-if="loaded || list.itemIndex < 15" class="indexed-list__title-wrapper">
			<text v-if="list.items && list.items.length > 0" class="indexed-list__title">{{ list.key }}</text>
		</view>
		<view v-if="(loaded || list.itemIndex < 15) && list.items && list.items.length > 0" class="indexed-list__list">
			<view v-for="(item, index) in list.items" :key="index" class="indexed-list__item" hover-class="indexed-list__item--hover">
				<view class="indexed-list__item-container" @tap="onClick(idx, index)">
					<view class="indexed-list__item-border" :class="{'indexed-list__item-border--last':index===list.items.length-1}">
						<view v-if="showSelect" style="margin-right: 20px;">
							<aemp-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" />
						</view>
						<text class="indexed-list__item-content">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aempIcons from '../aemp-icons/aemp-icons.vue'
	export default {
		name: 'AempIndexedList',
		config: {
            component: true
        },
		components: {
			aempIcons
		},
		props: {
			loaded: {
				type: Boolean,
				default: false
			},
			idx: {
				type: Number,
				default: 0
			},
			list: {
				type: Object,
				default () {
					return {}
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick(idx, index) {
				this.$emit("itemClick", {
					idx,
					index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$bg-color:#ffffff;
	$border-color:#e5e5e5;
	$font-size-lg:16px;
	$spacing-row-lg: 15px;
	$font-size-sm:12px;

	.indexed-list__list {
		background-color: $bg-color;
		display: flex;
		flex-direction: column;
		border-top-style: solid;
		border-top-width: 1px;
		border-top-color: $border-color;
	}

	.indexed-list__item {
		font-size: $font-size-lg;
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.indexed-list__item-container {
		padding-left: $spacing-row-lg;
		flex: 1;
		position: relative;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.indexed-list__item-border {
		flex: 1;
		position: relative;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		padding: $spacing-row-lg;
		padding-left: 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: $border-color;
	}

	.indexed-list__item-border--last {
		border-bottom-width: 0px;
	}

	.indexed-list__item-content {
		flex: 1;
		font-size: 20px;
	}

	.indexed-list {
		display: flex;
		flex-direction: row;
	}

	.indexed-list__title-wrapper {
		display: flex;
		width: 100%;
		background-color: #f7f7f7;
	}

	.indexed-list__title {
		padding: 6px 12px;
		line-height: 24px;
		font-size: $font-size-sm;
	}
</style>
