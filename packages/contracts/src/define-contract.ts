type AxisMap = Record<string, readonly string[]>;

type Defaults<A extends AxisMap> = { [K in keyof A]: A[K][number] };

type AxisDocs<A extends AxisMap> = { [K in keyof A]: Record<A[K][number], string> };

// type PropType = 'string' | 'number' | 'boolean' | 'function' | 'enum';

type PropTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  function: (...args: any[]) => any;
  enum: string;
};

type PropGeneric<T extends keyof PropTypeMap, R extends boolean> = {
  description: string;
  type: T;
  typeValues?: T extends 'enum' ? string[] : never;
  required: R;
  default: R extends false ? PropTypeMap[T] : never;
  isVisualVariant: boolean;
};

type Prop = {
  [K in keyof PropTypeMap]: PropGeneric<K, true> | PropGeneric<K, false>;
}[keyof PropTypeMap];

type Framework = 'react' | 'angular';

type PerFramework<T> = Record<Framework, T>;

type ChildType = NewContract | 'any' | 'string';

export type NewContract = {
  name: PerFramework<string | string[]>;
  description: string;
  props?: Record<string, Prop>;
  children?: ChildType[];
};

type Contract<A extends AxisMap> = {
  props: A;
  defaults: Defaults<A>;
  docs: { description: string } & AxisDocs<A>;
};

/**
 * Declares a component contract. Constrains `defaults` to a value present in the
 * matching `props` array, and `docs` to a map covering exactly that array's options —
 * so a stray or missing option name is a compile error instead of silent drift.
 */
export function defineContract(contract: { docs: { description: string } }): Contract<{}>;
export function defineContract<const A extends AxisMap>(contract: {
  props: A;
  defaults: Defaults<A>;
  docs: { description: string } & AxisDocs<A>;
}): Contract<A>;
export function defineContract(contract: {
  props?: AxisMap;
  defaults?: Record<string, unknown>;
  docs: Record<string, unknown> & { description: string };
}): any {
  return {
    props: contract.props ?? {},
    defaults: contract.defaults ?? {},
    docs: contract.docs,
  };
}
