<template>
  <button
    class="effects-toggle"
    type="button"
    role="switch"
    :aria-checked="effectsEnabled"
    :aria-label="effectsEnabled ? '关闭动效' : '开启动效'"
    :title="effectsEnabled ? '关闭动效' : '开启动效'"
    @click="toggleEffects"
  >
    <span class="effects-toggle-track" aria-hidden="true">
      <span class="effects-toggle-knob"></span>
    </span>
    <span class="effects-toggle-label">动效</span>
  </button>
</template>

<script setup>
import { onMounted } from 'vue'
import { effectsEnabled, restoreEffectsPreference, toggleEffects } from '../useEffectsEnabled'

onMounted(() => {
  // 挂载后再读 localStorage，SSR 产出的 HTML 与客户端首次渲染保持一致
  restoreEffectsPreference()
})
</script>

<style scoped>
.effects-toggle {
  display: none;
  align-items: center;
  gap: 6px;
  margin-left: 12px;
  padding: 0;
  height: 22px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.25s;
}

.effects-toggle:hover {
  color: var(--vp-c-text-1);
}

/* 小屏导航栏空间紧张，只在桌面端展示 */
@media (min-width: 960px) {
  .effects-toggle {
    display: flex;
  }
}

.effects-toggle-track {
  position: relative;
  display: block;
  flex-shrink: 0;
  width: 30px;
  height: 16px;
  border: 1px solid var(--vp-input-border-color);
  border-radius: 8px;
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s;
}

.effects-toggle:hover .effects-toggle-track {
  border-color: var(--vp-c-brand-1);
}

.effects-toggle-knob {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.25s;
}

.effects-toggle[aria-checked='true'] .effects-toggle-knob {
  transform: translateX(14px);
}
</style>
