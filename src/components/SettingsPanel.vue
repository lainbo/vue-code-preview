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
      <div class="mt-2 text-xs">
        <p class="text-gray-500">常用CDN库:</p>
        <div class="flex flex-wrap gap-1 mt-1">
          <button 
            v-for="(cdn, index) in commonCdns" 
            :key="index"
            @click="addCdn(cdn.url)"
            class="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-xs"
          >
            {{ cdn.name }}
          </button>
        </div>
      </div>
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
import { ref, onMounted, computed } from 'vue';

const props = defineProps<{
  cdnLinks: string[];
  editorTheme: string;
}>();

const emit = defineEmits(['update:cdnLinks', 'update:editorTheme', 'close']);

// 本地状态
const localCdnLinks = ref('');
const localEditorTheme = ref(props.editorTheme);

// 常用CDN库列表
const commonCdns = [
  { name: 'Vue 3', url: 'https://unpkg.com/vue@3/dist/vue.global.js' },
  { name: 'Tailwind CSS', url: 'https://cdn.tailwindcss.com' },
  { name: 'Moment.js', url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js' },
  { name: 'Lodash', url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js' },
  { name: 'Axios', url: 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js' },
  { name: 'jQuery', url: 'https://code.jquery.com/jquery-3.6.0.min.js' }
];

// 添加CDN链接
const addCdn = (url: string) => {
  const currentLinks = localCdnLinks.value.split('\n').map(link => link.trim()).filter(Boolean);
  if (!currentLinks.includes(url)) {
    localCdnLinks.value = localCdnLinks.value ? `${localCdnLinks.value}\n${url}` : url;
  }
};

// 初始化本地状态
onMounted(() => {
  localCdnLinks.value = props.cdnLinks.join('\n');
});

// 验证URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// 保存设置
const saveSettings = () => {
  // 将文本区域内容拆分为数组，并过滤掉空行
  const links = localCdnLinks.value
    .split('\n')
    .map(link => link.trim())
    .filter(link => link !== '');
  
  // 验证URL
  const validLinks = links.filter(link => isValidUrl(link));
  if (validLinks.length !== links.length) {
    alert('有一些URL格式不正确，已自动过滤');
  }
  
  emit('update:cdnLinks', validLinks);
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
