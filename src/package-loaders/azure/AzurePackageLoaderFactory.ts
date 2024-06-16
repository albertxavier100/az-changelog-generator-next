import { SDKType } from '../../common/SDKType';
import { loadPackageJson } from '../../common/utils';
import { PackageLoader } from '../PackageLoader';
import { PackageLoaderFactory } from '../PackageLoaderFactory';
import path from 'path';
import { AzureHighLevelClientPackageLoader } from './AzureHighLevelClientPackageLoader';
import { AzureHighLevelClientVersionGenerator } from '../../package-version-generators/azure/AzureHighLevelClientVersionGenerator';

export class AzurePackageLoaderFactory implements PackageLoaderFactory {
  constructor() {}

  async create(packageRoot: string): Promise<PackageLoader> {
    const packageJsonPath = path.join(packageRoot, 'package.json');
    const parsed = await loadPackageJson(packageJsonPath);
    const sdkType = this.#getSdkType(parsed);

    // TODO: add other client package loader
    switch (sdkType) {
      case SDKType.HighLevelClient:
        const apiRelationGenerator = null;
        const changelogFormatter = null;
        const versionGenerator = new AzureHighLevelClientVersionGenerator(packageRoot);
        return new AzureHighLevelClientPackageLoader(versionGenerator, apiRelationGenerator, changelogFormatter);
      case SDKType.ModularClient:
      case SDKType.RestLevelClient:
      case SDKType.Track1Client:
      default:
        throw new Error(`Not supported sdk type: ${sdkType}`);
    }
  }

  #getSdkType(packageJson: { [id: string]: string }): SDKType {
    const isTrack1Client = !('sdk-type' in packageJson);
    if (isTrack1Client) {
      return SDKType.Track1Client;
    }
    const npmSdkType = packageJson['sdk-type'];
    if (npmSdkType !== 'mgmt' && npmSdkType !== 'client') {
      throw new Error(`Not supported NPM SDK Type '${npmSdkType}'`);
    }
    if (npmSdkType === 'mgmt') {
      return SDKType.HighLevelClient;
    }
    // npmSdkType === "client"
    {
      const packageName = packageJson.name;
      const isRestLevelClient = packageName.startsWith('@azure-rest/');
      return isRestLevelClient ? SDKType.RestLevelClient : SDKType.ModularClient;
    }
  }
}