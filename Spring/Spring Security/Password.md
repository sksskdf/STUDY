유저정보를 저장할땐 패스워드와 같이 민감한 정보는 암호와와 같은
보안설정과 함께 저장해야합니다.

- 암호화와 해싱 원칙
개인정보를 보호하기 위한 제일 좋은 방법은 암호화를 하는 것입니다.
암호화에는 대칭과 비대칭 두 종류가 있습니다.
둘의 제일 큰 차이점은 암호화화 복호화에 사용되는 키가 다르다는 것입니다.
먼저 대칭 암호화 알고리즘에 대해 알아보겠습니다.
비대칭 암호화와는 다르게 암호화와 복호화 둘 다 같은 키를 사용합니다.
대칭 암호호화 알고리즘의 제일 널리 알려진 알고리즘은 Caesar Cipher 입니다.
이 알고리즘을 사용하면 누구나 정보를 복호화 할 수 있습니다.
데이터보안을 위해 이러한 보안키는 안전한 장소에 보관해야 합니다.
개인 데이터의 경우 법률에 의해 저장과 암호화를 신중히 해야하는 면도 있습니다.
카드정보를 저장하는 경우 PCI DSS라는 국제적인 지불 시스템에 관련된 규정을 따라야 합니다.

비밀번호는 일반적으로 해시 되어야 합니다.
일반적으로 유저가 시스템에 로그인할 때마다 비밀번호를 해시하고 DB에 저장된 해시와 비교합니다.
이러한 이유로 인해 유저가 비밀번호를 잊어버린 경우 재설정만 할 수 있고 원래 비밀번호를 알아낼 수는 없습니다.
해시를 사용하면 만약 공격자가 해시된 비밀번호 리스트를 가졌다고 해도 바로 사용할 수 없습니다.
그럼에도 불구하고 해시된 비밀번호는 무차별 대입공격이나 레인보우 테이블 공격을 통해 해킹될 수 있습니다.
무차별공격을 늦추려면 견고한 해싱 알고리즘을 사용하면 됩니다.
레인보우 테이블의 경우 해시전에 비밀번호에 문자열을 추가하여 공격을 방지할 수 있습니다.
이를 소금을 친다고 표현합니다.

해싱, Salting, 암호화는 매우 복잡한 과정입니다.
보안 구현에 자잘한 버그는 치명적인 결과로 이어지기도 합니다.
그러므로 보안전문가에게 보안을 맡기는 것이 더 낫습니다.
스프링시큐리티에서는 스프링 Crypto 모듈을 사용할 수 있습니다.
스프링 Crypto는 암호화, 키 생성기, 암호 인코더 등등을 포함합니다.

- 프로젝트에 스프링 Crypto 추가하기

implementation 'org.springframework.boot:spring-boot-starter-security:2.7.2'
implementation 'org.springframework.security:spring-security-crypto:5.7.2'

- 암호화기 와 키 생성기
스프링 크립토는 암호화기를 위한 두가지 인터페이스를 제공합니다.
* BytesEncryptor
* TextEncryptor

BytesEncryptor는 byte[] 타입에 대한 암호화 복호화를 돕습니다.
TextEncryptor는 String 타입에 대한 암호화 복호화를 돕습니다.

AesBytesEncryptor라는 빈을 정의해봅시다.

@Bean
public BytesEncryptor aesBytesEncryptor() {
    String password = "hackme"; // should be kept in a secure place and not be shared
    String salt = "8560b4f4b3"; // should be hex-encoded with even number of chars
    return Encryptors.standard(password, salt);
}

256비트 AES 대칭 암호화 알고리즘을 사용하여 BytesEncryptor를 사용할 수도 있습니다.
미국정부에서 승인한 가장 안전한 알고리즘이기도 합니다.

byte[] inputData = {104, 121, 112, 101, 114, 115, 107, 105, 108, 108};
byte[] encryptedData = bytesEncryptor.encrypt(inputData);
byte[] decryptedData = bytesEncryptor.decrypt(encryptedData);

