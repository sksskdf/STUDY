def partition(arr, low, high):
    #pivot rightmost element
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]

    return i + 1

def quickSort(arr, low, high):
    #for recursion
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

arr = [-3, 8, 7, 2, 1, 0, 9, 6]
quickSort(arr, 0, len(arr) - 1)

print(arr)