enum CharType {
  CHAR_NUMBER,
  CHAR_POINT,
  CHAR_SPACE,
  CHAR_EXP,
  CHAR_SIGN,
  CHAR_ILLEGAL,
}

enum State {
  STATE_INITAL,
  STATE_INT_SIGN,
  STATE_INTEGER,
  STATE_POINT,
  STATE_POINT_WITHOUT_INT,
  STATE_FLOAT,
  STATE_EXP,
  STATE_EXP_SIGN,
  STATE_EXP_NUMBER,
  STATE_END,
}

const ValidatorMap = new Map([
  [/\d/, CharType.CHAR_NUMBER],
  [/\./, CharType.CHAR_POINT],
  [/\s/, CharType.CHAR_SPACE],
  [/e/i, CharType.CHAR_EXP],
  [/[\+-]/, CharType.CHAR_SIGN],
]);

const TransferMap = new Map<State, Map<CharType, State>>([
  [
    State.STATE_INITAL,
    new Map<CharType, State>([
      [CharType.CHAR_SPACE, State.STATE_INITAL],
      [CharType.CHAR_SIGN, State.STATE_INT_SIGN],
      [CharType.CHAR_NUMBER, State.STATE_INTEGER],
      [CharType.CHAR_POINT, State.STATE_POINT_WITHOUT_INT],
    ]),
  ],
  [
    State.STATE_INT_SIGN,
    new Map<CharType, State>([
      [CharType.CHAR_NUMBER, State.STATE_INTEGER],
      [CharType.CHAR_POINT, State.STATE_POINT_WITHOUT_INT],
    ]),
  ],
  [
    State.STATE_INTEGER,
    new Map<CharType, State>([
      [CharType.CHAR_NUMBER, State.STATE_INTEGER],
      [CharType.CHAR_SPACE, State.STATE_END],
      [CharType.CHAR_EXP, State.STATE_EXP],
      [CharType.CHAR_POINT, State.STATE_POINT],
    ]),
  ],
  [
    State.STATE_POINT,
    new Map<CharType, State>([
      [CharType.CHAR_NUMBER, State.STATE_FLOAT],
      [CharType.CHAR_EXP, State.STATE_EXP],
      [CharType.CHAR_SPACE, State.STATE_END],
    ]),
  ],
  [
    State.STATE_POINT_WITHOUT_INT,
    new Map<CharType, State>([[CharType.CHAR_NUMBER, State.STATE_FLOAT]]),
  ],
  [
    State.STATE_FLOAT,
    new Map<CharType, State>([
      [CharType.CHAR_NUMBER, State.STATE_FLOAT],
      [CharType.CHAR_EXP, State.STATE_EXP],
      [CharType.CHAR_SPACE, State.STATE_END],   
    ]),
  ],
  [
    State.STATE_EXP,
    new Map<CharType, State>([
      [CharType.CHAR_SIGN, State.STATE_EXP_SIGN],
      [CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER],
    ]),
  ],
  [
    State.STATE_EXP_SIGN,
    new Map<CharType, State>([[CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER]]),
  ],
  [
    State.STATE_EXP_NUMBER,
    new Map<CharType, State>([
      [CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER],
      [CharType.CHAR_SPACE, State.STATE_END],
    ]),
  ],
  [
    State.STATE_END,
    new Map<CharType, State>([[CharType.CHAR_SPACE, State.STATE_END]]),
  ],
]);

const toCharType = (input: string): CharType => {
  for (let [reg, charType] of ValidatorMap) {
    if (reg.test(input)) return charType;
  }
  return CharType.CHAR_ILLEGAL;
};

const isNumber = (input: string) => {
  const length = input.length + 1;
  const _input = `${input} `;
  const dfs = (idx = 0, state = State.STATE_INITAL): boolean => {
    if (idx === length) return state === State.STATE_END;
    const tranfer = TransferMap.get(state)!;
    const charType = toCharType(_input[idx]);
    if (charType === CharType.CHAR_ILLEGAL || !tranfer.has(charType))
      return false;
    return dfs(idx + 1, tranfer.get(charType));
  };
  return dfs();
};

console.log(isNumber(' .1 '));
