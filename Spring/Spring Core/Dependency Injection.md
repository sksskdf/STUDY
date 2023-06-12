- 의존성과 의존성 주입
의존성이란 어떤 한 객체가 다른 객체의 기능을 사용할 때의 두 객체간의 관계입니다.
즉 클래스A가 클래스B에 의존하고 있는 것입니다.

OOP에서 의존성은 클래스내부의 인스턴스 생성과 같은 형태로 나타납니다.
만들어진 인스턴스를 통해 클래스는 다른 클래스의 메서드에 접근할 수 있습니다.

DI는 객체생성작업을 코드의 다른 부분으로 전송하는 프로세스입니다.
이러한 작업은 코드간의 느슨한 결합을 만들어줍니다.

- DI 예제

interface Injector is
  method function()


class Example implements Injector is
  method function() is ...
  ...


class Dependent is
  Example instance

  method useInstance(Injector instance) is
    instance.function()

Dependent 클래스는 클래스 대신 인터페이스에 의존하고 있습니다.
객체 생성은 다른 클래스로 이동되었으며
Injector인터페이스는 Dependent에 다른 구현을 제공합니다.

그러나 이것은 빙산의 일각에 불과합니다. 
고려해야 할 다양한 유형의 종속성 주입이 있습니다.

- DI의 종류
DI의 종류에는 크게 세가지가 있습니다.

* Method(Interface) Injection - 메서드를 통해 전달 된 클래스를 통해 인터페이스나 다른 클래스에
접근하는 의존성입니다. 이전 예제 의사코드가 이에 해당합니다.

* Property(Setter) Injection - 의존성이 분리된 세터메서드를 통해 전달됩니다.

* Constructor Injection - 생성자를 통해 의존성이 전달됩니다.

- 왜 DI가 필요할까?
DI는 코드간의 비교적 덜 상호의존적인 관계를 만들게 해주고,
의존성을 클래스 외부에서 주입함으로써 클래스의 재사용성을 높여줍니다.

코드의 확장, 수정에서 유용하게 사용할 수 있습니다.
한 방식으로 인스턴스를 활용하는게 아니라 다양한 방식으로 인스턴스를 활용할 수 있습니다.