<template>
    <a-layout-sider
        breakpoint="lg"
        class="bg-white sidebar-container"
        :collapsed="isCollapsed"
        :width="200"
        :collapsedWidth="80"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div class="p-4">
            <h1 class="text-xl font-bold">Report</h1>
        </div>

        <a-menu mode="inline" :selectedKeys="selectedKeys">
            <a-menu-item key="dashboard" @click="navigateTo('dashboard')">
                <template #icon>
                    <AppstoreOutlined />
                </template>
                Dashboard
            </a-menu-item>

            <a-menu-item key="reports" @click="navigateTo('reports')">
                <template #icon>
                    <FolderOutlined />
                </template>
                Reports
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { AppstoreOutlined, FolderOutlined } from "@ant-design/icons-vue";

    const props = defineProps<{
        selectedKeys: string[];
    }>();

    const router = useRouter();
    const isCollapsed = ref(true);

    const handleMouseEnter = () => {
        isCollapsed.value = false;
    };

    const handleMouseLeave = () => {
        isCollapsed.value = true;
    };

    const navigateTo = (route: string) => {
        router.push({ name: route });
    };
</script>

<style scoped>
    .sidebar-container {
        background-color: #ffffff;
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 10;
        border-right: 1px solid #ddd;
    }
    .bg-custom-color {
        background-color: #ffffff;
        transition: all 0.3s ease;
        position: sticky;
    }

    .logo {
        text-align: center;
        color: var(--color-primary-main);
        font-size: 1.125rem;
        font-weight: 600;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    /* Collapsed Sidebar */
    .collapsed {
        width: 80px !important;
    }

    /* Expanded Sidebar */
    .bg-custom-color:not(.collapsed) {
        width: 250px !important;
    }

    /* Active menu item background and text color */
    .ant-menu-item-selected {
        background-color: var(--color-primary-light) !important;
        color: white !important;
    }

    /* Hover effect to match active item style */
    .ant-menu-item:hover {
        background-color: var(--color-primary-semi-light) !important;
    }
</style>
