<template>
  <div class="flex flex-col h-full w-full relative">
    <!-- 工具栏 -->
    <EditorToolbar 
      @change-template="changeTemplate" 
      @refresh="refreshPreview"
      @change-preview-mode="changePreviewMode"
      @open-settings="showSettings = true"
    />
    
    <div class="flex flex-1 h-full w-full">
      <!-- 代码编辑器区域 -->
      <div class="w-1/2 h-full border-r border-gray-200 dark:border-gray-800">
        <div ref="editorContainer" class="h-full w-full"></div>
      </div>
      <!-- 实时预览区域 -->
      <div class="w-1/2 h-full p-4 overflow-auto">
        <iframe 
          ref="previewFrame" 
          class="w-full h-full border-0" 
          sandbox="allow-scripts allow-same-origin"
          title="代码预览"
        ></iframe>
      </div>
    </div>
    
    <!-- 设置面板 -->
    <div v-if="showSettings" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <SettingsPanel 
        :cdn-links="cdnLinks"
        :editor-theme="editorTheme"
        @update:cdn-links="updateCdnLinks"
        @update:editor-theme="updateEditorTheme"
        @close="showSettings = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor'
import EditorToolbar from './EditorToolbar.vue'
import SettingsPanel from './SettingsPanel.vue'

// 初始HTML代码 - 从外部导入或定义
import { defaultHtmlTemplate } from '../utils/codeTemplates'

// 存储编辑器实例和HTML代码
const editorContainer = ref<HTMLElement | null>(null)
const previewFrame = ref<HTMLIFrameElement | null>(null)
const code = ref(defaultHtmlTemplate)
const currentLanguage = ref('html')
const previewMode = ref('render') // 'render' 或 'code'
const showSettings = ref(false)
const editorTheme = ref('vs-dark')
let editor: monaco.editor.IStandaloneCodeEditor | null = null

// 默认CDN链接
const defaultCdnLinks = [
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/vue@3/dist/vue.global.js'
];

// 用户自定义CDN链接
const cdnLinks = ref([...defaultCdnLinks]);

