import { ref } from 'vue'

const alert = ref({
  visible: false,
  type: 'info',
  message: '',
})

export function useAlert() {
  const showAlert = (type, message) => {
    alert.value = {
      visible: true,
      type,
      message,
    }
    setTimeout(() => (alert.value.visible = false), 3000)
  }

  return { alert, showAlert }
}
