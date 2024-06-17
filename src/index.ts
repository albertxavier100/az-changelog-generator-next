import { program } from 'commander';
import { AzureChanglogGenerator } from './changelog-generators/azure/AzureChanglogGenerator';

program
  .requiredOption('--latest-package-root <string>', 'latest package root')
  .requiredOption('--upcoming-package-root <string>', 'upcoming package root')
  .parse();
const options = program.opts();

const generator = new AzureChanglogGenerator(options.latestPackageRoot, options.upcomingPackageRoot);
generator.generate();
