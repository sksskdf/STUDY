function boyerMoore(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const last = {};
  const skip = [];

  for (let i = 0; i < m; i++) {
    last[pattern[i]] = i;
  }

  for (
    let i = 0;
    i < n - m + 1;
    i += skip[Math.max(1, m - 1 - last[text[i + m - 1]] || 0)]
  ) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }
    if (j === -1) {
      return i;
    }
    skip[j] = Math.max(1, j - last[text[i + j]] || 0);
  }

  return -1;
}

const text = "hello world";
const pattern = "ld";
console.log(boyerMoore(text, pattern));
