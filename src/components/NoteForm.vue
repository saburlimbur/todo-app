<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'add', // 'add' | 'edit'
  },
})

const emit = defineEmits(['add-note', 'update-note', 'update:title', 'update:description'])
</script>

<template>
  <div
    class="bg-white border-4 border-black rounded-xl p-6 w-full max-w-md shadow-[6px_6px_0_#000] mb-10"
  >
    <div class="form-control space-y-2 relative w-full mb-5">
      <label class="label font-bold text-gray-900 block" for="title">Title</label>
      <input
        :value="title"
        @input="emit('update:title', $event.target.value)"
        id="title"
        type="text"
        placeholder="Write your title..."
        class="input input-bordered border-4 border-black rounded-lg focus:outline-none focus:border-gray-900 w-full"
      />
    </div>

    <div class="form-control mb-6">
      <label class="label font-bold text-gray-900 mb-2" for="description">Description</label>
      <textarea
        :value="description"
        @input="emit('update:description', $event.target.value)"
        rows="4"
        id="description"
        placeholder="Describe your note..."
        class="textarea textarea-bordered border-4 border-black rounded-lg w-full focus:outline-none focus:border-gray-900 resize-none"
      ></textarea>
    </div>

    <button
      @click="emit('add-note')"
      :disabled="loading"
      type="submit"
      class="btn w-full font-bold border-4 border-black bg-yellow-300 hover:bg-yellow-400 text-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] transition-all"
    >
      {{ loading ? 'Saving...' : mode === 'edit' ? 'Update Note' : 'Add Note' }}
    </button>
  </div>
</template>
