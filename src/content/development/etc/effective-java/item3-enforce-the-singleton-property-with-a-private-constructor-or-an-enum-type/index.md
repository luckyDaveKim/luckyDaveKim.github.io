---
template: post
draft: false
image: img/cover.jpg
date: 2022-07-17 14:43:28 +09:00
title: "[이펙티브 자바 3] 객체 생성과 파괴 | private 생성자나 열거 타입으로 싱글턴임을 보증하라"
excerpt: 정적 팩토리 메소드와 생성자에서 매개변수가 많아진 경우 효과적으로 처리하는 방법에 대해 알아봅니다.
tags:
  - effective_java
  - java
  - creating_and_destroying_objects
---

> 본 내용은 **이펙티브 자바 3판**(Joshua Bloch 지음, 이복연 옮김)을 읽은 후, 생각을 정리한 내용입니다.  
> 보다 상세한 내용이 궁금하신 분은 해당 책을 읽어보는 것을 추천합니다. 

# 개요
싱글이란 인스턴스를 오직 하나만 생성할 수 있는 클래스를 말합니다. 싱글턴을 만든는 방법 3가지에 대해 알아보자.  
- public static final 필드 방식
- 정적 팩토리 방식
- enum 타입 방식

# public static final 필드 방식
```java
public class Dave {
  public static final Dave INSTANCE = new Dave();
  
  private Dave() {
  }
  
  /* custom methods... */
}
```

## 특징
- 생성자를 `private`로 선언해 외부에서 생성자 호출이 불가능함
- 필드를 `public static final`로 선언해 시스템 초기에 한번만 할당됨을 보장하고, 외부에서 접근됨

## 장점
- 필드가 `public static final`로 싱글턴임이 명확하게 드러남
- 구현이 간단

## 단점
- reflection을 통한 새로운 인스턴스 생성 가능
- 직렬화/역직렬화로 새로운 인스턴스 생성 가능
- [//]: # (TODO :단점 예시 등록)

[//]: # (TODO : 단점 방어 예시 등록)

# 정적 팩토리 방식
```java
public class Dave {
  private static final Dave INSTANCE = new Dave();
  
  private Dave() {
  }
  
  public static Dave getInstance() {
    return INSTANCE;
  }
  
  /* custom methods... */
}
```

## 특징
- 생성자를 `private`로 선언해 외부에서 생성자 호출이 불가능함
- 필드를 `public static final`로 선언해 시스템 초기에 한번만 할당됨을 보장하고, 외부에서 접근 안됨

## 장점
- API 변경 없이 싱글턴이 아니도록 변경 가능
- 정적 팩토리를 제네릭 싱글턴 팩토리로 변경 가능
- [//]: # (TODO : 제네릭 싱글턴 팩토리 예제 찾기)
- 정적 팩토리 메소드 참조를 `Supplier`로 변경 가능
- [//]: # (TODO : supplier 예제 찾기)

## 단점
- reflection을 통한 새로운 인스턴스 생성 가능
- 직렬화/역직렬화로 새로운 인스턴스 생성 가능

# enum 타입 방식
```java
public enum Dave {
  INSTANCE;
  
  /* custom methods... */
}
```

## 특징
- `enum`의 한번만 초기화되는 특징을 활용

## 장점
- 구현이 간단
- 위의 reflection, 직렬화/역직렬화 공격에 안전

## 단점
- `enum` 외의 다른 클래스를 상속할 수 없음
  (인터페이스 구현은 가능)

[//]: # (TODO : 단점 방어 예시 등록)

# 줄이며...
책에서는 **enum 타입 방식**을 통한 싱글턴 생성을 추천하였으나, `enum`의 한번만 초기화 되는
부수적인 효과 하나만 보고 모든 싱글턴을 enum으로 구현해야만 하는지는 논의가 필요할 것 같습니다.
