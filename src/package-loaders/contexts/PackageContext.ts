import { ApiViewType } from '../../common/ApiViewType';

export type ApiViewMap = {
  [key in ApiViewType]: Array<string>;
};

export interface PackageContext {
  name: string;
  version: string;
  apiView: ApiViewMap;
}
