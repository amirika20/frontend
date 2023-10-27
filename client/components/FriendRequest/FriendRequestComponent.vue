<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFriendStore } from "../../stores/friend";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["request"]);
const { currentUsername } = storeToRefs(useUserStore());
const { getFriends } = useFriendStore();
const emit = defineEmits(["updateRequests"]);

const acceptRequest = async () => {
  try {
    await fetchy(`/api/friend/accept/${props.request.from}`, "PUT", {});
  } catch (_) {
    return;
  }
  emit("updateRequests");
  void getFriends();
};
const rejectRequest = async () => {
  try {
    await fetchy(`/api/friend/reject/${props.request.from}`, "PUT", {});
  } catch (_) {
    return;
  }
  emit("updateRequests");
  void getFriends();
};
</script>

<template>
  <div class="friend-request">
    <div class="request-info">
      <p class="request-from">{{ props.request.from }}</p>
    </div>
    <div class="request-actions">
      <button class="accept-button" @click="acceptRequest">Accept</button>
      <button class="reject-button" @click="rejectRequest">Reject</button>
    </div>
  </div>
</template>

<style scoped>
.friend-request {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.request-info {
  flex: 1;
}

.request-from {
  margin: 0;
  font-size: 16px;
}

.request-actions {
  display: flex;
  gap: 10px;
}

.accept-button,
.reject-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.accept-button:hover,
.reject-button:hover {
  background-color: #0056b3;
}
</style>
