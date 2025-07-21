<template>
  <div class="text-white bg-primary">
    <div class="h-[500px] relative">
      <div class="h-[50%] bg-[url(/images/banner.jpg)] object-center"></div>
      <div class="h-[50%]"></div>

      <img
        src="/images/dean_photo2.JPG"
        alt="人物照片"
        class="absolute left-[50%] translate-x-[-50%] bottom-[50%] translate-y-[50%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-cover rounded-full"
      />
      <h1
        class="absolute left-[50%] translate-x-[-50%] bottom-[20%] sm:bottom-[2%] text-3xl text-accent1 sm:text-[60px] font-bold"
      >
        Dean Liu
      </h1>
    </div>
    <div class="bg-primary">
      <div class="pb-[50px] sm:pt-[50px] max-w-[1296px] mx-auto">
        <div class="mb-[40px] flex justify-center" v-if="authStore.isAuthenticated">
          <button
            class="text-xl bg-white text-primary p-2 rounded-[10px] font-bold"
            @click="handleAdd"
          >
            新增作品
          </button>
          <Modal :visible="showModal" :edit-data="editData" @close="showModal = false" />
        </div>

        <!-- Loading 畫面 -->
        <Loading :visible="loading" />

        <ul
          class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 mb-10 px-4"
        >
          <li
            v-for="item in worksStore.worksData"
            :key="item.id"
            class="flex flex-col justify-between gap-4 rounded-[10px] overflow-hidden m-2 outline outline-white outline-offset-8"
          >
            <div class="w-full">
              <img :src="item.imgUrl" alt="系統示意圖" class="object-cover w-full h-[250px]" />
            </div>
            <div class="p-2 flex flex-col gap-3">
              <h2 class="text-xl text-accent2 text-center font-bold">{{ item.title }}</h2>
              <p>
                作品描述 : <span class="mr-2">{{ item.description }}</span>
              </p>
              <p>
                使用技術 :
                <span class="mr-2" v-for="tag in item.skill" :key="tag.id">{{ tag }}</span>
              </p>
              <p>
                串接服務 :
                <span class="mr-2" v-for="tag in item.thirdPartyServices" :key="tag.id">{{
                  tag
                }}</span>
              </p>
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" @click="handleEdit(item)" v-if="authStore.isAuthenticated">
                編輯作品
              </button>
              <a
                :href="item.url"
                target="_blank"
                class="bg-secondary p-2 rounded-[5px] text-white hover:bg-secondary/50 hover:brightness-110 transition duration-300"
              >
                前往觀看
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import { useWorksStore } from "@/stores/works.js";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

useHead({
  title: "Dean Liu 個人作品集",
  meta: [{ name: "description", content: "收錄Dean一路上的前端作品" }],
});

const authStore = useAuthStore();
const showModal = ref(false);
const editData = ref(null);
const worksStore = useWorksStore();

const { loading } = storeToRefs(authStore);

onMounted(() => {
  worksStore.fetchWorks();
});

const handleEdit = (item) => {
  editData.value = item;
  showModal.value = true;
};

const handleAdd = () => {
  editData.value = null;
  showModal.value = true;
};
</script>
