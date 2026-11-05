<template>
  <div
    ref="glowElement"
    class="cursor-glow"
    :class="{
      'is-active': isGlowActive,
      'is-subtle': isDocumentPage,
    }"
    aria-hidden="true"
  ></div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { effectsEnabled, restoreEffectsPreference } from '../useEffectsEnabled'

const glowElement = ref(null)
const { frontmatter } = useData()

const hasMounted = ref(false)
const supportsFinePointer = ref(false)

// 记录最新的指针坐标，等待下一帧统一写入样式
let pendingPointerX = 0
let pendingPointerY = 0
let pendingFrameId = 0

// 只有 layout 为 home 时是首页，其余页面（文章页）使用更淡的光晕
const isDocumentPage = computed(() => frontmatter.value.layout !== 'home')

const isGlowActive = computed(
  () => hasMounted.value && supportsFinePointer.value && effectsEnabled.value,
)

function flushPointerPosition() {
  pendingFrameId = 0
  if (!glowElement.value) return

  glowElement.value.style.setProperty('--pointer-x', `${pendingPointerX}px`)
  glowElement.value.style.setProperty('--pointer-y', `${pendingPointerY}px`)
}

function handlePointerMove(event) {
  pendingPointerX = event.clientX
  pendingPointerY = event.clientY

  // pointermove 每秒可能触发上百次，用 rAF 合并成每帧一次样式写入
  if (pendingFrameId) return
  pendingFrameId = requestAnimationFrame(flushPointerPosition)
}

// 触屏设备和「减弱动态效果」下不启用，避免无意义的监听开销
function shouldEnableGlow() {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return supportsHover && !prefersReducedMotion
}

onMounted(() => {
  hasMounted.value = true
  // 本组件位于 layout-top，会最先挂载，在这里完成一次偏好恢复
  restoreEffectsPreference()
  supportsFinePointer.value = shouldEnableGlow()

  if (!supportsFinePointer.value) return
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  cancelAnimationFrame(pendingFrameId)
})
</script>
