---
template: post
draft: false
image: img/cover.jpg
date: 2024-01-27 00:09:21 +09:00
title: Spring Boot v2 에서 v3 마이그레이션
excerpt: Spring Boot v2 에서 v3 마이그레이션 작업을 진행하며 겪은 이슈에 대해 알아봅니다.
tags:
  - spring_boot
  - version  
  - migration
  - v2
  - v3
---

# 개요

이 포스팅에서는 Spring Boot 버전 2.x 에서 3.x 로 올리며 겪은 이슈에 대해 공유하려 합니다.  

> 마이그레이션 코드는 [Spring Boot Migration Guide](https://github.com/luckyDaveKim/springboot-migration-guide) 를 참고하실 수 있습니다.

# Spring Boot 마이그레이션 시작

Spring Boot 를 v2.x 에서 v3.x 로 올려보겠습니다. [Spring Boot 3.0 마이그레이션 공식 문서](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide) 를 토대로 진행해보겠습니다.

> 들어가기 전에, Spring Boot v3 은 Java 17 이상을 사용해야 합니다. (더 이상 Java 8 은 Spring Boot v3 에서 사용할 수 없습니다.)

## 0. Spring Boot v2 와 v3 의 의존성 확인

Spring Boot v3 으로 넘어가면서 여러 의존성이 변경되었습니다. 각 프로젝트에서 얼마나 영향이 있을지 의존성을 확인합니다.
- [Spring Boot v2.7.x 의존성](https://docs.spring.io/spring-boot/docs/2.7.x/reference/html/dependency-versions.html#appendix.dependency-versions)
- [Spring Boot v3.0.x 의존성](https://docs.spring.io/spring-boot/docs/3.0.x/reference/html/dependency-versions.html#appendix.dependency-versions)

여러 의존성 변경 중 하나는 `ehcache` 의존성 제거입니다.  
Spring Boot v2 에서 관리되던 ehcache 는 Spring Boot v3 부터 더 이상 관리되지 않는 의존성입니다.  
그 때문에 기존에 `org.springframework.cache.ehcache` 패키지를 사용하고 있었다면, 더 이상 사용할 수 없습니다.

## 1. Junit v5 사용하기

Spring Boot v2.7 의 `spring-boot-starter-test` 는 Junit v5 를 기본으로 제공하니, 이참에 Junit v5 로 올립니다.
maven 의존성 설정에서 `spring-boot-starter-test` 내부의 Junit v4 의존성을 제외해주고, Junit v5 의존성을 추가해줍니다.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
  <exclusions>
    <exclusion>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
    </exclusion>
  </exclusions>
</dependency>

<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-api</artifactId>
  <version>5.10.1</version>
  <scope>test</scope>
</dependency>
```

### Junit v4 와 v5 어떤 점이 바뀌는가?

큰 틀에서 테스트 방식은 비슷합니다. 다만 몇 가지 용어와 설정이 바뀝니다.  
더욱 자세한 내용은 [Junit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations) 를 참고합니다.

| Junit v4     | Junit v5    | 설명                                                                                          |
|--------------|-------------|---------------------------------------------------------------------------------------------|
| @BeforeClass | @BeforeAll  | 현재 클래스의 모든 `@Test`, `@RepeatedTest`, `@ParameterizedTest`, `@TestFactory` 메소드 보다 먼저 실행됩니다.  |
| @AfterClass  | @AfterAll   | 현재 클래스의 모든 `@Test`, `@RepeatedTest`, `@ParameterizedTest`, `@TestFactory` 메소드 보다 나중에 실행됩니다. |
| @Before      | @BeforeEach | 각 `@Test`, `@RepeatedTest`, `@ParameterizedTest`, `@TestFactory` 메소드 보다 먼저 실행됩니다.           |
| @After       | @AfterEach  | 각 `@Test`, `@RepeatedTest`, `@ParameterizedTest`, `@TestFactory` 메소드 보다 나중에 실행됩니다.          |
| @Ignore	     | @Disabled   | 테스트 클래스 혹은 메소드를 비활성화 합니다.                                                                   |

## 2. Spring Boot v2.7.x 로 올리기

Spring Boot v3.0 마이그레이션 공식 문서를 보면, 우선 `Spring Boot v2.7.x` 버전으로 올려서 Spring Boot v2.x 대의 최신 의존성으로 맞추라고 합니다.

현재 가장 최신의 Spring Boot v2 는 [v2.7.18](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web/2.7.18) 이므로 maven 설정을 이에 맞춥니다.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <version>2.7.18</version>
</dependency>
```

### 오류가 뜨시나요?

Spring Boot v2.6 부터 `spring.mvc.pathmatch.matching-strategy` 설정 기본값이 `ant_path_matcher` 에서 `path_pattern_parser` 로
변경되었습니다.

> `ApplicationContextException` 오류 내용  
> org.springframework.context.ApplicationContextException: Failed to start bean 'documentationPluginsBootstrapper'; nested exception is java.lang.NullPointerException

위와 같은 오류가 뜬다면, property 값에 다음 내용을 추가해주면 됩니다.

```text
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
```

## 3. deprecated 된 method 조치

라이브러리가 버전이 올라가다 보면 더 이상 사용하지 않거나, 방향성에 맞지 않아 deprecated 되는 기능들이 생깁니다. 일반적으로 major 버전이 올라가면 deprecated 된 메소드를 제거하는데, 이를 미리
조치하여 손쉽게 Spring Boot 버전 올리도록 합니다.  
프로젝트마다 사용하고 있는 deprecated 된 메소드는 다르겠지만, 메소드 정의된 곳으로 가보면 어떻게 조치해야 하는지 대부분 힌트가 있습니다.

[Spring Boot Migration Guide](https://github.com/luckyDaveKim/springboot-migration-guide) 예제를 따라가며 deprecated 조치 방법을 살펴봅니다.

### 1) swagger

swagger 의 deprecated 된 메소드를 살펴보겠습니다.

- `@Api` 의 `description` 속성이 deprecated 되었습니다.  
[swagger 1.3 to 1.5 마이그레이션 문서](https://github.com/swagger-api/swagger-core/wiki/1.3--1.5-Migration#setting-up-additional-information-authorization-info) 를 보면, `tag` 값으로 대체할 수 있다고 합니다.

| AS-IS                                     | TO-BE                              |
|-------------------------------------------|------------------------------------|
| `@Api(description = "zone 기반 시간 조회 API")` | `@Api(tags = "zone 기반 시간 조회 API")` |

### 2) Assert

Spring Framework 의 `Assert` 는 특정 조건을 만족하는지 체크하고, 만족하지 않으면 예외를 발생시키는 라이브러리입니다.

- Assert 의 `hasText(text)` 메소드가 deprecated 되었습니다.  
[Assert.hasText(text)](https://docs.spring.io/spring-framework/docs/5.0.4.RELEASE/javadoc-api/org/springframework/util/Assert.html#hasLength-java.lang.String-) 문서를 보면, v4.3.7 부터 deprecated 되었다고 합니다.  
`Assert.hasText(text)` 메소드가 정의된 코드를 보면 [Assert.hasText(text, message)](https://docs.spring.io/spring-framework/docs/5.0.4.RELEASE/javadoc-api/org/springframework/util/Assert.html#hasLength-java.lang.String-java.lang.String-) 를 호출하고 있고, 문서에도 `Assert.hasText(text, message)` 를 사용하라고 되어있습니다.

```java
/** @deprecated */
@Deprecated
public static void hasText(@Nullable String text) {
    hasText(text, "[Assertion failed] - this String argument must have text; it must not be null, empty, or blank");
}
```

| AS-IS                         | TO-BE                                                 |
|-------------------------------|-------------------------------------------------------|
| `Assert.hasText(zoneIdText);` | `Assert.hasText(zoneIdText, "zoneIdText 값은 필수입니다.");` |


### 3) MockitoAnnotations

Mock 테스트를 위한 라이브러리입니다.

- `initMocks()` 메소드가 deprecated 되었습니다.  
대신 `openMocks()` 메소드로 변경해줍니다.

이런 식으로 deprecated 된 메소드를 모두 찾아서 다른 메소드로 대체해줍니다.

## 4. Java 17 이상 버전 사용하기

Spring Boot v3 부터는 java 17 이상만 지원합니다. 이에 따라 java 버전을 17 이상으로 올려줍니다.  
maven 의존성 설정에서 property 내의 java 버전을 바꿔줍니다.

```xml
<properties>
  ...
  <java.version>21</java.version>
  ...
</properties>
```

## 5. Caffeine Cache 사용하기

Spring Boot v3 부터 `spring-boot-starter-test` 에서 `ehCache` 를 지원하지 않습니다. `caffeineCache` 로 변경해줍니다.

`ehCache` 대신, `caffeineCache` maven 의존성을 추가해줍니다.

```xml
<dependency>
  <groupId>com.github.ben-manes.caffeine</groupId>
  <artifactId>caffeine</artifactId>
</dependency>
```

## 6. SpringDoc 사용하기

위에서 설정한 `ant_path_matcher` 을 언제고 달고 있을 수는 없습니다.  
Swagger 대신 SpringDoc 을 사용하며 ant_path_matcher 설정 의존성을 떼버립니다.

Swagger 대신 SpringDoc maven 의존성을 추가해줍니다.

```xml
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-ui</artifactId>
  <version>1.7.0</version>
</dependency>
```

### Swagger 에서 SpringDoc 전환

Swagger 에서 SpringDoc 으로 바꾸면서 몇 가지 어노테이션이 변경됩니다.

| Swagger    | SpringDoc  |
|------------|------------|
| @Api       | @Tag       |
| @Api(tags) | @Tag(name) |

Config 도 변경해줍니다.
- 기존 Swagger config

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2)
			.apiInfo(apiInfo())
			.select()
			.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
			.title("Spring Boot Migration")
			.description("Spring Boot v2 to v3 Migration Sample")
			.version("1.0")
			.build();
	}
}
```

- SpringDoc config

```java
@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI apiInfo() {
		return new OpenAPI().info(info());
	}

	private Info info() {
		return new Info()
			.title("Spring Boot Migration")
			.description("Spring Boot v2 to v3 Migration Sample")
			.version("1.0");
	}
}
```

## 7. Spring Boot v3 으로 올리기

maven 에서 Spring Boot 버전을 바꿔줍니다.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <version>3.2.1</version>
</dependency>
```

### 함께 변경되는 의존성

Spring Boot v3 으로 변경하면서 함께 변경되는 몇 가지 의존성도 작업해줍니다.

- SpringDoc
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

- httpclient
```xml
<dependency>
  <groupId>org.apache.httpcomponents.client5</groupId>
  <artifactId>httpclient5</artifactId>
</dependency> 
```

# 줄이며...

지금까지 Spring Boot v2 에서 v3 로 마이그레이션하는 방법에 대해 알아보았습니다.  
프로젝트마다 사용하는 의존성 라이브러리가 달라 추가 작업이 필요할 수 있겠지만, 문서를 보고 차근차근 따라가면 성공할 것입니다.
