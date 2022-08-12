import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { AiOutlineSearch } from 'react-icons/ai';
import { Input, Button } from '../elements';
import SearchList from './SearchList';
import { getMovies } from 'src/api/movieApi';
import { IMovie } from '../../types/Movie';

interface SearchInputProps {
  handleSearchMovie: (reslut: IMovie[] | []) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ handleSearchMovie }) => {
  const { data } = getMovies() as { data: IMovie[] };
  const loadedRecentKeyword = localStorage.getItem('recentKeyword')
    ? JSON.parse(localStorage.getItem('recentKeyword')!)
    : [];

  const [recentKeyword, setRecentKeyword] = useState(loadedRecentKeyword);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterMovie, setFilterMovie] = useState<IMovie[] | []>([]);
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  const handleInnterText = (innerText: string) => {
    setSearchInput(innerText.trim());
    handleSearch();
  };

  const sendQuery = (query: string) => {
    const recommendMovie = filterSearchMovie(query);
    setFilterMovie(recommendMovie.slice(0, 10));
  };

  const callDebounceQuery = debounce((value) => {
    sendQuery(value);
  }, 300);

  const handleDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (checkIsEmpty(value)) {
      setSearchInput('');
      setFilterMovie([]);
      return;
    }
    callDebounceQuery(value.trim());
    setSearchInput(value.trim());
  };

  const filterSearchMovie = (keyword: string) => {
    const filterData = data.filter((movie: IMovie) =>
      movie.title.toLowerCase().includes(keyword)
    );

    return filterData;
  };

  const handleSearch = () => {
    if (checkIsEmpty(searchInput)) return;
    setRecentKeyword([searchInput, ...recentKeyword]);
    const searchMovie = filterSearchMovie(searchInput);
    handleSearchMovie(searchMovie);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onCheckEnter(event.key)) handleSearch();
  };

  const onCheckEnter = (key: string): boolean => key === 'Enter';

  const checkIsEmpty = (value: string): boolean => value.trim() === '';

  const handleCheckIsFocus = () => setIsInputFocus((prev: boolean) => !prev);

  const checkMaximumRecentSearch = (): boolean => {
    const MAXIMUM_SIZE = 10;
    return recentKeyword.length > MAXIMUM_SIZE;
  };

  useEffect(() => {
    const newRecentKeyword = checkMaximumRecentSearch()
      ? [...recentKeyword.slice(0, -1)]
      : recentKeyword;

    window.localStorage.setItem(
      'recentKeyword',
      JSON.stringify(newRecentKeyword)
    );
    setRecentKeyword(newRecentKeyword);
  }, [recentKeyword]);

  return (
    <>
      <SearchInputContainer>
        <SearchInputWrap>
          <SearchBarWrap>
            <Input
              onKeyDown={handleKeyDown}
              onChange={handleDebounce}
              onFocus={handleCheckIsFocus}
              // onBlur={handleCheckIsFocus}
              placeholder="영화 제목을 입력해주세요"
              type="text"
            />
            <Button onClick={handleSearch}>
              <AiOutlineSearch size={30} style={{ color: 'white' }} />
            </Button>
          </SearchBarWrap>
          {isInputFocus && (
            <SearchList
              recentKeyword={recentKeyword}
              filterMovie={filterMovie}
              handleInnterText={handleInnterText}
              searchInput={searchInput}
            />
          )}
        </SearchInputWrap>
      </SearchInputContainer>
    </>
  );
};

export default SearchInput;

const SearchInputContainer = styled.div`
  width: 80%;
  position: relative;
  margin-bottom: 50px;
`;

const SearchInputWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  border: 2px solid ${({ theme }) => theme.color.white};
  width: 100%;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.gray_01};
  overflow: hidden;
`;

const SearchBarWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  border-radius: 20px;
`;
