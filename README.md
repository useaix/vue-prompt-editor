# Vue Prompt Editor

## What is this?

A vue component for edit ai prompt in markdown language

## When should I use this?

Need visual editing AI prompt

## Install

```bash
npm install @useaix/vue-prompt-editor
```

## Usage

```vue
<script lang="ts" setup>
import PromptEditor from '@useaix/vue-prompt-editor/PromptEditor.vue'
import { ref } from 'vue'

const prompt = ref('')
</script>

<template>
  <div>
    <PromptEditor v-model="prompt" placeholder="AI prompt" />
  </div>
</template>
```
