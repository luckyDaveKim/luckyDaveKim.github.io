---
template: post
draft: false
image: img/cover.jpg
date: 2021-04-15 16:32:26 +09:00
title: Spring IoC (Inversion of Control) Container 개념과 Bean
excerpt: Spring IoC(Inversion of Control) Container의 개념과 Bean에 대해 알아봅니다.
tags:
  - spring_framework
  - inversion_of_control
  - ioc
  - bean
---

# 개요
 이 포스팅에서는 Spring IoC (Inversion of Control) Container의 개념과 Bean에 대해 알아봅니다.

# Spring IoC란 무엇인가?
 Spring IoC란, Spring 기반에서 사용되는 객체를 개발자가 직접 객체를 생성 `new Object()`, 의존관계 설정, 제거하지 않고 
**Spring에서 대신**해주는 것입니다.

# Bean이란 무엇인가?
 Bean은 위에서 알아본 Spring IoC 컨테이너가 관리하는 **객체**를 말합니다. 즉, Spring 컨테이너가 관리하는 객체이면 Bean이며,
Bean을 등록하는 방법으로는 *(1) xml 설정을 통한 방법*, *(2) java 설정을 통한 방법*이 있습니다.  

## Bean 장점
 그렇다면 이렇게 Bean으로 등록해서 사용하는 장점에 대해 알아보겠습니다.
- 의존성 관리 자동화
- 스코프 관리 자동화
- 라이프사이클 인터페이스를 통한 생성 주기 관리

### 의존성 관리 자동화
 Bean을 통해 객체를 관리하게 되면, Spring에서 의존성 관리를 자동으로 해줍니다.  
 여기서 의존성 관리란, 한 객체가 역할을 수행할 때 다른 객체가 필요할 수가 있습니다. 이때 필요한 다른 객체를 어떻게 생성하고,
사용하는지에 대한 방법을 말합니다.  

 의존성 관리(객체를 사용하는 방법)에는 크게 두 가지의 방법이 있습니다.  
첫째, 의존성이 필요한 객체를 **객체 내부에서 생성**한다.  
둘째, 의존성이 필요한 객체를 **객체 외부에서 생성하여 주입**한다.  
이 두 가지 방법에 대해 알아보겠습니다.  

다음 상황을 가정하겠습니다.  
```
지갑(Wallet) 객체와 돈(Money) 객체가 있으며,  
지갑 객체의 내부에서는 돈 객체 의존성이 필요하다.
```

#### 의존성이 필요한 객체를 객체 내부에서 생성
지갑 객체에 필요한 의존성인 돈 객체를, 지갑 객체 내부(지갑 객체 생성자)에서 생성해서 사용하는 예시입니다.  

```java
public class Wallet {
  
  private final Money money;
  
  public Wallet() {
    this.money = new Money(1000);
  }
  
  public void showMeTheMoney() {
    this.money.showMeTheMoney();
  }
  
}

public class Money {

  private final long amount;

  public Money(long amount) {
    this.amount = amount;
  }

  public void showMeTheMoney() {
    System.out.println(this.amount);
  }

}
```

```java
public class Main {

  static void main(String args[]) {
    Wallet wallet = new Wallet();
    
    wallet.showMeTheMoney();
  }

}
```

이렇게 객체 내부에서 의존성 객체를 생성해서 사용하게 되면, 지갑 객체와 돈 객체가 **강하게 결합**하게 되는 단점이 있으며,
향후 테스트 시 Mock을 통한 **유연한 테스트가 불가**합니다.

#### 의존성이 필요한 객체를 객체 외부에서 생성하여 주입
지갑 객체에 필요한 의존성인 돈 객체를, 지갑 객체 외부에서 생성 및 주입해서 사용하는 예시입니다.

```java
public class Wallet {
  
  private final Money money;
  
  public Wallet(Money money) {
    this.money = money;
  }
  
  public void showMeTheMoney() {
    this.money.showMeTheMoney();
  }
  
}

public class Money {

  private final long amount;

  public Money(long amount) {
    this.amount = amount;
  }

  public void showMeTheMoney() {
    System.out.println(this.amount);
  }

}
```

```java
public class Main {

  static void main(String args[]) {
    Money money = new Money(1000);
    Wallet wallet = new Wallet(money);
    
    wallet.showMeTheMoney();
  }

}
```

이렇게 객체 외부에서 의존성 객체를 생성해서 주입 받고 사용하게 되면, 지갑 객체와 돈 객체가 **약하게 결합**하는 장점이 있으며,
향후 테스트 시 Mock을 통한 **유연한 테스트가 가능**합니다.

### 스코프 관리 자동화
Bean을 통해 객체를 관리하게 되면, Spring에서 스코프 관리를 자동으로 해줍니다.  
여기서 스코프 관리란, Spring 컨테이너에서 자동으로 생성한 객체를 간단한 설정을 통해 **싱글톤(Singleton)**, **프로토타입(Prototype)** 등의 
다양한 방법으로 관리해 주는 것을 말합니다.

#### 싱글톤 스코프
Spring이 Bean을 싱글톤 스코프로 관리한다는 것은, Spring 컨테이너에 해당 객체를 단 한 번만 생성하고, 해당 객체의 의존성이 필요할 때,
**같은 객체를 주입**한다는 것입니다.  
(별도로 스코프 설정을 하지 않을 시 Spring Bean은 싱글톤으로 관리됩니다.)  
싱글톤 패턴을 사용하여 같은 객체를 재사용하면, 객체 생성 비용이 비싼 경우 큰 효율을 얻을 수 있으며, 하나의 객체만 관리하면 되기
때문에 객체 관리가 손쉽다는 장점이 있습니다.

#### 프로토타입 스코프
Spring이 Bean을 프로토타입 스코프로 관리한다는 것은, 해당 객체의 의존성이 필요할 때마다 **새로운 객체를 생성해서 주입**한다는 것입니다.  
객체가 공통으로 쓰이면 안 되고 매번 새로운 인스턴스로 생성되어야 할 때에 사용되며, 새로운 인스턴스 생성 기준에 따라 `request`,
`session`, `global session`, `thread` 등이 있습니다.

### 라이프사이클 인터페이스를 통한 생성 주기 관리
Bean을 통해 객체를 관리하게 되면, Spring 컨테이너에서 Bean을 자동으로 생성, 의존 설정 등의 단계를 거칩니다.  
Bean 객체의 생성 시점에 수행할 사항은 생성자에서 설정하면 되지만, 의존 설정 후 수행이 필요한 사항 혹은 Bean 객체 소멸 전 수행이 필요한
사항에 대해서는 Spring 컨테이너에서 제공하는 훅(Hook) 기능을 통해 정의 가능합니다.  
의존 설정 후 수행 가능한 훅인 `InitializingBean` 인터페이스, `@PostConstruct` 어노테이션, `initMethod` 속성이 있고,  
소멸 전 수행 가능한 훅은 `DisposableBean` 인터페이스, `@PreDestory` 어노테이션, `destoryMethod` 속성이 있습니다.  

# 줄이며...
지금까지 Spring IoC 컨테이너와 Bean의 개념에 대해 알아보았습니다.  
다음에는 Bean을 등록하는 다양한 방법에 대해 자세히 알아보겠습니다.
