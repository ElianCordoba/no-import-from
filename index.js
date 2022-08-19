/** @type {import('eslint/lib/shared/types').Rule} */

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      invalidImport: 'Importing from {{ import }}'
    }
  },
  create(context) {
    return {
      ImportDeclaration(_node) {
        /** @type {import('estree/index').ImportDeclaration} */
        const node = _node

        const importPath = node.source.value;

        // For testing proposes
        // console.log('Current path', importPath)

        for (const format of context.options) {
          if (format.test(importPath)) {
            context.report({
              node: node,
              messageId: "invalidImport",
              data: {
                import: importPath
              }
            });
          }
        }

        return
      },
    }
  }
}