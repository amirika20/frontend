<script setup lang="ts">
import FriendListComponent from "@/components/Friend/FriendListComponent.vue";
import FriendRequestListComponent from "../components/FriendRequest/FriendRequestListComponent.vue";
import SendFriendRequest from "../components/FriendRequest/SendFriendRequest.vue";
import FriendSuggestionListComponent from "../components/FriendSuggestion/FriendSuggestionListComponent.vue";
</script>

<template>
  <main class="blocks">
    <div class="block">
      <FriendListComponent />
    </div>
    <div class="block">
      <SendFriendRequest />
    </div>
    <div class="block">
      <FriendRequestListComponent />
    </div>
    <div class="block">
      <FriendSuggestionListComponent />
    </div>
  </main>
</template>

<style scoped>
.blocks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  margin-top: 80px;
}

.block {
  background-color: #e0dfc1; /* Add a background color for each block */
  padding: 20px; /* Add padding for spacing within each block */
  border-radius: 8px; /* Add rounded corners to blocks for a nicer look */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
  width: 45%; /* Adjust the width as needed to control the spacing between blocks */
  transition: transform 0.2s; /* Add a subtle hover effect */
  margin: 10px; /* Add margin between blocks */
}

.block:hover {
  transform: scale(1.05); /* Scale the block on hover for an interactive effect */
  transition: transform 0.2s;
}
</style>
