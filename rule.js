/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: {
    type: 'problem',
    messages: {
      invalidImport: 'Importing from {{ import }} is forbidden.{{ suggestion }}'
    },
    schema: [
      { "type": "string" }, // The regexp
      { "type": "string" }, // The suggestion (optional)
    ]
  },
  create(context) {
    return {
      ImportDeclaration(_node) {
        /** @type {import('estree/index').ImportDeclaration} */
        const node = _node

        const importPath = node.source.value;

        // For testing proposes
        // console.log('Current path', importPath)

        const [rawRegexp, suggestion] = context.options

        const regexp = new RegExp(rawRegexp)

        if (regexp.test(importPath)) {
          context.report({
            node: node,
            messageId: "invalidImport",
            data: {
              import: importPath,
              suggestion: suggestion || ''
            }
          });
        }

        return
      },
    }
  }
}