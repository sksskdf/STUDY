function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }
}

const givenArr = [9, 7, 5, 3, 1];

insertionSort(givenArr);
console.log(givenArr);
