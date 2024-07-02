import { Method, Node, Operation, Program, Client, RawNode } from './context.types';

export type AzureOperation<TNode> = Method<TNode>;

export enum ClientType {
  HighLevelClient,
  RestLevelClient,
  ModularClient
}

export interface Location {
  getOrder: () => number | undefined;
}

export interface AzureRawNode<TNode> extends RawNode<TNode> {
  getLocation: () => Location | undefined;
}

export interface AzureOperationGroup<TNode> extends Node<TNode> {
  getOperations?: () => { [id: string]: Operation<TNode> };
}

export interface AzureClient<TNode> extends Client<TNode> {
  getType: () => ClientType;
}

export interface AzureMethod<TNode> extends Method<TNode> {
  path: () => string | undefined;
}

export interface AzureProgram<TNode> extends Program<TNode> {
  getOperationGroups?: () => { [name: string]: AzureOperationGroup<TNode> };
}
