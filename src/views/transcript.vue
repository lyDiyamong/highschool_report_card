<template>
  <div class="transcript-view">
    <Transcript />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import Transcript from "../components/Transcript.vue";
import { useTranscriptStore } from "../stores/transcript/transcriptClickhouse";

// Initialize store
const transcriptStore = useTranscriptStore();
const { fetchTranscript } = transcriptStore;

// Fetch and log data
onMounted(async () => {
  try {
    await fetchTranscript({
      idCard: "110022",
      groupStructureId: "30fe5773-ee9f-4c97-a808-c1d5a4a342f1",
    });
  } catch (err) {
    console.error("Failed to fetch transcript data:", err);
  }
});
</script>

<style scoped>
.transcript-view {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
