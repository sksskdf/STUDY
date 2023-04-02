def merge_sort(arr) :
    if len(arr) > 1:
        r = len(arr)//2
        l = arr[:r]
        m = arr[r:]

        merge_sort(l)
        merge_sort(m)

        i = j = k = 0

        while i < len(l) and j < len(m):
            if l[i] < m[j]:
                arr[k] = l[i]
                i += 1
            else:
                arr[k] = m[j]
                j += 1
            k += 1

        while i < len(l):
            arr[k] = l[i]
            i += 1
            k += 1

        while j < len(m):
            arr[k] = m[j]
            j += 1
            k += 1

given_arr = [6, 5, 4, 3, 2, 1]
merge_sort(given_arr)
print(given_arr)
