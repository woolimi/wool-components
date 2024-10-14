<p align="center">
	<img src="https://raw.githubusercontent.com/woolimi/wool-components/master/assets/sheep.svg" alt="Wool Components" width="300px" height="300px" />
</p>
<h1 align="center">
	:sheep: Wool Components :sheep:
</h1>
<p align="center">
	<strong>FUCKING NOISY BUT CUTE</strong>
<p>
<p align="center">
	Vue UI components library
</p>

<br/>
<br/>

# :sheep: Demo

[https://woolimi.github.io/wool-components/](https://woolimi.github.io/wool-components/#/story/introduction-story-js)

<br/>
<br/>

# :sheep: Getting Started

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
