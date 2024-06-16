import { ApiViewContext } from './ApiViewLoader';

export interface ApiViewLoader {
  Load(): Promise<ApiViewContext>;
}
