---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-19 17:41:14 +09:00
title: "[LeetCode] #73. Set Matrix Zeroes"
excerpt: 행렬 원소의 값이 0이면, 해당 원소의 모든 행과 열의 원소를 0으로 설정해봅니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - array
---

# 문제
## [#73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes)
Given an m x n matrix. If an element is 0, set its entire row and column to 0. Do it in-place.  
*Follow up:  
A straight forward solution using O(mn) space is probably a bad idea.  
A simple improvement uses O(m + n) space, but still not the best solution.  
Could you devise a constant space solution?*

## Example 1.
```
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

## Example 2.
```
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

## Constraints.
```
m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-231 <= matrix[i][j] <= 231 - 1
```

---

# 해법
단순하게 풀자면, 행렬을 복사 후 모든 행렬을 순회하며 복사한 신규 행렬에 0으로 설정해야 할 원소를 설정하는 방법이 있다.  
하지만 이 방범은 공간 복잡도가 `O(m * n)`이다. 이를 아래와 같이 좀 더 효율적인 방법으로 풀 수 있다. 

## 나의 해법
### 성능
- 시간 복잡도 : `O(m * n)`
- 공간 복잡도 : `O(m + n)`

### 해법
행렬을 순회하며 값이 0인 원소의 정보를 수집 후, 행렬을 가공하여 원하는 결과를 얻을 수 있다.
1. 행렬을 순회하며, 원소의 값이 0인 행과 열을 저장한다.
2. 저장한 원소값이 0인 모든 행과 열의 값으로 행렬을 0으로 설정한다. 

### Java 코드
```java
public class SetMatrixZeroes {
	public int[][] setZeroes(int[][] matrix) {
		int m = matrix.length;
		int n = matrix[0].length;

		// Array<[row, col]>
		List<int[]> zeroInfo = new LinkedList<>();

		for (int row = 0; row < m; row++) {
			for (int col = 0; col < n; col++) {
				if (matrix[row][col] == 0) {
					zeroInfo.add(new int[]{row, col});
				}
			}
		}

		zeroInfo.forEach(zero -> {
			int row = zero[0];
			int col = zero[1];

			setZeroEntireRowCol(matrix, row, col);
		});

		return matrix;
	}

	public void setZeroEntireRowCol(int[][] matrix, int curRow, int curCol) {
		int m = matrix.length;
		int n = matrix[0].length;

		// set zero row
		for (int col = 0; col < n; col++) {
			matrix[curRow][col] = 0;
		}

		// set zero col
		for (int row = 0; row < m; row++) {
			matrix[row][curCol] = 0;
		}
	}
}
```

## 최적 해법
### 성능
- 시간 복잡도 : `O(m * n)`
- 공간 복잡도 : `O(1)`

### 해법
Matrix의 첫번째 행과 첫번째 열을 마커로 사용하여, 공간 복잡도를 `O(1)`로 단축시킬 수 있다.  
1. 행렬을 순회하며 원소의 값이 0인 경우, 행렬의 각 첫번째 행과 첫번째 열에 값을 0으로 설정한다.  
(단, matrix[0][0] 원소의 경우 첫번째 열과 첫번째 행이 교차되는 지점으로써 별도의 flag를 사용하여 구분한다.)  
2. 행렬을 재순회 하며, 첫번째 행과 첫번째 열의 값을 기준으로 행렬을 0으로 설정한다.

### Java 코드
```java
public class SetMatrixZeroes {
	public int[][] setZeroes(int[][] matrix) {
		int m = matrix.length;
		int n = matrix[0].length;

		boolean usedFirstRow = false;
		boolean usedFirstCol = false;

		for (int row = 0; row < m; row++) {
			for (int col = 0; col < n; col++) {
				if (matrix[row][col] == 0) {
					usedFirstRow |= row == 0;
					usedFirstCol |= col == 0;

					matrix[0][col] = 0;
					matrix[row][0] = 0;
				}
			}
		}

		for (int row = 1; row < m; row++) {
			for (int col = 1; col < n; col++) {
				if (matrix[0][col] == 0 || matrix[row][0] == 0) {
					matrix[row][col] = 0;
				}
			}
		}

		if (usedFirstRow) {
			for (int col = 0; col < n; col++) {
				matrix[0][col] = 0;
			}
		}

		if (usedFirstCol) {
			for (int row = 0; row < m; row++) {
				matrix[row][0] = 0;
			}
		}

		return matrix;
	}
}
```

# 코멘트
이 문제의 핵심은
- 원소값이 0인 행과 열을 조합하여 저장하는 것이 아니라 별도로 저장한 후, 전체 matrix를 한번 순회하며 현재 원소의 행 혹은 열이 이전에 저장한 값에 존재 여부를 통하여 결과를 얻을 수 있다.
- matrix의 첫번째 행과 첫번째 열에 원소값이 0인 정보를 담음으로써, 공간 복잡도를 `O(1)`로 풀 수 있다.
