import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({searchHandler}) => {
    return (
    <div className="search">
        <MdSearch className="search__icon" size="1.5em" />
        <input
            type="text"
            className="search__input"
            placeholder="Type to Search..."
            onChange={searchHandler}
        />
    </div>
    );
}

export default Search;