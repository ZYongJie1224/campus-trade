<template>
  <div class="showcase-layout">
    <!-- 左侧导航，保留原有白底圆角阴影样式，仅减少为8项，字体按紧凑风格 -->
    <aside class="category-nav">
      <ul>
        <li v-for="c in categories" :key="c.name">
          <span class="cat-icon">{{ c.icon }}</span>
          <span class="cat-name">{{ c.name }}</span>
        </li>
      </ul>
    </aside>
    <!-- 右侧内容区 -->
    <section class="showcase-content">
      <div class="showcase-row">
        <!-- 左侧广告位 -->
        <div class="promo-card">
          <div class="promo-inner">
            <div class="promo-title">
              闲鱼抄底好物<br />
              <span class="promo-yellow">
                超绝性价比 <span class="promo-badge">1</span> 省到底
              </span>
            </div>
            <button class="promo-btn">去看看 &gt;</button>
          </div>
        </div>
        <!-- 右侧宫格区块 -->
        <div class="showcase-grid">
          <ShowcaseCard v-for="card in cards" :key="card.title" :card="card" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ShowcaseCard from './ShowcaseCard.vue'

// 只保留8项导航
const categories = [
  { icon: "📱", name: "手机 / 数码 / 电脑" },
  { icon: "👚", name: "服饰 / 箱包 / 运动" },
  { icon: "🎫", name: "技能 / 卡券 / 潮玩" },
  { icon: "🎁", name: "礼品 / 文玩 / 珠宝" },
  { icon: "🍔", name: "食品 / 宠物 / 花卉" }
];

const cards = [
  {
    theme: 'yellow',
    title: '衣橱捡漏',
    desc: '时尚美衣低价淘',
    tag: 'APPAREL',
    icon: '👟',
    priceList: [60, 59, 40],
    products: [{}, {}, {}]
  },
  
  {
    theme: 'blue',
    title: '手机数码',
    desc: '热门装备省心入',
    tag: 'DIGITAL',
    icon: '📷',
    priceList: [350, 600, 7850],
    products: [{}, {}, {}]
  },
  {
    theme: 'green',
    title: '二次元',
    desc: '炫门新品随手入',
    tag: 'MODEL',
    icon: '🦆',
    priceList: [68.8, 480, 190],
    products: [{}, {}, {}]
  },
  {
    theme: 'pink',
    title: '省钱卡券',
    desc: '吃喝玩乐放心购',
    tag: 'COUPON',
    icon: '💳',
    priceList: [15.8, 40, 534],
    products: [{}, {}, {}]
  },
  {
    theme: 'pink',
    title: '省钱卡券',
    desc: '吃喝玩乐放心购',
    tag: 'COUPON',
    icon: '💳',
    priceList: [15.8, 40, 534],
    products: [{}, {}, {}]
  },
  {
    theme: 'pink',
    title: '省钱卡券',
    desc: '吃喝玩乐放心购',
    tag: 'COUPON',
    icon: '💳',
    priceList: [15.8, 40, 534],
    products: [{}, {}, {}]
  },
  
];
</script>

<style scoped>
.showcase-layout {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  background: #ffff;
  box-sizing: border-box;
  width: 1420px;
  min-height: 360px;
  font-size: 15px;
  border-radius: 25px;
}

/* 左侧导航：原有白底圆角阴影样式不变，仅减少数量，字体更小更紧凑 */
.category-nav {
  background: #fff;
  border-radius: 32px;
  padding: 22px 0 22px 0;
  width: 260px;
  min-width: 140px;
  margin: 36px 40px 0 0;
  box-shadow: 0 4px 16px #e7eaf3;
  display: flex;
  flex-direction: column;
  height: fit-content;
}
.category-nav ul {
  list-style: none;
  padding: 0 0 0 20px;
  margin: 0;
}
.category-nav li {
  font-size: 18px;
  color: #222;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 500;
  border-radius: 13px;
  padding: 5px 8px;
  transition: background 0.16s, color 0.16s;
  cursor: pointer;
  line-height: 1.2;
  letter-spacing: 0.5px;
}
.category-nav li:last-child {
  margin-bottom: 0;
}
.category-nav li:hover {
  background: #eaf3ff;
  color: #2446a6;
}
.cat-icon {
  font-size: 22px;
  margin-right: 10px;
}
.cat-name {
  flex: 1 1 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 内容区整体比例缩小 */
.showcase-content {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 36px 0 0 0;
  font-size: 15px;
}
.showcase-row {
  display: flex;
  gap: 32px;
  justify-content: flex-start;
  width: 1040px;
  max-width: 1040px;
  align-items: flex-start;
}

/* 广告位缩小、与左侧导航同款圆角、阴影 */
.promo-card {
  width: 280px;
  min-width: 180px;
  height: 280px;
  border-radius: 36px;
  background: linear-gradient(120deg, #9bb9e6 0%, #9bb9e6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 4px 18px #9bb9e6;
  padding-bottom: 0;
  position: relative;
}
.promo-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.promo-title {
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 1.35;
  margin-bottom: 20px;
  margin-top: 40px;
  letter-spacing: 1px;
}
.promo-yellow {
  color: #ffe834;
  font-size: 17px;
  font-weight: 700;
  display: block;
  margin-top: 8px;
}
.promo-badge {
  background: #2d90ff;
  color: #fff;
  font-size: 13px;
  padding: 0 7px;
  border-radius: 7px;
  font-weight: bold;
  margin: 0 4px;
  display: inline-block;
}
.promo-btn {
  background: #ffe834;
  color: #222;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 22px;
  padding: 7px 28px;
  margin-top: 6px;
  cursor: pointer;
  transition: background 0.15s;
  box-shadow: 0 1px 3px #ffe83428;
}
.promo-btn:hover {
  background: #fff799;
}

/* 宫格区块比例缩小、保留4宫格 */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 110px);
  gap: 16px 16px;
  width: 420px;
  min-width: 240px;
  height: 236px;
  align-items: stretch;
}
</style>