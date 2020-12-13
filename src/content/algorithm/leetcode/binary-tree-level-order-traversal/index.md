---
template: post
draft: false
image: img/cover.jpg
date: 2020-12-13 15:16:58 +09:00
title: "[LeetCode] #102. Binary Tree Level Order Traversal"
excerpt: 주어진 트리의 너비 우선 탐색(BFS)을 통해 레벨별로 묶은 노드의 값을 구해봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - tree
  - breadth_first_search
  - bfs
---

# 문제
## [#102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal)
Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

## Example 1.
```
Input: root = [3, 9, 20, null, null, 15, 7]
Output:
[
  [3],
  [9, 20],
  [15, 7]
]
```

---

# 해법
루트 노드부터 BFS(Breadth First Search)를 통해 모든 노드를 순회하며, 노드의 레벨 순서대로 묶은 노드의 값을 구하며,
노드의 값이 없는 레벨은 처리하지 않는다는 점을 고려해야 합니다.  
(ex: root 노드의 값이 없는 경우, 결과 값은 `[]` 이다.)

## 나의 해법 (Recursion)
### 성능
- 시간 복잡도 : `O(n)`
- 공간 복잡도 : `O(n)`

### 해법
재귀 호출을 통한 레벨 순회(Level order)를 이용한 해법으로, 각 레벨별로 번갈아 노드를 처리하기 위해 두개의 queue를 선언 후
`root` 노드로부터 시작하여 레벨별로 노드의 값을 누적한다.
1. `root` 노드의 값이 없는 경우, 비어있는 리스트 `levels`를 반환한다.
2. queue를 2개 선언 후, 그 중 하나의 queue에 `root` 노드를 삽입하고, `groupByLevel()` 함수를 호출한다.  
2-1. 전달 받은 현재 레벨의 노드가 들어있는 queue `curLevelQueue`가 비어있다면 반환한다.  
2-2. `curLevelQueue`의 요소가 존재하는동안 반복한다.  
2-2-1. `curLevelQueue`의 요소 하나를 poll 하여, `node`에 할당한다.  
2-2-2. 현재 레벨의 노드를 담을 `curLevelNodes`에 `node`의 값을 추가한다.  
2-2-3. `node`의 **왼쪽 자식 노드** `node.left`가 존재한다면, 다음 레벨의 노드를 담을 queue `nextLevelQueue`에 추가한다.  
2-2-4. `node`의 **오른쪽 자식 노드** `node.right`가 존재한다면, 다음 레벨의 노드를 담을 queue `nextLevelQueue`에 추가한다.  
2-3. 최종 결과로 반환할 `levels`에 현재 레벨의 노드를 담은 `curLevelNodes`를 추가한다.  
2-4. 다음 레벨의 노드를 담은 `nextLevelQueue`를 선두로 하여, `groupByLevel()` 함수를 호출한다.  
     (각 레벨별로 두개의 queue가 번갈아 가며 작업을 진행한다.)

