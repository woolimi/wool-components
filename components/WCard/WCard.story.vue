<script setup>
import WCard from './WCard.vue';
</script>

<template>
  <Story :layout="{ type: 'grid', width: '95%' }" title="WCard" group="UI">
    <Variant title="default">
      <WCard>
        <template #head>
          <img src="https://images.unsplash.com/photo-1558881935-e1a1edef0091?w=600&fm=webp&q=80" />
        </template>
        <template #body>
          <h2 class="text-xl font-bold">Click the sheep above !</h2>
          <p class="mt-2 text-gray-600">Meeh! Meeh! Meeh!</p>
        </template>
      </WCard>
    </Variant>
  </Story>
</template>
