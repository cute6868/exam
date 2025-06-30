<template>
  <div class="app-container">
    <!-- 垂直滚动容器 -->
    <div class="scroll-container">
      <!-- 两列网格 -->
      <div class="card-grid">
        <!-- 左列 -->
        <div class="column" ref="leftColumn">
          <VlogCard
            v-for="(item, index) in leftItems"
            :key="index"
            :item="item"
          />
        </div>
        <!-- 右列 -->
        <div class="column" ref="rightColumn">
          <VlogCard
            v-for="(item, index) in rightItems"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </div>

    <button class="load-more" @click="loadMore">加载更多</button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import VlogCard from "./components/VlogCard.vue"; // 引入封装的卡片组件
import generateRandomItem from "@/utils/generateRandomItem.js"; // 引入封装的生成随机数据的方法

// 引用组件，方便我待会操作属性
const leftColumn = ref(null);
const rightColumn = ref(null);

// 定义
const allItems = ref([]); // 所有数据
const leftItems = ref([]); // 左列数据
const rightItems = ref([]); // 右列数据

// 我这里简单编写一个瀑布流算法：将卡片分配到高度较小的列
function distributeItems() {
  // 先重置左右列数据，让其为空
  leftItems.value = [];
  rightItems.value = [];

  // 初始化左右列的累计高度
  let leftHeight = 0;
  let rightHeight = 0;

  // 遍历所有卡片，决定放入左列还是右列
  allItems.value.forEach((item) => {
    // 我的策略是，将卡片放入当前累计高度较小的列
    if (leftHeight <= rightHeight) {
      leftItems.value.push(item);
      leftHeight += 150 + Math.random() * 100;
    } else {
      rightItems.value.push(item);
      rightHeight += 150 + Math.random() * 100;
    }
  });
}

// 用来初始加载内容的函数
function loadInitial() {
  allItems.value = Array.from({ length: 12 }, generateRandomItem); // 生成12条随机数据
  distributeItems();
}

// 用来加载更多内容的函数
function loadMore() {
  const newItems = Array.from({ length: 6 }, generateRandomItem); // 生成6条随机数据
  allItems.value.push(...newItems);
  distributeItems();
}

onMounted(() => {
  // 初始加载数据
  loadInitial();

  // 我这里添加了一个事件监听，在窗口大小变化时重新分配
  window.addEventListener("resize", distributeItems);
});
</script>

<style scoped>
.app-container {
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.scroll-container {
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
}

.column {
  display: flex;
  flex-direction: column;
}

.load-more {
  width: 90%;
  margin: 10px auto;
  padding: 12px;
  background: #1677ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
}
</style>
