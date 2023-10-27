<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let points = ref("");

async function getPoint() {
  let pointResult;
  try {
    pointResult = await fetchy("/api/points", "GET", {});
  } catch (_) {
    return;
  }
  points.value = pointResult;
}

onBeforeMount(async () => {
  await getPoint();
});
</script>

<template>
  <p>{{ points.point }} points</p>
</template>
