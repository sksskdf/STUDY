package Sort.HeapSort;

import java.util.Arrays;

class HeapSort {
    static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int l = i * 2 + 1;
        int r = i * 2 + 2;

        if (l < n && arr[l] > arr[largest]) {
            largest = l;
        }

        if (r < n && arr[r] > arr[largest]) {
            largest = r;
        }

        if (largest != i) {
            int temp = arr[largest];
            arr[largest] = arr[i];
            arr[i] = temp;
            heapify(arr,n, largest);
        }
    }

    static void heapSort(int[] arr) {
        int n = arr.length;

        for (int i = (int)Math.floor(arr.length / 2); i > -1; i --) {
            heapify(arr, n, i);
        }

        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    public static void main(String[] args) {
        int[] arr = new int[] { 3, 5, -1, 2, 9, 8, 0 };
        heapSort(arr);
        System.out.println(Arrays.toString(arr));   
    }
}

