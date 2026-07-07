type AxisMap = Record<string, readonly string[]>;

type Defaults<A extends AxisMap> = { [K in keyof A]: A[K][number] };

type AxisDocs<A extends AxisMap> = { [K in keyof A]: Record<A[K][number], string> };

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