### Java 코드
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class BinaryTreeLevelOrderTraversal {

  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> levels = new LinkedList<>();
    if (root == null) return levels;

    Queue<TreeNode> queue1 = new LinkedList<>();
    Queue<TreeNode> queue2 = new LinkedList<>();
    queue1.add(root);

    return this.groupByLevel(levels, queue1, queue2);
  }

  private List<List<Integer>> groupByLevel(List<List<Integer>> levels, Queue<TreeNode> curLevelQueue, Queue<TreeNode> nextLevelQueue) {
    if (curLevelQueue.isEmpty()) return levels;

    List<Integer> curLevelNodes = new LinkedList<>();

    while (!curLevelQueue.isEmpty()) {
      TreeNode node = curLevelQueue.poll();
      curLevelNodes.add(node.val);

      if (node.left != null) nextLevelQueue.add(node.left);
      if (node.right != null) nextLevelQueue.add(node.right);
    }

    levels.add(curLevelNodes);

    return groupByLevel(levels, nextLevelQueue, curLevelQueue);
  }

}
```

## 최적 해법 (Recursion)
### 성능
- 시간 복잡도 : `O(n)`
- 공간 복잡도 : `O(n)`

### 해법
위에서 알아보았던 재귀 호출과 동일한 방식이지만, queue 사이즈를 확인함으로써 **하나의 queue**만을 사용하여 해결한다.
1. `root` 노드의 값이 없는 경우, 비어있는 리스트 `levels`를 반환한다.
2. `queue`를 선언 후 `root` 노드를 삽입하고, `groupByLevel()` 함수를 호출한다.  
2-1. 전달 받은 `queue`가 비어있다면 반환한다.  
2-2. `queue`의 사이즈를 `queueSize`에 할당하고, 해당 사이즈만큼 반복한다.  
2-2-1. `queue`의 요소 하나를 poll 하여, `node`에 할당한다.  
2-2-2. 현재 레벨의 노드를 담을 `curLevelNodes`에 `node`의 값을 추가한다.  
2-2-3. `node`의 **왼쪽 자식 노드** `node.left`가 존재한다면, `queue`에 추가한다.  
2-2-4. `node`의 **오른쪽 자식 노드** `node.right`가 존재한다면, `queue`에 추가한다.  
2-3. 최종 결과로 반환할 `levels`에 현재 레벨의 노드를 담은 `curLevelNodes`를 추가한다.  
2-4. `groupByLevel()` 함수를 호출한다.

### Java 코드
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class BinaryTreeLevelOrderTraversal {

  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> levels = new LinkedList<>();
    if (root == null) return levels;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    return this.groupByLevel(levels, queue);
  }

  private List<List<Integer>> groupByLevel(List<List<Integer>> levels, Queue<TreeNode> queue) {
    if (queue.isEmpty()) return levels;

    List<Integer> curLevelNodes = new LinkedList<>();

    int queueSize = queue.size();
    for (int i = 0; i < queueSize; i++) {
      TreeNode node = queue.poll();
      curLevelNodes.add(node.val);

      if (node.left != null) queue.add(node.left);
      if (node.right != null) queue.add(node.right);
    }

    levels.add(curLevelNodes);

    return groupByLevel(levels, queue);
  }

}
```

## 최적 해법 (Iteration)
### 성능
- 시간 복잡도 : `O(n)`
- 공간 복잡도 : `O(n)`

### 해법
이번에는 재귀 호출이 아닌, 반복문을 통해 해결한다.
1. `root` 노드의 값이 없는 경우, 비어있는 리스트 `levels`를 반환한다.
2. `queue`를 선언 후 `root` 노드를 삽입한다.
3. `queue`의 요소가 존재하는동안 반복한다.  
3-1. `queue`의 사이즈를 `queueSize`에 할당하고, 해당 사이즈만큼 반복한다.  
3-1-1. `queue`의 요소 하나를 poll 하여, `node`에 할당한다.  
3-1-2. 현재 레벨의 노드를 담을 `curLevelNodes`에 `node`의 값을 추가한다.  
3-1-3. `node`의 **왼쪽 자식 노드** `node.left`가 존재한다면, `queue`에 추가한다.  
3-1-4. `node`의 **오른쪽 자식 노드** `node.right`가 존재한다면, `queue`에 추가한다.  
3-2. 최종 결과로 반환할 `levels`에 현재 레벨의 노드를 담은 `curLevelNodes`를 추가한다.
4. 최종 결과인 `levels`를 반환한다.

### Java 코드
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class BinaryTreeLevelOrderTraversal {

  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> levels = new LinkedList<>();
    if (root == null) return levels;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
      List<Integer> curLevelNodes = new LinkedList<>();

      int queueSize = queue.size();
      for (int i = 0; i < queueSize; i++) {
        TreeNode node = queue.poll();
        curLevelNodes.add(node.val);

        if (node.left != null) queue.add(node.left);
        if (node.right != null) queue.add(node.right);
      }
      levels.add(curLevelNodes);
    }

    return levels;
  }

}
```

# 코멘트
여기서의 핵심은, queue의 사이즈 체크를 통해 한개의 queue로도 문제를 해결할 수 있다는 것 입니다.
