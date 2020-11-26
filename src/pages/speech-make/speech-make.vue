<template>
	<view class="speech-make">
        <view class="radio-box">
            <radio-group @change="radioChange" style="text-align:center;">
                <label v-for="(item, index) in List" wx:key="index">
                    <radio :value="item.value" :checked="item.checked" />
                    <text>{{item.name}}</text>
                </label>
            </radio-group>
        </view>
        <view style="margin:0 40rpx;">播放速度</view>
        <view>
            <slider 
                :value="spd"
                @change="sliderChange"
                activeColor="#E8816C"
                max="10"
                min="0"
                show-value />
        </view>
        <view style="margin:0 40rpx;">请在下面输入要合成的语音文字</view>
        <view class="flex">
            <textarea class="textarea" :value="value" @input="inInput" :auto-focus="true" maxlength="50" placeholder="最多输入50字内容." />
        </view>
        <view style="display:flex;justify-content:space-between;padding:0 20px;">
            <view><button type="default" class="mb15" @tap="onlinePlay">在线播放</button></view>
            <view><button type="default" class="mb15" @tap="myMake">我要合成</button></view>
        </view>
        <view>
            <view class="text-wrp">
                <view><text>语音合成地址:</text></view>
                <view><text>{{ audioPlaySrc }}</text></view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    config: {
        navigationBarTitleText: "自助小帮手",
    },
    data() {
        return {
            spd: '5',
            per: '0',
            value: '',
            audioPlaySrc: '',
            List: [
                {value: '0', name: '女生', checked: 'true'},
                {value: '1', name: '男生'},
                {value: '3', name: '度逍遥'},
                {value: '4', name: '度丫丫'}
            ]
        }
    },
    onLoad(e) {
        
    },
    methods: {
        radioChange(e) {
            console.log(e)
            this.per = e.detail.value;
        },
        sliderChange(e) {
            console.log(e)
            this.spd = e.detail.value;
        },
        inInput(e) {
            this.value = e.detail.value;
            console.log(this.value);
        },
        async onlinePlay() {
            let that = this;
            if (!this.value) {
                wx.showModal({
                    content: '你丫的，没有输入文字！',
                    confirmText: '确定',
                    showCancel: false
                })
                return;
            }
            this.$api.request({
                method: "POST",
                url: "https://www.sunfengfeng.com/speech",
                data: {
                    text:  that.value,
                    parame: {
                        cuid: String(new Date().getTime()),
                        spd: that.spd,
                        pit: '5',
                        vol: '5',
                        per: that.per,
                    }
                },
                header: {
                    "content-type": "application/json"
                },
                success(res){
                    const audioContext = that.$api.createInnerAudioContext();
                    audioContext.src = res.data.onlineLink;
                    audioContext.autoplay = true;
                },
                fail(err) {
                    wx.showToast({
                        title: err.errMsg,
                        icon: 'none',
                        duration: 3000
                    })
                }
            });
        },
        myMake() {
            let that = this;
            if (!this.value) {
                wx.showModal({
                    content: '你丫的，没有输入文字！',
                    confirmText: '确定',
                    showCancel: false
                })
                return;
            }
            this.$api.request({
                method: "POST",
                url: "https://www.sunfengfeng.com/speech",
                data: {
                    text:  that.value,
                    parame: {
                        cuid: String(new Date().getTime()),
                        spd: that.spd,
                        pit: '5',
                        vol: '5',
                        per: that.per,
                    }
                },
                header: {
                    "content-type": "application/json"
                },
                success(res){
                    that.audioPlaySrc = res.data.onlineLink;
                },
                fail(err) {
                    wx.showToast({
                        title: err.errMsg,
                        icon: 'none',
                        duration: 3000
                    })
                }
            });
        }
    }
}
</script>
<style scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40rpx;
}
.radio-box {
    padding: 40rpx 0;
}
.textarea {
    border: 2rpx solid #ccc;
    width: 100%;
}
</style>