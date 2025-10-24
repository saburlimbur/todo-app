<script setup>
import { Clock, Edit3 } from 'lucide-vue-next'

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete', 'edit'])

const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
</script>

<template>
  <div
    class="card bg-white border-4 border-black rounded-xl p-5 shadow-[6px_6px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#000] transition-all w-full"
  >
    <h2 class="text-xl font-extrabold mb-2 text-gray-900">{{ note.title }}</h2>
    <p class="text-gray-700 text-sm mb-4">{{ note.description }}</p>

    <div class="flex items-center justify-between">
      <div class="text-xs text-gray-500 mb-3 space-y-1 flex items-center gap-1">
        <p v-if="note.updatedAt" class="flex items-center gap-2">
          <Edit3 class="w-3 h-3 text-gray-600" />
          <span>{{ formatDate(note.updatedAt) }}</span>
        </p>

        <p v-else-if="note.createdAt" class="flex items-center gap-2">
          <Clock class="w-3 h-3 text-gray-600" />
          <span>{{ formatDate(note.createdAt) }}</span>
        </p>
      </div>

      <div class="flex justify-end gap-2">
        <button
          @click="emit('edit', note)"
          class="btn btn-sm bg-blue-400 border-4 border-black text-black font-bold shadow-[2px_2px_0_#000] hover:bg-blue-500"
        >
          Edit
        </button>

        <button
          @click="emit('delete', note.id)"
          class="btn btn-sm bg-red-400 border-4 border-black text-black font-bold shadow-[2px_2px_0_#000] hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
