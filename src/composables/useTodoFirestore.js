import { ref } from 'vue'
import { db } from '@/firebase'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

const todoCollection = collection(db, 'notes')

export function useTodoFirestore() {
  const notes = ref([])
  const error = ref(null)
  const loading = ref(false)

  const getTodoFirestore = async () => {
    loading.value = true
    try {
      const q = query(todoCollection, orderBy('createdAt', 'desc'))

      const snapshot = await getDocs(q)
      notes.value = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        .sort((a, b) => {
          const timeA = a.updatedAt?.toDate?.() || a.createdAt?.toDate?.()
          const timeB = b.updatedAt?.toDate?.() || b.createdAt?.toDate?.()
          return timeA - timeB // paling awal berdasarkan date
        })
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createTodoFirestore = async (title, description, createdAt, updatedAt) => {
    loading.value = true

    if (!title?.trim() || !description?.trim()) {
      loading.value = false
      return {
        success: false,
        message: 'Please fill all fields',
      }
    }

    try {
      await addDoc(todoCollection, {
        title,
        description,
        createdAt: serverTimestamp(),
        // updatedAt: serverTimestamp(),
      })

      await getTodoFirestore()
      return {
        success: true,
        message: 'Todo created successfully!',
      }
    } catch (err) {
      error.value = err.message
      return {
        success: false,
        message: err.message,
      }
    } finally {
      loading.value = false
    }
  }

  const deleteTodoFirestore = async (id) => {
    loading.value = true

    try {
      await deleteDoc(doc(db, 'notes', id))
      await getTodoFirestore()
      return {
        success: true,
        message: 'Todo deleted successfully!',
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
      }
    } finally {
      loading.value = false
    }
  }

  const updateTodoFirestore = async (id, title, description) => {
    loading.value = true

    try {
      const noteRef = doc(db, 'notes', id)
      await updateDoc(noteRef, {
        title,
        description,
        updatedAt: serverTimestamp(),
      })

      await getTodoFirestore()
      return {
        success: true,
        message: 'Todo updated successfully!',
      }
    } catch (err) {
      error.value = err.message
      return {
        success: false,
        message: err.message,
      }
    } finally {
      loading.value = false
    }
  }

  return {
    notes,
    error,
    loading,
    getTodoFirestore,
    createTodoFirestore,
    deleteTodoFirestore,
    updateTodoFirestore,
  }
}
