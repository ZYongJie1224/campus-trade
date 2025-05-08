<template>
  <div class="upload-bg">
    <Search />

    <div class="upload-container">
      <div class="upload-card">
        <!-- 图片上传区 -->
        <div class="img-upload-panel">
          <!-- 主图上传与显示 -->
          <div class="main-img-upload">
            <input
              ref="mainImageInput"
              type="file"
              accept="image/*"
              style="display:none"
              @change="onMainImageChange"
            />
            <div v-if="mainImageUrl" class="main-img-preview-wrapper">
              <img :src="mainImageUrl" class="main-img-preview" @click="chooseMainImage"/>
              <span class="img-close" @click="removeMainImage">×</span>
            </div>
            <div v-else class="main-img-placeholder" @click="chooseMainImage">
              <div class="main-img-title">主图</div>
              <div class="main-img-hint">点击上传（最大3MB）</div>
            </div>
          </div>
          <!-- 小图上传与显示 -->
          <div class="other-img-list">
            <div
              v-for="(url, idx) in otherImageUrls"
              :key="idx"
              class="other-img-upload"
            >
              <img :src="url" class="other-img-preview" @click="replaceOtherImage(idx)" />
              <span class="img-close" @click="removeOtherImage(idx)">×</span>
              <input
                type="file"
                accept="image/*"
                :ref="setOtherInputRef(idx)"
                style="display:none"
                @change="e => onOtherImageChange(e, idx)"
              />
            </div>
            <div
              v-for="n in (3 - otherImageUrls.length)"
              :key="'other-placeholder-' + n"
              class="other-img-upload other-img-placeholder"
              @click="chooseOtherImage"
            >
              <span class="plus">+</span>
            </div>
            <input
              type="file"
              accept="image/*"
              ref="otherImageInput"
              style="display:none"
              @change="e => onOtherImageChange(e)"
            />
          </div>
          <div class="other-img-hint">其他小图，最多三张，上传后显示图片预览</div>
        </div>

        <!-- 裁剪弹窗 -->
        <el-dialog v-model="cropperVisible" width="420px" title="裁剪图片" :close-on-click-modal="false">
          <vue-cropper
            ref="cropper"
            :img="cropperImg"
            :output-size="1"
            :output-type="'png'"
            :fixed="true"
            :auto-crop="true"
            :fixed-number="[1,1]"
            style="width:100%;height:340px;background:#eaf1fd"
          />
          <template #footer>
            <el-button @click="cropperVisible = false">取消</el-button>
            <el-button type="primary" @click="doCrop">确定</el-button>
          </template>
        </el-dialog>

        <!-- 右侧表单 -->
        <el-form
          class="upload-form"
          :model="form"
          label-width="90px"
          @submit.prevent="handleSubmit"
        >

          <el-form-item label="商品名称" prop="product_name" required>
            <el-input v-model="form.product_name" class="input" />
          </el-form-item>
          <el-form-item label="商品标题" prop="product_title" required>
            <el-input v-model="form.product_title" class="input" />
          </el-form-item>
          <el-form-item label="商品详情" prop="product_description" required>
            <el-input
              v-model="form.product_description"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              class="input textarea"
            />
          </el-form-item>
                    <!-- 分类下拉框 -->
                    <el-form-item label="商品分类" prop="category_id" required>
            <el-select v-model="form.category_id" placeholder="请选择分类" class="input">
              <el-option
                v-for="cat in categories"
                :key="cat.categoryId"
                :label="cat.categoryName"
                :value="cat.categoryId"
              />
            </el-select>
          </el-form-item>
          <el-row :gutter="14" class="tags-price-row">
            <el-col :span="12">
              <el-form-item label="商品标签" prop="tags">
                <el-input
                  v-model="tagInput"
                  placeholder="输入标签后回车，最多3个"
                  @keyup.enter.native.prevent="addTag"
                  :disabled="tags.length >= 3"
                  class="input"
                />
                <div class="tag-list">
                  <el-tag
                    v-for="(tag, i) in tags"
                    :key="i"
                    closable
                    type="info"
                    @close="removeTag(i)"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品价格" prop="product_price" required>
                <el-input-number
                  v-model="form.product_price"
                  class="input"
                  style="width: 100%"
                  :min="0"
                  :step="0.01"
                  :precision="2"
                  placeholder="价格"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              class="submit-btn"
              size="large"
              @click="handleSubmit"
            >上传</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import Search from '@/components/Search.vue'
