<template>
    <div class="fav-list-root">
      <el-table
        :data="favorites"
        stripe
        border
        class="fav-table"
        v-loading="loading"
        empty-text="暂无收藏"
        @row-click="onRowClick"
        height="100%"
      >
        <el-table-column prop="product.productId" label="商品ID" width="100" />
        <el-table-column prop="product.name" label="商品名称" min-width="160" />
        <el-table-column prop="product.price" label="价格" width="100">
          <template #default="{ row }">
            <span>¥{{ row.product.price.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="product.isSold" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.product.isSold ? 'info' : 'success'"
              effect="plain"
              size="small"
            >{{ row.product.isSold ? '已售出' : '在售' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="收藏时间" width="160" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
              size="small"
              class="theme-btn"
              @click.stop="goToProductDetail(row.product.productId)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fav-pagination">
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
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getFavoriteList } from '@/api/modules/usercenter/usercenter'
  import { ElMessage } from 'element-plus'
  
  const favorites = ref<any[]>([])
  const total = ref(0)
  const loading = ref(false)
  const page = ref(1)
  const pageSize = ref(10)
  const router = useRouter()
  
  async function fetchFavorites(newPage = 1) {
    loading.value = true
    page.value = newPage
    try {
      const res = await getFavoriteList(page.value, pageSize.value)
      if (res.code === 200) {
        favorites.value = res.data.records
        total.value = res.data.total
      } else if (res.code === 401) {
        ElMessage.warning('请先登录')
        favorites.value = []
        total.value = 0
      } else {
        ElMessage.error(res.msg || '获取收藏失败')
        favorites.value = []
        total.value = 0
      }
    } finally {
      loading.value = false
    }
  }
  
  function handlePageChange(val: number) {
    fetchFavorites(val)
  }
  
  function onRowClick(row: any) {
    goToProductDetail(row.product.productId)
  }
  
  function goToProductDetail(productId: number) {
    console.log("11111",productId)
    router.push({ name: 'ProductDetail', params: { id:productId } })
  }
  
  onMounted(() => {
    fetchFavorites(1)
  })
  </script>
  
  <style scoped>
  .fav-list-root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .fav-table {
    flex: 1 1 0;
    min-height: 0;
  }
  .fav-pagination {
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