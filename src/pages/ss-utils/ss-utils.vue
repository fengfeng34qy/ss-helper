<template>
	<view class="ss-utils">
        <view>
            <swiper class="swiper"
                :indicator-dots="true"
                :autoplay="true"
                :circular="true"
                :interval="3000"
                :duration="500"
                :vertical="false"
                previous-margin="0px"
                next-margin="0px"
                :display-multiple-items="1">
                <swiper-item>
                    <view class="swiper-item">
                        <image src="./images/SQLite.png" mode="aspectFit"> </image>
                        <view>SQLiteExpertPersSetup</view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="swiper-item">
                        <image src="./images/ILSpy.png" mode="aspectFit"> </image>
                        <view>dll反编译工具</view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="swiper-item">
                        <image src="./images/GZH.png" mode="aspectFit"> </image>
                        <view>人民银行14号文件解析工具v2.4</view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
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
    onLoad(e) {
        
    },
    methods: {}
}
</script>
<style scoped>
.swiper-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.swiper-item image {
    height: 100%;
}
</style>