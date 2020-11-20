<template>
	<view class="study">
        <!-- <view style="display:flex;height:300rpx;">
            <view style="width:28%;display:flex;">
                <image mode="widthFix" src="../../images/cover_thumbnail_3rd.jpg" mode="aspectFit" style=""></image>
            </view>
            <view style="width:72%;height:100%;padding-left:40rpx;box-sizing:border-box;">
                <view style="display:flex;justify-content:space-between;box-sizing:border-box;border-bottom:1px solid #ddd;font-size:small;color:#888;margin-bottom:0.5em;padding-bottom:0.5em;">
                    <view class="iconfont mm-book" />
                    <view>2020-11-20</view>
                </view>
                <view>
                    <view class="title">ES6标准入门</view>
                    <view class="dec">
                        本书覆盖ES6与上一个版本ES5的所有不同之处，对涉及的语法知识给与详细介绍，并给出大量简洁易懂的示例代码
                    </view>
                </view>
            </view>
        </view> -->

        <navigator class="book" hover-class="none" open-type="navigate" url="./es6" data-url="./es6">
            <image class="left" src="../../images/cover_thumbnail_3rd.jpg" mode="widthFix" lazy-load="{{true}}" />
            <view class="right">
            <view class="header">
                <view class="header-icon iconfont mm-book" />
                <view class="header-state"> 2020-11-20 </view>
            </view>
            <view class="body">
                <view class="body-title"> ES6标准入门 </view>
                <view class="body-info"> 本书覆盖ES6与上一个版本ES5的所有不同之处，对涉及的语法知识给与详细介绍，并给出大量简洁易懂的示例代码 </view>
            </view>
            </view>
        </navigator>
    </view>
</template>
<script>
export default {
    config: {
        navigationBarTitleText: "自助小帮手",
    },
    data() {
        return {}
    },
    onLoad(e) {},
    methods: {}
}
</script>
<style scoped>
@import "../../style/iconfont.wxss";

.title {
    font-weight: bold;
    font-size: medium;
}
.dec {
    font-size: xx-small;
    color: #aaa;
    overflow: hidden;
    line-height: 1.5em;
    max-height: 4.5em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.book, .movie {
  padding: 1.5em 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.left {
  width: 200rpx;
  min-width: 200rpx;
  max-width: 200rpx;
  height: 0; /* 防止加载过程中变形 */
  border-radius: 2px;
}

.right {
  margin-left: 1em;
  flex-grow: 1;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: small;
  color: #888;
  border-bottom: 1px solid #ddd;
  margin-bottom: 0.5em;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.body-title {
  font-weight: bold;
  font-size: medium;
}

.body-alias {
  font-size: xx-small;
  color: #aaa;
}

.body-info {
  font-size: xx-small;
  color: #aaa;
  overflow: hidden;
  line-height: 1.5em;
  max-height: 4.5em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.body-comment {
  font-size: medium;
  line-height: 1.5em;
  color: #4d4d4d;
}
</style>