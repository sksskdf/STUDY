let givenArr = [3, 2, 5, 8, 1];

function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }

    if (i !== minIndex) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}

selectionSort(givenArr);

console.log(givenArr);
