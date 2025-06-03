import React from 'react';
import { SearchBarContainer } from './styles';
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  search: string;
  setSearch: (value: string) => void;
  placeholder: string;
  iconSize?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, placeholder, iconSize, ...rest }) => {
  return (
    <SearchBarContainer {...rest}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={placeholder} />
      <FaMagnifyingGlass size={iconSize || 20} title='Pesquisar' />
    </SearchBarContainer>
  );
};

export default SearchBar;