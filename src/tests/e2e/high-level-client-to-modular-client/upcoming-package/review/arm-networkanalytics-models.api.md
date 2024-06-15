## API Report File for "@azure/arm-networkanalytics"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { OperationOptions } from '@azure-rest/core-client';

// @public
export interface AccountSas {
    expiryTimeStamp: Date;
    ipAddress: string;
    startTimeStamp: Date;
}

// @public
export interface AccountSasToken {
    storageAccountSasToken: string;
}

// @public
export type ActionType = string;

// @public
export interface ArmOperationStatus {
    readonly endTime?: Date;
    readonly error?: ErrorDetail;
    readonly name?: string;
    readonly percentComplete?: number;
    readonly startTime?: Date;
    status: ResourceProvisioningState;
}

// @public
export interface ConsumptionEndpointsProperties {
    readonly fileAccessResourceId?: string;
    readonly fileAccessUrl?: string;
    readonly ingestionResourceId?: string;
    readonly ingestionUrl?: string;
    readonly queryResourceId?: string;
    readonly queryUrl?: string;
}

// @public
export interface ContainerSaS {
    expiryTimeStamp: Date;
    ipAddress: string;
    startTimeStamp: Date;
}

// @public
export interface ContainerSasToken {
    storageContainerSasToken: string;
}

// @public
export type ContinuablePage<TElement, TPage = TElement[]> = TPage & {
    continuationToken?: string;
};

// @public
export type ControlState = string;

// @public
export type CreatedByType = string;

// @public
export interface DataProduct extends TrackedResource {
    identity?: ManagedServiceIdentity;
    properties?: DataProductProperties;
}

// @public
export interface DataProductInformation {
    dataProductName: string;
    dataProductVersions: DataProductVersion[];
    description: string;
}

// @public
export interface DataProductListResult {
    nextLink?: string;
    value: DataProduct[];
}

// @public
export interface DataProductNetworkAcls {
    allowedQueryIpRangeList: string[];
    defaultAction: DefaultAction;
    ipRules: IPRules[];
    virtualNetworkRule: VirtualNetworkRule[];
}

// @public
export interface DataProductProperties {
    readonly availableMinorVersions?: string[];
    readonly consumptionEndpoints?: ConsumptionEndpointsProperties;
    currentMinorVersion?: string;
    customerEncryptionKey?: EncryptionKeyDetails;
    customerManagedKeyEncryptionEnabled?: ControlState;
    readonly documentation?: string;
    readonly keyVaultUrl?: string;
    majorVersion: string;
    managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
    networkacls?: DataProductNetworkAcls;
    owners?: string[];
    privateLinksEnabled?: ControlState;
    product: string;
    readonly provisioningState?: ProvisioningState;
    publicNetworkAccess?: ControlState;
    publisher: string;
    purviewAccount?: string;
    purviewCollection?: string;
    redundancy?: ControlState;
    readonly resourceGuid?: string;
}

// @public (undocumented)
export interface DataProductsAddUserRoleOptionalParams extends OperationOptions {
}

// @public
export interface DataProductsCatalog extends ProxyResource {
    properties?: DataProductsCatalogProperties;
}

// @public
export interface DataProductsCatalogListResult {
    nextLink?: string;
    value: DataProductsCatalog[];
}

// @public
export interface DataProductsCatalogProperties {
    readonly provisioningState?: ProvisioningState;
    publishers: PublisherInformation[];
}

// @public (undocumented)
export interface DataProductsCatalogsGetOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsCatalogsListByResourceGroupOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsCatalogsListBySubscriptionOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsCreateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataProductsDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataProductsGenerateStorageAccountSasTokenOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsGetOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsListByResourceGroupOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsListBySubscriptionOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsListRolesAssignmentsOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsRemoveUserRoleOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsRotateKeyOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface DataProductUpdate {
    identity?: ManagedServiceIdentity;
    // (undocumented)
    properties?: DataProductUpdateProperties;
    tags?: Record<string, string>;
}

// @public
export interface DataProductUpdateProperties {
    currentMinorVersion?: string;
    owners?: string[];
    privateLinksEnabled?: ControlState;
    purviewAccount?: string;
    purviewCollection?: string;
}

// @public
export type DataProductUserRole = string;

// @public
export interface DataProductVersion {
    version: string;
}

// @public
export interface DataType extends ProxyResource {
    properties?: DataTypeProperties;
}

// @public
export interface DataTypeListResult {
    nextLink?: string;
    value: DataType[];
}

