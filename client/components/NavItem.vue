<template>
  <flex-box :class="['nav-item', { active: isActive }]">
    <i :class="['iconfont', 'icon-' + icon]"></i>

    <span class="nav-item__label">
      {{ label }}
    </span>

    <span v-if="num !== 0">
      {{ num }}
    </span>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    num: {
      type: Number
    }
  }
}
</script>

<style>
.nav-item {
  height: 40px;
  padding: 0 30px;
  cursor: pointer;
}

.nav-item:hover,
.nav-item.active {
  color: white;
  background: #7d82963b;
}

.nav-item .iconfont {
  font-size: 20px;
}

.nav-item__label {
  margin-left: 12px;
  flex: auto;
}
</style>
