function RabinKarp(text, pattern) {
  const d = 256; // 문자 집합의 크기
  const q = 101; // 임의의 소수

  const patternLength = pattern.length;
  const textLength = text.length;
  let patternHash = 0;
  let textHash = 0;
  let h = 1;
  let index = -1;

  // h = d^(m-1)을 미리 계산
  for (let i = 0; i < patternLength - 1; i++) {
    h = (h * d) % q;
  }

  // 패턴의 해시값과 텍스트 내 첫 부분 문자열의 해시값 계산
  for (let i = 0; i < patternLength; i++) {
    patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
    textHash = (d * textHash + text.charCodeAt(i)) % q;
  }

  // 텍스트 내 모든 부분 문자열 검색
  for (let i = 0; i <= textLength - patternLength; i++) {
    // 해시값이 일치하는지 확인
    if (patternHash === textHash) {
      let j;
      // 부분 문자열 한글자씩 비교
      for (j = 0; j < patternLength; j++) {
        if (text.charAt(i + j) !== pattern.charAt(j)) {
          break;
        }
      }
      // 부분 문자열이 일치하는 경우
      if (j === patternLength) {
        index = i;
        break;
      }
    }
    // 해시값이 일치하지 않는 경우
    if (i < textLength - patternLength) {
      textHash =
        (d * (textHash - text.charCodeAt(i) * h) +
          text.charCodeAt(i + patternLength)) %
        q;
      if (textHash < 0) {
        textHash += q;
      }
    }
  }
  return index;
}

const text = "Hello World";
const pattern = "ld";

console.log(RabinKarp(text, pattern));
