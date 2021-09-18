interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}

type Result = {
  asyncMethod<T, U>(input: T): Action<U>;
  syncMethod<T, U>(action: T): Action<U>;
};

interface Action<T> {
  payload?: T;
  type: string;
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type TransformMethod<T> = T extends (
  payload: Promise<infer T>
) => Promise<Action<infer U>>
  ? (input: T) => Action<U>
  : T extends (action: Action<infer T>) => Action<infer U>
  ? (action: T) => Action<U>
  : never;

type AsyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;

type PickFunctionProperty<T> = Pick<T, FunctionPropertyNames<T>>;

type ConnectType<T> = {
  [P in keyof T]: TransformMethod<T[P]>;
};

type Connect = (module: Module) => ConnectType<PickFunctionProperty<Module>>;

function f(a: string, b: string): string;
function f(a: number, b: number): number;
function f(a: string | number, b: string | number): string | number {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + (b as number); // error as b can be number | string
  }
}
type Simplify<T> = {
  [P in keyof T]: T[P];
};

type SetOptional<T extends object, Keys extends keyof T> = Simplify<
  {
    [K in Exclude<keyof T, Keys>]: K extends Keys ? never : T[K];
  } &
    {
      [K in Keys]?: T[K];
    }
>;
type Obj = {
  a: number;
  b: string;
  c?: number;
};

type X = SetOptional<Obj, 'a' | 'b'>;

type ConditionalKeys<T extends object, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never;
}[keyof T];

type ConditionalPick<T extends object, Condition> = Pick<
  T,
  ConditionalKeys<T, Condition>
>;
interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}

type StringKeysOnly = ConditionalPick<Example, string>;
type AppendArgument<F extends (...args: any[]) => any, A> = F extends (
  ...arg: infer P
) => infer R
  ? (x: A, ...args: P) => R
  : F;
type Fn = (a: number, b: string) => number;

type NaiveFlat<T extends any[]> = T extends { [k: number]: infer Value }
  ? Value extends any[]
    ? NaiveFlat<Value>
    : Value
  : never;

type A = ['b', 'c', ['a', 'd']];
type R = NaiveFlat<A>;

type EmptyObject = {
  [k in any]: never;
};

type SomeType = {
  prop: string;
};

type Exclusive<T, U extends T> = {
  [K in keyof U]: K extends keyof T ? U[K] : never;
};
function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
  return x;
}

type NonEmptyArray<T> = [T, ...T[]];

type TrimLeft<T extends string> = T extends ` ${infer K}` ? TrimLeft<K> : T;
type TrimRight<T extends string> = T extends `${infer K} ` ? TrimRight<K> : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;

type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

type Head<T extends Array<any>> = T extends [infer H, ...any[]] ? H : never;

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : T;

type Unshift<T extends any[], E> = [E, ...T]; // 你的实现代码

type Push<T extends any[], V> = [...T, V]; // 你的实现代码

type Includes<T extends Array<any>, E> = E extends NaiveFlat<T> ? true : false;

type UnionToIntersection<U> = (U extends any ? (a: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type OptionalKeys<T> = Exclude<
  {
    [K in keyof T]: undefined extends T[K] ? K : never;
  }[keyof T],
  undefined
>;

type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer Arg0, infer Arg1, ...infer Args]
  ? (arg: Arg0) => Curry<(arg: Arg1, ...args: Args) => R>
  : F;
