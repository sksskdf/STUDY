웹앱 개발 시 사용자에게 에러를 반환하는것은 치명적입니다.
사용자가 잘못된 요청을 보냈을 때 요청을 처리하지 못하거나 존재하지 않는 객체정보를 얻으려고 할 경우
우리의 웹앱은 무엇이 잘못되었는지 알려야 합니다.
HTTP 상태코드는 다양합니다.
Bad Request는 400, Not Found는 404 입니다.
에러를 처리하는 것은 매우 중요합니다.
그래야 사용자가 무엇이 잘못되었는지 즉시 이해할 수 있기 때문입니다.

스프링부트앱에서 에러메시지를 리턴하는 두가지 방법에 대해 알아볼 것입니다.
스프링 클래스인 ResponseStatusException을 사용해도 되고,
@ResponseStatus를 이용하여 자기만의 예외를 만들 수도 있습니다.

- ResponseStatusException
에러를 리턴하는 첫번째 방법은 ResponseStatusException 객체를 사용하는 것입니다.
ResponseStatusException는 org.springframework.web.server 패키지에 속해있는 기본적인 에러처리를 담당하는 객체입니다.
이 예외는 RuntimeException입니다.

ResponseStatusException을 생성하기 위한 세가지 생성자가 있습니다.

ResponseStatusException(HttpStatus status)
ResponseStatusException(HttpStatus status, java.lang.String reason)
ResponseStatusException(
        HttpStatus status, 
        java.lang.String reason, 
        java.lang.Throwable cause
)

HttpStatus와 reason, cause 를 이용하여 객체를 만들 수 있습니다.
reason은 예외에 대한 간단한 설명입니다.

HttpStatus 타입은 어떤게 들어가야 할까요?
일반적으로는 200 OK, 404 NOT_FOUND, 400 BAD_REQUEST, 403 FORBIDDEN,500 INTERNAL_SERVER_ERROR이 들어갑니다.

예외를 처리하는 예시코드입니다.
@GetMapping("flights/{id}")
fun getFlightInfo(@PathVariable id: Int): FlightInfo {
    val flightInfo = flightInfoList[id]
    if (flightInfo.from == "Berlin Schönefeld") {
        throw ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Berlin Schönefeld is closed for service today"
        )
    }
    return flightInfo
}

이 JSON 인스턴스는 지정된 메시지(타임스탬프, 오류 이름, 상태 코드 및 요청의 REST 경로)보다 
상황에 대한 더 많은 정보를 제공합니다.

(기본적으로 Spring Boot는 응답에 메시지 필드를 포함하지 않습니다. 
활성화하려면 application.properties 파일에 다음 행을 추가하십시오. 
server.error.include-message=always)

이제 ResponseStatusException의 장점과 단점을 살펴봅시다.

* 동일한 유형의 예외를 별도로 처리할 수 있습니다.
* 응답에 대해 다른 상태 코드를 설정할 수 있습니다.
* 추가 예외 클래스를 생성하는 것을 피하게 합니다.
* 어느 곳에서든 예외를 던질 수 있습니다.

단점은 같은 코드에 대한 코드중복이 일어난다는 것입니다.

(만약 당신의 앱이 RuntimeException같은 처리할 수 없는 예외를 던지거나
HTTP코드에 대한 상세가 없다면 이러한 오류는 500 Internal Server Error로 변환됩니다.
이 상태 코드는 서버에 문제가 있음을 나타내며 사용자 요청을 제대로 처리할 수 없으므로 수정해야 합니다.)

- 커스텀 예외
커스텀 예외를 통해 응답 코드나 응답 상태를 설정할 수도 있습니다.
RuntimeException를 상속받고 @ResponseStatus 어노테이션을 사용하여 클래스를 만들 수 있습니다.

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
class FlightNotFoundException(cause: String) : RuntimeException(cause)

이제 ResponseStatusException을 사용했던 방법과 같은 방법으로 예외를 던질 수 있습니다.

@GetMapping("flights/{id}")
fun getFlightInfo(@PathVariable id: Int): FlightInfo {
    if (id >= flightInfoList.size) {
        throw FlightNotFoundException("Flight not found for id =$id")
    }
    return flightInfoList[id]
}