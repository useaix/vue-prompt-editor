import type { Extension } from '@codemirror/state'
import { closeBrackets } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap, indentLess, indentMore } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { bracketMatching, codeFolding, foldGutter, foldKeymap, HighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { highlightSelectionMatches } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import { crosshairCursor, drawSelection, EditorView, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, scrollPastEnd } from '@codemirror/view'
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

  // style
  EditorView.theme({
    '&': {
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-scroller::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '.cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: 'oklch(87.2% 0.01 258.338)',
      borderRadius: '8px',
    },
    '.cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'oklch(70.7% 0.022 261.325)',
      cursor: 'grab',
    },
    '.cm-scroller::-webkit-scrollbar-thumb:active': {
      cursor: 'grabbing',
    },

    // gutters
    '.cm-gutters': {
      backgroundColor: 'transparent',
      border: 'none',
    },
    '.cm-lineNumbers': {
      backgroundColor: 'oklch(98.5% 0.002 247.839)',
      color: 'oklch(55.1% 0.027 264.364)',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      padding: '0px',
      textAlign: 'center',
      transition: 'color 0.3s ease',
    },
    '.cm-lineNumbers .cm-gutterElement.cm-activeLineGutter': {
      color: 'oklch(62.3% 0.214 259.815)',
    },
    '.cm-foldGutter .cm-activeLineGutter': {
      backgroundColor: 'oklch(97% 0.014 254.604)',
    },
    '.cm-foldGutter .cm-gutterElement': {
      cursor: 'pointer',
    },
    '.cm-foldGutter svg[data-open="false"]': {
      transform: 'rotateZ(-90deg)',
    },

    '.cm-activeLine': {
      backgroundColor: 'oklch(97% 0.014 254.604)',
    },
  }),

  // presentation features
  drawSelection(),
  EditorView.lineWrapping,
  highlightActiveLine(),
  highlightSpecialChars(),
  scrollPastEnd(),
  bracketMatching(),
  highlightSelectionMatches(),

  // gutters
  lineNumbers(),
  foldGutter({
    markerDOM(open) {
      const svg = `<svg data-open="${open}" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M36 18L24 30L12 18" /></svg>`
      const parser = new DOMParser()
      const dom = parser.parseFromString(svg, 'image/svg+xml').documentElement

      return dom
    },
  }),
  highlightActiveLineGutter(),

  // input handling
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    {
      key: 'Tab',
      run: indentMore,
      shift: indentLess,
    },
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
