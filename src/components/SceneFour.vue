<template>
  <section class="HomeFour" ref="scene">
    <div
      ref="sceneFour"
      class="Scene"
      :class="isSectionVisible ? 'Scene--fixed' : 'Scene--absolute'"
    ></div>
    <div class="HomeFour__presentation">
      <h2>Mes <br> Projets</h2>
    </div>
    <div class="HomeFour__presentationText">
      <p>
        Jeux 2D, jeux 3D, portfolio ratés mais idées testées, voici un condensé de ce que je fais à côté de mon travail principal. Mon but est d'apprendre de nouvelles notions et aiguiser mes compétences, de projet en projet, afin de pouvoir bientôt offrir des expériences de réalité augmentée et réalité virtuelle, des jeux 3D plus longs et plus travaillés que ceux que je fais actuellement !
      </p>
    </div>
    <Slider class="Slider"/>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Logic } from "../three/sceneFour/scene";
import Slider from "./Slider/Slider.vue";

const scene = ref();
const sceneFour = ref();
const isSectionVisible = ref(false);
let logic;

const checkVisibility = () => {
  if (!sceneFour.value) return;

  const rect = sceneFour.value.closest(".HomeFour").getBoundingClientRect();

  isSectionVisible.value = rect.top <= 0;
};

onMounted(() => {
  logic = new Logic(scene.value, sceneFour.value);

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);

  checkVisibility();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkVisibility);
  window.removeEventListener("resize", checkVisibility);
});
</script>

<style scoped>
.HomeFour {
  width: 100vw;
  height: 390vh;
  background: rgb(0, 0, 0);
  position: relative;
  z-index: 3;
}

.Slider {
  z-index: 1;
}

.HomeFour__presentation {
  font-family: "Mewatonia";
  color: rgba(185, 253, 255, 0.753);
  filter: drop-shadow(-8px 5px 0px rgb(252, 47, 47));
  padding: 6vw 0 0 6vw;
  margin-bottom: 150px;
}

.HomeFour__presentationText {
  color: rgba(185, 253, 255, 0.842);
  font-family: "Archivo";
  font-size: 1.8vw;
  max-width: 800px;
  padding-left: 6vw;
  margin-bottom: 250px;
}

h2 {
  font-size: 13vw;
  font-family: "Play";
  line-height: 1em;
  margin: 0;
}

.Scene {
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 0;
  position: absolute;
}

.Scene--fixed {
  position: fixed;
  transition: top 0.3s ease-out;
}

.Scene--absolute {
  position: absolute;
}

@media (max-width: 900px) {
  h2 {
    font-size: 17vw;
  }

  p {
    font-size: 5vw;
  }

  .HomeFour {
    height: auto;
    padding-bottom: 100px;
    padding-top: 50px;
  }

  .HomeFour__presentation {
    margin-bottom: 50px;
  }

  .HomeFour__presentationText {
    max-width: 60%;
    margin-bottom: 150px;
  }
}
</style>
