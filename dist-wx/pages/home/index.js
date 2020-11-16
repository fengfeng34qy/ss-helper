import { createPage } from "../../aemp-core/index";
import Hello from "../../components/Hello/Hello.vue";

const towxml = require("../../components/towxml/index");

Component(createPage({
  data() {
    return {
      result: "",
      article: ""
    };
  },

  components: {
    Hello
  },

  onLoad() {
    this.article = towxml('# Markdown\n```js\nvar a = "a";', "markdown", {
      base: "https://xxx.com",
      // 相对资源的base路径
      theme: "dark",
      // 主题，默认`light`
      events: {
        // 为元素绑定的事件方法
        tap: e => {
          console.log("tap", e);
        }
      }
    });
  },

  render: __renderFunction
}));;
function __renderFunction() {return ({ render: function() {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return [,[,,[[_vm._pp({'compId':(_vm.compId ? _vm.compId : '$root') + ',0'})]],,[[{'nodes':_vm.article}]]]]}, staticRenderFns: [] }).render.bind(this)();
}