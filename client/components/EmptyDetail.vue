<template>
  <div class="empty-detail">
    <i class="iconfont icon-detail empty-detail__icon"></i>
    <p>Click task title to view details</p>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.empty-detail {
  background: #fbfbfb;
  height: calc(100vh - 65px);
  text-align: center;
  color: rgba(0,0,0,.24);
  font-size: 24px;
  padding-top: 40%;
}

.empty-detail__icon {
  font-size: 80px;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
