import { SDKType } from "../../../common/SDKType";
import { PackageContext } from "../PackageContext";

export type AzurePackageContext = PackageContext & {
    sdkType: SDKType;
    // apiVersionType: ApiVersionType;
  };
  