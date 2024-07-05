import { AST_NODE_TYPES } from '@typescript-eslint/types';
import { ApiViewType } from '../../../common/ApiViewType';
import { AzurePackageContext } from '../../../package-loaders/contexts/azure/AzurePackageContext';
import { AST, parse, parseAndGenerateServices, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { TSESTree as t, ESLintUtils, TSESLint, ParserServices } from '@typescript-eslint/utils';
// import { ESLint, Linter, Rule } from 'eslint';
// import tseslint, {} from 'typescript-eslint';
import { RuleContext, RuleModule, Linter } from '@typescript-eslint/utils/ts-eslint';
import { parse as ps, ParserOptions } from '@typescript-eslint/parser';
import { TsEsLintRunner } from '../../common/TsEsLintRunner';
import { ProgramBuilder } from '../ProgramBuilder';

interface Context {
  code: string;
}

// TODO: add interface
export class AzureRestLevelClientApiRelationGenerator implements ProgramBuilder<t.Program> {
  #packageContext: AzurePackageContext;
  #lintRunner = new TsEsLintRunner();

  constructor(packageContext: AzurePackageContext) {
    this.#packageContext = packageContext;
  }

  async build() {
    // TODO: opt to run lint only once
    await this.#getOperations();
  }

  async #getOperations() {
    const rootApiView = this.#packageContext.apiView[ApiViewType.Root];
    const code = rootApiView[0];
    const operationReferences = await this.#getOperationReferences({ code });
    const operationDeclarations = await this.#getOperationDeclarations({ code }, operationReferences);
  }

  async #getOperationDeclarations(context: Context, references: t.TSTypeReference[]): Promise<t.TSInterfaceDeclaration[]> {
    const operationNames = references.map((ref) => {
      const typeName = ref.typeName as t.Identifier;
      if (!typeName) {
        throw new Error(`Failed to find get operation name`);
      }
      return typeName.name;
    });
    const operationNameSet = new Set(operationNames);
    const operations : t.TSInterfaceDeclaration[]= [];
    this.#lintRunner.run(context.code, (context) => ({
      TSInterfaceDeclaration(node) {
        if (node.id.name in operationNameSet) {
          operations.push(node);
        }
      }
    }));
    return operations;
  }

  async #getOperationReferences(context: Context): Promise<Array<t.TSTypeReference>> {
    let operationReferences: t.TSTypeReference[] = [];
    await this.#lintRunner.run(context.code, (context) => ({
      TSInterfaceDeclaration(node) {
        if (node.id.name !== 'Routes') return;
        operationReferences = node.body.body
          .map((e) => e as t.TSCallSignatureDeclaration)
          .map((call) => call.returnType!.typeAnnotation as t.TSTypeReference);
        console.log(
          'operations\n',
          operationReferences.map((o) => (o.typeName as t.Identifier).name)
        );
      }
    }));
    return operationReferences;
  }
}
