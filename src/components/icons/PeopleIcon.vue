<template>
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="vuesax/twotone/people">
      <g id="people">
        <path
          id="Vector"
          opacity="0.4"
          d="M17.9976 7.43907C17.9376 7.42907 17.8676 7.42907 17.8076 7.43907C16.4276 7.38907 15.3276 6.25907 15.3276 4.85907C15.3276 3.42907 16.4776 2.27907 17.9076 2.27907C19.3376 2.27907 20.4876 3.43907 20.4876 4.85907C20.4776 6.25907 19.3776 7.38907 17.9976 7.43907Z"
          :stroke="computedColour"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          opacity="0.4"
          d="M16.9675 14.7191C18.3375 14.9491 19.8475 14.7091 20.9075 13.9991C22.3175 13.0591 22.3175 11.5191 20.9075 10.5791C19.8375 9.86908 18.3075 9.62907 16.9375 9.86907"
          :stroke="computedColour"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_3"
          opacity="0.4"
          d="M5.96754 7.43907C6.02754 7.42907 6.09754 7.42907 6.15754 7.43907C7.53754 7.38907 8.63754 6.25907 8.63754 4.85907C8.63754 3.42907 7.48754 2.27907 6.05754 2.27907C4.62754 2.27907 3.47754 3.43907 3.47754 4.85907C3.48754 6.25907 4.58754 7.38907 5.96754 7.43907Z"
          :stroke="computedColour"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          opacity="0.4"
          d="M6.9975 14.7191C5.6275 14.9491 4.1175 14.7091 3.0575 13.9991C1.6475 13.0591 1.6475 11.5191 3.0575 10.5791C4.1275 9.86908 5.6575 9.62907 7.0275 9.86907"
          :stroke="computedColour"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g id="Group">
          <path
            id="Vector_5"
            d="M12.0001 14.9091C11.9401 14.8991 11.8701 14.8991 11.8101 14.9091C10.4301 14.8591 9.33008 13.7291 9.33008 12.3291C9.33008 10.8991 10.4801 9.74907 11.9101 9.74907C13.3401 9.74907 14.4901 10.9091 14.4901 12.3291C14.4801 13.7291 13.3801 14.8691 12.0001 14.9091Z"
            :stroke="computedColour"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_6"
            d="M9.08997 18.0591C7.67997 18.9991 7.67997 20.5391 9.08997 21.4791C10.69 22.5491 13.31 22.5491 14.91 21.4791C16.32 20.5391 16.32 18.9991 14.91 18.0591C13.32 16.9991 10.69 16.9991 9.08997 18.0591Z"
            :stroke="computedColour"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useTheme } from "vuetify";

  const theme = useTheme();

  const props = withDefaults(defineProps<{ colour?: string }>(), { colour: "#484954" });

  const computedColour = computed<string>(
    () => theme.current.value.colors[props.colour] ?? props.colour,
  );
</script>
