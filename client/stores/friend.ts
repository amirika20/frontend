import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFriendStore = defineStore(
  "friends",
  () => {
    const currentFriends = ref<Array<Record<string, string>>>([]);

    const getFriends = async () => {
      try {
        const friends = await fetchy("api/friends", "GET", {});
        currentFriends.value = friends;
      } catch {
        currentFriends.value = [];
      }
    };

    return {
      currentFriends,
      getFriends,
    };
  },
  { persist: true },
);
