유닛테스트는 작고 빠르며 코드로부터 격리된 테스트환경을 제공합니다.
그러나 때때로 테스트 중인 코드 단위가 파일, DB 또는 
웹 서비스와 같은 외부 리소스에 의존하는 경우 
이러한 기준을 준수하기가 쉽지 않습니다.
의존성으로부터 코드단위를 분리하는 데 도움이 되는 몇가지 기술이 있으며
그 중 하나는 목(모의)객체를 사용하는 것입니다.

목객체는 가상의 객체로써 실제 객체를 모방하는 객체입니다.
유닛테스트에서는 실제객체의 목객체를 만들어 코드와 상호작용할 수 있으며
상호작용을 통해 나온 결과를 검증할 수 있습니다.
수동적으로 목객체를 만들수도 있고 모킹프레임워크를 사용하여 수고를 덜수도 있습니다.

- 모키토
가장 유명한 자바 모킹프레임워크는 모키토입니다.
간단하며 편리한 API를 갖고 있으며 간결하고 깔끔한 테스트를 작성할 수 있고
JUnit과 함께 사용할 수도 있습니다.

첫째로, 프로젝트에 모키토를 추가하는 방법은 메이븐리파지토리를 참고합시다.

그래들프로젝트라고 가정하고 예제 코드를 살펴보겠습니다.

dependencies {
// JUnit5
    testImplementation 'org.junit.jupiter:junit-jupiter:5.7.1'
// Mockito
    testImplementation 'org.mockito:mockito-core:3.11.2'
}

* 모키토 개발자들은 정기적으로 새로운버전을 릴리즈합니다. 
사용시엔 가장 최근버전을 사용하도록 합시다.

- 만약 클래스가 의존성을 갖고 있다면?
이제 유닛테스트를 위한 모키토 사용법을 살펴봅시다.

우리의 예제에서는, FXConverter(화폐단위컨버터)라는 클래스가 있다고 가정합니다.
클래스에는 convert메서드가 있습니다.
FXConverter는 RemoteFXRateService에 대한 의존성을 갖고 있습니다.
RemoteFXRateService클래스는 외환과 관련된 웹 서비스에 요청을 보내
소스통화와 대상통화 간의 실제 환율을 검색하고 
이를 문자열로 반환하는 getRate 메서드가 있습니다.
이 메서드는 인수로 전달된 지정된 통화코드 쌍에 대해 웹 서비스로 부터
부적절한 응답을 받으면 IllegalArgumentException을 던질 수 있습니다.
오류가 발생하면 변환은 "-1.00"에 해당하는 BigDecimal을 반환하고
성공하면 변환된 BigDecimal을 반환합니다.
그리고 convert메서드 내부에선 RemoteFXRateService의 메서드를 사용합니다.

import java.math.BigDecimal;
import java.math.RoundingMode;

public class FXConverter {
    private final RemoteFXRateService remoteFXRateService;

    public FXConverter(RemoteFXRateService remoteFXRateService) {
        this.remoteFXRateService = remoteFXRateService;
    }

    public BigDecimal convert(String source, String target, String input) {
        try {
            String response = remoteFXRateService.getRate(source, target);
            BigDecimal rate = new BigDecimal(response);
            BigDecimal amount = new BigDecimal(input);

            return amount.multiply(rate).setScale(2, RoundingMode.HALF_UP);
        } catch (IllegalStateException | IllegalArgumentException ex) {
            return new BigDecimal("-1.00");
        }
    }
}

이제 FXConverter의 단위테스트를 해봅시다.
보시다시피 FXConverter에는 의존성인 RemoteFXRateService가 있기 때문에
간단히 FXConverter 클래스의 인스턴스를 만들 수 없으므로
먼저 해당 클래스를 인스턴스화해야 합니다.
우리는 여기서 몇 가지 잠재적인 문제에 직면하게 됩니다.

RemoterFXRateService 클래스 또한 여러가지 의존성을 가질 수도 있습니다.
그리고 그 의존성들 역시 다른 의존성을 갖고 있을 수 있습니다.
다른말로 인스턴스화 해야 할 객체들이 눈덩이처럼 커질 수 있다는 말입니다.

다행히도 모키토는 이러한 문제점들을 피할 수 있도록 
목객체를 만들기 위한 사용하기 간편한 API를 제공합니다.

- 목객체 만들기
RemoteFXRateService클래스를 목객체로 인스턴스화 하는 방법에는 두가지가 있습니다.
첫번째는 mock 메서드를 사용하는 것입니다.

import static org.mockito.Mockito.mock;

class FXConverterTest {

    private RemoteFXRateService service = mock(RemoteFXRateService.class);

    private FXConverter converter = new FXConverter(service);

}

두번째는 어노테이션을 사용하는것 입니다.
어노테이션을 사용하려면 또다른 의존성을 추가해주어야 합니다.

