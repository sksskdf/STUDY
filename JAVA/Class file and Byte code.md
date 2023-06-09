바이트 코드는 소스 코드를 컴파일 하고 난 뒤 얻을 수 있는 자바 프로그램의 중간 결과입니다.
.class 파일로 저장되며 프로그램을 실행하면 JVM은 바이트코드를 실행하고 프로그램이 동작합니다.
바이트코드는 여전히 프로그래머들이 읽고 이해하고 수정할 수 있는 언어이지만
자바 소스코드보단 복잡합니다.

- 바이트코드 분해하기
.class 파일의 모든 명령어는 바이트코드 기계어로 작성됩니다.
.class 파일을 사람이 읽을 수 있도록 하려면 디스어셈블해야 합니다.
JDK에 포함된 javap 디스어셈블러를 사용하여 이를 수행할 수 있습니다. 

javap -c Main.class

-c 인수는 디스어셈블된 코드, 즉 클래스의 각 메소드에 대한 Java 바이트 코드를 구성하는 명령을 인쇄해야 함을 의미합니다.

Compiled from "Main.java"
public class Main {
  public Main();
    Code:
       0: aload_0
       1: invokespecial #1  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: iconst_1
       1: istore_1
       2: iconst_2
       3: istore_2
       4: getstatic     #2  // Field java/lang/System.out:Ljava/io/PrintStream;
       7: iload_1
       8: iload_2
       9: iadd
      10: invokevirtual #3  // Method java/io/PrintStream.println:(I)V
      13: return
}

바이트코드가 상당히 읽기 쉬운 것을 볼 수 있습니다.
파일은 모든 .class 파일에 공통적인 일반 구조를 가지고 있습니다.
Java 컴파일러가 클래스에 대해 기본 생성자를 만들었습니다.

javap 명령에 대한 또 다른 인수 -v가 있습니다.
이를 통해 클래스, 파일 메타데이터 및 상수 풀의 값에 대한 자세한 정보를 볼 수 있습니다. 
다음은 출력의 일부입니다.

Classfile /../../Main.class
  Last modified Oct 8, 2019; size 392 bytes
  MD5 checksum 7c6f013dc34260456bdde418433a1029
  Compiled from "Main.java"
public class Main
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #4                    // Main
  super_class: #5                   // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1
Constant pool:
   #1 = Methodref          #5.#14   // java/lang/Object."<init>":()V
   #2 = Fieldref           #15.#16  // java/lang/System.out:Ljava/io/PrintStream;
   #3 = Methodref          #17.#18  // java/io/PrintStream.println:(I)V
... a lot of other constants ...

상수 풀이 너무 길어서 줄였습니다. 이 풀의 값은 프로그램 실행 중에 사용됩니다.

- 바이트코드 명령어
각 바이트코드 명령어는 1바이트 연산 코드(opcode 뒤에 0개 이상의 피연산자)로 구성됩니다.
현재 사용 중인 바이트코드 명령어는 약 200개입니다.

많은 명령어에는 피연산자의 유형을 나타내는 접두사 및/또는 접미사가 있습니다.
i는 정수, l은 long, s는 short, b는 바이트, c는 문자, f는 float, d는 double, a는 참조입니다.

프로그램 명령어에서 가장 많이 사용되는 몇 가지를 살펴보겠습니다.
* aload_0은 로컬 변수 0에서 스택으로 참조를 로드합니다.
* iconst_0, iconst_1, iconst_2는 int 값 0, 1 또는 2를 스택에 로드합니다.
* istore_0, istore_1, istore_2는 int 값을 변수 0, 1, 2에 저장합니다.
* iload_0, iload_1, iload_2는 지역 변수 0, 1, 2에서 int 값을 로드합니다.
* iadd, isub, imul, idiv는 정수로 기본 산술 연산을 수행합니다.
* invokespecial은 객체 objectref에서 인스턴스 메서드를 호출하고 결과를 스택에 넣습니다.
* invokevirtual은 객체 objectref에서 가상 메서드를 호출하고 그 결과를 스택에 넣습니다.
* getstatic은 클래스의 정적 필드 값을 가져옵니다. 여기서 필드는 상수 풀 인덱스의 필드 참조로 식별됩니다.
* return은 메서드에서 void를 반환합니다.

이제 main 메소드의 바이트코드를 읽을 수 있습니다.

iconst_1          // 스택에 변수 1을 추가합니다.
istore_1          // 변수 1에 값 1을 추가합니다.
iconst_2          // 스택에 변수 2를 추가합니다.
istore_2          // 변수 2에 값 2를 추가합니다.
getstatic     #2  // Field java/lang/System.out:Ljava/io/PrintStream;
iload_1           // 변수 1로부터 값을 불러옵니다,
iload_2           // 변수 2로부터 값을 불러옵니다.
iadd              // 1과 2를 더합니다.
invokevirtual #3  // Method java/io/PrintStream.println:(I)V
return            // return from the method main

여기에서 invokevirtual #3 명령은 상수 풀에서 인수를 가져옵니다.
지금 당장 모든 바이트코드 명령어를 기억할 필요는 없습니다. 그들에 대한 몇 가지 기본 아이디어를 이해하려고 노력하십시오!

