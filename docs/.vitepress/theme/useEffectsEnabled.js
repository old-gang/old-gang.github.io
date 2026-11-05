import { ref } from 'vue'

const STORAGE_KEY = 'blog-effects-enabled'

// 服务端渲染时恒为 true，保证产出的 HTML 稳定；浏览器端挂载前再校正真实偏好
export const effectsEnabled = ref(true)

let hasRestoredPreference = false

/**
 * 读取用户上次的开关选择；没有记录时跟随系统的「减弱动态效果」设置。
 * 该函数会被 SSR 调用，因此必须先判断 window 是否存在。
 */
export function restoreEffectsPreference() {
  if (hasRestoredPreference || typeof window === 'undefined') return
  hasRestoredPreference = true

  const storedValue = window.localStorage.getItem(STORAGE_KEY)

  if (storedValue === 'on') {
    effectsEnabled.value = true
    return
  }

  if (storedValue === 'off') {
    effectsEnabled.value = false
    return
  }

  effectsEnabled.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function toggleEffects() {
  effectsEnabled.value = !effectsEnabled.value

  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, effectsEnabled.value ? 'on' : 'off')
}
