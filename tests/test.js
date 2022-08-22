'use strict'

const rule = require('../rule')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2022, sourceType: 'module' } })

// Disallow importing from "@para/utils" with "src" in the path

const noSrcFromParaUtil = "@para[/]utils.*[/]src"
ruleTester.run('no-import-from-dir', rule, {
  valid: [
    {
      code: "import foo from '@para/utils'",
      options: [noSrcFromParaUtil],
    },
    {
      code: "import foo from '@para/utils/logUtil'",
      options: [noSrcFromParaUtil],
    },
    {
      code: "import { foo } from '@para/utils/interfaces/user'",
      options: [noSrcFromParaUtil],
    },
  ],

  invalid: [
    {
      code: "import foo from '@para/utils/src'",
      options: [noSrcFromParaUtil, " Remove the 'src' in the path"],
      errors: [
        {
          message: `Importing from "@para/utils/src" is forbidden. Remove the 'src' in the path`
        },
      ],
    },
    {
      code: "import foo from '@para/utils/logUtil/src'",
      options: [noSrcFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport',
        },
      ],
    },
    {
      code: "import { foo } from '@para/utils/logUtil/something/src'",
      options: [noSrcFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
    {
      code: "import * as foo from '@para/utils/logUtil/something/src'",
      options: [noSrcFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
  ],
})

// Disallow import from "para-utils" directly. Rule to be used in para-node

const noDirectImportFromParaUtil = 'para-utils'
ruleTester.run('no-import-from-dir', rule, {
  valid: [],

  invalid: [
    {
      code: "import foo from '../../para-utils/'",
      options: [noDirectImportFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
    {
      code: "import foo from '../../para-utils/logUtil'",
      options: [noDirectImportFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
    {
      code: "import foo from '../../../../para-utils/something'",
      options: [noDirectImportFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
    {
      code: "import foo from './para-utils/something/something'",
      options: [noDirectImportFromParaUtil],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
  ],
})

// Disallow import from "para-node" directly. Rule to be used in para-utils

const noDirectImportFromParaNode = 'para-node'
ruleTester.run('no-import-from-dir', rule, {
  valid: [],

  invalid: [
    {
      code: "import foo from '../../para-node/'",
      options: [noDirectImportFromParaNode],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
    {
      code: "import foo from '../../para-node/logUtil'",
      options: [noDirectImportFromParaNode],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
    {
      code: "import foo from '../../../../para-node/something'",
      options: [noDirectImportFromParaNode],
      errors: [
        {
          messageId: "invalidImport"
        },
      ],
    },
    {
      code: "import foo from './para-node/something/something'",
      options: [noDirectImportFromParaNode],
      errors: [
        {
          messageId: 'invalidImport'
        },
      ],
    },
  ],
})
