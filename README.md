# 원티드 프리온보딩 2차 과제 - 영화 정보 사이트

## 🚀🚀 [배포 보러가기](https://wanted-preonboarding-movie-info-site.vercel.app/)
## 1. 소개

- 원티드 프리온보딩 5기 1-2~2-1 과제
- 영화 정보 사이트를 개발과 동시에 검색어 추천 기능 개발
- 기간 : 2022/07/06 ~ 2022/07/13

## 2. 역할
|이름|역할|github|
|---|---|---|
|이가람|검색, 추천, 검색 리스트|https://github.com/devmagrfs|
|박소영|영화 리스트, 무한 스크롤|https://github.com/soyoung931014|
|이미림|피그마, 영화 상세페이지, 즐겨찾기(기능)|https://github.com/mrlee323|
|서소희|전체 레이아웃, 라우팅 CSS, 리팩토링|https://github.com/greenish0902|
|성열하|검색, 추천, 검색 리스트|https://github.com/Hotsumm|
|박지훈|data fetching module|https://github.com/JiehoonPark|

## 3. 프로젝트 구조

```jsx

root
├──data
│   └──movies.json
│
├──public
│   └──images
│   │    └──noimage.png
│   │
│   └──index.html
│
├──src
│   ├── api
│   │     ├── index.ts
│   │     ├── movieApi.ts
│   │     └── useHttpRequest.ts
│   └── components
│        ├── elements
│        │     ├── Button.tsx
│        │     ├── Input.tsx
│        │     ├── SearchBar.tsx
│        │     └── index.ts
│        ├── layout
│        │     ├── Layout.tsx
│        │     └── Navigation.tsx
│        ├── post
│        │     ├── PostCard.tsx
│        │     ├── PostDetail.tsx
│        │     ├── PostList.tsx
│        │     └── PostRow.tsx
│        ├── search
│        │     ├── SearchInput.tsx
│        │     ├── SearchList.tsx
│        │     └── index.ts
│        └── slider
│              ├── Slide.tsx
│              └── Slider.tsx
│
├── pages
│   ├── Bookmark.tsx
│   ├── Detail.tsx
│   ├── Home.tsx
│   └── Search.tsx
│
├── styles
│   ├── theme.ts
│   └── GlobalStyle.ts
│
├── types
│   └── Movie.ts
│
├── utils
│   ├── randomIndex.ts
│   └── useWindowDimensions.ts
├── Router.tsx
├── App.tsx
└── index.tsx
```

## 4. 구현 기능

### 영화 검색

- [x]  초기 화면은 검색 탭에서 시작합니다.
- [x]  검색 탭은 상단에 `검색 입력 input` , `검색 button` 의 요소를 가집니다.
- [x]  처음 검색 결과 영역에 (검색되지 않은 초기상태) “검색 결과가 없습니다” 등의 표시를 노출해 주어야 합니다.
- [x]  검색어를 입력한 후 검색을 클릭하면 아래로 검색 결과가 노출됩니다.
- [x]  검색 결과가 없는 경우 "검색 결과가 없습니다.”(위와 동일한 컴포넌트)를 노출해야 합니다.
- [x]  검색 결과의 가장 하단으로 내려온 경우 추가로 데이터를 요청하여 그려줍니다.  (`infinity scorll`)  (추가구현 사항)

### 영화 선택

- [x]  검색해서 출력된 영화 리스트 중 하나를 클릭하면 나오는 상세 페이지 입니다.
- [x]  상세페이지는 각 영화의 간단한 설명등이 포함됩니다.
- [x]  해당 페이지에는 즐겨찾기 `button` 요소를 가집니다.
- [x]  즐겨 찾기를 누르면 즐겨찾기가 다시 누르면 즐겨찾기 취소로 표현되어야 합니다. (icon or 문자열)

### 즐겨찾기

- [x]  즐겨 찾기 탭을 클릭하면 즐겨찾기로 진입합니다.
- [x]  즐겨찾기 페이지에는 즐겨찾기 된 영화리스트가 보여 집니다. (검색 했을 때와 동일)

### 검색어

- [x]  검색어를 입력하면 입력된 문자열을 통해 데이터에서 추천 검색어를 출력 해줍니다.
- [x]  검색어가 없을 시 “검색어 없음”으로 노출 됩니다.
- [x]  API 호출을 최대한 줄입니다. (debounce)
- [ ]  매 호출마다 console.log를 통해 얼마나 호출되었는지 파악할 수 있도록 해주세요.
- [ ]  fuzzy string matching 지원

예 ) 입력 : 간  추천검색어: 간염, 간암, 간성, 간질병,
 입력: 간염  추천검색어:간염증
 
 
 
 ## 5. [피그마 🎨](https://www.figma.com/file/Mu4NicacSniXYsGvf8tfZh/Wanted?node-id=0%3A1) 
 
 ### 웹
 
 ![스크린샷 2022-08-11 오후 10 38 09](https://user-images.githubusercontent.com/80194405/184146398-ee925817-82ba-432f-ac48-796a56f3c714.jpg)

### 모바일
![스크린샷 2022-08-11 오후 10 39 32](https://user-images.githubusercontent.com/80194405/184146671-6ab6c2e8-b983-48dc-ba38-53270042c9f2.jpg)

