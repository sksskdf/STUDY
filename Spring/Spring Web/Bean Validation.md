- 데이터 검증
웹앱에서 사용자는 서버와 상호작용합니다.
이는 클라이언트가 서버에 데이터를 요청할 수 있을 뿐만 아니라 서버에 데이터를 보낼 수도 있음을 의미합니다.
여기서 궁금증이 하나 발생합니다.
만약 유저가 비즈니스로직을 위반하는 데이터를 전송한다면 어떻게 될까요?
예를 들어 사용자가 나이에 음수를 적거나 이름에 빈문자열을 전송할 수 있습니다.
이러한 상황은 예상치못한 오류로 이어집니다.
이러한 상황을 방지하기 위해 제약조건을 지정해 사용자가 데이터형식을 위반하지 않도록 해야 합니다.
목적을 달성하기 위해 javax.validation 패키지의 어노테이션을 사용할 수 있습니다.
이 패키지를 사용하려면 다음과 같은 의존성을 추가해주어야 합니다.

implementation 'org.springframework.boot:spring-boot-starter-validation'

- 제약조건
@NotNull은 널을 허용하지 않습니다.
@NotEmpty는 널을 허용하지 않고 값의 길이가 0보다 커야 합니다.
@NotBlank는 공백을 제거 한 값이 비어있으면 안됩니다.
@Size는 min과 max 파라미터로 필드의 범위를 지정합니다. @Size(min = 1, max = 3)
@Min은 최솟값, @Max는 최댓값을 지정합니다.
@Pattern은 regexp 파라미터로 주어지는 정규식을 통해 검사합니다.
@Email은 주어진 값을 일반적인 이메일형식과 비교하여 검사합니다.

- @Valid
@Valid 어노테이션은 @RequestBody와 같이 붙어 스프링부트에게 주어진 제약조건에 대한 검사를 실시하게 합니다.

또한 모든 검증어노테이션에는 message 파라미터를 사용하여 검증실패 메시지를 설정할 수도 있습니다.
검증에 실패하면 400 Bad Request 상태와 함께 설정된 메시지가 리턴됩니다.

- @Validated
요청바디에만 검증할 수 있는것은 아닙니다.
컨트롤러에 @Validated 어노테이션을 붙히면 @PathVariable이나 @RequestParam 어노테이션에도 제약조건 어노테이션을 붙힐 수 있습니다.

@Validated 어노테이션은 ConstraintViolationException 를 던질 수 있습니다.
검증에 실패하면 500에러가 리턴됩니다.
만약 400에러를 리턴하게 하고 싶다면 커스텀 예외 핸들러를 만들어 추가할 수 있습니다.

@ControllerAdvice
public class ~~~ {

@ResponseBody
@ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(ConstraintViolationException.class)
ErrorMessage exceptionHandler(ConstraintViolationException e) {
    return new ErrorMessage("400", e.getMessage())
}
}

리스트의 요소에 대한 검사도 할 수 있습니다.
@RestController
@Validated
public class SpecialAgentController {

    @PostMapping("/agent")
    public ResponseEntity<String> validate(@RequestBody List<@Valid SpecialAgent> agents) {
        return ResponseEntity.ok("All agents have valid info.");
    }
}

