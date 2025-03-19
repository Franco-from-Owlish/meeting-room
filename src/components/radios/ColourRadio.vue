<template>
  <div class="d-flex flex-wrap justify-center ga-6">
    <div
      v-for="colour in colours"
      :key="colour"
      :style="{ 'background-color': colour }"
      class="colour-bubble"
      :class="model === colour ? 'active' : undefined"
      @click="setModel(colour)"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import OfficeColours from "@/data/colours";

  const model = defineModel<string>({ required: true });

  function setModel(colour: string) {
    model.value = colour;
  }

  const colours = Object.values(OfficeColours);
</script>

<style lang="scss" scoped>
  $min-size: 36px;
  $size: 9.44vw;
  $max-size: 55px;

  .colour-bubble {
    min-height: $min-size;
    min-width: $min-size;
    width: $size;
    height: $size;
    max-width: $max-size;
    max-height: $max-size;
    border-radius: 100%;

    &.active {
      border-style: solid;
      border-width: thick;
      border-color: #475569;
    }
  }
</style>
