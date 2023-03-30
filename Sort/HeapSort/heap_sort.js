function heapify(arr, n, i) {
    let largest = i;
    let l = i * 2 + 1;
    let r = i * 2 + 2;

    if (l < n && arr[largest] < arr[l]) {
        largest = l;
    }

    if (r < n && arr[largest] < arr[r]) {
        largest = r;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2); i > -1; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i  > 0; i--) {
        [arr[i], arr[0]] = [arr[0], arr[i]];
        heapify(arr, i, 0);
    }
}

const givenArr = [5, 1, 2, 0, 11, -4, 3, 7]
heapSort(givenArr);
console.log(givenArr);