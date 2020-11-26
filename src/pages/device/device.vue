<template>
    <view class="device">
        <view>
            <view class="device-item" v-for="(item, index) in deviceList" wx:key="index" @tap="naviateToDeviceResult(item.link)">
                <view>{{item.title}}</view>
                <view>
                    <aemp-icons :type="'arrowright'" :color="'#aaa'" size="23" />
                </view>
            </view>
            <view class="rule-end">------ 我是底线 ------</view>
        </view>
    </view>
</template>
<script>
import aempIcons from '../../components/aemp-icons/aemp-icons'
export default {
    config: {
        navigationBarTitleText: "自助小帮手",
        usingComponents: {},
    },
    data() {
        return {
            deviceList: []
        }
    },
    components: {
        aempIcons
    },
    onLoad() {
        this.loadDeviceAsync()
    },
    methods: {
        loadDeviceAsync() {
            let that = this;
            this.$api.request({
                method: "POST",
                url: "https://www.sunfengfeng.com/wxapi",
                data: {
                    service_code: '1002',
                },
                header: {
                    "content-type": "application/json"
                },
                success(res){
                    console.log(res)
                    that.deviceList = res.data.body.deviceData;
                }
            });
        },
        naviateToDeviceResult(deviceId) {
            console.log(deviceId);
            this.$api.navigateTo({
                url: `../device/device-result?deviceId=${deviceId}`
            });
        }
    }
}

</script>
<style scoped>
.device-item {
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92rpx;
    padding: 0 20rpx;
}
.rule-end {
    margin: 20rpx 0;
    text-align: center;
    color: #ccc;
}
</style>