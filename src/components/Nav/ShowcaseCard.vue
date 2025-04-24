<template>
  <div :class="['showcase-card', card.theme]">
    <div class="card-bg-tag" :style="{ color: themeColor(card.theme) }">{{ card.tag }}</div>
    <div class="card-header">
      <span class="card-title" :title="card.title">{{ card.title }}</span>
      <span class="card-arrow">{{ card.icon }} <span style="font-size: 12px;">➔</span></span>
    </div>
    <div class="card-desc">{{ card.desc }}</div>
    <div class="card-products">
      <div v-for="(_, i) in 3" :key="i" class="product-img placeholder"></div>
    </div>
    <div class="card-prices">
      <span v-for="(price, i) in card.priceList" :key="i" class="price">
        ￥{{ price }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['card'])
const themeColor = (theme) => {
  switch (theme) {
    case 'yellow': return '#ffe456'
    case 'blue': return '#96e3ff'
    case 'green': return '#aef7d6'
    case 'pink': return '#ffc7e2'
    default: return '#eaf3ff'
  }
}
</script>

<style scoped>
.showcase-card {
  border-radius: 18px;
  background: #fff;
  box-sizing: border-box;
  padding: 10px 12px 10px 12px;
  min-width: 0;
  width: 195px;
  height: 110px;
  position: relative;
  box-shadow: 0 2px 8px #eaf3ff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: box-shadow 0.16s;
  overflow: hidden;
  font-size: 12px;
}
.showcase-card.yellow {
  border: 2px solid #ffe456;
  background: #fffde3;
}
.showcase-card.blue {
  border: 2px solid #96e3ff;
  background: #eafaff;
}
.showcase-card.green {
  border: 2px solid #aef7d6;
  background: #eafff4;
}
.showcase-card.pink {
  border: 2px solid #ffc7e2;
  background: #fff1f7;
}
.card-bg-tag {
  position: absolute;
  left: 10px;
  top: 7px;
  font-size: 15px;
  font-weight: 900;
  opacity: 0.12;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.card-header {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 1px;
  color: #222;
  z-index: 1;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
}
.card-title {
  flex: 1 1 auto;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}
.card-arrow {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 2px;
  user-select: none;
  white-space: nowrap;
  flex-shrink: 0;
}
.card-desc {
  font-size: 11px;
  color: #444;
  margin-bottom: 5px;
  z-index: 1;
  margin-top: 0px;
  font-weight: 400;
  min-height: 15px;
}
.card-products {
  display: flex;
  gap: 4px;
  margin: 4px 0 0 0;
  z-index: 1;
}
.product-img {
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #f2f3f5;
}
.product-img.placeholder {
  background: #f6f8fa;
  border: 1px solid #eaf3ff;
}
.card-prices {
  display: flex;
  gap: 8px;
  margin-top: 3px;
  z-index: 1;
}
.price {
  color: #ff5d1e;
  font-size: 12px;
  font-weight: bold;
}
</style>