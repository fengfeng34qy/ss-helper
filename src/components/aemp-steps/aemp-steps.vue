<template>
	<view class="steps">
		<view :class="[direction==='column'?'steps__column':'steps__row']">
			<view :class="[direction==='column'?'steps__column-text-container':'steps__row-text-container']">
				<view v-for="(item,index) in options" :key="index" :class="[direction==='column'?'steps__column-text':'steps__row-text']">
					<text :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'steps__column-title':'steps__row-title']">{{item.title}}</text>
					<text :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'steps__column-desc':'steps__row-desc']">{{item.desc}}</text>
				</view>
			</view>
			<view :class="[direction==='column'?'steps__column-container':'steps__row-container']">
				<view :class="[direction==='column'?'steps__column-line-item':'steps__row-line-item']" v-for="(item,index) in options"
				 :key="index">
					<view :class="[direction==='column'?'steps__column-line':'steps__row-line',direction==='column'?'steps__column-line--before':'steps__row-line--before']"
					 :style="{backgroundColor:index<=active&&index!==0?activeColor:index===0?'transparent':deactiveColor}"></view>
					<view :class="[direction==='column'?'steps__column-check':'steps__row-check']" v-if="index === active">
						<aemp-icons :color="activeColor" type="checkbox-filled" size="14"></icons>
					</view>
					<view :class="[direction==='column'?'steps__column-circle':'steps__row-circle']" v-else :style="{backgroundColor:index<active?activeColor:deactiveColor}"></view>
					<view :class="[direction==='column'?'steps__column-line':'steps__row-line',direction==='column'?'steps__column-line--after':'steps__row-line--after']"
					 :style="{backgroundColor:index<active&&index!==options.length-1?activeColor:index===options.length-1?'transparent':deactiveColor}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aempIcons from '../aemp-icons/aemp-icons.vue'

	/**
	 * Steps 步骤条
	 * @description 评分组件
	 * @property {Number} active 当前步骤
	 * @property {String} direction = [row|column] 当前步骤
	 * 	@value row 横向
	 * 	@value column 纵向
	 * @property {String} activeColor 选中状态的颜色
	 * @property {Array} options 数据源，格式为：[{title:'xxx',desc:'xxx'},{title:'xxx',desc:'xxx'}]
	 */

	export default {
		name: 'AempSteps',
		config: {
            component: true
        },
		components: {
			aempIcons
		},
		props: {
			direction: {
				// 排列方向 row column
				type: String,
				default: 'row'
			},
			activeColor: {
				// 激活状态颜色
				type: String,
				default: '#1aad19'
			},
			deactiveColor: {
				// 未激活状态颜色
				type: String,
				default: '#999999'
			},
			active: {
				// 当前步骤
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	$border-color:#e5e5e5;
	$font-size-sm:20px;
	$font-size-base:30px;
	$text-color-grey:#999;//辅助灰色，如加载更多的提示信息
	.steps {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.steps__row {
		display: flex;
		flex-direction: column;
	}

	.steps__column {
		display: flex;
		flex-direction: row-reverse;
	}

	.steps__row-text-container {
		display: flex;
		flex-direction: row;
	}

	.steps__column-text-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.steps__row-text {
		display: inline-flex;
		flex: 1;
		flex-direction: column;
	}

	.steps__column-text {
		padding: 6px 0px;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: $border-color;
		display: flex;
		flex-direction: column;
	}

	.steps__row-title {
		font-size: $font-size-base;
		line-height: 16px;
		text-align: center;
	}

	.steps__column-title {
		font-size: $font-size-base;
		text-align: left;
		line-height: 40px;
	}

	.steps__row-desc {
		font-size: 12px;
		line-height: 14px;
		text-align: center;
	}

	.steps__column-desc {
		font-size: $font-size-sm;
		text-align: left;
		line-height: 30px;
	}

	.steps__row-container {
		display: flex;
		flex-direction: row;
		margin-top:15px;
	}

	.steps__column-container {
		display: inline-flex;
		width: 50px;
		flex-direction: column;
	}

	.steps__row-line-item {
		display: inline-flex;
		flex-direction: row;
		flex: 1;
		height: 14px;
		line-height: 14px;
		align-items: center;
		justify-content: center;
	}

	.steps__column-line-item {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.steps__row-line {
		flex: 1;
		height: 2px;
		background-color: $text-color-grey;
	}

	.steps__column-line {
		width: 2px;
		background-color: $text-color-grey;
	}

	.steps__row-line--after {
		transform: translateX(1px);
	}

	.steps__column-line--after {
		flex: 1;
		transform: translate(0px, 1px);
	}

	.steps__row-line--before {
		transform: translateX(-1px);
	}

	.steps__column-line--before {
		height: 10px;
		transform: translate(0px, -1px);
	}

	.steps__row-circle {
		width: 5px;
		height: 5px;
		border-radius: 100px;
		background-color: $text-color-grey;
		margin: 0px 3px;
	}

	.steps__column-circle {
		width: 5px;
		height: 5px;
		border-radius: 100px;
		background-color: $text-color-grey;
		margin: 4px 0px 5px 0px;
	}

	.steps__row-check {
		margin: 0px 6px;
	}

	.steps__column-check {
		height: 14px;
		line-height: 14px;
		margin: 2px 0px;
	}
</style>
