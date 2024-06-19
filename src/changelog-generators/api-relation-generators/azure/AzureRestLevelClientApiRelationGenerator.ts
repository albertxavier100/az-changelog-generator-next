import { AST_NODE_TYPES } from '@typescript-eslint/types';
import { ApiViewType } from '../../../common/ApiViewType';
import { AzurePackageContext } from '../../../package-loaders/contexts/azure/AzurePackageContext';
import { AST, parse, parseAndGenerateServices, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { TSESTree, ESLintUtils, TSESLint, ParserServices } from '@typescript-eslint/utils';
// import { ESLint, Linter, Rule } from 'eslint';
// import tseslint, {} from 'typescript-eslint';
import { RuleContext, RuleModule, Linter } from '@typescript-eslint/utils/ts-eslint';
import { parse as ps, ParserOptions } from '@typescript-eslint/parser';
import { TsEsLintRunner } from '../../common/TsEsLintRunner';

interface Context {
  code: string;
}

// TODO: add interface
export class AzureRestLevelClientApiRelationGenerator {
  #packageContext: AzurePackageContext;
  #lintRunner = new TsEsLintRunner();

  constructor(packageContext: AzurePackageContext) {
    this.#packageContext = packageContext;
  }

  async generate() {
    await this.#getOperations();
  }

  async #getOperations() {
    const rootApiView = this.#packageContext.apiView[ApiViewType.Root];
    const code = rootApiView[0];
    const operationReferences = await this.#getOperationReferences({ code });
    // TODO:
    // TODO: get operation decl
  }

  async #getOperationDeclarations(context: Context, references: TSESTree.TSTypeReference[]): Promise<void> {
    references.forEach((r) => {
      const name = (r.typeName as TSESTree.Identifier).name;
      this.#lintRunner.run(context.code, (context) => ({
        TSInterfaceDeclaration(node) {
          // TODO
        }
      }));
    });
  }   

  async #getOperationReferences(context: Context): Promise<Array<TSESTree.TSTypeReference>> {
    let operationReferences: TSESTree.TSTypeReference[] = [];
    await this.#lintRunner.run(context.code, (context) => ({
      TSInterfaceDeclaration(node) {
        if (node.id.name !== 'Routes') return;
        operationReferences = node.body.body
          .map((e) => e as TSESTree.TSCallSignatureDeclaration)
          .map((call) => call.returnType!.typeAnnotation as TSESTree.TSTypeReference);
        console.log(operationReferences.map((o) => (o.typeName as TSESTree.Identifier).name));
      }
    }));
    return operationReferences;
  }
}