testImplementation 'org.mockito:mockito-junit-jupiter:3.11.2'

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class FXConverterTest {

    @Mock
    private RemoteFXRateService service;

    private FXConverter converter;

    @BeforeEach
    void setup() {
        converter = new FXConverter(service);
    }
}

- 목객체의 동작 정의하기
다음으로 다른 테스트케이스마다 목객체의 동작을 정의해야 합니다.
우리는 getRate 메소드가 IllegalArgumentException 또는 IllegalStateException을 
던지는 상황과 환율을 반환하는 상황을 포함하여 많은 극단적인 경우를 사용하여 
convert 메소드를 테스트하려고 합니다.

모키토에는 when과 thenReturn이라는 스태틱메서드가 있습니다.
이 둘은 지정된 인수와 함께 목객체의 지정된 메서드가 호출될 때 반환되어야 하는
반환값을 정의합니다.
예제를 봅시다.

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class FXConverterTest {

    private RemoteFXRateService service = mock(RemoteFXRateService.class);

    private FXConverter converter = new FXConverter(service);

    @Test
    @DisplayName("Given 100.00 USD, when convert to USD, then return 100.00")
    void test1() {
        when(service.getRate("USD", "USD")).thenReturn("1.0000");

        BigDecimal result = converter.convert("USD", "USD", "100.00");

        assertEquals("100.00", result.toString());
    }
}


만약 USD를 USD로 바꾸는 상황에 대해 테스트를 짠다 했을 때
getRate메서드는 반드시 1.0000을 리턴해야 할 것입니다.
그 다음 convert메서드를 호출하고 테스트를 진행했습니다.

@Test
@DisplayName("Given 100.00 USD, when convert to EUR, then return 84.97")
void test2() {
    when(service.getRate("USD", "EUR")).thenReturn("0.8497");

    BigDecimal result = converter.convert("USD", "EUR", "100.00");

    assertEquals("84.97", result.toString());
}

위의 코드로 다시 테스트를 하면 성공적으로 통과합니다.
하지만 convert메서드에 USD와 GBP를 인자로 넣으면 어떻게 될까요?
테스트는 실패합니다.
왜냐하면 getRate메서드에는 USD를 GBP로 바꾸는 경우에 대한 행동정의가 없기 때문입니다.

- 인수 일치자
모키토는 모든 만들어진 목객체에 대한 기본 행동을 제공하며
정의하지않은 어떤 메서드에 대한 호출도 다음 값들을 반환합니다.

* null : 객체
* 0 : 숫자
* false : boolean
* empty collections : 컬렉션

모키토는 정의한 인수들에 대해 굉장한 유연성을 갖고 있는 정적메서드들로 이루어진
ArgumentMatchers(인수 일치자) 클래스를 갖고 있습니다.
인수가 특정 값과 같은지, 같지 않은지, 특정 유형의 것인지, 
null인지 아닌지에 따라 메서드의 동작을 정의할 수 있습니다.

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.endsWith;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.Mockito.when;

class FXConverterTest {

    private RemoteFXRateService service = mock(RemoteFXRateService.class);

    private FXConverter converter = new FXConverter(service);

    @Test
    void test3() {
        // 1st arg is "USD" and 2nd arg is any string that contains "coin"
        when(service.getRate(eq("USD"), contains("coin")))
                .thenReturn("0.0000");

        // both 1st arg and 2nd arg is any string
        when(service.getRate(anyString(), anyString())).thenReturn("42");

        // 1st arg is any string that starts with "US" 
        // and 2nd arg is any string that ends with "BP"
        when(service.getRate(startsWith("US"), endsWith("BP")))
                .thenReturn("0.7266");
    }

}

일반적인 인수일치자들은 다음과 같습니다.

any() : 모든 타입과 일치 (null을 반환함)
anyInt() : 널이 아닌 모든 정수(0을 반환함)
anyString() : 널이 아닌 모든 문자열(빈문자열을 반환함)
eq() : 주어진 값과 응답받은 값을 비교 (0을 반환함)

- 예외 던지기
마지막으로 목 메서드가 예외를 던지도록 동작을 변경하는 방법을 살펴보겠습니다.
이를 위해 Mockito에는 thenThrows라는 또 다른 정적 메서드가 있습니다.

@Test
@DisplayName("Given any args, when service throws exception, then return -1.00")
void test4() {
    when(service.getRate(anyString(), anyString()))
            .thenThrow(new IllegalStateException());

    BigDecimal result =
            converter.convert("USD", "EUR", "100.00");

    assertEquals("-1.00", result.toString());
}


getRate 메소드가 IllegalStateException을 던질 때마다 convert 메소드는 
"-1.00"에 해당하는 BigDecimal을 리턴합니다. 
이 테스트를 실행하면 성공적으로 통과되었음을 알 수 있습니다.

getRate가 IllegalArgumentException을 throw하는 상황에 대한 
테스트도 같은 방식으로 설정할 수 있습니다.