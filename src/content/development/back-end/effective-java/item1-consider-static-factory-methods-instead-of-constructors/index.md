---
template: post
draft: false
image: img/cover.jpg
date: 2021-01-05 17:28:47 +09:00
title: "[이펙티브 자바 3] 객체 생성과 파괴 | 생성자 대신 정적 팩터리 메서드를 고려하라"
excerpt: 생성자와 정적 팩토리 메소드를 비교 분석하고, 예시를 바탕으로 각각의 장/단점에 대해 알아봅니다.
tags:
  - effective_java
  - java
  - creating_and_destroying_objects
---

> 본 내용은 **이펙티브 자바 3판**(Joshua Bloch 지음, 이복연 옮김)을 읽은 후, 생각을 정리한 내용입니다.  
> 보다 상세한 내용이 궁금하신 분은 해당 책을 읽어보는 것을 추천합니다. 

# 개요
정적 팩토리 메소드 사용시 장/단점에 대해 알아봅니다.

# 정적 팩토리 메소드란?
자바의 **생성자**는 클래스명과 동일하게 메소드명을 지정하고, 이를 통해 인스턴스를 생성할 수 있습니다.  
이와 다르게 **정적 팩토리 메소드**는 생성자가 아닌 정적(static) 메소드를 통해 인스턴스를 생성하는 방식을 말합니다.

아래에서 예시를 통해 알아보도록 하겠습니다.

```java
public class Monitor {

  /* 생성자 */
  public Monitor() {
  }
  
  /* 정적 팩토리 메소드 */
  public static Monitor newInstance() {
    return new Monitor();
  }

}
```

```java
public class Main {

  static void main(String args[]) {
    /* 생성자를 통한 인스턴스 생성 */
    Monitor monitor1 = new Monitor();
    
    /* 정적 팩토리 메소드를 통한 인스턴스 생성 */
    Monitor monitor2 = Monitor.newInstance();
  }

}
```

## 정적 팩토리 메소드 명명 규칙
이러한 정적 팩토리 메소드의 일반적인 명명 규칙에 대해 알아보겠습니다.

- `from` : 매개변수 **하나**를 받아서 해당 타입의 인스턴스를 반환하는 **형변환 메서드**  
  ex) Date date = Date.from(instant);
- `of` : 매개변수 **여러개**를 받아서 적합한 타입의 인스턴스를 반환하는 **집계 메서드**  
  ex) Set<Rank> cards = EnumSet.of(JACK, QUEEN, KING);
- `valueOf` : `from`과 `of`의 더 자세한 버전  
  ex) BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
- `instance` or `getInstance` : **동일한 인스턴스**를 반환하는 메서드 (Singleton)  
  ex) StackWalker luke = StackWalker.getInstance(option);
- `create` or `newInstance` : **새로운 인스턴스**를 반환하는 메서드  
  ex) Object array = Array.newInstance(classObject, length);
- `getType` : `getInstance`와 같으나, 해당 클래스의 타입이 아닌 정의한 타입을 반환하는 메서드  
  ex) FileStore fs = Files.getFileStore(path);
- `newType` : `newInstance`와 같으나, 해당 클래스의 타입이 아닌 정의한 타입을 반환하는 메서드  
  ex) BufferedReader br = Files.newBufferedReader(path);
- `type` : `getType`과 `newType`의 간결한 버전  
  ex) List<Complaint> litany = Collections.list(legacyLitany);

# 장점
정적 팩토리 메소드의 장점에 대해 알아봅니다.

## 인스턴스 생성시 이름을 지정할 수 있다.
**생성자**와 다르게 **정적 팩토리 메소드**는 인스턴스 생성시 이름을 통해 명확한 목적을 전달할 수 있고,
동일한 타입의 매개변수를 받는 **생성자**는 다수개 생성할 수 없지만 **정적 팩토리 메소드**는 가능합니다.

```java
public class Monitor {

  private int inch;
  private int pixel;

  private Monitor() {
  }

//  오류
//  public Monitor(int inch) {
//    this.inch = inch;
//  }
//
//  public Monitor(int pixel) {
//    this.pixel = pixel;
//  }

  public static Monitor newInstanceByInch(int inch) {
    Monitor monitor = new Monitor();
    monitor.inch = inch;

    return monitor;
  }

  public static Monitor newInstanceByPixel(int pixel) {
    Monitor monitor = new Monitor();
    monitor.pixel = pixel;

    return monitor;
  }

}
```

