/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  RoleAssignmentCommonProperties,
  MicrosoftNetworkAnalytics
} from "@azure/arm-networkanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Assign role to the data product.
 *
 * @summary Assign role to the data product.
 * x-ms-original-file: specification/networkanalytics/resource-manager/Microsoft.NetworkAnalytics/stable/2023-11-15/examples/DataProducts_AddUserRole_MaximumSet_Gen.json
 */
async function dataProductsAddUserRoleMaximumSetGen() {
  const subscriptionId =
    process.env["NETWORKANALYTICS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-00000000000";
  const resourceGroupName =
    process.env["NETWORKANALYTICS_RESOURCE_GROUP"] || "aoiresourceGroupName";
  const dataProductName = "dataproduct01";
  const body: RoleAssignmentCommonProperties = {
    dataTypeScope: ["scope"],
    principalId: "00000000-0000-0000-0000-00000000000",
    principalType: "User",
    role: "Reader",
    roleId: "00000000-0000-0000-0000-00000000000",
    userName: "UserName"
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftNetworkAnalytics(credential, subscriptionId);
  const result = await client.dataProducts.addUserRole(
    resourceGroupName,
    dataProductName,
    body
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Assign role to the data product.
 *
 * @summary Assign role to the data product.
 * x-ms-original-file: specification/networkanalytics/resource-manager/Microsoft.NetworkAnalytics/stable/2023-11-15/examples/DataProducts_AddUserRole_MinimumSet_Gen.json
 */
async function dataProductsAddUserRoleMaximumSetGenGeneratedByMinimumSetRuleMinimumSetGen() {
  const subscriptionId =
    process.env["NETWORKANALYTICS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-00000000000";
  const resourceGroupName =
    process.env["NETWORKANALYTICS_RESOURCE_GROUP"] || "aoiresourceGroupName";
  const dataProductName = "dataproduct01";
  const body: RoleAssignmentCommonProperties = {
    dataTypeScope: ["scope"],
    principalId: "00000000-0000-0000-0000-00000000000",
    principalType: "User",
    role: "Reader",
    roleId: "00000000-0000-0000-0000-00000000000",
    userName: "userName"
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftNetworkAnalytics(credential, subscriptionId);
  const result = await client.dataProducts.addUserRole(
    resourceGroupName,
    dataProductName,
    body
  );
  console.log(result);
}

async function main() {
  dataProductsAddUserRoleMaximumSetGen();
  dataProductsAddUserRoleMaximumSetGenGeneratedByMinimumSetRuleMinimumSetGen();
}

main().catch(console.error);
