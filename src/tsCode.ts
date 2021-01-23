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
