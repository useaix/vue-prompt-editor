import type { ShikiTransformer } from 'shiki'

export function transformPlaceholder() {
  return ({
    name: 'placeholder',
    preprocess(code) {
      return code.split('\n').map((str) => {
        return str || '\u00A0'
      }).join('\n')
    },
  }) as ShikiTransformer
}
