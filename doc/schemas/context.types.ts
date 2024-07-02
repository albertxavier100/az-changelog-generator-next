export type Property<TNode> = Interface<TNode>;
export type Parameter<TNode> = Interface<TNode>;
export type Response<TNode> = Interface<TNode>;
export type Operation<TNode> = Method<TNode>;

export interface RawNode<TNode> {
  getNode: () => TNode | undefined;
}

export interface Node<TNode> extends RawNode<TNode> {
  getName: () => string | undefined;
  generateId: () => string;
}

export interface Modifiers {
  getOptional: () => boolean;
  getReadonly: () => boolean;
  getStatic: () => boolean;
}

export interface Interface<TNode> extends Node<TNode>, Modifiers {}

export interface Method<TNode> extends Node<TNode>, Modifiers {
  getSignature: () => string;
  getParameters: () => { [id: string]: Parameter<TNode> };
  getResponses: () => { [id: string]: Response<TNode> };
}

export interface Client<TNode> extends Node<TNode> {
  getProperties: () => { [name: string]: Property<TNode> } | undefined;
  getMethods: () => { [id: string]: Method<TNode> } | undefined;
}

export interface Program<TNode> extends Node<TNode> {
  getClients: () => { [id: string]: Client<TNode> } | undefined;
  getOperations: () => { [id: string]: Operation<TNode> } | undefined;
}
