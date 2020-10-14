---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-15 01:52:19 +09:00
title: "[LeetCode] #3. Longest Substring Without Repeating Characters"
excerpt: 반복되지 않는 가장 긴 문자열을 찾아 봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - hash_table
  - two_pointers
  - string
  - sliding_window
---

# 문제
## [#3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)  
Given a string s, find the length of the longest substring without repeating characters.  

## Example 1.
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

## Example 2.
```
Input: s = "bbbbb"
Output: 1
```
Explanation: The answer is "b", with the length of 1.

## Example 3.
```
Input: s = "pwwkew"
Output: 3
```
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

## Example 4.
```
Input: s = ""
Output: 0
```

## Constraints.
```
0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.
```

---

# 해법
## 설명
문자열 `s`는 영어, 숫자, 특수문자, 공백의 조합이므로 ASCII 코드의 조합이라고 볼 수 있다.  
이를 바탕으로 ASCII 코드 128종류를 담을 수 있는 int 배열을 준비하고, 문자의 ASCII 코드 번호를 배열의 index와 매칭하여 해당 문자의 마지막 출현 위치를 저장한다.  
이제 문자열을 순회하며, 배열에서 현재 문자에 매칭되는 값이 존재하는지 비교하면서 중복이 없는 최대 문자열 길이를 구한다.
1. 128 종류의 문자열의 마지막 출현 위치를 저장할 int 형의 배열 `lastIndexOf`를 선언하고 음수로 초기화 한다.
2. 문자열을 순회하며 다음을 구한다.  
2-1. 현재 문자의 마지막 출현 위치를 `lastIndexOf`를 통해 구하고, 중복없는 문자가 시작되는 위치 `indexSoFar`중 큰 값을 `indexSoFar`에 저장한다.  
2-2. 이전까지 중복이 없는 최대 문자열 길이 `maxLength`와 현재 문자를 포함한 최대 문자열 길이중 큰 값을 `maxLength`에 저장한다.  
2-3. 배열에 현재 문자의 마지막 출현 위치를 갱신한다.  
3. 지금 까지의 중복이 없는 최대 문자열 길이 `maxLength`를 반환한다.

## Java 코드
```java
public class LongestSubstringWithoutRepeatingCharacters {

  public int lengthOfLongestSubstring(String s) {
    int lastIndexOf[] = new int[128];
    Arrays.fill(lastIndexOf, -1);
    int n = s.length();
    int maxLength = 0;
    int indexSoFar = 0;

    for(int cursor = 0; cursor < n; cursor++) {
      char c = s.charAt(cursor);
      indexSoFar = Math.max(lastIndexOf[c] + 1, indexSoFar);
      maxLength = Math.max(maxLength, cursor - indexSoFar + 1);
      lastIndexOf[c] = cursor;
    }

    return maxLength;
  }

}
```

---

# 코멘트
이 문제의 핵심은 문자열이 ASCII의 조합임을 활용하여, 문자열을 순회하며 현재 문자의 ASCII 코드와 매칭되는 배열의 index 값에 현재 문자의 마지막 출현 위치를 지속적으로 갱신해가는 것이다.
