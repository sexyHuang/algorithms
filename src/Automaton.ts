const charCodeA = 'a'.charCodeAt(0);

function getCode(s: string) {
  return s.charCodeAt(0) - charCodeA;
}

const N = 1e3 + 6;
class Automaton {
  tr = Array.from(
    {
      length: N
    },
    () => Array.from({ length: 26 }, () => 0)
  );
  private total = 0;
  /**e[i]: 结尾为index的串的数量 */
  private e = Array.from(
    {
      length: N
    },
    () => 0
  );
  fail = Array.from(
    {
      length: N
    },
    () => 0
  );
  insert(s: string) {
    const { tr, e } = this;
    let u = 0;

    for (let letter of s) {
      const code = getCode(letter);
      if (!tr[u][code]) tr[u][code] = ++this.total;
      u = tr[u][code];
    }
    e[u] += 1;
  }

  build() {
    const { tr, fail } = this;
    const queue: number[] = [];
    tr[0].forEach(u => u && queue.push(u));
    // BFS
    while (queue.length) {
      const u = queue.shift()!;
      for (let i = 0; i < 26; i++) {
        if (tr[u][i]) {
          fail[tr[u][i]] = tr[fail[u]][i];
          queue.push(tr[u][i]);
        } else {
          tr[u][i] = tr[fail[u]][i];
        }
      }
    }
  }
  query(t: string) {
    const { tr, fail, e } = this;
    let u = 0,
      res = 0;
    for (let letter of t) {
      u = tr[u][getCode(letter)];
      for (let j = u; j && e[j] >= 0; j = fail[j]) {
        res += e[j];
        e[j] = -1;
      }
    }
    return res;
  }
}

const sArr = ['i', 'he', 'his', 'she', 'hers'];
const AC = new Automaton();
sArr.forEach(s => AC.insert(s));
AC.build();
console.log(AC.query('ushesrsheishis'));
debugger;
