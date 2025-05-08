<!-- OrderList.vue -->
<template>
  <div class="order-list-root">
    <el-table
      :data="orders"
      stripe
      border
      class="order-table"
      v-loading="loading"
      empty-text="暂无订单"
      @row-click="onRowClick"
      height="100%"
    >
      <el-table-column prop="orderId" label="订单号" width="180" />
      <el-table-column prop="productName" label="商品" min-width="160" />
      <!-- 动态显示买家或卖家名称 -->
      <el-table-column
        v-if="showSeller"
        prop="sellerName"
        label="卖家"
        min-width="110"
      />
      <el-table-column
        v-if="showBuyer"
        prop="buyerName"
        label="买家"
        min-width="110"
      />
      <el-table-column prop="createTime" label="下单时间" width="150" />
      <el-table-column prop="orderPrice" label="金额" width="100" />
      <el-table-column prop="orderStatus" label="状态" width="100">
        <template #default="{row}">
          <el-tag
            :type="statusType(row.orderStatus)"
            effect="plain"
            size="small"
          >{{ statusText(row.orderStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{row}">
          <el-button
            size="small"
            class="theme-btn"
            @click.stop="goToOrderDetail(row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="order-pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  orders?: any[]
  total?: number
  loading?: boolean
  page?: number
  pageSize?: number
  mode?: 'buy' | 'sell' // 新增：区分买/卖
}>()
const emits = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const page = ref(props.page ?? 1)
const pageSize = ref(props.pageSize ?? 10)
const orders = ref(props.orders ?? [])
const total = ref(props.total ?? 0)
const loading = ref(props.loading ?? false)
const router = useRouter()

// 新增：区分列显示
const showSeller = computed(() => props.mode === 'buy')
const showBuyer = computed(() => props.mode === 'sell')

// 监听props变化
watch(
  () => [props.orders, props.total, props.loading, props.page, props.pageSize],
  ([ordersVal, totalVal, loadingVal, pageVal, pageSizeVal]) => {
    orders.value = ordersVal ?? []
    total.value = totalVal ?? 0
    loading.value = loadingVal ?? false
    page.value = pageVal ?? 1
    pageSize.value = pageSizeVal ?? 10
  }
)

function handlePageChange(val: number) {
  emits('page-change', val)
}

function onRowClick(row: any) {
  goToOrderDetail(row)
}

// 跳转到订单详情页面
function goToOrderDetail(row: any) {
  router.push({ name: 'OrderDetail', params: { orderId: row.orderId } })
}

function statusType(status: number) {
  switch (status) {
    case 0: return 'warning'
    case 1: return 'success'
    case 2: return 'info'
    default: return ''
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
</script>

<style scoped>
.order-list-root {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.order-table {
  flex: 1 1 0;
  min-height: 0;
}
.order-pagination {
  padding: 20px 24px 8px 0;
  display: flex;
  justify-content: flex-end;
}
.theme-btn {
  background: linear-gradient(90deg, #eaf3ff 0, #1681fd1a 100%);
  color: #1681fd;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  transition: background 0.18s, color 0.18s;
}
.theme-btn:hover, .theme-btn:focus {
  background: #2446a6;
  color: #fff;
}
</style>