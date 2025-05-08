<template>
  <div class="product-detail">
    <!-- 顶部横幅 -->
    <Search />
    <!-- 详情内容 -->
    <ProductDetailContent />
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search.vue'
import ProductDetailContent from '@/components/Product/ProductDetail/ProductDetailContent.vue'
import { onMounted } from 'vue'
onMounted(() => {
  document.title = "易校园-商品详情"
})
</script>

<style scoped>
.product-detail {
  background: #f9fafb;
  min-width: 1296px;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
</style>