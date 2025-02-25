<template>
  <div class="settings-panel bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 w-80">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">设置</h3>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">外部库 (CDN链接)</label>
      <p class="text-xs text-gray-500 mb-2">每行一个URL，这些库将被注入到预览iframe中</p>
      <textarea 
        v-model="localCdnLinks" 
        class="w-full h-32 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        placeholder="https://cdn.tailwindcss.com
https://unpkg.com/vue@3/dist/vue.global.js"
      ></textarea>
    </div>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">编辑器主题</label>
      <select 
        v-model="localEditorTheme"
        class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="vs-dark">深色</option>
        <option value="vs-light">浅色</option>
      </select>
    </div>
    
    <div class="flex justify-end">
      <button 
        @click="saveSettings" 
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
      >
        保存设置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  cdnLinks: string[];
  editorTheme: string;
}>();

const emit = defineEmits(['update:cdnLinks', 'update:editorTheme', 'close']);

// 本地状态
const localCdnLinks = ref('');
const localEditorTheme = ref(props.editorTheme);

// 初始化本地状态
onMounted(() => {
  localCdnLinks.value = props.cdnLinks.join('\n');
});

// 保存设置
const saveSettings = () => {
  // 将文本区域内容拆分为数组，并过滤掉空行
  const links = localCdnLinks.value
    .split('\n')
    .map(link => link.trim())
    .filter(link => link !== '');
  
  emit('update:cdnLinks', links);
  emit('update:editorTheme', localEditorTheme.value);
  emit('close');
};
</script>

<style scoped>
.settings-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style> 
