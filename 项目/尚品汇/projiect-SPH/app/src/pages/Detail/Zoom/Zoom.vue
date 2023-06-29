<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" v-if="skuImageList" />
    <!-- 触发事件移动的盒子 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[currentIndex].imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    skuImageList: {
      //如果报错:Cannot read properties of null (reading '0'),而不是Cannot read properties of undefined (reading '0'),则是服务器中的数据被删除了,而不是程序错误

      default: () => [{}]
    }
  },
  methods: {
    handler(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;

      //约束范围
      if (left < 0) left = 0;
      if (left > event.target.offsetWidth - mask.offsetWidth) {
        left = event.target.offsetWidth - mask.offsetWidth;
      }
      if (top < 0) top = 0;
      if (top > event.target.offsetHeight - mask.offsetHeight) {
        top = event.target.offsetHeight - mask.offsetHeight;
      }

      //修改遮罩盒子的left和top值
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      //修改放大图的left和top值
      big.style.left = -2 * left + 'px';
      big.style.top = -2 * top + 'px';

    }
  },
  mounted() {
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index;
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 30%;
    height: 30%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>