<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const to = ref("");
const { loginUser, updateSession } = useUserStore();

const sendRequest = async (to: string) => {
  try {
    await fetchy(`/api/friend/requests/${to}`, "POST", {
      body: { to },
    });
  } catch (_) {
    return;
  }
};
</script>

<template>
  <form @submit.prevent="sendRequest(to)" class="pure-form">
    <fieldset>
      <legend>Send a friend Request</legend>
      <input type="text" placeholder="Username" v-model="to" required />
      <button type="submit" class="pure-button pure-button-primary">Send</button>
    </fieldset>
  </form>
</template>

<style scoped></style>
