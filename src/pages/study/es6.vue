<template>
	<view class="es6">
        <view class="dir-txt" data-name="README" @tap="getMarkdown('README')">0.前言</view>
        <view class="dir-txt" data-name="intro" @tap="getMarkdown('intro')">1.ECMAScript 6简介</view>
        <view class="dir-txt" data-name="let" @tap="getMarkdown('let')">2.let 和 const 命令</view>
        <view class="dir-txt" data-name="destructuring" @tap="getMarkdown('destructuring')">3.变量的解构赋值</view>
        <view class="dir-txt" data-name="string" @tap="getMarkdown('string')">4.字符串的扩展</view>
        <view class="dir-txt" data-name="string-methods" @tap="getMarkdown('string-methods')">5.字符串的新增方法</view>
        <view class="dir-txt" data-name="regex" @tap="getMarkdown('regex')">6.正则的扩展</view>
        <view class="dir-txt" data-name="number" @tap="getMarkdown('number')">7.数值的扩展</view>
        <view class="dir-txt" data-name="function" @tap="getMarkdown('function')">8.函数的扩展</view>
        <view class="dir-txt" data-name="array" @tap="getMarkdown('array')">9.数组的扩展</view>
        <view class="dir-txt" data-name="object" @tap="getMarkdown('object')">10.对象的扩展</view>
        <view class="dir-txt" data-name="object-methods" @tap="getMarkdown('object-methods')">11.对象的新增方法</view>
        <view class="dir-txt" data-name="symbol" @tap="getMarkdown('symbol')">12.Symbol</view>
        <view class="dir-txt" data-name="set-map" @tap="getMarkdown('set-map')">13.Set 和 Map 数据结构</view>
        <view class="dir-txt" data-name="proxy" @tap="getMarkdown('proxy')">14.Proxy</view>
        <view class="dir-txt" data-name="reflect" @tap="getMarkdown('reflect')">15.Reflect</view>
        <view class="dir-txt" data-name="promise" @tap="getMarkdown('promise')">16.Promise 对象</view>
        <view class="dir-txt" data-name="iterator" @tap="getMarkdown('iterator')">17.Iterator 和 for...of 循环</view>
        <view class="dir-txt" data-name="generator" @tap="getMarkdown('generator')">18.Generator 函数的语法</view>
        <view class="dir-txt" data-name="generator-async" @tap="getMarkdown('generator-async')">19.Generator 函数的异步应用</view>
        <view class="dir-txt" data-name="async" @tap="getMarkdown('async')">20.async 函数</view>
        <view class="dir-txt" data-name="class" @tap="getMarkdown('class')">21.Class 的基本语法</view>
        <view class="dir-txt" data-name="class-extends" @tap="getMarkdown('class-extends')">22.Class 的继承</view>
        <view class="dir-txt" data-name="module" @tap="getMarkdown('module')">23.Module 的语法</view>
        <view class="dir-txt" data-name="module-loader" @tap="getMarkdown('module-loader')">24.Module 的加载实现</view>
        <view class="dir-txt" data-name="style" @tap="getMarkdown('style')">25.编程风格</view>
        <view class="dir-txt" data-name="spec" @tap="getMarkdown('spec')">26.读懂规格</view>
        <view class="dir-txt" data-name="async-iterator" @tap="getMarkdown('async-iterator')">27.异步遍历器</view>
        <view class="dir-txt" data-name="arraybuffer" @tap="getMarkdown('arraybuffer')">28.ArrayBuffer</view>
        <view class="dir-txt" data-name="proposals" @tap="getMarkdown('proposals')">29.最新提案</view>
        <view class="dir-txt" data-name="decorator" @tap="getMarkdown('decorator')">30.Decorator</view>
        <view class="dir-txt" data-name="reference" @tap="getMarkdown('reference')">31.参考链接</view>
        <Towxml class="towxml" :nodes="article" style="width:100%;"></Towxml>
        <view class="bottom">------ 本节内容你已经看完 ------</view>
    </view>
</template>
<script>
const towxml = require("../../components/towxml/index");
let requestHelper = require('../../utils/requestHelper');

export default {
    config: {
        navigationBarTitleText: "自助小帮手",
        usingComponents: {
            towxml: "../../components/towxml/towxml",
        },
    },
    data() {
        return {
            article: ''
        }
    },
    onLoad(e) {
        this.loadMarkdown('README');
    },
    methods: {
        async loadMarkdown(mark) {
            let that = this;
            let request = {
                method: 'GET',
                url: '/es6/docs/' + mark + '.md'
            }
            let result = await requestHelper.sendAsync(request);
            console.log(result)
            this.article = towxml(result.data, "markdown")
        },
        getMarkdown(e) {
            let that = this;
            console.log(e);
            this.$api.request({
                method: "GET",
                url: 'https://www.sunfengfeng.com/es6/docs/' + e + '.md',
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success(res){
                    that.article = towxml(res.data, "markdown")
                    that.scrollPosition(600)
                },
                fail(err) {
                    console.log(err)
                    wx.showToast({
                        title: err.errMsg,
                        icon: 'none',
                        duration: 3000
                    })
                }
            });
        },
        scrollPosition(pos) {
            wx.pageScrollTo({
                scrollTop: pos  // #the-id节点的下边界坐标  
            })
        },
    }
}
</script>
<style scoped>
.dir-txt {
  color: #4682BE;
}
.dir-txt:active {
  background: #ccc;
}
</style>