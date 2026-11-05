<script setup>
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { effectsEnabled, restoreEffectsPreference } from '../useEffectsEnabled'

const MAX_TILT_DEGREES = 8
const FEATURE_CARD_SELECTOR = '.VPFeature'

// 记录已绑定的卡片及其监听函数，卸载时用于精确解绑
let attachedCards = []

function resetCard(cardElement) {
  cardElement.style.setProperty('--tilt-x', '0deg')
  cardElement.style.setProperty('--tilt-y', '0deg')
  cardElement.style.willChange = ''
  cardElement.classList.remove('is-tilting')
}

function attachCard(cardElement) {
  let pendingFrameId = 0
  let latestPointer = null

  function applyTilt() {
    pendingFrameId = 0
    if (!latestPointer) return

    const boundingRect = cardElement.getBoundingClientRect()
    // 换算成 -0.5 ~ 0.5 的相对位置，卡片中心为 0
    const relativeX = (latestPointer.clientX - boundingRect.left) / boundingRect.width - 0.5
    const relativeY = (latestPointer.clientY - boundingRect.top) / boundingRect.height - 0.5

    // 鼠标右移时绕 Y 轴正向旋转，下移时绕 X 轴负向旋转，视觉上「朝向鼠标」
    cardElement.style.setProperty('--tilt-x', `${(-relativeY * MAX_TILT_DEGREES).toFixed(2)}deg`)
    cardElement.style.setProperty('--tilt-y', `${(relativeX * MAX_TILT_DEGREES).toFixed(2)}deg`)
  }

  function handlePointerMove(event) {
    latestPointer = { clientX: event.clientX, clientY: event.clientY }
    if (pendingFrameId) return
    pendingFrameId = requestAnimationFrame(applyTilt)
  }

  function handlePointerEnter() {
    // 只在悬停期间提升为合成层，避免所有卡片长期占用 GPU 显存
    cardElement.style.willChange = 'transform'
    cardElement.classList.add('is-tilting')
  }

  function handlePointerLeave() {
    cancelAnimationFrame(pendingFrameId)
    pendingFrameId = 0
    latestPointer = null
    resetCard(cardElement)
  }

  cardElement.addEventListener('pointerenter', handlePointerEnter)
  cardElement.addEventListener('pointermove', handlePointerMove)
  cardElement.addEventListener('pointerleave', handlePointerLeave)

  attachedCards.push({
    cardElement,
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
  })
}

function detachAllCards() {
  for (const attachedCard of attachedCards) {
    attachedCard.cardElement.removeEventListener('pointerenter', attachedCard.handlePointerEnter)
    attachedCard.cardElement.removeEventListener('pointermove', attachedCard.handlePointerMove)
    attachedCard.cardElement.removeEventListener('pointerleave', attachedCard.handlePointerLeave)
    resetCard(attachedCard.cardElement)
  }

  attachedCards = []
}

function syncCardListeners() {
  detachAllCards()
  if (!effectsEnabled.value) return

  document.querySelectorAll(FEATURE_CARD_SELECTOR).forEach(attachCard)
}

onMounted(async () => {
  // 该组件的插槽位置是 VPHomeFeatures 的兄弟节点，等一帧确保卡片已进入 DOM
  await nextTick()
  restoreEffectsPreference()
  syncCardListeners()
})

onBeforeUnmount(detachAllCards)

// 关闭开关时立即解绑，重新打开时重新绑定
watch(effectsEnabled, syncCardListeners)
</script>

<template>
  <!-- 纯逻辑组件：不产出任何可见节点 -->
</template>
