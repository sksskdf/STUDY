const bruteForceStringSearch = (str, pattern) => {
  const strLength = str.length;
  const patternLength = pattern.length;
  let result = [];

  for (let i = 0; i <= strLength - patternLength; i++) {
    let j;

    for (j = 0; j < patternLength; j++) {
      if (str[i + j] !== pattern[j]) {
        break;
      }
    }

    if (j === patternLength) {
      result.push(i);
    }
  }

  if (result.length > 0) return result;
  else return -1;
};

const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

const index = bruteForceStringSearch(text, pattern);

if (index === -1) {
  console.log(
    `The pattern "${pattern}" was not found in the string "${text}".`
  );
} else {
  console.log(`The pattern "${pattern}" was found at index ${index}".`);
}
