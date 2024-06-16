import { PackageLoader } from '../PackageLoader';
import path from 'path';
import fs from 'fs/promises';
import { PackageContext } from '../contexts/PackageContext';
import { SDKType } from '../../common/SDKType';
import { readFile, parseMarkdown, iterate } from '@azure-tools/openapi-tools-common';
import { ApiVersionType } from '../../common/ApiVersionType';
import { PackageVersionGenerator } from '../../package-version-generators/PackageVersionGenerator';

export type AzureHighLevelClientPackageContext = PackageContext & {
  sdkType: string;
  apiVersionType: ApiVersionType;
};

export class AzureHighLevelClientPackageLoader implements PackageLoader {

  #versionGenerator: PackageVersionGenerator;
  constructor(versionGenerator: PackageVersionGenerator) {
    this.#versionGenerator = versionGenerator;
  }

  async load(): Promise<PackageContext> {
    const version = this.#versionGenerator.Generate();
    const name = "";
    return { name, version };
  }

  
}
