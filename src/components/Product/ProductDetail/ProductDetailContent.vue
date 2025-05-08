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
        <img :src="img" />
      </div>
    </aside>

    <!-- 中间大图 -->
    <section class="media-viewer">
      <img
        :src="images[currentImage]"
        class="main-media"
      />
      <div v-if="product.isSold" class="sold-banner">
        已卖出
      </div>
    </section>

    <!-- 右侧商品信息 -->
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
      // 跳转到订单详情页，携带订单号
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
  position: relative;
}
.main-media {
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  background: #eee;
}
.sold-banner {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  background: rgba(50,50,50,0.8);
  color: #fff;
  padding: 20px 60px;
  font-size: 36px;
  font-weight: bold;
  border-radius: 16px;
  pointer-events: none;
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
.sold-tip {
  color: #888;
  font-size: 18px;
  margin-left: 10px;
}
</style>