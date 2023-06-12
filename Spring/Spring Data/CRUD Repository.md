일반적인 어플리케이션은 데이터와 함께 작업하고 DB에 그것을 저장합니다.
데이터로 무엇을 할 수 있을까요?
첫째로 DB에 저장 할 수 있습니다.
그 다음 데이터를 읽을 수 있고 읽은 뒤 수정이나 삭제 또한 할 수 있습니다.
이러한 작업들을 CRUD라고 부릅니다.

이번장에서는 CRUD 연산을 통해 스프링어플리케이션에서 DB와 상호작용하는 방법에 대해 알아봅니다.

- 스프링에서의 리포지토리
이미 엔티티개념에 대해선 친숙할 것입니다.
자바에서는 엔티티를 통해 DB의 데이터를 조작합니다.
예를들어 피트니스센터를 개업한다고 쳐봅시다.
그리고 모든 피트니스장비의 정보를 저장하려고 합니다.
아직까진 하나밖에 들어온 장비가 없지만 추후에 장비는 계속해서 많아질 것입니다.

운이 좋게도 스프링데이터는 리포지토리 개념을 지원합니다.
그렇지만 이 개념이 어떻게 도움을 준다는 것일까요?

스프링데이터에서 리포지토리는 수많은 보일러플레이트코드들을 줄여줄수있게 도와주는 추상화입니다.
여러 저장소 인터페이스를 제공하고 이러한 모든 인터페이스는 DB에 구애받지 않습니다.
결국 이 추상화를 통해 모든 DB에 사용할 수 있다는 말입니다.
리포지토리 인터페이스의 기본적인 구조입니다.

@Indexed
public interface Repository<T, ID> {
}

@Indexed는 이 인터페이스의 모든 하위인터페이스들이 
리포지토리 빈의 후보로 취급되어야 한다는 것을 나타냅니다.
또한 리포지토리 인터페이스는 어떤 메소드도 선언되있지 않은것을 볼 수 있습니다.
왜냐하면 이것은 마커 인터페이스이기 때문입니다.

리포지토리 인터페이스는 제네릭입니다.
제네릭타입 T는 엔티티타입을 나타내고 제네릭타입 ID는 엔티티의 고유 ID를 나타냅니다.

CRUD 작업을 하기위한 CrudRepository 인터페이스도 있습니다.

@NoRepositoryBean
public interface CrudRepository<T, ID> extends Repository<T, ID> {
    // CREATE/UPDATE methods
    <S extends T> S save(S entity);
    <S extends T> Iterable<S> saveAll(Iterable<S> entities);

    // READ methods
    Optional<T> findById(ID id);
    boolean existsById(ID id);
    Iterable<T> findAll();
    Iterable<T> findAllById(Iterable<ID> ids);
    long count();

    // DELETE methods
    void deleteById(ID id);
    void delete(T entity);
    void deleteAllById(Iterable<? extends ID> ids);
    void deleteAll(Iterable<? extends T> entities);
    void deleteAll();
}

CrudRepository는 CRUD 동작을 포함합니다.
이 인터페이스는 엔티티객체와 엔티티ID를 메서드에 넘길수 있습니다.
또한 하나의 엔티티나 여러개의 엔티티로 작업할 수도 있습니다.

스프링데이터는 내부적으로 주어진 엔티티가 새것인지 오래된것인지 확인하고
이에따라 엔티티를 생성하거나 업데이트 합니다.

- 리포지토리 정의하기
이제 리포지토리를 만들어봅시다.

// an annotation goes here
public class Treadmill {
    private String code;
    private String model;

    // constructor, getters, setters

}

엔티티가 무엇에 매핑되느냐에 따라 어노테이션은 달라집니다.
오래된 RDBMS의 경우 테이블이 될 것이고 
현대의 문서지향형 DB인 몽고DB와 같은 NoSQL의 경우 도큐먼트,
그래프DB인 Neo4J인 경우 노드나 엣지가 될 것입니다. 
DB의 종류에 따라 달라질 수 있습니다.

CrudRepository를 상속받으면 됩니다.

public interface TreadmillRepository extends CrudRepository<Treadmill, String> {

}

일반적으로 RDB의 경우 ID에는 Long타입을 많이 사용합니다.

- 어플리케이션 러너
어플리케이션 클래스의 예제 코드입니다.

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Component
    public class Runner implements CommandLineRunner {
        private final TreadmillRepository repository;

        public Runner(TreadmillRepository repository) {
            this.repository = repository;
        }

        @Override
        public void run(String... args) {
            // work with the repository here
        }
    }
}

- Create
데이터베이스에 데이터가 있는지 확인하기 위해 count 메서드를 사용합니다.

private void doWeHaveSomethingInDb() {
    long count = repository.count();
    if (count > 0) {
        System.out.printf("Db has %d treadmills", count);
    } else {
        System.out.println("Db is empty");
    }
}

데이터베이스에 엔티티를 생성하려면 새 객체를 생성하여 save 메소드에 전달해야 합니다. 
다음과 같은 방식으로 save 메소드를 호출하기 전과 후에 데이터베이스를 확인할 수 있습니다.

System.out.println("Before save:");
doWeHaveSomethingInDb();
            
System.out.println("Saving...");
repository.save(new Treadmill("aaa", "Yamaguchi runway"));