```java
public class Main( {

  static void main(String args[]) {
    /* 인치 정보를 바탕으로 인스턴스 생성 */
    Monitor monitor1 = Monitor.newInstanceByInch(100);
    
    /* 픽셀 정보를 바탕으로 인스턴스 생성 */
    Monitor monitor2 = Monitor.newInstanceByPixel(10000);
  }

}
```

## 인스턴스를 재활용할 수 있다.
**생성자**와 다르게 **정적 팩토리 메소드**는 인스턴스를 매번 새롭게 생성하는 것이 아닌,
기존 인스턴스를 재활용하여 성능 향상을 기대할 수 있습니다.

```java
public class Monitor {

  private static final Monitor monitor = new Monitor();
  
  public Monitor() {
  }

  public static Monitor getInstance() {
    return monitor;
  }

}
```

```java
public class Main( {

  static void main(String args[]) {
    /* 매번 새로운 인스턴스가 생성됨 */
    Monitor monitor1 = new Monitor();
    
    /* 매번 동일한 인스턴스가 반환됨 */
    Monitor monitor2 = Monitor.getInstance();
  }

}
```

## 반환 타입의 하위 타입 객체를 반환할 수 있다.
**생성자**를 통한 인스턴스 생성시 반환 타입은 해당 클래스 타입으로만 가능하지만,
**정적 팩토리 메소드**의 경우 메소드에 지정한 반환 타입 뿐만 아니라, 하위 타입 객체를 반환할 수 있습니다.

이에 대한 장점으로는 사용자에게 세부 구현 클래스는 노출하지 않음으로써, 사용자에게 API 사용에 대한 진입 장벽을 낮출 수 있습니다.

```java
public class Monitor {

  public Monitor() {
  }

  public static Monitor newInstance() {
    return new Monitor();
  }

  /* 반환 타입은 Monitor 이지만, 해당 타입의 하위 타입인 SamSungMonitor를 반환할 수 있다. */
  public static Monitor newInstanceBySamSung() {
    return new SamSungMonitor();
  }

}

public class SamSungMonitor extends Monitor {

  public SamSungMonitor() {
  }

}
```

```java
public class Main( {

  static void main(String args[]) {
    /* Monitor 인스턴스가 생성됨 */
    Monitor monitor = Monitor.newInstance();
    
    /* SamSungMonitor 인스턴스가 생성됨 */
    Monitor samSungMonitor = Monitor.newInstanceBySamSung();
  }

}
```

## 입력 매개변수에 따라 다른 타입의 객체를 반환할 수 있다.
**정적 팩토리 메소드**의 경우 입력 매개변수에 따라 다른 타입의 객체를 반환할 수 있습니다.

> 예시 : `EnumSet`  
> `EnumSet`의 경우 element 수에 따라 `RegularEnumSet`과 `JumboEnumSet`으로 구분하여 인스턴스를 생성합니다.

```java
public class Monitor {

  private int inch;
  
  public Monitor() {
  }

  public static Monitor newInstanceByInch(int inch) {
    if (inch <= 50) {
      return new SamSungMonitor();
    } else {
      return new LgMonitor();
    }
  }

}

public class SamSungMonitor extends Monitor {

  public SamSungMonitor() {
  }

}

public class LgMonitor extends Monitor {

  public LgMonitor() {
  }

}
```

```java
public class Main( {

  static void main(String args[]) {
    /* 50인치 이하면 SamSungMonitor가 반환됨 */
    Monitor monitor1 = Monitor.newInstanceByInch(10);
    
    /* 50인치 초과면 LgMonitor가 반환됨 */
    Monitor monitor2 = Monitor.newInstanceByInch(100);
  }

}
```

# 단점
정적 팩토리 메소드의 단점에 대해 알아봅니다.

## 정적 팩토리 메소드만 사용하면 하위 클래스를 만들 수 없다.
**정적 팩토리 메소드**만 제공할 경우, 하위 클래스를 만들 수 없습니다.

> 상속을 하려면, `public`, `default`, `protected` 접근자 기반의 생성자가 필요합니다.

```java
public class Monitor {

  private Monitor() {
  }

  public static Monitor newInstance() {
    return new Monitor();
  }

}

/* Monitor 생성자의 접근자가 private 이기 때문에 상속이 불가하다. */
public class SamSungMonitor extends Monitor {

  public SamSungMonitor() {
  }

}
```

#

# 줄이며...
**생성자**가 나쁘고 **정적 팩토리 메소드**가 좋은것이 아닌, 상황에 따라 적절한 사용이 필요할 것 같습니다.
