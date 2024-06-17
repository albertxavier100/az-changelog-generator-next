import { ApiViewType } from '../../../common/ApiViewType';
import { AzurePackageContext } from '../../../package-loaders/azure/AzureHighLevelClientPackageLoader';

// TODO: add interface
export class AzureApiRelationGenerator {
  #packageContext: AzurePackageContext;
  constructor(packageContext: AzurePackageContext) {
    this.#packageContext = packageContext;
  }

  generate() {
    const rootApiView = this.#packageContext.apiView[ApiViewType.Root];
    
  }
}
