<template>
  <div class="Loading">
    <h1>CHARGEMENT</h1>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.Loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1000;
  background: black;
  top: 0;
}

h1 {
  font-family: "Mewatonia";
  font-size: 10vw;
  color: rgba(185, 253, 255, 0.753);
  filter: drop-shadow(-8px 5px 0px rgb(252, 47, 47));
  opacity: 1;
  animation: load 2s linear infinite;
}

@keyframes load {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}
</style>