
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <a-card>
      <Statistic
        title="Total Students"
        :value="stats.totalStudents"
        :valueStyle="{ color: '#3f8600' }"
      >
        <template #prefix>
          <TeamOutlined />
        </template>
      </Statistic>
    </a-card>

    <a-card>
      <Statistic
        title="Average Attendance"
        :value="stats.averageAttendance"
        :precision="2"
        suffix="%"
        :valueStyle="{ color: '#3f8600' }"
      >
        <template #prefix>
          <CheckCircleOutlined />
        </template>
      </Statistic>
    </a-card>

    <a-card>
      <Statistic
        title="Top Performers"
        :value="stats.topPerformers"
        :valueStyle="{ color: '#3f8600' }"
      >
        <template #prefix>
          <TrophyOutlined />
        </template>
      </Statistic>
    </a-card>

    <a-card>
      <Statistic
        title="Needs Improvement"
        :value="stats.needsImprovement"
        :valueStyle="{ color: '#cf1322' }"
      >
        <template #prefix>
          <ExclamationCircleOutlined />
        </template>
      </Statistic>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { Statistic } from 'ant-design-vue'
import { TeamOutlined, CheckCircleOutlined, TrophyOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

defineProps<{
  stats : {
    totalStudents: number;
    averageAttendance: number;
    topPerformers: number;
    needsImprovement: number;
  }
}>()
</script>