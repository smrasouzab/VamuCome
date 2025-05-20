import React from 'react';
import { SearchBarContainer } from './styles';
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  iconSize?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, iconSize, ...rest }) => {
  return (
    <SearchBarContainer {...rest}>
      <input type="text" placeholder={placeholder} />
      <FaMagnifyingGlass size={iconSize || 20} title='Pesquisar' />
    </SearchBarContainer>
  );
};

export default SearchBar;