System.out.println("After save:");
doWeHaveSomethingInDb();


Before save:
Db is empty
Saving...
After save:
Db has 1 treadmills

출력은 save메서드 이전에는 엔티티가 존재하지 않는다는 것을 말해줍니다.
save메서드 호출 이후 DB에 데이터가 들어간것을 확인할 수 있습니다.
이제 그 데이터가 어떤 정보를 나타내는지 확인하고 싶을 것 입니다.

- Read
Read는 count 메서드말고도 네가지가 더 있습니다.
findBydID와 findAll에 대해서 알아보겠습니다.
existsById와 findAllById는 findById와 비슷합니다.
차이점은 existsById는 불린을 리턴하고 findAllById는 여러개의 엔티티를 리턴합니다.

findById는 Optional객체를 리턴합니다.
하지만 null 객체가 있을 수도 있습니다.
null에 대한 핸들링은 Optional을 사용하거나 if not null 체크를 수동적으로 해줘야합니다.

또한 엔티티를 문자열로 표현해주는 메서드도 필요합니다.

private String createTreadmillView(Treadmill treadmill) {
    return "Treadmill(code: %s, model: %s)"
            .formatted(treadmill.getCode(), treadmill.getModel());
}

formatted메서드는 자바15부터 지원하기 때문에 그 아래버전이라면 toString()을 오버라이드하면 됩니다.
String.format을 이용할 수도 있습니다.

System.out.println("Looking for the treadmill with code='bbb'... ");
Optional<Treadmill> treadmill = repository.findById("bbb");
String result = treadmill.map(this::createTreadmillView).orElse("Not found");
System.out.println(result);

Looking for the treadmill with code='bbb'... 
Treadmill(code: bbb, model: Yamaguchi runway pro-x)

findAll을 사용해서 여러개의 엔티티를 확인할 수도 있습니다.

Iterable<Treadmill> treadmills = repository.findAll();
for (Treadmill treadmill : treadmills) {
    System.out.println(createTreadmillView(treadmill));
}

Treadmill(code: aaa, model: Yamaguchi runway)
Treadmill(code: bbb, model: Yamaguchi runway pro-x)
Treadmill(code: ccc, model: Yamaguchi max)

만약 DB에 데이터가 없다면 빈 Iterable객체를 리턴합니다.

(데이터베이스에 엔티티가 많은 경우 findAll 메서드는 
성능 저하 또는 메모리 부족 오류로 이어질 수 있습니다. 
이 방법을 현명하게 사용하십시오.)

- Update

Optional<Treadmill> existedTreadmill = repository.findById("aaa");

String existed = existedTreadmill
        .map(this::createTreadmillView)
        .orElse("Not found");

System.out.println("Before update: " + existed);
System.out.println("Updating...");

existedTreadmill.ifPresent(treadmill -> {
    treadmill.setModel("Yamaguchi runway-x");
    repository.save(treadmill);
});

Optional<Treadmill> updatedTreadmill = repository.findById("aaa");
String updated = updatedTreadmill
        .map(this::createTreadmillView)
        .orElse("Not found");

System.out.println("After update: " + updated);

(DB에 같은 ID인 엔티티가 있으면 save메서드는 업데이트동작을 합니다.)

- Delete
CrudRepository는 제공하는 Delete메서드는 다섯가지가 있습니다.
그 중 먼저 deleteById와 delete 메서드에 대해서 알아볼 것 입니다.
이 둘은 비슷하게 동작합니다 deleteAll은 모든 엔티티를 삭제합니다.

private void printAllTreadmills() {
    Iterable<Treadmill> treadmills = repository.findAll();
    for (Treadmill treadmill : treadmills) {
        System.out.println(createTreadmillView(treadmill));
    }
}

System.out.println("Before delete: ");
printAllTreadmills();

System.out.println("Deleting...");
repository.deleteById("ccc");

System.out.println("After delete: ");
printAllTreadmills();

Before delete: 
Treadmill(code: aaa, model: yamaguchi runway-x)
Treadmill(code: bbb, model: Yamaguchi runway pro-x)
Treadmill(code: ccc, model: Yamaguchi max)
Deleting...
After delete: 
Treadmill(code: aaa, model: yamaguchi runway-x)
Treadmill(code: bbb, model: Yamaguchi runway pro-x)

System.out.println("Before delete: ");
printAllTreadmills();

System.out.println("Deleting...");
Optional<Treadmill> proXTreadmill = repository.findById("bbb");
proXTreadmill.ifPresent(
        treadmill -> {
            repository.delete(treadmill);
        }
);

System.out.println("After delete: ");
printAllTreadmills();

Before delete: 
Treadmill(code: aaa, model: yamaguchi runway-x)
Treadmill(code: bbb, model: Yamaguchi runway pro-x)
Deleting...
After delete: 
Treadmill(code: aaa, model: yamaguchi runway-x)

- 요약
요즘의 어플리케이션들은 DB와의 상호작용을 대부분 합니다.
스프링데이터의 CrudRepository는 DB와의 상호작용을 통해 CRUD를 가능하게 해주고
만약 이런것이 없다라면 우리는 엔티티마다 모든 CRUD연산을 구현해야 할 것입니다.
그리고 CrudRepository는 DB를 불문하고 작동합니다.


