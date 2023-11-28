/// <reference types="@histoire/plugin-vue/components" />

declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}

// declare module '*.mp3' {
//   export default string;
// }
declare module 'color' {
  export default object;
}
