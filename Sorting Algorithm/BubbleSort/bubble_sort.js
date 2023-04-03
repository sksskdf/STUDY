const givenArr = [5, 3, 7, 9, 1];

function bubbleSort(arr) {
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    arr[idx1], arr[idx2] = arr[idx2], arr[idx1];
  }

  const resultArr = arr.slice();
  const n = resultArr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (resultArr[j] > resultArr[j + 1]) {
        swap(resultArr, j, j + 1);
      }
    }
  }

  return resultArr;
}

const sortedArr = bubbleSort(givenArr);

console.log(sortedArr);
