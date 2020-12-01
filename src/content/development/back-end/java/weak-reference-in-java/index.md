---
template: post
draft: false
image: img/cover.jpg
date: 2020-12-01 13:25:27 +09:00
title: Java Weakly Reachable, Weak Reference 란
excerpt: Java의 Weakly Reachable 특징과 Weak Reference 사용 예시에 대해 알아봅니다.
tags:
  - java
  - weak_reference
  - weakly_reachable
  - reference
  - reachable
  - 기술_면접_질문
---

# 개요
이 포스팅에서는 Java의 References 종류 중 **Weak Reference**의 사용 예시와 **[Weakly reachable](https://docs.oracle.com/javase/7/docs/api/java/lang/ref/package-summary.html)**의 특징에 대해 알아보겠습니다.   

# Reference 종류는 왜 나누어져 있는가?
Java의 Reference를 나누어 놓은 이유는 효율적인 GC 처리를 위함입니다.  
개발자는 적절한 Reference 사용하여, GC에 의해 제거될 데이터에 우선순위를 적용하여 좀더 효율적인 메모리 관리를 하기 위해 Reference의 종류를 나누어 제공하는 것 입니다.  
Reference는 4가지 종류 **[Strong Reference](/development/back-end/java/strong-reference-in-java)**,
**[Soft Reference](/development/back-end/java/soft-reference-in-java)**, **Weak Reference**,
**[Phantom Reference](/development/back-end/java/phantom-reference-in-java)** 로 구분되어 있으며, 뒤로 갈수록 GC에 의해
제거될 우선순위가 높습니다.

# Weakly Rechable, Weak Reference 란?
객체가 **Weakly reachable** 하다는 것은, **Strongly reachable**, **Softly reachable** 하지 않으며 오직
**[WeakReference](https://docs.oracle.com/javase/8/docs/api/java/lang/ref/WeakReference.html)** 객체를 통해
도달할 수 있는 상태의 객체를 말합니다.  
**Weakly reachable**한 객체는 GC가 실행될 때 항상! GC의 메모리 회수 대상이 되며, 사용 방법은 다음과 같습니다.

> GC의 메모리 회수 대상이 된다고 하여도 즉각적으로 회수된다는 보장은 하지 못하며,
> 실질적인 메모리 회수 시점은 GC 알고리즘에 따라 다릅니다.

```java
public class WeakReferenceExample {
  public static void main(String[] args) {
    /* 1) Strong Reference로 생성 */
    Printer printer = new Printer();

    /* 2) print() 메서드 호출 */
    printer.print();

    /* 3) Weak Reference로 생성 */
    WeakReference<Printer> weakReference = new WeakReference<>(printer);

    /* 4) Weak Reference값의 printer() 메서드 호출 */
    weakReference.get()
      .print();

    /* 5) printer에 null 할당 */
    printer = null;

    /*
      6) GC를 실행합니다.
      `System.gc()`을 호출 하더라도 바로 GC가 동작한다고 보장할수는 없지만, 예제상 GC가 동작하였다고 가정함
    */
    System.gc();

    /*
      7) Weak Reference값의 printer() 메서드 호출
      `NullPointerException`이 날수도 있고, 아닐수도 있음
    */
    softReference.get()
      .print();
  }

  public static class Printer {
    public void print() {
      System.out.println("printing...");
    }
  }
}
```

1. Strong Reference로 `Printer` 클래스의 인스턴스를 생성하여 `printer`변수에 할당합니다.
   ![Strongly reachable printer](img/strongly-reachable-printer.png)
2. `printer`의 메서드 `print()`를 호출합니다.
3. `printer`의 Weak Reference인 `weakReference`를 생성합니다.
   ![Weak reference printer](img/weak-reference-printer.png)
4. Weak Reference인 `printer`를 가져와서 `print()`를 호출합니다.
5. `printer`에 null을 할당하여 `printer`를 Weak reachable 상태로 만듭니다.
   ![Weakly reachable printer](img/weakly-reachable-printer.png)
6. GC를 실행합니다. `System.gc()`을 호출 하더라도 바로 GC가 동작한다고 보장할수는 없지만, 예제상 GC가 동작하였다고 가정합니다.  
   GC에 의해 무조건 `weakReference`의 참조값은 메모리 회수 대상이 됩니다.
7. Weak Reference인 `printer`를 가져와서 `print()`를 호출합니다.  
   GC의 판단에 의해 `weakReference`의 참조값이 메모리 회수되었다면 NullPointerException이 발생하고,
   그렇지 않다면 정상적으로 `print()` 메서드가 실행됩니다.

위 코드를 실행시 출력은 다음과 같습니다.

```text
printing...
printing...
printing... or NullPointerException
```

이와 같이 **Weakly reachable**한 객체는 GC가 동작할 때 마다 메모리 회수 대상이 되지만, GC가 즉각적으로 메모리를 제거한다는 보장은
할 수 없으며, 메모리 회수 시점은 GC 알고리즘에 따라 다름을 알 수 있습니다.  
이러한 특성을 이용하여 캐싱(Caching) 기능을 구현시 사용되며,
**[WeakHashMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/WeakHashMap.html)**을 사용하여
손쉽게 사용이 가능합니다.

> Soft Reference는 캐싱에 적합하지 않습니다.  
> GC 동작시 메모리가 부족할 경우 메모리 회수 대상이 되므로 Soft Reference를 캐싱에 사용시 다른 비즈니스 로직에 필요한
> 다수의 메모리를 캐싱에서 사용하게되어, 잦은 GC가 동작하여 성능에 이슈가 있을 수 있기 때문입니다.

# 줄이며...
지금까지 Java의 References 중 하나인 **Weak Reference**에 대해 알아보았습니다.  
**Weak Reference**는 GC에 의한 메모리 회수 우선순위가 높은점을 이용하여 캐싱에 활용도가 높다는 것을 알 수 있었습니다.
