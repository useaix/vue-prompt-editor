<script setup lang="ts">
import { EditorView, placeholder } from '@codemirror/view'
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'
import { basicSetup } from './extensions'

defineOptions({
  name: 'PromptEditor',
})

const props = withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'AI prompt',
})

const model = defineModel({
  type: String,
  default: '',
})

const containerRef = useTemplateRef('containerRef')
const editor = shallowRef<EditorView>()
onMounted(() => {
  editor.value = new EditorView({
    doc: model.value,
    parent: containerRef.value!,
    extensions: [
      basicSetup,
      placeholder(props.placeholder),
      EditorView.updateListener.of(({ state, transactions }) => {
        if (transactions.some(tr => tr.docChanged)) {
          model.value = state.doc.toString()
        }
      }),
    ],
  })
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="prompt-editor rounded-lg h-full">
    <div ref="containerRef" class="font-mono text-base h-full" />
  </div>
</template>

<style>
.prompt-editor .cm-editor {
  height: 100%;
}

.prompt-editor .cm-editor:focus-within {
  outline: none;
}
</style>
