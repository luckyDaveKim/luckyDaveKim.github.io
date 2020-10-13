---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-14 01:02:49 +09:00
title: "[LeetCode] #19. Remove Nth Node From End of List"
excerpt: 한번의 순회를 통해, 뒤에서 n번째 노드를 제거해 봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - linked_list
  - two_pointers
---

# 문제
## [#19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list)  
Given the head of a linked list, remove the nth node from the end of the list and return its head.  
*Follow up: Could you do this in one pass?*

## Example 1.
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

## Example 2.
```
Input: head = [1], n = 1
Output: []
```

## Example 3.
```
Input: head = [1,2], n = 1
Output: [1]
```

## Constraints.
```
The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
```

---

# 해법
## 설명
단순하게 풀자면, 단방향 링크드 리스트 이므로 2번 순회하여 다음과 같이 풀 수 있다.
1. 전체 노드의 길이를 구한다.
2. 제거 대상 노드를 찾아가 제거한다.

이를 2개의 노드를 활용하여 1번 순회하여 다음과 같이 풀 수 있다.
1. n만큼의 거리를 갖는 두개의 `slow`, `fast` 노드를 설정한다.  
(총 `sz` 만큼의 노드 길이 중 `n` 만큼 순회한다.)
2. `slow` 노드와 `fast` 노드를 거리를 유지하며 맨 뒤까지 밀어 놓는다.  
(`sz` - `n` 만큼 순회한다.)
3. `slow` 다음 노드를 제거한다.

## Java 코드
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class RemoveNthNodeFromEndOfListNew {

	public ListNode removeNthFromEnd(ListNode head, int n) {
		ListNode start = new ListNode(0);
		start.next = head;

		ListNode slow = start;
		ListNode fast = start;

		for (int gap = 0; gap < n; gap++) {
			fast = fast.next;
		}
		while (fast.next != null) {
			slow = slow.next;
			fast = fast.next;
		}

		slow.next = slow.next.next;
		return start.next;
	}

}
```

---

# 코멘트
이 문제의 핵심은 두가지이다.
1. 2개의 노드를 활용하여 1번의 순회로 문제를 해결하기.
2. 최초의 더미노드 `start`를 활용해 Edge case 쉽게 해결하기.
