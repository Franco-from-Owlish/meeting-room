<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.0001 0.649963C11.4144 0.649963 11.7501 0.98575 11.7501 1.39996V10.25H20.6001C21.0144 10.25 21.3501 10.5858 21.3501 11C21.3501 11.4142 21.0144 11.75 20.6001 11.75H11.7501V20.6C11.7501 21.0142 11.4144 21.35 11.0001 21.35C10.5859 21.35 10.2501 21.0142 10.2501 20.6V11.75H1.40015C0.985933 11.75 0.650146 11.4142 0.650146 11C0.650146 10.5858 0.985933 10.25 1.40015 10.25H10.2501V1.39996C10.2501 0.98575 10.5859 0.649963 11.0001 0.649963Z"
      :fill="colour"
    />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useTheme } from "vuetify";

  const theme = useTheme();

  const colour = computed<string>(() => theme.current.value.colors["on-primary-dark"]);
</script>
