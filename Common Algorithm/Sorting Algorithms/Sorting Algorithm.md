* Bubble Sort
 - 인접한 두 원소를 비교하며 정렬
 - 구현이 간단하지만 효율성이 낮다
 - 시간복잡도는 b/w/a 모두 O(n^2)이므로 데이터가 많을수록 느리다.

* Selection Sort
 - 최소값을 찾아 맨 앞의 요소와 교체하며 정렬
 - 구현이 간단하고 메모리 사용량이 적지만 효율성이 낮다.
 - b/w/a는 모두 O(n^2)이다.

* Insertion Sort
 - 이미 정렬된 부분 집합에 새로운 원소를 삽입해가며 정렬
 - 리스트의 크기가 작거나 이미 정렬된 경우 효율적이다.
 - b/w/a 는 O(n), O(n^2), O(n^2) 이다.

* Heap Sort
 - CBT(Complete Binary Tree)를 기반으로 하는 정렬 알고리즘이다.
 - 대량의 데이터를 정렬하는데 유리하다.
 - b/w/a 는 O(n log n) 이다.

* Quick Sort
 - Divide and Conquer 알고리즘 중 하나로 피벗을 정해서 피벗보다 작은 우너소들과 큰 원소들을 교환하며 정렬한다.
 - 대부분의 경우 가장 빠르지만 최악의 경우 성능이 급격하게 저하된다.
 - b/w/a 는 O(n log n)이고 최악은 O(n^2)이다.

* Merge Sort
 - Divide and Conquer 알고리즘 중 하나로, 리스트를 절반으로 잘라 각각 정렬한 후 합쳐가며 정렬한다.
 - 데이터셋이 큰 경우에도 안정적으로 동작한다.
 - b/w/a는 O(n log n)이다.
