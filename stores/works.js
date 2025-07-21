import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRuntimeConfig, useCookie } from '#app'

export const useWorksStore = defineStore('works', () => {
  const worksData = ref([])
  const loading = ref(false)
  const error = ref(null)

  const token = useCookie('token')
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'https://dean-works-y706.onrender.com'

  // 共用 headers
  const getHeaders = () => {
    return token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {}
  }

  // 📥 取得作品資料
  const fetchWorks = async () => {
    loading.value = true
    try {
      const res = await $fetch('/portfolio', {
        baseURL,
        headers: getHeaders(),
      })
      worksData.value = res.data
    } catch (err) {
      console.error('作品資料讀取失敗:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // ➕ 建立作品
  const createWork = async (payload) => {
    loading.value = true
    try {
      await $fetch('/portfolio', {
        method: 'POST',
        baseURL,
        body: payload,
        headers: getHeaders(),
      })
      await fetchWorks()
    } catch (err) {
      console.error('建立作品失敗:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // ✏️ 修改作品
  const updateWork = async (id, payload) => {
    loading.value = true
    try {
      await $fetch(`/portfolio/${id}`, {
        method: 'PUT',
        baseURL,
        body: payload,
        headers: getHeaders(),
      })
      await fetchWorks()
    } catch (err) {
      console.error('更新作品失敗:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 🗑️ 刪除作品
  const deleteWork = async (id) => {
    loading.value = true
    try {
      await $fetch(`/portfolio/${id}`, {
        method: 'DELETE',
        baseURL,
        headers: getHeaders(),
      })
      await fetchWorks()
    } catch (err) {
      console.error('刪除作品失敗:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    worksData,
    loading,
    error,
    fetchWorks,
    createWork,
    updateWork,
    deleteWork,
  }
})
