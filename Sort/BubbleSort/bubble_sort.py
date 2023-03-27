def bubble_sort(arr):
    def swap(arr, idx1, idx2):
        arr[idx1], arr[idx2] = arr[idx2], arr[idx1]
    
    result = arr[:]
    n = len(result)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if result[j] > result[j+1]:
                swap(result, j, j + 1 )
    
    return result

given_arr = [5, 3, 7, 1, 9]
sorted_arr = bubble_sort(given_arr)
print(sorted_arr)