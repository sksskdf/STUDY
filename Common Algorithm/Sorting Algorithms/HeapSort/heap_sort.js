const givenArr = [5, 1, 2, 0, 11, -4, 3, 7, 6];
heapSort(givenArr);
console.log(givenArr);

function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2); i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;

  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
