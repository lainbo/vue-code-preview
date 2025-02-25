<script setup lang="ts">
import CodePreview from './components/CodePreview.vue'
</script>

<template>
  <div class="app-container">
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">Vue代码实时预览</h1>
      <p class="text-sm opacity-80">在左侧编辑HTML/CSS/JavaScript代码，在右侧实时查看渲染结果</p>
    </header>
    <main class="flex-1">
      <CodePreview />
    </main>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

main {
  height: calc(100% - 76px);
  overflow: hidden;
}
</style>
