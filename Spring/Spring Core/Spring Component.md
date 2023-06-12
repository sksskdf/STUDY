스프링 IOC는 @Bean어노테이션을 제공함으로써 스프링빈을 관리하고 정의할 수 있게 해줍니다.
그렇게 만들어진 스프링빈은 어플리케이션 시작 시 자동적으로 필요한 곳에 주입됩니다.
하지만 이 어노테이션으로만 빈을 생성하고 관리할 수 있는건 아닙니다.
아마도 빈을 생성하고 관리할때 대부분의 경우 컴포넌트 컨셉을 이용할 일이 굉장히 많을겁니다.

- 컴포넌트
스프링에서 컴포넌트는 DI를 위해 사용되는 스프링IOC에 의해 자동감지되는 특별한 클래스입니다.
컴포넌트는 흔히

* 어플리케이션의 서로 다른 부분간에 고수준의 분리를 보장합니다.
* 클래스에 좀 더 효율적인 방법으로 책임을 할당합니다.

컴포넌트를 정의하려면 클래스레벨 어노테이션인 @Component 를 사용해야 합니다.
스프링 IOC는 이 어노테이션이 붙은 클래스들을 자동적으로 감지하여 빈을 생성하고 관리합니다.
기본적으로 모든 컴포넌트에는 오직 하나의 빈만 있습니다.

일반적으로 컴포넌트는 컴포넌트 외부에서 호출될 수 있는 하나 혹은 그 이상의 비정적메서드를 포함합니다.
그러나 어떤 경우에는 public메서드가 없는 컴포넌트도 있습니다.

PasswordGenerator라는 컴포넌트가 있다고 쳐봅시다.

import org.springframework.stereotype.Component
import java.util.Random

@Component
class PasswordGenerator {
    companion object {
        private const val CHARACTERS = "abcdefghijklmnopqrstuvwxyz"
        private val random = Random()
    }

    fun generate(length: Int): String {
        val result = StringBuilder()
        for (i in 0 until length) {
            val index: Int = random.nextInt(CHARACTERS.length)
            result.append(CHARACTERS[index])
        }
        return result.toString()
    }
}


이 클래스의 모든 객체는 초기화를 하지 않아도 기본 생성자를 통해 생성할 수 있습니다.
스프링부트어플리케이션을 시작하면 @Component 어노테이션이 붙은 클래스를 모두 찾아
미리 생성해놓고 이 객체들은 컨테이너 내부에서 대기하고 있습니다.

 - 명령줄과 상호작용하기
스프링 프레임워크의 한 가지 기능을 살펴보고 구성 요소에 대해 조금 더 알아보겠습니다.
표준 입출력과 상호작용을 할 수 있게 해주는 특별한 컴포넌트에 대해 알아보겠습니다.

표준 입출력과 상호작용을 하려면 CommandLinerunner 인터페이스와 run 메서드를 구현해야 합니다.
run 메서드는 main 메서드와 같은 기능을 하며 어떤 코드를 작성하던
스프링어플리케이션 시작 시 실행됩니다.

@Component
class Runner : CommandLineRunner {
    override fun run(vararg args: String) {
        println("Hello, Spring!")
    }
}

run메서드는 스프링프레임워크에 의해 자동으로 실행됩니다.

(CommandLineRunner 인터페이스를 매번 구현해야 할 필요는 없습니다.
스프링프레임워크의 새로운 기능을 공부하거나 디버깅이 필요할 때 사용하면 됩니다.)

- 컴포넌트 Autowiring 하기
컴포넌트에 대해 자동으로 생성된 모든 빈은 @Autowired 어노테이션을 사용하여 주입될 수 있습니다.
DI 메커니즘은 @Bean 어노테이션 처럼 똑같이 작동합니다.
위에서 본 PasswordGenerator 와 Runner 클래스는 스프링컴포넌트이기 때문에 DI메커니즘을 사용할 수 있습니다.
Runner클래스에 PasswordGenerator를 주입하여 사용해보겠습니다.

@Component
class Runner @Autowired constructor(private val generator: PasswordGenerator) : CommandLineRunner {
    override fun run(vararg args: String) {
        println("A short password: " + generator.generate(5))
        println("A long password: " + generator.generate(10))
    }
}

(Spring에는 중요한 제한 사항이 있습니다. 빈(컴포넌트 포함) 간에 순환 종속성을 선언할 수 없습니다. 
그렇게 하면 애플리케이션이 시작되지 않고 오류가 발생합니다. 애플리케이션 컨텍스트에서 일부 빈의 종속성은 순환을 형성합니다.)

- @Autowired 어노테이션은 어디에 붙혀야 할까?

@Autowired 어노테이션은 생성자, 생성자인수, 필드에 붙힐 수 있고 생성자 주입시엔 아예 안붙힐수도 있습니다.
필드 주입보다 생성자 주입을 사용하는 것이 좋습니다. 생성자 주입은 종속성을 명확하게 식별하고 스레드 안전성을 지원하며 코드 테스트를 단순화합니다.

(생성자 주입을 사용하면 @Autowired 어노테이션을 안붙힐 수 있습니다. 
하지만 필드 주입시엔 어노테이션이 필요하고 그렇지 않으면 필드는 null이 됩니다.)