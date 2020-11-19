<template>
  <view class="page__hd">
    <view class="page__title">{{title}}</view>
    <view class="page__desc">{{desc}}</view>
  </view>
</template>

<script>
export default {
  config: {
    component: true
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    test:{
      type:String,
      default:""
    }
  }
};
</script>

<style scoped>
.page__hd {
  padding: 60px;
}
.page__title {
  text-align: left;
  font-size: 40px;
  font-weight: 400;
}
.page__desc {
  margin-top: 10px;
  color: #888888;
  text-align: left;
  font-size: 28px;
}
</style>
