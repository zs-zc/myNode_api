<template>
  <section :style="wrapperStyle">
    <div :style="scaleStyle">
      <slot></slot>
    </div>
  </section>
</template>

<script>
let userAgent = navigator.userAgent;
import {  mapMutations } from "vuex";

export default {
  name: "",
  components: {},
  props: {
    //根据模式判断页面缩放比例
    mode: {
      type: String,
      default: "auto",
    },
    //缩放中心
    origin: {
      type: String,
      default: "left top 0",
    },
    //传入的视觉稿
    visualWidth: {
      type: Number,
      default: 1920,
    },
    visualHeight: {
      type: Number,
      default: 1080,
    },
  },
  data() {
    return {
      //判断是否为指定设备
      wp: userAgent.match(/Windows Phone ([\d.]+)/), //判断是否为WindowsPhone
      android: userAgent.match(/(Android);?[\s/]+([\d.]+)?/),
      // 获取设备的宽高比
      deviceWidth: document.documentElement.clientWidth,
      deviceHeight: document.documentElement.clientHeight,
      //设置包裹层样式
      wrapperStyle: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 1,
      },
      //设置内部元素的缩放属性
      scaleStyle: {},
    };
  },
  methods: {
    ...mapMutations(["changeScaleRatio"]),
    /**
     * @function 计算缩放参数
     * @private
     */
    _calcScaleRatio() {
      //默认缩放比例为1
      let scaleRatio = 1;

      let deviceAspectRatio = this.deviceWidth / this.deviceHeight;

      //计算传入的视觉稿的比
      let visualAspectRatio = this.visualWidth / this.visualHeight;

      //计算缩放比
      if (this.mode === "contain") {
        //如果是包含模式,根据宽高中较大值进行缩放
        scaleRatio =
          deviceAspectRatio > visualAspectRatio
            ? this.deviceHeight / this.visualHeight
            : this.deviceWidth / this.visualWidth;
      } else if (this.mode === "cover") {
        scaleRatio =
          deviceAspectRatio < visualAspectRatio
            ? this.deviceHeight / this.visualHeight
            : this.deviceWidth / this.visualWidth;
      } else {
        scaleRatio = this.deviceWidth / this.visualWidth;
      }

      return scaleRatio;
    },

    /**
     * @function 更新屏幕尺寸
     * @private
     */
    _updateDimensions() {
      this.deviceWidth = document.documentElement.clientWidth;
      this.deviceHeight = document.documentElement.clientHeight;
      this.render();
    },
    render() {
      let scaleRatio = this._calcScaleRatio();
      this.scaleRatio = scaleRatio;
      this.changeScaleRatio(scaleRatio)
      // 兼容android 2.3.5系统下body高度不自动刷新的bug
      this.scaleStyle = {
        width: this.visualWidth + "px",
        height: this.visualHeight + "px",
        WebkitTransformOrigin: this.origin,
        transformOrigin: this.origin,
        WebkitTransform: `scale(${scaleRatio})`,
        transform: `scale(${scaleRatio})`,
      };
      if (this.mode === "auto" && this.android) {
        document.body.style.height = this.visualHeight * this.scaleRatio + "px";
      } else if (this.mode === "contain" || this.mode === "cover") {
        //如果是contain模式
        //设置为绝对定位
        this.scaleStyle.position = "absolute";

        this.scaleStyle.left = (this.deviceWidth - this.visualWidth) / 2 + "px";

        this.scaleStyle.top =
          (this.deviceHeight - this.visualHeight) / 2 + "px";

        this.scaleStyle.WebkitTransformOrigin = "center center 0";

        this.scaleStyle.transformOrigin = "center center 0";
        //阻止默认滑屏事件
        if (this.wp) {
          document.body.style.msTouchAction = "none";
        } else {
          document.ontouchmove = function (e) {
            e.preventDefault();
          };
        }
      }
    },
  },
  created() {
    this.render();
  },
  mounted() {
    //监听页面尺寸变化
    window.addEventListener("resize", this._updateDimensions);
  },
  destroyed() {
    //移除页面尺寸变化监听
    window.removeEventListener("resize", this._updateDimensions);
  },
};
</script>

<style lang="scss">
</style>
