export interface EqualsTo<T> {
  equalsTo(other: T): boolean;
}
export interface Interface extends EqualsTo<Interface> {
  equalsTo(other: Interface): boolean;
}

export interface Type extends EqualsTo<Interface> {
  equalsTo(other: Type): boolean;
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
