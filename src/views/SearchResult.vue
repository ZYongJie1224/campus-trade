<template>
    <SearchHeader />
    <EasyCampusNavBar />

    <div class="search-result-page">

        <h2 class="search-title">
            搜索结果：<span style="color:#2446a6">{{ keyword }}</span>
        </h2>
        <div infinite-scroll-immediate="true" v-infinite-scroll="loadMore" infinite-scroll-delay="1000"
            :infinite-scroll-disabled="loading || !hasMore" :infinite-scroll-distance="50" class="goods-list">
            <template v-if="loading && products.length === 0">
                <SkeletonCard v-for="n in 12" :key="'skeleton-' + n" />
            </template>
            <template v-else-if="products.length === 0">
                <div class="not-found">未找到相关商品</div>
            </template>
            <template v-else>
                <template v-for="(item, idx) in products" :key="item.productId">
                    <div style="position:relative;">
                        <SkeletonCard v-show="!cardLoaded[idx]" />
                        <ProductCard v-show="cardLoaded[idx]" v-bind="{
                            ...item,
                            productTitle: highlight(item.productTitle),
                            productName: highlight(item.productName)
                        }" @loaded="() => cardLoaded[idx] = true" @click="goToDetail(item.productId)" />
                    </div>
                </template>
                <div v-if="loading" class="list-loading-more">加载中...</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/Product/ProductCard/ProductCard.vue'
import SkeletonCard from '@/components/Product/ProductCard/SkeletonCard.vue'
import SearchHeader from '@/components/Search.vue';
import EasyCampusNavBar from '@/components/Nav/EasyCampusNavBar.vue'
import { searchProduct } from '@/api/modules/goods/goods';

const route = useRoute()
const router = useRouter()
const keyword = ref((route.query.keyword as string) || '')
const products = ref<any[]>([])
const cardLoaded = ref<boolean[]>([])
const loading = ref(false)
const hasMore = ref(true)
const lastId = ref(0)
const pageSize = 20

function highlight(text: string) {
  if (!text || !keyword.value) return text
  return text.replace(
    new RegExp(keyword.value, 'gi'),
    match => `<span style="color:#ff4f24">${match}</span>`
  )
}

async function fetchSearch(reset = false) {
  if (!keyword.value.trim()) {
    products.value = []
    hasMore.value = false
    return
  }
  loading.value = true
  try {
    // 每次取最后一条的productId
    const fetchLastId = reset ? 0 : (products.value.length > 0 ? products.value[products.value.length - 1].productId : 0)
    const res = await searchProduct(keyword.value, fetchLastId, pageSize)
    const list = res.data || []
    if (reset) {
      products.value = []
      cardLoaded.value = []
      hasMore.value = true
    }
    if (list.length < pageSize) {
      hasMore.value = false
    }
    products.value.push(...list)
    cardLoaded.value.push(...Array(list.length).fill(false))
  } catch (e) {
    if (reset) products.value = []
    hasMore.value = false
  }
  loading.value = false
}

async function loadMore() {
  if (loading.value || !hasMore.value) return
  await fetchSearch()
}

function goToDetail(productId: string | number) {
  router.push({ name: 'ProductDetail', params: { id: productId } })
}

// 关键词变化时重置
watch(() => route.query.keyword, (newK) => {
  keyword.value = newK as string
  fetchSearch(true)
})

// 首次加载
onMounted(() => {
  fetchSearch(true)
})
</script>

<style scoped>
.search-result-page {
    height: auto;
  width: 100%;
  min-width: 1296px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
    /* max-width: 1280px; */
    /* margin: 32px auto;
    padding: 32px 24px;
    background: #fff;
    border-radius: 20px;
    min-height: 600px; */
}

.search-title {
    font-size: 24px;
    margin-bottom: 24px;
    font-weight: bold;
    color: #2d3a4b;
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
  border-radius: 20px;
}

.not-found {
    color: #888;
    font-size: 22px;
    padding: 48px;
    text-align: center;
    width: 100%;
}

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
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}
</style>