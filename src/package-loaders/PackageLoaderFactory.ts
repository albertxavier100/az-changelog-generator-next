import { PackageLoader } from './PackageLoader';

export interface PackageLoaderFactory {
  create(packageRoot: string): Promise<PackageLoader>;
}