// @public
export interface DataTypeProperties {
    databaseCacheRetention?: number;
    databaseRetention?: number;
    readonly provisioningState?: ProvisioningState;
    state?: DataTypeState;
    readonly stateReason?: string;
    storageOutputRetention?: number;
    readonly visualizationUrl?: string;
}

// @public (undocumented)
export interface DataTypesCreateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataTypesDeleteDataOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataTypesDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataTypesGenerateStorageContainerSasTokenOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataTypesGetOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataTypesListByDataProductOptionalParams extends OperationOptions {
}

// @public
export type DataTypeState = string;

// @public (undocumented)
export interface DataTypesUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface DataTypeUpdate {
    // (undocumented)
    properties?: DataTypeUpdateProperties;
}

// @public
export interface DataTypeUpdateProperties {
    databaseCacheRetention?: number;
    databaseRetention?: number;
    state?: DataTypeState;
    storageOutputRetention?: number;
}

// @public
export type DefaultAction = string;

// @public
export interface EncryptionKeyDetails {
    keyName: string;
    keyVaultUri: string;
    keyVersion: string;
}

// @public
export interface ErrorAdditionalInfo {
    readonly info?: Record<string, any>;
    readonly type?: string;
}

// @public
export interface ErrorDetail {
    readonly additionalInfo?: ErrorAdditionalInfo[];
    readonly code?: string;
    readonly details?: ErrorDetail[];
    readonly message?: string;
    readonly target?: string;
}

// @public
export interface ErrorResponse {
    error?: ErrorDetail;
}

// @public
export interface IPRules {
    action: string;
    value?: string;
}

// @public
export interface KeyVaultInfo {
    keyVaultUrl: string;
}

// @public
export interface ListRoleAssignments {
    count: number;
    roleAssignmentResponse: RoleAssignmentDetail[];
}

// @public
export interface ManagedResourceGroupConfiguration {
    location: string;
    name: string;
}

// @public
export interface ManagedServiceIdentity {
    readonly principalId?: string;
    readonly tenantId?: string;
    type: ManagedServiceIdentityType;
    userAssignedIdentities?: UserAssignedIdentities;
}

// @public
export type ManagedServiceIdentityType = string;

// @public
export interface Operation {
    actionType?: ActionType;
    display?: OperationDisplay;
    readonly isDataAction?: boolean;
    readonly name?: string;
    readonly origin?: Origin;
}

// @public
export interface OperationDisplay {
    description?: string;
    operation?: string;
    provider?: string;
    resource?: string;
}

// @public (undocumented)
export interface OperationsListOptionalParams extends OperationOptions {
}

// @public
export type Origin = string;

// @public
export interface PagedAsyncIterableIterator<TElement, TPage = TElement[], TPageSettings extends PageSettings = PageSettings> {
    [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage, TPageSettings>;
    byPage: (settings?: TPageSettings) => AsyncIterableIterator<ContinuablePage<TElement, TPage>>;
    next(): Promise<IteratorResult<TElement>>;
}

// @public
export interface PagedOperation {
    nextLink?: string;
    value: Operation[];
}

// @public
export interface PageSettings {
    continuationToken?: string;
}

// @public
export type ProvisioningState = string;

// @public
export interface ProxyResource extends Resource {
}

// @public
export interface PublisherInformation {
    dataProducts: DataProductInformation[];
    publisherName: string;
}

// @public
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export type ResourceProvisioningState = string;

// @public
export interface RoleAssignmentCommonProperties {
    dataTypeScope: string[];
    principalId: string;
    principalType: string;
    role: DataProductUserRole;
    roleId: string;
    userName: string;
}

// @public
export interface RoleAssignmentDetail {
    dataTypeScope: string[];
    principalId: string;
    principalType: string;
    role: DataProductUserRole;
    roleAssignmentId: string;
    roleId: string;
    userName: string;
}

// @public
export interface SystemData {
    readonly createdAt?: Date;
    readonly createdBy?: string;
    readonly createdByType?: CreatedByType;
    readonly lastModifiedAt?: Date;
    readonly lastModifiedBy?: string;
    readonly lastModifiedByType?: CreatedByType;
}

// @public
export interface TrackedResource extends Resource {
    location: string;
    tags?: Record<string, string>;
}

// @public
export interface UserAssignedIdentities extends Record<string, UserAssignedIdentity> {
}

// @public
export interface UserAssignedIdentity {
    clientId?: string;
    principalId?: string;
}

// @public (undocumented)
export type Versions = "2023-11-15";

// @public
export interface VirtualNetworkRule {
    action?: string;
    id: string;
    state?: string;
}

// (No @packageDocumentation comment for this package)

```