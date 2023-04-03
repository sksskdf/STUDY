const givenArr = [8, 5, 1, 3, 2, 4, 9];
mergeSort(givenArr);
console.log(givenArr);

function mergeSort(arr) {
  if (arr.length <= 1) return;

  const m = Math.floor(arr.length / 2);
  const l = arr.slice(0, m);
  const r = arr.slice(m);

  mergeSort(l);
  mergeSort(r);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < l.length && j < r.length) {
    if (l[i] < r[j]) {
      arr[k] = l[i];
      i++;
    } else {
      arr[k] = r[j];
      j++;
    }
    k++;
  }

  while (i < l.length) {
    arr[k] = l[i];
    i++;
    k++;
  }

  while (j < r.length) {
    arr[k] = r[j];
    j++;
    k++;
  }
}
