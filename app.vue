<template>
  <AppHeader />
  <Loading :visible="loading" />
  <NuxtPage/>
  <AppFooter />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWorksStore } from './stores/works'

const worksStore = useWorksStore()
const { loading } = storeToRefs(worksStore)
</script>
