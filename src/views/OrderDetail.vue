<template>
  <Search />

  <div class="order-detail">

    <h1>订单详情</h1>
    <div v-if="loading" class="order-detail__loading">
      <el-skeleton rows="5" animated />
    </div>
    <div v-else-if="order">
      <el-descriptions
        :title="`订单号：${order.orderId}`"
        :column="1"
        border
        class="order-detail__desc"
      >
        <el-descriptions-item label="商品名称">{{ order.productName || '--' }}</el-descriptions-item>
        <el-descriptions-item label="价格">¥{{ order.orderPrice.toFixed(2) || '--' }}</el-descriptions-item>
        <el-descriptions-item label="收货地址">{{ order.address || '--' }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag :type="statusTagType(order.orderStatus)">
            {{ statusText(order.orderStatus) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="支付截止时间">
          <span v-if="order.paymentDeadline">{{ order.paymentDeadline }}</span>
          <span v-else>--</span>
        </el-descriptions-item>
      </el-descriptions>

      <div v-if="isUnpaid(order.orderStatus)" class="order-detail__actions">
        <el-alert
          type="warning"
          show-icon
          :title="`请在 ${formatRemainTime(remainSeconds)} 内完成支付，否则订单将自动取消。`"
          v-if="remainSeconds > 0"
        />
        <el-alert
          type="error"
          show-icon
          title="订单已超时自动取消"
          v-else
        />
        <el-button type="primary" @click="payOrder" :disabled="remainSeconds <= 0" style="margin-top: 20px;">
          去支付
        </el-button>
      </div>
      <div v-else class="order-detail__actions">
        <el-alert
          v-if="order.orderStatus === 1"
          type="success"
          show-icon
          title="订单已支付"
        />
        <el-alert
          v-else-if="order.orderStatus === 2"
          type="info"
          show-icon
          title="订单已取消"
        />
      </div>
    </div>
    <div v-else>
      <el-empty description="未找到订单" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetail, payOrder as payOrderApi } from '@/api/modules/order/order'
import { ElMessage, ElMessageBox } from 'element-plus'
import Search from '@/components/Search.vue'

const route = useRoute()
const orderId = route.params.orderId as string

const order = ref<any>(null)
const loading = ref(true)
const remainSeconds = ref(0)
let timer: NodeJS.Timeout | null = null

const fetchOrderDetail = async () => {
  loading.value = true
  try {
    const res = await getOrderDetail(orderId)
    if (res && res.code === 200) {
      order.value = res.data
      updateRemainSeconds()
      if (isUnpaid(order.value.orderStatus)) {
        setupTimer()
      }
    } else {
      order.value = null
    }
  } finally {
    loading.value = false
  }
}

function statusText(status: number) {
  switch (status) {
    case 0: return '待付款'
    case 1: return '已付款'
    case 2: return '已取消'
    default: return '未知'
  }
}

function statusTagType(status: number) {
  switch (status) {
    case 0: return ''
    case 1: return 'success'
    case 2: return 'info'
    default: return ''
  }
}

function isUnpaid(status: number) {
  return status === 0
}

function updateRemainSeconds() {
  if (!order.value || !order.value.paymentDeadline) {
    remainSeconds.value = 0
    return
  }
  const ddl = new Date(order.value.paymentDeadline).getTime()
  const now = Date.now()
  remainSeconds.value = Math.max(Math.floor((ddl - now) / 1000), 0)
}

function setupTimer() {
  clearTimer()
  timer = setInterval(() => {
    updateRemainSeconds()
    if (remainSeconds.value <= 0) {
      clearTimer()
      fetchOrderDetail() // 刷新状态
    }
  }, 1000)
}

function clearTimer() {
  if (timer) clearInterval(timer)
  timer = null
}

function formatRemainTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}分${s}秒`
}

const payOrder = async () => {
  try {
    await ElMessageBox.confirm('确认要支付该订单吗？', '确认支付', { type: 'warning' })
    const res = await payOrderApi(order.value.orderId)
    console.log(res)
    if (res.code === 200) {
      ElMessage.success('支付成功')
      fetchOrderDetail()
    } else {
      ElMessage.error(res?.message || '支付失败')
    }
  } catch {
    // 用户取消支付
  }
}

onMounted(fetchOrderDetail)
onUnmounted(clearTimer)
</script>

<style scoped>
.order-detail {
  max-width: 600px;
  margin: 32px auto;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.order-detail__desc {
  margin-bottom: 32px;
}
.order-detail__actions {
  margin-top: 24px;
}
</style>