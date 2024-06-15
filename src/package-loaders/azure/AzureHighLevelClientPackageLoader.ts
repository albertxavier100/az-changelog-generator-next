import { PackageLoader } from '../PackageLoader';
import path from 'path';
import fs from 'fs/promises';
import { PackageContext } from '../contexts/PackageContext';
import { SDKType } from '../../common/SDKType';

export type AzureHighLevelClientPackageContext = PackageContext & { sdkType: string };
export class AzureHighLevelClientPackageLoader implements PackageLoader {
  readonly #root: string;
  readonly #sdkType: SDKType;

  constructor(root: string, sdkType: SDKType) {
    this.#root = root;
    this.#sdkType = sdkType;
  }

  async load(): Promise<AzureHighLevelClientPackageContext> {
    throw new Error('not impl');
  }
}
