/**
 * 默认HTML模板
 */
export const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* 可以添加自定义CSS */
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="text-center py-4">
    <h1 class="text-2xl font-bold text-blue-500 mb-4">Hello Vue!</h1>
    <p class="mb-2">这是一个实时渲染的演示</p>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      点击我
    </button>
  </div>

  <script>
    // 可以添加JavaScript代码
    console.log('预览已加载');
  </script>
</body>
</html>`;

/**
 * 空白HTML模板
 */
export const emptyHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* 在这里添加CSS */
  </style>
</head>
<body>
  <!-- 在这里添加HTML内容 -->
  
  <script>
    // 在这里添加JavaScript
  </script>
</body>
</html>`;

/**
 * 基础Vue组件模板
 */
export const vueComponentTemplate = `<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="count++">点击了 {{ count }} 次</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Vue 组件')
const message = ref('这是一个Vue组件示例')
const count = ref(0)
</script>

<style scoped>
h1 {
  color: #42b883;
}
button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>`; 
