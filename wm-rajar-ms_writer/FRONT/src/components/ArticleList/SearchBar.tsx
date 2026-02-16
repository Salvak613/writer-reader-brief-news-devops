import "./SearchBar.css";

export type SearchBarType = {
  query: string;
};

type SearchBarProps = {
  searchBar: SearchBarType;
  onQueryChange: (newQuery: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  searchBar,
  onQueryChange,
  onSearch,
}: SearchBarProps) {

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchBar.query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="Rechercher un article..."
        className="search-bar-input"
      />
      <button className="search-bar-button" onClick={onSearch}>
        🔍
      </button>
    </div>
  );
}
