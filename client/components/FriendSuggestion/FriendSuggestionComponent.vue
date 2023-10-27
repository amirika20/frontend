<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["suggestion"]);
const { currentUsername } = storeToRefs(useUserStore());

const sendRequest = async () => {
  try {
    await fetchy(`/api/friend/requests/${props.suggestion}`, "POST", {});
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div class="friend-suggestion">
    <p class="suggestion-text">{{ props.suggestion }}</p>
    <button class="send-request-button" @click="sendRequest">Send Request</button>
  </div>
</template>

<style scoped>
.friend-suggestion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8f8;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.suggestion-text {
  margin: 0;
  font-size: 16px;
  flex: 1;
}

.send-request-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-request-button:hover {
  background-color: #0056b3;
}
</style>
