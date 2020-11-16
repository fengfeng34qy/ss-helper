<template>
  <view class="home-wrap">
    <view class="home-text">Vue 驱动的多端开发框架</view>
    <Hello></Hello>
    <Towxml :nodes="article"></Towxml>
  </view>
</template>


<script>
import Hello from "../../components/Hello/Hello";
const towxml = require("../../components/towxml/index");

export default {
  config: {
    navigationBarTitleText: "赞同小程序",
    usingComponents: {
      towxml: "../../components/towxml/towxml",
    },
  },
  data() {
    return {
      result: "",
      article: "",
    };
  },
  components: {
    Hello,
  },
  onLoad() {
    this.article = towxml('# Markdown\n```js\nvar a = "a";', "markdown", {
      base: "https://xxx.com", // 相对资源的base路径
      theme: "dark", // 主题，默认`light`
      events: {
        // 为元素绑定的事件方法
        tap: (e) => {
          console.log("tap", e);
        },
      },
    });
    this.$api.request({
      method: "post",
      url: "http://www.sunfengfeng.com/post",
      data: {
        x: "",
        y: ""
      },
      header: {
        "content-type": "application/json"
      },
      success:function(res){
        console.log(res)
      }
    });
  },
};
</script>

<style>
.home-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.home-text {
  font-size: 24px;
  line-height: 1.3;
  color: #6a8bad;
  text-align: center;
}
</style>
