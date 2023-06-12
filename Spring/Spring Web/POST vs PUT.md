POST는 웹앱서버에 데이터를 넘겨주기 위해 사용합니다.
데이터를 전송할 땐 POST말고도 PUT이라는 메서드도 사용합니다.
PUT 요청은 멱등성을 가집니다.
무슨 말이냐면 여러번 요청을 해도 첫 적용 이후에는 결과를 변경하지 않습니다.
대조적으로 POST 요청은 멱등성을 가지지 않습니다.
초기적용 이후에도 추가적으로 결과에 영향을 미칩니다.
PUT요청은 요청 시마다 변경을 원하지 않을때 사용할 수 있습니다.

PUT과 POST의 차이점을 알면 적절한 상황에 적절한 메서드를 사용할 수 있게 될겁니다.
일반적으로 PUT은 요청 URI와 단일엔티티가 관련된 요청을 할 때 사용합니다.
예를 들어 유저데이터를 저장한다고 쳤을때 유저의 ID를 기반으로 수정을 할 수도 있어야 합니다.
수정을 하려면 /users/{id}와 같은 URI에 요청을 해야 합니다.
이러한 상황에선 각 유저는 단일 URI와 연관되어있습니다.
이런 예시에서 PUT 요청은 개별적인 유저의 수정에 대한 기능구현을 하기 적합합니다.
/users같은 URI로 작업을 하게된다면 단일객체나 객체리스트를 수정합니다.
여러 객체를 수정할 가능성이 있으므로 POST 요청이 더 적절한 선택이 될 것입니다.

리소스의 갯수뿐 아니라 리소스에 대한 예상 요청 수도 사용할 요청을 결정하는 데 도움이 될 수 있습니다.
PUT은 멱등성을 가지므로 리소스에 대한 여러 요청이 있을 수 있는 모든 상황에서 사용해야 합니다.
이는 같은 경로에 통해 추가 및 수정이 허용되는 상황에서 발생할 수 있습니다.
동일한 리소스에 대한 여러 요청이 예상되지 않는 경우 POST 요청이 더 나은 선택일 수 있습니다.
일반적으로 PUT은 기존 리소스를 업데이트하는 모든 작업에 사용됩니다. 
POST는 일반적으로 새 리소스를 생성하는 모든 작업에 사용됩니다.

- PUT 구현하기
@PutMapping 어노테이션은 @RestController에서 사용되며 PUT요청을 처리합니다.
PUT요청의 일반적인 구조는 POST요청과 비슷합니다.
데이터는 @RequestBody와 @PathVariable 를 사용해 PUT요청에의해 전송될 수 있고
@RequestParam도 사용될 수 있습니다.
PUT 요청은 일반적으로 상세된 요청 URI따라 구현되므로 최소한 한개의 @PathVariable은 있어야 합니다.

@RestController
public class EmployeeController {
    private ConcurrentMap<Long, Employee> employeeMap = new ConcurrentHashMap<>();
	
    @PutMapping("/employees/{id}")
    public Employee updateEmployee(@PathVariable long id, @RequestBody Employee employee) {
        employeeMap.put(id, employee);
        return employee;
    }
}