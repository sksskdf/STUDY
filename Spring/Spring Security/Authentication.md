인증은 어플리케이션에 접근을 시도하는 모든사용자를 식별하고 검증하는 것입니다.
일반적인 인증 방식은 로그인입니다.
유저가 계정정보에 일치하는 데이터를 입력하면
시스템은 해당 ID가 유효한 것으로 간주하고 액세스 권한을 부여합니다.

스프링 시큐리티 스타터 의존성을 프로젝트에 추가하면
스프링 시큐리티는 자동적으로 기본 유저를 생성하고 인증절차를 실시합니다.
대부분의 경우 한개의 유저정보로는 충분하지 않습니다.
이번장에서는 스프링시큐리티에서 인증설정을 어떻게하는지 알아볼 것 입니다.

- AuthenticationManagerBuilder
인증을 설정하려면 AuthenticationManagerBuilder라는 특별한 빌더를 사용해야 합니다.
빌더와 메서드체이닝의 도움으로 하드코딩된 인메모리 유저를 생성하고
DB와 연결하여 다른 구성을 설정할 수 있습니다.
이렇게 하기 위해선 두 단계가 있습니다.

1. AuthenticationManagerBuilder 생성
2. 빌더를 통한 설정

AuthenticationManagerBuilder를 사용하려면 
WebSecurityConfigurerAdapter 를 상속받거나 메서드를 오버라이드해야 합니다.
스프링 시큐리티는 빌더를 이 메서드 인수로 전달할 것입니다.

@EnableWebSecurity
public class WebSecurityConfigurerImpl extends WebSecurityConfigurerAdapter {
    //..
}

클래스에는 @EnableWebSecurity 어노테이션을 붙혀주어야 합니다.
이 어노테이션을 붙히면 스프링에 의해 이 클래스는 자동으로 감지됩니다.

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    //..
}

보다시피 메서드는 AuthenticationManagerBuilder를 파라미터로 받습니다.

빌더의 메서드를 이용해 하드코딩된 유저를 만드려면 inMemoryAuthentication()과 함께
메서드체이닝을 사용해야 합니다.

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
            .withUser("user1")
            .password("pass1")
            .roles();
}

유저이름과 암호 외에도 roles가 있습니다.
이 메서드는 유저 권한에 사용됩니다.
예제의 경우 아직 권한을 사용하지 않습니다.

더 많은 유저를 만드려면 and() 메서드를 사용할 수 있습니다.

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
            .withUser("user1")
            .password("pass1")
            .roles()
            .and()
            .withUser("user2")
            .password("pass2")
            .roles()
            // more users
}

예제코드와 함께 어플리케이션을 실행하면 아마 예외가 발생할 것 입니다.

java.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"

- 암호 인코더
보안상의 이유로 암호는 순수한 문자열로 저장되지 않고 무조건 인코딩이 되어야 합니다.

스프링시큐리티 암호 인코딩은 PasswordEncoder 인터페이스의 구현체로 할 수 있습니다.

스프링 시큐리티는 개발자로 하여금 암호인코더 사용을 강제합니다.
그렇지 않으면 프로그램은 제대로 동작하지 않습니다.
우리의 경우 DB사용으로 인한 암호노출의 위험성이 없지만 
그래도 시스템상 암호 인코더를 사용해야 합니다.

스프링시큐리티는 이러한 여러 인코더 구현체를 제공합니다.

프로그램이 동작하게 하기 위해 스프링시큐리티에 어떤 인코더를 사용할 것인지 알려주어야 합니다.

@Bean
public PasswordEncoder getEncoder() {
    return new BCryptPasswordEncoder();
}

이제 암호를 인코딩하고 인증작업을 진행할 수 있습니다.

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
            .withUser("user1")
            .password(getEncoder().encode("pass1")) // encoding a password
            .roles()
             // more users
            .and()
            .passwordEncoder(getEncoder()); // specifying what encoder we used
}

인코더로 NoOpPasswordEncoder를 사용할 경우 과정은 같지만 
기본 생성자가 없으므로 NoOpPasswordEncoder.getInstance(); 와 같이 사용해야 합니다.

- 예제코드들 종합해보기

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

// Extending the adapter and adding the annotation
@EnableWebSecurity
public class WebSecurityConfigurerImpl extends WebSecurityConfigurerAdapter {

    // Acquiring the builder
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        // storing users in memory
        auth.inMemoryAuthentication()
                .withUser("user1")
                .password(getEncoder().encode("pass1")) // encoding a password
                .roles()
                .and() // separating sections
                .withUser("user2")
                .password(getEncoder().encode("pass2"))
                .roles()
                .and()
                .passwordEncoder(getEncoder()); // specifying what encoder we used
    }

    // creating a PasswordEncoder that is needed in two places
    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }
}

어플리케이션을 실행하면 로그인/암호 쌍 혹은 form 기반이나 HTTP 기본 인증중 하나를 사용하여
권한을 얻을 수 있습니다.

사용자가 인증을 통과하려고 하면 스프링시큐리티는 사용자를 검색합니다.
사용자를 찾았다면 암호 인코더는 matches 메서드를 통해 입력받은 비밀번호와 저장된
비밀번호를 비교합니다.
모든게 정확하다면 사용자는 앱에 대한 접근권한을 갖고 인증은 성공합니다.
유저정보를 인메모리에서 불러왔어도 DB를 이용하는 과정 또한 큰 차이가 없습니다.

- Http 보안
어떤 인증 관련 메서드들을 허용할지 상세하고 그 메서드들을 어떻게 설정할지는
WebSecurityConfigurerAdapter 의 HttpSecurity객체를 인수로 받는 configure 메서드를 
오버라이드하여 설정할 수 있습니다.

@Override
protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests().anyRequest().authenticated() // (1)
        .and()
        .formLogin() // (2)
        .and()
        .httpBasic(); // (3)
}

1. 어플리케이션의 모든 URI에 대한 인증을 요구합니다.
2. 기본설정으로 폼 기반의 인증을 선택합니다.
3. HTTP 기본 인증을 활성화합니다.

이 구성은 스프링시큐리티 스타터 의존성을 추가하자마자 어플리케이션이 잠긴 이유를 설명합니다.

.formLogin() 메서드를 지우면 인증절차는 비활성화됩니다.
또한 .formLogin() 뒤에 몇 가지 추가 메서드 호출을 추가하여
로그인 페이지의 모양 및 기타 사항을 변경할 수 있습니다.
.httpBasic()을 생략하면 HTTP 기본 인증을 비활성화 합니다.

또한 인증은 로그인과 비밀번호에 관한 것만이 아닙니다. 
지문 인증 또는 SMS를 통한 인증을 구현하기를 원할 수 있습니다. 
여기서 사용자는 신원 증명으로 SMS로 휴대폰으로 전송된 코드를 입력해야 합니다. 
스프링 시큐리티에서도 이 기능을 구성할 수 있지만 이 주제에서는 고려하지 않을 것입니다.

