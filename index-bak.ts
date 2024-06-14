

// --------------------------------------------------------------
import { parse } from '@typescript-eslint/parser';
import { TSESTree } from '@typescript-eslint/types';
import { asyncReadFile, iterate, parseMarkdown } from "@azure-tools/openapi-tools-common";

class ChangelogEx {
    #oldApiViewPath: string;
    #newApiViewPath: string;
    // TODO: use right type
    #oldAST: any;7
    #newAST: any;

    constructor(oldApiViewPath: string, newApiViewPath: string) {
        this.#oldApiViewPath = oldApiViewPath;
        this.#newApiViewPath = newApiViewPath;
    }

    async #buildAST() {
        const oldCode = await this.#readCodeFromApiView(this.#oldApiViewPath);
        const newCode = await this.#readCodeFromApiView(this.#newApiViewPath);
        this.#oldAST = parse(oldCode);
        this.#newAST = parse(newCode);
        console.log("old ast", this.#oldAST)
        console.log("new ast", this.#newAST)
    }

    async #readCodeFromApiView(path: string): Promise<string> {
        const content = await asyncReadFile(path);
        const markdownEx = parseMarkdown(content.toString());
        let tsCode = "";
        for (const block of iterate(markdownEx.markDown)) {
            if (block.type === 'code_block' && block.info === 'ts' && block.literal) {
                tsCode += block.literal;
            }
        }
        return tsCode;
    }
}

const result = parse("const x = 1;");
console.log('result', result)

