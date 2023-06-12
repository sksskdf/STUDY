@Test 어노테이션을 이용해 간단한 테스트를 작성하고 메서드를 검증할 수 있다.
이제 테스트클래스의 생명주기를 살펴보고 제어하는 방법에 대해 알아보자.

 - 테스트 클래스 인스턴스의 생명주기
테스트 메서드마다 새 인스턴스를 초기화하여 테스트를 하는데
이는 그리 좋은 생각은 아니다.
물론 모든 테스트 간에 한 인스턴스를 공유하면 안되겠지만
테스트의 규모가 커질수록 중복되는 코드조각은 많아질것이다.

@BeforeAll, @AfterAll, @BeforeEach, @AfterEach 와 같은 생명주기메서드를 사용하여
테스트의 시점 이전 이후로 코드를 실행시킬 수 있다.
실행순서는 다음과 같다.
BeforeAll -> Class Constructor -> BeforeEach -> Test 
-> AfterEach -> AfterAll

보다시피 All이 붙은건 앞뒤로 딱 한번씩 실행되고
Each메서드는 테스트 전후로 실행된다

 - 생명주기 어노테이션 사용하기
@BeforeAll로 주석이 달린 메소드를 사용하여 
규모가 큰 데이터 구조를 생성 및 초기화하고, 
데이터 소스에 대한 연결을 설정하고, 데이터베이스, 원격 저장소 
또는 하드 드라이브에서 데이터를 가져오고, 
그 후에 리소스를 닫고 @AfterAll 메소드에서 모든 것을 정리할 수 있습니다.

예제 코드를 살펴보자.
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    static String[] names;
    static String[] passwords;
    static boolean[] expectedOutcomes;

    static int index = 0;

    User user;
    boolean expected;

    @BeforeAll
    static void setUp() {
        names = new String[] {"Alice", "Alice", "Alice", "", null, "    "};
        passwords = new String[] {"12345678", "123", null, "12345678", "12345678", "12345678"};
        expectedOutcomes = new boolean[] {true, false, false, false, false, false};
    }

    @BeforeEach
    void createUser() {
        user = new User(names[index], passwords[index]);
        expected = expectedOutcomes[index];
    }

    @AfterEach
    void incrementIndex() {
        index++;
    }

    @RepeatedTest(value = 6, name = "user.isValid() test {currentRepetition}/{totalRepetitions}")
    void isValid() {
        assertEquals(expected, user.isValid());
    }
}

@RepeatedTest를 사용하여 6번 반복하는 테스트를 정의 했다.
{currentRepetition}과 {totalRepetitions}은 현재 반복수, 총 반복수를 나타낸다.

 - 클래스 별 테스트 인스턴스
어떠한 이유로 테스트 클래스에서 같은 인스턴스로
모든 테스트 메소드를 실행하려는 경우 
@TestInstance(Lifecycle.PER_CLASS)로 테스트 클래스에 주석을 추가하여 
테스트를 작성할 수 있습니다.
이 모드에서는 테스트 클래스의 새 인스턴스가 한 번만 생성되므로 
테스트 메서드가 비정적 변수에 저장된 상태에 의존한다.
@BeforeEach 또는 @AfterEach 메서드에서 상태를 재설정할 수 있습니다.

클래스에 @TestInstance 어노테이션을 붙히면
모든 테스트에서 인스턴스를 공유하기 때문에 @BeforeAll 이나 @AfterAll 메서드가 스태틱일
필요가 없습니다.
테스트를 실행하면 생성자는 초기에 한번만 생성되고 테스트가 진행됩니다.
