JPA의 주요 구성요소중 하나는 JPA 엔티티입니다.
엔티티는 DB와 자바어플리케이션이 데이터를 주고받을 수 있게 해주는 객체입니다.

- JPA 엔티티 만들기
JPA 엔티티의 선언방법과 구조에 대해 알아봅시다.
엔티티는 POJO 클래스이고 단일 테이블을의 구조를 나타냅니다.
엔티티는 속성을 통해 컬럼을 표현하고
각 인스턴스는 테이블의 열을 표현합니다.
JPA 엔티티는 기본생성자를 포함해야 합니다.
왜냐하면 JPA는 동적으로 객체를 인스턴스화 하는데
빈(empty) 객체를 먼저 생성하고 알맞은 값들을 DB로부터 읽어서 값을 채우기 때문입니다.

@Entity
@Table(name = "orders")
public class Order {
}

테이블의 이름은 객체의 이름이 됩니다.
하지만 @Table을 사용하면 테이블의 이름을 따로 정할 수 있습니다.

- 영구 필드 만들기
엔티티 속성에는 기본적인 규칙들이 있습니다.
첫째로 각 속성은 private이거나 protected, package-private이어야 합니다.
스태틱이나 파이널이면 안됩니다.

@Entity
@Table(name = "orders")
public class Order {

    @Column(name = "product_type")
    private String productType;

}

컬럼또한 자동으로 필드이름과 매칭되고 별도로 이름을 지정해주려면 @Column을 사용할 수 있습니다.

- 시간 및 ENUM 데이터 사용하기
다양한 경우에 시간데이터를 사용해야할 때가 있습니다.
이럴땐 @Temporal 을 사용할 수 있습니다.

@Entity
@Table(name = "orders")
public class Order {

    @Column(name = "product_type")
    private String productType;

    @Temporal(TemporalType.DATE)
    @Column(name = "order_date")
    private Date orderDate;

}

(JDK8버전 이후의 최근 JPA버전에서는 LocalDate와 함께 어노테이션을 생략할 수 있습니다.)

ENUM타입은 @Enumerated를 사용할 수 있습니다.

@Entity
@Table(name = "orders")
public class Order {

    @Column(name = "product_type")
    private String productType;

    @Temporal(TemporalType.DATE)
    @Column(name = "order_date")
    private Date orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private Status orderStatus;

}

여기에서 열거형이 String 유형임을 지정했습니다. 
ENUM이 숫자 유형임을 지정하려면 EnumType.ORDINAL을 대신 사용할 수 있습니다.

- 비영구 필드 정의하기
@Transient 를 통해 필드를 DB에 저장되지 않게 할 수도 있습니다.

- PK 설정과 자동생성 값 설정
RDB에서는 테이블마다 PK라고하는 고유식별자가 있습니다.
@Id를 사용하여 엔티티의 ID를 설정할 수 있습니다.
(ID 필드를 설정할땐 long타입을 사용해야 합니다.)

@GeneratedValue를 통해 ID값 자동생성을 사용할 수 있습니다.

* AUTO : JPA가 적절하다고 판단되는 ID 생성 전략을 선택할 수 있습니다.
* IDENTITY : AUTO_INCREMENT와 같은 데이터베이스 ID를 사용하여 값을 생성할 수 있습니다.
* SEQUENCE : 데이터베이스 시퀀스를 사용하여 값을 ​​생성합니다.
* TABLE : 이 옵션을 사용하면 테이블을 사용하여 값을 생성합니다.

AUTO 와 IDENTITY 정도로도 충분합니다.
SEQUENCE 전략은 시퀀스이름, 초기화값, 허용크기를 추가적으로 제공해야 합니다.
TABLE 전략은 PK 컬럼 이름과 값을 제공해야 합니다.


