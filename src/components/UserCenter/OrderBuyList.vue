<template>
  <OrderList :orders="orders" :total="total" :loading="loading" :page="page" :page-size="pageSize"
    @page-change="fetchOrders" @view="viewOrder" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import OrderList from './OrderList.vue'
import { getBuyOrders } from '@/api/modules/usercenter/usercenter' // 你的API封装路径
import { ElMessage } from 'element-plus';

const props = defineProps<{ tab: string }>()
const orders = ref([])
const total = ref(0)
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)

async function fetchOrders(newPage = 1) {
  loading.value = true
  page.value = newPage
  try {
    // 调用实际后端接口，传递tab、分页信息
    const res = await getBuyOrders(props.tab)
    if (res.code === 200) {
      orders.value = res.data.records || res.data.list || []
      total.value = res.data.total || 0
    } else if (res.code === 203 || res.code === 1001) { // 假设401或1001为未登录
      orders.value = []
      total.value = 0
      ElMessage.warning('请先登录！')
    }

    else {
      orders.value = []
      total.value = 0
    }
  } finally {
    loading.value = false
  }
}

function viewOrder(row: any) {
  // TODO: 弹窗详情或右侧区域显示
  alert('查看订单：' + (row.orderNo || row.orderId))
}

watch(() => props.tab, () => fetchOrders(1), { immediate: true })
</script>