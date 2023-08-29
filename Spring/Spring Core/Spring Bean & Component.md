스프링빈을 만들고 사용하려면 @Bean 이나 @Component어노테이션을 사용하여 빈을 정의해야 합니다.
이번 장에서는 둘의 차이점과 어떻게 하면 두개를 같이 쓸 수 있을지에 대해 알아보겠습니다.

- @Bean과 @Component 같이 쓰기
일반적인 빈 선언방식은 @Bean을 사용하고 @Autowired를 통해 적절히 주입시켜 사용했습니다.
이번엔 빈을 다른 어플리케이션 혹은 다른 컴포넌트에서 선언한 후 사용하는 방법에 대해 알아보겠습니다.

어떻게 작동하는지 확인하기 위해, 무작위비밀번호를 생성하는 예시를 살펴보겠습니다.
이번 예시의 주요점은 아래와 같습니다.

* 비밀번호를 만들기 위한 캐릭터셋에 대한 설정 빈
* 이러한 설정 빈을 필요로 하는 컴포넌트와 여러 계산들
* 표준입출력시스템과 상호작용하는 컴포넌트

다음은 사용하고자 하는 캐릭터셋이 정의된 빈을 포함하는 PasswordConfig 클래스입니다.

```kotlin
@Configuration
class PasswordConfig {
    companion object {
        private const val ALPHA = "abcdefghijklmnopqrstuvwxyz"
        private const val NUMERIC = "0123456789"
        private const val SPECIAL_CHARS = "!@#$%^&*_=+-/"
    }

    @Bean
    fun allCharacters(): PasswordAlphabet {
        return PasswordAlphabet(ALPHA + NUMERIC + SPECIAL_CHARS)
    }

    class PasswordAlphabet(val characters: String)
}
```

그 다음은 PasswordGenerator 클래스입니다.

```kotlin
@Component
class PasswordGenerator(@Autowired private val alphabet: PasswordAlphabet) {
    companion object {
        private val random = Random()
    }

    fun generate(length: Int): String {
        val allCharacters = alphabet.characters // get the characters from the bean
        val result = StringBuilder()
        for (i in 0 until length) {
            val index: Int = random.nextInt(allCharacters.length)
            result.append(allCharacters[index])
        }
        return result.toString()
    }
}
```

그 다음은 표준입출력시스템을 이용하기 위한 클래스입니다.

```kotlin
@Component
class Runner(private val generator: PasswordGenerator) : CommandLineRunner {
    override fun run(vararg args: String) {
        println("A short password: " + generator.generate(5))
        println("A long password: " + generator.generate(10))
    }
}
```

어플리케이션을 시작하면 아래와 같은 결과를 얻을 수 있습니다.

A short password: e&7sd
A long password: up_&g4xtj7

게다가 다양한 캐릭터셋 빈을 선언할 수도 있고 의도에 따라 @Qualifier를 이용하여 빈을 알맞게 주입할 수 있습니다.
다양한 경우에 응용할 수 있는 어플리케이션의 커스텀을 가능하게 해줍니다.

- @Component VS @Bean
여지껏 @Bean과 @Component를 사용하여 빈을 만들고 주입시켰습니다.
이제 둘 사이의 차이점을 정리해봅시다.

* @Bean은 메소드레벨의 어노테이션이고 @Component는 클래스레벨의 어노테이션이다.
* @Component은 @Configuration이 필요 없지만, @Bean은 그렇지 않습니다.
* 외부라이브러리로부터 빈을 만들고 싶다면, @Component를 붙히는 것만으로는 부족합니다. 왜냐하면 외부라이브러리의 클래스파일은 수정할 수 없기 때문입니다. 하지만 @Bean과 함께 해당객체를 리턴하는 방법을 사용할 수 있습니다.
* @Component에는 이를 이용한 여러가지 특수화된 어노테이션들이 있지만 @Bean은 없습니다.

두가지 어노테이션 다 좋지만 일반적인 스프링개발자들은 @Component를 더 선호합니다.
일반적으로 @Bean은 수정이 불가능한 객체를 빈으로 만들때 많이 사용합니다.

- @Component를 이용한 특수화된 어노테이션들
전에 언급했듯이 @Component에는 특수화된 어노테이션들이 있습니다.

* @Service 는 비즈니스 로직만을 포함하는 계층의 클래스레벨 어노테이션입니다.
* @Controller / @RestController 는 웹환경에서 사용할 수 있는 컨트롤러 어노테이션입니다.
* @Repository 는 외부 데이터저장공간을 활용하여 작업할 수 있게 해주는 클래스레벨 어노테이션입니다.





