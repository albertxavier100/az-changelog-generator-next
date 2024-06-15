import { program } from 'commander';
import { AzurePackageLoaderFactory } from './package-loaders/azure/AzurePackageLoaderFactory';

program
  .requiredOption('--latest-package-root <string>', 'latest package root')
  .requiredOption('--upcoming-package-root <string>', 'upcoming package root')
  .parse();
const options = program.opts();

// TODO: only support azure code gen client for now.
const azurePackageLoaderFactory = new AzurePackageLoaderFactory();
const upcomingPackageMeta = createAzurePackageMeta(options.upcomingPackageRoot);
const latestPackageMeta = createAzurePackageMeta(options.latestPackageRoot);
// TODO: to impl

// TODO: figure out a better name
async function createAzurePackageMeta(packageRootPath: string): Promise<void> {
  const loader = await azurePackageLoaderFactory.create(packageRootPath);
  // TODO: to impl
}