import { uploadProduct, getCategories } from '@/api/modules/goods/goods'
import router from '@/router'

// 表单数据
const form = reactive({
  product_name: '',
  product_title: '',
  product_description: '',
  product_price: null as number | null,
  category_id: null as number | null,
})

// 分类列表
const categories = ref<{ categoryId: number; categoryName: string; navId: number | null }[]>([])

// 获取分类数据
const loadCategories = async () => {
  try {
    const res = await getCategories()
    if (res.code === 200) {
      categories.value = res.data || []
    } else {
      ElMessage.error(res?.data?.msg || '获取分类失败')
    }
  } catch (err) {
    ElMessage.error('获取分类失败')
  }
}
onMounted(loadCategories)
onMounted(isLogin)
function isLogin(){
  if (localStorage.getItem('token')){
    return;
  }else{
    ElMessage("请先登录");
    router.push('/')
  }
}
onMounted(() => {
  document.title = "易校园-发布闲置"
})
// 主图
const mainImageFile = ref<File | null>(null)
const mainImageUrl = ref<string | null>(null)
const mainImageInput = ref<HTMLInputElement>()

// 小图
const otherImageFiles = ref<File[]>([])
const otherImageUrls = ref<string[]>([])
const otherImageInput = ref<HTMLInputElement>()
const otherInputRefs = ref<HTMLInputElement[]>([])

// 裁剪相关
const cropperVisible = ref(false)
const cropperImg = ref('')
const cropperMode = ref<'main' | 'other'>('main')
const cropperOtherIdx = ref<number>(-1)
const cropper = ref()

// 标签
const tagInput = ref('')
const tags = ref<string[]>([])

// 主图选择与裁剪
function chooseMainImage() {
  mainImageInput.value?.click()
}
function onMainImageChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    if (files[0].size > 3 * 1024 * 1024) {
      ElMessage.warning('主图不能超过3MB')
      return
    }
    cropperImg.value = URL.createObjectURL(files[0])
    cropperMode.value = 'main'
    cropperVisible.value = true
  }
}
function removeMainImage() {
  mainImageFile.value = null
  mainImageUrl.value = null
}

// 小图选择与裁剪
function chooseOtherImage() {
  otherImageInput.value?.click()
}
function replaceOtherImage(idx: number) {
  nextTick(() => {
    otherInputRefs.value[idx]?.click()
  })
}
function onOtherImageChange(e: Event, idx = -1) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    if (files[0].size > 3 * 1024 * 1024) {
      ElMessage.warning('小图不能超过3MB')
      return
    }
    cropperImg.value = URL.createObjectURL(files[0])
    cropperMode.value = 'other'
    cropperOtherIdx.value = idx
    cropperVisible.value = true
  }
}
function removeOtherImage(idx: number) {
  otherImageFiles.value.splice(idx, 1)
  otherImageUrls.value.splice(idx, 1)
}
function setOtherInputRef(idx: number) {
  return (el: any) => {
    otherInputRefs.value[idx] = el
  }
}

// 裁剪确认
function doCrop() {
  if (!cropper.value) return
  cropper.value.getCropBlob((blob: Blob) => {
    if (!blob) {
      cropperVisible.value = false
      return
    }
    const url = URL.createObjectURL(blob)
    if (cropperMode.value === 'main') {
      mainImageUrl.value = url
      mainImageFile.value = new File([blob], 'main.jpg', { type: blob.type })
    } else if (cropperMode.value === 'other') {
      if (cropperOtherIdx.value === -1) {
        // 新增小图
        if (otherImageFiles.value.length < 3) {
          otherImageFiles.value.push(new File([blob], 'other.jpg', { type: blob.type }))
          otherImageUrls.value.push(url)
        }
      } else {
        // 替换小图
        otherImageFiles.value[cropperOtherIdx.value] = new File([blob], 'other.jpg', { type: blob.type })
        otherImageUrls.value[cropperOtherIdx.value] = url
      }
    }
    cropperVisible.value = false
  })
}

// 标签
function addTag() {
  const val = tagInput.value.trim()
  if (val && tags.value.length < 3 && !tags.value.includes(val)) {
    tags.value.push(val)
  }
  tagInput.value = ''
}
function removeTag(i: number) {
  tags.value.splice(i, 1)
}

