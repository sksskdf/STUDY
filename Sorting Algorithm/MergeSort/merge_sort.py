def merge_sort(arr):
    if (len(arr) <= 1):
        return
    
    m = len(arr) // 2
    l = arr[:m]
    r = arr[m:]

    merge_sort(l)
    merge_sort(r)

    i = j = k = 0

    while i < len(l) and j < len(r):
        if (l[i] < r[j]):
            arr[k] = l[i]
            i += 1
        else:
            arr[k] = r[j]
            j += 1
        k += 1

    while i < len(l):
        arr[k] = l[i]
        i += 1
        k += 1

    while j < len(r):
        arr[k] = r[j]
        j += 1
        k += 1

def assert_merge_sort(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
        
    return True

given_arr = [5, 3, 9, 8, 1, 2]
merge_sort(given_arr)
print(assert_merge_sort(given_arr))
print(given_arr)