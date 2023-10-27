<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import FriendRequestComponent from "./FriendRequestComponent.vue";
const { currentUsername } = storeToRefs(useUserStore());
const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let requests = ref<Array<Record<string, string>>>([]);

const getRequests = async () => {
  let requestResults;
  try {
    requestResults = await fetchy("/api/friend/requests", "GET", {});
  } catch {
    return;
  }
  const filtered = [];
  for (let request of requestResults) {
    if (request.status === "pending" && request.to === currentUsername.value) {
      filtered.push(request);
    }
  }
  requests.value = filtered;
};

onBeforeMount(async () => {
  await getRequests();
  loaded.value = true;
});
</script>

<template>
  <div class="friend-requests">
    <div class="row">
      <h2>Friend Requests</h2>
    </div>
    <section class="requests" v-if="loaded && requests.length !== 0">
      <article v-for="request in requests" :key="request._id">
        <FriendRequestComponent :request="request" @updateRequests="getRequests" />
      </article>
    </section>
    <div class="loading" v-else-if="!loaded">
      <p>Loading...</p>
    </div>
    <div class="no-friends" v-else>
      <p>No friend requests found</p>
    </div>
  </div>
</template>

<style scoped>
.friend-requests {
  margin: 0 auto;
  max-width: 60em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

h2 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.requests {
  display: grid;
  gap: 1em;
}

article {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading,
.no-friends {
  text-align: center;
}

.loading p,
.no-friends p {
  font-size: 18px;
  color: #555;
}

.loading p {
  padding: 1em;
}

.no-friends p {
  padding: 2em;
}

.loading p::before {
  content: "Loading...";
}

.no-friends p::before {
  content: "No friend requests found.";
}
</style>
