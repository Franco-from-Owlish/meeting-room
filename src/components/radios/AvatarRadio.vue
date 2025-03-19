<template>
  <div class="d-flex flex-wrap justify-center ga-6">
    <div
      v-for="{ name, avatar } in avatars"
      :key="name.toString()"
      class="avatar-bubble"
      :class="model === name ? 'active' : undefined"
      :style="{ backgroundImage: `url(${avatar})` }"
      @click="setModel(name)"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import StaffAvatars, { type TAllowedAvatars } from "@/data/avatars";

  const model = defineModel<TAllowedAvatars>({ required: true });

  function setModel(avatar: TAllowedAvatars) {
    model.value = avatar;
  }

  const avatars: Array<{
    name: TAllowedAvatars;
    avatar: string;
  }> = Object.entries(StaffAvatars).flatMap(([name, avatar]) => {
    return {
      name: name as TAllowedAvatars,
      avatar,
    };
  });
</script>

<style lang="scss" scoped>
  $min-size: 52px;
  $size: 6.25vw;
  $max-size: 55px;

  .avatar-bubble {
    min-height: $min-size;
    min-width: $min-size;
    width: $size;
    height: $size;
    max-width: $max-size;
    max-height: $max-size;
    border-radius: 100%;

    &.active {
      outline-style: solid;
      outline-width: thick;
      outline-color: #475569;
    }
  }
</style>
