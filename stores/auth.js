// stores/auth.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const error = ref('')
  const loading = ref(false)

  // 初始化 token，從 localStorage 讀取（要在 client 端呼叫）
  function initToken() {
    if (process.client) {
      token.value = localStorage.getItem('token') || ''
    }
  }

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username, password) => {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch('https://dean-works.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const result = await res.json()
      if (result.success) {
        token.value = result.token
        if (process.client) {
          localStorage.setItem('token', result.token)
        }
        return true
      } else {
        error.value = result.message || '登入失敗'
        return false
      }
    } catch (e) {
      error.value = '伺服器錯誤'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = ''
    if (process.client) {
      localStorage.removeItem('token')
    }
  }

  return { token, isAuthenticated, error, loading, login, logout, initToken }
})
