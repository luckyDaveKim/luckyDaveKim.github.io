---
template: post
draft: false
image: img/cover.jpg
date: 2021-01-06 04:11:02 +09:00
title: "[이펙티브 자바 3] 객체 생성과 파괴 | 생성자에 매개변수가 많다면 빌더를 고려하라"
excerpt: 정적 팩토리 메소드와 생성자에서 매개변수가 많아진 경우 효과적으로 처리하는 방법에 대해 알아봅니다.
tags:
  - effective_java
  - java
  - creating_and_destroying_objects
---

> 본 내용은 **이펙티브 자바 3판**(Joshua Bloch 지음, 이복연 옮김)을 읽은 후, 생각을 정리한 내용입니다.  
> 보다 상세한 내용이 궁금하신 분은 해당 책을 읽어보는 것을 추천합니다. 

# 개요
정적 팩토리 메서드와 생성자에서 매개변수가 많을 경우 적절한 대응이 어렵습니다.  
이에 대한 처리 방법으로 크게 3가지가 있습니다.
- 점층적 생성자 패턴
- 자바빈즈 패턴
- 빌더 패턴

각각의 방법에 대해 비교를 통해 알아보도록 하겠습니다.

# 점층적 생성자 패턴
**점층적 생성자 패턴**은 필수 매개변수만 받는 생성자, 필수 매개변수와 선택 매개변수 1개를 받는 생성자,
필수 매개변수와 선택 매개변수 2개를 받는 생성자, ... 이렇게 점층적으로 모든 선택 매개변수를 받는 생성자까지 생성하는 방식입니다.  

```java
public class Speaker {

  private final String name;
  private final int volumeCapacity;
  private final int usbPortCount;
  private final boolean hasLight;

  public Speaker(String name, int volumeCapacity) {
    this(name, volumeCapacity, 0, false);
  }

  public Speaker(String name, int volumeCapacity, int usbPortCount) {
    this(name, volumeCapacity, usbPortCount, false);
  }

  public Speaker(String name, int volumeCapacity, int usbPortCount, boolean hasLight) {
    this.name = name;
    this.volumeCapacity = volumeCapacity;
    this.usbPortCount = usbPortCount;
    this.hasLight = hasLight;
  }

}
```

```java
public class Main {

  static void main(String args[]) {
    Speaker speaker = new Speaker("Sound Bar", 10, 0, true);
  }

}
```

**점층적 생성자 패턴**을 통해 인스턴스를 생성할 경우, 원하는 매개변수를 모두 포함한 생성자 중 가장 짧은 생성자를 사용하면 됩니다.
하지만 선택적 매개변수가 늘어날수록 코드가 복잡해지며, 동일한 타입의 매개변수가 연달아 있을 경우 클라이언트의 실수로 순서가 뒤바뀌어도
컴파일 오류가 발생하지 않아 찾기힘든 버그를 만들 우려가 있습니다.

# 자바빈즈 패턴
**자바빈즈 패턴**는 매개변수가 없는 생성자를 통해 인스턴스를 생성 후, setter를 통해 원하는 매개변수의 값을 설정하는 방법입니다.

```java
public class Speaker {

  private String name;
  private int volumeCapacity;
  private int usbPortCount;
  private boolean hasLight;

  public Speaker() {
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setVolumeCapacity(int volumeCapacity) {
    this.volumeCapacity = volumeCapacity;
  }

  public void setUsbPortCount(int usbPortCount) {
    this.usbPortCount = usbPortCount;
  }

  public void setHasLight(boolean hasLight) {
    this.hasLight = hasLight;
  }
  
}
```

```java
public class Main {

  static void main(String args[]) {
    Speaker speaker = new Speaker();
    speaker.setName("Sound Bar");
    speaker.setVolumeCapacity(10);
    speaker.setHasLight(true);
  }

}
```

**자바빈즈 패턴**에서는 점층적 생성자 패턴의 복잡성은 해결되었으나, 하나의 인스턴스를 완전히 생성하기 전까지 일관성이 무너진 상태에 놓이며,
불변 클래스로 만들 수 없다는 단점이 있습니다.

# 빌더 패턴
**빌더 패턴**은 점층적 생성자 패턴의 안정성과 자바빈즈 패턴의 가독성을 모두 겸비한 방식입니다.

> 불변(immutable)은 한번 만들어지면 절대 값을 바꿀 수 없다는 뜻이며,
> 불변식(invariant)은 변경은 허용하나 주어진 조건 내에서의 변경만 허용한다는 뜻이다.  
> 따라서 가변 객체에도 불변식은 존재할 수 있으며, 넓게 보면 불변은 불변식의 극단적인 예라고 할 수 있다.

```java
public class Speaker {

  private String name;
  private int volumeCapacity;
  private int usbPortCount;
  private boolean hasLight;

  private Speaker(Builder builder) {
    this.name = builder.name;
    this.volumeCapacity = builder.volumeCapacity;
    this.usbPortCount = builder.usbPortCount;
    this.hasLight = builder.hasLight;
  }

  public static class Builder {

    private final String name;
    private final int volumeCapacity;
    private int usbPortCount;
    private boolean hasLight;

    public Builder(String name, int volumeCapacity) {
      this.name = name;
      this.volumeCapacity = volumeCapacity;
    }

    public Builder usbPortCount(int usbPortCount) {
      this.usbPortCount = usbPortCount;
      return this;
    }

    public Builder hasLight(boolean hasLight) {
      this.hasLight = hasLight;
      return this;
    }
    
    public Speaker build() {
      return new Speaker(this);
    }

  }

}
```

```java
public class Main {

  static void main(String args[]) {
    Speaker speaker = Speaker.Builder("Sound Bar", 10)
                        .volumeCapacity(10)
                        .hasLight(true)
                        .build();
    speaker.setVolumeCapacity(10);
    speaker.setHasLight(true);
  }

}
```

**빌더 패턴**은 필수 매개변수만으로 빌더 인스턴스를 생성하고, setter를 통해 선택적 매개변수를 설정 후 최종적으로 매개변수가 없는
build 메소드를 통해 우리에게 필요한 객체를 얻습니다.  
일반적으로 빌더는 생성할 클래스 안에 정적 맴버 클래스로 만들어두고 사용합니다.

# 줄이며...
**생성자**, **정적 팩토리 메소드**가 처리해야 할 매개변수가 많은경우 혹은 선택적 매개변수가 많은 경우에는
**빌더 패턴**을 사용하는게 좋을 것 같습니다.
