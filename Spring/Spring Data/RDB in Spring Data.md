스프링데이터는 모든 관계형DB와 작업할 수 있도록 통합된 방법을 제공합니다.
제일 일반적인 방법은 스프링 데이터 JPA 입니다.
이번 장에서는 제일 많이 사용하는 DB (H2, PostgreSQL, MySQL)와의 작업을 단계별로 알아보겠습니다.
같은 접근방식으로 Oracle과 같은 다른 DB로 작업할 수도 있습니다.

- 일반적인 접근
빌드툴을 이용해 만들어진 스프링부트프로젝트가 있다고 상상해봅시다.
스프링 데이터 JPA를 이용해 DB와 작업을 하려면, 다음 4가지 단계를 거쳐야 합니다.

1. 프로젝트에서 사용할 DB 벤더를 정합니다.
2. 빌드툴을 이용해 JDBC드라이버를 추가합니다.
3. 데이터소스를 작성합니다.
(spring.datasource.driverClassName : 최신 버전의 스프링부트에서는 JDBC 드라이버를 확인하고 이 속성에 대해 자동으로 설정하지만
연습할때는 명시적으로 속성을 정의해주는게 좋습니다.
spring.datasource.url : 연결할 DB의 URL을 설정합니다.
spirng.datasource.username / password : DB계정 정보를 적습니다.)

4. JPA 의존성을 추가해줍니다. 
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

언어를 설정하려면 데이터베이스의 SQL 언어에 따라 spring.jpa.database-platform 속성을 사용해야 합니다. 일부 데이터베이스에는 기본 방언이 있기 때문에 항상 필요한 것은 아닙니다.

처음 세가지 단계는 JPA에서만 유효하지 않습니다.
Spring JDBC를 사용할때도 처음 세가지 단계는 동일 합니다.

- H2 사용하기
H2는 자바플랫폼에서 동작하는 가벼운 오픈소스 관계형DB 입니다.
스프링부트에 의해서 기본적으로 제공되고, 다른 DB에 비해 초기설정이 간편하고 빠릅니다.
만약 공부목적의 프로젝트라면 스프링부트에 좀 더 집중할 수 있을만큼 DB관련설정이 적습니다.
그래도 H2도 최소한의 설정은 필요로 합니다.

H2 DB의 저장방식에는 크게 두가지 방법이 있습니다.
* 인메모리 DB : H2가 실행중일때만 지속되는 저장방식입니다.
* 드라이브 저장방식 : 파일시스템에 DB를 저장후 재사용하는 저장방식입니다.

H2를 사용하려면 다음과 같은 의존성을 추가해줍니다.
runtimeOnly 'com.h2database:h2'

이제 H2 설정을 시작할 준비가 되었습니다.
application.properties 파일에서 설정할 수 있습니다.
우리는 데이터소스, 즉 DB의 저장방식, DB 타입, DB와의 연결 URL등을 설정해 줄 것입니다.

spring.datasource.driverClassName=org.h2.Driver
spring.datasource.url=jdbc:h2:file:~/testdb
spring.datasource.username=sa
spring.datasource.password=sa

(인메모리 DB로 사용하고싶으면 jdbc:h2:mem:testdb 와 같은 방식으로 설정할 수도 있습니다.)

또한 spring-boot-starter-data-jpa 의존성도 추가해주어야 합니다.

어플리케이션을 시작하면 아래와 같은 JPA와 관련된 로그를 확인 할 수 있습니다.

Bootstrapping Spring Data JPA repositories in DEFAULT mode.
Finished Spring Data repository scanning in 3 ms. Found 0 JPA repository interfaces.

게다가 자동적으로 생성된 DB파일도 확인 할 수 있습니다.

다른 DB와는 다르게, H2는 DB를 관리 할 수 있는 내장콘솔을 제공합니다.
이러한 콘솔을 사용하려면 다음과 같은 단계를 따라야 합니다.

implementation 'org.springframework.boot:spring-boot-starter-web'
의존성 추가

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
(설정 안할시 자동으로 설정됨)

spring.h2.console.enabled=true
spring.h2.console.settings.trace=false

trace파라미터는 H2 콘솔과 관련된 로그를 남길것인지에 대한 여부를 묻습니다.

이제 어플리케이션을 시작하면 다음과 같은 로그를 확인할 수 있습니다.

H2 console available at '/h2-console'. Database available at 'jdbc:h2:file:~/testdb'

브라우저를 이용해 localhost:8080/h2-console 로 접속을 시도하면 H2 콘솔을 만날 수 있습니다.

spring.h2.console.path=/h2
콘솔 url을 바꿀 수도 있습니다.

H2는 사용하기 간편하지만 일반적인 실제 프로젝트에서의 DB는 컴퓨터 외부에 저장되야 하므로 실제프로젝트에선 그리 적절하지 않습니다.

- MySQL 사용하기
알다시피 MySQL은 세계적으로 가장 유명한 RDB입니다.

implementation 'mysql:mysql-connector-java'

spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/testdb
spring.datasource.username=testuser
spring.datasource.password=password

spring.jpa.database-platform=org.hibernate.dialect.MySQL5Dialect
(안해도 됨)

- 포스트그레스큐엘 사용하기

runtimeOnly 'org.postgresql:postgresql'

spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/testdb
spring.datasource.username=testuser
spring.datasource.password=password

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect


