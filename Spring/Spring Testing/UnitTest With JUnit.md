자바에서의 자동화된 유닛 테스트를 위한 첫 유닛 테스트를 작성해보자.
알다시피 유닛이란 코드의 일부분으로 최소단위의 작업을 말한다.
자바에서는 대부분 유닛은 클래스에 해당한다.
테스트를 작성하고 퍼블릭메서드들이 올바르게 작동하는지 확인할 수 있다.

(DB나 웹서비스 같은 의존성을 제외한 어플리케이션에 대한 유닛테스트를 사용할 것이다.)

자바에서는 메서드는 값을 리턴하거나 객체의 내부상태를 변경한다.
즉 메서드의 정확성을 확인하려면 메서드 반환 값을 예상 출력과 비교하거나
메서드로 부터 수정된 개체의 내부상태를 예상내부상태와 비교할 수 있다.

수동으로 유닛테스트를 하는 것은 지루한 작업이다.
사용자가 값을 수동적으로 일일히 입력하는 경우에는 특히 그렇다.(MVC라고 상상해보면 토나옴)
그래서 몇몇의 프레임워크는 자동유닛테스트를 할 수 있게 편리한 툴을 제공한다.
제일 유명한 것이 JUnit이다.

 - Getting started
자바8버전에 도입된 모든 기능을 지원하는 JUnit의 제일 최근버전인 JUnit5를 사용할 것이다.
즉 JUnit은 자바8(혹은 더 높은버전)을 필요로 한다는 이야기이기도 하다.
JUnit5프레임워크 의존성을 프로젝트에 추가해준다.
(Gradle)
dependencies {
    implementation 'org.junit.jupiter:junit-jupiter:5.7.1'
}

maven central에서 제일 최신버전을 찾아볼 수 있다.

또한 JUnitPlatform을 test에 사용하겠다고 명시적으로 Gradle에게 알려줘야 한다.

test {
    useJUnitPlatform()
}

쉬운 테스트를 위하여 간단한 계산기프로그램을 만들어보겠다.
Calculator라는 클래스를 만들고 
add, subtract, multiply, divide메서드를 만들어 준다.
두 인자를 받아 해당연산을 실행하는 메서드들이다.

public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public int divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Divisor cannot be zero!");
        }
        return a / b;
    }
}

int 오버플로를 방지하기 위해 추가 검사를 추가하여 이러한 메서드를 자유롭게 수정할 수도 있다.
나중에 기술을 구축하기 위한 수정된 방법에 대한 추가 테스트를 작성할 수 있다.

 - Writing tests
이제 첫 테스트를 작성해보자.
test/java 경로에 CalculatorTests라는 클래스를 만들자.
인텔리제이를 쓴다면 테스트하고자하는 클래스파일을 우클릭해 Generate -> Test 메뉴를 통해 
만들수도 있다.

클래스파일을 열고 testAddition이라는 메서드와 함께 @Test어노테이션을 붙혀주도록 한다.
이 어노테이션은 JUnit프레임워크에게 해당 메서드가 유닛테스트임을 알려주는 어노테이션이다.
또한 모든 테스트클래스나 메서드들은 public일 필요가 없다.

class CalculatorTests {

    @Test
    void testAddition() {
        Calculator calculator = new Calculator();
        int result = calculator.add(1, 2);

        assertEquals(3, result);
    }
}

메서드 바디를 보면 Calculator인스턴스를 생성하고 assertEquals메서드를 통해
메서드의 리턴값과 예상리턴값을 비교한다.
만약 두값이 일치하지 않는다면 AssertionFailedError 예외를 던진다.

@DisplayName 어노테이션을 이용해 테스트클래스와 메서드에 의미있는 이름을 부여할 수도 있다.

@Test
@DisplayName("Add 1 and 2, result should be 3")
void testAddition() {
    Calculator calculator = new Calculator();
    int result = calculator.add(1, 2);

    assertEquals(3, result);
}

 - Assertions
Assertions클래스는 JUnit프레임워크의 다양한 테스트를 위한 오버로드된 메서드들을 제공한다.
각 메서드들은 String 타입의 메세지를 파라미터로 받는 오버로드된 버전이 같이 존재한다.
테스트가 실패하면 파라미터로받은 String 메시지를 출력한다.

 - Running tests
이제 실행준비가 된 몇개의 테스트를 작성했다.
테스트클래스를 열어 실행버튼을 눌러 실행할 수도 있고,
파일을 우클릭하여 프로젝트 뷰 패널로 이동하여 드롭다운메뉴로도 실행할 수 있다.

또 다른 테스트를 실행할 수 있는 방법은 Gradle을 이용하는 것이다.
test {
    testLogging {
        events "passed", "skipped", "failed"
    }
}

그 다음 터미널에 gradle test 명령을 실행한다.

(만약 테스트메서드 몸체가 비어있다면 테스트는 PASSED 될 것이다.
실패를 강제하고 싶다면 메서드내부에서 fail메서드를 호출해야한다.)

 - Test outcomes
또 다른 메서드의 테스트도 작성해보자.
하지만 첫번째로 multiply메서드에 의도적으로 버그를 만들어보자.

public int multiply(int a, int b) {
    return 0;
}

테스트 : 
@Test
void testMultiplication() {
    Calculator calculator = new Calculator();
    int result =  calculator.multiply(2, 3);

    assertEquals(6, result);
}

AssertionFailedError가 뜬다.

다시 원복하고 돌리면 잘 PASSED되는 것을 볼 수 있다.

(gradle test는 변화가 감지되었을때만 실행된다.
만약 상관없이 테스트를 하고 싶다면 gradle cleanTest test를 실행하면 된다.)

 - Summary
JUnit 프레임워크는 자바 클래스에 대한 유닛테스트 API를 제공한다.
JUnit의 도움으로 자동화된 테스트를 실행하고 코드단위실행결과를 확인할 수 있다.
Maven이나 Gradle같은 빌드툴을 사용하거나 IDE를 사용하여 테스트를 실행할 수 있고
테스트가 실패한다면 JUnit은 상세출력을 통해 테스트실패이유를 알려준다.
