import { SDKType } from '../../common/SDKType';
import { AzurePackageContext } from '../../package-loaders/azure/AzureHighLevelClientPackageLoader';
import { AzurePackageLoaderFactory } from '../../package-loaders/azure/AzurePackageLoaderFactory';

// TODO: add interface
export class AzureChanglogGenerator {
  #azurePackageLoaderFactory = new AzurePackageLoaderFactory();
  #latestPackageRoot: string;
  #upcomingPackageRoot: string;

  constructor(latestPackageRoot: string, upcomingPackageRoot: string) {
    this.#upcomingPackageRoot = upcomingPackageRoot;
    this.#latestPackageRoot = latestPackageRoot;
  }

  async generate(): Promise<string> {
    const upcomingContext = await this.#createPackageContext(this.#upcomingPackageRoot);
    const latestContext = await this.#createPackageContext(this.#latestPackageRoot);
    this.#ensureAzurePackageMigrationValid(latestContext.sdkType, upcomingContext.sdkType);
    // TODO
    return '';
  }

  async #createPackageContext(packageRootPath: string): Promise<AzurePackageContext> {
    const loader = await this.#azurePackageLoaderFactory.create(packageRootPath);
    const context = await loader.load();
    return context as AzurePackageContext;
  }

  #ensureAzurePackageMigrationValid(latestSdkType: SDKType, upcomingSDKType: SDKType): void {
    if (latestSdkType === upcomingSDKType) {
      return;
    }
    if (
      latestSdkType === upcomingSDKType ||
      (latestSdkType === SDKType.HighLevelClient && upcomingSDKType === SDKType.ModularClient) ||
      (latestSdkType === SDKType.Track1Client && upcomingSDKType === SDKType.HighLevelClient) ||
      (latestSdkType === SDKType.Track1Client && upcomingSDKType === SDKType.ModularClient)
    ) {
      return;
    }
    throw new Error(`Unsupported migration from ${latestSdkType} to ${upcomingSDKType}.\n`);
  }
}