// 上传提交
async function handleSubmit() {
  if (!mainImageFile.value) {
    ElMessage.warning('请上传主图')
    return
  }
  if (!form.product_name || !form.product_title || !form.product_description || !form.product_price || !form.category_id) {
    ElMessage.warning('请完善表单')
    return
  }
  const fd = new FormData()
  fd.append('product_name', form.product_name)
  fd.append('product_title', form.product_title)
  fd.append('product_description', form.product_description)
  fd.append('product_price', String(form.product_price ?? ''))
  fd.append('category_id', String(form.category_id ?? ''))
  tags.value.forEach(tag => fd.append('tags[]', tag))
  fd.append('main_image', mainImageFile.value as File)
  otherImageFiles.value.forEach((file) => fd.append('other_images[]', file))

  try {
    const res = await uploadProduct(fd)
    if (res && res.data && res.code === 200) {
      ElMessage.success('商品上传成功')
      //可选：重置表单
      location.reload()
    } else {
      ElMessage.error(res?.data?.msg || '上传失败')
    }
  } catch (err: any) {
    ElMessage.error('上传失败，请检查网络或稍后重试')
    console.error(err)
  }
}
</script>
<style scoped>
.upload-bg {
  background: #eaf1fd;
  min-height: 100vh;
}
.upload-container {
  margin: 64px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.upload-card {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 32px 0 rgba(60, 100, 180, 0.07);
  padding: 60px 64px 32px 64px;
  width: 1200px;
  display: flex;
  gap: 64px;
}
.img-upload-panel {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-img-upload {
  width: 300px;
  height: 300px;
  border: 2.5px dashed #4157b8;
  border-radius: 16px;
  background: #f5f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d308f;
  font-size: 36px;
  margin-bottom: 32px;
  cursor: pointer;
  position: relative;
  transition: border 0.14s;
  overflow: hidden;
}
.main-img-upload:hover {
  border: 2.5px solid #2c3ea8;
}
.main-img-placeholder {
  text-align: center;
  width: 100%;
  color: #2c3ea8;
}
.main-img-title {
  font-size: 40px;
  color: #1d308f;
  font-weight: 600;
}
.main-img-hint {
  font-size: 22px;
  color: #4157b8;
  font-weight: 300;
  margin-top: 18px;
}
.main-img-preview-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-img-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
  background: #fff;
  display: block;
  cursor: pointer;
}
.img-close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff;
  background: #4157b8;
  border-radius: 50%;
  font-size: 18px;         /* 原来28px，缩小 */
  width: 28px;             /* 原来36px，缩小 */
  height: 28px;            /* 原来36px，缩小 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  opacity: 0.92;
  border: 2px solid #fff;
  box-shadow: 0 0 8px #c3d4f566;
  transition: background 0.18s;
}
.img-close:hover {
  background: #e14d57;
}
.img-close:hover { background: #e14d57; }
.other-img-list {
  display: flex;
  gap: 26px;
  margin-bottom: 16px;
  margin-top: 10px;
}
.other-img-upload {
  width: 92px;
  height: 92px;
  border: 2px dashed #4157b8;
  border-radius: 12px;
  background: #f5f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d308f;
  font-size: 28px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  flex-direction: column;
}
.other-img-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: #fff;
  display: block;
  cursor: pointer;
}
.other-img-placeholder {
  border: 2px dashed #2c3ea8;
  color: #2c3ea8;
  background: #f5f8ff;
  font-size: 36px;
  transition: border 0.12s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.plus {
  font-size: 46px;
  font-weight: bold;
}
.other-img-hint {
  color: #4157b8;
  font-size: 16px;
  margin-top: 6px;
  margin-bottom: 18px;
  text-align: left;
  width: 100%;
}

.upload-form {
  flex: 1;
  min-width: 320px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.tags-price-row {
  margin-bottom: 10px;
}
.input,
.textarea {
  border: none;
  border-radius: 8px;
  background: #f5f8ff;
  color: #1d308f;
  padding: 14px 18px;
  font-size: 19px;
  font-family: inherit;
  outline: none;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1.5px 10px 0 rgba(30,40,60,0.03);
  margin-bottom: 2px;
  border: 1.5px solid #4157b8;
}
.input:focus, .textarea:focus {
  background: #fff;
  color: #232834;
  border-color: #2c3ea8;
}
.textarea {
  resize: vertical;
  min-height: 64px;
}
.tag-list {
  margin-top: 7px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.submit-btn {
  margin-top: 28px;
  padding: 14px 0;
  font-size: 24px;
  background: #2c3ea8;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 2px;
  box-shadow: 0 2px 8px 0 #b2c5e9;
  transition: background 0.18s;
  width: 100%;
}
.submit-btn:hover {
  background: #1d308f;
}
</style>