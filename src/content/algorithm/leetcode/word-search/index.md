---
template: post
draft: false
image: img/cover.jpg
date: 2020-10-26 20:06:56 +09:00
title: "[LeetCode] #79. Word Search"
excerpt: 주어진 단어가 2차원 배열에 연속적으로 인접하여 존재하는지 확인합니다.
tags:
  - leet_code
  - algorithm
  - medium_level
  - java
  - array
  - backtracking
---

# 문제
## [#79. Word Search](https://leetcode.com/problems/word-search)
Given a 2D board and a word, find if the word exists in the grid.  
The word can be constructed from letters of sequentially adjacent cells,
where "adjacent" cells are horizontally or vertically neighboring.
The same letter cell may not be used more than once.

## Example 1.
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

## Example 2.
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

## Example 3.
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

## Constraints.
```
board and word consists only of lowercase and uppercase English letters.
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3
```

---

# 해법
한 번 방문한 Grid에는 중복하여 방문할 수 없는 길찾기 문제로 볼 수 있으며, 백트래킹을 통해 풀어봅니다.

## 나의 해법
### 성능
- 시간 복잡도 : `O(m * n * l)`
- 공간 복잡도 : `O(m * n)`

### 해법
백트래킹을 이용한 해법으로, 방문 여부를 체크할 `board`와 동일한 크기의 `visits`를 선언 후,
모든 `board`를 순회하며 `word`가 존재하는지 찾는다.  
1. `board`의 값이 존재하는지 확인한다.
2. `board`의 크기와 동일한 boolean값의 `visits`를 선언한다.
3. `board`를 순회하며, `word`가 존재하는지 찾는다. 이 때, `board`와 `visits`, `works` 그리고 현재 좌표와 단어의 순서를 전달한다.
3-1. 현재 좌표가 유효한지 체크한다.
3-2. 현재 좌표에 방문했는지 체크한다.
3-3. 현재 좌표의 `board`와 단어가 일치하는지 체크한다.
3-4. 지금까지 통과했으며, 모든 단어를 순회했다면 `true`를 반환한다.
3-5. 추가로 찾을 단어가 남았다면, 현재 좌표를 기준으로 상/하/좌/우로 탐색을 계속 진행한다.

### Java 코드
```java
public class WordSearch {

	public boolean exist(char[][] board, String word) {
		boolean isExistsBoard = board != null && board[0] != null;
		if (!isExistsBoard) {
			return false;
		}

		int rowSize = board.length;
		int colSize = board[0].length;
		boolean[][] visits = new boolean[rowSize][colSize];

		for (int row = 0; row < rowSize; row++) {
			for (int col = 0; col < colSize; col++) {
				if (dfs(board, visits, row, col, word, 0)) {
					return true;
				}
			}
		}

		return false;
	}

	public boolean dfs(char[][] board, boolean[][] visits, int row, int col, String letters, int letterIndex) {
		boolean isInBoundary = row >= 0 && row < board.length && col >= 0 && col < board[0].length;
		if (!isInBoundary) {
			return false;
		}

		boolean isVisited = visits[row][col];
		if (isVisited) {
			return false;
		}

		if (board[row][col] != letters.charAt(letterIndex)) {
			return false;
		}

		if (letterIndex == letters.length() - 1) {
			return true;
		}

		visits[row][col] = true;

		int[] nextRowHelper = new int[]{-1, 0, 1, 0};
		int[] nextColHelper = new int[]{0, 1, 0, -1};
		for (int i = 0; i < 4; i++) {
			int nextRow = row + nextRowHelper[i];
			int nextCol = col + nextColHelper[i];

			if (dfs(board, visits, nextRow, nextCol, letters, letterIndex + 1)) {
				return true;
			}
		}

		visits[row][col] = false;

		return false;
	}
}
```

# 코멘트
여기서의 핵심은, 방문 여부를 체크하는 `visits`를 사용하여 깊이 우선 탐색(DFS, Depth First Search)을 진행하는 것 입니다.
