<template>
  <view>
    <view :id="elId" :class="{ border: showBorder }"
      :style="{ 'border-left': showBorder ? '1px ' + borderColor + ' solid' : 'none' }" class="grid">
       <view v-if="width" :style="{ width: width }" class="grid-item" v-for="(item, index) in data" :key="index">
        <view
          :class="{ border: showBorder, 'grid-item__box-square': square, 'border-top': showBorder && index < column, 'highlight': highlight }"
          :style="{ 'border-color': borderColor }" class="grid-item__box" @tap="_onClick(index)">
          <view class="grid-item__box-item">
            <image :src="item.url" class="image" mode="aspectFill" />
					  <text class="text">{{ item.text }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AempGrid',
    config: {
      component: true
    },
    props: {
      // 每列显示个数
      column: {
        type: Number,
        default: 3
      },
      // 是否显示边框
      showBorder: {
        type: Boolean,
        default: true
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: '#d0dee5'
      },
      // 是否正方形显示,默认为 true
      square: {
        type: Boolean,
        default: true
      },
      highlight: {
        type: Boolean,
        default: true
      },
      data:{
        type: Array,
        default:[]
      }
    },
    data() {
      const elId = `aemp-${Math.ceil(Math.random() * 10e5).toString(36)}`
      return {
        elId,
        width: 0
      }
    },
    mounted(){
      this._getSize();
    },
    methods: {
      _onClick(index) {
        this.$emit('change', {
					detail: {
						index: index
					}
				});
      },
      _getSize() {
        const scope = this.$mp ? this.$mp.scope : this;
        let _this = this;
        this.$api.createSelectorQuery()
          .in(scope)
          .select(`#${this.elId}`)
          .boundingClientRect()
          .exec(ret => {
            if (!ret[0]) {
              setTimeout(function(){
                _this._getSize();
              })
              return
            }
            _this.width = parseInt(ret[0].width / this.column) - 1 + 'px';
            console.log(_this.width);
          })
      }
    }
  }
</script>

<style scoped>
  @charset "UTF-8";

  .grid {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    border-left: 2px #d0dee5 solid
  }
  .grid-item {
    box-sizing: border-box;
  }

  .grid-item__box {
    position: relative;
    width: 100%
  }

  .image {
		width: 50px;
		height: 50px;
	}

	.text {
		font-size: 26px;
		margin-top: 10px;
	}

  .grid-item__box-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 32px;
    color: #666;
    padding: 20px 0;
    box-sizing: border-box
  }

  .grid-item__box-item .image {
    width: 50px;
    height: 50px
  }

  .grid-item__box-item .text {
    font-size: 26px;
    margin-top: 10px
  }

  .grid-item__box.grid-item__box-square {
    height: 0;
    padding-top: 100%
  }

  .grid-item__box.grid-item__box-square .grid-item__box-item {
    position: absolute;
    top: 0
  }

  .grid-item__box.border {
    position: relative;
    box-sizing: border-box;
    border-bottom: 2px #d0dee5 solid;
    border-right: 2px #d0dee5 solid
  }

  .grid-item__box.border-top {
    border-top: 2px #d0dee5 solid
  }

  .grid-item__box.highlight:active {
    background-color: #eee
  }
 
</style>
