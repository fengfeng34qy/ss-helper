<script type="config">
{
    config: {
        pages: [
            'pages/home/index',
            'pages/device/device',
            'pages/wosa-error-code/wosa-error-code',
            'pages/study/study',
        ],
        window: {
            navigationBarBackgroundColor: '#fae37d',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            list: [
                {
                    "pagePath": "pages/home/index",
                    "iconPath": "./images/icon_component.png",
                    "selectedIconPath": "./images/icon_component_HL.png",
                    "text": "首页"
                },
                {
                    "pagePath": "pages/study/study",
                    "iconPath": "./images/icon_API.png",
                    "selectedIconPath": "./images/icon_API_HL.png",
                    "text": "学习"
                }
            ]
        },
        networkTimeout: {
            request: 30000
        }
    }
}
</script>

<script>
 import aempPopup from "./components/aemp-popup/aemp-popup";

export default {
    data() {
        return {}
    },
    onLaunch() {
    },
    onShow() {},
    components: {
        aempPopup
    }
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
