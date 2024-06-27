// TODO: remove TSESTree possible?
import { FunctionDeclaration, TSTypeAnnotation } from '@typescript-eslint/types/dist/generated/ast-spec';

export interface EqualsTo {
  equalsTo<T>(other: T): boolean;
}
export class Interface implements EqualsTo {
  #declaration: FunctionDeclaration;
  constructor(declaration: FunctionDeclaration) {
    this.#declaration = declaration;
  }

  equalsTo<Interface>(other: Interface): boolean {
    // const _ = this.#declaration;
    throw new Error('Not implemented');
  }
}

export class Type implements EqualsTo {
  #annotation: TSTypeAnnotation;
  constructor(annotation: TSTypeAnnotation) {
    this.#annotation = annotation;
  }

  equalsTo<Type>(other: Type): boolean {
    // const _ = this.#annotation;
    throw new Error('Not implemented');
  }
}

export interface Property {
  name: string;
  type: Type;
  optional: boolean;
}

export interface Operation {
  name: string;
  path: string | null;
  parameters: Property[];
  responses: { [id: string]: Interface };
}

export interface OperationGroup {
  name: string;
  operations: { [id: string]: Operation };
}

export interface Client {
  type: 'Modular' | 'Rest' | 'High';
  properties: { [id: string]: Property };
  operation: { [id: string]: Operation };
  optional: boolean;
  readonly: boolean;
  static: boolean;
}

export interface ClientMetaData {
  client: Client;
  operations: { [id: string]: Operation };
  operationGroups: { [id: string]: OperationGroup };
}

// high level client ----------------------------------------------------------------------------------
/*
e.g. arm-compute

// declare
export interface LogAnalytics {
    beginExportRequestRateByInterval(location: string, parameters: RequestRateByIntervalInput, options?: LogAnalyticsExportRequestRateByIntervalOptionalParams): Promise<SimplePollerLike<OperationState<LogAnalyticsExportRequestRateByIntervalResponse>, LogAnalyticsExportRequestRateByIntervalResponse>>;
}

// sample
const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.beginExportThrottledRequestsAndWait(
    location,
    parameters,
  );
  console.log(result);
}

*/

// modular level client ----------------------------------------------------------------------------------
/*
e.g. openai_generic

// @public (undocumented)
export interface EmbeddingsOperations {
    // (undocumented)
    create: (embedding: CreateEmbeddingRequest, options?: EmbeddingsCreateOptionalParams) => Promise<CreateEmbeddingResponse>;
}

const response = await client.embeddings.create(embedding);
*/

// rest level client ----------------------------------------------------------------------------------

/*
e.g. arm-servicefabric-rest
// operation
export interface ClustersGet {
    options?: ClustersGetParameters
  ): StreamableMethod<ClustersGet200Response | ClustersGetdefaultResponse>;
  put(
    options: ClustersCreateOrUpdateParameters
  ): StreamableMethod<
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdatedefaultResponse
  >;

  // sample
  const initialResponse = await client.path(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
    subscriptionId,
    resourceGroupName,
    clusterName
  ).put(parameters);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
...
}
*/
