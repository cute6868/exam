<template>
  <div class="vlog-card">
    <!-- 图片 -->
    <img :src="item.img" :alt="item.title" class="card-img" />

    <!-- 信息 -->
    <div class="card-info">
      <!-- 标题-->
      <h3 class="card-title">{{ item.title }}</h3>
      <!-- 描述 -->
      <p class="card-desc">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup>
// 让组件接收父组件传递的参数
defineProps({
  item: { type: Object, required: true },
});
</script>

<style scoped>
.vlog-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  break-inside: avoid;
  margin-bottom: 10px;
}

.card-img {
  width: 100%;
  height: auto;
}

.card-info {
  padding: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-size: 12px;
  color: #666;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
