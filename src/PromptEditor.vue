<script setup lang="ts">
import { markdown } from '@codemirror/lang-markdown'
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
      markdown(),
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
  <div class="rounded-lg overflow-hidden min-w-full min-h-full font-mono text-base">
    <div ref="containerRef" />
  </div>
</template>
