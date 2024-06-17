import { PackageLoader } from '../PackageLoader';
import path from 'path';
import fs from 'fs/promises';
import { ApiViewMap, PackageContext } from '../contexts/PackageContext';
import { SDKType } from '../../common/SDKType';
import { ApiVersionType } from '../../common/ApiVersionType';
import { PackageVersionGenerator } from '../../package-version-generators/PackageVersionGenerator';
import { ApiDocumentCodeExtractor } from '../api-document-code-extractors/ApiDocumentCodeExtractor';
import { ApiViewType } from '../../common/ApiViewType';
import { AzurePackageContext } from '../contexts/azure/AzurePackageContext';
import { getRootApiDocumentPath } from './common/utils';

export class AzureRestLevelClientPackageLoader implements PackageLoader {
  #versionGenerator: PackageVersionGenerator;
  #apiDocumentCodeExtractor: ApiDocumentCodeExtractor;
  #packageRoot: string;
  #packageName: string;
  #sdkType: SDKType;

  constructor(
    packageRoot: string,
    packageName: string,
    sdkType: SDKType,
    versionGenerator: PackageVersionGenerator,
    apiDocumentCodeExtractor: ApiDocumentCodeExtractor
  ) {
    this.#packageRoot = packageRoot;
    this.#packageName = packageName;
    this.#sdkType = sdkType;
    this.#versionGenerator = versionGenerator;
    this.#apiDocumentCodeExtractor = apiDocumentCodeExtractor;
  }

  // TODO: consider reuse with high level client package loader
  async load(): Promise<AzurePackageContext> {
    const version = this.#versionGenerator.Generate();
    const apiDocumentPath = getRootApiDocumentPath(this.#packageRoot, this.#packageName, this.#sdkType);
    const codeBlocks = await this.#apiDocumentCodeExtractor.extract(apiDocumentPath);
    const name = this.#packageName;
    const sdkType = this.#sdkType;
    const apiView: ApiViewMap = {
      [ApiViewType.Root]: codeBlocks,
      [ApiViewType.ModelLayer]: [],
      [ApiViewType.ApiLayer]: [],
      [ApiViewType.RestLayer]: []
    };
    return { name, version, apiView, sdkType };
  }
}
