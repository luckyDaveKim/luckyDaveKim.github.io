---
template: post
draft: false
image: img/cover.jpg
date: 2022-02-03 00:32:41 +09:00
title: "[MacOS] 패키지 관리 서비스 Homebrew 설치 방법"
excerpt: yum, apt-get과 같이 MacOS에서 패키지를 관리해주는 homebrew를 설치하는 방법을 알아봅니다.
tags:
  - mac_os
  - tip
  - homebrew
  - brew
---

# 개요
MacOS에서 프로그램을 설치하고 제거하는 방법은 여러 가지가 있습니다.  
**.dmg**와 같은 확장자 파일을 실행시켜 설치하거나, `Launchpad`에서 아이콘을 길게 눌러 삭제하는 방법이 있습니다.
*CLI*에서 손쉽게 프로그램을 설치 및 삭제 할 수 있는 [Homebrew](https://brew.sh/index_ko) 설치 방법을 소개하고자 합니다.

---

# Homebrew 설치
Homebrew는 MacOS에서 패키지를 관리해주는 프로그램입니다.  
다음 명령어를 통해 Homebrew를 설치해줍니다.

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

# Homebrew 사용
Homebrew는 `brew` 명령어를 통해 사용할 수 있습니다.
설치가 잘 되었는지 다음 명령어를 통해 확인해봅니다.

```bash
$ brew --version

Homebrew 3.3.12
Homebrew/homebrew-core (git revision 34126e1bb3d; last commit 2022-01-26)
```

## 패키지 설치
이제 Homebrew로 패키지를 손쉽게 설치할 수 있습니다.  
설치하고 싶은 패키지가 Homebrew에서 지원하는지는 [Homebrew Formulae](https://formulae.brew.sh)에서 확인할 수 있고,
명령어도 함께 제공됩니다.

Homebrew를 통한 패키지 설치는 다음과 같은 형식입니다.

```bash
$ brew install <PACKAGE_NAME>
```

## 패키지 업그레이드
설치된 패키지를 `upgrade` 명령어를 통해, 최신 버전으로 업그레이드할 수 있습니다.  

```bash
$ brew upgrade <PACKAGE_NAME>
```

## 패키지 삭제
필요가 없어진 패키지도 `remove` 명령어를 통해, 간단하게 제거할 수 있습니다.

```bash
$ brew remove <PACKAGE_NAME>
```

## Homebrew 업그레이드
Homebrew 또한 패키지이기 때문에 새로운 버전이 나올 수 있습니다.
이때 `update` 명령어를 통해, Homebrew 패키지 자체를 업그레이드할 수 있습니다.

```bash
$ brew update
```

이제 Homebrew로 다양한 패키지를 손쉽게 관리해보세요!
