---
template: post
draft: false
image: img/cover.jpg
date: 2020-12-14 02:33:51 +09:00
title: "[LeetCode] #105. Construct Binary Tree from Preorder and Inorder Traversal"
excerpt: 전위 순회, 중위 순회 값을 바탕으로 이진 트리를 구해봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - array
  - tree
  - depth_first_search
  - dfs
---

# 문제
## [#105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal)
Given preorder and inorder traversal of a tree, construct the binary tree.  
*Note: You may assume that duplicates do not exist in the tree.*

## Example 1.
```
Input: preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]
Output: [3, 9, 20, null, null, 15, 7]
```

---

# 해법
주어진 전위 순회(Preorder), 중위 순회(Inorder)의 특징을 이용하여 해결합니다.  
전위 순회 배열을 *PRE*, 중위 순회 배열을 *IN*이라고 하겠습니다.  
전위 순회의 첫 요소 *PRE[0]*는 전위 순회 특징에 따라 루트값 입니다.  
그리고 *PRE[0]*의 값이 중위 순회 배열 *IN*중 *IN[7]*과 일치한다고 가정하겠습니다.  
이때, 다음 두가지를 알 수 있습니다.  
1. *PRE[0]*은 루트노드이다.
2. *IN[7]*을 기준으로 좌측 요소들(*IN[0]* ~ *IN[6]*)은 중위 순회 특징에 따라 왼쪽 노드에 존재하며,
우측 요소들(*IN[8]* ~ *IN[max]*)은 중위 순회 특징에 따라 오른쪽 노드에 존재한다.

재귀를 통해 이를 반복하면 트리를 구할 수 있습니다.

## 나의 해법
### 성능
- 시간 복잡도 : `O(n)`
- 공간 복잡도 : `O(n!)`

### 해법
재귀 호출을 통한 해법으로, 중위 순회값 `inorder`를 조정해 가며 트리를 구한다.  
1. `genTree()` 함수를 통해 전위 순회 배열 `preorder`, 중위 순회 배열 `inorder` 값과 루트노드를 확인 할 수 있는 전위 순회의 인덱스 `preorderIndex`를 받는다.
2. `preorderIndex`가 전위 순회 배열 `preorder`의 사이즈를 넘어가면 null을 반환한다.
3. 루트노드의 값이 될 `val`을 구한다.
4. 루트노드의 값인 `val`이 중위 순회 배열에서 어느 인덱스에 존재하는지 구하여 `inorderIndex`에 할당한다.
5. 루트노드의 값 `val`이 현재 중위 순회 배열에 존재하지 않다면 (7) 혹은 (8)을 통한 다른쪽(왼쪽 혹은 오른쪽)에서 처리중이므로 `preorderIndex` 값을
   증가시킨 결과를 반환한다.  
   (이는 루트노드의 값이 중위 순회 배열에 값이 존재 할 때 까지 진행된다.)
6. 루트노드 `node`를 할당한다.
7. 위에서 구한 `inorderIndex`를 기준으로 중위 순회 배열의 **왼쪽 배열**들을 바탕으로 재귀 호출을 하고, 
   얻은 결과를 현재 루트노드 `node`의 **왼쪽 자식노드**로 할당한다.
8. 위에서 구한 `inorderIndex`를 기준으로 중위 순회 배열의 **오른쪽 배열**들을 바탕으로 재귀 호출을 하고,
   얻은 결과를 현재 루트노드 `node`의 **오른쪽 자식노드**로 할당한다.
9. 현재까지 구한 노드를 반환한다.

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
public class ConstructBinaryTreeFromPreorderAndInorderTraversal {

  public TreeNode buildTree(int[] preorder, int[] inorder) {
    return this.genTree(preorder, inorder, 0);
  }

  private TreeNode genTree(int[] preorder, int[] inorder, int preorderIndex) {
    if (preorderIndex >= preorder.length) return null;

    int val = preorder[preorderIndex];

    Integer inorderIndex = foundIndex(inorder, val);
    if (inorderIndex == null) {
      return this.genTree(preorder, inorder, preorderIndex + 1);
    }

    TreeNode node = new TreeNode(val);

    int[] leftInorder = Arrays.copyOfRange(inorder, 0, inorderIndex);
    TreeNode leftNode = this.genTree(preorder, leftInorder, preorderIndex + 1);
    if (leftNode != null) node.left = leftNode;

    int[] rightInorder = Arrays.copyOfRange(inorder, inorderIndex + 1, inorder.length);
    TreeNode rightNode = this.genTree(preorder, rightInorder, preorderIndex + 1);
    if (rightNode != null) node.right = rightNode;

    return node;
  }

