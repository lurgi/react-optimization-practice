# React Optimization practice repo

## React + Vite + PokeAPI

포켓몬 API를 이용하여 리액트 최적화를 연습하는 레포입니다.
기본적으로 필요한 부분에 Memo를 사용하고, useTransition을 이용한 Concurrency 동시성으로 실행합니다.

## Routes

### Home

1. README.md 파일을 동적으로 불러와서 사용할 수 있을까?
   - [ ] Vite에서 express사용하는 방법?
     - 마크다운 파일을 불러오기 위해선 Server Side에서 readFile로 접근해야한다. 따라서 백엔드 프레임 워크를 사용 할 필요성이 있다.
   - [x] React-markdown 라이브러리로 렌더링
   - [ ] React-markdown 스타일 적용

### Throttle

1. React-Query로 데이터를 불러온 다음, Mutate하여 데이터를 filter한다.
   - [ ] 데이터 페칭
   - [ ] input 핸들링
     - Concurrency
   - [ ] 데이터 필터링
     - React-Query Mutation

### Debounce

### Virtualized List

1. useRef를 useEffect 내부에서 사용하기 위해선, useEffect 내부에 참조를 선언해야만 한다.

- ```
  useEffect(() => {
    const instance = containerRef.current;
    ...
  ```

2. relative 값을 주의하여야 한다.
