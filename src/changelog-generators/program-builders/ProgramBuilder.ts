import { Program } from '../../common/types';

export interface ProgramBuilder<TNode> {
  build(codeBlock: string): Program<TNode> | Promise<Program<TNode>>;
}
