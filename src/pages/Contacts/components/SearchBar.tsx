import React, { useContext } from "react";
import { Theme, css } from "@emotion/react";
import { ContactStore } from "@common/store/useContactStore";
import Button from "@common/components/Button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const searchBarStyle = (theme: Theme) => {
    return css({
      width: "100%",
      marginBottom: "16px",
      display: "flex",
      justifyContent: "space-between",
      ".input": {
        padding: theme.padding[1],
        width: "200px",
      },
    });
  };

  const { onSetSearch, search } = useContext(ContactStore);

  return (
    <div css={searchBarStyle}>
      <input
        className="input"
        onChange={(e) => onSetSearch(e.target.value)}
        value={search}
        placeholder="Find Contact"
      />
      <div>
        <Button label="Add New Contact" onClick={() => navigate("/form")} />
      </div>
    </div>
  );
};

export default SearchBar;
