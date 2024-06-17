import path from 'path';
import { SDKType } from '../../../common/SDKType';

export function getRootApiDocumentPath(packageRoot: string, packageName: string, sdkType: SDKType): string {
  let scopeName = '';
  switch (sdkType) {
    case SDKType.HighLevelClient:
    case SDKType.ModularClient:
    case SDKType.Track1Client:
      scopeName = '@azure/';
      break;
    case SDKType.RestLevelClient:
      scopeName = '@azure-rest/';
      break;
    default:
      throw new Error(`Unknown SDK type: ${sdkType}`);
  }
  const unscopePackageName = packageName.substring(scopeName.length);
  const apiViewFileName = `${unscopePackageName}.api.md`;
  const apiDocPath = path.join(packageRoot, 'review', apiViewFileName);
  return apiDocPath;
}
