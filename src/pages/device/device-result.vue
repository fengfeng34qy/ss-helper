<template>
  <view class="device-result">
    <Towxml class="towxml" :nodes="result" style="width:100%;"></Towxml>
  </view>
</template>
<script>
    const towxml = require("../../components/towxml/index");
	export default {
        config: {
            navigationBarTitleText: "自助小帮手",
            usingComponents: {
                towxml: "../../components/towxml/towxml",
            },
        },
		data() {
			return {
                result: ''
            }
		},
        props: {},
        onLoad(e) {
            console.log(e);
            this.loadDeviceId(e)
        },
		methods: {
            loadDeviceId(e) {
                let that = this;
                let deviceId = e.deviceId;
                this.$api.request({
                    method: "GET",
                    url: 'https://www.sunfengfeng.com/markdownfiles/device/' + deviceId + '.md',
                    data: {},
                    header: {
                        "content-type": "application/json"
                    },
                    success(res){
                        console.log(res)
                        that.result = towxml(res.data, "markdown")
                    }
                });
            }
        }
	}
</script>

<style lang="scss" scoped>
</style>