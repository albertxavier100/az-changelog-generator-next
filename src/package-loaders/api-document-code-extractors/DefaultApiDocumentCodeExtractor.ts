import { readFile, parseMarkdown, iterate } from '@azure-tools/openapi-tools-common';
import { ApiDocumentCodeExtractor } from './ApiDocumentCodeExtractor';

export class DefaultApiDocumentCodeExtractor implements ApiDocumentCodeExtractor {
  async extract(path: string): Promise<Array<string>> {
    const content = await readFile(path);
    const parsed = parseMarkdown(content.toString());
    const codeBlocks = new Array<string>();
    for (const c of iterate(parsed.markDown)) {
      if (c.type === 'code_block' && c.info === 'ts' && c.literal) {
        codeBlocks.push(c.literal);
      }
    }
    return codeBlocks;
  }
}
