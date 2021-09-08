function prefix_function(s: string) {
  const tr = Array.from(
    {
      length: s.length
    },
    () => 0
  );
  let j = 0;
  for (let i = 1; i < s.length; i++) {
    j = tr[i - 1];
    while (j > 0 && s[i] !== s[j]) {
      j = tr[j - 1];
    }
    if (s[i] === s[j]) tr[i] = j + 1;
  }
  console.log(tr);
  return tr;
}

export default {};

function kmp(target: string, s: string) {
  const next = [-1, ...prefix_function(target)];
  let j = next[0];
  let i = 0;
  while (i < s.length) {
    if (j < 0 || target[j] === s[i]) {
      j++;
      i++;
      if (j === target.length) {
        return i - j;
      }
    } else {
      j = next[j];
    }
  }
  return -1;
}

console.log(kmp('abab', 'abacababab'));
