<template>
	<view class="tabbar" :class="extClass">
		<view  @tap="tabChange(index)" v-for="(item, index) in list" :key="index" class="tabbar__item" :class="{'bar__item_on':index === current}">
			<view style="position: relative;display:inline-block;">
				<image :src="(current === index ? item.selectedIconPath : item.iconPath)" class="tabbar__icon"></image>
			</view>
			<view class="tabbar__label">{{ item.text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name:"AempTabbar",
	config: {
            component: true
    },
	props: {
		list: {
			type: Array,
			default: function() {
				return []
			}
		}
	},
	data() {
		return {
			extClass: '',
			current: 0
		};
	},
	methods: {
		tabChange(index) {
			if (index === this.current) {
				return;
			}
			this.current = index;
			this.$emit('tabChange',index)
		}
	}
};
</script>

<style lang="scss" scoped >
.tabbar {
	display: flex;
	position: relative;
	z-index: 500;
	background-color: #ffffff;
}
.tabbar:before {
	content: ' ';
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.1);
}
.tabbar__item {
	display: block;
	flex: 1;
	padding: 8px 0 4px;
	padding-bottom: calc(8px + constant(safe-area-inset-bottom));
	padding-bottom: calc(8px + env(safe-area-inset-bottom));
	font-size: 0;
	color: rgba(0, 0, 0, 0.5);
	text-align: center;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.tabbar__item:first-child {
	padding-left: constant(safe-area-inset-left);
	padding-left: env(safe-area-inset-left);
}
.tabbar__item:last-child {
	padding-right: constant(safe-area-inset-right);
	padding-right: env(safe-area-inset-right);
}
.tabbar__item.bar__item_on .tabbar__icon,
.tabbar__item.bar__item_on .tabbar__icon > i,
.tabbar__item.bar__item_on .tabbar__label {
	color: #3eaf7c;
}
.tabbar__icon {
	display: inline-block;
	width: 40px;
	height: 40px;
	margin-bottom: 2px;
}
i.tabbar__icon,
.tabbar__icon > i {
	font-size: 24px;
	color: rgba(0, 0, 0, 0.5);
}
.tabbar__icon image {
	width: 100%;
	height: 100%;
}
.tabbar__label {
	color: #bfbfbf;
	font-size: 24px;
	line-height: 1.4;
}
</style>
