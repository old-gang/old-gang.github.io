import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CursorGlow from './components/CursorGlow.vue'
import EffectsToggle from './components/EffectsToggle.vue'
import FeatureCardTilt from './components/FeatureCardTilt.vue'
import TypewriterLine from './components/TypewriterLine.vue'
// 放在最后导入，确保能覆盖默认主题里同名的 .VPFeature 规则
import './style.css'

export default {
  // 继承默认主题，导航、侧边栏、搜索等原有功能全部保留
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 全站最外层：鼠标光晕铺在所有内容之下
      'layout-top': () => h(CursorGlow),
      // 导航栏右侧：动效总开关
      'nav-bar-content-after': () => h(EffectsToggle),
      // 首页 hero 标题区：tagline 下方追加打字机行
      'home-hero-info-after': () => h(TypewriterLine),
      // 首页 features 之后：纯逻辑组件，给卡片绑定倾斜交互
      'home-features-after': () => h(FeatureCardTilt),
    })
  },
}
