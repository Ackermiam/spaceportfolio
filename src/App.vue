<template>
  <section class="Home">

    <div ref="scene" class="Scene"></div>

    <div class="Title">
      <h1
        v-for="(_, index) in 4"
        :key="index"
        :style="{ opacity: `${1 - index / 3.5}` }"
      >
        Acker'Prod
      </h1>
    </div>
  </section>
  <section class="HomeTwo"></section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Logic } from "./three/scene";

const scene = ref();
let logic;

onMounted(() => {
  logic = new Logic(scene.value);
});
</script>

<style scoped>
.Home {
  width: 100vw;
  height: 300vh;
  position: relative;
}
.HomeTwo {
  width: 100vw;
  height: 300vh;
  background: pink;
  z-index: 3;
}

.Scene {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
}

.Title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;
  z-index: -1;
}

h1 {
  font-size: 13vw;
  font-family: "Mewatonia";
  line-height: 0.8em;
  margin: 0;
  color: rgb(255, 255, 255);
}

@media (max-width: 900px) {
  h1 {
    font-size: 18vw;
  }

  .Title {
    top: 200px;
  }
}
</style>
