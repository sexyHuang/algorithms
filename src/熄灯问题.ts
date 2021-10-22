import { Matrix } from 'ml-matrix';

type LightVector = number[];
type ActionVactor = LightVector;

const dfs = (n: number): ActionVactor[] => {
  if (n === 1) return [[0], [1]];
  const _res = dfs(n - 1);
  return [0, 1]
    .map(val => _res.map(list => [val, ...list]))
    .flat(1) as ActionVactor[];
};

function turnLights(
  lightVector: LightVector,
  actionVector: ActionVactor,
  switchRelationLocationVector = [-1, 0, 1]
) {
  lightVector = [...lightVector];
  for (let [i, action] of actionVector.entries()) {
    if (!action) continue;
    switchRelationLocationVector.forEach(rLoc => {
      const _i = i + rLoc;
      if (_i >= 0 && _i < lightVector.length) lightVector[i + rLoc] ^= 1;
    });
  }
  return lightVector;
}
function lightSwitch(lightMatrix: Matrix): Matrix {
  if (lightMatrix.rows < lightMatrix.columns) {
    return lightSwitch(lightMatrix.transpose()).transpose();
  }
  const startActionMatrix = dfs(lightMatrix.columns);
  for (let actionVector of startActionMatrix) {
    let i = 0;
    const res: ActionVactor[] = [];
    let lightVector = lightMatrix.getRow(i);
    const length = lightMatrix.rows;
    while (i < length) {
      res.push(actionVector);
      let _actionVector = actionVector;
      actionVector = turnLights(lightVector, actionVector);
      i += 1;
      if (i < length)
        lightVector = turnLights(lightMatrix.getRow(i), _actionVector, [0]);
    }

    if (actionVector.every(light => !light)) return new Matrix(res);
  }
  return new Matrix([]);
}
const lightMatrix = [
  [0, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 0]
];

function turnLightsBit(
  lightBit: number,
  actionBit: number,
  bitLength: number,
  shifts = [-1, 0, 1]
) {
  return (
    shifts.reduce(
      (lightBit, shift) =>
        lightBit ^ (shift < 0 ? actionBit << (shift * -1) : actionBit >> shift),
      lightBit
    ) &
    (2 ** bitLength - 1)
  );
}

function logBit(vector: number[], length: number) {
  console.log(vector.map(val => val.toString(2).padStart(length, '0')));
}

function turnoffLightsBit(matrix: number[][]) {
  const bitLength = matrix[0].length;
  const lightBitVector = matrix.map(vector =>
    vector.reduce(
      (prev, curr, currIdx) => curr * 2 ** (vector.length - 1 - currIdx) + prev,
      0
    )
  );
  for (let startAction = 0; startAction < 2 ** bitLength; startAction++) {
    const res = lightBitVector.reduce(
      (actions, lightBit, i) => [
        ...actions,
        turnLightsBit(lightBit ^ (actions[i - 1] ?? 0), actions[i], bitLength)
      ],
      [startAction]
    );

    if (!res.pop()) return res;
  }
  return [];
}

logBit(turnoffLightsBit(lightMatrix), 6);