  private Integer foundIndex(int[] arr, int val) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        return i;
      }
    }

    return null;
  }

}
```

## 최적 해법
### 성능
- 시간 복잡도 : `O(n)`
- 공간 복잡도 : `O(n)`

### 해법
위에서 알아보았던 해법과 전반적인 흐름은 동일하지만 몇가지 최적화가 이루어 졌다.
* 추가적인 중위 순회 배열을 생성하지 않으며,
* 다음 루트노드를 바로 찾아가서 위의 (5)와 같은 로직이 불필요하고,
* 자식노드를 할당할 때 null 체크를 하지 않는다.  
   (자식노드에 null을 할당하여도 무방하기 때문이다.)

최적화가 이루어진 해법은 다음과 같다.  

1. `genTree()` 함수를 통해 전위 순회 배열 `preorder`, 중위 순회 배열 `inorder` 값과 루트노드를 확인 할 수 있는 전위 순회의 인덱스 `preorderIndex`를 받으며,
   추가적인 중위 순회 배열을 생성하지 않기 위해 중위 순회 시작 인덱스 `inorderStartIndex`, 종료 인덱스 `inorderEndIndex`를 받는다.
2. `preorderIndex`가 전위 순회 배열 `preorder`의 사이즈를 넘어가거나, 중위 순회 인덱스가 유효하지 않으면 null을 반환한다.
3. 전위 순회 인덱스인 `preorderIndex`는 루트노드의 값을 가르키므로 해당 값을 바탕으로 루트노드 `node`를 할당한다.  
   (아래의 (6-2)를 통하여 루트노드를 바로 찾을 수 있다.)
4. 루트노드의 값을 중위 순회 배열에서 찾는다.  
4-1. 중위 순회 시작 인덱스 `inorderStartIndex` 부터, 종료 인덱스 `inorderEndIndex` 까지 순회한다.  
4-2. 중위 순회 배열에서 루트노드의 값과 동일한 인덱스를 찾으면 `inorderIndex`에 할당하고 순회를 종료한다.
5. 왼쪽 자식노드를 찾아 할당한다.  
5-1. `genTree()` 함수를 호출한다.  
5-2. 전위 순회 배열중 현재노드의 **왼쪽 자식노드**의 값은 `preorderIndex` + 1 이고,  
5-3. 중위 순회 배열의 시작 인덱스는, 현재까지 시작 제한점인 `inorderStartIndex`를 전달하고,  
5-4. 중위 순회 배열의 종료 인덱스는, 위에서 찾은 현재노드의 인덱스 이전 까지인 `inorderIndex` - 1을 전달한다.  
6. 오른쪽 자식노드를 찾아 할당한다.  
6-1. `genTree()` 함수를 호출한다.  
6-2. 전위 순회 배열중 현재노드의 **오른쪽 자식노드**의 값은 `preorderIndex` + `inorderIndex` - `inorderStartIndex` + 1 이고,  
     (오른쪽 자식노드의 값은, 현재노드의 값인 `preorderIndex`에서 중위 순회의 왼쪽 노드 수 `inorderIndex` - `inorderStartIndex` + 1를 더하면 구할 수 있다.)  
6-3. 중위 순회 배열의 시작 인덱스는, 위에서 찾은 현재노드의 인덱스 다음 부터인 `inorderIndex` + 1을 전달하고,  
6-4. 중위 순회 배열의 종료 인덱스는, 현재까지 종료 제한점인 `inorderEndIndex`를 전달한다.

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
public class ConstructBinaryTreeFromPreorderAndInorderTraversal {

  public TreeNode buildTree(int[] preorder, int[] inorder) {
    return this.genTree(preorder, inorder, 0, 0, inorder.length - 1);
  }

  private TreeNode genTree(int[] preorder, int[] inorder, int preorderIndex, int inorderStartIndex, int inorderEndIndex) {
    if (preorderIndex >= preorder.length || inorderStartIndex > inorderEndIndex) return null;

    TreeNode node = new TreeNode(preorder[preorderIndex]);
    int inorderIndex = 0;
    for (int i = inorderStartIndex; i <= inorderEndIndex; i++) {
      if (inorder[i] == node.val) {
        inorderIndex = i;
        break;
      }
    }

    node.left = this.genTree(preorder, inorder, preorderIndex + 1, inorderStartIndex, inorderIndex - 1);
    node.right = this.genTree(preorder, inorder, preorderIndex + inorderIndex - inorderStartIndex + 1, inorderIndex + 1, inorderEndIndex);

    return node;
  }

}
```

# 코멘트
여기서의 핵심은, 추가적인 배열을 생성하는 것이 아닌 배열의 시작/종료 인덱스를 통해 최적화 할 수 있다는 것 입니다.
