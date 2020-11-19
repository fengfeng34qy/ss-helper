<template>
  <view class="home-wrap">
    <view class="swiper-wrap">
      <view style="vertical-align:middle;"><aemp-icons :type="'heart-filled'" :color="'#ff994d'" size="23" /></view>
      <view style="display:flex;width:100%;height:100%;">
        <swiper class="swiper-box" @change="change" :autoplay="true" vertical="true" circular="true">
          <swiper-item v-for="(item, index) in swiperList" wx:key="index">
            <view class="swiper-item">{{item.content}}</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <home-navigate />
    <Towxml class="towxml" :nodes="article" style="width:100%;"></Towxml>
  </view>
</template>


<script>
const towxml = require("../../components/towxml/index");
import aempIcons from '../../components/aemp-icons/aemp-icons'
import homeNavigate from '../../common/home-navigate/home-navigate'

export default {
  config: {
    navigationBarTitleText: "自助小帮手",
    usingComponents: {
      towxml: "../../components/towxml/towxml",
    },
  },
  data() {
    return {
      result: "",
      article: "",
      swiperList: [
        {
          content: '避免用汉字做判断'
        },
        {
          content: 'if判断尽量使用全等 "==="'
        },
        {
          content: '保持规范的代码缩进，尽管代码是拷贝过来的'
        },
        {
          content: '一个方法尽量只实现一个功能或一组功能'
        },
      ]
    };
  },
  components: {
    aempIcons,
    homeNavigate
  },
  onLoad() {
    let that = this;
    this.$api.request({
      method: "GET",
      url: "https://www.sunfengfeng.com/markdownfiles/README.md",
      data: {},
      header: {
        "content-type": "application/json"
      },
      success(res){
        console.log(res)
        that.article = towxml(res.data, "markdown")
      }
    });
  },
  methods: {
    change() {},
    switchActive(index) {}
  }
};
</script>

<style>
.home-wrap {
  width: 100vw;
  height: 100vh;
  padding-top: 72rpx;
  justify-content: center;
  flex-direction: column;
}
.home-text {
  font-size: 24px;
  line-height: 1.3;
  color: #6a8bad;
  text-align: center;
}
.swiper-wrap {
  width: 100%;
  height: 72px;
  background: #fae37d;
  padding: 6px 0 6px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 0;
  z-index: 99999;
}
.swiper-wrap swiper-item {
  letter-spacing: 4px;
  font-size: 28rpx;
}
.swiper-box {
  height: 100%;
  width: 100%;
}
.towxml {
  width: 100%;
}
</style>
