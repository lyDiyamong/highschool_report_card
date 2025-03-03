<template>
  <div class="branch-report p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">DWD Branch Report</h1>

      <!-- Tabs -->
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="participants">
          <template #tab>
            <div class="flex items-center justify-center">
              <UserOutlined class="text-lg" />
              <span>Participants</span>
            </div>
          </template>
          <ParticipantsReport />
        </a-tab-pane>

        <a-tab-pane key="events">
          <template #tab>
            <div class="flex items-center justify-center">
              <CalendarOutlined class="text-lg" />
              <span>Events</span>
            </div>
          </template>
          <EventsReport />
        </a-tab-pane>

        <a-tab-pane key="survey">
          <template #tab>
            <div class="flex items-center justify-center">
              <FormOutlined class="text-lg" />
              <span>Survey</span>
            </div>
          </template>
          <SurveyReport />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import ParticipantsReport from "../components/ParticipantsReport.vue";
import EventsReport from "../components/EventsReport.vue";
import SurveyReport from "../components/SurveyReport.vue";

const activeTab = ref("participants");
</script>
