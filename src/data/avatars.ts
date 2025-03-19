export const AllowedAvatars = [
  "Balloons",
  "Batsman",
  "Cupid",
  "Saturn",
  "Spaceship",
  "Squid",
  "Superman",
] as const;

const StaffAvatars: Record<(typeof AllowedAvatars)[number], string> = {
  Balloons: new URL("@/assets/avatars/Balloons.svg", import.meta.url).href,
  Batsman: new URL("@/assets/avatars/Batsman.svg", import.meta.url).href,
  Cupid: new URL("@/assets/avatars/Cupid.svg", import.meta.url).href,
  Saturn: new URL("@/assets/avatars/Saturn.svg", import.meta.url).href,
  Spaceship: new URL("@/assets/avatars/Spaceship.svg", import.meta.url).href,
  Squid: new URL("@/assets/avatars/Squid.svg", import.meta.url).href,
  Superman: new URL("@/assets/avatars/Superman.svg", import.meta.url).href,
} as const;

export default StaffAvatars;
