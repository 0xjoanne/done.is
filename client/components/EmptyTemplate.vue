<template>
  <div
    class="empty-template"
    :style="templateStyle">
    <i
      :class="['iconfont', 'icon-' + icon, 'empty-template__icon']"
      :style="{ fontSize: iconFontSize}">
    </i>
    <p> {{ label }} </p>
  </div>
</template>

<script>
export default {
  props: {
    templateStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    icon: {
      type: String,
      required: true
    },
    iconFontSize: {
      type: String,
      default: '80px'
    },
    label: {
      type: String
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style>
.empty-template {
  background: #fbfbfb;
  height: calc(100vh - 65px);
  text-align: center;
  color: rgba(0,0,0,.24);
  font-size: 24px;
  padding-top: 50%;
}

.empty-template__icon {
  display: inline-block;
  margin-bottom: 20px;
}
</style>
