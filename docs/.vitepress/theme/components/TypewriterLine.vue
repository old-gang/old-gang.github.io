<template>
  <p class="typewriter-line" :class="{ 'is-inactive': !isActive }">
    <span class="typewriter-text">{{ visibleText }}</span>
    <span class="typewriter-caret" aria-hidden="true"></span>
  </p>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { effectsEnabled, restoreEffectsPreference } from '../useEffectsEnabled'

// 想换文案直接改这里，其余逻辑无需调整
const phrases = [
  '喜欢折腾构建工具和打包配置',
  '记录 React 与 Vue 的学习笔记',
  '偶尔写点 CSS 动画',
  '正在补数据结构与算法',
]

const TYPE_INTERVAL = 110
const ERASE_INTERVAL = 55
const HOLD_DURATION = 1400
const START_DELAY = 600

const visibleText = ref('')
const hasMounted = ref(false)

const isActive = computed(() => hasMounted.value && effectsEnabled.value)

let phraseIndex = 0
let characterIndex = 0
let isErasing = false
let timerId = 0

function scheduleNextStep(delay) {
  timerId = window.setTimeout(step, delay)
}

function step() {
  const currentPhrase = phrases[phraseIndex]

  if (!isErasing) {
    characterIndex += 1
    visibleText.value = currentPhrase.slice(0, characterIndex)

    // 整句打完，停顿一会儿再开始回删
    if (characterIndex >= currentPhrase.length) {
      isErasing = true
      scheduleNextStep(HOLD_DURATION)
      return
    }

    scheduleNextStep(TYPE_INTERVAL)
    return
  }

  characterIndex -= 1
  visibleText.value = currentPhrase.slice(0, characterIndex)

  // 删空后切换到下一句
  if (characterIndex <= 0) {
    isErasing = false
    phraseIndex = (phraseIndex + 1) % phrases.length
  }

  scheduleNextStep(ERASE_INTERVAL)
}

function stopTyping() {
  window.clearTimeout(timerId)
  timerId = 0
}

function startTypingFromScratch() {
  stopTyping()
  phraseIndex = 0
  characterIndex = 0
  isErasing = false
  visibleText.value = ''
  scheduleNextStep(START_DELAY)
}

onMounted(() => {
  hasMounted.value = true
  // 挂载顺序上本组件早于导航栏里的开关，这里主动读一次偏好
  restoreEffectsPreference()
  if (!effectsEnabled.value) return
  scheduleNextStep(START_DELAY)
})

onBeforeUnmount(stopTyping)

// 开关关闭时停止计时器并清空文字，重新打开后从头开始
watch(effectsEnabled, (isEnabled) => {
  if (!hasMounted.value) return
  if (isEnabled) {
    startTypingFromScratch()
    return
  }
  stopTyping()
})
</script>

<style scoped>
.typewriter-line {
  /* 固定高度，避免文字长短变化时下方的按钮上下跳动 */
  min-height: 24px;
  margin: 0;
  padding-top: 6px;
  font-size: 15px;
  line-height: 24px;
  color: var(--vp-c-text-2);
}

.typewriter-line.is-inactive {
  visibility: hidden;
}

.typewriter-caret {
  display: inline-block;
  margin-left: 3px;
  width: 1px;
  height: 1em;
  vertical-align: -0.1em;
  background-color: var(--vp-c-brand-1);
  animation: typewriter-blink 1s steps(2, start) infinite;
}

@keyframes typewriter-blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-caret {
    animation: none;
  }
}
</style>
