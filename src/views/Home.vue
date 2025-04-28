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
        <template v-for="(good, index) in goods" :key="index">
          <!-- 若对应商品卡片未加载图片，则显示骨架屏，否则显示商品卡片 -->
          <SkeletonCard v-if="!cardLoaded[index]" />
          <ProductCard
            v-else
            v-bind="good"
            @loaded="() => cardLoaded[index] = true"
          />
        </template>
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
import SkeletonCard from "@/components/Product/ProductCard/SkeletonCard.vue";

const goods = reactive<ProductDetailVO[]>([]);
// 新增：每个卡片的图片加载状态（下标与goods对应）
const cardLoaded = ref<boolean[]>([]);

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
    // 新增的卡片初始化为未加载（false）
    cardLoaded.value.push(...Array(res.data.length).fill(false));
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
  width: 100%;
  min-width: 1296px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
}
.goods-list {
  height: auto;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  display: flex;
  width: 1369px;
  padding: 20px;
  background-color: #ffffff;
  min-width: 1396px;
  border-radius: 12px;
}
</style>