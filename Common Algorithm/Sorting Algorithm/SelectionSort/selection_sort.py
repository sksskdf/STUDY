def selection_sort(arr):
    n = len(arr)

    for i in range(n - 1):
        minIndex = i
        for j in range(i + 1, n):
            if arr[j] < arr[minIndex]:
                minIndex = j
        
        arr[i], arr[minIndex] = arr[minIndex], arr[i]

given_arr = [2, 5, 1, 6, 8]
selection_sort(given_arr)
print(given_arr)