System.out.println("Input data: " + new String(inputData));
System.out.println("Encrypted data: " + new String(encryptedData));
System.out.println("Decrypted data: " + new String(decryptedData));

대부분의 경우 암호화해야 하는 데이터는 문자열일 것입니다.
이 경우에는 TextEncryptor를 사용하는 것이 좋습니다.
NoOpTextEncryptor, HexEncodingTextEncryptor 두가지 구현이 있습니다.

NoOp는 No Operation을 뜻합니다.

HexEncodingEncryptor는 BytesEncryptor를 내부적으로 사용합니다.
암호화된 데이터는 16진수로 인코딩되어 저장하기 용이합니다.

@Bean
public TextEncryptor hexEncodingTextEncryptor() {
    String password = "hackme"; // should be kept in a secure place and not be shared
    String salt = "8560b4f4b3"; // should be hex-encoded with even number of chars
    return Encryptors.text(password, salt);
}

String inputData = "hyperskill";
String encryptedData = textEncryptor.encrypt(inputData);
String decryptedData = textEncryptor.decrypt(encryptedData);

System.out.println("Input data: " + inputData);
System.out.println("Encrypted data: " + encryptedData);
System.out.println("Decrypted data: " + decryptedData);

위의 예시들에서는 salt를 하드코딩했습니다.
그러나 스프링에 의해 제공되는 메커니즘을 사용할 수도 있습니다.

String salt = KeyGenerators.string().generateKey();

- 암호 인코더
암호는 PasswordEncoder에 의해 해시됩니다.
이 인터페이스는 입력된 암호를 인코딩하고 원래 비밀번호와 해시를 비교합니다.
가장 단순한 인코더 구현체인 NoOpPasswordEncoder를 사용해 봅시다.

PasswordEncoder noOpEncoder = NoOpPasswordEncoder.getInstance();

String rawPassword = "hackme";
String encodedPassword = noOpEncoder.encode("hackme");
boolean isMatched = noOpEncoder.matches(rawPassword, encodedPassword);

System.out.println("Encoded password: " + encodedPassword);
System.out.println("Match: " + isMatched);

Encoded password: hackme
Match: true

하지만 이 인코더는 안전하지 않으므로 더 이상 사용되지 않습니다.
레거시라이브러리나 테스트목적에서만 사용됩니다.
권장하는 구현체는 다음과 같습니다.

* BCryptPasswordEncoder
* PbkdfPasswordEncoder
* SCryptPasswordEncoder

BCryptPasswordEncoder의 사용예시를 보겠습니다.

int strength = 7;
PasswordEncoder bCryptEncoder = new BCryptPasswordEncoder(strength);

String rawPassword = "hackme";
String firstEncodedPassword = bCryptEncoder.encode(rawPassword);
String secondEncodedPassword = bCryptEncoder.encode(rawPassword);

System.out.println("First encoded password: " + firstEncodedPassword);
System.out.println("Second encoded password: " + secondEncodedPassword);

First encoded password: $2a$07$Q/XxLrLPHniRGl9PNSLiSuPGcDkbv54U3.DAEQXRpSd5qKXpCk2V2
Second encoded password: $2a$07$.8cNtKbeAqDrxsPAquxRRuSYpg6RKCkqxoW70Oxxht7yKLPUcXQye

인코더 생성자에 파라미터를 넘긴것을 볼 수 있습니다.
strengths는 알고리즘에 사용한 로그 라운드 입니다.
이러한 방식은 많은 연산을 수행해야 하므로 큰 숫자를 사용하기 위해선 컴퓨터의 성능을 고려해야 합니다.

같은 암호를 encode 했지만 다른 결과가 출력됐습니다.
bCrypt 알고리즘의 구현에 의해 salt를 자동으로 생성하여 추가했기 때문입니다.

마지막으로 DelegatingPasswordEncoder에 대해 알아보겠습니다.
런타임에 알고리즘을 선택하는 것이 가능합니다.
사용된 알고리즘은 {id}encodedPassword 같은 형식으로 비밀번호와 함께 저장됩니다.


