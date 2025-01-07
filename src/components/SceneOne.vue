<template>
  <section class="Home">
    <div ref="scene" class="Scene"></div>

    <div class="Title">
      <h1
        v-for="(_, index) in 5"
        :key="index"
        :style="{ opacity: `${1 - index / 5}` }"
        class="Title__text"
      >
        Acker'Prod
      </h1>
    </div>

    <div class="Developer">
      <h1 class="Developer__title">
        French <br />
        Developer
      </h1>
    </div>
    <div class="Developer__clone">
      <h1 class="Developer__title__clone">
        French <br />
        Developer
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Logic } from "../three/sceneOne/scene";

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
  z-index: 1;
  overflow-x: hidden;
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

.Title__text {
  font-size: 13vw;
  color: white;
}

.Developer {
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 1500px;
  z-index: 3;
  font-size: 7vw !important;
}

.Developer__clone {
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 1500px;
  z-index: 1;
  font-size: 9vw !important;
}

.Developer__title {
  color: red;
}

.Developer__title__clone {
  color: rgba(255, 255, 255, 0.082);
}

h1,
h2 {
  font-family: "Mewatonia";
  line-height: 0.8em;
  margin: 0;
}

@media (max-width: 900px) {
  .Title__text {
    font-size: 21vw;
  }

  .Title {
    top: 200px;
  }

  .Developer {
    top: 1300px;
    font-size: 10vw !important;
  }

  .Developer__clone {
    top: 1300px;
    font-size: 12vw !important;
  }
}
</style>
