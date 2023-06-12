@ControllerAdvice와 @ExceptionHandler를 조합하여 예외를 처리하는 방법에 대해 알아볼 것 입니다.
@ControllerAdvice는 어플리케이션의 다른 부분에서 일어날 수 있는 
다양한 예외를 가로채는 글로벌 클래스를 만들 수 있게 해주고,
@ExceptionHandler는 에러 응답을 커스터마이즈 할 수 있게 해줍니다.
이 두 어노테이션을 조합하면 더욱 유연한 예외처리가 가능해집니다.
또한 @ControllerAdvice와 함께 ResponseEntityExceptionHandler 클래스를 같이 사용할 수도 있습니다.

- @ExceptionHandler
스프링은 모든 처리되지 않은 예외에 대해 500에러를 리턴합니다.
@ExceptionHandler를 사용하면 이러한 예외를 처리하고 다양한 방법으로 커스터마이즈할 수 있게 해줍니다.
커스텀 에러 메시지를 표현하기 위한 객체를 만들어 줍니다.

public class CustomErrorMessage {
    private int statusCode;
    private LocalDateTime timestamp;
    private String message;
    private String description;

    public CustomErrorMessage(
            int statusCode, 
            LocalDateTime timestamp, 
            String message, 
            String description) {

        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.message = message;
        this.description = description;
    }

    // getters ...
}

@ExceptionHandler(NotFoundException::class)
    fun handleFlightNotFound(e: NotFoundException, request: WebRequest): ResponseEntity<CustomErrorMessage> {
        val body = CustomErrorMessage(
            HttpStatus.NOT_FOUND.value(),
            LocalDateTime.now(),
            e.message!!,
            request.getDescription(false)
        )
        return ResponseEntity(body, HttpStatus.NOT_FOUND)
    }

위의 예시코드에서 FlightNotFoundException 처리는 
@ExceptionHandler 어노테이션이 붙은 handleFlightNotFound 메서드에서 처리됩니다.

이 예에서는 FlightController 클래스에 @ExceptionHandler 메서드를 배치할 수 있습니다. 
@ExceptionHandler가 붙은 메서드는 배치된 컨트롤러(FlightController)의 예외만 처리할 수 있습니다.

- @ControllerAdvice
@ControllerAdvice가 붙은 클래스는 다른 컨트롤러에서 발생한 예외를 가로채어 처리할 수 있습니다.
@ControllerAdvice 클래스 내부에 @ExceptionHandler 메소드를 배치하면 
핸들러가 @ControllerAdvice 클래스의 예외에 적용되고 따라서 
여러 컨트롤러의 다른 예외에 적용될 수 있습니다.

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(FlightNotFoundException.class)
    public ResponseEntity<CustomErrorMessage> handleFlightNotFound(
            FlightNotFoundException e, WebRequest request) {

        CustomErrorMessage body = new CustomErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
}

- ResponseEntityExceptionHandler
@ControllerAdvice 클래스에서는 사용자 정의 예외뿐만 아니라 Spring 자체에서 발생하는 표준 예외도 처리할 수 있습니다.
이를 위해 ResponseEntityExceptionHandler 추상 클래스가 도움이 될 것입니다.
이 클래스에는 다양한 유형의 Spring 예외(handleMethodArgumentNotValid, handleMissingPathVariable 등)를 
처리하는 많은 메서드가 포함되어 있습니다.

MethodArgumentNotValidException의 예제를 살펴봅시다.
@Valid로 주석이 달린 인수에 대한 유효성 검사가 실패하면 이 예외가 발생합니다.
Spring이 우리 애플리케이션에서 이 예외를 던지도록 하기 위해 
FlightInfo 클래스의 id 필드의 최소값을 1로 합시다. 
그런 다음, 검증된 FlightInfo 객체를 flightInfoList에 추가하는 새 메서드를 컨트롤러에 생성해 보겠습니다.

public class FlightInfo {

    @Min(1)
    private long id;

    private String from;

    private String to;

    private String gate;
    
    //getters...
}

@PostMapping("/flights/new")
public void addNewFlightInfo(@Valid @RequestBody FlightInfo flightInfo) {
    flightInfoList.add(flightInfo);
}

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

    // handleFlightNotFound method

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {

        // Just like a POJO, a Map is also converted to a JSON key-value structure
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", status.value());
        body.put("timestamp", LocalDateTime.now());
        body.put("exception", ex.getClass());
        return new ResponseEntity<>(body, headers, status);

ResponseEntityExceptionHandler 클래스는 기본적으로 null 본문을 반환하는 
handleMethodArgumentNotValid 메서드를 정의합니다. 
handleMethodArgumentNotValid 메서드를 사용자 지정하려면 
@ControllerAdvice 클래스로 ResponseEntityExceptionHandler 클래스를 확장하고 
해당 메서드를 재정의하면 됩니다.

