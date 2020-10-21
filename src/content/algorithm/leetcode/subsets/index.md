---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-22 05:15:36 +09:00
title: "[LeetCode] #78. Subsets"
excerpt: 중복없는 집합 요소에서 가능한 모든 조합을 구해봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - array
  - backtracking
  - bit_manipulation
---

# 문제
## [#78. Subsets](https://leetcode.com/problems/subsets)
Given a set of distinct integers, nums, return all possible subsets (the power set).  
*Note: The solution set must not contain duplicate subsets.*

## Example 1.
```
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

---

# 해법
배열 `nums`의 요소는 중복없는 숫자로 이루어져 있으므로, `nums`의 조합을 구하면 됩니다.

## 나의 해법 (Backtracking)
### 성능
- 시간 복잡도 : `O(n * 2^n)`
- 공간 복잡도 : `O(n * 2^n)`

### 해법
백트래킹을 이용한 해법으로, 재귀함수를 통해 전달받은 인자값 `subset`을 복사 후, 현재 요소를 추가하여 `subsets`에 추가 하고 다시 재귀함수를 호출하며 결과를 얻는다.  
1. 결과로 반환 할 `subsets`를 생성 후, 비어있는 `subset`을 추가한다.  
2. 비어있는 리스트와 순환을 시작할 index 0을 인자로 재귀함수를 호출한다.  
2-1. 인자로 받은 index 부터 `nums`를 순회한다.  
2-2. 인자로 받은 비어있는 리스트 `subset`에 `nums` 요소를 추가하여 최종 결과인 `subsets`에 넣는다.  
2-3. 현재 요소를 추가한 `subset`과 다음 index를 인자로 재귀함수를 호출한다.  
2-4. 재귀함수는 index가 `nums`의 영역을 벗어나면 종료된다.

### Java 코드
```java
public class Subsets {

	public List<List<Integer>> subsets(int[] nums) {
		List<List<Integer>> subsets = new LinkedList<>();

		// Add empty subset
		subsets.add(new LinkedList<>());

		putOnSubsets(nums, subsets, new LinkedList<>(), 0);

		return subsets;
	}

	public void putOnSubsets(int[] nums, List<List<Integer>> subsets, List<Integer> subset, int startIndex) {
		for (int i = startIndex; i < nums.length; i++) {
			List<Integer> curList = copy(subset);
			curList.add(nums[i]);

			subsets.add(curList);

			putOnSubsets(nums, subsets, copy(curList), i + 1);
		}
	}

	public List<Integer> copy(List<Integer> ori) {
		return new LinkedList<>(ori);
	}

}
```

## 나의 해법 (Cascading)
### 성능
- 시간 복잡도 : `O(n * 2^n)`
- 공간 복잡도 : `O(n * 2^n)`

### 해법
`nums`를 순회하며 값을 얻고, 기존 `subsets`의 요소들에 앞서 얻은 값을 더한 후 `subsets`에 신규로 추가하며 결과를 얻는다.  
1. `subsets`에 비어있는 `subset`을 추가한다.  
2. `nums`를 순회하며 `num`을 얻는다.  
2-1. 현재 `subsets` 요소만큼 순회한다.  
2-2. 얻은 요소에 `num`를 더한 결과를 `subsets`에 추가한다.  

### Java 코드
```java
public class Subsets {

	public List<List<Integer>> subsets(int[] nums) {
		List<List<Integer>> subsets = new ArrayList<>();

		// Add empty subset
		subsets.add(new LinkedList<>());

		for (int num : nums) {
			int subsetsSize = subsets.size();
			for (int j = 0; j < subsetsSize; j++) {
				List<Integer> node = new LinkedList<>(subsets.get(j));

				node.add(num);
				subsets.add(node);
			}
		}

		return subsets;
	}

}
```

## 다른 해법
### 성능
- 시간 복잡도 : `O(n * 2^n)`
- 공간 복잡도 : `O(n * 2^n)`

### 해법
Bit Mask를 이용한 풀이로, `nums`의 요소가 중복이 없기에 가능하다.  
여기서의 핵심은, Bit Mask 좌측의 0을 어떻게 손쉽게 처리하는가 이다.  
1. `nums`의 길이를 `n`이라 한다.  
2. `2^n` 부터 `2^(n + 1) - 1` 까지 순회한다.  
2-1. 순회하며 얻은 값을 Bit로 전환 후, 좌측의 1을 제거하여 Bit Mask를 얻는다.  
(이로써 Bit Mask의 좌측을 0으로 채울 수 있다.)  
2-2.  Bit Mask를 `nums`와 매핑하여 구한 값을 `subsets`에 추가한다.  

### Java 코드
```java
public class Subsets {

	public List<List<Integer>> subsets(int[] nums) {
		List<List<Integer>> subsets = new LinkedList<>();

		for (int i = (int) Math.pow(2, nums.length); i < (int) Math.pow(2, nums.length + 1); i++) {
			String bitMask = Integer.toBinaryString(i).substring(1);

			List<Integer> subset = new LinkedList<>();
			for (int j = 0; j < bitMask.length(); j++) {
				if (bitMask.charAt(j) == '1') {
					subset.add(nums[j]);
				}
			}

			subsets.add(subset);
		}

		return subsets;
	}

}
```

# 코멘트
여기서의 핵심은, 중복값이 없는 배열이기에 Bit Mask를 이용하여 간단하게 풀 수 있다는 것이다.
