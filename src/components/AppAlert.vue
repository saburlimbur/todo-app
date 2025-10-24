<script setup>
import { computed } from 'vue'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  message: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
})

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    default:
      return Info
  }
})

const alertStyle = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-white'
    case 'error':
      return 'bg-white'
    case 'warning':
      return 'bg-white'
    default:
      return 'bg-white'
  }
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 border-4 rounded-lg shadow-[4px_4px_0px_#000] font-semibold text-black"
      :class="alertStyle"
    >
      <component :is="icon" class="w-5 h-5" />
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
