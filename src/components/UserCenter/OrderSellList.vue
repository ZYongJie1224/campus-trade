<!-- OrderSellList.vue -->
<template>
  <OrderList
    :orders="orders"
    :total="total"
    :loading="loading"
    :page="page"
    :page-size="pageSize"
    @page-change="fetchOrders"
    @view="viewOrder"
  />

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import OrderList from './OrderList.vue'
import { getSellOrders } from '@/api/modules/usercenter/usercenter'
import { ElMessage } from 'element-plus';

const props = defineProps<{ tab: string }>()
const orders = ref([])
const total = ref(0)
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const showProductDialog = ref(false)
const currentProductId = ref<number|string|undefined>(undefined)

async function fetchOrders(newPage = 1) {
  loading.value = true
  page.value = newPage
  // 实际接口，传递tab、分页参数
  const res = await getSellOrders(props.tab, page.value, pageSize.value)
  if (res.code === 200) {
    orders.value = res.data.records || []
    total.value = res.data.total || 0
  } else {
    orders.value = []
    total.value = 0
    // console.log(res.code)
    // ElMessage(res.code)
  }
  loading.value = false
}

function viewOrder(row: any) {
  currentProductId.value = row.productId
  showProductDialog.value = true
}

watch(() => props.tab, () => fetchOrders(1), { immediate: true })
</script>