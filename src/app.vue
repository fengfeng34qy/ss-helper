<script type="config">
{
    config: {
        pages: [
            'pages/home/index',
            'pages/device/device',
            'pages/wosa-error-code/wosa-error-code'
        ],
        window: {
            navigationBarBackgroundColor: '#fae37d',
            navigationBarTextStyle: 'black'
        },
        networkTimeout: {
            request: 30000
        }
    }
}
</script>

<script>

export default {
    onLaunch() {},
    onShow() {}
};
</script>
<style>

/**基础风格样式**/
@import './components/towxml/style/main.wxss';

/**主题配色（浅色样式）**/
@import './components/towxml/style/theme/light.wxss';

/**主题配色（深色样式）**/
@import './components/towxml/style/theme/dark.wxss';

</style>
