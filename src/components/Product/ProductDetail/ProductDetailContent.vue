<template>
  <main class="main-content" v-if="product">
    <!-- 左：图片缩略图区 -->
    <aside class="media-list">
      <div
        v-for="(img, idx) in images"
        :key="idx"
        class="thumb"
        :class="{active: idx === currentImage}"
        @click="currentImage = idx"
      >
        <img :src="img" />
      </div>
    </aside>

    <!-- 中：大图 -->
    <section class="media-viewer">
      <img
        :src="images[currentImage]"
        class="main-media"
      />
    </section>

    <!-- 右：商品信息 -->
    <aside class="product-info">
      <div class="price">
        <span class="price-main">¥{{ product.price }}</span>
      </div>
      <div class="views">
        {{ product.wishCount || 0 }}人想要 | {{ product.viewCount || 0 }}浏览
      </div>
      <div class="desc">
        {{ product.productDescription }}
      </div>
      <div class="actions">
        <!-- <button class="wanna" @click="onWannaClick">我想要</button> -->
        <button class="buy" @click="onBuyClick">立即购买</button>
        <button
          v-if="!isFavorited"
          class="fav"
          @click="onFavClick"
        >收藏</button>
        <button
          v-else
          class="unfav"
          @click="onUnfavClick"
        >取消收藏</button>
      </div>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductDetail, getProductImgs } from '@/api/modules/goods/goods'
import { checkFavorite, addFavorite, cremoveFavorite } from '@/api/modules/favorite/favorite'
import { ElMessage } from 'element-plus'

const route = useRoute()
const productId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const product = ref<any>(null)
const images = ref<string[]>([])
const currentImage = ref(0)
const isFavorited = ref(false)

const fetchDetail = async () => {
  const res = await getProductDetail(productId)
  if (res.data && res.code === 200) {
    product.value = res.data
    images.value = []
    if (product.value.mainImageUrl) images.value.push(product.value.mainImageUrl)
    const imgRes = await getProductImgs(productId)
    if (imgRes.data && imgRes.code === 200 && Array.isArray(imgRes.data)) {
      images.value.push(...imgRes.data)
    }
  }
}

const fetchFavoriteStatus = async () => {
  const res = await checkFavorite(productId)
  if (res && res.code === 200) {
    // 假设后端返回data为true/false
    isFavorited.value = !!res.data
  }
}

onMounted(async () => {
  await fetchDetail()
  await fetchFavoriteStatus()
})

function onWannaClick() {
  ElMessage.info('我想要')
}
function onBuyClick() {
  ElMessage.info('立即购买')
}
async function onFavClick() {
  const res = await addFavorite(productId)
  if (res.code === 200) {
    isFavorited.value = true
    ElMessage.success('已添加到收藏夹')
  } else if (res.code === 401) {
    ElMessage.warning('请先登录')
  } else if (res.message) {
    ElMessage.warning(res.message)
  }
}
async function onUnfavClick() {
  const res = await cremoveFavorite(productId)
  if (res.code === 200) {
    isFavorited.value = false
    ElMessage.success('已取消收藏')
  } else if (res.code === 401) {
    ElMessage.warning('请先登录')
  } else if (res.message) {
    ElMessage.warning(res.message)
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  margin: 32px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px #eee;
  width: 1400px;
  min-height: 600px;
  padding: 32px;
}
.media-list {
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 32px;
}
.thumb {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  width: 80px;
  height: 80px;
  background: #f4f4f4;
}
.thumb.active {
  border-color: #ffe600;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-viewer {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-media {
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  background: #eee;
}
.product-info {
  flex: 1;
  margin-left: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 350px;
}
.price {
  font-size: 32px;
  font-weight: bold;
  color: #f60;
  display: flex;
  align-items: baseline;
  gap: 16px;
}
.price-tip {
  background: #ffe6a0;
  color: #ff4c00;
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 6px;
}
.views {
  color: #999;
  margin: 12px 0;
}
.desc {
  font-size: 18px;
  color: #333;
  margin: 16px 0 24px 0;
}
.actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  align-items: center;
}
.actions button {
  border: none;
  border-radius: 22px;
  padding: 12px 32px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.1s;
}
.actions .wanna {
  background: #ffe600;
  color: #222;
}
.actions .buy {
  background: #333;
  color: #fff;
}
.actions .fav {
  background: #fff;
  color: #333;
  border: 1px solid #eee;
}
.actions .unfav {
  background: #fafafa;
  color: #888;
  border: 1px solid #eee;
}
</style>