# 커스텀 fussy string matching

### 설치

```
git clone https://github.com/ymStudyLog/fussy-string-matching.git

npm i

npm start
```

### 과정

임의의 단어장 목록(dictionary)을 기준으로 Fuse.js 라이브러리 matching 결과를 보면서 아래와 같은 로직을 만들었다. 번호가 작을수록 우선순위이다.

1. 검색어와 완전히 동일한 단어를 추천
2. 검색어를 포함한 단어인데, 단어에서 검색어 위치에 따라 오름차순으로 추천
3. '검색어 전체 길이-1'의 자른 검색어들로 1,2를 반복해서 추천
4. 계속 길이를 1씩 줄여서 3을 반복하는데 자른 단어의 길이가 2보다 작지 않도록 한다. (길이가 1인 단어는 검색어와 관련이 거의 없기 때문인것 같다.)

이 로직을 바탕으로 useFussy hook을 만들었다.

### 결과 및 회고

"bagg" 검색 시

|  Fuse.js 추천 순서       |  useFussy 추천 순서         |
| ----------------------- | -------------------------- |
|    baggage    |   baggage    |
|    bag    |    bag     |
|    aggresive    |    bagy     |
|    taggt    |    abaga     |
|    bagy    |    a bag snatch     |
|   agg     |    travel bag     |
|   abaga     |    shopping bag     |
|   travel bag     |    agg     |
|    shopping bag    |    aggresive     |
|    a bag snatch    |    taggt     |
|    agi    |    bay     |
|    bay   |    agi     |

Fuse.js 알고리즘을 정확하게 파악하고 만든 것이 아니라 결과가 정확하게 일치하지는 않았다. 기회가 되면 나중에 Fuse.js 나 fussy string matching 알고리즘을 자세하게 공부하고 useFussy를 고쳐보고 싶다.

_(3번 단계 알고리즘이 잘못된 것 같다. 아마도 matching이 들어가는 단어 길이별로 전부 합쳐서 정렬을 해야하는 것 같은데, 정렬 기준에 단어가 전체에서 위치하는 index가 필요한 것 같다.)_



