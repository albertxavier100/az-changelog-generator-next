import { PackageLoader } from '../PackageLoader';
import path from 'path';
import fs from 'fs/promises';
import { ApiViewMap, PackageContext } from '../contexts/PackageContext';
import { SDKType } from '../../common/SDKType';
import { ApiVersionType } from '../../common/ApiVersionType';
import { PackageVersionGenerator } from '../../package-version-generators/PackageVersionGenerator';
import { ApiDocumentCodeExtractor } from '../api-document-code-extractors/ApiDocumentCodeExtractor';
import { ApiViewType } from '../../common/ApiViewType';

// TODO: make it general for all kinds of azure codegen clients
export type AzurePackageContext = PackageContext & {
  sdkType: SDKType;
  // apiVersionType: ApiVersionType;
};

export class AzureHighLevelClientPackageLoader implements PackageLoader {
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

  async load(): Promise<AzurePackageContext> {
    const version = this.#versionGenerator.Generate();
    const apiDocumentPath = await this.#getApiDocumentPath();
    const codeBlocks = await this.#apiDocumentCodeExtractor.extract(apiDocumentPath);
    if (codeBlocks.length !== 1) {
      throw new Error(`High level client's API document should contains 1 code block, but got ${codeBlocks.length}`);
    }
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

  async #getApiDocumentPath(): Promise<string> {
    const reviewPath = path.join(this.#packageRoot, 'review');
    const files = await fs.readdir(reviewPath, { withFileTypes: true });
    if (files.length != 1) {
      throw new Error(`High level client should contains exactly 1 API document, but got ${files.length}`);
    }
    const apiDocumentPath = path.join(reviewPath, files[0].name);
    return apiDocumentPath;
  }
}
