import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchInput } from 'src/components/search';
import PostList from '../components/post/PostList';
import { IMovie } from '../types/Movie';
import { getMovieByPage, getMovieByRating } from '../api/movieApi';

const Search = () => {
  const [searchMovie, setSearchMovie] = useState<IMovie[] | []>([]);
  const [ratingMovie, setRatingMovie] = useState<IMovie[] | []>([]);
  const [latestMovie, setLatestMovie] = useState<IMovie[] | []>([]);
  const [page, setPage] = useState<number>(0);

  //탭 변환
  const [ratingTab, setRatingTab] = useState<boolean>(false);
  const [latestTab, setLatestTab] = useState<boolean>(false);

  useEffect(() => {
    if (ratingTab === true) {
      goToRatingTab();
    }
    if (latestTab === true) {
      goToLatestTab();
    }
  }, [page]);

  // 데이터 가져오는 함수
  const ratingMovieData = getMovieByRating(page);
  const latestMovieData = getMovieByPage(page);

  const handleSearchMovie = (result: IMovie[] | []) => {
    setSearchMovie(result);
  };

  // 정확도/평점순/최신순 탭
  const goToAccuracy = () => {
    setRatingTab(false);
    setLatestTab(false);
  };
  const goToRatingTab = () => {
    setRatingTab(true);
    setLatestTab(false);
    const { data } = ratingMovieData;
    if (!data) return setLatestMovie([...latestMovie]);
    setRatingMovie([...ratingMovie, ...data]);
  };
  const goToLatestTab = () => {
    setRatingTab(false);
    setLatestTab(true);
    const { data } = latestMovieData;
    if (!data) return setLatestMovie([...latestMovie]);
    setLatestMovie([...latestMovie, ...data]);
  };

  return (
    <>
      <SearchContainer>
        <SearchInput handleSearchMovie={handleSearchMovie} />
        <ButtonContainer>
          <Button onClick={goToAccuracy}>정확도순</Button>
          <Button onClick={goToRatingTab}>평점순</Button>
          <Button onClick={goToLatestTab}>최신순</Button>
        </ButtonContainer>
        {ratingTab ? (
          <>
            <PostList movieList={ratingMovie} page={page} setPage={setPage} />
          </>
        ) : latestTab ? (
          <>
            <PostList movieList={latestMovie} page={page} setPage={setPage} />
          </>
        ) : (
          <>
            <PostList movieList={searchMovie} />
          </>
        )}
      </SearchContainer>
    </>
  );
};

export default Search;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  width: 4.5rem;
  height: 2.5rem;
  margin-left: 10px;
  border-radius: 8%;
  border: solid 1px;
  color: white;
  background-color: #000000;
  :hover {
    cursor: pointer;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 1rem;
  position: relative;
  left: -35%;
`;
