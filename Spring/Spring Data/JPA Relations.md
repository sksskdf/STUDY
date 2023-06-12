두 엔티티를 연결시키는 연관관계에는 크게 네가지가 있습니다.

1. One-to-one
2. One-to-many
3. Many-to-one
4. Many-to-many

JPA는 이러한 관계들을 선언할 수 있는 어노테이션들을 제공하고,
이번장에서는 이러한 어노테이션들과 어떤식으로 엔티티간의 관계를 정의하는지에 대한 방법에 대해 알아보겠습니다.

- One-to-One 연관관계
트위터 어플리케이션을 개발한다고 상상해봅시다.
어플리케이션에는 유저가 로그인할 수 있는 User 테이블, 유저의 상세정보를 포함하는 User_Details 테이블이 필요합니다.
한 명의 User에는 한 개의 User_Detail이 있기 때문에 이러한 관계는 One-to-one 연관관계라고 부릅니다.

이러한 관계를 정의하려면 @OneToOne 어노테이션을 사용해야 합니다.
어노테이션의 위치는 엔티티가 참조하는 다른 엔티티 필드위에 선언합니다.
@JoinColumn 어노테이션을 이용해 매핑할 컬럼의 이름을 정해줄 수 있습니다.

@Entity
public class User {
    
    @Id
    private long id;
	
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDetails user_details;

}

@Entity 
public class UserDetails {
	
    private long user_id;
	
    @Id
    private long user_detail_id;
	
    private String name;
    private String location;
    private String email;
	
}


User 엔티티는 참조하고 있는 UserDetail에 대해 알고 있지만
반대로는 그렇지 않은 상황입니다.
이러한 관계를 단방향 관계라고 하며
참조를 갖는 쪽을 소유측이라고 하고 소유측이 외래키의 주인이 됩니다.

- 단방향 One-to-Many 연관관계
우리의 트위터 어플리케이션에서 유저가 트윗을 포스팅 할 수 있게 하려고 합니다.
한 유저는 여러개의 트윗을 포스팅할 수 있습니다.
이러한 관계를 One-to-many 관계라고 합니다.

이러한 연관관계를 구현하려면 @OneToMany 어노테이션을 사용해야 합니다.

@Entity
public class User {

    @Id
    private long id;

    @OneToMany
    @JoinColumn(name = "user_id", nullable = false)
    private List<Tweet> tweets = new ArrayList<>();
}

@Entity
public class Tweet {

    @Id
    @Column(name = "tweet_id")
    private long id;
}

@JoinColumn을 안붙히면 연관관계의 주인을 모르므로 두 테이블의 매핑테이블이 생성된다.
반드시 이 어노테이션을 선언해서 관계의 주인을 정해주자.

- 양방향 Many-to-One 연관관계
양방향 연관관계에서는 두 엔티티가 서로의 참조에 대해 알고 있다.
양방향 관계에서는 소유측과 역소유측이 존재한다.
연관관계에서 소유측은 항상 “다” 측이다.
소유측이란 외래키를 갖고 있는 쪽을 말한다.
User와 Tweet의 예시에서 다 쪽은 Tweet이므로 연관관계의 주인, 즉 외래키를 갖고 있는 테이블은 Tweet테이블이다.

단방향 many-to-one 관계를 정의할 수도 있지만 일반적으로 양방향으로 많이 쓴다.

@Entity
public class Tweet {

    @Id
    @Column(name = "tweet_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}


@Entity
public class User {

    @Id
    private long id;

    @OneToMany(mappedBy = "user")
    private List<Tweet> tweets = new ArrayList<>();

}


역소유측인 User테이블에서는 mappedBy 파라미터를 이용해 연관관계의 주인이 반대측에 있음을 알려주어야 합니다.
mappedBy 파라미터에는 반대측에서의 참조 필드 이름을 적어줍니다.

