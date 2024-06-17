import { ApiViewType } from '../../../common/ApiViewType';
import { AzurePackageContext } from '../../../package-loaders/contexts/azure/AzurePackageContext';
import { parse } from '@typescript-eslint/parser';

// TODO: add interface
export class AzureHighLevelClientApiRelationGenerator {
  #packageContext: AzurePackageContext;
  constructor(packageContext: AzurePackageContext) {
    this.#packageContext = packageContext;
  }

  generate() {
    const rootApiView = this.#packageContext.apiView[ApiViewType.Root];
    const program = parse(rootApiView[0]);
    program.body.forEach((node) => {
      console.log(node);
    });
  }
}
