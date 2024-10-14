---
group: 'top'
icon: 'carbon:bookmark'
---

<img src="https://raw.githubusercontent.com/woolimi/wool-components/master/assets/sheep.svg" alt="Wool Components" class="mx-auto w-[300px] h-[300px]" />

<h1 class="text-center text-5xl">Wool Components</h1>
<p class="text-2xl text-center">
	<span class="font-extrabold">FUCKING NOISY BUT CUTE<span><br/> Vue UI components library
</p>

<p class="text-center">
	<a href="https://github.com/woolimi/wool-components" target="_blank">Go to Git repository</a>
</p>

<video width="600" height="460" controls class="mx-auto border-black border-2" poster="https://images.prismic.io/woolimi/7587747f-e1f7-454f-8226-222a945c7f33_wool+components.png?q=80&w=540">
  <source src="https://prismic-io.s3.amazonaws.com/woolimi/9b4d8c28-52ca-4d9f-b504-12e6c8c264d0_Wool-Components.mp4" type="video/mp4">
	Your browser does not support the video tag.
</video>

<br/>
<br/>

<h2 class="text-4xl">🐑 Getting Started</h2>

## 1. Download

```bash
yarn add wool-components@latest
```

## 2. Import `index.css` file in `main.ts`

```js
import { createApp } from 'vue';
import App from './App.vue';
import 'wool-components/dist/index.css';

createApp(App).mount('#app');
```

## 3. Import component

```vue
<script setup>
import { WButton } from 'wool-components';
</script>
```

## 4. Breakpoint setup

Please remind that wool-component has following breakpoint setup by default.

```js
// tailwind.config.js
{
	...,
  theme: {
    screens: {
			'-lg': { max: '1280px' }, // apply to lower than 1280px screen
			'-md': { max: '960px' },  // apply to lower than 960px screen
			'-sm': { max: '720px' },  // apply to lower than 720px screen
			'-xs': { max: '540px' },  // apply to lower than 540px screen
			'-xxs': { max: '320px' }, // apply to lower than 320px screen
			lg: { min: '1281px' }, // apply to hight than 1281px screen
			md: { min: '961px' },  // apply to hight than 961px screen
			sm: { min: '721px' },  // apply to hight than 721px screen
			xs: { min: '541px' },  // apply to hight than 541px screen
			xxs: { min: '321px' }, // apply to hight than 321px screen
		}
	}
}
```
