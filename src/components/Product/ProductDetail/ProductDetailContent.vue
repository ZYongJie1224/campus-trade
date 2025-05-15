<template>
  <main
    class="main-content"
    :class="{ sold: product && product.isSold }"
    v-if="product"
  >
    <!-- 左侧图片缩略图区 -->
    <aside class="media-list">
      <div
        v-for="(img, idx) in images"
        :key="idx"
        class="thumb"
        :class="{ active: idx === currentImage }"
        @click="currentImage = idx"
      >
        <img :src="img" alt="商品图片" />
      </div>
    </aside>

    <!-- 中间大图 -->
    <section class="media-viewer">
      <img
        :src="images[currentImage]"
        class="main-media"
        alt="主商品图片"
      />
      <div v-if="product.isSold" class="sold-banner">
        已卖出
      </div>
    </section>

    <!-- 右侧商品信息 -->
    <aside class="product-info">
      <div class="product-header">
        <h1 class="product-title">{{ product.title || product.name }}</h1>
        <div v-if="product.name && product.title" class="product-sub">
          {{ product.name }}
        </div>
        <div v-if="product.tags && product.tags.length" class="product-tags">
          <el-tag
            v-for="(tag, idx) in product.tags"
            :key="idx"
            effect="light"
            size="small"
            style="margin-right: 8px;"
          >{{ tag }}</el-tag>
        </div>
        <div class="product-meta">
          发布：{{ formatDate(product.createTime) }}
          <span class="meta-divider">|</span>
          {{ product.wishCount || 0 }}人想要
          <span class="meta-divider">|</span>
          {{ product.viewCount || 0 }}浏览
        </div>
      </div>
      <div class="price-block">
        <span class="price">¥{{ product.price }}</span>
      </div>
      <div class="desc-title">商品描述</div>
      <div class="desc">{{ product.productDescription }}</div>
      <div class="actions">
        <button
          class="buy"
          @click="onBuyClick"
          :disabled="product.isSold"
          v-if="!product.isSold"
        >立即下单</button>
        <span v-else class="sold-tip">已卖出</span>
        <button
          v-if="!isFavorited"
          class="fav"
          @click="onFavClick"
          :disabled="product.isSold"
        >收藏</button>
        <button
          v-else
          class="unfav"
          @click="onUnfavClick"
          :disabled="product.isSold"
        >取消收藏</button>
      </div>
    </aside>

    <!-- 购买输入地址弹窗 -->
    <el-dialog v-model="buyDialogVisible" title="填写收货地址" width="400px">
      <el-form @submit.prevent>
        <el-form-item label="收货地址">
          <el-input v-model="addressInput" placeholder="请输入收货地址" />
        </el-form-item>
        <div style="text-align:right;">
          <el-button @click="buyDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitOrder">确认下单</el-button>
        </div>
      </el-form>
    </el-dialog>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getProductDetail, getProductImgs } from '@/api/modules/goods/goods'
import { createOrder } from '@/api/modules/order/order'
import { checkFavorite, addFavorite, cremoveFavorite } from '@/api/modules/favorite/favorite'

const route = useRoute()
const router = useRouter()
const productId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const product = ref<any>(null)
const images = ref<string[]>([])
const currentImage = ref(0)
const isFavorited = ref(false)

const buyDialogVisible = ref(false)
const addressInput = ref('')

// 日期格式化
function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return dateStr.slice(0, 10)
}

const fetchDetail = async () => {
  const res = await getProductDetail(productId)
  if (res.data && res.code === 200) {
    product.value = res.data
    // 兼容后端tags为null或字符串数组
    if (!Array.isArray(product.value.tags)) product.value.tags = []
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
    isFavorited.value = !!res.data
  }
}

onMounted(async () => {
  await fetchDetail()
  await fetchFavoriteStatus()
})

function onBuyClick() {
  if (product.value && product.value.isSold) {
    ElMessage.warning('商品已卖出')
    return
  }
  buyDialogVisible.value = true
}

async function submitOrder() {
  if (!addressInput.value.trim()) {
    ElMessage.warning('请输入收货地址')
    return
  }
  try {
    const res = await createOrder(productId, addressInput.value)
    if (res && res.code === 200) {
      ElMessage.success('下单成功！')
      buyDialogVisible.value = false
      addressInput.value = ''
      router.push({ name: 'OrderDetail', params: { orderId: res.data.orderId } })
    } else if (res.code === 401) {
      ElMessage.warning('请先登录')
    } else if (res.message) {
      ElMessage.warning(res.message)
    }
  } catch (e) {
    console.log(e)
    ElMessage.error('下单失败，请重试')
  }
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
  transition: filter 0.2s;
}
.main-content.sold {
  filter: grayscale(1) brightness(0.95);
  position: relative;
}
.media-list {
  width: 110px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 32px;
  align-items: center;
}
.thumb {
  border: 2px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  width: 80px;
  height: 80px;
  background: #f7f7f7;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(150,150,150,0.05);
}
.thumb.active {
  border-color: #5b84f9;
  box-shadow: 0 2px 8px rgba(91,132,249,0.12);
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
  position: relative;
}
.main-media {
  width: 420px;
  height: 540px;
  object-fit: cover;
  border-radius: 14px;
  background: #eee;
  box-shadow: 0 2px 18px #f1f2f9;
}
.sold-banner {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  background: rgba(50,50,50,0.8);
  color: #fff;
  padding: 22px 68px;
  font-size: 38px;
  font-weight: bold;
  border-radius: 18px;
  pointer-events: none;
  letter-spacing: 2px;
}
.product-info {
  flex: 1;
  margin-left: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 390px;
  max-width: 500px;
}
.product-header {
  margin-bottom: 22px;
}
.product-title {
  font-size: 28px;
  font-weight: 700;
  color: #23263b;
  margin-bottom: 6px;
  line-height: 1.25;
  word-break: break-all;
}
.product-sub {
  font-size: 18px;
  color: #5b6a91;
  margin-bottom: 8px;
  line-height: 1.2;
}
.product-tags {
  margin-bottom: 8px;
}
.product-meta {
  font-size: 14px;
  color: #a6adc8;
  margin-bottom: 8px;
}
.meta-divider {
  margin: 0 8px;
  color: #e0e0e0;
}
.price-block {
  margin-bottom: 18px;
}
.price {
  color: #ff7a00;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 1px;
}
.desc-title {
  font-size: 16px;
  color: #7a7a7a;
  margin-bottom: 4px;
  font-weight: 500;
}
.desc {
  font-size: 16px;
  color: #3a3a3a;
  line-height: 1.7;
  margin-bottom: 24px;
  word-break: break-all;
}
.actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  align-items: center;
}
.actions button {
  border: none;
  border-radius: 22px;
  padding: 12px 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.1s;
}
.actions .buy {
  background: #23263b;
  color: #fff;
  box-shadow: 0 2px 6px #e8eafd;
}
.actions .buy:active {
  background: #3a3d5c;
}
.actions .fav {
  background: #fff;
  color: #23263b;
  border: 1px solid #e0e0e0;
}
.actions .fav:active {
  background: #f5f6fa;
}
.actions .unfav {
  background: #f4f5fa;
  color: #888;
  border: 1px solid #e0e0e0;
}
.sold-tip {
  color: #888;
  font-size: 18px;
  margin-left: 10px;
}
</style>