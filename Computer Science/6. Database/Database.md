* SQL(Structured Query Language)은 구조화 된 스키마를 사용하는 관계형 DB이다. 구조화 된 데이터 및 복잡한 쿼리에 적합하다.
* NoSQL(Not Only SQL)은 고정된 스키마를 사용하지 않는 비관계형 DB이다. 거대한 크기의 구조화 되지 않은 데이터에 적합하다.

* Normalization(정규화)은 관계형 DB에서 의존성과 중복성을 줄여 데이터를 정리하는 작업이다. 데이터의 이상 현상을 제거하고 데이터의 전체적인 품질을 높히는것이 목표이다.

* Denormalization(비정규화)은 반대로 정규화된 DB에 중복성을 다시 도입하는 프로세스이다. 이는 정규화 된 테이블간의 복잡한 조인을 수행하는 비용이 높고 데이터 중복성 증가보다 성능적 이점이 더 중요한 상황에 수행된다.

* ER(Entity-Relationship) 모델은 개체간의 관계를 다이어그램을 통해 시각적으로 표현 할 때 사용된다. 일반적으로 Chen 표기법을 많이 사용한다.

* DDL(Data Definition Language)은 DB의 구조를 정의한다. 테이블을 만들고, 테이블의 구조를 변경하고 제약사항을 관리한다.
 - CREATE
 - ALTER
 - DROP
 - TRUNCATE

* DML(Data Manipulation Language)은 데이터를 변경한다.
 - INSERT
 - UPDATE
 - DELETE

* DQL(Data Query Language)은 데이터를 처리한다.
 - SELECT

* DCL(Data Control Language)은 데이터 접근을 제어하기 위해 사용한다. 특정 테이블이나 뷰에 대한 권한을 승인하거나 철회한다.
 - GRANT
 - REVOKE
 - COMMIT
 - ROLLBACK

* Lock은 같은 데이터에 대해 동시에 여러 트랜잭션이 접근하는 것을 방지하는 메커니즘이다.
락엔 다음과 같은 다양한 종류가 있다.
 - Shared Locks : 여러 트랜잭션이 같은 데이터에 동시에 접근할 수 있지만 Lock이 해제되기 전 까진 쓸 수 없다.
 - Exclusive Locks : Shared Locks와 유사하지만 읽기와 더불어 쓰기 또한 제한된다.

* Transaction은 단일 작업 단위로 하나 이상의 SQL문의 시퀀스이다. 오류나 장애가 발생하더라도 DB가 일관된 상태를 유지하도록 한다.

* Transaction엔 ACID라 불리는 속성이 있다.
 - Atomicity(원자성) : 트랜잭션의 모든 명령문은 실행되거나 실행되지 않는다.
 - Consistency(일관성) : 트랜잳션이 실행된 이후에도 DB는 일관된 상태를 유지해야 한다.
 - Isolation(고립성) : 여러개의 트랜잭션이 동시에 실해오디어도 각 트랜잭션은 서로 간섭받지 않아야 한다.
 - Durability(영구성) : 트랜잭션에 의해 변경된 데이터는 영구적으로 저장되어야 한다.
(참조:  https://blog.yevgnenll.me/posts/what-is-acid-about-transaction)

* BASE(Basically Available, Soft State, Eventually Consistent)는 분산 시스템에서 DB의 일관성에 대한 접근 방식을 설명하는 속성이다.
 - Basically Available : 오류가 있어도 시스템이 계속 사용가능하도록 한다.
 - Soft State : 분산 시스템의 특성으로 인해 시스템의 상태가 변경 될 수 있음을 이야기한다.
 - Eventually Consistent : 결국 시스템이 일관된 상태로 수렴하게 한다.

 * PACELC는 분산 DB 시스템에서 일관성, 가용성, 네트워크 분할 허용성의 관계를 나타낸다.
  - Partition Tolerance : 분산 시스템에서 네트워크 장애가 발생하여 시스템의 일부가 접근 불가능한 상황에서도 DB가 정상적으로 작동할 수 있는 상태
  - Consistency : 모든 클라이언트가 동시에 같은 데이터를 볼 수 있는 상태
  - Availability : DB가 요청에 응답하고 클라이언트라 데이터를 읽고 쓸 수 있는 상태

* Index는 특정 레코드를 빠르게 검색하기 위해 사용하는 자료구조이다. 테이블로부터 데이터를 복사하여 저장된 분리된 자료구조를 만들어 작성한다. 인덱스엔 해당 데이터의 위치를 가르키는 포인터가 있다.
 - B-tree : 데이터 수에 상관없이 효율적이며 많은 수의 삽입/삭제/수정을 처리할 수 있다.
 - Hash : 정렬되지 않은 데이터에 사용되며 범위 쿼리나 정렬된 데이터엔 부적합하다.
 - Bitmap : Hash와 유사하며 Bitmap 연산에 효과적이다.
 - Clustered : 데이터의 물리적 순서를 정의한다. 범위 쿼리의 성능을 향상 시킨다.

* View는 DQL의 결과를 기반으로 한 가상테이블이다. 복잡한 쿼리를 단순화하고 데이터 접근을 제한할 수 있다.

* Stored Procedure는 미리 컴파일 된 SQL 명령문의 모음집이다. 복잡한 로직을 캡슐화하여 성능을 향상 시키고 보안 및 데이터 검증을 제공한다.

* Database Fedration은 여러 데이터베이스를 단일 통합 시스템을 관리하는 방법을 말한다. 여러 DB에 데이터를 분산하여 더 많은 양의 데이터와 사용자를 처리할 수 있다.

* Replication은 한 DB에서 하나 이상의 다른 DB로 데이터를 복사하는것을 말한다.
 - Master-Slave : 하나의 DB가 마스터 역할을 하고 하나 이상의 다른 DB가 슬레이브 역할을 한다. 슬레이브는 마스터로부터 사본을 받는다.

* Sharding은 수평 파티셔닝이라고도 불리며 DB 시스템의 여러 서버에 데이터를 분산시키는 방법이다. 데이터를 여러 서버에 분산시켜 DB를 확장한다. 데이터는 샤드라고도 불리는 더 작고 관리가능한 청크로 나눈다. 그리고 각 샤드는 별도의 서버에 저장한다.