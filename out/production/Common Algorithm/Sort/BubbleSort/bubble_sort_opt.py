def bubble_sort(arr):
    n = len(arr)

    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1] :
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

given_arr = [2, 1, 6, 3, -2, 8, 0]
bubble_sort(given_arr)
print(given_arr)