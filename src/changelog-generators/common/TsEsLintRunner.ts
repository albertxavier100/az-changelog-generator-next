import { parse } from '@typescript-eslint/typescript-estree';
import { TSESLint } from '@typescript-eslint/utils';
import { ParserOptions, RuleCreateFunction, RuleModule } from '@typescript-eslint/utils/ts-eslint';

export class TsEsLintRunner {
  async run(code: string, ruleCreateFunction: RuleCreateFunction) {
    const rule: RuleModule<'id', []> = {
      create(context) {
        return ruleCreateFunction(context);
      },
      defaultOptions: [],
      meta: {
        messages: { id: '' },
        type: 'suggestion',
        schema: []
      }
    };

    const plugin = {
      meta: {
        name: 'eslint-plugin-plugin',
        version: '0.0.1'
      },
      rules: { rule }
    };

    const eslint = new TSESLint.FlatESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          languageOptions: {
            parser: {
              meta: { name: 'parser' },
              parse(text, options) {
                return parse(text, options as ParserOptions);
              }
            }
          },
          plugins: { plugin },
          rules: { 'plugin/rule': 2 }
        }
      ]
    });
    await eslint.lintText(code);
  }
}
