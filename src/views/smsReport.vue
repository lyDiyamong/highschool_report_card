<template>
  <div class="sms-report p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Summary Calculation of GE</h1>

      <!-- Tabs -->
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="semester1">
          <template #tab>
            <div class="flex items-center justify-center space-x-2">
              <CalendarOutlined />
              <span>Semester I</span>
            </div>
          </template>
          <Semester1Report />
        </a-tab-pane>

        <a-tab-pane key="semester2">
          <template #tab>
            <div class="flex items-center justify-center space-x-2">
              <CalendarOutlined />
              <span>Semester II</span>
            </div>
          </template>
          <Semester2Report />
        </a-tab-pane>

        <a-tab-pane key="yearly">
          <template #tab>
            <div class="flex items-center justify-center space-x-2">
              <BarChartOutlined />
              <span>Yearly Report</span>
            </div>
          </template>
          <YearlyReport />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CalendarOutlined, BarChartOutlined } from "@ant-design/icons-vue";
import Semester1Report from "../components/Semester1Report.vue";
import Semester2Report from "../components/Semester2Report.vue";
import YearlyReport from "../components/YearlyReport.vue";

const activeTab = ref("semester1");
</script>
