<template>
  <section class="HomeFour">
    <div class="HomeFour__presentation">
      <h2>Mes <br> Projets</h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Logic } from "./three/sceneOne/scene";

const scene = ref();
let logic;

onMounted(() => {
  //logic = new Logic(scene.value);
});
</script>

<style scoped>
.HomeFour {
  width: 100vw;
  height: 200vh;
  background: rgb(24, 97, 126);
  position: relative;
  z-index: 3;
}

.HomeFour__presentation {
  font-family: "Mewatonia";
  font-size: 10vw;
  padding: 1em;
  color: rgb(29, 117, 151);
}

h2 {
  font-family: "Mewatonia";
  line-height: 0.8em;
  margin: 0;
}
</style>
