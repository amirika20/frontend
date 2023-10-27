<script setup lang="ts">
import FriendComponent from "@/components/Friend/FriendComponent.vue";
import { useFriendStore } from "@/stores/friend";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentFriends } = storeToRefs(useFriendStore());
const { getFriends } = useFriendStore();
const loaded = ref(false);
// async function getFriends() {
//   let friendResults;
//   try {
//     friendResults = await fetchy("api/friends", "GET");
//   } catch (_) {
//     return;
//   }
//   friends.value = friendResults;
// }

onBeforeMount(async () => {
  void getFriends();
  loaded.value = true;
});
</script>

<template>
  <div class="friend-list">
    <div class="row">
      <h2>Your Friends</h2>
    </div>
    <section class="friends" v-if="loaded && currentFriends.length !== 0">
      <article v-for="friend in currentFriends" :key="friend._id">
        <FriendComponent :friend="friend" />
      </article>
    </section>
    <div class="loading" v-else-if="!loaded">
      <p>Loading...</p>
    </div>
    <div class="no-friends" v-else>
      <p>No friends found</p>
    </div>
  </div>
</template>

<style scoped>
.friend-list {
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

.friends {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

article {
  background-color: #f8f8f8;
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
</style>
