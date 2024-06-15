import { PackageContext } from './contexts/PackageContext';

export interface PackageLoader {
  load(): Promise<PackageContext>;
}
