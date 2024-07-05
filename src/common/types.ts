export type Property<TNode> = Interface<TNode>;
export type Operation<TNode> = Method<TNode>;

export interface RawNode<TNode> {
  getNode: (() => TNode) | undefined;
}

export interface Node<TNode> extends RawNode<TNode> {
  getName: (() => string) | undefined;
  generateId: () => string;
}

export interface Modifiers {
  getOptional: () => boolean;
  getReadonly: () => boolean;
  getStatic: () => boolean;
}

export interface Interface<TNode> extends Node<TNode>, Modifiers {}

export interface Request<TNode> extends Interface<TNode> {
  getParameters: () => { [id: string]: Property<TNode> };
}

export interface Response<TNode> extends Interface<TNode> {
  getParameters: () => { [id: string]: Property<TNode> };
}

export interface Method<TNode> extends Interface<TNode> {
  getSignature: () => string;
  getRequests: () => { [id: string]: Request<TNode> };
  getResponses: () => { [id: string]: Response<TNode> };
}

export interface Client<TNode> extends Node<TNode> {
  getProperties: (() => { [name: string]: Property<TNode> }) | undefined;
  getMethods: (() => { [id: string]: Method<TNode> }) | undefined;
}

export interface Program<TNode> extends Node<TNode> {
  getClients: (() => { [id: string]: Client<TNode> }) | undefined;
  getOperations: (() => { [id: string]: Operation<TNode> }) | undefined;
}

export interface RuleDefinition<N extends string, I extends ReportItems, TNode> {
  /** Rule name (without the library name) */
  name: N;
  /** Short description of the rule */
  description: string;
  /** Specifies the URL at which the full documentation can be accessed. */
  url?: string;
  /** Rule type */
  type: RuleType;
  /** Items that can be reported. */
  reportItems: I;
  /** Creator */
  create(context: RuleContext<I, TNode>): SemanticNodeListener<TNode>;
}

export function createRule<const N extends string, const T extends ReportItems, TNode>(
  definition: RuleDefinition<N, T, TNode>
) {
  // compilerAssert(!definition.name.includes('/'), "Rule name cannot contain a '/'.");
  return definition;
}

export enum RuleType {
  /** The change is regarded as breaking change */
  Breaking,
  /** The change is regarded as non-breaking change */
  NonBreaking
}

export interface RuleContext<I extends ReportItems, TNode> {
  readonly program: Program<TNode>;
  reportItem<M extends keyof I>(diag: RuleReportItem<I, M>): void;
}

export interface DetectionDefinition<TNode> {
  rules: RuleDefinition<string, ReportItems, TNode>[];
  ruleSets?: Record<string, RuleSet>;
}

export type RuleRef = `${string}/${string}`;
export interface RuleSet {
  /** Other ruleset this ruleset extends */
  extends?: RuleRef[];

  /** Rules to enable/configure */
  enable?: Record<RuleRef, boolean>;

  /** Rules to disable. A rule CANNOT be in enable and disable map. */
  disable?: Record<RuleRef, string>;
}

// -----------------------------------------------------------------------------------

//#region details
/** Diagnostic target that can be used when working with TypeSpec types.  */
type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (k: infer I) => void ? I : never;

// TODO
export interface BaseType {
  kind: string;
}
export interface TypeA extends BaseType {}
export interface TypeB extends BaseType {}
export type Type = TypeA | TypeB;

export enum ListenerFlow {
  /**
   * Do not navigate any containing or referenced type.
   */
  NoRecursion = 1
}

export type TypeListener<T> = (context: T) => ListenerFlow | undefined | void;
export type exitListener<T extends string | number | symbol> = T extends string ? `exit${T}` : T;

export type ListenerForType<T extends Type> = T extends Type
  ? { [k in Uncapitalize<T['kind']> | exitListener<T['kind']>]?: TypeListener<T> }
  : never;

export type TypeListeners = UnionToIntersection<ListenerForType<Type>>;

export type SemanticNodeListener<TNode> = {
  root?: (context: Program<TNode>) => void | undefined;
} & TypeListeners;

export interface CallableItem<T extends string[]> {
  keys: T;
  (dict: Record<T[number], string>): void;
}

export interface ReportItems {
  readonly [id: string]: Record<string, string>;
}

export type RuleReportItem<T extends ReportItems, M extends keyof T = 'default'> = Target;

// TODO
export interface Target {}
//#endregion
