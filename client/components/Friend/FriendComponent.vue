<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useFriendStore } from "../../stores/friend";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const currentRoute = useRoute();
const props = defineProps(["friend"]);
const { currentUsername } = storeToRefs(useUserStore());
const { getFriends } = useFriendStore();

const removeFriend = async () => {
  try {
    await fetchy(`/api/friends/${props.friend}`, "DELETE");
  } catch {
    return;
  }
  void getFriends();
};
</script>

<template>
  <p class="author">
    <RouterLink :to="{ name: 'Profile', params: { username: props.friend } }" class="Profile"> {{ props.friend }} </RouterLink>
  </p>
  <div class="base">
    <menu>
      <li><button class="button-error btn-small pure-button" @click="removeFriend">Remove</button></li>
    </menu>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
