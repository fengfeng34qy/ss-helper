<template>
	<view class="home-navigate">
        <view class="icon-box">
            <view class="icon-item" @tap="naviateToSpeechMake">
                <aemp-icons :type="'mic-filled'" :color="'#ff994d'" size="40" />
                <view>语音合成</view>
            </view>
            <view class="icon-item" @tap="naviateToSsUtils">
                <aemp-icons :type="'download-filled'" :color="'#ff994d'" size="40" />
                <view>自助工具</view>
            </view>
            <view class="icon-item" @tap="naviateToDevice">
                <aemp-icons :type="'settings'" :color="'#ff994d'" size="40" />
                <view>外设调用</view>
            </view>
            <view class="icon-item" @tap="naviateToWosaErrorCode">
                <aemp-icons :type="'info-filled'" :color="'#ff994d'" size="40" />
                <view>错误码</view>
            </view>
        </view>
    </view>
</template>

<script>
    import aempIcons from '../../components/aemp-icons/aemp-icons'
	export default {
		name: 'HomeNavigate',
		config: {
            component: true
        },
		props: {},
		data() {
			return {}
		},
        components: {
            aempIcons
        },
		methods: {
            naviateToSpeechMake() {
                this.$api.navigateTo({
                    url: `../speech-make/speech-make`
                });
            },
            naviateToSsUtils() {
                this.$api.navigateTo({
                    url: `../ss-utils/ss-utils`
                });
            },
            naviateToDevice() {
                let deviceId = 'README';
                this.$api.navigateTo({
                    url: `../device/device?deviceId=${deviceId}`
                });
            },
            naviateToWosaErrorCode() {
                this.$api.navigateTo({
                    url: `../wosa-error-code/wosa-error-code`
                });
            }
        }
	}
</script>

<style lang="scss" scoped>
.icon-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 0;
}
.icon-item {
    width: 25%;
    text-align: center;
}
</style>
