데드락은 두개 이상의 프로세스나 쓰레드가 서로 자원을 얻지 못해서 다음 처리를 하지 못하는 상태를 말한다.
데드락은 멀티 프로그래밍 환경에서 한정된 자원을 얻기 위해 서로 경쟁하는 상황에 주로 발생한다. 데드락은 또한 교착상태라고도 불린다.

데드락은 아래와 같은 조건들이 모두 성립했을때 발생한다.
1. Mutual Exception(상호 배제) : 자원은 한번에 한 프로세스만 사용할 수 있다.
2. Hold and Wait (점유와 대기) : 최소한 하나의 자원을 점유하고 있으면서 다른 프로세스에 할당되오 사용하고 있는 자원을 추가로 점유하기 위해 대기하는 프로세스가 존재해야 한다.
3. No Preemption (비선점) : 다른 프로세스에 할당된 자원은 사용이 끝날 때 까지 강제로 빼앗을 수 없다.
4. Circular Wait (순환 대기) : 프로세스의 집합에서 순환 형태로 자원을 대기하고 있어야 한다.

데드락 처리에는 여러가지 기법이 있다.
* Prevention : 교착 상태 발생 조건 중 하나를 제거하면서 해결한다. 하지만 자원낭비가 심하다는 단점이 있다.
* Avoidance : 은행원 알고리즘을 통해 교착상태를 해결한다.
* Detection : 자원 핧당 그래프를 통해 교착상태를 감지한다. 자원 요청 시 탐지 알고리즘을 실행시켜 그에 대한 오버헤드를 발생시킨다.
* Recovery : 교착 상태를 프로세스를 종료하거나 할당된 자원을 해제시켜 회복한다.