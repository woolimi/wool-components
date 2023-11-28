<script setup>
import { reactive } from 'vue';

import WNavbar from './WNavbar.vue';
const state = reactive({
  model: [
    { text: 'Home', to: '#' },
    {
      text: 'Projects',
      items: [
        {
          text: 'My awesome project',
          items: [
            { text: 'Project 1', to: '#' },
            { text: 'Project 2', to: '#' },
          ],
        },
        { text: 'My worst project', to: '#' },
      ],
    },
    {
      text: 'About us',
      items: [
        { text: 'Who we are', to: '#' },
        { text: 'Where we are', to: '#' },
      ],
    },
    { text: 'Contact', to: '#' },
  ],
});
const source = `/* 
Supports 2 nested items. 
Each item should be like below

item = { 
  text: string, 
  to?: string, 
  items?: item[] 
}
*/

<WNavbar :model="[
    { 
      text: 'Home', 
      to: '#', 
    },
    {
      text: 'Projects',
      items: [
        { text: 'My awesome project', items: [...] }
        { text: 'My worst project', items: [...] }
      ] 
    }
]"/>`;
</script>

<template>
  <Story :layout="{ type: 'single', iframe: true }" title="WNavbar" group="UI">
    <Variant :source="source" title="default">
      <WNavbar :model="state.model" class="mt-10" />
    </Variant>
  </Story>
</template>
