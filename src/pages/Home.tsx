import React from 'react';
import styled from 'styled-components';
import { getMovieByRating, getMovieByGenre, getMovies } from 'src/api/movieApi';
import { BsArrowUpSquareFill } from 'react-icons/bs';

import PostRow from '../components/post/PostRow';
import ScrollTop from 'src/components/elements/ScrollTop';
import { GENRES } from 'src/constants/movies';

const Home = () => {
  const scrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <HomeContainer>
      {GENRES.map((genre, index) => (
        <div className="row" key={index}>
          <h1>{genre}</h1>
          <PostRow movies={getMovieByGenre(genre).data} />
        </div>
      ))}
      <div className="row">
        <h1>평점 9.0 이상</h1>
        <PostRow movies={getMovieByRating(9).data} />
      </div>
      <button className="top" onClick={scrollTop}>
        <BsArrowUpSquareFill />
      </button>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.ul`
  position: relative;
  .selectWrapper {
    position: sticky;
    right: 0;
  }
  .row {
    h1 {
      position: absolute;
      padding-left: 48px;
      font-size: 28px;
      font-weight: 600;
    }
  }
  .top {
    position: fixed;
    bottom: 64px;
    right: 64px;
    color: ${({ theme }) => theme.color.gray_04};
    background-color: transparent;
    z-index: 99999999;
    * {
      width: 48px;
      height: 48px;
      transition: all 300ms ease;
      &:hover {
        color: ${({ theme }) => theme.color.secondary_01};
      }
    }
  }
  @media screen and (max-width: 770px) {
    .row {
      margin: 12px 0 24px 0;
      h1 {
        padding-left: 32px;
        font-size: 20px;
      }
    }
    .top * {
      width: 32px;
      height: 32px;
    }
  }
`;
