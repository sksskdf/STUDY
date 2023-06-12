어떤 웹페이지나 파일, 혹은 비공개된 정보에 접근하려면 인증절차를 거쳐야합니다.
스프링시큐리티는 인증과 권한에 대한 모듈입니다.
스프링시큐리티는 클라이언트와 어플리케이션 사이에서 모든 요청을 가로채어
유저에 따라 설정된 권한에 따라 기능과 데이터를 허용합니다.
일반적인 보안 취약점 및 공격으로부터 앱을 보호하는데에 도움이 됩니다.

스프링시큐리티 프레임워크가 제공하는 기능들을 요약하자면 다음과 같습니다.

* 쉬운 설정, 쉬운 확장
* session fixation, clickjacking, CSRF와 같은 일반적인 공격을 보호합니다.
* 오픈소스이고 업데이트를 많이 함
* HTTP 인증, form 기반 인증, LDAP 등 많은 기능 지원
* 유저의 비밀번호를 관리 할 수 있는 편리하고 유연하고 안전한 도구 제공

- 의존성
다음과 같이 의존성을 먼저 추가해줍니다.

implementation 'org.springframework.boot:spring-boot-starter-security'

이 의존성은 자동설정과 HTTP 기본 인증, form 기반 인증 CSRF에 대한 보호등 과 같은 기본적인 
보안과 관련된 기능들을 활성화 합니다.

- 준비
새로운 스프링프로젝트를 시작하기 위해 스프링 시큐리티와 웹 의존성을 추가합니다.
간단한 index.html 파일을 /resources/static 폴더에 생성합니다.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Security Test</title>
</head>
<body>
    <h1>Access granted!</h1>
</body>
</html>

- 보안
어플리케이션 구동 후 브라우저로 접속해보면 
html에 작성한 Access granted! 라는 문구 대신 로그인창이 뜹니다.
url을 확인해보면 /login 으로 리다이렉트가 되어 있기도 합니다.

로그인 화면을 만들지도 않았는데 어떻게 로그인창이 뜰까요?

우리가 추가한 스프링 시큐리티 의존성에 의해 기본적으로 제공된 화면입니다.

콘솔창을 자세히 살펴보면 시큐리티에서 제공하는 기본 로그인 정보가 있습니다.
사용자이름의 기본설정은 user이고 패스워드는 콘솔창에서 확인 할 수 있습니다.

/logout을 통해 로그아웃을 할 수도 있습니다.

- 설정
프로퍼티파일에서 로그인정보를 변경할 수 있습니다.

spring.security.user.name=harry
spring.security.user.password=1234

(로그인정보를 설정하면 기본 패스워드 생성이 더 이상 되지 않습니다.)
