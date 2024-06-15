import { TypeScriptCodeContext } from './TypeScriptCodeContext';

export interface TypeScriptCodeLoader {
  Load(): TypeScriptCodeContext;
}
