<template>
  <a-layout class="min-h-screen">
    <Sidebar :selectedKeys="selectedKeys" />

    <a-layout>
      <a-layout-header class="p-4 flex items-center justify-between border-b">
        <h2 class="text-xl capitalize font-arsenal font-semibold">
          {{ selectedKeys[0] }} 👋
        </h2>
      </a-layout-header>

      <a-layout-content class="p-6">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { UserOutlined } from "@ant-design/icons-vue";
import Sidebar from "../components/Sidebar.vue";

const route = useRoute();
const selectedKeys = ref([route.name as string]);

watch(
  () => route.name,
  (newName) => {
    if (newName) {
      selectedKeys.value = [newName];
    }
  }
);
</script>
<style scoped>
:deep(.ant-layout-header) {
  background-color: #ffffff !important;
}
</style>
