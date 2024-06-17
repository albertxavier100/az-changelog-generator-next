import { PackageVersionGenerator } from '../PackageVersionGenerator';
import path from 'path';
import fs from 'fs/promises';
import { SDKType } from '../../common/SDKType';
import { readFile, parseMarkdown, iterate } from '@azure-tools/openapi-tools-common';
import { ApiVersionType } from '../../common/ApiVersionType';

export class AzureHighLevelClientVersionGenerator implements PackageVersionGenerator {
  #packageRoot: string;
  constructor(packageRoot: string) {
    this.#packageRoot = packageRoot;
  }

  Generate(): string {
    return 'TODO version';
  }

  // async #readApiView(): Promise<void> {
  //   const root = '?????????????????';
  //   const reviewPath = path.join(root, 'review/');
  //   const files = await fs.readdir(reviewPath, { withFileTypes: true });
  //   if (files.length != 1) {
  //     throw new Error(`High level client should contains exactly 1 API view, but got ${files.length}`);
  //   }
  //   const apiViewPath = path.join(reviewPath, files[0].name);
  //   const content = await readFile(apiViewPath);
  //   const parsed = parseMarkdown(content.toString());
  //   const codeBlocks = new Set<string>();
  //   for (const node of iterate(parsed.markDown)) {
  //     if (node.type !== 'code_block' && node.info !== 'ts' && !node.literal) {
  //       continue;
  //     }
  //     codeBlocks.add(node.literal!);
  //   }
  // }
}
