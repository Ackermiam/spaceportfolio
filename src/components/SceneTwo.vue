<template>
  <section class="HomeTwo">
    <div ref="sceneTwo" class="Scene"></div>
    <div ref="presentationRef" class="HomeTwo__presentation" :style="{ opacity: presentationOpacity }">
      <h2>
        Qui <br />
        suis-je ?
      </h2>
      <p> Développeur front-end JavaScript/TypeScript. Depuis quelque temps, la 3D m'intrigue fortement, je me lance donc dans l'apprentissage et la création de petites expériences et jeux sympas avec Three.js. J’ai aussi envie d’explorer des technos immersives comme la réalité virtuelle et augmentée pour enrichir l'expérience utilisateur. </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Logic } from "../three/sceneTwo/scene";

const sceneTwo = ref();
const presentationRef = ref<HTMLElement | null>(null);
let logic: Logic | null = null;

const presentationOpacity = ref(0);

const handleScroll = () => {
  if (!presentationRef.value) return;

  const rect = presentationRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const startFadeIn = windowHeight * 0.2;
  const endFadeIn = windowHeight * 0;

  if (rect.top <= startFadeIn && rect.top >= endFadeIn) {
    const progress = 1 - (rect.top - endFadeIn) / (startFadeIn - endFadeIn);
    presentationOpacity.value = Math.min(Math.max(progress, 0), 1);
  } else if (rect.top <= endFadeIn) {
    presentationOpacity.value = 1;
  } else {
    presentationOpacity.value = 0;
  }
};

onMounted(() => {
  logic = new Logic(sceneTwo.value);

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.HomeTwo {
  width: 100vw;
  height: 200vh;
  background: pink;
  position: relative;
  z-index: 3;
  overflow-x: hidden;
}

.HomeTwo__presentation {
  padding: 1em;
  z-index: 5;
  font-size: 10vw;
  transition: opacity 0.3s ease;
}

.Scene {
  position: absolute;
  width: 100%;
  height: 200vh;
  bottom: 0;
  z-index: 4;
}

h2 {
  font-family: "Mewatonia";
  line-height: 0.8em;
  margin: 0 0 .3em 0;
}

p {
  font-size: 1.8vw;
  max-width: 600px;
  font-family: "Archivo";
}

@media (max-width: 900px) {
  .HomeTwo__presentation {
    font-size: 18vw;
  }

  p {
    font-size: 5vw;
  }
}
</style>
