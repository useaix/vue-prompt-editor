<script setup lang="ts">
import type { MaybeArray, ThemeRegistrationAny } from 'shiki'
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki'
import markdown from 'shiki/langs/markdown.mjs'
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs'
import catppuccinMocha from 'shiki/themes/catppuccin-mocha.mjs'
import { ref, watch } from 'vue'

defineOptions({
  name: 'PromptEditor',
})

const props = withDefaults(defineProps<{
  themes?: MaybeArray<ThemeRegistrationAny>
}>(), {
  themes: () => [catppuccinLatte, catppuccinMocha],
})

const model = defineModel({
  type: String,
})

const themesResolved = Array.isArray(props.themes) ? props.themes : [props.themes]

const highlighter = createHighlighterCoreSync({
  themes: themesResolved,
  langs: [markdown],
  engine: createJavaScriptRegexEngine(),
})
const output = ref('')

watch(model, (str) => {
  output.value = highlighter.codeToHtml(str ?? '', {
    themes: {
      light: themesResolved[0].name!,
      dark: themesResolved[themesResolved.length > 1 ? 1 : 0].name!,
    },
    lang: 'markdown',
  })
}, {
  immediate: true,
})
</script>

<template>
  <div class="rounded-lg overflow-hidden relative min-w-full min-h-full">
    <div class="[&>.shiki]:p-4 [&>.shiki]:min-h-16" v-html="output" />
    <textarea v-model="model" class="absolute font-mono focus-within:outline-none inset-0 top-0 left-0 p-4 text-transparent bg-transparent caret-black resize-none overflow-hidden z-10" />
  </div>
</template>

<style>
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>
