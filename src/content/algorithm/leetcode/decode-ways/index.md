---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-28 03:09:18 +09:00
title: "[LeetCode] #91. Decode Ways"
excerpt: 디코딩 가능한 모든 경우의 수를 구해봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - string
  - dynamic_programming
---

# 문제
## [#91. Decode Ways](https://leetcode.com/problems/decode-ways)
A message containing letters from A-Z is being encoded to numbers using the following mapping:  

'A' -> 1  
'B' -> 2  
...  
'Z' -> 26  
Given a non-empty string containing only digits, determine the total number of ways to decode it.  
The answer is guaranteed to fit in a 32-bit integer.  

## Example 1.
```
Input: s = "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
```

## Example 2.
```
Input: s = "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

## Example 3.
```
Input: s = "0"
Output: 0
Explanation: There is no character that is mapped to a number starting with '0'. We cannot ignore a zero when we face it while decoding. So, each '0' should be part of "10" --> 'J' or "20" --> 'T'.
```

## Example 4.
```
Input: s = "1"
Output: 1
```

## Constraints.
```
1 <= s.length <= 100
s contains only digits and may contain leading zero(s).
```

---

# 해법
디코딩 할 때, 10의 자리가 될 수 없는 경우(10의자리 조합 후 다음 수가 0이면 안된다, 27 이상은 안된다)에 대한 고려가 필요합니다.  
백트래킹의 해법의 경우 타임아웃이 발생하여, DP를 통한 문제 해결을 해야 합니다.

## 나의 해법 (Backtracking)
### 성능
- 시간 복잡도 : `O(n!)`
- 공간 복잡도 : `O(1)`

### 해법
백트래킹을 이용한 해법으로, 이는 타임아웃이 발생했습니다.
1. 시작 숫자가 0이면 0을 반환합니다.
2. 텍스트를 순회하며, 10의자리가 될 수 있는 경우와 그렇지 않은 경우를 나누어 재귀호출을 하며 결과를 더합니다.  
2-1. 텍스트 순회가 종료되었을 때, 10의 자리수 계산으로 요청이 온경우 0을 반환하고, 그렇지 않은경우 1을 반환합니다.  
2-2. 10의 자리수 계산으로 요청온 숫자가 27 이상인 경우는 0을 반환합니다.   
2-3. 1의 자리수 계산으로 요청이 온경우, 10과 20이 가능한 `1`, `2`의 값은 10의 자리수 요청으로 재귀 호출합니다.  
2-4. 1의 자리수 계산으로 요청온 숫자가 0인경우 결과를 0으로 반환합니다.  
2-5. 그 외의 경우 1을 반환합니다.

### Java 코드
```java
public class DecodeWays {

  public int numDecodings(String s) {
    if (s.equals("0")) {
      return 0;
    }

    return countDecodeWays(s.toCharArray(), 0, false);
  }

  public int countDecodeWays(char[] s, int i, boolean hasTen) {
    if (i == s.length) {
      return hasTen ? 0 : 1;
    }

    char token = s[i];

    int untilCount = 0;

    if (hasTen) {
      char beforeToken = s[i - 1];
      if (beforeToken == '2') {
        switch (token) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
            untilCount += countDecodeWays(s, i + 1, false);
        }
      } else if (beforeToken == '1') {
        untilCount += countDecodeWays(s, i + 1, false);
      }
    } else {
      if (token == '1' || token == '2') {
        untilCount += countDecodeWays(s, i + 1, true);
      }

      if (token != '0') {
        untilCount += countDecodeWays(s, i + 1, false);
      }
    }

    return untilCount;
  }

}
```

## 최적 해법
### 성능
- 시간 복잡도 : `O(n)`
- 공간 복잡도 : `O(n)`

### 해법
DP를 이용한 해법으로 `i`번째 자리수 까지의 디코딩 가능한 모든 경우의 수는 다음과 같이 구할 수 있습니다.  
1. `i`번째 수가 0이 아닌경우. 즉, 한자리 수를 통한 디코딩이 가능한 경우로써 `i - 1`번째 까지의 디코딩 방식을 더합니다.  
2. `i`번째 수와 `i - 1`번째 수가 10(J) ~ 26(Z)사이의 숫자인 경우. 즉, 두자리 수로 문자를 만들 수 있는 경우. 
이 경우에는 한자리 수를 통한 디코딩과 두자리 수를 통한 디코딩이 가능하므로, "`i - 1`번째 까지의 디코딩 방식" + "`i - 1`번째 까지의 한자리 수를 통한 디코딩 방식 (그래야 `i - 1`번째 수와 `i`번째를 합친 두자리 수로 디코딩이 가능하다)" 로 나타낼 수 있습니다.

### Java 코드
```java
public class DecodeWays {

	public int numDecodings(String s) {
		int[] dp = new int[s.length()];
		dp[0] = s.charAt(0) == '0' ? 0 : 1;

		for (int i = 1; i < s.length(); i++) {
			int curOnesNum = s.charAt(i) - '0';
			int curTensNum = (s.charAt(i - 1) - '0') * 10 + curOnesNum;

			if (curOnesNum != 0) {
				dp[i] += dp[i - 1];
			}

			if (curTensNum >= 10 && curTensNum <= 26) {
				dp[i] += (i >= 2) ? dp[i - 2] : 1;
			}
		}

		return dp[s.length() - 1];
	}

}
```

# 코멘트
이 문제의 핵심은,
- 백트래킹이 아닌 DP를 통한 메모이제이션으로 중복된 계산을 피하는 것.
- `char`를 `int`로 변환하여 로직을 단순화 하는 것.
- 디코딩이 불가능한 경우가 존재한다는 것.
