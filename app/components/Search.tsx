import React from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  placeholder?: string;
}

export const normalizeAndIncludes = (target: string, query: string): boolean => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
  
    return normalize(target).includes(normalize(query));
  };

const Search: React.FC<SearchProps> = ({ search, setSearch, placeholder = "Rechercher...", }) => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-item"
      />
      {search && (
        <FaTimesCircle className="clear-icon" onClick={() => setSearch("")} />
      )}
    </div>
  );
};

export default Search;
