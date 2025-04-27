<template>
  <div class="home">
    <Search />
    <EasyCampusNavBar />
    <ShowcaseLayout />
    <div
      infinite-scroll-immediate="true"
      v-infinite-scroll="loadMore"
      infinite-scroll-delay="1000"
      :infinite-scroll-disabled="loading || !hasMore"
      :infinite-scroll-distance="50"
      class="goods-list"
    >
    <template v-if="goods.length === 0 && loading">
    <SkeletonCard v-for="n in 20" :key="'skeleton-' + n" />
  </template>
  <template v-else>
    <ProductCard
      v-for="(good, index) in goods"
      :key="index"
      v-bind="good"
    />
    <!-- 非首屏加载更多时，可以加个小loading提示，不用骨架屏 -->
    <div v-if="loading" class="list-loading-more">加载中...</div>
  </template>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script lang="ts" setup>
import { getGoods } from "@/api/modules/goods/goods";
import ProductCard from "@/components/Product/ProductCard/ProductCard.vue";
import Search from "@/components/Search.vue";
import EasyCampusNavBar from "@/components/Nav/EasyCampusNavBar.vue";
import ShowcaseLayout from "@/components/Nav/ShowcaseLayout.vue";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { ProductDetailVO } from "@/components/Product/ProductCard/config";
import SkeletonCard from "@/components/Product/ProductCard/SkeletonCard.vue"; // 骨架屏组件见下方


const goods = reactive<ProductDetailVO[]>([]);

const loading = ref(false);
const hasMore = ref(true);
const page = ref(1);

const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    const res = await getGoods(page.value);
    if (!res.data || res.data.length === 0) {
      hasMore.value = false;
      return;
    }
    goods.push(...res.data);
    page.value++;
  } catch (e) {
    hasMore.value = false;
    ElMessage.error('加载失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.list-loading-more {
  width: 100%;
  text-align: center;
  color: #888;
  font-size: 16px;
  padding: 24px 0 18px;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #f7f7f7 60%, #ededed 100%);
  border-radius: 8px;
  margin: 0 auto 20px auto;
  animation: blink 1.2s infinite alternate;
}

@keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0.5; }
}
.home {
  height: auto;
  /* overflow: auto; */
  width: 100%;
  min-width: 1296px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 水平居中子元素 */
  background-color: #f5f5f5;
  /* 添加背景色 */
}
.images{
  height: 350px;
  width: 1396px;
}
.nav {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* 垂直居中 */
  padding-top: 20px;
  height: 350px;
  width: 1396px;
  background-color: #ffffff;
  /* 添加背景色 */
  min-width: 1396px;
  margin: 20px auto;
  /* 水平居中，并添加间距 */
  border-radius: 12px;
  /* 边框圆角 */
  padding: 20px;
  margin-top: 20px;
  /* 添加间距 */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  /* 边框阴影 */
}

.goods-list {
  height: auto;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  display: flex;
  /* justify-content: center; */
  /* overflow: auto; */
  width: 1369px;
  padding: 20px;
  background-color: #ffffff;
  /* 添加背景色 */
  min-width: 1396px;
  border-radius: 12px;
  /* 边框圆角 */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  /* 边框阴影 */
  /* margin-top: 20px; 添加间距 */
}
</style>