// 更新iframe内容的函数
const updatePreview = (htmlContent: string) => {
  if (previewFrame.value) {
    const iframe = previewFrame.value;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (iframeDocument) {
      // 检查内容类型并相应处理
      let contentToRender = htmlContent;
      
      // 如果是Vue组件模板
      if (htmlContent.trim().startsWith('<template>')) {
        // 提取模板、脚本和样式部分
        const templateMatch = htmlContent.match(/<template>([\s\S]*?)<\/template>/);
        const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);
        const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        
        const templateContent = templateMatch ? templateMatch[1].trim() : '';
        const scriptContent = scriptMatch ? scriptMatch[1].trim() : '';
        const styleContent = styleMatch ? styleMatch[1].trim() : '';
        
        if (previewMode.value === 'code') {
          // 代码模式：显示格式化的代码
          contentToRender = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue组件代码</title>
  <style>
    body { 
      font-family: monospace;
      padding: 20px; 
      background-color: #f8f9fa;
    }
    pre {
      background-color: #f1f1f1;
      padding: 15px;
      border-radius: 4px;
      overflow: auto;
      margin: 0;
    }
    .component-section {
      margin-bottom: 20px;
    }
    h3 {
      color: #42b883;
      margin-top: 0;
    }
  </style>
</head>
<body>
  <h2>Vue 单文件组件</h2>
  
  <div class="component-section">
    <h3>Template</h3>
    <pre><code>${templateContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  </div>
  
  <div class="component-section">
    <h3>Script</h3>
    <pre><code>${scriptContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  </div>
  
  <div class="component-section">
    <h3>Style</h3>
    <pre><code>${styleContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  </div>
</body>
</html>`;
        } else {
          // 渲染模式：尝试渲染Vue组件
          // 构建头部，包含所有CDN链接
          let headContent = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue组件预览</title>`;
          
          // 添加所有CDN链接
          cdnLinks.value.forEach(link => {
            headContent += `\n  <script src="${link}"><\/script>`;
          });
          
          // 添加样式
          headContent += `\n  <style>
    body { 
      font-family: Arial, sans-serif; 
      padding: 20px; 
      margin: 0;
    }
    #app {
      max-width: 800px;
      margin: 0 auto;
    }
    ${styleContent}
  </style>`;
          
          contentToRender = `<!DOCTYPE html>
<html>
<head>${headContent}
</head>
<body>
  <div id="app">
    <!-- 组件将在这里挂载 -->
  </div>

  <script>
    // 等待Vue加载完成
    window.onload = function() {
      if (typeof Vue !== 'undefined') {
        // 创建Vue应用
        const { createApp, ref } = Vue;
        
        // 组件选项
        const componentOptions = {
          template: \`${templateContent.replace(/`/g, '\\`')}\`,
          setup() {
            // 这里是简化的setup函数，实际应该解析script中的内容
            const title = ref('Vue 组件');
            const message = ref('这是一个Vue组件示例');
            const count = ref(0);
            
            return {
              title,
              message,
              count
            };
          }
        };
        
        // 创建并挂载应用
        const app = createApp(componentOptions);
        app.mount('#app');
      } else {
        document.body.innerHTML = '<div style="color: red;">无法加载Vue运行时</div>';
      }
    };
  <\/script>
</body>
</html>`;
        }
      } else if (previewMode.value === 'code') {
        // 普通HTML的代码模式
        contentToRender = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML代码</title>
  <style>
    body { 
      font-family: monospace;
      padding: 20px; 
      background-color: #f8f9fa;
    }
    pre {
      background-color: #f1f1f1;
      padding: 15px;
      border-radius: 4px;
      overflow: auto;
      margin: 0;
    }
  </style>
</head>
<body>
  <h2>HTML代码</h2>
  <pre><code>${htmlContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
</body>
</html>`;
      } else {
        // 普通HTML的渲染模式，添加用户自定义的CDN链接
        const headEndIndex = htmlContent.indexOf('</head>');
        if (headEndIndex !== -1) {
          // 在</head>前插入所有CDN链接
          let cdnScripts = '';
          cdnLinks.value.forEach(link => {
            cdnScripts += `\n  <script src="${link}"><\/script>`;
          });
          
          contentToRender = htmlContent.slice(0, headEndIndex) + cdnScripts + htmlContent.slice(headEndIndex);
        }
      }
      
      iframeDocument.open();
      iframeDocument.write(contentToRender);
      iframeDocument.close();
      
      // 注入UnoCSS样式 - 这部分可能不再需要，因为我们已经使用了Tailwind CDN
      // 但为了兼容性，我们保留它
      try {
        const unoStyleLink = document.createElement('link');
        unoStyleLink.rel = 'stylesheet';
        unoStyleLink.href = '/uno.css'; // UnoCSS生成的样式文件路径
        iframeDocument.head.appendChild(unoStyleLink);
      } catch (error) {
        console.error('注入UnoCSS样式时出错:', error);
      }
    }
  }
}

// 监听代码变化并更新iframe
watch(code, (newCode) => {
  updatePreview(newCode);
})

// 监听预览模式变化
watch(previewMode, () => {
  updatePreview(code.value);
})

// 监听CDN链接变化
watch(cdnLinks, () => {
  updatePreview(code.value);
}, { deep: true });

// 工具栏功能
const changeTemplate = (newTemplate: string) => {
  if (editor) {
    // 检测模板类型并设置相应的语言
    if (newTemplate.trim().startsWith('<template>')) {
      currentLanguage.value = 'vue';
      monaco.editor.setModelLanguage(editor.getModel()!, 'html');
    } else {
      currentLanguage.value = 'html';
      monaco.editor.setModelLanguage(editor.getModel()!, 'html');
    }
    
    // 创建撤销点，以便用户可以撤销模板更改
    editor.pushUndoStop();
    editor.setValue(newTemplate);
    editor.pushUndoStop();
  }
}

const refreshPreview = () => {
  updatePreview(code.value);
}

const changePreviewMode = (mode: string) => {
  previewMode.value = mode;
}

// 设置相关功能
const updateCdnLinks = (links: string[]) => {
  cdnLinks.value = links;
}

const updateEditorTheme = (theme: string) => {
  editorTheme.value = theme;
  if (editor) {
    monaco.editor.setTheme(theme);
  }
}

// 初始化Monaco编辑器和iframe
onMounted(() => {
  // 初始化编辑器
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: code.value,
      language: 'html',
      theme: editorTheme.value,
      minimap: { enabled: false },
      automaticLayout: true,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true,
    })
    
    // 添加编辑器内容变化的监听
    editor.onDidChangeModelContent(() => {
      code.value = editor?.getValue() || '';
    })
  }
  
  // 初始化预览iframe
  updatePreview(code.value);
})
</script>

<style scoped>
/* 确保iframe占满容器 */
iframe {
  background-color: white;
}

/* 暗黑模式下的iframe背景 */
@media (prefers-color-scheme: dark) {
  iframe {
    background-color: #f8f9fa;
  }
}
</style> 
