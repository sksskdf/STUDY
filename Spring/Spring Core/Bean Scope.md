스프링은 빈을 만들 수 있는 다양한 어노테이션을 제공한다.
빈을 어플리케이션 시작 시 만들어지고 필요한 곳에 자동으로 주입된다.
일반적으론 컨테이너의 기본설정에 의해 빈을 사용하지만
컨테이너 설정을 사용자정의에 맞게 바꿀 수도 있다.
커스텀화 할 수 있는 옵션중에서는 빈의 범위와 빈의 생명주기가 있다.
빈의 생명주기란 생성, 주입, 삭제의 시점을 말한다.
이번 장에서는 다양한 범위에 대해 알아볼 것이고 이로 인해 빈관리를 유연하게 할 수 있게 될것이다.

- 빈의 범위 정의하기
알다시피 스프링빈은 기본적으로 싱글톤이다.
이 말은 빈은 오직 한번만 생성되고 이것을 재사용한다는 뜻이다.
결과적으로 같은 빈에 대한 여러개의 참조를 갖게 된다.
여기서 싱글톤은 빈의 범위의 종류들중 하나 일 뿐이다.

전체적으로 스프링은 여섯개의 범위를 제공한다.
싱글톤, 프로토타입, 리퀘스트, 세션, 어플리케이션, 웹소켓
처음 두개의 범위는 모든 스프링어플리케이션에서 사용할 수 있다.
나머지 네개의 범위는 HTTP통신을 베이스로하는 웹앱에서만 사용할 수 있다.

이번장에서는 싱글톤과 프로토타입에 대해 알아보고 나머지 범위들에 대한 간략한 정보 또한 알아볼 것이다.

범위를 설정하려면 @Scope를 사용하여 이름과 값을 정의해야 한다.
이 어노테이션은 @Bean과 @Component와 같이 사용할 수 있다.

- 예제의 템플릿
범위의 개념을 배우기 위해서 간단한 예시를 만들어보자.

```java
@Configuration
public class AppConfig {

    @Bean
    public AtomicInteger createCounter() {
        return new AtomicInteger();
    }
}

@Component
public class AppRunner implements CommandLineRunner {
    private final AtomicInteger counter1;
    private final AtomicInteger counter2;

    public AppRunner(AtomicInteger counter1, AtomicInteger counter2) {
        this.counter1 = counter1;
        this.counter2 = counter2;
    }

    @Override
    public void run(String... args) {
        counter1.addAndGet(2);
        counter2.addAndGet(3);
        counter1.addAndGet(5);
        System.out.println(counter1.get());
        System.out.println(counter2.get());
    }
}
```

- 싱글톤 범위
앞서 말했다시피 빈은 기본적으로 싱글톤 범위를 갖고, 이는 일반적인 어플리케이션에서
유용하게 사용된다.
범위는 @Scope를 사용해 설정해 줄수 있다.

```java
@Bean
@Scope("singleton")
public AtomicInteger createCounter() { /* ... */ }
```

상수를 사용할 수도 있다.

```java
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
```

위의 예제를 실행해보면 같은 값이 출력되는걸 확인할 수 있다.
왜냐하면 빈은 싱글톤이고 counter1과 counter2가 같은 빈을 참조하기 때문이다.

- 프로토타입 범위
어떤 경우에는 같은 빈을 쓰고싶지 않을 수도 있다.
싱글톤이 아닌 빈을 만들고 싶다면 프로토타입범위를 사용하면 된다.
프로토타입을 사용할땐 주입될때마다 새로운 빈을 생성한다.
프로토타입으로 빈을 생성하면 @Scope에 prototype을 명시해주어야 한다.

```java
@Bean
@Scope("prototype")
public AtomicInteger createCounter() { /* ... */ }
```

상수를 사용할수도 있다.

```java
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
```

프로타타입빈으로 위의 예제를 생성하면 출력은 다음과 같다.
7
3

counter1과 counter2가 서로 다른 빈인걸 확인할 수 있다.

프로토타입빈을 다른 포로토타입빈에 주입시키거나
싱글톤을 프로토타입에 주입시킬수도 있다.

- 다른 빈 범위
* 리퀘스트 는 HTTP 요청에 대한 전체적인 생명주기내에서만 사용할 수 있다.
다양한 스프링컴포넌트에 의해 요청을 처리하는 경우 리퀘스트 범위의 빈은 
이러한 요청들에 대한 컴포넌트들에서만 사용할 수 있다.

* 세션 은 모든 HTTP쿠키/세션에서만 사용가능한 빈범위이다.

* 어플리케이션 은 같은 서블릿컨텍스트내의 여러 어플리케이션에서 사용할 수 있는 범위이다.
싱글톤보다 더 넓은 범위를 갖고 있다.

* 웹소켓 은 웹소켓세션의 생명주기 내에서만 사용할 수 있다.

이 범위들중에 하나를 사용하려면 @Scope내에 request와 같은 문자열을 포함해야 하고
@RequestScope, @SessionScope, @ApplicationScope 와 같은 어노테이션을 사용할 수도 있다.
이 어노테이션들은 스프링 웹 모듈 의존성이 잡혀있어야 사용할 수 있다.



