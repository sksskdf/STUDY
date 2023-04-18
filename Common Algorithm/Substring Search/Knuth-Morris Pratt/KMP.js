function kmpSearch(text, pattern) {
  // Prefix와 Suffix 일치 계산
  const table = getTable(pattern);

  // 문자열 검색
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (pattern[patternIndex] === text[textIndex]) {
      // 문자가 일치할 경우
      patternIndex++;
      textIndex++;

      if (patternIndex === pattern.length) {
        // 패턴 문자열을 모두 일치시킨 경우
        return textIndex - patternIndex;
      }
    } else if (patternIndex > 0) {
      // 문자가 일치하지 않지만, Prefix와 Suffix 일치 계산을 통해 패턴을 이동시킬 수 있는 경우
      patternIndex = table[patternIndex - 1];
    } else {
      // 문자가 일치하지 않고, Prefix와 Suffix 일치 계산을 통해 패턴을 이동시킬 수 없는 경우
      patternIndex = 0;
      textIndex++;
    }
  }

  return -1; // 일치하는 패턴이 없는 경우
}

function getTable(pattern) {
  const table = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < pattern.length) {
    if (pattern[prefixIndex] === pattern[suffixIndex]) {
      // Prefix와 Suffix가 일치할 경우
      table[suffixIndex] = prefixIndex + 1;
      suffixIndex++;
      prefixIndex++;
    } else if (prefixIndex > 0) {
      // Prefix와 Suffix가 일치하지 않지만, 다른 Prefix와 Suffix가 일치할 수 있는 경우
      prefixIndex = table[prefixIndex - 1];
    } else {
      // Prefix와 Suffix가 일치하지 않고, 다른 Prefix와 Suffix도 일치하지 않는 경우
      table[suffixIndex] = 0;
      suffixIndex++;
    }
  }

  return table;
}

const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

const index = kmpSearch(text, pattern);

if (index === -1) {
  console.log("Pattern not found in text");
} else {
  console.log(`Pattern found at index ${index}`);
}
