const getMatrixSumList = (matrix: number[][]) => {
  for (let row of matrix) {
    for (let idx of row.keys()) row[idx] += row[idx - 1] ?? 0;
  }
  console.log(matrix);
  for (let i of matrix[0].keys()) {
    for (let j = i; j < matrix[0].length; j++) {
      const pres = [0];
      let pre = 0;
      for (let k of matrix.keys()) {
        pre += matrix[k][j] - (matrix[k][i - 1] ?? 0);
        pres.push(pre);
      }
      console.log(i, j);
      console.log(pres);
    }
  }
};

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8]
];

getMatrixSumList(matrix);
