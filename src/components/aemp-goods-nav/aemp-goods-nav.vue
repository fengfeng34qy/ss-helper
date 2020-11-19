<template>
	<view class="goods-nav">
		<!-- 底部占位 -->
		<view class="tab__seat" />
		<view class="tab__cart-box flex">
			<view class="flex tab__cart-sub-left">
				<view v-for="(item,index) in dataOptions" :key="index" class="flex tab__cart-button-left" @tap="onClick(index,item)">
					<view class="tab__icon">
						<aemp-icons :type="item.icon" :size="size" color="#646566"></aemp-icons>
					</view>
					<text class="tab__text">{{ item.text }}</text>
					<view class="flex tab__dot-box">
						<text v-if="item.info" :class="{ 'tab__dots': item.info > 9 }" class="tab__dot " :style="{'backgroundColor':item.infoBackgroundColor?item.infoBackgroundColor:'#ff0000',
						color:item.infoColor?item.infoColor:'#fff'
						}">{{ item.info }}</text>
					</view>
				</view>
			</view>
			<view :class="{'tab__right':fill}" class="flex tab__cart-sub-right ">
				<view v-for="(item,index) in buttonGroup" :key="index" :style="{backgroundColor:item.backgroundColor,color:item.color}"
				 class="flex tab__cart-button-right" @tap="buttonClick(index,item)"><text :style="{color:item.color}" class="tab__cart-button-right-text">{{ item.text }}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import aempIcons from '../aemp-icons/aemp-icons.vue'
	/**
	 * GoodsNav 商品导航
	 * @description 商品加入购物车、立即购买等
	 * @property {Array} options 组件参数
	 * @property {Array} buttonGroup 组件按钮组参数
	 * @property {Boolean} fill = [true | false] 组件按钮组参数
	 * @event {Function} click 左侧点击事件
	 * @event {Function} buttonClick 右侧按钮组点击事件
	 */
	export default {
		name: 'AempGoodsNav',
		components: {
			aempIcons
		},
		config: {
            component: true
        },
		props: {
			options: {
				type: Array,
				default () {
					return [{
						icon: 'shop',
						text: '店铺',
					}, {
						icon: 'cart',
						text: '购物车'
					}]
				}
			},
			buttonGroup: {
				type: Array,
				default () {
					return [{
							text: '加入购物车',
							backgroundColor: '#ffa200',
							color: '#fff'
						},
						{
							text: '立即购买',
							backgroundColor: '#ff0000',
							color: '#fff'
						}
					]
				}
			},
			fill: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				size:20,
				dataOptions:[]
			}
		},
		created(){
			this.dataOptions = this.options;
		},
		methods: {
			onClick(index, item) {
				this.$emit('click', {
					index,
					content: item,

				})
			},
			buttonClick(index, item) {
				this.dataOptions[2].info++;
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font-size-sm:12px;
	$font-size-base:14px;
	.flex {
		display: flex;
		flex-direction: row;
	}

	.goods-nav {
		width:100%;
		display: flex;
		flex: 1;
		flex-direction: row;
	}

	.tab__cart-box {
		flex: 1;
		height: 80px;
		background-color: #fff;
		z-index: 900;
	}

	.tab__cart-sub-left {
		padding: 0 5px;
	}

	.tab__cart-sub-right {
		flex: 1;
	}

	.tab__right {
		margin: 5px 0;
		margin-right: 10px;
		border-radius: 100px;
		overflow: hidden;
	}

	.tab__cart-button-left {
		display: flex;
		flex-direction: column;
		position: relative;
		justify-content: center;
		align-items: center;
		margin: 0 10px;
	}

	.tab__text {
		margin-top: 3px;
		font-size: $font-size-sm;
		color: #646566;
	}

	.tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.tab__cart-button-right-text {
		font-size: $font-size-base;
		color: #fff;
	}

	.tab__cart-button-right:active {
		opacity: 0.7;
	}

	.tab__dot-box {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: -2px;
		top: 2px;
		justify-content: center;
		align-items: center;
	}

	.tab__dot {
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}

	.tab__dots {
		padding: 0 4px;
		border-radius: 15px;
	}

	.tab__color-y {
		background-color: #ffa200;
	}

	.tab__color-r {
		background-color: #ff0000;
	}
</style>
