메모작성 어플리케이션을 개발한다고 상상해봅시다.
메모정보를 앱에 저장하려면 우리는 RDB를 사용해야 합니다.
이미 알다시피 RDB는 테이블과 테이블간의 연관관계를 포함하고 있는 DB입니다.
우리는 자바객체를 이용해 어플리케이션을 만들 것 입니다.
자바객체를 RDB 테이블로 변환하려면 ORM 솔루션을 사용해야 합니다.
여러가지 솔루션이 있지만 자바에서의 표준 인터페이스는 Jakarta Persistence JPA입니다.
이 솔루션을 통해 자바객체데이터를 영구적으로 만드는 방법을 알아봅시다.

- JPA 표준
기본적으로 JPA는 3가지 주요 개념으로 이루어져 있습니다.

* API : API는 ORM 제공자와의 상호작용을 구성할 수 있는 인터페이스 집합을 정의합니다.
인터페이스는 JPA 3.0버전 이후엔 jakarta.persistence 패키지에 위치해 있고 
그 이전엔 javax.persistence 패키지에 위치해 있습니다.

* JPQL(Java Persistence Query Language) : SQL과 굉장히 비슷하지만 요청은 객체로 만들어 집니다.

* Metadata 메타데이터를 설명하는 데 사용하는 객체에 대한 어노테이션 집합입니다.
이 어노테이션은 어떤 객체가 테이블로 저장될지를 정의합니다.
XML과 어노테이션을 사용하는 방법이 있습니다.

이제 기본적인 개념에 대해 친숙해져봅시다.
DB로부터 가져온 데이터를 자바객체로 표현하기 위해선 엔티티라는것을 사용해야 합니다.
엔티티는 간단한 자바 클래스입니다.
엔티티는 DB의 테이블을 표현합니다.
엔티티의 필드는 테이블컬럼이 되고 각 엔티티 인스턴스는 테이블 열을 표현합니다.
엔티티는 기본적인 규칙을 따르는데요.
엔티티는 @Entity 어노테이션과 함께 고유한 식별자, 즉 PK를 포함해야 합니다.
XMl JPA 설정 파일로도 가능합니다.
그리고 엔티티의 접근제한자는 public이나 protected 여야 하고 no-argument 생성자를 가져야 합니다.

JPA는 쉽게 말해 자바객체와 DB 데이터간의 변환을 돕습니다.

- JPA 구현체
JPA는 사양이고 즉 구현체를 필요로 합니다.
JPA 그 자체로는 객체를 저장하거나 관리할 수 없습니다.
JPA는 구현해야 할 사양을 제공하고, 각 JPA 구현체마다 구현이 다릅니다.

제일 유명한 구현체는 Hibernate입니다.
그 외에도 Oracle TopLink, EclipseLink, Apache OpenJPA 등이 있습니다.

- JPA 와 스프링/스프링부트

스프링 데이터 JPA는 JPA를 통해 여러 RDB와 작업할 수 있게 도와줍니다.
주요 개념은 리포지토리입니다.
JPA객체를 이용하여 리포지토리와 상호작용하는 여러가지 인터페이스들이 있습니다.
예를들어 CrudRepository 인터페이스는 기본적인 CRUD연산을 제공합니다.
(JPA를 꼭 스프링과 사용할 수 있는 것은 아닙니다. 스프링없이도 JPA를 사용할 수 있습니다.)

부트에선 spring-boot-starter-data-jpa 모듈을 추가해주면 됩니다.
스프링부트의 JPA구현체 기본설정은 Hibernate입니다.



