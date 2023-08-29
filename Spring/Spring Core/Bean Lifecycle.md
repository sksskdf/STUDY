스프링컨테이너의 주요 책임중 하나는 빈을 관리하는 것입니다.
빈을 스프링어플리케이션의 뼈대가 됩니다.
빈을 관리하는것은 복잡합니다.

이번장에서는 빈의 생명주기에 대해 알아보고 생명주기를 커스텀할 수 있는 기능들에대해 알아보겠습니다.

- 빈 생명주기 간략히 보기
스프링 어플리케이션이 실행되면 스프링 컨테이너도 시작됩니다.
컨테이너는 빈의 생명주기를 관리합니다.

1. 컨테이너 시작
2. 빈 생성
3. 의존성 주입
4. 빈 초기화
5. 빈 사용준비 완료
6. 빈 사용
7. 빈 파괴

(프로토타입빈은 빈을 파괴시키지 않고 사용자정의를 허용하지 않는다.)

어플리케이션이 여러개의 빈을 갖고 있고 그 빈들끼리 서로 의존성을 갖는다고 상상해봅시다.
컨테이너는 의존성의 순서에 맞게 빈을 생성할 것입니다.

이 생명주기의 개별적인 부분들은 필요에 따라 커스텀화 할 수 있습니다.
빈 초기화와 파괴는 특히 중요합니다.
왜냐하면 주로 프로그래머들은 그 둘을 커스텀화 하기 때문입니다.

- 빈 초기화와 파괴의 커스텀화
빈이 사용준비상태가 되면, 초기화를 필요로 합니다.
스프링컨테이너는 초기화를 자동적으로 하지만 초기화작업은 필요에 따라 커스텀화 할 수 있습니다.
예를들어, 어떤 리소스라던가 파일을 읽는다던가, 데이터베이스와 연결등을 불러올 수도 있습니다.
동시에 빈이 더이상 어플리케이션에서 필요가 없어지면 빈을 파괴하기 전에
연결을 닫는다던가 불 필요한 파일 정리등과 같은 커스텀화가 필요할 수 있습니다.

이러한 커스텀화를 하는 여러 방법이 있습니다.

* 특별한 어노테이션 사용(@PostConstruct, @PreDestory ..)
* 인터페이스 구현 (InitializingBean, DisposableBean)
* XML 정의 

어떤 방법을 쓰건 빈초기화와 파괴에 필요한 별개의 메서드가 필요할 것입니다.
이러한 메서드에 대한 규칙은 아래와 같습니다.

* 메서드는 모든 접근제어자를 가질 수 있습니다.
* 메서드는 인수를 받을 수 없습니다.

다양한 커스텀화 방법들을 시연하기 위해 간단한 예제를 볼 것입니다.

- 어노테이션을 사용해서 커스텀화 하기
빈의 초기화와 파괴 작업을 커스텀할 수 있는 가장 쉬운 방법은 
@PostConstruct 와 @PreDestory 어노테이션을 사용하는 것 입니다.

```
@Component
class TechLibrary {
    private final List<String> bookTitles = 
            Collections.synchronizedList(new ArrayList<>());

    @PostConstruct
    public void init() {
        bookTitles.add("Clean Code");
        bookTitles.add("The Art of Computer Programming");
        bookTitles.add("Introduction to Algorithms");
        System.out.println("The library has been initialized: " + bookTitles);
    }

    @PreDestroy
    public void destroy() {
        bookTitles.clear();
        System.out.println("The library has been cleaned: " + bookTitles);
    }
}
```

이러한 컴포넌트를 포함한 어플리케이션이 구동되면
스프링은 이런 어노테이션이 붙은 메서드를 한번만 호출할 것 입니다.

The library has been initialized: [Clean Code, The Art of Computer Programming, Introduction to Algorithms]

2022-04-22 12:08:06.515  INFO Started HsSpringApplication in 0.382 seconds (JVM running for 5.698)

The library has been cleaned: []

Process finished with exit code 0

컴포넌트가 아닌 @Bean을 사용해도 같은 결과를 얻을 수 있습니다.

@Configuration
class Config {

    @Bean(initMethod = "init", destroyMethod = "destroy")
    public TechLibrary library() {
        return new TechLibrary();
    }
}

class TechLibrary {
    private final List<String> bookTitles = 
            Collections.synchronizedList(new ArrayList<>());

    public void init() {
        bookTitles.add("Clean Code");
        bookTitles.add("The Art of Computer Programming");
        bookTitles.add("Introduction to Algorithms");
        System.out.println("The library has been initialized: " + bookTitles);
    }

    public void destroy() {
        bookTitles.clear();
        System.out.println("The library has been cleaned: " + bookTitles);
    }
}

@Bean에 init과 destroy를 명시하지 않고
@PostConstruct와 @PreDestroy를 사용할수도 있습니다.

- 인터페이스 사용해서 커스텀화하기

@Component
class TechLibrary implements InitializingBean, DisposableBean {
    private final List<String> bookTitles = 
            Collections.synchronizedList(new ArrayList<>());

    @Override
    public void afterPropertiesSet() throws Exception {
        bookTitles.add("Clean Code");
        bookTitles.add("The Art of Computer Programming");
        bookTitles.add("Introduction to Algorithms");
        System.out.println("The library has been initialized: " + bookTitles);
    }

    @Override
    public void destroy() {
        bookTitles.clear();
        System.out.println("The library has been cleaned: " + bookTitles);
    }
}

- 빈을 위한 후처리기
빈 생명주기를 커스텀화할 수 있는 방법들에 대해서 알아보았습니다.
이번엔 조금 더 직관적인 방법에 대해 알아보겠습니다.
BeanPostProcessor 인터페이스를 이용하여 빈을 초기화 할 수도 있습니다.
후처리기를 사용하면 빈이 초기화되기 전이나 직후에 사용자 정의 작업을 실행할 수 있으며 
수정된 빈을 반환할 수도 있습니다.

후처리기를 사용하려면

1. BeanPostProcessor를 구현해야함
2. postProcessBeforeInitialization이나 postProcessAfterInitialization 메서드를 오버라이드해야함

@Component
class PostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(
            Object bean, String beanName) throws BeansException {

        System.out.println("Before initialization: " + beanName);

        return BeanPostProcessor.super
                .postProcessBeforeInitialization(bean, beanName);
    }

    @Override
    public Object postProcessAfterInitialization(
            Object bean, String beanName) throws BeansException {

        System.out.println("After initialization: " + beanName);

        return BeanPostProcessor.super
                .postProcessAfterInitialization(bean, beanName);
    }
}

이 코드를 실행하면 빈들의 목록과 함께 빈들의 생명주기의 단계들이 출력됩니다.

포스트프로세서는 조금 더 향상된 개념입니다.
현재로서는 기본 개념만 알아도 충분합니다.
@PreDestroy나 @PostConstruct와는 다르게 포스트프로세서는 다양한 빈들에 대한 처리를
동일한 방식으로 처리합니다.
프로세서는 비즈니스로직에 묶여있지 않고
빈을 수정하거나 포장하는 구조적인 코드로 제공됩니다.
