단순한 어플리케이션에서는 인증(Authentication)으로도 충분한 경우가 많습니다.
하지만 유저에 권한에 따라 서비스에 대한 접근을 제한해야 하는 경우도 있습니다.
권한은 요청받은 데이터에 대한 접근권한을 제한합니다.
권한은 항상 인증 후에 발생합니다.

- 권한과 역할
인증받은 유저의 자원에 대한 접근을 허용하고 다른 사용자에 대한 접근을 제한하려면 사용자를 구별할 수 있는 메커니즘을 사용해야 합니다.
스프링 시큐리티는 권한과 역할을 지원함으로써 이러한 작업을 돕습니다.

* 권한 : 권한은 어플리케이션에서 허용하는 일종의 사용자의 작업을 이야기 합니다.
특정 권한이 있는 사용자만 특정 엔드포인트에 특정 요청을 할 수 있습니다.
예를 들어 제시카는 특정 엔드포인트의 읽기와 쓰기 권한만 갖고 있습니다.
반면 요셉은 읽기, 쓰기, 삭제, 수정을 할 수 있습니다.
내부적으로 인증은 단순한 문자열에 불과합니다.

* 역할 : 역할은 권한의 집합입니다.
당신의 어플리케이션에 두 가지 역할이 있다고 쳐봅시다.
하나는 읽기와 쓰기가 가능하고
다른 하나는 읽기, 쓰기, 수정, 삭제가 가능합니다.
ROLE_USER, ROLE_ADMIN 과 같이 단순화 할수 있습니다.

스프링시큐리티에서는 권한과 역할의 개념은 같은 의미로 사용됩니다.
대부분의 경우, 차이점은 작명 규칙에서 옵니다.

우리가 작성할 프로그램에서는 사용자 권한에 따라 엔드포인트의 접근에 대한 설정을 할 것입니다.
우리의 프로그램은 다음과 같은 기능들을 포함합니다.

* /, /public : 인증없이 접근 가능함
* /authenticated : 인증해야 접근 가능함
* /user : ROLE_USER 혹은 ROLE_ADMIN 만 접근 가능함
* /admin : ROLE_ADMIN 만 접근 가능함

- 초기 셋팅

import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

    @GetMapping("/public")
    public String testPublic() {
        return "/public is accessed";
    }

    @GetMapping("/authenticated")
    public String testAuth() {
        return "/authenticated is accessed";
    }

    @GetMapping("/user")
    public String testUser() {
        return "/user is accessed";
    }

    @GetMapping("/admin")
    public String testAdmin() {
        return "/admin is accessed";
    }
}


이제 유저와 역할을 만들어 봅시다.
우리는 3가지 유형의 역할이 필요합니다.
1. 인증되지 않은 사용자
2. 인증된 사용자
3. 어드민

단순화를 위해 인메모리 유저를 만들것입니다.
역할은 어디에 저장되나 상관이 없습니다.

사용자에게 권한을 부여하기 위해 roles()메서드를 사용할 것입니다.

@EnableWebSecurity
public class WebSecurityConfigurerImpl extends WebSecurityConfigurerAdapter {

   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.inMemoryAuthentication()
          .withUser("user1").password(getEncoder().encode("pass1")).roles()
          .and()
          .withUser("user2").password(getEncoder().encode("pass2")).roles("USER")
          .and()
          .withUser("user3").password(getEncoder().encode("pass3")).roles("ADMIN")
          .and()
          .passwordEncoder(getEncoder());
   }

   @Bean
   public PasswordEncoder getEncoder() {
       return new BCryptPasswordEncoder();
   }
}


(예제에선 접두사로 ROLE_을 사용하지 않았습니다. 왜냐하면 스프링시큐리티는 자동적으로 이러한 접두사를 붙혀줍니다.
role() 이 아닌 authorities()를 사용하면 ROLE_ 을 붙혀주어야 합니다.)

- 권한 부여
HttpSecurity 객체를 사용하여 인증에 대한 설정을 할 수 있습니다.

@Override
protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
            .mvcMatchers("/admin").hasRole("ADMIN")
            .mvcMatchers("/user").hasAnyRole("ADMIN", "USER")
            .mvcMatchers("/", "/public").permitAll()
            .mvcMatchers("/**").authenticated() // or .anyRequest().authenticated()
            .and().httpBasic();
}

메서드는 정의된 순서대로 처리됩니다.
만약 authorizeReuqests() 바로 다음에 .mvcMatchers("/**").authenticated()가 오면
그 이후에 설정된 권한설정은 무시됩니다.

(POST 요청 테스트시 CSRF설정이 기본적으로 활성화 되어 있기 때문에 포스트맨이나 다른 프로그램들로 테스트할 시
403 Forbidden 에러를 응답받습니다. .csrf().disable()로 비활성화 할 수 있습니다.
