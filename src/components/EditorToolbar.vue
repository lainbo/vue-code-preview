<template>
  <div class="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
    <div class="flex space-x-2">
      <button 
        v-for="template in templates" 
        :key="template.id"
        @click="selectTemplate(template.code)"
        class="px-3 py-1 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        :class="{'bg-blue-200 dark:bg-blue-800': currentTemplate === template.id}"
      >
        {{ template.name }}
      </button>
    </div>
    
    <div class="ml-auto flex items-center space-x-2">
      <button 
        @click="$emit('refresh')"
        class="px-3 py-1 text-sm rounded hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
        title="刷新预览"
      >
        刷新
      </button>
      
      
      <div class="border-l border-gray-300 dark:border-gray-600 h-6 mx-2"></div>
      
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-500 dark:text-gray-400">预览模式:</span>
        <select 
          @change="$emit('change-preview-mode', $event.target.value)"
          class="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
        >
          <option value="render">渲染</option>
          <option value="code">代码</option>
        </select>
      </div>
      
      <button 
        @click="$emit('open-settings')"
        class="ml-2 px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="设置"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defaultHtmlTemplate, emptyHtmlTemplate, vueComponentTemplate } from '../utils/codeTemplates'

const emit = defineEmits(['change-template', 'refresh', 'change-preview-mode', 'open-settings'])

const templates = [
  { id: 'html', name: 'HTML模板', code: defaultHtmlTemplate },
  { id: 'empty', name: '空白模板', code: emptyHtmlTemplate },
  { id: 'vue', name: 'Vue组件', code: vueComponentTemplate }
]

const currentTemplate = ref('html')

const selectTemplate = (code: string) => {
  const template = templates.find(t => t.code === code)
  if (template) {
    currentTemplate.value = template.id
  }
  emit('change-template', code)
}
</script> 
