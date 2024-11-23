/* eslint-disable @typescript-eslint/no-explicit-any */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PcSearchBer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/categore/search-results?searchTerm=${searchTerm}`);
    }
  };

  return (
    <div className="searchBerDev">
      <div className="d-flex">
        <input
          className="search-ber"
          placeholder="Looking your products"
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <FontAwesomeIcon
          onClick={handleSearchSubmit}
          className="header2-part-2-search-icon-pc"
          icon={faSearch}
        />
      </div>
    </div>
  );
};

export default PcSearchBer;
