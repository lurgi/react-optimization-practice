import ReactMarkdown from "react-markdown";

const readmeContent = `# React Optimization practice repo

## React + Vite + PokeAPI

포켓몬 API를 이용하여 리액트 최적화를 연습하는 레포입니다.
기본적으로 필요한 부분에 Memo를 사용하고, useTransition을 이용한 Concurrency 동시성으로 실행합니다.

## Routes

### Throttle

### Debounce

### Virtualized List`;

const Home = () => {
  return (
    <div className="mx-10 sm:w-[640px]">
      <ReactMarkdown>{readmeContent}</ReactMarkdown>
    </div>
  );
};

export default Home;
