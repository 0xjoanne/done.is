<template>
  <flex-box>
    <i
      :class="['iconfont', 'icon-color', { 'checked' : value === '' }]"
      @click="checkColor('')">
    </i>

    <div
      v-for="item in color"
      :key="item"
      :class="['color', { 'checked' : value === item }]"
      :style="{ background: item }"
      @click="checkColor(item)">
    </div>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isChecked: true,
      color: [
        '#1890FF',
        '#41D9C7',
        '#94D050',
        '#A5C5C1',
        '#FFD422',
        '#FFAC2A',
        '#BD988C',
        '#FF67A6',
        '#8543E0',
      ]
    }
  },
  methods: {
    checkColor (item) {
      this.$emit('update:value', item)
    }
  }
}
</script>

<style>
.icon-color,
.color {
  position: relative;
  cursor: pointer;
}

.icon-color {
  font-size: 22px;
}

.color {
  display: inline-block;
  height: 18px;
  width: 18px;
  border-radius: 50%;
}

.icon-color.checked:after,
.color.checked:after {
  content: '';
  position: absolute;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  opacity: .2;
}

.icon-color.checked:after {
  background-color: rgba(0, 0, 0, .2);
  left: -2px;
  top: 7px;
}

.color.checked:after {
  background-color: inherit;
  left: -4px;
  top: -4px;
}

</style>
