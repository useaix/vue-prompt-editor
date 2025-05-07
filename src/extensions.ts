import type { Extension } from '@codemirror/state'
import { closeBrackets } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { bracketMatching, codeFolding, foldGutter, foldKeymap, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { highlightSelectionMatches } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import { crosshairCursor, drawSelection, EditorView, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, scrollPastEnd } from '@codemirror/view'
import { tags } from '@lezer/highlight'

export const basicSetup: Extension = (() => [
  // whitespace
  EditorState.tabSize.of(2),
  EditorState.lineSeparator.of('\n'),
  indentOnInput(),

  // editor helpers
  closeBrackets(),
  codeFolding(),
  history(),

  // presentation features
  drawSelection(),
  EditorView.lineWrapping,
  highlightActiveLine(),
  highlightSpecialChars(),
  scrollPastEnd(),
  bracketMatching(),
  highlightSelectionMatches(),

  // gutters
  foldGutter(),
  highlightActiveLineGutter(),

  // input handling
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
  ]),
  crosshairCursor(),

  // language
  /**
   * @link https://github.com/lezer-parser/markdown/blob/8d4523b16bed48ccd0d5c8b50374a105adb255fe/src/markdown.ts#L1900
   */
  syntaxHighlighting(HighlightStyle.define([
    // basic
    { tag: tags.content, lineHeight: '1.5', color: 'var(--prompt-editor-color, oklch(14.5% 0 0))' },
    { tag: tags.string, lineHeight: '1.5', color: 'var(--prompt-editor-string-color, oklch(14.5% 0 0))' },
    { tag: tags.labelName, lineHeight: '1.5', color: 'var(--prompt-editor-label-name-color, oklch(14.5% 0 0))' },
    { tag: tags.comment, color: 'var(--prompt-editor-comment-color,  oklch(55.6% 0 0))' },

    // heading
    { tag: tags.heading, fontWeight: 'var(--prompt-editor-heading-font-weight, bold)', color: 'var(--prompt-editor-heading-color, oklch(62.3% 0.214 259.815))' },
    { tag: tags.heading1, fontSize: '1.3em', fontWeight: 'var(--prompt-editor-heading-font-weight, bold)', color: 'var(--prompt-editor-heading-color, oklch(62.3% 0.214 259.815))' },
    { tag: tags.heading2, fontSize: '1.2em', fontWeight: 'var(--prompt-editor-heading-font-weight, bold)', color: 'var(--prompt-editor-heading-color, oklch(62.3% 0.214 259.815))' },
    { tag: tags.heading3, fontSize: '1.1em', fontWeight: 'var(--prompt-editor-heading-font-weight, bold)', color: 'var(--prompt-editor-heading-color, oklch(62.3% 0.214 259.815))' },

    // variants
    { tag: tags.quote, fontStyle: 'italic', color: 'var(--prompt-editor-quote-color,  oklch(37.1% 0 0))' },
    { tag: tags.contentSeparator, color: 'var(--prompt-editor-content-separator-color, oklch(55.1% 0.027 264.364))' },
    { tag: tags.escape, color: 'var(--prompt-editor-escape-color, oklch(55.8% 0.288 302.321))' },
    { tag: tags.character, color: 'var(--prompt-editor-character-color, oklch(55.8% 0.288 302.321))' },
    { tag: tags.emphasis, fontStyle: 'italic', fontWeight: '600', color: 'var(--prompt-editor-emphasis-color, oklch(26.9% 0 0))' },
    { tag: tags.strong, fontWeight: '700', color: 'var(--prompt-editor-strong-color, oklch(14.5% 0 0))' },
    { tag: tags.link, color: 'var(--prompt-editor-link-color, oklch(62.3% 0.214 259.815))' },
  ])),
  markdown({
    codeLanguages: languages,
  }),
])()
