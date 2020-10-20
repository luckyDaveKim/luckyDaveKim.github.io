---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-20 17:52:04 +09:00
title: "[LeetCode] #64. Minimum Path Sum"
excerpt: 행렬의 좌측 상단에서 우측 하단까지의 가중치의 합이 최소인 값을 구해봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - array
  - dp
  - dynamic_programming
---

# 문제
## [#64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)
Given a m * n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.  
*Note: You can only move either down or right at any point in time.*

## Example 1.
```
Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
```

---

# 해법
## 나의 해법
### 성능
- 시간 복잡도 : `O((m * n)!)`
- 공간 복잡도 : `O(1)`

### 해법
`재귀 함수`를 통해 행렬을 좌측 상단부터, 우측 하단까지의 최소 가중치 합을 구하려 했다.  
이 풀이는 우측 하단부터 좌측 상단으로 최소 가중치를 구하며 이동해 결과를 구했고, 시간 복잡도가 너무 커서 Time Out 이 발생했다.
1. grid를 검토하여 비었다면 0을 반환한다.  
2. 좌측 상단의 좌표인 (0, 0)으로 재귀 함수를 호출하며 시작된다.  
2-1. 재귀 함수는 우측과 하단의 경로가 있는지 확인한다.  
2-2. 우측과 하단의 경로가 모두 존재하면, `(2)에서 우측 좌표 결과`와 `(2)에서 하단 좌표 결과` 중 최소값 + `현재 경로의 값`을 반환한다.  
2-3. 우측의 경로만 존재하면, `(2)에서 우측 좌표 결과` + `현재 경로의 값`을 반환한다.  
2-4. 하단의 경로만 존재하면, `(2)에서 하단 좌표 결과` + `현재 경로의 값`을 반환한다.  

## Java 코드
```java
public class MinimumPathSum {
	public int minPathSum(int[][] grid) {
		if (grid == null || grid.length == 0 || grid[0].length == 0) {
			return 0;
		}

		int sizeCol = grid.length;
		int sizeRow = grid[0].length;

		return findMinPathOfSum(grid, sizeRow, sizeCol, 0, 0);
	}

	public int findMinPathOfSum(int[][] grid, int sizeRow, int sizeCol, int row, int col) {
		boolean hasNextRow = row + 1 < sizeRow;
		boolean hasNextCol = col + 1 < sizeCol;

		int untilMinVal = 0;
		if (hasNextRow && hasNextCol) {
			untilMinVal = Math.min(findMinPathOfSum(grid, sizeRow, sizeCol, row + 1, col), findMinPathOfSum(grid, sizeRow, sizeCol, row, col + 1));
		} else if (hasNextRow) {
			untilMinVal = findMinPathOfSum(grid, sizeRow, sizeCol, row + 1, col);
		} else if (hasNextCol) {
			untilMinVal = findMinPathOfSum(grid, sizeRow, sizeCol, row, col + 1);
		}

		return grid[col][row] + untilMinVal;
	}
}
```

## 최적 해법
### 성능
- 시간 복잡도 : `O(m * n)`
- 공간 복잡도 : `O(m * n)`

### 해법
`DP(Dynamic Programming)`를 활용한 풀이로 메모리를 추가로 사용하는 대신, 시간 복잡도가 획기적으로 줄어든다.  
1. grid를 검토하여 비었다면 0을 반환한다.  
2. m * n 사이즈의 `dist` 배열을 설정한다.  
3. `getDist` 함수를 구현한다.  
3-1. `getDist`로 전달 받은 좌표가 under flow 시 Integer의 최댓값을 반환한다.  
3-2. 그 외의 경우에는 dist의 좌표를 반환한다.  
4. 행과 열을 순회하며 결과를 `dist[row][col]`에 담는다.  
4-1. 행과 열이 모두 0인경우 `dist[0][0]`에 `grid[0][0]`를 담는다.  
4-2. 그 외의 경우에는 `(3)에서 상단 좌표 결과`와 `(3)에서 좌측 좌표 결과` 중 최소값 + `현재 경로의 값`을 `grid[row][col]`에 담는다.  

## Java 코드
```java
public class MinimumPathSum {
	public int minPathSum(int[][] grid) {
		if (grid == null || grid.length == 0 || grid[0].length == 0) {
			return 0;
		}

		int sizeRow = grid.length;
		int sizeCol = grid[0].length;

		int[][] dist = new int[sizeRow][sizeCol];

		for (int row = 0; row < sizeRow; row++) {
			for (int col = 0; col < sizeCol; col++) {
				if (row == 0 && col == 0) {
					dist[0][0] = grid[0][0];
				} else {
					dist[row][col] = Math.min(getDist(dist, row - 1, col), getDist(dist, row, col - 1)) + grid[row][col];
				}
			}
		}

		return dist[sizeRow - 1][sizeCol - 1];
	}

	public int getDist(int[][] dist, int row, int col) {
		if (row < 0 || col < 0) {
			return Integer.MAX_VALUE;
		}

		return dist[row][col];
	}
}
```
