<script setup>
import { ref, onMounted } from 'vue'
import { useTodoFirestore } from '../composables/useTodoFirestore'
import NoteCard from '@/components/NoteCard.vue'
import NoteForm from '@/components/NoteForm.vue'
import AppAlert from '@/components/AppAlert.vue'
import { useAlert } from '@/composables/useAlert'

const {
  notes,
  loading,
  getTodoFirestore,
  createTodoFirestore,
  deleteTodoFirestore,
  updateTodoFirestore,
} = useTodoFirestore()
const { alert, showAlert } = useAlert()

const title = ref('')
const description = ref('')
const editMode = ref(false) // flag (true atau false)
const currentId = ref(null)

const handleAddOrUpdateTodo = async () => {
  let result

  if (editMode.value && currentId.value) {
    // update note berdasarkan id
    result = await updateTodoFirestore(currentId.value, title.value, description.value)
    editMode.value = false
    currentId.value = null
  } else {
    result = await createTodoFirestore(title.value, description.value)
  }

  showAlert(result.success ? 'success' : 'error', result.message)
  title.value = ''
  description.value = ''
}

const handleDeleteTodo = async (id) => {
  const result = await deleteTodoFirestore(id)
  showAlert(result.success ? 'success' : 'error', result.message)
}

const handleEditTodo = (note) => {
  title.value = note.title
  description.value = note.description
  currentId.value = note.id
  editMode.value = true
}

onMounted(async () => {
  await getTodoFirestore()
})
</script>

<template>
  <main class="flex flex-col items-center justify-center w-full px-4 max-w-[1200px] mx-auto py-8">
    <h1 class="lg:text-5xl md:text-3xl text-2xl font-black mb-10 tracking-tight text-center">
      Simple Notes App
    </h1>

    <NoteForm
      v-model:title="title"
      v-model:description="description"
      :loading="loading"
      :mode="editMode ? 'edit' : 'add'"
      @add-note="handleAddOrUpdateTodo"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full justify-items-center">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete="handleDeleteTodo(note.id)"
        @edit="handleEditTodo(note)"
      />
    </div>

    <AppAlert v-if="alert.visible" :type="alert.type" :message="alert.message" />
  </main>
</template>
